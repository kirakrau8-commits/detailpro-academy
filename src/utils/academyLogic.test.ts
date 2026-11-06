import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCourseProgress,
  calculateOverallProgress,
  evaluateQuizSubmission,
  extractYouTubeId,
  filterCourses,
  calculateQuizStats,
} from './academyLogic';
import { Course, QuizAssessment } from '../types/academy';

const sampleCourse: Course = {
  id: 'course-1',
  code: 'DP-01',
  title: 'Fundamentos da Estética Automotiva',
  category: 'Fundamentos e segurança',
  level: 'Iniciante',
  shortDescription: 'Segurança, química e EPIs.',
  fullDescription: 'Curso completo de fundamentos.',
  estimatedHours: 4,
  instructorNote: 'Sempre use EPIs.',
  skillsAcquired: ['Diluição', 'EPIs'],
  modules: [
    {
      id: 'mod-1',
      courseId: 'course-1',
      order: 1,
      title: 'Módulo 1',
      description: 'Introdução',
      lessons: [
        {
          id: 'les-1',
          courseId: 'course-1',
          moduleId: 'mod-1',
          order: 1,
          title: 'Aula 1: Química e pH',
          summary: 'Escala de pH',
          durationMinutes: 30,
          contentParagraphs: ['Conteúdo 1'],
          keyTakeaways: ['Ponto 1'],
          videoConfig: {
            title: 'Química e pH',
            description: 'Vídeo aula 1',
            duration: '12:00',
            category: 'Fundamentos e segurança',
            youtubeUrl: '',
          },
          materials: [],
          exercise: {
            title: 'Exercício 1',
            objective: 'Medir diluição',
            requiredTools: ['Copo dosador'],
            steps: ['Passo 1'],
            safetyWarning: 'Use luvas nitrílicas',
            successCriteria: 'Diluição 1:10 exata',
          },
        },
        {
          id: 'les-2',
          courseId: 'course-1',
          moduleId: 'mod-1',
          order: 2,
          title: 'Aula 2: EPIs no Box',
          summary: 'Proteção individual',
          durationMinutes: 30,
          contentParagraphs: ['Conteúdo 2'],
          keyTakeaways: ['Ponto 2'],
          videoConfig: {
            title: 'EPIs',
            description: 'Vídeo aula 2',
            duration: '15:00',
            category: 'Fundamentos e segurança',
            youtubeUrl: '',
          },
          materials: [],
          exercise: {
            title: 'Exercício 2',
            objective: 'Selecionar EPI',
            requiredTools: ['Respirador'],
            steps: ['Passo 1'],
            safetyWarning: 'Verifique vedação',
            successCriteria: 'EPI correto',
          },
        },
      ],
    },
  ],
};

test('calculateCourseProgress computes exact completion percentage and minutes', () => {
  const statsHalf = calculateCourseProgress(sampleCourse, ['les-1']);
  assert.equal(statsHalf.completedCount, 1);
  assert.equal(statsHalf.totalCount, 2);
  assert.equal(statsHalf.percentage, 50);
  assert.equal(statsHalf.completedMinutes, 30);
  assert.equal(statsHalf.totalMinutes, 60);

  const statsFull = calculateCourseProgress(sampleCourse, ['les-1', 'les-2']);
  assert.equal(statsFull.percentage, 100);
});

test('calculateOverallProgress aggregates across courses accurately', () => {
  const overall = calculateOverallProgress([sampleCourse], ['les-1', 'les-2']);
  assert.equal(overall.completedLessons, 2);
  assert.equal(overall.totalLessons, 2);
  assert.equal(overall.overallPercentage, 100);
  assert.equal(overall.completedCourses, 1);
  assert.equal(overall.totalHoursCompleted, 1);
});

test('evaluateQuizSubmission scores answers and determines pass/fail threshold', () => {
  const sampleQuiz: QuizAssessment = {
    id: 'quiz-1',
    title: 'Avaliação Fundamentos',
    category: 'Fundamentos e segurança',
    courseId: 'course-1',
    level: 'Iniciante',
    passingScorePercent: 70,
    description: 'Teste técnico',
    questions: [
      {
        id: 'q1',
        question: 'Qual EPI protege contra vapores de vitrificadores?',
        options: [
          { id: 'a', text: 'Máscara cirúrgica comum' },
          { id: 'b', text: 'Respirador semifacial com filtro para vapores orgânicos' },
        ],
        correctOptionId: 'b',
        explanation: 'Vapores orgânicos exigem cartucho químico específico.',
      },
      {
        id: 'q2',
        question: 'O que significa diluição 1:10?',
        options: [
          { id: 'a', text: '1 parte de produto para 9 partes de água (total 10 partes)' },
          { id: 'b', text: '10 litros de produto puro' },
        ],
        correctOptionId: 'a',
        explanation: '1 parte de produto em um volume total final de 10 partes.',
      },
    ],
  };

  const passingResult = evaluateQuizSubmission(sampleQuiz, { q1: 'b', q2: 'a' });
  assert.equal(passingResult.scorePercent, 100);
  assert.equal(passingResult.passed, true);
  assert.equal(passingResult.correctCount, 2);

  const failingResult = evaluateQuizSubmission(sampleQuiz, { q1: 'a', q2: 'a' });
  assert.equal(failingResult.scorePercent, 50);
  assert.equal(failingResult.passed, false);
});

test('extractYouTubeId extracts valid 11-char IDs and rejects invalid URLs', () => {
  assert.equal(
    extractYouTubeId('https://www.youtube.com/watch?v=nbKBV9nBAMY'),
    'nbKBV9nBAMY'
  );
  assert.equal(
    extractYouTubeId('https://youtu.be/Yle10pgcnj8?si=123'),
    'Yle10pgcnj8'
  );
  assert.equal(
    extractYouTubeId('https://www.youtube-nocookie.com/embed/L0L3Vx-WD1o'),
    'L0L3Vx-WD1o'
  );
  assert.equal(extractYouTubeId('https://example.com/video'), null);
  assert.equal(extractYouTubeId(''), null);
});

test('filterCourses filters by search query, category, and favorites', () => {
  const byQuery = filterCourses([sampleCourse], { query: 'Química' });
  assert.equal(byQuery.length, 1);

  const byWrongCategory = filterCourses([sampleCourse], {
    category: 'Lavagem técnica',
  });
  assert.equal(byWrongCategory.length, 0);

  const byFavorites = filterCourses([sampleCourse], {
    onlyFavorites: true,
    favoriteCourseIds: [],
  });
  assert.equal(byFavorites.length, 0);
});

test('calculateQuizStats computes average and best score', () => {
  const stats = calculateQuizStats([
    {
      id: 'att-1',
      quizId: 'q1',
      quizTitle: 'Quiz 1',
      category: 'Fundamentos e segurança',
      scorePercent: 80,
      correctCount: 4,
      totalQuestions: 5,
      passed: true,
      completedAt: '2026-11-05T10:00:00Z',
    },
    {
      id: 'att-2',
      quizId: 'q2',
      quizTitle: 'Quiz 2',
      category: 'Lavagem técnica',
      scorePercent: 100,
      correctCount: 5,
      totalQuestions: 5,
      passed: true,
      completedAt: '2026-11-05T11:00:00Z',
    },
  ]);
  assert.equal(stats.totalAttempts, 2);
  assert.equal(stats.averageScore, 90);
  assert.equal(stats.bestScore, 100);
  assert.equal(stats.passedCount, 2);
});
