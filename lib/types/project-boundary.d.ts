/**
 * Founding boundary: every generated project is self-contained under
 * projects/<slug>/; platform and other plugin files are off-limits.
 */
import type { QuickStartPlan } from './quick-start.ts';
export declare const PRODUCTS_DIR = "projects";
/** Workspace-relative paths that are never writable by a founding project. */
export declare const PLATFORM_PATHS: readonly ["src/", "lib/", "scripts/", "assets/", "docs/", "release-notes/", "package.json", "tsconfig.json", "tsconfig.client.json", "cordis.patch.yml", "dsh-plugin.naming.json", "pnpm-lock.yaml", "pnpm-workspace.yaml"];
/** Derive a filesystem-safe slug from the goal (keeps CJK letters/digits). */
export declare function projectSlug(goal: string): string;
/** The workspace-relative product root for one founding goal. */
export declare function projectRootFor(goal: string): string;
/** Is the path inside the project root? Rejects traversal and absolute paths. */
export declare function isInsideProject(root: string, path: string): boolean;
/** Is the path one of the immutable platform locations? */
export declare function isPlatformPath(path: string): boolean;
/** Paths that violate the boundary for a plan spec. */
export declare function boundaryViolations(inScope: readonly string[], root: string): string[];
/** Force every writable scope onto the project root (fallback-safe). */
export declare function confinePlanToProject(plan: QuickStartPlan, root: string): QuickStartPlan;
