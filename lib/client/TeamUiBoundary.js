import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** Renderer guard for the hall/plan UI: a bad staged plan must not kill DSH. */
import { Component } from 'react';
export class TeamUiBoundary extends Component {
    state = {};
    static getDerivedStateFromError(error) {
        return { error: error instanceof Error ? error.message : String(error) };
    }
    componentDidCatch(error, info) {
        console.error('agent-teams UI error', error, info.componentStack);
    }
    render() {
        if (this.state.error !== undefined) {
            return (_jsxs("div", { style: { position: 'fixed', right: 16, bottom: 16, zIndex: 13000, maxWidth: 360, padding: 12, border: '1px solid #a55', borderRadius: 8, background: '#1d232c', color: '#ffd7d7', fontSize: 12 }, children: ["\u5B97\u95E8\u754C\u9762\u52A0\u8F7D\u5931\u8D25\uFF1A", this.state.error, _jsx("button", { type: "button", style: { marginLeft: 8 }, onClick: () => { this.setState({ error: undefined }); }, children: "\u91CD\u8BD5" })] }));
        }
        return this.props.children;
    }
}
