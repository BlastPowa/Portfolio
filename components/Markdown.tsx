import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { CSSProperties } from 'react';

const heading = (size: number, mt: number): CSSProperties => ({
  fontFamily: 'var(--font-display)',
  fontSize: size,
  fontWeight: 600,
  color: '#ffffff',
  margin: `${mt}px 0 12px`,
  lineHeight: 1.25,
});

export default function Markdown({ children }: { children: string }) {
  return (
    <div style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.8 }}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h1 style={heading(30, 32)}>{children}</h1>,
          h2: ({ children }) => <h2 style={heading(24, 28)}>{children}</h2>,
          h3: ({ children }) => <h3 style={heading(19, 24)}>{children}</h3>,
          p: ({ children }) => <p style={{ margin: '0 0 16px' }}>{children}</p>,
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8', textDecoration: 'none' }}>
              {children}
            </a>
          ),
          ul: ({ children }) => <ul style={{ margin: '0 0 16px', paddingLeft: 22, display: 'grid', gap: 6 }}>{children}</ul>,
          ol: ({ children }) => <ol style={{ margin: '0 0 16px', paddingLeft: 22, display: 'grid', gap: 6 }}>{children}</ol>,
          li: ({ children }) => <li style={{ lineHeight: 1.7 }}>{children}</li>,
          blockquote: ({ children }) => (
            <blockquote style={{ margin: '0 0 16px', padding: '4px 16px', borderLeft: '3px solid rgba(0,212,255,0.4)', color: 'var(--text-muted)' }}>
              {children}
            </blockquote>
          ),
          code: ({ className, children }) => {
            const isBlock = Boolean(className);
            if (isBlock) {
              return <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#8ee7b0' }}>{children}</code>;
            }
            return (
              <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13, background: 'rgba(255,255,255,0.08)', padding: '2px 6px', borderRadius: 4, color: '#e5e7eb' }}>
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre style={{ margin: '0 0 18px', padding: 16, background: '#0a0a0d', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: 12, overflow: 'auto', lineHeight: 1.6 }}>
              {children}
            </pre>
          ),
          table: ({ children }) => (
            <div style={{ overflowX: 'auto', margin: '0 0 18px' }}>
              <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 14 }}>{children}</table>
            </div>
          ),
          th: ({ children }) => <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.15)', color: '#ffffff', fontWeight: 600 }}>{children}</th>,
          td: ({ children }) => <td style={{ padding: '8px 12px', borderBottom: '0.5px solid rgba(255,255,255,0.08)' }}>{children}</td>,
          hr: () => <hr style={{ border: 'none', borderTop: '0.5px solid rgba(255,255,255,0.12)', margin: '24px 0' }} />,
          img: ({ src, alt }) => <img src={typeof src === 'string' ? src : ''} alt={alt ?? ''} style={{ maxWidth: '100%', borderRadius: 12, margin: '0 0 16px' }} />,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
