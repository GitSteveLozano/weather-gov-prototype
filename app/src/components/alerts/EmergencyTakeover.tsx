import type { Alert } from '../../types/weather';
import './EmergencyTakeover.css';

interface Props {
  alert: Alert;
  onDismiss: () => void;
}

export function EmergencyTakeover({ alert, onDismiss }: Props) {
  const a = alert.properties;

  const issuedStr = a.expires
    ? `Until ${new Date(a.expires).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`
    : '';

  // Extract first sentence as headline, rest as body
  const sentences = a.description.split(/(?<=\.)\s+/);
  const headline = sentences[0] || a.description;
  const body = sentences.slice(1).join(' ');

  return (
    <div className="et-takeover">
      {/* Animated hazard bars */}
      <div className="et-bars">
        <div className="et-bars-inner" />
      </div>

      <div className="et-spacer" />

      <div className="et-badge-wrap">
        <div className="et-badge sb-mono">! {a.event}</div>
      </div>

      <div className="et-content">
        {issuedStr && (
          <div className="et-issued sb-mono">{issuedStr}</div>
        )}
        <div className="et-headline">{headline}</div>

        <div className="et-action-card">
          <div className="et-action-label sb-mono">Take action now</div>
          <div className="et-action-text">
            {body || 'Move to an interior room on the lowest floor. Avoid windows. If in a mobile home or vehicle, leave immediately for substantial shelter.'}
          </div>
        </div>

        <div className="et-meta sb-mono">
          AREAS: {a.areaDesc}
        </div>
      </div>

      <div className="et-buttons">
        <button className="et-btn-shelter">See shelter map</button>
        <button className="et-btn-dismiss" onClick={onDismiss}>I'm safe &middot; Dismiss</button>
      </div>
    </div>
  );
}
