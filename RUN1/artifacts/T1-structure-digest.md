# T1 STRUCTURE DIGEST (verbatim subset of the certified T1 invariants)

Purpose: token-optimized T1 evidence for structure/size sessions. Included: PIN-01, 02, 04-09, 13, 17, 19, 22, 24, 25, 27, 28, 29 and MR-2, MR-3.
Excluded for size only (the full certified artifact is _collection/certified/T1/invariants.md): hierarchy details PIN-03, color literals PIN-10/11/12/14/15/16, space SHOULDs PIN-18/20/21, density PIN-23, consistency PIN-30, MR-1/4/5, track B.
No content was altered. Labels, thresholds, detection and repair text are copied verbatim from the certified artifact.

### PIN-01 · Single Focal Element
- **Law:** Make exactly one content element per slide at least 1.4x the computed font-size (or 2.0x the bounding-box area for figures) of every other content element outside its own repeating group, and allow at most 4 co-equal numerals only as siblings of one grid group.
- **Rationale:** Pre-attentive search resolves one dominant size contrast in under 200 ms; two competing maxima force serial scanning and the eye has no entry point.
- **Detection:** At 1920x1080 viewport, collect non-chrome, non-aria-hidden text blocks and figures; group by computed font-size (0.5px rounding); find the largest element; fail if a second ungrouped element has size >= 0.71x the largest (1/1.4), or if the largest group has more than 4 members that are not children of one grid or flex container.
- **Repair:** Keep the slot marked headline at its token (h1 or display); demote every other competing element down one size token; if two statements are both primary, move the second into the lead tier.
- **Counterexample (attachments+constructed):** Good (from attachments, D08): h1 token 90px beside lead token 27px, ratio 3.33. Bad (constructed, clinical-trial deck): two 64px headings side by side, ratio 1.0, no entry point.
- **Applies-to:** All slides, all seven deck types; cover and statement slides use the display token as the focal element.
- **Tier:** MUST · calibration: measured-in-corpus

### PIN-02 · Bounded Type Tiers Per Slide
- **Law:** Use between 3 and 5 distinct computed font-sizes on every slide (2 allowed when the slide carries 25 words or fewer), with every adjacent pair of sizes separated by a ratio of at least 1.18.
- **Rationale:** Fewer than three tiers collapses the headline/support/detail reading order; more than five fragments rhythm, and ratios under 1.18 fall below the just-noticeable size difference at presentation distance, so tiers read as mistakes rather than hierarchy.
- **Detection:** Collect computed font-size of every visible non-chrome text node (round to 0.5px); count distinct values; sort and compute adjacent ratios; fail if the count is outside 3-5 (2 if words <= 25) or any adjacent ratio < 1.18.
- **Repair:** Snap each off-ladder size to the nearest type token (PIN-04); merge tiers whose ratio is < 1.18 into the larger token; if more than 5 remain, merge the two closest by ratio until 5.
- **Counterexample (attachments+constructed):** Good (from attachments, D08 cover pattern): display 156, lead 27, label 15 gives 3 tiers with ratios 5.8 and 1.8. Bad (constructed, restaurant menu slide): 44px, 42px, 40px, 38px and 36px text, five sizes with ratios of about 1.05.
- **Applies-to:** All slides; statement and quote slides may use 2 tiers.
- **Tier:** MUST · calibration: measured-in-corpus

### PIN-04 · Bounded Modular Type Scale
- **Law:** Declare a strictly descending ladder of 6 to 10 size tokens in which every adjacent ratio from h1 downward lies between 1.18 and 1.75, the display-to-next ratio is at most 2.4, and the display-to-body ratio is at least 6.
- **Rationale:** Geometric size steps are perceived as evenly spaced (Weber-Fechner); ratios below 1.18 are indistinguishable, above 1.75 skip a perceptual tier, and a display-to-body span of 6 or more gives covers and statements the scale contrast that signals editorial confidence.
- **Detection:** Read --sz-* custom properties via getComputedStyle(document.documentElement) (resolve calc against 1px per --u at 1920x1080); sort descending; compute adjacent ratios, display/next and display/body; fail on count outside 6-10 or any ratio outside bounds.
- **Repair:** Regenerate the ladder geometrically from body = 22px with ratio r in [1.25, 1.5]: size_k = round(22 * r^k); drop the lesser-used of any two tokens whose ratio is < 1.18; cap display at 2.4x the next token.
- **Counterexample (attachments):** Good (from attachments, D08): 156/90/64/38/27/22/15 with ratios 1.73, 1.41, 1.68, 1.41, 1.23, 1.47 and display/body 7.1. Bad (from attachments, D02): 44 and 42 as separate tokens (ratio 1.05) and 32/28 (ratio 1.14) in an 11-token ladder.
- **Applies-to:** Deck-level token set; all dialects.
- **Tier:** MUST · calibration: measured-in-corpus

