import React from 'react';
import {
  UserCheck,
  ShieldCheck,
  Database,
  FileText,
  ArrowRight,
  Settings,
} from 'lucide-react';
import {
  Course,
  DemoStudentProfile,
  PageView,
} from '../types/academy';
import { getAllLessons } from '../utils/academyLogic';

interface ProfilePageProps {
  studentProfile: DemoStudentProfile;
  courses: Course[];
  completedLessonIds: string[];
  lessonNotes: Record<string, string>;
  onNavigate: (page: PageView) => void;
  onOpenLesson: (courseId: string, lessonId: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  studentProfile,
  courses,
  completedLessonIds,
  lessonNotes,
  onNavigate,
  onOpenLesson,
}) => {
  const allLessons = getAllLessons(courses);
  const notesEntries = Object.entries(lessonNotes).filter(
    ([, text]) => text && text.trim().length > 0
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#E5B85C]">
            Identidade Local do Estudante
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
            Perfil Demonstrativo do Aluno
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Visualização transparente do perfil local e caderno consolidado de anotações de aula.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('settings')}
          className="px-4 py-2 text-xs font-semibold bg-[#161F2C] text-slate-200 border border-slate-700 rounded-lg hover:bg-[#1E293B] inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Settings className="w-4 h-4 text-[#E5B85C]" />
          <span>Personalizar nas Configurações</span>
        </button>
      </div>

      {/* Profile Overview Card & Transparency Notice */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-[#111720] border border-slate-800 rounded-xl p-6 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#E5B85C] text-[#111318] font-display text-2xl font-extrabold flex items-center justify-center shrink-0">
              {studentProfile.displayName.charAt(0).toUpperCase()}
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <span className="text-[#38BDF8] font-semibold">
                  Perfil Local Demonstrativo
                </span>
                <span aria-hidden="true">·</span>
                <span>Sem login ou senha</span>
              </div>
              <h2 className="font-display text-xl font-bold text-white">
                {studentProfile.displayName}
              </h2>
              <p className="text-xs text-slate-300">{studentProfile.roleTitle}</p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {studentProfile.bio}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 border-t border-slate-800/80 text-xs">
            <div className="p-3.5 rounded-lg bg-[#0B0F14] border border-slate-800/80">
              <span className="text-slate-400 block">Nível de Experiência</span>
              <strong className="text-slate-100 text-sm mt-0.5 block">
                {studentProfile.experienceLevel}
              </strong>
            </div>

            <div className="p-3.5 rounded-lg bg-[#0B0F14] border border-slate-800/80">
              <span className="text-slate-400 block">Especialidade Prioritária</span>
              <strong className="text-[#E5B85C] text-sm mt-0.5 block truncate">
                {studentProfile.focusArea}
              </strong>
            </div>

            <div className="p-3.5 rounded-lg bg-[#0B0F14] border border-slate-800/80">
              <span className="text-slate-400 block">Perfil de Operação</span>
              <strong className="text-slate-100 text-sm mt-0.5 block truncate">
                {studentProfile.studioType}
              </strong>
            </div>

            <div className="p-3.5 rounded-lg bg-[#0B0F14] border border-slate-800/80">
              <span className="text-slate-400 block">Meta Semanal</span>
              <strong className="font-mono text-[#38BDF8] text-sm mt-0.5 block tabular-nums">
                {studentProfile.weeklyGoalLessons} aulas / semana ({completedLessonIds.length} concluídas)
              </strong>
            </div>
          </div>
        </div>

        {/* Security & Architecture Readiness Panel */}
        <div className="lg:col-span-5 bg-[#111720] border border-slate-800 rounded-xl p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#38BDF8]">
              <ShieldCheck className="w-5 h-5" />
              <h2 className="font-display text-base font-bold text-white">
                Transparência de Autenticação e Dados
              </h2>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Conforme as diretrizes de engenharia da DetailPro Academy, esta
              versão utiliza um <strong className="text-white">Perfil Demonstrativo Local</strong>.
            </p>

            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <UserCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Sem login falso:</strong> Não solicitamos senhas nem
                  simulamos formulários de cadastro sem backend.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Database className="w-4 h-4 text-[#E5B85C] shrink-0 mt-0.5" />
                <span>
                  <strong>Persistência Local Desacoplada:</strong> Todo o estado
                  é gerenciado pela camada <code className="font-mono text-slate-200">storageService.ts</code>,
                  pronta para futura substituição por API REST / OAuth / Banco de Dados.
                </span>
              </li>
            </ul>
          </div>

          <div className="p-3.5 rounded-lg bg-[#0B0F14] border border-slate-800/80 text-[11px] text-slate-400 font-mono">
            Camada de serviço: LocalStorageAdapter v2 · Pronto para migração Cloud/Auth
          </div>
        </div>
      </div>

      {/* Saved Lesson Notes */}
      <section className="bg-[#111720] border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#E5B85C]" />
            <span>Suas Anotações de Estudo Salvas ({notesEntries.length})</span>
          </h2>
        </div>

        {notesEntries.length === 0 ? (
          <p className="text-xs text-slate-400 py-6 text-center">
            Nenhuma anotação pessoal salva ainda. Utilize o caderno técnico dentro da Sala de Aula para registrar observações.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notesEntries.map(([lessonId, noteText]) => {
              const lesson = allLessons.find((l) => l.id === lessonId);
              return (
                <div
                  key={lessonId}
                  className="p-4 rounded-xl bg-[#0B0F14] border border-slate-800/80 flex flex-col justify-between space-y-3"
                >
                  <div>
                    <p className="text-xs font-bold text-[#E5B85C]">
                      {lesson ? lesson.title : `Aula ${lessonId}`}
                    </p>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed whitespace-pre-line">
                      {noteText}
                    </p>
                  </div>

                  {lesson && (
                    <div className="pt-2 border-t border-slate-800/70 flex justify-end">
                      <button
                        type="button"
                        onClick={() => onOpenLesson(lesson.courseId, lesson.id)}
                        className="text-xs font-semibold text-[#38BDF8] hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Abrir aula</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
