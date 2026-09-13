'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowsLeftRight, ArrowDown } from '@phosphor-icons/react';
import { asset, Lang, text } from '@/lib/content';
import { DirectionArrow } from './header';

export function Hero({ lang }: { lang: Lang }) {
  const root = useRef<HTMLElement>(null);
  const drawing = useRef<HTMLImageElement>(null);
  const seam = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const manual = useRef(false);
  const dragging = useRef(false);
  const apply = (value: number) => {
    const left = 100 - value;
    if (drawing.current) drawing.current.style.clipPath = `inset(0 ${value}% 0 0)`;
    if (seam.current) seam.current.style.left = `${left}%`;
    if (input.current) input.current.value = String(value);
  };
  const applyFromClientX = (clientX: number) => {
    const rect = stage.current?.getBoundingClientRect();
    if (!rect) return;
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    manual.current = true;
    apply(Math.round((1 - ratio) * 100));
  };
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.from('.hero-copy > *', { opacity: 0.4, y: 18, duration: 0.9, stagger: 0.1, ease: 'power3.out', clearProps: 'all' });
      }, root);
      return () => ctx.revert();
    });
    mm.add('(min-width: 1000px) and (prefers-reduced-motion: no-preference)', () => {
      const progress = { value: 62 };
      const tween = gsap.to(progress, { value: 100, ease: 'none', onUpdate: () => { if (!manual.current) apply(progress.value); }, scrollTrigger: { trigger: root.current, start: 'top 100px', end: 'bottom 180px', scrub: 0.6, invalidateOnRefresh: true } });
      return () => { tween.scrollTrigger?.kill(); tween.kill(); if (!manual.current) apply(62); };
    });
    return () => mm.revert();
  }, []);
  return <section className="hero-section" ref={root} aria-labelledby="hero-heading">
    <div className="hero-art" dir="ltr">
      <div className="drawing-stages" aria-hidden><span>{text(lang, 'من الفكرة', 'The idea')}</span><span>{text(lang, 'إلى النموذج', 'The model')}</span><span>{text(lang, 'إلى الواقع', 'The landmark')}</span></div>
      <div
        className="building-comparison"
        ref={stage}
        onPointerDown={e => { dragging.current = true; e.currentTarget.setPointerCapture(e.pointerId); applyFromClientX(e.clientX); }}
        onPointerMove={e => { if (dragging.current) applyFromClientX(e.clientX); }}
        onPointerUp={() => { dragging.current = false; }}
        onPointerCancel={() => { dragging.current = false; }}
      >
        <img className="building-layer" src={asset('/images/generated/hero-render.webp')} width="1536" height="1024" alt={text(lang, 'تصور معماري يتحول من تشريح إنشائي داخلي إلى مبنى بواجهات معدنية مكتمل', 'Architectural concept transitioning from an internal structural cutaway into a finished bronze-finned building')} fetchPriority="high" />
        <img ref={drawing} className="building-layer drawing-layer" src={asset('/images/generated/hero-drawing.webp')} width="1536" height="1024" alt="" aria-hidden style={{ clipPath: 'inset(0 62% 0 0)' }} />
        <div ref={seam} className="comparison-seam" style={{ left: '38%' }} aria-hidden><span><ArrowsLeftRight size={16} /></span></div>
        <input ref={input} className="comparison-input" type="range" min="0" max="100" defaultValue="62" aria-label={text(lang, 'اسحب لإظهار التصور المعماري', 'Drag to reveal the architectural rendering')} onInput={e => { manual.current = true; apply(Number(e.currentTarget.value)); }} />
      </div>
      <div className="art-caption"><span>{text(lang, 'تشريح إنشائي', 'Structural anatomy')}</span><span><ArrowsLeftRight size={17} />{text(lang, 'اسحب لاستكشاف التفاصيل', 'Drag to explore')}</span></div>
    </div>
    <div className="hero-copy">
      <h1 id="hero-heading">{text(lang, 'تميز هندسي', 'Engineering vision.')}<br />{text(lang, 'لمستقبل حديث', 'Made tangible.')}</h1>
      <p>{text(lang, 'خبرة محلية ورؤية هندسية تصنع مستقبل ليبيا.', 'Local expertise and engineering vision, shaping Libya’s future.')}</p>
      <div className="hero-actions"><Link href={`/${lang}/projects/`} className="button">{text(lang, 'مشاريعنا', 'Our projects')}<DirectionArrow lang={lang} /></Link><Link href={`/${lang}/contact/`} className="text-link">{text(lang, 'تواصل معنا', 'Contact us')}<DirectionArrow lang={lang} /></Link></div>
    </div>
    <a className="hero-scroll" href="#process"><ArrowDown size={17} /><span>{text(lang, 'اكتشف نهجنا', 'Discover our approach')}</span></a>
  </section>;
}
