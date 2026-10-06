# RUN 1 — DECK RUN (all-in-one upload)

Purpose: complete **T2 Session B**, the **T2 merge**, and **T4** in ONE frontier session. This is the only session that will ever see decks.

## Contents of this zip

- `decks/D09-lumora-saas.html`
- `decks/D02-carol-pinto.html`
- `decks/D05-tatsa/` — `index.html`, `css/base.css`, `css/slides-a.css`, `css/slides-b.css`, `css/responsive.css`, `js/engine.js`, `js/modules.js`, `js/figures.js`, `js/fx.js`
- `artifacts/archetypes-A.md` — T2 Session A (certified): ARC-01..18, variants, bindings, families SF-01..SF-05, TB-A1..A6, evidenced from D08+D10
- `artifacts/T1-structure-digest.md` — verbatim subset of the certified T1 invariants (PIN-01/02/04–09/13/17/19/22/24/25/27/28/29 + MR-2/3)

D08 and D10 are intentionally ABSENT — their evidence lives only inside `archetypes-A.md`. All files are losslessly whitespace-optimized; line numbers are preserved.

## How to run

1. Open a new chat with the highest frontier model.
2. Upload THIS zip only.
3. Paste **Block A** (Starter Block), then **Block B** (Run 1 prompt).
4. Expect a compact handshake first — 1 non-obvious detail per deck and per artifact. Verify it is specific, then say "go".
5. Three bundles will be produced in order. **Download each as soon as it appears:** `T2-partB.md`, `T2-archetype-grammar.md`, `T4-rules-copy.md`.
6. If context tightens, let it stop at a task boundary; download everything produced and report carryovers.

---

## Block A — STARTER BLOCK (paste first)

You are a world-class design director, typographer, color scientist, systems architect, and narrative strategist working on a high-stakes extraction project.

**MISSION:** Distill the attached premium pitch decks into certified design artifacts that let LOW- and MID-TIER models produce decks of the same visual quality for ANY niche, topic, purpose, and audience. In the target system the runtime model never writes HTML/CSS; it emits a constrained plan (JSON) that a deterministic renderer compiles from certified tokens, archetypes, and rules. Your output must therefore be precise, structured, machine-checkable, and free of domain assumptions.

**OUTPUT FORMAT — ONE DOWNLOADABLE FILE.** Deliver exactly ONE downloadable markdown bundle per task (one per part for continuations), containing ALL artifacts for the task. Bundle structure: front matter (task, part, model, date, attachments received, handshake result) -> `##` content sections (tables/prose per the task spec) -> every named artifact wrapped exactly once as `<<<FILE:<exact filename>>>>` ... `<<<ENDFILE>>>` (JSON inside wrappers must be raw, complete, valid JSON — no prose, no partial objects) -> `## AMBITION LEDGER` -> `## COVERAGE STATEMENT`. Never split one artifact across parts; a part boundary falls only between artifacts. If file download is unavailable, output the identical structure as a single chat message — the operator will save it.

**QUALITY CONTRACT (every deliverable):**
- Structured per the task's format — no free prose where structure is required.
- Evidence-bound: cite the attached decks, with line numbers where you can identify them.
- Machine-checkable: rules state measurable thresholds (px, ratios, counts, ms, contrast). Anything that cannot be machine-checked must be explicitly labeled human-judgment with a default action.
- Stable IDs with the task's prefixes; never renumber.
- Coverage statement at the end: what is covered, what is not, and why.
- No emojis. No hedging ("could", "maybe", "etc."), no truncation, no "similar items omitted".

**MAXIMUM AMBITION PROTOCOL (mandatory):**
1. **Best-of-N:** for each high-value item, draft >=3 candidates, compare explicitly, keep the best, and record why each loser lost (one line each).
2. **Adversarial self-critique:** after the first complete draft, become the harshest critic. List >=10 concrete weaknesses (severity, location, why it fails). Then revise. Never ship a first draft.
3. **Ceiling lift (Track B):** add 5-10 upgrades beyond the attached corpus that raise the design ceiling. Track A = faithful distillation (evidence-cited); Track B = upgrades, each labeled with what it improves, why it is better, which invariants it must still satisfy, and its certification requirement.
4. **Quality frontier:** where the corpus is ~7/10, define the 9/10 path and take it (Track B) or state precisely what blocks it.
5. **AMBITION LEDGER (required closing section):** (1) candidates compared; (2) critic findings + the repairs made; (3) Track B items with gate status; (4) where I held back and why; (5) the strongest remaining weakness of this artifact.

**DOMAIN-NEUTRALITY PROTOCOL (mandatory):**
- No industry assumptions anywhere. Replace-industry-nouns test on every rule: generalize it or reject it.
- Examples must span >=6 unrelated domains, labeled "illustration only". No real brands.
- Rules must hold for all seven deck types: investor/company, product/launch, strategy/plan, sales/proposal, education/training, report/review, portfolio/personal.
- Defaults (formality, number formats, color meanings, reading direction) must be stated as defaults with overrides — never as absolutes.

