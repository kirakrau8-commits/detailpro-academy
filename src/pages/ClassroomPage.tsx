import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Bookmark,
  FileText,
  Wrench,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  Save,
  BookOpen,
} from 'lucide-react';
import { Course, Lesson } from '../types/academy';
import { calculateCourseProgress, getCourseLessons } from '../utils/academyLogic';
import { VideoPlayerSlot } from '../components/VideoPlayerSlot';
import { ResilientImage } from '../components/ResilientImage';

interface ClassroomPageProps {
  courses: Course[];
  activeCourseId: string;
  activeLessonId: string;
  completedLessonIds: string[];
  favoriteLessonIds: string[];
  lessonNotes: Record<string, string>;
  customVideoUrls: Record<string, string>;
  onSelectCourseAndLesson: (courseId: string, lessonId: string) => void;
  onToggleCompleteLesson: (lesson: Lesson) => void;
  onToggleFavoriteLesson: (lessonId: string) => void;
  onSaveLessonNote: (lessonId: string, note: string) => void;
  onSaveLessonVideoUrl: (lessonId: string, url: string) => void;
}

export const ClassroomPage: React.FC<ClassroomPageProps> = ({
  courses,
  activeCourseId,
  activeLessonId,
  completedLessonIds,
  favoriteLessonIds,
  lessonNotes,
  customVideoUrls,
  onSelectCourseAndLesson,
  onToggleCompleteLesson,
  onToggleFavoriteLesson,
  onSaveLessonNote,
  onSaveLessonVideoUrl,
}) => {
  const currentCourse =
    courses.find((c) => c.id === activeCourseId) || courses[0];
  const courseLessons = getCourseLessons(currentCourse);
  const currentLesson =
    courseLessons.find((l) => l.id === activeLessonId) || courseLessons[0];

  const [noteDraft, setNoteDraft] = useState('');
  const [noteSavedFeedback, setNoteSavedFeedback] = useState(false);

  useEffect(() => {
    if (currentLesson) {
      setNoteDraft(lessonNotes[currentLesson.id] || '');
      setNoteSavedFeedback(false);
    }
  }, [currentLesson, lessonNotes]);

  if (!currentCourse || !currentLesson) {
    return null;
  }

  const courseStats = calculateCourseProgress(currentCourse, completedLessonIds);
  const isLessonDone = completedLessonIds.includes(currentLesson.id);
  const isLessonFavorite = favoriteLessonIds.includes(currentLesson.id);

  const currentIdx = courseLessons.findIndex((l) => l.id === currentLesson.id);
  const prevLesson = currentIdx > 0 ? courseLessons[currentIdx - 1] : null;
  const nextLesson =
    currentIdx >= 0 && currentIdx < courseLessons.length - 1
      ? courseLessons[currentIdx + 1]
      : null;

  const handleCourseChange = (newCourseId: string) => {
    const targetCourse = courses.find((c) => c.id === newCourseId);
    if (!targetCourse) return;
    const lessons = getCourseLessons(targetCourse);
    if (lessons.length > 0) {
      onSelectCourseAndLesson(targetCourse.id, lessons[0].id);
    }
  };

  const handleSaveNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveLessonNote(currentLesson.id, noteDraft);
    setNoteSavedFeedback(true);
    setTimeout(() => setNoteSavedFeedback(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Top Course Selector & Progress Bar */}
      <div className="bg-[#111720] border border-slate-800 rounded-xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="font-mono font-bold text-[#E5B85C]">
              {currentCourse.code}
            </span>
            <span aria-hidden="true">·</span>
            <span>{currentCourse.category}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#38BDF8]">{currentCourse.level}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
            <label htmlFor="classroom-course-select" className="sr-only">
              Selecionar curso ativo na sala de aula
            </label>
            <select
              id="classroom-course-select"
              value={currentCourse.id}
              onChange={(e) => handleCourseChange(e.target.value)}
              className="bg-[#0B0F14] border border-slate-700 rounded-lg px-3.5 py-2 text-sm font-bold text-white focus:outline-none focus:border-[#38BDF8] max-w-xl"
            >
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.code} — {c.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-full lg:w-72 shrink-0 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Progresso neste curso</span>
            <span className="font-mono font-semibold text-[#38BDF8] tabular-nums">
              {courseStats.completedCount}/{courseStats.totalCount} ({courseStats.percentage}%)
            </span>
          </div>
          <div className="w-full h-2 bg-[#0B0F14] rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-[#38BDF8] transition-all duration-200"
              style={{ width: `${courseStats.percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Classroom Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Sidebar: Modules & Lessons Tree */}
        <aside className="lg:col-span-4 bg-[#111720] border border-slate-800 rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="font-display text-sm font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#E5B85C]" />
              <span>Módulos e Aulas</span>
            </h2>
            <span className="text-xs font-mono text-slate-400 tabular-nums">
              {courseLessons.length} aulas
            </span>
          </div>

          <div className="space-y-4">
            {currentCourse.modules.map((mod) => (
              <div key={mod.id} className="space-y-2">
                <div className="px-2">
                  <p className="text-xs font-bold text-slate-200">{mod.title}</p>
                  <p className="text-[11px] text-slate-400">{mod.description}</p>
                </div>

                <div className="space-y-1.5">
                  {mod.lessons.map((lesson) => {
                    const isActive = lesson.id === currentLesson.id;
                    const isDone = completedLessonIds.includes(lesson.id);
                    return (
                      <button
                        key={lesson.id}
                        type="button"
                        onClick={() =>
                          onSelectCourseAndLesson(currentCourse.id, lesson.id)
                        }
                        className={`w-full text-left p-3 rounded-lg border transition-colors flex items-start justify-between gap-2.5 cursor-pointer ${
                          isActive
                            ? 'bg-[#161F2C] border-[#38BDF8]/60 text-white'
                            : 'bg-[#0B0F14] border-slate-800/80 text-slate-300 hover:bg-[#131B26]'
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono tabular-nums">
                            <span>Aula 0{lesson.order}</span>
                            <span aria-hidden="true">·</span>
                            <span>{lesson.durationMinutes} min</span>
                          </div>
                          <p
                            className={`text-xs font-semibold mt-0.5 leading-snug ${
                              isActive ? 'text-[#E5B85C]' : 'text-slate-100'
                            }`}
                          >
                            {lesson.title}
                          </p>
                        </div>
                        <div className="shrink-0 mt-0.5">
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-slate-700" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Right Stage: Video Slot, Technical Content, Materials, Exercise & Completion */}
        <div className="lg:col-span-8 space-y-6">
          {/* Lesson Title & Action Bar */}
          <div className="bg-[#111720] border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="text-[#E5B85C] font-semibold">
                  Aula 0{currentLesson.order}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">
                  {currentLesson.durationMinutes} minutos de estudo
                </span>
                {isLessonDone && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-400 font-semibold">
                      Concluída
                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onToggleFavoriteLesson(currentLesson.id)}
                  aria-label={
                    isLessonFavorite
                      ? 'Remover aula dos favoritos'
                      : 'Favoritar aula'
                  }
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                    isLessonFavorite
                      ? 'border-[#E5B85C] bg-[#E5B85C]/15 text-[#E5B85C]'
                      : 'border-slate-700 bg-[#0B0F14] text-slate-300 hover:text-white'
                  }`}
                >
                  <Bookmark
                    className="w-3.5 h-3.5"
                    fill={isLessonFavorite ? 'currentColor' : 'none'}
                  />
                  <span>{isLessonFavorite ? 'Aula Favorita' : 'Favoritar Aula'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onToggleCompleteLesson(currentLesson)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                    isLessonDone
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                      : 'bg-[#E5B85C] text-[#111318] hover:bg-[#eab308]'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {isLessonDone
                      ? 'Aula Concluída (Desmarcar)'
                      : 'Marcar Aula como Concluída'}
                  </span>
                </button>
              </div>
            </div>

            <div>
              <h1 className="font-display text-2xl font-bold text-white">
                {currentLesson.title}
              </h1>
              <p className="text-sm text-slate-300 mt-1">
                {currentLesson.summary}
              </p>
            </div>
          </div>

          {/* Dedicated Video Player Slot Component */}
          <VideoPlayerSlot
            lessonId={currentLesson.id}
            config={currentLesson.videoConfig}
            savedUrl={customVideoUrls[currentLesson.id]}
            onSaveUrl={onSaveLessonVideoUrl}
          />

          {/* Lesson Theoretical & Visual Content */}
          <article className="bg-[#111720] border border-slate-800 rounded-xl p-6 space-y-6">
            {currentLesson.imageUrl && (
              <div className="rounded-xl overflow-hidden border border-slate-800 max-h-80">
                <ResilientImage
                  src={currentLesson.imageUrl}
                  alt={currentLesson.title}
                  caption={currentLesson.imageCaption}
                  className="w-full h-72 object-cover"
                />
              </div>
            )}

            <div className="space-y-4">
              <h2 className="font-display text-lg font-bold text-white">
                Fundamentação Técnica e Procedimento
              </h2>
              {currentLesson.contentParagraphs.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-sm sm:text-base text-slate-300 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Technical Specs Grid */}
            {currentLesson.technicalSpecs &&
              currentLesson.technicalSpecs.length > 0 && (
                <div className="pt-4 border-t border-slate-800/80">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#38BDF8] mb-3">
                    Parâmetros Técnicos de Referência
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {currentLesson.technicalSpecs.map((spec, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-[#0B0F14] border border-slate-800/80"
                      >
                        <p className="text-[11px] text-slate-400">{spec.label}</p>
                        <p className="text-xs font-mono font-semibold text-slate-100 mt-1 tabular-nums">
                          {spec.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Key Takeaways */}
            <div className="pt-4 border-t border-slate-800/80">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#E5B85C] mb-3">
                Pontos-Chave de Domínio Obrigatório
              </h3>
              <ul className="space-y-2">
                {currentLesson.keyTakeaways.map((point, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-sm text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#E5B85C] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* Supplementary Materials & Practical Exercise */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Supplementary Materials */}
            <div className="bg-[#111720] border border-slate-800 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#38BDF8]" />
                <h2 className="font-display text-base font-bold text-white">
                  Materiais Complementares
                </h2>
              </div>

              {currentLesson.materials.length === 0 ? (
                <p className="text-xs text-slate-400">
                  Consulte o roteiro prático ao lado para aplicação em bancada.
                </p>
              ) : (
                <div className="space-y-4">
                  {currentLesson.materials.map((mat) => (
                    <div
                      key={mat.id}
                      className="p-4 rounded-lg bg-[#0B0F14] border border-slate-800/80 space-y-2.5"
                    >
                      <div className="text-xs text-[#38BDF8] font-medium">
                        {mat.type}
                      </div>
                      <h3 className="text-sm font-bold text-white">
                        {mat.title}
                      </h3>
                      <p className="text-xs text-slate-400">{mat.summary}</p>
                      <ul className="space-y-1.5 pt-2 border-t border-slate-800/70">
                        {mat.contentSteps.map((step, i) => (
                          <li key={i} className="text-xs text-slate-300">
                            • {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Practical Exercise */}
            <div className="bg-[#111720] border border-slate-800 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-[#E5B85C]" />
                <h2 className="font-display text-base font-bold text-white">
                  Exercício Prático de Box
                </h2>
              </div>

              <div className="p-4 rounded-lg bg-[#0B0F14] border border-slate-800/80 space-y-3">
                <h3 className="text-sm font-bold text-[#E5B85C]">
                  {currentLesson.exercise.title}
                </h3>
                <p className="text-xs text-slate-300">
                  <strong>Objetivo:</strong> {currentLesson.exercise.objective}
                </p>

                <div>
                  <p className="text-[11px] font-semibold uppercase text-slate-400 mb-1">
                    Ferramentas e Insumos:
                  </p>
                  <p className="text-xs text-slate-300">
                    {currentLesson.exercise.requiredTools.join(' · ')}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase text-slate-400 mb-1">
                    Passo a Passo:
                  </p>
                  <ol className="space-y-1 text-xs text-slate-300 list-decimal list-inside">
                    {currentLesson.exercise.steps.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ol>
                </div>

                <div className="p-2.5 rounded bg-amber-500/10 border border-amber-500/30 flex items-start gap-2 text-xs text-amber-300">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{currentLesson.exercise.safetyWarning}</span>
                </div>

                <p className="text-xs text-emerald-400">
                  <strong>Critério de aprovação:</strong>{' '}
                  {currentLesson.exercise.successCriteria}
                </p>
              </div>
            </div>
          </div>

          {/* Personal Study Notes */}
          <form
            onSubmit={handleSaveNoteSubmit}
            className="bg-[#111720] border border-slate-800 rounded-xl p-6 space-y-3"
          >
            <div className="flex items-center justify-between">
              <label
                htmlFor="student-lesson-notes"
                className="font-display text-base font-bold text-white"
              >
                Caderno de Anotações Técnicas desta Aula
              </label>
              {noteSavedFeedback && (
                <span className="text-xs text-emerald-400 font-medium">
                  Anotação salva localmente!
                </span>
              )}
            </div>
            <textarea
              id="student-lesson-notes"
              rows={3}
              value={noteDraft}
              onChange={(e) => setNoteDraft(e.target.value)}
              placeholder="Anote diluições utilizadas, setup de boinas testado ou observações importantes desta aula..."
              className="w-full p-3 text-xs bg-[#0B0F14] border border-slate-800 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-[#38BDF8]"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold bg-[#161F2C] hover:bg-[#1E293B] text-slate-100 border border-slate-700 rounded-lg inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5 text-[#E5B85C]" />
                <span>Salvar Anotação</span>
              </button>
            </div>
          </form>

          {/* Bottom Lesson Navigation & Completion */}
          <div className="bg-[#111720] border border-slate-800 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              {prevLesson ? (
                <button
                  type="button"
                  onClick={() =>
                    onSelectCourseAndLesson(currentCourse.id, prevLesson.id)
                  }
                  className="px-4 py-2 text-xs font-semibold bg-[#0B0F14] hover:bg-[#161F2C] text-slate-200 border border-slate-800 rounded-lg inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Aula Anterior</span>
                </button>
              ) : (
                <span className="text-xs text-slate-500">Primeira aula do curso</span>
              )}
            </div>

            <button
              type="button"
              onClick={() => onToggleCompleteLesson(currentLesson)}
              className={`px-5 py-2.5 text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer ${
                isLessonDone
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-[#E5B85C] text-[#111318] hover:bg-[#eab308]'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {isLessonDone ? 'Concluída no Histórico ✓' : 'Concluir Estudo desta Aula'}
              </span>
            </button>

            <div>
              {nextLesson ? (
                <button
                  type="button"
                  onClick={() =>
                    onSelectCourseAndLesson(currentCourse.id, nextLesson.id)
                  }
                  className="px-4 py-2 text-xs font-semibold bg-[#161F2C] hover:bg-[#1E293B] text-white border border-slate-700 rounded-lg inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Próxima Aula</span>
                  <ChevronRight className="w-4 h-4 text-[#E5B85C]" />
                </button>
              ) : (
                <span className="text-xs text-emerald-400 font-medium">
                  Última aula deste curso
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
