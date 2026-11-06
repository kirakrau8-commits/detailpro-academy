import React from 'react';
import {
  TrendingUp,
  CheckCircle2,
  Clock,
  Award,
  ArrowRight,
} from 'lucide-react';
import {
  Course,
  LearningHistoryItem,
  QuizAttemptRecord,
} from '../types/academy';
import {
  calculateCourseProgress,
  calculateOverallProgress,
  calculateQuizStats,
} from '../utils/academyLogic';

interface ProgressPageProps {
  courses: Course[];
  completedLessonIds: string[];
  quizAttempts: QuizAttemptRecord[];
  learningHistory: LearningHistoryItem[];
  onSelectCourse: (courseId: string) => void;
}

export const ProgressPage: React.FC<ProgressPageProps> = ({
  courses,
  completedLessonIds,
  quizAttempts,
  learningHistory,
  onSelectCourse,
}) => {
  const overall = calculateOverallProgress(courses, completedLessonIds);
  const quizStats = calculateQuizStats(quizAttempts);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#38BDF8]">
          Relatório Analítico de Evolução
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
          Progresso de Aprendizagem e Histórico
        </h1>
        <p className="text-sm text-slate-400">
          Acompanhe o percentual de conclusão em cada uma das 10 áreas técnicas, horas de estudo acumuladas e histórico cronológico.
        </p>
      </div>

      {/* Summary Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#111720] border border-slate-800 rounded-xl p-5">
          <p className="text-xs text-slate-400 mb-1">Domínio da Plataforma</p>
          <p className="font-mono text-2xl font-bold text-[#E5B85C] tabular-nums">
            {overall.overallPercentage}%
          </p>
          <p className="text-xs text-slate-400 mt-1 font-mono tabular-nums">
            {overall.completedLessons} de {overall.totalLessons} aulas concluídas
          </p>
        </div>

        <div className="bg-[#111720] border border-slate-800 rounded-xl p-5">
          <p className="text-xs text-slate-400 mb-1">Cursos Finalizados (100%)</p>
          <p className="font-mono text-2xl font-bold text-emerald-400 tabular-nums">
            {overall.completedCourses} / {courses.length}
          </p>
          <p className="text-xs text-slate-400 mt-1 font-mono tabular-nums">
            {overall.inProgressCourses} em andamento no momento
          </p>
        </div>

        <div className="bg-[#111720] border border-slate-800 rounded-xl p-5">
          <p className="text-xs text-slate-400 mb-1">Carga Horária Concluída</p>
          <p className="font-mono text-2xl font-bold text-white tabular-nums">
            {overall.totalHoursCompleted}h
          </p>
          <p className="text-xs text-[#38BDF8] mt-1">
            Tempo efetivo de aulas estudadas
          </p>
        </div>

        <div className="bg-[#111720] border border-slate-800 rounded-xl p-5">
          <p className="text-xs text-slate-400 mb-1">Desempenho em Avaliações</p>
          <p className="font-mono text-2xl font-bold text-[#38BDF8] tabular-nums">
            {quizStats.averageScore}%
          </p>
          <p className="text-xs text-slate-400 mt-1 font-mono tabular-nums">
            {quizStats.passedCount} aprovações registradas
          </p>
        </div>
      </div>

      {/* Detailed Progress Table by Course */}
      <section className="bg-[#111720] border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#E5B85C]" />
            <span>Matriz de Progresso por Curso</span>
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-3 pr-4 font-semibold">Código & Curso</th>
                <th className="py-3 px-4 font-semibold">Área Técnica</th>
                <th className="py-3 px-4 font-semibold text-right">Aulas</th>
                <th className="py-3 px-4 font-semibold text-right">Progresso</th>
                <th className="py-3 pl-4 font-semibold text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70">
              {courses.map((course) => {
                const stats = calculateCourseProgress(course, completedLessonIds);
                const isDone =
                  stats.totalCount > 0 && stats.completedCount === stats.totalCount;

                return (
                  <tr
                    key={course.id}
                    className="hover:bg-[#161F2C]/50 transition-colors"
                  >
                    <td className="py-3.5 pr-4">
                      <div className="font-semibold text-slate-100">
                        <span className="font-mono text-[#E5B85C] mr-2">
                          {course.code}
                        </span>
                        {course.title}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">
                      {course.category}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono tabular-nums text-slate-300">
                      {stats.completedCount} / {stats.totalCount}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-2.5 justify-end w-36">
                        <div className="flex-1 h-1.5 bg-[#0B0F14] rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              isDone ? 'bg-emerald-400' : 'bg-[#38BDF8]'
                            }`}
                            style={{ width: `${stats.percentage}%` }}
                          />
                        </div>
                        <span
                          className={`font-mono font-semibold tabular-nums w-9 text-right ${
                            isDone ? 'text-emerald-400' : 'text-slate-200'
                          }`}
                        >
                          {stats.percentage}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 pl-4 text-right">
                      <button
                        type="button"
                        onClick={() => onSelectCourse(course.id)}
                        className="text-xs font-semibold text-[#E5B85C] hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Estudar</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Quiz History & Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quiz Attempts */}
        <section className="bg-[#111720] border border-slate-800 rounded-xl p-6 space-y-4">
          <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-[#38BDF8]" />
            <span>Histórico de Avaliações Realizadas</span>
          </h2>

          {quizAttempts.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">
              Nenhuma avaliação concluída até o momento.
            </p>
          ) : (
            <div className="space-y-3">
              {quizAttempts.map((att) => (
                <div
                  key={att.id}
                  className="p-3.5 rounded-lg bg-[#0B0F14] border border-slate-800/80 flex items-center justify-between gap-4"
                >
                  <div>
                    <p className="text-xs font-semibold text-slate-100">
                      {att.quizTitle}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5 font-mono tabular-nums">
                      {att.correctCount}/{att.totalQuestions} acertos ·{' '}
                      {new Date(att.completedAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span
                      className={`font-mono text-sm font-bold tabular-nums ${
                        att.passed ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      {att.scorePercent}%
                    </span>
                    <span className="block text-[10px] text-slate-400">
                      {att.passed ? 'Aprovado' : 'Revisar'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Full Learning Log */}
        <section className="bg-[#111720] border border-slate-800 rounded-xl p-6 space-y-4">
          <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#E5B85C]" />
            <span>Linha do Tempo de Atividades</span>
          </h2>

          {learningHistory.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">
              Sem registros recentes.
            </p>
          ) : (
            <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
              {learningHistory.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-lg bg-[#0B0F14] border border-slate-800/80 flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-100">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {item.subtitle} ·{' '}
                      <span className="font-mono tabular-nums">
                        {new Date(item.timestamp).toLocaleString('pt-BR')}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
