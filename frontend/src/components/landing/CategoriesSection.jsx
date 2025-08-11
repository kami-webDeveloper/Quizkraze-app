import CategoryCard from "./CategoryCard";

const categories = [
  {
    name: "Professional & Educational",
    description:
      "Quizzes for work skills, certifications, and test preparation.",
  },
  {
    name: "General Knowledge",
    description: "Stay sharp with current events, tech, and cultural trivia.",
  },
  {
    name: "Academic & Knowledge-Based",
    description:
      "Deepen your academic skills in science, math, and literature.",
  },
];

export default function CategoriesSection() {
  return (
    <section
      id="categories"
      className="px-6 py-20 transition-colors duration-300 bg-white dark:bg-gray-950 md:px-12"
    >
      <div className="mx-auto mb-12 text-center max-w-7xl">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl text-slate-800 dark:text-white">
          🧠 Quiz Categories
        </h2>
        <p className="max-w-xl mx-auto text-base text-slate-600 dark:text-slate-300">
          Explore different fields and topics. Tap into what interests you!
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 mx-auto md:grid-cols-3 max-w-7xl">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.name}
            name={cat.name}
            description={cat.description}
          />
        ))}
      </div>
    </section>
  );
}
