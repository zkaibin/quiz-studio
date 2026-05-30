#!/usr/bin/env python3
"""
Add W3D5 questions to questions-science-p6.json
IDs: SCI764-SCI788
"""
import json

new_questions = [
    {
        "id": "SCI764",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which materials are most suitable for making oven gloves and baking trays when baking? Oven gloves Baking trays (1) A C (2) B D (3) B C (4) E E",
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
        "explanation": "Oven gloves must be flexible (to wear easily) and poor conductor of heat (to prevent burns to hand). Baking trays must be not flexible (to carry properly), strong (to withstand the heat) and good conductors of heat (to allow food to bake quickly)."
    },
    {
        "id": "SCI765",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Characteristics D E F G does it moult? no yes no yes does it have a 4-stage life cycle? no no yes no does its young resemble the adult? yes yes yes no does it have wings? no yes yes no The diagram shows a grasshopper. Based on the information given in the table above, which group does the grasshopper belong to?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "D",
        "E",
        "F",
        "G"
        ],
        "answer": 0,
        "correct_answer": "D",
        "explanation": "A grasshopper moults as it grows, has a 3-stage life cycle (egg, nymph, adult), and its young looks like the adult but without wings. Group E correctly matches these traits because the grasshopper has wings in its adult stage and moults during its life cycle."
    },
    {
        "id": "SCI766",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "minutes before slowing down to a stop. Which of the following graphs correctly represents Danny's heart rate during his exercise?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "5/22/26, 3:49 PM P6 打卡营 科学 MCQ W3D5-1",
        "Option 2",
        "Option 3",
        "Option 4"
        ],
        "answer": 0,
        "correct_answer": "5/22/26, 3:49 PM P6 打卡营 科学 MCQ W3D5-1",
        "explanation": "When Danny walks, his heart rate stays steady; when he jogs, it increases to pump more oxygen to his muscles. Once he stops, his heart rate gradually slows down back to a resting state. Graph 1 correctly shows this \"rise and then fall\" pattern over the 30 minutes."
    },
    {
        "id": "SCI767",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "environment. Organism Characteristics Needle-like leaves A Swollen stems Presence of chloroplasts in the stem Large ears Hides in burrows in the day B Hunts only at night Which one of the following best describes the characteristics of the environment which you would most likely find both organisms A and B in? Characteristics of the environment Temperature of the surroundings Amount of water (1) low all the time very little water (2) higher in the day than at night plenty of water (3) low all the time plenty of water (4) higher in the day than at night very little water",
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
        "explanation": "Organism A has needle-like leaves and swollen stems to store water, while Organism B stays in burrows to escape heat. These are adaptations for a desert environment where temperatures are high in the day and water is very scarce."
    },
    {
        "id": "SCI768",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "stages of its life cycle. Which section of the graph best represents the butterfly in its pupa stage?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "RS",
        "ST",
        "UV",
        "VW"
        ],
        "answer": 0,
        "correct_answer": "RS",
        "explanation": "The pupa stage is a non-moving and non-feeding stage where the butterfly undergoes transformation. Section UV shows zero movement over several days, which accurately represents the inactive pupa stage."
    },
    {
        "id": "SCI769",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "for food to be digested using the set-up shown. She repeated the experiment with different volumes of digestive juices and different amounts of food as shown in the table. Experiment Volume of digestive juices (ml) Amount of food (g) A 250 100 B 200 100 C 250 50 D 200 50 Which two experiments should she use to conduct a fair test?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "A and B",
        "A and C",
        "B and C",
        "B and D"
        ],
        "answer": 0,
        "correct_answer": "A and B",
        "explanation": "To conduct a fair test, only the volume of digestive juices should be changed. Therefore, the amount of food must remain constant. Experiments A and B both use 100g of food, making them the correct pair to compare the volume of juices."
    },
    {
        "id": "SCI770",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "next to the window. A datalogger recorded the mass every 30 minutes for 3 hours. Samuel presented his findings in the graph shown. What is variable X?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "time of the day",
        "number of leaves",
        "mass of the plant",
        "volume of water in the flask"
        ],
        "answer": 1,
        "correct_answer": "number of leaves",
        "explanation": "As the plant takes in water through its roots, the mass of the flask, water, and plant will decrease over time. Variable X represents \"time of the day,\" showing that as more time passes, more water is used by the plant for photosynthesis and transpiration."
    },
    {
        "id": "SCI771",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Based on the diagram, which of the following shows the correct direction of movement of food and water at part T? Direction of movement at part T Food Water (1) downwards only upwards only (2) upwards only downwards only (3) upwards and downwards upwards only (4) upwards and downwards downwards only",
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
        "explanation": "Part T is the stem of the plant. Water is transported upwards from the roots to the leaves and fruits. Food made in the leaves is transported both upwards and downwards to all parts of the plant, including the roots and developing fruit."
    },
    {
        "id": "SCI772",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Based on the information given, which young inherited all of its characteristics from only one parent?",
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
        "explanation": "Rabbit B has white fur, red eyes, and small ears, which are the exact same characteristics as the Mother. This means B inherited all three observed traits from only one parent."
    },
    {
        "id": "SCI773",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Plant Y winds itself upwards on tree X to recieve more __________.",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "water directly when it rains",
        "more fertiliser",
        "sunlight",
        "oxygen"
        ],
        "answer": 0,
        "correct_answer": "water directly when it rains",
        "explanation": "Plant Y is a climber that winds itself around the tall tree X. By climbing higher, it can reach the canopy where there is more sunlight for its leaves to carry out photosynthesis."
    },
    {
        "id": "SCI774",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following is not an impact of the type of pollution shown?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "loss of habitat",
        "contamination of water",
        "less dissolved oxygen in the water",
        "emission of more greenhouse gases"
        ],
        "answer": 0,
        "correct_answer": "loss of habitat",
        "explanation": "An oil spill directly pollutes the water, killing marine life and contaminating habitats. While it is harmful, it does not directly cause the emission of greenhouse gases, which usually come from burning fuels or factories."
    },
    {
        "id": "SCI775",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "After 30 minutes, which row gives the correct amount of oxygen in each jar? Most oxygen Least oxygen (1) P Q (2) P R (3) Q P (4) R P",
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
        "explanation": "Jar P has a plant in sunlight, so it produces oxygen through photosynthesis. Jar R contains exhaled air, which has less oxygen and more carbon dioxide than normal air."
    },
    {
        "id": "SCI776",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "What is most likely to increase the size of population C?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "fewer B",
        "fewer G",
        "more A",
        "more D"
        ],
        "answer": 0,
        "correct_answer": "fewer B",
        "explanation": "fewer B will result in fewer C (there is less food for C) fewer G will result in more B, resulting in more C (there is more food for C) more A will result in less C (C is eaten by A) more D will result in less C (C is eaten by D)"
    },
    {
        "id": "SCI777",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "three cars moved to the left. When he turned car Q around, car P moved to the left, car Q remained and car R moved to the right as shown. Which conclusion about object X and the poles of A, B and C of the magnets is correct? X A B C (1) magnet S S S (2) magnet N N S (3) magnetic material S N S (4) magnetic material S S N",
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
        "explanation": "object X must be a magnet as only magnets can repel. A and B must be the same pole for them to repel after car Q was flipped. B and C must be opposite poles for them to attract before car Q was flipped."
    },
    {
        "id": "SCI778",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which row shows the correct observation and reason after he poured the water? Observation Reason (1) some water will overflow from the test tube water occupies space (2) the water will fill up half of the test tube water has a definite volume (3) the beaker of water will become heavier water has mass (4) the water will change shape water has a definite shape",
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
        "explanation": "Since the container is already full, adding more water will cause it to overflow into the test tube. This happens because water is a matter that occupies space and has a definite volume."
    },
    {
        "id": "SCI779",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "observations. Which statement is correct?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "The ball cast a shadow on the floor.",
        "The ball cast a shadow on the mirror.",
        "The mirror showed the image of the ball only.",
        "The torchlight and eye were the sources of light."
        ],
        "answer": 1,
        "correct_answer": "The ball cast a shadow on the mirror.",
        "explanation": "Light travels in a straight line, and when it is blocked by the opaque ball, a shadow is cast on the floor. The eye is not a source of light; it only receives light reflected from objects."
    },
    {
        "id": "SCI780",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "had some water in it. After a while, Vincent observed that balloon B burst but balloon A did not. Which of the following best explains his observation?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "The air expanded faster in balloon A than B.",
        "Balloon A has water which absorbed all the heat.",
        "5/22/26, 3:55 PM P6 打卡营 科学 MCQ W3D5-2",
        "The air in balloon A gained heat faster than balloon B."
        ],
        "answer": 0,
        "correct_answer": "The air expanded faster in balloon A than B.",
        "explanation": "The water in Balloon A absorbs some of the heat from the flame, slowing down the temperature rise of the air inside. In Balloon B, the air gains heat much faster, causing it to expand rapidly and burst the balloon."
    },
    {
        "id": "SCI781",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Substance Freezing point (°C) Boiling point (°C) A 0 100 B 17 118.1 C 5.5 80.2 D 43 181 Based on the information, which of the following statements is correct?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "Substance D is a solid at 30°C.",
        "Substance A is a solid at 50°C.",
        "Substance B is a gas at 100°C.",
        "Substance A and C are liquids at 0°C."
        ],
        "answer": 0,
        "correct_answer": "Substance D is a solid at 30°C.",
        "explanation": "Substance D has a freezing point of 43°C, so at 30°C (which is below its freezing point), it must be in a solid state."
    },
    {
        "id": "SCI782",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "glass jar is 300cm3 and it contains 30cm3 of water. Each time the plunger of the pump is pulled back completely, 20cm3 of air would be drawn out of the glass jar. Which of the following shows the correct volume of air and water in the glass jar after the plunger pulled back completely once? Volume of air (cm3) Volume of water (cm3) (1) 250 50 (2) 250 30 (3) 270 30 (4) 290 10",
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
        "explanation": "The pump removes air only. The volume of water remains unchanged. The volume of air also remains unchanged as the air expands to occupy the rest of the space."
    },
    {
        "id": "SCI783",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following statements are correct? A: There is no heat gained at MN. B: The ice cubes are melting at KL. C: Evaporation takes place at LM only. D: Water is in the solid state at JK only.",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "A and B only",
        "A and D only",
        "B and C only",
        "C and D only"
        ],
        "answer": 0,
        "correct_answer": "A and B only",
        "explanation": "At KL, the temperature stays at 0°C, which is the melting point where ice turns into water. At MN, the temperature is constant at 28°C, meaning no further heat is gained to increase the temperature."
    },
    {
        "id": "SCI784",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following energy conversions is correct?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "kinetic energy → potential energy",
        "kinetic energy → heat + sound energy",
        "potential energy → kinetic energy → potential energy",
        "potential energy → sound energy + heat energy → kinetic energy"
        ],
        "answer": 0,
        "correct_answer": "kinetic energy → potential energy",
        "explanation": "The stretched rubber band has elastic potential energy, which converts to kinetic energy as the ball moves. As the ball goes higher, some kinetic energy is converted back into gravitational potential energy."
    },
    {
        "id": "SCI785",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which one of the following conclusions is correct?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "Object A is heavier than object C.",
        "Object A exerts the least force on the spring.",
        "Object B exerts gravitational force on the spring.",
        "Object A, B and C have elastic spring force."
        ],
        "answer": 0,
        "correct_answer": "Object A is heavier than object C.",
        "explanation": "Spring A is the least stretched, which means object A has the least mass and exerts the least downward pull (force). Gravity is the force that pulls the objects down, while the spring provides an upward elastic spring force."
    },
    {
        "id": "SCI786",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "P. Which of the graphs correctly shows the relationship between the push force and the length of the spring?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "5/22/26, 3:55 PM P6 打卡营 科学 MCQ W3D5-2",
        "Option 2",
        "Option 3",
        "Option 4"
        ],
        "answer": 0,
        "correct_answer": "5/22/26, 3:55 PM P6 打卡营 科学 MCQ W3D5-2",
        "explanation": "As you push the pump with more force, the spring compresses and its length decreases. Graph 1 shows that as the force increases, the length of the spring gets shorter until it hits part P."
    },
    {
        "id": "SCI787",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following statements is correct?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "The dog exerts a force on the ground and the sled.",
        "There is no friction between the sled and the ground.",
        "The dog and the sled are moving in the opposite direction.",
        "The force acting on the sled is greater than the weight of the sled."
        ],
        "answer": 1,
        "correct_answer": "There is no friction between the sled and the ground.",
        "explanation": "The dog must push against the ground to move forward and pull on the sled to move it. Therefore, the dog is exerting a force on both the ground and the sled at the same time."
    },
    {
        "id": "SCI788",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "What could object X be? A: steel paper clip B: copper wire C: magnet D: eraser",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "D only",
        "5/22/26, 3:55 PM P6 打卡营 科学 MCQ W3D5-2",
        "C and D only",
        "A and B only"
        ],
        "answer": 0,
        "correct_answer": "D only",
        "explanation": "For a bulb to light up, the object connected must be an electrical insulator. Only eraser (D) is an insulator."
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

print(f"✓ Added {len(new_questions)} questions for W3D5")
