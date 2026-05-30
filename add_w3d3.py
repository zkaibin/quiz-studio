#!/usr/bin/env python3
"""
Add W3D3 questions to questions-science-p6.json
IDs: SCI708-SCI731
"""
import json

new_questions = [
    {
        "id": "SCI708",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which statement is correct?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "Animal X must be a fish.",
        "Animal X must be a reptile.",
        "Animal X must be a mammal.",
        "Animal X must be an amphibian."
        ],
        "answer": 0,
        "correct_answer": "Animal X must be a fish.",
        "explanation": "The animal has moist skin, webbed feet, and gills, which are key characteristics of amphibians."
    },
    {
        "id": "SCI709",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "In the systems above, identify the parts where female reproductive cells are produced. Human reproductive system Plant reproductive system (1) P T (2) Q U (3) P R (4) Q S",
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
        "explanation": "In humans, eggs are produced in the ovaries (Q); in plants, they are produced in the ovules inside the ovary (U)."
    },
    {
        "id": "SCI710",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Where do/does the absorption of digested food take place?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "C only",
        "D only",
        "C and D only",
        "A, B and D only"
        ],
        "answer": 0,
        "correct_answer": "C only",
        "explanation": "Digested food is absorbed into the bloodstream only in the small intestine (D)."
    },
    {
        "id": "SCI711",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "a period of time. Which of the graphs best represents the amount of oxygen Jie Yong used during each activity?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "5/20/26, 4:47 PM P6 打卡营 科学 MCQ W3D3-1",
        "Option 2",
        "Option 3",
        "Option 4"
        ],
        "answer": 0,
        "correct_answer": "5/20/26, 4:47 PM P6 打卡营 科学 MCQ W3D3-1",
        "explanation": "running is more intensive than walking, walking is more intensive than resting. Hence, there is an increase in amount of oxygen used"
    },
    {
        "id": "SCI712",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Animal X is a plant-eater that lives among the trees. It is known to move very slowly. Surprisingly, it's a good swimmer. The fur of Animal X may appear green at times due to algae growth. Which of the following correctly explains how adaptation helps it to survive? Adaptation How it helps in its survival (1) 'green fur' to attract a mate (2) pig-like snout to breathe underwater when swimming (3) slow movement to avoid being seen by its prey (4) long curved claws to grip branches easily",
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
        "explanation": "Animal X use their long curved claws like hooks to grip and hang from tree branches easily."
    },
    {
        "id": "SCI713",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following is likely the fruit of plant W?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4"
        ],
        "answer": 0,
        "correct_answer": "Option 1",
        "explanation": "The young are found downstream along the river, so the fruit must have fibrous husk to be able to float on water."
    },
    {
        "id": "SCI714",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Heart rate / beats per min Time / min Cheryl Ken 0 72 74 5 97 110 10 125 148 Based on the information, which of the following statements can be concluded?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "Cheryl's heart was pumping faster than Ken's heart.",
        "Ken's heart was pumping less blood than Cheryl's heart.",
        "Ken's heart rate increased more than Cheryl's heart rate during the exercise.",
        "Cheryl and Ken's heart rates have reached their maximum after 10 minutes of exercise."
        ],
        "answer": 0,
        "correct_answer": "Cheryl's heart was pumping faster than Ken's heart.",
        "explanation": "Ken’s heart rate jumped from 74 to 148 (+74), while Cheryl’s only went from 72 to 125 (+53)."
    },
    {
        "id": "SCI715",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The same amount of blood was taken from blood vessels, A, B, C and D. Which graph shows the correct comparison of the amount of carbon dioxide in the blood of these blood vessels?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "5/20/26, 4:47 PM P6 打卡营 科学 MCQ W3D3-1",
        "Option 2",
        "Option 3",
        "Option 4"
        ],
        "answer": 0,
        "correct_answer": "5/20/26, 4:47 PM P6 打卡营 科学 MCQ W3D3-1",
        "explanation": "Blood coming from the body (C) has more carbon dioxide than blood coming from the lungs (A) after gas exchange."
    },
    {
        "id": "SCI716",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "E → F → G → H Three students made the following statements: Student A: Organism E gets its energy from the Sun directly. Student B: If all of organism H migrate to another location, the population of F will decrease. Student C: If a disease kills all of organism F, only the population of organism E will decrease. Whose statement(s) is/are correct?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "Student A only",
        "Students A and B only",
        "Students B and C only",
        "Students A, B and C"
        ],
        "answer": 1,
        "correct_answer": "Students A and B only",
        "explanation": "E is a producer getting energy from the Sun; if H is gone, G increases and eats more F, so F decreases."
    },
    {
        "id": "SCI717",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "food relationship among them. He counted the number of animals at the end of each week. After three weeks, he removed animal Y. Animal P feeds on leaves only. None of the animals had any disease. Which of the following is correct?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "Animal Y fed on animal X.",
        "Animal Y fed on animal P.",
        "Animal X fed on animal Y.",
        "Animal X fed on animals P and Y."
        ],
        "answer": 0,
        "correct_answer": "Animal Y fed on animal X.",
        "explanation": "When predator Y was removed at week 3, the population of X immediately started to increase."
    },
    {
        "id": "SCI718",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "made of different materials to wrap two leaves each as shown and started measuring the amount of carbon dioxide in each bag. Which graph represents the change in the amount of carbon dioxide in each bag during the three-hour period?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "5/20/26, 4:47 PM P6 打卡营 科学 MCQ W3D3-1",
        "Option 2",
        "Option 3",
        "Option 4"
        ],
        "answer": 0,
        "correct_answer": "5/20/26, 4:47 PM P6 打卡营 科学 MCQ W3D3-1",
        "explanation": "In light, leaves in transparent Bag P photosynthesize (taking in CO ), while in translucent 2 Bag Q, less light means they mainly respire (releasing CO ). 2"
    },
    {
        "id": "SCI719",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "touched the ground at B. What type of energy did the football have at points A and B? A B (1) kinetic energy potential energy (2) potential energy kinetic energy (3) kinetic and potential energy kinetic energy (4) kinetic and potential energy potential energy",
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
        "explanation": "At the highest point (A), it has both kinetic and potential energy; just before landing (B), it still has kinetic energy from moving."
    },
    {
        "id": "SCI720",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following explains the deflated bouncy castle?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "Air has mass.",
        "Air occupies space.",
        "Air has a definite shape.",
        "Air cannot be compressed."
        ],
        "answer": 0,
        "correct_answer": "Air has mass.",
        "explanation": "Air is a matter that occupies space; when it is let out, the castle loses its volume and collapses."
    },
    {
        "id": "SCI721",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which object(s) is/are definitely a magnet?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "K and L only",
        "L and M only",
        "5/20/26, 5:10 PM P6 打卡营 科学 MCQ W3D3-2",
        "K, L and M only"
        ],
        "answer": 0,
        "correct_answer": "K and L only",
        "explanation": "Objects K, L, and M all show \"hovering\" or repulsion, and only magnets can repel each other."
    },
    {
        "id": "SCI722",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Using a beaker filled with the same amount of water each time, he put in the objects as shown below. Which one of the conclusions that Kyle made is correct?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "C is the heaviest.",
        "B is heavier than A.",
        "C has the least volume.",
        "B takes up as much space as A."
        ],
        "answer": 1,
        "correct_answer": "B is heavier than A.",
        "explanation": "A is 20g, B is 40g, C is 10g."
    },
    {
        "id": "SCI723",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "during wet activities. It enables the user to press the screen and continue using the mobile phone. Which material is most suitable for making part X of the pouch? Property Material allows light to pass flexible waterproof through A x ✓ B x ✓ C x D ✓ ✓",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "Material A",
        "Material B",
        "Material C",
        "Material D"
        ],
        "answer": 1,
        "correct_answer": "Material B",
        "explanation": "Material D is flexible (to press), waterproof (to protect), and clear (to see the screen)."
    },
    {
        "id": "SCI724",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "pedal when {CHARACTER_0} stood at the back of the bicycle as shown below. Which of the following is the best explaination?",
        "diagram": None,
        "placeholder_roles": ['protagonist'],
        "options": [
        "Tom had a greater weight than Jack.",
        "There was a greater frictional force between Jack's shoes and the pedals.",
        "There was a greater gravitational force acting on Tom as he was standing up.",
        "The moving wheels of the bicycle were going against a greater frictional force."
        ],
        "answer": 0,
        "correct_answer": "Tom had a greater weight than Jack.",
        "explanation": "Tom's extra weight presses the wheels harder against the ground, increasing the frictional force Jack must overcome."
    },
    {
        "id": "SCI725",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following would increase the amount of clean water collected within a short period of time?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "Using a cool glass plate",
        "Using a cool metal plate",
        "Using a warm glass plate",
        "Using a warm metal plate"
        ],
        "answer": 0,
        "correct_answer": "Using a cool glass plate",
        "explanation": "Metal is a good conductor of heat, and a cool surface causes steam to condense into water droplets faster."
    },
    {
        "id": "SCI726",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "To shoot an arrow, he needs to pull the bow string back before releasing it. Which of the following best represents the energy conversions involved in shooting an arrow from the point of release?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "kinetic energy (string) → kinetic energy (arrow) → sound energy (arrow)",
        "kinetic energy (archer) → kinetic energy (string) → potential energy (arrow)",
        "potential energy (string) → kinetic energy (string) → kinetic energy (arrow)",
        "potential energy (archer) → potential energy (string) → kinetic energy (arrow)"
        ],
        "answer": 0,
        "correct_answer": "kinetic energy (string) → kinetic energy (arrow) → sound energy (arrow)",
        "explanation": "The stretched string stores elastic potential energy, which turns into kinetic energy for the string and then the arrow."
    },
    {
        "id": "SCI727",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "D, of the electrical circuit shown below. Only one bulb lit up. Which of the following shows the correct positions of the rods? Electrical conductor Electrical insulator (1) A, B, C D (2) A, B, D C (3) A, C, D B (4) B, C, D A",
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
        "explanation": "For only one bulb to light up, A must be an insulator to block electricity flowing to bulbs near to A, C and D, such that only bulb nearest to B lights up."
    },
    {
        "id": "SCI728",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "B, C and D. A B C D Time taken for an ice cube to melt (min) 15 1 4 10 Which material should be used to make a defrosting tray that will thaw the frozen meat fastest?",
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
        "explanation": "Material B melted the ice fastest (1 min), meaning it is the best conductor of heat for thawing meat."
    },
    {
        "id": "SCI729",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "same height and width as shown below. He placed the three boards at positions, A, B and C as shown below. The board at position A is the only board made of a material that allows light to pass through. The diagram below shows the shadow that he noticed on the screen. Based on his observation, which of the following shows the correct positions of the boards in the setup? Circle Triangle Square (1) A B C (2) B A C (3) C A B (4) A C B",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "5/20/26, 5:10 PM P6 打卡营 科学 MCQ W3D3-2",
        "(1)",
        "(2)",
        "(3)"
        ],
        "answer": 0,
        "correct_answer": "5/20/26, 5:10 PM P6 打卡营 科学 MCQ W3D3-2",
        "explanation": "the circle must be in position C as its full image is seen."
    },
    {
        "id": "SCI730",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Can A was taken out. The remaining cans moved forward after Can A was taken out. What would happen to the spring when all the cans were removed?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "The spring would be stretched more.",
        "The spring would be compressed less.",
        "The spring would return to its original length.",
        "The spring would exert an elastic spring force to push the slider."
        ],
        "answer": 0,
        "correct_answer": "The spring would be stretched more.",
        "explanation": "The spring is stretched to pull the slider; once all cans are removed, there is no force holding it, so it returns to its original length."
    },
    {
        "id": "SCI731",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "It moved down and stopped at the bottom of the plank. The different forms of energy of the wooden block at position Q are shown in the graph below. The wooden block was then released from the top of a wooden plank. It moved down more slowly. Which of the following graphs shows the correct result of the wooden block when it was at position Q of the wooden plank?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "5/20/26, 5:10 PM P6 打卡营 科学 MCQ W3D3-2",
        "Option 2",
        "Option 3",
        "Option 4"
        ],
        "answer": 0,
        "correct_answer": "5/20/26, 5:10 PM P6 打卡营 科学 MCQ W3D3-2",
        "explanation": "Since Q is at the same height, PE is the same (50). Since the block is moving more slowly, the KE is lesser than 40. Since energy in a system is constant, there must be more heat energy."
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

print(f"✓ Added {len(new_questions)} questions for W3D3")
