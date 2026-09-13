import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { isLang } from '@/lib/content';
import '../globals.css';
import '@fontsource/tajawal/400.css';
import '@fontsource/tajawal/500.css';
import '@fontsource/tajawal/700.css';
import '@fontsource/tajawal/800.css';
import '@fontsource/cairo/400.css';
import '@fontsource/cairo/500.css';
import '@fontsource/outfit/400.css';
import '@fontsource/outfit/500.css';
import '@fontsource/outfit/600.css';

export const dynamicParams = false;
export function generateStaticParams() { return [{ lang: 'ar' }, { lang: 'en' }]; }
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    metadataBase: new URL('https://alrwasi.ly'),
    title: { default: lang === 'ar' ? 'الرواسي | للاستشارات الهندسية' : 'Al-Rawasi | Engineering Consultants', template: '%s | Al-Rawasi' },
    description: lang === 'ar' ? 'الرواسي للاستشارات الهندسية في البيضاء، ليبيا. التصميم المعماري والهندسي وإدارة المشاريع والتخطيط الحضري.' : 'Engineering and architectural consultancy in Al-Bayda, Libya. Design, project management, supervision, and urban planning.',
    icons: { icon: '/images/logo.png' },
    openGraph: { siteName: 'Al-Rawasi Engineering Consultants', type: 'website', locale: lang === 'ar' ? 'ar_LY' : 'en_US', images: [{ url: '/images/cbl-shahat.jpg', width: 961, height: 1024 }] },
  };
}
export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning><body suppressHydrationWarning>
    <script type="application/json" id="design-contract" dangerouslySetInnerHTML={{ __html: JSON.stringify({ key: 'user-approved-drawing-to-landmark', thesis: 'Interactive architectural drawing becomes a landmark.', world: 'Graphite, white, magenta; sharp editorial geometry.', story: 'Understand, explore projects, contact.', firstViewport: 'Building left; Arabic headline right; process below.', finish: 'unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance' }) }} />
    <Header lang={lang} />{children}<Footer lang={lang} />
  </body></html>;
}
