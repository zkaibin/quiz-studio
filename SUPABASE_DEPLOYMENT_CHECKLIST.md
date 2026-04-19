# Supabase Integration Deployment Checklist

## Overview
This document guides deploying the Supabase authentication integration to a production environment.

---

## Phase 1: Supabase Project Setup ✅ (Already Done - See Test Page)

If you haven't already set up Supabase:

1. **Create Supabase project** at https://supabase.com
2. **Set up database schema** by running SQL script:
   - Open Supabase Dashboard → SQL Editor
   - Paste contents of `sql/supabase-auth-setup.sql`
   - Execute
3. **Enable Email/Password authentication**:
   - Go to Authentication → Providers
   - Enable Email provider
   - Choose email confirmation settings (recommended: enabled for production)

---

## Phase 2: Local Testing with Test Page

Before deploying auth to production, test locally with the standalone test page:

1. Start local server:
   ```bash
   npm run serve
   ```
2. Open browser to `http://localhost:5000/supabase-test.html`
3. Enter Supabase credentials from **Project Settings → API**:
   - Supabase URL: `https://YOUR-PROJECT-ID.supabase.co`
   - Anon Key: `eyJ...` (starts with `ey`)
4. Click **Save & Connect**
5. Test flows:
   - ✅ Create new account (Sign Up)
   - ✅ Sign In with created email
   - ✅ View and edit profile
   - ✅ Sign out

**Expected behavior:**
- Accounts persist in Supabase
- Only own profile visible to users
- Changes save to database

---

## Phase 3: Production Deployment - Main Landing Page

Production auth is now live in the main landing page (`index.html`).

### Step 1: Create Configuration File

Create `js/supabase-config.js` in your deployment environment:

```javascript
window.SUPABASE_CONFIG = {
    url: 'https://YOUR-PROJECT-ID.supabase.co',
    anonKey: 'YOUR_ANON_KEY_FROM_PROJECT_SETTINGS'
};
```

**⚠️ Important:**
- This file is **gitignored** and NOT committed to GitHub
- You must create it manually on each deployment machine
- Never push this file to version control
- Keep these credentials secure and rotate periodically

### Step 2: Get Credentials from Supabase

1. Log in to Supabase Dashboard
2. Select your project
3. Go to **Project Settings** (bottom left gear icon)
4. Click **API** tab
5. Copy:
   - **Project URL** → paste as `url` in supabase-config.js
   - **anon public** key → paste as `anonKey` in supabase-config.js

### Step 3: Local Verification Before Deploy

Test locally with credentials in place:

```bash
npm run serve
```

Open `index.html` and verify:
- ✅ Login panel appears at top of landing page
- ✅ Can sign up with new email
- ✅ Can sign in with existing account
- ✅ Profile appears after login
- ✅ Can sign out
- ✅ Quiz modes accessible both before and after login

### Step 4: Deploy to Production

Follow your normal deployment process (GitHub Pages, server, etc.):

```bash
# Example for GitHub Pages:
git add -A
git commit -m "Production deployment with Supabase auth"
git push origin main
```

**Note:** The deployed site will NOT have `js/supabase-config.js` from GitHub (it's gitignored). You must:
- Either create it on the server after deployment
- Or build it into your CI/CD pipeline as a post-deploy step

---

## Testing Checklist

After deploying to production:

- [ ] Landing page loads without errors
- [ ] Auth panel visible at top
- [ ] Can create new account
- [ ] Can sign in with created account
- [ ] Profile displays username and email
- [ ] "Edit Profile" button visible
- [ ] "Sign Out" button works
- [ ] Session persists on page refresh
- [ ] Unlogged-in users can still access quiz modes
- [ ] No JavaScript errors in browser console

---

## Troubleshooting

### "Config not found" error in console
**Solution:** Create `js/supabase-config.js` with valid credentials

### "Auth URL is missing" error
**Solution:** Check that `url` in supabase-config.js is correct format:
- Should start with `https://`
- Should end with `.supabase.co` or your custom domain

### "Cannot create user" when signing up
**Solution:** 
- Check email is valid format
- Ensure "Email Provider" is enabled in Supabase Authentication settings
- Check database query logs in Supabase Dashboard

### Profile not loading after login
**Solution:**
- Verify `public.profiles` table exists in Supabase
- Check RLS policies are enabled and correct
- View database logs in Supabase Dashboard

---

## Architecture Reference

| Component | Purpose | Location |
|-----------|---------|----------|
| **Supabase Client** | Auth + DB library | CDN (supabase-js v2) |
| **Config** | Project URL + API key | `js/supabase-config.js` (gitignored) |
| **Auth Logic** | Sign up/in/out, session mgmt | `js/landing-auth.js` |
| **UI** | Login form, profile display | `index.html` + CSS |
| **Database** | User profiles table | Supabase PostgreSQL |

---

## Files Modified for Auth Integration

- `index.html` - Added auth panel HTML, CSS, and script tags
- `js/landing-auth.js` - Full auth state management (new file)
- `js/supabase-config.js` - Credentials template (gitignored, created per deployment)
- `.gitignore` - Updated to exclude config file
- `README.md` - Added deployment documentation

---

## Next Steps / Future Enhancements

- [ ] User profile editing (name, avatar, preferences)
- [ ] Password reset flow
- [ ] OAuth providers (Google, GitHub)
- [ ] User statistics dashboard
- [ ] Quiz performance tracking per user
- [ ] Sync quiz results on user account
