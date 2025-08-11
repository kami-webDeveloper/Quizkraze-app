import { useState, useMemo, useRef, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  XMarkIcon,
  UserGroupIcon,
  ClockIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import Spinner from "../../ui/Spinner";

const SORT_OPTIONS = [
  { label: "Highest Score", value: "scoreDesc" },
  { label: "Lowest Score", value: "scoreAsc" },
  { label: "Fastest Time", value: "timeAsc" },
  { label: "Slowest Time", value: "timeDesc" },
];

const FILTER_OPTIONS = [
  { label: "All", value: "all" },
  { label: "91–100", value: "91-100" },
  { label: "71–90", value: "71-90" },
  { label: "51–70", value: "51-70" },
  { label: "0–50", value: "0-50" },
];

function getAvatarNumber(username) {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  return (Math.abs(hash) % 70) + 1;
}

export default function QuizAnalyticsCard({
  participants,
  scoreData,
  submissions,
  isPending,
  error,
}) {
  const [sortBy, setSortBy] = useState("scoreDesc");
  const [filterBy, setFilterBy] = useState("all");
  const [showModal, setShowModal] = useState(false);

  // We build a participants array from submissions (use submissions user info)
  // Or fallback to passed participants if submissions are not ready
  const participantData = submissions.length
    ? submissions.map((s) => ({
        id: s._id,
        name: s.user?.username || "Unknown User",
        avatar: s.user?.avatar || null, // could be null
        score: s.score,
        timeTaken: s.timeTaken,
      }))
    : participants;

  const filteredSortedParticipants = useMemo(() => {
    let filtered = [...participantData];

    if (filterBy !== "all") {
      const [min, max] = filterBy.split("-").map(Number);
      filtered = filtered.filter((p) => p.score >= min && p.score <= max);
    }

    filtered.sort((a, b) => {
      if (sortBy === "scoreAsc") return a.score - b.score;
      if (sortBy === "scoreDesc") return b.score - a.score;
      if (sortBy === "timeAsc") return a.timeTaken - b.timeTaken;
      if (sortBy === "timeDesc") return b.timeTaken - a.timeTaken;
      return 0;
    });

    return filtered;
  }, [participantData, sortBy, filterBy]);

  if (isPending)
    return (
      <div className="flex items-center justify-center p-6">
        <Spinner size={8} />
        <span className="ml-2 text-gray-600 dark:text-gray-300">
          Loading submissions...
        </span>
      </div>
    );

  if (error)
    return (
      <div className="p-6 text-center text-red-600 dark:text-red-400">
        Error loading submissions:{" "}
        <span className="font-mono">{error.message}</span>
      </div>
    );

  return (
    <>
      <div className="grid grid-cols-1 gap-6 p-6 bg-white border shadow-sm dark:bg-gray-900 dark:border-gray-700 md:grid-cols-2 rounded-xl">
        {/* Participants Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-700 dark:text-slate-200">
              <UserGroupIcon className="w-5" />
              Participants
            </h3>

            {/* Mobile modal trigger */}
            <button
              onClick={() => setShowModal(true)}
              className="px-3 py-1 text-sm text-white bg-blue-600 rounded md:hidden hover:bg-blue-700"
            >
              View ({participantData.length})
            </button>

            {/* Filters - only on desktop */}
            <div className="flex-wrap justify-end hidden gap-2 md:flex">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-2 py-1 text-sm border rounded w-36 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
              >
                {FILTER_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-2 py-1 text-sm border rounded w-36 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden md:block max-h-[320px] overflow-auto">
            <table className="min-w-full text-sm text-left border-collapse">
              <thead className="sticky top-0 z-10 bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <tr className="text-gray-600 dark:text-gray-300">
                  <th className="py-2 pr-4">User</th>
                  <th className="py-2 pr-4">Score</th>
                  <th className="py-2">Time Taken</th>
                </tr>
              </thead>
              <tbody>
                {filteredSortedParticipants.map((p) => (
                  <tr key={p.id} className="border-b dark:border-gray-700">
                    <td className="flex items-center gap-2 py-2 pr-4">
                      <img
                        src={
                          p.avatar
                            ? p.avatar
                            : `https://i.pravatar.cc/150?img=${getAvatarNumber(
                                p.name
                              )}`
                        }
                        alt={p.name}
                        className="rounded-full w-7 h-7"
                      />
                      <span className="font-medium text-gray-800 dark:text-gray-100">
                        {p.name}
                      </span>
                    </td>
                    <td className="py-2 pr-4 font-semibold text-blue-600">
                      {p.score}
                    </td>
                    <td className="py-2 text-gray-600 dark:text-gray-400">
                      {typeof p.timeTaken === "number"
                        ? `${p.timeTaken}s`
                        : p.timeTaken}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Score Chart */}
        <div className="flex flex-col h-full">
          <h3 className="mb-3 text-lg font-semibold text-slate-700 dark:text-slate-200">
            Score Distribution
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={scoreData}
              margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="range" stroke="#888" />
              <YAxis allowDecimals={false} stroke="#888" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  color: "#fff",
                }}
                cursor={{ fill: "#37415133" }}
              />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <ParticipantsModal
          participants={filteredSortedParticipants}
          onClose={() => setShowModal(false)}
          sortBy={sortBy}
          filterBy={filterBy}
          setSortBy={setSortBy}
          setFilterBy={setFilterBy}
          count={participantData.length}
        />
      )}
    </>
  );
}

function ParticipantsModal({
  participants,
  onClose,
  sortBy,
  filterBy,
  setSortBy,
  setFilterBy,
  count,
}) {
  const modalRef = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        ref={modalRef}
        className="relative bg-white dark:bg-gray-900 w-full h-full sm:max-h-[90vh] sm:max-w-2xl sm:rounded-xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-700">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
            Participants ({count})
          </h4>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Filters + Sorting */}
        <div className="flex flex-wrap gap-2 px-4 py-3 border-b dark:border-gray-700">
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="px-2 py-1 text-sm border rounded w-36 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
          >
            {FILTER_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-2 py-1 text-sm border rounded w-36 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Participant List */}
        <div className="flex-1 px-4 py-4 space-y-3 overflow-y-auto">
          {participants.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="flex items-center gap-3">
                <img
                  src={
                    p.avatar
                      ? p.avatar
                      : `https://i.pravatar.cc/150?img=${getAvatarNumber(
                          p.name
                        )}`
                  }
                  alt={p.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">
                    {p.name}
                  </p>
                  <p className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <ClockIcon className="w-3 mr-[2px]" />{" "}
                    {typeof p.timeTaken === "number"
                      ? `${p.timeTaken}s`
                      : p.timeTaken}
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold tracking-wide text-green-700 bg-green-100 rounded dark:bg-green-800 dark:text-green-200">
                <StarIcon className="w-3" />
                {p.score}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
