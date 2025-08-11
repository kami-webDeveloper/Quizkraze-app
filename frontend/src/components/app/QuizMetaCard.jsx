// src/components/QuizMetaCard.jsx
import { useNavigate, useParams } from "react-router-dom";
import {
  PencilSquareIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import CategoryBadge from "./CategoryBadge";
import DifficultyBadge from "./DifficultyBadge";
import StatusBadge from "./StatusBadge";
import ActionButton from "./ActionButton";
import QuizActionsDropdown from "./QuizActionsDropdown";
import { useToggleQuizStatus, useDeleteQuiz } from "../../hooks/useQuiz";
import Spinner from "../../ui/Spinner";
import { useState } from "react";
import ConfirmModal from "../../ui/ConfirmModal";

export default function QuizMetaCard({ quiz }) {
  const { quizId } = useParams();
  const userId = quiz.createdBy?._id || null;
  const navigate = useNavigate();

  const { mutate: toggleStatus, isLoading: isTogglingStatus } =
    useToggleQuizStatus(quizId, userId);
  const { mutate: deleteQuiz, isLoading: isDeleting } = useDeleteQuiz(quizId);

  const [modalData, setModalData] = useState({
    isOpen: false,
    action: null,
  });

  const openToggleModal = () => {
    setModalData({ isOpen: true, action: "toggle" });
  };

  const openDeleteModal = () => {
    setModalData({ isOpen: true, action: "delete" });
  };

  const handleConfirm = () => {
    if (modalData.action === "toggle") {
      toggleStatus(!quiz.isActive);
    } else if (modalData.action === "delete") {
      deleteQuiz(quiz._id);
    }
    setModalData({ isOpen: false, action: null });
  };

  const handleCancel = () => {
    setModalData({ isOpen: false, action: null });
  };

  const handleEdit = () =>
    navigate(`/app/my-quizzes/created-quizzes/${quiz._id}/edit`);

  const isBusy = isTogglingStatus || isDeleting;
  const statusLabel = isTogglingStatus
    ? quiz.isActive
      ? "Finishing..."
      : "Activating..."
    : quiz.isActive
    ? "Finish"
    : "Activate";

  return (
    <div className="relative p-4 space-y-4 bg-white border shadow-sm dark:bg-gray-900 dark:border-gray-700 sm:p-6 rounded-xl">
      {/* Mobile dropdown */}
      <div className="absolute top-3 right-3 sm:hidden">
        <QuizActionsDropdown
          quiz={quiz}
          onEdit={handleEdit}
          onDelete={openDeleteModal}
          onToggleStatus={openToggleModal}
        />
      </div>

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white sm:text-2xl">
            {quiz.title}
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 sm:text-base">
            {quiz.description}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex-shrink-0 hidden gap-2 sm:flex">
          <ActionButton
            icon={quiz.isActive ? XCircleIcon : CheckCircleIcon}
            color={isBusy ? "gray" : quiz.isActive ? "orange" : "green"}
            onClick={openToggleModal}
            disabled={isBusy}
          >
            {statusLabel}
          </ActionButton>

          <ActionButton
            icon={PencilSquareIcon}
            color={isBusy ? "gray" : "blue"}
            onClick={handleEdit}
            disabled={isBusy}
          >
            Edit
          </ActionButton>

          <ActionButton
            icon={TrashIcon}
            color={isDeleting ? "gray" : "red"}
            onClick={openDeleteModal}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <div className="flex items-center gap-1">
                <Spinner size={4} />
                <span>Deleting...</span>
              </div>
            ) : (
              "Delete"
            )}
          </ActionButton>
        </div>
      </div>

      {/* Metadata */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <CategoryBadge category={quiz.category} />
        <DifficultyBadge difficulty={quiz.difficulty} />
        <span>Created: {new Date(quiz.createdAt).toLocaleDateString()}</span>
        <StatusBadge isActive={quiz.isActive} />
      </div>

      {/* Modal */}
      <ConfirmModal
        isOpen={modalData.isOpen}
        title={
          modalData.action === "delete" ? "Delete Quiz" : "Change Quiz Status"
        }
        message={
          modalData.action === "delete"
            ? "Are you sure you want to delete this quiz? This action cannot be undone."
            : `Are you sure you want to ${
                quiz.isActive ? "finish" : "activate"
              } this quiz?`
        }
        confirmText="Yes"
        cancelText="No"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
}
