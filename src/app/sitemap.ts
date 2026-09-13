import type { MetadataRoute } from 'next';
import { projects } from '@/lib/content';

export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', 'about/', 'services/', 'projects/', 'contact/', ...projects.map(p => `projects/${p.slug}/`)];
  return ['ar', 'en'].flatMap(lang => paths.map(path => ({
    url: `https://alrwasi.ly/${lang}/${path}`,
    alternates: { languages: { ar: `https://alrwasi.ly/ar/${path}`, en: `https://alrwasi.ly/en/${path}` } },
  })));
}
