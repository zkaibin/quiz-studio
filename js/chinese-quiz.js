document.addEventListener('DOMContentLoaded', function () {
  bootstrapSubjectQuiz({
    subject: 'chinese',
    title: 'Chinese Quiz',
    quizPage: 'chinese-quiz.html',
    metaBank: 'data/chinese-meta.json',
    primaryBank: 'data/questions-chinese.json'
  }).catch(function (err) {
    console.error('Error initializing Chinese quiz:', err);
  });
});
