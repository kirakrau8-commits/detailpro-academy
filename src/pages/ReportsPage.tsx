import React, { useMemo, useState } from 'react';
import { BarChart3, Download, TrendingUp, Package, ClipboardList, CircleDollarSign } from 'lucide-react';

type MoneyEntry = { id:string; kind:'Receita'|'Despesa'; category:string; description:string; amount:number; date:string; paid:boolean };
type StockItem = { id:string; name:string; unit:string; quantity:number; min:number; cost:number };
type StockMove = { id:string; itemId:string; kind:'Entrada'|'Saída'; quantity:number; date:string };
type Appointment = { id:string; customer:string; service:string; date:string; status:string };
type OperationsData = { stock:StockItem[]; movements:StockMove[]; finance:MoneyEntry[]; appointments:Appointment[] };
type WorkOrder = { id:string; service:string; date:string; status:string; value:number };
type CRMData = { orders:WorkOrder[] };
type Period = 'month'|'quarter'|'year'|'all';
const OPS_KEY='estetica_detalhamento_operations_v1';
const CRM_KEY='estetica_detalhamento_crm_v1';
const brl=(n:number)=>n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const read=<T,>(key:string,fallback:T):T=>{try{const raw=localStorage.getItem(key);return raw?{...fallback,...JSON.parse(raw)}:fallback;}catch{return fallback;}};
const monthKey=(date:string)=>date.slice(0,7);
const monthLabel=(key:string)=>{const [y,m]=key.split('-').map(Number);return new Date(y,m-1,1).toLocaleDateString('pt-BR',{month:'short',year:'2-digit'});};
const field='rounded-lg border border-slate-700 bg-[#0B0F14] px-3 py-2 text-sm text-white';
export const ReportsPage:React.FC=()=>{
 const [period,setPeriod]=useState<Period>('quarter');
 const ops=useMemo(()=>read<OperationsData>(OPS_KEY,{stock:[],movements:[],finance:[],appointments:[]}),[]);
 const crm=useMemo(()=>read<CRMData>(CRM_KEY,{orders:[]}),[]);
 const now=new Date(); const start=new Date(now.getFullYear(),now.getMonth(),1);
 if(period==='quarter')start.setMonth(start.getMonth()-2);
 if(period==='year')start.setMonth(0);
 if(period==='all')start.setFullYear(2000,0,1);
 const from=start.toISOString().slice(0,10);
 const inRange=(d:string)=>d>=from&&d<=now.toISOString().slice(0,10);
 const finance=ops.finance.filter(x=>inRange(x.date)&&x.paid);
 const orders=crm.orders.filter(x=>inRange(x.date)&&x.status==='Concluído');
 const income=finance.filter(x=>x.kind==='Receita').reduce((s,x)=>s+x.amount,0);
 const expenses=finance.filter(x=>x.kind==='Despesa').reduce((s,x)=>s+x.amount,0);
 const orderRevenue=orders.reduce((s,x)=>s+x.value,0);
 const average=orders.length?orderRevenue/orders.length:0;
 const byMonth=useMemo(()=>{const map=new Map<string,{income:number;expenses:number}>();finance.forEach(x=>{const k=monthKey(x.date);const v=map.get(k)||{income:0,expenses:0};v[x.kind==='Receita'?'income':'expenses']+=x.amount;map.set(k,v);});return [...map.entries()].sort((a,b)=>a[0].localeCompare(b[0]));},[ops.finance,from]);
 const byService=useMemo(()=>{const map=new Map<string,{count:number;value:number}>();orders.forEach(x=>{const v=map.get(x.service)||{count:0,value:0};v.count++;v.value+=x.value;map.set(x.service,v);});return [...map.entries()].sort((a,b)=>b[1].count-a[1].count);},[crm.orders,from]);
 const stock=ops.stock.map(item=>({...item,balance:ops.movements.filter(m=>m.itemId===item.id).reduce((s,m)=>s+(m.kind==='Entrada'?m.quantity:-m.quantity),item.quantity)}));
 const stockValue=stock.reduce((s,x)=>s+x.balance*x.cost,0);
 const exits=ops.movements.filter(m=>m.kind==='Saída'&&inRange(m.date)).reduce((map,m)=>{const item=ops.stock.find(x=>x.id===m.itemId);if(item)map.set(item.name,(map.get(item.name)||0)+m.quantity);return map;},new Map<string,number>());
 const maxBar=Math.max(1,...byMonth.flatMap(([,v])=>[v.income,v.expenses]));
 const exportCsv=()=>{const rows=[['Indicador','Valor'],['Receitas recebidas',income.toFixed(2)],['Despesas pagas',expenses.toFixed(2)],['Resultado financeiro', (income-expenses).toFixed(2)],['Receita de ordens concluídas',orderRevenue.toFixed(2)],['Ticket médio de ordem',average.toFixed(2)],['Ordens concluídas',String(orders.length)],['Valor estimado do estoque',stockValue.toFixed(2)],...byService.map(([name,v])=>['Serviço: '+name,String(v.count)+' ordens; R$ '+v.value.toFixed(2)]),...([...exits.entries()].map(([name,q])=>['Saídas registradas: '+name,String(q)]))];const csv=rows.map(r=>r.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(';')).join('\n');const url=URL.createObjectURL(new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='relatorio-estetica-detalhamento.csv';a.click();URL.revokeObjectURL(url);};
 const card=(label:string,value:string,detail:string,Icon:React.ElementType)=><div className="rounded-xl border border-slate-800 bg-[#111720] p-4"><div className="flex items-center justify-between"><span className="text-xs text-slate-400">{label}</span><Icon size={17} className="text-[#E5B85C]"/></div><p className="mt-3 text-xl font-extrabold text-white">{value}</p><p className="mt-1 text-xs text-slate-500">{detail}</p></div>;
 return <div className="space-y-7">
  <section className="rounded-2xl border border-slate-800 bg-gradient-to-br from-[#172231] via-[#101720] to-[#0B0F14] p-6 sm:p-8"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E5B85C]">Gestão baseada nos seus registros</p><div className="flex flex-wrap items-end justify-between gap-4"><div><h1 className="mt-3 text-3xl font-extrabold text-white">Relatórios e indicadores</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">Visão gerencial de receitas, despesas, ordens concluídas, serviços e estoque. Os números dependem dos lançamentos feitos no CRM e em Operações.</p></div><button onClick={exportCsv} className="inline-flex items-center gap-2 rounded-lg bg-[#E5B85C] px-4 py-2.5 text-sm font-bold text-[#111318]"><Download size={16}/> Exportar CSV</button></div></section>
  <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="font-bold text-white">Período de análise</h2><p className="text-xs text-slate-500">A partir do primeiro dia do período selecionado até hoje.</p></div><select value={period} onChange={e=>setPeriod(e.target.value as Period)} className={field}><option value="month">Este mês</option><option value="quarter">Últimos 3 meses</option><option value="year">Este ano</option><option value="all">Todo o histórico</option></select></div>
  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{card('Receitas recebidas',brl(income),'Lançamentos pagos no Financeiro',TrendingUp)}{card('Despesas pagas',brl(expenses),'Lançamentos pagos no Financeiro',CircleDollarSign)}{card('Resultado realizado',brl(income-expenses),'Receitas menos despesas pagas',BarChart3)}{card('Ticket médio',brl(average),orders.length+' ordens concluídas no CRM',ClipboardList)}</div>
  <section className="rounded-xl border border-slate-800 bg-[#111720] p-5"><h2 className="font-bold text-white">Receitas e despesas por mês</h2><p className="mb-5 mt-1 text-xs text-slate-500">Somente lançamentos pagos registrados no módulo Financeiro.</p>{byMonth.length===0?<p className="text-sm text-slate-500">Sem lançamentos no período selecionado.</p>:<div className="space-y-4">{byMonth.map(([month,v])=><div key={month}><div className="mb-2 flex justify-between text-xs text-slate-300"><strong>{monthLabel(month)}</strong><span>Entradas {brl(v.income)} · Saídas {brl(v.expenses)}</span></div><div className="space-y-1"><div className="h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-emerald-500" style={{width:(v.income/maxBar*100)+'%'}}/></div><div className="h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-rose-500" style={{width:(v.expenses/maxBar*100)+'%'}}/></div></div></div>)}</div>}<div className="mt-4 flex gap-4 text-xs text-slate-400"><span>● Receita</span><span className="text-rose-400">● Despesa</span></div></section>
  <div className="grid gap-4 lg:grid-cols-2"><section className="rounded-xl border border-slate-800 bg-[#111720] p-5"><h2 className="font-bold text-white">Serviços mais realizados</h2><p className="mb-4 mt-1 text-xs text-slate-500">Ordens marcadas como Concluído no CRM.</p>{byService.length===0?<p className="text-sm text-slate-500">Nenhuma ordem concluída no período.</p>:<div className="space-y-3">{byService.map(([name,v])=><div key={name} className="flex items-center justify-between gap-3 border-b border-slate-800 pb-3"><div><p className="text-sm font-semibold text-white">{name}</p><p className="text-xs text-slate-500">{v.count} ordem(ns)</p></div><strong className="text-sm text-[#E5B85C]">{brl(v.value)}</strong></div>)}</div>}</section>
  <section className="rounded-xl border border-slate-800 bg-[#111720] p-5"><h2 className="font-bold text-white">Estoque e saídas registradas</h2><p className="mb-4 mt-1 text-xs text-slate-500">Valor estimado pelo saldo atual × custo unitário cadastrado.</p><p className="mb-4 text-2xl font-extrabold text-white">{brl(stockValue)}</p>{stock.length===0?<p className="text-sm text-slate-500">Nenhum item cadastrado.</p>:<div className="space-y-2">{stock.map(x=><div key={x.id} className="flex justify-between gap-3 text-sm"><span className="text-slate-300">{x.name} <span className="text-slate-500">({x.balance} {x.unit})</span></span><strong className="text-white">{brl(x.balance*x.cost)}</strong></div>)}</div>}<div className="mt-4 border-t border-slate-800 pt-3"><h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">Saídas registradas no período</h3>{exits.size===0?<p className="text-xs text-slate-500">Nenhuma saída registrada.</p>:[...exits.entries()].map(([name,q])=><p key={name} className="text-xs text-slate-300">{name}: {q}</p>)}</div></section></div>
  <section className="rounded-xl border border-amber-900/40 bg-amber-950/10 p-4 text-xs leading-5 text-amber-100"><strong>Como interpretar:</strong> receita financeira e receita das ordens do CRM são indicadores de fontes diferentes e não são somadas, para evitar dupla contagem. O relatório de serviços considera apenas ordens concluídas. Saídas de estoque são movimentações registradas manualmente, não consumo automático por serviço. Os dados são lidos do armazenamento local deste navegador.</section>
 </div>;
};
export default ReportsPage;
