import React, { useState } from 'react';
import { Search, BookMarked } from 'lucide-react';
import { COURSE_CATEGORIES, GLOSSARY_TERMS } from '../data/academyData';
import { filterGlossaryTerms } from '../utils/academyLogic';

export const GlossaryPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const filteredTerms = filterGlossaryTerms(
    GLOSSARY_TERMS,
    query,
    selectedCategory
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#38BDF8]">
          Vocabulário Técnico Profissional
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
          Glossário da Estética Automotiva
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl">
          Domine a terminologia internacional e nacional utilizada em estúdios de
          detalhamento — de siglas químicas (APC, LSP, SiO2) a defeitos ópticos
          (Swirls, RIDS, Hologramas, High Spots).
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="bg-[#111720] border border-slate-800 rounded-xl p-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-7 relative">
          <label htmlFor="glossary-search-input" className="sr-only">
            Pesquisar termo no glossário
          </label>
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3 pointer-events-none" />
          <input
            id="glossary-search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar termo técnico (ex.: Holograma, Flash Time, Mícron, Clay Bar, RIDS)..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-[#0B0F14] border border-slate-800 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-[#38BDF8]"
          />
        </div>

        <div className="md:col-span-5">
          <label htmlFor="glossary-category-select" className="sr-only">
            Filtrar glossário por área
          </label>
          <select
            id="glossary-category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-[#0B0F14] border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-[#38BDF8]"
          >
            <option value="Todas">Todas as Áreas Técnicas ({GLOSSARY_TERMS.length} termos)</option>
            {COURSE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Terms Grid */}
      {filteredTerms.length === 0 ? (
        <div className="bg-[#111720] border border-slate-800 rounded-xl p-10 text-center space-y-3">
          <p className="text-base font-semibold text-white">
            Nenhum termo encontrado para &ldquo;{query}&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setSelectedCategory('Todas');
            }}
            className="px-4 py-2 text-xs font-semibold bg-[#E5B85C] text-[#111318] rounded-lg cursor-pointer"
          >
            Ver Todos os Termos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredTerms.map((item) => (
            <article
              key={item.id}
              className="bg-[#111720] border border-slate-800 rounded-xl p-6 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-[#38BDF8] font-medium">
                    {item.category}
                  </span>
                  <BookMarked className="w-4 h-4 text-[#E5B85C]" />
                </div>

                <h2 className="font-display text-lg font-bold text-[#E5B85C]">
                  {item.term}
                </h2>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {item.definition}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed pt-1">
                  <strong className="text-slate-300">Aplicação no box:</strong>{' '}
                  {item.practicalContext}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
                <span className="text-slate-500">Relacionados:</span>
                {item.relatedTerms.map((rel, idx) => (
                  <React.Fragment key={rel}>
                    {idx > 0 && <span aria-hidden="true">·</span>}
                    <button
                      type="button"
                      onClick={() => setQuery(rel)}
                      className="text-slate-300 hover:text-[#E5B85C] underline-offset-4 hover:underline cursor-pointer"
                    >
                      {rel}
                    </button>
                  </React.Fragment>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
