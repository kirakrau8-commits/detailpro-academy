import React, { useMemo, useState } from 'react';
import { Search, ShieldCheck, ClipboardList, ChevronDown, CarFront, Droplets, Sparkles, Gauge } from 'lucide-react';

type Procedure = {
  id: string;
  title: string;
  category: string;
  level: string;
  time: string;
  objective: string;
  tools: string[];
  steps: string[];
  quality: string[];
  cautions: string[];
};

const PROCEDURES: Procedure[] = [
  {
    id: 'wash',
    title: 'Lavagem técnica de manutenção',
    category: 'Lavagem externa',
    level: 'Iniciante',
    time: '45–90 min',
    objective: 'Remover a sujeira de manutenção reduzindo o atrito desnecessário sobre a pintura.',
    tools: ['Lavadora ou fonte de água controlada', 'Shampoo automotivo compatível', 'Luvas de lavagem', 'Baldes e separadores de partículas', 'Toalhas de secagem limpas'],
    steps: ['Faça a inspeção inicial e fotografe danos existentes.', 'Trabalhe com a superfície fria e à sombra; confirme as instruções dos produtos.', 'Remova a sujeira solta com pré-lavagem, sem aproximar o jato de áreas frágeis.', 'Lave por seções, usando movimentos retos e enxaguando a luva com frequência.', 'Enxágue completamente e seque com toalha adequada, sem arrastar partículas.'],
    quality: ['Não restam resíduos visíveis de shampoo.', 'A secagem não deixou marcas de água aparentes.', 'Não foram criados riscos ou marcas durante o processo.'],
    cautions: ['Não lave carroceria ou rodas quentes.', 'Não use detergente doméstico como substituto automático de shampoo automotivo.', 'Ajuste pressão e distância do jato ao substrato e às recomendações do equipamento.'],
  },
  {
    id: 'wheels',
    title: 'Limpeza segura de rodas e pneus',
    category: 'Lavagem externa',
    level: 'Intermediário',
    time: '30–60 min',
    objective: 'Limpar faces, áreas internas acessíveis e pneus sem atacar acabamentos sensíveis.',
    tools: ['Limpador específico compatível', 'Escovas de diferentes formatos', 'Pincéis macios', 'Pulverizador identificado', 'EPIs indicados na FDS'],
    steps: ['Identifique o acabamento da roda e leia o rótulo do limpador.', 'Confirme que a roda está fria e teste o produto em área discreta quando necessário.', 'Trabalhe uma roda por vez e respeite o tempo de ação informado pelo fabricante.', 'Agite a sujeira com escovas compatíveis, sem força excessiva.', 'Enxágue completamente e finalize o pneu somente após a limpeza.'],
    quality: ['Não há resíduo químico nas frestas.', 'O acabamento não apresenta manchas ou alteração visual.', 'Pneu e roda estão secos antes da aplicação de finalizadores.'],
    cautions: ['Não misture produtos químicos.', 'Não deixe o limpador secar sobre a superfície.', 'Rodas anodizadas, polidas, diamantadas ou danificadas exigem confirmação de compatibilidade.'],
  },
  {
    id: 'decon',
    title: 'Descontaminação mecânica da pintura',
    category: 'Pintura',
    level: 'Avançado',
    time: '60–120 min',
    objective: 'Remover contaminantes aderidos que permanecem após a lavagem, preservando o máximo possível do verniz.',
    tools: ['Clay bar ou mídia descontaminante apropriada', 'Lubrificante indicado para a mídia', 'Toalhas de microfibra', 'Iluminação de inspeção'],
    steps: ['Lave e enxágue completamente o veículo.', 'Avalie a contaminação com toque controlado e superfície protegida.', 'Confirme a compatibilidade entre mídia, lubrificante e acabamento.', 'Trabalhe pequenas áreas com lubrificação abundante e pressão mínima.', 'Inspecione a superfície e repita apenas onde necessário; lave ou remova resíduos conforme instruções.'],
    quality: ['A superfície apresenta menor aspereza ao toque protegido.', 'Não há marcas novas, resíduos ou arraste de contaminantes.', 'A etapa seguinte foi definida após inspeção.'],
    cautions: ['A descontaminação mecânica pode marcar o verniz e exigir refino posterior.', 'Não trabalhe a seco.', 'Interrompa se a mídia cair no chão ou acumular partículas abrasivas.'],
  },
  {
    id: 'polish',
    title: 'Polimento de teste e correção controlada',
    category: 'Pintura',
    level: 'Avançado',
    time: 'Variável conforme veículo',
    objective: 'Selecionar a combinação menos agressiva capaz de atingir o resultado acordado com o cliente.',
    tools: ['Politriz adequada', 'Boina e composto compatíveis', 'Fita de mascaramento', 'Medidor de espessura quando aplicável', 'Iluminação de inspeção', 'EPIs do fabricante'],
    steps: ['Inspecione a pintura, repinturas, bordas e defeitos profundos.', 'Meça a espessura quando houver equipamento e conhecimento para interpretar os dados.', 'Isole áreas sensíveis e faça uma pequena seção de teste.', 'Comece pela combinação menos agressiva e avalie o resultado sob iluminação adequada.', 'Ajuste técnica e combinação somente após nova inspeção; remova resíduos com método compatível.'],
    quality: ['A seção de teste atende ao nível de correção combinado.', 'Não há hologramas, excesso de resíduo ou aquecimento anormal.', 'Bordas e áreas sensíveis foram preservadas.'],
    cautions: ['Não prometa remover riscos que atinjam camadas profundas.', 'Não persiga correção total sem avaliar a espessura e o risco de remoção excessiva de verniz.', 'Siga limites e instruções da máquina, boina e composto.'],
  },
  {
    id: 'interior',
    title: 'Higienização de tecidos e carpetes',
    category: 'Interior',
    level: 'Intermediário',
    time: '60–180 min',
    objective: 'Limpar fibras e remover resíduos sem encharcar espumas, forrações ou componentes elétricos.',
    tools: ['Aspirador', 'Produto específico para tecido', 'Escovas macias', 'Microfibras', 'Extratora quando indicada', 'Ventilação e EPIs adequados'],
    steps: ['Aspire completamente e identifique manchas, odores e áreas frágeis.', 'Teste o produto em ponto discreto e confirme solidez da cor.', 'Dosifique conforme rótulo e aplique em pequenas áreas, sem saturar o tecido.', 'Agite suavemente e extraia ou remova resíduos conforme o sistema utilizado.', 'Promova secagem completa com ventilação antes de liberar o veículo.'],
    quality: ['Não há resíduo pegajoso ou excesso de produto.', 'O tecido está seco antes da entrega.', 'Não surgiram manchas, transferência de cor ou deformações.'],
    cautions: ['Evite excesso de umidade em espumas, módulos, conectores e trilhos.', 'Não misture limpadores ou sanitizantes.', 'Não prometa desinfecção sem produto regularizado e procedimento validado.'],
  },
  {
    id: 'coating',
    title: 'Preparação para proteção cerâmica',
    category: 'Proteção',
    level: 'Especialista',
    time: 'Conforme sistema',
    objective: 'Preparar a pintura e controlar o ambiente antes da aplicação de um revestimento protetivo.',
    tools: ['Iluminação de inspeção', 'Produtos de preparação especificados', 'Aplicadores compatíveis', 'Microfibras limpas', 'EPIs e ambiente controlado'],
    steps: ['Confirme o estado da pintura e conclua a correção necessária.', 'Remova resíduos de polimento pelo método aprovado pelo fabricante do coating.', 'Verifique temperatura, umidade e ventilação dentro dos limites do produto.', 'Aplique em pequenas áreas seguindo quantidade, movimento e tempo de nivelamento do fabricante.', 'Inspecione sob diferentes ângulos e respeite o tempo de cura e as restrições de contato com água.'],
    quality: ['Não há áreas com excesso, falhas ou marcas de nivelamento.', 'A aplicação foi registrada com lote e condições ambientais.', 'O cliente recebeu instruções de cura e manutenção.'],
    cautions: ['Não existe tempo universal de cura: siga a ficha técnica do revestimento.', 'Use proteção respiratória e demais EPIs definidos na FDS.', 'Não aplique sobre superfície incompatível ou fora das condições especificadas.'],
  },
];

