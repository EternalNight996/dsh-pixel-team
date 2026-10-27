/**
 * 坐骑帧图集：56×40 逻辑像素，四帧步态；鸟形坐骑用两帧振翅。
 *
 * 和修士帧同一套规则：只画一次、缓存、运行时 drawImage。
 */
import type { MountModel } from '../../equipment-visuals.ts';
/** 一个坐骑族的四帧。 */
export type MountFrames = readonly HTMLCanvasElement[];
/** 一个坐骑族的四帧（缓存）。 */
export declare function mountFrames(kind: MountModel): MountFrames;
/** 尺寸导出，供场景对齐骑手。 */
export declare const MOUNT_W = 56;
export declare const MOUNT_H = 40;
