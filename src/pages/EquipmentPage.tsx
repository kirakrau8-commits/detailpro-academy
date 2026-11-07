import React, { useMemo, useState } from 'react';
import { Search, ShieldCheck, Wrench, Gauge, Lightbulb, Droplets, ClipboardCheck } from 'lucide-react';

type Equipment = {
  name: string;
  group: string;
  purpose: string;
  whatToEvaluate: string[];
  care: string[];
  skill: string;
};

const EQUIPMENT: Equipment[] = [
  { name: 'Politriz roto-orbital', group: 'Polimento', purpose: 'Movimento orbital com rotação livre ou forçada, conforme o tipo de máquina. Usada em correção e refino de pintura com a combinação correta de boina e composto.', whatToEvaluate: ['Diâmetro do prato e compatibilidade das boinas', 'Órbita e tipo de acionamento', 'Controle de velocidade e ergonomia', 'Disponibilidade de assistência e peças', 'Vibração, ruído e equilíbrio'], care: ['Inspecione prato, backing plate e cabo antes do uso.', 'Mantenha a boina limpa e centralizada.', 'Não pressione a máquina além da recomendação do fabricante.', 'Evite prender o cabo em partes móveis.'], skill: 'Intermediário' },
  { name: 'Politriz rotativa', group: 'Polimento', purpose: 'Ferramenta de rotação direta, capaz de gerar correção intensa e calor com rapidez. Exige controle técnico elevado.', whatToEvaluate: ['Faixa de rotação e controle progressivo', 'Partida suave e proteção contra religamento', 'Peso, empunhadura e equilíbrio', 'Compatibilidade do eixo e pratos', 'Assistência técnica e disponibilidade de peças'], care: ['Faça teste em pequena área e monitore temperatura.', 'Mantenha a máquina em movimento conforme a técnica.', 'Tenha atenção redobrada em quinas, vincos e repinturas.', 'Não use acessórios danificados ou incompatíveis.'], skill: 'Avançado' },
  { name: 'Extratora', group: 'Higienização', purpose: 'Injeta solução e recupera líquido e sujeira de tecidos e carpetes. O resultado depende do bico, vazão, sucção, química e técnica.', whatToEvaluate: ['Vácuo e capacidade de recuperação', 'Vazão de injeção e controle', 'Capacidade dos reservatórios', 'Facilidade de limpeza e manutenção', 'Disponibilidade de filtros, mangueiras e bicos'], care: ['Use somente produtos compatíveis com o equipamento.', 'Não sature espumas ou forrações.', 'Esvazie e higienize reservatórios após o uso.', 'Seque os componentes conforme o manual.'], skill: 'Intermediário' },
  { name: 'Lavadora de alta pressão', group: 'Lavagem', purpose: 'Auxilia na pré-lavagem e remoção de sujeira solta. Pressão, vazão, bico e distância precisam ser adequados ao substrato.', whatToEvaluate: ['Pressão e vazão reais de trabalho', 'Ciclo de trabalho e refrigeração', 'Filtro de entrada e qualidade da água', 'Mangueira, conexões e assistência', 'Compatibilidade com snow foam e acessórios'], care: ['Nunca direcione o jato para pessoas ou animais.', 'Respeite distância segura de pintura, sensores, borrachas e adesivos.', 'Não opere a bomba sem alimentação de água.', 'Despressurize o sistema antes de desconectar acessórios.'], skill: 'Iniciante' },
  { name: 'Aspirador profissional', group: 'Higienização', purpose: 'Remove partículas secas e resíduos antes da higienização. Modelos para sólidos e líquidos exigem cuidados específicos.', whatToEvaluate: ['Vazão de ar e depressão informadas pelo fabricante', 'Filtragem e disponibilidade de filtros', 'Capacidade do reservatório', 'Nível de ruído e mobilidade', 'Acessórios para frestas e tecidos'], care: ['Use o filtro correto para o tipo de resíduo.', 'Não aspire líquidos em equipamento não preparado para isso.', 'Esvazie o reservatório antes de atingir o limite.', 'Limpe filtros conforme o manual.'], skill: 'Iniciante' },
  { name: 'Compressor de ar', group: 'Ar comprimido', purpose: 'Fornece ar para ferramentas pneumáticas e acessórios de limpeza. O dimensionamento depende da demanda simultânea e do consumo de cada ferramenta.', whatToEvaluate: ['Vazão efetiva (PCM ou L/min) na pressão de trabalho', 'Volume do reservatório', 'Regime de trabalho e ciclo de operação', 'Filtro, regulador e separador de água', 'Ruído, drenagem e assistência técnica'], care: ['Drene o condensado conforme o manual.', 'Use regulador e filtro adequados.', 'Não ultrapasse a pressão nominal de mangueiras e ferramentas.', 'Inspecione conexões e válvulas periodicamente.'], skill: 'Intermediário' },
  { name: 'Tornador / ferramenta pneumática de limpeza', group: 'Ar comprimido', purpose: 'Usa fluxo de ar para movimentar resíduos em frestas e superfícies. Alguns modelos também trabalham com solução líquida.', whatToEvaluate: ['Consumo de ar exigido', 'Pressão de trabalho recomendada', 'Tipo de bico e disponibilidade de peças', 'Controle de produto e facilidade de desmontagem', 'Compatibilidade com a superfície e o químico'], care: ['Ajuste a pressão dentro da faixa do fabricante.', 'Não direcione ar ou produto para pele, olhos ou vias respiratórias.', 'Evite usar em eletrônicos, conectores e materiais frágeis.', 'Limpe e seque a ferramenta após o uso.'], skill: 'Avançado' },
  { name: 'Iluminação de inspeção', group: 'Inspeção', purpose: 'Revela riscos, hologramas, manchas e defeitos de acabamento. Diferentes fontes e ângulos mostram defeitos diferentes.', whatToEvaluate: ['Temperatura de cor e reprodução de cor (CRI)', 'Intensidade e possibilidade de ajuste', 'Feixe amplo e pontual', 'Autonomia, recarga e proteção física', 'Tripé, suporte e mobilidade'], care: ['Inspecione a pintura em mais de um ângulo.', 'Mantenha lentes limpas.', 'Evite ofuscamento e organize cabos no box.', 'Não confie em uma única fonte de luz para liberar o serviço.'], skill: 'Iniciante' },
  { name: 'Medidor de espessura de pintura', group: 'Inspeção', purpose: 'Ajuda a mapear variações de espessura em substratos compatíveis. A leitura não identifica sozinha todas as camadas nem garante quanto verniz pode ser removido.', whatToEvaluate: ['Compatibilidade com aço e metais não ferrosos', 'Faixa e resolução de medição', 'Calibração e padrões de referência', 'Modo de leitura e registro de dados', 'Treinamento para interpretar variações'], care: ['Calibre conforme o manual e os padrões fornecidos.', 'Faça várias leituras por painel e registre o mapa.', 'Não compare valores sem considerar substrato e histórico.', 'Não use uma leitura isolada como autorização para correção agressiva.'], skill: 'Avançado' },
];

