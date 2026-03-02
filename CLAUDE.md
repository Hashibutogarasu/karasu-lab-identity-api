# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is the NestJS identity/authentication API backend. It runs on port 3001 and exposes `/api/auth/*` for better-auth and `/api/*` for application endpoints.

## Commands

```bash
pnpm start:dev          # Development with watch mode
pnpm start:debug        # Debug mode (--inspect-brk)
pnpm build              # Compile TypeScript to dist/
pnpm start:prod         # Run compiled build

pnpm test               # Run all tests (Vitest)
pnpm test:watch         # Watch mode
pnpm test:cov           # Coverage report
pnpm test:e2e           # E2E tests

pnpm lint               # ESLint check
pnpm lint:fix           # Auto-fix linting
pnpm format             # Prettier formatting

pnpm prisma:generate    # Generate Prisma client + better-auth schema
pnpm prisma:migrate     # Run DB migrations
pnpm prisma:push        # Push schema to DB (no migration file)
```

To run a single test file:
```bash
pnpm vitest run test/blogs/blog.e2e.spec.ts
```

## Architecture

### Module Structure

- **AppModule** — root; imports StorageModule (global), BlogModule, AttachmentModule, OpenApiModule, AuthMiddlewareModule, AuthModule
- **BlogModule** — CRUD for blog posts; metadata in Firestore, content in object storage, user data in PostgreSQL
- **AttachmentModule** — file upload/download; 8 MB size limit; returns presigned URLs
- **StorageModule** — global S3/R2-compatible object storage abstraction (`IObjectStorageService`)

### Authentication (`src/auth.ts`)

Authentication is handled by `better-auth` via `@thallesp/nestjs-better-auth`. The `createAuth()` / `initAuth()` functions set up all plugins:

- Password, Passkey/WebAuthn, OAuth 2.0 client + provider, OIDC, 2FA (TOTP), Magic Links, Email OTP, Device Authorization, API Keys, Organization management, Admin

**Key files**:
- `src/auth.ts` — auth initialization and plugin wiring
- `src/config/auth.env.ts` — Zod schema for all required env vars
- `src/shared/auth/session.service.ts` — `requireSession()` / `optionalSession()` helpers
- `src/plugins/` — custom better-auth plugins (OAuth app management, OpenAPI, passkey config, etc.)

### Bootstrap & Config

`src/bootstrap/` runs a sequential initialization pipeline before the app starts:
1. `InitializeEnv` → `ValidEnv` (Zod) → `InitializeConfig` → `InitializeService` → `I18nBootStrapper` → optional `DatabaseSeeding`

Config classes (`ProductionConfigService`, `DevelopmentConfigService`, `TestConfigService`) all extend `AbstractConfigService` and are injected via `ConfigServiceProvider` factory based on `NODE_ENV`.

### Database

- **PostgreSQL** via Prisma with `@prisma/adapter-pg` (connection pool: max 10 connections)
- **Firestore** — blog/attachment document metadata
- `src/shared/database/postgres-database.service.ts` — production; `test/mocks/memory-database.service.ts` — in-memory adapter for tests

### Error Handling & i18n

- `src/shared/errors/error.codes.ts` — typed error codes mapping to i18n keys (`ErrorCodes.AUTH.UNAUTHORIZED`, `ErrorCodes.BLOG.NOT_FOUND`, etc.)
- `GlobalExceptionFilter` formats all exceptions uniformly
- i18next with locale files in `src/i18n/locales/` (`en`, `ja`, `kansai`, `zh-Hans`); default locale is Japanese

### Validation

Use `ZodValidationPipe` for all request bodies:
```typescript
@Body(new ZodValidationPipe(createBlogSchema)) body: CreateBlogDto
```

## Testing

**Framework**: Vitest (not Jest). Global test setup is in `test/auth/auth.setup.ts` which provides `testAuth`, `testDbService`, and `testNotificationService`.

**Mock services** (in `test/mocks/`):
- `MemoryDatabaseService` — in-memory better-auth adapter
- `NullObjectStorageService` — no-op storage
- `MockAuthNotificationService` — captures sent emails/OTPs
- `MockFirebaseAdminProvider` — Firestore emulator
- `MockDatabaseSeedingService` — creates test users

Test timeout is 30 seconds. E2E tests use real PostgreSQL and Firestore emulator.

## Key Conventions

- All injectable services have an interface (`IConfigService`, `IDataBaseService`, `IObjectStorageService`) and are injected using string tokens
- Routes are authenticated by default; use `@AllowAnonymous()` from `@thallesp/nestjs-better-auth` for public endpoints
- The `type: "module"` ESM project uses `node16` module resolution; imports must include file extensions where required by Node ESM
- Swagger docs are auto-generated via `@nestjs/swagger` and available at `/api/docs`
