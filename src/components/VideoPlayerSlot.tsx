import React, { useState, useEffect } from 'react';
import { Play, Video, CheckCircle2, Trash2, AlertCircle, ExternalLink } from 'lucide-react';
import { VideoSlotConfig } from '../types/academy';
import { extractYouTubeId } from '../utils/academyLogic';

interface VideoPlayerSlotProps {
  lessonId: string;
  config: VideoSlotConfig;
  savedUrl?: string;
  onSaveUrl: (lessonId: string, url: string) => void;
}

export const VideoPlayerSlot: React.FC<VideoPlayerSlotProps> = ({
  lessonId,
  config,
  savedUrl,
  onSaveUrl,
}) => {
  const activeUrl = savedUrl !== undefined ? savedUrl : config.youtubeUrl;
  const [inputUrl, setInputUrl] = useState(activeUrl || '');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    setInputUrl(savedUrl !== undefined ? savedUrl : config.youtubeUrl || '');
    setErrorMessage(null);
    setStatusMessage(null);
  }, [lessonId, savedUrl, config.youtubeUrl]);

  const videoId = extractYouTubeId(activeUrl || '');
  const searchUrl = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(config.title + ' estética automotiva ' + config.category);

  const handleApplyVideo = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setStatusMessage(null);

    const trimmed = inputUrl.trim();
    if (!trimmed) {
      setErrorMessage('Informe uma URL válida do YouTube para vincular à aula.');
      return;
    }

    const parsedId = extractYouTubeId(trimmed);
    if (!parsedId) {
      setErrorMessage(
        'Formato inválido. Use um link padrão do YouTube (ex.: https://www.youtube.com/watch?v=... ou https://youtu.be/...).'
      );
      return;
    }

    onSaveUrl(lessonId, trimmed);
    setStatusMessage('Vídeo vinculado com sucesso a esta aula.');
  };

  const handleClearVideo = () => {
    setInputUrl('');
    setErrorMessage(null);
    setStatusMessage('Vínculo de vídeo removido.');
    onSaveUrl(lessonId, '');
  };

  return (
    <div className="bg-[#111720] border border-slate-800 rounded-xl overflow-hidden">
      {/* Metadata Header */}
      <div className="px-5 py-3.5 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 bg-[#0E131B]">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="text-[#38BDF8] font-medium">Componente de Videoaula</span>
            <span aria-hidden="true">·</span>
            <span>{config.category}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">Duração ref.: {config.duration}</span>
          </div>
          <h3 className="text-sm font-semibold text-slate-100 mt-0.5">
            {config.title}
          </h3>
        </div>
        <div className="text-xs text-slate-400">
          {videoId ? (
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Player YouTube Ativo
            </span>
          ) : (
            <span className="text-slate-400">
              Aguardando inclusão de URL real
            </span>
          )}
        </div>
      </div>

      {/* Video Viewport */}
      <div className="aspect-video w-full bg-[#080B0F] relative flex items-center justify-center">
        {videoId ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}`}
            title={config.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="max-w-lg mx-auto px-6 py-8 text-center">
            <div className="w-14 h-14 rounded-full bg-[#161F2C] border border-slate-700/80 flex items-center justify-center mx-auto mb-4 text-[#E5B85C]">
              <Play className="w-6 h-6 translate-x-0.5" />
            </div>
            <p className="text-xs uppercase tracking-wider text-[#38BDF8] font-semibold mb-1">
              Estrutura Preparada para Incorporação
            </p>
            <h4 className="text-base font-semibold text-slate-100 mb-2">
              {config.title}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              {config.description} Nenhum link fictício ou aleatório é pré-carregado.
              Insira abaixo a URL oficial do YouTube quando desejar incorporar o vídeo desta aula.
            </p>
            <a href={searchUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-[#E5B85C] px-4 py-2.5 text-xs font-bold text-[#111318] hover:bg-amber-300">\n              <ExternalLink className="w-3.5 h-3.5" /> Buscar vídeo desta aula no YouTube\n            </a>\n            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400 font-mono tabular-nums">
              <span>Categoria: {config.category}</span>
              <span aria-hidden="true">·</span>
              <span>Tempo estimado: {config.duration}</span>
            </div>
          </div>
        )}
      </div>

      {/* URL Configuration Bar */}
      <form
        onSubmit={handleApplyVideo}
        className="p-4 bg-[#111720] border-t border-slate-800/80 flex flex-col gap-2.5"
      >
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <div className="relative flex-1">
            <label htmlFor={`youtube-url-${lessonId}`} className="sr-only">
              URL do vídeo do YouTube para {config.title}
            </label>
            <div className=" flex items-center">
              <Video className="w-4 h-4 text-slate-500 absolute left-3.5 pointer-events-none" />
              <input
                id={`youtube-url-${lessonId}`}
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="Cole a URL oficial do vídeo do YouTube para esta aula..."
                className="w-full pl-10 pr-3 py-2 text-xs bg-[#0B0F14] border border-slate-800 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-[#38BDF8]"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold bg-[#E5B85C] text-[#111318] rounded-lg hover:bg-[#eab308] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Incorporar Vídeo
            </button>
            {videoId && (
              <button
                type="button"
                onClick={handleClearVideo}
                aria-label="Remover vídeo vinculado"
                className="px-3 py-2 text-xs font-medium bg-[#161F2C] text-slate-300 border border-slate-700 rounded-lg hover:text-white hover:border-slate-600 transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Limpar
              </button>
            )}
          </div>
        </div>

        {errorMessage && (
          <div
            role="alert"
            className="flex items-center gap-2 text-xs text-amber-400 mt-1"
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {statusMessage && !errorMessage && (
          <div className="flex items-center gap-2 text-xs text-emerald-400 mt-1">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}
      </form>
    </div>
  );
};
