import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { asset, projects, isLang, text, categories } from '@/lib/content';
import { DirectionArrow } from '@/components/header';
import { ImageViewer } from '@/components/image-viewer';
import { ContactBand } from '@/components/footer';
import { ProjectCard } from '@/components/project-gallery';
import { PageMotion } from '@/components/motion';
export const dynamicParams = false;
export function generateStaticParams() { return projects.map(p => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = projects.find(p => p.slug === slug);
  if (!project || !isLang(lang)) return {};
  return { title: project.title[lang], description: project.description[lang], alternates: { canonical: `/${lang}/projects/${slug}/`, languages: { ar: `/ar/projects/${slug}/`, en: `/en/projects/${slug}/` } }, openGraph: { images: [`/images/${project.image}`] } };
}
export default async function ProjectPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const project = projects.find(p => p.slug === slug);
  if (!project || !isLang(lang)) notFound();
  const related = projects.filter(p => p.slug !== slug).sort((a, b) => Number(b.category === project.category) - Number(a.category === project.category)).slice(0, 2);
  return <main id="main"><PageMotion><section className="detail-intro shell"><Link className="text-link back-link" href={`/${lang}/projects/`}>{text(lang, 'جميع المشاريع', 'All projects')}<DirectionArrow lang={lang} /></Link><div><h1>{project.title[lang]}</h1><span>{project.location[lang]}</span></div></section><div className="detail-hero shell"><ImageViewer lang={lang} src={asset(`/images/${project.image}`)} alt={text(lang, `تصور معماري: ${project.title.ar}`, `Architectural rendering: ${project.title.en}`)} /></div><section className="detail-story shell"><div><h2>{text(lang, 'عن المشروع', 'About the project')}</h2><p className="lead">{project.description[lang]}</p><p className="gallery-note">{text(lang, 'الصور المعروضة تصورات معمارية للمشروع.', 'Images shown are architectural renderings of the project.')}</p></div><dl><div><dt>{text(lang, 'الموقع', 'Location')}</dt><dd>{project.location[lang]}</dd></div><div><dt>{text(lang, 'القطاع', 'Sector')}</dt><dd>{categories.find(c => c.id === project.category)?.[lang]}</dd></div><div><dt>{text(lang, 'نطاق العمل', 'Scope')}</dt><dd>{project.scope[lang]}</dd></div></dl></section>{project.extra && <div className="detail-extra shell"><ImageViewer lang={lang} src={asset(`/images/${project.extra}`)} alt={text(lang, `منظور إضافي: ${project.title.ar}`, `Additional view: ${project.title.en}`)} /></div>}<section className="related-projects shell"><h2>{text(lang, 'اكتشف المزيد من أعمالنا', 'Explore more of our work')}</h2><div className="project-grid">{related.map((p, i) => <ProjectCard lang={lang} project={p} key={p.slug} index={i} />)}</div></section><ContactBand lang={lang} /></PageMotion></main>;
}
