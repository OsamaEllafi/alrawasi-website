'use client';
import { FormEvent, useEffect, useState } from 'react';
import { EnvelopeSimple, Copy, Check, MapPin, ArrowUpRight } from '@phosphor-icons/react';
import { Lang, offices, services, text } from '@/lib/content';
export function ContactForm({ lang }: { lang: Lang }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [draft, setDraft] = useState('');
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [selected, setSelected] = useState('');
  useEffect(() => { setSelected(new URLSearchParams(window.location.search).get('service') || ''); }, []);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();
    const subject = String(data.get('service') || text(lang, 'استفسار عن مشروع', 'Project enquiry'));
    const next: Record<string, string> = {};
    if (!name) next.name = text(lang, 'يرجى كتابة اسمك.', 'Please enter your name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = text(lang, 'يرجى كتابة بريد إلكتروني صحيح.', 'Please enter a valid email address.');
    if (message.length < 10) next.message = text(lang, 'أخبرنا عن مشروعك في 10 أحرف على الأقل.', 'Tell us about your project in at least 10 characters.');
    setErrors(next);
    if (Object.keys(next).length) { (e.currentTarget.elements.namedItem(Object.keys(next)[0]) as HTMLElement)?.focus(); return; }
    const body = `${text(lang, 'الاسم', 'Name')}: ${name}\n${text(lang, 'البريد الإلكتروني', 'Email')}: ${email}\n${text(lang, 'الخدمة', 'Service')}: ${subject}\n\n${message}`;
    setDraft(body); setCopied(false); setCopyError(false);
    window.location.href = `mailto:alrawasialiby@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  const copy = async () => { try { await navigator.clipboard.writeText(draft); setCopied(true); setCopyError(false); } catch { setCopyError(true); } };
  return <form className="contact-form" onSubmit={submit} noValidate>
    <h2>{text(lang, 'حدّثنا عن مشروعك', 'Tell us about your project')}</h2><p className="form-intro">{text(lang, 'يساعدنا فهم فكرتك على توجيهك إلى الخدمة المناسبة.', 'Understanding your idea helps us connect you with the right service.')}</p>
    <div className="form-row"><div className="field"><label htmlFor="name">{text(lang, 'الاسم', 'Name')} <span>*</span></label><input id="name" name="name" autoComplete="name" required maxLength={120} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} placeholder={text(lang, 'اسمك الكامل', 'Your full name')} />{errors.name && <span className="field-error" id="name-error">{errors.name}</span>}</div><div className="field"><label htmlFor="email">{text(lang, 'البريد الإلكتروني', 'Email')} <span>*</span></label><input id="email" name="email" type="email" dir="ltr" autoComplete="email" required maxLength={200} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} placeholder="name@company.com" />{errors.email && <span className="field-error" id="email-error">{errors.email}</span>}</div></div>
    <div className="field"><label htmlFor="service">{text(lang, 'الخدمة المطلوبة', 'Service of interest')}</label><select id="service" name="service" value={selected} onChange={e => setSelected(e.target.value)}><option value="">{text(lang, 'اختر خدمة (اختياري)', 'Select a service (optional)')}</option>{services.map(s => <option key={s.en} value={s[lang]}>{s[lang]}</option>)}</select></div>
    <div className="field"><label htmlFor="message">{text(lang, 'فكرة المشروع', 'Your project')} <span>*</span></label><textarea id="message" name="message" rows={5} required minLength={10} maxLength={3000} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} placeholder={text(lang, 'الموقع، نوع المشروع، وما الذي تتطلع لتحقيقه...', 'Location, project type, and what you hope to achieve…')} />{errors.message && <span className="field-error" id="message-error">{errors.message}</span>}</div>
    <p className="form-note">{text(lang, 'سنفتح تطبيق بريدك برسالة جاهزة للمراجعة والإرسال. لا تُرسل بياناتك من هذا الموقع.', 'We’ll open your email app with a draft to review and send. This website does not submit your details.')}</p>
    <button className="button" type="submit" suppressHydrationWarning>{text(lang, 'إعداد رسالة بريد', 'Prepare email')}<EnvelopeSimple size={21} /></button>
    {draft && <div className="draft-status" role="status"><strong>{text(lang, 'رسالتك جاهزة', 'Your draft is ready')}</strong><p>{text(lang, 'إذا لم يفتح تطبيق البريد، انسخ الرسالة وأرسلها إلى alrawasialiby@gmail.com.', 'If your email app did not open, copy the draft and send it to alrawasialiby@gmail.com.')}</p><button type="button" className="quiet-button" onClick={copy} suppressHydrationWarning>{copied ? <Check size={18} /> : <Copy size={18} />}{copied ? text(lang, 'تم نسخ الرسالة', 'Draft copied') : text(lang, 'نسخ الرسالة', 'Copy draft')}</button>{copyError && <><p>{text(lang, 'يمكنك تحديد النص أدناه ونسخه يدوياً.', 'Select and copy the text below manually.')}</p><textarea readOnly value={draft} aria-label={text(lang, 'نص الرسالة', 'Email draft')} rows={6} /></>}</div>}
  </form>;
}
export function OfficeLocations({ lang }: { lang: Lang }) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const office = offices[active];
  return <aside className="office-locations"><h2>{text(lang, 'قريبون من مشروعك', 'Closer to your project')}</h2><p>{text(lang, 'تفضل بزيارتنا في أحد مواقعنا، أو راسلنا مباشرة.', 'Visit one of our offices or reach us directly by email.')}</p><div className="office-tabs" role="tablist" aria-label={text(lang, 'مكاتب الشركة', 'Company offices')}>{offices.map((o, i) => <button key={o.en} role="tab" id={`office-tab-${i}`} aria-selected={i === active} aria-controls="office-panel" tabIndex={i === active ? 0 : -1} onClick={() => setActive(i)} onKeyDown={e => { if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) { e.preventDefault(); const next = e.key === 'Home' ? 0 : e.key === 'End' ? 2 : (i + (e.key === (lang === 'ar' ? 'ArrowLeft' : 'ArrowRight') ? 1 : 2)) % 3; setActive(next); document.getElementById(`office-tab-${next}`)?.focus(); } }} suppressHydrationWarning>{o[lang]}</button>)}</div><div className="office-panel" id="office-panel" role="tabpanel" aria-labelledby={`office-tab-${active}`} tabIndex={0}><MapPin size={33} weight="light" /><div><span>{active === 0 ? text(lang, 'المقر الرئيسي', 'Headquarters') : text(lang, 'فرع الشركة', 'Branch office')}</span><h3>{office[lang]}</h3><p>{text(lang, office.addressAr, office.addressEn)}</p></div><a className="text-link" target="_blank" rel="noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.search)}`}>{text(lang, 'البحث في الخرائط', 'Search in Maps')}<ArrowUpRight size={18} /></a></div><div className="direct-email"><span>{text(lang, 'البريد الإلكتروني', 'Email us')}</span><a dir="ltr" href="mailto:alrawasialiby@gmail.com">alrawasialiby@gmail.com</a><button className="quiet-button" onClick={async () => { try { await navigator.clipboard.writeText('alrawasialiby@gmail.com'); setCopied(true); } catch { setCopied(false); window.location.href = 'mailto:alrawasialiby@gmail.com'; } }} suppressHydrationWarning>{copied ? <Check size={17} /> : <Copy size={17} />}{copied ? text(lang, 'تم النسخ', 'Copied') : text(lang, 'نسخ البريد', 'Copy email')}</button></div></aside>;
}
