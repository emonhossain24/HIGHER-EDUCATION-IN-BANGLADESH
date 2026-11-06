# HIGHER EDUCATION IN BANGLADESH (HEBD) — COMPLETE MASTER WEBSITE BLUEPRINT

**Primary proposed name:** Higher Education in Bangladesh (HEBD) | **Alternative:** Study in Bangladesh. Domain/trademark availability NOT yet verified. | **Legacy working title:** CampusIndex BD.  
**Product:** Bangladesh Higher Education Discovery, Admissions, Rankings, Scholarships, Fees & Student Community Platform — universities, medical/dental colleges, textile institutions, and carefully scoped affiliates.  
**Specification version:** 2.0 (consolidated expansion; v1.0 preserved in sections 0–21)  
**Research snapshot:** 6 November 2026 (Asia/Dhaka)  
**Document language:** বাংলা + English technical terminology  
**Document status:** Implementation-ready functional/UX/data/security requirements and 181-item UGC-directory textual inventory, PLUS separately sourced medical/dental/textile expansion. This is a blueprint, NOT a deployed website or a claim that every fee, seat, program or institution approval is currently verified.  
**Audience:** Founder, UX designer, frontend/backend developers, database architect, content researchers, moderators, QA engineer.

---

## 0. EXECUTIVE BRIEF / ONE-PAGE VISION

বাংলাদেশের সব UGC-directory-listed বিশ্ববিদ্যালয়, এবং উপযুক্ত অফিসিয়াল উৎসে তালিকাভুক্ত মেডিকেল, ডেন্টাল, টেক্সটাইল ও অন্যান্য উচ্চশিক্ষা প্রতিষ্ঠানের তথ্য একই জায়গায় পাওয়া, তাদের প্রোগ্রাম ও ভর্তি প্রক্রিয়া বোঝা, ফি ও স্কলারশিপ তুলনা করা এবং সেই বিশ্ববিদ্যালয়ের শিক্ষার্থী/অ্যালামনাইদের বাস্তব অভিজ্ঞতা জানাই এই প্ল্যাটফর্মের লক্ষ্য। Inspiration: Studyportals-এর subject-first programme discovery/compare, Bachelorsportal/Mastersportal-এর programme information architecture এবং Yocket-এর university-specific community/discussion—**copy নয়; বাংলাদেশের ভর্তি পদ্ধতি অনুযায়ী স্বতন্ত্র প্রোডাক্ট**।

### Mandatory product pillars
1. **Directory** — Public, Private, International, CBHE: UGC directory অনুযায়ী 181 records (61/116/3/1 at research snapshot) with their own URLs and permanent detail pages.
2. **Programme intelligence** — faculties, departments, programmes, degree levels, credit hours, duration, tracks, approved/not verified status, medium of instruction, and careers/research options if evidenced.
3. **Admissions** — per intake/year/department exam process, unit, eligibility, SSC/HSC/equivalent conditions, subject grade, form fee, exam fee, seats, quotas, written/MCQ, viva, document requirements, deadlines, admit cards, waitlists, migration, and official apply URLs.
4. **Costs & funding** — tuition per credit/semester, total *estimated* academic cost with formula, mandatory charges, waivers, assistantships, bursaries, UGC scholarships, deadlines and renewal conditions.
5. **Rankings** — distinct QS, THE, and optionally other licensed/attributed methodologies; edition and category always visible; ranking is never inferred from a UGC directory row number.
6. **Community** — global and university feeds; posts, replies, threads, likes, bookmarks, shares, reviews, ratings, Q&A, groups, direct messages, notices and moderation.
7. **Admin CMS** — control of **all platform-managed user-visible presentation and content**, nav/logo/fonts/color/theme, all directory/programme/admission content, source validation, role management, community moderation, analytics and site settings, with secure audit trails.
8. **Trust & accuracy** — content provenance, captured/published/last-checked timestamps, regulatory warnings, expiry, correction workflow, privacy and complaint handling.

### Scope boundaries
- Platform is initially an **information/discovery + community portal**, **not** the UGC, not a university and not an official centralized admissions authority.
- No in-platform university application/payment unless an institution formally authorizes an integration and it has been built and tested. Default `Apply on official website` = external link.
- A directory listing does **not** by itself certify all programmes/campuses or guarantee admission permission. Medical/dental colleges are professionally recognised through BMDC and admission authorities DGME; textile colleges may be affiliated institutes rather than universities.
- Every university will have a page from Day 1 of directory import; incomplete official facts show **“তথ্য যাচাইাধীন / Not yet verified”**, not made-up values.

---

## 1. SOURCE AUDIT — VERIFIED ONLINE REFERENCES

The following URLs were checked through web research on 2026-11-06. Content can change later. Store source snapshots and recheck official pages before public release.

| ID | Source / purpose | Official URL | Authoritativeness and caveat |
|---|---|---|---|
| UGC-00 | UGC category directory, counts | https://www.ugc.gov.bd/universities | Primary for category/listing; reports 61 public, 116 private, 3 international, 1 CBHE as of check |
| UGC-01 | Public list | https://www.ugc.gov.bd/universities/public-universities | Primary initial 61 names and site strings |
| UGC-02 | Private list | https://www.ugc.gov.bd/universities/private-universities | Primary initial 116 names, site strings, caution markers |
| UGC-03 | International list | https://ugc.gov.bd/universities/international-universities | Primary initial 3 names |
| UGC-04 | Cross-border list | https://ugc.gov.bd/universities/cbhe | Primary initial 1 record |
| UGC-05 | Individual UGC institution detail: example | https://ugc.gov.bd/university/bangladesh-university | Demonstrates official campus, founding year, contact, admin and approved faculties fields |
| UGC-06 | Certificate/permanent-campus notices | https://ugc.gov.bd/service-details/permanent-campus-information | Has dated PDFs; must validate notices and identify institution-specific limitations |
| UGC-07 | Private university regulatory notices/forms | https://ugc.gov.bd/service-details/forms-private-uni | Includes private-university admission restrictions and guidance; never ignore warning notices |
| UGC-08 | UGC merit scholarships | https://ugc.gov.bd/service-details/merit-scholarship | Includes 2026 UGC merit scholarship nomination/guideline notices |
| UGC-09 | UGC Study in Bangladesh portal | https://ict.ugc.gov.bd/studyinbd/ | Secondary UGC-branded discovery/entry source; individual records may be dated/incomplete |
| UGC-10 | UGC Study in BD example: BUBT | https://ict.ugc.gov.bd/studyinbd/institute/details/Bangladesh%20University%20of%20Business%20and%20Technology%20-%20BUBT | Shows programme/credits/fee fields, but must recheck latest cost with university |
| RANK-01 | QS World University Rankings 2027 | https://www.topuniversities.com/qs-top-uni-wur | Publisher of QS rankings; check licensing and attribution before bulk reuse |
| RANK-02 | QS individual institution: DU | https://www.topuniversities.com/universities/university-dhaka | 2027 `=600` as shown by publisher at verification |
| RANK-03 | QS individual institution: BUET | https://www.topuniversities.com/universities/bangladesh-university-engineering-technology | 2027 `711–720` band |
| RANK-04 | QS individual institution: NSU | https://www.topuniversities.com/universities/north-south-university | 2027 `901–950` band |
| RANK-05 | THE World University Rankings 2027 | https://www.timeshighereducation.com/news/world-university-rankings-2027-results-announced | Publisher/edition reference; rankings are independent of UGC |
| RANK-06 | THE institution: BUET | https://www.timeshighereducation.com/world-university-rankings/bangladesh-university-engineering-and-technology | 2027 `1001–1200` band |
| ADMIT-01 | BRAC University domestic programme admissions | https://www.bracu.ac.bd/ug-domestic-applicant | Example of official intake, subject eligibility, tests and dates; session-specific |
| FEE-01 | BRAC University tuition and fees | https://www.bracu.ac.bd/admissions/tuition-and-fees | Example of programme/intake-specific fee table; verify effective intake and change notices |
| SCH-01 | BRAC University scholarships | https://engineering.bracu.ac.bd/scholarships-financial-aid | Example of waivers with different eligibility/renewal rules |
| INSP-01 | Studyportals official | https://studyportals.com/for-students/ | Product inspiration only, NOT an academic authority |
| INSP-02 | Studyportals programme compare explanation | https://www.mastersportal.com/articles/2720/how-to-use-the-studyportals-programme-comparison-feature.html/1000 | Example comparison dimensions: time, money, requirements, location |
| INSP-03 | Yocket community | https://yocket.com/connect | Product inspiration only, NOT regulatory data |

**Important conflict:** The UGC home-page overview was indexed as **59** public institutions while the specific UGC directory showed **61**. Source-of-truth for this initial inventory is `UGC-00` + `UGC-01` (61); preserve the discrepancy in a data-audit note and never claim a timeless official count. The category sum is 181 *directory entries*, not necessarily 181 currently operating, fully accredited degree-awarding institutions.

**Critical caution:** UGC private directory contains rows with `নোটিশ` / star markers. Preserve the original notice marker as raw data; read the actual linked notice to determine precise status. **Do not interpret an asterisk as a generic pass/fail or declare a university approved for new admissions based only on the directory.**

**Source priority by field (not one source for everything):**
- Institution legal identity, category, approved faculties/programmes, regulatory notices: **UGC first**.
- Academic duration, current department structure, curriculum, degree credits: **official university/faculty/department pages**, cross-reference UGC approval when applicable.
- Current entry requirements, viva, seat numbers, quotas, fees, applications, deadlines: **official university admissions notice / signed circular for THAT intake**; UGC for baseline policies and restrictions.
- Tuition/waiver/financial aid details: **official university fee and financial-aid schedules**, ideally timestamped PDFs or formal pages; UGC scholarship for UGC-specific schemes.
- QS/THE ranks: **rank publisher** only; always retain provider + ranking product + edition + scope + rank band.
- Student reviews, forum posts, living costs shared by users: **user-generated and labelled as such**, never official facts.

### Data display labels (mandatory)
- `UGC directory-listed` = appears in current UGC directory; not an unqualified `UGC Approved` promotional stamp.
- `UGC approval verified` only if specific official evidence supports institution/campus/programme status and scope.
- `Admission open` only if current official intake announcement says so, within the precise window and no superseding restriction is known.
- `Admission restricted`, `Admission status unknown`, `Institution under notice`, `Program approval pending`, `Officially verified`, `User-submitted`, `Archived intake`, `Estimated fee`, `Not ranked`, `Not yet checked` all need independent states.
- `No ranking record` / `not ranked` must not be treated as rank zero or worse quality.

---

## 2. PRODUCT INFORMATION ARCHITECTURE (SITEMAP)

### Public navigation — minimal / professional
**Logo [HEBD]** | **Universities** | **Programmes** | **Admissions** | **Rankings** | **Scholarships** | **Community** | **Compare** | `Search` | `Sign in`.

No emoji nav, no unnecessary marketing slogans, no forced account for browsing. Desktop nav uses sticky compact bar; mobile uses search + hamburger or bottom nav with clean labels. All nav labels/links/visibility/order are admin-configurable and safely versioned.

### Route inventory
| Route (proposed) | Purpose | Viewer |
|---|---|---|
| `/` | search-oriented home, trending admissions, updates, verified highlights | all |
| `/universities` | searchable 181-entry directory; filters + card/list | all |
| `/universities/[slug]` | each institution's permanent public page | all |
| `/universities/[slug]/programmes` | faculty/department hierarchy and complete programmes | all |
| `/universities/[slug]/admissions` | admission sessions, admission units, seats, policy, deadlines | all |
| `/universities/[slug]/fees` | detailed cost calculator and tuition tables | all |
| `/universities/[slug]/scholarships` | scholarship/waiver catalogue | all |
| `/universities/[slug]/rankings` | edition-specific ranks and methodologies | all |
| `/universities/[slug]/reviews` | rating + review filtering/sorting | all; posting logged in |
| `/universities/[slug]/community` | that university feed, Q&A and groups | all; posting logged in |
| `/programmes` | program-first search (CSE, BBA, Law, MBA, etc.) | all |
| `/programmes/[id]` | full programme and admission details | all |
| `/admissions` | cycle/intake explorer, active applications, calendar | all |
| `/admissions/[id]` | intake/unit-specific eligibility, seats, viva | all |
| `/rankings` | QS/THE/global/regional/subject/year and explanation | all |
| `/scholarships` | scholarship explorer and eligibility filters | all |
| `/compare` | compare up to four university/programme options | all |
| `/community` | global community, posts, topics and Q&A | all |
| `/community/post/[id]` | post/replies | all |
| `/messages` | consent-based user-to-user direct messages | signed in |
| `/saved` | bookmarks, shortlist, comparison history, alerts | signed in |
| `/profile/[handle]` | public-safe user page and contributions | all |
| `/account` | private settings, privacy, notification settings | owner |
| `/notifications` | replies, saves, DM requests, admission alerts | owner |
| `/submit-correction` | report official-data errors with source URL | all |
| `/about`, `/methodology`, `/sources`, `/contact`, `/privacy`, `/terms`, `/guidelines` | trust and policy content | all |
| `/admin` | separate secure admin shell; not linked publicly | authorized staff |
| `/admin/*` | CMS/roles/moderation/analytics/audit/data ingest/site settings | authorized staff |

### Discover filters (all combinable, persist in URL)
University type; division/district/city; public/private; institution state/UGC verification; subject/faculty/programme/degree; academic track; study mode; programme duration; credit range; intake; admission open; HSC/SSC group; minimum GPA rules; admission test/viva required/waived; tuition band; scholarship availability; gender-specific restriction where explicitly stated; QS/THE edition/rank bands; language; research facilities; university housing; accessible facilities when verified.

Sort choices: name, newest founding year, location, verified newest admission update, tuition *ascending only where comparable*, ratings (with minimum samples), ranking (selected publisher & edition), and `Recommended` (clearly explained, not presented as official rank).

---

## 3. HOME PAGE — EXACT SECTION ORDER

1. **Header**: logo, key navigation, clean search icon, sign in/avatar.
2. **Hero**: heading “Find the right university and programme in Bangladesh.” Supporting microcopy: “Verified sources. Admission details. Student perspectives.” Search bar with autocomplete for institutions, programs, districts; tab chips `University` / `Programme` / `Admission`.
3. **Directory snapshot**: counts **with source and snapshot date**, not fixed forever; Public / Private / International / CBHE. Note UGC listing ≠ full approval.
4. **Explore by degree/discipline**: Bachelor, Master, PhD, diploma/short course (only when verified); Engineering/CS, Business, Arts, Social Sciences, Health, Agriculture, Law, etc. Taxonomy admin-editable.
5. **Admissions to watch**: official deadline, open/closed state, eligible groups, exact source link; expiry automatic.
6. **University discovery**: carousel/card/list with authentic logos, category, location, programme count, status, rankings with edition, user rating + review count. No made-up top picks.
7. **Compare universities**: up to 4 + visible criteria preview; custom compare button.
8. **Scholarships & financial aid**: calls, status, deadline, funding type, target applicants, issuer.
9. **Rankings Explorer**: user picks QS/THE/etc., year, world/Asia/subject; display only valid listed records; explanation of methodology.
10. **Community updates**: useful public posts from university groups with moderation controls; do not mix unverified opinions with official announcements.
11. **How the data is checked**: UGC / institution / ranking-publisher badges as explanatory text, checked-date, source links.
12. **Footer**: sitemap, methodology, sources, privacy, guidelines, corrections, contact; all CMS editable.

