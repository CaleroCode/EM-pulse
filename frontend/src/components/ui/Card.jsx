export default function Card({
  children,
  className = "",
  clickable = false,
  hover = true,
}) {
  const baseClasses =
    "bg-empulseAccent/10 border border-empulseAccent/50 rounded-2xl p-4";
  const hoverClasses =
    hover && "hover:border-empulsePrimary/50 transition-all duration-300";
  const clickableClasses = clickable ? "cursor-pointer" : "";

  return (
    <div className={`${baseClasses} ${hoverClasses} ${clickableClasses} ${className}`}>
      {children}
    </div>
  );
}
