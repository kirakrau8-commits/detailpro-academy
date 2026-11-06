import React, { useState } from 'react';
import { Search, Bookmark, SlidersHorizontal, PlusCircle } from 'lucide-react';
import { Course, PageView, SkillLevel } from '../types/academy';
import { COURSE_CATEGORIES } from '../data/academyData';
import { filterCourses } from '../utils/academyLogic';
import { CourseCard } from '../components/CourseCard';

interface CoursesPageProps {
  courses: Course[];
  completedLessonIds: string[];
  favoriteCourseIds: string[];
  initialCategoryFilter?: string;
  onToggleFavoriteCourse: (courseId: string) => void;
  onSelectCourse: (courseId: string) => void;
  onNavigate: (page: PageView) => void;
}

const LEVELS: ('Todos' | SkillLevel)[] = [
  'Todos',
  'Iniciante',
  'Intermediário',
  'Avançado',
  'Especialista',
];

export const CoursesPage: React.FC<CoursesPageProps> = ({
  courses,
  completedLessonIds,
  favoriteCourseIds,
  initialCategoryFilter = 'Todas',
  onToggleFavoriteCourse,
  onSelectCourse,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryFilter);
  const [selectedLevel, setSelectedLevel] = useState<string>('Todos');
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const filteredCourses = filterCourses(courses, {
    query: searchQuery,
    category: selectedCategory,
    level: selectedLevel,
    onlyFavorites,
    favoriteCourseIds,
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Todas');
    setSelectedLevel('Todos');
    setOnlyFavorites(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#E5B85C]">
            Catálogo Curricular Completo
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
            Cursos e Trilhas de Especialização
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Explore as 10 áreas oficiais da DetailPro Academy ou filtre por nível de complexidade.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('admin')}
          className="px-4 py-2.5 text-xs font-semibold bg-[#161F2C] text-[#38BDF8] border border-slate-700 rounded-lg hover:bg-[#1E293B] transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Adicionar Novo Curso (Admin)</span>
        </button>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-[#111720] border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <label htmlFor="course-search-input" className="sr-only">
              Buscar cursos ou aulas
            </label>
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3 pointer-events-none" />
            <input
              id="course-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por curso, aula, técnica ou código (ex.: DP-201, vitrificação)..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-[#0B0F14] border border-slate-800 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-[#38BDF8]"
            />
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-4">
            <label htmlFor="category-filter-select" className="sr-only">
              Filtrar por categoria
            </label>
            <select
              id="category-filter-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#0B0F14] border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-[#38BDF8]"
            >
              <option value="Todas">Todas as 10 Categorias</option>
              {COURSE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Favorites Toggle */}
          <div className="md:col-span-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setOnlyFavorites(!onlyFavorites)}
              className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg border transition-colors inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                onlyFavorites
                  ? 'bg-[#E5B85C]/15 border-[#E5B85C] text-[#E5B85C]'
                  : 'bg-[#0B0F14] border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" fill={onlyFavorites ? 'currentColor' : 'none'} />
              <span>Apenas Favoritos</span>
            </button>
          </div>
        </div>

        {/* Segmented Level Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/70">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-400 mr-2 inline-flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Nível:
            </span>
            {LEVELS.map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedLevel === lvl
                    ? 'bg-[#38BDF8] text-[#081018] font-semibold'
                    : 'bg-[#0B0F14] text-slate-400 hover:text-slate-200 border border-slate-800/80'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-400 font-mono tabular-nums">
            Exibindo {filteredCourses.length} de {courses.length} cursos
          </span>
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <div className="bg-[#111720] border border-slate-800 rounded-xl p-10 text-center space-y-3">
          <p className="text-base font-semibold text-white">
            Nenhum curso encontrado com os filtros selecionados.
          </p>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Experimente buscar por outro termo ou limpe os filtros ativos para visualizar todas as 10 trilhas da academia.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-4 py-2 text-xs font-semibold bg-[#E5B85C] text-[#111318] rounded-lg cursor-pointer"
          >
            Limpar Filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCourses.map((course) => (
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
      )}
    </div>
  );
};
