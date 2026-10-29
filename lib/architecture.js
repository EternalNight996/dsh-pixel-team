function list(value) {
    return Array.isArray(value) ? [...value] : [];
}
/** Workspace-relative product root the architecture belongs to. */
export function architectureRoot(team) {
    const tasks = Array.isArray(team.tasks) ? team.tasks : [];
    const implementationRoot = tasks.find(task => task.kind === 'implementation' && Array.isArray(task.inScope) && task.inScope.length > 0)?.inScope?.[0];
    return implementationRoot ?? team.planProjectRoot;
}
/** Build the "core architecture" text from the confirmed requirement + DAG. */
export function buildArchitecture(team) {
    const clarification = team.clarification;
    const tasks = Array.isArray(team.tasks) ? team.tasks : [];
    const lines = ['# 核心架构 · ' + team.name];
    if (team.description !== undefined && team.description.trim() !== '') {
        lines.push('', '## 目标', team.description.trim());
    }
    if (clarification !== undefined) {
        const ui = clarification.ui ?? { reference: undefined, styles: [] };
        lines.push('', '## 技术选型 / 平台');
        lines.push('- 类型：' + (clarification.type ?? 'software') + ' · 规模：' + (clarification.scale ?? 'small') + ' · 模式：' + (clarification.mode ?? 'precision'));
        const platforms = list(clarification.platforms);
        lines.push('- 平台：' + (platforms.length === 0 ? '未指定' : platforms.join(' / ')));
        const hardware = list(clarification.hardwareList);
        if (hardware.length > 0)
            lines.push('- 硬件：' + hardware.join(' / '));
        const styles = list(ui.styles);
        lines.push('- 界面：' + (ui.reference ?? '无参考') + (styles.length === 0 ? '' : ' · 风格：' + styles.join(' / ')));
        const constraints = list(clarification.constraints);
        if (constraints.length > 0) {
            lines.push('', '## 约束（访谈）');
            for (const item of constraints)
                lines.push('- ' + item);
        }
        const excluded = list(clarification.excluded);
        if (excluded.length > 0) {
            lines.push('', '## 非目标 / 禁止');
            for (const item of excluded)
                lines.push('- 禁止：' + item);
        }
        const acceptance = list(clarification.acceptance);
        if (acceptance.length > 0) {
            lines.push('', '## 验收基线');
            for (const item of acceptance)
                lines.push('- ' + item);
        }
    }
    lines.push('', '## 模块骨架（任务图）');
    if (tasks.length === 0) {
        lines.push('- （尚未生成任务）');
    }
    else {
        for (const task of tasks) {
            const deps = Array.isArray(task.dependencies) && task.dependencies.length > 0 ? ' · 依赖 ' + task.dependencies.join(',') : '';
            lines.push('- ' + task.id + ' [' + (task.kind ?? 'work') + '] ' + task.subject + (task.assignee === undefined ? '' : ' · ' + task.assignee) + deps);
        }
    }
    const implementationRoot = tasks.find(task => task.kind === 'implementation' && Array.isArray(task.inScope) && task.inScope.length > 0)?.inScope?.[0];
    lines.push('', '## 产物与边界');
    lines.push('- 产物根目录：' + (implementationRoot ?? team.planProjectRoot ?? '(未设置)') + '（只写该目录，不改平台/插件代码）');
    return lines.join('\n');
}
