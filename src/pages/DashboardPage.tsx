import React from 'react';
import {
  Play,
  Bookmark,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import {
  Course,
  DemoStudentProfile,
  LearningHistoryItem,
  PageView,
  QuizAttemptRecord,
} from '../types/academy';
import {
  calculateCourseProgress,
  calculateQuizStats,
  getAllLessons,
} from '../utils/academyLogic';

interface DashboardPageProps {
  courses: Course[];
  completedLessonIds: string[];
  favoriteCourseIds: string[];
  favoriteLessonIds: string[];
  lastVisitedLessonId: string | null;
  quizAttempts: QuizAttemptRecord[];
  learningHistory: LearningHistoryItem[];
  studentProfile: DemoStudentProfile;
  onNavigate: (page: PageView) => void;
  onOpenLesson: (courseId: string, lessonId: string) => void;
  onSelectCourse: (courseId: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  courses,
  completedLessonIds,
  favoriteCourseIds,
  favoriteLessonIds,
  lastVisitedLessonId,
  quizAttempts,
  learningHistory,
  studentProfile,
  onNavigate,
  onOpenLesson,
  onSelectCourse,
}) => {
  const allLessons = getAllLessons(courses);
  const completedSet = new Set(completedLessonIds);

  const resumeLesson =
    allLessons.find((l) => l.id === lastVisitedLessonId) ||
    allLessons.find((l) => !completedSet.has(l.id)) ||
    allLessons[0];

  const resumeCourse = courses.find((c) => c.id === resumeLesson?.courseId);

  const quizStats = calculateQuizStats(quizAttempts);

  const favoriteCourses = courses.filter((c) => favoriteCourseIds.includes(c.id));
  const favoriteLessons = allLessons.filter((l) => favoriteLessonIds.includes(l.id));

  const weeklyProgressPercent = Math.min(
    100,
    Math.round(
      (completedLessonIds.length / Math.max(1, studentProfile.weeklyGoalLessons)) * 100
    )
  );

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="text-[#E5B85C] font-semibold">Painel do Aluno</span>
            <span aria-hidden="true">·</span>
            <span>{studentProfile.displayName}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#38BDF8]">{studentProfile.experienceLevel}</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
            Central de Estudos e Desempenho Técnico
          </h1>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onNavigate('profile')}
            className="px-4 py-2 text-xs font-semibold bg-[#161F2C] text-slate-200 border border-slate-700 rounded-lg hover:bg-[#1E293B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Ver Perfil Demonstrativo
          </button>
          <button
            type="button"
            onClick={() => onNavigate('courses')}
            className="px-4 py-2 text-xs font-semibold bg-[#E5B85C] text-[#111318] rounded-lg hover:bg-[#eab308] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Catálogo de Cursos
          </button>
        </div>
      </div>

      {/* KPI Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#111720] border border-slate-800 rounded-xl p-5">
          <p className="text-xs text-slate-400 mb-1">Aulas Concluídas</p>
          <p className="font-mono text-2xl font-bold text-white tabular-nums">
            {completedLessonIds.length} / {allLessons.length}
          </p>
          <p className="text-xs text-emerald-400 mt-1 font-mono tabular-nums">
            Meta semanal: {studentProfile.weeklyGoalLessons} aulas ({weeklyProgressPercent}%)
          </p>
        </div>

        <div className="bg-[#111720] border border-slate-800 rounded-xl p-5">
          <p className="text-xs text-slate-400 mb-1">Média nas Avaliações</p>
          <p className="font-mono text-2xl font-bold text-[#38BDF8] tabular-nums">
            {quizStats.averageScore}%
          </p>
          <p className="text-xs text-slate-400 mt-1 font-mono tabular-nums">
            {quizStats.passedCount} de {quizStats.totalAttempts} aprovadas
          </p>
        </div>

        <div className="bg-[#111720] border border-slate-800 rounded-xl p-5">
          <p className="text-xs text-slate-400 mb-1">Itens Favoritados</p>
          <p className="font-mono text-2xl font-bold text-[#E5B85C] tabular-nums">
            {favoriteCourses.length + favoriteLessons.length}
          </p>
          <p className="text-xs text-slate-400 mt-1 font-mono tabular-nums">
            {favoriteCourses.length} cursos · {favoriteLessons.length} aulas
          </p>
        </div>

        <div className="bg-[#111720] border border-slate-800 rounded-xl p-5">
          <p className="text-xs text-slate-400 mb-1">Especialidade em Foco</p>
          <p className="text-base font-bold text-white truncate mt-1">
            {studentProfile.focusArea}
          </p>
          <p className="text-xs text-slate-400 mt-1 truncate">
            {studentProfile.studioType}
          </p>
        </div>
      </div>

      {/* Continue Studying Banner + Quick Course Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Resume Active Lesson */}
        <div className="lg:col-span-7 bg-gradient-to-br from-[#131C27] to-[#0E131B] border border-slate-800 rounded-xl p-6 flex flex-col justify-between space-y-6">
          {resumeLesson && resumeCourse ? (
            <>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="text-[#E5B85C] font-semibold">Retomar Estudo Imediato</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">{resumeCourse.code}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{resumeLesson.durationMinutes} min</span>
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
                  {resumeLesson.title}
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {resumeLesson.summary}
                </p>
                <p className="text-xs text-slate-400">
                  Curso: <strong className="text-slate-200">{resumeCourse.title}</strong>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onOpenLesson(resumeCourse.id, resumeLesson.id)}
                  className="px-5 py-2.5 text-xs font-bold bg-[#E5B85C] text-[#111318] rounded-lg hover:bg-[#eab308] transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Ir para esta Aula</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('quizzes')}
                  className="px-4 py-2.5 text-xs font-semibold bg-[#161F2C] text-slate-200 border border-slate-700 rounded-lg hover:bg-[#1E293B] transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <ClipboardCheck className="w-4 h-4 text-[#38BDF8]" />
                  <span>Realizar Avaliação</span>
                </button>
              </div>
            </>
          ) : null}
        </div>

        {/* Right: Favorites Quick Access */}
        <div className="lg:col-span-5 bg-[#111720] border border-slate-800 rounded-xl p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display text-base font-bold text-white flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-[#E5B85C]" />
                <span>Seus Favoritos Salvos</span>
              </h2>
              <span className="text-xs text-slate-400 font-mono tabular-nums">
                {favoriteCourses.length + favoriteLessons.length} itens
              </span>
            </div>

            {favoriteCourses.length === 0 && favoriteLessons.length === 0 ? (
              <div className="py-8 text-center border border-dashed border-slate-800 rounded-lg px-4">
                <p className="text-xs text-slate-400 mb-3">
                  Você ainda não marcou cursos ou aulas como favoritos.
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('courses')}
                  className="px-3 py-1.5 text-xs font-semibold bg-[#161F2C] text-[#E5B85C] rounded-lg border border-slate-700 cursor-pointer"
                >
                  Explorar Cursos
                </button>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                {favoriteCourses.map((course) => (
                  <button
                    key={course.id}
                    type="button"
                    onClick={() => onSelectCourse(course.id)}
                    className="w-full text-left p-3 rounded-lg bg-[#0B0F14] hover:bg-[#161F2C] border border-slate-800/80 transition-colors flex items-center justify-between gap-3 cursor-pointer"
                  >
                    <div className="min-w-0">
                      <p className="text-[11px] text-[#E5B85C] font-mono">
                        Curso Favorito · {course.code}
                      </p>
                      <p className="text-xs font-semibold text-slate-100 truncate">
                        {course.title}
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  </button>
                ))}

                {favoriteLessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    type="button"
                    onClick={() => onOpenLesson(lesson.courseId, lesson.id)}
                    className="w-full text-left p-3 rounded-lg bg-[#0B0F14] hover:bg-[#161F2C] border border-slate-800/80 transition-colors flex items-center justify-between gap-3 cursor-pointer"
                  >
                    <div className="min-w-0">
                      <p className="text-[11px] text-[#38BDF8] font-mono">
                        Aula Favorita · {lesson.durationMinutes} min
                      </p>
                      <p className="text-xs font-semibold text-slate-100 truncate">
                        {lesson.title}
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Course Progress Overview & Recent History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Progress by Course */}
        <div className="lg:col-span-7 bg-[#111720] border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#38BDF8]" />
              <span>Andamento por Curso</span>
            </h2>
            <button
              type="button"
              onClick={() => onNavigate('progress')}
              className="text-xs font-semibold text-[#E5B85C] hover:underline cursor-pointer"
            >
              Ver relatório completo
            </button>
          </div>

          <div className="space-y-3.5">
            {courses.slice(0, 6).map((course) => {
              const stats = calculateCourseProgress(course, completedLessonIds);
              return (
                <div
                  key={course.id}
                  className="p-3.5 rounded-lg bg-[#0B0F14] border border-slate-800/80 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectCourse(course.id)}
                      className="text-xs font-semibold text-slate-100 hover:text-[#E5B85C] text-left truncate cursor-pointer"
                    >
                      <span className="font-mono text-[#E5B85C] mr-2">{course.code}</span>
                      {course.title}
                    </button>
                    <span className="text-xs font-mono text-slate-300 tabular-nums shrink-0">
                      {stats.completedCount}/{stats.totalCount} ({stats.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#111720] rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        stats.percentage === 100 ? 'bg-emerald-400' : 'bg-[#38BDF8]'
                      }`}
                      style={{ width: `${stats.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Learning History Feed */}
        <div className="lg:col-span-5 bg-[#111720] border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#E5B85C]" />
              <span>Histórico Recente de Aprendizagem</span>
            </h2>
          </div>

          {learningHistory.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">
              Nenhuma atividade registrada ainda. Conclua uma aula ou avaliação para iniciar seu histórico.
            </p>
          ) : (
            <div className="space-y-3">
              {learningHistory.slice(0, 6).map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-lg bg-[#0B0F14] border border-slate-800/80 flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-100 leading-snug">
                      {item.title}
                    </p>
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400 mt-1">
                      <span>{item.subtitle}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">
                        {new Date(item.timestamp).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