Homepage content modules can be inserted/removed/reordered by Admin Layout Builder without redeployment, except code-defined critical security/admin flows.

---

## 4. UNIQUE UNIVERSITY DETAIL PAGE — EVERY RECORD HAS ONE

**Canonical sample:** `/universities/university-of-dhaka`; redirects for abbreviations and former official names. All 181 directory entries must resolve to a page, even if some sections show pending verification.

### 4.1 Header / cover area
- University logo (official or approved; generic monogram fallback), wide campus photo with copyright/source, official full name and abbreviation, alternative/previous names separately.
- University type, district/division, campus map, founding year (if verified); direct site/contact icons.
- Three separate provenance labels: `UGC directory entry`, `Regulatory/notice status`, `Programme/Admission status`.
- Ranking summary: **provider + edition + band** only; ratings summary: `Community rating X.X/5 · N reviews` (not official ranking).
- CTA: `Official website`, `View admissions`, `Compare`, `Save`, `Ask the community`, `Share`.
- If regulatory concern exists, a prominent **neutral caution banner** with source URL and effective date; never bury it.

### 4.2 Sticky tabs
`Overview` · `Programmes` · `Admissions` · `Fees` · `Scholarships` · `Rankings` · `Campus & Facilities` · `Reviews` · `Community` · `Contact`.

### 4.3 Overview
- About and history, founding act/charter date versus academic operations start date (distinct).
- Campus type (main/temporary/permanent/branch), address, map coordinates verified; residential status.
- Chancellor/VC/Registrar/other admin contacts if official and current (date stamp).
- Student/faculty/ratio and research metrics **only** if sourced with year.
- Affiliations, academic calendar, library/labs, transport, accommodation, clubs, research centres, international collaboration (each optional verified).
- UGC-approved programmes section where official verification exists; avoid treating a listed faculty as universal approval for any self-advertised programme.
- Downloadable university brochure/academic policy/prospectus (respect licenses) and official documents links.

### 4.4 Programs and hierarchy
`Institution > Campus > Faculty/School > Department > Programme > Specialisation/Track > Intake/Policy version`.
Each programme displays: programme code, full title, UG/PG/PhD/certificate/diploma, award (BSc/BA/LLB/etc.), duration in years/semesters, total credits, minimum/maximum time if specified, term system, major/minor/optional concentration, compulsory and optional course list with prerequisites, curriculum version, language, delivery mode, accreditation/professional approval where evidence exists, internship/thesis/capstone, graduation requirement, credit transfer/waiver policy, course catalogue & official PDF link.

**Do not default every BSc to 4 years or every MSc to 2 years; record programme-specific official duration.** If no current evidence, show `Not verified`.

### 4.5 Admission policy, seats and tests — intake-specific and comprehensive
Separate **institutions** from **annual/sessional admissions**. For each admission round:
- `session` (e.g., 2026–27), intake/term (Spring/Summer/Fall or university-defined), degree, faculty/department/seat/unit.
- Open/close dates, times in `Asia/Dhaka`, late submission, correction windows, fee payment deadline, exam date, admit-card collection, result, viva/interview, admission confirmation, class start.
- Eligibility: SSC+HSC GPA combined and individual, minimum subject GPAs, science/commerce/humanities, exam pass year, English/Math requirements, O/A-Level & equivalent, diploma, HSC improvement rules, foreign students, bachelor's CGPA for master's, experience/research proposal/portfolio for selective programmes.
- Unit / group / academic department, total seats, general seats, reserved/quota seats by category when published, seat breakdown by shift/campus, seat changes and notice date.
- Selection policy: direct admission, merit, GPA-based, MCQ, written, mathematics/physics/English/aptitude, negative marking, pass mark, aggregate merit formula, viva/interview/portfolio/practical/fitness if required, exam mode, centers, result publication method, waiting list, subject choice, migration, appeals.
- Application fee, test fee, document upload specs and official links; admission-specific helpdesk.
- `May I apply?` local rules-based checklist: **“Potentially eligible / Not enough data / Does not meet stated condition”** and exact source, **never** promised admission.
- Expired cycles remain in archives clearly marked; never silently replace past circulars.

### 4.6 Fees and total cost calculator
Record BDT and effective term; include one-time admission/application fee, tuition per credit, standard credit load, lab/studio/library/registration/exam/semester fee, activity fee, transport/residence (optional and separate), graduation/certificate fee, retake fee where public, VAT/tax only if lawfully applicable and stated; discount and waiver rules; refund schedule; deadlines for instalments.

**Formula (illustrative engine; do not publish without filled official inputs):**  
`Gross academic estimate = (required payable credits × rate per credit) + (number of charged terms × mandatory term charges) + one-time charges + other required charges`  
`Indicative net estimate = gross estimate − verified eligible tuition-waiver amount`.

Display both `published official schedule` and `calculator estimate`; clearly show price basis, excluded expenses, assumptions, change date, source and currency. Dormitory/living costs separate; no universal BDT total for entire university.

### 4.7 Scholarships and waivers
Award name, issuer (UGC/government/university/private), level, department restriction, eligible citizen/status, need/merit/athletics/other, full/partial, `% tuition waiver` vs cash award vs living grant, amount/currency/period, CGPA threshold, income thresholds if officially stated, application process, required documents, source, submission date, renewal and cancellation policies, whether stackable, award seats if announced, year/term; `open/closed/unconfirmed`.

### 4.8 Rankings detail
Display publisher tabs `QS World`, `QS Asia`, `QS Subject`, `THE World`, `THE Subject`, and other methodologies only if sourced/allowed. Years 2027/2026/etc., exact rank vs tied rank vs band, `Not ranked` vs `no record`, optional verified indicators and historical chart. **Never merge publishers into one pseudo-global official rank.** Methodology and source-link adjacent to every ranking. Category-scoped `Bangladesh position within QS 2027 displayed institutions` possible only if computed transparently with tie and band handling, and labelled *platform-derived*, not UGC.

### 4.9 Reviews
1–5 stars plus optional structured dimensions (teaching, administration, facilities, campus, affordability, career support). Reviewer relationship (current student/alumnus/applicant/guardian/other) as *self-declared* or *verified*, cohort/year, academic level, department, pros/cons, detailed review, photos optional, helpful votes, replies, edit history, content-report and appeal. One primary active review per person/university; moderation to prevent fake/bought reviews. Show **sample size, date range and verification percentage**; do not display average as robust if fewer than threshold e.g. `<5 reviews` = `Not enough reviews` suggested default, adjustable by admin.

### 4.10 University feed
University-filtered posts/Q&A/news; topic tags `Admissions`, `Results`, `Department`, `Campus life`, `Housing`, `Scholarships`, `Events`, `Student experience`, `Safety` etc.; university representative official-statement posts have explicit identity verification. Regular students may **never** appear as official university accounts without verification.

### 4.11 Contact
Official website, admission link, campus addresses, Google Maps/other map official source when verified, registrar/admission office phone/email, office hours if published, social links only if official, contact source checked date. Telephone and email contact-click events tracked in aggregate only; no unsolicited scraping of personal numbers.

---

## 5. PROGRAMME-FIRST DISCOVERY

Search by programme or career interest, not just university name. Per programme card: institution, verified award, duration, credits, fee basis, latest admission intake, relevant source/date, status, international ranking if relevant **at institution level**, community rating separately. Filters: equivalent programmes (CSE vs CS vs Software Engineering distinguished), subject, professional credential, duration, location, cost, admission testing, HSC background, waiver, full-time/part-time, thesis/research track. Results should not imply that similarly named programmes have identical approval.

**Special degree pathways:** public admission units; National University affiliated colleges; Bangladesh Open University distance tracks; national medical universities and specialist institutions; IUT/AUW/international and CBHE; constituent colleges/affiliates must be represented as separate entities/relationships rather than incorrectly treating each as standalone UGC university.

---

## 6. ADMISSIONS CENTRE

Core views: active admissions, public-versus-private, by university, by programme, by admission unit, by month/calendar, upcoming application deadlines, written exam, viva, results, class start, fee schedule.

**Admission page mandatory fields** (`admission_cycle` + `admission_unit` + `admission_policy` + `seat_allocation`):
- Session, degree, intake, university, unit code/name, programs covered.
- Admission route (direct/centralized/unit-test/etc.) and official portals; shared tests only when documented.
- Criteria: SSC/HSC grades and combined thresholds; required subjects; pass years; O/A Level conversion; bachelor degree/CGPA; language; quota; prior enrollment restrictions.
- Evaluation: MCQ/written/viva/practical/portfolio, duration, marks, pass mark, weighting, negative marking, exam centers, result release.
- Seats: total, by unit, programme, shift, quota, campus; source and revision history.
- Documents: photograph, signature, certificates, transcripts, national ID/birth certificate if required, freedom-fighter/quota documents etc., explicitly conditional.
- Apply URL, application open/close, fee and payment, admit card, attendance rules, merit lists, waiting/migration, cancellation/refund, admission office contact.

**Admission alerts:** alert by university/degree/programme; notify deadline opening/change, test date, seat or official policy revisions; rate-limited and opt-in. Every notification points to source and visible timestamp. Never send “confirmed admission” without official credentialed integration.

**Admin workflow:** draft intake → source attach → eligibility logic review → second approval for high-impact changes → schedule publish → optional alert → archive/supersede. Emergency regulatory notice bypasses delay but retains required record/audit.

---

## 7. COSTS, SCHOLARSHIPS & STUDENT HELPERS

- `Estimate total cost` per programme and intake; slider for credits/term only where university offers that flexibility; actual published fee schedule remains intact.
- `Budget finder` shows institutions matching estimated ranges only if comparable schedules exist.
- `Scholarship match` rule-based suggestions (not guarantee), with separate condition for CGPA/SSC-HSC/department/income/test result and waiver renewals.
- `Fees vs fees` compare all components; highlight unknown fields, term lengths, credit counts.
- `Admission checklist` saved per university; `deadline tracker` + calendar export ICS (later).
- `Shortlist` and `compare` with shareable links that don't reveal private grades.
- `Ask alumni/current students` Q&A; answers labelled user/community.
- `Report incorrect fee` source-backed corrections.
- `Entrance exam prep resources` only as links to legally reusable/public materials; no copyrighted question-bank cloning.
- `Placement / career outcomes` only if sourced, methodology/year shown; optional future feature.

---

## 8. COMMUNITY — POSTS, LIKES, COMMENTS, SHARES, MESSAGING

### Content types
`post`, `question`, `discussion`, `event`, `community notice`, `verified institution announcement`, `review`, `reply`, `poll` (later), `resource/link`, `direct message`.

### Posting
- Browsing anonymously; sign-in required to post or message.
- Rich text safely limited; images/PDF links/attachments with virus scanning; alt text; optional links; photo upload quotas; no executable HTML, SVG scripts, or embedded arbitrary JavaScript.
- Target one university, multiple universities (restrictions to prevent spam), department/programme and tags; global feed may aggregate.
- Draft, publish, edit with edit badge, delete by owner; soft delete and recovery window; report content and block/mute users.
- Native reactions/likes, threaded replies (configurable maximum depth), mention/autocomplete, bookmarks, share/copy links, report button on every post/comment.
- University-specific and degree-specific groups, verified university staff account, polls/events after MVP.
- Search/sort `Newest`, `Relevant`, `Questions unanswered`, `Admissions`, `Following`; feed uses transparent scoring; no engagement manipulation.

### Direct messaging
- Message request/accept/decline model; inbox default allows DMs from accepted contacts, configurable privacy.
- 1:1 chat; group conversations later. Send text/approved media, delivery/read indicators (optional), typing presence (optional), unread counts, delete for me, block/report user, report specific message, contact-safety settings.
- **Privacy rule:** ordinary admins/moderators do NOT have unrestricted casual access to private DM bodies. Access to reported messages or exceptional safety/legal case requires strictly scoped, logged, approved access and retention rules. Platform infrastructure still can technically store/process non-E2EE messages; **do not claim end-to-end encryption unless actually implemented**.
- No unsolicited university marketing DMs; rate limits, anti-spam and anti-harassment.

### Reviews and ratings governance
- University-specific single active primary rating per user, signed-in account age/anti-spam checks; demographic relationship claim distinct from verified enrollment.
- Verification options: private official email/domain OTP or voluntary redacted enrollment proof, processed with minimal retention; do not publicly expose IDs or documents.
- Review replies from verified representatives and reviewers; public dispute/correction process.
- `Review removed` reasons logged; admin may unpublish/hide/suspend/remove **but should not silently rewrite a genuine user's experience**. User edits retain audit history.
- Weighted rating suggestions must disclose methodology. Raw star mean with review count is more transparent as initial implementation; anti-abuse thresholds.

### Moderation/safety
- Anti-doxxing, no student ID/contact leaks, no forged admission circulars, hate/harassment/threats, exam cheating offers, impersonation, paid fake reviews, referral scams, false claims presented as fact.
- Report categories, case inbox, evidence links, severity, SLA, sanctions (warning/post removal/temp ban/permanent ban), appeals, escalation for imminent risks.
- Differentiate opinion (`I found the support slow`) from factual allegations requiring verification. Do not automatically delete all negative reviews.

---

## 9. ACCOUNTS, ROLES, PERMISSIONS

### User accounts
Email/password signup (name or display name, unique handle, email, password minimum 8 plus compromised-password checks), Google optional, email verification, reset, sessions and devices, privacy settings, account deletion and export, avatar, university affiliation self-reported (optional), degree/year/department optional, explicit opt-in for notifications, profile discoverability. Do not require public display of personal student ID or grades.

### RBAC — server-side only
| Role | Main scope | Can publish official facts? | Can moderate? |
|---|---|---|---|
| Visitor | Browse/search/view verified public data and reviews | No | Report only |
| Registered user | Post/comment/like/review/DM after consent; saved lists | No | Own content controls |
| Verified student/alumnus | Same plus verification indicator | No | Own content |
| Verified university representative | Manage their institution's **non-regulatory** submitted updates/events; reply officially | Only via review/approval workflow | Own org posts; no power to suppress reviews |
| Content editor | Create/edit draft university/programme/admission CMS fields | Draft; publish by approval rules | Limited |
| Fact checker | Verify UGC/university/ranking source, mark conflicts | Approve verified facts, no self-review of own edits on high-risk data | No blanket powers |
| Community moderator | Review report cases, remove spam, bans within limits | No | Yes |
| Support agent | Tickets and error reports | No | Limited |
| Admin | Manage platform CMS, theme, pages, user roles (within safeguards), moderation, source workflow, analytics | Yes with audit | Yes |
| Super Admin / Owner | Full administrative control including RBAC, integrations, secrets configuration, recovery paths, staff access, security settings | Yes, audited | Yes, audited |

**Admin “everything user-visible” means:** all published descriptive texts, all university profiles and programme/admission/fee/seat/scholarship facts, source links, ranking imports, categories, page sections, imagery, website theme/menus, profile rules, announcements, alerts, community policies, polls/events, moderation controls, footer, legal CMS, SEO and dashboards are manageable through a centralized admin console. **Exception:** intrinsic factual provenance cannot be forged; user-generated reviews/DMs are subject to owner rights, data-protection principles and an audit log. No developer-only hidden admin backdoor.

