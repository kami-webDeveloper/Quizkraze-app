import { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

const faqs = [
  {
    question: "Who can create quizzes on QuizKraze?",
    answer:
      "Only users with Admin or Teacher roles have the ability to create, manage, and activate quizzes. Regular users can only take quizzes and view their results.",
  },
  {
    question: "Can I navigate between questions during a quiz?",
    answer:
      "Yes! You can use 'Next' and 'Previous' buttons to move through questions. You'll also see which questions are answered or left unanswered in real-time.",
  },
  {
    question: "How does the performance analysis work?",
    answer:
      "After completing a quiz, you’ll get feedback with insights like accuracy, speed, and a comparison with other participants. This helps you learn and improve.",
  },
  {
    question: "Is there a way to search for specific quizzes?",
    answer:
      "Absolutely! You can filter quizzes by category, difficulty, time limit, and more to find the perfect match for your needs.",
  },
  {
    question: "Are my quiz results stored and tracked?",
    answer:
      "Yes. Every quiz you submit is stored securely and linked to your account. You can revisit your submissions and track your progress over time.",
  },
];

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="px-6 py-24 bg-white dark:bg-gray-900 md:px-10" id="faq">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="mb-4 text-4xl font-bold text-gray-800 dark:text-gray-100">
          Frequently Asked <span className="text-blue-600">Questions</span>
        </h2>
        <p className="mb-12 text-lg text-gray-600 dark:text-gray-300">
          Got questions? We've got answers to help you get the most out of
          QuizKraze.
        </p>

        <div className="space-y-4 text-left">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-xl"
              >
                <button
                  onClick={() => toggle(index)}
                  className="flex items-center justify-between w-full px-6 py-4 text-left transition bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span className="text-lg font-medium text-gray-800 dark:text-gray-100">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUpIcon className="w-5 h-5 text-blue-600" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 text-blue-600" />
                  )}
                </button>

                {/* Animated Answer Section */}
                <div
                  className={`px-6 transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-96 py-3" : "max-h-0"
                  }`}
                >
                  <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300">
                    {faq.answer}
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

export default Accordion;
