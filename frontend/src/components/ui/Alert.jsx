export default function Alert({
  message = "",
  type = "info",
  onClose = null,
  className = "",
}) {
  const variants = {
    success: "bg-emerald-500/20 border border-emerald-500/50 text-emerald-400",
    error: "bg-red-500/20 border border-red-500/50 text-red-400",
    warning: "bg-yellow-500/20 border border-yellow-500/50 text-yellow-400",
    info: "bg-blue-500/20 border border-blue-500/50 text-blue-400",
  };

  return (
    <div
      className={`p-3 rounded-lg text-xs flex items-center justify-between ${
        variants[type]
      } ${className}`}
    >
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-2 hover:opacity-70 transition"
        >
          ✕
        </button>
      )}
    </div>
  );
}