const CATEGORIES = ['Todas', ...Array.from(new Set(PROCEDURES.map((item) => item.category)))];

export const ProceduresPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todas');
  const [expanded, setExpanded] = useState<string | null>('wash');

  const filtered = useMemo(() => PROCEDURES.filter((item) => {
    const haystack = [item.title, item.category, item.objective, item.level, ...item.tools].join(' ').toLowerCase();
    return haystack.includes(query.toLowerCase()) && (category === 'Todas' || item.category === category);
  }), [query, category]);

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-800 bg-gradient-to-br from-[#172231] via-[#101720] to-[#0B0F14] p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E5B85C]">Biblioteca prática • Procedimentos</p>
        <h1 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">Enciclopédia de detalhamento</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">Procedimentos organizados por objetivo, ferramentas, sequência de execução, critérios de qualidade e pontos de atenção. Use como material de estudo e adapte cada serviço ao veículo, ao substrato e às instruções dos fabricantes.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-700 bg-black/20 p-4"><ClipboardList className="mb-2 text-[#E5B85C]"/><p className="text-2xl font-bold text-white">{PROCEDURES.length}</p><p className="text-xs text-slate-400">Guias de procedimento</p></div>
          <div className="rounded-xl border border-slate-700 bg-black/20 p-4"><ShieldCheck className="mb-2 text-emerald-400"/><p className="text-sm font-bold text-white">Segurança integrada</p><p className="text-xs text-slate-400">Alertas e critérios em cada guia</p></div>
          <div className="rounded-xl border border-slate-700 bg-black/20 p-4"><Gauge className="mb-2 text-sky-400"/><p className="text-sm font-bold text-white">Do básico ao avançado</p><p className="text-xs text-slate-400">Níveis de execução identificados</p></div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-800 bg-[#111720] p-5 space-y-4">
        <div className="relative">
          <label htmlFor="procedure-search" className="sr-only">Buscar procedimento</label>
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500"/>
          <input id="procedure-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar lavagem, polimento, tecido, coating..." className="w-full rounded-lg border border-slate-700 bg-[#0B0F14] py-3 pl-10 pr-4 text-sm text-white outline-none focus:border-[#E5B85C]"/>
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${category === item ? 'border-[#E5B85C] bg-[#E5B85C] text-[#111318]' : 'border-slate-700 text-slate-400 hover:text-white'}`}>{item}</button>)}
        </div>
        <p className="text-xs text-slate-500">{filtered.length} procedimento(s) encontrado(s).</p>
      </section>

      <section className="space-y-4">
        {filtered.map((item) => {
          const isOpen = expanded === item.id;
          return <article key={item.id} className="overflow-hidden rounded-xl border border-slate-800 bg-[#111720]">
            <button type="button" aria-expanded={isOpen} onClick={() => setExpanded(isOpen ? null : item.id)} className="flex w-full items-center justify-between gap-4 p-5 text-left hover:bg-white/[0.02]">
              <div className="min-w-0">
                <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-[#38BDF8]"><span>{item.category}</span><span className="text-slate-600">•</span><span>{item.level}</span><span className="text-slate-600">•</span><span>{item.time}</span></div>
                <h2 className="font-display text-lg font-bold text-white">{item.title}</h2>
                <p className="mt-1 text-sm text-slate-400">{item.objective}</p>
              </div>
              <ChevronDown className={`h-5 w-5 shrink-0 text-[#E5B85C] transition-transform ${isOpen ? 'rotate-180' : ''}`}/>
            </button>
            {isOpen && <div className="grid gap-6 border-t border-slate-800 p-5 lg:grid-cols-2">
              <div className="space-y-3">
                <h3 className="flex items-center gap-2 text-sm font-bold text-white"><CarFront className="h-4 w-4 text-[#E5B85C]"/> Ferramentas e materiais</h3>
                <ul className="list-disc space-y-1 pl-5 text-sm text-slate-300">{item.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul>
                <h3 className="flex items-center gap-2 pt-3 text-sm font-bold text-white"><Sparkles className="h-4 w-4 text-[#E5B85C]"/> Critérios de qualidade</h3>
                <ul className="list-disc space-y-1 pl-5 text-sm text-slate-300">{item.quality.map((point) => <li key={point}>{point}</li>)}</ul>
              </div>
              <div className="space-y-3">
                <h3 className="flex items-center gap-2 text-sm font-bold text-white"><Droplets className="h-4 w-4 text-sky-400"/> Sequência de execução</h3>
                <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-300">{item.steps.map((step) => <li key={step}>{step}</li>)}</ol>
                <div className="rounded-lg border border-amber-900/60 bg-amber-950/20 p-4">
                  <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-amber-300"><ShieldCheck className="h-4 w-4"/> Pontos de atenção</h3>
                  <ul className="list-disc space-y-1 pl-5 text-xs leading-relaxed text-amber-100/90">{item.cautions.map((caution) => <li key={caution}>{caution}</li>)}</ul>
                </div>
              </div>
            </div>}
          </article>;
        })}
        {filtered.length === 0 && <div className="rounded-xl border border-slate-800 bg-[#111720] p-10 text-center text-sm text-slate-400">Nenhum procedimento encontrado. Ajuste a busca ou selecione outra categoria.</div>}
      </section>
      <p className="text-xs leading-relaxed text-slate-500">Nota técnica: este acervo é educacional. Não substitui treinamento prático, manual do equipamento, rótulo, ficha técnica ou FDS vigente. Diluições, compatibilidade, tempo de ação, cura e EPIs variam conforme o produto e o fabricante.</p>
    </div>
  );
};
