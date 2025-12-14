export default function Modal({
  isOpen = false,
  onClose,
  title = "",
  children,
  size = "md",
}) {
  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className={`bg-empulseBg border border-empulseAccent/40 rounded-2xl p-8 w-full mx-4 ${sizes[size]}`}
      >
        {title && (
          <h2 className="text-2xl font-semibold mb-6">{title}</h2>
        )}

        {children}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition"
          aria-label="Cerrar modal"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
