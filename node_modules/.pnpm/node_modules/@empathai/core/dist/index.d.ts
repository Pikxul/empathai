import { EmotionType, EmpathAIOptions } from './types';
export declare class EmpathAI {
    private options?;
    private emotion;
    private listeners;
    constructor(options?: EmpathAIOptions | undefined);
    init(): void;
    destroy(): void;
    private handleMouseMove;
    private handleKeyDown;
    private updateEmotion;
    onEmotionChange(callback: (emotion: EmotionType) => void): void;
    getCurrentEmotion(): EmotionType;
}
export declare const empathAI: EmpathAI;
//# sourceMappingURL=index.d.ts.map