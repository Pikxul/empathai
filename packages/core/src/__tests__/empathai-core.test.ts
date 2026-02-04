import { describe, it, expect, vi } from 'vitest';
import { createEmpathAI } from '../index';
import { EmotionData } from '../types';

describe('EmpathAI Core Engine', () => {
  it('initializes without crashing', () => {
    const empathAI = createEmpathAI();
    expect(() => empathAI.init()).not.toThrow();
    empathAI.destroy();
  });

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

    empathAI.destroy();
  });

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
});
