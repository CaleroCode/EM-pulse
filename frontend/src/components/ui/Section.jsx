export default function Section({
  children,
  title = "",
  subtitle = "",
  className = "",
  fullHeight = false,
  scrollable = false,
}) {
  return (
    <section
      className={`${
        fullHeight ? "min-h-screen" : ""
      } bg-empulseBg ${className}`}
    >
      <div className="max-w-6xl mx-auto px-4 py-10">
        {title && <h2 className="text-2xl font-semibold mb-2">{title}</h2>}
        {subtitle && (
          <p className="text-sm text-slate-300 mb-6">{subtitle}</p>
        )}
        <div className={scrollable ? "overflow-y-auto custom-scrollbar pr-2" : ""}>
          {children}
        </div>
      </div>
    </section>
  );
}
