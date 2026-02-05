import { EmotionData, EmpathAIOptions } from './types';
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
    private readonly SIGNAL_WINDOW_MS;
    private readonly ANALYSIS_INTERVAL_MS;
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
     * Mouse movement tracking
     */
    private handleMouseMove;
    /**
     * Keyboard tracking
     */
    private handleKeyDown;
    /**
     * Core emotion inference logic
     * (deterministic, explainable, extendable)
     */
    private analyzeSignals;
    /**
     * Emit emotion change event
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
}
/**
 * Factory method (recommended usage)
 */
export declare function createEmpathAI(options?: EmpathAIOptions): EmpathAI;
//# sourceMappingURL=index.d.ts.map