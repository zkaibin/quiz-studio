#!/usr/bin/env python3
"""Add W7D4 questions to questions-science-p6.json"""
import json

new_questions = [
    {
        "template": "Which of the following is a function of the human skeletal system?",
        "options": [
            "protects organs in the body",
            "protects the muscular system",
            "transports blood around the body",
            "transports food in the digestive system"
        ],
        "answer": 1,
        "correct_answer": "protects the muscular system",
        "explanation": "The skull and ribcage are parts of the skeletal system. The skull protects the brain while the ribcage protects the heart and lungs.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1183"
    },
    {
        "template": "Study the chart below. Which of the following shows the characteristics represented by A and B? Characteristics A B (1) has fur has a beak (2) has six legs has feathers (3) has wings has fur (4) has hard body covering gives birth to young",
        "options": [
            "(1) has fur has a beak",
            "(2) has six legs has feathers",
            "(3) has wings has fur",
            "(4) has hard body covering gives birth to young"
        ],
        "answer": 3,
        "correct_answer": "(4) has hard body covering gives birth to young",
        "explanation": "An insect has six legs and a hard body covering. A bird has a beak and feathers. Thus, the correct answer is (2).",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1184"
    },
    {
        "template": "Which one of the following organisms is not a fungus?",
        "options": [
            "fern",
            "yeast",
            "mould",
            "mushroom"
        ],
        "answer": 0,
        "correct_answer": "fern",
        "explanation": "A fern is a plant, not a fungus. Yeast, mould and mushroom are fungi.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1185"
    },
    {
        "template": "Which of the following correctly describes the transfer of energy in a community of organisms?",
        "options": [
            "Energy is transferred from predators to prey in a food web.",
            "Energy is transferred from one plant-eater to another in a population.",
            "Energy is transferred from producers to consumers in the same habitat.",
            "Energy is transferred from decomposers to producers in the same community."
        ],
        "answer": 1,
        "correct_answer": "Energy is transferred from one plant-eater to another in a population.",
        "explanation": "Energy is transferred from prey to predator and not predator to prey. Plant-eaters do not feed on one another, so energy cannot be transferred from one plant-eater to another. When plant-eaters (consumers) feed on plants (producers), energy is transferred from producers to consumers. When decomposers feed on dead organisms, energy is transferred from dead organisms to decomposers.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1186"
    },
    {
        "template": "Halim found an animal in a stream deep in a forest. Which of the following characteristics should he use to identify it as amphibian, fish or reptile?",
        "options": [
            "presence of gills",
            "type of body covering",
            "method of reproduction",
            "whether it can live both on land and in water"
        ],
        "answer": 3,
        "correct_answer": "whether it can live both on land and in water",
        "explanation": "Both the fish and the young of the amphibian have gills. The amphibian has moist skin while the fish has scales and the reptile has dry scales. Amphibians, fishes and reptiles reproduce by laying eggs. Both the amphibian and the reptile can live both on land and in water.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1187"
    },
    {
        "template": "The food relationship between three organisms is shown. R → S → T The following took place when a large number of organism T died. A The number of R decreased. B The number of S increased. C The number of S decreased. D There was insufficient food for S. Which of the following shows the correct sequence of events?",
        "options": [
            "A, B, D, C",
            "A, D, C, B",
            "B, A, D, C",
            "B, D, C, A"
        ],
        "answer": 1,
        "correct_answer": "A, D, C, B",
        "explanation": "(B) T is the predator of S. When the number of predator of S decreased, the number of S increased. (A) S is the predator of R. When the number of S increased, the number of R decreased. (D) As a result, there was a shortage of food for S. (C) When less food was available for S, the number of S decreased eventually.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1188"
    },
    {
        "template": "A bowl of ice was placed in a room at 27°C {CHARACTER_0} observed the bowl after 5 hours. Which one of the following is correct? Observation Explanation (1) the ice cubes melted the ice cube lose heat to the water (2) the ice cubes did not melt the ice cube lose heat to the room (3) the ice cubes melted the ice cube gained heat from the room (4) the ice cubes did not melt the ice cube gained heat from the water",
        "options": [
            "(1) the ice cubes melted the ice cube lose heat to the water",
            "(2) the ice cubes did not melt the ice cube lose heat to the room",
            "(3) the ice cubes melted the ice cube gained heat from the room",
            "(4) the ice cubes did not melt the ice cube gained heat from the water"
        ],
        "answer": 1,
        "correct_answer": "(2) the ice cubes did not melt the ice cube lose heat to the room",
        "explanation": "Since the room is at a higher temperature than the ice cube, the ice cube will gain heat from the room and melt.",
        "placeholder_roles": [
            "protagonist"
        ],
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1189"
    },
    {
        "template": "The diagram shows plant P growing on a tree trunk. Its roots grip the surface of the trunk but do not reach the ground. When tiny, dust-like substance from plant P land on other tree trunks, they grow into new plants. Which statement about plant P is correct?",
        "options": [
            "Wind is used for the dispersal of its spores.",
            "P grows on a tree trunk so that it can avoid insects.",
            "Its roots can absorb water droplets formed from condensation.",
            "Fertilisation takes place after the dust-like substance are dispersed."
        ],
        "answer": 2,
        "correct_answer": "Its roots can absorb water droplets formed from condensation.",
        "explanation": "Plant P is a flowering plant so it reproduces through seeds, not through spores. Growing on the tree trunk does not help plant P to avoid insects. The roots of plant P are above the ground so they cannot absorb water from the soil. The other way for it to obtain water is by absorbing water droplets formed from condensation. The dust-like substances are the seeds of plant P. Dispersal of seeds occurs after fertilisation.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1190"
    },
    {
        "template": "Which of the following are correct? A carrying out reforestation helps to reduce soil erosion and floods B preventing disposal of waste into water helps to reduce pollution and haze C using less fuel helps to reduce haze and global warming",
        "options": [
            "A and B only",
            "A and C only",
            "B and C only",
            "A, B and C"
        ],
        "answer": 0,
        "correct_answer": "A and B only",
        "explanation": "Reforestation is the planting of trees in order to regrow a deforested area. With roots of trees to hold on to the topsoil, less soil will be washed off by rain. Disposal of waste into water will lead to water pollution. Preventing it does not reduce haze. Using less fuel will release less exhaust fumes. This helps to reduce haze and to release lesser carbon dioxide into the atmosphere. Carbon dioxide is a greenhouse gas that absorbs the Sun’s heat. Releasing less greenhouse gas helps to reduce global warming.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1191"
    },
    {
        "template": "{CHARACTER_0} grew some seeds of a plant on four trays inside a room. The experimental conditions and results are shown below. Based only on the results shown above, what is the correct conclusion for the germination of the seeds?",
        "options": [
            "light is required",
            "water is required",
            "light, water and air are required",
            "air, water and warmth are required"
        ],
        "answer": 2,
        "correct_answer": "light, water and air are required",
        "explanation": "Seeds require water, air and warmth for germination. Light is not required for germination as the seeds in tube B and tray D germinated. From the experiment, we cannot conclude that air or warmth is needed for germination.",
        "placeholder_roles": [
            "protagonist"
        ],
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1192"
    },
    {
        "template": "A student made three statements about sexual reproduction in plants and humans: A Fertilisation occurs in a female reproductive part. B Reproductive cells are produced in the anthers. C The fertilised egg is found in the ovary. Which of the following is correct? plants humans (1) B A, C (2) A, C C (3) A, B, C A (4) A, B, C A, C",
        "options": [
            "(1) B A, C",
            "(2) A, C C",
            "(3) A, B, C A",
            "(4) A, B, C A, C"
        ],
        "answer": 0,
        "correct_answer": "(1) B A, C",
        "explanation": "In plants, fertilisation occurs in the ovary. In humans, fertilisation occurs in the fallopian tubes. The ovary and fallopian tubes are connected reproductive parts. The anther produce pollen grains, which contain male reproductive cells of plants. In plants, the fertilised egg is in the ovary while in humans, the fertilised egg is found outside the ovary.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1193"
    },
    {
        "template": "A farmer has two different plots of land, X and Y, growing similar tomato plants as shown below. He predicts that more tomatoes will be produced by adding 5 g of fertiliser to the soil around each plant. However, his wife predicts that adding 10 g of the same fertiliser will give better results. Which of the following arrangements should the farmer use to provide a correct test for both their predictions?",
        "options": [
            "(1)",
            "(2)",
            "(3)",
            "(4)"
        ],
        "answer": 1,
        "correct_answer": "(2)",
        "explanation": "In a fair experiment, only one variable can be changed. Since X and Y are different plots of land, the same arrangement is used for both plots.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1194"
    },
    {
        "template": "A scientist studied the effect of light on plant S. His observations are shown below. Which of the following will he most likely observe when plant S is grown under different amounts of light?",
        "options": [
            "(1)",
            "(2)",
            "(3)",
            "(4)"
        ],
        "answer": 0,
        "correct_answer": "(1)",
        "explanation": "The bar graph shows that a plant in lower amount of light will have fewer leaves than a plant in higher amount of light. The line graph shows that a plant in lower amount of light will be taller than a plant in higher amount of light.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1195"
    },
    {
        "template": "Minah built a small pond in a garden on Day 1. Minah observed three types of animals, mosquito, butterfly and frog living in the garden. The number of days needed for their eggs to hatch is shown below. Characteristic mosquito butterfly frog number of days needed for eggs to hatch 1 3 21 On Day 15, what would Minah most likely find in the pond?",
        "options": [
            "mosquito larvae and butterfly larvae",
            "mosquito larvae and tadpoles",
            "frog eggs and mosquito larvae",
            "frog eggs and butterfly larvae"
        ],
        "answer": 0,
        "correct_answer": "mosquito larvae and butterfly larvae",
        "explanation": "Butterfly larvae live on land, not in water. On day 15, the mosquito eggs would have hatched and become larvae and the frog eggs have not hatched.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1196"
    },
    {
        "template": "The diagram shows a cylinder and a plunger. {CHARACTER_0} filled the cylinder with some water as shown. Why is {CHARACTER_0} able to push the plunger downwards without air or water escaping?",
        "options": [
            "air has weight",
            "air occupies space",
            "air has no definite shape",
            "air has no definite volume"
        ],
        "answer": 3,
        "correct_answer": "air has no definite volume",
        "explanation": "Air consists of gases, which do not have definite volume and so can be compressed. Water is a liquid, which has a definite volume, so it cannot be compressed. As Ahmad pushes the plunger down, the air is compressed while the water is not compressed.",
        "placeholder_roles": [
            "protagonist"
        ],
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1197"
    },
    {
        "template": "The diagram shows the change of state of water. What are processes X and Y? X Y (1) freezing evaporation (2) condensation freezing (3) freezing condensation (4) condensation melting",
        "options": [
            "(1) freezing evaporation",
            "(2) condensation freezing",
            "(3) freezing condensation",
            "(4) condensation melting"
        ],
        "answer": 3,
        "correct_answer": "(4) condensation melting",
        "explanation": "The change of state from gas to liquid is condensation. The change of state from solid to liquid is melting.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1198"
    },
    {
        "template": "An insect is covered in a shell that supports its body and protects its organs. This shell is made of material C. Which property of material C allows the shell to perform the functions described?",
        "options": [
            "strength",
            "flexibility",
            "waterproof",
            "ability to float"
        ],
        "answer": 0,
        "correct_answer": "strength",
        "explanation": "Strength is the ability to withstand forces without breaking. Material C of the shell needs to withstand forces without breaking.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1199"
    },
    {
        "template": "Aisha conducted an experiment by heating substance P. At the start, P was a solid at 30°C. After 15 minutes of heating, P reached a temperature of 100°C as shown. Based on Aisha’s experiment, which one of the following is possible? melting point of P (°C) boiling point of P (°C) (1) 20 105 (2) 25 100 (3) 30 95 (4) 50 110",
        "options": [
            "(1) 20 105",
            "(2) 25 100",
            "(3) 30 95",
            "(4) 50 110"
        ],
        "answer": 0,
        "correct_answer": "(1) 20 105",
        "explanation": "P is a solid at 30°C. When heated, it melts, hence the melting point of P is higher than 30°C. P is a liquid at 100°C, thus its boiling point is higher than 100°C.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1200"
    },
    {
        "template": "A ball tied to a string was released. It swung and hit the plastic bottle. The bottle fell down. Which of the following shows the correct conversion of energy?",
        "options": [
            "kinetic energy of ball → potential energy of ball → kinetic energy of bottle",
            "potential energy of ball → kinetic energy of ball → kinetic energy of bottle",
            "kinetic energy of ball → kinetic energy of bottle → potential energy of bottle",
            "potential energy of ball → potential energy of bottle → kinetic energy of bottle"
        ],
        "answer": 0,
        "correct_answer": "kinetic energy of ball → potential energy of ball → kinetic energy of bottle",
        "explanation": "At the highest position, the ball possessed potential energy. As the ball moved, the potential energy was converted into kinetic energy. The kinetic energy of the ball upon the transferred to the bottle upon collision.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1201"
    },
    {
        "template": "Which of the following is a possible effect on the water cycle when the temperature of the environment increases?",
        "options": [
            "Condensation of water vapour decreases resulting in more rain.",
            "Condensation of water vapour increases resulting in less clouds.",
            "Evaporation of water increases resulting in more rain.",
            "Evaporation of water decreases resulting in less water vapour in the air."
        ],
        "answer": 2,
        "correct_answer": "Evaporation of water increases resulting in more rain.",
        "explanation": "When the temperature of the environment increases, water bodies gain more heat thus increasing the rate of evaporation. When there is more water vapour in the air, more water droplets can be condensed. This results in more clouds and rain.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1202"
    },
    {
        "template": "Two magnets A and B were placed close together with their north poles as shown. When B was released, it moved along the surface of the floor. Which of the following shows the direction of the magnetic force acting on A and the direction of frictional force acting on B?",
        "options": [
            "(1)",
            "(2)",
            "(3)",
            "(4)"
        ],
        "answer": 0,
        "correct_answer": "(1)",
        "explanation": "When magnet B was released, it exerted a repulsion force onto magnet A. The direction of the magnetic force on magnet A was towards the left while the direction towards the right. Friction acts in a direction opposite to the direction of motion, hence the direction of frictional force on B was towards the left.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1203"
    },
    {
        "template": "An engineer set up a system using light bulb P and alarm Q to alert him when the temperature of an oven is too high. He used a metal rod that expands easily when temperature increases. The table shows his results at different temperatures. Temperature of the oven (°C) Light bulb P Alarm Q 26 off off 100 on off 300 on on Which of the following is his set-up?",
        "options": [
            "(1)",
            "(2)",
            "(3)",
            "(4)"
        ],
        "answer": 1,
        "correct_answer": "(2)",
        "explanation": "As the oven heats up, the metal rod expands and increases in length. When the temperature is 100°C, the first electrical contact is closed. The first loop must contain the dry cell and light bulb P. When the temperature is 300°C, the second electrical contact is closed. The second loop must contain alarm Q.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1204"
    },
    {
        "template": "Bulbs A, B, C and D were connected in a circuit hidden in a wooden box shown below. All the light bulbs lit when the circuit was closed. Melissa removed one light bulb from the circuit each time and observed what happened to the rest of the light bulbs. Her observations are recorded in the table below. Bulb removed Bulb(s) lit A B, C and D B none C A and B D A and B Which of the following correctly shows the circuit hidden in the wooden box?",
        "options": [
            "(1)",
            "(2)",
            "(3)",
            "(4)"
        ],
        "answer": 0,
        "correct_answer": "(1)",
        "explanation": "In circuit (1), when bulb A is removed, only bulbs C and D are lit. Bulb B is not lit. In circuit (2), when bulb C is removed, bulbs A, B and D remain lit. In circuit (4), when bulb B is removed, bulbs A, C and D remain lit.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1205"
    },
    {
        "template": "Sulaiman placed two empty identical containers, K and M, both initially at room temperature, on a table. He poured 500cm3 of boiling water into container K and 250cm3 of boiling water into container M. The temperatures of water in K and M were recorded every minute for some time. Which one of the following is the correct graph for his results?",
        "options": [
            "(1)",
            "(2)",
            "(3)",
            "(4)"
        ],
        "answer": 0,
        "correct_answer": "(1)",
        "explanation": "Both containers start from 100°C and cool to room temperature. The temperature of water in container K decreases slower than the temperature of water in container M as it contains more water.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1206"
    },
    {
        "template": "A compass has a small magnet that can rotate freely as shown. Four bar magnets were arranged such that they were attracted to one another. A compass was then placed near end P and the direction of the compass needle is as shown below. What would be the direction of the needle when the compass was placed at Q?",
        "options": [
            "(1)",
            "(2)",
            "(3)",
            "(4)"
        ],
        "answer": 0,
        "correct_answer": "(1)",
        "explanation": "Unlike poles attract. The North pole of the compass needle faces P, so end P of the magnet is the South pole.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1207"
    },
    {
        "template": "A spring is compressed and released at A. It moves to B as shown. The graph shows the amount of different types of energy of the spring at A. Which of the following graphs shows the amounts of different types of energy for the spring at B before it hits the ground?",
        "options": [
            "(1)",
            "(2)",
            "(3)",
            "(4)"
        ],
        "answer": 1,
        "correct_answer": "(2)",
        "explanation": "At B, the spring is uncompressed and should have zero elastic potential energy and the spring is near to the ground. Hence, the gravitational potential energy of the spring is low.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1208"
    },
    {
        "template": "Weishen has three sheets of different materials with different shapes cut in the middle. Only one sheet is made of a material that allows light to pass through. He conducted an experiment in a dark room using the set-up below. Which of the following could be seen on the screen?",
        "options": [
            "(1)",
            "(2)",
            "(3)",
            "(4)"
        ],
        "answer": 1,
        "correct_answer": "(2)",
        "explanation": "If sheet P allows light to pass through, the light ray travels into the circular hole in sheet L and casts a circular light spot that is bigger than the triangular shape on sheet M.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1209"
    },
    {
        "template": "The elastic ropes stretched to a maximum length when he was at the highest point Q as shown in Diagram 2. Which one of the following correctly explains why Wenkang was slowing down as he moved from P to Q?",
        "options": [
            "Elastic potential energy was converted to heat by friction.",
            "Elastic potential energy was converted to gravitational potential energy.",
            "Elastic force was increasing as he was moving upwards.",
            "Elastic force was pulling him in opposite direction to his weight."
        ],
        "answer": 3,
        "correct_answer": "Elastic force was pulling him in opposite direction to his weight.",
        "explanation": "As Wenkang moved up, the elastic rope exerted an elastic force onto Wenkang. The elastic force increased as the elastic rope stretched to a longer length. The elastic force was pulling him in the same direction as his weight.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1210"
    }
]

with open('data/questions-science-p6.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

existing_ids = {q['id'] for q in data}
to_add = [q for q in new_questions if q['id'] not in existing_ids]
data.extend(to_add)

with open('data/questions-science-p6.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f'Added {len(to_add)} new questions for W7D4 (skipped duplicates)')
