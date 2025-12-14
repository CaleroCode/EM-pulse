export default function Badge({
  children,
  variant = "primary",
  size = "sm",
  className = "",
}) {
  const baseClasses = "inline-block font-medium rounded-full";

  const variants = {
    primary: "bg-empulsePrimary/20 text-empulsePrimary",
    accent: "bg-empulseAccent/20 text-empulseAccent",
    success: "bg-empulseMid/20 text-empulseMid",
    warning: "bg-yellow-500/20 text-yellow-400",
    error: "bg-red-500/20 text-red-400",
  };

  const sizes = {
    xs: "px-2 py-0.5 text-[10px]",
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-1.5 text-sm",
  };

  return (
    <span
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
}
