const EXECUTABLE_PREFIXES = [
    '$ ', 'pnpm ', 'npm ', 'npx ', 'yarn ', 'node ', 'git ', 'python ', 'py ',
    'cargo ', 'go test', 'dotnet ', 'mvn ', 'gradle ', 'make ', 'bash ', 'sh ',
];
/** Split acceptance lines into runnable commands and human criteria. */
export function splitAcceptance(acceptance) {
    const commands = [];
    const criteria = [];
    for (const raw of acceptance) {
        const line = raw.trim();
        if (line === '')
            continue;
        const prefix = EXECUTABLE_PREFIXES.find(candidate => line.startsWith(candidate));
        if (prefix === undefined) {
            criteria.push(line);
            continue;
        }
        const command = prefix === '$ ' ? line.slice(2).trim() : line;
        if (command !== '')
            commands.push(command);
    }
    return { commands, criteria };
}
/** Required output contract for every verifier completion. */
export function verifierOutputContract() {
    return 'Verifier output contract: the report must start with 【PASS】 or 【FAIL】; on FAIL include the failing command and its log path. Never complete a verification task whose commands failed.';
}
/** Extra acceptance criteria derived from the constitution (deduplicated). */
export function constitutionCriteria(constitution) {
    return constitution === undefined ? [] : [...new Set(constitution.acceptance.filter(item => splitAcceptance([item]).commands.length === 0))];
}
