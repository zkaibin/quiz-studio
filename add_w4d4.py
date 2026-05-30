#!/usr/bin/env python3
"""
Add W4D4 questions to questions-science-p6.json
IDs: SCI876-SCI889
"""
import json

new_questions = [
    {
        "id": "SCI876",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "What could W, X, Y and Z be? W X Y Z (1) heat sand water vapour oxygen (2) light water vapour sand oil (3) oxygen oil sand sound (4) sound oxygen oil sand",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "(1)",
        "(2)",
        "(3)",
        "(4)"
        ],
        "answer": 0,
        "correct_answer": "(1)",
        "explanation": "W is sound (no mass), X is oxygen (gas, no definite volume), Y is oil (liquid, no definite shape), and Z is sand (solid, definite shape)."
    },
    {
        "id": "SCI877",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "of the following statements explains her observation?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "Air has mass.",
        "Air occupies space.",
        "Air does not have a definite shape.",
        "Air does not have a definite volume."
        ],
        "answer": 0,
        "correct_answer": "Air has mass.",
        "explanation": "Air is a gas, and gases do not have a definite volume. This allows the air to be compressed, enabling more air to be pumped into an already \"full\" basketball."
    },
    {
        "id": "SCI878",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which one of the following statements about the graph above is not correct?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "Substance Q is a solid at 5°C.",
        "Substance Q is a liquid at 30°C.",
        "The melting point of substance Q is 0°C.",
        "The boiling point of substance Q is 50°C."
        ],
        "answer": 0,
        "correct_answer": "Substance Q is a solid at 5°C.",
        "explanation": "The graph shows a horizontal line at 10°C, which represents the melting point where the temperature remains constant during the state change. Therefore, the melting point is 10°C, not 0°C."
    },
    {
        "id": "SCI879",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "After one of the bulbs had fused, all the other bulbs can still light up. Which bulb had fused?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "A",
        "B",
        "C",
        "D"
        ],
        "answer": 0,
        "correct_answer": "A",
        "explanation": "Bulb C is in its own parallel branch. If it fuses, the circuit remains closed for bulbs A, B, and D, allowing them to continue lighting up."
    },
    {
        "id": "SCI880",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "before sinking. What are the properties of the material? Property flexible waterproof (1) ✓ ✓ (2) ✓ X (3) X X (4) X ✓",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "(1)",
        "(2)",
        "(3)",
        "(4)"
        ],
        "answer": 0,
        "correct_answer": "(1)",
        "explanation": "The material must be flexible to be folded into a boat. However, because it sank after a while, it is not waterproof."
    },
    {
        "id": "SCI881",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "moved from position X to position Z as shown below. Which graph shows the correct sizes of the shadows when the ball was at various positions?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "5/28/26, 4:55 PM P6 打卡营 科学 MCQ W4D4-2",
        "Option 2",
        "Option 3",
        "Option 4"
        ],
        "answer": 0,
        "correct_answer": "5/28/26, 4:55 PM P6 打卡营 科学 MCQ W4D4-2",
        "explanation": "The closer an object is to a light source, the larger the shadow."
    },
    {
        "id": "SCI882",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which statement explains why she can see the magnifying glass?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "Light is reflected from the butterfly.",
        "No light passes through the butterfly.",
        "5/28/26, 4:55 PM P6 打卡营 科学 MCQ W4D4-2",
        "Light passes through the glass easily."
        ],
        "answer": 0,
        "correct_answer": "Light is reflected from the butterfly.",
        "explanation": "We see non-luminous objects because light reflects off them into our eyes. Alice sees the magnifying glass because some light reflects from its surface."
    },
    {
        "id": "SCI883",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "rubber ball was hit by object Z and pushed off the wooden table. What are objects Y and Z likely to be? Object Y Object Z (1) magnet iron rod (2) magnet magnet (3) steel rod magnet (4) iron rod steel rod",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "(1)",
        "(2)",
        "(3)",
        "(4)"
        ],
        "answer": 0,
        "correct_answer": "(1)",
        "explanation": "For object Z to hit the ball after being approached by Y, there must be a non-contact force like magnetic repulsion. This occurs if both Y and Z are magnets with facing like-poles."
    },
    {
        "id": "SCI884",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following methods should Amy use to help her remove the metal ring from the metal rod most effectively?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "5/28/26, 4:55 PM P6 打卡营 科学 MCQ W4D4-2",
        "Option 2",
        "Option 3",
        "Option 4"
        ],
        "answer": 0,
        "correct_answer": "5/28/26, 4:55 PM P6 打卡营 科学 MCQ W4D4-2",
        "explanation": "To remove the ring, Amy should cool the metal rod (causing it to contract)."
    },
    {
        "id": "SCI885",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "She then placed beaker X into beaker Y and left them in a room with a temperature of 27°C. Which of the following shows the possible temperature of the water in the beakers after 30 seconds and the correct explaination for it? Beaker X Beaker Y Explaination The water in beaker X lost heat to the surrounding (1) 29°C 20°C air. The water in beaker Y gained heat from the water in (2) 40°C 30°C beaker X. The water in both beakers lost heat to the (3) 27°C 27°C surrounding air and reached room temperature. The water in beaker X lost heat to the water in (4) 35°C 26°C beaker Y.",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "(1)",
        "(2)",
        "(3)",
        "(4)"
        ],
        "answer": 0,
        "correct_answer": "(1)",
        "explanation": "Heat naturally flows from a warmer region (40°C in X) to a cooler region (20°C in Y). After a short time (30 seconds), beaker X will lose some heat and beaker Y will gain some."
    },
    {
        "id": "SCI886",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following graphs correctly shows the change in the amount of kinetic energy (KE) and gravitational potential energy (GPE) of the ball as it moves from point D to point E?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "5/28/26, 4:55 PM P6 打卡营 科学 MCQ W4D4-2",
        "Option 2",
        "Option 3",
        "Option 4"
        ],
        "answer": 0,
        "correct_answer": "5/28/26, 4:55 PM P6 打卡营 科学 MCQ W4D4-2",
        "explanation": "point D is at the highest point, thus GPE is greatest. GPE falls to 0 once it hits the ground, then rises again at point E."
    },
    {
        "id": "SCI887",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "arrangement below. Which of the following arrangements is possible?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "5/28/26, 4:55 PM P6 打卡营 科学 MCQ W4D4-2",
        "Option 2",
        "Option 3",
        "Option 4"
        ],
        "answer": 0,
        "correct_answer": "5/28/26, 4:55 PM P6 打卡营 科学 MCQ W4D4-2",
        "explanation": "Magnets can attract or repel each other, but an iron bar is always attracted to any pole of a magnet. Arrangement (4) is possible as it correctly shows the magnetic interactions and the iron bar's attraction."
    },
    {
        "id": "SCI888",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "from a slope at the same position as shown below. The ball will hit and move the plastic block. The distance moved by the plastic block when it is hit is recorded in the table below. Ball A B C D Distance moved by the plastic block when it is hit (cm) 25 56 12 37 Which of the following balls, A, B, C or D, has hit the plastic block with the greatest force?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "A",
        "B",
        "C",
        "D"
        ],
        "answer": 0,
        "correct_answer": "A",
        "explanation": "The distance a block moves indicates the force of the impact. Ball B moved the block the furthest distance (56 cm), showing it hit with the greatest force."
    },
    {
        "id": "SCI889",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "the same toy car on another slanted surface Y, made of a different material, the toy car did not slide down. What can you infer from the information given above? A: Surface X is rougher than surface Y. B: There is no gravitational force acting on the toy car when it is placed on surface Y. C: There is greater frictional force when the toy car is placed on surface Y than on surface X. D: There is greater gravitational force acting on the toy car when it is placed on surface X than on surface Y.",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "A only",
        "B only",
        "C only",
        "C and D only"
        ],
        "answer": 0,
        "correct_answer": "A only",
        "explanation": "Friction opposes motion. The car did not slide on surface Y because the frictional force between the car and surface Y was greater than the force pulling it down, unlike on surface X."
    },
]

# Load existing data
with open('data/questions-science-p6.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Extend questions
data.extend(new_questions)

# Save
with open('data/questions-science-p6.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"✓ Added {len(new_questions)} questions for W4D4")
