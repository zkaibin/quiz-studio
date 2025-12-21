// Script to simulate review rendering and log output for debugging
const sampleQuestions = [
  {
    id: 16,
    template: "{CHARACTER_0} had 50 apples. {CHARACTER_0} gave 15 to {CHARACTER_1} and bought 20 more. How many apples does {CHARACTER_0} have now?",
    placeholders: ["Elsa", "Anna"],
    options: ["53", "54", "55", "56"],
    answer: 3
  },
  {
    id: 21,
    template: "{CHARACTER_0} buys 8 books at $15 each and receives a $20 discount. How much does {CHARACTER_0} spend in total?",
    placeholders: ["Minnie Mouse"],
    options: ["100", "120", "140", "150"],
    answer: 1
  },
  {
    id: 22,
    template: "A library has 250 books. After {CHARACTER_0} donates 30 more books, if the books are arranged into 8 shelves equally, how many books are on each shelf?",
    placeholders: ["Elsa"],
    options: ["30", "32", "35", "38"],
    answer: 2
  }
];

const sampleAnswers = [2, 0, 2]; // user selected option indices
const letters = ['A', 'B', 'C', 'D'];

sampleQuestions.forEach((question, index) => {
  console.log(`\n--- Review Item ${index + 1} ---`);
  console.log('Template:', question.template);
  console.log('Placeholders:', question.placeholders);
  const userAnswer = sampleAnswers[index];
  const correctAnswer = question.answer;
  const isCorrect = userAnswer === correctAnswer;

  // Build question text with placeholders filled (simulate current logic)
  let questionText = question.template;
  let placeholderIndex = 0;
  questionText = questionText.replace(/\{CHARACTER_\d+\}|\{DESCRIPTOR_\d+\}|\{NUMBER_\d+\}/g, () => {
    const value = question.placeholders[placeholderIndex];
    placeholderIndex++;
    return value;
  });
  console.log('Final questionText:', questionText);

  // Get answer text
  const userAnswerText = question.options[userAnswer] || 'Not answered';
  const correctAnswerText = question.options[correctAnswer];
  console.log('User answer index:', userAnswer, 'text:', userAnswerText);
  console.log('Correct answer index:', correctAnswer, 'text:', correctAnswerText);
  console.log('Is correct:', isCorrect);
});
