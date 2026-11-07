import React, { useState } from 'react';
import {
  Home,
  LayoutDashboard,
  BookOpen,
  PlaySquare,
  Package,
  ClipboardList,
  Calculator,
  FileText,
  Wrench,
  Layers,
  ClipboardCheck,
  BookMarked,
  BriefcaseBusiness,
  TrendingUp,
  UserCheck,
  Settings,
  Sliders,
  Menu,
  X,
} from 'lucide-react';
import { PageView } from '../types/academy';

interface AppShellProps {
  activePage: PageView;
  onNavigate: (page: PageView) => void;
  overallPercentage: number;
  completedLessons: number;
  totalLessons: number;
  studentName: string;
  children: React.ReactNode;
}

interface NavItem {
  id: PageView;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  group: 'Principal' | 'Biblioteca & Prática' | 'Aluno & Sistema';
}

export const NAV_ITEMS: NavItem[] = [
  {
    id: 'home',
    label: '1. Início & Apresentação',
    shortLabel: 'Início',
    icon: Home,
    group: 'Principal',
  },
  {
    id: 'dashboard',
    label: '2. Painel do Aluno',
    shortLabel: 'Painel',
    icon: LayoutDashboard,
    group: 'Principal',
  },
  {
    id: 'courses',
    label: '3. Área de Cursos',
    shortLabel: 'Cursos',
    icon: BookOpen,
    group: 'Principal',
  },
  {
    id: 'classroom',
    label: '4. Aulas e Módulos',
    shortLabel: 'Sala de Aula',
    icon: PlaySquare,
    group: 'Principal',
  },
  {
    id: 'products',
    label: '5. Produtos e Equipamentos',
    shortLabel: 'Produtos',
    icon: Package,
    group: 'Biblioteca & Prática',
  },
  {
    id: 'procedures',
    label: '6. Enciclopédia de Procedimentos',
    shortLabel: 'Procedimentos',
    icon: ClipboardList,
    group: 'Biblioteca & Prática',
  },
  {
    id: 'calculator',
    label: '7. Calculadora de Serviços',
    shortLabel: 'Orçamentos',
    icon: Calculator,
    group: 'Biblioteca & Prática',
  },
  {
    id: 'resources',
    label: '8. PDFs e Referências',
    shortLabel: 'PDFs',
    icon: FileText,
    group: 'Biblioteca & Prática',
  },
  {
    id: 'equipment',
    label: '9. Máquinas e Equipamentos',
    shortLabel: 'Equipamentos',
    icon: Wrench,
    group: 'Biblioteca & Prática',
  },
  {
    id: 'accessories',
    label: '10. Boinas e Acessórios',
    shortLabel: 'Acessórios',
    icon: Layers,
    group: 'Biblioteca & Prática',
  },
  {
    id: 'inspection',
    label: '11. Inspeção e Entrega',
    shortLabel: 'Inspeção',
    icon: ClipboardCheck,
    group: 'Biblioteca & Prática',
  },
  {
    id: 'crm',
    label: '12. Gestão de Clientes e Serviços',
    shortLabel: 'Gestão',
    icon: BriefcaseBusiness,
    group: 'Biblioteca & Prática',
  },
  {
    id: 'glossary',
    label: '13. Glossário Técnico',
    shortLabel: 'Glossário',
    icon: BookMarked,
    group: 'Biblioteca & Prática',
  },
  {
    id: 'quizzes',
    label: '14. Avaliações e Questionários',
    shortLabel: 'Avaliações',
    icon: ClipboardCheck,
    group: 'Biblioteca & Prática',
  },
  {
    id: 'progress',
    label: '15. Progresso de Aprendizagem',
    shortLabel: 'Progresso',
    icon: TrendingUp,
    group: 'Aluno & Sistema',
  },
  {
    id: 'profile',
    label: '16. Perfil Demonstrativo',
    shortLabel: 'Perfil Demo',
    icon: UserCheck,
    group: 'Aluno & Sistema',
  },
  {
    id: 'settings',
    label: '17. Configurações',
    shortLabel: 'Configurações',
    icon: Settings,
    group: 'Aluno & Sistema',
  },
  {
    id: 'admin',
    label: '18. Área Administrativa',
    shortLabel: 'Administração',
    icon: Sliders,
    group: 'Aluno & Sistema',
  },
];

