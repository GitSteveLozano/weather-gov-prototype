import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';

export class ScreenGuard extends Component<{ name: string; children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error(`Screen crash [${this.props.name}]:`, error, info); }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 40, fontFamily: 'var(--font)', color: 'var(--ink)', background: 'var(--paper)', minHeight: '100dvh' }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Screen error</h2>
          <p style={{ fontSize: 13, color: 'var(--ink-mute)', marginBottom: 4 }}>{this.props.name}</p>
          <p style={{ fontSize: 13, color: '#d63a2f', marginBottom: 16 }}>{this.state.error.message}</p>
          <button onClick={() => this.setState({ error: null })} style={{ padding: '8px 16px', borderRadius: 6, border: 'none', background: 'var(--ink)', color: 'var(--paper)', fontSize: 13, cursor: 'pointer' }}>Dismiss</button>
        </div>
      );
    }
    return this.props.children;
  }
}
