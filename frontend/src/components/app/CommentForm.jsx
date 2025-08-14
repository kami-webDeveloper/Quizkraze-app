import { useState } from "react";

export default function CommentForm() {
  const [comment, setComment] = useState("");

  const handlePost = () => {
    if (!comment.trim()) return;
    setComment("");
  };

  return (
    <div className="mt-3 space-y-2">
      <textarea
        className="w-full p-2 text-sm border rounded-md resize-none"
        placeholder="Leave a comment..."
        rows={2}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="flex justify-end">
        <button
          onClick={handlePost}
          className="px-3 py-1.5 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Post Comment
        </button>
      </div>
    </div>
  );
}