### PIN-05 · Type Size Floors
- **Law:** Render all body, lead and item text at 22px or larger and all labels, captions and chart annotations at 15px or larger on the 1920x1080 stage, and render nothing below 15px unless it is aria-hidden decoration.
- **Rationale:** At 1080p the floors equal 2.0% and 1.4% of stage height; below that, text fails at room-projection distance and on a 1280x720 display it drops under 10px, below which x-height detail is lost.
- **Detection:** For every visible text node compute font-size px at a 1920x1080 viewport; classify role by token class (body, lead, item, label, caption, annotation); fail when body/lead/item < 22 or any other text < 15 and not inside [aria-hidden=true].
- **Repair:** Raise the offending run to the nearest token at or above the floor; if overflow results, trim copy via PIN-22 or split the slide; never lower the floor to fit.
- **Counterexample (attachments+constructed):** Good (from attachments): --sz-body 22/24/22/23/23 and --sz-label 15/16/15/16/16 across D08/D10/D09/D02/D05. Bad (constructed, investor table for a farm marketplace): footnote and column headers at 12px.
- **Applies-to:** All slides; chrome folio included.
- **Tier:** MUST · calibration: measured-in-corpus

### PIN-06 · Measure by Text Role
- **Law:** Break body and lead text at no more than 72 characters per line, average at least 28 characters per line in blocks of 3 or more lines, and keep every heading line at 32 characters or fewer across no more than 3 lines.
- **Rationale:** Line length governs return-sweep accuracy: beyond about 75 characters readers lose their place, while lines under 25 characters produce ragged slivers and hyphen-like breaks; large display type tolerates fewer characters because each glyph spans more visual angle.
- **Detection:** For each text block use Range.getClientRects per line and measure characters per line (count code points per line box); fail if any body/lead line > 72, if blocks with >= 3 lines average < 28, or if any heading line > 32 chars or heading lines > 3. Thresholds scale by script factor (default Latin = 1.0; CJK 0.5; Arabic and Devanagari 0.9).
- **Repair:** Reduce the block max-width by token steps (e.g., 760u to 680u) until lines <= 72; widen by one step if the average is < 28; shorten the heading via PIN-22 if lines > 3.
- **Counterexample (attachments+constructed):** Good (from attachments, D08): lead capped at max-width 640 to 760 design px at 27px, about 49 to 58 characters per line. Bad (constructed, university-lab review): a 22px paragraph spanning 1696px, about 150 characters per line.
- **Applies-to:** All text blocks; script factor override for non-Latin.
- **Tier:** MUST · calibration: measured-in-corpus

### PIN-07 · Leading by Size Band
- **Law:** Set computed line-height divided by font-size to 0.92-1.08 for display and h1, 1.0-1.18 for h2 and h3, 1.3-1.65 for lead, body and item text, and 1.1-1.3 for labels.
- **Rationale:** Large type needs tighter leading because line gaps scale with size and look wider at scale; small type needs open leading for line tracking; fixed ratios per band preserve a consistent texture.
- **Detection:** For every text node read computed line-height (px) and font-size (px) and compare the ratio with the band for its role token; fail when outside the band (treat normal as 1.2).
- **Repair:** Overwrite line-height with the band midpoint from the token table (display 0.95, h1 1.05, h2 1.08, h3 1.1, lead/body 1.55, label 1.2).
- **Counterexample (attachments+constructed):** Good (from attachments, D08): display .95, h1 1.05, h2 1.08, lead 1.55, label 1.2. Bad (constructed, game-studio pitch): 96px headline at line-height 1.5 so two lines drift apart as separate statements.
- **Applies-to:** All text.
- **Tier:** MUST · calibration: measured-in-corpus

