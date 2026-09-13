---
name: Al-Rawasi Engineering Consultants
description: From drawing to landmark — a precise bilingual editorial system for Libyan engineering work.
colors:
  graphite: "#191c20"
  paper: "#ffffff"
  soft-surface: "#f5f5f5"
  section-surface: "#eef0f2"
  rail-surface: "#f2f3f4"
  editorial-magenta: "#a51a62"
  editorial-magenta-hover: "#bd2874"
  focus-magenta: "#d03c89"
  muted-text: "#646970"
  light-rule: "#d9dadd"
  dark-rule: "#44494e"
typography:
  display-arabic:
    fontFamily: "Tajawal, sans-serif"
    fontSize: "clamp(54px, 5vw, 78px)"
    fontWeight: 700
    lineHeight: 1.17
  headline-arabic:
    fontFamily: "Tajawal, sans-serif"
    fontSize: "clamp(32px, 3.2vw, 52px)"
    fontWeight: 700
    lineHeight: 1.2
  body-arabic:
    fontFamily: "Cairo, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.85
  display-english:
    fontFamily: "Outfit, sans-serif"
    fontSize: "clamp(48px, 4.8vw, 74px)"
    fontWeight: 500
    lineHeight: 1.17
    letterSpacing: "-0.035em"
  body-english:
    fontFamily: "Outfit, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.85
  label:
    fontFamily: "Outfit, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.12em"
rounded:
  sharp: "0px"
  field: "14px"
  mobile-panel: "18px"
  panel: "24px"
  form: "28px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "48px"
  section-compact: "64px"
  section-standard: "80px"
  section-generous: "96px"
  shell-mobile: "20px"
  shell-tablet: "32px"
  shell-desktop: "56px"
components:
  button-primary:
    backgroundColor: "{colors.editorial-magenta}"
    textColor: "{colors.paper}"
    typography: "{typography.body-arabic}"
    rounded: "{rounded.sharp}"
    padding: "13px 32px"
    height: "60px"
  button-primary-hover:
    backgroundColor: "{colors.editorial-magenta-hover}"
    textColor: "{colors.paper}"
  button-inverse:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.sharp}"
    padding: "13px 32px"
    height: "58px"
  dark-field:
    backgroundColor: "#20242a"
    textColor: "{colors.paper}"
    rounded: "{rounded.field}"
    padding: "15px 18px"
    height: "52px"
  editorial-panel:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.panel}"
---

# Design System: Al-Rawasi Engineering Consultants

## Overview

**Creative North Star: "From Drawing to Landmark"**

The interface presents engineering as a visible transformation: structural thinking becomes architecture, then a completed civic landmark. Graphite carries technical authority, white space gives the work room to breathe, and one authentic magenta accent marks decisions, progress, and action. Arabic is the primary visual rhythm; English is an equally complete LTR adaptation.

The composition is editorial and architectural: large imagery, asymmetric grids, exact alignment, fine rules, restrained labels, and compact closing sections. The homepage company story pairs a light technical field with a graphite statistics block, then moves into a dark image-and-story panel. Near the end, the trust showcase is an independent light-silver block with a near-white logo rail. A clear tonal transition then leads into the graphite contact/footer region, where a magenta project-start panel and compact two-column footer close the page.

**Key Characteristics:**

- Graphite, paper white, and rare editorial magenta.
- Sharp controls and fine construction lines, with rounded panels reserved for major grouped surfaces.
- Authentic project imagery and engineering detail take priority over decoration.
- Motion explains sequence, state, or transformation and always has a reduced-motion path.
- Logical CSS properties and mirrored directional arrows support Arabic RTL and English LTR.

## Colors

The palette is nearly monochrome; magenta is deliberately scarce so it retains the authority of the folded Al-Rawasi mark.

### Primary

- **Editorial Magenta:** Primary actions, active progress, selected states, and small numerical accents.
- **Editorial Magenta Hover:** Hover emphasis, required-field marks, and restrained interactive feedback on dark surfaces.
- **Focus Magenta:** The global high-visibility keyboard outline.

### Neutral

- **Graphite:** Header, hero, feature areas, contact/footer region, and primary text.
- **Paper:** Reading surfaces and inverse controls.
- **Soft Surface:** Quiet hover fills and secondary surfaces.
- **Section Surface:** The technical light field behind the homepage company story and the independent light-silver trust block.
- **Rail Surface:** The near-white track that contains the client-logo sequence.
- **Muted Text:** Supporting copy and metadata on light surfaces.
- **Light Rule / Dark Rule:** Structural separators chosen for light or graphite contexts.

