export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  active = true,
  ...props
}) {
  const baseClasses = "font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-1 cursor-pointer flex items-center gap-2";

  const variants = {
    primary:
      "text-white hover:shadow-lg hover:shadow-[#15bce6]/40 disabled:opacity-60 disabled:cursor-not-allowed",
    secondary:
      "bg-empulseAccent/20 text-empulseAccent border border-empulseAccent/50 hover:bg-empulseAccent/40 disabled:opacity-60",
    success:
      "bg-empulseMid/20 text-empulseMid border border-empulseMid/50 hover:bg-empulseMid/40 disabled:opacity-60",
    outline:
      "border border-empulseAccent/50 text-slate-100 hover:bg-empulseAccent/10 disabled:opacity-60",
    ghost:
      "text-empulsePrimary hover:text-white hover:bg-empulseAccent/15 disabled:opacity-60",
  };

  const sizes = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    full: "w-full px-4 py-2 text-sm",
  };

  // Gradient base
  let buttonStyle = {};
  if (variant === "primary") {
    buttonStyle = active
      ? { background: "linear-gradient(135deg, #15bce6 0%, #0d7fa8 100%)" }
      : { background: "linear-gradient(135deg, #15bce6 0%, #0d7fa8 100%)", opacity: 0.5 };
  }

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      style={buttonStyle}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
