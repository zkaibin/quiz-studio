/* global supabase, SUPABASE_CONFIG */
/**
 * Shared user-auth helper loaded on quiz pages.
 * - Checks if a user is logged in via Supabase.
 * - Pre-fills the #studentName field with the user's display/full name.
 * - Makes the field read-only while logged in (guest mode keeps it editable).
 */
(function () {
  'use strict';

  async function applyUserProfile() {
    if (!window.SUPABASE_CONFIG) return;

    let client;
    try {
      client = supabase.createClient(
        window.SUPABASE_CONFIG.url,
        window.SUPABASE_CONFIG.anonKey
      );
    } catch (e) {
      return;
    }

    const { data } = await client.auth.getSession();
    const user = data.session?.user || null;
    if (!user) return;

    const nameInput = document.getElementById('studentName');
    if (!nameInput) return;

    // Try loading from the profiles table first
    let displayName = null;
    try {
      const { data: profile } = await client
        .from('profiles')
        .select('display_name, full_name')
        .eq('id', user.id)
        .maybeSingle();

      displayName =
        profile?.display_name ||
        profile?.full_name ||
        user.user_metadata?.full_name ||
        user.email?.split('@')[0] ||
        'User';
    } catch (e) {
      displayName =
        user.user_metadata?.full_name ||
        user.email?.split('@')[0] ||
        'User';
    }

    nameInput.value = displayName;
    nameInput.readOnly = true;
    nameInput.title = 'Logged in as ' + user.email + ' — edit your profile to change your name.';
    nameInput.style.background = '#f0f4ff';
    nameInput.style.cursor = 'not-allowed';
  }

  // Run once the DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyUserProfile);
  } else {
    applyUserProfile();
  }
})();
