/** Product-level verify detection: only the project's own package.json counts. */
import assert from 'node:assert/strict'
import test from 'node:test'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { productVerifyCommands } from '../lib/host-verify.js'

test('detects the product package.json script, never the plugin scripts', () => {
  const dir = mkdtempSync(join(tmpdir(), 'pixel-product-'))
  try {
    const root = join(dir, 'projects', 'p')
    mkdirSync(root, { recursive: true })
    writeFileSync(join(root, 'package.json'), JSON.stringify({ scripts: { typecheck: 'tsc', test: 'node t.mjs' } }), 'utf8')
    writeFileSync(join(root, 'pnpm-lock.yaml'), '', 'utf8')
    assert.deepEqual(productVerifyCommands(dir, 'projects/p'), ['cd "projects/p" && pnpm run test'])
    assert.deepEqual(productVerifyCommands(dir, 'projects/p/'), ['cd "projects/p" && pnpm run test'])
    assert.deepEqual(productVerifyCommands(dir, 'projects/missing'), [])
    assert.deepEqual(productVerifyCommands(dir, '../escape'), [])
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('a manifest without a known script produces no command', () => {
  const dir = mkdtempSync(join(tmpdir(), 'pixel-product-'))
  try {
    const root = join(dir, 'projects', 'p')
    mkdirSync(root, { recursive: true })
    writeFileSync(join(root, 'package.json'), JSON.stringify({ scripts: { lint: 'eslint' } }), 'utf8')
    assert.deepEqual(productVerifyCommands(dir, 'projects/p'), [])
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})
