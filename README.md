# Higher Education in Bangladesh

A bilingual, source-aware institution directory and community application. The Bangladesh flag is used for the website logo and favicon.

The application includes 181 university identity pages from the supplied UGC snapshot (61 public, 116 private, 3 international, 1 CBHE), plus 32 separately classified specialist identity examples. Directory inclusion does not certify current recognition or admission permission.

## What works

- Search, combined category/type filters, permanent institution pages, source records, comparisons and shareable comparison URLs.
- Email/password accounts with verification, password recovery, revocable sessions, server authorization and mandatory staff TOTP.
- Database-backed posts, replies, likes, bookmarks, reviews, reports, notifications, consent-based private messages and blocks.
- Separate staff console with typed content records, draft/publish, optimistic concurrency, independent review for high-impact facts, revisions, rollback, moderation, user access and validated JSON imports.
- Editable homepage copy, module order, navigation, logo, favicon, typography, palette, footer and informational pages.
- Programme/admission/fee/scholarship/ranking catalogues, session-aware admission status, eligibility rules and tuition calculation engines. A separate personal cost planner accepts user-supplied scenarios.
- Restricted media uploads, consistent database backups, Docker configuration and GitHub Actions checks.

## Run

Requires **Node.js 24+**. No third-party runtime dependencies or package installation is needed.

```sh
cp .env.example .env
npm start
```

Open `http://localhost:3000`. The first start initializes SQLite and idempotently imports the identity snapshots. Keep `var/` on a persistent disk. This Node application requires a running server; GitHub Pages and static-only hosts cannot run its authenticated backend.

See [operations](docs/OPERATIONS.md) for mail, staff provisioning, HTTPS, backups and deployment. See [verification](docs/VERIFICATION.md) for tested behavior and outstanding scope.

## Data honesty

The supplied blueprint is retained in `docs/`. University identity data reproduces its snapshot and has not been independently revalidated institution by institution. Unchecked website strings are retained without clickable claims. Academic details are **not** invented to fill empty catalogues. No live admission dates, fees, seats, scholarships or ranking numbers have been source-verified and published in this initial dataset.

Platform implementation and verified content coverage are separate. This repository is a working staging foundation, not the blueprint's fully completed national data service. See the explicit remaining work in the verification report before a public launch.

## Structure

- `server/` — HTTP service, SQLite persistence, domain rules, authentication and APIs.
- `public/` — responsive public and staff interfaces, bilingual controls and flag artwork.
- `data/` — provenance-preserving seed data and source registry.
- `scripts/` — seed extraction, integrity checks, staff provisioning and consistent backups.
- `tests/` — integration and authorization tests using isolated temporary databases.

```sh
npm run check
npm test
```

All public academic facts require source-aware editorial review. High-impact publication requires a different authorized reviewer from the draft author. No default staff credentials are included.
