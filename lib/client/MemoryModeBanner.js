import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** Module 2 UI: probe the memory brain, then show connected or an install hint. */
import { useEffect, useState } from 'react';
import css from './MemoryModeBanner.module.css';
const DISMISS_KEY = 'dsh-pixel-team:memory-banner-dismissed';
const INSTALL_URL = 'https://github.com/EternalNight996/memory-eternal';
const CACHE_MS = 60_000;
let cache;
async function checkMemory() {
    if (cache !== undefined && Date.now() - cache.at < CACHE_MS)
        return cache.state;
    try {
        const response = await fetch('/plugins/dsh-pixel-team/memory/status', { cache: 'no-store' });
        if (!response.ok)
            throw new Error('HTTP ' + response.status);
        const body = await response.json();
        const state = body.connected === true ? 'connected' : 'missing';
        cache = { at: Date.now(), state };
        return state;
    }
    catch {
        cache = { at: Date.now(), state: 'missing' };
        return 'missing';
    }
}
export function MemoryModeBanner({ t }) {
    const [dismissed, setDismissed] = useState(() => {
        try {
            return window.localStorage.getItem(DISMISS_KEY) === '1';
        }
        catch {
            return false;
        }
    });
    const [probe, setProbe] = useState('checking');
    useEffect(() => {
        let alive = true;
        void checkMemory().then(state => { if (alive)
            setProbe(state); });
        return () => { alive = false; };
    }, []);
    const dismiss = () => {
        try {
            window.localStorage.setItem(DISMISS_KEY, '1');
        }
        catch { /* private mode */ }
        setDismissed(true);
    };
    if (dismissed || probe === 'checking')
        return null;
    if (probe === 'connected') {
        return (_jsxs("div", { className: css.connected, "data-memory-banner": "connected", children: [_jsx("span", { className: css.dot, "aria-hidden": true }), _jsx("span", { className: css.text, children: t('memory.connected') }), _jsx("button", { type: "button", className: css.close, "aria-label": t('memory.dismiss'), onClick: dismiss, children: "\u00D7" })] }));
    }
    return (_jsxs("div", { className: css.root, "data-memory-banner": "missing", children: [_jsx("span", { className: css.text, children: t('memory.banner') }), _jsx("a", { className: css.action, href: INSTALL_URL, target: "_blank", rel: "noreferrer", children: t('memory.install') }), _jsx("button", { type: "button", className: css.close, "aria-label": t('memory.dismiss'), onClick: dismiss, children: "\u00D7" })] }));
}
