'use client';

import { useRef, useState, type DragEvent } from 'react';
import { Upload, Loader2 } from 'lucide-react';

interface ImageUploadProps {
  onUpload: (url: string) => void;
  multiple?: boolean;
  onError?: (message: string) => void;
}

export default function ImageUpload({ onUpload, multiple = true, onError }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function uploadFile(file: File) {
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      throw new Error(data.error ?? 'Upload failed');
    }
    const data = (await res.json()) as { url: string };
    return data.url;
  }

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const list = multiple ? Array.from(files) : [files[0]];
      for (const f of list) {
        try {
          const url = await uploadFile(f);
          onUpload(url);
        } catch (err) {
          onError?.((err as Error).message);
        }
      }
    } finally {
      setUploading(false);
    }
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    void handleFiles(e.dataTransfer.files);
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDrop={onDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      style={{
        padding: 32,
        border: '1.5px dashed rgba(255,255,255,0.16)',
        borderRadius: 12,
        background: dragOver ? 'rgba(255,255,255,0.04)' : 'transparent',
        textAlign: 'center',
        cursor: 'pointer',
        color: 'var(--text-secondary)',
        transition: 'all 0.2s',
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={(e) => void handleFiles(e.target.files)}
        style={{ display: 'none' }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        {uploading ? (
          <Loader2 size={28} className="spin" />
        ) : (
          <Upload size={28} />
        )}
        <div style={{ fontSize: 14 }}>
          {uploading ? 'Uploading…' : 'Drop images here or click to upload'}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>PNG, JPG, WEBP up to 10MB</div>
      </div>
      <style jsx>{`
        :global(.spin) { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
