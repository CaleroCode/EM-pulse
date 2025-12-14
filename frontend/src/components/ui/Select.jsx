export default function Select({
  value,
  onChange,
  options = [],
  label = "",
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
      <select
        value={value}
        onChange={onChange}
        className={`w-full rounded-lg bg-empulseBg border border-empulseAccent/40 px-4 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-empulsePrimary transition ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
