require("dotenv").config({ path: "./config.env" });
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const mongoURL = require("./server");

const User = require("./models/userModel");
const Quiz = require("./models/quizModel");
const Question = require("./models/questionModel");
const Comment = require("./models/commentModel");
const Submission = require("./models/submissionModel");

const categories = {
  "Professional & Educational": {
    "Workplace Skills": ["Leadership", "Communication", "Time Management"],
    "Test Prep": ["SAT", "TOEFL", "IELTS", "GRE"],
    Certifications: ["IT", "Healthcare", "Business"],
  },
  "General Knowledge": {
    "Current Events": ["World News", "Politics", "Economy"],
    "Tech & Innovation": ["Gadgets", "AI", "Internet Culture"],
    "Culture & Traditions": ["Food", "Festivals", "Customs"],
  },
  "Academic & Knowledge-Based": {
    Science: ["Physics", "Chemistry", "Biology", "Earth Science"],
    Math: ["Algebra", "Geometry", "Mental Math", "Calculus"],
    History: ["World History", "Ancient Civilizations", "Historical Figures"],
    Geography: ["Countries", "Capitals", "Landmarks", "Maps"],
    Literature: ["Novels", "Poetry", "Authors", "Literary Devices"],
    "Language & Grammar": [
      "Vocabulary",
      "Idioms",
      "Spelling",
      "Foreign Languages",
    ],
  },
};

const difficulties = ["regular", "medium", "intermediate", "advanced"];

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB connection failed", err));

const seed = async () => {
  try {
    await User.deleteMany();
    await Quiz.deleteMany();
    await Question.deleteMany();
    await Comment.deleteMany();
    await Submission.deleteMany();

    const users = [];
    const usedUsernames = new Set();
    const usedEmails = new Set();

    for (let i = 0; i < 10; i++) {
      let username, email;

      do {
        username = faker.internet.username();
      } while (username.length < 8 || usedUsernames.has(username));
      usedUsernames.add(username);

      do {
        email = faker.internet.email();
      } while (usedEmails.has(email));
      usedEmails.add(email);

      const user = await User.create({
        username,
        email,
        password: "Abcd@1234",
        passwordConfirm: "Abcd@1234",
      });

      users.push(user);
    }

    const quizzes = [];

    for (const category in categories) {
      for (const subcategory in categories[category]) {
        for (const topic of categories[category][subcategory]) {
          for (let i = 0; i < 2; i++) {
            const createdBy = users[Math.floor(Math.random() * users.length)];
            const quiz = await Quiz.create({
              title: `${topic} Quiz #${i + 1}`,
              description: faker.lorem.sentence(),
              category: topic,
              difficulty:
                difficulties[Math.floor(Math.random() * difficulties.length)],
              timelimit: `${Math.floor(Math.random() * 10) + 5} min`,
              createdBy: createdBy._id,
              questions: [],
            });

            for (let q = 0; q < 5; q++) {
              const options = [
                faker.word.noun(),
                faker.word.noun(),
                faker.word.noun(),
                faker.word.noun(),
              ];
              const correct = Math.floor(Math.random() * 4);
              const question = await Question.create({
                questionText: faker.lorem.sentence(),
                options,
                correctAnswer: correct,
                explanation: faker.lorem.sentence(),
              });
              quiz.questions.push(question._id);
            }

            await quiz.save();
            quizzes.push(quiz);
          }
        }
      }
    }

    for (let i = 0; i < 30; i++) {
      const user = users[Math.floor(Math.random() * users.length)];
      const quiz = quizzes[Math.floor(Math.random() * quizzes.length)];

      const answers = quiz.questions.map((_, idx) => ({
        questionIndex: idx,
        selectedOption: Math.floor(Math.random() * 4),
      }));

      const score = Math.floor(Math.random() * 101);
      await Submission.create({
        user: user._id,
        quiz: quiz._id,
        answers,
        score,
        timeTaken: Math.floor(Math.random() * 600) + 60,
      });
    }

    for (let i = 0; i < 20; i++) {
      const user = users[Math.floor(Math.random() * users.length)];
      const quiz = quizzes[Math.floor(Math.random() * quizzes.length)];
      const questionId =
        quiz.questions[Math.floor(Math.random() * quiz.questions.length)];

      await Comment.create({
        user: user._id,
        question: questionId,
        text: faker.lorem.sentences(2),
      });
    }

    console.log("✅ All data seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    if (err.errors) {
      for (const key in err.errors) {
        console.error(`🛑 ${key}: ${err.errors[key].message}`);
      }
    }
    process.exit(1);
  }
};

seed();
