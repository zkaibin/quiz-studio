window.SUPABASE_CONFIG = {
    url: 'https://heaaszrnxjfmtvheoauc.supabase.co',
    anonKey: 'sb_publishable_MFQXZP19lJvBhSCIZQpyPQ_VkFPcNzF'
};

// Single shared Supabase client for the entire page.
// All scripts should use window.SUPABASE_CLIENT instead of calling
// supabase.createClient() independently to avoid concurrent token-refresh
// races that can trigger spurious SIGNED_OUT events.
if (typeof supabase !== 'undefined') {
    window.SUPABASE_CLIENT = supabase.createClient(
        window.SUPABASE_CONFIG.url,
        window.SUPABASE_CONFIG.anonKey
    );
}
