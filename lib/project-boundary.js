/**
 * Founding boundary: every generated project is self-contained under
 * projects/<slug>/; platform and other plugin files are off-limits.
 *
 * The protected list is derived from the workspace (package.json main/files/bin,
 * tsconfig files, existing source roots) and can be overridden by plugin
 * config, so it is not a hard-coded policy list.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
export const DEFAULT_PRODUCTS_DIR = 'projects';
/** Derive a filesystem-safe slug from the goal (keeps CJK letters/digits). */
export function projectSlug(goal) {
    const cleaned = goal
        .trim()
        .replace(/[\\/:*?"<>|]+/g, '-')
        .replace(/\s+/g, '-')
        .replace(/[^A-Za-z0-9_\-一-鿿]/g, '')
        .replace(/^-+|-+$/g, '')
        .slice(0, 32);
    return cleaned === '' ? 'project-' + Date.now().toString(36) : cleaned;
}
/** The workspace-relative product root for one founding goal. */
export function projectRootFor(goal, productsDir = DEFAULT_PRODUCTS_DIR) {
    return productsDir.replace(/\/+$/, '') + '/' + projectSlug(goal) + '/';
}
function normalize(relative) {
    return relative.replace(/\\/g, '/').replace(/^\.\//, '').replace(/\/+$/, '');
}
/** Is the path inside the project root? Rejects traversal and absolute paths. */
export function isInsideProject(root, path) {
    const base = normalize(root) + '/';
    const value = normalize(path);
    if (value.startsWith('/') || /^[A-Za-z]:/.test(value))
        return false;
    if (value.split('/').includes('..'))
        return false;
    return value === normalize(root) || value.startsWith(base);
}
/**
 * Protected platform paths for this workspace. Config boundary.forbidden
 * overrides the derivation; otherwise the list comes from the package
 * manifest and the files actually present in the workspace.
 */
export function derivePlatformPaths(workspace, override) {
    if (override !== undefined && override.length > 0) {
        return [...new Set(override.map(entry => normalize(entry)).filter(entry => entry !== ''))];
    }
    const protectedPaths = new Set();
    for (const name of ['package.json', 'pnpm-lock.yaml', 'pnpm-workspace.yaml', 'cordis.patch.yml', 'dsh-plugin.naming.json']) {
        if (existsSync(join(workspace, name)))
            protectedPaths.add(name);
    }
    try {
        const pkg = JSON.parse(readFileSync(join(workspace, 'package.json'), 'utf8'));
        for (const entry of pkg.files ?? []) {
            const value = normalize(String(entry));
            if (value === '')
                continue;
            // A bare directory entry (no file extension) is protected as a directory.
            protectedPaths.add(/\.[a-z0-9]+$/i.test(value) ? value : value + '/');
        }
        const addDirOf = (file) => {
            if (file === undefined)
                return;
            const value = normalize(file);
            const parent = dirname(value);
            if (parent !== '.' && parent !== '')
                protectedPaths.add(normalize(parent) + '/');
            else
                protectedPaths.add(value);
        };
        addDirOf(pkg.main);
        if (typeof pkg.bin === 'string')
            addDirOf(pkg.bin);
        else
            for (const bin of Object.values(pkg.bin ?? {}))
                addDirOf(String(bin));
    }
    catch { /* unreadable manifest: keep presence-based list */ }
    try {
        for (const name of readdirSync(workspace)) {
            if (/^tsconfig.*\.json$/.test(name))
                protectedPaths.add(name);
        }
    }
    catch { /* unreadable workspace */ }
    for (const dir of ['src', 'lib', 'scripts', 'assets', 'docs', 'release-notes']) {
        if (existsSync(join(workspace, dir)))
            protectedPaths.add(dir + '/');
    }
    return [...protectedPaths];
}
/** Is the path protected platform code? */
export function isPlatformPath(path, forbidden) {
    const value = normalize(path);
    return forbidden.some(entry => {
        const base = normalize(entry);
        return value === base || value.startsWith(base + '/');
    });
}
/** Paths that violate the boundary for a plan spec. */
export function boundaryViolations(inScope, root, forbidden) {
    const violations = [];
    for (const entry of inScope) {
        if (isPlatformPath(entry, forbidden)) {
            violations.push(entry + ' is a platform path');
            continue;
        }
        if (!isInsideProject(root, entry))
            violations.push(entry + ' is outside ' + root);
    }
    return violations;
}
/** Force every writable scope onto the project root (fallback-safe). */
export function confinePlanToProject(plan, root) {
    return {
        ...plan,
        tasks: plan.tasks.map(task => (task.inScope === undefined ? task : { ...task, inScope: [root] })),
    };
}
