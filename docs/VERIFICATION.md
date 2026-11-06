# Verification, coverage and release boundaries

Updated: 6 November 2026. Code behavior, data completeness and production operations are evaluated separately.

## Verified content inventory

| Item | Current evidence |
| --- | --- |
| UGC university identity inventory | 181 entries; 61 public / 116 private / 3 international / 1 CBHE; matched to the four official UGC category tables retrieved on this date |
| BMDC identity inventory | All 137 numbered rows in the retrieved BMDC table imported, including separate dental units and explicit recognition-withheld notes |
| Textile identity inventory | 10 BUTEX affiliate identities and NITER; different operators/affiliations remain separate |
| Total institution identities | 329, including 148 specialists; specialist rows are never counted as UGC universities |
| Source-backed programme records | 10: seven ULAB undergraduate programmes and BRAC CSE/CS/BBA |
| Fee records | 10: seven ULAB published programme totals and three BRAC Spring 2027 component schedules |
| Admission announcements | ULAB and BRAC Spring 2027; no invented opening date or deadline hour |
| Scholarship summary | One ULAB waiver-policy summary, with ordinary cap and renewal/stacking cautions |
| Rankings / current seat allocations | No numeric records published without appropriate current source/rights review |

The live `/coverage` page derives counts per institution from the database. A checked identity is not a verified programme, campus, recognition or permission to admit. BMDC section headings may describe historical affiliations; these are retained as source context and not silently promoted to current affiliation claims. The three explicit recognition-withheld rows retain prominent warnings.

Official source references are recorded in `data/source-registry.json`, with row provenance in `data/bmdc-reviewed-identities.json` and `data/seeds/`. ULAB's fee page does not state an intake effective date; its records disclose this rather than guessing one. BRAC's retrieved fee schedule explicitly names Spring 2027. Its unconfirmed degree credits and charged term counts prevent fabricated full-degree estimates. Date-only deadlines remain all-day calendar entries; the BRAC test time retains its explicit Bangladesh time zone.

## Local automated evidence

**37 automated tests pass** in the final local run. `npm run check` validates syntax and the 181 unique university identities with the 61/116/3/1 split. The integration suite covers:

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

Managed preview runs successfully. Through the cloud browser, the following were observed: institution search for `ULAB` returns the correct single result; comparison adds that institution; switching language updates the primary Bangla controls; current sourced admissions render; and calendar entries preserve date-only versus explicitly timed evidence. A browser-download attempt timed out; the calendar export was then moved to a standard server attachment endpoint and its exact bytes, all-day dates, UTC conversion and UTF-8 line folding are covered by an integration test. During the final browser revisit, the shared preview endpoint served another project, so the last revision was not claimed as fully browser-tested.

These are desktop browser checks. Authenticated staff/member screens, independent phone hardware, accessibility certification and production smoke tests are not represented as passed. Browser credentials were not bypassed for testing.

## Implemented additions beyond the first push

| Capability | Implementation / validation |
| --- | --- |
| Structured content forms | Field-based forms for institutions, academic hierarchy, admissions, fees, aid, ranks, sources and pages; complex rule arrays remain structured JSON controls |
| Appearance controls | Logo/favicon, palette pickers, typography, module visibility/reordering, homepage section text, draft content preview and audited publish/rollback |
| Academic linking | Programme/faculty/department/course references, same-institution checks and affiliation-cycle prevention |
| Institution representatives | Manual owner-reviewed, time-limited, institution-scoped authority grants; protected-field rejection, editorial review and revocation; integration tested |
| Privacy case evidence | Participants explicitly share only the selected reported message; scoped staff case access is audited; integration tested |
| Navigation and pages | Visual add/remove/reorder/hide navigation controls and typed heading/paragraph/callout/link page blocks |
| Interface localization | Expanded Bangla interface dictionary and bilingual content fields; official names and member text preserved |
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
2. **External operations are unconfigured.** A real email delivery endpoint, HTTPS production host, durable production backups and staff enrollment must be configured by the operator. No service credentials or deployment target were supplied in this request. Code and local tests are ready for these integrations; live delivery/deployment is not claimed.
3. **Some specification work remains.** An independently reviewed complete Bangla translation, richer page layout/template variants, complete attachment/review workflows, formal retention/purge procedures and broad multi-device accessibility/load/security review still need further implementation or operational review. Representative proof review and scoped expiring grants, typed content blocks and visual navigation/module controls have now been implemented and are no longer deferred.
4. **Publisher rights and professional status remain source-dependent.** QS/THE bulk dataset reuse permission and current professional recognition cannot be fabricated or inferred from a parent institution's rank.

This report deliberately records the actual boundary. It must not be replaced with a “100% complete” label unless all required feature, data and production evidence exists.
