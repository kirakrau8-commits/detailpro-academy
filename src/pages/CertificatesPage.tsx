import React, { useMemo, useState } from 'react';
import { Award, Printer, LockKeyhole, CheckCircle2, BookOpen, ShieldAlert } from 'lucide-react';
import { Course, QuizAttemptRecord } from '../types/academy';
import { QUIZ_ASSESSMENTS } from '../data/academyData';
import { getCourseLessons } from '../utils/academyLogic';

interface CertificatesPageProps {
  courses: Course[];
  completedLessonIds: string[];
  quizAttempts: QuizAttemptRecord[];
  studentName: string;
}

export const CertificatesPage: React.FC<CertificatesPageProps> = ({ courses, completedLessonIds, quizAttempts, studentName }) => {
  const [selectedId, setSelectedId] = useState('');
  const records = useMemo(() => courses.map(course => {
    const lessons = getCourseLessons(course);
    const completed = lessons.filter(lesson => completedLessonIds.includes(lesson.id)).length;
    const complete = lessons.length > 0 && completed === lessons.length;
    const assessments = QUIZ_ASSESSMENTS.filter(quiz => quiz.courseId === course.id);
    const passed = quizAttempts.filter(attempt => attempt.passed && assessments.some(quiz => quiz.id === attempt.quizId)).sort((a,b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())[0];
    return { course, completed, total: lessons.length, complete, hasAssessment: assessments.length > 0, passed };
  }), [courses, completedLessonIds, quizAttempts]);
  const eligible = records.filter(record => record.complete && record.passed);
  const selected = eligible.find(record => record.course.id === selectedId) || eligible[0];
  const escapeHtml = (value: string) => value.replace(/[&<>"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char] || char));
  const printCertificate = (record: typeof records[number]) => {
    if (!record.passed) return;
    const date = new Date(record.passed.completedAt);
    const dateText = date.toLocaleDateString('pt-BR');
    const code = 'EDU-' + record.course.code.replace(/[^a-z0-9]/gi, '').toUpperCase() + '-' + date.getTime().toString().slice(-7);
    const w = window.open('', '_blank');
    if (!w) { window.alert('Permita a abertura de janelas para imprimir o certificado.'); return; }
    const html = '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Certificado - ' + escapeHtml(record.course.title) + '</title><style>*{box-sizing:border-box}body{margin:0;padding:35px;background:#f1f3f5;font-family:Georgia,serif;color:#17202a}.certificate{max-width:1000px;min-height:680px;margin:0 auto;background:#fff;border:12px double #b68a3a;padding:65px 75px;text-align:center;display:flex;flex-direction:column;justify-content:center}.brand{font:700 13px Arial,sans-serif;letter-spacing:5px;color:#8b6728}.eyebrow{margin-top:48px;font:12px Arial,sans-serif;letter-spacing:4px;color:#667085}.title{font-size:48px;margin:18px 0;color:#17202a}.name{font-size:34px;font-weight:bold;border-bottom:1px solid #b68a3a;padding:12px 0 18px;margin:10px auto 25px;max-width:700px}.copy{font-size:18px;line-height:1.7;max-width:760px;margin:0 auto}.course{font-size:27px;font-weight:bold;margin:18px 0;color:#8b6728}.footer{display:flex;justify-content:space-between;gap:25px;margin-top:65px;font:12px Arial,sans-serif;color:#475467}.seal{font:700 11px Arial,sans-serif;letter-spacing:2px;border:1px solid #b68a3a;padding:12px}@media print{body{padding:0;background:white}.certificate{min-height:96vh;break-inside:avoid}}</style></head><body><main class="certificate"><div class="brand">ESTÉTICA DETALHAMENTO. EDU</div><div class="eyebrow">CERTIFICADO DE CONCLUSÃO</div><h1 class="title">Certificamos que</h1><div class="name">' + escapeHtml(studentName || 'Estudante') + '</div><p class="copy">concluiu as aulas do curso e obteve aprovação na avaliação correspondente, demonstrando aproveitamento no conteúdo educacional de</p><div class="course">' + escapeHtml(record.course.title) + '</div><p class="copy">' + escapeHtml(record.course.category) + ' · Carga horária estimada: ' + record.course.estimatedHours + ' horas</p><div class="footer"><div><b>Data de conclusão</b><br>' + dateText + '</div><div class="seal">REGISTRO INTERNO<br>' + code + '</div><div><b>Plataforma</b><br>Estética Detalhamento. edu</div></div></main><script>window.onload=function(){window.print()}<\/script></body></html>';
    w.document.write(html);
    w.document.close();
  };

  return <div className="space-y-7">
    <header className="border-b border-slate-800 pb-6"><p className="text-xs font-semibold uppercase tracking-wider text-[#38BDF8]">Reconhecimento de aprendizagem</p><h1 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">Certificados</h1><p className="text-sm text-slate-400 mt-2 max-w-3xl">A emissão é liberada quando todas as aulas do curso estão concluídas e a avaliação vinculada foi aprovada.</p></header>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div className="rounded-xl border border-slate-800 bg-[#111720] p-4"><p className="text-xs text-slate-400">Certificados liberados</p><p className="text-2xl font-bold text-emerald-400 mt-1">{eligible.length}</p></div>
      <div className="rounded-xl border border-slate-800 bg-[#111720] p-4"><p className="text-xs text-slate-400">Cursos concluídos</p><p className="text-2xl font-bold text-white mt-1">{records.filter(r=>r.complete).length}</p></div>
      <div className="rounded-xl border border-slate-800 bg-[#111720] p-4"><p className="text-xs text-slate-400">Cursos no catálogo</p><p className="text-2xl font-bold text-white mt-1">{records.length}</p></div>
    </div>
    <div className="rounded-xl border border-amber-900/50 bg-amber-950/20 p-4 flex gap-3 text-xs text-amber-200"><ShieldAlert className="w-5 h-5 shrink-0"/><p>Este é um comprovante interno de conclusão emitido pela plataforma. Não representa diploma técnico, certificação profissional reconhecida por órgão regulador ou acreditação externa.</p></div>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      <section className="lg:col-span-7 space-y-3"><h2 className="font-semibold text-white">Trilhas e requisitos</h2>{records.map(record=><div key={record.course.id} className="rounded-xl border border-slate-800 bg-[#111720] p-4 flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-[#1B2532] flex items-center justify-center shrink-0">{record.complete&&record.passed?<Award className="w-5 h-5 text-[#E5B85C]"/>:record.complete?<CheckCircle2 className="w-5 h-5 text-emerald-400"/>:<BookOpen className="w-5 h-5 text-slate-500"/>}</div><div className="min-w-0 flex-1"><p className="text-sm font-semibold text-white">{record.course.title}</p><p className="text-xs text-slate-400 mt-1">{record.completed}/{record.total} aulas · {record.passed?'Avaliação aprovada: '+record.passed.scorePercent+'%':record.hasAssessment?'Avaliação pendente ou não aprovada':'Sem avaliação vinculada'}</p><div className="h-1.5 rounded-full bg-[#0B0F14] mt-2 overflow-hidden"><div className="h-full bg-[#38BDF8]" style={{width:(record.total?record.completed/record.total*100:0)+'%'}}/></div></div>{record.complete&&record.passed?<button onClick={()=>setSelectedId(record.course.id)} className="text-xs font-semibold text-[#E5B85C] hover:underline shrink-0">Visualizar</button>:<span className="text-[11px] text-slate-500 shrink-0 inline-flex items-center gap-1"><LockKeyhole className="w-3 h-3"/>Bloqueado</span>}</div>)}</section>
      <aside className="lg:col-span-5 rounded-xl border border-slate-800 bg-[#111720] p-5 space-y-4"><div className="flex items-center gap-2"><Award className="w-5 h-5 text-[#E5B85C]"/><h2 className="font-semibold text-white">Emissão do certificado</h2></div>{selected?<><div className="rounded-lg border border-slate-700 bg-[#0B0F14] p-5 text-center"><p className="text-[10px] tracking-[.25em] text-[#E5B85C]">ESTÉTICA DETALHAMENTO. EDU</p><Award className="w-10 h-10 text-[#E5B85C] mx-auto my-4"/><p className="text-xs text-slate-400">CERTIFICADO DE CONCLUSÃO</p><p className="text-lg font-bold text-white mt-2">{studentName || 'Estudante'}</p><p className="text-xs text-slate-400 mt-3">Concluiu e foi aprovado em</p><p className="font-semibold text-[#E5B85C] mt-1">{selected.course.title}</p><p className="text-xs text-slate-500 mt-3">{new Date(selected.passed!.completedAt).toLocaleDateString('pt-BR')}</p></div><button onClick={()=>printCertificate(selected)} className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#E5B85C] px-4 py-3 text-sm font-bold text-[#111318]"><Printer className="w-4 h-4"/>Imprimir / Salvar PDF</button><p className="text-[11px] text-slate-500">Use a opção “Salvar como PDF” na janela de impressão.</p></>:<div className="text-center py-8"><LockKeyhole className="w-8 h-8 text-slate-600 mx-auto mb-3"/><p className="text-sm font-semibold text-white">Nenhum certificado liberado</p><p className="text-xs text-slate-400 mt-2">Conclua todas as aulas e seja aprovado na avaliação vinculada ao curso.</p></div>}</aside>
    </div>
  </div>;
};
