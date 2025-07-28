// src/index.ts
import { EmotionType, EmpathAIOptions } from './types';

export class EmpathAI {
  private emotion: EmotionType = 'neutral';
  private listeners: Array<(emotion: EmotionType) => void> = [];

  constructor(private options?: EmpathAIOptions) {}

  init() {
    if (this.options?.enableMouseTracking !== false) {
      window.addEventListener('mousemove', this.handleMouseMove);
    }

    if (this.options?.enableKeyboardTracking !== false) {
      window.addEventListener('keydown', this.handleKeyDown);
    }

    if (this.options?.onInit) {
      this.options.onInit();
    }
  }

  destroy() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  private handleMouseMove = (e: MouseEvent) => {
    // Sample rule: fast/erratic movement = frustration
    const speed = Math.abs(e.movementX) + Math.abs(e.movementY);
    if (speed > 50) {
      this.updateEmotion('frustrated');
    } else {
      this.updateEmotion('neutral');
    }
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    // Sample rule: fast typing = focus; delete spam = frustration
    if (e.key === 'Backspace') {
      this.updateEmotion('frustrated');
    } else {
      this.updateEmotion('focused');
    }
  };

  private updateEmotion(newEmotion: EmotionType) {
    if (this.emotion !== newEmotion) {
      this.emotion = newEmotion;
      this.listeners.forEach((listener) => listener(this.emotion));
    }
  }

  onEmotionChange(callback: (emotion: EmotionType) => void) {
    this.listeners.push(callback);
  }

  getCurrentEmotion(): EmotionType {
    return this.emotion;
  }
}

// ⚡️ Export reusable instance — import { empathAI } from '@empathai/core'
export const empathAI = new EmpathAI();
