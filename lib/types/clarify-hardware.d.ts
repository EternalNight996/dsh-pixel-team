/**
 * Hardware candidate pool for the clarification form.
 *
 * The list is intentionally a candidate pool: model ids and one-line tradeoffs
 * only. The plugin never selects or buys hardware.
 */
export interface HardwareCandidate {
    readonly name: string;
    readonly spec: string;
    readonly note: string;
}
export declare const CAMERA_CANDIDATES: readonly HardwareCandidate[];
export declare const LIGHT_CANDIDATES: readonly HardwareCandidate[];
export declare const ACCESSORY_CANDIDATES: readonly HardwareCandidate[];
/** One prompt/markdown block listing the candidate pool without a decision. */
export declare function hardwarePoolText(): string;
