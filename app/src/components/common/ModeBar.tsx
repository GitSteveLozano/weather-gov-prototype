import { SBLogo } from '../shared/SBLogo';
import './ModeBar.css';

export type ModeId = 'home' | 'radar' | 'more';

interface Props {
  active: ModeId;
  onChange: (id: ModeId) => void;
}

export function ModeBar({ active, onChange }: Props) {
  return (
    <nav className="mb">
      <button className={`mb-btn${active === 'home' ? ' on' : ''}`} onClick={() => onChange('home')}>
        <SBLogo size={18} color={active === 'home' ? 'var(--blue)' : 'var(--ink-mute)'} />
        <span className="mb-label">Home</span>
      </button>
      <button className={`mb-btn${active === 'radar' ? ' on' : ''}`} onClick={() => onChange('radar')}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active === 'radar' ? 'var(--blue)' : 'var(--ink-mute)'} strokeWidth="1.6" strokeLinecap="round">
          <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" fill={active === 'radar' ? 'var(--blue)' : 'var(--ink-mute)'} /><line x1="12" y1="3" x2="12" y2="7" />
        </svg>
        <span className="mb-label">Radar</span>
      </button>
      <button className={`mb-btn${active === 'more' ? ' on' : ''}`} onClick={() => onChange('more')}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill={active === 'more' ? 'var(--blue)' : 'var(--ink-mute)'}>
          <circle cx="5.5" cy="12" r="1.8" />
          <circle cx="12" cy="12" r="1.8" />
          <circle cx="18.5" cy="12" r="1.8" />
        </svg>
        <span className="mb-label">More</span>
      </button>
    </nav>
  );
}
