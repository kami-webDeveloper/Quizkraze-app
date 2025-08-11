const colorMap = {
  slate: "bg-slate-100 text-slate-700",
  emerald: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-700",
  blue: "bg-blue-100 text-blue-700",
  rose: "bg-rose-100 text-rose-700",
  red: "bg-red-100 text-red-700",
  orange: "bg-orange-100 text-orange-700",
  green: "bg-green-100 text-green-700",
};

export default function Badge({ label, color = "slate", className = "" }) {
  return (
    <span
      className={`px-2 py-0.5 rounded-md text-xs font-medium capitalize ${
        colorMap[color] || colorMap["slate"]
      } ${className}`}
    >
      {label}
    </span>
  );
}
