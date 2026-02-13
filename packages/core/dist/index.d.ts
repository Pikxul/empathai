import { EmotionType, EmotionData, EmpathAIOptions } from './types';
export type { EmotionType, EmotionData, EmpathAIOptions };
/**
 * Core EmpathAI engine
 * - Behavior-signal driven
 * - Time-window aggregated
 * - Privacy-first
 * - Deterministic v1 (ML-ready)
 */
export declare class EmpathAI {
    private options;
    private currentEmotion;
    private currentConfidence;
    private emotionListeners;
    private mouseSignals;
    private keySignals;
    private lastMouseEventTime;
    private readonly SIGNAL_WINDOW_MS;
    private readonly ANALYSIS_INTERVAL_MS;
    private readonly MOUSE_THROTTLE_MS;
    private readonly CONFIDENCE_THRESHOLD;
    private readonly DEBUG_MODE;
    private analysisTimer?;
    private initialized;
    constructor(options?: EmpathAIOptions);
    /**
     * Initialize tracking (idempotent)
     */
    init(): void;
    /**
     * Cleanup listeners & timers
     */
    destroy(): void;
    /**
     * Mouse movement tracking with throttling
     */
    private handleMouseMove;
    /**
     * Keyboard tracking
     */
    private handleKeyDown;
    /**
     * Core emotion inference logic
     * Implements all 7 emotion types with nuanced detection
     */
    private analyzeSignals;
    /**
     * Calculate mouse movement variance to detect erratic vs smooth patterns
     */
    private calculateMouseVariance;
    /**
     * Emit emotion change event (only if different from current)
     */
    private emitEmotion;
    /**
     * Subscribe to emotion updates
     * Returns unsubscribe function
     */
    onEmotionChange(callback: (data: EmotionData) => void): () => void;
    /**
     * Get current emotion snapshot
     */
    getCurrentEmotion(): EmotionData;
    /**
     * Get performance metrics (for monitoring)
     */
    getPerformanceMetrics(): {
        mouseSignalCount: number;
        keySignalCount: number;
        listenerCount: number;
        isInitialized: boolean;
    };
}
/**
 * Factory method (recommended usage)
 */
export declare function createEmpathAI(options?: EmpathAIOptions): EmpathAI;
//# sourceMappingURL=index.d.ts.map