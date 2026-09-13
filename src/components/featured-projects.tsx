'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { asset, Lang, Project, projects, categories, text } from '@/lib/content';
import { DirectionArrow } from './header';

const FEATURED = projects.slice(0, 4);

function StackCard({ project, index, lang }: { project: Project; index: number; lang: Lang }) {
  const category = categories.find(c => c.id === project.category);
  return <article className="project-stack-card">
    <div className="project-stack-body">
      <span className="project-stack-index">{String(index + 1).padStart(2, '0')}</span>
      <p className="project-stack-meta">{category?.[lang]}<span aria-hidden="true"> · </span>{project.location[lang]}</p>
      <h3>{project.title[lang]}</h3>
      <p className="project-stack-desc">{project.description[lang]}</p>
      <Link className="text-link project-stack-cta" href={`/${lang}/projects/${project.slug}/`}>
        {text(lang, 'عرض دراسة الحالة', 'View case study')}
        <DirectionArrow lang={lang} />
      </Link>
    </div>
    <div className="project-stack-media">
      <img src={asset(`/images/${project.image}`)} alt={text(lang, `تصور معماري: ${project.title.ar}`, `Architectural rendering: ${project.title.en}`)} width="900" height="640" loading="lazy" />
      <span className="project-stack-dots" aria-hidden="true"><i /><i /><i /></span>
    </div>
  </article>;
}

export function FeaturedProjects({ lang }: { lang: Lang }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const cards = cardRefs.current.filter((el): el is HTMLDivElement => !!el);
    const n = cards.length;

    const ctx = gsap.context(() => {
      gsap.matchMedia().add('(min-width: 1000px) and (prefers-reduced-motion: no-preference)', () => {
        const segments = n - 1;
        // Each card holds fully in focus for most of its segment; only the middle
        // band actually transitions, so readers never have to hunt for a precise
        // scroll position to get clean, readable text.
        const HOLD = 0.32;
        const shapedProgress = (progress: number) => {
          const raw = progress * segments;
          const segment = Math.min(Math.floor(raw), segments - 1);
          const localT = raw - segment;
          let eased: number;
          if (localT < HOLD) eased = 0;
          else if (localT > 1 - HOLD) eased = 1;
          else eased = (localT - HOLD) / (1 - HOLD * 2);
          const smooth = eased * eased * (3 - 2 * eased);
          return Math.min(segment + smooth, segments);
        };
        const applyStack = (progress: number) => {
          const activeFloat = shapedProgress(progress);
          cards.forEach((card, i) => {
            const delta = i - activeFloat;
            if (delta >= 0) {
              const layer = Math.min(delta, 3);
              gsap.set(card, { y: layer * 16, scale: 1 - layer * 0.045, opacity: layer < 2.4 ? 1 : Math.max(0, 1 - (layer - 2.4) * 2.2), zIndex: n - i, pointerEvents: delta < 0.5 ? 'auto' : 'none' });
            } else {
              const exit = Math.max(delta, -1);
              gsap.set(card, { y: exit * 90, scale: 1, opacity: 1 + exit, zIndex: n + 10, pointerEvents: 'none' });
            }
          });
        };
        const st = ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top+=32',
          end: () => `+=${segments * window.innerHeight * 0.85}`,
          pin: true,
          scrub: 0.5,
          snap: { snapTo: value => Math.round(value * segments) / segments, duration: { min: 0.15, max: 0.4 }, ease: 'power1.inOut' },
          onUpdate: self => applyStack(self.progress),
        });
        applyStack(st.progress);
        return () => st.kill();
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return <section className="featured-section">
    <div className="shell">
      <div className="section-heading row-heading" data-reveal>
        <div>
          <h2>{text(lang, 'عمارة تحمل رؤيتنا', 'Architecture with intention')}</h2>
          <p>{text(lang, 'مشاريع تتنوع في وظائفها، وتلتقي في العناية بتفاصيلها.', 'Different purposes. The same attention to detail.')}</p>
        </div>
        <Link href={`/${lang}/projects/`} className="text-link">{text(lang, 'جميع المشاريع', 'All projects')}<DirectionArrow lang={lang} /></Link>
      </div>
      <div className="project-stack" ref={containerRef}>
        {FEATURED.map((project, index) => <div key={project.slug} className="project-stack-slot" ref={node => { cardRefs.current[index] = node; }}>
          <StackCard project={project} index={index} lang={lang} />
        </div>)}
      </div>
    </div>
  </section>;
}
