#!/bin/bash

# GitHub Pages Deploy Helper - Move files from /public to root
# This script copies all files from /public folder to repository root
# so GitHub Pages can find them

set -e

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║   GitHub Pages - Move Files from /public to Root              ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

REPO_ROOT="/Users/zkaibin/website/quiz-studio"

echo "📂 Current Location: $REPO_ROOT"
echo ""

# Check if public folder exists
if [ ! -d "$REPO_ROOT/public" ]; then
    echo "❌ Error: /public folder not found at $REPO_ROOT/public"
    exit 1
fi

echo "📋 Files in /public:"
ls -la "$REPO_ROOT/public/" | grep -E "^-|^d" | awk '{print "   " $9}' | head -10
echo ""

# Confirm before proceeding
read -p "Ready to copy files from /public to root? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Cancelled."
    exit 1
fi

echo ""
echo "🔄 Copying files from /public to root..."
echo ""

# Copy all files from public to root
cp -r "$REPO_ROOT/public"/* "$REPO_ROOT/"

echo "✅ Files copied!"
echo ""

# List what was copied
echo "📦 Files/Folders now in root:"
ls -la "$REPO_ROOT/" | grep -E "^-|^d" | grep -v "^\." | awk '{print "   " $9}'
echo ""

# Git commands
echo "🔄 Committing to git..."
cd "$REPO_ROOT"

git add .
git commit -m "Move files from /public to root for GitHub Pages deployment"
echo "✅ Committed"
echo ""

echo "📤 Pushing to GitHub..."
git push
echo "✅ Pushed!"
echo ""

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║ ✨ DEPLOYMENT READY!                                          ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo "Next Steps:"
echo "1. Go to: https://github.com/zkaibin/quiz-studio/settings/pages"
echo "2. Source: Deploy from a branch"
echo "3. Branch: main"
echo "4. Folder: / (root)  ← Select this!"
echo "5. Click SAVE"
echo ""
echo "Then wait 2-3 minutes for deployment..."
echo ""
echo "Your site: https://zkaibin.github.io/quiz-studio/"
echo ""
