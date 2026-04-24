import type { Alert } from '../../types/weather';
import { SeverityChip, nwsToSeverity } from '../shared/SeverityChip';
import './AlertDetail.css';

interface Props {
  alert: Alert;
  onBack: () => void;
}

const SEV_COLORS: Record<string, string> = {
  statement: 'var(--sev-statement)',
  advisory: 'var(--sev-advisory)',
  watch: 'var(--sev-watch)',
  warning: 'var(--sev-warning)',
  emergency: 'var(--sev-emergency)',
};

function getExpiryText(expires: string | null): { label: string; urgent: boolean } {
  if (!expires) return { label: 'No expiration set', urgent: false };
  const now = Date.now();
  const exp = new Date(expires).getTime();
  const diffMs = exp - now;

  if (diffMs <= 0) return { label: 'Expired', urgent: false };

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) {
    return { label: `Expires in ${hours}h ${minutes}m`, urgent: hours < 2 };
  }
  return { label: `Expires in ${minutes}m`, urgent: true };
}

export function AlertDetail({ alert, onBack }: Props) {
  const a = alert.properties;
  const sev = nwsToSeverity(a.severity);
  const barColor = SEV_COLORS[sev] ?? SEV_COLORS.statement;
  const expiry = getExpiryText(a.expires);

  // Split description into headline-like first sentence and body
  const descLines = a.description.split('\n').filter(Boolean);
  const instruction = descLines.length > 1
    ? descLines.slice(1).join('\n')
    : null;
  const mainDesc = descLines[0] || a.description;

  return (
    <div className="ad sb-scroll">
      {/* Sub-navigation header */}
      <div className="ad-nav">
        <button className="ad-back" onClick={onBack} aria-label="Back">&lsaquo;</button>
        <div className="ad-nav-title">Alert Detail</div>
        <div className="ad-nav-crumb">Alerts</div>
      </div>

      {/* Colored header with severity chip */}
      <div className="ad-header">
        <div className="ad-header-bar" style={{ background: barColor }} />
        <div className="ad-header-content">
          <SeverityChip level={sev} />
          <div className="ad-event">{a.event}</div>
          <div className="ad-area">{a.areaDesc}</div>
        </div>
      </div>

      {/* Expiration countdown */}
      <div className="ad-expiry">
        <div className="ad-expiry-icon">{expiry.urgent ? '⚠' : '⏲'}</div>
        <div className="ad-expiry-text">
          <span className="ad-expiry-time">{expiry.label}</span>
          {a.expires && (
            <span> &middot; {new Date(a.expires).toLocaleString('en-US', {
              weekday: 'short',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })}</span>
          )}
        </div>
      </div>

      {/* Headline */}
      {a.headline && (
        <>
          <div className="ad-sec"><span>Headline</span><div className="ad-sec-rule" /></div>
          <div className="ad-body">
            <div className="ad-headline">{a.headline}</div>
          </div>
        </>
      )}

      {/* Description */}
      <div className="ad-sec"><span>Description</span><div className="ad-sec-rule" /></div>
      <div className="ad-body">
        <div className="ad-description">{mainDesc}</div>
        {instruction && <div className="ad-instruction">{instruction}</div>}
      </div>

      {/* Action buttons */}
      <div className="ad-actions">
        <button className="ad-btn ad-btn--primary">What to do &mdash; safety tips</button>
        <div className="ad-btn-row">
          <button className="ad-btn ad-btn--secondary">Share</button>
          <button className="ad-btn ad-btn--secondary">View on map</button>
        </div>
      </div>

      {/* Footer */}
      <div className="ad-footer">
        &loz; National Weather Service<br />
        Alert ID: {alert.id}
      </div>
    </div>
  );
}
