// src/components/CreatedQuizzes.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DocumentPlusIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

import CategoryFilter from "./CategoryFilter";
import DifficultyFilter from "./DifficultyFilter";
import CreatedQuizCard from "./CreatedQuizCard";
import QuizTabs from "./QuizTabs";
import { useSelector } from "react-redux";
import {
  useDeleteQuiz,
  useGetUserCreatedQuizzes,
  useToggleQuizStatus,
} from "../../hooks/useQuiz";
import Spinner from "../../ui/Spinner";
import ConfirmModal from "../../ui/ConfirmModal";

export default function CreatedQuizzes() {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [togglingId, setTogglingId] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [modalData, setModalData] = useState({
    isOpen: false,
    action: null,
    quiz: null,
  });

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;

  const { data, isLoading, isFetched, error } =
    useGetUserCreatedQuizzes(userId);
  const { mutate: deleteQuiz } = useDeleteQuiz();
  const { mutate: toggleQuizStatus } = useToggleQuizStatus();

  useEffect(() => {
    if (data?.data?.quizzes) {
      setQuizzes(data.data.quizzes);
    }
  }, [data]);

  const openDeleteModal = (quiz) => {
    setModalData({
      isOpen: true,
      action: "delete",
      quiz,
    });
  };

  const openToggleModal = (quiz) => {
    setModalData({
      isOpen: true,
      action: "toggle",
      quiz,
    });
  };

  const handleConfirm = () => {
    const { action, quiz } = modalData;
    if (action === "delete") {
      setDeletingId(quiz._id);
      deleteQuiz(quiz._id);
    } else if (action === "toggle") {
      setTogglingId(quiz._id);
      toggleQuizStatus({
        quizId: quiz._id,
        isActive: !quiz.isActive,
        userId,
      });
    }
    setModalData({ isOpen: false, action: null, quiz: null });
  };

  const handleCancel = () => {
    setModalData({ isOpen: false, action: null, quiz: null });
  };

  if (!userId || isLoading || !isFetched) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size={8} />
      </div>
    );
  }

  if (error) {
    console.error(error);
    return <div className="mx-auto">{error.message}</div>;
  }

  const filtered = quizzes.filter(
    (q) =>
      (!category || q.category === category) &&
      (!difficulty || q.difficulty === difficulty)
  );

  return (
    <div className="space-y-6">
      <QuizTabs
        activeTab="created"
        onTabChange={(tab) => navigate(`/app/my-quizzes/${tab}-quizzes`)}
      />

      <div className="flex flex-wrap gap-4">
        <CategoryFilter selected={category} onChange={setCategory} />
        <DifficultyFilter selected={difficulty} onChange={setDifficulty} />
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-4 py-20 text-center rounded-lg shadow-sm bg-slate-100 dark:bg-slate-800">
          <DocumentPlusIcon className="w-16 h-16 mb-4 text-blue-500 dark:text-blue-400" />
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
            You haven’t created any quizzes yet
          </h2>
          <p className="max-w-md mt-2 text-sm text-slate-600 dark:text-slate-400">
            Start building fun, challenging quizzes to test your audience's
            knowledge.
          </p>
          <button
            onClick={() => navigate("/app/create")}
            className="inline-flex items-center px-5 py-2.5 mt-6 text-sm font-medium text-white transition rounded-lg bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900"
          >
            <ArrowRightIcon className="w-5 h-5 mr-2" />
            Create a Quiz
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
          {filtered.map((quiz) => (
            <CreatedQuizCard
              key={quiz._id}
              quiz={quiz}
              onDetails={() =>
                navigate(`/app/my-quizzes/created-quizzes/${quiz._id}`)
              }
              onEdit={() =>
                navigate(`/app/my-quizzes/created-quizzes/${quiz._id}/edit`)
              }
              onDelete={() => openDeleteModal(quiz)}
              onToggleStatus={() => openToggleModal(quiz)}
              isDeleting={deletingId === quiz._id}
              isToggling={togglingId === quiz._id}
            />
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={modalData.isOpen}
        title={
          modalData.action === "delete" ? "Delete Quiz" : "Change Quiz Status"
        }
        message={
          modalData.action === "delete"
            ? "Are you sure you want to delete this quiz? This action cannot be undone."
            : `Are you sure you want to ${
                modalData.quiz?.isActive ? "finish" : "activate"
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
