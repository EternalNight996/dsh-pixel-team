/**
 * 施法演出的时间窗口：不同事件给不同时长（破境 1200ms、换装 950ms），
 * 帧序号按窗口进度算，避免旧实现的固定 950ms 公式在 1200ms 破境时
 * 前 250ms 一直停在第 0 帧。
 */
export interface CastWindow {
    readonly start: number;
    readonly until: number;
}
/** 窗口内第几帧：进度均匀分布到 count 帧，越界钳制。 */
export declare function castFrameIndex(window: CastWindow, time: number, count: number): number;
