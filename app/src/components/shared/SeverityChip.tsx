export type SeverityLevel = 'statement' | 'advisory' | 'watch' | 'warning' | 'emergency';

const MAP: Record<SeverityLevel, { bg: string; fg: string; label: string }> = {
  statement: { bg: 'var(--sev-statement-bg)', fg: '#5a5347', label: 'Statement' },
  advisory: { bg: 'var(--sev-advisory-bg)', fg: '#7a5a0a', label: 'Advisory' },
  watch: { bg: 'var(--sev-watch-bg)', fg: '#8a3a0e', label: 'Watch' },
  warning: { bg: 'var(--sev-warning-bg)', fg: '#7a1e17', label: 'Warning' },
  emergency: { bg: 'var(--sev-emergency-bg)', fg: '#5a0e32', label: 'Emergency' },
};

export function SeverityChip({ level = 'advisory', children, small }: { level?: SeverityLevel; children?: React.ReactNode; small?: boolean }) {
  const m = MAP[level];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font)', fontWeight: 600, fontSize: small ? 10 : 11, letterSpacing: 0.8, textTransform: 'uppercase', padding: small ? '2px 6px' : '3px 8px', borderRadius: 3, background: m.bg, color: m.fg }}>
      <span style={{ width: 5, height: 5, borderRadius: 5, background: m.fg }} />
      {children || m.label}
    </span>
  );
}

export function nwsToSeverity(sev: string): SeverityLevel {
  switch (sev) { case 'Extreme': return 'emergency'; case 'Severe': return 'warning'; case 'Moderate': return 'watch'; case 'Minor': return 'advisory'; default: return 'statement'; }
}
