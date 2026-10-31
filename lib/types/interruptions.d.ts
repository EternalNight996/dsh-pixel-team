/** Task states that represent an interrupted attempt, not a quality failure. */
export declare function isInterruptedTask(task: {
    readonly status: string;
    readonly output?: string;
    readonly verdict?: string;
    readonly findings?: readonly unknown[];
}): boolean;
