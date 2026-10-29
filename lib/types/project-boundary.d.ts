import type { QuickStartPlan } from './quick-start.ts';
export declare const DEFAULT_PRODUCTS_DIR = "projects";
/** Derive a filesystem-safe slug from the goal (keeps CJK letters/digits). */
export declare function projectSlug(goal: string): string;
/** The workspace-relative product root for one founding goal. */
export declare function projectRootFor(goal: string, productsDir?: string): string;
/** Is the path inside the project root? Rejects traversal and absolute paths. */
export declare function isInsideProject(root: string, path: string): boolean;
/**
 * Protected platform paths for this workspace. Config boundary.forbidden
 * overrides the derivation; otherwise the list comes from the package
 * manifest and the files actually present in the workspace.
 */
export declare function derivePlatformPaths(workspace: string, override?: readonly string[]): string[];
/** Is the path protected platform code? */
export declare function isPlatformPath(path: string, forbidden: readonly string[]): boolean;
/** Paths that violate the boundary for a plan spec. */
export declare function boundaryViolations(inScope: readonly string[], root: string, forbidden: readonly string[]): string[];
/** Force every writable scope onto the project root (fallback-safe). */
export declare function confinePlanToProject(plan: QuickStartPlan, root: string): QuickStartPlan;
