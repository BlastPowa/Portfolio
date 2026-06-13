'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type ToastType = 'success' | 'error';

interface ToastProps {
  message: string | null;
  type?: ToastType;
  onDone: () => void;
}

export default function Toast({ message, type = 'success', onDone }: ToastProps) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [message, onDone]);

  const border = type === 'success' ? '#00FF88' : '#FF4444';

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 500,
            background: '#111111',
            border: `1px solid ${border}`,
            borderRadius: 12,
            padding: '14px 20px',
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            color: '#ffffff',
            boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
            maxWidth: 360,
          }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
