interface TechBadgeProps {
  label: string;
}

export default function TechBadge({ label }: TechBadgeProps) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        padding: '4px 10px',
        borderRadius: 20,
        background: 'rgba(255,255,255,0.06)',
        border: '0.5px solid rgba(255,255,255,0.12)',
        color: 'var(--text-secondary)',
        display: 'inline-block',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
}
