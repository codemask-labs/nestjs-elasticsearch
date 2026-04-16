# AGENTS.md

## Package manager & Node version

- **Yarn Berry** — always use `yarn`, never `npm`
- Node version pinned in `.nvmrc` (Node >= 22 required)
- Install: `yarn install --immutable` (CI uses cache-first, then `--immutable`)

## Developer commands

```bash
yarn lint              # ESLint (run first)
yarn tsc               # Type-check only, no emit
yarn test              # Jest against src/ (requires live ES — see below)
yarn build             # Clean → tsc (tsconfig.build.json) → tscpaths alias rewrite
yarn format            # Prettier write + ESLint --fix
yarn es:seed           # Seed Elasticsearch with homes.seed.json
```

CI order for PRs: **lint → tsc → (separate job) docker compose up → es:seed → jest --runInBand**

## Integration tests require live Elasticsearch

All tests in `src/test/features/` hit a real ES 8.x cluster. No mocks.

```bash
docker compose up -d           # Starts ES 8.14.0 on :9200 + Kibana
yarn es:seed                   # Bulk-index homes.seed.json into 'homes' index
yarn jest --runInBand          # Must run serially (--runInBand), not parallel
```

The `yarn test` script (`--pathPattern=src`) also works but CI explicitly uses `--runInBand`. Unit tests for query/aggregation builders live alongside the source in `src/lib/*/test/` and do not need ES.

To run a single test file:

```bash
yarn jest --runInBand src/test/features/4-making-aggregation.spec.ts
```

## Build pipeline detail

Three-step build — **all three must run** or path aliases break in `dist/`:

1. `rimraf dist` — clean
2. `tsc --declaration --project tsconfig.build.json` — emits `.js` + `.d.ts`
3. `tscpaths -p tsconfig.build.json -s ./src -o ./dist` — rewrites `lib/*`, `module/*` aliases to relative paths so consumers don't need `tsconfig` path config

## TypeScript path aliases (do not use relative `../../` when alias exists)

```
lib/*     → src/lib/*
module/*  → src/module/*
test/*    → src/test/*      (dev/test only, excluded from tsconfig.build.json)
```

## Code style (non-defaults)

- No semicolons, single quotes, no parens on single arrow args (`.prettierrc`)
- ESLint allows `snake_case` identifiers matching ES DSL terms (`bucket_script`, `date_histogram`, `doc_count`, etc.) — do not rename these
- Conventional commits enforced by commitlint + Husky: `feat|fix|build|chore|ci|docs|perf|refactor|revert|style|test`

## Architecture: lib vs module

- **`src/lib/`** — pure TypeScript, no NestJS dependency; query builders, aggregation builders, response transformers, types
- **`src/module/`** — NestJS wiring only: `ElasticsearchModule`, `ElasticsearchService`, `Index<T>` injectable, `@RegisterIndex`/`@InjectIndex` decorators
- **`src/index.ts`** — single barrel re-exporting both

Index names come from `@RegisterIndex('name')` decorator stored in Reflect metadata. `getIndexName(Document)` reads this at runtime. Missing the decorator causes a runtime error in `Index<T>` constructor.

## Key integration test helpers

- `src/test/toolkit/setup-nest-application.ts` — creates and initializes NestJS testing module; use this in new feature specs
- `src/test/module/home.document.ts` — canonical example of a `@RegisterIndex` document class

## Developer experience (DX) standards

This is a **published library** — consumers see every error message and every public API signature.

### Error messages

- Must state **what went wrong**, **where** (class/decorator/method name), and **how to fix it**
- Bad: `'Missing decorator'`
- Good: `'HomeDocument is missing the @RegisterIndex decorator. Add @RegisterIndex("homes") above the class definition.'`
- Runtime errors thrown from `Index<T>` constructor, `getIndexName()`, and module wiring must follow this pattern
- Never expose internal implementation details (stack internals, raw ES client errors) without wrapping them with user-facing context

### Public API functions

- Every exported function and class must have a JSDoc comment that describes its purpose, parameters, and return value
- Generic type parameters must be named descriptively (`TDocument`, `TAggregations`) not single letters (`T`, `A`) — follow existing conventions in the codebase
- Overloaded signatures (e.g. `getTermQuery`) must cover the nullable/non-nullable distinction explicitly so callers get correct inference without casting
- Do not change an existing public API signature without a deprecation path — consumers depend on this

## Dependabot note

`@elastic/elasticsearch` is intentionally excluded from Dependabot auto-updates (pinned manually). Do not bump it in automated PRs.
