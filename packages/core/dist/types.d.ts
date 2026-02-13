export type EmotionType = 'neutral' | 'focused' | 'frustrated' | 'happy' | 'bored' | 'curious' | 'stressed';
export interface EmotionData {
    type: EmotionType;
    confidence: number;
    timestamp: number;
}
export interface EmpathAIOptions {
    enableMouseTracking?: boolean;
    enableKeyboardTracking?: boolean;
    enableMicTracking?: boolean;
    enableCameraTracking?: boolean;
    signalWindowMs?: number;
    analysisIntervalMs?: number;
    mouseThrottleMs?: number;
    confidenceThreshold?: number;
    debugMode?: boolean;
    onInit?: () => void;
    onEmotionDetected?: (emotion: EmotionData) => void;
}
//# sourceMappingURL=types.d.ts.map