import { Component } from 'react'
import type { ReactNode, ErrorInfo } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error('Skybureau error:', error, info); }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 40, fontFamily: 'Inter Tight, sans-serif', color: '#1a1613', background: '#f6f2ea', minHeight: '100vh' }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>Something went wrong</h2>
          <p style={{ fontSize: 14, color: '#807567', marginBottom: 16 }}>{this.state.error.message}</p>
          <button onClick={() => { this.setState({ error: null }); window.location.reload(); }}
            style={{ padding: '10px 20px', borderRadius: 8, border: 'none', background: '#1a1613', color: '#f6f2ea', fontSize: 14, cursor: 'pointer' }}>
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
)
