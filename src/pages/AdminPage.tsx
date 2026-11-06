import React, { useState } from 'react';
import {
  PlusCircle,
  CheckCircle2,
  Trash2,
  AlertCircle,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import {
  Course,
  CourseCategory,
  SkillLevel,
} from '../types/academy';
import { COURSE_CATEGORIES } from '../data/academyData';

interface AdminPageProps {
  courses: Course[];
  customCourses: Course[];
  onAddCustomCourse: (course: Course) => void;
  onRemoveCustomCourse: (courseId: string) => void;
  onSelectCourse: (courseId: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  courses,
  customCourses,
  onAddCustomCourse,
  onRemoveCustomCourse,
  onSelectCourse,
}) => {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('DP-601');
  const [category, setCategory] = useState<CourseCategory>(COURSE_CATEGORIES[0]);
  const [level, setLevel] = useState<SkillLevel>('Intermediário');
  const [estimatedHours, setEstimatedHours] = useState(4);
  const [shortDescription, setShortDescription] = useState('');
  const [moduleTitle, setModuleTitle] = useState('Módulo 1: Fundamentos e Prática');
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonContent, setLessonContent] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!title.trim() || !shortDescription.trim() || !lessonTitle.trim()) {
      setErrorMsg(
        'Preencha o título do curso, a descrição resumida e o título da primeira aula antes de publicar.'
      );
      return;
    }

    const courseId = `course-custom-${Date.now()}`;
    const moduleId = `mod-custom-${Date.now()}`;
    const lessonId = `les-custom-${Date.now()}`;

    const newCourse: Course = {
      id: courseId,
      code: code.trim() || 'DP-CUSTOM',
      title: title.trim(),
      category,
      level,
      shortDescription: shortDescription.trim(),
      fullDescription: shortDescription.trim(),
      estimatedHours: Math.max(1, Number(estimatedHours) || 4),
      instructorNote:
        'Curso adicionado dinamicamente através da Área Administrativa da DetailPro Academy.',
      skillsAcquired: [
        `Domínio técnico em ${category}`,
        lessonTitle.trim(),
      ],
      isCustom: true,
      modules: [
        {
          id: moduleId,
          courseId,
          order: 1,
          title: moduleTitle.trim() || 'Módulo 1',
          description: 'Módulo estruturado via painel de expansão.',
          lessons: [
            {
              id: lessonId,
              courseId,
              moduleId,
              order: 1,
              title: lessonTitle.trim(),
              summary: shortDescription.trim(),
              durationMinutes: 25,
              contentParagraphs: [
                lessonContent.trim() ||
                  'Conteúdo técnico cadastrado pelo administrador da academia. Utilize o ambiente de sala de aula para vincular vídeos e registrar notas práticas.',
              ],
              keyTakeaways: [
                'Respeite sempre as recomendações de diluição e EPIs do fabricante.',
                'Execute testes preliminares em área discreta antes do procedimento completo.',
              ],
              videoConfig: {
                title: lessonTitle.trim(),
                description:
                  'Slot de vídeo preparado automaticamente pelo construtor de cursos.',
                duration: '15:00',
                category,
                youtubeUrl: youtubeUrl.trim(),
              },
              materials: [
                {
                  id: `mat-${Date.now()}`,
                  title: `Checklist Operacional: ${lessonTitle.trim()}`,
                  type: 'Checklist Técnico',
                  summary: 'Roteiro técnico gerado para acompanhamento no box.',
                  contentSteps: [
                    'Inspecionar substrato sob iluminação técnica.',
                    'Selecionar produtos e EPIs compatíveis com a etapa.',
                    'Validar acabamento final sem resíduos.',
                  ],
                },
              ],
              exercise: {
                title: `Prática Supervisionada: ${lessonTitle.trim()}`,
                objective: `Aplicar os conceitos de ${title.trim()} em peça de estudo.`,
                requiredTools: ['EPIs completos', 'Iluminação de inspeção', 'Microfibras limpas'],
                steps: [
                  'Prepare a bancada com os insumos necessários.',
                  'Execute a técnica em quadrante controlado de 40x40 cm.',
                  'Inspecione o resultado final sob diferentes ângulos de luz.',
                ],
                safetyWarning:
                  'Utilize sempre EPIs compatíveis com a ficha de segurança dos produtos.',
                successCriteria: 'Procedimento concluído com padrão profissional e segurança.',
              },
            },
          ],
        },
      ],
    };

    onAddCustomCourse(newCourse);
    setSuccessMsg(
      `Curso "${newCourse.title}" (${newCourse.code}) publicado com sucesso no catálogo!`
    );
    setTitle('');
    setShortDescription('');
    setLessonTitle('');
    setLessonContent('');
    setYoutubeUrl('');
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#E5B85C]">
          Arquitetura Expansível · Gestão de Conteúdo
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
          Área Administrativa e Expansão de Cursos
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl">
          Cadastre novos cursos, módulos e aulas diretamente pela interface sem
          necessidade de reconstruir o código-fonte. Os novos cursos passam a
          integrar imediatamente o catálogo, a busca e o cálculo de progresso.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Course Builder Form */}
        <form
          onSubmit={handleCreateCourse}
          className="lg:col-span-7 bg-[#111720] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5"
        >
          <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
            <PlusCircle className="w-5 h-5 text-[#E5B85C]" />
            <h2 className="font-display text-lg font-bold text-white">
              Cadastrar Novo Curso na Plataforma
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="admin-course-code"
                className="block text-xs font-medium text-slate-300 mb-1.5"
              >
                Código do Curso
              </label>
              <input
                id="admin-course-code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Ex.: DP-601"
                className="w-full px-3.5 py-2 text-xs font-mono bg-[#0B0F14] border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-[#38BDF8]"
              />
            </div>

            <div>
              <label
                htmlFor="admin-course-level"
                className="block text-xs font-medium text-slate-300 mb-1.5"
              >
                Nível de Complexidade
              </label>
              <select
                id="admin-course-level"
                value={level}
                onChange={(e) => setLevel(e.target.value as SkillLevel)}
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
                htmlFor="admin-course-hours"
                className="block text-xs font-medium text-slate-300 mb-1.5"
              >
                Carga Horária (h)
              </label>
              <input
                id="admin-course-hours"
                type="number"
                min={1}
                max={100}
                value={estimatedHours}
                onChange={(e) => setEstimatedHours(Number(e.target.value) || 4)}
                className="w-full px-3.5 py-2 text-xs font-mono bg-[#0B0F14] border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-[#38BDF8]"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="admin-course-category"
              className="block text-xs font-medium text-slate-300 mb-1.5"
            >
              Categoria Oficial (10 Áreas)
            </label>
            <select
              id="admin-course-category"
              value={category}
              onChange={(e) => setCategory(e.target.value as CourseCategory)}
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
              htmlFor="admin-course-title"
              className="block text-xs font-medium text-slate-300 mb-1.5"
            >
              Título do Curso *
            </label>
            <input
              id="admin-course-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex.: Aplicação de PPF (Paint Protection Film) em Áreas de Impacto"
              className="w-full px-3.5 py-2 text-xs bg-[#0B0F14] border border-slate-800 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-[#38BDF8]"
            />
          </div>

          <div>
            <label
              htmlFor="admin-course-desc"
              className="block text-xs font-medium text-slate-300 mb-1.5"
            >
              Descrição Resumida do Curso *
            </label>
            <textarea
              id="admin-course-desc"
              rows={2}
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Descreva os objetivos técnicos e habilidades desenvolvidas neste curso..."
              className="w-full p-3 text-xs bg-[#0B0F14] border border-slate-800 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-[#38BDF8]"
            />
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#38BDF8]">
              Módulo Inicial e Primeira Aula
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="admin-module-title"
                  className="block text-xs font-medium text-slate-300 mb-1.5"
                >
                  Título do Módulo 1
                </label>
                <input
                  id="admin-module-title"
                  type="text"
                  value={moduleTitle}
                  onChange={(e) => setModuleTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#0B0F14] border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-[#38BDF8]"
                />
              </div>

              <div>
                <label
                  htmlFor="admin-lesson-title"
                  className="block text-xs font-medium text-slate-300 mb-1.5"
                >
                  Título da Aula 01 *
                </label>
                <input
                  id="admin-lesson-title"
                  type="text"
                  value={lessonTitle}
                  onChange={(e) => setLessonTitle(e.target.value)}
                  placeholder="Ex.: Preparação de Solução Slip e Tack para PPF"
                  className="w-full px-3.5 py-2 text-xs bg-[#0B0F14] border border-slate-800 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-[#38BDF8]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-lesson-content"
                className="block text-xs font-medium text-slate-300 mb-1.5"
              >
                Conteúdo Técnico da Aula
              </label>
              <textarea
                id="admin-lesson-content"
                rows={3}
                value={lessonContent}
                onChange={(e) => setLessonContent(e.target.value)}
                placeholder="Texto técnico explicativo da aula..."
                className="w-full p-3 text-xs bg-[#0B0F14] border border-slate-800 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-[#38BDF8]"
              />
            </div>

            <div>
              <label
                htmlFor="admin-lesson-youtube"
                className="block text-xs font-medium text-slate-300 mb-1.5"
              >
                URL do Vídeo do YouTube (Opcional — pode ser incluído posteriormente)
              </label>
              <input
                id="admin-lesson-youtube"
                type="text"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="Deixe em branco ou cole a URL oficial do YouTube..."
                className="w-full px-3.5 py-2 text-xs bg-[#0B0F14] border border-slate-800 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-[#38BDF8]"
              />
            </div>
          </div>

          {errorMsg && (
            <div
              role="alert"
              className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div
              role="status"
              className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-3 text-xs font-bold bg-[#E5B85C] text-[#111318] rounded-xl hover:bg-[#eab308] transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Publicar Curso no Catálogo</span>
            </button>
          </div>
        </form>

        {/* Right: Active Catalog & Custom Courses Management */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#111720] border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#38BDF8]" />
                <span>Cursos Customizados Criados ({customCourses.length})</span>
              </h2>
            </div>

            {customCourses.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center border border-dashed border-slate-800 rounded-lg px-4">
                Nenhum curso extra adicionado ainda. Use o formulário ao lado para expandir o catálogo dinamicamente.
              </p>
            ) : (
              <div className="space-y-3">
                {customCourses.map((c) => (
                  <div
                    key={c.id}
                    className="p-4 rounded-xl bg-[#0B0F14] border border-slate-800 flex items-start justify-between gap-3"
                  >
                    <div className="space-y-1 min-w-0">
                      <p className="text-xs font-mono text-[#E5B85C]">
                        {c.code} · {c.category}
                      </p>
                      <h3 className="text-sm font-bold text-white truncate">
                        {c.title}
                      </h3>
                      <button
                        type="button"
                        onClick={() => onSelectCourse(c.id)}
                        className="text-xs font-semibold text-[#38BDF8] hover:underline inline-flex items-center gap-1 pt-1 cursor-pointer"
                      >
                        <span>Abrir na Sala de Aula</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveCustomCourse(c.id)}
                      aria-label={`Remover curso ${c.title}`}
                      className="p-2 text-slate-400 hover:text-rose-400 rounded-lg border border-slate-800 hover:border-rose-800/60 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-[#111720] border border-slate-800 rounded-xl p-6 space-y-3">
            <h2 className="font-display text-base font-bold text-white">
              Resumo do Catálogo Ativo ({courses.length} Cursos)
            </h2>
            <p className="text-xs text-slate-400">
              A plataforma conta com 10 cursos-base cobrindo todas as especialidades obrigatórias + {customCourses.length} curso(s) expandido(s).
            </p>
            <div className="max-h-60 overflow-y-auto space-y-1.5 pr-1 pt-2">
              {courses.map((c) => (
                <div
                  key={c.id}
                  className="px-3 py-2 rounded-lg bg-[#0B0F14] border border-slate-800/70 flex items-center justify-between text-xs"
                >
                  <span className="truncate text-slate-200">
                    <strong className="font-mono text-[#E5B85C] mr-1.5">
                      {c.code}
                    </strong>
                    {c.title}
                  </span>
                  <span className="text-[11px] text-slate-400 shrink-0 ml-2">
                    {c.isCustom ? 'Custom' : 'Oficial'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
