import { Link } from "react-router-dom";
import heroImg from "../../assets/hero-graphic.svg";

export default function Hero() {
  return (
    <section className="relative px-6 py-10 overflow-hidden transition-colors duration-300 bg-gradient-to-r from-slate-50 via-white to-sky-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 md:px-12">
      <div className="flex flex-col-reverse items-center justify-between mx-auto max-w-7xl md:flex-row">
        {/* Text Side */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="mb-5 font-sans text-5xl font-bold tracking-wide text-blue-600 uppercase dark:text-blue-400 sm:text-6xl">
            QUIZKRAZE
          </h2>
          <p className="mb-8 text-lg font-medium text-gray-800 dark:text-gray-300 md:text-xl">
            Empower your learning. Evaluate your knowledge. Track your growth.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
            <Link to={"/auth/signup"}>
              <button className="px-6 py-3 text-lg font-semibold text-white transition shadow bg-sky-700 rounded-xl hover:bg-sky-800 dark:bg-sky-600 dark:hover:bg-sky-700">
                Sign Up
              </button>
            </Link>
            <button className="px-6 py-3 text-lg font-semibold transition bg-white border text-sky-700 border-sky-700 rounded-xl hover:bg-sky-50 dark:bg-gray-800 dark:text-sky-400 dark:border-sky-500 dark:hover:bg-gray-700">
              Explore Quizzes
            </button>
          </div>
        </div>

        {/* Image Side */}
        <div className="flex-1">
          <img
            src={heroImg}
            alt="Hero Illustration"
            className="w-full max-w-xl mx-auto"
          />
        </div>
      </div>

      {/* Refined background blobs */}
      <div className="absolute top-0 left-0 rounded-full w-72 h-72 bg-gradient-to-br from-sky-200/30 to-transparent blur-3xl -z-10 dark:from-sky-400/10" />
      <div className="absolute bottom-0 right-0 rounded-full w-72 h-72 bg-gradient-to-tr from-emerald-200/30 to-transparent blur-3xl -z-10 dark:from-emerald-300/10" />
    </section>
  );
}
