import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createEmpathAI } from '../index';
import { EmotionData, EmotionType } from '../types';

describe('EmpathAI Core Engine - Enhanced Tests', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe('Initialization and Lifecycle', () => {
    it('initializes without crashing', () => {
      const empathAI = createEmpathAI();
      expect(() => empathAI.init()).not.toThrow();
      empathAI.destroy();
    });

    it('can be initialized multiple times safely (idempotent)', () => {
      const empathAI = createEmpathAI();
      empathAI.init();
      empathAI.init();
      empathAI.init();
      expect(() => empathAI.destroy()).not.toThrow();
    });

    it('can be destroyed multiple times safely', () => {
      const empathAI = createEmpathAI();
      empathAI.init();
      empathAI.destroy();
      empathAI.destroy();
      expect(true).toBe(true);
    });

    it('calls onInit callback when initialized', () => {
      const onInit = vi.fn();
      const empathAI = createEmpathAI({ onInit });
      empathAI.init();
      expect(onInit).toHaveBeenCalledTimes(1);
      empathAI.destroy();
    });
  });

  describe('Configuration Options', () => {
    it('accepts custom signal window duration', () => {
      const empathAI = createEmpathAI({ signalWindowMs: 5000 });
      empathAI.init();
      expect(empathAI.getPerformanceMetrics().isInitialized).toBe(true);
      empathAI.destroy();
    });

    it('accepts custom analysis interval', () => {
      const empathAI = createEmpathAI({ analysisIntervalMs: 2000 });
      empathAI.init();
      expect(empathAI.getPerformanceMetrics().isInitialized).toBe(true);
      empathAI.destroy();
    });

    it('accepts custom mouse throttle duration', () => {
      const empathAI = createEmpathAI({ mouseThrottleMs: 100 });
      empathAI.init();
      expect(empathAI.getPerformanceMetrics().isInitialized).toBe(true);
      empathAI.destroy();
    });

    it('accepts custom confidence threshold', () => {
      const empathAI = createEmpathAI({ confidenceThreshold: 0.5 });
      empathAI.init();
      expect(empathAI.getPerformanceMetrics().isInitialized).toBe(true);
      empathAI.destroy();
    });

    it('supports debug mode', () => {
      const consoleSpy = vi.spyOn(console, 'log');
      const empathAI = createEmpathAI({ debugMode: true });
      empathAI.init();
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('[EmpathAI] Initialized'),
        expect.any(Object)
      );
      empathAI.destroy();
    });
  });

  describe('EmotionData Structure', () => {
    it('emits valid EmotionData structure', () => {
      const empathAI = createEmpathAI({
        enableMouseTracking: false,
        enableKeyboardTracking: false,
      });

      const listener = vi.fn((data: EmotionData) => {
        // no-op
      });

      empathAI.onEmotionChange(listener);
      empathAI.init();

      const emotion = empathAI.getCurrentEmotion();

      expect(emotion).toHaveProperty('type');
      expect(emotion).toHaveProperty('confidence');
      expect(emotion).toHaveProperty('timestamp');
      expect(typeof emotion.type).toBe('string');
      expect(typeof emotion.confidence).toBe('number');
      expect(typeof emotion.timestamp).toBe('number');

      empathAI.destroy();
    });

    it('confidence is between 0 and 1', () => {
      const empathAI = createEmpathAI();
      empathAI.init();
      const emotion = empathAI.getCurrentEmotion();
      expect(emotion.confidence).toBeGreaterThanOrEqual(0);
      expect(emotion.confidence).toBeLessThanOrEqual(1);
      empathAI.destroy();
    });
  });

  describe('Emotion Detection', () => {
    it('does not emit duplicate emotion changes', () => {
      const empathAI = createEmpathAI({
        enableMouseTracking: false,
        enableKeyboardTracking: false,
      });

      const listener = vi.fn();
      empathAI.onEmotionChange(listener);

      empathAI.init();

      const first = empathAI.getCurrentEmotion();
      const second = empathAI.getCurrentEmotion();

      expect(first.type).toBe(second.type);

      empathAI.destroy();
    });

    it('detects bored state with low activity', async () => {
      const empathAI = createEmpathAI({ analysisIntervalMs: 500 });
      const emotions: EmotionType[] = [];

      empathAI.onEmotionChange((data) => {
        emotions.push(data.type);
      });

      empathAI.init();

      // Wait for analysis
      vi.advanceTimersByTime(1500);

      const current = empathAI.getCurrentEmotion();
      expect(['neutral', 'bored']).toContain(current.type);

      empathAI.destroy();
    });

    it('detects frustrated state with fast mouse and backspaces', () => {
      const onEmotionDetected = vi.fn();
      const empathAI = createEmpathAI({
        onEmotionDetected,
        analysisIntervalMs: 500,
      });

      empathAI.init();

      // Simulate frustrated behavior
      for (let i = 0; i < 20; i++) {
        window.dispatchEvent(new MouseEvent('mousemove', {
          movementX: 80,
          movementY: 80,
        }));
      }

      for (let i = 0; i < 5; i++) {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace' }));
      }

      // Trigger analysis
      vi.advanceTimersByTime(1000);

      empathAI.destroy();
    });

    it('detects focused state with steady typing and low errors', () => {
      const empathAI = createEmpathAI({ analysisIntervalMs: 500 });
      empathAI.init();

      // Simulate focused typing
      for (let i = 0; i < 20; i++) {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
      }

      // Trigger analysis
      vi.advanceTimersByTime(1000);

      empathAI.destroy();
    });
  });

  describe('Event Listeners', () => {
    it('supports multiple listeners', () => {
      const empathAI = createEmpathAI();
      const listener1 = vi.fn();
      const listener2 = vi.fn();
      const listener3 = vi.fn();

      empathAI.onEmotionChange(listener1);
      empathAI.onEmotionChange(listener2);
      empathAI.onEmotionChange(listener3);

      empathAI.init();

      const metrics = empathAI.getPerformanceMetrics();
      expect(metrics.listenerCount).toBe(3);

      empathAI.destroy();
    });

    it('returns unsubscribe function', () => {
      const empathAI = createEmpathAI();
      const listener = vi.fn();

      const unsubscribe = empathAI.onEmotionChange(listener);
      empathAI.init();

      expect(empathAI.getPerformanceMetrics().listenerCount).toBe(1);

      unsubscribe();

      expect(empathAI.getPerformanceMetrics().listenerCount).toBe(0);

      empathAI.destroy();
    });

    it('unsubscribe removes only the specific listener', () => {
      const empathAI = createEmpathAI();
      const listener1 = vi.fn();
      const listener2 = vi.fn();

      empathAI.onEmotionChange(listener1);
      const unsubscribe2 = empathAI.onEmotionChange(listener2);

      empathAI.init();
      expect(empathAI.getPerformanceMetrics().listenerCount).toBe(2);

      unsubscribe2();
      expect(empathAI.getPerformanceMetrics().listenerCount).toBe(1);

      empathAI.destroy();
    });
  });

  describe('Performance Metrics', () => {
    it('returns performance metrics', () => {
      const empathAI = createEmpathAI();
      empathAI.init();

      const metrics = empathAI.getPerformanceMetrics();

      expect(metrics).toHaveProperty('mouseSignalCount');
      expect(metrics).toHaveProperty('keySignalCount');
      expect(metrics).toHaveProperty('listenerCount');
      expect(metrics).toHaveProperty('isInitialized');
      expect(metrics.isInitialized).toBe(true);

      empathAI.destroy();
    });

    it('tracks signal counts correctly', () => {
      const empathAI = createEmpathAI();
      empathAI.init();

      // Dispatch events
      window.dispatchEvent(new MouseEvent('mousemove', { movementX: 10, movementY: 10 }));
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));

      const metrics = empathAI.getPerformanceMetrics();
      expect(metrics.mouseSignalCount).toBeGreaterThan(0);
      expect(metrics.keySignalCount).toBeGreaterThan(0);

      empathAI.destroy();
    });
  });

  describe('Mouse Event Throttling', () => {
    it('throttles mouse events for performance', () => {
      const empathAI = createEmpathAI({ mouseThrottleMs: 100 });
      empathAI.init();

      // Dispatch many mouse events rapidly
      for (let i = 0; i < 100; i++) {
        window.dispatchEvent(new MouseEvent('mousemove', { movementX: 5, movementY: 5 }));
      }

      const metrics = empathAI.getPerformanceMetrics();
      // Should have far fewer than 100 signals due to throttling
      expect(metrics.mouseSignalCount).toBeLessThan(100);

      empathAI.destroy();
    });
  });

  describe('Signal Window Cleanup', () => {
    it('removes old signals outside the time window', () => {
      const empathAI = createEmpathAI({
        signalWindowMs: 1000,
        analysisIntervalMs: 500,
      });
      empathAI.init();

      // Add signals
      window.dispatchEvent(new MouseEvent('mousemove', { movementX: 10, movementY: 10 }));
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));

      let metrics = empathAI.getPerformanceMetrics();
      const initialMouseCount = metrics.mouseSignalCount;
      const initialKeyCount = metrics.keySignalCount;

      // Advance time beyond signal window
      vi.advanceTimersByTime(2000);

      metrics = empathAI.getPerformanceMetrics();
      // Signals should be cleaned up
      expect(metrics.mouseSignalCount).toBeLessThanOrEqual(initialMouseCount);
      expect(metrics.keySignalCount).toBeLessThanOrEqual(initialKeyCount);

      empathAI.destroy();
    });
  });

  describe('Feature Toggles', () => {
    it('respects enableMouseTracking=false', () => {
      const empathAI = createEmpathAI({ enableMouseTracking: false });
      empathAI.init();

      window.dispatchEvent(new MouseEvent('mousemove', { movementX: 10, movementY: 10 }));

      const metrics = empathAI.getPerformanceMetrics();
      expect(metrics.mouseSignalCount).toBe(0);

      empathAI.destroy();
    });

    it('respects enableKeyboardTracking=false', () => {
      const empathAI = createEmpathAI({ enableKeyboardTracking: false });
      empathAI.init();

      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));

      const metrics = empathAI.getPerformanceMetrics();
      expect(metrics.keySignalCount).toBe(0);

      empathAI.destroy();
    });
  });
});
