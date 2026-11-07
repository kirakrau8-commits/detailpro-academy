import React, { useMemo, useState } from 'react';
import { Calculator, Clock3, Droplets, Package, RotateCcw, Wallet } from 'lucide-react';

const money = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number.isFinite(value) ? value : 0);
const numberValue = (value: string) => Math.max(0, Number(value) || 0);

export const ServiceCalculatorPage: React.FC = () => {
  const [service, setService] = useState('Lavagem detalhada');
  const [packagePrice, setPackagePrice] = useState('59.90');
  const [packageVolume, setPackageVolume] = useState('1500');
  const [consumption, setConsumption] = useState('80');
  const [otherMaterials, setOtherMaterials] = useState('8');
  const [hours, setHours] = useState('2');
  const [hourlyRate, setHourlyRate] = useState('35');
  const [overhead, setOverhead] = useState('12');
  const [tax, setTax] = useState('6');
  const [margin, setMargin] = useState('25');

  const result = useMemo(() => {
    const volume = numberValue(packageVolume);
    const productCost = volume > 0 ? numberValue(packagePrice) / volume * numberValue(consumption) : 0;
    const materials = productCost + numberValue(otherMaterials);
    const labor = numberValue(hours) * numberValue(hourlyRate);
    const fixedCost = materials + labor + numberValue(overhead);
    const taxRate = Math.min(99, numberValue(tax)) / 100;
    const marginRate = Math.min(99, numberValue(margin)) / 100;
    const denominator = 1 - taxRate - marginRate;
    const price = denominator > 0 ? fixedCost / denominator : 0;
    return { productCost, materials, labor, fixedCost, price, profit: price - fixedCost - price * taxRate, denominator };
  }, [packagePrice, packageVolume, consumption, otherMaterials, hours, hourlyRate, overhead, tax, margin]);

  const fields = [
    { label: 'Preço da embalagem (R$)', value: packagePrice, set: setPackagePrice, step: '0.01' },
    { label: 'Volume da embalagem (ml)', value: packageVolume, set: setPackageVolume, step: '1' },
    { label: 'Consumo neste serviço (ml)', value: consumption, set: setConsumption, step: '1' },
    { label: 'Outros materiais (R$)', value: otherMaterials, set: setOtherMaterials, step: '0.01' },
    { label: 'Tempo de execução (horas)', value: hours, set: setHours, step: '0.25' },
    { label: 'Custo da mão de obra por hora (R$)', value: hourlyRate, set: setHourlyRate, step: '0.01' },
    { label: 'Rateio de despesas por serviço (R$)', value: overhead, set: setOverhead, step: '0.01' },
    { label: 'Impostos e taxas (%)', value: tax, set: setTax, step: '0.1' },
    { label: 'Margem de lucro desejada (%)', value: margin, set: setMargin, step: '0.1' },
  ];

  const reset = () => {
    setService('Lavagem detalhada'); setPackagePrice('59.90'); setPackageVolume('1500'); setConsumption('80');
    setOtherMaterials('8'); setHours('2'); setHourlyRate('35'); setOverhead('12'); setTax('6'); setMargin('25');
  };

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-800 bg-gradient-to-br from-[#172231] via-[#101720] to-[#0B0F14] p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E5B85C]">Gestão profissional • Formação de preço</p>
        <h1 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">Calculadora de custo e orçamento</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">Calcule o custo estimado de um serviço incluindo consumo de produto, materiais, mão de obra, despesas, impostos e margem desejada. Os valores são editáveis e servem como apoio à sua própria precificação.</p>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="space-y-5 rounded-xl border border-slate-800 bg-[#111720] p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-lg font-bold text-white">Dados do serviço</h2>
            <button type="button" onClick={reset} className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white"><RotateCcw size={14}/> Restaurar exemplo</button>
          </div>
          <div>
            <label htmlFor="service-name" className="mb-1.5 block text-xs font-semibold text-slate-400">Nome do serviço</label>
            <input id="service-name" value={service} onChange={(e) => setService(e.target.value)} className="w-full rounded-lg border border-slate-700 bg-[#0B0F14] px-3 py-2.5 text-sm text-white outline-none focus:border-[#E5B85C]"/>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {fields.map((field) => <div key={field.label}>
              <label className="mb-1.5 block text-xs font-semibold text-slate-400">{field.label}</label>
              <input type="number" min="0" step={field.step} value={field.value} onChange={(e) => field.set(e.target.value)} className="w-full rounded-lg border border-slate-700 bg-[#0B0F14] px-3 py-2.5 text-sm text-white outline-none focus:border-[#E5B85C]"/>
            </div>)}
          </div>
          <p className="rounded-lg border border-slate-700 bg-black/20 p-3 text-xs leading-relaxed text-slate-400">O consumo do produto é calculado proporcionalmente ao volume da embalagem. Informe valores reais medidos no seu processo. O rateio de despesas deve representar a parcela de aluguel, energia, água, manutenção e outros custos atribuída a cada serviço.</p>
        </section>

        <section className="space-y-5">
          <div className="rounded-xl border border-[#E5B85C]/40 bg-[#151B23] p-5 sm:p-6">
            <div className="flex items-center gap-2 text-[#E5B85C]"><Calculator size={18}/><span className="text-xs font-bold uppercase tracking-wider">Preço sugerido</span></div>
            <p className="mt-3 break-words font-mono text-4xl font-extrabold text-white sm:text-5xl">{money(result.price)}</p>
            <p className="mt-2 text-sm text-slate-400">{service.trim() || 'Serviço sem nome'}</p>
            {result.denominator <= 0 && <p className="mt-3 rounded-lg bg-red-950/40 p-3 text-xs text-red-200">A soma de impostos e margem precisa ser menor que 100% para calcular o preço.</p>}
          </div>

          <div className="rounded-xl border border-slate-800 bg-[#111720] p-5">
            <h2 className="mb-4 font-display text-lg font-bold text-white">Composição do orçamento</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between gap-3"><span className="flex items-center gap-2 text-slate-400"><Droplets size={15}/> Produto consumido</span><strong className="font-mono text-white">{money(result.productCost)}</strong></div>
              <div className="flex items-center justify-between gap-3"><span className="flex items-center gap-2 text-slate-400"><Package size={15}/> Materiais totais</span><strong className="font-mono text-white">{money(result.materials)}</strong></div>
              <div className="flex items-center justify-between gap-3"><span className="flex items-center gap-2 text-slate-400"><Clock3 size={15}/> Mão de obra</span><strong className="font-mono text-white">{money(result.labor)}</strong></div>
              <div className="flex items-center justify-between gap-3"><span className="flex items-center gap-2 text-slate-400"><Wallet size={15}/> Despesas rateadas</span><strong className="font-mono text-white">{money(numberValue(overhead))}</strong></div>
              <div className="border-t border-slate-700 pt-3 flex items-center justify-between gap-3"><span className="font-semibold text-slate-300">Custo total estimado</span><strong className="font-mono text-white">{money(result.fixedCost)}</strong></div>
              <div className="flex items-center justify-between gap-3"><span className="text-slate-400">Impostos estimados</span><strong className="font-mono text-white">{money(result.price * numberValue(tax) / 100)}</strong></div>
              <div className="flex items-center justify-between gap-3"><span className="text-emerald-400">Lucro estimado</span><strong className="font-mono text-emerald-400">{money(result.profit)}</strong></div>
            </div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-[#111720] p-5">
            <h3 className="mb-2 text-sm font-bold text-white">Como o preço é calculado</h3>
            <p className="text-xs leading-relaxed text-slate-400">Preço = (materiais + mão de obra + despesas rateadas) ÷ (1 − impostos − margem). Essa fórmula considera impostos e lucro como percentuais do preço final, não como acréscimos sobre o custo.</p>
          </div>
        </section>
      </div>
      <p className="text-xs leading-relaxed text-slate-500">Ferramenta de estimativa. Não substitui controle financeiro e contábil. Confirme o regime tributário, taxas de pagamento, comissões, retrabalho, depreciação e custos fixos reais do seu negócio antes de definir o preço ao cliente.</p>
    </div>
  );
};
