#!/usr/bin/env python3
"""Add W6D4 questions to questions-science-p6.json"""
import json

new_questions = [
    {
        "template": "Reptiles have _______________ on their body.",
        "options": [
            "hair",
            "scales",
            "feathers",
            "moist skin"
        ],
        "answer": 3,
        "correct_answer": "moist skin",
        "explanation": "Reptiles have dry scales while mammals have hair as their outer body covering. Birds have feathers. Amphibians have moist skin.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1085"
    },
    {
        "template": "Caterpillars eat leaves and birds eat caterpillars. Which terms describe caterpillars in the food chain?",
        "options": [
            "producer and prey",
            "consumer and decomposer",
            "consumer and prey",
            "consumer, decomposer and prey"
        ],
        "answer": 3,
        "correct_answer": "consumer, decomposer and prey",
        "explanation": "Caterpillars are consumers when they eat (consume) leaves. They are the prey when eaten by birds. The leaves are the producers in the food chain while fungi and bacteria are decomposers.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1086"
    },
    {
        "template": "C and D are organisms. C produces pollen grains while D does not. C makes its own food while D does not. What could C and D be? C D (1) fern flowering plant (2) fungi fern (3) flowering plant fern (4) flowering plant fungi",
        "options": [
            "(1) fern flowering plant",
            "(2) fungi fern",
            "(3) flowering plant fern",
            "(4) flowering plant fungi"
        ],
        "answer": 3,
        "correct_answer": "(4) flowering plant fungi",
        "explanation": "C is a flowering plant as only flowers produce pollen grains and plants can make their own food. D is a fungus as fungi do not bear flowers and cannot make their own food.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1087"
    },
    {
        "template": "Which of the following is not correct for both the butterfly and grasshopper?",
        "options": [
            "Both lay eggs.",
            "Both their adults have six legs.",
            "Both their young and adult live on land.",
            "Both have young that look like the adults."
        ],
        "answer": 3,
        "correct_answer": "Both have young that look like the adults.",
        "explanation": "The young of the grasshopper (nymph) looks like the adult, but the young of the butterfly (larva and pupa) do not look like the adult.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1088"
    },
    {
        "template": "Jamie studied three animals, X, Y and Z, and recorded her observations in the table below. observations Animal X Animal Y Animal Z lays eggs ✓ ✓ ✓ three body parts ✓ ✓ young resembles adult ✓ Which of the following could be animals X, Y and Z? X Y Z (1) cockroach butterfly frog (2) mosquito butterfly chicken (3) butterfly mosquito chicken (4) butterfly cockroach frog",
        "options": [
            "(1) cockroach butterfly frog",
            "(2) mosquito butterfly chicken",
            "(3) butterfly mosquito chicken",
            "(4) butterfly cockroach frog"
        ],
        "answer": 0,
        "correct_answer": "(1) cockroach butterfly frog",
        "explanation": "Animal X is an insect (it has three body parts) that lays eggs, but its young does not look like the adult, meaning it has a 4-stage life cycle like a butterfly. Animal Y is also an insect with three body parts, but its young does look like the adult, which is a characteristic of a 3-stage life cycle animal like a cockroach. Animal Z lays eggs but does not have three body parts, so it cannot be an insect; a frog fits this description perfectly.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1089"
    },
    {
        "template": "The diagram shows the transport of oxygen in the blood. What could X be? A: lung B: stomach C: leg muscle",
        "options": [
            "A only",
            "B only",
            "A and C only",
            "B and C only"
        ],
        "answer": 0,
        "correct_answer": "A only",
        "explanation": "As blood rich in oxygen is transported to the stomach and the leg muscle, the oxygen is used up and the blood leaving these parts of the body becomes poorer in oxygen. Blood is replenished with oxygen (becomes richer in oxygen) at the lungs.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1090"
    },
    {
        "template": "The diagram below shows the different reproduction processes that the adult rose plant goes through. Which of the following correctly states the reproduction processes that the adult rose plant goes through?",
        "options": [
            "fertilisation ⟶ pollination ⟶ seed dispersal ⟶ germination",
            "pollination ⟶ fertilisation ⟶ seed dispersal ⟶ germination",
            "fertilisation ⟶ pollination ⟶ germination⟶ seed dispersal",
            "pollination ⟶ fertilisation ⟶ germination⟶ seed dispersal"
        ],
        "answer": 0,
        "correct_answer": "fertilisation ⟶ pollination ⟶ seed dispersal ⟶ germination",
        "explanation": "Reproduction begins with pollination, where pollen grains are transferred from the anther to the stigma of a flower. Once the pollen reaches the ovary, fertilisation occurs, allowing the ovules to develop into seeds and the ovary into a fruit. The plant then goes through seed dispersal, where seeds are scattered away from the parent plant to reduce competition for light, water, mineral salt and space. Finally, when a seed finds the right conditions, germination happens, and a young plant begins to grow.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1091"
    },
    {
        "template": "A gardener puts some dead leaves around a plant as shown. How can the dead leaves benefit the tree? A: make food for the tree B: prevent animals from seeking shelter on the tree C: enrich the soil to provide the tree with mineral salts D: reduce the amount of water that evaporates from the soil",
        "options": [
            "C only",
            "A and B only",
            "C and D only",
            "B, C and D only"
        ],
        "answer": 0,
        "correct_answer": "C only",
        "explanation": "The dead leaves decompose and enrich the soil, providing mineral salts to the plant. The layer of dead leaves also covers the soil, preventing too much water from evaporating from the soil.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1092"
    },
    {
        "template": "Which statement about germination is not correct?",
        "options": [
            "A suitable temperature is needed for seeds to germinate.",
            "Oxygen is needed for seeds to germinate.",
            "A germinating seed obtains food from seed leaves.",
            "During germination, the mass of seed leaves increases."
        ],
        "answer": 2,
        "correct_answer": "A germinating seed obtains food from seed leaves.",
        "explanation": "During germination, the seed obtains food from the seed leaves as the true leaves have not yet grown and the seed cannot make its own food. The mass of the seed leaves thus decreases.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1093"
    },
    {
        "template": "Study flower J and fruit L. Which statement(s) is/are correct? A: K is developed from an ovary. B: Pollination and fertilisation took place at M. C: J has only one ovule in the ovary.",
        "options": [
            "B only",
            "C only",
            "B and C only",
            "A, B and C"
        ],
        "answer": 0,
        "correct_answer": "B only",
        "explanation": "K is the seed, which is developed from an ovule. Pollination and fertilisation must take place in a flower before it can become a fruit. As fruit L only has one seed, flower J has only one ovule in the ovary.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1094"
    },
    {
        "template": "{CHARACTER_0} studied the leaf characteristics of some plants growing at two heights on a mountain. His results are as shown. What conclusion can {CHARACTER_0} make from his study?",
        "options": [
            "At 600 m, the plants have larger leaves to trap more sunlight.",
            "At 3000 m, the plants have waxy leaves to reduce water loss.",
            "At 3000 m, the plants have thicker leaves to adapt to the cold.",
            "The height at which the plants grow does not affect the size and thickness of their"
        ],
        "answer": 2,
        "correct_answer": "At 3000 m, the plants have thicker leaves to adapt to the cold.",
        "explanation": "The snow on top of the mountain indicates that it is colder at a higher altitude. The leaves of the plants at 3000 m are thicker than those at 600 m, but not all leaves of the plants at 3000 m have larger surface areas than those at 600 m. There is no information on whether the leaves are waxy or not.",
        "placeholder_roles": [
            "protagonist"
        ],
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1095"
    },
    {
        "template": "A seed grew into a seedling as shown after a few days. Which graph shows how the lengths of the shoot and root of the seedline changed with time?",
        "options": [
            "(1)",
            "(2)",
            "(3)",
            "(4)"
        ],
        "answer": 1,
        "correct_answer": "(2)",
        "explanation": "Roots will grow first before the shoot grows.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1096"
    },
    {
        "template": "Ethan conducted an experiment using a plant that has leaves with green and white parts. The plant was kept in the dark to remove all the food from the leaves. Ethan covered parts of leaf K and leaf L with black paper strips on both the upper and lower surfaces. He wrapped a plastic bag containing a liquid that absorbs carbon dioxide around K. The plant was then exposed to sunlight. After a few hours, Ethan removed K and L from the plant and tested the two leaves for the presence of food. Which of the following shows the correct test results?",
        "options": [
            "(1)",
            "(2)",
            "(3)",
            "(4)"
        ],
        "answer": 0,
        "correct_answer": "(1)",
        "explanation": "Leaf K cannot make food without carbon dioxide. Leaf L can only make food at its green part which is not covered by the black paper strip, as the black paper strip blocks out sunlight and the white parts do not contain chlorophyll (green pigment). Light and chlorophyll are required for photosynthesis.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1097"
    },
    {
        "template": "The table shows the breathing rates of Ken and Jude during an exercise. Breathing rate / breaths per min Time / min Ken Jude 0 12 17 2 16 20 4 20 23 6 25 27 8 31 32 Which statement is correct?",
        "options": [
            "Ken's breathing rate was faster than Jude's breathing rate.",
            "Ken breathed in more oxygen per breath as compared to Jude.",
            "Ken's breathing rate increased more than Jude's breathing rate during the exercise.",
            "Jude's breathing rate increased by 14 breaths per minute after 8 minutes of exercise."
        ],
        "answer": 2,
        "correct_answer": "Ken's breathing rate increased more than Jude's breathing rate during the exercise.",
        "explanation": "At each 2 minutes interval, both Ken and Jude's breathing rate increased. However, Ken's breathing rate increases by 1 breath per min more than Jude.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1098"
    },
    {
        "template": "Janet measured the volume of an object using the set-up shown. What is the volume of the object?",
        "options": [
            "2cm3",
            "3cm3",
            "4cm3",
            "6cm3"
        ],
        "answer": 0,
        "correct_answer": "2cm3",
        "explanation": "The volume of the object is the increase in volume of the water level as indicated by the measuring cylinder, which is: 6cm3-4cm3=2cm3",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1099"
    },
    {
        "template": "Which of the following is not an effect of a force?",
        "options": [
            "a rolling ball coming to a stop",
            "a paper aeroplane turning in the air",
            "forming clay into a doll",
            "light passing through a glass pane"
        ],
        "answer": 3,
        "correct_answer": "light passing through a glass pane",
        "explanation": "A force is a push or a pull. Light passing through an object does not involve a push or a pull. A force can slow down or make an object move faster, change its direction of motion, or change its shape.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1100"
    },
    {
        "template": "Kumar observed that a flatbread rose as shown when fried. It became flat again when left on a plate for some time. Which of the following best explains why the flatbread rose when fried?",
        "options": [
            "The flatbread is flexible.",
            "Solid expands when heated.",
            "Air expands when heated.",
            "Air does not have a fixed volume."
        ],
        "answer": 1,
        "correct_answer": "Solid expands when heated.",
        "explanation": "As the flatbread is heated when fried, the air within the flatbread expands and causes the flatbread to rise.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1101"
    },
    {
        "template": "When a bulb was blown in the circuit, one other bulb did not light up. Which bulb was blown?",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "answer": 0,
        "correct_answer": "A",
        "explanation": "If bulb A was blown, all the bulbs would not light up as bulb A was arranged in series with all the other bulbs. Hence the circuit would be open and electric current cannot flow through the blown bulb. If bulbs C was blown, other bulbs would still light up. If bulb D was blown, only bulbs A and C can light up. If bulb B was blown, all the other bulbs would light up except bulb X. This is because when B is blown, the current will not have a path to pass through bulb X as B is arranged in series with bulb X, and hence the circuit becomes open at that part.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1102"
    },
    {
        "template": "Chandra pushed a toy car as shown. What is the distance moved by the toy car?",
        "options": [
            "7cm",
            "9cm",
            "10cm",
            "11cm"
        ],
        "answer": 0,
        "correct_answer": "7cm",
        "explanation": "The total distance moved is 10cm - 1cm = 9cm, or 12cm - 3cm = 9cm.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1103"
    },
    {
        "template": "{CHARACTER_0} placed two magnets, P and Q, close together as shown. What was the direction of the magnetic force acting on P and the direction of friction acting on Q when {CHARACTER_0} released Q?",
        "options": [
            "(1)",
            "(2)",
            "(3)",
            "(4)"
        ],
        "answer": 0,
        "correct_answer": "(1)",
        "explanation": "Like poles repel, hence the magnetic force acting on P moves it away from Q to the left. Q moves away from P to the right and the friction acting on Q is in the opposite direction towards the left.",
        "placeholder_roles": [
            "protagonist"
        ],
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1104"
    },
    {
        "template": "Which material is most suitable for making the face shield shown? Property Material flexible waterproof allows light to pass through (1) A ✗ ✗ ✓ (2) B ✓ ✗ ✓ (3) C ✓ ✓ ✗ (4) D ✓ ✓ ✓",
        "options": [
            "(1) A ✗ ✗ ✓",
            "(2) B ✓ ✗ ✓",
            "(3) C ✓ ✓ ✗",
            "(4) D ✓ ✓ ✓"
        ],
        "answer": 0,
        "correct_answer": "(1) A ✗ ✗ ✓",
        "explanation": "The face shield has to be flexible to bend into its shape, waterproof to prevent water droplets from reaching the face, and allows light to pass through so that the person can see through it clearly.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1105"
    },
    {
        "template": "Mariam sets up four circuits using identical batteries and bulbs in working condition. In which circuits will bulb L have the same brightness?",
        "options": [
            "A and B only",
            "B and D only",
            "C and D only",
            "A, B and D only"
        ],
        "answer": 0,
        "correct_answer": "A and B only",
        "explanation": "Bulb L in circuits A, B and D will have the same brightness as the amount of electric current passing through bulb L is the same. For circuits A and B, the number of batteries is the same, hence, the amount of current passing through one bulb in a series circuit or two bulbs in a parallel circuit will be the same. For circuit D, there are two batteries, and the amount of current is shared equally between the two bulbs arranged in series, thus resulting in the same brightness as bulb L in circuits A and B.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1106"
    },
    {
        "template": "Chin Keong wanted to find out which of three metal bars, AB, CD and EF, are magnets. He hung each bar from a string and brought them near to each other. His results are as shown. Which of the following is correct? AB CD EF (1) not a magnet magnet magnet (2) not a magnet not a magnet magnet (3) magnet not a magnet magnet (4) magnet magnet magnet",
        "options": [
            "(1) not a magnet magnet magnet",
            "(2) not a magnet not a magnet magnet",
            "(3) magnet not a magnet magnet",
            "(4) magnet magnet magnet"
        ],
        "answer": 0,
        "correct_answer": "(1) not a magnet magnet magnet",
        "explanation": "AB and EF must be magnets as they repel each other (only magnets can repel each other). CD is a magnetic material as it is attracted to magnet AB at both ends.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1107"
    },
    {
        "template": "The arrows, P, Q, R and S, in the diagram represent processes. Which arrow represents condensation?",
        "options": [
            "P",
            "Q",
            "R",
            "S"
        ],
        "answer": 0,
        "correct_answer": "P",
        "explanation": "Condensation (process P) is gas turning into liquid. Process Q is freezing (liquid → solid). Process R is melting (solid → liquid). Process S is evaporation (liquid → gas).",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1108"
    },
    {
        "template": "Alice walked barefooted on some floor tiles and then on a wooden floor. Why did she feel cold on the tiles but not on the wooden floor?",
        "options": [
            "The temperature of the wooden floor is higher.",
            "The tile is a better conductor of heat than wood.",
            "The tiles transferred less heat to her feet.",
            "The tiles transferred coldness to her feet."
        ],
        "answer": 1,
        "correct_answer": "The tile is a better conductor of heat than wood.",
        "explanation": "As the tile is a better conductor of heat than wood, more heat would be transferred away from the feet to the tile than to the wood. The temperature of both surfaces is the same as the environment.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1109"
    },
    {
        "template": "A liquid is heated in a beaker. The graph shows the temperature of the liquid over time. Which process does the line JK represent?",
        "options": [
            "boiling",
            "condensation",
            "evaporation",
            "melting"
        ],
        "answer": 0,
        "correct_answer": "boiling",
        "explanation": "When liquid is heated and changes state into a gas, boiling occurs and the temperature remains the same during the boiling process.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1110"
    },
    {
        "template": "Three springs, X, Y and Z, have the same length. When the springs are hung using three identical blocks, the results are as shown. Which graph shows the relationship between the elastic spring force and the extension of the springs X, Y and Z?",
        "options": [
            "(1)",
            "(2)",
            "(3)",
            "(4)"
        ],
        "answer": 1,
        "correct_answer": "(2)",
        "explanation": "The weight carried by spring X is more than Y, and Y is more than Z. All springs are extended the same length. Hence, spring X would extend the least with the same amount of force, and spring Z would extend the most.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1111"
    },
    {
        "template": "Hassan set up the following experiment in a dark room. A light sensor was attached on the screen and gave a reading of 30 units. What should Hassan do to get the largest possible shadow, and what will be the effect on the light sensor reading? action light sensor reading (1) move the screen away from the wooden block increase (2) move the screen nearer to the wooden block decrease (3) move the torch nearer to the wooden block increase (4) move the torch away from the wooden block decrease",
        "options": [
            "(1) move the screen away from the wooden block increase",
            "(2) move the screen nearer to the wooden block decrease",
            "(3) move the torch nearer to the wooden block increase",
            "(4) move the torch away from the wooden block decrease"
        ],
        "answer": 2,
        "correct_answer": "(3) move the torch nearer to the wooden block increase",
        "explanation": "The nearer the torch is to the wooden block, the larger the shadow cast on the screen. Since the torch (light source) is nearer to the light sensor, the light sensor's reading would increase.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1112"
    }
]

with open('data/questions-science-p6.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

existing_ids = {q['id'] for q in data}
to_add = [q for q in new_questions if q['id'] not in existing_ids]
data.extend(to_add)

with open('data/questions-science-p6.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f'Added {len(to_add)} new questions for W6D4 (skipped duplicates)')
