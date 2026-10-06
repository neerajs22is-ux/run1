# archetypes-A.md - Universal Archetype Grammar, Session A (D08 + D10)

Partial grammar. IDs are stable (`ARC-01` to `ARC-18`) and are not renumbered in the merge. Variants are named `ARC-XX.Vn`; Track B variants are named `TB-A1` to `TB-A6`. Measured text lengths are indicative (character counts of rendered text). "Strip" lists what the renderer removes when binding the corpus DOM to a slot. Every variant respects T1 PIN-05 (size floors), PIN-17 (containment), PIN-22 (words) and PIN-29 (chrome).

## ARC-01 · Cover

**Narrative role.** Who are we, and what is this deck about?
**Content shape.** `{ title, descriptor?, kicker?, meta[2-4], art?, facts[0-3]?, cta? }`

| Slot | Type | Count | Budget | Required |
|---|---|---|---|---|
| kicker | text | 0-1 | at most 34 chars | no |
| title | text | 1 | 8-32 chars (D08 25, D10 14); 1 to 3 words may take the accent | yes |
| descriptor | long-text | 0-1 | 40-180 chars (D08 176, D10 69) | no |
| meta | item-list | 2-4 | at most 40 chars each (chrome 2, foot 2) | yes (at least 2) |
| art | media | 0-1 | decorative, aria-hidden, one SVG | no |
| facts | item-list | 0-3 | label at most 14 chars plus value at most 8 chars | no (V1 only) |
| cta | text | 0-1 | at most 24 chars | no |

**ARC-01.V1 Art-right split cover (D08 S01).**
- Structure: `stage--cover` with left padding 150u (D08 L214); text column left, `display` max-width 1050u (L216); art SVG absolutely placed right, about 900u wide, vertically centered (L219); three floating fact tags over the art; one CTA row. Text column about 55% of width, art about 45%.
- Density fit: sparse (D08 count 62 words including labels).
- Evidence: `.stage--cover` L581, `.cover-art .skyline` L588-604, `.ctag` L605-607, `.kicker` L609, `h1.display` L610, `.cover-sub` L611, `.cover-row` L612-615, chrome L582-585, foot L617-620.
- Bindings: kicker ← `.kicker` (L609); title ← `h1.display` (L610; `<em>` carries the accent word); descriptor ← `.cover-sub` (L611); meta ← `.chrome .label` x2 + `.foot .label` x2; art ← `svg.skyline` (decorative; replace with supplied art or omit); facts ← `.ctag` (label text node + `<b>` value); cta ← `.btn[data-go=next]` (L613). Strip: `.label.muted` hint "Use arrows or scroll" (L614), inline animation-delay styles, `.sk draw` path data.

**ARC-01.V2 Arch-framed bottom-anchored cover (D10 S01).**
- Structure: `.cover-body` flex column with `justify-content:flex-end`, bottom padding `--s-6` 64u (D10 L424); decorative nested-arch SVG right (L998-1016, includes a rotating seal `.seal-rot` L1011); `rule-lux` 88u rule, then display title, then a row with descriptor and CTA. Text anchored bottom-left, art right.
- Density fit: sparse (D10 count 31 words).
- Evidence: `.stage--cover` L991, chrome L992-995 (two labels, no folio), `svg.arch--cover` L998, `.rule-lux` L1018, `h1.display` L1019 with `em.gold-metal`, `.cover-row` L1020-1025, foot L1027-1030.
- Bindings: title ← `h1.display`; descriptor ← `p.cover-sub` (L1021; trailing `<em>` is a sub-accent phrase); meta ← two chrome labels + two foot labels; art ← `svg.arch`; cta ← `button.cta` (L1024). Strip: the seal text path (`textPath` L1012, 40 chars of brand copy), `rule-lux` is retained as a renderer ornament.

**Selection signals.**
- If the brief supplies 1 to 3 short proof facts (a number with a label) and a supplied illustration, then V1.
- If the tone is formal or editorial, or no facts are supplied, then V2.
- If neither art nor facts exist, then V2 with art omitted and the `rule-lux` retained.

**Theme behavior.** Dark in both corpus instances (`slide dark`, V2 also `slide--cover`). Light cover permitted by cadence rules only when the next slide is dark. Accent: the title word(s) in `em`; foil only on dark. Adjacency: must be slide 1; never adjacent to another statement-scale slide (ARC-04.V1) as slide 2. Chrome has two labels and no folio (declared exemption under PIN-29).

**Failure guards and fallback.** Title over 32 chars: drop to h1 token (PIN-04) and shorten to at most 60 chars; descriptor over 180 chars: trim by the T5 order; art missing: V2 without art. Fallback: V2 with `rule-lux`, title, descriptor only.
**Deck-type coverage.** INV, PRD, STR, SAL, EDU, RPT, PRT.

## ARC-02 · Context / Agenda

**Narrative role.** What frame or route are we reading this through?
**Content shape.** `{ headline, lead?, items[3-5]{index, label} }` (V2 Track B: `items[4-12]{index, label, sub}`)

| Slot | Type | Count | Budget | Required |
|---|---|---|---|---|
| kicker | text | 0-1 | at most 34 chars | no |
| headline | text | 1 | 30-70 chars (D10 61) | yes |
| lead | long-text | 0-1 | 40-90 chars (D10 61) | no |
| items | item-list | 3-5 (evidenced count 3; 4-5 extrapolated and checked by PIN-17) | index 2 digits; label 4-16 chars (D10 4-9) | yes |
| item sub (V2 only) | text | 0 per item or 1 | at most 34 chars | no |

**ARC-02.V1 Headline with numbered rail (D10 S02).**
- Structure: `.manifest` grid `1fr / 380u`, gap `--s-7` 96u, `align-items:end` (D10 L435); left stack (`rule-lux`, h1 max-width 1180u, lead max-width 860u); right ordered list of large words with a 2-digit index label. About 70/30.
- Density fit: sparse (D10 count 41 words).
- Evidence: `.body.manifest` L1041; `.stack` L1042-1050; `ol.manifest-list.stagger` L1051-1055 with `li > .label + .w`.
- Bindings: headline ← `h1.h1` (L1044; `<em>` second clause carries the accent); lead ← `p.lead.muted` (L1047); items ← `.manifest-list li` (index ← `.label`, label ← `.w`). Strip: inline `max-width` styles, `rule-lux` (re-emitted by renderer).

**TB-A1 Contents grid (Track B, derived from the navigation menu pattern D08 L134-135, D10 L312-314).**
- What it improves: gives 6 to 12 item agendas a legitimate home (V1 stops at 5). Structure: `repeat(3,minmax(0,1fr))`, column gap 72u, each cell `70u / 1fr` with index, title and sub (`grid-template-areas "n t" "n s"`). Satisfies PIN-17 and PIN-19; certification: render at 6, 9 and 12 items and check PIN-17/22/25 pass, and verify distinct from the menu overlay (no `position:fixed`).

**Selection signals.**
- If the deck has 3 sections (or three beats of one argument) and the thesis headline exists, then V1.
- If the deck has 4 to 5 sections, then V1 only when no per-section detail is supplied; per-section detail triggers ARC-06.V1 used as agenda (the D08 pattern).
- If 6 or more sections, then TB-A1 (when certified) else split the agenda (max 5 per slide).

