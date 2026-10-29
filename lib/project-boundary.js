export const PRODUCTS_DIR = 'projects';
/** Workspace-relative paths that are never writable by a founding project. */
export const PLATFORM_PATHS = [
    'src/',
    'lib/',
    'scripts/',
    'assets/',
    'docs/',
    'release-notes/',
    'package.json',
    'tsconfig.json',
    'tsconfig.client.json',
    'cordis.patch.yml',
    'dsh-plugin.naming.json',
    'pnpm-lock.yaml',
    'pnpm-workspace.yaml',
];
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
export function projectRootFor(goal) {
    return PRODUCTS_DIR + '/' + projectSlug(goal) + '/';
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
/** Is the path one of the immutable platform locations? */
export function isPlatformPath(path) {
    const value = normalize(path);
    return PLATFORM_PATHS.some(entry => value === normalize(entry) || value.startsWith(normalize(entry) + '/'));
}
/** Paths that violate the boundary for a plan spec. */
export function boundaryViolations(inScope, root) {
    const violations = [];
    for (const entry of inScope) {
        if (isPlatformPath(entry)) {
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
