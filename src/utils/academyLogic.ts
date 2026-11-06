import {
  Course,
  Lesson,
  QuizAssessment,
  QuizAttemptRecord,
  GlossaryTerm,
  ProductItem,
} from '../types/academy';

/**
 * Flattens all lessons from a single course in module and lesson order.
 */
export function getCourseLessons(course: Course): Lesson[] {
  return course.modules
    .slice()
    .sort((a, b) => a.order - b.order)
    .flatMap((mod) =>
      mod.lessons.slice().sort((a, b) => a.order - b.order)
    );
}

/**
 * Flattens all lessons across all courses.
 */
export function getAllLessons(courses: Course[]): Lesson[] {
  return courses.flatMap((course) => getCourseLessons(course));
}

/**
 * Calculates course completion statistics.
 */
export function calculateCourseProgress(
  course: Course,
  completedLessonIds: string[]
): {
  completedCount: number;
  totalCount: number;
  percentage: number;
  totalMinutes: number;
  completedMinutes: number;
} {
  const lessons = getCourseLessons(course);
  const totalCount = lessons.length;
  if (totalCount === 0) {
    return {
      completedCount: 0,
      totalCount: 0,
      percentage: 0,
      totalMinutes: 0,
      completedMinutes: 0,
    };
  }
  const completedSet = new Set(completedLessonIds);
  let completedCount = 0;
  let totalMinutes = 0;
  let completedMinutes = 0;

  for (const lesson of lessons) {
    totalMinutes += lesson.durationMinutes;
    if (completedSet.has(lesson.id)) {
      completedCount += 1;
      completedMinutes += lesson.durationMinutes;
    }
  }

  const percentage = Math.round((completedCount / totalCount) * 100);
  return {
    completedCount,
    totalCount,
    percentage,
    totalMinutes,
    completedMinutes,
  };
}

/**
 * Calculates overall platform progress across all courses.
 */
export function calculateOverallProgress(
  courses: Course[],
  completedLessonIds: string[]
): {
  completedLessons: number;
  totalLessons: number;
  overallPercentage: number;
  completedCourses: number;
  inProgressCourses: number;
  totalHoursCompleted: number;
} {
  const allLessons = getAllLessons(courses);
  const completedSet = new Set(completedLessonIds);
  const totalLessons = allLessons.length;
  const completedLessons = allLessons.filter((l) => completedSet.has(l.id)).length;
  const overallPercentage =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  let completedCourses = 0;
  let inProgressCourses = 0;
  let completedMinutes = 0;

  for (const course of courses) {
    const stats = calculateCourseProgress(course, completedLessonIds);
    completedMinutes += stats.completedMinutes;
    if (stats.totalCount > 0 && stats.completedCount === stats.totalCount) {
      completedCourses += 1;
    } else if (stats.completedCount > 0) {
      inProgressCourses += 1;
    }
  }

  const totalHoursCompleted = Math.round((completedMinutes / 60) * 10) / 10;

  return {
    completedLessons,
    totalLessons,
    overallPercentage,
    completedCourses,
    inProgressCourses,
    totalHoursCompleted,
  };
}

/**
 * Evaluates a quiz submission and returns a deterministic score breakdown.
 */
export function evaluateQuizSubmission(
  quiz: QuizAssessment,
  selectedAnswers: Record<string, string>
): {
  scorePercent: number;
  correctCount: number;
  totalQuestions: number;
  passed: boolean;
  questionResults: {
    questionId: string;
    selectedOptionId: string | undefined;
    correctOptionId: string;
    isCorrect: boolean;
    explanation: string;
  }[];
} {
  const totalQuestions = quiz.questions.length;
  if (totalQuestions === 0) {
    return {
      scorePercent: 0,
      correctCount: 0,
      totalQuestions: 0,
      passed: false,
      questionResults: [],
    };
  }

  let correctCount = 0;
  const questionResults = quiz.questions.map((q) => {
    const selectedOptionId = selectedAnswers[q.id];
    const isCorrect = selectedOptionId === q.correctOptionId;
    if (isCorrect) {
      correctCount += 1;
    }
    return {
      questionId: q.id,
      selectedOptionId,
      correctOptionId: q.correctOptionId,
      isCorrect,
      explanation: q.explanation,
    };
  });

  const scorePercent = Math.round((correctCount / totalQuestions) * 100);
  const passed = scorePercent >= quiz.passingScorePercent;

  return {
    scorePercent,
    correctCount,
    totalQuestions,
    passed,
    questionResults,
  };
}

