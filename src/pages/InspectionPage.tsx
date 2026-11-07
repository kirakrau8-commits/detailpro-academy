import React, { useMemo, useState } from 'react';
import { ClipboardCheck, CarFront, Camera, ShieldAlert, RotateCcw } from 'lucide-react';

type CheckGroup = { title: string; items: string[] };
const GROUPS: CheckGroup[] = [
  { title: 'Recepção e identificação do veículo', items: ['Confirmar modelo, versão, cor e placa com o cliente', 'Registrar quilometragem e nível aproximado de combustível', 'Anotar acessórios, objetos e itens deixados no veículo', 'Confirmar serviço contratado e limites do escopo', 'Registrar autorização para movimentação e teste, se aplicável'] },
  { title: 'Inspeção externa', items: ['Fotografar veículo em todos os lados antes do serviço', 'Registrar riscos, amassados, lascas e repinturas aparentes', 'Verificar rodas, pneus, pinças e acabamentos', 'Inspecionar vidros, faróis, lanternas e retrovisores', 'Observar emblemas, frisos, borrachas e peças soltas', 'Verificar sinais de película, envelopamento ou PPF'] },
  { title: 'Inspeção interna', items: ['Fotografar painel, bancos, portas e porta-malas', 'Registrar manchas, rasgos, desgaste e danos existentes', 'Verificar funcionamento aparente de cintos e comandos acessíveis', 'Anotar objetos pessoais e itens frágeis', 'Identificar materiais especiais: couro, tecido, alcantara, piano black ou telas'] },
  { title: 'Antes de iniciar o serviço', items: ['Confirmar produtos e procedimentos compatíveis com cada superfície', 'Consultar rótulos, fichas técnicas e FDS dos químicos', 'Separar panos, escovas e aplicadores por área de uso', 'Isolar componentes elétricos ou sensíveis quando o procedimento exigir', 'Confirmar ventilação, iluminação e EPIs adequados'] },
  { title: 'Controle de qualidade e entrega', items: ['Conferir o serviço contratado por área', 'Verificar resíduos em frestas, emblemas e acabamentos', 'Conferir vidros, espelhos e telas sem marcas aparentes', 'Remover ferramentas, panos e proteções temporárias', 'Fotografar o resultado final', 'Apresentar observações, limitações e recomendações de manutenção ao cliente'] },
];
const ALL_ITEMS = GROUPS.flatMap((g) => g.items);

