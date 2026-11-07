import React, { useState, useEffect } from 'react';
import {
  AcademyPersistedState,
  Course,
  DemoStudentProfile,
  Lesson,
  PageView,
  QuizAssessment,
} from './types/academy';
import {
  createHistoryEntry,
  createQuizAttemptEntry,
  getMergedCourses,
  loadAcademyState,
  resetAcademyState,
  saveAcademyState,
} from './services/storageService';
import {
  calculateOverallProgress,
  getCourseLessons,
} from './utils/academyLogic';
import { AppShell } from './components/AppShell';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { CoursesPage } from './pages/CoursesPage';
import { ClassroomPage } from './pages/ClassroomPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProceduresPage } from './pages/ProceduresPage';
import { ServiceCalculatorPage } from './pages/ServiceCalculatorPage';
import { GlossaryPage } from './pages/GlossaryPage';
import { QuizzesPage } from './pages/QuizzesPage';
import { ProgressPage } from './pages/ProgressPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { AdminPage } from './pages/AdminPage';

export function App() {
  const [state, setState] = useState<AcademyPersistedState>(() =>
    loadAcademyState()
  );
  const [activePage, setActivePage] = useState<PageView>('home');
  const [categoryFilterForCourses, setCategoryFilterForCourses] =
    useState<string>('Todas');

  const allCourses = getMergedCourses(state.customCourses);
  const activeCourseId =
    state.lastVisitedCourseId &&
    allCourses.some((c) => c.id === state.lastVisitedCourseId)
      ? state.lastVisitedCourseId
      : allCourses[0].id;

  const activeCourseObj =
    allCourses.find((c) => c.id === activeCourseId) || allCourses[0];
  const activeCourseLessons = getCourseLessons(activeCourseObj);
  const activeLessonId =
    state.lastVisitedLessonId &&
    activeCourseLessons.some((l) => l.id === state.lastVisitedLessonId)
      ? state.lastVisitedLessonId
      : activeCourseLessons[0]?.id || '';

  useEffect(() => {
    saveAcademyState(state);
  }, [state]);

  const overallStats = calculateOverallProgress(
    allCourses,
    state.completedLessonIds
  );

  const handleSelectCourse = (courseId: string) => {
    const targetCourse = allCourses.find((c) => c.id === courseId);
    if (!targetCourse) return;
    const lessons = getCourseLessons(targetCourse);
    const firstUnfinished =
      lessons.find((l) => !state.completedLessonIds.includes(l.id)) ||
      lessons[0];

    setState((prev) => ({
      ...prev,
      lastVisitedCourseId: targetCourse.id,
      lastVisitedLessonId: firstUnfinished ? firstUnfinished.id : prev.lastVisitedLessonId,
    }));
    setActivePage('classroom');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLesson = (courseId: string, lessonId: string) => {
    setState((prev) => ({
      ...prev,
      lastVisitedCourseId: courseId,
      lastVisitedLessonId: lessonId,
    }));
    setActivePage('classroom');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleFavoriteCourse = (courseId: string) => {
    setState((prev) => {
      const exists = prev.favoriteCourseIds.includes(courseId);
      const nextFavs = exists
        ? prev.favoriteCourseIds.filter((id) => id !== courseId)
        : [...prev.favoriteCourseIds, courseId];
      return {
        ...prev,
        favoriteCourseIds: nextFavs,
      };
    });
  };

  const handleToggleFavoriteLesson = (lessonId: string) => {
    setState((prev) => {
      const exists = prev.favoriteLessonIds.includes(lessonId);
      const nextFavs = exists
        ? prev.favoriteLessonIds.filter((id) => id !== lessonId)
        : [...prev.favoriteLessonIds, lessonId];
      return {
        ...prev,
        favoriteLessonIds: nextFavs,
      };
    });
  };

  const handleToggleCompleteLesson = (lesson: Lesson) => {
    const course = allCourses.find((c) => c.id === lesson.courseId);
    setState((prev) => {
      const isAlreadyDone = prev.completedLessonIds.includes(lesson.id);
      const nextCompleted = isAlreadyDone
        ? prev.completedLessonIds.filter((id) => id !== lesson.id)
        : [...prev.completedLessonIds, lesson.id];

      const nextHistory = !isAlreadyDone
        ? [
            createHistoryEntry(
              'lesson_completed',
              `Aula concluída: ${lesson.title}`,
              `${course?.code || 'DP'} · ${course?.category || ''}`,
              lesson.courseId,
              lesson.id
            ),
            ...prev.learningHistory,
          ]
        : prev.learningHistory;

      return {
        ...prev,
        completedLessonIds: nextCompleted,
        learningHistory: nextHistory.slice(0, 40),
      };
    });
  };

  const handleSaveLessonNote = (lessonId: string, note: string) => {
    setState((prev) => ({
      ...prev,
      lessonNotes: {
        ...prev.lessonNotes,
        [lessonId]: note,
      },
      learningHistory: [
        createHistoryEntry(
          'note_saved',
          'Anotação técnica atualizada no caderno de aula',
          `Aula ID: ${lessonId}`,
          prev.lastVisitedCourseId || undefined,
          lessonId
        ),
        ...prev.learningHistory,
      ].slice(0, 40),
    }));
  };

  const handleSaveLessonVideoUrl = (lessonId: string, url: string) => {
    setState((prev) => ({
      ...prev,
      customVideoUrls: {
        ...prev.customVideoUrls,
        [lessonId]: url,
      },
      learningHistory: url
        ? [
            createHistoryEntry(
              'video_linked',
              'Vídeo do YouTube vinculado ao componente de aula',
              `Aula ID: ${lessonId}`,
              prev.lastVisitedCourseId || undefined,
              lessonId
            ),
            ...prev.learningHistory,
          ].slice(0, 40)
        : prev.learningHistory,
    }));
  };

  const handleRecordQuizAttempt = (
    quiz: QuizAssessment,
    scorePercent: number,
    correctCount: number,
    totalQuestions: number,
    passed: boolean
  ) => {
    const newAttempt = createQuizAttemptEntry(
      quiz.id,
      quiz.title,
      quiz.category,
      scorePercent,
      correctCount,
      totalQuestions,
      passed
    );

    setState((prev) => ({
      ...prev,
      quizAttempts: [newAttempt, ...prev.quizAttempts],
      learningHistory: [
        createHistoryEntry(
          'quiz_completed',
          `${passed ? 'Avaliação aprovada' : 'Avaliação realizada'} (${scorePercent}%): ${quiz.title}`,
          `${correctCount}/${totalQuestions} questões corretas`,
          quiz.courseId
        ),
        ...prev.learningHistory,
      ].slice(0, 40),
    }));
  };

  const handleUpdateProfile = (updatedProfile: DemoStudentProfile) => {
    setState((prev) => ({
      ...prev,
      studentProfile: updatedProfile,
    }));
  };

  const handleResetAllData = () => {
    const fresh = resetAcademyState();
    setState(fresh);
  };

  const handleAddCustomCourse = (newCourse: Course) => {
    setState((prev) => ({
      ...prev,
      customCourses: [...prev.customCourses, newCourse],
      learningHistory: [
        createHistoryEntry(
          'course_created',
          `Novo curso publicado: ${newCourse.title}`,
          `${newCourse.code} · ${newCourse.category}`,
          newCourse.id
        ),
        ...prev.learningHistory,
      ].slice(0, 40),
    }));
  };

  const handleRemoveCustomCourse = (courseId: string) => {
    setState((prev) => ({
      ...prev,
      customCourses: prev.customCourses.filter((c) => c.id !== courseId),
      favoriteCourseIds: prev.favoriteCourseIds.filter((id) => id !== courseId),
    }));
  };

  return (
    <AppShell
      activePage={activePage}
      onNavigate={(page) => {
        if (page !== 'courses') {
          setCategoryFilterForCourses('Todas');
        }
        setActivePage(page);
      }}
      overallPercentage={overallStats.overallPercentage}
      completedLessons={overallStats.completedLessons}
      totalLessons={overallStats.totalLessons}
      studentName={state.studentProfile.displayName}
    >
      {activePage === 'home' && (
        <HomePage
          courses={allCourses}
          completedLessonIds={state.completedLessonIds}
          favoriteCourseIds={state.favoriteCourseIds}
          overallPercentage={overallStats.overallPercentage}
          completedLessonsCount={overallStats.completedLessons}
          totalLessonsCount={overallStats.totalLessons}
          onNavigate={setActivePage}
          onSelectCourse={handleSelectCourse}
          onToggleFavoriteCourse={handleToggleFavoriteCourse}
          onSelectCategoryInCourses={(category) => {
            setCategoryFilterForCourses(category);
            setActivePage('courses');
          }}
        />
      )}

      {activePage === 'dashboard' && (
        <DashboardPage
          courses={allCourses}
          completedLessonIds={state.completedLessonIds}
          favoriteCourseIds={state.favoriteCourseIds}
          favoriteLessonIds={state.favoriteLessonIds}
          lastVisitedLessonId={state.lastVisitedLessonId}
          quizAttempts={state.quizAttempts}
          learningHistory={state.learningHistory}
          studentProfile={state.studentProfile}
          onNavigate={setActivePage}
          onOpenLesson={handleOpenLesson}
          onSelectCourse={handleSelectCourse}
        />
      )}

      {activePage === 'courses' && (
        <CoursesPage
          courses={allCourses}
          completedLessonIds={state.completedLessonIds}
          favoriteCourseIds={state.favoriteCourseIds}
          initialCategoryFilter={categoryFilterForCourses}
          onToggleFavoriteCourse={handleToggleFavoriteCourse}
          onSelectCourse={handleSelectCourse}
          onNavigate={setActivePage}
        />
      )}

      {activePage === 'classroom' && (
        <ClassroomPage
          courses={allCourses}
          activeCourseId={activeCourseId}
          activeLessonId={activeLessonId}
          completedLessonIds={state.completedLessonIds}
          favoriteLessonIds={state.favoriteLessonIds}
          lessonNotes={state.lessonNotes}
          customVideoUrls={state.customVideoUrls}
          onSelectCourseAndLesson={handleOpenLesson}
          onToggleCompleteLesson={handleToggleCompleteLesson}
          onToggleFavoriteLesson={handleToggleFavoriteLesson}
          onSaveLessonNote={handleSaveLessonNote}
          onSaveLessonVideoUrl={handleSaveLessonVideoUrl}
        />
      )}

      {activePage === 'products' && <ProductsPage />}

      {activePage === 'procedures' && <ProceduresPage />}

      {activePage === 'calculator' && <ServiceCalculatorPage />}

      {activePage === 'glossary' && <GlossaryPage />}

      {activePage === 'quizzes' && (
        <QuizzesPage
          quizAttempts={state.quizAttempts}
          onRecordQuizAttempt={handleRecordQuizAttempt}
        />
      )}

      {activePage === 'progress' && (
        <ProgressPage
          courses={allCourses}
          completedLessonIds={state.completedLessonIds}
          quizAttempts={state.quizAttempts}
          learningHistory={state.learningHistory}
          onSelectCourse={handleSelectCourse}
        />
      )}

      {activePage === 'profile' && (
        <ProfilePage
          studentProfile={state.studentProfile}
          courses={allCourses}
          completedLessonIds={state.completedLessonIds}
          lessonNotes={state.lessonNotes}
          onNavigate={setActivePage}
          onOpenLesson={handleOpenLesson}
        />
      )}

      {activePage === 'settings' && (
        <SettingsPage
          persistedState={state}
          onUpdateProfile={handleUpdateProfile}
          onResetAllData={handleResetAllData}
        />
      )}

      {activePage === 'admin' && (
        <AdminPage
          courses={allCourses}
          customCourses={state.customCourses}
          onAddCustomCourse={handleAddCustomCourse}
          onRemoveCustomCourse={handleRemoveCustomCourse}
          onSelectCourse={handleSelectCourse}
        />
      )}
    </AppShell>
  );
}

export default App;
