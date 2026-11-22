document.addEventListener('DOMContentLoaded', function () {
  bootstrapSubjectQuiz({
    subject: 'science',
    title: 'Science Quiz',
    quizPage: 'science-quiz.html',
    metaBank: 'data/science-meta.json',
    // Lazy-load banks on quiz start to keep first paint light.
    lazyPrimaryBank: 'data/questions-science.json',
    secondaryBank: 'data/questions-science-p6.json'
  }).catch(function (err) {
    console.error('Error initializing Science quiz:', err);
  });
});
