// packages/core/src/index.ts
/**
 * Core EmpathAI engine
 * - Behavior-signal driven
 * - Time-window aggregated
 * - Privacy-first
 * - Deterministic v1 (ML-ready)
 */
export class EmpathAI {
    constructor(options = {}) {
        this.options = options;
        this.currentEmotion = 'neutral';
        this.currentConfidence = 0.5;
        this.emotionListeners = [];
        this.mouseSignals = [];
        this.keySignals = [];
        this.lastMouseEventTime = 0;
        this.initialized = false;
        /**
         * Mouse movement tracking with throttling
         */
        this.handleMouseMove = (e) => {
            const now = Date.now();
            // Throttle mouse events for performance
            if (now - this.lastMouseEventTime < this.MOUSE_THROTTLE_MS) {
                return;
            }
            this.lastMouseEventTime = now;
            const speed = Math.abs(e.movementX) + Math.abs(e.movementY);
            this.mouseSignals.push({
                speed,
                timestamp: now,
            });
        };
        /**
         * Keyboard tracking
         */
        this.handleKeyDown = (e) => {
            this.keySignals.push({
                key: e.key,
                timestamp: Date.now(),
            });
        };
        /**
         * Core emotion inference logic
         * Implements all 7 emotion types with nuanced detection
         */
        this.analyzeSignals = () => {
            const now = Date.now();
            // Keep only recent signals
            this.mouseSignals = this.mouseSignals.filter((s) => now - s.timestamp <= this.SIGNAL_WINDOW_MS);
            this.keySignals = this.keySignals.filter((s) => now - s.timestamp <= this.SIGNAL_WINDOW_MS);
            let nextEmotion = 'neutral';
            let confidence = this.CONFIDENCE_THRESHOLD;
            // Calculate metrics
            const avgMouseSpeed = this.mouseSignals.reduce((sum, s) => sum + s.speed, 0) /
                (this.mouseSignals.length || 1);
            const backspaceCount = this.keySignals.filter((k) => k.key === 'Backspace').length;
            const deleteCount = this.keySignals.filter((k) => k.key === 'Delete').length;
            const typingCount = this.keySignals.length;
            const errorRate = typingCount > 0 ? (backspaceCount + deleteCount) / typingCount : 0;
            // Calculate mouse movement variance (for detecting erratic vs smooth)
            const mouseVariance = this.calculateMouseVariance();
            // --- Enhanced emotion inference rules (all 7 types) ---
            // FRUSTRATED: Fast erratic mouse + many corrections
            if (avgMouseSpeed > 60 && backspaceCount > 2 && mouseVariance > 30) {
                nextEmotion = 'frustrated';
                confidence = 0.85;
            }
            // STRESSED: Very high typing rate + high error rate + fast mouse
            else if (typingCount > 20 && errorRate > 0.3 && avgMouseSpeed > 50) {
                nextEmotion = 'stressed';
                confidence = 0.8;
            }
            // FOCUSED: Steady typing + low errors + moderate mouse activity
            else if (typingCount > 15 && errorRate < 0.1 && mouseVariance < 20) {
                nextEmotion = 'focused';
                confidence = 0.75;
            }
            // CURIOUS: Varied mouse patterns + moderate activity
            else if (this.mouseSignals.length > 10 && mouseVariance > 20 && mouseVariance < 50 && typingCount < 10) {
                nextEmotion = 'curious';
                confidence = 0.7;
            }
            // HAPPY: Smooth deliberate movements + steady typing
            else if (avgMouseSpeed > 20 && avgMouseSpeed < 50 && mouseVariance < 15 && typingCount > 5 && errorRate < 0.15) {
                nextEmotion = 'happy';
                confidence = 0.65;
            }
            // BORED: Very low activity
            else if (typingCount === 0 && this.mouseSignals.length < 3) {
                nextEmotion = 'bored';
                confidence = 0.6;
            }
            // NEUTRAL: Default state
            else {
                nextEmotion = 'neutral';
                confidence = 0.5;
            }
            if (this.DEBUG_MODE) {
                console.log('[EmpathAI] Analysis:', {
                    avgMouseSpeed: avgMouseSpeed.toFixed(2),
                    mouseVariance: mouseVariance.toFixed(2),
                    typingCount,
                    errorRate: (errorRate * 100).toFixed(1) + '%',
                    emotion: nextEmotion,
                    confidence: confidence.toFixed(2),
                });
            }
            this.emitEmotion(nextEmotion, confidence);
        };
        // Initialize configurable parameters
        this.SIGNAL_WINDOW_MS = options.signalWindowMs ?? 3000;
        this.ANALYSIS_INTERVAL_MS = options.analysisIntervalMs ?? 1000;
        this.MOUSE_THROTTLE_MS = options.mouseThrottleMs ?? 50;
        this.CONFIDENCE_THRESHOLD = options.confidenceThreshold ?? 0.3;
        this.DEBUG_MODE = options.debugMode ?? false;
    }
    /**
     * Initialize tracking (idempotent)
     */
    init() {
        if (typeof window === 'undefined')
            return;
        if (this.initialized)
            return;
        this.initialized = true;
        if (this.options.enableMouseTracking !== false) {
            window.addEventListener('mousemove', this.handleMouseMove);
        }
        if (this.options.enableKeyboardTracking !== false) {
            window.addEventListener('keydown', this.handleKeyDown);
        }
        this.analysisTimer = setInterval(this.analyzeSignals, this.ANALYSIS_INTERVAL_MS);
        if (this.DEBUG_MODE) {
            console.log('[EmpathAI] Initialized with config:', {
                signalWindowMs: this.SIGNAL_WINDOW_MS,
                analysisIntervalMs: this.ANALYSIS_INTERVAL_MS,
                mouseThrottleMs: this.MOUSE_THROTTLE_MS,
                confidenceThreshold: this.CONFIDENCE_THRESHOLD,
            });
        }
        this.options.onInit?.();
    }
    /**
     * Cleanup listeners & timers
     */
    destroy() {
        if (typeof window === 'undefined')
            return;
        if (!this.initialized)
            return;
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('keydown', this.handleKeyDown);
        if (this.analysisTimer) {
            clearInterval(this.analysisTimer);
        }
        this.mouseSignals = [];
        this.keySignals = [];
        this.initialized = false;
        if (this.DEBUG_MODE) {
            console.log('[EmpathAI] Destroyed');
        }
    }
    /**
     * Calculate mouse movement variance to detect erratic vs smooth patterns
     */
    calculateMouseVariance() {
        if (this.mouseSignals.length < 2)
            return 0;
        const speeds = this.mouseSignals.map(s => s.speed);
        const avg = speeds.reduce((sum, s) => sum + s, 0) / speeds.length;
        const variance = speeds.reduce((sum, s) => sum + Math.pow(s - avg, 2), 0) / speeds.length;
        return Math.sqrt(variance);
    }
    /**
     * Emit emotion change event (only if different from current)
     */
    emitEmotion(type, confidence) {
        // Only emit if emotion changed and confidence meets threshold
        if (type === this.currentEmotion || confidence < this.CONFIDENCE_THRESHOLD) {
            return;
        }
        this.currentEmotion = type;
        this.currentConfidence = confidence;
        const payload = {
            type,
            confidence,
            timestamp: Date.now(),
        };
        this.emotionListeners.forEach((listener) => listener(payload));
        this.options.onEmotionDetected?.(payload);
    }
    /**
     * Subscribe to emotion updates
     * Returns unsubscribe function
     */
    onEmotionChange(callback) {
        this.emotionListeners.push(callback);
        return () => {
            this.emotionListeners = this.emotionListeners.filter((l) => l !== callback);
        };
    }
    /**
     * Get current emotion snapshot
     */
    getCurrentEmotion() {
        return {
            type: this.currentEmotion,
            confidence: this.currentConfidence,
            timestamp: Date.now(),
        };
    }
    /**
     * Get performance metrics (for monitoring)
     */
    getPerformanceMetrics() {
        return {
            mouseSignalCount: this.mouseSignals.length,
            keySignalCount: this.keySignals.length,
            listenerCount: this.emotionListeners.length,
            isInitialized: this.initialized,
        };
    }
}
/**
 * Factory method (recommended usage)
 */
export function createEmpathAI(options) {
    return new EmpathAI(options);
}
//# sourceMappingURL=index.js.map