**The One Accent Rule.** Use magenta for the one primary action or active signal in a local composition; do not spread it across decorative backgrounds, headings, or multiple competing controls.

**The Trust Independence Rule.** Keep the light-silver trust block visually separate from the graphite contact/footer region. The background change and the graphite spacing above the project-start panel must remain legible as a section transition.

## Typography

**Arabic Display Font:** Tajawal with a sans-serif fallback  
**Arabic Body Font:** Cairo with a sans-serif fallback  
**English Display and Body Font:** Outfit with a sans-serif fallback

Tajawal supplies firm, contemporary Arabic headlines while Cairo keeps longer Arabic copy readable. Outfit gives the English version a geometric engineering character and also handles numerals, counters, indices, and compact labels in both languages. The font packages are imported locally through `@fontsource` in `src/app/[lang]/layout.tsx`.

### Hierarchy

- **Hero Display:** Large two-line statement; Arabic is heavier, while English uses lighter weight and tighter tracking.
- **Section Headline:** Balanced, compact headings that usually occupy one or two lines.
- **Story Headline:** Oversized statements inside the company-story and project-start panels; keep their deliberate line breaks.
- **Body:** Comfortable reading copy with generous line height and a usual measure of 33–60 characters.
- **Label / Index:** Small Outfit text, frequently tabular or numbered (`01`, `02`, `03`), with increased tracking. Labels support hierarchy and never carry essential meaning by themselves.

**The Bilingual Rhythm Rule.** Preserve the content hierarchy between languages, but allow Arabic and English to use different font sizes, weights, and tracking when their scripts need it.

## Layout

The main shell is fluid with a maximum width of 1440px. Its inline gutter is 56px on wide screens, 32px below 1200px, and 20px below 600px. Desktop layouts use asymmetric fractions to create editorial tension; repeated three-column layouts are reserved for structured services or data.

The homepage company story is compact and layered. At desktop width, the light overview panel uses a 5:7 text-to-statistics split and the graphite story panel below uses a 7:5 image-to-copy split. Both collapse to one column by 800px. The technical grid texture disappears at 600px, panel corners reduce from 24px to 18px, and spacing tightens without removing content.

The independent light-silver trust block uses a text column and a wider contained near-white rail above 900px, then stacks into one column. The rail stays horizontal at every width; its active frame is 190px on desktop and 43vw on small screens. A 46px graphite transition precedes the project-start panel on desktop and contracts to 32px on phones. The project-start panel uses three columns on desktop, two by 900px, and one by 600px. The footer is a compact two-column brand/contact row with full-width navigation; it becomes a single column with a two-column link grid on phones.

Breakpoints are content-driven: 1200px tightens spacing, 999/1000px separates full desktop motion and navigation from tablet behavior, 900px restructures the closing sequence, 800px collapses the company story, and 600px handles phone layout.

## Elevation & Depth

Most surfaces are flat and separated by tonal contrast, image clipping, fine rules, or an inset border. Ambient shadows are limited to major visual containers: large image panels, stacked project cards, the contact form, and the active frame within the client rail. Dark-to-light transitions and the translucent caption over the company image provide depth without turning every block into a floating card.

**The Flat-by-Default Rule.** Use shadows only when a surface must separate from imagery or explain stacking; ordinary service, navigation, and information blocks remain flat.

## Shapes

The basic form language is rectangular and precise. Primary buttons, navigation indicators, image labels, hero controls, and technical rules stay sharp. A 24px radius identifies major grouped panels and stacked project cards; it contracts to 18px on phones. Fields use 14px corners, while pills are limited to small service tags. The circular seam handle and the project-start construction circle are isolated diagrammatic motifs, not a general component style.

**The Structural Corner Rule.** Round the container that groups a complete story or tool; keep the content and controls inside it crisp.

## Components

### Navigation

- The desktop header is graphite with a single bottom rule. Active and hovered links receive a thin magenta underline and pale-magenta text.
- The folded logo preserves its original proportions and transparent background. Do not redraw or recolor it.
- Below 1000px, replace desktop navigation with a full-height native dialog menu. Keep the language switch, visible close control, current-page semantics, and body scroll lock.

### Buttons and Links

- Primary buttons are sharp magenta rectangles, 60px high by default, with a restrained color transition and a 0.97 active scale.
- The project-start panel reverses the primary button to white on magenta.
- Text links use a directional Phosphor arrow that moves diagonally according to document direction. Preserve the RTL/LTR direction change.

### Engineering X-Ray Hero Reveal

