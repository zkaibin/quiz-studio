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
   * Insert a quiz record with points_earned and update the user's profile totals.
   * Fails silently so it never disrupts the quiz experience.
   *
   * @param {object} client      - Supabase client
   * @param {object} user        - Supabase auth user object
   * @param {object} payload     - Fields for quiz_records (excluding points_earned)
   * @returns {Promise<number>}  - points earned (0 on error)
   */
  async function saveQuizWithPoints(client, user, payload) {
    try {
      var pts = calculatePoints(payload.score, payload.total_questions);

      await client.from('quiz_records').insert(
        Object.assign({}, payload, { points_earned: pts })
      );

      await client.rpc('add_quiz_points', {
        p_user_id: user.id,
        p_pts: pts
      });

      return pts;
    } catch (e) {
      console.warn('Could not save quiz record / update points:', e);
      return 0;
    }
  }

  global.QuizRewards = {
    calculatePoints: calculatePoints,
    saveQuizWithPoints: saveQuizWithPoints
  };
})(window);
