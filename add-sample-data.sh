#!/bin/bash

BASE_URL="http://localhost:3000/api"

echo "🎓 Adding Sample Data to Quiz Studio..."
echo ""

# Add Universe
echo "Adding Disney Universe..."
curl -s -X POST "$BASE_URL/characters/universes" \
  -H "Content-Type: application/json" \
  -d '{"universe_name":"Disney","description":"Disney animated characters"}' > /dev/null 2>&1
echo "✅ Universe added"

# Add Characters
echo "Adding Characters..."
curl -s -X POST "$BASE_URL/characters" \
  -H "Content-Type: application/json" \
  -d '{"name":"Elsa","universe_id":1,"emoji_icon":"❄️"}' > /dev/null 2>&1

curl -s -X POST "$BASE_URL/characters" \
  -H "Content-Type: application/json" \
  -d '{"name":"Olaf","universe_id":1,"emoji_icon":"☃️"}' > /dev/null 2>&1

curl -s -X POST "$BASE_URL/characters" \
  -H "Content-Type: application/json" \
  -d '{"name":"Mickey Mouse","universe_id":1,"emoji_icon":"🐭"}' > /dev/null 2>&1

echo "✅ Characters added (Elsa, Olaf, Mickey)"

# Add Questions
echo "Adding Math Questions..."
curl -s -X POST "$BASE_URL/questions" \
  -H "Content-Type: application/json" \
  -d '{"category":"addition","difficulty":"easy","template":"{character1} has {num1} apples. {character2} has {num2} apples. How many apples do they have together?","placeholders":["character1","character2","num1","num2"],"answer":7}' > /dev/null 2>&1

curl -s -X POST "$BASE_URL/questions" \
  -H "Content-Type: application/json" \
  -d '{"category":"subtraction","difficulty":"easy","template":"{character1} had {num1} toys. They gave {num2} toys to {character2}. How many toys does {character1} have left?","placeholders":["character1","character2","num1","num2"],"answer":3}' > /dev/null 2>&1

curl -s -X POST "$BASE_URL/questions" \
  -H "Content-Type: application/json" \
  -d '{"category":"multiplication","difficulty":"medium","template":"{character1} has {num1} bags with {num2} candies in each bag. How many candies does {character1} have in total?","placeholders":["character1","num1","num2"],"answer":20}' > /dev/null 2>&1

echo "✅ Questions added (Addition, Subtraction, Multiplication)"

echo ""
echo "🎉 Sample data setup complete!"
echo ""
echo "Quiz: http://localhost:3000"
echo "Admin: http://localhost:3000/admin"
