# Verification, coverage and release boundaries

Updated: 7 November 2026 (Asia/Dhaka); source research checked 6 November 2026. Code behavior, data completeness and production operations are evaluated separately.

## Verified content inventory

| Item | Current evidence |
| --- | --- |
| UGC university identity inventory | 181 entries; 61 public / 116 private / 3 international / 1 CBHE; matched to the four official UGC category tables retrieved on this date |
| BMDC identity inventory | All 137 numbered rows in the retrieved BMDC table imported, including separate dental units and explicit recognition-withheld notes |
| Textile identity inventory | 10 BUTEX affiliate identities and NITER; different operators/affiliations remain separate |
| Total institution identities | 329, including 148 specialists; specialist rows are never counted as UGC universities |
| Source-backed programme records | 32: ULAB, BRAC, NSU and EWU |
| Fee records | 32: ULAB/EWU published totals and BRAC/NSU component schedules; unknown required components prevent a complete estimate |
| Admission announcements | 11 across ULAB, BRAC, EWU, UIU and DU; date-only deadlines and unknown opening times remain explicit |
| Official-domain discovery audit | All 181 university identities have an outcome; 143 have 374 candidate URLs; 18 searches returned no matching result and 20 UGC rows lack a usable website |
| Scholarship summary | One ULAB waiver-policy summary, with ordinary cap and renewal/stacking cautions |
| Rankings / current seat allocations | No numeric records published without appropriate current source/rights review |

The live `/coverage` page derives counts per institution from the database. A checked identity is not a verified programme, campus, recognition or permission to admit. BMDC section headings may describe historical affiliations; these are retained as source context and not silently promoted to current affiliation claims. The three explicit recognition-withheld rows retain prominent warnings.

The discovery audit is not a claim that all 374 pages were read or that every university has verified current fees. Detailed academic records currently cover six universities. Official source references are recorded in `data/source-registry.json`, with row provenance in `data/bmdc-reviewed-identities.json` and `data/seeds/`. ULAB's fee page does not state an intake effective date; its records disclose this rather than guessing one. BRAC's retrieved fee schedule explicitly names Spring 2027. Its unconfirmed degree credits and charged term counts prevent fabricated full-degree estimates. Date-only deadlines remain all-day calendar entries; the BRAC test time retains its explicit Bangladesh time zone.

## Local automated evidence

**44 automated tests pass** in the final local run. `npm run check` validates syntax and the 181 unique university identities with the 61/116/3/1 split. The integration suite covers:

- All university API pages and all 329 canonical HTML identity routes.
- Source data separation, unknown-by-default recognition, seed idempotency and database reopen persistence.
- Signup/email verification, password login, staff TOTP freshness/replay rejection, session tokens and CSRF.
- Public/account/staff boundaries, author ownership, post replies/likes/unlikes/saves, unique reviews and minimum rating sample size.
- DM consent, participant isolation, administrator exclusion from DM bodies and blocks.
- Draft visibility, independent fact publication, optimistic concurrency, rollback and append-only audit.
- Scheduled publication, stale-job rejection, field evidence and validated CSV parsing.
- Full-text public search with private-message exclusion; source-backed costs, date-only calendar and no invented seat capacity.
- Private checklists, explicit email alert opt-in, groups, accepted answers and review dimensions.
- Privacy-aware public profiles, invalid appearance rejection, restricted media, actual image decoding/reencoding and rejected spoofed signatures.
- Consistent online backup reopened in a separate database with integrity and data checks.

The suite uses isolated databases and an in-memory email transport. It does not certify a live email provider or production deployment.

## Browser observations

Authenticated browser checks used a separate loopback fixture, disposable SQLite database and synthetic member/owner sessions. They did not access a production account or enter real credentials. The normal application does not expose fixture session routes; automated tests verify they return 404, and the fixture refuses production activation.

| Observed browser action | Result |
| --- | --- |
| Member profile update and reload | Updated display name persisted |
| Question post and reload | Published title/body persisted |
| Reply and accepted answer | Reply appeared and accepted-answer state was visible |
| Like and bookmark | Liked count updated; the saved-items page contained the post |
| Member access to staff console | Permission error displayed |
| Owner creates page draft | Draft appeared in the content table |
| Owner publishes page | Version incremented from v1 draft to v2 published |
| Public page reload and language switch | Published body persisted and its Bengali body appeared |

