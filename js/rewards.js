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

  function calculatePoints(score, totalQuestions) {
    var base = score;
    var bonus = 0;
    if (score === totalQuestions && BONUS_MAP[totalQuestions] !== undefined) {
      bonus = BONUS_MAP[totalQuestions];
    }
    return base + bonus;
  }

  function mergeSkillStats(existing, incoming, subject) {
    var merged = existing && typeof existing === 'object' ? JSON.parse(JSON.stringify(existing)) : {};
    if (!incoming || typeof incoming !== 'object') return merged;
    var subjectKey = subject || 'general';
    if (!merged[subjectKey]) merged[subjectKey] = {};
    Object.keys(incoming).forEach(function (category) {
      var next = incoming[category] || {};
      var prev = merged[subjectKey][category] || { correct: 0, total: 0 };
      merged[subjectKey][category] = {
        correct: (prev.correct || 0) + (next.correct || 0),
        total: (prev.total || 0) + (next.total || 0)
      };
    });
    return merged;
  }

  function compactPayload(payload) {
    var copy = Object.assign({}, payload || {});
    // Prefer compact question summaries; strip heavy diagram/SVG fields if present.
    if (Array.isArray(copy.questions)) {
      copy.questions = copy.questions.map(function (q) {
        return {
          id: q.id,
          category: q.category || null,
          difficulty: q.difficulty || null,
          answer: q.answer,
          options: q.options,
          template: q.template,
          placeholders: q.placeholders || [],
          explanation: q.explanation || null
        };
      });
    }
    return copy;
  }

  async function saveQuizWithPoints(_client, _user, payload) {
    try {
      var db = window.FB_DB;
      var auth = window.FB_AUTH;
      if (window.QuizPersonalization && payload && payload.subject && payload.questions && payload.answers) {
        await window.QuizPersonalization.recordQuestionResults(payload.subject, payload.questions, payload.answers);
      }
      if (!db || !auth) return 0;

      var user = auth.currentUser;
      if (!user) return 0;

      var pts = calculatePoints(payload.score, payload.total_questions);
      var safePayload = compactPayload(payload);

      var { collection, addDoc, doc, runTransaction, serverTimestamp } =
        await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js');

      await addDoc(collection(db, 'quiz_records'), Object.assign({}, safePayload, {
        user_id: user.uid,
        points_earned: pts,
        completed_at: serverTimestamp()
      }));

      var userRef = doc(db, 'users', user.uid);
      await runTransaction(db, async function (tx) {
        var snap = await tx.get(userRef);
        var data = snap.exists() ? snap.data() : { total_points: 0, total_quizzes: 0 };
        var skillStats = mergeSkillStats(data.skill_stats, safePayload.skill_stats, safePayload.subject);
        tx.set(userRef, {
          total_points: (data.total_points || 0) + pts,
          total_quizzes: (data.total_quizzes || 0) + 1,
          skill_stats: skillStats,
          updated_at: new Date().toISOString()
        }, { merge: true });
      });

      return pts;
    } catch (e) {
      console.warn('Could not save quiz record / update points:', e);
      return 0;
    }
  }

  function calculateDailyChallengePoints(score, totalQuestions) {
    var base = score;
    var bonus = score === totalQuestions ? (BONUS_MAP[totalQuestions] || 0) : 0;
    var normal = base + bonus;
    return score === totalQuestions ? normal * 10 : normal;
  }

  global.QuizRewards = {
    calculatePoints: calculatePoints,
    calculateDailyChallengePoints: calculateDailyChallengePoints,
    saveQuizWithPoints: saveQuizWithPoints,
    mergeSkillStats: mergeSkillStats
  };
})(window);