**Theme behavior.** Dark in the corpus (D10 S02). Light allowed with PIN-14 accent variants. Accent: `em` clause and index labels. Adjacency: place after the cover or after a thesis slide; never adjacent to ARC-06 (same family) without an intervening slide.

**Failure guards and fallback.** Items over 5 on V1: merge items or use TB-A1; labels over 16 chars: shorten (single-word labels preferred). Fallback: V1 with the first 5 items and the rest moved to notes.
**Deck-type coverage.** INV, PRD, STR, SAL, EDU, RPT; PRT optional.

## ARC-03 · Problem

**Narrative role.** What is broken or missing, and for whom?
**Content shape.** `{ headline, lead, points[0-3]? | pull? | pairs[3-5]? , figure? }`

| Slot | Type | Count | Budget | Required |
|---|---|---|---|---|
| kicker | text | 0-1 | at most 34 chars | no |
| headline | text | 1 | 30-70 chars (D08 55, D10 54) | yes |
| lead | long-text | 0-1 | 80-170 chars (D08 163, D10 114) | no |
| points | item-list | 0-3 | at most 50 chars each (D10 38-48) | V1: yes (2-3) |
| pull | text | 0-1 | at most 30 chars (D08 25) | no |
| pairs | item-list | 3-5 | old at most 30 chars, new at most 26 chars (corpus 21-28 / 19-23); two column heads at most 20 chars | V2: yes |
| figure | media | 0-1 | one SVG or image plus caption at most 100 chars (D10 about 91) | V1: yes |

**ARC-03.V1 Text with figure (D10 S04).**
- Structure: `.split` `1.15fr / .85fr`, gap 96u, centered (D10 L459); left stack (kicker, h2, lead, 3-item diamond-bullet list `.points` L462-468); right `figure.figure` with an SVG (720 x 540 viewBox, 23 identical glyphs and one highlighted), caption pair, and an optional toggle bar. About 57/43.
- Density fit: medium (D10 count 91 words).
- Evidence: `.split` L1103, `.stack` L1104-1113, `figure.figure` L1115-1185, `.points` L1108-1112, `figcaption` L1177-1180, `.fig-bar` L1181-1184.
- Bindings: headline ← `h2.h2` (L1106; `<em>` accent clause); lead ← `p.lead.muted` (L1107); points ← `ul.points li`; figure ← `figure.figure svg`; caption ← `.cap-a` (primary caption; `.cap-b` is the toggle state). Strip: the interactive toggle bar and `.cap-b`/`.fig-legend` state variants unless interactivity is on; hard-coded x/y of the 24 `use` elements (the renderer lays out its own glyph field).

**ARC-03.V2 Text with before-and-after rows (D08 S02).**
- Structure: `.split2.shift` `.95fr / 1.05fr`, gap 96u (D08 L230); left stack (kicker, h1, lead max-width 720u, italic pull line); right `.cmp.panel` with a header row and 4 rows `1fr / 56u / 1fr` (old, arrow, new; L232). About 48/52.
- Density fit: medium (D08 count 92 words).
- Evidence: `.body.split2.shift` L628, `.stack` L629-634, `.cmp.panel` L635-643, `.cmp-head` L636, `li.cmp-row` L638-641.
- Bindings: headline ← `h1.h1` (L631); lead ← `p.lead.muted` (L632); pull ← `p.pull` (L633); pairs ← `.cmp-row` (old ← `.old`, new ← `.new`); heads ← `.cmp-head .label` x2. Strip: arrow glyph spans (`.ar`, renderer re-emits), the `.old::after` strike animation (kept as motion token only).

**Selection signals.**
- If the brief supplies a visual metaphor or a countable illustration, then V1.
- If it supplies at least 3 paired "today versus tomorrow" statements, then V2.
- If neither, then V1 with `points` only and figure omitted (text-only), or ARC-04.V1.

**Theme behavior.** Light in both instances (D10 S04 `slide light`, D08 S02 `slide light`). Accent: `em` clause plus `.pull` in accent. Adjacency: follow a dark thesis or cover; precede a dark solution slide (corpus: S02 between dark S01/S03; S04 between dark S03/S05).

**Failure guards and fallback.** Pairs under 3: V1; points over 3: keep the 3 strongest; old text over 30 chars: shorten to a noun phrase. Fallback: V1 text-only with figure omitted (headline, lead, 3 points).
**Deck-type coverage.** INV, PRD, STR, SAL, EDU (as context), RPT (as challenge); PRT rare.

## ARC-04 · Insight / Thesis

**Narrative role.** What is the one idea we stand for, and what supports it?
**Content shape.** `{ statement } | { headline, ledger[3-5], takeaways[3-4], analysis? }`

| Slot | Type | Count | Budget | Required |
|---|---|---|---|---|
| kicker | text | 0-1 | at most 34 chars (V1 D10 13) | no |
| statement (V1) | text | 1 | 20-40 chars (D10 35); above 40 steps down to the h1 token | V1: yes |
| art (V1) | media | 0-1 | decorative SVG, at most 1 | no |
| stamp (V2) | text | 0-1 | at most 60 chars (D10 about 50) | no |
| headline (V2) | text | 1 | 20-40 chars (D10 30) | V2: yes |
| ledger (V2) | item-list | 3-5 | key at most 8 chars (D10 4-8); text 40-72 chars (D10 45-72) | V2: yes |
| takeaways (V2) | item-list | 3-4 | word at most 7 chars; line at most 36 chars (D10 30-33) | V2: yes |
| analysis (V2) | long-text | 0-1 | at most 120 chars (D10 116) | no |
| sources (V2) | text | 0-1 | at most 70 chars | no |

**ARC-04.V1 Bare statement (D10 S03).**
- Structure: `stage--bare` (single row, no chrome or foot; D10 L444); `.statement` centered (L445); h1 at 190u with line-height .98 and max-width 1560u (L447); kicker and `rule-lux` above; decorative orbit/lens SVG behind; folio only (`.bare-folio` L1091). Centered, about 80% width.
- Density fit: very sparse (D10 count 10 words).
- Evidence: L1065-1093, `.stack.center` L1085-1089, `svg.lens` L1068-1084.
- Bindings: kicker ← `.kicker` L1086; statement ← `h1.h1` L1088 (`em.gold-metal` accent word); art ← `svg.lens`. Strip: `.spin-slow` and `.orbit` groups (re-emitted as a single ambient loop per PIN-27), inline styles.

**ARC-04.V2 Evidence ledger with takeaways (D10 S08).**
- Structure: `.editorial` top-aligned column (stamp, h2 88u with bottom rule, `.cols` `1.25fr / .75fr`, analysis line). Left column: ruled ledger rows `150u / 1fr`; right: 2x2 takeaway grid. About 62/38.
- Density fit: dense (D10 count 133 words, above T1 PIN-22; the grammar caps ledger rows at 5 to hold at most 110 words).
- Evidence: `.editorial` L1360, `.stamp` L1361, `h2.hl` L1362, `.cols` L1363-1382, `.log` L1366-1371, `.takeaways` L1375-1380, `.analysis` L1383-1385.
- Bindings: stamp ← `.stamp.label`; headline ← `h2.hl`; ledger ← `.log` (key ← `.dt`, text ← `.dd`); takeaways ← `.tk` (word ← `.w`, line ← `.l`); analysis ← `.analysis` (strip the bold prefix `<b>Analysis</b>` into a fixed label); sources ← `footer .label` L1388. Strip: none beyond inline animation attributes.

