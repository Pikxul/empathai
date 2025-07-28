// src/hooks/useEmpathAI.ts
import { useEffect, useState } from 'react';
import { empathAI } from '../index';
export const useEmpathAI = (options) => {
    const [emotion, setEmotion] = useState('neutral');
    useEffect(() => {
        empathAI.onEmotionChange(setEmotion);
        empathAI.init();
        return () => {
            empathAI.destroy();
        };
    }, []);
    return emotion;
};
//# sourceMappingURL=useEmpathAI.js.map