document.addEventListener('DOMContentLoaded', function () {
  bootstrapSubjectQuiz({
    subject: 'english',
    title: 'English Quiz',
    quizPage: 'english-quiz.html',
    metaBank: 'data/english-meta.json',
    primaryBank: 'data/questions-english.json'
  }).catch(function (err) {
    console.error('Error initializing English quiz:', err);
  });
});