**Selection signals.**
- If the deck's central claim fits in at most 40 characters and no more than 1 supporting statement, then V1.
- If there are at least 3 supporting evidence items (observations, data points, reasons), then V2.
- If both exist, V1 first and V2 on a later slide.

**Theme behavior.** V1 dark (D10 S03); V2 light (D10 S08). Accent: V1 accent word in foil (dark only); V2 stamp number and takeaway words in accent. Adjacency: never two V1 slides in a row; V1 should follow a context slide (ARC-02 or ARC-03), V2 follows a comparison or showcase.

**Failure guards and fallback.** V1 statement over 40 chars: use the h1 token (112u) rather than 190u; V2 ledger over 5 rows: move rows to notes; V2 without takeaways: drop the right column and widen the ledger (`cols` single column). Fallback: V1.
**Deck-type coverage.** INV, PRD, STR, SAL, EDU, RPT, PRT.

## ARC-05 · Solution

**Narrative role.** What do we offer, and what are its parts?
**Content shape.** `{ headline, lead?, components[3-6]{index, name, description, tag?, detail?}, outcome? }`

| Slot | Type | Count | Budget | Required |
|---|---|---|---|---|
| headline | text | 1 | 30-70 chars (D10 49, 51) | yes |
| lead | long-text | 0-1 | at most 100 chars | no |
| components | item-list | V1: exactly 3; V2: 4-6 (evidenced 5 plus outcome) | index 2 digits; name 4-24 chars (D10 h3 15-21; step names 4-10); description 40-100 chars (D10 copy 47-61, step d 31-75) | yes |
| component detail (V1) | long-text | 0-1 per item | 85-110 chars (D10 back-t 85-102) | no |
| component tag | text | 0-1 per item | at most 24 chars | no |
| icon | media | 0-1 per item | one stroke SVG, same stroke width for all | no |
| outcome (V2) | item | 0-1 | label at most 10 chars; name at most 12; description at most 60 | no |

**ARC-05.V1 Three flip cards (D10 S05).**
- Structure: headline then `.cards` `repeat(3,1fr)` gap 64u (D10 L531); each card has a front face (numeral in foil, icon, h3, copy, note with "In practice +" cue) and a back face (kicker, text, note). Equal thirds.
- Density fit: medium (D10 count 91 words with back faces; 3 x (2 + 7 + 8) front words plus headline).
- Evidence: `.mandate` L1203, `h2.h2` L1204, `.cards` L1205-1254, `article.card` L1206, 1222, 1238, `.face.front` L1207, `.face.back` L1216.
- Bindings: headline ← `h2.h2` L1204; index ← `.num.gold-metal`; icon ← `svg.icon`; name ← `h3.h3`; description ← `p.copy`; tag ← `.note.label span:first-child`; detail ← `.back-t`; back tag ← `.back .note`. Strip: `.peek` cue (renderer decides interactivity), icon path data (supply a consistent set).

**ARC-05.V2 Ascending staircase to an outcome (D10 S09).**
- Structure: head block (kicker with live readout, h2) over `.steps` `repeat(6,1fr)`, gap 16u, bottom-aligned, height 540u (D10 L650); steps rise in height by 55u increments (--h 280, 335, 390, 445, 500) and the final step "outcome" is 540u and visually distinct. Columns equal; heights ascending.
- Density fit: medium (D10 count 77 words).
- Evidence: `.stair-head` L1402-1408, `.steps` L1409-1416, `.step` L1410-1414, `.step.value` L1415 (the `--a` custom property sets a rising fill alpha .05 to .17).
- Bindings: kicker ← `.kicker`; readout ← `#stair-readout` (strip unless interactive); headline ← `h2.h2` L1407; components ← `.step` (index ← `.n`, name ← `.name`, description ← `.d`); outcome ← `.step.value`. Strip: `--h` and `--a` inline styles (renderer computes them from item count: height = 280 + 55 x index, capped 540).

**Selection signals.**
- If there are exactly 3 parallel, independent components each with a one-line promise, then V1.
- If there are 4 to 6 components that stack or accumulate toward one outcome, then V2.
- If more than 6 parallel components, then ARC-18 (Showcase list) or a table archetype (defined in T5).

**Theme behavior.** Dark in both corpus instances. Accent: numerals (foil, dark only) in V1; ascending alpha fill in V2. Adjacency: do not place directly beside ARC-06.V2 (same three-card family) or ARC-12.V2 (same staircase).

**Failure guards and fallback.** V1 with 4 items: switch to V2; V2 with 7 or more items: merge the smallest two; missing detail text: no flip, keep front only. Fallback: V1 with the first 3 components.
**Deck-type coverage.** INV, PRD, STR, SAL, EDU, PRT (as services); RPT rare.

## ARC-06 · How-it-works

**Narrative role.** How does it work, step by step?
**Content shape.** `{ headline, steps[3-5]{index, word, description, detail?}, result? }`

| Slot | Type | Count | Budget | Required |
|---|---|---|---|---|
| kicker | text | 0-1 | at most 34 chars | no |
| headline | text | 1 | 30-60 chars (D08 33, D10 49) | yes |
| steps | item-list | V1: 3-5 (evidenced 5); V2: exactly 3 | index 2 digits; word 4-12 chars (D08 4-10, D10 4-9) | yes |
| step description | long-text | per step | V1 at most 150 chars (D08 panel p about 125-150); V2 at most 100 chars (D10 lead about 87-99) | yes |
| step detail (V1) | item-list | 0 or 2-3 bullets per step | at most 50 chars each | no |
| step note (V1) | long-text | 0-1 per step | at most 120 chars (derived; D08 `hu` string not fully measured) | no |
| step tag | text | 0-1 per step | at most 24 chars | no |
| result (V2) | long-text | 0-1 | at most 100 chars (D10 90); label at most 14 | no |

**ARC-06.V1 Stepper track with detail panel (D08 S03).**
- Structure: head row (kicker, h2, optional play button) over a 5-node track `repeat(5,1fr)` with a progress line (D08 L249); below, a panel `1.15fr / 1fr / 1fr`, gap 64u, min-height 330u (L264) showing the selected step (heading and text, bullets, note plus tag). Panel is script-driven.
- Density fit: medium once the first step panel is shown (D08 23 words at load; about 85 with a panel open).
- Evidence: `.j-head` L654-660, `.j-track` L661-668 (`.j-line`, `.j-node` L663-667), `.j-panel` L669, data array `S` at L1146-1152 (fields t, h, p, ai[], hu, when), `render()` L1155-1163.
- Bindings: kicker ← `.kicker` L656; headline ← `h2.h2` L657; steps ← `.j-node` (index ← `.n`, word ← `b`); step description ← `S[i].p`; heading ← `S[i].h`; bullets ← `S[i].ai`; note ← `S[i].hu`; tag ← `S[i].when`. Strip: play button (`#j-play`), because autoplay violates PIN-27 unless interactive; the panel must be emitted as static DOM for step 1 (the corpus injects it by script, so no content exists at load).

