import React, { useMemo, useState } from 'react';
import { ExternalLink, FileText, Search, ShieldCheck, BookOpen, Download } from 'lucide-react';

type Resource = { title: string; type: string; category: string; description: string; url: string; source: string; year?: string };
const RESOURCES: Resource[] = [
  { title: 'Catálogo Vonixx 2025', type: 'Catálogo PDF', category: 'Catálogos', description: 'Portfólio organizado por limpeza e descontaminação, estofados, couro, ceras, polimento, politrizes, coating, equipamentos e acessórios.', url: 'https://www.vonixx.com.br/wp-content/uploads/2025/05/catalogo-vonixx-2025.pdf', source: 'Vonixx', year: '2025' },
  { title: 'Catálogo Vonixx 2024', type: 'Catálogo PDF', category: 'Catálogos', description: 'Material de referência enviado para iniciar a biblioteca de produtos da plataforma. Consulte a documentação atual do fabricante antes de aplicar qualquer orientação.', url: 'https://vonixx.com.br/wp-content/uploads/2024/09/catalogo-vonixx-2024_reduzido.pdf', source: 'Vonixx', year: '2024' },
  { title: 'Catálogos oficiais Vonixx', type: 'Página oficial', category: 'Catálogos', description: 'Página do fabricante para localizar as versões disponíveis dos catálogos.', url: 'https://www.vonixx.com.br/catalogos/', source: 'Vonixx' },
  { title: 'Biblioteca oficial de produtos Vonixx', type: 'Consulta online', category: 'Produtos', description: 'Pesquisa de produtos e categorias no site oficial, incluindo pintura, rodas, pneus, couro, tecido, vidro e equipamentos.', url: 'https://www.vonixx.com.br/produto/', source: 'Vonixx' },
  { title: 'Loja oficial Vonixx', type: 'Consulta online', category: 'Produtos', description: 'Consulta de linhas, acessórios e equipamentos comercializados na loja oficial. Preços e disponibilidade podem mudar.', url: 'https://store.vonixx.com.br/', source: 'Vonixx' },
  { title: 'Índice de FDS Vonixx', type: 'Índice de segurança', category: 'Segurança', description: 'Índice externo para localizar FDS por fabricante. Confirme sempre o produto exato, a revisão e a versão vigente.', url: 'https://fds.fispq.org/fabricante/vonixx/', source: 'Índice externo' },
];

const CATEGORIES = ['Todos', ...Array.from(new Set(RESOURCES.map((item) => item.category)))];

export const ResourcesPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todos');
  const filtered = useMemo(() => RESOURCES.filter((item) => {
    const content = [item.title, item.description, item.type, item.source, item.category].join(' ').toLowerCase();
    return content.includes(query.toLowerCase()) && (category === 'Todos' || item.category === category);
  }), [query, category]);

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-800 bg-gradient-to-br from-[#172231] via-[#101720] to-[#0B0F14] p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E5B85C]">Biblioteca • Fontes e documentos</p>
        <h1 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">Central de PDFs e referências técnicas</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">Um ponto de partida para catálogos, páginas oficiais e documentos de segurança. Os materiais externos abrem na fonte original; a plataforma não altera nem substitui os arquivos dos fabricantes.</p>
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-900/60 bg-amber-950/20 p-4">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-300"/>
          <p className="text-xs leading-relaxed text-amber-100/90">Atenção: catálogo comercial não é ficha técnica nem FDS. Antes do uso, confirme rótulo, ficha técnica e FDS atuais do produto específico, inclusive revisão, diluição, compatibilidade e EPIs.</p>
        </div>
      </section>

      <section className="rounded-xl border border-slate-800 bg-[#111720] p-5 space-y-4">
        <div className="relative">
          <label htmlFor="resource-search" className="sr-only">Buscar documentos e referências</label>
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500"/>
          <input id="resource-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar catálogo, FDS, produtos..." className="w-full rounded-lg border border-slate-700 bg-[#0B0F14] py-3 pl-10 pr-4 text-sm text-white outline-none focus:border-[#E5B85C]"/>
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${category === item ? 'border-[#E5B85C] bg-[#E5B85C] text-[#111318]' : 'border-slate-700 text-slate-400 hover:text-white'}`}>{item}</button>)}
        </div>
        <p className="text-xs text-slate-500">{filtered.length} referência(s) disponível(is).</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {filtered.map((item) => <article key={item.title} className="flex flex-col rounded-xl border border-slate-800 bg-[#111720] p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-[#161F2C] text-[#E5B85C]"><FileText size={19}/></div>
            <span className="rounded-full border border-slate-700 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">{item.type}</span>
          </div>
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-[#38BDF8]">{item.category} {item.year ? '• ' + item.year : ''}</p>
          <h2 className="mt-1 font-display text-lg font-bold text-white">{item.title}</h2>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{item.description}</p>
          <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-800 pt-4">
            <span className="text-xs text-slate-500">Fonte: {item.source}</span>
            <a href={item.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-[#E5B85C] px-3 py-2 text-xs font-bold text-[#111318] hover:bg-amber-300"><Download size={14}/> Abrir material <ExternalLink size={12}/></a>
          </div>
        </article>)}
      </section>
      {filtered.length === 0 && <div className="rounded-xl border border-slate-800 bg-[#111720] p-10 text-center text-sm text-slate-400">Nenhuma referência encontrada.</div>}
      <p className="text-xs text-slate-500">Os links levam a páginas externas. A disponibilidade e o conteúdo dos documentos dependem dos respectivos responsáveis.</p>
    </div>
  );
};