### Required admin security
- Admin entry separate shell; admin account never inferred from public-email text; strictly server-authorized.
- Mandatory MFA/TOTP or passkeys for staff; step-up reauthentication for role grants/deletes, audit export, sensitive settings.
- 8+ character minimum password; rate limits, breached-password screening, secure hashing, secure/HTTP-only cookies, CSRF/XSS protection, controlled file uploads, revocable sessions.
- Role grants require audit and ideally second approval for Super Admin; last-owner cannot self-delete.
- Soft-delete and recycle bin before permanent delete with independent backup; impersonation **disabled** by default; no secret/API key printed in browser logs.
- Admin actions use optimistic concurrency and preview staging to avoid overwriting concurrent changes; production deployment decoupled from content edits.

---

## 10. COMPLETE ADMIN DASHBOARD / CMS MENU

1. **Overview**: KPIs, urgent verification issues, new admissions, content freshness queue, abuse queue, site health.
2. **Universities**: add/import/edit/merge/deduplicate, institution type, UGC reference, founding info, locations, contacts, cover/logo, visibility, alias/redirect, regulatory status, campus and approved programmes.
3. **Faculty & Departments**: hierarchical CRUD, link/reparent, curriculum catalogues and version control.
4. **Programmes**: all degrees/courses, duration, credits, specialisation, curriculum, entry rules, official documents, approved status.
5. **Admissions & Seats**: yearly intake CRUD, exam/viva/marking, seats/quotas, eligibility rules, circular attachments, application links, deadline alerts.
6. **Tuition & Cost**: programme/year/term fee schedules, components, calculator formula version, waivers, optional fees, effective dates.
7. **Scholarships**: awards, calls, restrictions, deadlines, amounts, issuers, renewals, benefit and expiry.
8. **Rankings**: ranking publishers, years, categories, score/rank/bands, licensed data import, comparison methodology, source.
9. **Reviews & Ratings**: moderation, authenticity flags, reports, aggregates/recalc, disputes, replies.
10. **Community**: posts/comments/Q&A/groups/events, hashtags, reported media, trends and spam.
11. **Messages Safety**: report intake & redacted case evidence; no unrestricted public/inbox reading interface for admins.
12. **Users & Roles**: accounts, role grant/revoke, verification, bans/reinstatement, account export/deletion, privacy incident actions.
13. **University Representatives**: verify claim of a university office via official-domain proof and manual paperwork; limited role and expiry.
14. **Pages & Content**: editable homepage, about, methodology, contact, help, FAQs, news, terms and community rules; WYSIWYG blocks with drafts/previews.
15. **Appearance / Design System**: upload/switch logo, favicon, banner; edit navigation/header/footer, layout, typography, color tokens, dark/light, cards, global announcements, responsive controls.
16. **Media Library**: image/documents, alternate text, licensing, sizes, URLs and linked records; trash and retention.
17. **Sources & Verification**: URL/source registry, capture and review dates, screenshot/file archived reference, diff detection, stale/warning queue, change proposals.
18. **Notifications**: in-app/email/push templates, broadcasts, audience, quiet hours, sent logs, opt-out policies.
19. **SEO & Localization**: slugs, title/meta, canonical, schema.org, redirects, Bangla/English translations, sitemap generation.
20. **Reports & Analytics**: popular pages, search gaps, comparison usage, submitter reports, adoption, moderation and import health; privacy-preserving.
21. **Audit Logs**: actor, action, before/after, source, user IP (retention-limited), timestamp, justification, approvals; immutable append-only storage.
22. **Data Import/Export**: UGC staging, official university CSV/JSON, bulk update previews, validation, failed rows, rollback; backups and restores.
23. **Integrations**: email delivery, object storage, maps, university partners, ranking data licensing, analytics, captcha/anti-spam; encrypted credentials.
24. **Site Settings**: menus, registration, posting/review/DM policies, support contacts, feature flags, safety limits, maintenance mode and status page.
25. **Security Centre**: admin MFA, login events, access reviews, abusive IP rules, incident logs, backup verification.

### Admin UI actions supported on managed objects
`Create` · `Read` · `Edit` · `Draft` · `Preview` · `Publish` · `Unpublish` · `Schedule` · `Archive` · `Restore` · `Duplicate` · `Merge` · `Import` · `Export` · `Assign reviewer` · `Attach source` · `View history` · `Rollback` · `Delete (soft)` · `Permanently delete (restricted)`.

A reliable nontechnical admin must not need GitHub commits to change content, logo, colors, menus, admission records, fee values, page text, and university images. Code changes and new structural features remain developer tasks.

---

## 11. DATA MODEL / DATABASE BLUEPRINT

**Proposed primary DB:** PostgreSQL. `UUID` PKs for live records, `slug` unique where needed, UTC timestamps stored + Bangladesh time localized in UI. Built-in full-text indexes first, specialized search later. All university and programme public data is structured, not hardcoded inside UI components.

### Main relational entities (minimum)
| Entity | Representative fields / relationships |
|---|---|
| `universities` | id, slug, name_en, name_bn, normalized_name, category enum, directory_listed, legal_status, admission_permission, founding_year, date_of_act, year_operations_started, summary, publication_status, source_verified_at, created_at, updated_at |
| `university_aliases` | university_id, alias, language, previous_name, slug_redirect |
| `university_campuses` | university_id, campus_type, label, address_bn/en, district_id, division_id, geocoordinates, approved_status, source_id |
| `university_contacts` | university_id/campus_id, contact_type, label, value, official_flag, source_id, verified_at |
| `university_links` | university_id, label, link_type, URL, source_id, validation_state |
| `faculties` | university_id, name, UGC approval evidence, order |
| `departments` | faculty_id, title, code, status, source_id |
| `programmes` | university_id, department_id, title, degree_level, award, duration_months, credits, medium, mode, curriculum_version, regulatory_status, source_id |
| `programme_courses` | programme_id, course_code, course_name, credits, type, prerequisites, catalog_year, source_id |
| `admission_cycles` | university_id, academic_session, intake, opens_at, closes_at, status, apply_url, source_id, supersedes_id |
| `admission_units` | admission_cycle_id, unit_code, department/programme relationships, exam_mode, mark_structure, viva_flag, subject_choice, official result URL |
| `admission_requirements` | admission_cycle/unit/programme_id, structured rule JSON, human description, exam-year constraints, source, effective date |
| `seat_allocations` | admission_cycle_id, unit/programme/campus, count, quota_category, source_id, revised_at |
| `admission_events` | admission_cycle_id, kind, datetime, timezone, note, source_id |
| `fee_schedules` | programme_id, intake/academic_year, currency, per_credit, per_term, admission_fee, lab_fee, extra_fee_components, effective_from, official_attachment, source_id |
| `scholarships` | university_id nullable, title, issuer, eligibility_rules, award_type, amount/percentage, duration, starts/ends, renewal, link, source_id |
| `ranking_publishers` | name, edition naming and license rules |
| `ranking_records` | university_id, publisher_id, ranking_type, edition_year, subject, geographic_scope, exact_rank nullable, rank_band_min/max nullable, tie_flag, source_id |
| `sources` | id, publisher, URL, source_type, title, published_at, captured_at, last_verified_at, effective_from/to, archive_reference, confidence, reviewer |
| `field_evidence` | entity_type, entity_id, field_path, source_id, claim_value_hash, fetched_at, verified_by, state |
| `data_change_requests` | submitted_by, entity, field, proposed_value, evidence, risk, status, reviewer, decision |
| `users` | id, public handle, display name, email, verified flag, role relations, privacy flags, deleted_at |
| `user_university_affiliations` | user_id, university_id, relationship, dept, dates, verification_state; no public ID-doc fields |
| `university_claims` | user_id, university_id, rep_type, work email, verification_evidence_ref, approved_by, expires_at |
| `posts` | author_id, university_id optional, programme_id optional, type, title, body, visibility, moderation_status, edited_at, deleted_at |
| `post_media`, `post_tags` | attached media and normalized hashtags |
| `comments` | post_id, parent_comment_id, author_id, body, status, edited_at |
| `post_reactions`, `comment_reactions` | unique(account,target,type) |
| `reviews` | author_id, university_id, relation, stars, dimension scores, body, verification_state, moderation_state, edit history |
| `review_helpful_votes` | user_id, review_id, vote, unique pair |
| `conversations`, `conversation_members`, `messages`, `message_requests` | private communication, consent, visibility, report/redaction and retention |
| `bookmarks`, `shortlists`, `comparisons` | user-id linked saved items |
| `reports`, `moderation_cases`, `moderation_actions`, `appeals` | safety evidence, decisions and appeals |
| `notifications`, `alert_subscriptions` | type, recipient, record scope, consent, send status |
| `cms_pages`, `cms_blocks`, `site_settings`, `navigation_items`, `theme_versions`, `media_assets` | dynamically editable frontend content |
| `roles`, `permissions`, `user_roles` | fine-grained authorization |
| `audit_events` | immutable admin action records |
| `import_runs`, `import_rows`, `source_monitor_events` | import workflow, row errors, diffs, recheck work |
| `divisions`, `districts`, `locations` | normalized geographic fields |

### Essential constraints
- Unique directory source key `(source, category, ugc_list_order)` for the **snapshot**; a separate stable primary UUID for institutions. Never use list order as university identity.
- `(university_id, slug)` aliases preserved for renamed universities; canonical unique slug collision management.
- Unique primary active review `(author_id, university_id)`; soft-deleted review replacement policy documented.
- University name alone not key; campus/affiliation separate.
- `rank_band_min`/`rank_band_max` do not imply a precise scalar rank; preserve `1401+` and `=600` raw display text.
- No zero amount for unknown fees; `NULL + status=unknown` and explanation.
- Need distinct `UNKNOWN`, `NOT_APPLICABLE`, `NOT_PUBLISHED`, `UNDER_REVIEW`, `VERIFIED`, `SUPERSEDED` states.
- Source and editorial snapshot required on each **high-impact** public fact.
- Every admin mutation transactional; every publish creates a content revision/history entry.

### Canonical JSON contract: university detail (illustrative schema values only)
```json
{
  "id": "uuid",
  "name": {"en": "University name", "bn": null},
  "category": "public|private|international|cbhe",
  "ugc": {
    "directory_listed": true,
    "institution_operating_status": "unknown",
    "admission_permission": "unknown",
    "directory_url": "https://www.ugc.gov.bd/universities",
    "notice_links": []
  },
  "founding_year": null,
  "campuses": [],
  "faculties": [],
  "departments": [],
  "programmes": [],
  "admission_cycles": [],
  "fees": [],
  "scholarships": [],
  "rankings": [],
  "contacts": [],
  "source_last_verified_at": null,
  "editorial_state": "draft"
}
```

### Proposed read API / domain operations
- `GET /api/v1/universities?category=&division=&query=&page=`
- `GET /api/v1/universities/{slug}`; `GET .../{slug}/programmes`, `/admissions`, `/fees`, `/scholarships`, `/rankings`, `/reviews`, `/posts`
- `GET /api/v1/programmes?subject=&level=&fee_max=`; `GET /api/v1/admissions?status=&session=&deadline_before=`
- `GET /api/v1/compare?university_ids=...`
- `POST /api/v1/reviews`, `/posts`, `/posts/{id}/replies`, `/messages/requests`, `/reports`
- `POST /api/v1/corrections` with URL/screenshot/license and rate limiting
- `GET/POST/PATCH/DELETE /api/v1/admin/...` for entity-scoped CMS, with RBAC/MFA and audit on every mutation
- REST/OpenAPI specification from validated schema; cursor pagination for feeds, page-based for directory; server-side filters and no hidden data in public JSON.

---

## 12. SOURCE INGESTION, VERIFICATION, DATA QUALITY PIPELINE

1. **Inventory bootstrap:** import the companion `UGC_181_UNIVERSITY_SEED_2026-11-06.json`. It contains all UGC directory names and site strings as **published**, the source/category/list order, notice flags, and explicit `NOT_VERIFIED` regulatory/operating/admission fields. 
2. **Staging rather than direct publish:** every import writes to `import_runs`, validates schema and duplicate matches, preserves previous snapshot; admin previews diff.
3. **Institution-level enrichment:** visit individual UGC university detail pages to capture founding year, campus, notices, contacts and UGC-listed faculties/approved programmes where available. No UGC detail = mark unknown, not guess.
4. **Notice review:** review star-marked/private-university notices, permanent-campus certificates and intake restrictions; note **effective date** and whether later notices supersede previous ones.
5. **Faculty/department/programme extraction:** official departmental catalogues, handbook/prospectus, per-programme source URLs, degrees/durations/credits.
6. **Admission and fees ingestion:** official university admissions circular of the **current** session, not arbitrary previous cycle; build structured eligibility and seat data; four-eyes review of high-impact edits.
7. **Ranking ingest:** exact ranking source, year and type, permitted reproduction; avoid mass scraping against TOS/licences; store attribution and links.
8. **Publish only verified fields:** individual field state can differ; page remains accessible and incomplete fields show `Not yet verified`.
9. **Update watcher:** prioritize expiry-sensitive admissions/fees/seat/notice updates, review changes manually for major items; use opt-in alerts after approval.
10. **Correction channel:** allow users to submit official source link; fact checker accepts/rejects with justification and history; visible correction banner where material.

### Freshness policy (product recommendation, NOT UGC mandates)
| Data class | Suggested recheck | Auto-expire or behavior |
|---|---|---|
| Live admissions/deadlines/exam/results | Daily during open period | `open` becomes expired at time; capture circular revisions immediately |
| Emergency UGC notices and restrictions | Daily watch | escalate immediately; source-confirm and publish warning |
| Seat numbers/eligibility | When new circular appears + at changes | Session-scoped; previous cycles archived |
| Tuition/waiver/scholarships | Each intake / monthly if open | Carry effective-year label; no unchecked carry-forward |
| Official programmes and curriculum | Each academic year or when changes observed | Preserve catalog version |
| Contacts and campus pages | Every 90 days | show last checked |
| Ranking | Each new published edition | preserve historical entries, never overwrite prior year |
| University core identity | Quarterly | official correction + redirect when renamed |

**Known anomalies to flag on import:** UGC homepage count conflict, names renamed during 2025–26, some raw website fields absent (`—`), malformed whitespace in `Z.H Sikder` URL string, trailing period on `Kishoreganj University` URL string, two institutions sharing a published site string e.g. `www.sau.edu.bd` appears for different named public institutions in the retrieved list, and UGC notice/star entries. These are **data quality flags** requiring verification, not permission to invent alternative addresses.

---

## 13. RANKING PRODUCT & EXAMPLE DATA (SOURCE CHECKED)

**Published QS 2027 examples** (not a complete Bangladesh top list):
| Institution | Publisher | Edition | Result | Official source |
|---|---|---|---|---|
| University of Dhaka | QS World | 2027 | `=600` | https://www.topuniversities.com/universities/university-dhaka |
| BUET | QS World | 2027 | `711–720` | https://www.topuniversities.com/universities/bangladesh-university-engineering-technology |
| North South University | QS World | 2027 | `901–950` | https://www.topuniversities.com/universities/north-south-university |

**Published THE 2027 examples:** BUET `1001–1200`, AIUB `801–1000` on their publisher profile pages. Sources: https://www.timeshighereducation.com/world-university-rankings/bangladesh-university-engineering-and-technology and https://www.timeshighereducation.com/world-university-rankings/american-international-university-bangladesh.

