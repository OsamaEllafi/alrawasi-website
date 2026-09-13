import Link from 'next/link';
import { asset, Lang, services, text } from '@/lib/content';
import { DirectionArrow } from './header';

export function Services({ lang, full = false }: { lang: Lang; full?: boolean }) {
  const list = full ? services : services.slice(0, 3);
  return <section className={`services-section ${full ? 'services-full' : ''}`}>
    <div className="shell">
      <div className="services-banner">
        <img src={asset('/images/services-hero.jpg')} alt={text(lang, 'تفاصيل معمارية في أحد تصاميم الرواسي', 'Architectural detail from the Al-Rawasi portfolio')} width="1600" height="600" loading="lazy" />
        <span className="image-caption">{text(lang, 'التوازن بين الوظيفة والجمال', 'The balance of function and form')}</span>
      </div>
      <div className="section-heading row-heading" data-reveal>
        <div><h2>{text(lang, 'رؤية متكاملة.\nحلول مدروسة.', 'A complete vision.\nConsidered solutions.')}</h2><p>{text(lang, 'خبرات متعددة، تعمل معاً من أجل مشروعك.', 'Different disciplines, working together for your project.')}</p></div>
        {!full && <Link href={`/${lang}/services/`} className="text-link">{text(lang, 'جميع خدماتنا', 'All services')}<DirectionArrow lang={lang} /></Link>}
      </div>
      <div className="service-grid">{list.map((s, i) => <article className="service-card" key={s.en}>
        <span className="service-card-index">{String(i + 1).padStart(2, '0')}</span>
        <h3>{s[lang]}</h3>
        <p>{text(lang, s.descAr, s.descEn)}</p>
        <ul className="service-card-tags">{(lang === 'ar' ? s.itemsAr : s.itemsEn).map(item => <li key={item}>{item}</li>)}</ul>
        <Link className="text-link" href={`/${lang}/contact/?service=${encodeURIComponent(s[lang])}`}>{text(lang, 'تواصل معنا', 'Contact us')}<DirectionArrow lang={lang} /></Link>
      </article>)}</div>
    </div>
  </section>;
}
