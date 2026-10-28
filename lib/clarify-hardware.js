export const CAMERA_CANDIDATES = [
    { name: '海康 MV-CS016', spec: 'GigE · 160 万像素 · 1/2.8"', note: '通用中速检测，线缆长、供电简单' },
    { name: '大恒 MER2', spec: 'USB3/GigE 可选 · 分辨率按型号', note: '工位灵活布站，短距离高带宽' },
];
export const LIGHT_CANDIDATES = [
    { name: '穹顶白光', spec: '漫射均匀 · 大面积', note: '抑制反光、曲面/金属件均匀照明' },
    { name: '环形光', spec: '近距离正面 · 高对比', note: '突出边缘、划痕与缺口类缺陷' },
];
export const ACCESSORY_CANDIDATES = [
    { name: '支架', spec: '按视野与工作距离定', note: '需给出相机靶面与视野宽高' },
    { name: '电源', spec: '24V 工业电源', note: '功率按相机/光源数量核算' },
    { name: '网线', spec: 'Cat6 屏蔽', note: 'GigE 相机长距离布线' },
];
/** One prompt/markdown block listing the candidate pool without a decision. */
export function hardwarePoolText() {
    const row = (item) => '- ' + item.name + '（' + item.spec + '）：' + item.note;
    return [
        '相机候选：', ...CAMERA_CANDIDATES.map(row),
        '光源候选：', ...LIGHT_CANDIDATES.map(row),
        '配件候选：', ...ACCESSORY_CANDIDATES.map(row),
        '注意：以上仅为清单，选型与采购由用户决定。',
    ].join('\n');
}
