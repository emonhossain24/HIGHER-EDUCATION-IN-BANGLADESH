# Operations

## Runtime and persistence

Use Node 24 or the included Dockerfile. SQLite uses WAL, foreign keys and a persistent `DATA_DIR`. A single server instance is supported. Horizontal replicas sharing network-mounted SQLite are not supported; migrate the persistence adapter to PostgreSQL before distributing writes. Mount the data directory, including media, on durable storage.

Set `APP_URL` to the exact HTTPS public origin and `COOKIE_SECURE=true` for production. Put a TLS reverse proxy in front of port 3000. `NODE_ENV=production` refuses insecure cookie/URL settings and development mail. The server ignores untrusted forwarded IP headers for rate limits; configure the proxy and client-IP policy deliberately for production traffic.

## Email

Registration and recovery require a configured `MAIL_WEBHOOK_URL` (HTTPS) and optional `MAIL_WEBHOOK_TOKEN`. The endpoint receives JSON `{to,subject,text}` and must deliver mail; it must return success only after accepting delivery. Do not commit tokens. When mail is unconfigured, the application reports that configuration is needed rather than pretending an email was sent.

For isolated local development only, `DEV_MAIL=true` writes messages to private `var/dev-mail.jsonl`. Never enable this on a public service. Test the actual mail provider before launch. The integration suite uses an in-memory mail transport and verifies single-use verification links.

## Staff and MFA

There are no seeded administrator passwords or email-based backdoors. Provision a staff account locally by sending a JSON object on standard input to `npm run staff`. Required fields: `email`, `name`, `password`; optional `role` (`owner`, `admin`, `editor`, `fact_checker`, `moderator`). Use an interactive secret manager or pipe from a private input source so credentials do not enter shell history. The command prints the authenticator enrollment secret to that local operator; keep it private. An existing account requires an explicit `rotate:true`, which revokes old sessions.

Staff login requires password plus a fresh TOTP code. Staff access expires after 30 minutes; role changes require a five-minute authentication. Recovery is through the local operator CLI, never a browser backdoor. Staff secrets are protected by filesystem permissions; volume encryption and host access controls remain operator responsibilities.

## Editorial workflow

Import JSON as drafts or edit individual records. Every content mutation requires a reason and an expected revision. Drafts do not replace the live revision. Preview structured content, attach an official source, check the effective session, then have a different reviewer publish admission/fee/seat/scholarship/ranking/regulatory/institution changes. Appearance publication is limited to admin/owner. Source records, contact details, field evidence and data reuse rights require editorial work; a source URL alone is not factual verification.

Rollback restores an earlier revision as a draft. It must be republished to change the live site. Audit events cannot be updated or deleted through SQL triggers. Backups are separate from public editorial JSON exports.

## Backups and restoration

`npm run backup -- /absolute/private/path/backup.sqlite` uses SQLite's online backup API for a consistent snapshot. Store backups outside the application volume, encrypt them, and back up `var/media/` separately. Restore with the service stopped: retain the current database, replace it with the validated backup, remove stale WAL/SHM companions for the replaced database, restore media, and run the integrity checks before reopening traffic. Test restoration on an isolated copy first.

## Media

PNG, JPEG and WebP are accepted after signature checks, with a 5 MB limit. PDF uploads require `CLAMSCAN_PATH` and a successful malware scan; otherwise use official document links. SVG uploads are rejected; the shipped flag is a controlled repository asset. Rights and alternative text are required. Further image decoding/reencoding and production malware scanning of all uploads are outstanding hardening tasks.

## Release checks

Run `npm run check` and `npm test`, verify the live mail transport, test account recovery, review source freshness and licensing, configure backups and retention, conduct accessibility and security review, and smoke-test the actual deployed host. No deployment or live email delivery was performed in this build.

## Scheduling, source checks and alerts

Approved publication jobs are checked every 30 seconds by the single application process. The worker rejects drafts changed after approval, revoked approvers and invalid references. Run `npm run jobs` regularly to dispatch explicitly opted-in email alerts through the configured delivery endpoint and clear expired sessions/tokens/rate counters. In-app notifications are written when relevant reviewed records are published.

`npm run sources:check` only checks a fixed set of official-source hosts. It resolves public IPv4 addresses, pins the selected address, caps size/time and refuses redirects. The script records hashes/status for editorial review and does not auto-publish critical assertions. It may fail when site policies or runtime network access prevent retrieval; those failures are not source verification.

`/admin?section=schedule` manages publication jobs. `evidence` attaches field provenance. `source-health` displays recorded changes. `/coverage` exposes actual per-institution source coverage. The public calendar exports all-day dates without inventing an application deadline hour.

## System image dependency

Image uploads now require ImageMagick (`IMAGE_CONVERT_PATH`, default `magick`). The Dockerfile includes ImageMagick and ClamAV binaries. Configure and keep ClamAV definitions current before enabling PDF uploads. Every accepted image is decoded, stripped, bounded to 2400×2400 and reencoded with resource/time limits. Source document linking remains available when scanning cannot complete.
