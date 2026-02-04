// packages/core/src/index.ts

import {
  EmotionType,
  EmotionData,
  EmpathAIOptions,
} from './types';

/**
 * Internal signal representation
 */
type MouseSignal = {
  speed: number;
  timestamp: number;
};

type KeySignal = {
  key: string;
  timestamp: number;
};

/**
 * Core EmpathAI engine
 * - Behavior-signal driven
 * - Time-window aggregated
 * - Privacy-first
 * - Deterministic v1 (ML-ready)
 */
export class EmpathAI {
  private currentEmotion: EmotionType = 'neutral';
  private currentConfidence = 0.5;

  private emotionListeners: Array<(data: EmotionData) => void> = [];

  private mouseSignals: MouseSignal[] = [];
  private keySignals: KeySignal[] = [];

  private readonly SIGNAL_WINDOW_MS = 3000;
  private readonly ANALYSIS_INTERVAL_MS = 1000;

  private analysisTimer?: ReturnType<typeof setInterval>;
  private initialized = false;

  constructor(private options: EmpathAIOptions = {}) {}

  /**
   * Initialize tracking (idempotent)
   */
  init() {
    if (typeof window === 'undefined') return;
    if (this.initialized) return;

    this.initialized = true;

    if (this.options.enableMouseTracking !== false) {
      window.addEventListener('mousemove', this.handleMouseMove);
    }

    if (this.options.enableKeyboardTracking !== false) {
      window.addEventListener('keydown', this.handleKeyDown);
    }

    this.analysisTimer = setInterval(
      this.analyzeSignals,
      this.ANALYSIS_INTERVAL_MS
    );

    this.options.onInit?.();
  }

  /**
   * Cleanup listeners & timers
   */
  destroy() {
    if (typeof window === 'undefined') return;
    if (!this.initialized) return;

    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('keydown', this.handleKeyDown);

    if (this.analysisTimer) {
      clearInterval(this.analysisTimer);
    }

    this.mouseSignals = [];
    this.keySignals = [];
    this.initialized = false;
  }

  /**
   * Mouse movement tracking
   */
  private handleMouseMove = (e: MouseEvent) => {
    const speed = Math.abs(e.movementX) + Math.abs(e.movementY);

    this.mouseSignals.push({
      speed,
      timestamp: Date.now(),
    });
  };

  /**
   * Keyboard tracking
   */
  private handleKeyDown = (e: KeyboardEvent) => {
    this.keySignals.push({
      key: e.key,
      timestamp: Date.now(),
    });
  };

  /**
   * Core emotion inference logic
   * (deterministic, explainable, extendable)
   */
  private analyzeSignals = () => {
    const now = Date.now();

    // Keep only recent signals
    this.mouseSignals = this.mouseSignals.filter(
      (s) => now - s.timestamp <= this.SIGNAL_WINDOW_MS
    );
    this.keySignals = this.keySignals.filter(
      (s) => now - s.timestamp <= this.SIGNAL_WINDOW_MS
    );

    let nextEmotion: EmotionType = 'neutral';
    let confidence = 0.3;

    const avgMouseSpeed =
      this.mouseSignals.reduce((sum, s) => sum + s.speed, 0) /
      (this.mouseSignals.length || 1);

    const backspaceCount = this.keySignals.filter(
      (k) => k.key === 'Backspace'
    ).length;

    const typingCount = this.keySignals.length;

    // --- Emotion inference rules (v1) ---
    if (avgMouseSpeed > 60 && backspaceCount > 2) {
      nextEmotion = 'frustrated';
      confidence = 0.8;
    } else if (typingCount > 15 && backspaceCount === 0) {
      nextEmotion = 'focused';
      confidence = 0.7;
    } else if (typingCount === 0 && this.mouseSignals.length < 3) {
      nextEmotion = 'bored';
      confidence = 0.6;
    }

    this.emitEmotion(nextEmotion, confidence);
  };

  /**
   * Emit emotion change event
   */
  private emitEmotion(type: EmotionType, confidence: number) {
    if (type === this.currentEmotion) return;

    this.currentEmotion = type;
    this.currentConfidence = confidence;

    const payload: EmotionData = {
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
  onEmotionChange(callback: (data: EmotionData) => void) {
    this.emotionListeners.push(callback);

    return () => {
      this.emotionListeners = this.emotionListeners.filter(
        (l) => l !== callback
      );
    };
  }

  /**
   * Get current emotion snapshot
   */
  getCurrentEmotion(): EmotionData {
    return {
      type: this.currentEmotion,
      confidence: this.currentConfidence,
      timestamp: Date.now(),
    };
  }
}

/**
 * Factory method (recommended usage)
 */
export function createEmpathAI(options?: EmpathAIOptions) {
  return new EmpathAI(options);
}