**ARC-06.V2 Three moves with result line (D10 S10).**
- Structure: head block (kicker, h2) over `.moves` `repeat(3,1fr)`, gap 64u (D10 L686); each card has a top row (index label, icon), a large word, a lead sentence and a tag; below, `.result` strip `220u / 1fr` with a label and one sentence (L707).
- Density fit: medium to dense (D10 count 108 words).
- Evidence: `.method-head` L1434-1437, `.moves` L1438-1466, `article.move` L1439, 1448, 1457, `.result` L1467-1470.
- Bindings: kicker ← `.kicker` L1435; headline ← `h2.h2` L1436; steps ← `.move` (index ← `.n`, icon ← `svg.icon`, word ← `.word`, description ← `p.lead`, tag ← `.tag`); result ← `.result p`; result label ← `.result .label`. Strip: icon paths (supply set), inline styles.

**Selection signals.**
- If 4 to 5 steps each carry detail (bullets or note), then V1.
- If exactly 3 steps with one sentence each and a stated result, then V2.
- If steps exceed 5, merge to 5 or use ARC-12 (timeline); if fewer than 3, use ARC-04.

**Theme behavior.** V1 dark (D08 S03), V2 light (D10 S10). Accent: active node and progress line in V1; icons and tags in V2. Adjacency: V1 is the "agenda" when later slides repeat its names in kickers; keep it within the first third of the deck.

**Failure guards and fallback.** Step words over 12 chars: shorten; V1 without detail: use V2 form when count is 3, else a list; V2 text overflow: cut descriptions to 100 chars. Fallback: V2 with the first 3 steps.
**Deck-type coverage.** INV, PRD, STR, SAL, EDU, RPT; PRT rare.

## ARC-07 · Product / Demo

**Narrative role.** What does using it look like, and why is the output trustworthy?
**Content shape.** `{ headline, controls[1-4], results (rank list | chart + readouts | chat log), disclaimer? }`

| Slot | Type | Count | Budget | Required |
|---|---|---|---|---|
| kicker | text | 0-1 | at most 34 chars | no |
| headline | text | 1 | 20-40 chars (D08 h2 20-36) | yes |
| lead (V3) | long-text | 0-1 | 100-170 chars (D08 129-167) | V3: yes |
| controls | item-list | 1-4 sliders (V1 evidenced 1 slider, 1 segment, 1 tag group; V2 4 sliders plus 1 segment) | label at most 20 chars; value readout at most 8 chars | V1, V2: yes |
| results | table / media | V1: 5 ranked rows (evidenced via script) ; V2: 1 chart (2 series) ; V3: 1 chat log | row title at most 28 chars, row detail at most 40 chars; chart legend labels at most 24 chars | yes |
| readouts (V2) | metric | 3-4 (evidenced 4, 2 emphasized) | label at most 18 chars; value at most 8 chars | V2: yes |
| prompts (V3) | item-list | 2-4 | at most 48 chars (D08 L856-859 up to 42) | V3: yes |
| answers (V3) | long-text | 1 per prompt | at most 220 chars (derived from PIN-06) | V3: yes |
| hint | text | 0-1 | at most 50 chars | no |
| disclaimer | text | 0-1 | at most 110 chars (D08 94) | V2: yes |

**ARC-07.V1 Controls plus live ranked results (D08 S04).**
- Structure: `.split2.match` `.8fr / 1.2fr`, gap 64u, top aligned (D08 L275); left: kicker, h2, a control panel (range slider with output, segmented control, option chips, live hint); right: ranked rows that re-order by translate (`.m-row`, L279).
- Density fit: sparse (D08 count 39 words at load).
- Evidence: L679-700; `.m-controls.panel` L683; `.field` L684, 688, 692; `#m-results` L699 (rows built by script).
- Bindings: headline ← `h2.h2` L682; controls ← `.field` (slider `input[type=range]` + `output`, `.seg`, `.opts`); results ← `#m-results` rows (script data); hint ← `.m-hint .label`. Strip: `aria-live` is retained, event-binding script (renderer ships its own), the "Live re-ranks" label if static.

**ARC-07.V2 Controls plus chart plus KPI strip (D08 S07).**
- Structure: head stack, then `.split2.ret` `.78fr / 1.22fr` (D08 L343): left control panel (4 sliders, preset segment); right chart panel (legend, SVG chart 800 x 330, KPI strip `repeat(4,1fr)` L356). Footer carries a disclaimer.
- Density fit: medium (D08 count 70 words).
- Evidence: L805-836; `.ret-ctl` L811-817; `.chart-wrap` L818-834; `.kpis` L828-833; disclaimer `.disc` L837.
- Bindings: headline ← `h2.h2` L808; controls ← `.field` x4 + `#r-pre.seg`; chart ← `svg#chart`; legend ← `.legend span` x2; readouts ← `.kpi` (label ← `span`, value ← `b`; `.hi` marks emphasis); disclaimer ← `.foot .disc`. Strip: computed outputs are emitted at the default control values (static), script math.

**ARC-07.V3 Prompted chat (D08 S08).**
- Structure: `.split2.ask` `.8fr / 1.2fr` (D08 L363): left stack (kicker, h2, lead max-width 640u, accent tag); right chat panel (header with model label, scrolling log, 4 prompt chips).
- Density fit: medium (D08 count 77 words).
- Evidence: L845-862; `.chat.panel` L852; `#chat-log` L854; `#chat-prompts` L855-860.
- Bindings: headline ← `h2.h2` L848; lead ← `p.lead.muted` L849; tag ← `span.tag.gold` L850; prompts ← `.opt[data-q]`; header labels ← `.chat-head .label` x2. Strip: the typed-answer script, `aria-live` (kept when interactive).

**Selection signals.**
- If the product ranks or filters items by at least 2 preferences, then V1.
- If it models a numeric outcome over time from at least 3 inputs, then V2.
- If it is conversational or assistant-like, then V3.
- If the delivery is static (print, PDF, reduced motion), render the default state of the chosen variant (first control values, first prompt answered), never an empty panel.

**Theme behavior.** V1 dark, V2 light, V3 dark (observed). Accent: slider fill, active chips, KPI emphasis, chat label dot. Adjacency: at most 2 consecutive ARC-07 slides; V2 requires a disclaimer whenever numbers are projected.

**Failure guards and fallback.** Controls over 4: keep the 4 that move the result most; V2 chart with fewer than 3 time points: replace the chart with the KPI strip (ARC-10.V1); missing disclaimer on V2: add the fixed disclaimer sentence. Fallback: V3 static with one answered prompt.
**Deck-type coverage.** PRD, SAL, INV (traction proof by demonstration), EDU (explorable explainer), STR (V2 scenario), RPT (V2 chart); PRT rare.

## ARC-08 · Market

**Narrative role.** How large and varied is the field we serve, and where does it differ?
**Content shape.** `{ headline, segments[3-8]{name, metrics[2-5]}, selector?, detail? }`

| Slot | Type | Count | Budget | Required |
|---|---|---|---|---|
| kicker | text | 0-1 | at most 34 chars | no |
| headline | text | 1 | 30-50 chars (D08 36) | yes |
| segments | item-list | 3-8 (evidenced 6) | name at most 14 chars (D08 8-12); per-segment value at most 8 chars | yes |
| metric selector | item-list | 2-4 | label at most 14 chars | no |
| detail panel | table | 1 | tag at most 12 chars; name at most 20; 2 stats (label at most 14, value at most 8); 3-5 bars (label at most 14, value 0-100); read-out at most 150 chars | no |

