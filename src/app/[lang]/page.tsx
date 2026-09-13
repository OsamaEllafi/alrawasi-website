import { notFound } from 'next/navigation';
import { Hero } from '@/components/hero';
import { isLang, text } from '@/lib/content';
import { HomeContent } from '@/components/home-content';
import { PageMotion } from '@/components/motion';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return { alternates: { canonical: `/${lang}/`, languages: { ar: '/ar/', en: '/en/' } } };
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return <main id="main"><PageMotion><Hero lang={lang} /><section id="process" className="process-section shell"><div className="process-intro"><h2>{text(lang, 'نهجنا في العمل', 'Our approach')}</h2><p>{text(lang, 'نرافق مشروعك في كل مرحلة، بخبرة هندسية ورؤية واضحة لنبني معاً مستقبلاً أفضل.', 'We guide your project at every stage, with engineering expertise and a clear vision for what comes next.')}</p></div><ol className="process-steps">{[[ 'الدراسات', 'Studies', 'فهم احتياجات المشروع', 'Understanding the project' ], [ 'التصميم', 'Design', 'تحويل الرؤية إلى مخططات', 'Turning vision into plans' ], [ 'الإشراف', 'Supervision', 'متابعة الجودة والتنفيذ', 'Following quality and execution' ]].map((s, i) => <li key={i}><span className="step-number">0{i + 1}</span><h3>{text(lang, s[0], s[1])}</h3><p>{text(lang, s[2], s[3])}</p></li>)}</ol></section><HomeContent lang={lang} /></PageMotion></main>;
}
