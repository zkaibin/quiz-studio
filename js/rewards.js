/* global window */
/**
 * rewards.js — Shared reward-point utilities for Quiz Studio
 *
 * Points rules:
 *   5-question  quiz: 1 pt/correct (max 5) + 3 bonus on perfect score
 *  10-question  quiz: 1 pt/correct (max 10) + 8 bonus on perfect score
 *  15-question  quiz: 1 pt/correct (max 15) + 15 bonus on perfect score
 *  Other sizes:       1 pt/correct, no bonus
 */

(function (global) {
  'use strict';

  var BONUS_MAP = { 5: 3, 10: 8, 15: 15 };

  /**
   * Calculate total points for a quiz attempt.
   * @param {number} score          - number of correct answers
   * @param {number} totalQuestions - total number of questions
   * @returns {number} points earned
   */
  function calculatePoints(score, totalQuestions) {
    var base = score; // 1 point per correct answer
    var bonus = 0;
    if (score === totalQuestions && BONUS_MAP[totalQuestions] !== undefined) {
      bonus = BONUS_MAP[totalQuestions];
    }
    return base + bonus;
  }

  /**
   * Save a quiz record to Firestore and update the user's point totals.
   * The legacy `client` and `user` params are accepted but ignored;
   * Firebase globals (FB_DB, FB_AUTH) are used instead.
   *
   * @param {*} _client  - unused (legacy Supabase param)
   * @param {*} _user    - unused (legacy Supabase param)
   * @param {object} payload - quiz record fields (excluding points_earned)
   * @returns {Promise<number>} points earned (0 on error)
   */
  async function saveQuizWithPoints(_client, _user, payload) {
    try {
      var db = window.FB_DB;
      var auth = window.FB_AUTH;
      if (!db || !auth) return 0;

      var user = auth.currentUser;
      if (!user) return 0;

      var pts = calculatePoints(payload.score, payload.total_questions);

      var { collection, addDoc, doc, runTransaction, serverTimestamp } =
        await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js');

      // Insert quiz record
      await addDoc(collection(db, 'quiz_records'), Object.assign({}, payload, {
        user_id: user.uid,
        points_earned: pts,
        completed_at: serverTimestamp()
      }));

      // Atomically increment total_points and total_quizzes on the user doc
      var userRef = doc(db, 'users', user.uid);
      await runTransaction(db, async function (tx) {
        var snap = await tx.get(userRef);
        var data = snap.exists() ? snap.data() : { total_points: 0, total_quizzes: 0 };
        tx.set(userRef, {
          total_points: (data.total_points || 0) + pts,
          total_quizzes: (data.total_quizzes || 0) + 1
        }, { merge: true });
      });

      return pts;
    } catch (e) {
      console.warn('Could not save quiz record / update points:', e);
      return 0;
    }
  }

  /**
   * Calculate total points for a daily-challenge attempt.
   * Perfect score (score === totalQuestions) earns 10× the normal total.
   * @param {number} score          - number of correct answers
   * @param {number} totalQuestions - total number of questions
   * @returns {number} points earned
   */
  function calculateDailyChallengePoints(score, totalQuestions) {
    var base = score;
    var bonus = score === totalQuestions ? (BONUS_MAP[totalQuestions] || 0) : 0;
    var normal = base + bonus;
    return score === totalQuestions ? normal * 10 : normal;
  }

  global.QuizRewards = {
    calculatePoints: calculatePoints,
    calculateDailyChallengePoints: calculateDailyChallengePoints,
    saveQuizWithPoints: saveQuizWithPoints
  };
})(window);
