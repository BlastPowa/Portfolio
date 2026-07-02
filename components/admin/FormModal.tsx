'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { FormEvent, ReactNode } from 'react';

interface FormModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: (e: FormEvent) => void;
  submitLabel?: string;
  submitting?: boolean;
  children: ReactNode;
}

export default function FormModal({
  open,
  title,
  onClose,
  onSubmit,
  submitLabel = 'Save',
  submitting = false,
  children,
}: FormModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 400,
            background: 'rgba(0,0,0,0.72)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          <motion.form
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            onSubmit={onSubmit}
            style={{
              background: '#111111',
              border: '0.5px solid rgba(255,255,255,0.1)',
              borderRadius: 20,
              padding: 32,
              maxWidth: 560,
              width: '100%',
              maxHeight: '88vh',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, margin: 0 }}>{title}</h3>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: 'none',
                  borderRadius: '50%',
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                }}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ display: 'grid', gap: 18, overflowY: 'auto', paddingRight: 4 }}>
              {children}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24, paddingTop: 20, borderTop: '0.5px solid rgba(255,255,255,0.08)' }}>
              <button type="button" onClick={onClose} style={cancelBtn}>
                Cancel
              </button>
              <button type="submit" disabled={submitting} style={{ ...submitBtn, opacity: submitting ? 0.6 : 1, cursor: submitting ? 'default' : 'pointer' }}>
                {submitting ? 'Saving…' : submitLabel}
              </button>
            </div>
          </motion.form>
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

const submitBtn: React.CSSProperties = {
  padding: '10px 22px',
  borderRadius: 8,
  background: 'var(--grad-primary)',
  border: 'none',
  color: '#000000',
  fontWeight: 700,
  fontFamily: 'var(--font-body)',
  fontSize: 14,
};