**ARC-08.V1 Segment explorer (D08 S06).**
- Structure: head block, then `.split2.hood` `1.1fr / .9fr`, gap 64u (D08 L317): left map panel (metric selector, SVG 600 x 480 with 6 polygons and a path), right detail panel (tag, name, 2 stats, 5 bars `140u / 1fr / 46u` L335, read-out text).
- Density fit: medium (D08 count 79 words plus script text).
- Evidence: `.hood-top` L756-758, `.map-wrap` L760-781, `.map-bar` L761-764, `svg#map` L765-780, `.hpanel` L782-794, `.bar` L787-791.
- Bindings: headline ← `h2.h2` L757; selector ← `.seg#h-metrics button`; segments ← `polygon.dist[data-k]` + `text.dlabel` + `text.dval`; detail ← `.hpanel` (tag `#h-tag`, name `h3#h-name`, stats `.hstats`, bars `.bar`, read-out `p.aiRead`). Strip: geography, i.e. `polygon points` and the `metro`/`stn` path and circles (the renderer supplies a segment geometry; non-geographic segments use an equal-area grid, which is Track B geometry and flagged in the ledger), station dots.

**TB-A2 Scope numbers (Track B).** Three numbers (outer to inner scope) in the SF-04 stat rhythm (D08 L385-390) with a descriptor each, label at most 20 chars, value at most 7 chars, caption at most 80 chars. Improves: gives a market slide for decks that have headline numbers but no segment data. Certification: PIN-01 focal check (largest number is the focal element), PIN-22 under 80 words.

**Selection signals.**
- If at least 3 segments each carry at least 2 comparable metrics, then V1.
- If the brief has only 2 to 3 headline numbers and no segment detail, then TB-A2 (when certified) else ARC-10.V1.
- If no quantitative market data exists, omit the slide (never fabricate; T5 missing-content policy) or use ARC-03.

**Theme behavior.** Dark (D08 S06). Accent: selected segment fill and detail tag. Adjacency: after a product or showcase slide; avoid directly after ARC-07 (both panel-heavy).

**Failure guards and fallback.** Segments over 8: group the tail into "Other"; fewer than 3: use ARC-10; metrics selector with 1 option: drop the selector. Fallback: static grid of 3 to 8 cells, highest-value cell selected.
**Deck-type coverage.** INV, PRD, STR, SAL, RPT.

## ARC-09 · Business model

**Narrative role.** How does value flow, and how do we earn from it?
**Content shape.** `{ headline, flow[3-5]{label, descriptor}, economics[0-4]{value, label}, note? }`

| Slot | Type | Count | Budget | Required |
|---|---|---|---|---|
| headline | text | 1 | 30-60 chars | yes |
| flow | item-list | 3-5 | label at most 18 chars; descriptor at most 60 chars | yes |
| economics | metric | 0-4 | value at most 8 chars; label at most 24 chars | no |
| note | long-text | 0-1 | at most 90 chars | no |

No variant is evidenced in D08 or D10. **TB-A3 Flow chain (Track B).** Horizontal chain of 3 to 5 panels separated by 56u arrow cells (the D08 `.cmp-row` column rhythm, L232), economics as a stat strip (SF-04) beneath. Improves: first-class business-model shape; certification: PIN-19 spacing ladder, PIN-18 equal panel height, PIN-05 floors at 5 nodes (panel width about 290u at 5 nodes; descriptor at 22px must fit 3 lines).
**Selection signals.** If the brief has a value chain or revenue model with at most 5 stages, then TB-A3; otherwise ARC-10.V1 with unit economics only. **Theme.** Light by default (numeric content; D08 S07 and S09 light). **Guards.** More than 5 stages: merge; missing economics: omit the strip. **Fallback.** ARC-05.V2 as a staged build. **Deck-type coverage.** INV, SAL, STR, PRD.

## ARC-10 · Traction / Metrics

**Narrative role.** What results prove it works?
**Content shape.** `{ headline, stats[3-4]{label, value, caption}, recognition? } | { headline, chart, readouts[3-4] }`

| Slot | Type | Count | Budget | Required |
|---|---|---|---|---|
| kicker | text | 0-1 | at most 34 chars | no |
| headline | text | 1 | 20-40 chars (D08 20) | yes |
| stats | metric | 3-4 (evidenced 4) | label at most 20 chars (D08 8-20); value at most 7 chars including prefix and suffix (D08 "1240+", "$3.1B", "99.2%", "42"); caption 60-80 chars (D08 63-79) | V1: yes |
| recognition | logo-row | 0-1 | label at most 14 chars; 2-5 names at most 26 chars (D08 3, 14-23) | no |
| chart | media | 1 | one SVG, at most 2 series; legend labels at most 24 chars | V2: yes |
| readouts | metric | 3-4 | label at most 18 chars; value at most 8 chars | V2: yes |

**ARC-10.V1 Stat row with recognition strip (D08 S09).**
- Structure: head stack, `.stats` `repeat(4,1fr)` gap 48u (D08 L385); each stat has a top rule with a 60u accent segment (L387), a label, a 128u light numeral with tabular figures and a 0.4em suffix (L388-389), and a caption max-width 340u; `.recog` strip below (L882-884) with italic names.
- Density fit: medium (D08 count 70 words).
- Evidence: `.proof-head` L872-875, `.stats` L876-881, `.stat` L877-880, `.recog` L882-884.
- Bindings: headline ← `h2.h2` L874; stats ← `.stat` (label ← `span.label`, value ← `b[data-count][data-prefix][data-suffix][data-dec]`, caption ← `p`); recognition ← `.recog .i` + `.label.l`. Strip: the initial text "0" and `data-count` attributes (the renderer must emit the final value as text so the slide is correct without script and under reduced motion, per PIN-28).

**ARC-10.V2 Chart with KPI strip (Track A-derived from D08 S07, controls removed).**
- Structure: single chart panel (legend, SVG 800 x 330) with a `repeat(4,1fr)` KPI strip (D08 L356) below a ruled divider, full width or a 60/40 split with a text column. Evidence for the chart and strip: D08 L818-834; the omission of controls is a derivation.
- Density fit: medium (D08 count 70 words with controls; about 50 without).
- Bindings: chart ← `svg#chart`; legend ← `.legend span`; readouts ← `.kpi` (`.hi` emphasis for at most 2). Strip: `.ret-ctl` and all script math (static values).

**Selection signals.**
- If there are 3 to 4 independent headline numbers, then V1.
- If there is one trend with 3 to 4 derived figures, then V2.
- If fewer than 3 real numbers exist, omit the slide or fold the numbers into ARC-04.V1 (never invent figures).

**Theme behavior.** Light in the corpus (D08 S09, S07). Accent: the 60u rule segment and the suffix italic; `.hi` KPIs. Adjacency: not directly after another stats slide; ideally follows a product or comparison slide.

**Failure guards and fallback.** Values over 7 chars: abbreviate with a suffix (k, M, B, %); captions over 80 chars: trim. Fallback: V1 with 3 stats.
**Deck-type coverage.** INV, PRD, SAL, RPT, PRT, STR (targets), EDU (outcomes).

## ARC-11 · Comparison / Competition

**Narrative role.** How are we different from the alternative or the status quo?
**Content shape.** `{ headline, left{chip, title, lead, bullets[3]}, right{...} } | { headline, heads[2], pairs[3-5] }`

