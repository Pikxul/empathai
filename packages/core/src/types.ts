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
  enableMouseTracking?: boolean;
  enableKeyboardTracking?: boolean;
  enableMicTracking?: boolean; // 🔜 multimodal v2
  enableCameraTracking?: boolean; // 🔜 multimodal v2
  onInit?: () => void;
  onEmotionDetected?: (emotion: EmotionData) => void;
}
