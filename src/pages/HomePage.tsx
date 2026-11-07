import React from 'react';
import {
  ArrowRight,
  BookOpen,
  ShieldCheck,
  Award,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { Course, PageView } from '../types/academy';
import { COURSE_CATEGORIES, GENERATED_IMAGES } from '../data/academyData';
import { CourseCard } from '../components/CourseCard';
import { ResilientImage } from '../components/ResilientImage';

interface HomePageProps {
  courses: Course[];
  completedLessonIds: string[];
  favoriteCourseIds: string[];
  overallPercentage: number;
  completedLessonsCount: number;
  totalLessonsCount: number;
  onNavigate: (page: PageView) => void;
  onSelectCourse: (courseId: string) => void;
  onToggleFavoriteCourse: (courseId: string) => void;
  onSelectCategoryInCourses: (category: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  courses,
  completedLessonIds,
  favoriteCourseIds,
  overallPercentage,
  completedLessonsCount,
  totalLessonsCount,
  onNavigate,
  onSelectCourse,
  onToggleFavoriteCourse,
  onSelectCategoryInCourses,
}) => {
  const featuredCourses = courses.slice(0, 3);

  return (
    <div className="space-y-14">
      {/* Hero Split Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-gradient-to-br from-[#111720] via-[#0F151E] to-[#0B0F14] border border-slate-800/90 rounded-2xl p-6 sm:p-10">
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#E5B85C]">
              Formação Técnica Especializada · Estética Automotiva Profissional
            </p>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white leading-[1.08] tracking-tight">
              Transforme cuidado automotivo em{' '}
              <span className="text-[#E5B85C]">engenharia de superfície.</span>
            </h1>
            <p className="text-base text-slate-300 leading-relaxed max-w-2xl">
              A <strong className="text-white font-semibold">Estética Detalhamento. edu</strong> é uma
              plataforma educacional estruturada em 10 áreas técnicas — da química aplicada e
              lavagem segura à correção micrométrica de verniz, vitrificação cerâmica e gestão
              financeira de estúdios.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('courses')}
              className="px-6 py-3 text-sm font-bold bg-[#E5B85C] text-[#111318] rounded-xl hover:bg-[#eab308] transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Explorar os 10 Cursos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('dashboard')}
              className="px-5 py-3 text-sm font-semibold bg-[#161F2C] text-slate-100 border border-slate-700 rounded-xl hover:bg-[#1E293B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Abrir Painel do Aluno
            </button>
            <button
              type="button"
              onClick={() => onNavigate('crm')}
              className="px-5 py-3 text-sm font-semibold bg-[#161F2C] text-[#E5B85C] border border-slate-700 rounded-xl hover:bg-[#1E293B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Gestão do Estúdio
            </button>
            <button
              type="button"
              onClick={() => onNavigate('inspection')}
              className="px-5 py-3 text-sm font-semibold bg-[#161F2C] text-[#E5B85C] border border-slate-700 rounded-xl hover:bg-[#1E293B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Ficha de Inspeção
            </button>
            <button
              type="button"
              onClick={() => onNavigate('accessories')}
              className="px-5 py-3 text-sm font-semibold bg-[#161F2C] text-[#E5B85C] border border-slate-700 rounded-xl hover:bg-[#1E293B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Guia de Acessórios
            </button>
            <button
              type="button"
              onClick={() => onNavigate('equipment')}
              className="px-5 py-3 text-sm font-semibold bg-[#161F2C] text-[#38BDF8] border border-slate-700 rounded-xl hover:bg-[#1E293B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Guia de Equipamentos
            </button>
            <button
              type="button"
              onClick={() => onNavigate('resources')}
              className="px-5 py-3 text-sm font-semibold bg-[#161F2C] text-[#E5B85C] border border-slate-700 rounded-xl hover:bg-[#1E293B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Biblioteca de PDFs
            </button>
            <button
              type="button"
              onClick={() => onNavigate('calculator')}
              className="px-5 py-3 text-sm font-semibold bg-[#161F2C] text-[#38BDF8] border border-slate-700 rounded-xl hover:bg-[#1E293B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Calculadora de Orçamentos
            </button>
            <button
              type="button"
              onClick={() => onNavigate('procedures')}
              className="px-5 py-3 text-sm font-semibold bg-[#161F2C] text-[#E5B85C] border border-slate-700 rounded-xl hover:bg-[#1E293B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Enciclopédia de Procedimentos
            </button>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400">
            <span>10 Especialidades Técnicas</span>
            <span aria-hidden="true">·</span>
            <span>Química, Diluições e FISPQ</span>
            <span aria-hidden="true">·</span>
            <span>Progresso Salvo Localmente</span>
          </div>
        </div>

        <div className="lg:col-span-5 min-h-[260px] rounded-xl overflow-hidden border border-slate-800/80">
          <ResilientImage
            src={GENERATED_IMAGES.heroStudio}
            alt="Estúdio profissional de estética automotiva com iluminação hexagonal e inspeção de pintura"
            caption="Ambiente técnico de diagnóstico óptico e correção de pintura."
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Full-Width 4-Column KPI Strip */}
      <section
        aria-label="Indicadores da academia"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <div className="bg-[#111720] border border-slate-800/90 rounded-xl p-5">
          <p className="text-xs text-slate-400 mb-1">Áreas de Formação</p>
          <p className="font-mono text-2xl font-bold text-white tabular-nums">
            {COURSE_CATEGORIES.length} Categorias
          </p>
          <p className="text-xs text-[#38BDF8] mt-1">
            Do nível iniciante ao especialista
          </p>
        </div>

        <div className="bg-[#111720] border border-slate-800/90 rounded-xl p-5">
          <p className="text-xs text-slate-400 mb-1">Cursos Disponíveis</p>
          <p className="font-mono text-2xl font-bold text-white tabular-nums">
            {courses.length} Cursos
          </p>
          <p className="text-xs text-slate-400 mt-1 font-mono tabular-nums">
            {totalLessonsCount} aulas técnicas estruturadas
          </p>
        </div>

        <div className="bg-[#111720] border border-slate-800/90 rounded-xl p-5">
          <p className="text-xs text-slate-400 mb-1">Aulas Concluídas</p>
          <p className="font-mono text-2xl font-bold text-[#E5B85C] tabular-nums">
            {completedLessonsCount} / {totalLessonsCount}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Persistência local ativa no navegador
          </p>
        </div>

        <div className="bg-[#111720] border border-slate-800/90 rounded-xl p-5">
          <p className="text-xs text-slate-400 mb-1">Seu Progresso Geral</p>
          <p className="font-mono text-2xl font-bold text-emerald-400 tabular-nums">
            {overallPercentage}%
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Acompanhe no Painel do Aluno
          </p>
        </div>
      </section>

      {/* 10 Technical Categories Matrix */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#38BDF8]">
              Matriz Curricular Oficial
            </p>
            <h2 className="font-display text-2xl font-bold text-white mt-1">
              As 10 Áreas do Detalhamento Profissional
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('courses')}
            className="text-xs font-semibold text-[#E5B85C] hover:underline inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>Ver catálogo completo de cursos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {COURSE_CATEGORIES.map((category, index) => {
            const matchingCourse = courses.find((c) => c.category === category);
            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  if (matchingCourse) {
                    onSelectCourse(matchingCourse.id);
                  } else {
                    onSelectCategoryInCourses(category);
                  }
                }}
                className="group text-left bg-[#111720] hover:bg-[#151D28] border border-slate-800/90 hover:border-slate-700 rounded-xl p-4 flex items-start justify-between gap-4 transition-colors cursor-pointer"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="font-mono font-bold text-[#E5B85C]">
                      {String(index + 1).padStart(2, '0')}.
                    </span>
                    <span>Área Técnica</span>
                    {matchingCourse && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#38BDF8] font-mono">
                          {matchingCourse.code}
                        </span>
                      </>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-[#E5B85C] transition-colors">
                    {category}
                  </h3>
                  {matchingCourse && (
                    <p className="text-xs text-slate-400 line-clamp-1">
                      {matchingCourse.shortDescription}
                    </p>
                  )}
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#E5B85C] shrink-0 mt-1 transition-transform group-hover:translate-x-0.5" />
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#E5B85C]">
              Destaques da Formação
            </p>
            <h2 className="font-display text-2xl font-bold text-white mt-1">
              Trilhas Recomendadas para Iniciar Agora
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('courses')}
            className="px-4 py-2 text-xs font-semibold bg-[#161F2C] text-slate-200 border border-slate-700 rounded-lg hover:bg-[#1E293B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Ver Todos os {courses.length} Cursos
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              completedLessonIds={completedLessonIds}
              isFavorite={favoriteCourseIds.includes(course.id)}
              onToggleFavorite={onToggleFavoriteCourse}
              onSelectCourse={onSelectCourse}
            />
          ))}
        </div>
      </section>

      {/* Methodology Pillars */}
      <section className="bg-[#111720] border border-slate-800/90 rounded-2xl p-6 sm:p-8 space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#38BDF8]">
            Metodologia DetailPro Academy
          </p>
          <h2 className="font-display text-2xl font-bold text-white mt-1">
            Ensino Técnico Baseado em Processos Reais de Estúdio
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-[#161F2C] border border-slate-700/80 flex items-center justify-center text-[#E5B85C]">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              Teoria + Parâmetros + Prática
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Cada aula inclui fundamentação química ou física, parâmetros de diluição e
              temperatura, checklist descargável e exercício prático guiado.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-[#161F2C] border border-slate-700/80 flex items-center justify-center text-[#38BDF8]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              Segurança Operacional e EPIs
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Foco constante na preservação da saúde do profissional (respiradores VO/GA,
              luvas nitrílicas, ergonomia) e na preservação do verniz original do veículo.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-[#161F2C] border border-slate-700/80 flex items-center justify-center text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              Avaliações, Glossário e Expansão
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Valide seu conhecimento nos questionários comentados, consulte a biblioteca
              técnica de insumos e expanda o catálogo na Área Administrativa.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
