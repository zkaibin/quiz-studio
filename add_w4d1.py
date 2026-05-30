#!/usr/bin/env python3
"""
Add W4D1 questions to questions-science-p6.json
IDs: SCI792-SCI817
"""
import json

new_questions = [
    {
        "id": "SCI792",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following best represents A, B and Z? Question Z A B (1) Does it breathe with gills? fish cow (2) Does it lay eggs? crocodile chicken (3) Does it swim? whale butterfly (4) Does it live both on land and in water? snake bear",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "5/25/26, 5:32 PM P6 打卡营 科学 MCQ W4D1-1",
        "(1)",
        "(2)",
        "(3)"
        ],
        "answer": 0,
        "correct_answer": "5/25/26, 5:32 PM P6 打卡营 科学 MCQ W4D1-1",
        "explanation": "The question asks to identify animal A (scales), animal B (no scales), and Question Z for a frog. A snake has scales (A), a bear does not (B), and Question Z must be \"Does it live both on land and in water?\" because frogs are amphibians."
    },
    {
        "id": "SCI793",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Parts of the human digestive system Function A B C digestion takes place ✓ ✓ digestion is completed ✓ removes water from undigested food ✓ Which of the following correctly matches the functions to the parts of the system? (1) A C (2) A B (3) C B (4) C A",
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
        "explanation": "Part C is the small intestine, where digestion is completed and digested food is absorbed. Part B is the large intestine, which removes water from the remaining undigested food."
    },
    {
        "id": "SCI794",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following is correct? Eggs are produced at Fertilised egg develops at (1) F G (2) G E (3) E F (4) F E",
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
        "explanation": "In the human female reproductive system, eggs are produced in the ovaries (E). If an egg is fertilised, it will develop into a baby in the womb or uterus (F)."
    },
    {
        "id": "SCI795",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The same amount of blood was taken from W, X, Y and Z. Which graph shows the correct comparison of the amount of oxygen in the blood samples?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "5/25/26, 5:32 PM P6 打卡营 科学 MCQ W4D1-1",
        "Option 2",
        "Option 3",
        "Option 4"
        ],
        "answer": 0,
        "correct_answer": "5/25/26, 5:32 PM P6 打卡营 科学 MCQ W4D1-1",
        "explanation": "Blood at Y (from lungs to heart) and Z (from heart to body) is rich in oxygen. Blood at W (from heart to lungs) and X (from body to heart) has less oxygen."
    },
    {
        "id": "SCI796",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Why is part H important to the plant? A: It can develop into a new plant. B: It anchors the plant firmly to the ground. C: It stores excess food made by the plant. D: It absorbs water and mineral salts for the plant.",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "A and C only",
        "B and D only",
        "A, B and C only",
        "B, C and D only"
        ],
        "answer": 0,
        "correct_answer": "A and C only",
        "explanation": "Part H is a seed. Its main importance is that it contains an embryo which can develop into a new plant and it also stores food to help the young plant grow until it can make its own food."
    },
    {
        "id": "SCI797",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "A: Both are dispersed by wind. B: Both will grow into a young plant. C: Both are required for reproduction. D: Both are produced by flowering plants.",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "C only",
        "A and B only",
        "B and D only",
        "B, C and D only"
        ],
        "answer": 0,
        "correct_answer": "C only",
        "explanation": "Both spores and ovules are essential for the reproduction of their respective species. However, only ovules are produced by flowering plants; spores are produced by non- flowering plants like ferns and fungi."
    },
    {
        "id": "SCI798",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "a plant\". He carried out an investigation using one of the set-ups, P, Q, R and S, to check if his hypothesis was correct. Similar stalks of roses and the same amount of water were used for each container. Which set-up should Eugene use to check if his hypothesis was correct?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "P",
        "5/25/26, 5:32 PM P6 打卡营 科学 MCQ W4D1-1",
        "Q",
        "R"
        ],
        "answer": 0,
        "correct_answer": "P",
        "explanation": "To test if substance Y affects water uptake, you need a control set-up that is exactly the same except without substance Y. Set-up S compares \"water with substance Y\" to \"water only\" while using red dye in both to track the movement."
    },
    {
        "id": "SCI799",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "state of water. Each process involves either a heat gain or heat loss. Which pair of arrows represents the processes which involve heat gain?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "A and B",
        "A and D",
        "B and C",
        "C and D"
        ],
        "answer": 0,
        "correct_answer": "A and B",
        "explanation": "ice melts to form water (heat gain), water evaporates to form water vapour (heat gain). water freezes to form ice (heat loss), steam condenses to form water (heat loss)."
    },
    {
        "id": "SCI800",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "A: food B: water C: oxygen D: carbon dioxide",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "A and C only",
        "B and D only",
        "A, B and C only",
        "B, C and D only"
        ],
        "answer": 0,
        "correct_answer": "A and C only",
        "explanation": "During photosynthesis, plants use light to turn carbon dioxide and water into food (sugar). This process also produces oxygen, which is released into the air for us to breathe."
    },
    {
        "id": "SCI801",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which graph shows the correct relationship between the wind speed and the average distance away from the parent plant of fruits J and K?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "5/25/26, 5:32 PM P6 打卡营 科学 MCQ W4D1-1",
        "Option 2",
        "Option 3",
        "Option 4"
        ],
        "answer": 0,
        "correct_answer": "5/25/26, 5:32 PM P6 打卡营 科学 MCQ W4D1-1",
        "explanation": "Fruit J has wings and is dispersed by wind, so a higher wind speed helps it travel a further average distance. Fruit K has hooks for animal dispersal, so its distance from the parent plant is not affected by wind speed."
    },
    {
        "id": "SCI802",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "A: using less fuel helps to reduce haze and global warming B: carrying out reforestation helps to reduce soil erosion and floods C: preventing disposal of waste into water helps to reduce pollution and haze",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "A and B only",
        "A and C only",
        "B and C only",
        "A, B and C"
        ],
        "answer": 1,
        "correct_answer": "A and C only",
        "explanation": "Using less fuel (A) reduces carbon dioxide emissions, which helps slow down global warming and reduce haze. Reforestation (B) helps plants hold soil in place with their roots, preventing soil erosion and flooding during heavy rain."
    },
    {
        "id": "SCI803",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "throughout the year. Given that butterfly L only feeds on the nectar of the flowers of plant K, which graph is correct?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4"
        ],
        "answer": 1,
        "correct_answer": "Option 2",
        "explanation": "Since butterfly L only feeds on the nectar of plant K, their population sizes are linked. When the number of plants increases, there is more food for the butterflies, so their population also rises together."
    },
    {
        "id": "SCI804",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "similar beakers. Each beaker contains an equal amount of solution, X, Y and Z. The set- ups are left in the sun for two weeks. After two weeks, the number of water plants in each set-up are as shown. Based on the information, which statement(s) is/are correct? A: Solution Y can speed up the growth of the water plants. B: Solution Z can speed up the growth of the water plants. C: Solution X has the best effect on the growth of the water plants. D: The use of the solutions is necessary for the growth of the water plants.",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "A only",
        "B only",
        "A and C only",
        "A, C and D only"
        ],
        "answer": 0,
        "correct_answer": "A only",
        "explanation": "Set-up P (Solution X) showed the largest increase in the number of plants, meaning it was the most effective. Solution Y also helped growth, but Solution Z (R) actually caused the number of plants to decrease over time."
    },
    {
        "id": "SCI805",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "container of hot water. Which of following are the most important properties of the bottle and the balloon for it to become inflated? Bottle Balloon (1) transparent flexible (2) transparent waterproof (3) good conductor of heat flexible (4) good conductor of heat waterproof",
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
        "explanation": "The bottle must be a good conductor of heat to allow the heat from the hot water to heat the air quickly. The balloon must be flexible so that it can stretch and inflate as the air inside gains heat and expands."
    },
    {
        "id": "SCI806",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "wires. She tested the circuit and the bulbs lighted up brightly. She repeated her experiment by increasing variable X and keeping all other variables constant. Her results are as shown. What could variable X be?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "number of wires",
        "number of bulbs in series",
        "number of bulbs in parallel",
        "number of batteries in series"
        ],
        "answer": 0,
        "correct_answer": "number of wires",
        "explanation": "Adding more bulbs in a series increases the total resistance in the circuit. This makes the electricity flow more slowly, which causes each bulb to become dimmer."
    },
    {
        "id": "SCI807",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Switch M Switch N Number of bulbs lighted up open open 0 closed open 1 open closed 1 Based on the results, which of the following would most likely be the circuit that was constructed?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "5/25/26, 6:13 PM P6 打卡营 科学 MCQ W4D1-2",
        "Option 2",
        "Option 3",
        "Option 4"
        ],
        "answer": 0,
        "correct_answer": "5/25/26, 6:13 PM P6 打卡营 科学 MCQ W4D1-2",
        "explanation": "In circuit (3), closing either switch M or N creates a complete path for electricity to flow to one of the bulbs. If both are open, no path exists, which matches the results in the table."
    },
    {
        "id": "SCI808",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "A: air B: oil C: ruler D: shadow",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "D only",
        "A and D only",
        "B and C only",
        "A, B and C only"
        ],
        "answer": 0,
        "correct_answer": "D only",
        "explanation": "Matter is anything that has mass and occupies space. A shadow is simply an area where light is blocked by an opaque object; it does not have weight or take up physical space."
    },
    {
        "id": "SCI809",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following is possible? Melting point of P (°C) Boiling point of P (°C) (1) 25 155 (2) 25 145 (3) 35 145 (4) 35 155",
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
        "explanation": "For P to be a solid at 28°C, its melting point must be higher than 28°C (e.g., 35°C). For it to be a gas at 148°C, its boiling point must be lower than 148°C (e.g., 145°C)."
    },
    {
        "id": "SCI810",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "the same mass of 50 g. She poured 200 cm³ of water onto each towel and hung them at three different locations around the school. The graph shows how the mass of towels changed over a period of 30 minutes. Based on the results, which statements are most likely correct? A: All the towels were completely dry in 30 minutes. B: Towel S was placed in a sunny location but not towel R. C: There was more wind at the location where towel T was than where towel S was. D: There was a larger exposed area of towel R than towel T to its surroundings.",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "A and D only",
        "B and C only",
        "A, B and C only",
        "B, C and D only"
        ],
        "answer": 0,
        "correct_answer": "A and D only",
        "explanation": "Towel S lost mass faster than R, which means it was in a sunnier or windier spot. Towel T lost the most mass, meaning it was in the best location for evaporation, such as a very windy area."
    },
    {
        "id": "SCI811",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "cylinder with 20 cm³ of water. She then placed the plunger back into the cylinder to trap 20 cm³ of air. Which of the following would Aishah most likely observe after she pushed the plunger downwards as far as she could without any air or water escaping?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "5/25/26, 6:13 PM P6 打卡营 科学 MCQ W4D1-2",
        "Option 2",
        "Option 3",
        "Option 4"
        ],
        "answer": 1,
        "correct_answer": "Option 2",
        "explanation": "Air can be compressed into a smaller space, but water and solids cannot. When the plunger is pushed, the 20cm3 of air will be squeezed, while the water and metal block will keep their original volumes."
    },
    {
        "id": "SCI812",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "his eye at position B. Which of the following shows the path taken by the light rays to enable Linus to see the object at position A?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "eye → mirror Q → object at A",
        "object at A → mirror P → eye",
        "eye → mirror Q → mirror P → object at A",
        "object at A → mirror P → mirror Q → eye"
        ],
        "answer": 0,
        "correct_answer": "eye → mirror Q → object at A",
        "explanation": "To see an object, light from the object must reflect off the mirrors and reach your eye. The correct path is: light from the object at A reflects off Mirror P, then off Mirror Q, and finally enters the eye at B."
    },
    {
        "id": "SCI813",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "oven to bake a loaf of bread at a temperature of 180°C for 10 minutes. He inserts a thermometer into the centre of the bread immediately to check its temperature. It reads 90°C. Which of the following explains why the temperature is still 90°C even after 10 minutes?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "The bread is a poor conductor of heat so heat is conducted slowly from the air in the",
        "oven to the bread.",
        "The bread is a good conductor of heat so heat is conducted quickly away from the",
        "bread to the surroundings."
        ],
        "answer": 0,
        "correct_answer": "The bread is a poor conductor of heat so heat is conducted slowly from the air in the",
        "explanation": "The oven air is hot, but the bread is a poor conductor of heat. This means it takes a long time (30 minutes) for the heat to move from the air into the center of the bread to cook it fully."
    },
    {
        "id": "SCI814",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "direction as shown by the arrow and the rubber band became stretched. Once he released his hand, the ball was launched. Which of the following shows the correct conversion of energy for the ball to be launched?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "kinetic energy of plastic tube → kinetic energy of ball → potential energy of ball",
        "potential energy of plastic tube → potential energy of ball → kinetic energy of ball",
        "potential energy of plastic tube → kinetic energy of rubber band → kinetic energy of ball",
        "kinetic energy of plastic tube → potential energy of rubber band → kinetic energy of ball"
        ],
        "answer": 0,
        "correct_answer": "kinetic energy of plastic tube → kinetic energy of ball → potential energy of ball",
        "explanation": "Pulling the plastic tube increases the kinetic energy of the plastic tube, which stretches the rubber band, increasing its elastic potential energy. releasing the rubber band then converts potential energy of the rubber band to kinetic energy of the ball as it is launched out."
    },
    {
        "id": "SCI815",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "then to Q. It stopped at Q. Which of the following is correct? Forces acting on the block of ice at P Q Friction Weight Friction Weight (1) ✓ ✓ ✓ (2) ✓ ✓ ✓ (3) ✓ ✓ ✓ (4) ✓ ✓ ✓",
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
        "explanation": "Friction acts between two surfaces in contact to oppose motion. Weight (gravity) always acts on an object regardless if it is moving or stationary."
    },
    {
        "id": "SCI816",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The reading on the electronic balance changes when another magnet or an iron bar is held close to the first magnet. Which of the following shows the possible readings for diagram 1 and 3? Readings on the electronic balance (g) Diagram 1 Diagram 3 (1) 90 more than 137 (2) 90 less than 137 (3) 150 more than 137 (4) 150 less than 137",
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
        "explanation": "In Diagram 3, the iron bar is attracted to the magnet, which pulls the magnet upward and makes the scale reading less than 137g. In Diagram 2, the magnet's like poles are facing each other, thence they repel, resulting in a large scale reading. In Diagram 1, there is no attraction or repulsion, hence the scale reading is less than 137g."
    },
    {
        "id": "SCI817",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "when compressed. She placed object Z on spring A and measured how much the spring decreased in length. The same experiment was repeated using springs B, C and D, and the results were recorded as shown. Spring Mass of object (g) Decrease in length of spring (cm) A 100 1.1 B 100 3.4 C 100 2.8 D 100 4.0 If the springs were hung using four identical blocks, which of the following shows the correct results?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "5/25/26, 6:13 PM P6 打卡营 科学 MCQ W4D1-2",
        "Option 2",
        "Option 3",
        "Option 4"
        ],
        "answer": 1,
        "correct_answer": "Option 2",
        "explanation": "Spring A is the stiffest as for the same mass of 100g, the decrease in length was the smallest; followed by C, B and D. Thus, for all springs to be stretched to the same length of 3cm, the most mass must be hung on A, followed by C, B and D."
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

print(f"✓ Added {len(new_questions)} questions for W4D1")
