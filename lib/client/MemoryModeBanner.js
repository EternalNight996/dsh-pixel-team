import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** Module 2 UI guidance: prompt the user to install memory-eternal. */
import { useState } from 'react';
import css from './MemoryModeBanner.module.css';
const DISMISS_KEY = 'dsh-pixel-team:memory-banner-dismissed';
const INSTALL_URL = 'https://github.com/EternalNight996/memory-eternal';
export function MemoryModeBanner({ t }) {
    const [dismissed, setDismissed] = useState(() => {
        try {
            return window.localStorage.getItem(DISMISS_KEY) === '1';
        }
        catch {
            return false;
        }
    });
    if (dismissed)
        return null;
    return (_jsxs("div", { className: css.root, "data-memory-banner": true, children: [_jsx("span", { className: css.text, children: t('memory.banner') }), _jsx("a", { className: css.action, href: INSTALL_URL, target: "_blank", rel: "noreferrer", children: t('memory.install') }), _jsx("button", { type: "button", className: css.close, "aria-label": t('memory.dismiss'), onClick: () => {
                    try {
                        window.localStorage.setItem(DISMISS_KEY, '1');
                    }
                    catch { /* private mode */ }
                    setDismissed(true);
                }, children: "\u00D7" })] }));
}
