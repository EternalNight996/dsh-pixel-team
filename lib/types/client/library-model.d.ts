/** Deterministic lane layout for the library panel. */
import type { LibraryTeamView } from '../library-projection.ts';
export declare const CARD_W = 176;
export declare const CARD_H = 78;
export declare const GAP_X = 24;
export declare const GAP_Y = 16;
export interface LibraryLayout {
    readonly lanes: readonly {
        depth: number;
        cards: readonly {
            taskId: string;
            x: number;
            y: number;
        }[];
    }[];
    readonly edges: readonly {
        from: string;
        to: string;
        state: string;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    }[];
    readonly width: number;
    readonly height: number;
}
/** Lay tasks out by dependency depth, then wire edges between card centers. */
export declare function layoutLibrary(team: LibraryTeamView): LibraryLayout;
