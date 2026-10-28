/**
 * 施法演出的时间窗口：不同事件给不同时长（破境 1200ms、换装 950ms），
 * 帧序号按窗口进度算，避免旧实现的固定 950ms 公式在 1200ms 破境时
 * 前 250ms 一直停在第 0 帧。
 */
/** 窗口内第几帧：进度均匀分布到 count 帧，越界钳制。 */
export function castFrameIndex(window, time, count) {
    if (count <= 0)
        return 0;
    const span = window.until - window.start;
    if (span <= 0)
        return count - 1;
    const progress = (time - window.start) / span;
    return Math.max(0, Math.min(count - 1, Math.floor(progress * count)));
}
