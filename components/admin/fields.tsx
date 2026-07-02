'use client';

import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, ReactNode } from 'react';

const labelStyle: React.CSSProperties = {
  display: 'grid',
  gap: 6,
};

const captionStyle: React.CSSProperties = {
  fontSize: 12,
  fontFamily: 'var(--font-mono)',
  color: 'var(--text-secondary)',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
};

const controlStyle: React.CSSProperties = {
  background: '#1a1a1a',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 8,
  padding: '10px 12px',
  color: '#ffffff',
  fontFamily: 'var(--font-body)',
  fontSize: 14,
  outline: 'none',
  width: '100%',
};

interface FieldShellProps {
  label: string;
  required?: boolean;
  children: ReactNode;
}

function FieldShell({ label, required, children }: FieldShellProps) {
  return (
    <label style={labelStyle}>
      <span style={captionStyle}>
        {label}
        {required ? ' *' : ''}
      </span>
      {children}
    </label>
  );
}

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & { label: string };

export function TextField({ label, required, style, ...rest }: TextFieldProps) {
  return (
    <FieldShell label={label} required={required}>
      <input {...rest} required={required} style={{ ...controlStyle, ...style }} />
    </FieldShell>
  );
}

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string };

export function TextArea({ label, required, style, rows = 3, ...rest }: TextAreaProps) {
  return (
    <FieldShell label={label} required={required}>
      <textarea {...rest} required={required} rows={rows} style={{ ...controlStyle, resize: 'vertical', ...style }} />
    </FieldShell>
  );
}

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: { value: string; label: string }[];
};

export function SelectField({ label, required, options, style, ...rest }: SelectFieldProps) {
  return (
    <FieldShell label={label} required={required}>
      <select {...rest} required={required} style={{ ...controlStyle, ...style }}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

type CheckboxFieldProps = InputHTMLAttributes<HTMLInputElement> & { label: string };

export function CheckboxField({ label, style, ...rest }: CheckboxFieldProps) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
      <input type="checkbox" {...rest} style={{ width: 16, height: 16, ...style }} />
      <span style={{ fontSize: 14, color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>{label}</span>
    </label>
  );
}
