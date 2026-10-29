#!/usr/bin/env node
/**
 * Pre-tag release guard: the installed package is built from git, so every
 * generated lib/ file must be tracked and every relative import must resolve.
 * 0.1.44 shipped without lib/architecture.js; this guard catches that class.
 */
import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'

const root = process.cwd()
const libRoot = join(root, 'lib')

function walk(dir) {
  const out = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) out.push(...walk(full))
    else out.push(full)
  }
  return out
}

if (!existsSync(libRoot)) {
  console.error('release-guard: lib/ is missing; run pnpm build first')
  process.exit(1)
}

const files = walk(libRoot).map(file => relative(root, file).replace(/\\/g, '/'))
const tracked = new Set(execFileSync('git', ['ls-files', '-z', 'lib'], { encoding: 'utf8' }).split('\0').filter(Boolean))
const untracked = files.filter(file => !tracked.has(file))
const dirty = execFileSync('git', ['status', '--porcelain', '--', 'lib'], { encoding: 'utf8' }).trim()
// Task products are runtime data, never part of a plugin release.
const headFiles = execFileSync('git', ['show', '--name-only', '--format=', 'HEAD'], { encoding: 'utf8' }).split('\n')
const committedProducts = headFiles.filter(path => path.startsWith('projects/'))

const missing = []
for (const file of files.filter(file => file.endsWith('.js'))) {
  const text = readFileSync(join(root, file), 'utf8')
  const pattern = /(?:from\s+|import\s*\(\s*)(['"])(\.{1,2}\/[^'"]+)\1/g
  for (const match of text.matchAll(pattern)) {
    // CSS modules are resolved by the host client bundler, not by Node on disk.
    if (/\.css$/.test(match[2])) continue
    const target = join(dirname(join(root, file)), match[2])
    const candidates = [target, target + '.js', target + '.d.ts', join(target, 'index.js')]
    if (!candidates.some(candidate => existsSync(candidate))) missing.push(file + ' -> ' + match[2])
  }
}

const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
const declaresLib = Array.isArray(pkg.files) && pkg.files.some(entry => String(entry).replace(/^\//, '').replace(/\/$/, '') === 'lib')
const problems = []
if (untracked.length > 0) problems.push('untracked lib files (git will not ship them): ' + untracked.join(', '))
if (dirty !== '') problems.push('lib has uncommitted changes; commit before tagging: ' + dirty.replace(/\n/g, ' | '))
if (committedProducts.length > 0) problems.push('HEAD commit contains task products: ' + committedProducts.join(', '))
if (!declaresLib) problems.push('package.json files must include "lib"')
if (missing.length > 0) problems.push('unresolved relative imports: ' + missing.join(', '))
if (problems.length > 0) {
  console.error('release-guard: FAILED')
  for (const problem of problems) console.error(' - ' + problem)
  process.exit(1)
}
console.log('release-guard: OK (' + files.length + ' lib files tracked, imports resolve)')
