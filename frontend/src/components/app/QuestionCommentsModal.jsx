import { XMarkIcon } from "@heroicons/react/24/outline";

const mockComments = [
  {
    id: 1,
    user: {
      username: "AliceDev",
      avatar: "https://i.pravatar.cc/40?img=1",
    },
    text: "Great explanation, but I think the question could be clearer.",
    createdAt: "2024-07-25T14:35:00Z",
  },
  {
    id: 2,
    user: {
      username: "CodeNinja99",
      avatar: "https://i.pravatar.cc/40?img=2",
    },
    text: "This question was confusing at first, but the explanation helped!",
    createdAt: "2024-07-26T09:20:00Z",
  },
];

export default function QuestionCommentsModal({ open, onClose, questionText }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 max-h-[80vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute text-gray-500 top-3 right-3 hover:text-gray-700"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-800">Comments</h2>
          <p className="text-sm text-gray-500">
            On: <span className="font-medium">{questionText}</span>
          </p>
        </div>

        {/* Comments */}
        <div className="space-y-4">
          {mockComments.map((comment) => (
            <div
              key={comment.id}
              className="flex items-start gap-3 p-3 border rounded-lg shadow-sm bg-gray-50"
            >
              <img
                src={comment.user.avatar}
                alt={comment.user.username}
                className="rounded-full w-9 h-9"
              />
              <div>
                <p className="text-sm font-semibold text-blue-600">
                  {comment.user.username}
                </p>
                <p className="mt-1 text-sm text-gray-800">{comment.text}</p>
                <p className="mt-1 text-xs text-gray-400">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
