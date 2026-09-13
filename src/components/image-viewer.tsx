'use client';
import { useRef, useEffect, useState } from 'react';
import { ArrowsOut, X } from '@phosphor-icons/react';
import { Lang, text } from '@/lib/content';
export function ImageViewer({ src, alt, lang }: { src: string; alt: string; lang: Lang }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => { if (!open) return; const old = document.body.style.overflow; document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = old; }; }, [open]);
  return <><button className="detail-image-button" onClick={() => { dialog.current?.showModal(); setOpen(true); }} aria-label={text(lang, 'تكبير صورة المشروع', 'Enlarge project image')} suppressHydrationWarning><img src={src} alt={alt} width="1400" height="900" /><span><ArrowsOut size={22} />{text(lang, 'تكبير الصورة', 'Enlarge image')}</span></button><dialog className="image-dialog" ref={dialog} onClose={() => setOpen(false)} aria-label={alt} onClick={e => { if (e.target === e.currentTarget) dialog.current?.close(); }}><button className="icon-button" onClick={() => dialog.current?.close()} aria-label={text(lang, 'إغلاق الصورة', 'Close image')} suppressHydrationWarning><X size={27} /></button><img src={src} alt={alt} /><p>{alt}</p></dialog></>;
}
