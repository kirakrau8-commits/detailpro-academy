export type PageView =
  | 'home'
  | 'dashboard'
  | 'courses'
  | 'classroom'
  | 'products'
  | 'procedures'
  | 'calculator'
  | 'resources'
  | 'equipment'
  | 'accessories'
  | 'inspection'
  | 'crm'
  | 'operations'
  | 'glossary'
  | 'quizzes'
  | 'progress'
  | 'profile'
  | 'settings'
  | 'admin';

export type CourseCategory =
  | 'Fundamentos e segurança'
  | 'Lavagem técnica'
  | 'Descontaminação da pintura'
  | 'Polimento e correção de pintura'
  | 'Proteção e vitrificação'
  | 'Higienização interna'
  | 'Limpeza de couro, plásticos e tecidos'
  | 'Estética de motores e vidros'
  | 'Técnicas profissionais avançadas'
  | 'Gestão e profissionalização de um negócio de estética automotiva';

export type SkillLevel = 'Iniciante' | 'Intermediário' | 'Avançado' | 'Especialista';

export interface VideoSlotConfig {
  title: string;
  description: string;
  duration: string;
  category: CourseCategory;
  youtubeUrl: string; // Empty string by default unless configured by instructor/student
}

export interface SupplementaryMaterial {
  id: string;
  title: string;
  type: 'Checklist Técnico' | 'Tabela de Diluição' | 'Guia de Inspeção' | 'Ficha de Segurança (FISPQ)' | 'Planilha de Orçamento';
  summary: string;
  contentSteps: string[];
}

export interface PracticalExercise {
  title: string;
  objective: string;
  requiredTools: string[];
  steps: string[];
  safetyWarning: string;
  successCriteria: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  moduleId: string;
  order: number;
  title: string;
  summary: string;
  durationMinutes: number;
  contentParagraphs: string[];
  keyTakeaways: string[];
  technicalSpecs?: {
    label: string;
    value: string;
  }[];
  imageUrl?: string;
  imageCaption?: string;
  videoConfig: VideoSlotConfig;
  materials: SupplementaryMaterial[];
  exercise: PracticalExercise;
}

export interface CourseModule {
  id: string;
  courseId: string;
  order: number;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  code: string;
  title: string;
  category: CourseCategory;
  level: SkillLevel;
  shortDescription: string;
  fullDescription: string;
  estimatedHours: number;
  coverImage?: string;
  instructorNote: string;
  skillsAcquired: string[];
  modules: CourseModule[];
  isCustom?: boolean;
}

export interface ProductItem {
  id: string;
  name: string;
  line: string;
  category: string;
  stage: CourseCategory;
  type: 'Químico' | 'Composto Polidor' | 'Coating / Proteção' | 'Boina / Acessório' | 'Equipamento';
  phLevel?: string;
  dilutionRatio: string;
  applicationSurface: string;
  technicalUsage: string;
  safetyEpi: string[];
}

export interface GlossaryTerm {
  id: string;
  term: string;
  category: CourseCategory | 'Geral';
  definition: string;
  practicalContext: string;
  relatedTerms: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
  }[];
  correctOptionId: string;
  explanation: string;
}

export interface QuizAssessment {
  id: string;
  title: string;
  category: CourseCategory;
  courseId: string;
  level: SkillLevel;
  passingScorePercent: number;
  description: string;
  questions: QuizQuestion[];
}

export interface QuizAttemptRecord {
  id: string;
  quizId: string;
  quizTitle: string;
  category: CourseCategory;
  scorePercent: number;
  correctCount: number;
  totalQuestions: number;
  passed: boolean;
  completedAt: string;
}

export interface LearningHistoryItem {
  id: string;
  type: 'lesson_completed' | 'quiz_completed' | 'course_created' | 'note_saved' | 'video_linked';
  title: string;
  subtitle: string;
  timestamp: string;
  courseId?: string;
  lessonId?: string;
}

export interface DemoStudentProfile {
  displayName: string;
  roleTitle: string;
  experienceLevel: SkillLevel;
  focusArea: CourseCategory;
  weeklyGoalLessons: number;
  studioType: string;
  bio: string;
}

export interface AcademyPersistedState {
  completedLessonIds: string[];
  favoriteCourseIds: string[];
  favoriteLessonIds: string[];
  lessonNotes: Record<string, string>;
  customVideoUrls: Record<string, string>;
  quizAttempts: QuizAttemptRecord[];
  learningHistory: LearningHistoryItem[];
  customCourses: Course[];
  lastVisitedLessonId: string | null;
  lastVisitedCourseId: string | null;
  studentProfile: DemoStudentProfile;
}
