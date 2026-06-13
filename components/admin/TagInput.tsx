'use client';

import { useState, type KeyboardEvent } from 'react';
import { X } from 'lucide-react';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export default function TagInput({ tags, onChange, placeholder = 'Add tech, press Enter' }: TagInputProps) {
  const [value, setValue] = useState('');

  function add(raw: string) {
    const tag = raw.trim();
    if (!tag) return;
    if (tags.includes(tag)) return;
    onChange([...tags, tag]);
    setValue('');
  }

  function remove(tag: string) {
    onChange(tags.filter((t) => t !== tag));
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      add(value);
    } else if (e.key === 'Backspace' && value === '' && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 6,
        alignItems: 'center',
        padding: 10,
        borderRadius: 8,
        background: '#1a1a1a',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {tags.map((tag) => (
        <span
          key={tag}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            padding: '4px 6px 4px 10px',
            borderRadius: 20,
            background: 'rgba(255,255,255,0.06)',
            border: '0.5px solid rgba(255,255,255,0.12)',
            color: 'var(--text-secondary)',
          }}
        >
          {tag}
          <button
            type="button"
            onClick={() => remove(tag)}
            aria-label={`Remove ${tag}`}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: 0,
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            <X size={12} />
          </button>
        </span>
      ))}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={tags.length === 0 ? placeholder : ''}
        style={{
          flex: 1,
          minWidth: 120,
          background: 'transparent',
          border: 'none',
          outline: 'none',
          color: '#ffffff',
          fontFamily: 'var(--font-body)',
          fontSize: 13,
        }}
      />
    </div>
  );
}
