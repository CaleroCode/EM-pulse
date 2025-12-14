export default function Input({
  type = "text",
  placeholder = "",
  value,
  onChange,
  label = "",
  error = false,
  errorMessage = "",
  className = "",
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs text-slate-300 mb-1 font-semibold">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full rounded-lg bg-empulseBg border px-4 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 transition ${
          error
            ? "border-red-500/50 focus:ring-red-500"
            : "border-empulseAccent/40 focus:ring-empulsePrimary"
        } ${className}`}
        {...props}
      />
      {error && errorMessage && (
        <p className="text-xs text-red-400 mt-1">{errorMessage}</p>
      )}
    </div>
  );
}
