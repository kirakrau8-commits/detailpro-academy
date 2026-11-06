import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';

interface ResilientImageProps {
  src?: string;
  alt: string;
  className?: string;
  caption?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  caption,
}) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-[#111720] via-[#151E2B] to-[#0B0F14] border border-slate-800/80 p-6 text-center ${className}`}
      >
        <ShieldCheck className="w-8 h-8 text-[#E5B85C] mb-2 opacity-80" />
        <p className="text-xs font-medium text-slate-300 max-w-xs">{alt}</p>
        {caption && (
          <p className="text-[11px] text-slate-400 mt-1 max-w-sm">{caption}</p>
        )}
      </div>
    );
  }

  return (
    <figure className="relative w-full h-full overflow-hidden">
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className={className}
      />
      {caption && (
        <figcaption className="bg-gradient-to-t from-black/90 via-black/60 to-transparent px-4 py-2.5 text-xs text-slate-300 border-t border-slate-800/60">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