**Do not turn these into a fabricated national ranking.** A national ordering within the *same provider, edition and scope* requires complete applicable records and careful handling of equal ranks/bands. Ranking methodologies differ. If the source does not provide a university's result, show `Not listed in selected ranking` only after verifying that edition.

---

## 14. VISUAL DESIGN — DISTINCTLY PROFESSIONAL, NO 'CRINGE'

### Design direction
**Editorial, credible, spacious, information-first; Bangladesh-specific without flag gradients or cliché university-cap imagery.** Inspiration from modern research indexes, financial-data dashboards and serious education directories—not generic LMS template, giant emojis, glows or over-animated glassmorphism.

### Visual tokens (recommendation)
- Background: `#F7F8FA` warm-neutral; surface `#FFFFFF`; ink `#142436`; text secondary `#536273`.
- Primary brand: `#143A52` deep ink blue; subtle accent `#0D766E` teal; border `#E3E8EC`.
- Status tokens: neutral/deliberate warning/success only when semantically required; color alone never conveys status.
- Font: **Inter** (English/UI/numbers) + **Hind Siliguri** or **Noto Sans Bengali** for readable Bangla; 15–16px standard body desktop, comfortable mobile line-height.
- 8px base spacing; 8–12px card radius; restrained 1px border and light shadows; grid 12 columns desktop, 4 on mobile.
- Proper logo concept: simple **HE / open-page geometry** mark + wordmark `Higher Education in Bangladesh`, no graduation cap/emoji, no photographic logo. Favicon has small optical-safe icon.
- Cards: university name, location, category, official-source status, programme count only if known, QS/THE year-specified badge, rating + sample count. Don't show ranking and user ratings in same pill.
- Photographs: genuine university images, source/licensing evidence; neutral gradient placeholder with initials if unknown.
- Motion: 120–200ms purposeful transitions, `prefers-reduced-motion` support, no scroll hijacking.
- Accessible: WCAG 2.2 AA target, keyboard/focus, descriptive labels, contrast, proper responsive table alternatives, language attributes for Bangla/English.

### Desktop university page wireframe
```text
┌────────────────────────────────────────────────────────────────────────────┐
│ [CI] Universities  Programmes  Admissions  Rankings  Scholarships  Search │
├────────────────────────────────────────────────────────────────────────────┤
│ Directory / Universities / Institution                                  │
│ [logo]  Institution name                   [Compare] [Save] [Official site]│
│         Public • District • Founded (verified) • UGC listing/notice       │
├────────────────────────────────────────────────────────────────────────────┤
│ Overview | Programs | Admission | Fees | Funding | Ranking | Reviews ... │
├───────────────────────────────────────────────┬────────────────────────────┤
│ Institution summary / history / sources       │ Status & contact summary  │
│ Programs, study levels, faculties             │ Last checked + official   │
│ Latest verified admissions                    │ Quick actions             │
│ Tuition with cost formula                     │ Important deadlines       │
│ Scholarships & rankings by edition            │ Report an issue           │
│ Student reviews & community discussion        │                            │
└───────────────────────────────────────────────┴────────────────────────────┘
```

### Mobile constraints
- University primary actions remain reachable (sticky horizontal action strip if needed).
- Tabs scroll horizontally with visible focus, no nested vertical scrolling.
- Comparison converts to stacked row-by-row views; admission timelines become cards.
- No horizontal cut-off tables; minimum 44px touch targets; no excessive sticky overlays.
- Fast image loading, responsive thumbnails, dynamic type/zoom support, offline-safe error state.

### Admin design
Distinct dark-neutral sidebar, clear top search, 'Draft/Published' status in text; bulk select, sortable columns, validation highlights, preview beside edit, source drawer, role audit trail; always guard destructive actions with confirmation and undo wherever possible.

---

## 15. RECOMMENDED TECHNICAL IMPLEMENTATION

### Practical stack (design recommendation, not yet deployed)
- **Frontend:** Next.js App Router + TypeScript + React, Tailwind CSS, accessible component library (e.g. shadcn/ui), strict server/client boundaries.
- **Backend:** Next.js server endpoints for MVP or separately modular Node.js API for scale; Zod DTO validation and typed service layer.
- **Database:** PostgreSQL (Prisma or Drizzle; choose one consistently), migrations, PITR backups, FK + constrained enums.
- **Authentication:** Auth.js/Better Auth or vetted provider; email/password + optional Google OAuth; real MFA for admin, protected session and password reset.
- **Media:** S3-compatible private/public object storage with signed upload URLs, MIME and virus scans, thumbnail pipeline, quotas. Never store sensitive proofs in public buckets.
- **Search:** PostgreSQL trigram/full-text with Bangla-aware normalization and aliases; consider Meilisearch/OpenSearch only after real bottleneck.
- **Notifications:** transactional email provider + queued background jobs and optional on-site notifications; request consent.
- **Real-time chat:** WebSocket/realtime provider behind authenticated channels and consent checks, abuse protection and modest retention; use long polling if MVP budget is limited.
- **Metrics:** privacy-friendly analytics, server logs/observability with redaction, error monitoring, status/health checks.
- **Deploy:** Vercel or Docker-hosted Next.js; managed Postgres and object storage; test Cloudflare edge compatibility separately if choosing Workers; do not assume ORM/database/realtime will work identically on all edge runtimes.
- **CI/CD:** GitHub protected main branch, PR reviews, staging preview, tests/migrations, secret scanning, controlled production releases; admin content edits do NOT need a git deploy.

### Security and quality gates
- RBAC check on **every server action and query**, row-level scoping for user content and university representatives.
- Parameterized SQL, output escaping/sanitization, strict CSP, XSS/CSRF/SSRF defenses, disallow open redirects.
- External link URL allowlist/protocol validation; never fetch arbitrary user-provided URL on behalf of server without SSRF controls.
- Email verification, rate limits per action/account/IP, flood control, review anti-sybil, abuse appeals, moderation audit.
- Private chats do not leak into search/analytics, admin UI or unprotected logs.
- Regular DB backup and restoration exercises, lifecycle/retention policies, export/delete implementation, encryption at rest and TLS in transit.
- Security/privacy/legal review against Bangladesh applicable laws before launch; the specification is not legal advice.
- Copyright/license checks for QS/THE bulk ranking data, university logos, photos and documents; references and excerpts allowed only within rights.
- SEO controls and structured data only for confirmed values; no `AggregateRating` markup if ratings are manipulated/insufficient.

---

## 16. CONTENT WORKFLOWS, RELEASE PHASES & DEFINITION OF DONE

### Phase 0 — Sources, data & information design
Deliver: directory import 181 names; source registry; status enums; identified notice/URL anomalies; relational schema; UX wireframes; brand tokens; editorial source rules.

**Acceptance:** all 181 JSON records pass schema, each category count 61/116/3/1, every source URL retained, none labelled verified for admissions by default, data gaps marked explicitly.

### Phase 1 — Public directory + admin CMS MVP
Deliver: landing page, directory/search/filter, 181 per-university routable pages, about/contact/official-site sections, programme hierarchy starter, rank source/year representation, admin content CRUD, login/RBAC, correction submissions, responsive design, source/status indicators.

**Acceptance:** all pages route; every field edit persists after refresh and is audited; unknown fields do not display fake values; public pages require no account; no UGC endorsement implication.

### Phase 2 — Admissions, seats, fees & scholarships
Deliver: programme detail, admission cycles/eligibility/seats/viva/documents, deadline timeline, authoritative fee components and cost estimate, scholarships, comparisons, source-backed update workflow, optional alerts.

**Acceptance:** sample university records can express public unit-based and private term-based flows; source+session mandatory for high-risk data; no closed session displayed as current, no guess for unknown seats/fees.

### Phase 3 — Community & trust
Deliver: accounts, posts, comment threads, likes, bookmarks, university communities, reviews and ratings, report/block, moderation workflows, verification/appeals, notifications.

**Acceptance:** anti-spam limits; unauthorized user cannot edit other's posts; stars aggregated accurately from approved reviews; every report traceable; safe delete/restore; all UGC facts protected from community edits.

### Phase 4 — Messaging, richer tooling and organization roles
Deliver: consent-based messaging, official-representative claims, personalized shortlist, deeper compare/rank charts, notification preferences, mobile PWA, knowledge content, data quality monitor.

**Acceptance:** DMs visible only to authorized participants; reports allow narrowly scoped evidence escalation; role grants audited; alerts only to opted-in users.

### Phase 5 — Data completeness & scalable operations
Deliver: fully sourced programme/admission/fee verification across eligible institutions as data becomes available, automated source-change proposals, source health, translations, scale optimization, high-quality campus media and advanced recommendations.

**Acceptance:** explicit per-field coverage reports, timely updates, no unreviewed high-impact policy changes, backup restoration, accessibility/mobile/performance audits.

### Non-negotiable test matrix
1. 181/181 seed institutions resolve, valid category and source, missing website gracefully handled.
2. Public and private filters/geo/subject/search Bangla+English names work; slug aliases and redirects verified.
3. UGC flagged university cannot be marked `admission open` solely by manual checkbox without citation and approval; subsequent restriction overrides schedule.
4. Per-intake policies, entry year rules, unit/subject seats, viva/MCQ/written, scholarship conditions, fee formula accurately represent circulars.
5. `Not ranked`, rank band, tied rank and subject rank cannot be mixed; QS vs THE separated.
6. Reviews: single-primary review, edit history, verified labels, sample threshold, rating recomputation and appeals.
7. Community: content create/edit/reply/like/bookmark/share/report/block works and auth boundaries hold.
8. Messages: request/accept/block, cross-account isolation, no DM body in public API/admin analytics.
9. CMS: every visual component in `site_settings`/`cms_blocks` updates without code changes, including logos/menu/footer; published pages safe on preview/revert.
10. Admin RBAC/MFA logs, self-escalation denied, audit immutable, deletion/restoration and backup recovery validated.
11. Lighthouse/mobile/performance, keyboard accessibility, image licenses, metadata, source expiry, broken link monitoring.
12. Full production smoke test on multiple phones/desktop browsers, sign-up and reset, negative-path/API permission tests, moderation abuse cases.

### Production-ready definition
Complete code ≠ complete data. State **three separate coverage percentages**: `Platform feature completion`, `UGC directory coverage`, `Verified admission/programme/fee coverage`. Launch may have 100% directory coverage but lower academic-details coverage; show that honestly. No claim of all universities' fees/scholarships checked until source audited.

---

## 17. BUSINESS RULES, EDGE CASES AND CONSISTENCY

- UGC directory entries may include newer/not-yet-operational universities, universities without live websites, restrictive notices or changed names: always show that distinction.
- UGC list category international/CBHE is not the same as domestic public/private; use explicit legal/type labels.
- A programme's stated degree may differ by campus or cohort; store per version, not a single mutable text field.
- “Seats available” means *announced capacity*, not real-time remaining vacant seats unless integrated with official admission system.
- A public university's latest `programme seats` may change with quota; do not sum all quotas twice.
- “Admission viva required” can apply only to selected units/programmes; store `true`, `false`, or `unknown` and the source.
- HSC GPA equivalence and credit requirements are rules, not a generic fixed score across all schools.
- Course catalog is its own layer; do not assume all UGC approved faculties have complete public course descriptions.
- Ratings are user opinions, not independent academic rankings; share count and potential review bias.
- Cost calculation is a **planning estimate**, not official bill or guarantee.
- Admissions outside Bangladesh and cross-border institutions may use different rules; build flexible policies.
- National University/affiliated college and Open University models need relationships and special UX.
- English and Bangla spellings, name-change/renaming and old UGC links require alias mapping.
- If official data source is gone, keep a provenance record and mark last verified, avoid silently reusing content forever.
- If a directory site URL is malformed or unverified, don't make it clickable until manually verified.

---

## 18. MASTER DATA INVENTORY — UGC DIRECTORY NAMES (ALL 181)

**What this appendix is:** Names and website strings reproduced as a working seed from the public UGC category directory, captured 2026-11-06. UGC directory page order is **not ranking**. Website strings are **as published** and are **not independently confirmed to resolve**. Blank URL `—` = no website shown in the retrieved directory. `Notice/marker: check UGC` means the directory had a notice/star marker; **not** an independent legal assessment of the university. Current campus, official programme list, founding year, costs, scholarships, admission policies and seat counts must be enriched from primary sources before claiming completeness.


### 18.1 Public Universities — 61

Source: `UGC-01` from Section 1. UGC list order is not a quality/ranking order.

| UGC row | Name in UGC listing | Website string published by UGC | Notice flag |
|---:|---|---|---|
| 1 | University of Dhaka | www.du.ac.bd | — |
| 2 | University of Rajshahi | www.ru.ac.bd | — |
| 3 | Bangladesh Agricultural University | www.bau.edu.bd | — |
| 4 | Bangladesh University of Engineering & Technology | www.buet.ac.bd | — |
| 5 | University of Chittagong | www.cu.ac.bd | — |
| 6 | Jahangirnagar University | www.juniv.edu | — |
| 7 | Islamic University, Bangladesh | www.iu.ac.bd | — |
| 8 | Shahjalal University of Science & Technology | www.sust.edu | — |
| 9 | Khulna University | www.ku.ac.bd | — |
| 10 | National University | www.nu.edu.bd | — |
| 11 | Bangladesh Open University | www.bou.ac.bd | — |
| 12 | Bangladesh Medical University | www.bsmmu.ac.bd | — |
| 13 | Gazipur Agricultural University | https://gau.edu.bd/ | — |
| 14 | Hajee Mohammad Danesh Science & Technology University | www.hstu.ac.bd | — |
| 15 | Mawlana Bhashani Science & Technology University | www.mbstu.ac.bd | — |
| 16 | Patuakhali Science And Technology University | www.pstu.ac.bd | — |
| 17 | Sher-e-Bangla Agricultural University | www.sau.edu.bd | — |
| 18 | Chittagong University of Engineering & Technology (CUET) | www.cuet.ac.bd | — |
| 19 | Rajshahi University of Engineering & Technology (RUET) | www.ruet.ac.bd | — |
| 20 | Khulna University of Engineering & Technology (KUET) | www.kuet.ac.bd | — |
| 21 | Dhaka University of Engineering & Technology (DUET) | www.duet.ac.bd | — |
| 22 | Noakhali Science & Technology University | www.nstu.edu.bd | — |
| 23 | Jagannath University | www.jnu.ac.bd | — |
| 24 | Comilla University | www.cou.ac.bd | — |
| 25 | Jatiya Kabi Kazi Nazrul Islam University | www.jkkniu.edu.bd | — |
| 26 | Chittagong Veterinary and Animal Sciences University | www.cvasu.ac.bd | — |
| 27 | Sylhet Agricultural University | www.sau.ac.bd | — |
| 28 | Jessore University of Science & Technology | www.just.edu.bd | — |
| 29 | Pabna University of Science and Technology | www.pust.ac.bd | — |
| 30 | Begum Rokeya University, Rangpur | www.brur.ac.bd | — |
| 31 | Bangladesh University of Professionals | www.bup.edu.bd | — |
| 32 | Gopalganj Science & Technology University | www.bsmrstu.edu.bd | — |
| 33 | Bangladesh University of Textiles | www.butex.edu.bd | — |
| 34 | University of Barishal | www.bu.ac.bd | — |
| 35 | Rangamati Science and Technology University | www.rmstu.edu.bd | — |
| 36 | Bangladesh Maritime University | https://bmu.edu.bd/ | — |
| 37 | Islamic Arabic University | www.iau.edu.bd | — |
| 38 | Chittagong Medical University | www.cmu.edu.bd | — |
| 39 | Rajshahi Medical University | www.rmu.edu.bd | — |
| 40 | Rabindra University, Bangladesh | www.rub.ac.bd | — |
| 41 | University of Frontier Technology, Bangladesh | www.uftb.ac.bd | — |
| 42 | Netrokona University | https://www.shu.edu.bd/ | — |
| 43 | Khulna Agricultural University | www.kau.edu.bd | — |
| 44 | Jamalpur Science and Technology University | https://bsfmstu.ac.bd/ | — |
| 45 | Sylhet Medical University, Sylhet | www.bsfmmu.edu.bd | — |
| 46 | Aviation And Aerospace University, Bangladesh | www.aaub.edu.bd | — |
| 47 | Chandpur Science and Technology University | www.cstu.ac.bd | — |
| 48 | Kishoreganj University | bsmru.ac.bd. | — |
| 49 | Hobiganj Agricultural University | www.hau.ac.bd | — |
| 50 | Khulna Medical University, Khulna | www.shmu.ac.bd | — |
| 51 | Kurigram Agricultural University | www.kuriau.edu.bd | — |
| 52 | Sunamganj Science and Technology University | www.sstu.ac.bd | — |
| 53 | Pirojpur Science & Technology University | www.prstu.ac.bd | — |
| 54 | Naogaon University | — | — |
| 55 | Meherpur University | — | — |
| 56 | Bogra Science and Technology University | bstu.ac.bd | — |
| 57 | Dhaka Central University | https://dcu.ac.bd | — |
| 58 | Thakurgaon University | — | — |
| 59 | Lakshmipur Science & Technology University | — | — |
| 60 | Narayanganj Science and Technology University | — | — |
| 61 | শরিয়তপুর কৃষি বিশ্ববিদ্যালয় | — | — |

