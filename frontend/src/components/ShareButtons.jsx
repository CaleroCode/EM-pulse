import React from 'react';

export default function ShareButtons({ title, url, description = "" }) {
  const encodedUrl = encodeURIComponent(url || window.location.href);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  };

  const openShare = (link) => {
    window.open(link, '_blank', 'width=600,height=400');
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-xs text-slate-400 font-semibold">Compartir:</span>
      
      <button
        onClick={() => openShare(shareLinks.twitter)}
        title="Compartir en Twitter"
        className="px-3 py-2 bg-sky-500/20 hover:bg-sky-500/40 text-sky-400 rounded-lg transition text-xs font-semibold flex items-center gap-1"
      >
        𝕏
      </button>

      <button
        onClick={() => openShare(shareLinks.facebook)}
        title="Compartir en Facebook"
        className="px-3 py-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 rounded-lg transition text-xs font-semibold flex items-center gap-1"
      >
        f
      </button>

      <button
        onClick={() => openShare(shareLinks.whatsapp)}
        title="Compartir en WhatsApp"
        className="px-3 py-2 bg-green-500/20 hover:bg-green-500/40 text-green-400 rounded-lg transition text-xs font-semibold flex items-center gap-1"
      >
        💬
      </button>

      <button
        onClick={() => openShare(shareLinks.linkedin)}
        title="Compartir en LinkedIn"
        className="px-3 py-2 bg-blue-700/20 hover:bg-blue-700/40 text-blue-300 rounded-lg transition text-xs font-semibold flex items-center gap-1"
      >
        in
      </button>

      <button
        onClick={() => openShare(shareLinks.email)}
        title="Compartir por Email"
        className="px-3 py-2 bg-slate-600/20 hover:bg-slate-600/40 text-slate-400 rounded-lg transition text-xs font-semibold flex items-center gap-1"
      >
        ✉️
      </button>

      <button
        onClick={() => {
          navigator.clipboard.writeText(url || window.location.href);
          alert('Enlace copiado al portapapeles');
        }}
        title="Copiar enlace"
        className="px-3 py-2 bg-slate-500/20 hover:bg-slate-500/40 text-slate-400 rounded-lg transition text-xs font-semibold flex items-center gap-1"
      >
        🔗
      </button>
    </div>
  );
}