- The hero layers the approved monochrome structural anatomy over the finished bronze-finned render. The cutaway must retain aligned camera geometry and show slabs, columns, cores, stairs, portal trusses, services, and a ghosted envelope.
- The initial seam is at 38%, driven by a semantic range input with a 62% default value. Pointer drag and keyboard range controls remain available at every motion preference.
- On desktop with motion enabled, vertical scrolling advances the reveal from 62% to 100% with a 0.6 scrub. Once the visitor manipulates the range, manual control wins.
- Hero copy enters with a 0.9-second `power3.out` rise and stagger. The image side softly masks into the graphite copy area on desktop; tablet and mobile stack the copy above the full-width art.
- Keep the three stage labels, seam handle, structural-anatomy caption, bilingual accessible name, and the decorative cutaway image hidden from assistive technology.

### Homepage Company Story

- The first panel pairs a paper introduction with three graphite statistics cells. Statistics use tabular Outfit numerals, small magenta indices, fine internal rules, and a thin magenta hover line.
- The second graphite panel pairs authentic architecture imagery with a compact narrative. Its translucent caption has a fine border and blur; the adjacent story block is divided by one directional rule.
- Preserve the compact light/graphite pairing and the numbered sequence. It is a single company story, not a set of independent cards.

### Trust Showcase and Client Rail

- The homepage trust section is a compact light-silver block with fine top and bottom rules. Its independent near-white 24px-radius rail holds a subtle white active frame. The centered logo sits inside a 190px vertical frame; neighboring logos fade and scale by distance. All client marks remain monochrome.
- Nine featured institutions appear initially. The “all institutions” control expands the same rail to all supplied logos and resets it to the first item. The expanded About-page variant remains a static full logo grid.
- Desktop scrolling maps section progress to the active logo. Pointer dragging follows the hand directly and snaps to the nearest logo on release. Arrow keys, Home, End, click, and focus all update the same active state; only the active item participates in the tab order.
- The counter is announced politely, and the magenta progress bar mirrors the selected index. On phones, hide the redundant drag hint while retaining the controls.

### Project Start Panel and Footer

- The project-start panel begins the graphite contact/footer region after the light trust block has clearly ended. It is a compact magenta block containing the `03` index, a two-line invitation, supporting copy, one white CTA, and a single fine circular construction motif.
- The footer uses a compact two-column brand/contact row, a full-width link row, and a fine-rule legal row. On phones it becomes one column while preserving the email, city list, navigation, and back-to-top link.

### Motion and Reduced Motion

- The shared expressive curve is `cubic-bezier(.22, 1, .36, 1)` / GSAP `power3.out`. UI feedback generally lasts 180–300ms; deliberate rail positioning lasts 550ms; project imagery scales over 850ms.
- Scroll reveals rise 26px over 0.85 seconds and run once. Image parallax travels from -4% to 4%. Featured project cards pin and stack only at 1000px and above with motion enabled.
- Under `prefers-reduced-motion: reduce`, smooth scrolling, transitions, CSS animation, reveal/parallax motion, desktop hero automation, project pinning, and client scroll automation stop. Manual controls and all content remain available.

## Do's and Don'ts

### Do:

- **Do** preserve Arabic RTL and English LTR with logical properties, mirrored directional motion, and equal content coverage.
- **Do** keep focus visible with the established 3px magenta outline and 5px offset, plus component-specific inset focus where clipping requires it.
- **Do** keep the hero range, logo rail, filters, dialogs, accordions, and forms usable with a keyboard and touch.
- **Do** use authentic supplied imagery and client logos from `assets/images/`; the shipping copies live in `public/images/` and source URLs/checksums are recorded in `assets/images/manifest.json`.
- **Do** preserve generated-image provenance: master hero images and prompts live in `assets/generated/`; shipping WebP files and metadata live in `public/images/generated/`; approved source comps and prompt sidecars live in `.impeccable/mocks/hero-structure/` and `.impeccable/mocks/trust-section/`.
- **Do** label architectural visualizations accurately and write meaningful alt text in both languages.

### Don't:

- **Don't** replace the approved Engineering X-Ray Cutaway with a generic wireframe, mismatched camera, or construction image that cannot align with the finished render.
- **Don't** turn the client rail into an auto-playing logo marquee or replace supplied marks with generated approximations.
- **Don't** add decorative gradients, pervasive glass effects, heavy shadows, or rounded cards to every section.
- **Don't** invent statistics, project facts, certifications, dates, or client relationships to fill a composition.
- **Don't** bake interface text into generated imagery or strip prompt/manifest provenance from shipping assets.