| Slot | Type | Count | Budget | Required |
|---|---|---|---|---|
| headline | text | 1 | 30-56 chars (D10 38) | yes |
| panels (V1) | item-list | exactly 2 | chip at most 30 chars (D10 24-30); title at most 24 chars (D10 15-21); lead 80-120 chars (D10 about 87-114); bullets exactly 3, at most 50 chars each (D10 about 38-48) | V1: yes |
| pairs (V2) | item-list | 3-5 | old at most 30 chars, new at most 26 chars | V2: yes |
| heads (V2) | text | 2 | at most 20 chars | V2: yes |

**ARC-11.V1 Two panels with a "vs" badge (D10 S06).**
- Structure: `.compare` `1fr / 1fr` with a centered `vs` badge (D10 L565); two panels with a chip label, h3 (accent on the winning clause), lead and a 3-item list. Equal halves.
- Density fit: medium (D10 count 90 words).
- Evidence: `.compare-head` L1271-1273, `.compare` L1274-1296, `.panel.left` L1275-1284, `.panel.right` L1285-1294, `.vs` L1295.
- Bindings: headline ← `h2.h2` L1272; chip ← `.chip.label`; title ← `h3.h3` (`<em>` accent); lead ← `p.lead`; bullets ← `ul.list li`. Strip: the decorative `vs` glyph is re-emitted by the renderer (aria-hidden).

**ARC-11.V2 Paired rows, old to new (Track A-derived from D08 S02 right region).**
- Structure: header row plus 3 to 5 rows `1fr / 56u / 1fr` with an arrow cell (D08 L232), rows divided by 1px rules, padding 24u. Stand-alone use centers the panel at about 1100u (the corpus uses it at half width inside a split).
- Density fit: sparse to medium (D08 cmp content about 45 words).
- Evidence: D08 L635-643 (`.cmp.panel`, `.cmp-head`, `.cmp-row` with `.old`, `.ar`, `.new`); CSS L232-244.
- Bindings: pairs ← `.cmp-row`; heads ← `.cmp-head .label`. Strip: strike animation `.old::after` (kept as the motion token `strike` only).

**Selection signals.**
- If the comparison is between two named positions with a short argument each, then V1.
- If the comparison is a list of at least 3 "from X to Y" shifts, then V2.
- If there are 3 or more alternatives, use a table archetype (T5) instead.

**Theme behavior.** Light in both (D10 S06 and D08 S02). Accent: the winning panel's title clause and the new-column text. Adjacency: follow a problem or thesis slide; avoid being adjacent to ARC-03.V2 (same component).

**Failure guards and fallback.** Panels with unequal bullet counts: pad to 3 or trim to the shorter; pairs over 5: keep 5. Fallback: V2 with 3 pairs.
**Deck-type coverage.** INV (competition), PRD, SAL, STR, EDU, RPT; PRT rare.

## ARC-12 · Roadmap / Timeline

**Narrative role.** What happens when, and what is built along the way?
**Content shape.** `{ headline, milestones[3-6]{when, label, description}, outcome? }`

| Slot | Type | Count | Budget | Required |
|---|---|---|---|---|
| headline | text | 1 | 30-60 chars | yes |
| milestones | timeline | V1: 3-5; V2: 4-6 | when at most 14 chars; label 4-14 chars; description at most 90 chars | yes |
| outcome | item | 0-1 | label at most 10 chars; name at most 12; description at most 60 | no (V2) |

**Evidence status.** Track A-derived: the structures are evidenced (D08 S03 track, D10 S09 staircase) but both appear with other narrative roles; the date and ownership slots are added by transfer.

**ARC-12.V1 Horizontal milestone track.** Structure as D08 `.j-track` (`repeat(5,1fr)`, progress line, dot nodes; D08 L249-263, markup L661-668), static, with `when` below each node and a description under it. Density fit: sparse to medium. Bindings: milestones ← `.j-node` (index → `when`, `b` → label); detail ← description text. Strip: the panel and play button.
**ARC-12.V2 Ascending staircase of capability.** Structure as D10 `.steps` (D10 L650, markup L1409-1416) with `when` added to the name line; heights rise with time. Density fit: medium. Bindings as ARC-05.V2.

**Selection signals.** If milestones are dated and sequential (3 to 5), then V1. If the roadmap is cumulative (each stage adds capability toward an end state), then V2. If more than 6 milestones, split into two slides or group by quarter.
**Theme behavior.** Dark in both corpus structures; light allowed. Accent: the current milestone and the last step. Adjacency: do not neighbour ARC-05.V2 or ARC-06.V1.
**Failure guards and fallback.** Missing dates: use order labels ("Stage 1") and do not invent dates; overflow: group. Fallback: V1 with at most 4 milestones.
**Deck-type coverage.** INV, PRD, STR, SAL, EDU (syllabus), RPT (next steps), PRT (career timeline).

## ARC-13 · Team

**Narrative role.** Who is doing this, and why are they credible?
**Content shape.** `{ headline, members[2-8]{name, role, credential, portrait?} }`

| Slot | Type | Count | Budget | Required |
|---|---|---|---|---|
| headline | text | 1 | 20-50 chars | yes |
| members | item-list | 2-8 | name at most 26 chars; role at most 32 chars; credential at most 70 chars | yes |
| portrait | media | 0-1 per member | one square image, same crop for all | no |

No variant is evidenced in D08 or D10. **TB-A4 Portrait cards (Track B).** Cards in SF-02 (D08 `.card`, L296: radius 20u, body padding, label and name) at 3 to 4 per row, 2 rows maximum. Improves: team slides that stay inside the card family; certification: PIN-18 (equal heights), PIN-30 radius vocabulary, PIN-05 floors for the credential line.
**Selection signals.** If 2 to 4 members, then one row of cards; if 5 to 8, two rows with portraits omitted; more than 8: list the top 8. **Theme.** Light by default. **Guards.** Missing portraits: use monogram tiles (initials, same tile size) rather than placeholder photos; never fabricate credentials. **Fallback.** Ruled list (SF-05). **Deck-type coverage.** INV, SAL, PRT, STR, PRD, EDU.

## ARC-14 · Social proof / Quote

**Narrative role.** Who else says it works?
**Content shape.** `{ kicker?, quotes[1-4]{text, name, descriptor} } | { label, names[2-5] }`

| Slot | Type | Count | Budget | Required |
|---|---|---|---|---|
| kicker | text | 0-1 | at most 22 chars (D08 14) | no |
| quotes | quote | 1-4 (evidenced 3) | text 80-180 chars (D08 136, 159, 142); name at most 26 chars; descriptor at most 34 chars (D08 "Relocating · Elm Park" 21) | yes |
| names (V2) | logo-row | 2-5 | label at most 14 chars; each name at most 26 chars (D08 14-23) | V2: yes |

**ARC-14.V1 Selectable quote with attribution list (D08 S10).**
- Structure: `.split2.voices` `.7fr / 1.3fr`, gap 96u, centered (D08 L396); left: kicker, tablist of attributions (index, name, descriptor, progress bar); right: large blockquote and cite (text from script). About 35/65.
- Density fit: sparse (D08 count 30 words at load; about 50 with a quote).
- Evidence: `.voices` L894, `.vlist#vlist` L897-901 (`.vbtn` L898-900), `.vquote` L903-906, data `Q` L1375-1379.
- Bindings: kicker ← `.kicker` L896; attributions ← `.vbtn` (index ← `.n`, name ← `b`, descriptor ← `small`); quote ← `Q[i].q`; cite ← `Q[i].c` (or `cite`). Strip: tab behavior is optional; static form shows the first quote and all attributions, or all quotes stacked when count is at most 2.

