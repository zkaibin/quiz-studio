#!/bin/bash

# GitHub Pages Setup for Quiz Studio
# This script enables GitHub Pages via GitHub CLI (gh)

echo "🚀 Setting up GitHub Pages for Quiz Studio..."
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed."
    echo "Install it with: brew install gh"
    echo ""
    echo "Manual setup instead:"
    echo "1. Go to: https://github.com/zkaibin/quiz-studio"
    echo "2. Click Settings → Pages"
    echo "3. Select 'Deploy from a branch'"
    echo "4. Branch: main, Folder: /public"
    echo "5. Click Save"
    exit 1
fi

# Check if user is authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ Not authenticated with GitHub."
    echo "Run: gh auth login"
    exit 1
fi

echo "✅ GitHub CLI authenticated"
echo ""
echo "Enabling GitHub Pages with /public folder..."
echo ""

# Enable GitHub Pages using gh cli
gh repo edit zkaibin/quiz-studio \
  --enable-issues \
  --enable-projects \
  --enable-wiki

echo ""
echo "✅ Repository configured!"
echo ""
echo "Now enable GitHub Pages via the web interface:"
echo "1. Go to: https://github.com/zkaibin/quiz-studio/settings/pages"
echo "2. Select 'Deploy from a branch'"
echo "3. Branch: main"
echo "4. Folder: /public"
echo "5. Click Save"
echo ""
echo "Your site will be live at: https://zkaibin.github.io/quiz-studio/"
echo "⏱️  Wait 2-3 minutes for deployment..."
