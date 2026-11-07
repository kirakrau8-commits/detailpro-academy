import React, { useEffect, useMemo, useState } from 'react';
import { Search, Beaker, ShieldCheck, ExternalLink, FileText, Calculator, Droplets, Package, Sparkles } from 'lucide-react';

type CatalogProduct = {
  name: string;
  category: string;
  stage: string;
  presentation: string;
  description: string;
  use: string;
  dilution: string;
  source: string;
  brand?: string;
  sourceUrl?: string;
  code?: string;
};

const CATALOG_PRODUCTS: CatalogProduct[] = [
  { name: 'V-FLOC', category: 'Lavagem e limpeza', stage: 'Lavagem técnica', presentation: '500 ml, 1,5 L, 3 L e 5 L', description: 'Shampoo automotivo de pH neutro, desenvolvido para lavagem suave sem remover ceras ou selantes.', use: 'Lavagem de manutenção da pintura.', dilution: 'Até 1:400', source: 'Catálogo Vonixx 2024', code: '2011069 / 2011071 / 2011004 / 2011081 / 2008049' },
  { name: 'V-ECO PRO', category: 'Lavagem e limpeza', stage: 'Lavagem técnica', presentation: '1,5 L, 3 L e 5 L', description: 'Lava a seco concentrado com tensoativos especiais e cera de carnaúba.', use: 'Lavagem a seco conforme orientação do rótulo e avaliação da sujidade.', dilution: 'Consultar rótulo atualizado', source: 'Catálogo Vonixx 2024' },
  { name: 'V-ECO FAST', category: 'Lavagem e limpeza', stage: 'Lavagem técnica', presentation: '500 ml', description: 'Limpador para lavagem ecológica com tensoativos, solventes ecológicos e cera de carnaúba.', use: 'Limpeza de manutenção com técnica de baixa fricção.', dilution: 'Consultar rótulo atualizado', source: 'Catálogo Vonixx 2024' },
  { name: 'IMPACT', category: 'Limpeza pesada', stage: 'Fundamentos e segurança', presentation: '1,5 L, 3 L e 5 L', description: 'Multilimpador universal concentrado para limpezas difíceis em diferentes superfícies.', use: 'Limpeza pesada após teste de compatibilidade do substrato.', dilution: 'Consultar rótulo atualizado', source: 'Catálogo Vonixx 2024' },
  { name: 'CITRON', category: 'Limpeza pesada', stage: 'Descontaminação da pintura', presentation: '1,5 L', description: 'Lava-autos desengraxante indicado para lavagem pesada e remoção de graxa, matéria orgânica e ceras.', use: 'Limpeza profunda da pintura quando o procedimento exigir remoção de ceras.', dilution: 'Consultar rótulo atualizado', source: 'Catálogo Vonixx 2024' },
  { name: 'REVELAX', category: 'Inspeção de pintura', stage: 'Polimento e correção de pintura', presentation: '500 ml e 3 L', description: 'Revelador de hologramas que ajuda a mostrar defeitos reais da pintura durante a inspeção do polimento.', use: 'Inspeção entre etapas de correção e acabamento.', dilution: 'Pronto uso conforme rótulo', source: 'Catálogo Vonixx 2024' },
  { name: 'EXTRACTUS', category: 'Estofados e tecidos', stage: 'Higienização interna', presentation: '1,5 L, 3 L e 5 L', description: 'Limpador ultraconcentrado de baixa espumação para limpeza profissional de estofados, carpetes e tapetes.', use: 'Etapa 1 do Sistema VSC; indicado para uso em extratoras.', dilution: 'Consultar rótulo atualizado', source: 'Catálogo Vonixx 2024' },
  { name: 'BACTRAN', category: 'Estofados e tecidos', stage: 'Higienização interna', presentation: '1,5 L, 3 L e 5 L', description: 'Limpador bactericida ultraconcentrado e de baixa espumação.', use: 'Etapa 2 do Sistema VSC; seguir instruções e FDS.', dilution: 'Consultar rótulo atualizado', source: 'Catálogo Vonixx 2024' },
  { name: 'SANITIZANTE FINALIZADOR', category: 'Estofados e tecidos', stage: 'Higienização interna', presentation: '1,5 L, 3 L e 5 L', description: 'Finalizador indicado pelo catálogo como etapa 3 do Sistema VSC.', use: 'Pulverização na etapa final da limpeza de estofados, carpetes e tapetes.', dilution: 'Consultar rótulo atualizado', source: 'Catálogo Vonixx 2024' },
  { name: 'IMPERMAX', category: 'Proteção de tecidos', stage: 'Higienização interna', presentation: '1,5 L', description: 'Protetor de tecidos desenvolvido para estofados automotivos e domésticos.', use: 'Impermeabilização de tecidos compatíveis após limpeza e secagem.', dilution: 'Consultar rótulo atualizado', source: 'Catálogo Vonixx 2024' },
  { name: 'REVOX', category: 'Pneus e borrachas', stage: 'Estética de motores e vidros', presentation: '500 ml e 1,5 L', description: 'Selante sintético para pneus, com brilho, renovação e hidrorrepelência.', use: 'Acabamento e proteção de pneus limpos e secos.', dilution: 'Pronto uso conforme rótulo', source: 'Catálogo Vonixx 2024' },
  { name: 'SHINY', category: 'Pneus e borrachas', stage: 'Estética de motores e vidros', presentation: '500 ml e 1,5 L', description: 'Renovador de pneus com brilho intenso e duradouro, segundo o catálogo.', use: 'Acabamento de pneus conforme instruções do fabricante.', dilution: 'Pronto uso conforme rótulo', source: 'Catálogo Vonixx 2024' },
  { name: 'HIDRACOURO', category: 'Couro', stage: 'Limpeza de couro, plásticos e tecidos', presentation: '500 ml', description: 'Condicionador para couro que ajuda a evitar o ressecamento e manter o aspecto do material.', use: 'Condicionamento após limpeza adequada do couro.', dilution: 'Pronto uso conforme rótulo', source: 'Catálogo Vonixx 2024' },
  { name: 'HIGICOURO', category: 'Couro', stage: 'Limpeza de couro, plásticos e tecidos', presentation: '500 ml', description: 'Limpador de couro formulado para remover impurezas sem agredir o material quando usado corretamente.', use: 'Limpeza de couro; testar em área discreta.', dilution: 'Pronto uso conforme rótulo', source: 'Catálogo Vonixx 2024' },
  { name: 'RESTAURAX', category: 'Plásticos', stage: 'Limpeza de couro, plásticos e tecidos', presentation: '500 ml', description: 'Restaurador de plásticos internos e externos, como para-choques, painéis e laterais de portas.', use: 'Renovação de plásticos compatíveis.', dilution: 'Pronto uso conforme rótulo', source: 'Catálogo Vonixx 2024' },
  { name: 'INTENSE', category: 'Plásticos', stage: 'Limpeza de couro, plásticos e tecidos', presentation: '500 ml e 1,5 L', description: 'Renovador de plásticos internos com acabamento natural e toque seco.', use: 'Acabamento de plásticos internos compatíveis.', dilution: 'Pronto uso conforme rótulo', source: 'Catálogo Vonixx 2024' },
  { name: 'V-PAINT', category: 'Ceramic coating', stage: 'Proteção e vitrificação', presentation: '20 ml e 50 ml', description: 'Revestimento cerâmico para pintura à base de SiO₂.', use: 'Aplicação profissional de coating após preparação e descontaminação da pintura.', dilution: 'Pronto uso; seguir procedimento oficial', source: 'Catálogo Vonixx 2024' },
  { name: 'V-PLASTIC', category: 'Ceramic coating', stage: 'Proteção e vitrificação', presentation: '20 ml e 50 ml', description: 'Coating para renovação e proteção de plásticos.', use: 'Aplicação em plásticos compatíveis após preparação adequada.', dilution: 'Pronto uso; seguir procedimento oficial', source: 'Catálogo Vonixx 2024' },
  { name: 'V-LEATHER', category: 'Ceramic coating', stage: 'Proteção e vitrificação', presentation: '50 ml', description: 'Coating para couro com propriedades hidrofóbicas.', use: 'Proteção de couro após limpeza e preparação.', dilution: 'Pronto uso; seguir procedimento oficial', source: 'Catálogo Vonixx 2024' },
  { name: 'BLEND ALL IN ONE', category: 'Polimento', stage: 'Polimento e correção de pintura', presentation: '500 ml', description: 'Polidor de etapa única com proteção, combinando abrasivos, carnaúba e SiO₂.', use: 'Correção e acabamento em etapa única, após teste de combinação de boina e máquina.', dilution: 'Pronto uso conforme rótulo', source: 'Catálogo Vonixx 2024' },
  { name: 'MELON', category: 'Lavagem e limpeza', stage: 'Lavagem técnica', presentation: 'Consultar versões no fabricante', description: 'Shampoo automotivo neutro concentrado, com foco em lubrificação, limpeza e formação de espuma.', use: 'Lavagem de manutenção conforme instruções oficiais.', dilution: 'Até 1:400, conforme página oficial do fabricante', source: 'Easytech • página oficial do produto', brand: 'Easytech', sourceUrl: 'https://www.easytechshield.com.br/loja/melon/' },
  { name: 'PLURI', category: 'Limpeza pesada', stage: 'Fundamentos e segurança', presentation: 'Consultar versões no fabricante', description: 'APC alcalino concentrado para remoção de sujeiras pesadas e desengraxe.', use: 'O fabricante descreve usos em motores, caixas de rodas, tecidos e plásticos; confirmar compatibilidade e procedimento para cada substrato.', dilution: 'Fabricante informa faixas de até 1:5, 1:10, 1:20 e 1:60 conforme intensidade da sujeira', source: 'Easytech • página oficial do produto', brand: 'Easytech', sourceUrl: 'https://www.easytechshield.com.br/loja/pluri/' },
  { name: 'IRONTECH', category: 'Descontaminação ferrosa', stage: 'Descontaminação da pintura', presentation: 'Consultar versões no fabricante', description: 'Descontaminante ferroso que reage com partículas ferrosas e pode apresentar alteração de cor durante a ação.', use: 'Fabricante lista rodas, pintura, vidros, tecidos, couro e metais; não aplicar em superfícies zincadas.', dilution: 'Consultar rótulo e instruções oficiais; não presumir diluição', source: 'Easytech • página oficial do produto', brand: 'Easytech', sourceUrl: 'https://www.easytechshield.com.br/loja/irontech/' },
];

