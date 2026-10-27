/**
 * 坐骑帧图集：56×40 逻辑像素，四帧步态；鸟形坐骑用两帧振翅。
 *
 * 和修士帧同一套规则：只画一次、缓存、运行时 drawImage。
 */
const INK = '#16110e';
const GOLD = '#f2c14e';
const W = 56;
const H = 40;
const PALETTES = {
    beast: { body: '#3d5c52', lit: '#5c8272', dark: '#2a3f39', trim: '#7a3f52', horn: '#e8c46a' },
    qilin: { body: '#c9a24a', lit: '#e8c46a', dark: '#8f6f2c', trim: '#7a3f52', horn: '#f2c14e', glow: 'rgba(255,170,80,0.22)' },
    dragon: { body: '#3f6a8a', lit: '#5f8fb2', dark: '#2a4a63', trim: '#f2c14e', horn: '#f2c14e', glow: 'rgba(120,200,255,0.20)' },
    crane: { body: '#f2f5f0', lit: '#ffffff', dark: '#cfdad6', trim: '#d43a3a', horn: '#f2c14e' },
    phoenix: { body: '#e06a2a', lit: '#f2a23a', dark: '#a8431a', trim: '#d43a3a', horn: '#f2c14e', glow: 'rgba(255,140,60,0.22)' },
    dao: { body: '#5a4a7a', lit: '#8a74b0', dark: '#3a2f52', trim: '#c39bff', horn: '#e6d9ff', glow: 'rgba(180,140,255,0.22)' },
};
function px(g, x, y, w, h, c) {
    g.fillStyle = c;
    g.fillRect(x, y, w, h);
}
function outline(g) {
    const img = g.getImageData(0, 0, W, H);
    const d = img.data;
    const a = (x, y) => (x < 0 || y < 0 || x >= W || y >= H) ? 0 : d[(y * W + x) * 4 + 3];
    const add = [];
    for (let y = 0; y < H; y += 1)
        for (let x = 0; x < W; x += 1) {
            if (a(x, y) > 0)
                continue;
            if (a(x - 1, y) > 0 || a(x + 1, y) > 0 || a(x, y - 1) > 0 || a(x, y + 1) > 0)
                add.push([x, y]);
        }
    const n = parseInt(INK.slice(1), 16);
    for (const [x, y] of add) {
        const i = (y * W + x) * 4;
        d[i] = (n >> 16) & 255;
        d[i + 1] = (n >> 8) & 255;
        d[i + 2] = n & 255;
        d[i + 3] = 255;
    }
    g.putImageData(img, 0, 0);
}
/** 四足：兽 / 麒麟 / 龙 / 道兽。 */
function quadruped(g, p, frame, kind) {
    // 四帧必须帧帧不同：接触帧靠前后腿交替（±1），过渡帧靠身体起伏（lift）。
    // 旧的 [0,1,0,-1] 步态里第 0/2 帧像素完全重合，四帧退化成两帧。
    const swing = [1, 0, -1, 0][frame] ?? 0;
    const lift = [0, -1, 0, 1][frame] ?? 0;
    const glow = p.glow;
    if (glow !== undefined) {
        g.fillStyle = glow;
        g.beginPath();
        g.ellipse(28, 30, 24, 6, 0, 0, Math.PI * 2);
        g.fill();
    }
    // 四腿：前后腿反向摆 1px（接触帧拉开、过渡帧并拢），蹄子跟着腿走。
    // 旧写法只改腿根高度、蹄子钉死，腿根被躯干盖住，四帧看着一模一样。
    const hindX = 12 - swing;
    const frontX = 33 + swing;
    px(g, hindX, 26, 4, 11, p.dark);
    px(g, hindX + 8, 26, 4, 11, p.dark);
    px(g, frontX, 26, 4, 11, p.dark);
    px(g, frontX + 8, 26, 4, 11, p.dark);
    px(g, hindX - 1, 36, 6, 2, INK);
    px(g, hindX + 7, 36, 6, 2, INK);
    px(g, frontX - 1, 36, 6, 2, INK);
    px(g, frontX + 7, 36, 6, 2, INK);
    // 躯干
    px(g, 8, 16 - lift, 40, 12, p.body);
    px(g, 10, 16 - lift, 34, 3, p.lit);
    px(g, 8, 25 - lift, 40, 3, p.dark);
    // 尾
    px(g, 4, 14 - lift, 4, 3, p.body);
    px(g, 2, 16 - lift, 3, 2, p.horn);
    // 颈与头
    px(g, 44, 12 - lift, 5, 12, p.body);
    px(g, 46, 8 - lift, 8, 7, p.lit);
    px(g, 52, 10 - lift, 2, 2, '#ffe9a8');
    // 角/鬃
    if (kind === 'qilin' || kind === 'dragon' || kind === 'dao') {
        px(g, 46, 3 - lift, 2, 6, p.horn);
        px(g, 49, 4 - lift, 2, 4, p.horn);
    }
    if (kind === 'dragon' || kind === 'dao') {
        px(g, 50, 12 - lift, 4, 1, p.horn);
        for (let i = 0; i < 4; i += 1)
            px(g, 40 + i * 3, 9 - lift + i, 2, 2, p.horn);
    }
    // 鞍
    px(g, 22, 12 - lift, 14, 4, p.trim);
    px(g, 22, 12 - lift, 14, 1, GOLD);
}
/** 鸟形：仙鹤 / 凤凰。 */
function bird(g, p, frame, kind) {
    const flap = [0, -3, 0, 2][frame] ?? 0;
    const glow = p.glow;
    if (glow !== undefined) {
        g.fillStyle = glow;
        g.beginPath();
        g.ellipse(28, 30, 24, 6, 0, 0, Math.PI * 2);
        g.fill();
    }
    // 尾羽
    px(g, 6, 20, 10, 3, p.dark);
    px(g, 3, 22, 8, 2, p.trim);
    if (kind === 'phoenix') {
        px(g, 4, 16, 6, 3, p.trim);
        px(g, 2, 18, 6, 2, p.horn);
    }
    // 身体
    px(g, 16, 16, 26, 12, p.body);
    px(g, 18, 16, 22, 3, p.lit);
    px(g, 16, 25, 26, 2, p.dark);
    // 翅膀
    px(g, 22, 12 + flap, 16, 5, p.lit);
    if (kind === 'phoenix')
        px(g, 20, 10 + flap, 20, 3, p.trim);
    // 颈与头
    px(g, 42, 8, 4, 12, p.body);
    px(g, 44, 4, 7, 6, p.lit);
    px(g, 50, 6, 3, 2, p.horn);
    if (kind === 'crane') {
        px(g, 47, 2, 3, 3, '#d43a3a');
    }
    // 腿
    px(g, 24, 27, 2, 10, p.dark);
    px(g, 33, 27, 2, 10, p.dark);
    px(g, 22, 36, 6, 2, p.horn);
    px(g, 31, 36, 6, 2, p.horn);
    // 鞍
    px(g, 24, 12, 12, 4, p.trim);
    px(g, 24, 12, 12, 1, GOLD);
}
function makeFrame(p, frame, kind) {
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const g = canvas.getContext('2d');
    if (g === null)
        throw new Error('mount: 2d context unavailable');
    g.imageSmoothingEnabled = false;
    if (kind === 'crane' || kind === 'phoenix')
        bird(g, p, frame, kind);
    else
        quadruped(g, p, frame, kind);
    outline(g);
    return canvas;
}
const cache = new Map();
/** 一个坐骑族的四帧（缓存）。 */
export function mountFrames(kind) {
    const hit = cache.get(kind);
    if (hit !== undefined)
        return hit;
    const palette = PALETTES[kind] ?? PALETTES.beast;
    const frames = [0, 1, 2, 3].map(frame => makeFrame(palette, frame, kind));
    cache.set(kind, frames);
    return frames;
}
/** 尺寸导出，供场景对齐骑手。 */
export const MOUNT_W = W;
export const MOUNT_H = H;
