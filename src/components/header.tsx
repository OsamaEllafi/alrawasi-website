'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useEffect, useState } from 'react';
import { List, X, ArrowUpLeft, ArrowUpRight } from '@phosphor-icons/react';
import { asset, Lang, nav, text } from '@/lib/content';

export function DirectionArrow({ lang, className = '' }: { lang: Lang; className?: string }) {
  const Icon = lang === 'ar' ? ArrowUpLeft : ArrowUpRight;
  return <Icon size={22} weight="regular" aria-hidden className={className} />;
}
export function Brand({ lang }: { lang: Lang }) {
  return <Link className="brand" href={`/${lang}/`} aria-label={text(lang, 'الرواسي — الرئيسية', 'Al-Rawasi — Home')}>
    <img src={asset('/images/logo.png')} width="66" height="66" alt="" />
    <span><strong>{text(lang, 'الرواسي', 'AL–RAWASI')}</strong><small>{text(lang, 'للاستشارات الهندسية', 'ENGINEERING CONSULTANTS')}</small></span>
  </Link>;
}
export function Header({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const other: Lang = lang === 'ar' ? 'en' : 'ar';
  const languagePath = pathname.replace(/^\/(ar|en)(?=\/|$)/, `/${other}`);
  const close = () => { dialog.current?.close(); setOpen(false); };
  useEffect(() => { close(); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = old; };
  }, [open]);
  const active = (path: string) => path ? pathname.includes(`/${path}`) : /^\/(ar|en)\/?$/.test(pathname);
  return <>
    <a className="skip-link" href="#main">{text(lang, 'تخطّ إلى المحتوى', 'Skip to content')}</a>
    <header className="site-header">
      <div className="header-inner shell">
        <Brand lang={lang} />
        <nav className="desktop-nav" aria-label={text(lang, 'التنقل الرئيسي', 'Main navigation')}>
          {nav.map(n => <Link key={n.path} href={`/${lang}/${n.path ? n.path + '/' : ''}`} aria-current={active(n.path) ? 'page' : undefined}>{n[lang]}</Link>)}
        </nav>
        <div className="header-actions">
          <Link className="language-link" href={languagePath} lang={other} hrefLang={other} aria-label={text(lang, 'Switch to English', 'التبديل إلى العربية')}>{other === 'en' ? 'EN' : 'عربي'}</Link>
          <Link className="button header-contact" href={`/${lang}/contact/`}>{text(lang, 'تواصل معنا', 'Contact us')}</Link>
          <button className="icon-button menu-button" aria-label={text(lang, 'فتح القائمة', 'Open menu')} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => { dialog.current?.showModal(); setOpen(true); }} suppressHydrationWarning><List size={26} /></button>
        </div>
      </div>
    </header>
    <dialog ref={dialog} className="mobile-menu" id="mobile-navigation" onClose={() => setOpen(false)} aria-label={text(lang, 'القائمة الرئيسية', 'Main menu')}>
      <div className="mobile-menu-top"><Brand lang={lang} /><button className="icon-button" onClick={close} aria-label={text(lang, 'إغلاق القائمة', 'Close menu')} suppressHydrationWarning><X size={26} /></button></div>
      <nav>{[...nav, { path: 'contact', ar: 'تواصل معنا', en: 'Contact us' }].map(n => <Link key={n.path} onClick={close} href={`/${lang}/${n.path ? n.path + '/' : ''}`}>{n[lang]}<DirectionArrow lang={lang} /></Link>)}</nav>
      <span className="menu-location">{text(lang, 'البيضاء · بنغازي · طرابلس', 'Al-Bayda · Benghazi · Tripoli')}</span>
    </dialog>
  </>;
}
