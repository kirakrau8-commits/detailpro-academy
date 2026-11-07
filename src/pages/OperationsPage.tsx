import React, { useEffect, useMemo, useState } from 'react';
import { Package, Wallet, CalendarDays, Plus, Search, Trash2, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

type Tab = 'estoque' | 'financeiro' | 'agenda';
type StockItem = { id: string; name: string; category: string; unit: string; quantity: number; min: number; cost: number };
type StockMove = { id: string; itemId: string; kind: 'Entrada' | 'Saída'; quantity: number; date: string; note: string };
type MoneyEntry = { id: string; kind: 'Receita' | 'Despesa'; category: string; description: string; amount: number; date: string; paid: boolean };
type Appointment = { id: string; customer: string; vehicle: string; phone: string; service: string; date: string; time: string; status: 'Agendado' | 'Confirmado' | 'Em andamento' | 'Concluído' | 'Cancelado'; notes: string };
type OperationsData = { stock: StockItem[]; movements: StockMove[]; finance: MoneyEntry[]; appointments: Appointment[] };
const KEY = 'estetica_detalhamento_operations_v1';
const EMPTY: OperationsData = { stock: [], movements: [], finance: [], appointments: [] };
const id = () => `op-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
const brl = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const today = () => new Date().toISOString().slice(0, 10);
const field = 'w-full rounded-lg border border-slate-700 bg-[#0B0F14] px-3 py-2.5 text-sm text-white outline-none focus:border-[#E5B85C]';

export const OperationsPage: React.FC = () => {
  const [data, setData] = useState<OperationsData>(() => { try { const raw = localStorage.getItem(KEY); return raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY; } catch { return EMPTY; } });
  const [tab, setTab] = useState<Tab>('estoque');
  const [query, setQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [stockForm, setStockForm] = useState({ name: '', category: 'Químico', unit: 'un', quantity: '', min: '', cost: '' });
  const [moveForm, setMoveForm] = useState({ itemId: '', kind: 'Entrada' as StockMove['kind'], quantity: '', date: today(), note: '' });
  const [moneyForm, setMoneyForm] = useState({ kind: 'Receita' as MoneyEntry['kind'], category: 'Serviços', description: '', amount: '', date: today(), paid: true });
  const [appointmentForm, setAppointmentForm] = useState({ customer: '', vehicle: '', phone: '', service: '', date: today(), time: '09:00', status: 'Agendado' as Appointment['status'], notes: '' });
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch { /* storage quota or private mode */ } }, [data]);

  const balances = useMemo(() => {
    const income = data.finance.filter(x => x.kind === 'Receita' && x.paid).reduce((s,x)=>s+x.amount,0);
    const expense = data.finance.filter(x => x.kind === 'Despesa' && x.paid).reduce((s,x)=>s+x.amount,0);
    const pending = data.finance.filter(x => !x.paid).reduce((s,x)=>s+(x.kind === 'Receita' ? x.amount : -x.amount),0);
    return { income, expense, result: income-expense, pending };
  }, [data.finance]);
  const stockWithBalance = useMemo(() => data.stock.map(item => {
    const balance = data.movements.filter(m=>m.itemId===item.id).reduce((s,m)=>s+(m.kind==='Entrada'?m.quantity:-m.quantity),item.quantity);
    return { ...item, balance };
  }), [data.stock,data.movements]);
  const lowStock = stockWithBalance.filter(x=>x.balance<=x.min);
  const filteredStock = stockWithBalance.filter(x=>[x.name,x.category].join(' ').toLowerCase().includes(query.toLowerCase()));
  const filteredFinance = data.finance.filter(x=>[x.description,x.category,x.kind].join(' ').toLowerCase().includes(query.toLowerCase()));
  const filteredAppointments = data.appointments.filter(x=>[x.customer,x.vehicle,x.service,x.status].join(' ').toLowerCase().includes(query.toLowerCase()));
  const close = () => setShowForm(false);
  const resetForms = () => {
    setStockForm({name:'',category:'Químico',unit:'un',quantity:'',min:'',cost:''});
    setMoveForm({itemId:'',kind:'Entrada',quantity:'',date:today(),note:''});
    setMoneyForm({kind:'Receita',category:'Serviços',description:'',amount:'',date:today(),paid:true});
    setAppointmentForm({customer:'',vehicle:'',phone:'',service:'',date:today(),time:'09:00',status:'Agendado',notes:''});
  };
  const saveStock = () => { if(!stockForm.name.trim() || Number(stockForm.quantity)<0) return; setData(p=>({...p,stock:[{id:id(),name:stockForm.name.trim(),category:stockForm.category,unit:stockForm.unit,quantity:Number(stockForm.quantity)||0,min:Number(stockForm.min)||0,cost:Number(stockForm.cost)||0},...p.stock]})); resetForms(); close(); };
  const saveMove = () => { const q=Number(moveForm.quantity); if(!moveForm.itemId||q<=0) return; const item=stockWithBalance.find(x=>x.id===moveForm.itemId); if(moveForm.kind==='Saída' && item && q>item.balance) { window.alert('A saída não pode ser maior que o saldo disponível.'); return; } setData(p=>({...p,movements:[{id:id(),...moveForm,quantity:q},...p.movements]})); resetForms(); close(); };
  const saveMoney = () => { const amount=Number(moneyForm.amount); if(!moneyForm.description.trim()||amount<=0) return; setData(p=>({...p,finance:[{id:id(),...moneyForm,amount},...p.finance]})); resetForms(); close(); };
  const saveAppointment = () => { if(!appointmentForm.customer.trim()||!appointmentForm.service.trim()) return; setData(p=>({...p,appointments:[{id:id(),...appointmentForm},...p.appointments]})); resetForms(); close(); };
  const deleteRecord = (type:Tab, recordId:string) => {
    if(!window.confirm('Excluir este registro?')) return;
    if(type==='estoque') setData(p=>({...p,stock:p.stock.filter(x=>x.id!==recordId),movements:p.movements.filter(x=>x.itemId!==recordId)}));
    if(type==='financeiro') setData(p=>({...p,finance:p.finance.filter(x=>x.id!==recordId)}));
    if(type==='agenda') setData(p=>({...p,appointments:p.appointments.filter(x=>x.id!==recordId)}));
  };
  const tabs = [{id:'estoque' as const,label:'Estoque',icon:Package},{id:'financeiro' as const,label:'Financeiro',icon:Wallet},{id:'agenda' as const,label:'Agenda',icon:CalendarDays}];
  const newLabel = tab==='estoque'?'Produto ou movimentação':tab==='financeiro'?'Lançamento':'Agendamento';
  const title = tab==='estoque'?'Controle de estoque':tab==='financeiro'?'Financeiro do estúdio':'Agenda de serviços';
  return <div className="space-y-7">
    <section className="rounded-2xl border border-slate-800 bg-gradient-to-br from-[#172231] via-[#101720] to-[#0B0F14] p-6 sm:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E5B85C]">Operação do estúdio • Ferramentas locais</p>
      <h1 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">Estoque, financeiro e agenda</h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">Organize materiais, registre entradas e saídas, acompanhe receitas e despesas e programe atendimentos. Os registros são salvos neste navegador.</p>
    </section>
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {[{label:'Itens cadastrados',value:data.stock.length},{label:'Estoque baixo',value:lowStock.length},{label:'Resultado recebido',value:brl(balances.result)},{label:'Próximos atendimentos',value:data.appointments.filter(a=>a.date>=today()&&!['Concluído','Cancelado'].includes(a.status)).length}].map(x=><div key={x.label} className="rounded-xl border border-slate-800 bg-[#111720] p-4"><p className="text-2xl font-extrabold text-white">{x.value}</p><p className="mt-1 text-xs text-slate-500">{x.label}</p></div>)}
    </div>
    <section className="rounded-xl border border-slate-800 bg-[#111720] p-4">
      <div className="flex flex-wrap gap-2">{tabs.map(t=><button key={t.id} onClick={()=>{setTab(t.id);setQuery('');setShowForm(false);}} className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold ${tab===t.id?'border-[#E5B85C] bg-[#E5B85C] text-[#111318]':'border-slate-700 text-slate-300 hover:text-white'}`}><t.icon size={16}/>{t.label}</button>)}</div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row"><div className="relative flex-1"><Search size={16} className="absolute left-3 top-3 text-slate-500"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar..." className={field+' pl-9'}/></div><button onClick={()=>setShowForm(true)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#E5B85C] px-4 py-2.5 text-sm font-bold text-[#111318]"><Plus size={16}/> Novo {newLabel}</button></div>
      {showForm && <div className="mt-4 rounded-xl border border-slate-700 bg-[#0D131C] p-4">
        <h2 className="mb-4 font-bold text-white">Novo registro</h2>
        {tab==='estoque' && <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"><select className={field} value={stockForm.category} onChange={e=>setStockForm(p=>({...p,category:e.target.value}))}>{['Químico','Microfibra','Boina','Acessório','EPI','Equipamento','Outro'].map(x=><option key={x}>{x}</option>)}</select><input className={field} placeholder="Nome do item *" value={stockForm.name} onChange={e=>setStockForm(p=>({...p,name:e.target.value}))}/><input className={field} placeholder="Unidade (un, ml, L, kg)" value={stockForm.unit} onChange={e=>setStockForm(p=>({...p,unit:e.target.value}))}/><input className={field} type="number" min="0" placeholder="Saldo inicial" value={stockForm.quantity} onChange={e=>setStockForm(p=>({...p,quantity:e.target.value}))}/><input className={field} type="number" min="0" placeholder="Estoque mínimo" value={stockForm.min} onChange={e=>setStockForm(p=>({...p,min:e.target.value}))}/><input className={field} type="number" min="0" step="0.01" placeholder="Custo unitário (R$)" value={stockForm.cost} onChange={e=>setStockForm(p=>({...p,cost:e.target.value}))}/></div><button onClick={saveStock} className="rounded-lg bg-[#E5B85C] px-4 py-2 font-bold text-[#111318]">Salvar produto</button>
          <div className="border-t border-slate-800 pt-4"><p className="mb-3 text-sm font-semibold text-slate-300">Ou registrar movimentação de item existente</p><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><select className={field} value={moveForm.itemId} onChange={e=>setMoveForm(p=>({...p,itemId:e.target.value}))}><option value="">Selecione o item</option>{data.stock.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select><select className={field} value={moveForm.kind} onChange={e=>setMoveForm(p=>({...p,kind:e.target.value as StockMove['kind']}))}><option>Entrada</option><option>Saída</option></select><input className={field} type="number" min="0.001" step="0.001" placeholder="Quantidade" value={moveForm.quantity} onChange={e=>setMoveForm(p=>({...p,quantity:e.target.value}))}/><input className={field} type="date" value={moveForm.date} onChange={e=>setMoveForm(p=>({...p,date:e.target.value}))}/><input className={field+' sm:col-span-2'} placeholder="Motivo / observação" value={moveForm.note} onChange={e=>setMoveForm(p=>({...p,note:e.target.value}))}/><button onClick={saveMove} className="rounded-lg border border-[#E5B85C] px-4 py-2 font-bold text-[#E5B85C]">Registrar movimentação</button></div></div>
        </div>}
        {tab==='financeiro' && <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"><select className={field} value={moneyForm.kind} onChange={e=>setMoneyForm(p=>({...p,kind:e.target.value as MoneyEntry['kind']}))}><option>Receita</option><option>Despesa</option></select><select className={field} value={moneyForm.category} onChange={e=>setMoneyForm(p=>({...p,category:e.target.value}))}>{(moneyForm.kind==='Receita'?['Serviços','Venda de produtos','Sinal','Outros']:['Produtos','Aluguel','Energia e água','Manutenção','Marketing','Impostos e taxas','Outros']).map(x=><option key={x}>{x}</option>)}</select><input className={field} placeholder="Descrição *" value={moneyForm.description} onChange={e=>setMoneyForm(p=>({...p,description:e.target.value}))}/><input className={field} type="number" min="0.01" step="0.01" placeholder="Valor (R$)" value={moneyForm.amount} onChange={e=>setMoneyForm(p=>({...p,amount:e.target.value}))}/><input className={field} type="date" value={moneyForm.date} onChange={e=>setMoneyForm(p=>({...p,date:e.target.value}))}/><label className="flex items-center gap-2 text-sm text-slate-300"><input type="checkbox" checked={moneyForm.paid} onChange={e=>setMoneyForm(p=>({...p,paid:e.target.checked}))} className="accent-[#E5B85C]"/> Já recebido / pago</label><button onClick={saveMoney} className="rounded-lg bg-[#E5B85C] px-4 py-2 font-bold text-[#111318] sm:col-span-2 lg:col-span-3">Salvar lançamento</button></div>}
        {tab==='agenda' && <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"><input className={field} placeholder="Nome do cliente *" value={appointmentForm.customer} onChange={e=>setAppointmentForm(p=>({...p,customer:e.target.value}))}/><input className={field} placeholder="Telefone / WhatsApp" value={appointmentForm.phone} onChange={e=>setAppointmentForm(p=>({...p,phone:e.target.value}))}/><input className={field} placeholder="Veículo / placa" value={appointmentForm.vehicle} onChange={e=>setAppointmentForm(p=>({...p,vehicle:e.target.value}))}/><input className={field} placeholder="Serviço *" value={appointmentForm.service} onChange={e=>setAppointmentForm(p=>({...p,service:e.target.value}))}/><input className={field} type="date" value={appointmentForm.date} onChange={e=>setAppointmentForm(p=>({...p,date:e.target.value}))}/><input className={field} type="time" value={appointmentForm.time} onChange={e=>setAppointmentForm(p=>({...p,time:e.target.value}))}/><select className={field} value={appointmentForm.status} onChange={e=>setAppointmentForm(p=>({...p,status:e.target.value as Appointment['status']}))}>{['Agendado','Confirmado','Em andamento','Concluído','Cancelado'].map(x=><option key={x}>{x}</option>)}</select><input className={field+' sm:col-span-2'} placeholder="Observações" value={appointmentForm.notes} onChange={e=>setAppointmentForm(p=>({...p,notes:e.target.value}))}/><button onClick={saveAppointment} className="rounded-lg bg-[#E5B85C] px-4 py-2 font-bold text-[#111318] sm:col-span-2 lg:col-span-3">Salvar agendamento</button></div>}
        <button onClick={()=>{close();resetForms();}} className="mt-3 text-xs text-slate-500 hover:text-white">Fechar formulário</button>
      </div>}
      <div className="mt-5 space-y-3">
        {tab==='estoque' && <>
          {lowStock.length>0&&<div className="flex items-start gap-2 rounded-lg border border-amber-900/50 bg-amber-950/20 p-3 text-xs text-amber-100"><AlertTriangle size={16}/> {lowStock.length} item(ns) no limite ou abaixo do estoque mínimo.</div>}
          {filteredStock.map(x=><article key={x.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-800 bg-[#0B0F14] p-4"><div><h3 className="font-bold text-white">{x.name}</h3><p className="mt-1 text-xs text-slate-400">{x.category} · {x.cost?brl(x.cost)+' / '+x.unit:'Custo não informado'}</p><p className="mt-1 text-xs text-slate-500">Saldo: <strong className={x.balance<=x.min?'text-amber-400':'text-emerald-400'}>{x.balance} {x.unit}</strong> · Mínimo: {x.min} {x.unit}</p></div><button onClick={()=>deleteRecord('estoque',x.id)} aria-label="Excluir item" className="rounded-lg p-2 text-slate-500 hover:text-red-400"><Trash2 size={16}/></button></article>)}
          <h3 className="pt-3 text-sm font-bold text-white">Movimentações recentes</h3>
          {data.movements.slice(0,12).map(m=><div key={m.id} className="flex flex-wrap justify-between gap-2 border-b border-slate-800 py-2 text-xs"><span className="text-slate-300">{m.kind} · {data.stock.find(x=>x.id===m.itemId)?.name||'Item removido'} · {m.quantity}</span><span className="text-slate-500">{m.date} {m.note&&'· '+m.note}</span></div>)}
        </>}
        {tab==='financeiro' && <>
          <div className="grid gap-3 sm:grid-cols-3">{[{label:'Receitas recebidas',value:brl(balances.income),icon:TrendingUp},{label:'Despesas pagas',value:brl(balances.expense),icon:TrendingDown},{label:'Resultado realizado',value:brl(balances.result),icon:Wallet}].map(x=><div key={x.label} className="rounded-lg border border-slate-800 bg-[#0B0F14] p-3"><p className="text-xs text-slate-500">{x.label}</p><p className="mt-1 text-lg font-bold text-white">{x.value}</p></div>)}</div>
          {filteredFinance.map(x=><article key={x.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-800 bg-[#0B0F14] p-4"><div><h3 className="font-bold text-white">{x.description}</h3><p className="mt-1 text-xs text-slate-400">{x.kind} · {x.category} · {x.date} · {x.paid?'Pago/recebido':'Pendente'}</p></div><div className="flex items-center gap-3"><strong className={x.kind==='Receita'?'text-emerald-400':'text-red-400'}>{x.kind==='Despesa'?'- ':''}{brl(x.amount)}</strong><button onClick={()=>deleteRecord('financeiro',x.id)} aria-label="Excluir lançamento" className="text-slate-500 hover:text-red-400"><Trash2 size={16}/></button></div></article>)}
          <p className="text-xs text-slate-500">Valores pendentes não entram no resultado realizado. Este controle é gerencial e não substitui escrituração contábil ou apuração tributária.</p>
        </>}
        {tab==='agenda' && filteredAppointments.sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time)).map(x=><article key={x.id} className="rounded-lg border border-slate-800 bg-[#0B0F14] p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="font-bold text-white">{x.customer} · {x.service}</h3><p className="mt-1 text-xs text-slate-400">{x.date} às {x.time} · {x.vehicle||'Veículo não informado'} · {x.phone||'Sem telefone'}</p>{x.notes&&<p className="mt-1 text-xs text-slate-500">{x.notes}</p>}</div><button onClick={()=>deleteRecord('agenda',x.id)} aria-label="Excluir agendamento" className="text-slate-500 hover:text-red-400"><Trash2 size={16}/></button></div><div className="mt-3"><select className={field+' max-w-56'} value={x.status} onChange={e=>setData(p=>({...p,appointments:p.appointments.map(a=>a.id===x.id?{...a,status:e.target.value as Appointment['status']}:a)}))}>{['Agendado','Confirmado','Em andamento','Concluído','Cancelado'].map(s=><option key={s}>{s}</option>)}</select></div></article>)}
        {((tab==='estoque'&&filteredStock.length===0)||(tab==='financeiro'&&filteredFinance.length===0)||(tab==='agenda'&&filteredAppointments.length===0))&&<div className="rounded-lg border border-dashed border-slate-700 p-8 text-center text-sm text-slate-500">Nenhum registro encontrado. Cadastre o primeiro usando o botão acima.</div>}
      </div>
    </section>
    <p className="text-xs leading-relaxed text-slate-500">Os dados ficam no localStorage deste navegador e dispositivo. Não há sincronização, controle de acesso, backup automático ou integração bancária. Faça cópias externas dos registros importantes.</p>
  </div>;
};
