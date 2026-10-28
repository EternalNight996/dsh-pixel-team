export interface MemoryRecallHit {
    readonly text: string;
    readonly source: string;
}
/**
 * Query the configured memory endpoint.
 * @throws when the endpoint is unreachable or returns an unusable body.
 */
export declare function recallMemory(endpoint: string | undefined, query: string, limit: number, signal?: AbortSignal): Promise<MemoryRecallHit>;
