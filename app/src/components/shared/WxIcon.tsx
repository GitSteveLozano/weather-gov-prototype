export type WxCondition = 'clear-day' | 'clear-night' | 'partly-cloudy-day' | 'cloudy' | 'rain' | 'thunder' | 'snow' | 'fog' | 'wind';

export function WxIcon({ kind = 'clear-day', size = 24, color, stroke: sw = 1.6 }: { kind?: WxCondition; size?: number; color?: string; stroke?: number }) {
  const c = color || 'currentColor';
  const s = { width: size, height: size, display: 'inline-block' as const, flexShrink: 0 };
  const P = (d: string) => <path d={d} stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none" />;
  switch (kind) {
    case 'clear-day': return (<svg viewBox="0 0 24 24" style={s} fill="none"><circle cx="12" cy="12" r="4" stroke={c} strokeWidth={sw} fill="none" />{[0,45,90,135,180,225,270,315].map(a=>{const x1=12+Math.cos(a*Math.PI/180)*6.5,y1=12+Math.sin(a*Math.PI/180)*6.5,x2=12+Math.cos(a*Math.PI/180)*8.5,y2=12+Math.sin(a*Math.PI/180)*8.5;return<line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth={sw} strokeLinecap="round"/>;})}</svg>);
    case 'clear-night': return (<svg viewBox="0 0 24 24" style={s} fill="none">{P('M18 14.5A7 7 0 0 1 9.5 6a7 7 0 1 0 8.5 8.5z')}</svg>);
    case 'partly-cloudy-day': return (<svg viewBox="0 0 24 24" style={s} fill="none"><circle cx="8" cy="9" r="3" stroke={c} strokeWidth={sw} fill="none"/>{[-45,0,45,-90].map(a=>{const x1=8+Math.cos(a*Math.PI/180)*4.5,y1=9+Math.sin(a*Math.PI/180)*4.5,x2=8+Math.cos(a*Math.PI/180)*6,y2=9+Math.sin(a*Math.PI/180)*6;return<line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth={sw} strokeLinecap="round"/>;})}{P('M7 17a3 3 0 0 1 0-6 4 4 0 0 1 7.5 0.5A3 3 0 0 1 16 17H7z')}</svg>);
    case 'cloudy': return (<svg viewBox="0 0 24 24" style={s} fill="none">{P('M6 17a3.5 3.5 0 0 1 0-7 5 5 0 0 1 9.5 0.5A3.5 3.5 0 0 1 17 17H6z')}</svg>);
    case 'rain': return (<svg viewBox="0 0 24 24" style={s} fill="none">{P('M6 13a3.5 3.5 0 0 1 0-7 5 5 0 0 1 9.5 0.5A3.5 3.5 0 0 1 17 13H6z')}{P('M8 16l-1 3M12 16l-1 3M16 16l-1 3')}</svg>);
    case 'thunder': return (<svg viewBox="0 0 24 24" style={s} fill="none">{P('M6 12a3.5 3.5 0 0 1 0-7 5 5 0 0 1 9.5 0.5A3.5 3.5 0 0 1 17 12H6z')}{P('M12 13l-2.5 4h3L10 21l3.5-5h-3l2-3z')}</svg>);
    case 'snow': return (<svg viewBox="0 0 24 24" style={s} fill="none">{P('M6 12a3.5 3.5 0 0 1 0-7 5 5 0 0 1 9.5 0.5A3.5 3.5 0 0 1 17 12H6z')}{P('M8 16v3M12 15v4M16 16v3')}</svg>);
    case 'fog': return (<svg viewBox="0 0 24 24" style={s} fill="none">{P('M3 9h18M5 13h14M3 17h18')}</svg>);
    case 'wind': return (<svg viewBox="0 0 24 24" style={s} fill="none">{P('M3 8h13a2.5 2.5 0 1 0-2.5-2.5M3 12h17a3 3 0 1 1-3 3M3 16h9')}</svg>);
    default: return <div style={s} />;
  }
}

export function forecastToCondition(text: string): WxCondition {
  const t = (text || '').toLowerCase();
  if (t.includes('thunder') || t.includes('storm')) return 'thunder';
  if (t.includes('snow') || t.includes('blizzard')) return 'snow';
  if (t.includes('rain') || t.includes('shower') || t.includes('drizzle')) return 'rain';
  if (t.includes('fog') || t.includes('haze') || t.includes('mist')) return 'fog';
  if (t.includes('wind')) return 'wind';
  if (t.includes('partly cloudy')) return 'partly-cloudy-day';
  if (t.includes('cloudy') || t.includes('overcast')) return 'cloudy';
  if (t.includes('night') || t.includes('tonight')) return 'clear-night';
  if (t.includes('sunny') || t.includes('clear')) return 'clear-day';
  return 'partly-cloudy-day';
}