### 18.2 Private Universities — 116

Source: `UGC-02` from Section 1. UGC list order is not a quality/ranking order.

| UGC row | Name in UGC listing | Website string published by UGC | Notice flag |
|---:|---|---|---|
| 1 | North South University | www.northsouth.edu | — |
| 2 | University of Science & Technology Chittagong | www.ustc.edu.bd | — |
| 3 | Independent University, Bangladesh | www.iub.edu.bd | — |
| 4 | Central Women's University | www.cwu.edu.bd | — |
| 5 | International University of Business Agriculture & Technology | www.iubat.edu | — |
| 6 | International Islamic University Chittagong | www.iiuc.ac.bd | — |
| 7 | Ahsanullah University of Science and Technology | www.aust.edu | — |
| 8 | American International University-Bangladesh | www.aiub.ac.bd | ⚠ Check official notice/marker |
| 9 | East West University | www.ewubd.edu | — |
| 10 | University of Asia Pacific | www.uap-bd.edu | — |
| 11 | Gono Bishwabidyalay | www.gonouniversity.edu.bd | — |
| 12 | The People's University of Bangladesh | www.pub.ac.bd | ⚠ Check official notice/marker |
| 13 | Asian University of Bangladesh | www.aub.ac.bd | — |
| 14 | Dhaka International University | www.diu.ac | — |
| 15 | Manarat International University | www.manarat.ac.bd | — |
| 16 | BRAC University | www.bracu.ac.bd | — |
| 17 | Bangladesh University | www.bu.edu.bd | — |
| 18 | Leading University | www.lus.ac.bd | — |
| 19 | BGC Trust University Bangladesh | www.bgctub.ac.bd | — |
| 20 | Sylhet International University | www.siu.edu.bd | — |
| 21 | University of Development Alternative | www.uoda.edu.bd | — |
| 22 | Premier University | www.puc.ac.bd | — |
| 23 | Southeast University | www.seu.edu.bd | — |
| 24 | Daffodil International University | www.daffodilvarsity.edu.bd | — |
| 25 | Stamford University Bangladesh | www.stamforduniversity.edu.bd | — |
| 26 | State University of Bangladesh (SUB) | https://www.sub.ac.bd | — |
| 27 | City University | www.cityuniversity.ac.bd | — |
| 28 | Prime University | www.primeuniversity.edu.bd | — |
| 29 | Northern University Bangladesh | www.nub.ac.bd | — |
| 30 | Southern University Bangladesh | www.southern.edu.bd | ⚠ Check official notice/marker |
| 31 | Green University of Bangladesh | www.green.edu.bd | — |
| 32 | Pundra University of Science & Technology | www.pundrauniversity.ac.bd | ⚠ Check official notice/marker |
| 33 | World University of Bangladesh | www.wub.edu.bd | ⚠ Check official notice/marker |
| 34 | Shanto-Mariam University of Creative Technology | www.smuct.ac.bd | — |
| 35 | The Millennium University | www.themillenniumuniversity.edu.bd | — |
| 36 | Eastern University | www.easternuni.edu.bd | — |
| 37 | Metropolitan University | www.metrouni.edu.bd | ⚠ Check official notice/marker |
| 38 | Uttara University | www.uttarauniversity.edu.bd | — |
| 39 | United International University | www.uiu.ac.bd | — |
| 40 | University of South Asia | www.southasiauni.ac.bd | — |
| 41 | Victoria University of Bangladesh | www.vub.edu.bd | ⚠ Check official notice/marker |
| 42 | Bangladesh University of Business & Technology (BUBT) | www.bubt.edu.bd | — |
| 43 | Presidency University | www.presidency.edu.bd, www.pu.edu.bd | — |
| 44 | University of Information Technology & Sciences | www.uits.edu.bd | — |
| 45 | Primeasia University | www.primeasia.edu.bd | — |
| 46 | Royal University of Dhaka | www.royal.edu.bd | — |
| 47 | University of Liberal Arts Bangladesh | www.ulab.edu.bd | — |
| 48 | Atish Dipankar University of Science & Technology | www.adust.edu.bd | — |
| 49 | Bangladesh Islami University | www.biu.ac.bd | — |
| 50 | ASA University Bangladesh | www.asaub.edu.bd | — |
| 51 | East Delta University | www.eastdelta.edu.bd | — |
| 52 | European University of Bangladesh | — | ⚠ Check official notice/marker |
| 53 | Varendra University | www.vu.edu.bd | — |
| 54 | Hamdard University Bangladesh | www.hamdarduniversity.edu.bd | — |
| 55 | BGMEA University of Fashion & Technology(BUFT) | www.buft.edu.bd | ⚠ Check official notice/marker |
| 56 | North East University Bangladesh | www.neub.edu.bd | ⚠ Check official notice/marker |
| 57 | First Capital University of Bangladesh | www.fcub.edu.bd | — |
| 58 | Ishakha International University, Bangladesh | www.ishakha.edu.bd | — |
| 59 | Z.H Sikder University of Science & Technology | www. zhsust.edu.bd | — |
| 60 | Exim Bank Agricultural University, Bangladesh | www.ebaub.edu.bd | — |
| 61 | North Western University | www.nwu.ac.bd | — |
| 62 | Khwaja Yunus Ali University | www.kyau.edu.bd | — |
| 63 | Sonargaon University | www.su.edu.bd | — |
| 64 | Feni University | www.feniuniversity.ac.bd | — |
| 65 | Britannia University | www.britannia.edu.bd | — |
| 66 | Port City International University | www.portcity.edu.bd | — |
| 67 | Bangladesh University of Health Sciences | www.buhs.ac.bd | — |
| 68 | Chittagong Independent University | www.ciu.edu.bd | — |
| 69 | Notre Dame University Bangladesh | www.ndub.edu.bd | — |
| 70 | Times University, Bangladesh | http://www.timesuniversitybd.com | — |
| 71 | North Bengal International University | www.nbiu.edu.bd | — |
| 72 | Fareast International University | www.fiu.edu.bd | — |
| 73 | Rajshahi Science & Technology University (RSTU), Natore | www.rstu.edu.bd | — |
| 74 | Brahmaputra International University | www.sfmu.ac.bd | — |
| 75 | Cox's Bazar International University | www.cbiu.ac.bd | — |
| 76 | R. P. Shaha University | www.rpsu.edu.bd | — |
| 77 | German University Bangladesh | www.gub.edu.bd | — |
| 78 | Global University Bangladesh | www.globaluniversity.edu.bd | ⚠ Check official notice/marker |
| 79 | CCN University of Science & Technology | www.ccnust.ac.bd | — |
| 80 | Bangladesh Army University of Science and Technology (BAUST), Saidpur | www.baust.edu.bd | — |
| 81 | Bangladesh Army University of Engineering and Technology (BAUET), Qadirabad | www.bauet.ac.bd | — |
| 82 | Bangladesh Army International University of Science & Technology(BAIUST) ,Comilla | www.baiust.ac.bd | — |
| 83 | University of Scholars | www.ius.edu.bd | — |
| 84 | Canadian University of Bangladesh | www.cub.edu.bd | — |
| 85 | N.P.I University of Bangladesh | www.npiub.edu.bd | — |
| 86 | Northern University of Business & Technology, Khulna | www.nubtkhulna.ac.bd | — |
| 87 | Rabindra Maitree University, Kushtia | — | — |
| 88 | University of Creative Technology, Chittagong | www.uctc.edu.bd | — |
| 89 | Central University of Science and Technology | www.cust.edu.bd | ⚠ Check official notice/marker |
| 90 | Tagore University of Creative Arts, Uttara, Dhaka, Bangladesh | www.tuca.edu.bd | — |
| 91 | University of Global Village | www.ugv.edu.bd | — |
| 92 | Rupayan A.K.M Shamsuzzoha University | — | ⚠ Check official notice/marker |
| 93 | Anwer Khan Modern University | www.akmu.edu.bd | — |
| 94 | ZNRF University of Management Sciences | www.zums.edu.bd | — |
| 95 | Ahsania Mission University of Science and Technology | www.amust.ac.bd | — |
| 96 | Khulna Khan Bahadur Ahsanullah University | www.kkbau.ac.bd | — |
| 97 | Bandarban University | www.bubban.ac.bd | — |
| 98 | Shah Makhdum Management University, Rajshahi | — | ⚠ Check official notice/marker |
| 99 | Trust University, Barishal | www.trustuniversity.edu.bd | — |
| 100 | International Standard University | www.isu.ac.bd | — |
| 101 | University of Brahmanbaria | www.uob.edu.bd | — |
| 102 | University of Skill Enrichment and Technology | www.uset.ac.bd | ⚠ Check official notice/marker |
| 103 | Microland University of Science and Technology | — | ⚠ Check official notice/marker |
| 104 | R.T.M Al-Kabir Technical University | www.rtm-aktu.edu.bd | — |
| 105 | Dr. Momtaz Begum University of Science and Technology (MUST) | www.must.ac.bd | — |
| 106 | Chattogram BGMEA University of Fashion and Technology | www.cbuft.edu.bd | — |
| 107 | Bangladesh Army University of Science and Technology, Khulna | www.baustkhulna.ac.bd | — |
| 108 | Teesta University, Rangpur | www.teestauniversity.ac.bd | — |
| 109 | International Islami University of Science and Technology Bangladesh (IIUSTB) | www.iiustb.ac.bd | — |
| 110 | Lalon University of Science and Arts | https://lusa.ac.bd | — |
| 111 | Justice Abu Zafar Siddiquie Science and Technology University, Kustia | — | ⚠ Check official notice/marker |
| 112 | Grameen University | — | — |
| 113 | IBAIS University | — | ⚠ Check official notice/marker |
| 114 | The University of Comilla | — | ⚠ Check official notice/marker |
| 115 | Queens University | — | ⚠ Check official notice/marker |
| 116 | America Bangladesh University | — | ⚠ Check official notice/marker |

### 18.3 International Universities — 3

Source: `UGC-03` from Section 1. UGC list order is not a quality/ranking order.

| UGC row | Name in UGC listing | Website string published by UGC | Notice flag |
|---:|---|---|---|
| 1 | Islamic University of Technology (IUT), Gazipur | www.iutoic-dhaka.edu | — |
| 2 | Asian University for Women | www.auw.edu.bd | — |
| 3 | South Asian University | www.southasianuniversity.org | — |

### 18.4 Cross-Border Higher Education (CBHE) — 1

Source: `UGC-04` from Section 1. UGC list order is not a quality/ranking order.

| UGC row | Name in UGC listing | Website string published by UGC | Notice flag |
|---:|---|---|---|
| 1 | UCSI University, Malaysia ( Bangladesh Campus) | www.bangladesh.ucsiuniversity.edu.my | — |

---

## 19. SUGGESTED SOURCE/DATA FILE ORGANIZATION

The repo may adopt this structure (illustrative; adapt to framework and deployment):

```text
hebd/
  README.md
  docs/
    HEBD_MASTER_WEBSITE_BLUEPRINT_v2.0.md
    source-policy.md
    permissions-matrix.md
    moderation-policy.md
    data-dictionary.md
  data/
    seeds/
      UGC_181_UNIVERSITY_SEED_2026-11-06.json
    source-registry.json
    editorial-coverage.json
  apps/
    web/
      app/(public)/...
      app/admin/...
      components/{layout,directory,admissions,community,forms,admin}/...
      lib/{auth,db,permissions,search,verification,fees,rankings}/...
      styles/...
  packages/
    domain-schemas/
    ui/
  scripts/
    seed-universities.ts
    validate-ugc-import.ts
    check-official-links.ts
    verify-data-coverage.ts
  tests/
    unit/
    integration/
    e2e/
    security/
  .github/workflows/
  .env.example
```

### Repo and design rules
- `.env.example` contains variable names only, never actual credentials; CI secret scanning mandatory.
- Seed import must be **idempotent** and cannot overwrite verified newer records without approved reconciliation.
- Separate marketing/community public UI from admin route group with authenticated server checks; CSS isolation prevents admin design leaking into public pages.
- Use real DB CRUD with automated tests—not hardcoded sample text cards or pretend-click buttons.
- Do not claim all university programme/admission datasets exist just because 181 directory records exist.
- Images/logos from official/authorised assets only, otherwise neutral placeholder.
- Every important visible claim has a source icon or “Last verified” state; links open safely in a new tab with appropriate protection.
- Reusable faculties, departments and programmes should not be duplicated manually for each profile.
- Critical time-dependent admission status calculated from official time windows (Asia/Dhaka) and supersession state.

---

## 20. FIRST IMPLEMENTATION BRIEF / BUILD PROMPT (COPY INTO A CODING AGENT)

