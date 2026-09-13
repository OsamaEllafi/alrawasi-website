import Link from 'next/link';
import { Brand, DirectionArrow } from './header';
import { Lang, nav, text } from '@/lib/content';

export function ContactBand({ lang }: { lang: Lang }) {
  return <section className="contact-band"><div className="shell">
    <div className="contact-band-inner">
      <span className="contact-band-index" aria-hidden>03</span>
      <div>
        <h2>{text(lang, 'لنبنِ الخطوة\nالتالية معاً.', 'Let’s build the\nnext step together.')}</h2>
        <p>{text(lang, 'شاركنا فكرة مشروعك، وسنساعدك في تحويلها إلى مسار واضح.', 'Tell us about your project and we will help shape a clear path forward.')}</p>
      </div>
      <Link className="button" href={`/${lang}/contact/`}>{text(lang, 'ابدأ الحديث', 'Start a conversation')}<DirectionArrow lang={lang} /></Link>
    </div>
  </div></section>;
}
export function Footer({ lang }: { lang: Lang }) {
  return <footer className="site-footer"><div className="shell">
    <div className="footer-main">
      <div className="footer-brand"><Brand lang={lang} /><p>{text(lang, 'خبرة محلية، ورؤية هندسية تتطلع إلى المستقبل.', 'Local expertise. Engineering vision for what comes next.')}</p></div>
      <div className="footer-contact"><a href="mailto:alrawasialiby@gmail.com" dir="ltr">alrawasialiby@gmail.com</a><span>{text(lang, 'البيضاء · بنغازي · طرابلس', 'Al-Bayda · Benghazi · Tripoli')}</span></div>
      <nav aria-label={text(lang, 'روابط تذييل الصفحة', 'Footer navigation')}>{nav.filter(n => n.path).map(n => <Link key={n.path} href={`/${lang}/${n.path}/`}>{n[lang]}</Link>)}<Link href={`/${lang}/contact/`}>{text(lang, 'تواصل معنا', 'Contact us')}</Link></nav>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} {text(lang, 'الرواسي للاستشارات الهندسية. جميع الحقوق محفوظة.', 'Al-Rawasi Engineering Consultants. All rights reserved.')}</span><a href="#main">{text(lang, 'العودة إلى الأعلى', 'Back to top')}<DirectionArrow lang={lang} /></a></div>
  </div></footer>;
}
