/** Renderer guard for the hall/plan UI: a bad staged plan must not kill DSH. */
import { Component, type ErrorInfo, type ReactNode } from 'react'

export class TeamUiBoundary extends Component<{ readonly children: ReactNode }, { readonly error?: string }> {
  state: { readonly error?: string } = {}

  static getDerivedStateFromError(error: unknown): { error: string } {
    return { error: error instanceof Error ? error.message : String(error) }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('agent-teams UI error', error, info.componentStack)
  }

  render(): ReactNode {
    if (this.state.error !== undefined) {
      return (
        <div style={{ position: 'fixed', right: 16, bottom: 16, zIndex: 13000, maxWidth: 360, padding: 12, border: '1px solid #a55', borderRadius: 8, background: '#1d232c', color: '#ffd7d7', fontSize: 12 }}>
          宗门界面加载失败：{this.state.error}
          <button type="button" style={{ marginLeft: 8 }} onClick={() => { this.setState({ error: undefined }) }}>重试</button>
        </div>
      )
    }
    return this.props.children
  }
}