/**
 * Extracts a clean 11-character YouTube video ID from standard YouTube URLs.
 * Returns null if the URL is empty or not a valid YouTube link.
 */
export function extractYouTubeId(inputUrl: string): string | null {
  const trimmed = inputUrl.trim();
  if (!trimmed) return null;

  if (/^[\w-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  try {
    const url = new URL(trimmed);
    const host = url.hostname.toLowerCase();
    let candidate = '';

    if (host.includes('youtu.be')) {
      candidate = url.pathname.replace(/^\/+/, '').split('/')[0] || '';
    } else if (host.includes('youtube.com') || host.includes('youtube-nocookie.com')) {
      const vParam = url.searchParams.get('v');
      if (vParam) {
        candidate = vParam;
      } else {
        const parts = url.pathname.split('/').filter(Boolean);
        const embedIdx = parts.findIndex((p) => p === 'embed' || p === 'shorts' || p === 'v');
        if (embedIdx !== -1 && parts[embedIdx + 1]) {
          candidate = parts[embedIdx + 1];
        }
      }
    }

    if (/^[\w-]{11}$/.test(candidate)) {
      return candidate;
    }
  } catch {
    return null;
  }

  return null;
}

/**
 * Filters courses by search query, category, level, and favorites.
 */
export function filterCourses(
  courses: Course[],
  options: {
    query?: string;
    category?: string;
    level?: string;
    onlyFavorites?: boolean;
    favoriteCourseIds?: string[];
  }
): Course[] {
  const q = (options.query || '').trim().toLowerCase();
  const category = options.category || 'Todas';
  const level = options.level || 'Todos';
  const favSet = new Set(options.favoriteCourseIds || []);

  return courses.filter((course) => {
    if (options.onlyFavorites && !favSet.has(course.id)) {
      return false;
    }
    if (category !== 'Todas' && course.category !== category) {
      return false;
    }
    if (level !== 'Todos' && course.level !== level) {
      return false;
    }
    if (!q) return true;

    const lessonTitles = getCourseLessons(course)
      .map((l) => `${l.title} ${l.summary}`)
      .join(' ');
    const searchable = `${course.code} ${course.title} ${course.category} ${course.shortDescription} ${course.fullDescription} ${lessonTitles}`.toLowerCase();
    return searchable.includes(q);
  });
}

/**
 * Filters glossary terms by search query and category.
 */
export function filterGlossaryTerms(
  terms: GlossaryTerm[],
  query: string,
  category: string
): GlossaryTerm[] {
  const q = query.trim().toLowerCase();
  return terms.filter((item) => {
    if (category !== 'Todas' && item.category !== category) {
      return false;
    }
    if (!q) return true;
    const haystack = `${item.term} ${item.definition} ${item.practicalContext} ${item.relatedTerms.join(' ')}`.toLowerCase();
    return haystack.includes(q);
  });
}

/**
 * Filters product and equipment library items.
 */
export function filterProducts(
  products: ProductItem[],
  query: string,
  stageFilter: string,
  typeFilter: string
): ProductItem[] {
  const q = query.trim().toLowerCase();
  return products.filter((item) => {
    if (stageFilter !== 'Todas' && item.stage !== stageFilter) {
      return false;
    }
    if (typeFilter !== 'Todos' && item.type !== typeFilter) {
      return false;
    }
    if (!q) return true;
    const haystack = `${item.name} ${item.line} ${item.category} ${item.stage} ${item.technicalUsage} ${item.applicationSurface}`.toLowerCase();
    return haystack.includes(q);
  });
}

/**
 * Computes average quiz score across all attempts.
 */
export function calculateQuizStats(attempts: QuizAttemptRecord[]): {
  totalAttempts: number;
  averageScore: number;
  passedCount: number;
  bestScore: number;
} {
  if (attempts.length === 0) {
    return {
      totalAttempts: 0,
      averageScore: 0,
      passedCount: 0,
      bestScore: 0,
    };
  }
  const sum = attempts.reduce((acc, a) => acc + a.scorePercent, 0);
  const bestScore = Math.max(...attempts.map((a) => a.scorePercent));
  const passedCount = attempts.filter((a) => a.passed).length;

  return {
    totalAttempts: attempts.length,
    averageScore: Math.round(sum / attempts.length),
    passedCount,
    bestScore,
  };
}