const GROUPS = ['Todas', ...Array.from(new Set(EQUIPMENT.map((item) => item.group)))];

export const EquipmentPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState('Todas');
  const [open, setOpen] = useState<string | null>('Politriz roto-orbital');
  const filtered = useMemo(() => EQUIPMENT.filter((item) => {
    const text = [item.name, item.group, item.purpose, ...item.whatToEvaluate].join(' ').toLowerCase();
    return text.includes(query.toLowerCase()) && (group === 'Todas' || item.group === group);
  }), [query, group]);

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-800 bg-gradient-to-br from-[#172231] via-[#101720] to-[#0B0F14] p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E5B85C]">Ferramentas • Equipamentos</p>
        <h1 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">Guia de máquinas e equipamentos</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">Entenda a função de cada equipamento, os critérios técnicos de compra, os cuidados de operação e os limites de uso. Este guia é independente de marca e não substitui o manual do fabricante nem treinamento prático.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-700 bg-black/20 p-4"><Wrench className="mb-2 text-[#E5B85C]"/><p className="text-2xl font-bold text-white">{EQUIPMENT.length}</p><p className="text-xs text-slate-400">Tipos de equipamento</p></div>
          <div className="rounded-xl border border-slate-700 bg-black/20 p-4"><Gauge className="mb-2 text-sky-300"/><p className="text-sm font-bold text-white">Critérios de compra</p><p className="text-xs text-slate-400">Parâmetros para comparar modelos</p></div>
          <div className="rounded-xl border border-slate-700 bg-black/20 p-4"><ShieldCheck className="mb-2 text-emerald-400"/><p className="text-sm font-bold text-white">Uso responsável</p><p className="text-xs text-slate-400">Cuidados e limites por ferramenta</p></div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-800 bg-[#111720] p-5 space-y-4">
        <div className="relative"><label htmlFor="equipment-search" className="sr-only">Buscar equipamento</label><Search className="absolute left-3 top-3 h-4 w-4 text-slate-500"/><input id="equipment-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar politriz, extratora, compressor, iluminação..." className="w-full rounded-lg border border-slate-700 bg-[#0B0F14] py-3 pl-10 pr-4 text-sm text-white outline-none focus:border-[#E5B85C]"/></div>
        <div className="flex flex-wrap gap-2">{GROUPS.map((item) => <button key={item} type="button" onClick={() => setGroup(item)} className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${group === item ? 'border-[#E5B85C] bg-[#E5B85C] text-[#111318]' : 'border-slate-700 text-slate-400 hover:text-white'}`}>{item}</button>)}</div>
        <p className="text-xs text-slate-500">{filtered.length} equipamento(s) no guia.</p>
      </section>

      <section className="space-y-3">
        {filtered.map((item) => {
          const expanded = open === item.name;
          return <article key={item.name} className="overflow-hidden rounded-xl border border-slate-800 bg-[#111720]">
            <button type="button" aria-expanded={expanded} onClick={() => setOpen(expanded ? null : item.name)} className="flex w-full items-center justify-between gap-4 p-5 text-left hover:bg-white/[0.02]">
              <div><div className="mb-1 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-[#38BDF8]"><span>{item.group}</span><span className="text-slate-600">•</span><span>{item.skill}</span></div><h2 className="font-display text-lg font-bold text-white">{item.name}</h2><p className="mt-1 text-sm text-slate-400">{item.purpose}</p></div>
              <span className="text-xl text-[#E5B85C]">{expanded ? '−' : '+'}</span>
            </button>
            {expanded && <div className="grid gap-5 border-t border-slate-800 p-5 md:grid-cols-2">
              <div><h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-white"><ClipboardCheck size={16} className="text-[#E5B85C]"/> O que avaliar na compra</h3><ul className="list-disc space-y-2 pl-5 text-sm text-slate-300">{item.whatToEvaluate.map((point) => <li key={point}>{point}</li>)}</ul></div>
              <div><h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-white"><ShieldCheck size={16} className="text-emerald-400"/> Cuidados de operação</h3><ul className="list-disc space-y-2 pl-5 text-sm text-slate-300">{item.care.map((point) => <li key={point}>{point}</li>)}</ul></div>
            </div>}
          </article>;
        })}
        {filtered.length === 0 && <div className="rounded-xl border border-slate-800 bg-[#111720] p-10 text-center text-sm text-slate-400">Nenhum equipamento encontrado.</div>}
      </section>
      <p className="text-xs leading-relaxed text-slate-500">Os critérios apresentados são gerais. Verifique sempre especificações, limites de operação, manutenção, proteção elétrica, pressão, vazão e acessórios no manual do modelo escolhido.</p>
    </div>
  );
};
