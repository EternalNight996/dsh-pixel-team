export interface ResumeCheckpoint {
    readonly version: 1;
    readonly taskId: string;
    readonly attempt: number;
    readonly retry: number;
    readonly at: number;
}
export declare function readResumeCheckpoint(stateRoot: string, teamId: string): Promise<ResumeCheckpoint | undefined>;
export declare function writeResumeCheckpoint(stateRoot: string, teamId: string, checkpoint: ResumeCheckpoint): Promise<void>;
export declare function clearResumeCheckpoint(stateRoot: string, teamId: string): Promise<void>;
