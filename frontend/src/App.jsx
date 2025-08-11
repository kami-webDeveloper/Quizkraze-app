import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

// Core UI
import FullPageSpinner from "./ui/FullPageSpinner";
import { LayoutUIProvider } from "./context/LayoutUIContext";

// App Views
import LandingPage from "./pages/LandingPage";
import QuizFeed from "./components/app/QuizFeed";
import CreateQuiz from "./components/app/CreateQuiz";
import ProfilePage from "./pages/ProfilePage";
import CreatedQuizzes from "./components/app/CreatedQuizzes";
import AttemptedQuizzes from "./components/app/AttemptedQuizzes";
import ViewCreatedQuiz from "./components/app/ViewCreatedQuiz";
import ViewQuizSubmission from "./components/app/ViewQuizSubmission";
import QuizOverview from "./components/app/QuizOverview";
import StartQuiz from "./components/app/StartQuiz";
import EditQuiz from "./components/app/Editquiz";

// Lazy loaded pages
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const PasswordResetPage = lazy(() => import("./pages/PasswordResetPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const AppLayout = lazy(() => import("./layout/AppLayout"));
const ProtectedRoute = lazy(() => import("./routes/ProtectedRoute"));

export default function App() {
  return (
    <Suspense fallback={<FullPageSpinner />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth">
          <Route path="signup" element={<SignupPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="reset-password/:resetToken"
            element={<PasswordResetPage />}
          />
        </Route>

        {/* Protected Routes */}
        <Route path="/app" element={<ProtectedRoute />}>
          <Route
            element={
              <LayoutUIProvider>
                <AppLayout />
              </LayoutUIProvider>
            }
          >
            <Route index element={<Navigate to="feed" replace />} />

            {/* Feed */}
            <Route path="feed" element={<QuizFeed />} />
            <Route path="feed/:quizId" element={<QuizOverview />} />

            {/* My Quizzes */}
            <Route path="my-quizzes">
              <Route
                index
                element={<Navigate to="created-quizzes" replace />}
              />
              <Route path="created-quizzes" element={<CreatedQuizzes />} />
              <Route path="attempted-quizzes" element={<AttemptedQuizzes />} />
              <Route
                path="attempted-quizzes/:id"
                element={<ViewQuizSubmission />}
              />
            </Route>

            {/* View and Edit Quiz */}
            <Route
              path="my-quizzes/created-quizzes/:quizId"
              element={<ViewCreatedQuiz />}
            />
            <Route
              path="my-quizzes/created-quizzes/:quizId/edit"
              element={<EditQuiz />}
            />

            {/* Create Quiz */}
            <Route path="create" element={<CreateQuiz />} />

            {/* Profile */}
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          <Route path="quiz/:quizId" element={<StartQuiz />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
