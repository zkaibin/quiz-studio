#!/bin/bash

# Verify GitHub Pages Deployment for Quiz Studio

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║     🔍 GitHub Pages Deployment Verification                   ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

REPO="zkaibin/quiz-studio"
SITE_URL="https://zkaibin.github.io/quiz-studio"

echo "📦 Checking Repository Setup..."
echo ""

# Check if code is pushed
echo -n "✓ Checking GitHub repository... "
if gh repo view $REPO &> /dev/null; then
    echo "✅ Found"
else
    echo "❌ Not found"
    exit 1
fi

# Check if main branch has code
echo -n "✓ Checking main branch... "
BRANCH_INFO=$(gh api repos/$REPO/branches/main 2>/dev/null | grep -c "commit")
if [ "$BRANCH_INFO" -gt 0 ]; then
    echo "✅ Has commits"
else
    echo "❌ No commits"
    exit 1
fi

# Check if /public folder exists in repo
echo -n "✓ Checking public folder... "
PUBLIC_FILES=$(gh api repos/$REPO/contents/public 2>/dev/null | grep -c '"name"')
if [ "$PUBLIC_FILES" -gt 0 ]; then
    echo "✅ Found ($PUBLIC_FILES files)"
else
    echo "⚠️  Not detected (may need index.html in root)"
fi

echo ""
echo "📄 Checking Files..."
echo ""

echo -n "✓ index.html... "
INDEX=$(gh api repos/$REPO/contents/public/index.html 2>/dev/null | grep -c '"download_url"')
[ "$INDEX" -gt 0 ] && echo "✅" || echo "❌"

echo -n "✓ admin.html... "
ADMIN=$(gh api repos/$REPO/contents/public/admin.html 2>/dev/null | grep -c '"download_url"')
[ "$ADMIN" -gt 0 ] && echo "✅" || echo "❌"

echo -n "✓ data/questions.json... "
QUESTIONS=$(gh api repos/$REPO/contents/public/data/questions.json 2>/dev/null | grep -c '"download_url"')
[ "$QUESTIONS" -gt 0 ] && echo "✅" || echo "❌"

echo -n "✓ js/data-loader.js... "
LOADER=$(gh api repos/$REPO/contents/public/js/data-loader.js 2>/dev/null | grep -c '"download_url"')
[ "$LOADER" -gt 0 ] && echo "✅" || echo "❌"

echo ""
echo "🌐 GitHub Pages Status..."
echo ""

# Try to access the site (with timeout)
echo -n "Testing site access (timeout 30s)... "
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$SITE_URL" 2>/dev/null)

if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ LIVE!"
    echo ""
    echo "🎉 Your site is ready!"
    echo "   URL: $SITE_URL"
elif [ "$HTTP_CODE" = "404" ]; then
    echo "⏳ Not deployed yet"
    echo ""
    echo "Next steps:"
    echo "1. Go to: https://github.com/$REPO/settings/pages"
    echo "2. Select 'Deploy from a branch'"
    echo "3. Branch: main, Folder: /public"
    echo "4. Click Save"
    echo "5. Wait 2-3 minutes"
elif [ -z "$HTTP_CODE" ]; then
    echo "⚠️  Could not reach"
    echo ""
    echo "This is normal if GitHub Pages just started deploying."
    echo "Check status at: https://github.com/$REPO/settings/pages"
else
    echo "⚠️  HTTP $HTTP_CODE"
fi

echo ""
echo "📋 Summary"
echo "────────────────────────────────────────────────────────────────"
echo "Repository: https://github.com/$REPO"
echo "Site URL:   $SITE_URL"
echo "Branch:     main"
echo "Folder:     /public"
echo ""
echo "Configuration needed at:"
echo "→ https://github.com/$REPO/settings/pages"
echo ""
