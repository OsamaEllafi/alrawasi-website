import { asset, clients, Lang, text } from '@/lib/content';

export function Clients({ lang, expanded = false }: { lang: Lang; expanded?: boolean }) {
  const headingId = expanded ? 'clients-heading-expanded' : 'clients-heading';
  return <section className={`clients-section${expanded ? ' clients-section-expanded' : ''}`} aria-labelledby={headingId}>
    <div className="shell">
      <div className="section-heading" data-reveal>
        <h2 id={headingId}>{text(lang, 'ثقة نعتز بها', 'Trust we value')}</h2>
        <p>{text(lang, 'نفخر بالعمل مع مؤسسات تسهم في بناء ليبيا.', 'Working with institutions that contribute to Libya’s future.')}</p>
      </div>
      <ul className="client-grid" data-reveal>
        {clients.map(client => {
          const name = lang === 'ar' ? client[1] : client[2];
          return <li className="client-tile" key={client[0]}>
            <img src={asset(`/images/clients/${client[0]}`)} alt={name} loading="lazy" width="220" height="105" />
            <span className="client-tile-name" aria-hidden>{name}</span>
          </li>;
        })}
      </ul>
    </div>
  </section>;
}