const CATEGORIES = ['Todas', ...Array.from(new Set(CATALOG_PRODUCTS.map((p) => p.category)))];
const BRANDS = ['Todas', ...Array.from(new Set(CATALOG_PRODUCTS.map((p) => p.brand || 'Vonixx')))];

export const ProductsPage: React.FC = () => {
  const [customProducts, setCustomProducts] = useState<CatalogProduct[]>(() => { try { return JSON.parse(localStorage.getItem('estetica_detalhamento_custom_products_v1') || '[]'); } catch { return []; } });
  useEffect(() => { const sync = () => { try { setCustomProducts(JSON.parse(localStorage.getItem('estetica_detalhamento_custom_products_v1') || '[]')); } catch { setCustomProducts([]); } }; window.addEventListener('focus', sync); return () => window.removeEventListener('focus', sync); }, []);
  const allProducts = [...CATALOG_PRODUCTS, ...customProducts.map(x => ({...x, stage: 'Cadastro personalizado', source: 'Cadastro local'}))];
  const categories = ['Todas', ...Array.from(new Set(allProducts.map(x => x.category)))];
  const brands = ['Todas', ...Array.from(new Set(allProducts.map(x => x.brand || 'Vonixx')))];
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todas');
  const [brand, setBrand] = useState('Todas');
  const [ratio, setRatio] = useState('10');
  const [volume, setVolume] = useState('500');

  const products = useMemo(() => allProducts.filter((p) => {
    const text = [p.name, p.category, p.description, p.use, p.stage].join(' ').toLowerCase();
    const productBrand = p.brand || 'Vonixx';
    return text.includes(query.toLowerCase()) && (category === 'Todas' || p.category === category) && (brand === 'Todas' || productBrand === brand);
  }), [query, category, brand, allProducts]);

  const totalVolume = Math.max(0, Number(volume) || 0);
  const parts = Math.max(1, Number(ratio) || 1);
  const productMl = totalVolume / parts;
  const waterMl = totalVolume - productMl;

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-[#172231] via-[#101720] to-[#0B0F14] p-6 sm:p-8">
        <div className="absolute -right-10 -top-16 h-56 w-56 rounded-full bg-[#E5B85C]/10 blur-3xl" />
        <p className="relative text-xs font-bold uppercase tracking-[0.2em] text-[#E5B85C]">Acervo técnico • Catálogo multi-marcas</p>
        <h1 className="relative mt-3 max-w-3xl font-display text-3xl font-extrabold text-white sm:text-4xl">Central de produtos e insumos</h1>
        <p className="relative mt-3 max-w-3xl text-sm leading-6 text-slate-300">Pesquise produtos por nome, categoria e aplicação. Consulte o que o catálogo informa e use os documentos oficiais atualizados antes de executar qualquer serviço.</p>
        <div className="relative mt-5 flex flex-wrap gap-3">
          <a href="https://vonixx.com.br/wp-content/uploads/2024/09/catalogo-vonixx-2024_reduzido.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-[#E5B85C] px-4 py-2.5 text-sm font-bold text-[#111318] hover:bg-amber-300"><FileText size={16}/> Abrir catálogo PDF <ExternalLink size={14}/></a>
          <a href="https://www.vonixx.com.br/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/5">Site oficial Vonixx <ExternalLink size={14}/></a>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-[#111720] p-5"><Package className="mb-3 text-[#E5B85C]"/><p className="text-2xl font-bold text-white">{allProducts.length}</p><p className="text-xs text-slate-400">Fichas iniciais catalogadas</p></div>
        <div className="rounded-xl border border-slate-800 bg-[#111720] p-5"><Sparkles className="mb-3 text-[#E5B85C]"/><p className="text-2xl font-bold text-white">{categories.length - 1}</p><p className="text-xs text-slate-400">Categorias de produtos</p></div>
        <div className="rounded-xl border border-slate-800 bg-[#111720] p-5"><Calculator className="mb-3 text-[#E5B85C]"/><p className="text-2xl font-bold text-white">1:X</p><p className="text-xs text-slate-400">Calculadora de diluição incluída</p></div>
      </section>

      <section className="rounded-xl border border-slate-800 bg-[#111720] p-5 space-y-4">
        <div className="flex items-center gap-2"><Search className="text-[#E5B85C]" size={18}/><h2 className="font-display text-lg font-bold text-white">Encontrar um produto</h2></div>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar V-FLOC, couro, pneus, coating, polimento..." className="w-full rounded-lg border border-slate-700 bg-[#0B0F14] px-4 py-3 text-sm text-white outline-none focus:border-[#E5B85C]"/>
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${category === item ? 'border-[#E5B85C] bg-[#E5B85C] text-[#111318]' : 'border-slate-700 text-slate-400 hover:text-white'}`}>{item}</button>)}
        </div>
        <div className="flex flex-wrap items-center gap-2"><label className="text-xs text-slate-400" htmlFor="product-brand-filter">Marca</label><select id="product-brand-filter" value={brand} onChange={(e) => setBrand(e.target.value)} className="rounded-lg border border-slate-700 bg-[#0B0F14] px-3 py-2 text-xs text-slate-200">{brands.map((item) => <option key={item} value={item}>{item}</option>)}</select><span className="text-xs text-slate-500">{products.length} resultado(s) • {brands.length - 1} marca(s) catalogada(s)</span></div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {products.map((product) => <article key={product.name} className="rounded-xl border border-slate-800 bg-[#111720] p-5 transition-colors hover:border-slate-600">
          <div className="flex flex-wrap items-center justify-between gap-2"><div className="flex flex-wrap gap-2"><span className="rounded-full bg-[#E5B85C]/10 px-3 py-1 text-[11px] font-bold text-[#E5B85C]">{product.category}</span><span className="rounded-full bg-sky-400/10 px-3 py-1 text-[11px] font-semibold text-sky-300">{product.brand || 'Vonixx'}</span></div>{product.sourceUrl ? <a href={product.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-[#E5B85C]">{product.source} <ExternalLink size={11}/></a> : <span className="text-[11px] text-slate-500">{product.source}</span>}</div>
          <h3 className="mt-3 font-display text-xl font-bold text-white">{product.name}</h3>
          <p className="mt-1 text-xs text-slate-500">{product.presentation}{product.code ? ` • Cód. ${product.code}` : ''}</p>
          <p className="mt-3 text-sm leading-6 text-slate-300">{product.description}</p>
          <div className="mt-4 grid gap-3 border-t border-slate-800 pt-4 sm:grid-cols-2">
            <div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Aplicação</p><p className="mt-1 text-xs leading-5 text-slate-300">{product.use}</p></div>
            <div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Diluição / uso</p><p className="mt-1 text-xs leading-5 text-slate-300">{product.dilution}</p></div>
          </div>
          <p className="mt-3 text-[11px] text-sky-300">{product.stage}</p>
        </article>)}
      </section>

      <section className="rounded-2xl border border-slate-800 bg-[#111720] p-5 sm:p-6">
        <div className="flex items-center gap-3"><div className="rounded-lg bg-sky-400/10 p-2 text-sky-300"><Calculator/></div><div><h2 className="font-display text-xl font-bold text-white">Calculadora de diluição</h2><p className="text-xs text-slate-400">Convenção Vonixx: 1:5 = 1 parte de produto em 5 partes totais.</p></div></div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="text-xs text-slate-400">Diluição 1:X<input type="number" min="1" value={ratio} onChange={(e) => setRatio(e.target.value)} className="mt-2 w-full rounded-lg border border-slate-700 bg-[#0B0F14] p-3 text-sm text-white"/></label>
          <label className="text-xs text-slate-400">Volume final (ml)<input type="number" min="1" value={volume} onChange={(e) => setVolume(e.target.value)} className="mt-2 w-full rounded-lg border border-slate-700 bg-[#0B0F14] p-3 text-sm text-white"/></label>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg bg-[#0B0F14] p-4"><p className="text-xs text-slate-500">Produto</p><p className="mt-1 font-mono text-xl font-bold text-[#E5B85C]">{productMl.toFixed(1)} ml</p></div>
          <div className="rounded-lg bg-[#0B0F14] p-4"><p className="text-xs text-slate-500">Água</p><p className="mt-1 font-mono text-xl font-bold text-sky-300">{waterMl.toFixed(1)} ml</p></div>
          <div className="rounded-lg bg-[#0B0F14] p-4"><p className="text-xs text-slate-500">Total</p><p className="mt-1 font-mono text-xl font-bold text-white">{totalVolume.toFixed(1)} ml</p></div>
        </div>
        <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-amber-200"><ShieldCheck size={16} className="mt-0.5 shrink-0"/> A calculadora faz a divisão matemática da proporção total. Ela não recomenda uma diluição específica: use somente a proporção indicada no rótulo ou na ficha técnica vigente do produto.</p>
      </section>

      <section className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
        <div className="flex items-center gap-2 text-amber-200"><ShieldCheck size={17}/><h2 className="text-sm font-bold">Segurança e confiabilidade das informações</h2></div>
        <p className="mt-2 text-xs leading-6 text-slate-300">O catálogo 2024 é uma referência histórica, não substitui a ficha técnica nem a FDS atual. Formulações, embalagens e instruções podem mudar. Antes de usar químicos, consulte o rótulo e a FDS do produto específico, use os EPIs indicados, teste a compatibilidade em área discreta e nunca misture produtos diferentes. Para consultar documentos de segurança, acesse o <a className="text-sky-300 underline" href="https://www.vonixx.com.br/" target="_blank" rel="noreferrer">fabricante</a> ou o <a className="text-sky-300 underline" href="https://fds.fispq.org/fabricante/vonixx/" target="_blank" rel="noreferrer">índice de FDS Vonixx</a>.</p>
      </section>
    </div>
  );
};
