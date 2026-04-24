import './SafetyDrawer.css';

interface Props {
  alertEvent: string;
  onBack: () => void;
}

interface SafetySection {
  title: string;
  items: string[];
}

const SAFETY_DATA: Record<string, { headline: string; intro: string; sections: SafetySection[] }> = {
  'Tornado Warning': {
    headline: 'Tornado safety',
    intro: 'A tornado has been sighted or indicated by weather radar. Take shelter immediately.',
    sections: [
      { title: 'Right now', items: [
        'Move to a basement or interior room on the lowest floor',
        'Stay away from windows, doors, and outside walls',
        'Get under a sturdy table and cover your head',
        'If in a mobile home, leave immediately for a sturdy building',
      ]},
      { title: 'If you see a funnel cloud', items: [
        'Do not try to outrun it in a vehicle',
        'If in a car, park and get to a sturdy building or lie flat in a ditch',
        'Never shelter under a highway overpass',
      ]},
      { title: 'Evacuation readiness', items: [
        'Keep shoes and a flashlight by your bed',
        'Know where your nearest safe room or shelter is',
        'Have a battery-powered weather radio',
      ]},
    ],
  },
  'default': {
    headline: 'Weather safety',
    intro: 'Follow these safety guidelines to protect yourself and your family.',
    sections: [
      { title: 'Right now', items: [
        'Stay informed with the latest weather updates',
        'Keep a charged phone with emergency contacts ready',
        'Secure outdoor furniture and loose objects',
        'Have a flashlight and extra batteries accessible',
      ]},
      { title: 'If you see danger', items: [
        'Call 911 immediately',
        'Move to your designated safe area',
        'Stay away from windows and exterior doors',
      ]},
      { title: 'Evacuation readiness', items: [
        'Keep a go-bag: meds, documents, phone charger, water',
        'Back your car into the driveway, windows up',
        'Know two routes out of your neighborhood',
      ]},
    ],
  },
};

// Additional event mappings
const EVENT_MAP: Record<string, string> = {
  'Severe Thunderstorm Warning': 'default',
  'Flash Flood Warning': 'default',
  'Red Flag Warning': 'default',
  'Tornado Emergency': 'Tornado Warning',
};

export function SafetyDrawer({ alertEvent, onBack }: Props) {
  const key = EVENT_MAP[alertEvent] || alertEvent;
  const data = SAFETY_DATA[key] || SAFETY_DATA['default'];

  return (
    <div className="sd sb-scroll">
      {/* Sub-navigation */}
      <div className="sd-nav">
        <button className="sd-back" onClick={onBack} aria-label="Back">&lsaquo;</button>
        <div className="sd-nav-title">Safety</div>
      </div>

      {/* Warning-colored header */}
      <div className="sd-header">
        <div className="sd-header-badge sb-mono">&#9679; {alertEvent} &middot; active</div>
        <div className="sd-header-title">{data.headline}</div>
      </div>

      {/* Intro */}
      <div className="sd-intro">{data.intro}</div>

      {/* Safety sections */}
      {data.sections.map((section, si) => (
        <div
          key={si}
          className="sd-block"
          style={si < data.sections.length - 1 ? { borderBottom: '1px solid var(--line)' } : undefined}
        >
          <div className="sd-block-title sb-mono">{section.title}</div>
          <div className="sd-steps">
            {section.items.map((item, ii) => (
              <div key={ii} className="sd-step">
                <div className="sd-step-num">{ii + 1}</div>
                <div className="sd-step-text">{item}</div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Attribution */}
      <div className="sd-attrib">
        Guidance from NWS /safety &middot; Ready.gov
      </div>
    </div>
  );
}
