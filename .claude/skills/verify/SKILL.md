---
name: verify
description: Build @toreda/verify and drive it as a consumer through the package boundary (dist/index.js).
---

# Verifying @toreda/verify

Library package — the surface is the public export (`package.json` main → `dist/index.js`).

## Build

- `pnpm build:dev` / `pnpm build` (gulp via @toreda/build-tools) is currently **broken**:
  `Error: Invalid glob argument: undefined` in `buildSrc` (@toreda/build-tools dist/run.js:80).
- Working fallback: `npx tsc -p tsconfig.json` — emits `dist/` even if strict errors are reported
  (tsc has no `noEmitOnError` set). Treat reported TS errors as findings, not build blockers.
- Installed TypeScript is 7.x: it reports `TS5108` for `moduleResolution: node` in tsconfig but
  still emits. Ignore that one error.

## Drive

Write a CommonJS script in the scratchpad and `require` the package root (not `./src/...`):

```js
const {Ruleset, verify, verifierResult} = require('g:/Projects/Toreda/verify');
const {Fate} = require('g:/Projects/Toreda/verify/node_modules/@toreda/fate');

const rs = new Ruleset();
const v = rs.value();
rs.add(v.must.be.equalTo('cheese'));
const result = await rs.verify('cheese'); // Fate<VerifierResult>
// result.ok(), result.data.outcome, result.data.summary.counts, result.data.failedMatchers
```

- `Ruleset.verify()` delegates to the `verify()` executor in `src/verify.ts`, so driving a
  Ruleset exercises the executor end-to-end.
- `verify()` is also exported directly; custom collection items only need an async
  `verify(value, flags)` returning `Fate<VerifierResult>` (build ctx with `verifierResult({name})`).
- Flags worth probing: `{maxFails, maxErrors}` (defaults 0 in `src/defaults.ts`). Flags cascade
  into sub-verifiers; forgiven fails bubble up via `counts.forgivenFails` + `failedMatchers`, and
  bubbled forgiven fails count against each ancestor's `maxFails` threshold.

## Gotchas

- `ruleset.value()` matcher accessors (`is`, `must`, `has`, `contains`, `matches`) are wired by a
  Proxy in `src/ruleset.ts`; matcher properties declared on a Block but not assigned in its
  constructor are `undefined` at runtime → `TypeError: ... is not a function`.
- jest tests exist but are CI's job — verify via the package surface instead.
