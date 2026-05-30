#!/usr/bin/env python3
"""
Add W4D5 questions to questions-science-p6.json
IDs: SCI904-SCI930
"""
import json

new_questions = [
    {
        "id": "SCI904",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "correctly? A: Both habitats can have some common animal populations living in them. B: The plants in both habitats provide food and shelter for some of the animals living there. C: Flowering plants can only be found in the garden habitat while non-flowering plants can only be found in the field habitat.",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "A and B only",
        "A and C only",
        "B and C only",
        "A, B and C"
        ],
        "answer": 0,
        "correct_answer": "A and B only",
        "explanation": "Both field and garden habitats provide essential resources like food and shelter for the organisms living within them. Some animal populations, such as butterflies or grasshoppers, can be common to both environments."
    },
    {
        "id": "SCI905",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "a population in the garden community. Which of the following observations allowed her to make the conclusion? A: Bird X eating earthworms B: Bird X feeding two of its young C: Bird X preyed on by its predator D: Bird X building its nest with its mate",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "5/29/26, 2:43 PM P6 打卡营 科学 MCQ W4D5-1",
        "A and B only",
        "A and C only",
        "B and D only"
        ],
        "answer": 0,
        "correct_answer": "5/29/26, 2:43 PM P6 打卡营 科学 MCQ W4D5-1",
        "explanation": "A population is a group of organisms of the same species living together in a specific area. Observing Bird X feeding its young (B) and building a nest with a mate (D) confirms it is breeding and living as a group in that garden."
    },
    {
        "id": "SCI906",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following statements about the food web is false?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "Energy in organism E is transferred to organism D.",
        "Energy in organism B cannot be transferred to organism C.",
        "Energy in organism A is indirectly transferred to organism D.",
        "Organisms A, B, C, D and E belong to the same community."
        ],
        "answer": 0,
        "correct_answer": "Energy in organism E is transferred to organism D.",
        "explanation": "In a food web, arrows show the direction of energy flow from the organism eaten to the one that eats it. Statement 1 is false because organism D eats E, meaning energy flows from D to E, not vice versa."
    },
    {
        "id": "SCI907",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following changes in population size could be observed after an increase in organism E’s population size?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "Increase in organism A's population size",
        "5/29/26, 2:43 PM P6 打卡营 科学 MCQ W4D5-1",
        "Increase in organism B's population size",
        "Increase in organism D's population size"
        ],
        "answer": 0,
        "correct_answer": "Increase in organism A's population size",
        "explanation": "Increasing the population of E (a predator of D) leads to a decrease in D. Since D eats B and C, fewer D organisms means population of both B and C will increase. This leads to decrease in population of A as there are more consumers B and C."
    },
    {
        "id": "SCI908",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Structural Behavioural (1) sharp claws small and light body (2) long tail fins webbed feet (3) body patterns producing distinct sounds (4) hunting in groups using venom to kill prey",
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
        "explanation": "Structural adaptations are physical features, while behavioural adaptations are actions. Body patterns are a physical trait (structural), and producing distinct sounds is a specific action (behavioural)."
    },
    {
        "id": "SCI909",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Adaptation Purpose (1) needle-like leaves of a cactus to store water for the plant (2) male reproductive parts that hang out of a flower to trap pollen in the air easily to allow the plant to float on (3) spongy leaf stalks filled with air water (4) fruits of a plant that are brightly-coloured to attract pollinators",
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
        "explanation": "Spongy leaf stalks filled with air provide buoyancy. This structural adaptation specifically allows aquatic plants to float on the water's surface to receive more sunlight."
    },
    {
        "id": "SCI910",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "predators from spotting them? A: Changing body colour to green when on a green leaf B: Changing fur colour from brown to white during snowy winter C: A non-poisonous animal having the appearance of a poisonous animal D: Having body shapes and colour that look like branches on the plant that they live on",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "A only",
        "B and C only",
        "A, B and D only",
        "A, C and D only"
        ],
        "answer": 1,
        "correct_answer": "B and C only",
        "explanation": "Camouflage prevents predators from spotting prey by helping them blend into their surroundings. Changing body/fur color to match the environment (A, B) and having body shapes that look like branches (D) are all forms of camouflage."
    },
    {
        "id": "SCI911",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "A: Use more paper bags instead of plastic bags B: Using public transport instead of private vehicles C: Clear forests by burning trees to make the soil fertile D: Recycle used materials and make them into new products",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "A and C only",
        "B and C only",
        "B and D only",
        "5/29/26, 2:43 PM P6 打卡营 科学 MCQ W4D5-1"
        ],
        "answer": 0,
        "correct_answer": "A and C only",
        "explanation": "Conserving natural resources involves reducing usage or recycling. Using public transport reduces fuel consumption (B), and recycling materials prevents the need for new raw resources (D)."
    },
    {
        "id": "SCI912",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The graph below shows the number of fish over time at part Y of the river. Which of the following could have happened at part X of the river bank to cause the change in the number of fish? A: Picking up litter B: Planting more trees C: Discharge of factory waste into the river D: Spraying of pesticides regularly on plants growing by the river",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "A and B only",
        "A and D only",
        "5/29/26, 2:43 PM P6 打卡营 科学 MCQ W4D5-1",
        "B and C only"
        ],
        "answer": 0,
        "correct_answer": "A and B only",
        "explanation": "The graph shows a decrease in the fish population over time at part Y. Discharge of factory waste (C) and regular spraying of pesticides (D) introduce toxins into the water upstream at X, killing the fish downstream at Y."
    },
    {
        "id": "SCI913",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "germinate into a new plant. Which statement(s) is/are correct? A: Pollination had taken place. B: Part X developed from an ovule. C: The flower has many ovules in the ovary.",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "B only",
        "A and B only",
        "A and C only",
        "B and C only"
        ],
        "answer": 1,
        "correct_answer": "A and B only",
        "explanation": "A fruit only develops after pollination and fertilization have occurred. Part X is a seed, which specifically develops from a fertilized ovule."
    },
    {
        "id": "SCI914",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "around an iron nail would affect the strength of the magnetised nail. The strength of the magnetised nail is measured by the number of paper clips that it could attract. Kaesheem recorded the results in the table. Number of coils of wire around iron nail Number of paper clips attracted 10 7 20 10 30 13 40 15 50 16 60 16 70 16 Based only on the results, of the following conclusion(s) can be made? A: The magnetised nail will be able to attract more than 16 paper clips if four batteries are used. B: The maximum number of paper clips that can be attracted by the magnetised nail is 16. C: After 50 coils of wire, the number of coils of wire around the nail will not increase the strength of the magnetised nail.",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "B only",
        "A and B only",
        "A and C only",
        "B and C only"
        ],
        "answer": 1,
        "correct_answer": "A and B only",
        "explanation": "The maximum number of paper clips attracted is 16, when there were 50 coils around the iron nail. Increasing the number of coils further does not increase the number of paper clips attracted."
    },
    {
        "id": "SCI915",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "of water in stems. She used three similar pieces of stem and three identical beakers with the same volume of water. She recorded the volume of water left in the beakers after 3 hours. Which one of the following variables should be kept constant in her experiment?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "length of stem",
        "temperature of water",
        "volume of water transported up each piece of stem",
        "time taken for the water to reach the top of the stem"
        ],
        "answer": 0,
        "correct_answer": "length of stem",
        "explanation": "In a fair test, only the independent variable (temperature) should change. The length of the stem must be kept constant to ensure that the distance water travels is consistent across all setups."
    },
    {
        "id": "SCI916",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "twisted. The wings move up and down loudly when the handle is released. {CHARACTER_0} turned the handle 40 times and threw the toy in the air at point P. The toy flew from P to Q, then flew at the same height from Q to R before stopping at S as shown below. Which one of the following correctly shows the main energy changes in the toy when it is released at point P and it flew to point Q? Before release at P From P to Q (1) kinetic energy → kinetic energy + sound energy (2) kinetic energy → kinetic energy + potential energy + sound energy (3) potential energy → kinetic energy + sound energy (4) potential energy → kinetic energy + potential energy + sound energy",
        "diagram": None,
        "placeholder_roles": ['protagonist'],
        "options": [
        "(1)",
        "(2)",
        "(3)",
        "(4)"
        ],
        "answer": 0,
        "correct_answer": "(1)",
        "explanation": "Before release, the twisted rubber band stores potential energy. Upon release, this is converted into kinetic energy (movement), potential energy (height), and sound energy (the loud flapping)."
    },
    {
        "id": "SCI917",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "twisted. The wings move up and down loudly when the handle is released. {CHARACTER_0} turned the handle 40 times and threw the toy in the air at point P. The toy flew from P to Q, then flew at the same height from Q to R before stopping at S as shown below. Which of the following explains why the toy flew lower from R to S? A: Gravitational force acts on the toy only from R to S. B: There is less kinetic energy in the toy than before. C: There is less potential energy in the rubber band than before.",
        "diagram": None,
        "placeholder_roles": ['protagonist'],
        "options": [
        "A only",
        "A and B only",
        "B and C only",
        "A, B and C"
        ],
        "answer": 0,
        "correct_answer": "A only",
        "explanation": "As the toy flies, its stored energy is gradually converted into other forms. The toy flies lower because the rubber band has less potential energy left (C), resulting in less kinetic energy to maintain flight (B)."
    },
    {
        "id": "SCI918",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "A: Skeletal system B: Respiratory system C: Circulatory system D: Muscular system",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "A and C only",
        "B and D only",
        "B, C and D only",
        "A, B, C and D"
        ],
        "answer": 0,
        "correct_answer": "A and C only",
        "explanation": "Walking and running are complex physical activities. They require the skeletal and muscular systems for movement, and the respiratory and circulatory systems to provide oxygen and energy to the muscles."
    },
    {
        "id": "SCI919",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following correctly represents X, Y and Z? X Y Z (1) frictional force elastic spring force gravitational force (2) magnetic force frictional force elastic spring force (3) elastic spring force magnetic force frictional force (4) frictional force magnetic force gravitational force",
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
        "explanation": "Frictional force (X) requires contact and does not act from a distance. Magnetic force (Y) acts from a distance and involves both pushing and pulling, while gravitational force (Z) only involves a pulling force."
    },
    {
        "id": "SCI920",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "She hung different number of weights on the spring and measured the length of the spring. Then, she plotted a graph below to show the results. Using her results, she calculated the extension of the spring. Extension = New length of spring - original length of spring. If the extension of the spring is 4 cm, how many weights did she use?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "1",
        "2",
        "5/29/26, 2:52 PM P6 打卡营 科学 MCQ W4D5-2",
        "3"
        ],
        "answer": 1,
        "correct_answer": "2",
        "explanation": "The original length of the spring (0 weights) is 2 cm. If the extension is 4 cm, the new length is 6 cm; according to the graph, a 6 cm length corresponds to 2 weights."
    },
    {
        "id": "SCI921",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "He placed different objects, J, K, L and M at positions A and B to connect the circuit and recorded if the bulb lights up in the table below. Position where the bulb was placed Did the bulb light up? A B J K no J L yes L M yes Which of the following are likely the materials that objects J, K, L and M are made of? J K L M (1) steel rubber iron aluminium (2) wood iron rubber steel (3) iron aluminium steel rubber (4) rubber wood aluminium steel",
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
        "explanation": "When K is placed in the circuit, the bulb does not light up. This suggests that K is an insulator (either rubber or wood). J, L and M are conductors."
    },
    {
        "id": "SCI922",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "diagram below. All the bulbs and batteries are in good working condition. He arranged the bulbs from dimmest to brightest. Which of the following has been arranged correctly, starting from the dimmest bulb to the brightest bulb?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "H, G, E, F",
        "F, E, G, H",
        "E, G, F, H",
        "G, H, F, E"
        ],
        "answer": 0,
        "correct_answer": "H, G, E, F",
        "explanation": "Bulb brightness is determined by the amount of electric current. Arrangement 2 is correct because F and E are in series (dimmer), while G and H have more batteries or parallel paths (brighter)."
    },
    {
        "id": "SCI923",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "A: Use the fan instead of air-conditioner. B: Switch off the lights when leaving the room. C: Shower without the water heater on a hot day. D: Use the half flush instead of full flush for liquid waste.",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "5/29/26, 2:52 PM P6 打卡营 科学 MCQ W4D5-2",
        "A and B only",
        "C and D only",
        "A, B and C only"
        ],
        "answer": 1,
        "correct_answer": "A and B only",
        "explanation": "Using a fan instead of air-con (A), switching off lights (B), and showering without a heater (C) all directly reduce the use of electrical appliances. Using a half flush conserves water, not electricity."
    },
    {
        "id": "SCI924",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "object, a screen and a light sensor, as shown in the diagram below. He attached the light sensor on top of the object to measure the amount of light received. Then, he repeatedly moved the position of only one item in the set-up before recording the light sensor readings in the table below. Height of shadow (cm) Light sensor reading (units) first reading 100 40 second reading 125 40 third reading 140 40 fourth reading 165 40 What change did Manfred make?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "He moved the torch nearer to the object.",
        "He moved the screen nearer to the object.",
        "He moved the object further away from the screen.",
        "5/29/26, 2:52 PM P6 打卡营 科学 MCQ W4D5-2"
        ],
        "answer": 1,
        "correct_answer": "He moved the screen nearer to the object.",
        "explanation": "The light sensor reading remained constant at 40 units, meaning the distance between the torch and the object did not change. The increasing height of the shadow indicates the screen was moved further away from the object."
    },
    {
        "id": "SCI925",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "diagram below. Which containers of water have the least and most amount of heat? Least amount of heat Most amount of heat (1) Z Y (2) X Z (3) Z W (4) Y X",
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
        "explanation": "Heat depends on both temperature and volume. Container Z has the least heat because it has a low temperature (40°C) and low volume (20ml); Container W has the most because it has a high temperature (95°C) and high volume (40ml)."
    },
    {
        "id": "SCI926",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "materials, P, Q, R and S. She placed the same amount of wax on top of each rod and lowered each rod into a container. Then, she poured water into the container as shown in the diagram below. Chloe recorded the time taken for all the wax on rods P, Q, R and S, to melt in the table below. Materials Time taken for the wax to melt (minutes) P 5 Q 3 R 6 S 7 Which material, P, Q, R or S, should Chloe use to make a box to store ice cubes so that the ice cubes will melt the slowest?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "P",
        "Q",
        "R",
        "S"
        ],
        "answer": 0,
        "correct_answer": "P",
        "explanation": "Material S took the longest (7 minutes) for the wax to melt, making it the poorest conductor of heat. A box made of S will gain heat from the surroundings the slowest, keeping ice cubes frozen for longer."
    },
    {
        "id": "SCI927",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "until it touched the bottom of the container. The small wooden ball floated as shown in the diagram below. Which one of the following statements correctly explains the difference in the water level inside and outside the glass?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "The air trapped in the glass occupied space.",
        "The small wooden ball in the glass occupied space.",
        "The air trapped in the glass does not have a fixed shape.",
        "The small wooden ball pushed the water out from the glass."
        ],
        "answer": 0,
        "correct_answer": "The air trapped in the glass occupied space.",
        "explanation": "Air is a form of matter that occupies space. The air trapped inside the glass prevents the water from entering completely, which is why the water level is lower inside the glass than outside."
    },
    {
        "id": "SCI928",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "respectively. A rubber lid was placed at the opening of the three containers. A 1 kg weight was then placed on the rubber lid of each container. Only the rubber lid on the container filled with substance Q moved downwards, as shown in the diagram below. Which of the following statements correctly explained this observation?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "Substances P, Q and R are liquids.",
        "Substance Q has no definite volume.",
        "Substance R is a gas and can be compressed.",
        "Substance P is a solid and Q and R are both gases."
        ],
        "answer": 0,
        "correct_answer": "Substances P, Q and R are liquids.",
        "explanation": "Solids and liquids have a definite volume and cannot be compressed. Because only the lid on container Q moved down, substance Q must be a gas, as gases have no definite volume and can be compressed."
    },
    {
        "id": "SCI929",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "He hung each bar from a string and brought them near to each other before releasing them. His results are shown below. Which of the following is correct? AB CD EF (1) magnetic object magnetic object magnet (2) magnet magnetic object magnet (3) magnet magnet magnetic object (4) magnet magnet magnet",
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
        "explanation": "Only magnets can repel other magnets. Since AB repels CD, both are magnets; however, EF is only attracted to magnets, which identifies it as a magnetic object rather than a magnet itself."
    },
    {
        "id": "SCI930",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "batteries are used. A pointer attached to the spring moves when the spring stretches or compresses. Which one of the following is correct when only one battery is used? movement of pointer strength of electromagnet (1) upwards increased (2) upwards decreased (3) downwards increased (4) downwards decreased",
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
        "explanation": "Using fewer batteries reduces the amount of electric current, making the electromagnet weaker. Since the magnetic repulsion is weaker, the spring will compress less, causing the pointer to move downwards."
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

print(f"✓ Added {len(new_questions)} questions for W4D5")
