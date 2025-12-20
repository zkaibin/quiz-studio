#!/bin/bash

# Quiz Studio Sample Data Setup Script
# This script helps populate the database with sample characters and questions

echo "🎓 Quiz Studio Sample Data Setup"
echo "=================================="
echo ""
echo "This script creates sample data via API calls."
echo "Make sure the server is running: npm start"
echo ""
read -p "Press Enter to continue..."

BASE_URL="http://localhost:3000/api"

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to make API calls
call_api() {
    local method=$1
    local endpoint=$2
    local data=$3
    
    curl -s -X $method "$BASE_URL$endpoint" \
        -H "Content-Type: application/json" \
        -d "$data"
}

echo -e "${BLUE}Adding Character Universes...${NC}"

# Add Universes
call_api POST "/characters/universes" '{
    "universe_name": "Disney",
    "description": "Disney animated characters - perfect for young learners!"
}'
echo -e "${GREEN}✓ Disney universe added${NC}"

call_api POST "/characters/universes" '{
    "universe_name": "Studio Ghibli",
    "description": "Beautiful Studio Ghibli characters"
}'
echo -e "${GREEN}✓ Studio Ghibli universe added${NC}"

call_api POST "/characters/universes" '{
    "universe_name": "Marvel",
    "description": "Marvel superheroes"
}'
echo -e "${GREEN}✓ Marvel universe added${NC}"

call_api POST "/characters/universes" '{
    "universe_name": "KPOP Stars",
    "description": "Popular KPOP characters"
}'
echo -e "${GREEN}✓ KPOP Stars universe added${NC}"

echo ""
echo -e "${BLUE}Adding Characters...${NC}"

# Disney Characters
call_api POST "/characters" '{
    "name": "Elsa",
    "universe_id": 1,
    "emoji_icon": "❄️"
}'
echo -e "${GREEN}✓ Elsa added${NC}"

call_api POST "/characters" '{
    "name": "Olaf",
    "universe_id": 1,
    "emoji_icon": "☃️"
}'
echo -e "${GREEN}✓ Olaf added${NC}"

call_api POST "/characters" '{
    "name": "Mickey Mouse",
    "universe_id": 1,
    "emoji_icon": "🐭"
}'
echo -e "${GREEN}✓ Mickey Mouse added${NC}"

call_api POST "/characters" '{
    "name": "Minnie Mouse",
    "universe_id": 1,
    "emoji_icon": "🐭"
}'
echo -e "${GREEN}✓ Minnie Mouse added${NC}"

call_api POST "/characters" '{
    "name": "Buzz Lightyear",
    "universe_id": 1,
    "emoji_icon": "🚀"
}'
echo -e "${GREEN}✓ Buzz Lightyear added${NC}"

# Studio Ghibli Characters
call_api POST "/characters" '{
    "name": "No Face",
    "universe_id": 2,
    "emoji_icon": "👻"
}'
echo -e "${GREEN}✓ No Face added${NC}"

call_api POST "/characters" '{
    "name": "Totoro",
    "universe_id": 2,
    "emoji_icon": "🐱"
}'
echo -e "${GREEN}✓ Totoro added${NC}"

# Marvel Characters
call_api POST "/characters" '{
    "name": "Iron Man",
    "universe_id": 3,
    "emoji_icon": "🦾"
}'
echo -e "${GREEN}✓ Iron Man added${NC}"

call_api POST "/characters" '{
    "name": "Captain America",
    "universe_id": 3,
    "emoji_icon": "🛡️"
}'
echo -e "${GREEN}✓ Captain America added${NC}"

call_api POST "/characters" '{
    "name": "Black Widow",
    "universe_id": 3,
    "emoji_icon": "🕷️"
}'
echo -e "${GREEN}✓ Black Widow added${NC}"

echo ""
echo -e "${BLUE}Adding Math Questions...${NC}"

# Addition Questions
call_api POST "/questions" '{
    "category": "addition",
    "difficulty": "easy",
    "template": "{character1} has {num1} apples. {character2} gives them {num2} apples. How many apples does {character1} have now?",
    "placeholders": ["character1", "character2", "num1", "num2"],
    "answer": 7
}'
echo -e "${GREEN}✓ Addition question 1 added${NC}"

call_api POST "/questions" '{
    "category": "addition",
    "difficulty": "medium",
    "template": "{character1} collected {num1} coins. Then {character2} gave {character1} {num2} more coins. How many coins does {character1} have?",
    "placeholders": ["character1", "character2", "num1", "num2"],
    "answer": 15
}'
echo -e "${GREEN}✓ Addition question 2 added${NC}"

# Subtraction Questions
call_api POST "/questions" '{
    "category": "subtraction",
    "difficulty": "easy",
    "template": "{character1} had {num1} toys. They gave {num2} toys to {character2}. How many toys does {character1} have left?",
    "placeholders": ["character1", "character2", "num1", "num2"],
    "answer": 3
}'
echo -e "${GREEN}✓ Subtraction question 1 added${NC}"

# Multiplication Questions
call_api POST "/questions" '{
    "category": "multiplication",
    "difficulty": "medium",
    "template": "{character1} has {num1} bags with {num2} candies in each bag. How many candies does {character1} have in total?",
    "placeholders": ["character1", "num1", "num2"],
    "answer": 20
}'
echo -e "${GREEN}✓ Multiplication question 1 added${NC}"

# Division Questions
call_api POST "/questions" '{
    "category": "division",
    "difficulty": "medium",
    "template": "{character1} has {num1} cookies and wants to share them equally among {num2} friends. How many cookies does each friend get?",
    "placeholders": ["character1", "num1", "num2"],
    "answer": 4
}'
echo -e "${GREEN}✓ Division question 1 added${NC}"

echo ""
echo -e "${GREEN}=================================="
echo "✅ Sample data added successfully!"
echo "===================================${NC}"
echo ""
echo "Your Quiz Studio is now ready!"
echo "📚 Quiz: http://localhost:3000"
echo "⚙️  Admin: http://localhost:3000/admin"
echo ""
echo "Try taking a quiz and see your characters in action!"
