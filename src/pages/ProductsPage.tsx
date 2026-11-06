import React, { useState } from 'react';
import { Search, ShieldAlert, Beaker, Wrench } from 'lucide-react';
import { COURSE_CATEGORIES, PRODUCT_LIBRARY } from '../data/academyData';
import { filterProducts } from '../utils/academyLogic';
import { ProductItem } from '../types/academy';

const PRODUCT_TYPES: ('Todos' | ProductItem['type'])[] = [
  'Todos',
  'Químico',
  'Composto Polidor',
  'Coating / Proteção',
  'Equipamento',
];

export const ProductsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('Todas');
  const [typeFilter, setTypeFilter] = useState('Todos');

  const filteredItems = filterProducts(
    PRODUCT_LIBRARY,
    searchQuery,
    stageFilter,
    typeFilter
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#E5B85C]">
          Acervo Técnico de Insumos e Ferramentas (Foco Educacional)
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
          Biblioteca de Produtos, Químicos e Equipamentos
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl">
          Consulte parâmetros de pH, proporções de diluição, compatibilidade de
          substratos e EPIs obrigatórios por etapa do detalhamento automotivo
          (referência técnica baseada no catálogo Vonixx / Voxer).
        </p>
      </div>

      {/* Filters */}
      <div className="bg-[#111720] border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
          <div className="md:col-span-6 relative">
            <label htmlFor="product-search-input" className="sr-only">
              Buscar produto ou equipamento
            </label>
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3 pointer-events-none" />
            <input
              id="product-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nome, função ou superfície (ex.: V-FLOC, couro, ferroso, politriz)..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-[#0B0F14] border border-slate-800 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-[#38BDF8]"
            />
          </div>

          <div className="md:col-span-6">
            <label htmlFor="product-stage-select" className="sr-only">
              Filtrar por etapa técnica
            </label>
            <select
              id="product-stage-select"
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#0B0F14] border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-[#38BDF8]"
            >
              <option value="Todas">Todas as Etapas do Detalhamento</option>
              {COURSE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/70">
          <div className="flex flex-wrap items-center gap-1.5">
            {PRODUCT_TYPES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  typeFilter === t
                    ? 'bg-[#E5B85C] text-[#111318] font-semibold'
                    : 'bg-[#0B0F14] text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-400 font-mono tabular-nums">
            {filteredItems.length} fichas técnicas listadas
          </span>
        </div>
      </div>

      {/* Product Cards Grid */}
      {filteredItems.length === 0 ? (
        <div className="bg-[#111720] border border-slate-800 rounded-xl p-10 text-center space-y-3">
          <p className="text-base font-semibold text-white">
            Nenhum insumo ou equipamento encontrado para a busca atual.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setStageFilter('Todas');
              setTypeFilter('Todos');
            }}
            className="px-4 py-2 text-xs font-semibold bg-[#E5B85C] text-[#111318] rounded-lg cursor-pointer"
          >
            Restaurar Lista Completa
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="bg-[#111720] border border-slate-800/90 rounded-xl p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  <span className="text-[#E5B85C] font-semibold">{item.type}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#38BDF8]">{item.stage}</span>
                  {item.phLevel && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-slate-200">{item.phLevel}</span>
                    </>
                  )}
                </div>

                <h2 className="font-display text-lg font-bold text-white">
                  {item.name}
                </h2>
                <p className="text-xs text-slate-400">{item.category}</p>
                <p className="text-sm text-slate-300 leading-relaxed pt-1">
                  {item.technicalUsage}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <Beaker className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400">Diluição / Uso: </span>
                    <span className="font-mono text-slate-100 tabular-nums">
                      {item.dilutionRatio}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Wrench className="w-4 h-4 text-[#E5B85C] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400">Superfícies indicadas: </span>
                    <span className="text-slate-200">{item.applicationSurface}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400">EPIs recomendados: </span>
                    <span className="text-slate-200">
                      {item.safetyEpi.join(' · ')}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Safety Notice Box */}
      <div className="bg-[#111720] border border-slate-800 rounded-xl p-6 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#E5B85C]">
          Nota de Segurança Química e Conformidade Técnica
        </p>
        <p className="text-xs text-slate-400 leading-relaxed">
          Esta biblioteca possui finalidade exclusivamente didática e técnica para
          formação de profissionais na DetailPro Academy. Fórmulas, diluições e
          recomendações podem ser atualizadas pelos fabricantes. Antes de aplicar
          qualquer produto químico, consulte o rótulo atualizado e a Ficha com Dados de
          Segurança (FDS/FISPQ), realize teste em pequena área discreta e jamais
          misture químicos diferentes.
        </p>
      </div>
    </div>
  );
};
