/**
 * 修士帧图集：参数化绘制一次，运行时只做 drawImage。
 *
 * 每个角色 48×92 逻辑像素（1 逻辑像素 ≈ 1 屏像素），按道途配色生成
 * 坐 / 走 / 骑 三套帧。帧一旦生成就缓存——每帧上百次 fillRect 只在首帧发生，
 * 之后每次重绘只有 1 次 drawImage。
 */
import type { RoleVisual } from '../../role-visuals.ts';
/** 画布尺寸：与旧版 92px 身形同高，缩放到场景时比例不变。 */
export declare const FRAME_W = 48;
export declare const FRAME_H = 92;
/** 一个角色的三套动作帧。 */
export interface CharacterFrames {
    readonly sit: readonly HTMLCanvasElement[];
    readonly walk: readonly HTMLCanvasElement[];
    readonly ride: readonly HTMLCanvasElement[];
    readonly cast: readonly HTMLCanvasElement[];
}
/** 生成（并缓存）一个道途的三套帧。 */
export declare function characterFrames(roleKey: string, visual: RoleVisual | undefined, isLeader: boolean): CharacterFrames;
/** 测试/热重载用：清空帧缓存。 */
export declare function clearFrameCache(): void;