> **Historical v1 implementation prompt — superseded by the full HEBD v2 directive in Section 35.** Build **Higher Education in Bangladesh (HEBD)**, a bilingual Bangla/English, accessible, information-first and moderation-safe Bangladesh university directory and community platform. Use this Master Requirements file as the functional specification. Import `UGC_181_UNIVERSITY_SEED_2026-11-06.json` as the initial **directory-listed** records (61 public / 116 private / 3 international / 1 CBHE); do not present them as 181 fully operational/admission-approved universities. Every seed record needs a persistent separate `/universities/[slug]` page, and missing programme/fee/admission facts must display `Not yet verified`. Build public home, directory search/filter, profile pages, programmes, admissions, fee calculator, scholarship explorer, ranking publisher/year separation, compare and university-specific community. Create email/password sign-in plus optional Google, user posts/comments/likes/bookmarks/reviews and later consent-based DMs; include rate limits, abuse reports and verification. Create complete secure Admin CMS for every **platform-managed** user-visible page, university/programme/admission/fee/seat data, themes/logo/nav/footer/content modules, moderation, source verification, imports, user roles, analytics and audited publishing. Keep UGC facts read-only to normal community users; link all high-impact claims to official sources and expiration dates. Use a clean navy/graphite/teal editorial design, Inter + Bengali font, no emoji nav, no dummy data in production, proper WCAG responsive UX. Make meaningful save/publish actions work after refresh, enforce RBAC on the server and ship end-to-end tests and a clear verification report. Begin with Phase 0/1, preserve later architecture, and do not assert production completion before live verification.

---

## 21. CHANGE LOG / RESEARCH HONESTY

- **v1.0 / 2026-11-06:** Initial 181-row directory seed + comprehensive feature, UX, moderation, admin, DB, source, QA and staged delivery blueprint. Ranking examples checked for QS/THE 2027. 
- **Not yet done:** exhaustive per-institution checking of 181 distinct UGC detail profiles; full official degree/credit/cost/fee/scholarship/admission seats/viva circulars for each school; direct university-site availability testing; 181 live frontend pages; production backend; live deployment; domain availability check; ranking republication license check. These are clearly assigned to implementation/data enrichment phases—not claimed as completed research.
- **Before public deployment:** refresh UGC directory and all regulatory notices, university-specific circulars, ranking editions and time-sensitive fees; verify content/asset rights and privacy policies.

**End of master file.**


---

# PART B — HEBD v2.0 SCOPE EXPANSION, SPECIALIST INSTITUTIONS, ADVANCED PRODUCT & GOVERNANCE

> **Precedence:** The material in Part B (Sections 22–35) clarifies/extends the earlier v1.0 requirements. If Part A says “university only” but Part B refers to an “institution,” Part B wins. The 181 UGC university directory entries in Section 18 must be retained **without relabelling non-university institutions as universities**. All examples are data/source illustrations, not invented claims of currently open admissions.

## 22. BRAND, POSITIONING, DISTINCTIVE IDENTITY

### Naming decision
- **Public brand:** `Higher Education in Bangladesh`
- **Short brand / editorial wordmark:** `HEBD` (optional small secondary monogram); display full name prominently in header and metadata.
- **Alternative marketing phrase:** `Study in Bangladesh` may appear as an SEO topic/landing page but should not be assumed as a unique available business/domain name; there is already a UGC-branded Study in Bangladesh discovery portal.
- **Product tagline:** `Find institutions. Understand admissions. Compare with confidence.`
- **Avoid:** “No. 1”, “Best university according to UGC”, “UGC-certified ranking”, fake endorsement, unlicensed university logos, clip-art graduation-cap logo, childish gradients, emojis in navigation, fake statistics.
- **Trust statement in footer:** `Independent information and community platform. Not affiliated with or endorsed by UGC, BMDC, DGME, BUTEX or ranking publishers unless a formal partnership is established.`

### Logo creative brief (actual vector artwork to be designed during implementation)
An understated editorial identity: abstract `H` and `E` strokes that also form two aligned open-page/column shapes. Flat one-color monochrome master, optional teal accent for one single line, legible at 24 px, full horizontal wordmark `HIGHER EDUCATION / IN BANGLADESH` beside mark. Build light/dark, favicon and SVG variants. **No official/seal-like shield, UGC logo, counterfeit university crest or emoji.** Admin may upload/replace official platform logo, favicon and open-graph banner, with size validation, crop preview, alt text, rollback and audit log.

### Professional design system — enforce in UI and admin CMS
| Token | Recommendation | Notes |
|---|---|---|
| App background | `#F7F8FA` | Neutral, research-oriented—not a bright gradient |
| Main paper/surface | `#FFFFFF` | High contrast data areas |
| Primary text | `#132238` | Dark navy charcoal |
| Secondary text | `#5F6B7A` | Clear metadata |
| Header/nav | `#101B2D` | Distinctive, compact editorial header |
| Accent | `#087F80` | Restrained teal for active states and primary CTAs |
| Borders | `#E1E6EB` | Thin, consistent |
| Error/caution | `#A13B32` | Only verified official warnings, not decoration |
| Desktop content max width | `1320px` | Body copy max 70–78ch |
| Grid | `12` columns | Content-led cards and data tables |
| Radius | `8–12px` | Avoid inflated pill-everywhere design |
| Spacing | 4/8/12/16/24/32/48 scale | Regular rhythm |
| Font English | `Inter` or `Manrope` | Calm, readable body |
| Font Bangla | `Noto Sans Bengali` or `Hind Siliguri` | Real Bangla font fallback tests |
| Base body | `15–16px` | Responsive; real labels, not oversized headlines |
| Cards | Simple border, minimal shadow | Data and sources dominate |

Responsive breakpoints 360/390/768/1024/1440 px, WCAG 2.2 AA targets where practical, keyboard focus, reduced-motion preference, 200% text zoom, accessible tables, lazy-loading images, `prefers-color-scheme` optional, consistent icon set (simple line icons). Admin controls colors/fonts/layout without allowing unsafe raw HTML/CSS injection; saved themes are versioned.

## 23. DEFINITIVE SCOPE & CLASSIFICATION — UNIVERSITY IS NOT COLLEGE

Represent **institution_kind**, **ownership**, **regulator**, **awarding_body** and **parent_affiliation** as **different fields**. A medical college is NOT assumed to be a separate UGC-approved university. A BUTEX-affiliated college is NOT recounted as a new university. A special university such as BUTEX remains in the university list AND can have a subject tag Textile, without creating a duplicate.

| Public catalog section | Entity kind | Primary verification authorities | Important distinction |
|---|---|---|---|
| Public university | `university` | UGC / institution law / university | UGC public inventory |
| Private university | `university` | UGC / university approved programmes/notices | UGC private inventory; notice flags are material |
| International and CBHE | `university_or_campus` | UGC applicable listing + overseas awarder + host-law evidence | Degree issuer and country must be clear |
| Public medical college | `medical_college` | BMDC recognition + DGME admissions + affiliating university | College not independently a university |
| Private medical college | `medical_college` | BMDC + DGME + institution | Check recognition/status for every intake |
| Public/private dental college/unit | `dental_college` / `dental_unit` | BMDC + DGME | Dental units may sit inside a medical college; avoid duplicates |
| Public textile engineering college | `textile_college` | Directorate of Textiles (DoT) + academic awarding/affiliate university | BSc programme and intake are college-specific |
| Private/PPP textile institute or college | `textile_institute` | Relevant awarding university + UGC where required + institution | e.g., NITER constituent institute of DU, not a new university |
| Textile-specialist private university | `university` with `subject_area=textile` | UGC + institution | e.g., BUFT already in UGC inventory |
| Affiliated undergraduate college | `affiliated_college` | National University / relevant affiliating university | Keep optional extended-scope module; not UGC university count |
| Nursing/midwifery institute (optional phase) | `nursing_institution` | BNMC and appropriate education authority | Distinct profession, not automatically MBBS/BDS |

**Canonical taxonomy fields:**
```yaml
institution:
  institution_id: uuid
  slug: string
  official_name_en: string
  official_name_bn: string|null
  aliases: [string]
  institution_kind: enum[university,medical_college,dental_college,dental_unit,textile_college,textile_institute,affiliated_college,nursing_institution,other_hei]
  ownership: enum[government,private,public_private_partnership,international,unknown]
  ugc_directory_category: enum[public,private,international,cbhe,null]
  ugc_directory_listed: boolean|null
  regulators: [authority_id]
  parent_institution_id: uuid|null
  affiliated_awarding_body_id: uuid|null
  affiliation_valid_from: date|null
  affiliation_valid_to: date|null
  country_of_degree_awarder: string|null
  recognition_status: enum[verified_active,conditional,notice_pending,suspended,withdrawn,expired,unverified,not_applicable]
  recognition_scope: string|null
  recognition_source_ids: [source_id]
  admission_permission_status: enum[verified_current,restricted,paused,unknown,not_applicable]
  campus_locations: [campus_id]
  website_official_url: string|null
  current_programme_ids: [uuid]
  editorial_status: enum[draft,in_review,published,archived]
  verified_at: datetime|null
```
**Rule:** A regulatory authority is assigned at the appropriate level. UGC directory is institution inventory; professional recognition belongs to programme/college. A condition or withdrawal must be shown with the effective date and source link, not hidden. Historical names and renamed campuses need a separately audited alias history.

## 24. MEDICAL & DENTAL — END-TO-END DATA REQUIREMENTS

### Official regulator/source registry
| Source ID | Verified official source | URL | Use |
|---|---|---|---|
| MED-01 | BMDC updated recognised medical/dental colleges + units | https://www.bmdc.org.bd/about-college-n | Recognition list, college names, affiliate grouping, warnings |
| MED-02 | BMDC authority | https://www.bmdc.org.bd/ | Requirements/curricula/recognition disclaimers |
| MED-03 | DGME government/private medical college lists | https://dgme.gov.bd/pages/static-pages/6922e0a5933eb65569e27ff3 | College code, establishment years and published seats; check update date |
| MED-04 | DGME notices | https://dgme.gov.bd/pages/notices | Official intake policy, public/private MBBS/BDS notices, corrections |
| MED-05 | DGME student portal/seat monitoring | https://students.dgme.gov.bd/public?tab=student-summary | Seat/occupancy dashboard snapshot: not a substitute for admission-seat circular |
| MED-06 | DGME 2025–26 MBBS/BDS admission national policy | https://dgme.gov.bd/pages/notices/6922ed86dbfbab28ce0c200e | Historical **2025–26** policy only, NOT 2026–27 rules |
| MED-07 | BMDC professional-course recognition statement | https://www.bmdc.org.bd/about-college-n | Verify recognition again before applications |
| MED-08 | BNMC affiliated/registered education institutions (optional) | https://bnmc.gov.bd/pages/miscellaneous-infos | Nursing/midwifery inventory if phase enabled |

**Critical BMDC caution (source):** recognition is not permanent and may be withdrawn. The live BMDC list explicitly contains entries with `Recognition withheld`. DO NOT list those as currently approved or allow a generic “approved” green label. Where BMDC and DGME differ, leave a visible discrepancy and require manual official review before displaying an admission eligibility recommendation.

### Coverage inventory strategy
Import **every name in the BMDC latest recognised medical/dental college and dental-unit list** and separately reconcile with DGME's currently admitted/seat-authorised colleges and university affiliations. Keep school and dental-unit identities separate and alias-match carefully. Do not claim that the complete BMDC inventory has already been imported from the examples below.

**Medical example names encountered in the official BMDC/DGME sources, for importer QA only:** Dhaka Medical College; Sir Salimullah Medical College; Mymensingh Medical College; Chittagong Medical College; Rajshahi Medical College; Sher-E-Bangla Medical College; Shaheed Suhrawardy Medical College; Chandpur Medical College; Dhaka National Medical College; Bangladesh Medical College; Popular Medical College; Ibrahim Medical College; Enam Medical College; Kumudini Women's Medical College; Green Life Medical College; United Medical College. **These are not an exhaustive inventory.**

**Dental example names:** Dhaka Dental College; Pioneer Dental College; City Dental College; University Dental College; Chittagong International Dental College; medical-college-linked dental units. Preserve their individual status and affiliated university.

### One medical/dental college detail page must have
- BMDC college name / licence / recognition listing / effective date / official note; DGME college code if available.
- Category government/private/PPP; place, campus, hospital and teaching-hospital information **if verified**.
- Affiliated or degree-awarding medical university, academic session, separate MBBS and BDS program records.
- Required study length plus compulsory internship **based on current BMDC curriculum/circular**, not hardcoded or inferred.
- Seat quota by college, local/foreign if official, government/private distribution, current-intake changes, reserve categories, source/year.
- GPA/subject/academic pass-year eligibility, admission test: total marks, negative marking, minimum passing marks, merit weight, waiting/migration, special merit/financial need opportunities **only if current official circular confirms**.
- National centralized application notice, DGME portal official URL, selection and confirmation steps; no impersonated official application form.
- Admission fee, total published tuition, development charges, deposit, hostel/food/clinical expenses where official; fee-cap/policy where legally verified; instalment and refund rules.
- Recognition warnings, graduate medical registration eligibility and whether recognition pertains to current student cohorts—professional conclusions only when verified.
- Student reviews about teaching/clinical exposure/hospital support must be labelled subjective; no unsafe personal patient information, diagnoses or medical-record uploads.

### Medical admissions calendar model
`admission_cycle.type = national_mbbs | national_bds | private_mbbs_bds | foreign_applicants | institution_specific`. Include circular/version, registration period, payment, admit card, exam centers, result, preference/choice, provisional allotment, waiting list, transfer/migration, admission window, class starts; use a separate intake_id for every school/programme where seats differ.

## 25. TEXTILE EDUCATION — PUBLIC, PRIVATE, PPP, AFFILIATED

### Official sources
| Source ID | Official link | Authority / purpose |
|---|---|---|
| TEX-01 | https://www.butex.edu.bd/undergraduate-admission/ | BUTEX undergraduate programmes, seats, credits and admissions (recheck intake) |
| TEX-02 | https://newsite.butex.edu.bd/all-affiliate-institutes | BUTEX-affiliated institutes as shown on university site |
| TEX-03 | https://dot.gov.bd/ | Government Directorate of Textiles: admissions and results |
| TEX-04 | https://dot.gov.bd/site/page/a709e13c-e76f-430f-a04d-6203f286bf66/টেক্সটাইল-ইঞ্জিনিয়ারিং-কলেজ | DoT public textile engineering colleges list (dated; recheck page) |
| TEX-05 | https://www.niter.edu.bd/admission-info/ | NITER admission process; constituent institute of University of Dhaka |
| TEX-06 | https://www.buft.edu.bd/department-of-textile-engineering | Example private UGC-directory-listed textile university programme |
| TEX-07 | https://www.butex.edu.bd/affiliated-colleges/ | BUTEX academic notices for affiliated colleges |

### 10 institutes currently visible in BUTEX affiliate directory — identity seed, NOT current admission guarantee
1. Tangail Textile Engineering College, Kalihati, Tangail
2. Gopalgonj Textile Engineering College, Gopalgonj
3. Jhenaidah Textile Engineering College, Jhenaidah
4. Rangpur Textile Engineering College, Pirgonj, Rangpur
5. Begumgonj Textile Engineering College, Noakhali
6. Pabna Textile Engineering College
7. Barisal Textile Engineering College, Barisal
8. Textile Engineering College Chittagong / Zorargonj
9. Narsingdi Textile Engineering College, Narsingdi
10. Jamalpur Textile Engineering College, Melandaho, Jamalpur

Name spelling follows the linked directory display; aliases should reconcile to current formal official names. **Do not claim only ten textile colleges exist nationwide**; this is the ten-item BUTEX-affiliate page snapshot. The DoT separately published a seven-college list dated 29 May 2025: do not treat differing counts from different scopes and dates as a contradiction to conceal; label programme, operator, affiliate and inventory date explicitly.

