import { SBLogo } from '../shared/SBLogo';
import './ModeBar.css';

export type ModeId = 'home' | 'radar';

interface Props {
  active: ModeId;
  onChange: (id: ModeId) => void;
  alertCount?: number;
}

export function ModeBar({ active, onChange, alertCount = 0 }: Props) {
  return (
    <nav className="mode-bar">
      <button className={`mode-btn${active === 'home' ? ' on' : ''}`} onClick={() => onChange('home')}>
        <SBLogo size={18} color={active === 'home' ? 'var(--blue)' : 'var(--ink-mute)'} />
        <span className="mode-label">Home</span>
        {alertCount > 0 && active !== 'home' && <span className="mode-badge">{alertCount}</span>}
      </button>
      <button className={`mode-btn${active === 'radar' ? ' on' : ''}`} onClick={() => onChange('radar')}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active === 'radar' ? 'var(--blue)' : 'var(--ink-mute)'} strokeWidth="1.6" strokeLinecap="round">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" fill={active === 'radar' ? 'var(--blue)' : 'var(--ink-mute)'} />
          <line x1="12" y1="3" x2="12" y2="7" />
        </svg>
        <span className="mode-label">Radar</span>
      </button>
    </nav>
  );
}
