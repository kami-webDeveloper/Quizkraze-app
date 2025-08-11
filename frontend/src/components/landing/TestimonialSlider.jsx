import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { StarIcon } from "@heroicons/react/24/solid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import testimonialImg1 from "../../assets/testimonial-img1.jpg";
import testimonialImg2 from "../../assets/testimonial-img2.jpg";
import testimonialImg3 from "../../assets/testimonial-img3.jpg";

const testimonials = [
  {
    name: "Aidan Brooks",
    role: "Computer Science Student",
    image: testimonialImg1,
    quote:
      "QuizKraze helped me track my progress in real-time and pinpoint what I needed to improve. The performance breakdown was a game-changer!",
  },
  {
    name: "Nina Carter",
    role: "Exam Prep Coach",
    image: testimonialImg3,
    quote:
      "As a coach, I recommend QuizKraze to all my students. The question navigation and detailed analysis features are simply unmatched!",
  },
  {
    name: "Leo Nguyen",
    role: "Engineering Undergraduate",
    image: testimonialImg2,
    quote:
      "The interface is smooth, clean, and easy to use. I love how fast I can find quizzes based on difficulty or category. Highly recommend it!",
  },
];

const TestimonialSection = () => {
  return (
    <section
      id="testimonials"
      className="px-6 py-24 transition-colors duration-300 bg-gray-50 dark:bg-gray-900 md:px-10"
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="mb-4 text-4xl font-extrabold text-gray-800 dark:text-white">
          What People{" "}
          <span className="text-blue-600 dark:text-blue-400">Say</span> About Us
        </h2>
        <p className="mb-16 text-lg text-gray-600 dark:text-gray-300">
          Real experiences from users who love learning with QuizKraze.
        </p>

        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 7000 }}
          loop={true}
          navigation={{
            prevEl: ".custom-swiper-prev",
            nextEl: ".custom-swiper-next",
          }}
          className="!pb-12"
        >
          {testimonials.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative max-w-3xl px-8 py-10 mx-auto transition-colors duration-300 bg-white shadow-xl dark:bg-gray-800 dark:shadow-black rounded-2xl">
                <div className="absolute text-5xl text-blue-600 select-none dark:text-blue-400 top-4 left-6">
                  “
                </div>
                <div className="w-full pb-6 mt-4 text-left">
                  <p className="text-lg italic leading-relaxed text-gray-700 dark:text-gray-300">
                    {item.quote}
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 mt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-20 h-20 border-2 border-blue-600 rounded-full"
                    />
                    <div className="text-left">
                      <p className="text-base font-semibold text-gray-900 dark:text-gray-100">
                        {item.name}
                      </p>
                      <p className="text-sm font-medium text-green-500">
                        {item.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-center w-6 h-6 bg-blue-600 rounded-md"
                      >
                        <StarIcon className="w-4 h-4 text-green-500" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Navigation Buttons */}
          <button
            className="absolute left-0 z-10 hidden p-3 text-blue-600 transition-all duration-200 -translate-y-1/2 bg-white border border-blue-200 rounded-full shadow-md md:block custom-swiper-prev top-1/2 hover:bg-blue-50 md:p-4 dark:bg-gray-800 dark:border-gray-700 dark:text-blue-400 dark:hover:bg-gray-700"
            aria-label="Previous slide"
          >
            <ChevronLeftIcon className="w-6 h-6 md:w-7 md:h-7" />
          </button>

          <button
            className="absolute right-0 z-10 hidden p-3 text-blue-600 transition-all duration-200 -translate-y-1/2 bg-white border border-blue-200 rounded-full shadow-md md:block custom-swiper-next top-1/2 hover:bg-blue-50 md:p-4 dark:bg-gray-800 dark:border-gray-700 dark:text-blue-400 dark:hover:bg-gray-700"
            aria-label="Next slide"
          >
            <ChevronRightIcon className="w-6 h-6 md:w-7 md:h-7" />
          </button>
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialSection;
