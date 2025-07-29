// src/hooks/useEmpathAI.ts
import { useEffect, useState } from 'react';
import { empathAI } from '../index';
import { EmotionType, EmpathAIOptions } from '../types';

export const useEmpathAI = (options?: EmpathAIOptions) => {
  const [emotion, setEmotion] = useState<EmotionType>('neutral');

  useEffect(() => {
    empathAI.onEmotionChange(setEmotion);
    empathAI.init();

    return () => {
      empathAI.destroy();
    };
  }, []);

  return emotion;
};
