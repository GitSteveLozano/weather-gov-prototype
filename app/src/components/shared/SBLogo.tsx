interface LogoProps { size?: number; color?: string; }

export function SBLogo({ size = 20, color }: LogoProps) {
  const c = color || 'var(--ink)';
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-label="Skybureau">
      <rect x="1" y="1" width="18" height="18" stroke={c} strokeWidth="1.4" fill="none" />
      <path d="M10 4v12M4 10h12" stroke={c} strokeWidth="0.8" />
      <circle cx="10" cy="10" r="3.5" stroke={c} strokeWidth="1.4" fill="none" />
      <circle cx="10" cy="10" r="1" fill={c} />
    </svg>
  );
}

export function SBWordmark({ size = 15, color }: { size?: number; color?: string }) {
  const c = color || 'var(--ink)';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font)', fontWeight: 600, fontSize: size, color: c, letterSpacing: -0.3 }}>
      <SBLogo size={size + 5} color={c} />
      <span>skybureau</span>
    </div>
  );
}
