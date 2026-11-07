# Higher Education in Bangladesh

## Administration and editorial review

The staff console is designed for institution records, source-backed programme details, multilingual page content, moderation and import/review workflows. High-impact changes require an independent authorized reviewer. Institution listings are not a statement of current accreditation or admission availability; source records and the verification report provide their individual context.


A bilingual, source-aware institution directory and community application. The Bangladesh flag is used for the website logo and favicon.

The application includes 181 university identity pages from the supplied UGC snapshot (61 public, 116 private, 3 international, 1 CBHE), plus 148 separately classified specialist identities (137 from the retrieved BMDC table and 11 textile records). Directory inclusion does not certify current recognition or admission permission.

## What works

- Search, combined category/type filters, permanent institution pages, source records, comparisons, full-text search and shareable comparison URLs.
- Calendar/ICS exports, seat-capacity filters, private application checklists and opt-in alert subscriptions.
- Email/password accounts with verification, password recovery, revocable sessions, server authorization and mandatory staff TOTP.
- Database-backed posts, replies, accepted answers, groups, follows, likes, bookmarks, dimensioned reviews, reports, notifications, consent-based private messages and blocks.
- Separate staff console with field-based forms, visual palette/module controls, scheduled draft publication, field evidence, optimistic concurrency, independent review, revisions, rollback, moderation and validated JSON/CSV imports.
- Editable homepage copy, module order, visual navigation controls, page blocks, logo, favicon, typography, palette, footer and informational pages.
- Manual, expiring institution-representative authority with scoped draft submissions, independent review and revocation.
- Participant-consented selected-message reports, without a general staff inbox-reading interface.
- Programme/admission/fee/scholarship/ranking catalogues, session-aware admission status, eligibility rules and tuition calculation engines. A separate personal cost planner accepts user-supplied scenarios.
- Restricted media uploads, consistent database backups, Docker configuration and GitHub Actions checks.

## Run

Requires **Node.js 24+**. The core server uses Node built-ins. Image uploads additionally require ImageMagick; the Dockerfile installs it. PDF uploads require a configured scanner with current definitions.

```sh
cp .env.example .env
npm start
```

Open `http://localhost:3000`. The first start initializes SQLite and idempotently imports the identity snapshots. Keep `var/` on a persistent disk. This Node application requires a running server; GitHub Pages and static-only hosts cannot run its authenticated backend.

See [operations](docs/OPERATIONS.md) for mail, staff provisioning, HTTPS, backups and deployment. See [verification](docs/VERIFICATION.md) for tested behavior and outstanding scope.

## Data honesty

The supplied blueprint is retained in `docs/`. The 181 university names/categories have now been matched to the four official UGC category tables. This identity check does not validate each programme, campus or intake. Unchecked website strings are retained without clickable claims. Academic details are **not** invented to fill empty catalogues. The catalogue now includes 76 source-backed records across ULAB, BRAC, NSU, EWU, UIU and DU: 32 programmes, 32 fee schedules, 11 admission announcements and one waiver summary. The 181-university discovery audit retains 374 official-domain source candidates for 143 institutions; discovery links do not certify current facts. Source coverage for other institutions remains incomplete. No unsupported seat or ranking values are published.

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
