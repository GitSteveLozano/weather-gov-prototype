import type { TabId } from '../../App';
import './TabBar.css';

const tabs: { id: TabId; icon: string; label: string }[] = [
  { id: 'now', icon: '🌤️', label: 'Now' },
  { id: 'radar', icon: '📡', label: 'Radar' },
  { id: 'week', icon: '📅', label: 'Week' },
  { id: 'forecast', icon: '🔬', label: 'Forecast' },
];

interface Props {
  active: TabId;
  onChange: (id: TabId) => void;
}

export function TabBar({ active, onChange }: Props) {
  return (
    <nav className="tab-bar">
      {tabs.map(t => (
        <button
          key={t.id}
          className={`tab-btn${active === t.id ? ' on' : ''}`}
          onClick={() => onChange(t.id)}
        >
          <span className={`tab-ico${active === t.id ? '' : ' dim'}`}>{t.icon}</span>
          <span className={`tab-lbl${active === t.id ? ' on' : ''}`}>{t.label}</span>
          <span className={`tab-pip${active === t.id ? '' : ' hidden'}`} />
        </button>
      ))}
    </nav>
  );
}