export const AppShell: React.FC<AppShellProps> = ({
  activePage,
  onNavigate,
  overallPercentage,
  completedLessons,
  totalLessons,
  children,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelectPage = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const groups: NavItem['group'][] = [
    'Principal',
    'Biblioteca & Prática',
    'Aluno & Sistema',
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F14] text-[#F1F5F9]">
      {/* Strict Top Bar Contract: 3 zones separated by responsive gap */}
      <header className="sticky top-0 z-30 h-16 bg-[#0B0F14]/95 backdrop-blur-md border-b border-slate-800/90 px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-8">
        {/* Zone 1: Single text element wordmark (plus mobile drawer trigger on small screens) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            className="lg:hidden p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer shrink-0"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              handleSelectPage('home');
            }}
            className="font-display text-sm sm:text-lg font-extrabold tracking-tight text-white whitespace-nowrap shrink-0"
          >
            ESTÉTICA <span className="text-[#E5B85C]">DETALHAMENTO</span>. EDU
          </a>
        </div>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav
          aria-label="Navegação rápida superior"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300"
        >
          <button
            type="button"
            onClick={() => handleSelectPage('dashboard')}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activePage === 'dashboard' ? 'text-[#E5B85C] underline underline-offset-8' : ''
            }`}
          >
            Painel
          </button>
          <button
            type="button"
            onClick={() => handleSelectPage('courses')}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activePage === 'courses' ? 'text-[#E5B85C] underline underline-offset-8' : ''
            }`}
          >
            Cursos
          </button>
          <button
            type="button"
            onClick={() => handleSelectPage('classroom')}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activePage === 'classroom' ? 'text-[#E5B85C] underline underline-offset-8' : ''
            }`}
          >
            Aulas
          </button>
          <button
            type="button"
            onClick={() => handleSelectPage('products')}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activePage === 'products' ? 'text-[#E5B85C] underline underline-offset-8' : ''
            }`}
          >
            Biblioteca
          </button>
          <button
            type="button"
            onClick={() => handleSelectPage('calculator')}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activePage === 'calculator' ? 'text-[#E5B85C] underline underline-offset-8' : ''
            }`}
          >
            Orçamentos
          </button>
          <button
            type="button"
            onClick={() => handleSelectPage('quizzes')
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activePage === 'quizzes' ? 'text-[#E5B85C] underline underline-offset-8' : ''
            }`}
          >
            Avaliações
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action Button */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => handleSelectPage('classroom')}
            className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold bg-[#E5B85C] text-[#111318] rounded-lg hover:bg-[#eab308] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Continuar Estudando
          </button>
        </div>
      </header>

      {/* Workspace Body: Left Sidebar + Main Viewport */}
      <div className="flex-1 flex relative">
        {/* Desktop Sidebar */}
        <aside
          aria-label="Menu completo da plataforma"
          className="hidden lg:flex flex-col w-68 shrink-0 bg-[#0E131B] border-r border-slate-800/80 justify-between p-4"
        >
          <div className="space-y-6">
            {groups.map((groupName) => (
              <div key={groupName}>
                <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  {groupName}
                </p>
                <div className="space-y-1">
                  {NAV_ITEMS.filter((item) => item.group === groupName).map((item) => {
                    const Icon = item.icon;
                    const isActive = activePage === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelectPage(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-lg transition-colors text-left whitespace-nowrap shrink-0 cursor-pointer ${
                          isActive
                            ? 'bg-[#161F2C] text-[#E5B85C] border border-slate-700/80'
                            : 'text-slate-400 hover:text-slate-100 hover:bg-[#111720]'
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 shrink-0 ${
                            isActive ? 'text-[#E5B85C]' : 'text-slate-500'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Progress Summary */}
          <div className="mt-8 pt-4 border-t border-slate-800/80 px-3">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-400">Progresso Geral</span>
              <span className="font-mono font-semibold text-[#38BDF8] tabular-nums">
                {overallPercentage}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#0B0F14] rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-[#38BDF8] transition-all duration-200"
                style={{ width: `${overallPercentage}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-2 font-mono tabular-nums">
              {completedLessons} de {totalLessons} aulas concluídas
            </p>
          </div>
        </aside>

        {/* Mobile Slide-Over Navigation */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden flex">
            <div
              className="fixed inset-0 bg-black/70"
              onClick={() => setMobileMenuOpen(false)}
            />
            <aside className="relative z-50 w-72 max-w-[85vw] bg-[#0E131B] border-r border-slate-800 h-full overflow-y-auto p-4 flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="font-display text-sm font-bold text-white">
                    Áreas da Plataforma (17)
                  </span>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Fechar menu lateral"
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {groups.map((groupName) => (
                  <div key={groupName}>
                    <p className="px-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                      {groupName}
                    </p>
                    <div className="space-y-1">
                      {NAV_ITEMS.filter((item) => item.group === groupName).map((item) => {
                        const Icon = item.icon;
                        const isActive = activePage === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleSelectPage(item.id)}
                            className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-left ${
                              isActive
                                ? 'bg-[#161F2C] text-[#E5B85C] border border-slate-700'
                                : 'text-slate-300 hover:bg-[#111720]'
                            }`}
                          >
                            <Icon className="w-4 h-4 shrink-0" />
                            <span className="truncate">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        )}

        {/* Main Content Viewport */}
        <main className="flex-1 min-w-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>

      {/* Clean Footer */}
      <footer className="border-t border-slate-800/80 bg-[#080B0F] px-4 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <span className="font-display font-bold text-slate-200">
              ESTÉTICA DETALHAMENTO. EDU
            </span>{' '}
            · Educação Profissional em Estética e Detalhamento Automotivo.
          </div>
          <div className="text-center sm:text-right">
            Material técnico educacional. Consulte sempre a FISPQ dos fabricantes e utilize EPIs.
          </div>
        </div>
      </footer>
    </div>
  );
};
