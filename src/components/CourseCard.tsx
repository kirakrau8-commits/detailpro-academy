import React from 'react';
import { Bookmark, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Course } from '../types/academy';
import { calculateCourseProgress } from '../utils/academyLogic';

interface CourseCardProps {
  course: Course;
  completedLessonIds: string[];
  isFavorite: boolean;
  onToggleFavorite: (courseId: string) => void;
  onSelectCourse: (courseId: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  completedLessonIds,
  isFavorite,
  onToggleFavorite,
  onSelectCourse,
}) => {
  const progress = calculateCourseProgress(course, completedLessonIds);
  const isCompleted = progress.totalCount > 0 && progress.completedCount === progress.totalCount;

  return (
    <article className="bg-[#111720] border border-slate-800/90 hover:border-slate-700 rounded-xl p-6 flex flex-col justify-between transition-colors">
      <div>
        {/* Top Metadata Line (Zero-Pill discipline: clean unboxed text with separators) */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
            <span className="font-mono font-semibold text-[#E5B85C]">{course.code}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#38BDF8] font-medium">{course.level}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{course.estimatedHours}h</span>
          </div>

          <button
            type="button"
            onClick={() => onToggleFavorite(course.id)}
            aria-label={
              isFavorite
                ? `Remover ${course.title} dos favoritos`
                : `Adicionar ${course.title} aos favoritos`
            }
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              isFavorite
                ? 'border-[#E5B85C]/50 bg-[#E5B85C]/10 text-[#E5B85C]'
                : 'border-slate-800 bg-[#0B0F14] text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bookmark className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Category Kicker & Title */}
        <p className="text-xs text-slate-400 mb-1">{course.category}</p>
        <h3 className="text-lg font-bold text-slate-100 leading-snug mb-2.5">
          {course.title}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed mb-5">
          {course.shortDescription}
        </p>
      </div>

      <div>
        {/* Progress Section */}
        <div className="pt-4 border-t border-slate-800/80 mb-4">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-400 font-mono tabular-nums">
              {progress.completedCount}/{progress.totalCount} aulas concluídas
            </span>
            <span
              className={`font-mono font-semibold tabular-nums inline-flex items-center gap-1 ${
                isCompleted ? 'text-emerald-400' : 'text-slate-200'
              }`}
            >
              {isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
              {progress.percentage}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#0B0F14] rounded-full overflow-hidden border border-slate-800/60">
            <div
              className={`h-full transition-all duration-200 ${
                isCompleted ? 'bg-emerald-400' : 'bg-[#38BDF8]'
              }`}
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={() => onSelectCourse(course.id)}
          className="w-full py-2.5 px-4 text-xs font-semibold rounded-lg bg-[#161F2C] hover:bg-[#1E293B] text-slate-100 border border-slate-700/80 transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
        >
          <span>
            {progress.completedCount > 0 ? 'Continuar Curso' : 'Acessar Módulos e Aulas'}
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-[#E5B85C]" />
        </button>
      </div>
    </article>
  );
};
