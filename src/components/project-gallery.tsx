'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { MagnifyingGlass, X } from '@phosphor-icons/react';
import { asset, Lang, Project, projects, categories, text } from '@/lib/content';
import { DirectionArrow } from './header';

export function ProjectCard({ project, lang, index = 0 }: { project: Project; lang: Lang; index?: number }) {
  return <article className={`project-card project-card-${index % 4}`}>
    <Link href={`/${lang}/projects/${project.slug}/`} className="project-image-link" aria-label={text(lang, `استعرض مشروع ${project.title.ar}`, `Explore ${project.title.en}`)}>
      <img src={asset(`/images/${project.image}`)} alt={text(lang, `تصور معماري: ${project.title.ar}`, `Architectural rendering: ${project.title.en}`)} width="1024" height="720" loading="lazy" />
      <span className="project-image-label">{project.scope[lang]}</span>
      <span className="project-open"><DirectionArrow lang={lang} /></span>
    </Link>
    <div className="project-caption"><div><span className="project-location">{project.location[lang]}</span><h3><Link href={`/${lang}/projects/${project.slug}/`}>{project.title[lang]}</Link></h3></div><span className="project-category">{categories.find(c => c.id === project.category)?.[lang]}</span></div>
  </article>;
}
export function ProjectGallery({ lang }: { lang: Lang }) {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => projects.filter(p => (category === 'all' || p.category === category) && `${p.title.ar} ${p.title.en} ${p.location.ar} ${p.location.en}`.toLowerCase().includes(query.trim().toLowerCase())), [category, query]);
  return <section className="gallery-section shell" aria-label={text(lang, 'معرض المشاريع', 'Project gallery')}>
    <div className="gallery-controls"><div className="filter-group" role="group" aria-label={text(lang, 'تصنيف المشاريع', 'Filter projects')}>{categories.map(c => <button key={c.id} className={category === c.id ? 'active' : ''} aria-pressed={category === c.id} onClick={() => setCategory(c.id)} suppressHydrationWarning>{c[lang]}<span>{c.id === 'all' ? projects.length : projects.filter(p => p.category === c.id).length}</span></button>)}</div>
      <div className="project-search"><MagnifyingGlass size={19} aria-hidden /><input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder={text(lang, 'ابحث عن مشروع', 'Search projects')} aria-label={text(lang, 'ابحث بالاسم أو المدينة', 'Search by name or city')} />{query && <button onClick={() => setQuery('')} aria-label={text(lang, 'مسح البحث', 'Clear search')} suppressHydrationWarning><X size={16} /></button>}</div>
    </div>
    <p className="result-count" aria-live="polite">{text(lang, `${filtered.length} مشاريع`, `${filtered.length} project${filtered.length === 1 ? '' : 's'}`)}</p>
    {filtered.length ? <div className="project-grid">{filtered.map((p, i) => <ProjectCard key={p.slug} project={p} lang={lang} index={i} />)}</div> : <div className="empty-state"><h2>{text(lang, 'لم نجد مشروعاً مطابقاً', 'No matching projects')}</h2><p>{text(lang, 'جرّب اسماً آخر أو استعرض جميع المشاريع.', 'Try another name or explore all projects.')}</p><button className="button" onClick={() => { setCategory('all'); setQuery(''); }} suppressHydrationWarning>{text(lang, 'عرض جميع المشاريع', 'Show all projects')}</button></div>}
    <p className="gallery-note">{text(lang, 'الصور المعروضة تشمل تصورات وتصاميم معمارية للمشاريع.', 'Project imagery includes architectural concepts and renderings.')}</p>
  </section>;
}
