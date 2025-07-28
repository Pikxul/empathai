export class EmpathAI {
    constructor(options) {
        this.options = options;
        this.emotion = 'neutral';
        this.listeners = [];
        this.handleMouseMove = (e) => {
            // Sample rule: fast/erratic movement = frustration
            const speed = Math.abs(e.movementX) + Math.abs(e.movementY);
            if (speed > 50) {
                this.updateEmotion('frustrated');
            }
            else {
                this.updateEmotion('neutral');
            }
        };
        this.handleKeyDown = (e) => {
            // Sample rule: fast typing = focus; delete spam = frustration
            if (e.key === 'Backspace') {
                this.updateEmotion('frustrated');
            }
            else {
                this.updateEmotion('focused');
            }
        };
    }
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
    updateEmotion(newEmotion) {
        if (this.emotion !== newEmotion) {
            this.emotion = newEmotion;
            this.listeners.forEach((listener) => listener(this.emotion));
        }
    }
    onEmotionChange(callback) {
        this.listeners.push(callback);
    }
    getCurrentEmotion() {
        return this.emotion;
    }
}
// ⚡️ Export reusable instance — import { empathAI } from '@empathai/core'
export const empathAI = new EmpathAI();
//# sourceMappingURL=index.js.map