**ARC-14.V2 Recognition strip (D08 S09 sub-region).**
- Structure: single ruled row with a label and 2 to 5 italic names (flex, wrap, gap 72u; D08 `.recog` L882-884). Intended as a region docked under ARC-10.V1 or ARC-17, or as a standalone strip on a quote slide. Density fit: sparse.
- Bindings: label ← `.recog .label.l`; names ← `.recog .i`. Strip: none. Names as text only (no logos in the corpus); logo images, when supplied, replace the text at the same height (36u).

**Selection signals.** If at least 1 real attributed quote exists, then V1. If only recognitions or press names exist, then V2 docked to ARC-10. If neither, omit (never fabricate quotes or logos; T5 policy; placeholder testimonials are labeled as such in the corpus footer D08 L908, which the renderer must not emit as final copy).
**Theme behavior.** V1 dark (D08 S10); V2 inherits its host. Accent: active attribution index and progress bar. Adjacency: after a traction slide; before the closing slide.
**Failure guards and fallback.** Quote over 180 chars: trim to the first sentence; more than 4 quotes: keep 4. Fallback: single large quote (V1 with count 1, no list).
**Deck-type coverage.** INV, PRD, SAL, EDU (learner outcomes), RPT, PRT.

## ARC-15 · Pricing

**Narrative role.** What does it cost, and what do I get at each level?
**Content shape.** `{ headline, tiers[2-4]{name, price, unit, features[3-5], highlight?}, note? }`

| Slot | Type | Count | Budget | Required |
|---|---|---|---|---|
| headline | text | 1 | 20-50 chars | yes |
| tiers | table | 2-4 | name at most 16 chars; price at most 8 chars; unit at most 12 chars; features 3-5 at most 40 chars each | yes |
| highlight | text | 0-1 | at most 18 chars (one tier only) | no |
| note | text | 0-1 | at most 110 chars | no |

No variant is evidenced in D08 or D10. **TB-A5 Tier columns (Track B).** `repeat(N,1fr)` columns (N = 2 to 4) in the SF-02 card family with one highlighted tier (accent top rule 60u like D08 `.stat::before`, L387); price in the stat numeral style (D08 L388). Improves: gives a pricing slide the same craft as the stats row; certification: PIN-01 (the highlighted price is focal), PIN-12 accent budget, PIN-22 under 100 words at 4 tiers.
**Selection signals.** If 2 to 4 priced tiers, then TB-A5; if one price, use ARC-10.V1 style single stat; if price on request, use ARC-17. **Theme.** Light by default. **Guards.** Features over 5: link to notes; never fabricate prices (omit slide). **Fallback.** A ruled table (SF-05). **Deck-type coverage.** SAL, PRD, INV; EDU (fees), STR rare.

## ARC-16 · Ask

**Narrative role.** What do we want the audience to do or provide, and what do they get?
**Content shape.** `{ headline?, choices[2-4]{index, title, descriptor}, primary, secondary? }`

| Slot | Type | Count | Budget | Required |
|---|---|---|---|---|
| choices | item-list | 2-4 (evidenced 3) | index 2 digits; title at most 16 chars (D08 13); descriptor at most 44 chars (D08 31-39) | yes |
| primary action | text | 1 | at most 36 chars (D08 30) | yes |
| secondary action | text | 0-1 | at most 28 chars (D08 21) | no |

**ARC-16.V1 Intent selector with action buttons (D08 S11, right region).**
- Structure: right column of `.intents` stacked panels (`50u / 1fr / 44u` rows, L419), below them two buttons; selecting an intent changes the primary action's mailto subject. Docks into ARC-17 as the right region (`.begin` `1fr / 1fr`, gap 96u, L416) or stands alone with a headline.
- Density fit: sparse (about 40 words).
- Evidence: `.col` L927, `.intents#intents` L928-932 (`.intent.panel` L929-931), actions L933-936 (`a.btn#b-cta`, `button.btn.ghost`).
- Bindings: choices ← `.intent` (index ← `.n`, title ← `b`, descriptor ← `.d`); primary ← `a.btn` text; secondary ← `button.btn.ghost` text. Strip: the `mailto` composition script and the check glyph `.ck` (renderer re-emits); the secondary "Back to the beginning" is deck navigation, not an ask.

**TB-A6 Allocation bars (Track B).** For funding or resource asks: 3 to 5 rows in the D08 bar component (`140u / 1fr / 46u`, L335) with a total line and the primary action; label at most 14 chars, value 0 to 100. Improves: gives a funding ask an evidenced component; certification: PIN-23 whitespace, PIN-05 floors (the corpus bar label is 14px: raise to 15px minimum).

**Selection signals.** If the ask is "choose your path" (2 to 4 intents), then V1. If the ask is an amount with a split of uses, then TB-A6 (when certified). If a single action, set `choices` to none and render only the primary action inside ARC-17.
**Theme behavior.** Dark (D08 S11). Accent: primary button fill and selected intent. Adjacency: always the last or second-to-last slide; composite rule: ARC-16 may occupy the right region of ARC-17.
**Failure guards and fallback.** Choices over 4: keep the 3 most distinct; descriptor over 44 chars: trim. Fallback: primary action only.
**Deck-type coverage.** INV (funding ask via TB-A6), PRD, SAL, STR, EDU (enroll), PRT (hire me), RPT (decisions requested).

## ARC-17 · Closing / Contact

**Narrative role.** How do we continue the conversation?
**Content shape.** `{ headline, lead?, contacts[2-3]{label, value}, action?, art? }`

| Slot | Type | Count | Budget | Required |
|---|---|---|---|---|
| kicker | text | 0-1 | at most 34 chars | no |
| headline | text | 1 | 30-60 chars (D08 42, D10 40) | yes |
| lead | long-text | 0-1 | 40-170 chars (D10 49; D08 about 160) | no |
| contacts | item-list | 2-3 | label at most 10 chars; value at most 40 chars (D08 22-25, D10 17-23) | yes |
| copy buttons | item-list | 0-3 | one per contact value, label at most 8 chars | no |
| action | text | 0-1 | at most 36 chars | no |
| art | media | 0-1 | decorative SVG | no |

**ARC-17.V1 Split close with docked ask (D08 S11).**
- Structure: `.split2.begin` `1fr / 1fr`, gap 96u (D08 L416); left: kicker, h1 (96u), lead max-width 680u, a 3-column contact row (`repeat(3,auto)`, gap 48u, L430); right: ARC-16.V1 region.
- Density fit: medium (D08 count 94 words).
- Evidence: L916-938; `.contact` L921-925.
- Bindings: kicker ← `.kicker` L918; headline ← `h1.h1` L919 (`<em>` accent); lead ← `p.lead.muted` L920; contacts ← `.contact > div` (label ← `.label`, value ← `b`). Strip: none.