### PIN-08 · Tracking by Text Role
- **Law:** Apply letter-spacing of -0.045em to -0.015em on display, h1 and h2, 0.00em plus or minus 0.01em on body and lead, and +0.08em to +0.22em on every uppercase label.
- **Rationale:** Optical spacing loosens as size grows, so display type needs negative tracking; uppercase has no ascenders to cue word shapes and needs positive tracking for legibility.
- **Detection:** Read computed letter-spacing (px converted to em by font-size) for each text node; read text-transform; fail when a role falls outside its band or an uppercase run has tracking < 0.08em.
- **Repair:** Set the role's tracking from the token table (display -0.035em, h1 -0.03em, h2 -0.025em, body 0, label +0.18em); add the missing text-transform recipe to labels.
- **Counterexample (attachments+constructed):** Good (from attachments, D08): display -0.035em, h1 -0.03em, h2 -0.025em, label +0.18em uppercase. Bad (constructed, logistics SaaS): all-caps 15px eyebrow at 0em tracking.
- **Applies-to:** All text; band edges adjustable only within the dial band.
- **Tier:** MUST · calibration: measured-in-corpus

### PIN-09 · Widow and Balance Control
- **Law:** Render every heading of 2 or more lines with balanced wrapping so the last line measures at least 40% of the longest line, and never end a block of 2 or more lines with a single word of fewer than 4 characters alone on its last line.
- **Rationale:** Short last lines create a visual gap that reads as an error and misdirects the eye; balanced lines give headings a stable silhouette and make the left edge, not the ragged right, the visual anchor.
- **Detection:** For each multi-line block gather line rects via Range.getClientRects; compute last/longest width; count words on the last line; fail if heading ratio < 0.4 or the last line is a single word under 4 characters.
- **Repair:** Apply text-wrap: balance on headings and text-wrap: pretty on body; if unsupported or still failing, join the last two words with U+00A0; as final fallback shrink max-width by 5% up to 6 times.
- **Counterexample (attachments+constructed):** Good (from attachments): text-wrap:balance declared 16 times in D08, 10 in D10, 11 in D09, 19 in D02, 7 in D05 on heading classes. Bad (constructed, museum timeline): a three-line headline whose last line is the single word 'in'.
- **Applies-to:** All slides; multi-line text only.
- **Tier:** MUST · calibration: measured-in-corpus

### PIN-13 · Contrast Floors by Size
- **Law:** Render every text run at WCAG contrast of at least 4.5:1 against its effective background, except runs at 56px or larger (or bold 32px or larger) which need at least 3:1, and meaningful non-text strokes which need at least 3:1.
- **Rationale:** Luminance contrast carries legibility independent of hue; small text needs more contrast because stroke width limits the sampled area, and accents chosen for brightness on dark fail on light surfaces.
- **Detection:** For each text node compute color vs effective background (composite ancestor backgrounds; under gradients or images sample a 5x5 grid across the text rect and take the worst ratio); apply size exceptions; fail below threshold.
- **Repair:** Substitute the scope-derived accent variant (PIN-14); if still failing, switch the text to the scope's primary neutral; never alter the background to fix a text failure.
- **Counterexample (attachments):** Good (from attachments, D10): #e8e2d6 on #1c2644 = 11.55:1. Bad (from attachments, measured): D08 gold #c9a66b on ivory #f5f0e6 = 2.02:1 and D05 turmeric #f0a81c on cream #fbf0d9 = 1.80:1, both failing as text.
- **Applies-to:** All slides, all scopes.
- **Tier:** MUST · calibration: measured-in-corpus

### PIN-17 · Safe Margin and Containment
- **Law:** Keep every content element at least 112px from the left and right stage edges and 64px from the top and bottom edges (mirrored inline margins under RTL), and keep each slide's scrollWidth and scrollHeight within 2px of its clientWidth and clientHeight.
- **Rationale:** A consistent margin frames content and protects against projector overscan; overflow breaks the single-screen contract and is the most visible failure at presentation time.
- **Detection:** At 1920x1080 for each slide measure rects of non-decorative elements and compare to the margins; compare scrollHeight/clientHeight and scrollWidth/clientWidth; fail on any shortfall; exclude aria-hidden bleed and full-bleed media.
- **Repair:** Trim copy by the T5 order; reduce item count; switch to a denser variant; as last repair move overflow into notes. Never scale text below PIN-05 floors.
- **Counterexample (attachments+constructed):** Good (from attachments): --pad-x 120/112 and --pad-y 68/64 in D08/D05 with stage grid rows auto / minmax(0,1fr) / auto. Bad (constructed, indie-game roadmap): twelve milestones overflowing the stage by 140px.
- **Applies-to:** All slides; full-bleed media exempt.
- **Tier:** MUST · calibration: measured-in-corpus

