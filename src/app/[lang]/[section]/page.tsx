import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { asset, isLang, text, Lang } from '@/lib/content';
import { ProjectGallery } from '@/components/project-gallery';
import { Services } from '@/components/services';
import { ContactBand } from '@/components/footer';
import { DirectionArrow } from '@/components/header';
import { Clients } from '@/components/clients';
import { ContactForm, OfficeLocations } from '@/components/contact';
import { PageMotion } from '@/components/motion';

const sections = ['about', 'services', 'projects', 'contact'];
export const dynamicParams = false;
export function generateStaticParams() { return sections.map(section => ({ section })); }
export async function generateMetadata({ params }: { params: Promise<{ lang: string; section: string }> }): Promise<Metadata> {
  const { lang, section } = await params;
  const names: Record<string, string[]> = { about: ['من نحن', 'About'], services: ['خدماتنا الهندسية', 'Engineering services'], projects: ['مشاريعنا', 'Our projects'], contact: ['تواصل معنا', 'Contact us'] };
  return { title: names[section]?.[lang === 'ar' ? 0 : 1], alternates: { canonical: `/${lang}/${section}/`, languages: { ar: `/ar/${section}/`, en: `/en/${section}/` } } };
}
function PageIntro({ lang, titleAr, titleEn, descAr, descEn, children }: { lang: Lang; titleAr: string; titleEn: string; descAr: string; descEn: string; children?: React.ReactNode }) {
  return <section className="page-intro shell"><div><h1>{text(lang, titleAr, titleEn)}</h1><p>{text(lang, descAr, descEn)}</p></div>{children || <span className="intro-mark" aria-hidden><img src={asset('/images/logo.png')} alt="" width="110" height="110" /></span>}</section>;
}
function About({ lang }: { lang: Lang }) {
  const values = [['النزاهة', 'Integrity', 'وضوح في التعامل، ومسؤولية في القرار.', 'Clarity in our dealings. Responsibility in our decisions.'], ['التميز', 'Excellence', 'عناية بالجودة في كل تفصيل.', 'Attention to quality in every detail.'], ['الابتكار', 'Innovation', 'حلول جديدة لتحديات متجددة.', 'Fresh thinking for evolving challenges.'], ['العمل الجماعي', 'Teamwork', 'خبرات تتكامل، ورؤية تجمعنا.', 'Complementary expertise and a shared vision.'], ['الالتزام', 'Commitment', 'مسؤولية تجاه وعودنا ومشاريعنا.', 'Responsibility for our promises and our projects.'], ['الاستدامة', 'Sustainability', 'تصميم يراعي المكان ومستقبله.', 'Design that considers a place and its future.']];
  return <><PageIntro lang={lang} titleAr={'هندسة تنتمي للمكان.\nورؤية تتطلع للغد.'} titleEn={'Rooted in place.\nLooking to tomorrow.'} descAr="من البيضاء، نعمل بشغف لنساهم في تشكيل بيئات عمرانية تخدم الإنسان وتحترم هوية ليبيا." descEn="From Al-Bayda, we help shape built environments that serve people and respect Libya’s identity." />
    <div className="about-panorama"><img src={asset('/images/projects-detail-view.jpg')} alt={text(lang, 'تصور معماري لأحد تصاميم الرواسي', 'An architectural rendering from Al-Rawasi’s portfolio')} width="1024" height="575" fetchPriority="high" /><span>{text(lang, 'الهوية المعمارية، بلغة معاصرة', 'Architectural identity, expressed today')}</span></div>
    <section className="story-section shell"><h2 data-reveal>{text(lang, 'الفكرة التي\nتجمعنا', 'The idea that\nbrings us together')}</h2><div><p className="lead">{text(lang, 'الهندسة ليست مجرد مخططات. إنها فهم للمكان، واستجابة لاحتياجات الناس، ورؤية لما يمكن أن يكون.', 'Engineering begins beyond the drawing. It is an understanding of place, a response to people’s needs, and a vision of what could be.')}</p><p>{text(lang, 'تأسست الرواسي انطلاقاً من طموح للمساهمة في تطوير الهندسة والعمران في مدينتنا وبلادنا. نجمع فريقاً من المتخصصين، ونعمل عبر تعاون فني مع مؤسسات محلية وشركات أجنبية.', 'Al-Rawasi was founded with an ambition to contribute to engineering and urban development in our city and country. We bring specialists together and work through technical collaboration with local institutions and international companies.')}</p><p>{text(lang, 'يمتد نطاق عملنا من الدراسات والتصميم إلى إدارة المشاريع والإشراف، مع الاهتمام بالكفاءة الاقتصادية والهوية المعمارية والاعتبارات البيئية.', 'Our work spans studies and design through project management and supervision, with attention to economic efficiency, architectural identity, and environmental considerations.')}</p></div></section>
    <section className="vision-section"><div className="shell vision-grid"><div><h2>{text(lang, 'رؤيتنا', 'Our vision')}</h2><p>{text(lang, 'الارتقاء بمعايير الجودة والأمان والخدمة في المشاريع الهندسية العامة والخاصة، من خلال تصاميم مميزة وإشراف مدروس على التنفيذ.', 'To raise the standards of quality, safety, and service in public and private engineering projects through distinctive design and considered supervision.')}</p></div><div><h2>{text(lang, 'مهمتنا', 'Our mission')}</h2><p>{text(lang, 'توظيف التقنيات الحديثة والخبرات المتنوعة لتقديم خدمات هندسية دقيقة ومبتكرة، تجمع الجودة والكفاءة الاقتصادية والتميز المعماري.', 'To apply modern technology and diverse expertise to precise, innovative engineering services that combine quality, economic efficiency, and architectural excellence.')}</p></div></div></section>
    <section className="values-section shell"><div className="section-heading"><h2>{text(lang, 'مبادئ تقود عملنا', 'Principles behind our work')}</h2></div><div className="values-grid">{values.map(v => <div key={v[1]}><h3>{text(lang, v[0], v[1])}</h3><p>{text(lang, v[2], v[3])}</p></div>)}</div></section><Clients lang={lang} expanded /><ContactBand lang={lang} /></>;
}
export default async function SectionPage({ params }: { params: Promise<{ lang: string; section: string }> }) {
  const { lang, section } = await params;
  if (!isLang(lang) || !sections.includes(section)) notFound();
  return <main id="main"><PageMotion>
    {section === 'projects' && <><PageIntro lang={lang} titleAr={'رؤى تتحول\nإلى معالم.'} titleEn={'Vision becomes\narchitecture.'} descAr="استعرض أعمالنا في العمارة الإسلامية والمشاريع المصرفية والتجارية، واكتشف الفكرة وراء كل تصميم." descEn="Explore our work across Islamic architecture, banking, and commercial projects. Discover the thinking behind each design." /><ProjectGallery lang={lang} /><ContactBand lang={lang} /></>}
    {section === 'services' && <><PageIntro lang={lang} titleAr={'لكل تحدٍّ،\nرؤية هندسية.'} titleEn={'Every challenge.\nAn engineering vision.'} descAr="من الفكرة الأولى إلى التنفيذ، نقدم خدمات متكاملة تجمع التخصصات الهندسية حول احتياجات مشروعك." descEn="From the first idea through execution, our services bring engineering disciplines together around your project." /><Services lang={lang} full /><section className="service-close shell"><h2>{text(lang, 'لنحدد الخطوة التالية معاً', 'Let’s define the next step')}</h2><p>{text(lang, 'ليس عليك أن تعرف كل التفاصيل لتبدأ. شاركنا نوع المشروع وموقعه وما تتطلع إليه.', 'You don’t need every detail to begin. Tell us the project type, its location, and what you hope to achieve.')}</p><Link className="button" href={`/${lang}/contact/`}>{text(lang, 'تواصل معنا', 'Contact us')}<DirectionArrow lang={lang} /></Link></section></>}
    {section === 'about' && <About lang={lang} />}
    {section === 'contact' && <><PageIntro lang={lang} titleAr={'مشروعك القادم\nيبدأ من هنا.'} titleEn={'Your next project\nstarts here.'} descAr="لدينا دائماً مساحة لفكرة جديدة. تواصل معنا لنتعرف على مشروعك وما يحتاجه." descEn="There is always room for a new idea. Get in touch to tell us about your project and what it needs." /><section className="contact-layout shell"><OfficeLocations lang={lang} /><ContactForm lang={lang} /></section></>}
  </PageMotion></main>;
}