**ARC-17.V2 Arch close with copy-to-clipboard contacts (D10 S11).**
- Structure: `.close-body` with a decorative arch SVG (L1488-1496) behind a left-aligned stack: `rule-lux`, h1, lead, a 2-column contact grid (max-width 1100u, `repeat(2,minmax(0,1fr))`, L716) where each cell has a label row with a copy button and a link, then a single "back to the beginning" action.
- Density fit: sparse (D10 count 42 words).
- Evidence: L1487-1515; `.contact` L1501-1510 (`.row`, `.copy-btn[data-copy]`, `a.v`), `.close-actions` L1511-1513.
- Bindings: headline ← `h1.h1` L1499; lead ← `p.lead.muted` L1500; contacts ← `.contact > div` (label ← `.row .label`, value ← `a.v`); copy buttons ← `.copy-btn`. Strip: placeholder contact details (the corpus file carries a TODO at L1480 to replace them; never emit placeholder values as final copy), the "back to the beginning" button (deck navigation).

**Selection signals.** If an ask or intent selector exists, then V1 with ARC-16 docked. If a short statement plus 2 contacts only, then V2.
**Theme behavior.** Dark in both (D08 S11, D10 S11). Accent: em clause and primary action. Adjacency: always the final slide; no stats or comparison slide after it.
**Failure guards and fallback.** Missing contact values: block the slide (BLOCKER) rather than emit placeholders; values over 40 chars: wrap link text at the 2-column cell width. Fallback: V2 without art.
**Deck-type coverage.** INV, PRD, STR, SAL, EDU, RPT, PRT.

## ARC-18 · Showcase / Catalog (added)

**Narrative role.** What do the actual things look like (offers, cases, series, works)?
**Content shape.** `{ headline, items[3-6]{label?, name, key?, specs?, note?, badge?} }`

| Slot | Type | Count | Budget | Required |
|---|---|---|---|---|
| kicker | text | 0-1 | at most 34 chars | no |
| headline | text | 1 | 20-40 chars (D08 h2 36-ish) | yes |
| items (V1) | item-list | exactly 3 | label at most 20 chars; name at most 28 chars; key value at most 8 chars; specs exactly 3 (value at most 4, unit at most 6); note at most 40 chars (D08 32-34); badge at most 18 chars | V1: yes |
| items (V2) | item-list | 3-5 (evidenced 5) | index 2 digits; title at most 24 chars (D10 12-20); description at most 60 chars (corpus 31-75, capped to hold the slide under 100 words); tag at most 12 chars | V2: yes |
| lead (V2) | long-text | 0-1 | at most 100 chars (D10 80) | no |
| visual (V1) | media | 0-1 per item | one image or generated drawing per card | no |

**ARC-18.V1 Three catalog cards (D08 S05).**
- Structure: head row (kicker, h2, hint) over `.res` `repeat(3,1fr)` gap 48u (D08 L295); each card (radius 20u, L296) has a visual region with a badge, then a body with area label, name, price, three specs and a note.
- Density fit: medium (D08 count 51 words visible in markup).
- Evidence: `.res-head` L710-713, `.res.stagger` L714-745, `article.card` L715, 725, 735.
- Bindings: kicker ← `.kicker` L711; headline ← `h2.h2` L711; items ← `article.card` (visual ← `.fa`, badge ← `.tag.badge`, label ← `.label.area`, name ← `h3`, key ← `.price`, specs ← `.specs span`, note ← `.ai-note`). Strip: hover hint text "Hover to light the windows" (L712), decorative window art in `.fa`.

**ARC-18.V2 Ruled series list (D10 S07).**
- Structure: `.head2` `1fr / 1fr` gap 96u (headline left, lead right, aligned end; D10 L602) over `.series`: 5 ruled rows `70u / 480u / 1fr / 200u`, gap 32u, the row title at 50u (D10 L607-617); the tag is a bordered chip right-aligned.
- Density fit: dense (D10 count 112 words, above the 100-word consecutive threshold in T1 PIN-22; the grammar caps rows at 5 and descriptions at 60 chars).
- Evidence: `.head2` L1314-1317, `ol.series.stagger` L1318-1344 (`li` with `.n.label`, `.t`, `.d`, `.tag.label`).
- Bindings: headline ← `h2.h2` L1315; lead ← `p.lead.muted` L1316; items ← `.series li` (index ← `.n`, title ← `.t`, description ← `.d`, tag ← `.tag`). Strip: hover translate and fill (motion tokens only).

**Selection signals.**
- If exactly 3 items each with a visual and a headline figure, then V1.
- If 3 to 5 named items each with a one-line description and a category, then V2.
- If more than 5, use a table archetype (T5) or split the slide.

**Theme behavior.** V1 light (D08 S05), V2 dark (D10 S07). Accent: V1 badge dot and price; V2 index and tag hover fill. Adjacency: not adjacent to ARC-05.V1 or ARC-06.V2 (same equal-card family) or ARC-07 (panel-heavy).

**Failure guards and fallback.** V1 without visuals: render the card body only on a tinted ground; V2 over 5 rows: keep 5; names over 28 chars: wrap to 2 lines (never shrink). Fallback: V2.
**Deck-type coverage.** PRD, SAL, PRT, INV (portfolio), EDU (modules), RPT (cases), STR (initiatives).

## Domain fit check (illustration only; slots populated for three unrelated domains)

| Archetype | Restaurant | Biotech | SaaS |
|---|---|---|---|
| ARC-01 | title: venue name; facts: seats, covers, years | title: program name; facts: phase, indication, readouts | title: product name; facts: users, uptime, regions |
| ARC-02 | rail: Sourcing, Craft, Service | rail: Target, Mechanism, Evidence | rail: Connect, Understand, Act |
| ARC-03 | pairs: wait times, waste, uneven quality | points: unmet need, standard of care gap, cost | pairs: tool sprawl, manual reports, slow answers |
| ARC-04 | statement: one idea behind the menu | ledger: mechanism observations | ledger: usage observations |
| ARC-05 | 3 cards: dining, events, catering | 3 cards: platform, pipeline, partnerships | 3 cards: capture, analyze, automate |
| ARC-06 | stepper: prep, cook, plate, serve | stepper: dose, monitor, assess, report | stepper: connect, model, review |
| ARC-07 | controls: party size, budget; ranked tables | controls: dose, schedule; response chart | controls: seats, plan; ROI chart |
| ARC-08 | segments: districts with covers and spend | segments: indications with prevalence | segments: customer sizes with growth |
| ARC-09 | flow: supply, kitchen, guest, repeat | flow: license, develop, partner, royalty | flow: acquire, onboard, expand, renew |
| ARC-10 | stats: covers, rating, repeat rate | stats: patients, response rate, trials | stats: customers, retention, NPS |
| ARC-11 | two panels: chain dining vs ours | two panels: standard of care vs ours | two panels: incumbent vs ours |
| ARC-12 | track: open, expand, second site | track: IND, phase 1, phase 2 | track: launch, scale, platform |
| ARC-13 | chef, GM, sommelier | CSO, CMO, CFO | CEO, CTO, head of sales |
| ARC-14 | guest quotes, press names | investigator quotes, journal names | customer quotes, analyst names |
| ARC-15 | tasting menu tiers | not typical (omit) | 3 plans |
| ARC-16 | choices: book, host, partner | choices: partner, invest, join trial | choices: demo, trial, buy |
| ARC-17 | reservations contact | investor contact | sales contact |
| ARC-18 | 3 signature dishes cards | pipeline programs list | 5 integration modules list |
