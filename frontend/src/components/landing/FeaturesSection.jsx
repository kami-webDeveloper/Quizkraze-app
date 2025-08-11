import {
  UserGroupIcon,
  ArrowPathIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

import roleBased from "../../assets/role-based-graphic.svg";
import guidedQuestion from "../../assets/progress-graphic.svg";
import analyze from "../../assets/analysis-graphic.svg";
import search from "../../assets/Search-graphic.svg";

const features = [
  {
    titleStart: "Powerful",
    titleHighlight: "Role-Based",
    titleEnd: "Control",
    description: (
      <>
        Easily <span className="text-green-500">create</span> and{" "}
        <span className="text-green-500">manage</span> quizzes with clear
        permissions. Admins take control, while users focus on taking tests.
      </>
    ),
    image: roleBased,
    icon: UserGroupIcon,
    alt: "Role-based access illustration",
  },
  {
    titleStart: "Guided",
    titleHighlight: "Question Navigation",
    titleEnd: "",
    description: (
      <>
        Navigate quizzes with <span className="text-green-500">Next</span> and{" "}
        <span className="text-green-500">Previous</span> buttons, and visually{" "}
        <span className="text-green-500">track</span> your progress.
      </>
    ),
    image: guidedQuestion,
    icon: ArrowPathIcon,
    alt: "Step-by-step navigation illustration",
  },
  {
    titleStart: "Insightful",
    titleHighlight: "Performance Stats",
    titleEnd: "",
    description: (
      <>
        Get instant <span className="text-green-500">feedback</span> on your
        accuracy, speed, and quiz results — with personalized{" "}
        <span className="text-green-500">insights</span> to improve over time.
      </>
    ),
    image: analyze,
    icon: ChartBarIcon,
    alt: "Performance analysis illustration",
  },
  {
    titleStart: "",
    titleHighlight: "Find",
    titleEnd: " the Right Quiz Instantly",
    description: (
      <>
        Quickly <span className="text-green-500">find</span> the perfect quiz by{" "}
        <span className="text-green-500">filtering</span> based on difficulty,
        time, or category.
      </>
    ),
    image: search,
    icon: MagnifyingGlassIcon,
    alt: "Search and filter illustration",
  },
];

const FeaturesSection = () => {
  return (
    <section
      className="px-6 py-24 transition-colors duration-300 bg-gray-50 dark:bg-gray-950 md:px-10"
      id="features"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-4 text-4xl font-extrabold text-center text-gray-800 dark:text-white">
          Why Choose <span className="text-blue-600">QuizKraze</span>?
        </h2>
        <p className="max-w-2xl mx-auto mb-16 text-lg text-center text-gray-600 dark:text-gray-300">
          Built for better learning and smarter testing — see what makes us
          different.
        </p>

        <div className="space-y-28">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`grid md:grid-cols-2 items-center gap-10`}
              >
                {/* Image */}
                <img
                  src={feature.image}
                  alt={feature.alt}
                  className={`w-full max-w-md mx-auto rounded-xl shadow-lg dark:shadow-gray-800 ${
                    index % 2 !== 0 ? "md:order-last" : ""
                  }`}
                />

                {/* Text */}
                <div
                  className={`space-y-4 ${
                    index % 2 !== 0 ? "md:order-first" : ""
                  }`}
                >
                  <div className="flex flex-col items-center justify-center gap-2 sm:flex-row md:items-start md:justify-start sm:gap-3">
                    <Icon className="text-blue-600 dark:text-blue-400 w-7 h-7 shrink-0" />
                    <h3 className="text-2xl font-bold leading-tight text-center text-gray-800 dark:text-white sm:text-3xl sm:text-left">
                      {feature.titleStart && <>{feature.titleStart} </>}
                      <span className="text-blue-600 dark:text-blue-400">
                        {feature.titleHighlight}
                      </span>
                      {feature.titleEnd && <> {feature.titleEnd}</>}
                    </h3>
                  </div>
                  <p className="text-base leading-relaxed text-center text-gray-600 dark:text-gray-300 md:text-xl md:text-left">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