### PIN-19 · Spacing Scale Adherence
- **Law:** Draw every margin, padding and gap from the ladder 8, 16, 24, 32, 48, 64 and 96px (4px half-steps allowed), keeping at least 90% of values per slide on the whole ladder.
- **Rationale:** A closed spacing ladder produces repeating intervals the eye reads as order; arbitrary values (13, 14, 22, 30, 34px) produce visual noise below conscious detection.
- **Detection:** For each element read computed padding, margin, column-gap and row-gap; ignore auto and 0; compute the share on the ladder within 1px; fail if < 90% or any value not a multiple of 4. Indicative corpus counts include non-spacing properties, so treat as an upper bound on off-ladder use.
- **Repair:** The renderer emits only spacing tokens; snap each stray value to the nearest ladder step (round half up) and re-run PIN-17.
- **Counterexample (attachments):** Good (from attachments): --s-1..--s-7 = 8, 16, 24, 32, 48, 64, 96 declared in D08, D09 and D05. Bad (from attachments, indicative): D08 raw counts show 30 (x9), 13 (x9), 14 (x8), 10 (x8), 22 (x7) and 34 (x6) off the ladder.
- **Applies-to:** Compiler output; hand-authored decks should converge.
- **Tier:** MUST · calibration: measured-in-corpus

### PIN-22 · Words Per Slide Band
- **Law:** Keep visible non-chrome words per slide between 10 and 120 (150 at the dense dial), with at least 25% of slides at 60 words or fewer and no two consecutive slides above 100 words.
- **Rationale:** Working memory holds about 4 chunks; slides above about 120 words become documents read instead of presented, and a ramp of light slides gives the dense ones room to work.
- **Detection:** Extract innerText of each slide excluding .chrome, .foot, [aria-hidden=true] and script/style; count word tokens (letters or digits); fail on count outside 10-120 (150 dense), on share of slides <= 60 words under 25%, or on consecutive slides above 100.
- **Repair:** Trim in the order adjectives, qualifiers, clauses; move overflow to notes; split the slide; as last resort switch to a lower-density variant.
- **Counterexample (attachments):** Good (from attachments, indicative counts that include small label text): D08 spans 30-94 words with 6 of 11 slides at 60 or fewer; D05 spans 17-102. Bad (from attachments): D02 slides 3 and 4 carry 115 and 112 words and slide 11 carries 189; D10 slides 7 and 8 carry 112 and 133.
- **Applies-to:** All slides; counts include in-slide mock content.
- **Tier:** MUST · calibration: measured-in-corpus

### PIN-24 · Scope Alternation Cadence
- **Law:** In decks of 6 or more slides, run no more than 3 consecutive slides in the same light or dark scope and give each scope at least 25% of the slides.
- **Rationale:** Luminance alternation resets adaptation and gives pace; long same-scope runs flatten rhythm, while intentional alternation marks section changes without added ornament.
- **Detection:** Read each slide's scope class (dark/light/night) and compute the longest run and each scope's share; fail if run > 3 or either share < 25% for decks of 6 or more slides.
- **Repair:** Flip the scope of the lowest-narrative-weight slide inside the longest run (token swap, no layout change); repeat until the run <= 3.
- **Counterexample (attachments):** Good (from attachments, measured): D05 alternates dark/light on all 11 slides (max run 1, light 5/11); D08 max run 2, light 4/11. Bad (from attachments): D09 runs 3 night, 3 transitional, then 7 consecutive light slides.
- **Applies-to:** Decks of 6 or more slides.
- **Tier:** MUST · calibration: measured-in-corpus

### PIN-25 · Layout Variety Distance
- **Law:** Give every slide a layout signature (grid column template, direct-child count of the body region, focal type) that differs from the signatures of the 2 preceding slides, and keep at least 60% of the deck's signatures unique.
- **Rationale:** Repetition builds a pattern the eye stops reading; a distance of 3 keeps recurrence recognizable as system without producing monotony.
- **Detection:** For each slide compute signature = (normalized grid-template-columns of the first grid under the body, number of direct children, focal type text|number|figure); fail if equal to either of the 2 previous signatures or if unique signatures < 0.6 * slides.
- **Repair:** Swap the later slide to another variant of the same archetype; if none exists and the arc permits, reorder; otherwise accept and log a MINOR.
- **Counterexample (attachments+constructed):** Good (from attachments): D05 ships a separate CSS section per slide (01 Cover through 11 Close). Bad (constructed, clinical-trial update): three consecutive slides with a 3-card row and a headline.
- **Applies-to:** All decks of 5 or more slides.
- **Tier:** SHOULD · calibration: provisional (signature function untested on corpus)

## Domain: Motion