### Special non-duplicate cases
- `Bangladesh University of Textiles (BUTEX)`: university record from UGC public section; add textile specialization, not duplicate university.
- `BGMEA University of Fashion & Technology (BUFT)`: UGC private university inventory; add textile programmes under existing UGC university ID.
- `Chattogram BGMEA University of Fashion and Technology`: separate UGC private entry; verify its own details and avoid confusing with BUFT.
- `National Institute of Textile Engineering and Research (NITER)`: **PPP constituent institute of the University of Dhaka**, with separate institute detail page and link to awarding parent. Its published admission explanation says admission follows DU unit-based merit and NITER does **not** run a separate admission test. This is a specific NITER fact, not a rule for other textiles.
- Other private textile colleges/university-linked institutes: search official awarding-body/UGC programmes and institution records, check legal identity and admission permissions, and only then publish as operational. Avoid web-directory-only institutions without regulator verification.

### Textile university/college curriculum and admission fields
Degree type (`BSc Textile Engineering`, fashion/design, textile chemistry, yarn/fabric/wet processing, apparel, industrial production, management, quality/compliance etc.), specialization, semester count, published credits, affiliated/awarding university, lab credits, internship, industrial training, thesis/final year project, admission exam/unit, prerequisites, current exact seats per concentration, reserved seats, session, fee breakdown, scholarships/industry grants and factory-placement information **only if sourced**. Different textile degrees may have distinct seat numbers; do not show one unqualified total.

## 26. EVERY UNIVERSITY/INSTITUTION PAGE — V2 COMPLETE VIEW CONTRACT

**Permanent user URLs:**
- Existing UGC record: `/universities/{slug}` (preserve all 181 and their IDs).
- Specialist university search landing: `/universities?field=textile`, `/universities?category=private`.
- Other higher-education institution: `/institutions/medical/{slug}`, `/institutions/dental/{slug}`, `/institutions/textile/{slug}`; alias redirects from `/institutions/{slug}` as needed.
- A college appearing in multiple catalog filters has **one canonical page**, one rating pool, one admission feed and one institutional identity.

**Page top area:** breadcrumb; logo/hero photo (licensed only); full name, verified type, division/district, founding year and university-status year separate, awarding/affiliating body, three source statuses: `Directory`, `Programme recognition`, `Admission session`. If official notice restricts admission, place warning above CTA. Primary action `Official admission page`, not fake in-app Apply. Secondary compare/save/share and University community.

**Complete tab set:** `Overview` · `Faculties & Departments` · `Degrees & Courses` · `Admission & Seats` · `Fees & Cost` · `Scholarships` · `Rankings` · `Campus` · `Reviews` · `Community` · `Contacts & Documents`. For colleges, show `Professional Recognition` and `Affiliation` in Overview, and hide irrelevant (not verified) QS/THE tab or show `No published ranking available`; **do not inherit the affiliating university QS rank as a college ranking**.

**Admission tab detail-level:** SSC/HSC GPA, group, subject GPA, pass year, application fee, unit, score format, negative mark, written-viva sequence, interview/practical/medical fitness ONLY if applicable, seats (department/unit/quota), official applicant portal, calendar, eligibility checklist, document list, certificate-equivalence guidance, waiting list, migration, exam result and notices. For Master's include bachelor's degree prerequisites, CGPA/experience, research proposal, language scores, department screening, interview/viva and supervisor availability only if published.

**Cost tab detail-level:** gross 4-year/degree estimate computed only from actual published cost structure, calculator assumptions and waiver toggle, separate on-campus living, transport and books, fee schedule effective date, downloadable fee source, payment due timing, refund, credit-load sensitivity and price history. If one required numeric input is unverified: show `Unable to calculate reliably`, never replace with zero.

**Scholarship tab detail-level:** UGC/national/university/department/foundation, eligible level/subject, required GPA/CGPA and income documents where applicable, percentage vs fixed cash, time-limited deadlines, amount/coverage/renewal, stacking and official Apply link. Never promise award or eligibility.

**Course-level catalogue:** required/elective courses, code, credits, term, prerequisite, curriculum year, lab, capstone, internship, thesis, track and elective groups where published; user sees curriculum version. Admin can import CSV/JSON safely with conflicts and approval queue, not edit 181 schools manually.

## 27. COMMUNITY V2 — COMPLETE SOCIAL SYSTEM, DIFFERENT FROM OFFICIAL DATA

**Community layers:** All-Bangladesh feed; each institution feed; subject/department groups; admission-year cohorts; Q&A forum; event announcements; notices posted by verified representatives; polls (later); messages (later); saved posts; searches and hashtags; admin-approved FAQ knowledge base.

| Capability | User experience | Required safety + admin feature |
|---|---|---|
| Create post | Text, link, picture, PDF where allowed, tags, select institution, visible audience | File scanning, type limits, spam rate-limit, review queue option |
| Edit/delete own | Editable post with history, delete with retention notice | Mod restore/lock with audit |
| Comments/replies | Nested discussion, edit, delete, mention, reaction | Anti-harassment tooling, turn off comments per post |
| Likes/bookmarks | One reaction per user per object; saved-items page | Anti-bot abuse counters |
| Share | Copy canonical public URL, mobile share affordance | No sharing private messages or private groups by default |
| Questions | Accepted answer, tags, sort newest/relevant/unanswered | Staff/verified answer label, not legal/official advice by default |
| Follow | Follow university, topic or member | Notification preferences + block controls |
| Reviews | 1–5, written pros/cons, verified affiliation when proven | Anti-fake review, one active rating per institution, appeals |
| Ratings | Aggregate with `n`, dates and verified %, separate dimensions | Never confuse with independent global QS/THE rank |
| Private messages | Mutual-consent or request/accept model; user block/report | No unsolicited mass DMs, no admin silent browsing of private messages |
| Reports | Report post/review/comment/account/university impersonation | Queue, case IDs, moderation reason, appeal process |
| Official updates | Verified institution rep account with badge | Identity/authorization workflow, expiration and role review |
| Notifications | Replies, comment likes, followed admission alerts | Email opt-in, throttling, read/unread, unsubscribe |

### Community rules to implement
- Institution pages belong to editorial/system records; a student can **post about a university**, but cannot overwrite official details, prices, seats, scholarship rules or status.
- Student/alumni identity verification voluntary and minimal; display self-reported vs verified clearly. Avoid public student ID scans, NID, examination registration identifiers, transcripts, and personal phone lists.
- Reviews are subjective experiences, not factual proof of institutional wrongdoing; legal/defamation reports need independent moderation and a right to respond. Don't suppress negative opinions solely because an institution complains.
- Anti-abuse: captcha/verification based on risk, daily post/comment/DM quotas, attachment scanning, HTML sanitization, URL reputation, duplicate detection, bot challenge, spam shadow restrictions only if policy disclosed.
- No public display of student/private information; no patient or clinical medical records.
- When moderators act, record actor/action/reason/time, notify author appropriately, preserve appeal state, and prevent fabricated “official announcement” badges.
- Rate-limited private messaging should be launched only when safety/support capacity and privacy controls are tested. Explicit consent and controls first.

## 28. SITE NAVIGATION / INFORMATION ARCHITECTURE — FINAL V2

**Desktop top bar:**
`[HEBD wordmark]   Explore ▼   Programmes ▼   Admissions ▼   Costs & Scholarships ▼   Rankings ▼   Community ▼   Compare   [Search]   বাংলা | EN   Sign in`

**Explore mega menu** (compact, no unnecessary items):
- Universities: Public / Private / International / CBHE
- Medical: Government / Private / Dental colleges / Dental units
- Textile: BUTEX / Government colleges / Private / PPP / Affiliated
- Browse by Subject / Division / City / Campus / Institute kind

**Programmes:** Bachelor / Master's / PhD / MBBS / BDS / Textile Engineering / Diplomas (only when in scoped higher-education dataset) / Short Courses (clearly distinguish non-degree) / By Department.

**Admissions:** Current application windows / Calendar / Policy & Eligibility / Seat Finder / Admission Tests / Written & Viva / Results & Migration / Official Circulars.

**Costs & Scholarships:** Tuition explorer / Fee Calculator / Tuition Waivers / Funding / Compare by Budget.

**Rankings:** QS World / QS Asia / QS Subject / THE World / THE Subject / Other verified publisher / Methodology / Historical trends.

**Community:** National feed / University discussions / Questions / Reviews / Events / My saved items.

**Mobile:** compact sticky search, accessible nav drawer, 3–5 core bottom actions only if user-tested, no sideways desktop table overflow; comparison via horizontally scrollable structured cards.

**Homepage v2 content hierarchy:** 1) precise one-line value + powerful institution/degree search; 2) category selector for universities, medical, dental, textile; 3) live verified admissions/deadlines; 4) programme finder; 5) institutional compare; 6) international publisher rankings (not a fabricated single Bangladesh ranking); 7) approximate cost + waiver explorer; 8) community conversations; 9) methods/source transparency; 10) footer. Featured “Top universities” must have selectable **publisher/year/scope** and can be editorial cards without invented ranking.

## 29. ADMIN CMS — EVERYTHING USER-VISIBLE THAT THE PLATFORM OWNS

**Principle:** All platform-managed user-visible content is stored in DB or a typed editable CMS schema; no crucial public text hardcoded permanently into React components. The platform owner may edit, hide/unhide, create/delete, re-order, schedule, draft, preview, publish, and restore, **with enforced constraints around official data integrity, user privacy and audit history**. Admin is not empowered to falsify official data or covertly access private messages.

### Admin navigation — comprehensive functional specification
| Sidebar | Sub-modules (real CRUD, not placeholder buttons) | Key functions |
|---|---|---|
| Dashboard | Overview, coverage, verification freshness, community risk, admission dates | Snapshot counters, pending-review queues, audit alerts |
| Universities | UGC source imports, all 181 records, details, campuses, contacts, regulatory notices, aliases | Add/edit/merge/deprecate, diff, source link, bulk reconcile |
| Medical & Dental | BMDC recognition, DGME list, college/dental units, seat map, recognition alerts | Status conflicts, affiliate assignment, cohort/date validity |
| Textile & Institutes | BUTEX, DoT, NITER, affiliates, programmes | Master institution ID, degree issuer, intake-specific notices |
| Faculties & Degrees | Faculties, departments, programmes, curriculum, course codes/credits, equivalences | Versioned CRUD, prerequisite graph, CSV import |
| Admissions | Intake sessions, unit and group, fees, applicant criteria, pass year, tests, written, viva, seats, quotas, results and migration | Edit/publish intake notices, attach PDF, archive superseded |
| Fees & Costing | Cost components, currencies, credit rates, per-term charge, aid/waiver scenarios | Formula preview, anomaly checks, approval workflow |
| Scholarships | Govt/UGC/university grants, award windows, rules, exemptions | Date status, benefit type, source/version |
| Rankings | QS/THE product, year/edition, category, ranks/bands, licensed datasets | Publisher-licensed import, citation, display policy |
| Community | Posts, comments, groups, questions, polls, topic tags, events | Moderation; reports, content restore, lock comments |
| Reviews & Ratings | Reviews, dimension weights, disputes, suspicious patterns | Evidence review, honest public averages, privacy |
| Messaging & Safety | DM safety flags/abuse reports, blocks, warnings | No private DM reading by default; lawful escalation policy |
| Users | Accounts, email verification, member profiles, current bans and appeals | Change roles, suspend/restore, export/delete account data |
| Institution Representatives | Claim page, business-domain proof, invitation, authorized team | Representative onboarding, revoke and audit |
| Content CMS | Pages, hero, FAQs, articles, footer copy, homepage cards, CTAs, announcements | WYSIWYG sanitised editor, revisions, scheduled publishing |
| Design Studio | Logo, favicon, fonts, palette, dark/light, spacing, layout, cards, header/footer, navigation | Live preview, stage/publish/rollback, never execute raw JS |
| Navigation & SEO | Menus, slug redirects, SEO titles, descriptions, OG, structured data, sitemap | Per-language visibility and redirects |
| Media Library | Images, PDF, brochures, copyright, alt text, versions | Upload, replace, delete, virus scan, secure URLs |
| Integrations | UGC/BMDC/DGME/DoT source registry, email, search, storage, analytics, deployment toggles | Test connections, status, rotate secrets safely |
| Notifications | App/email templates, preference categories, scheduled notices | Spam throttling, templates, subscriptions |
| Analytics | Search queries, comparison usage, public traffic, moderation, error rates | Privacy-conscious aggregated dashboards |
| Support | Tickets, corrections, appeals, source discrepancy flags | Assignment, SLA, evidence links, resolution history |
| Access & Audit | Admin roles, permissions, MFA, sessions, change log, backups | Least privilege, immutable logs, restore drills |
| Global Settings | Product name, language, public registration, posting policy, feature flags, downtime | Confirm dangerous actions, staging preview |

### Role/permission matrix (high-level; exact API scopes must exist server-side)
| Operation | Visitor | Registered user | Institution rep | Moderator | Editor/data verifier | Super Admin |
|---|---:|---:|---:|---:|---:|---:|
| View published directory/admissions/rankings | Yes | Yes | Yes | Yes | Yes | Yes |
| Post/review/comment own identity | No | Yes | Yes (marked) | Yes | Yes | Yes |
| Edit/delete own community content | No | Yes | Yes | Yes | Yes | Yes |
| Publish a regulatory/admission fact | No | No | Suggest only | No | With approval | Yes with source |
| Moderate/restrict public posts | No | No | Own official posts only | Yes | Assigned | Yes |
| Change university record identity / merge | No | No | Propose | No | Review workflow | Yes with audit |
| Edit platform design/nav/logo | No | No | No | No | Only if granted | Yes |
| Suspend/restore users | No | No | No | Scoped | No unless granted | Yes |
| Read private DMs without case authorization | No | No | No | No | No | No |
| Change admin roles / MFA policy | No | No | No | No | No | Yes with re-auth |
| Delete evidence/source history/audit records | No | No | No | No | No | Not silently; governed retention |

Every mutation includes `created_by`, `updated_by`, `version`, `change_reason`, `before/after` and an immutable `audit_event`. Risky data edits require source URL or PDF plus second review for public regulatory claims. The primary owner can govern all *managed display elements*, but direct changes to third-party ranking claims without a valid source are refused in workflow, not hardcoded as facts.

**CMS quality requirements:** Forms must save to server DB, survive reload and cross-device access, show inline validation/errors, offer preview and undo/version rollback, upload assets with visible progress and stable URLs, guarantee all delete/restore buttons work, and render admin pages separately from public interface. No `localStorage-only` CRUD passed off as production. Critical data changes invalidating relevant public caches and search indexes within a stated consistency window.

## 30. DATA MODELS — SPECIALIST TABLES AND UNIQUENESS

Extend Part A relational architecture with the following tables. Implement foreign keys, strict enum validations, source change history, uniqueness per institution/campus/program/intake, and soft-delete plus traceable version history:

```text
regulatory_authority(id, official_name, jurisdiction, website)
institution(id, kind, ownership, directory_category, name_en, name_bn, slug, status)
institution_alias(id, institution_id, alias, language, alias_type, valid_from, valid_to)
institution_relation(id, child_id, parent_id, relation_type, valid_from, valid_to, source_id)
regulatory_record(id, institution_id, programme_id, authority_id, recognition_type,
                  approval_number, status, effective_from, effective_to, notice_url, source_id)
campus(id, institution_id, campus_type, address, district, division, lat, lng, source_id)
faculty(id, institution_id, name, approved_scope, source_id)
department(id, institution_id, faculty_id, name, source_id)
programme(id, institution_id, awarding_body_id, department_id, degree, level, mode, duration,
          credit_total, accreditation_id, curriculum_version, status, source_id)
programme_course(id, programme_id, course_code, title, credits, type, term, prereq_ids, source_id)
intake(id, institution_id, programme_id, academic_session, term, date_start, date_end,
       application_url, admission_status, source_id, supersedes_intake_id)
entry_requirement(id, intake_id, qualification, stream, threshold_expression, required_subjects,
                  pass_year_rule, conditional_notes, source_id)
admission_exam(id, intake_id, unit, stage, format, marks, negative_mark, pass_mark,
               test_date, viva_date, merit_formula, source_id)
seat_allocation(id, intake_id, campus_id, programme_id, category, quota, seats, source_id)
fee_schedule(id, programme_id, intake_id, currency, effective_date, expires_date, source_id)
fee_component(id, fee_schedule_id, type, units, rate, mandatory, occurrence, source_id)
scholarship(id, provider, institution_id, programme_id, benefit, criteria, renewability,
            deadline, source_id, status)
ranking_result(id, institution_id, publisher, product, edition_year, geography,
               subject, rank_exact, rank_band_from, rank_band_to, rank_display, source_id)
source(id, authority, title, url, retrieved_at, published_at, document_version,
       content_hash, legal_reuse_status, confidence, expires_at)
claim_source(id, entity_table, entity_id, field_path, source_id, verified_by, verified_at)
user(id, email, password_hash, user_role, email_verified, privacy_settings, status)
user_institution_relation(id, user_id, institution_id, role, verification_state)
community_post(id, author_id, institution_id, content, visibility, state, published_at)
community_comment(id, post_id, author_id, parent_id, body, state)
reaction(id, user_id, target_type, target_id, kind, UNIQUE[user_id,target_type,target_id,kind])
review(id, institution_id, author_id, relation_state, rating, pros, cons, status)
review_dimension(id, review_id, dimension, score)
message_conversation(id, visibility, consent_state)
message_participant(id, conversation_id, user_id, blocked_at)
message(id, conversation_id, sender_id, ciphertext, sent_at, deleted_at)
report(id, reporting_user_id, target_type, target_id, reason, status, moderator_id)
verification_request(id, organisation_id, representative_user_id, evidence, decision)
cms_content(id, route, locale, block_type, payload_json, revision, workflow_state)
admin_permission(id, role, object_type, action, constraint_json)
audit_log(id, actor_id, action, object_type, object_id, before_hash, after_hash, reason, occurred_at)
```

**Important DB constraints:**
1. `rank_exact` and `rank_band_*` cannot conflict; publisher+edition+product+scope required. `not_ranked`, `unlisted`, `not_checked` are different states.
2. `institution_relation` prevents self-parenting and cyclic parent links; one current canonical parent per relevant relation where required.
3. Seats never sum across unlike intake/campus/quota categories; historical values remain tied to source/term.
4. Same official degree/programme can have historical curriculum versions and multiple intake records.
5. UGC 181 directory inventory count and specialist institute inventory count displayed separately, not a total marketed as “181+ UGC approved”.
6. Community ratings are dynamic derived aggregates, never an `institution.official_ranking` input.
7. User content sanitised, indexed only if public; private DMs excluded from public search, analytics and public AI summaries.

## 31. VERIFIED SNAPSHOT RANKINGS / CREDIBLE RANKING UX

**UGC does not publish a universal QS/THE-equivalent “best Bangladeshi university” ranking.** The platform must not invent a common “UGC Top 10” ranking. Section titles should read **`QS World University Rankings 2027 — Bangladesh institutions`**, **`THE World University Rankings 2027 — Bangladesh institutions`**, **`QS Asia`**, etc., with clear publication brand, edition/year, category, methodology and official source.

**Publisher-verified example data (6 November 2026 snapshot):**

| Institution | Ranking publisher/product | Edition | Published result | Official publisher URL |
|---|---|---:|---|---|
| University of Dhaka | QS World University Rankings | 2027 | `=600` | https://www.topuniversities.com/universities/university-dhaka |
| Bangladesh University of Engineering and Technology | QS World University Rankings | 2027 | `711–720` band | https://www.topuniversities.com/universities/bangladesh-university-engineering-technology |
| Bangladesh University of Engineering and Technology | THE World University Rankings | 2027 | `1001–1200` band | https://www.timeshighereducation.com/world-university-rankings/bangladesh-university-engineering-and-technology |

These demonstrate why **two publishers may report different results and both be correct within their own methodologies**. Do not sort mixed ranks from different publishers in a single numeric league table. Publisher copyright/licensing terms and attribution must be reviewed before any automated bulk import. Not every college has a QS/THE ranking; display `Not available from this publisher` rather than borrowing its parent university’s rank.

## 32. ADMISSION ENGINE — APPLICATION, VIVA, SEAT AND DEADLINE BEHAVIOUR

### University admission models to support
A. Central public admission coordination/group, where current valid circular specifies participating universities and units.  
B. Standalone public admission exam/unit.  
C. Private university subject-dependent direct/test/waiver admissions across Spring/Summer/Fall or actual published terms.  
D. Professional national MBBS/BDS process governed by DGME and BMDC requirements.  
E. Textile DoT/BUTEX-affiliated college model, intake-specific; NITER’s DU-merit based model separately.  
F. Master's/PhD thesis/research, viva/interview, portfolio/experience.  
G. National University affiliated college or other added paths only after scope/policy approved.

**Applicant input schema for eligibility tool:** education track, SSC/HSC exam year & board/equivalence, GPAs, subject grades, relevant bachelor's credits, CGPA, degree and subject, optional interview/proposal. Store sensitive information locally/client-side by default; permanent personal academic profile requires consent. Exact eligibility result: `meets stated published rules` / `does not meet a rule` / `cannot determine`; display rule-by-rule evidence and manual verification prompt. **Never infer admission chances from informal hearsay or guarantee acceptance.**

**Deadline/status logic:** Source effective year + intake + Asia/Dhaka timestamp + cancellation/extension supersession. UI may show `Open`, `Upcoming`, `Closed`, `Extended`, `Cancelled`, `Not verified`. Verified source is mandatory for `Open` and for exact seats and exam results. No stale 2025–26 MBBS rule shown as active 2026–27 rule.

**Viva and exam specifics:** fields for written test topics, marks, eligible shortlist threshold, document verification, viva-only/required/conditional status, fee receipt, admission confirmation. If no viva in official circular, show `Not stated` not `No viva`.

**Seat Finder:** filters institution-kind, campus, programme, quota, session, unit, intake. Show exact reported source year, avoid adding quotas twice, export source-linked report, never imply current vacancies from a static capacity table. Admissions “seat available” requires a current official vacancy statement.

## 33. SOURCE POLICY, RIGHTS, TRUST & UPDATE CADENCE

**Source hierarchy for each claim** (source can vary by programme and year):
1. UGC legal university identity, approved programme status, warnings, campus notices.
2. BMDC professional medical/dental recognition; DGME medical intake policy and allotted seats.
3. BUTEX / Directorate of Textiles / relevant degree-awarding university for textiles.
4. University's official faculty, department, admissions, scholarship and tuition notices for institution-specific details.
5. Ranking publisher QS/THE for publisher-controlled rank.
6. User community content is only user content; never authoritative for legal recognition/admission/fee claims.

**Fact provenance public display:** source link + `Checked: YYYY-MM-DD` + `Effective session/edition` + source type + archive/version + `Last revised` + warning if conflicting or aged. Missing details show **`তথ্য এখনো যাচাই করা হয়নি / Not yet verified`**. No fake 0 BDT tuition, 0 seats, blank approval = `No`, no generic `100% recognised` badge.

**Suggested editorial refresh cadence (platform targets, not governmental rules):** regulatory critical alerts daily or upon notice; deadlines daily while open; tuition and seat allocations each intake and on correction; scholarships weekly in open application periods; rankings after each publisher's new edition and corrections; directory/contacts every 60–90 days; old community activity marked historical. Automatic scripts should **detect changes**, but publishing critical assertions requires a source-aware review workflow. Preserve snapshot hashes and notices.

**Rights/access:** Follow robots.txt/site terms and lawful bulk-data access; request permission for copyrighted logos, photos, paid ranking datasets and PDF re-hosting if needed. Prefer linking official PDFs rather than copying them. Show `Source: UGC` without implying collaboration. Public machine-readable APIs should have fair-use rate limits and citation links. Protect underage users and sensitive personal data; implement privacy policy, terms, request deletion, abuse process, email verification, hashed passwords, session revocation, MFA admin, encrypted secrets, backups and legal review for Bangladesh privacy/cyber obligations before production.

## 34. DEPLOYMENT ARCHITECTURE, ACCEPTANCE TESTS & SHIPPING ORDER

### Recommended app architecture (non-binding stack)
- Frontend `Next.js + TypeScript` / `React`, accessible component system, server-rendered SEO programme and profile pages; `Bangla + English` i18n.
- Backend `Next.js API` or `NestJS` with PostgreSQL + Prisma/Drizzle, migrations, indexes and data validation using Zod; Redis for cache/rate limiting, job queue for source-refresh and alerts; object storage with signed uploads for assets; full-text search (Postgres then Meilisearch/OpenSearch at scale).
- Secure authentication with verified emails, bcrypt/Argon2id hashes, optional Google sign-in, admin MFA, independent CSRF and server-side RBAC checks.
- Permissions for admin write operations on backend—not UI-only checks. Branded public site remains usable when admin components/scripts fail.
- Build and deployment should not overwrite existing projects/repositories; establish new repository/app, isolated config/secrets and staging first.
- Source ingestion: official-directory seed → resolved entities → link-check → source extract → curator QA → approved publish → scheduled verification → audit/corrections.

### Priority build phases (each includes real functional QA, not screenshots)
**P0 — Brand & Data Trust:** final name, sitemap, theme, source registry, ingest existing 181 UGC records, stable profiles and source labels; specialist categories and recognition model.  
**P1 — Admissions Directory:** all browse/filter routes, academic hierarchy, intake + seats + written/viva, CMS and editable sources, verified medical/textile institutions and no duplicate affiliations.  
**P2 — Programmes/Costs/Scholarships/Rankings:** curricula, fee calculator, scholarship engine, rankings publisher/year views, comparisons, search and i18n.  
**P3 — User Community:** signup/login, institution feed, posting, comments, likes, share, bookmarks, reviews and flags, moderator dashboard.  
**P4 — Advanced Community:** verified institution pages, direct messages with consent, saved applications, deadlines notifications and optional personalization.  
**P5 — Reliability & Coverage:** full official-source backfill, automated refresh, accessibility, backups, metrics and deployment hardening.

### Mandatory end-to-end test cases
- All 181 UGC profiles have unique working routes, names/category, original UGC raw link, missing fields visibly unverified; category counts = 61/116/3/1 for snapshot.
- Medical/dental college page never claims UGC university status; BMDC withheld recognition shows caution; DGME source and year separate.
- Textile-affiliated college has parent degree-awarding body and no fake independent world rank; NITER rule does not leak to other schools.
- Admission exam/viva/session/quota/seat 2025–26 cannot incorrectly appear as 2026–27; closed/extended state and timezone tested.
- Tuition estimate handles term charges, credit mix, one-time fees, waiver caps, missing costs, edits, refunds and receipts.
- Ranking publisher/year/bands; UGC list order not portrayed as ranking; expired editions remain accessible.
- Real auth (signup/login/logout/recover), distinct user/verified rep/mod/editor/admin permissions; unauthorized changes denied by API.
- Create/edit/delete/comment/reply/like/unlike/save/share/review/report; persistence after logout/login, on another browser, and after reload.
- Moderator action logs, ban/appeal, review counts, rate limits, duplicate/rating abuse, spam attachments and private DM access boundary.
- Admin edits nav/header/footer/logo/fonts/home modules/source links/recognition/fee/scholarship: preview → publish → refresh on phone & PC shows identical live content.
- Backups, restore, failure recovery, rate limits, search index cache invalidation, broken official links, mobile 360px, screen reader and keyboard navigation.
- Audit report distinguishes **implemented, tested, source-verified, deferred, and not verified**; never mark “100% complete” without actual test evidence.

## 35. FINAL HANDOFF: COPY-READY BUILD DIRECTIVE

> **Build Higher Education in Bangladesh (HEBD)** as a genuinely functional, original and mobile-first bilingual university/institute directory + admissions + community portal, using this `HEBD_MASTER_WEBSITE_BLUEPRINT_v2.0.md` as the full specification. Preserve the 181 UGC directory-name entries in Section 18 (61 public, 116 private, 3 international, 1 CBHE) as original UGC entries and give each permanent profile page. Add separate properly attributed medical/dental colleges and public/private/PPP textile education institutes using BMDC/DGME/DoT/BUTEX/awarding-university sources; do not add them to UGC university counts or claim non-universities are UGC-approved. Import all relevant recognised schools into their own persistent canonical pages after checking current status, source, institute kind and affiliate. Implement per-institution department/course catalogue, degree duration/credits, actual session-specific admission policies/entry requirements/fees/official application links, admission exam/written/viva, detailed seats/quota/migration, tuition calculators, scholarships/waivers, and multi-publisher/version rankings; mark every unverified field explicitly rather than invent it. Create a refined navy/white/teal editorial visual system with small HEBD wordmark, no emoji navigation, sophisticated responsive layout and English/Bangla controls. Add searchable university-wide and national community feeds with signup/login, posts, comments, likes, shares, reviews, ratings, saved items, reports and later opt-in private messaging with strong user privacy. Provide a complete secure Admin CMS allowing the founder to edit **every platform-managed public component** including navigation, logo, fonts, colors, footer, universities, medical/textile institutes, programmes, admission policies, dates, seats, fees, scholarships, rankings, posts and content, plus roles, moderation, source approvals, revisions, audit and backups. All admin changes persist in a real DB, with preview/publish/rollback; do not fake working UI. Use official source links and effective dates on each consequential claim, no fabricated QS/THE/UGC rankings, no claim of an official admission integration, and no production-ready claim until real end-to-end and security tests pass. Keep code modular, source-integrity first and ready for staging review, GitHub and deployment in separate deliberate steps.

### Source and coverage disclosure at handoff
- ✅ **Verified today as source-page examples:** UGC directory snapshot 61/116/3/1; UGC notice/certificate section; QS DU/BUET 2027; THE BUET 2027; BMDC latest list warning that recognition can be withdrawn; DGME colleges and notices; BUTEX affiliate page and DoT admissions; NITER's DU-based process; BAC programme-accreditation evidence.
- ✅ **Master-file inventory:** Section 18 includes the UGC directory’s 181 university-name rows; Part B cites a ten-institute BUTEX affiliated-page sample plus named BMDC examples.
- ⚠️ **Not claimed as complete:** every medical/dental/textile institution imported; every UGC university’s approval or operating status independently validated; each subject's exact 2026–27/2027 admission criteria, fees, scholarships, number of seats and current open status; domain/trademark rights; bulk QS/THE ranking reuse licences; live website/backend/deployment. These require dedicated import/verification/implementation steps.
- **Source review timestamp:** 2026-11-06, Asia/Dhaka. All future live university pages need their own per-field sources and current check dates.