**READING HANDSHAKE — do this before any work:**
1. List every file you received.
2. For each file, quote specific, non-obvious details (a token value, a class name, an animation timing) proving you read it.
3. State anything you could not see, that looked truncated, or that seems corrupted.
Then wait for the operator's go-ahead. If material is missing or insufficient, say exactly what to upload or paste next — never proceed at lower quality.

**CONTINUATION:** When approaching your output limit, stop at a clean artifact boundary, close the bundle, and write `<<CONTINUE>>`. The next part is a NEW downloadable bundle continuing with the remaining artifacts (repeat the front matter with the next part number). Never compress or omit depth to fit.

---

## Block B — RUN 1 PROMPT (paste second)

**CONTEXT — deck run.** Previous chats produced `artifacts/archetypes-A.md` (T2 Session A: ARC-01..18, D08+D10 evidence) and `artifacts/T1-structure-digest.md` (verbatim subset of certified T1). `decks/` contains your evidence decks: D09, D02, D05. D08/D10 are NOT attached — their evidence lives only in `archetypes-A.md`. This is the only session that will see decks. **Compact handshake, then wait:** list files; 1 non-obvious detail per deck (D09, D02, D05) and 1 per artifact (digest, archetypes-A). Then execute these three tasks IN ORDER, outputting and downloading each bundle before starting the next. End each with a line: `### TASK n COMPLETE - download <bundle> now`. If context tightens, stop cleanly at a task boundary and list what remains.

**TASK 1 — T2 Session B.** Evidence: D09, D02, D05 only. Keep the roster exactly: ARC-01 Cover · ARC-02 Context/Agenda · ARC-03 Problem · ARC-04 Insight/Thesis · ARC-05 Solution · ARC-06 How-it-works · ARC-07 Product/Demo · ARC-08 Market · ARC-09 Business model · ARC-10 Traction/Metrics · ARC-11 Comparison/Competition · ARC-12 Roadmap/Timeline · ARC-13 Team · ARC-14 Social proof/Quote · ARC-15 Pricing · ARC-16 Ask · ARC-17 Closing/Contact · ARC-18 Showcase/Catalog. Reuse family names SF-01..SF-05; add SF-06+ and flag. Never renumber; ARC-19+ only for shapes that truly don't fit. Produce Session A's field set per archetype (narrative role; content shape; slots table with type/count/char-budget/required; 2-3 variants with structure, density, evidence by class+line number, bindings incl. what to strip; selection signals; theme behavior; guards+fallback; deck-type coverage). Priority: (1) close gaps ARC-09 Business model, ARC-13 Team, ARC-15 Pricing; (2) new variants for ARC-02/03/05/06/08/12/14/16/18; (3) state evidenced / partly / not evidenced. Full Ambition Protocol (best-of-3, critic >=10, TB-B1..B6, ledger, coverage + neutrality). **Bundle `T2-partB.md`:** `<<<FILE:archetypes-B.md>>>` ... `<<<ENDFILE>>>` + ledger + coverage.

**TASK 2 — Merge.** Merge uploaded `archetypes-A.md` + your `archetypes-B.md`. Keep ARC-01..18 stable; merge only genuinely identical shapes; preserve every variant; resolve A/B conflicts with evidence and keep both as variants when they differ meaningfully. Widen slot budgets from both sessions; reconcile against the digest (PIN-05/06/17/22/24/25). Keep TB-A/TB-B labels; merge critic pass >=10. **Bundle `T2-archetype-grammar.md`:** `<<<FILE:archetypes.md>>>` + `<<<FILE:archetypes.json>>>` (complete valid JSON: {version, archetypes:[{id,name,narrativeRole,contentShape,slots,variants,bindings,selectionSignals,themeBehavior,failureGuards,deckTypeCoverage}], structuralFamilies, trackB}) + merge ledger + final coverage.

**TASK 3 — T4 Rationale -> composition rules -> copy system.** Evidence: D09 + D05, with D02 as third where it adds register range. Deliver: (1) designer commentary annotating EVERY slide of at least 2 decks (archetype · why here · why this scope · why this density/length · why this motion · what would break it); (2) `composition-rules.md` — narrative arcs for all seven deck types (story question per beat), sequencing/adjacency, section markers, dark/light rhythm policy, density ramp, accent frequency cap, variety constraints, cut order when shrinking; (3) `copy-system.md` — per-slot budgets, 6 headline patterns with 10 concrete good/bad pairs each, number/metric formatting, 20+ banned filler phrases with replacements, tone dials (conservative<->bold) with 5 side-by-side examples, register/locale notes; Track B copy patterns labeled; Ambition Ledger; coverage statement. **Bundle `T4-rules-copy.md`:** `<<<FILE:annotations.md>>>` + `<<<FILE:composition-rules.md>>>` + `<<<FILE:copy-system.md>>>` + ledger + coverage.

**AFTER THE RUN:** save the three downloaded bundles to `_collection\inbox\` (T2 and T4 folders) and hand them to the project agent for certification.
