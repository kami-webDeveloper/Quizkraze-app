import { useSelector } from "react-redux";
import Accordion from "../components/landing/Accordion";
import CategoriesSection from "../components/landing/CategoriesSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import Footer from "../components/landing/Footer";
import Hero from "../components/landing/Hero";
import Navbar from "../components/landing/Navbar";
import TestimonialSection from "../components/landing/TestimonialSlider";
import TopQuizzes from "../components/landing/TopQuizzes";
import { useAuthInit } from "../hooks/useAuth";
import FullPageSpinner from "../ui/FullPageSpinner";
import { Navigate } from "react-router-dom";

export default function LandingPage() {
  const { data, isLoading, isFetched } = useAuthInit();
  const user = data?.data?.user;
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isLoading || !isFetched) return <FullPageSpinner />;

  if (user || isAuthenticated) return <Navigate to={"/app"} replace />;

  return (
    <>
      <div className="text-gray-900 transition-colors duration-300 bg-white dark:bg-gray-900 dark:text-gray-100">
        <Navbar />
        <Hero />
        <TopQuizzes />
        <CategoriesSection />
        <FeaturesSection />
        <TestimonialSection />
        <Accordion />
        <Footer />
      </div>
    </>
  );
}