### PIN-27 · Motion Style Budget
- **Law:** Use at most 2 entrance styles per slide from {fade-up, fade-in, grow, pop, draw, clip-wipe} plus at most 1 ambient loop, and limit entrance translation to 36px and entrance scale to 0.85 or higher unless the dial is playful (0.6 minimum).
- **Rationale:** Restraint makes motion read as punctuation; three or more simultaneous styles compete with content, and large displacements pull attention from the reading order.
- **Detection:** From the data-anim attributes and getAnimations() per slide, collect distinct keyframe names classified into the style set; count infinite-iteration animations; parse transforms from keyframes; fail if styles > 2, ambient > 1, translate > 36px, or scale < 0.85 (0.6 playful).
- **Repair:** Map extra styles to the dominant two; remove ambient loops beyond the first; clamp translate and scale to the limits.
- **Counterexample (attachments):** Good (from attachments, D08 measured): 30 fade-up and 9 fade-in, two styles, with kFadeUp travel 28px. Bad (from attachments, D02): fade-up 31, fade-in 25, pop 11 and grow 2 across the deck with kPop starting at scale 0.6 and kStamp at 2.4.
- **Applies-to:** All slides; playful dial relaxes scale only.
- **Tier:** MUST · calibration: measured-in-corpus

### PIN-28 · Reduced-Motion Equivalence
- **Law:** Under prefers-reduced-motion: reduce, finish every animation at its final geometry within 10ms, show all content at opacity 1, stop every infinite loop, and keep the t=0 screenshot within 0.5% of pixels of the normal end-state screenshot.
- **Rationale:** Motion carries no unique content: the reduced path must show the same information so vestibular-sensitive viewers lose nothing but movement.
- **Detection:** With the browser emulating reducedMotion reduce, load each slide, wait 50ms, read getAnimations() (expect none running, no infinite) and computed opacity of [data-anim]; screenshot; compare with the end-state screenshot in normal mode; fail on any running animation, opacity < 1, or diff > 0.5%.
- **Repair:** Inject the reduce block: transition-duration .01s on deck and progress, animation none, [data-anim] and stagger children opacity 1, stroke-dashoffset 0, transforms none.
- **Counterexample (attachments+constructed):** Good (from attachments, D08 lines 435-441): transition-duration .01s, animation none, opacity 1 on data-anim and stagger children, stroke-dashoffset 0. Bad (constructed, university lab deck): data-anim items remain opacity 0 until a JS timer fires.
- **Applies-to:** All slides.
- **Tier:** MUST · calibration: measured-in-corpus

## Domain: Consistency

### PIN-29 · Chrome Anatomy Constant
- **Law:** Render one chrome header on every slide of the deck (a cover may declare none) with a brand or section label and a folio in the form NN / total, at identical coordinates within 2px and identical font-size on every slide.
- **Rationale:** A fixed frame element gives orientation and makes content changes the only variable, which is what the eye processes as a slide change rather than a layout reset.
- **Detection:** Query .chrome per slide; collect rects of the brand label and folio; verify folio text matches /^\d{2} \/ \d{2}$/ and the total equals the slide count; fail if absent (cover exempt when declared), if rect deltas > 2px, or if font-size differs.
- **Repair:** Regenerate chrome from the single template; renumber folios; remove per-slide overrides.
- **Counterexample (attachments):** Good (from attachments, measured): .chrome headers on 11/11 (D08), 13/13 (D09), 14/14 (D02), 11/11 (D05) slides with a folio. Bad (from attachments): D10 renders chrome on 10 of 11 slides without a declared exemption.
- **Applies-to:** All slides.
- **Tier:** MUST · calibration: measured-in-corpus

### MR-2 · Yield by trimming, never by shrinking
- **Rule:** When content does not fit, repair in this fixed order: trim copy (PIN-22 order) then reduce item count then switch to a denser variant then split the slide then move text to notes; the PIN-05 and PIN-17 floors never yield, and font-size is never reduced below its token to make text fit.
- **Why:** Prevents the common degenerate repair of shrinking type; content yields to the invariants, not the reverse.

### MR-3 · Dials move thresholds inside bands, never floors
- **Rule:** Dialect dials (density, mood, motion intensity) may move only the thresholds marked with a dial band (PIN-11 hue count 2-4, PIN-12 area 10-25%, PIN-22 ceiling 120-150, PIN-27 scale 0.6-0.85); the fixed floors PIN-05, PIN-13, PIN-15, PIN-17, PIN-28 never move. Defaults and overrides: LTR reading, Latin script factor 1.0, tabular numerals with locale grouping; each may be overridden by an explicit brief (RTL mirrors inline margins and alignment edges, script factors scale PIN-06).
- **Why:** Keeps one type system while allowing mood diversity; makes the overrides explicit rather than implicit.

