// packages/core/src/hooks/useEmpathAI.ts

import { useEffect, useRef, useState } from 'react';
import { createEmpathAI } from '../index';
import { EmotionData, EmpathAIOptions } from '../types';

/**
 * React hook for EmpathAI
 * - Safe for React 18 StrictMode
 * - Instance-based (no singleton)
 * - Emits full EmotionData
 */
export const useEmpathAI = (options?: EmpathAIOptions) => {
  const empathAIRef = useRef<ReturnType<typeof createEmpathAI> | null>(null);

  const [emotion, setEmotion] = useState<EmotionData>({
    type: 'neutral',
    confidence: 0,
    timestamp: Date.now(),
  });

  useEffect(() => {
    // Create instance only once
    if (!empathAIRef.current) {
      empathAIRef.current = createEmpathAI(options);

      empathAIRef.current.onEmotionChange((data) => {
        setEmotion(data);
      });

      empathAIRef.current.init();
    }

    return () => {
      // Cleanup on unmount
      empathAIRef.current?.destroy();
      empathAIRef.current = null;
    };
    // options intentionally excluded to avoid re-init loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return emotion;
};