Earlier public-browser checks also observed ULAB search, comparison and calendar rendering. The latest attempt to inspect the account in Bengali was rejected by automatic browser approval review because the session usage limit was reached. No alternate browser surface or hidden browser command was used to bypass that rejection. Final translation fixes after that point have syntax/dictionary checks, but are not claimed as browser-observed. No screenshot was saved for the final state.

These checks establish selected post-login behaviors. They do not establish every blueprint browser case, real-inbox signup/recovery, an authenticated production session, independent phone hardware or accessibility certification. The synthetic fixture marker has been removed from the release.

## Translation audit

`docs/translation-audit.json` records **678 dictionary entries and 479 extracted interface/static-server strings with zero missing matches**. Extraction covers HTML text, selected helper strings, placeholders, accessibility labels and selected static messages. CI runs this check through `npm run check`. Dropdown option values remain in the backend's original vocabulary while their labels translate. Member prose and official identifiers are preserved. Bilingual content fields and public-page Bengali body rendering are supported. This is bounded code-string coverage, not an independent linguistic review of every dynamic academic fact or institution name.

## Implemented additions beyond the first push

| Capability | Implementation / validation |
| --- | --- |
| Structured content forms | Field-based forms for institutions, academic hierarchy, admissions, fees, aid, ranks, sources and pages; complex rule arrays remain structured JSON controls |
| Appearance controls | Logo/favicon, palette pickers, typography, module visibility/reordering, homepage section text, draft content preview and audited publish/rollback |
| Academic linking | Programme/faculty/department/course references, same-institution checks and affiliation-cycle prevention |
| Institution representatives | Manual owner-reviewed, time-limited, institution-scoped authority grants; protected-field rejection, editorial review and revocation; integration tested |
| Privacy case evidence | Participants explicitly share only the selected reported message; scoped staff case access is audited; integration tested |
| Navigation and pages | Visual add/remove/reorder/hide navigation controls and typed heading/paragraph/callout/link page blocks |
| Interface localization | 678 dictionary entries; 479 extracted strings checked; explicit option values preserved; bilingual content fields; official names and member text preserved |
| Reconciliation | Owner-only, source-backed specialist merge; UGC snapshot identities protected |
| Scheduling & evidence | Reviewer-approved jobs with revision checks and revoked-permission checks; field-level source evidence |
| Search & source health | SQLite FTS5 index, immediate rebuild after mutations, official-host-pinned source-monitor CLI and change review UI |
| Planning | Date/time-aware calendar + ICS, session/programme/quota seat filters, private application checklists |
| Community | Groups, follows, unanswered/liked/followed feed ordering, nested-reply controls, accepted answers, dimensions and public-profile privacy |
| Notifications | In-app subscriptions and opt-in email outbox; worker retries/cancellation when consent is withdrawn |
| Uploads | Progress UI, file-signature checks, image decode/strip/resize/reencode, scanned-PDF gate |
| Operations | Persistent Docker volume, online backup/restore validation, expiry cleanup worker and GitHub Actions checks |

## What prevents a truthful “fully complete” claim

1. **Academic content coverage remains incomplete.** Detailed current programme/curriculum/admission/fee/seat/scholarship and regulatory evidence has not been independently collected for every institution. Directory coverage does not satisfy that requirement. Many sources omit dates or fee components; no missing value is invented.
2. **External operations are unconfigured.** A real email delivery endpoint, HTTPS production host, durable production backups and staff enrollment must be configured by the operator. No service credentials or deployment target were supplied in this request. A read-only HTTPS smoke-check CLI and health endpoint are included, but neither was executed against a production host. The available Sites host does not directly run this Node/SQLite/ImageMagick service. No alternative provider was configured; the declined Render plugin was not used. Live delivery/deployment is not claimed.
3. **Some specification work remains.** Independent linguistic review of dynamic content, richer page layout/template variants, complete attachment/review workflows, formal retention/purge procedures and broad multi-device accessibility/load/security review still need further implementation or operational review. Representative proof review and scoped expiring grants, typed content blocks and visual navigation/module controls have now been implemented and are no longer deferred.
4. **Publisher rights and professional status remain source-dependent.** QS/THE bulk dataset reuse permission and current professional recognition cannot be fabricated or inferred from a parent institution's rank.

This report deliberately records the actual boundary. It must not be replaced with a “100% complete” label unless all required feature, data and production evidence exists.
