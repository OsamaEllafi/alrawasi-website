# Alrawasi — Brand Identity Reference

Prepared on 10 September 2026 from the ten supplied company-page captures, the live Arabic/English site, its stylesheet, and downloaded images. No standalone brand manual, editable logo master, or formal typography specification was supplied. This document separates **observed identity** from **recommendations for the new website**.

## Brand foundation

| Element | Evidence-based identity |
| --- | --- |
| English display name | Al-Rawasi Engineering Consultants |
| Arabic display name | الرواسي للاستشارات الهندسية |
| Longer Arabic company name | شركة الرواسي الليبية للاستشارات الهندسية |
| Main Arabic headline | تميز هندسي لمستقبل حديث |
| Main English headline | Engineering Excellence for a Modern Future |
| Positioning | A Libyan engineering consultancy combining local expertise, modern engineering practices, and architectural ambition |
| Recurring themes | Quality, precision, trust, innovation, sustainability, collaboration, and Libya's religious/historical identity |
| Geographic anchor | Al-Bayda, Libya; the site also lists Benghazi and Tripoli branches |

Sources: supplied Arabic/English Home, About, and Services captures; [Arabic Home](https://alrwasi.ly/ar/), [English Home](https://alrwasi.ly/en/), and [About](https://alrwasi.ly/ar/about/). The positioning sentence is a synthesis. The source headline is established website messaging, not evidence of a registered slogan.

Recommended personality for future copy and design: **precise, dependable, culturally grounded, and forward-looking**. These are inferred from the existing content, not formal brand attributes supplied by the company.

## Logo

The recovered original is `assets/images/logo.png`: a **400 × 400 transparent PNG**. It is a geometric, angular symbol resembling a folded ribbon or stylized Latin “R”, formed by a tall vertical stem, sloped upper section, and an inward fold. That interpretation describes the appearance; no official explanation of its symbolism was found.

The mark contains saturated magenta and rose faces, including a lighter inner fold. The source image contains no company-name text. The existing site composes the symbol beside a separate text wordmark and engineering-consultancy descriptor. There is no supplied combined vector lockup, monochrome version, or reverse/white logo.

### Sampled logo colors

These values were measured from the most frequent fully opaque pixels in the PNG. They are **asset samples**, not an official print or digital specification.

| Visible region | Sampled HEX | RGB |
| --- | --- | --- |
| Main magenta face | `#B11A62` | 177, 26, 98 |
| Secondary rose face | `#B9256B` | 185, 37, 107 |
| Light folded face | `#C983A5` | 201, 131, 165 |

The logo's main magenta is different from the live website's primary interface color. Preserve that distinction when implementing the existing identity.

### Recommended handling

- Preserve the original proportions, fold geometry, colors, and transparency. Do not stretch, crop, mirror, or redraw it casually.
- Use `object-fit: contain` for the logo and maintain space around the visible mark.
- As a provisional layout rule, leave clear space of at least one quarter of the rendered symbol width; this is a recommendation, not an official clearance standard.
- Test legibility at the actual header and mobile sizes. The current header provides a roughly 56–64 px image box; this is an observed implementation detail, not an approved minimum size.
- Obtain an SVG or editable master for large-format use. Do not describe the current raster image as a vector asset.
- Render the company name and descriptor as accessible text beside the symbol unless an approved combined lockup is supplied.

## Existing website colors

The following colors were read from the live stylesheet's light-theme variables and primary-color utility rules. HEX conversions from HSL are rounded to the nearest 8-bit RGB value. These are **observed website tokens**, not a supplied corporate palette.

| Role | Exact CSS source / value | Approximate HEX | Existing use |
| --- | --- | --- | --- |
| Primary | `--primary: 326 67% 37%` | `#9E1F67` | Main buttons, active navigation, brand emphasis |
| Primary dark | Utility color `rgb(122 24 80)` | `#7A1850` | Gradients and hover treatments |
| Primary light | Utility color `rgb(184 45 122)` | `#B82D7A` | Hover and gradient treatments |
| Accent | `--accent: 38 44% 61%` | `#C7A770` | Muted gold details and secondary emphasis |
| Background / cards | `0 0% 100%` | `#FFFFFF` | Main canvas and surfaces |
| Foreground | `0 0% 10%` | `#1A1A1A` | Primary text |
| Secondary / muted surface | `220 14% 96%` | `#F3F4F6` | Subtle surface separation |
| Secondary foreground | `0 0% 27%` | `#454545` | Secondary text |
| Muted foreground | `215 16% 42%` | `#5A687C` | Supporting text |
| Border / input | `220 13% 90%` | `#E2E4E9` | Outlines and separators |

Stylesheet evidence: [393333176102043e.css](https://alrwasi.ly/_next/static/css/393333176102043e.css), retrieved 10 September 2026. Hashed stylesheet URLs can change with deployment.

The stylesheet contains dark-theme definitions, but the reviewed page configuration forces **light mode**. A dark theme should not be described as the current default identity. Gold appears in the website interface; it is not a visible color in the logo asset.

Recommended application: use white and restrained neutral surfaces as the base, charcoal for text, magenta for key actions and emphasis, and gold sparingly. Validate text and control contrast at implementation time, especially for gold on light surfaces. Avoid deriving the company palette from client or partner logos.

## Typography and bilingual presentation

The live stylesheet bundles the following families; each locale's page markup activates its corresponding font variables. This establishes the current implementation's intended font pairing, not a formal typographic brand standard.

| Language | Heading family | Body family | Direction |
| --- | --- | --- | --- |
| Arabic | Tajawal | Cairo | RTL |
| English | Outfit | Inter | LTR |

Evidence: CSS font-face and font-variable declarations; Arabic and English `body` classes; `lang` and `dir` on the live HTML. Tajawal files include weights 400, 500, and 700. Cairo, Inter, and Outfit are bundled as variable fonts. No font files were downloaded into the image directory.

Recommended implementation principles:

- Keep Arabic as a complete, carefully typeset experience, with matching English routes and equivalent content.
- Define valid locale-specific font families explicitly rather than blindly copying the old site's CSS variable expressions.
- Use Arabic shaping correctly; do not apply Latin-style tracking or split Arabic words into independently positioned letters.
- Preserve RTL layout while displaying email addresses and Latin identifiers in an appropriate LTR text span.
- Retain spaces in headings. Captured text such as `شركاؤكفيبناءالمستقبل` and `EngineeringExcellenceforaModernFuture` comes from animated/duplicated text extraction and is not intended wording.
- The repeated homepage title in the capture corresponds to duplicate accessible/animated markup. Use one coherent page heading in the new content model.

## Voice and messaging

Existing copy combines aspirational architectural language with service descriptions and themes of precision, quality, and heritage. The director's statement introduces civic purpose and pride in Libya's religious and historical character.

Recommended tone: professional, assured, specific, and understandable to project owners. Describe the actual service, role, and deliverable. Keep promotional claims proportionate to supporting records.

| Communication need | Recommended treatment |
| --- | --- |
| Company introduction | Establish engineering consultancy, Al-Bayda headquarters, and scope of services clearly |
| Services | Explain activities and client outcomes using the nine source service categories |
| Project descriptions | State verified project name, location, company role, stage, and image type |
| Heritage | Refer to local architectural identity where the project supports that description |
| Trust | Use named work, accurate client relationships, and validated documentation |
| Calls to action | Retain direct labels such as “مشاريعنا / Our Projects”, “تواصل معنا / Contact Us”, and “اطلب استشارة هندسية / Request Engineering Consultation” |

The statements “25+ years”, “50+ projects”, “100% satisfaction”, and certification claims require the distinctions recorded in `company profile.md`. Do not convert the director's career length into company age or use unsupported superlatives as factual differentiators.

## Imagery and visual character

The recovered imagery emphasizes architectural exterior renderings, mosques and monumental facades, commercial and banking buildings, ornamental geometry, and both daylight and evening views. Some images contain baked-in purple/magenta grading. The visual theme supports engineering precision and architectural heritage; the imagery does not independently establish construction completion.

| Asset group | Location | Notes for use |
| --- | --- | --- |
| Company mark | `assets/images/logo.png` | Transparent 400 × 400 PNG |
| Home hero | `assets/images/hero-bg.jpg` | Architectural facade close-up, 1024 × 575; source alt text “Engineering Construction Site” is too generic |
| About hero | `assets/images/about-hero.png` | Architectural rendering, 1024 × 575 |
| Services imagery | `assets/images/services-hero.jpg`, `assets/images/services-bg.jpg` | Architectural rendering and stylized engineering illustration |
| Project header/details | `assets/images/projects-hero.jpg`, `assets/images/projects-detail-view.jpg` | The project hero is portrait-oriented, 724 × 1024; avoid assuming every hero is landscape |
| Named projects | `bilal-mosque.jpg`, `shahat-mall.jpg`, `central-bank.jpg`, `libyana-center.jpg`, `cbl-shahat.jpg`, `ncb-faidiya.jpg`, `othman-mosque.jpg`, `othman-mosque-1.jpg` under `assets/images/` | Keep project associations from the source; several are clearly renders |
| General project gallery | `assets/images/gallery-project-1.jpg` through `gallery-project-14.jpg`, with number 7 using `.png` | Names/descriptions largely absent; filenames are not verified project identities |
| Director-section image | `assets/images/director.jpg` | Generic engineering scene; not a verified portrait |
| Client institutions | `assets/images/clients/` | 18 logos; varied dimensions and backgrounds |
| Supporting companies | `assets/images/partners/` | Six logos; `saobracaj.jpg` displays “EPI” and needs identity clarification |
| Certificate scans | `assets/images/certificates/` | Three 682 × 1024 JPGs; see the certificate-number issues in the company profile |

Recommendations: use project-specific imagery where the association is supported, preserve architectural proportions, and choose deliberate crops for each placement. Keep institution logos contained in consistent display areas without distortion. Write descriptive alternative text instead of retaining “Project Image”. Do not present renderings as completed-site photographs or a generic helmeted person as the manager.

The current site uses a fixed translucent header, large image-led hero sections, bold headings, pale overlays, magenta actions, occasional gold accents, rounded controls, soft shadows, gradients, thin geometric rules, and logo carousels. These are observed presentation choices in the markup and CSS. They can be refined during the redesign; they are not immutable brand requirements.

## Asset inventory and gaps

**57 original images** were downloaded and validated, including every one of the **53 unique URLs in the supplied captures**. Originals were retained without resizing or recompression. The source directory hierarchy was preserved for client, partner, and certificate files. Repeated links share one downloaded original.

The extra decorative reference `https://alrwasi.ly/images/grid-pattern.svg` returns **404**. It is logged as missing, and no replacement was fabricated. It can be recreated as a new design element during implementation if needed.

`assets/images/manifest.json` provides the full inventory and provenance, including dimensions, formats, byte sizes, checksums, source pages, and download errors. `scripts/download_company_images.py` reproduces the collection. The assets total approximately 4.65 MB.

Outstanding identity material: an approved English/legal naming convention, vector logo master, formal palette/typography guidelines, named leadership and real portrait, authoritative project metadata, and corrected certification/partner documentation. These gaps do not prevent using this reference for initial website planning.
