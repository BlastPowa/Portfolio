'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface ConfirmDialogProps {
  open: boolean;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  message,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 400,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#111111',
              border: '0.5px solid rgba(255,255,255,0.1)',
              borderRadius: 16,
              padding: 32,
              maxWidth: 420,
              width: '100%',
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, margin: 0, marginBottom: 12 }}>
              Are you sure?
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, margin: 0, marginBottom: 24 }}>{message}</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button onClick={onCancel} style={cancelBtn}>
                {cancelLabel}
              </button>
              <button onClick={onConfirm} style={dangerBtn}>
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const cancelBtn: React.CSSProperties = {
  padding: '10px 20px',
  borderRadius: 8,
  background: 'transparent',
  border: '0.5px solid rgba(255,255,255,0.12)',
  color: '#ffffff',
  cursor: 'pointer',
  fontFamily: 'var(--font-body)',
  fontSize: 14,
};

const dangerBtn: React.CSSProperties = {
  padding: '10px 20px',
  borderRadius: 8,
  background: '#FF4444',
  border: 'none',
  color: '#ffffff',
  cursor: 'pointer',
  fontFamily: 'var(--font-body)',
  fontWeight: 600,
  fontSize: 14,
};