export const InspectionPage: React.FC = () => {
  const [checked, setChecked] = useState<string[]>([]);
  const [vehicle, setVehicle] = useState({ customer: '', model: '', plate: '', mileage: '', service: '', date: new Date().toISOString().slice(0, 10) });
  const [notes, setNotes] = useState('');
  const [damageNotes, setDamageNotes] = useState('');
  const percentage = Math.round((checked.length / ALL_ITEMS.length) * 100);
  const grouped = useMemo(() => GROUPS.map((group) => ({ ...group, done: group.items.filter((item) => checked.includes(item)).length })), [checked]);
  const toggle = (item: string) => setChecked((prev) => prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]);
  const reset = () => { setChecked([]); setVehicle({ customer: '', model: '', plate: '', mileage: '', service: '', date: new Date().toISOString().slice(0, 10) }); setNotes(''); setDamageNotes(''); };
  return <div className="space-y-7">
    <section className="rounded-2xl border border-slate-800 bg-gradient-to-br from-[#172231] via-[#101720] to-[#0B0F14] p-6 sm:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E5B85C]">Rotina profissional • Controle de qualidade</p>
      <h1 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">Ficha de inspeção e entrega</h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">Checklist para registrar a condição do veículo na recepção, preparar o serviço e conferir a entrega. Marque cada etapa concluída e registre danos preexistentes com fotos e observações.</p>
    </section>
    <section className="rounded-xl border border-slate-800 bg-[#111720] p-5">
      <h2 className="mb-4 flex items-center gap-2 font-bold text-white"><CarFront size={18} className="text-[#E5B85C]"/> Dados do atendimento</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {([{ key: 'customer', label: 'Cliente', placeholder: 'Nome do cliente' }, { key: 'model', label: 'Veículo', placeholder: 'Modelo, versão e cor' }, { key: 'plate', label: 'Placa', placeholder: 'Identificação do veículo' }, { key: 'mileage', label: 'Quilometragem', placeholder: 'Ex.: 45.000 km' }, { key: 'service', label: 'Serviço contratado', placeholder: 'Ex.: lavagem detalhada' }] as const).map((field) => <label key={field.key} className="space-y-1 text-xs font-semibold text-slate-400">{field.label}<input value={vehicle[field.key]} onChange={(e) => setVehicle((v) => ({ ...v, [field.key]: e.target.value }))} placeholder={field.placeholder} className="w-full rounded-lg border border-slate-700 bg-[#0B0F14] px-3 py-2.5 text-sm font-normal text-white outline-none focus:border-[#E5B85C]"/></label>)}
        <label className="space-y-1 text-xs font-semibold text-slate-400">Data<input type="date" value={vehicle.date} onChange={(e) => setVehicle((v) => ({ ...v, date: e.target.value }))} className="w-full rounded-lg border border-slate-700 bg-[#0B0F14] px-3 py-2.5 text-sm font-normal text-white outline-none focus:border-[#E5B85C]"/></label>
      </div>
    </section>
    <section className="rounded-xl border border-slate-800 bg-[#111720] p-5">
      <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs uppercase tracking-wider text-slate-500">Progresso do checklist</p><p className="mt-1 text-2xl font-extrabold text-white tabular-nums">{checked.length} <span className="text-sm font-medium text-slate-500">/ {ALL_ITEMS.length} etapas</span></p></div><p className="text-lg font-bold text-[#E5B85C]">{percentage}%</p></div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-[#E5B85C] transition-all" style={{ width: percentage + '%' }}/></div>
    </section>
    <div className="space-y-4">
      {grouped.map((group, index) => <section key={group.title} className="rounded-xl border border-slate-800 bg-[#111720] p-5">
        <div className="mb-4 flex items-center justify-between gap-3"><h2 className="font-display text-lg font-bold text-white">{index + 1}. {group.title}</h2><span className="rounded-full border border-slate-700 px-2.5 py-1 text-xs text-slate-400">{group.done}/{group.items.length}</span></div>
        <div className="space-y-3">{group.items.map((item) => <label key={item} className="flex cursor-pointer items-start gap-3 text-sm text-slate-300"><input type="checkbox" checked={checked.includes(item)} onChange={() => toggle(item)} className="mt-0.5 h-4 w-4 accent-[#E5B85C]"/><span className={checked.includes(item) ? 'text-slate-500 line-through' : ''}>{item}</span></label>)}</div>
      </section>)}
    </div>
    <section className="grid gap-4 lg:grid-cols-2">
      <label className="rounded-xl border border-slate-800 bg-[#111720] p-5 text-sm font-bold text-white"><span className="mb-3 flex items-center gap-2"><Camera size={17} className="text-[#E5B85C]"/> Danos preexistentes e registro fotográfico</span><textarea value={damageNotes} onChange={(e) => setDamageNotes(e.target.value)} rows={5} placeholder="Descreva localização, tipo de dano e referência das fotos..." className="w-full resize-y rounded-lg border border-slate-700 bg-[#0B0F14] p-3 text-sm font-normal text-slate-200 outline-none focus:border-[#E5B85C]"/></label>
      <label className="rounded-xl border border-slate-800 bg-[#111720] p-5 text-sm font-bold text-white"><span className="mb-3 flex items-center gap-2"><ClipboardCheck size={17} className="text-[#E5B85C]"/> Observações do atendimento</span><textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={5} placeholder="Limitações, autorização, recomendações e observações..." className="w-full resize-y rounded-lg border border-slate-700 bg-[#0B0F14] p-3 text-sm font-normal text-slate-200 outline-none focus:border-[#E5B85C]"/></label>
    </section>
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-900/50 bg-amber-950/20 p-4 text-xs leading-relaxed text-amber-100"><p className="flex items-start gap-2"><ShieldAlert size={16} className="mt-0.5 shrink-0"/> Este checklist é um apoio operacional. Não substitui contrato, autorização formal, inspeção técnica, fotos datadas nem procedimentos específicos do estabelecimento.</p><button type="button" onClick={reset} className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-amber-800 px-3 py-2 font-semibold hover:bg-amber-900/30"><RotateCcw size={14}/> Limpar ficha</button></div>
  </div>;
};
