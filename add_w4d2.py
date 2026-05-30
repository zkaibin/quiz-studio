#!/usr/bin/env python3
"""
Add W4D2 questions to questions-science-p6.json
IDs: SCI820-SCI847
"""
import json

new_questions = [
    {
        "id": "SCI820",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following statements about processes Y or Z in the water cycle is correct?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "Heat is needed for process Z only.",
        "Process Y occurs at any temperature.",
        "Process Y occurs during day time only.",
        "Process Z involves a liquid becoming a gas."
        ],
        "answer": 0,
        "correct_answer": "Heat is needed for process Z only.",
        "explanation": "Process Y is evaporation, which can occur at any temperature and any time."
    },
    {
        "id": "SCI821",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Gregory added batteries, one at a time, in series arrangement to the circuit and recorded the brightness of the bulb. The graph shows his results. Which of the following is/are possible explanation(s) why the brightness of the bulb was zero when the sixth battery was added? A: Too many batteries were added to the circuit. B: The sixth battery did not have any potential energy. C: The wire and the sixth battery were not connected properly.",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "A only",
        "B only",
        "A and C only",
        "B and C only"
        ],
        "answer": 0,
        "correct_answer": "A only",
        "explanation": "When too many batteries were added, too much electrical energy was converted to heat energy such that the wire melted, creating an open circuit, leading to 0 brightness. When the wire and sixth battery were not connected properly, an open circuit was created, leading to 0 brightness."
    },
    {
        "id": "SCI822",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the arrows show(s) pollination taking place?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "Y only",
        "W and Y only",
        "X and Z only",
        "Y and Z only"
        ],
        "answer": 0,
        "correct_answer": "Y only",
        "explanation": "Pollination is the transfer of pollen from the anther (male part) to the stigma (female part). Arrows Y and Z show this transfer occurring either within the same flower or between flowers on the same plant."
    },
    {
        "id": "SCI823",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "carrying tubes have been removed. The plant was watered regularly for two weeks. After one week, he observed that fruit B grew bigger than fruit A. Which one of the following statements best explains his observation?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "Fruit B made its own food.",
        "Fruit B absorbed food from the soil.",
        "Leaf Y made food which was transported to fruit B.",
        "Leaf X made food, but the food was not transported to fruit A."
        ],
        "answer": 0,
        "correct_answer": "Fruit B made its own food.",
        "explanation": "When the outer ring is removed, both the food-carrying tubes and water-carrying tubes are cut. Leaf Y is below the cut and can still send food to Fruit B, and receive water from the roots. Leaf X, located above the cut, cannot receive water, hence is unable to photosynthesise and send food to fruit A."
    },
    {
        "id": "SCI824",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "in our body work together. Which of the following correctly shows what X, Y and Z represent? X Y Z (1) oxygen carbon dioxide oxygen (2) carbon dioxide oxygen oxygen (3) carbon dioxide oxygen carbon dioxide (4) oxygen carbon dioxide carbon dioxide",
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
        "explanation": "The respiratory system provides oxygen (Y) to the circulatory system. The circulatory system then delivers this oxygen and digested food to all body parts and carries carbon dioxide (X and Z) away to be exhaled."
    },
    {
        "id": "SCI825",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The plant has leaves which are green in the middle and white around the edges. After a few hours, the leaves were removed and tested for the presence of starch. Which of the following shows the correct test results? Leaf areas where starch is present starch is absent (1) Q, R P, S (2) R, S P, Q (3) R P, Q, S (4) P, Q, S R",
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
        "explanation": "Photosynthesis requires chlorophyll (green parts), light, and carbon dioxide. Starch will only be present in area R because it has chlorophyll, is exposed to light, and has access to carbon dioxide from the surrounding air."
    },
    {
        "id": "SCI826",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Q and S. P is eaten by S. P feeds on R. S feeds on R but not Q. R gets its food from Q. Which one of the following correctly shows the correct classification of the organisms? Food producer Prey Predator & prey Predator (1) R Q S P (2) Q R P S (3) S R P Q (4) Q S R P",
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
        "explanation": "Plants (Q) are food producers. R is a prey that eats Q, P is a predator that eats R, and a prey that is eaten by S. S is the top predator that eats both P and R."
    },
    {
        "id": "SCI827",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "to stop working. Which of the following shows the correct changes in the amount of the components of air inside the lift after one hour? A: Amount of oxygen decreases B: Amount of water vapour increases C: Amount of carbon dioxide remains unchanged",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "5/26/26, 4:01 PM P6 打卡营 科学 MCQ W4D2-1",
        "A and B only",
        "B and C only",
        "A and C only"
        ],
        "answer": 0,
        "correct_answer": "5/26/26, 4:01 PM P6 打卡营 科学 MCQ W4D2-1",
        "explanation": "Trapped people continue to breathe, taking in oxygen and breathing out carbon dioxide and water vapour. Therefore, oxygen levels decrease while carbon dioxide and water vapour levels increase."
    },
    {
        "id": "SCI828",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "then plotted 2 bar graphs as shown below. Based on the bar graphs, which of the following statements about the animals and plants in the pond are definitely correct? A: There are 13 animals. B: There are 7 fish in the pond. C: There are 24 populations of plants. D: There are at least 3 populations of plants.",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "5/26/26, 4:01 PM P6 打卡营 科学 MCQ W4D2-1",
        "A and D only",
        "B and C only",
        "A, C and D only"
        ],
        "answer": 0,
        "correct_answer": "5/26/26, 4:01 PM P6 打卡营 科学 MCQ W4D2-1",
        "explanation": "There are 6 animals that trap air and 7 that have gills, making 13 animals in total. There are at least 3 populations of plants (floating, partially submerged, and totally submerged)."
    },
    {
        "id": "SCI829",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "containers, P, Q, R and S. She then added 100 ml of each type of substance X, Y and Z, into Q, R and S respectively as shown below. In container P, she added another 100 ml of water. Tanya counted the number of organism M in each container over a period of 3 weeks and recorded her findings in the table below. Number of organism M Container Substance At the start of After 1 After 2 After 3 experiment week weeks weeks P none added 10 12 16 22 Q X 10 9 7 3 R Y 10 12 23 44 S Z 10 14 18 26 She made the following conclusions based on her findings. A: Substances X, Y and Z are harmful to organism M. B: Substance Y has no harmful effects on organism M. C: Substances Y and Z contained nutrients for organism M. Which of the above conclusions are likely to be correct?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "A and B only",
        "B and C only",
        "A and C only",
        "A, B and C"
        ],
        "answer": 0,
        "correct_answer": "A and B only",
        "explanation": "Organism M's population increased in containers R (Substance Y) and S (Substance Z) compared to the control P. This suggests substances Y and Z provided nutrients that helped them reproduce."
    },
    {
        "id": "SCI830",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Mr. Lee sprayed insecticide on the vegetables regularly when he found that they were being eaten by caterpillars. The butterflies in the farm pollinate the fruit trees. How would the spraying of insecticide affect the amount of vegetables and fruits produced over a period of three months? A: Number of fruits produced decreases. B: Amount of vegetables produced increases. C: Amount of vegetables produced decreases. D: Number of fruits produced remains the same.",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "A and B",
        "A and C",
        "B and D",
        "C and D"
        ],
        "answer": 0,
        "correct_answer": "A and B",
        "explanation": "Spray kills caterpillars, so fewer vegetables are eaten and their production increases. However, fewer caterpillars mean fewer butterflies later to pollinate the fruit trees, so fruit production decreases."
    },
    {
        "id": "SCI831",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Part X of the plant is swollen. Which of the following correctly shows the substance found in part X and the purpose of being filled with the substance? Substance Purpose (1) air enables the plant to float on water (2) air makes the plant appear bigger to attract pollinators (3) water stores water for the plant (4) water transports water to the rest of the plant",
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
        "explanation": "The swollen part X of the water hyacinth is filled with air. This air acts like a life jacket, providing buoyancy that allows the plant to float on the water surface."
    },
    {
        "id": "SCI832",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following represent the parts involved in producing the male reproductive cells?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "W and Z",
        "W and Y",
        "X and Z",
        "X and Y"
        ],
        "answer": 0,
        "correct_answer": "W and Z",
        "explanation": "In humans, the testes (W) produce male reproductive cells (sperm). In plants, the anther (Z) produces pollen grains, which contain the male reproductive cells."
    },
    {
        "id": "SCI833",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "community. Which of the following correctly shows what A, B, C and D represent in the concept map above? A B C D (1) oxygen food carbon dioxide mineral salts (2) oxygen carbon dioxide mineral salts food (3) food oxygen carbon dioxide mineral salts (4) oxygen mineral salts food carbon dioxide",
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
        "explanation": "Plants (P) produce oxygen (A) and food (B) during photosynthesis. Decomposers (R) break down waste into mineral salts (D), and animals (Q) release carbon dioxide (C) through respiration."
    },
    {
        "id": "SCI834",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which processes, A, B, C or D involve heat loss or heat gain? Heat loss Heat gain (1) A and B C and D (2) B and D A and C (3) B and C A and D (4) C and D A and B",
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
        "explanation": "Melting (D) and boiling (A) require heat gain to change state. Condensation (B) and freezing (C) involve heat loss to the surroundings."
    },
    {
        "id": "SCI835",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "temperatures. State of substances at Substance 25°C 60°C 95°C W solid solid liquid X liquid gas gas Y solid liquid gas Z solid liquid liquid Which substance has the lowest boiling point?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "W",
        "X",
        "Y",
        "Z"
        ],
        "answer": 0,
        "correct_answer": "W",
        "explanation": "Substance X is already a gas at 60°C, meaning its boiling point is even lower than that. The other substances are still liquids or solids at higher temperatures, giving X the lowest boiling point."
    },
    {
        "id": "SCI836",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The rod is too big to fit into the hole of the ring when they are both at room temperature. Which of the following actions will enable Megan to fit the rod into the ring?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "Cool the rod and heat the ring.",
        "Heat the rod and cool the ring.",
        "Cool the rod and the ring to the same temperature.",
        "Heat the rod and the ring to the same temperature."
        ],
        "answer": 1,
        "correct_answer": "Heat the rod and cool the ring.",
        "explanation": "Heating the ring makes it expand and the hole become larger. Cooling the rod makes it contract and become slightly smaller, allowing the rod to fit into the ring."
    },
    {
        "id": "SCI837",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Each beaker contained the same amount of water at different temperatures. He added five identical ice cubes onto each set-up. He measured the time taken for the first water droplet to drip into the beaker. The table below shows the results of his experiment. Time taken for the first water droplet to Temperature of water (°C) drip (s) 30 100 50 70 70 20 What is the aim of Keith's experiment?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "To find out how the temperature of water affects the rate the ice cubes melt.",
        "To find out how the temperature of water affects the rate of evaporation of water.",
        "To find out how the time taken for the first water droplet to drip affects the temperature of",
        "water."
        ],
        "answer": 0,
        "correct_answer": "To find out how the temperature of water affects the rate the ice cubes melt.",
        "explanation": "The number of ice cubes are the same. The experiment measures how the temperature of the water below affects the rate at which water evaporates and then condenses on the cool sheet."
    },
    {
        "id": "SCI838",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which one of the following graphs correctly shows the changes in temperature of liquid X and Y after 2 hours?",
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
        "explanation": "Liquid X (90°C) will lose heat to the cooler Liquid Y (30°C). Over time, X's temperature will drop and Y's will rise until they reach the same temperature."
    },
    {
        "id": "SCI839",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "There are two lamps, L1 and L2, along the path, placed at different positions. The graph below shows how the length of her shadows changed from positions A to E. At which position is L1 and L2 respectively? L1 L2 (1) E A (2) B E (3) A E (4) B A",
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
        "explanation": "Shadows are shortest when the light source is directly above. The graph shows the shadow from L1 is shortest at position B and the shadow from L2 is shortest at position E."
    },
    {
        "id": "SCI840",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "In which circuits would the bulb(s) light up?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "A and B",
        "A and C",
        "B and D",
        "C and D"
        ],
        "answer": 1,
        "correct_answer": "A and C",
        "explanation": "A circuit must be a closed loop with no gaps for electricity to flow. In circuits B and D, the wires are correctly connected to both the tip and the casing of the bulb to create a complete path."
    },
    {
        "id": "SCI841",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "them in various positions, X, Y and Z, in the circuit shown below. The results of the experiment are shown in the table below. A tick (✓) was placed in the box when the bulb lit up. Position where rods were placed Bulb X Y Z L1 L2 L3 P Q R ✓ ✓ Q R P R P Q ✓ ✓ Based on the results given, what can Siew Ling conclude?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "Only rod R is not able to conduct electricity.",
        "Only rods P and Q are able to conduct electricity.",
        "Only rods P and R are able to conduct electricity.",
        "Rods Q and R are better conductors of electricity than rod P."
        ],
        "answer": 0,
        "correct_answer": "Only rod R is not able to conduct electricity.",
        "explanation": "Bulbs only light up when a conductor is in the circuit. By comparing the results, we can see that when P or R are in the path of a bulb, it lights up, but Q does not."
    },
    {
        "id": "SCI842",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "a long period of time. He wanted to find out which materials, P, Q, R or S, is the most suitable for making part X of the flask as shown in the diagram below. He studied the properties of the four types of materials and recorded his findings in a table below. Does it allow light to Does it absorb Is it a good Material pass through? water? conductor of heat? P yes no yes Q no no yes R no no no S no yes no Which material is the most suitable for making part X of the flask?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "Material P",
        "Material Q",
        "Material R",
        "Material S"
        ],
        "answer": 0,
        "correct_answer": "Material P",
        "explanation": "Part X is the walls of the flask, which should prevent heat from escaping. Material R is the best choice because it is a poor conductor of heat and does not absorb water."
    },
    {
        "id": "SCI843",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which one of the following graphs shows the relationship between the amount of kinetic energy he has and the distance he travels down the slope?",
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
        "explanation": "As Tom moves down the slope, his gravitational potential energy is converted into kinetic energy. This means his speed and kinetic energy increase the further he travels down the slope."
    },
    {
        "id": "SCI844",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "by a button. The bulbs and batteries used are identical and are in working condition. When the button is not pressed, only bulb Q lights up with a brightness of 10 units. What would happen to the brightness of both bulbs P and Q if the button is pressed and held down? Bulb P Bulb Q (1) 10 units 0 units (2) more than 10 units 0 units (3) 10 units more than 10 units (4) more than 10 units more than 10 units",
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
        "explanation": "When the button is pressed and held down, a series circuit will be set up with 3 batteries and 2 bulbs (P and Q). Thus, each bulb will receive more energy and be more than 10 units."
    },
    {
        "id": "SCI845",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Placing an eraser on the other end of the ruler, Ellen pressed the ruler down and then let go of the eraser. She observed that the eraser was thrown off the ruler. Where did the eraser obtain its energy from?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "From the bent ruler",
        "From the air surrounding the eraser",
        "From the masses of the ruler and the eraser itself",
        "From the hand that was holding the ruler down on the table"
        ],
        "answer": 0,
        "correct_answer": "From the bent ruler",
        "explanation": "When Ellen presses the ruler, it bends and stores elastic potential energy. When she lets go, this stored energy is converted into kinetic energy, which throws the eraser into the air."
    },
    {
        "id": "SCI846",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following is a possible explanation why the man is able to cling onto the rock wall?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "The frictional force increases as he climbs up the wall.",
        "The frictional force is greater than the weight of the man.",
        "The weight of the man is greater than the gravitational force.",
        "There is no gravitational force acting on the man when he is on the wall."
        ],
        "answer": 0,
        "correct_answer": "The frictional force increases as he climbs up the wall.",
        "explanation": "To stay still on the wall, the upward force of friction between the man and the rock must be equal to his downward weight. If he is clinging securely, the maximum possible friction available is enough to counteract his weight."
    },
    {
        "id": "SCI847",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "magnet Q on the ground directly beneath magnet P as shown in diagram 2. Based on the diagrams only, which of the following statements are correct? A: Magnet Q is stronger than magnet P. B: Magnets P and Q have the same magnetic strength. C: The like poles of magnets P and Q are facing each other.",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "B only",
        "C only",
        "5/26/26, 4:11 PM P6 打卡营 科学 MCQ W4D2-2",
        "A and C only"
        ],
        "answer": 0,
        "correct_answer": "B only",
        "explanation": "In Diagram 2, the spring is shorter (3cm) than in Diagram 1 (5cm). This means Magnet Q is pushing Magnet P upwards, which only happens if their like poles are facing each other and repelling."
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

print(f"✓ Added {len(new_questions)} questions for W4D2")
