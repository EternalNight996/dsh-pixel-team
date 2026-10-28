/**
 * Memory recall proxy for team members (module 2).
 *
 * memory-eternal is an optional sibling plugin; the endpoint is configurable
 * and every failure is returned as text so a member turn never crashes.
 */
export declare const DEFAULT_MEMORY_ENDPOINT = "http://127.0.0.1:7999/memory-eternal/api/recall";
/** Resolve the configured endpoint, falling back to the local default. */
export declare function resolveMemoryEndpoint(endpoint: string | undefined): string;
/**
 * Is a memory brain reachable? A reachable recall endpoint (any 2xx) counts as
 * installed; a missing plugin, dead server or timeout counts as missing.
 */
export declare function probeMemory(endpoint?: string, signal?: AbortSignal): Promise<boolean>;
export interface MemoryRecallHit {
    readonly text: string;
    readonly source: string;
}
/**
 * Query the configured memory endpoint.
 * @throws when the endpoint is unreachable or returns an unusable body.
 */
export declare function recallMemory(endpoint: string | undefined, query: string, limit: number, signal?: AbortSignal): Promise<MemoryRecallHit>;
