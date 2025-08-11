// src/components/common/ScoreBar.jsx
export default function ScoreBar({ score = 0, height = 8, duration = 500 }) {
  const getColor = (score) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 50) return "bg-yellow-400";
    return "bg-red-500";
  };

  return (
    <div
      className="w-full overflow-hidden bg-gray-100 rounded-full"
      style={{ height }}
    >
      <div
        className={`transition-all duration-[${duration}ms] ${getColor(score)}`}
        style={{ width: `${score}%`, height: "100%" }}
      />
    </div>
  );
}
