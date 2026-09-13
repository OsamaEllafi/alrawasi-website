import Link from 'next/link';
import { asset, Lang, clients, offices, projects, text } from '@/lib/content';
import { DirectionArrow } from './header';
import { FeaturedProjects } from './featured-projects';
import { Services } from './services';
import { Clients } from './clients';
import { ContactBand } from './footer';
export function HomeContent({ lang }: { lang: Lang }) {
  const stats: [string, string, string][] = [
    [`${projects.length}+`, 'نماذج ومشاريع موثقة', 'Documented projects & concepts'],
    [`${clients.length}+`, 'مؤسسة وشريك', 'Institutions & partners'],
    [`${offices.length}`, 'مدن نعمل بها', 'Cities we work in'],
  ];
  return <>
    <FeaturedProjects lang={lang} />
    <Services lang={lang} />
    <section className="about-section">
      <div className="about-overview shell">
        <div className="about-intro" data-reveal>
          <h2>{text(lang, 'من البيضاء،\nنصمم للغد.', 'From Al-Bayda,\ndesigning tomorrow.')}</h2>
          <p>{text(lang, 'نحن الرواسي للاستشارات الهندسية. نجمع الخبرة المحلية والرؤية المعمارية لنقدم حلولاً تراعي الإنسان والمكان.', 'We are Al-Rawasi Engineering Consultants. We bring local expertise and architectural vision together in solutions that consider people and place.')}</p>
        </div>
        <div className="about-stats" data-reveal>{stats.map(([n, ar, en], index) => <div key={en}><span className="about-stat-index" aria-hidden>{String(index + 1).padStart(2, '0')}</span><strong>{n}</strong><span>{text(lang, ar, en)}</span></div>)}</div>
      </div>
      <div className="about-story shell">
        <figure className="about-image">
          <img data-parallax src={asset('/images/about-hero.png')} alt={text(lang, 'تصميم معماري يجمع الزخارف الإسلامية والتكوين الحديث', 'An architectural design combining Islamic ornament and contemporary form')} width="1024" height="575" loading="lazy" />
          <figcaption><span aria-hidden>01</span>{text(lang, 'هوية المكان، في كل تفصيل.', 'The identity of a place, in every detail.')}</figcaption>
        </figure>
        <div className="about-outro" data-reveal>
          <span className="about-story-index" aria-hidden>02</span>
          <h3>{text(lang, 'الهندسة تبدأ\nبالإنصات.', 'Engineering begins\nwith listening.')}</h3>
          <p>{text(lang, 'نؤمن أن الهندسة الجيدة تبدأ بالاستماع، وتنمو بالتعاون، وتظهر قيمتها في التفاصيل التي تصنع فرقاً.', 'We believe good engineering begins with listening, develops through collaboration, and shows its value in the details that make a difference.')}</p>
          <Link className="text-link" href={`/${lang}/about/`}>{text(lang, 'تعرّف على الرواسي', 'Meet Al-Rawasi')}<DirectionArrow lang={lang} /></Link>
        </div>
      </div>
    </section>
    <Clients lang={lang} /><ContactBand lang={lang} />
  </>;
}
