import json

new_questions = [
    # PDF 1 - Questions 1-14
    {
        "id": "SCI1008",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The diagram below shows two organisms. How are the two organisms similar?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "They do not have roots.",
            "They do not have stems.",
            "They reproduce by spores.",
            "They do not make their own food."
        ],
        "answer": 2,
        "correct_answer": "C",
        "explanation": "Both ferns and mushrooms are non-flowering organisms that do not produce seeds. Instead, they both utilize spores as their method of reproduction."
    },
    {
        "id": "SCI1009",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Study the classification chart below. Which of the following statements is correct?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "C is a bat",
            "B is a spider",
            "A and B are birds",
            "B and D are mammals"
        ],
        "answer": 0,
        "correct_answer": "A",
        "explanation": "According to the chart, \"C\" does not have three body parts and can fly. A bat is a mammal that fits this description as it is not an insect and possesses wings for flight."
    },
    {
        "id": "SCI1010",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "{CHARACTER_0} drew the diagram below to show the direction of blood flow in the human circulatory system. Which arrows are drawn correctly?",
        "diagram": None,
        "placeholder_roles": ["protagonist"],
        "options": [
            "A and B only",
            "A and C only",
            "B and D only",
            "All of the above"
        ],
        "answer": 1,
        "correct_answer": "B",
        "explanation": "Arrow A correctly shows oxygenated blood flowing from the lungs to the heart. Arrow C correctly shows blood being pumped from the heart to the rest of the body, such as the legs."
    },
    {
        "id": "SCI1011",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Study the information in the table below.\n\nFound in\n               Flowering plant   Human\nMale reproductive cell    Anther         B\nFemale reproductive cell  A              C\n\nWhich of the following correctly identifies A, B and C?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "A: ovules, B: penis, C: ovary",
            "A: ovary, B: penis, C: ovules",
            "A: ovary, B: testes, C: ovules",
            "A: ovules, B: testes, C: ovary"
        ],
        "answer": 3,
        "correct_answer": "D",
        "explanation": "In flowering plants, the female reproductive cells are found in the ovules. In humans, male reproductive cells (sperm) are produced in the testes, and female reproductive cells (eggs) are produced in the ovaries."
    },
    {
        "id": "SCI1012",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "{CHARACTER_0} found some weeds growing among his plants in his garden as shown in the diagram below. He found that his plants were not growing healthily when the weeds started growing. Based on the diagram above, which of the following best explains why {CHARACTER_0}'s plants were not growing healthily?",
        "diagram": None,
        "placeholder_roles": ["protagonist"],
        "options": [
            "The weeds competed with the plants for air.",
            "The weeds competed with the plants for water.",
            "The weeds competed with the plants for warmth.",
            "The weeds competed with the plants for sunlight."
        ],
        "answer": 1,
        "correct_answer": "B",
        "explanation": "Weeds grow close to the plants and compete for the same resources in the soil. They specifically compete for water and mineral salts, depriving the garden plants of what they need to grow healthily."
    },
    {
        "id": "SCI1013",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The life cycle of a flowering plant is shown below. C and D represent stages in the life cycle. Which of the following is correct?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "pollination: G, germination: E",
            "pollination: F, germination: E",
            "pollination: G, germination: F",
            "pollination: F, germination: G"
        ],
        "answer": 0,
        "correct_answer": "A",
        "explanation": "In the life cycle of a flowering plant, germination (E) occurs after a seed is planted. Pollination (G) is the process that leads to the development of a new seed from the adult plant stage."
    },
    {
        "id": "SCI1014",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "{CHARACTER_0} investigated the effect of light and water on mould growth on bread. She set up an experiment using three pieces of bread, R, S and T, from the same loaf. The bread was toasted. Different amounts of water were sprayed on the bread before being placed in different locations. {CHARACTER_0} observed the following results on Day 5. What can she conclude from the investigation?\n\nA: Mould needs warmth to grow.\nB: Mould grows faster in the dark.\nC: Mould does not need light to grow.\nD: Mould grows faster without water.",
        "diagram": None,
        "placeholder_roles": ["protagonist"],
        "options": [
            "A and B only",
            "B and C only",
            "A, B and C only",
            "B, C and D only"
        ],
        "answer": 1,
        "correct_answer": "B",
        "explanation": "Compare Bread S and T as both had 3 sprays of water. Bread T, kept in the dark room, had more mould than Bread S in the well-lit room. This shows that mould grows faster in the dark and does not need light to grow. A is wrong as warmth was not tested. D is wrong as bread without water had less mould."
    },
    {
        "id": "SCI1015",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "A ring of stem from a plant was removed as shown below. As a result, the tubes carrying food were removed. Which of the following correctly describes the appearance of fruits A and B after a week?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "Fruit A: increase in size, Fruit B: increase in size",
            "Fruit A: increase in size, Fruit B: remains the same",
            "Fruit A: decrease in size, Fruit B: decrease in size",
            "Fruit A: remains the same, Fruit B: increase in size"
        ],
        "answer": 0,
        "correct_answer": "A",
        "explanation": "The ring of stem removed contains the tubes that carry food. This prevents food made by the leaves above the ring from being transported downwards to the roots. However, there are leaves above and below the ring, allowing both Fruit A and Fruit B to still receive food from the leaves. Thus, both fruits will increase in size after a week."
    },
    {
        "id": "SCI1016",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "{CHARACTER_0} set up the following experiment to measure the amount of light that can pass through four materials, A, B, C and D using a light sensor. He recorded the results in the table.\n\nMaterial | Amount of light detected (units)\nA        | 270\nB        | 158\nC        | 0\nD        | 97\n\nWhich of the following shows the correct arrangement of materials from one that allows least light to pass through to one that allows most light to pass through?",
        "diagram": None,
        "placeholder_roles": ["protagonist"],
        "options": [
            "A, C, B, D",
            "B, D, C, A",
            "C, A, D, B",
            "C, D, B, A"
        ],
        "answer": 3,
        "correct_answer": "D",
        "explanation": "The lesser amount of light detected, the lesser the light passes through the material."
    },
    {
        "id": "SCI1017",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Study the food chain shown below.\n\nP → Q → R\n\nWhen organism S was introduced into the environment, the population of Q increased. Which of the following is not a possible reason?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "Organism S is a plant.",
            "Organism S feeds on P.",
            "Organism S is a prey of R.",
            "Organism S is a predator of R."
        ],
        "answer": 1,
        "correct_answer": "B",
        "explanation": "If organism S fed on P (the producer), it would compete with Q for food. This competition would typically cause the population of Q to decrease, not increase."
    },
    {
        "id": "SCI1018",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "{CHARACTER_0} recorded the different organisms he saw at the school pond in the table below.\n\nOrganism     | Number\ntadpole      | 3\nguppies      | 4\nfrog         | 1\ndragonfly    | 2\nwater lettuce| 5\nduckweed     | 10\nwater lotus  | 1\n\nHow many populations of producers and consumers are in this habitat?",
        "diagram": None,
        "placeholder_roles": ["protagonist"],
        "options": [
            "Producers: 3, Consumers: 4",
            "Producers: 3, Consumers: 3",
            "Producers: 2, Consumers: 3",
            "Producers: 2, Consumers: 4"
        ],
        "answer": 1,
        "correct_answer": "B",
        "explanation": "The producers are the water lettuce, duckweed, and water lotus (3 populations). The consumers are the tadpoles + frogs, guppies, and dragonflies (3 populations). Note: Tadpoles and frogs are one population."
    },
    {
        "id": "SCI1019",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "{CHARACTER_0} prepared set-ups A, B and C as shown in the diagram below. She measured the amount of oxygen in each of the containers before leaving them in an open field for a day. At the end of her experiment, {CHARACTER_0} measured the amount of oxygen in each of the containers again. Which of the following shows the change in the amount of oxygen in each of the set-ups at the end of the experiment?",
        "diagram": None,
        "placeholder_roles": ["protagonist"],
        "options": [
            "A: increase, B: no change, C: increase",
            "A: decrease, B: increase, C: increase",
            "A: decrease, B: increase, C: no change",
            "A: decrease, B: increase, C: decrease"
        ],
        "answer": 3,
        "correct_answer": "D",
        "explanation": "In Set-up A, insects consume oxygen through respiration, causing a decrease. In Set-up B, the plant produces more oxygen through photosynthesis than it uses, causing an increase, while in Set-up C, the opaque wooden container prevents photosynthesis, leading to an oxygen decrease from respiration."
    },
    {
        "id": "SCI1020",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "{CHARACTER_0} used fruit P shown below to find out the average time taken for it to reach the ground when it is released from a height. He conducted three experiments at the same location. The results of his experiments are recorded as shown.\n\nExperiment | Number of wing-like structures | Height of drop (cm) | Average time taken for fruit to reach the ground (s)\n1          | 4                              | 150                 | 5.6\n2          | 4                              | H                   | 4.7\n3          | 2                              | 150                 | T\n\nWhat are the possible values of H and T?",
        "diagram": None,
        "placeholder_roles": ["protagonist"],
        "options": [
            "H: 110, T: 4.2",
            "H: 110, T: 5.9",
            "H: 180, T: 4.2",
            "H: 180, T: 5.9"
        ],
        "answer": 0,
        "correct_answer": "A",
        "explanation": "Reducing the height of the drop (H) will result in a shorter time than 5.6s, making 110cm a possible value. Reducing the number of wing-like structures decreases air resistance, so the fruit will fall faster (T < 5.6s), making 4.2s the likely value."
    },
    {
        "id": "SCI1021",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Topsoil is the most fertile soil for plant growth. An experiment is conducted as shown below. The same amount of water is poured from the top of each of the three sections of a slope of soil. The amount of soil collected in each section is measured. Which of the following conclusion(s) can be drawn from the experiment above?\n\nA: Deforestation leads to global warming.\nB: Deforested areas have less topsoil.\nC: The roots of plants held the soil together to reduce soil erosion.\nD: The roots absorbed all the water in the soil.",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "A only",
            "A and C only",
            "B and C only",
            "C and D only"
        ],
        "answer": 2,
        "correct_answer": "C",
        "explanation": "Section A (no plants) had the most soil collected, showing high erosion. Section B (most plants) had the least soil, proving that roots hold soil together and reduce erosion."
    },
    
    # PDF 2 - Questions 15-28
    {
        "id": "SCI1022",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The table below shows the properties of four materials, A, B, C and D. A tick (✓) indicates the presence of property in the material. Which material, A, B, C or D, is suitable to make part W which is used for grilling of food?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "Material A",
            "Material B",
            "Material C",
            "Material D"
        ],
        "answer": 2,
        "correct_answer": "C",
        "explanation": "Part W is used for grilling, so it must be strong to hold food and a good conductor of heat to cook it. Material C is the only one listed with both of these essential properties."
    },
    {
        "id": "SCI1023",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Magnet Q was fixed to the table. Magnet R was brought close to Magnet Q as shown below. Which of the following shows the direction of the different forces acting on magnet R?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "Magnetic force: ←, Frictional force: →, Gravitational force: ↑",
            "Magnetic force: →, Frictional force: →, Gravitational force: ↑",
            "Magnetic force: ←, Frictional force: ←, Gravitational force: ↓",
            "Magnetic force: →, Frictional force: ←, Gravitational force: ↓"
        ],
        "answer": 3,
        "correct_answer": "D",
        "explanation": "The south pole of R faces the north pole of Q, creating an attractive magnetic force to the right. Friction acts in the opposite direction of potential movement (left), and gravity always pulls objects downward."
    },
    {
        "id": "SCI1024",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The graph shows the length of four rubber bands, A, B, C and D, when a load is hung onto them. {CHARACTER_0} wants to choose an elastic band to make a catapult that can launch a stone over the greatest distance when pulled back by a fixed length. Which rubber band, A, B, C or D, should {CHARACTER_0} choose?",
        "diagram": None,
        "placeholder_roles": ["protagonist"],
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "answer": 3,
        "correct_answer": "D",
        "explanation": "Rubber band D shows the least extension for the same mass, meaning it is the stiffest. A stiffer elastic band can store and release more elastic potential energy to launch a stone further."
    },
    {
        "id": "SCI1025",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The dentist uses a mouth mirror to examine the teeth of her patient. Which of the following best explains how the dentist is able to see the teeth in the mouth mirror?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "The mouth mirror shines light onto the teeth for the dentist to see.",
            "The mouth mirror reflects light from the teeth for the dentist to see.",
            "The mouth mirror absorbs light from the teeth for the dentist to see.",
            "The mouth mirror allows light to pass through the teeth for the dentist to see."
        ],
        "answer": 1,
        "correct_answer": "B",
        "explanation": "Light from a source must first hit the teeth and reflect off them. The mouth mirror then reflects this light into the dentist's eyes, allowing the teeth to be seen."
    },
    {
        "id": "SCI1026",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Eskimos build igloos with ice blocks for shelter as shown in the following diagram. Which of the following best explains how the igloos keep the Eskimos warm?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "Coldness in the surrounding air is conducted into the igloos slowly as the ice is a poor conductor of heat.",
            "Coldness in the surrounding air cannot enter due to the tiny pouring of the igloo.",
            "Heat from the hot air inside the igloo cannot be conducted out of the igloo as ice is a poor conductor of heat.",
            "Heat from the hot air inside the igloo is conducted out of the igloo slowly as ice is a poor conductor of heat."
        ],
        "answer": 3,
        "correct_answer": "D",
        "explanation": "Heat always flows from a hotter to a colder place, until both sides reach same temperature."
    },
    {
        "id": "SCI1027",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The diagram below shows a head torch powered by batteries. Which of the following correctly shows the energy changes in the head torch?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "potential energy → heat energy → light energy",
            "electrical energy → light energy + heat energy",
            "potential energy → electrical energy → light energy + heat energy",
            "electrical energy → potential energy → light energy + heat energy"
        ],
        "answer": 2,
        "correct_answer": "C",
        "explanation": "Chemical potential energy in the batteries is first converted into electrical energy. This electrical energy is then converted into both light and heat energy by the torch bulb."
    },
    {
        "id": "SCI1028",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "{CHARACTER_0} pasted a film on glass window to reduce the amount of sunlight coming into the room. Some air bubbles were trapped under the film as shown below. What will happen to the total volume and the mass of air in the gap if the weather becomes very hot for a few weeks?",
        "diagram": None,
        "placeholder_roles": ["protagonist"],
        "options": [
            "Volume of air in the gap: increase, Mass of air in the gap: remain the same",
            "Volume of air in the gap: increase, Mass of air in the gap: increase",
            "Volume of air in the gap: remain the same, Mass of air in the gap: increase",
            "Volume of air in the gap: remain the same, Mass of air in the gap: remain the same"
        ],
        "answer": 0,
        "correct_answer": "A",
        "explanation": "As the weather gets hotter, the air inside the gap gains heat and expands, increasing its volume. However, since no air is added or removed from the trapped gap, the mass of the air remains constant."
    },
    {
        "id": "SCI1029",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Four identical cloths A, B, C and D each containing the same amount of water, were left to dry under different conditions 1, 2, 3 and 4. She recorded the mass of each cloth after an hour and plotted the graph below. Based on the results in the graph above, which of the following is correct?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "condition 1: B, condition 2: D, condition 3: C, condition 4: A",
            "condition 1: A, condition 2: C, condition 3: D, condition 4: B",
            "condition 1: B, condition 2: A, condition 3: C, condition 4: D",
            "condition 1: A, condition 2: B, condition 3: C, condition 4: D"
        ],
        "answer": 0,
        "correct_answer": "A",
        "explanation": "The cloth with the lowest mass (B) dried the fastest under the best conditions (hot and windy). The cloth with the highest mass (A) dried the slowest under the poorest conditions (cool, no wind, and folded)."
    },
    {
        "id": "SCI1030",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The table below shows the melting and boiling point of three substances, E, F and G.\n\nSubstance | Melting point (°C) | Boiling point (°C)\nE         | 2                  | 29\nF         | 10                 | 21\nG         | 32                 | 50\n\n{CHARACTER_0} wants to store the substances for a long period of time. Which of the following substance(s) has to be stored in a sealed container at 30°C to prevent it from escaping into the surroundings?",
        "diagram": None,
        "placeholder_roles": ["protagonist"],
        "options": [
            "F only",
            "E and F only",
            "E and G only",
            "E, F and G"
        ],
        "answer": 1,
        "correct_answer": "B",
        "explanation": "At 30°C, substance E (boiling point 29°C) and substance F (boiling point 21°C) have both turned into gases. They must be kept in sealed containers to prevent them from escaping into the air."
    },
    {
        "id": "SCI1031",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Study the circuit diagram below, Materials P, Q and R were connected to the circuit below. Which one of the following most likely represents the materials P, Q and R, and the number of bulbs that lighted up?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "P: steel, Q: glass, R: aluminium, Number of lit bulbs: 4",
            "P: aluminium, Q: iron, R: glass, Number of lit bulbs: 3",
            "P: glass, Q: copper, R: steel, Number of lit bulbs: 2",
            "P: copper, Q: glass, R: iron, Number of lit bulbs: 3"
        ],
        "answer": 3,
        "correct_answer": "D",
        "explanation": "For bulbs B1, B3, and B4 to light up, P and R must be a conductor, while Q must be an insulator so that B2 does not light up."
    },
    {
        "id": "SCI1032",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "{CHARACTER_0} noticed that the green exit sign above the door was faulty. Only the bulbs behind three letters, X, I and T were lit, but the letter E was not. All the components used are identical and in good working condition. Which of the following shows the correct arrangement of the circuit?",
        "diagram": None,
        "placeholder_roles": ["protagonist"],
        "options": [
            "(1)",
            "(2)",
            "(3)",
            "(4)"
        ],
        "answer": 2,
        "correct_answer": "C",
        "explanation": "The fact that three letters remained lit while one failed suggests a parallel circuit. Arrangement 3 shows a parallel setup where the failure of one bulb (E) would not affect the others."
    },
    {
        "id": "SCI1033",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The graph shows the extension of spring Q and spring R when different loads were hung on them. The initial length of Springs Q and R were 8 cm. Which of the following is correct?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "mass of load when final length of spring Q is 10cm (g): 100, final length of spring R with 200g load (cm): 10",
            "mass of load when final length of spring Q is 10cm (g): 200, final length of spring R with 200g load (cm): 12",
            "mass of load when final length of spring Q is 10cm (g): 100, final length of spring R with 200g load (cm): 12",
            "mass of load when final length of spring Q is 10cm (g): 200, final length of spring R with 200g load (cm): 10"
        ],
        "answer": 1,
        "correct_answer": "B",
        "explanation": "To reach a final length of 10cm, spring Q (initial 8cm) needs an extension of 2cm, which requires a 200g load. At 200g, spring R extends by 4cm, resulting in a final length of 12cm (8cm + 4cm)."
    },
    {
        "id": "SCI1034",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "{CHARACTER_0} has three wooden frames, P, Q and R as shown below. She hung the frames between a lamp and a screen. The shadows formed on the screen are shown below. Which of the following correctly shows the positions of frames P, Q and R?",
        "diagram": None,
        "placeholder_roles": ["protagonist"],
        "options": [
            "position 1: Q, position 2: R, position 3: P",
            "position 1: P, position 2: Q, position 3: R",
            "position 1: Q, position 2: P, position 3: R",
            "position 1: R, position 2: P, position 3: Q"
        ],
        "answer": 0,
        "correct_answer": "A",
        "explanation": "The object closest to the lamp produces the largest shadow. Based on the overlapping sizes in the final shadow, Q (the largest) is at position 1, R is at position 2, and P (the smallest) is at position 3."
    },
    {
        "id": "SCI1035",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "A ball is rolled down a slope. The graph shows the amount of different types of energy of the ball at point P. The experiment is repeated with sand applied on the slope. Which graph correctly shows the amounts of different types of energy at P?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "(1)",
            "(2)",
            "(3)",
            "(4)"
        ],
        "answer": 2,
        "correct_answer": "C",
        "explanation": "Applying sand increases friction on the slope, which converts more kinetic energy into heat energy. Consequently, the ball at point P will have less kinetic energy and more heat energy compared to the original experiment. Since the height of the ball is the same, the potential energy is the same."
    }
]

# Load existing data
with open('data/questions-science-p6.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Add new questions
data.extend(new_questions)

# Save updated data
with open('data/questions-science-p6.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Added {len(new_questions)} W5D4 questions (SCI1008-SCI1035)")
print(f"Total questions in database: {len(data)}")
