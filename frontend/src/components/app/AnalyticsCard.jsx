import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function AnalyticsCard({
  participants = [],
  scoreData = [],
  question,
  index,
}) {
  // Question-level card rendering
  if (question) {
    return (
      <div className="p-6 bg-white border shadow-sm rounded-xl">
        <h3 className="text-lg font-semibold text-slate-700">
          Q{index + 1}: {question.questionText}
        </h3>
        <ul className="mt-2 space-y-1 text-sm text-gray-700">
          {question.options.map((opt, i) => (
            <li
              key={i}
              className={`pl-2 border-l-4 ${
                i === question.correctAnswer
                  ? "border-green-500 font-semibold"
                  : "border-transparent"
              }`}
            >
              {String.fromCharCode(65 + i)}. {opt}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-gray-500">
          Avg. time to answer: {question.averageTime}s
        </p>
      </div>
    );
  }

  // Quiz-level analytics rendering
  return (
    <div className="grid grid-cols-1 gap-6 p-6 bg-white border shadow-sm md:grid-cols-2 rounded-xl">
      {/* Left: Participants Table */}
      <div>
        <h3 className="mb-3 text-lg font-semibold text-slate-700">
          Participants
        </h3>
        <div className="overflow-auto">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="py-2 pr-4">User</th>
                <th className="py-2 pr-4">Score</th>
                <th className="py-2">Time Taken</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((p) => (
                <tr key={p.id} className="border-b">
                  <td className="flex items-center gap-2 py-2 pr-4">
                    <img
                      src={p.avatar}
                      alt={p.name}
                      className="rounded-full w-7 h-7"
                    />
                    <span className="font-medium text-gray-800">{p.name}</span>
                  </td>
                  <td className="py-2 pr-4 font-semibold text-blue-600">
                    {p.score}
                  </td>
                  <td className="py-2 text-gray-600">{p.timeTaken}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right: Score Distribution */}
      <div className="flex flex-col h-full">
        <h3 className="mb-3 text-lg font-semibold text-slate-700">
          Score Distribution
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={scoreData}
            margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
