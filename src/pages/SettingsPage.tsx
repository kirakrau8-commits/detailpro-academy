import React, { useState } from 'react';
import {
  Save,
  RotateCcw,
  Download,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import {
  AcademyPersistedState,
  CourseCategory,
  DemoStudentProfile,
  SkillLevel,
} from '../types/academy';
import { COURSE_CATEGORIES } from '../data/academyData';

interface SettingsPageProps {
  persistedState: AcademyPersistedState;
  onUpdateProfile: (profile: DemoStudentProfile) => void;
  onResetAllData: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  persistedState,
  onUpdateProfile,
  onResetAllData,
}) => {
  const [formState, setFormState] = useState<DemoStudentProfile>({
    ...persistedState.studentProfile,
  });
  const [savedNotice, setSavedNotice] = useState(false);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);
  const [resetDoneNotice, setResetDoneNotice] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.displayName.trim()) return;
    onUpdateProfile({
      ...formState,
      displayName: formState.displayName.trim(),
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleExportJson = () => {
    const dataStr = JSON.stringify(persistedState, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'detailpro-academy-backup.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleConfirmReset = () => {
    onResetAllData();
    setConfirmResetOpen(false);
    setResetDoneNotice(true);
    setTimeout(() => setResetDoneNotice(false), 3500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#38BDF8]">
          Preferências e Armazenamento Local
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
          Configurações da Plataforma
        </h1>
        <p className="text-sm text-slate-400">
          Ajuste suas metas de estudo no perfil demonstrativo, exporte um backup dos seus dados ou restaure o estado inicial.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Profile Preferences Form */}
        <form
          onSubmit={handleSaveProfile}
          className="lg:col-span-7 bg-[#111720] border border-slate-800 rounded-xl p-6 space-y-5"
        >
          <h2 className="font-display text-lg font-bold text-white">
            Preferências do Perfil Demonstrativo
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="settings-display-name"
                className="block text-xs font-medium text-slate-300 mb-1.5"
              >
                Nome Exibido no Painel
              </label>
              <input
                id="settings-display-name"
                type="text"
                required
                value={formState.displayName}
                onChange={(e) =>
                  setFormState({ ...formState, displayName: e.target.value })
                }
                className="w-full px-3.5 py-2 text-xs bg-[#0B0F14] border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-[#38BDF8]"
              />
            </div>

            <div>
              <label
                htmlFor="settings-role-title"
                className="block text-xs font-medium text-slate-300 mb-1.5"
              >
                Título / Função Técnica
              </label>
              <input
                id="settings-role-title"
                type="text"
                value={formState.roleTitle}
                onChange={(e) =>
                  setFormState({ ...formState, roleTitle: e.target.value })
                }
                className="w-full px-3.5 py-2 text-xs bg-[#0B0F14] border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-[#38BDF8]"
              />
            </div>

            <div>
              <label
                htmlFor="settings-level"
                className="block text-xs font-medium text-slate-300 mb-1.5"
              >
                Nível Atual de Experiência
              </label>
              <select
                id="settings-level"
                value={formState.experienceLevel}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    experienceLevel: e.target.value as SkillLevel,
                  })
                }
                className="w-full px-3.5 py-2 text-xs bg-[#0B0F14] border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-[#38BDF8]"
              >
                <option value="Iniciante">Iniciante</option>
                <option value="Intermediário">Intermediário</option>
                <option value="Avançado">Avançado</option>
                <option value="Especialista">Especialista</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="settings-weekly-goal"
                className="block text-xs font-medium text-slate-300 mb-1.5"
              >
                Meta Semanal (Aulas por Semana): {formState.weeklyGoalLessons}
              </label>
              <input
                id="settings-weekly-goal"
                type="number"
                min={1}
                max={30}
                value={formState.weeklyGoalLessons}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    weeklyGoalLessons: Math.max(
                      1,
                      Math.min(30, Number(e.target.value) || 1)
                    ),
                  })
                }
                className="w-full px-3.5 py-2 text-xs font-mono bg-[#0B0F14] border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-[#38BDF8]"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="settings-focus-area"
              className="block text-xs font-medium text-slate-300 mb-1.5"
            >
              Especialidade Técnica em Foco
            </label>
            <select
              id="settings-focus-area"
              value={formState.focusArea}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  focusArea: e.target.value as CourseCategory,
                })
              }
              className="w-full px-3.5 py-2 text-xs bg-[#0B0F14] border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-[#38BDF8]"
            >
              {COURSE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="settings-studio-type"
              className="block text-xs font-medium text-slate-300 mb-1.5"
            >
              Modalidade de Atuação / Estúdio
            </label>
            <input
              id="settings-studio-type"
              type="text"
              value={formState.studioType}
              onChange={(e) =>
                setFormState({ ...formState, studioType: e.target.value })
              }
              className="w-full px-3.5 py-2 text-xs bg-[#0B0F14] border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-[#38BDF8]"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            {savedNotice ? (
              <span className="text-xs text-emerald-400 inline-flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                Preferências salvas no navegador!
              </span>
            ) : (
              <span className="text-xs text-slate-400">
                Alterações refletidas imediatamente no Painel do Aluno.
              </span>
            )}

            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold bg-[#E5B85C] text-[#111318] rounded-lg hover:bg-[#eab308] transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Salvar Configurações</span>
            </button>
          </div>
        </form>

        {/* Data Export & Reset Box */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#111720] border border-slate-800 rounded-xl p-6 space-y-4">
            <h2 className="font-display text-base font-bold text-white">
              Exportação de Dados Locais (Backup JSON)
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Baixe um arquivo JSON contendo suas aulas concluídas, notas de estudo,
              histórico de avaliações e cursos personalizados criados na Área Administrativa.
            </p>
            <button
              type="button"
              onClick={handleExportJson}
              className="w-full py-2.5 px-4 text-xs font-semibold bg-[#161F2C] hover:bg-[#1E293B] text-slate-100 border border-slate-700 rounded-lg inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#38BDF8]" />
              <span>Exportar Backup (JSON)</span>
            </button>
          </div>

          <div className="bg-[#111720] border border-slate-800 rounded-xl p-6 space-y-4">
            <h2 className="font-display text-base font-bold text-white">
              Restaurar Dados Demonstrativos
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Zera o progresso de aulas concluídas, favoritos, avaliações e cursos customizados neste navegador.
            </p>

            {resetDoneNotice && (
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Progresso demonstrativo zerado com sucesso.</span>
              </div>
            )}

            {!confirmResetOpen ? (
              <button
                type="button"
                onClick={() => setConfirmResetOpen(true)}
                className="w-full py-2.5 px-4 text-xs font-semibold bg-rose-950/40 hover:bg-rose-950/60 text-rose-200 border border-rose-800/60 rounded-lg inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Zerar Progresso Local</span>
              </button>
            ) : (
              <div className="p-4 rounded-lg bg-[#0B0F14] border border-rose-800/60 space-y-3">
                <div className="flex items-start gap-2 text-xs text-amber-300">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    Tem certeza que deseja limpar todas as aulas concluídas e cursos adicionados localmente?
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleConfirmReset}
                    className="flex-1 py-2 px-3 text-xs font-bold bg-rose-600 text-white rounded-lg hover:bg-rose-500 cursor-pointer"
                  >
                    Confirmar Limpeza
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmResetOpen(false)}
                    className="flex-1 py-2 px-3 text-xs font-semibold bg-[#161F2C] text-slate-200 rounded-lg border border-slate-700 cursor-pointer"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
