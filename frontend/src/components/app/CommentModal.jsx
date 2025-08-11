import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import {
  XMarkIcon,
  HeartIcon,
  ArrowUturnLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import {
  useCreateComment,
  useToggleCommentLike,
  useGetQuestionComments,
} from "../../hooks/useComment";

export default function CommentModal({
  onClose,
  questionId,
  allowNewComment = true,
}) {
  const modalRef = useRef();
  const textareaRef = useRef();

  const [newComment, setNewComment] = useState("");
  const [activeReplyTo, setActiveReplyTo] = useState(null);

  const {
    data: commentsData,
    isLoading,
    isError,
  } = useGetQuestionComments(questionId);

  const comments = commentsData?.data?.comments || [];

  const { mutate: createComment, isLoading: isCreating } =
    useCreateComment(questionId);

  const { mutate: toggleComment } = useToggleCommentLike(questionId);

  useEffect(() => {
    if (!activeReplyTo && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [activeReplyTo]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handlePostComment = () => {
    const trimmed = newComment.trim();
    if (!trimmed) return;

    const data = activeReplyTo
      ? { text: trimmed, parentComment: activeReplyTo }
      : { text: trimmed };

    createComment(data, {
      onSuccess: () => setNewComment(""),
    });
  };

  const handlePostReply = (replyText, parentId, onSuccessCallback) => {
    const trimmed = replyText.trim();
    if (!trimmed) return;

    const data = { text: trimmed, parentComment: parentId };
    createComment(data, {
      onSuccess: () => {
        onSuccessCallback();
        setActiveReplyTo(null);
      },
    });
  };

  const handleToggleLike = (commentId) => {
    toggleComment(commentId);
  };

  // Group replies under parents
  const topLevelComments = comments.filter((c) => !c.parentComment);
  const repliesMap = comments.reduce((acc, c) => {
    if (c.parentComment) {
      const parentId =
        typeof c.parentComment === "object"
          ? c.parentComment._id
          : c.parentComment;
      if (!acc[parentId]) acc[parentId] = [];
      acc[parentId].push(c);
    }
    return acc;
  }, {});

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 bg-black/40 sm:p-6">
        <div
          ref={modalRef}
          className="relative bg-white dark:bg-gray-900 md:rounded-xl w-full max-w-2xl sm:max-h-[80vh] min-h-full sm:h-auto overflow-hidden flex flex-col p-6"
        >
          <p className="text-center text-gray-500 dark:text-gray-400">
            Loading comments...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 bg-black/40 sm:p-6">
        <div
          ref={modalRef}
          className="relative bg-white dark:bg-gray-900 md:rounded-xl w-full max-w-2xl sm:max-h-[80vh] min-h-full sm:h-auto overflow-hidden flex flex-col p-6"
        >
          <p className="text-center text-red-500 dark:text-red-400">
            Failed to load comments.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 bg-black/40 sm:p-6">
      <div
        ref={modalRef}
        className="relative bg-white dark:bg-gray-900 md:rounded-xl w-full max-w-2xl sm:max-h-[80vh] min-h-full sm:h-auto overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-700">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Comments ({comments.length})
          </h4>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 dark:hover:text-red-400 dark:text-gray-400"
            aria-label="Close comments modal"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Comment List */}
        <div className="flex-1 px-4 py-4 space-y-4 overflow-y-auto">
          {topLevelComments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              replies={repliesMap[comment._id] || []}
              isReplying={activeReplyTo === comment._id}
              onReply={() =>
                setActiveReplyTo((prev) =>
                  prev === comment._id ? null : comment._id
                )
              }
              onCancelReply={() => setActiveReplyTo(null)}
              onPostReply={(replyText, cb) =>
                handlePostReply(replyText, comment._id, cb)
              }
              onToggleLike={() => handleToggleLike(comment._id)}
              onToggleLikeReply={(replyId) => handleToggleLike(replyId)}
            />
          ))}
        </div>

        {/* Comment Box */}
        {allowNewComment && !activeReplyTo && (
          <div className="p-4 bg-white border-t dark:bg-gray-900 dark:border-gray-700">
            <div className="flex items-start gap-2">
              <img
                src="https://i.pravatar.cc/40?img=12"
                alt="You"
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1 space-y-1">
                <textarea
                  ref={textareaRef}
                  rows={2}
                  className="w-full px-3 py-2 text-sm border rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <div className="flex justify-end">
                  <button
                    onClick={handlePostComment}
                    disabled={!newComment.trim() || isCreating}
                    className={clsx(
                      "px-4 py-1.5 text-sm text-white rounded-md",
                      newComment.trim()
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-blue-300 cursor-not-allowed"
                    )}
                  >
                    {isCreating ? "Posting..." : "Post"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ====== CommentItem without local like state ======
function CommentItem({
  comment,
  replies = [],
  isReplying,
  onReply,
  onCancelReply,
  onPostReply,
  onToggleLike,
  onToggleLikeReply,
}) {
  const [showReplies, setShowReplies] = useState(false);
  const [replyText, setReplyText] = useState("");
  const replyInputRef = useRef();

  useEffect(() => {
    if (isReplying && replyInputRef.current) {
      replyInputRef.current.focus();
    }
  }, [isReplying]);

  const handlePostReply = () => {
    if (!replyText.trim()) return;
    onPostReply(replyText, () => setReplyText(""));
  };

  const avatarSrc =
    comment.user?.avatar || "https://i.pravatar.cc/40?u=" + comment.user?._id;

  return (
    <div className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-start gap-2">
        <img
          src={avatarSrc}
          alt={comment.user?.username || "User"}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex-1">
          <div className="flex justify-between gap-4">
            <p className="flex-1 text-sm text-gray-700 break-words dark:text-gray-200">
              <span className="font-semibold">{comment.user?.username}:</span>{" "}
              {comment.text}
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
              <button
                onClick={onReply}
                className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <ArrowUturnLeftIcon className="w-4 h-4" />
                <span>Reply</span>
              </button>
              <button
                onClick={onToggleLike}
                className="flex flex-col items-center text-red-500 hover:opacity-80"
                aria-label={
                  comment.likedByUser ? "Unlike comment" : "Like comment"
                }
              >
                <HeartIcon
                  className={clsx(
                    "w-5 h-5",
                    comment.likedByUser
                      ? "fill-red-500"
                      : "fill-transparent stroke-2"
                  )}
                />
                <span className="text-[10px]">{comment.likes.length}</span>
              </button>
            </div>
          </div>

          {replies.length > 0 && (
            <button
              onClick={() => setShowReplies((prev) => !prev)}
              className="flex items-center gap-1 mt-2 text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            >
              {showReplies ? (
                <ChevronUpIcon className="w-4 h-4" />
              ) : (
                <ChevronDownIcon className="w-4 h-4" />
              )}
              {replies.length} {replies.length > 1 ? "replies" : "reply"}
            </button>
          )}

          {showReplies && (
            <div className="pl-6 mt-3 space-y-2">
              {replies.map((reply) => (
                <ReplyItem
                  key={reply._id}
                  reply={reply}
                  onToggleLike={() => onToggleLikeReply(reply._id)}
                />
              ))}
            </div>
          )}

          {isReplying && (
            <div className="flex items-start gap-2 mt-3">
              <img
                src="https://i.pravatar.cc/40?img=12"
                alt="You"
                className="w-6 h-6 rounded-full"
              />
              <div className="flex-1 space-y-1">
                <textarea
                  ref={replyInputRef}
                  rows={2}
                  className="w-full px-3 py-2 text-sm border rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
                  placeholder="Write a reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <div className="flex justify-end gap-2 text-sm">
                  <button
                    onClick={onCancelReply}
                    className="px-3 py-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 dark:text-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePostReply}
                    disabled={!replyText.trim()}
                    className={clsx(
                      "px-3 py-1 text-white rounded-md",
                      replyText.trim()
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-blue-300 cursor-not-allowed"
                    )}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ====== ReplyItem without local like state ======
function ReplyItem({ reply, onToggleLike }) {
  const avatarSrc =
    reply.user?.avatar || "https://i.pravatar.cc/40?u=" + reply.user?._id;

  return (
    <div className="flex items-start justify-between gap-2 p-2 bg-gray-100 border rounded-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-start gap-2">
        <img
          src={avatarSrc}
          alt={reply.user?.username || "User"}
          className="w-6 h-6 rounded-full"
        />
        <div className="flex-1">
          <p className="text-sm text-gray-700 break-words dark:text-gray-200">
            <span className="font-semibold">{reply.user?.username}:</span>{" "}
            {reply.text}
          </p>
        </div>
      </div>

      <button
        onClick={onToggleLike}
        className="flex flex-col items-center mt-1 text-red-500 hover:opacity-80"
        aria-label={reply.likedByUser ? "Unlike reply" : "Like reply"}
      >
        <HeartIcon
          className={clsx(
            "w-4 h-4",
            reply.likedByUser ? "fill-red-500" : "fill-transparent stroke-2"
          )}
        />
        <span className="text-[10px]">{reply.likes.length}</span>
      </button>
    </div>
  );
}
