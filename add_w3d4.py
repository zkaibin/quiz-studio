#!/usr/bin/env python3
"""
Add W3D4 questions to questions-science-p6.json
IDs: SCI736-SCI761
"""
import json

new_questions = [
    {
        "id": "SCI736",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following is true about mushrooms and moss?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "Both need light to grow.",
        "Both reproduce by spores.",
        "Both obtain food from the tree stump.",
        "Both need to be sheltered by the tree stump."
        ],
        "answer": 0,
        "correct_answer": "Both need light to grow.",
        "explanation": "Mushrooms are fungi and mosses are non-flowering plants, but both reproduce by spores. Mushrooms do not need light to grow as they get food from the stump, whereas mosses need light for photosynthesis."
    },
    {
        "id": "SCI737",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following shows how food travels through the digestive system before digested food enters the blood?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "A → B → C → D",
        "A → B → C →E",
        "B → C → D →E",
        "B → C → E →D"
        ],
        "answer": 0,
        "correct_answer": "A → B → C → D",
        "explanation": "Food travels from the mouth (A) to the gullet (B), then to the stomach (C), and finally to the small intestine (E) where digested food enters the blood. Part D is the large intestine, which handles waste after absorption has already occurred."
    },
    {
        "id": "SCI738",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "What are the functions of part G and H? G H (1) to absorb water to attract insects (2) to anchor the plant to the ground to make food (3) to transport water around the plant to absorb water to allow the leaves of the plant to reach for more (4) to reproduce sunlight",
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
        "explanation": "The stem (G) climbs the pole to allow leaves to reach for more sunlight for photosynthesis. The flowers (H) are the reproductive parts of the plant."
    },
    {
        "id": "SCI739",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following represents P, Q, R S and T? Substance Energy T P Q R S (1) oxygen water carbon dioxide food heat (2) carbon dioxide water oxygen food light (3) oxygen carbon dioxide food water heat (4) food carbon dioxide oxygen water light",
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
        "explanation": "Life process L is photosynthesis. Light is needed for photosynthesis. oxygen is released during photosynthesis."
    },
    {
        "id": "SCI740",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "What do R, S and T represent? R S T (1) lungs other parts of the body heart (2) lungs heart other parts of the body (3) heart lungs other parts of the body (4) heart other parts of the body lungs",
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
        "explanation": "Blood rich in oxygen flows from the lungs to the heart (S) and then to the rest of the body (T)."
    },
    {
        "id": "SCI741",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following is correct? Dispersal Germination Fertilisation (1) P Q S (2) Q R S (3) S P R (4) P Q R",
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
        "explanation": "In the life cycle of a plant, P represents seed dispersal, Q is germination into a young plant, and S is the fertilisation of a flower to produce seeds."
    },
    {
        "id": "SCI742",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which two parts have a similar function?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "A and W",
        "A and Y",
        "B and X",
        "C and Y"
        ],
        "answer": 0,
        "correct_answer": "A and W",
        "explanation": "Part A (stigma) receives pollen, similar to how part Y (vagina) receives sperm."
    },
    {
        "id": "SCI743",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "surrounding temperature increased from 20°C to 30°C due to global warming. Based on the graph, which conclusion is correct when the surrounding temperature increased?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "Only the duration of the larva stage was affected.",
        "5/21/26, 5:10 PM P6 打卡营 科学 MCQ W3D4-1",
        "The duration of the life cycle of butterfly was not affected.",
        "The duration of the larva and pupa stages became shorter."
        ],
        "answer": 0,
        "correct_answer": "Only the duration of the larva stage was affected.",
        "explanation": "The bars for both the larva and pupa stages are shorter at 30°C compared to 20°C. This shows that an increase in temperature speeds up these stages of the life cycle."
    },
    {
        "id": "SCI744",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The use of insecticides in the field caused a drastic decrease in the populations of aphids and caterpillars. Which of the following correctly shows the effect of the use of insecticides on the population of grasshoppers and ladybirds? Population of grasshoppers Population of ladybirds (1) increases remains the same (2) decreases remains the same (3) decreases increases (4) increases decreases",
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
        "explanation": "A decrease in aphids and caterpillars means there is more food (plants) for the grasshoppers, so their population increases. Conversely, ladybirds lose their primary food source (aphids), so their population decreases."
    },
    {
        "id": "SCI745",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "sweeter during warm weather than cold weather. During warm weather, the sun shines more than during cold weather. Which statement best explains why plant B produces sweeter fruit during warm weather?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "It loses more water.",
        "It can take in more carbon dioxide.",
        "It can trap more sunlight for photosynthesis.",
        "Its food-carrying and water-carrying tubes expand."
        ],
        "answer": 1,
        "correct_answer": "It can take in more carbon dioxide.",
        "explanation": "Warm weather usually comes with more sunlight, allowing the plant to trap more light for photosynthesis. This allows the plant to produce more sugar, making the fruit sweeter."
    },
    {
        "id": "SCI746",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following correctly represents Q, X and Y? Q X Y (1) air pollution damage to buildings global warming (2) deforestation soil erosion global warming (3) air pollution melting of ice caps soil erosion (4) land pollution damage to buildings melting of ice caps",
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
        "explanation": "Air pollution (Q) causes acid rain, which damages buildings (X), and an increase in carbon dioxide leads to global warming (Y)."
    },
    {
        "id": "SCI747",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following statements is corect?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "There are 4 populations of producers.",
        "There are 4 populations of consumers.",
        "There are 8 populations of consumers.",
        "There are 9 populations of living organisms."
        ],
        "answer": 0,
        "correct_answer": "There are 4 populations of producers.",
        "explanation": "The consumers are:"
    },
    {
        "id": "SCI748",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "types of chips had. He set each identical chip on fire and used it to heat 30 ml of water as shown until each chip was completely burnt. The table shows the change in temperature of water in the test tube when each type of chip was burnt. temperature of water (°C) Type of chip at the start at the end corn 20 41 potato 20 47 tortilla 20 30 whole grain 20 33 Based on the results, which type of chip has the most stored energy?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "Corn",
        "Potato",
        "Tortilla",
        "Whole grain"
        ],
        "answer": 0,
        "correct_answer": "Corn",
        "explanation": "The Potato chip caused the highest temperature rise in the water (from 20°C to 47°C). This indicates it released the most heat energy during burning."
    },
    {
        "id": "SCI749",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which statement is correct?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "Air in the bottle was compressed.",
        "The mass of the bottle decreased.",
        "The volume of air in the bottle increased.",
        "The mass of the air in the bottle decreased."
        ],
        "answer": 0,
        "correct_answer": "Air in the bottle was compressed.",
        "explanation": "Since the bottle is sealed, no air can escape, so the mass remains the same. However, because the bottle is dented, the air inside is forced into a smaller space and becomes compressed."
    },
    {
        "id": "SCI750",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following explains how this cools the runner?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "The water loses heat to his body.",
        "The water gains heat from his body.",
        "His body loses heat to the surroundings.",
        "The water loses heat to the surroundings."
        ],
        "answer": 0,
        "correct_answer": "The water loses heat to his body.",
        "explanation": "The tap water is cooler than the runner's skin, so it gains heat from his body. As the water absorbs his body heat, the runner's temperature drops and he feels cooler."
    },
    {
        "id": "SCI751",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "What can Mei Ling do so that she can collect more clean water in a shorter period of time?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "Add more boiling sea water.",
        "5/21/26, 5:26 PM P6 打卡营 科学 MCQ W3D4-2",
        "Decrease the intensity of the flame.",
        "Increase the size of the metal plate."
        ],
        "answer": 1,
        "correct_answer": "5/21/26, 5:26 PM P6 打卡营 科学 MCQ W3D4-2",
        "explanation": "A larger metal plate provides a larger surface area for steam to touch and lose heat. This speeds up the condensation of steam into clean water droplets."
    },
    {
        "id": "SCI752",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "not light up. What can the object be? A: magnet B: glass rod C: copper wire D: aluminium foil",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "B only",
        "A and B only",
        "C and D only",
        "A, C and D only"
        ],
        "answer": 0,
        "correct_answer": "B only",
        "explanation": "The bulb did not light up because the object (glass rod) is an electrical insulator that does not allow electricity to flow through. Magnets, copper, and aluminium are all conductors."
    },
    {
        "id": "SCI753",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "working condition. Which of the following about the brightness of bulbs A, B and C is correct?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "Bulb C is the dimmest.",
        "Bulb B is the brightest.",
        "Bulb A is as bright as B.",
        "Bulb A is brighter than C."
        ],
        "answer": 0,
        "correct_answer": "Bulb C is the dimmest.",
        "explanation": "Bulb B is connected to two batteries in series, providing more electrical energy than the single battery in the other circuits. This makes Bulb B the brightest."
    },
    {
        "id": "SCI754",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following activity/activities involve(s) a pull only?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "B only",
        "C only",
        "A and D only",
        "B and C only"
        ],
        "answer": 0,
        "correct_answer": "B only",
        "explanation": "Lifting a glass (B) involves an upward pull against gravity. Cutting, using a mouse, or using chopsticks involve combinations of pushing and pulling."
    },
    {
        "id": "SCI755",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following is not a way to find the poles of Magnet X?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "5/21/26, 5:26 PM P6 打卡营 科学 MCQ W3D4-2",
        "Place Magnet X beside a compass.",
        "Place a magnetic object and Magnet X together.",
        "Test for repulsion using a magnet with its poles labelled."
        ],
        "answer": 0,
        "correct_answer": "5/21/26, 5:26 PM P6 打卡营 科学 MCQ W3D4-2",
        "explanation": "A magnet will attract any magnetic object regardless of which pole is used. To find the poles, you must use methods like repulsion with a known magnet or a compass."
    },
    {
        "id": "SCI756",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "string. He increased the weights until each string broke. The maximum weight that each string could hold before breaking is as shown. Anton then tried a few arrangements of hanging different weights. Which of the following arrangements would be possible?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "5/21/26, 5:26 PM P6 打卡营 科学 MCQ W3D4-2",
        "Option 2",
        "Option 3",
        "Option 4"
        ],
        "answer": 0,
        "correct_answer": "5/21/26, 5:26 PM P6 打卡营 科学 MCQ W3D4-2",
        "explanation": "String Z is the strongest as it can hold up to 7kg. Arrangement (3) is possible because the total weight hanging from each string does not exceed its breaking point."
    },
    {
        "id": "SCI757",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "room temperature could pass through the ring. However, the iron ball could not pass through the ring after it was heated over a flame. What had happened to the volume and mass of the iron ball after it was heated? Volume of the iron ball Mass of the iron ball (1) remains the same increases (2) increases remains the same (3) increases increases (4) remains the same remains the same",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "(1)",
        "(2)",
        "(3)",
        "(4)"
        ],
        "answer": 1,
        "correct_answer": "(2)",
        "explanation": "Heating causes the iron ball to gain heat and expand, which increases its volume. However, no material is added or removed, so its mass remains exactly the same."
    },
    {
        "id": "SCI758",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "identical ice cubes into each beaker at the same time. Arrange the beakers in order of the amount of time taken for the ice cube to melt completely, starting with the longest amount of time.",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "X, Y, Z",
        "X, Z, Y",
        "Z, X, Y",
        "Z, Y, X"
        ],
        "answer": 0,
        "correct_answer": "X, Y, Z",
        "explanation": "Beaker Z has the coolest water (20°C), so it will take the longest to melt the ice. Beaker X has the most hot water (100ml at 80°C), so it has the most heat energy and will melt the ice the fastest."
    },
    {
        "id": "SCI759",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The metal rim was too small to fit around the waterproof wooden cartwheel. Which of the following two steps would allow Ansel to fit the rim tightly around the cartwheel? Step 1 Step 2 (before fitting the rim around the (after fitting the rim around the cartwheel) cartwheel) (1) put the cartwheel in cold water put the rim and cartwheel in hot water (2) heat the rim evenly over the fire put the rim and cartwheel in hot water (3) put the cartwheel in hot water put the rim and cartwheel in cold water (4) heat the rim evenly over the fire put the rim and cartwheel in cold water",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "(1)",
        "(2)",
        "(3)",
        "(4)"
        ],
        "answer": 1,
        "correct_answer": "(2)",
        "explanation": "Heating the rim makes it expand and become larger so it can fit over the wheel. Putting it in cold water afterwards makes it contract and grip the wheel tightly."
    },
    {
        "id": "SCI760",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "shown. When the switch is closed, the fan starts moving and the temperature of the water in the container increases. What type of energy is present at different parts of the circuit? Batteries Wire Water Fan (1) potential energy electrical energy light energy sound energy (2) electrical energy potential energy light energy kinetic energy (3) potential energy electrical energy heat energy kinetic energy (4) electrical energy potential energy heat energy sound energy",
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
        "explanation": "Batteries store chemical potential energy, which converts to electrical energy in the wires. This becomes heat energy in the heating coil and kinetic energy in the moving fan."
    },
    {
        "id": "SCI761",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "magnet affects the magnetism of the temporary magnet. He stroked the steel bar with the magnet in the same direction 120 times. After every 20 strokes, he placed the temporary magnet near 15 paperclips to test how many paperclips it could attract. He recorded his results in the graph as shown. Based on the results of the experiment, what can Elisha conclude?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "The results of the experiment are inconclusive.",
        "The more times the temporary magnet was stroked, the stronger its magnetism.",
        "The magnetism of the temporary magnet remained the same after it was stroked 100",
        "times."
        ],
        "answer": 1,
        "correct_answer": "The more times the temporary magnet was stroked, the stronger its magnetism.",
        "explanation": "The graph shows the number of paperclips attracted stays at 10 after 100 strokes. This means the steel bar reached its maximum magnetic strength and could not become any stronger."
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

print(f"✓ Added {len(new_questions)} questions for W3D4")
