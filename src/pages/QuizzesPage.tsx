import React, { useState } from 'react';
import {
  ClipboardCheck,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  AlertCircle,
} from 'lucide-react';
import { QUIZ_ASSESSMENTS } from '../data/academyData';
import { QuizAssessment, QuizAttemptRecord } from '../types/academy';
import { calculateQuizStats, evaluateQuizSubmission } from '../utils/academyLogic';

interface QuizzesPageProps {
  quizAttempts: QuizAttemptRecord[];
  onRecordQuizAttempt: (
    quiz: QuizAssessment,
    scorePercent: number,
    correctCount: number,
    totalQuestions: number,
    passed: boolean
  ) => void;
}

export const QuizzesPage: React.FC<QuizzesPageProps> = ({
  quizAttempts,
  onRecordQuizAttempt,
}) => {
  const [activeQuizId, setActiveQuizId] = useState<string>(QUIZ_ASSESSMENTS[0].id);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [submittedResult, setSubmittedResult] = useState<ReturnType<
    typeof evaluateQuizSubmission
  > | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const activeQuiz =
    QUIZ_ASSESSMENTS.find((q) => q.id === activeQuizId) || QUIZ_ASSESSMENTS[0];
  const stats = calculateQuizStats(quizAttempts);

  const handleSelectQuiz = (quizId: string) => {
    setActiveQuizId(quizId);
    setSelectedAnswers({});
    setSubmittedResult(null);
    setValidationError(null);
  };

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (submittedResult) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
    setValidationError(null);
  };

  const handleSubmitQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    const unanswered = activeQuiz.questions.filter(
      (q) => !selectedAnswers[q.id]
    );
    if (unanswered.length > 0) {
      setValidationError(
        `Responda todas as questões antes de finalizar (${unanswered.length} pendente${
          unanswered.length > 1 ? 's' : ''
        }).`
      );
      return;
    }

    const result = evaluateQuizSubmission(activeQuiz, selectedAnswers);
    setSubmittedResult(result);
    setValidationError(null);
    onRecordQuizAttempt(
      activeQuiz,
      result.scorePercent,
      result.correctCount,
      result.totalQuestions,
      result.passed
    );
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setSubmittedResult(null);
    setValidationError(null);
  };

  return (
    <div className="space-y-8">
      {/* Header & Summary Stats */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#E5B85C]">
            Fixação e Certificação de Conhecimento
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Avaliações Técnicas e Questionários
          </h1>
          <p className="text-sm text-slate-400">
            Responda aos simulados práticos por área, confira sua pontuação imediata e revise o gabarito comentado.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-[#111720] border border-slate-800 rounded-xl px-4 py-3 text-xs">
          <div>
            <span className="text-slate-400 block">Tentativas</span>
            <strong className="font-mono text-base text-white tabular-nums">
              {stats.totalAttempts}
            </strong>
          </div>
          <div className="h-7 w-px bg-slate-800" />
          <div>
            <span className="text-slate-400 block">Média Geral</span>
            <strong className="font-mono text-base text-[#38BDF8] tabular-nums">
              {stats.averageScore}%
            </strong>
          </div>
          <div className="h-7 w-px bg-slate-800" />
          <div>
            <span className="text-slate-400 block">Melhor Nota</span>
            <strong className="font-mono text-base text-emerald-400 tabular-nums">
              {stats.bestScore}%
            </strong>
          </div>
        </div>
      </div>

      {/* Quiz Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {QUIZ_ASSESSMENTS.map((quiz) => {
          const isSelected = quiz.id === activeQuiz.id;
          const bestAttempt = quizAttempts
            .filter((a) => a.quizId === quiz.id)
            .sort((a, b) => b.scorePercent - a.scorePercent)[0];

          return (
            <button
              key={quiz.id}
              type="button"
              onClick={() => handleSelectQuiz(quiz.id)}
              className={`text-left p-5 rounded-xl border transition-colors flex flex-col justify-between gap-3 cursor-pointer ${
                isSelected
                  ? 'bg-[#161F2C] border-[#E5B85C] text-white'
                  : 'bg-[#111720] border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                  <span className="text-[#38BDF8] font-medium">{quiz.level}</span>
                  <span className="font-mono tabular-nums">
                    Mínimo: {quiz.passingScorePercent}%
                  </span>
                </div>
                <h2 className="font-display text-sm font-bold text-white leading-snug">
                  {quiz.title}
                </h2>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="font-mono text-slate-400 tabular-nums">
                  {quiz.questions.length} questões
                </span>
                {bestAttempt ? (
                  <span
                    className={`font-mono font-semibold tabular-nums ${
                      bestAttempt.passed ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    Melhor: {bestAttempt.scorePercent}%
                  </span>
                ) : (
                  <span className="text-slate-500">Não realizado</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Quiz Form */}
      <form
        onSubmit={handleSubmitQuiz}
        className="bg-[#111720] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6"
      >
        <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-xs text-[#E5B85C] font-semibold">
              {activeQuiz.category} · Nota de corte: {activeQuiz.passingScorePercent}%
            </p>
            <h2 className="font-display text-xl font-bold text-white mt-0.5">
              {activeQuiz.title}
            </h2>
            <p className="text-xs text-slate-400 mt-1">{activeQuiz.description}</p>
          </div>

          {submittedResult && (
            <button
              type="button"
              onClick={handleResetQuiz}
              className="px-4 py-2 text-xs font-semibold bg-[#161F2C] text-slate-100 border border-slate-700 rounded-lg hover:bg-[#1E293B] inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#E5B85C]" />
              <span>Refazer Avaliação</span>
            </button>
          )}
        </div>

        {/* Result Banner if Submitted */}
        {submittedResult && (
          <div
            role="status"
            className={`p-5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              submittedResult.passed
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                : 'bg-amber-950/30 border-amber-500/40 text-amber-200'
            }`}
          >
            <div className="flex items-start gap-3">
              {submittedResult.passed ? (
                <Award className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
              )}
              <div>
                <h3 className="text-base font-bold text-white">
                  {submittedResult.passed
                    ? `Aprovado com ${submittedResult.scorePercent}% de aproveitamento!`
                    : `Pontuação atingida: ${submittedResult.scorePercent}% (Necessário ${activeQuiz.passingScorePercent}%)`}
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Você acertou {submittedResult.correctCount} de{' '}
                  {submittedResult.totalQuestions} questões técnicas. Confira a explicação detalhada abaixo.
                </p>
              </div>
            </div>

            <div className="font-mono text-3xl font-extrabold tabular-nums">
              {submittedResult.scorePercent}%
            </div>
          </div>
        )}

        {/* Questions List */}
        <div className="space-y-6">
          {activeQuiz.questions.map((q, qIndex) => {
            const selectedOpt = selectedAnswers[q.id];
            const qEval = submittedResult?.questionResults.find(
              (r) => r.questionId === q.id
            );

            return (
              <div
                key={q.id}
                role="group"
                aria-labelledby={`question-heading-${q.id}`}
                className="p-5 rounded-xl bg-[#0B0F14] border border-slate-800/90 space-y-3"
              >
                <h3
                  id={`question-heading-${q.id}`}
                  className="text-sm font-bold text-slate-100 leading-relaxed"
                >
                  <span className="font-mono text-[#E5B85C] mr-2">
                    Questão 0{qIndex + 1}.
                  </span>
                  {q.question}
                </h3>

                <div className="space-y-2 pt-1">
                  {q.options.map((opt) => {
                    const isChecked = selectedOpt === opt.id;
                    const isCorrectOption = opt.id === q.correctOptionId;

                    let optionStyle =
                      'border-slate-800 bg-[#111720] text-slate-300 hover:border-slate-700';
                    if (submittedResult) {
                      if (isCorrectOption) {
                        optionStyle =
                          'border-emerald-500/60 bg-emerald-950/30 text-emerald-200';
                      } else if (isChecked && !isCorrectOption) {
                        optionStyle =
                          'border-rose-500/60 bg-rose-950/30 text-rose-200';
                      }
                    } else if (isChecked) {
                      optionStyle =
                        'border-[#38BDF8] bg-[#161F2C] text-white';
                    }

                    return (
                      <label
                        key={opt.id}
                        className={`flex items-start gap-3 p-3 rounded-lg border text-xs cursor-pointer transition-colors ${optionStyle}`}
                      >
                        <input
                          type="radio"
                          name={q.id}
                          value={opt.id}
                          checked={isChecked}
                          disabled={Boolean(submittedResult)}
                          onChange={() => handleSelectOption(q.id, opt.id)}
                          className="mt-0.5 accent-[#E5B85C]"
                        />
                        <span className="flex-1 leading-relaxed">
                          <strong className="font-mono uppercase mr-1.5">
                            {opt.id})
                          </strong>
                          {opt.text}
                        </span>
                        {submittedResult && isCorrectOption && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                        {submittedResult && isChecked && !isCorrectOption && (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        )}
                      </label>
                    );
                  })}
                </div>

                {qEval && (
                  <div className="mt-3 pt-3 border-t border-slate-800 text-xs text-slate-300">
                    <strong
                      className={
                        qEval.isCorrect ? 'text-emerald-400' : 'text-amber-400'
                      }
                    >
                      {qEval.isCorrect
                        ? 'Resposta Correta: '
                        : 'Justificativa Técnica: '}
                    </strong>
                    {qEval.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {validationError && (
          <div
            role="alert"
            className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {!submittedResult && (
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-3 text-xs font-bold bg-[#E5B85C] text-[#111318] rounded-xl hover:bg-[#eab308] transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <ClipboardCheck className="w-4 h-4" />
              <span>Finalizar e Conferir Pontuação</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
