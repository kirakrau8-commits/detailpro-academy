import {
  AcademyPersistedState,
  Course,
  DemoStudentProfile,
  LearningHistoryItem,
  QuizAttemptRecord,
} from '../types/academy';
import { DEFAULT_DEMO_PROFILE, INITIAL_COURSES } from '../data/academyData';

const STORAGE_KEY = 'detailpro_academy_state_v2';
const LEGACY_DONE_KEY = 'detailpro_done';

function createInitialState(): AcademyPersistedState {
  // Check if user had legacy completed lessons from the initial plain HTML version
  let migratedLessonIds: string[] = ['les-01-1', 'les-01-2'];
  try {
    const legacyRaw = localStorage.getItem(LEGACY_DONE_KEY);
    if (legacyRaw) {
      const parsed = JSON.parse(legacyRaw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        migratedLessonIds = ['les-01-1', 'les-01-2', 'les-02-1'];
      }
    }
  } catch {
    // Ignore storage read errors
  }

  return {
    completedLessonIds: migratedLessonIds,
    favoriteCourseIds: ['course-04-polimento', 'course-05-protecao'],
    favoriteLessonIds: ['les-04-1', 'les-05-2'],
    lessonNotes: {
      'les-01-2':
        'Fórmula rápida de bancada: em frasco de 500 ml, diluição 1:10 = 50 ml de produto + 450 ml de água filtrada.',
      'les-04-1':
        'Sempre aferir 5 pontos por painel com o medidor de espessura e isolar quinas e plásticos porosos antes do Test Spot.',
    },
    customVideoUrls: {},
    quizAttempts: [
      {
        id: 'attempt-demo-1',
        quizId: 'quiz-fundamentos-lavagem',
        quizTitle: 'Avaliação Técnica 01: Química, Diluições, EPIs e Lavagem Segura',
        category: 'Fundamentos e segurança',
        scorePercent: 100,
        correctCount: 4,
        totalQuestions: 4,
        passed: true,
        completedAt: '2026-11-04T15:30:00.000Z',
      },
    ],
    learningHistory: [
      {
        id: 'hist-init-1',
        type: 'lesson_completed',
        title: 'Aula concluída: Escala de pH, Diluição Matemática e Leitura de Rótulos',
        subtitle: 'DP-101 · Fundamentos e segurança',
        timestamp: '2026-11-05T10:15:00.000Z',
        courseId: 'course-01-fundamentos',
        lessonId: 'les-01-2',
      },
      {
        id: 'hist-init-2',
        type: 'quiz_completed',
        title: 'Avaliação aprovada (100%): Química, Diluições, EPIs e Lavagem Segura',
        subtitle: '4/4 questões corretas · Nota mínima 75%',
        timestamp: '2026-11-04T15:30:00.000Z',
        courseId: 'course-01-fundamentos',
      },
      {
        id: 'hist-init-3',
        type: 'lesson_completed',
        title: 'Aula concluída: Introdução à Estética Automotiva e Diagnóstico de Superfícies',
        subtitle: 'DP-101 · Fundamentos e segurança',
        timestamp: '2026-11-03T18:00:00.000Z',
        courseId: 'course-01-fundamentos',
        lessonId: 'les-01-1',
      },
    ],
    customCourses: [],
    lastVisitedLessonId: 'les-04-1',
    lastVisitedCourseId: 'course-04-polimento',
    studentProfile: { ...DEFAULT_DEMO_PROFILE },
  };
}

export function loadAcademyState(): AcademyPersistedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = createInitialState();
      saveAcademyState(initial);
      return initial;
    }
    const parsed = JSON.parse(raw) as Partial<AcademyPersistedState>;
    const fallback = createInitialState();
    return {
      completedLessonIds: Array.isArray(parsed.completedLessonIds)
        ? parsed.completedLessonIds
        : fallback.completedLessonIds,
      favoriteCourseIds: Array.isArray(parsed.favoriteCourseIds)
        ? parsed.favoriteCourseIds
        : fallback.favoriteCourseIds,
      favoriteLessonIds: Array.isArray(parsed.favoriteLessonIds)
        ? parsed.favoriteLessonIds
        : fallback.favoriteLessonIds,
      lessonNotes:
        parsed.lessonNotes && typeof parsed.lessonNotes === 'object'
          ? parsed.lessonNotes
          : fallback.lessonNotes,
      customVideoUrls:
        parsed.customVideoUrls && typeof parsed.customVideoUrls === 'object'
          ? parsed.customVideoUrls
          : fallback.customVideoUrls,
      quizAttempts: Array.isArray(parsed.quizAttempts)
        ? parsed.quizAttempts
        : fallback.quizAttempts,
      learningHistory: Array.isArray(parsed.learningHistory)
        ? parsed.learningHistory
        : fallback.learningHistory,
      customCourses: Array.isArray(parsed.customCourses)
        ? parsed.customCourses
        : [],
      lastVisitedLessonId:
        parsed.lastVisitedLessonId ?? fallback.lastVisitedLessonId,
      lastVisitedCourseId:
        parsed.lastVisitedCourseId ?? fallback.lastVisitedCourseId,
      studentProfile: parsed.studentProfile
        ? { ...DEFAULT_DEMO_PROFILE, ...parsed.studentProfile }
        : fallback.studentProfile,
    };
  } catch {
    return createInitialState();
  }
}

export function saveAcademyState(state: AcademyPersistedState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota errors in ephemeral environments
  }
}

export function resetAcademyState(): AcademyPersistedState {
  const fresh: AcademyPersistedState = {
    completedLessonIds: [],
    favoriteCourseIds: [],
    favoriteLessonIds: [],
    lessonNotes: {},
    customVideoUrls: {},
    quizAttempts: [],
    learningHistory: [
      {
        id: `hist-reset-${Date.now()}`,
        type: 'note_saved',
        title: 'Dados demonstrativos restaurados para o estado inicial limpo',
        subtitle: 'Configurações do Sistema',
        timestamp: new Date().toISOString(),
      },
    ],
    customCourses: [],
    lastVisitedLessonId: 'les-01-1',
    lastVisitedCourseId: 'course-01-fundamentos',
    studentProfile: { ...DEFAULT_DEMO_PROFILE },
  };
  saveAcademyState(fresh);
  return fresh;
}

export function getMergedCourses(customCourses: Course[]): Course[] {
  return [...INITIAL_COURSES, ...customCourses];
}

export function createHistoryEntry(
  type: LearningHistoryItem['type'],
  title: string,
  subtitle: string,
  courseId?: string,
  lessonId?: string
): LearningHistoryItem {
  return {
    id: `hist-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    type,
    title,
    subtitle,
    timestamp: new Date().toISOString(),
    courseId,
    lessonId,
  };
}

export function createQuizAttemptEntry(
  quizId: string,
  quizTitle: string,
  category: QuizAttemptRecord['category'],
  scorePercent: number,
  correctCount: number,
  totalQuestions: number,
  passed: boolean
): QuizAttemptRecord {
  return {
    id: `quiz-att-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    quizId,
    quizTitle,
    category,
    scorePercent,
    correctCount,
    totalQuestions,
    passed,
    completedAt: new Date().toISOString(),
  };
}

export function updateProfileState(
  current: AcademyPersistedState,
  updatedProfile: DemoStudentProfile
): AcademyPersistedState {
  const next: AcademyPersistedState = {
    ...current,
    studentProfile: updatedProfile,
  };
  saveAcademyState(next);
  return next;
}
