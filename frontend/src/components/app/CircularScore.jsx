export default function CircularScore({
  score = 0,
  size = 48,
  strokeWidth = 4,
  duration = 700,
}) {
  const radius = 18;
  const dashArray = 2 * Math.PI * radius;
  const dashOffset = dashArray - (score / 100) * dashArray;

  const getColor = (score) => {
    if (score >= 80) return "text-green-500";
    if (score >= 50) return "text-yellow-400";
    return "text-red-500";
  };

  return (
    <div style={{ width: size, height: size }} className="relative">
      <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
        {/* Track circle */}
        <path
          className="text-gray-200"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <path
          className={`transition-all duration-[${duration}ms] ease-out ${getColor(
            score
          )}`}
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-slate-800 dark:text-slate-200">
        {score}%
      </span>
    </div>
  );
}
