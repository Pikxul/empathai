// src/types.ts

// Supported emotion states (expandable in future releases)
export type EmotionType =
  | 'neutral'
  | 'focused'
  | 'frustrated'
  | 'happy'
  | 'bored'
  | 'curious'
  | 'stressed';

// Core structure returned by emotion analysis
export interface EmotionData {
  type: EmotionType;
  confidence: number; // 0.0 to 1.0
  timestamp: number; // Unix timestamp in ms
}

// Configuration options for initializing the SDK
export interface EmpathAIOptions {
  // Feature toggles
  enableMouseTracking?: boolean;
  enableKeyboardTracking?: boolean;
  enableMicTracking?: boolean; // 🔜 multimodal v2
  enableCameraTracking?: boolean; // 🔜 multimodal v2
  
  // Performance tuning
  signalWindowMs?: number;        // Default: 3000ms - Time window for signal aggregation
  analysisIntervalMs?: number;    // Default: 1000ms - How often to analyze signals
  mouseThrottleMs?: number;       // Default: 50ms - Throttle mouse events for performance
  
  // Detection tuning
  confidenceThreshold?: number;   // Default: 0.3 - Minimum confidence to emit emotion
  
  // Debugging
  debugMode?: boolean;            // Default: false - Log analysis details to console
  
  // Callbacks
  onInit?: () => void;
  onEmotionDetected?: (emotion: EmotionData) => void;
}
