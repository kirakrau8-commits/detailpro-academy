import React, { useRef, useState } from 'react';
import {
  Save,
  RotateCcw,
  Download,
  CheckCircle2,
  AlertTriangle,
  Upload,
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
  const [backupNotice, setBackupNotice] = useState('');
  const [backupError, setBackupError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    const backup = {
      app: 'Estética Detalhamento. edu',
      formatVersion: 3,
      exportedAt: new Date().toISOString(),
      data: {
        academy: persistedState,
        crm: readLocalData('estetica_detalhamento_crm_v1'),
        operations: readLocalData('estetica_detalhamento_operations_v1'),
        customProducts: readLocalData('estetica_detalhamento_custom_products_v1'),
        customProcedures: readLocalData('estetica_detalhamento_custom_procedures_v1'),
        manuals: readLocalData('estetica_detalhamento_manuals_v1'),
      },
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'estetica-detalhamento-backup.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setBackupError('');
    setBackupNotice('Backup completo exportado. Guarde o arquivo em outro local.');
  };

  const readLocalData = (key: string) => {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : null; }
    catch { return null; }
  };

  const handleImportJson = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setBackupError('');
    setBackupNotice('');
    try {
      const parsed = JSON.parse(await file.text());
      const payload = parsed?.formatVersion >= 2 ? parsed.data : { academy: parsed };
      const academy = payload?.academy;
      const isAcademyState = academy && Array.isArray(academy.completedLessonIds)
        && Array.isArray(academy.favoriteCourseIds) && Array.isArray(academy.quizAttempts)
        && academy.studentProfile && typeof academy.studentProfile === 'object';
      if (!isAcademyState) throw new Error('O arquivo não contém um backup válido da plataforma.');
      if (!window.confirm('A restauração substituirá os dados atuais deste navegador. Deseja continuar?')) return;
      localStorage.setItem('detailpro_academy_state_v2', JSON.stringify(academy));
      if (payload.crm && Array.isArray(payload.crm.customers) && Array.isArray(payload.crm.vehicles) && Array.isArray(payload.crm.orders)) {
        localStorage.setItem('estetica_detalhamento_crm_v1', JSON.stringify(payload.crm));
      }
      if (payload.operations && Array.isArray(payload.operations.stock) && Array.isArray(payload.operations.movements) && Array.isArray(payload.operations.finance) && Array.isArray(payload.operations.appointments)) {
        localStorage.setItem('estetica_detalhamento_operations_v1', JSON.stringify(payload.operations));
      }
      if (Array.isArray(payload.customProducts)) localStorage.setItem('estetica_detalhamento_custom_products_v1', JSON.stringify(payload.customProducts));
      if (Array.isArray(payload.customProcedures)) localStorage.setItem('estetica_detalhamento_custom_procedures_v1', JSON.stringify(payload.customProcedures));
      if (Array.isArray(payload.manuals)) localStorage.setItem('estetica_detalhamento_manuals_v1', JSON.stringify(payload.manuals));
      setBackupNotice('Backup restaurado. A página será atualizada para carregar os dados.');
      window.setTimeout(() => window.location.reload(), 700);
    } catch (error) {
      setBackupError(error instanceof Error ? error.message : 'Não foi possível ler o arquivo de backup.');
    } finally {
      event.target.value = '';
    }
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
          Ajuste o perfil, faça cópias completas dos dados de gestão e restaure backups anteriores.
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
              Backup e restauração de dados
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Baixe um backup completo com progresso de estudos, perfil, cursos personalizados, clientes, veículos, ordens de serviço, estoque, movimentações, financeiro, agenda, produtos e procedimentos próprios e apostilas técnicas.
            </p>
            {backupNotice && <p role="status" className="rounded-lg border border-emerald-800/50 bg-emerald-950/20 p-3 text-xs text-emerald-300">{backupNotice}</p>}
            {backupError && <p role="alert" className="rounded-lg border border-rose-800/50 bg-rose-950/20 p-3 text-xs text-rose-300">{backupError}</p>}
            <button
              type="button"
              onClick={handleExportJson}
              className="w-full py-2.5 px-4 text-xs font-semibold bg-[#161F2C] hover:bg-[#1E293B] text-slate-100 border border-slate-700 rounded-lg inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#38BDF8]" />
              <span>Exportar Backup (JSON)</span>
            </button>
            <input ref={fileInputRef} type="file" accept="application/json,.json" onChange={handleImportJson} className="hidden" />
            <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full py-2.5 px-4 text-xs font-semibold bg-[#161F2C] hover:bg-[#1E293B] text-slate-100 border border-slate-700 rounded-lg inline-flex items-center justify-center gap-2 cursor-pointer">
              <Upload className="w-4 h-4 text-[#E5B85C]" /> Restaurar Backup JSON
            </button>
            <p className="text-[11px] leading-5 text-slate-500">Aceita backups completos desta plataforma e backups antigos somente do progresso de aprendizagem. A restauração substitui os dados correspondentes existentes neste navegador.</p>
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
