'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function PageMotion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const path = usePathname();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el => {
          gsap.from(el, { y: 26, opacity: 0.2, duration: 0.85, ease: 'power3.out', clearProps: 'all', scrollTrigger: { trigger: el, start: 'top 93%', once: true } });
        });
        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach(el => {
          gsap.fromTo(el, { yPercent: -4 }, { yPercent: 4, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
        });
        gsap.utils.toArray<HTMLElement>('.process-steps li').forEach((el, i) => {
          gsap.from(el, { y: 15, opacity: 0.25, duration: 0.65, delay: i * 0.12, ease: 'power3.out', clearProps: 'all', scrollTrigger: { trigger: el, start: 'top 95%', once: true } });
        });
      }, root);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, [path]);
  return <div ref={root}>{children}</div>;
}
