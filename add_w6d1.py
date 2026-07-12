#!/usr/bin/env python3
"""Add W6D1 questions to questions-science-p6.json"""
import json

new_questions = [
    {
        "template": "Which is a characteristic of all living things?",
        "options": [
            "They can reproduce.",
            "They can make food.",
            "They can move to another place by themselves.",
            "They do not respond to changes in the environment."
        ],
        "answer": 2,
        "correct_answer": "They can move to another place by themselves.",
        "explanation": "All living things reproduce to continue their kind. Only plants can make food. Plants cannot move to another place by themselves. Living things respond to changes.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1001"
    },
    {
        "template": "What is one effect of deforestation?",
        "options": [
            "cleaner air",
            "loss of animals",
            "increase in rubbish dumps",
            "reduced greenhouse effect"
        ],
        "answer": 3,
        "correct_answer": "reduced greenhouse effect",
        "explanation": "Deforestation leads to fewer trees and less photosynthesis. Therefore, more carbon dioxide will be in the air. This increases the greenhouse effect. Animals living in the forest will lose their habitats and eventually die.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1002"
    },
    {
        "template": "Which row classifies cockroaches and mould correctly? cockroaches mould (1) animal bacteria (2) animal plant (3) insect fungi (4) insect plant",
        "options": [
            "(1) animal bacteria",
            "(2) animal plant",
            "(3) insect fungi",
            "(4) insect plant"
        ],
        "answer": 2,
        "correct_answer": "(3) insect fungi",
        "explanation": "Cockroach is an insect, while mould is a fungus.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1003"
    },
    {
        "template": "Which row shows where sperms and pollen grains are produced? sperms pollen grains (1) ovary anther (2) ovary ovary (3) testes anther (4) testes ovary",
        "options": [
            "(1) ovary anther",
            "(2) ovary ovary",
            "(3) testes anther",
            "(4) testes ovary"
        ],
        "answer": 2,
        "correct_answer": "(3) testes anther",
        "explanation": "Sperms are male human reproductive cells that are produced by the testes. Pollen grains are male plant reproductive cells that are produced by the anthers.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1004"
    },
    {
        "template": "What is the function of seed leaves?",
        "options": [
            "provide food for the seed until germination occurs",
            "provide food for the germinating seed until roots fully develop",
            "provide food for the germinating seed before leaves develop",
            "make food for the germinating seed before leaves develop"
        ],
        "answer": 2,
        "correct_answer": "provide food for the germinating seed before leaves develop",
        "explanation": "The function of the seed leaves is to provide food for the germinating seed before the true leaves are formed whereby the young plant can photosynthesise.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1005"
    },
    {
        "template": "K is made up of many small fruits tightly packed together. K develops from one flower. Which statement about the flower is correct?",
        "options": [
            "It has one ovary and one ovule.",
            "It has one ovary and many ovules.",
            "It has many ovaries and one ovule.",
            "It has many ovaries and many ovules."
        ],
        "answer": 3,
        "correct_answer": "It has many ovaries and many ovules.",
        "explanation": "One ovary develops into one fruit. One ovule develops into one seed. Since K has many fruits and seeds, the flower has many ovaries and many ovules.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1006"
    },
    {
        "template": "The diagram shows a plant. What will be the effect(s) of removing food-carrying tubes from location W? A: fruit becomes larger B: flowers die C: plant dies",
        "options": [
            "A only",
            "B only",
            "A and B only",
            "B and C only"
        ],
        "answer": 0,
        "correct_answer": "A only",
        "explanation": "The flowers will not be able to receive food and die. The food made by the leaves are transported to all parts of the plant below the cut, and the fruits will be receiving more food than before. Thus, they will grow bigger.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1007"
    },
    {
        "template": "Kandis set up an experiment as shown in the diagram below. The graph below shows his results. Based on the above results, which one of the following is the correct conclusion?",
        "options": [
            "The higher the rate of photosynthesis, the lower the intensity of light.",
            "The higher the rate of photosynthesis, the higher the intensity of light.",
            "The higher the intensity of light, the lower the rate of photosynthesis.",
            "The higher the intensity of light, the higher the rate of photosynthesis."
        ],
        "answer": 0,
        "correct_answer": "The higher the rate of photosynthesis, the lower the intensity of light.",
        "explanation": "The graph shows that as the distance from the lamp increases, the number of gas bubbles (oxygen produced) decreases. A shorter distance means the light intensity is higher, while a larger distance means the light intensity is lower. Since more bubbles are produced when the lamp is closer, it proves that a higher intensity of light leads to a higher rate of photosynthesis. Options 1, 2, and 3 are incorrect because they either misinterpret the relationship or use the results to define light intensity rather than concluding its effect on the plant.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1008"
    },
    {
        "template": "S and T are parts of the human respiratory system. S allows air to pass, to and from T. Gas exchange with blood takes place at T. What are S and T? S T (1) gullet lungs (2) lungs windpipe (3) windpipe lungs (4) windpipe heart",
        "options": [
            "(1) gullet lungs",
            "(2) lungs windpipe",
            "(3) windpipe lungs",
            "(4) windpipe heart"
        ],
        "answer": 1,
        "correct_answer": "(2) lungs windpipe",
        "explanation": "Since gas exchange with blood takes place at T, T is the lungs. S is the windpipe that allows air to pass to and from the lungs.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1009"
    },
    {
        "template": "Jane monitored her heart rate before, during and after running. The graph shows her data. Which conclusion is not correct?",
        "options": [
            "She ran for more than 10 min.",
            "The body required more oxygen during UV than during WX.",
            "More blood reached her leg muscles during WX than during YZ.",
            "More carbon dioxide was removed from her body during WX than during UV."
        ],
        "answer": 2,
        "correct_answer": "More blood reached her leg muscles during WX than during YZ.",
        "explanation": "She ran for 15 mins from V to X. More blood reached her leg muscles during the period of exercise. Respiration rate increases to produce more energy during exercise. Thus, more carbon dioxide is released during exercise.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1010"
    },
    {
        "template": "Study the information below. Which row correctly shows the type(s) and purpose of adaptation of the leaf insect? type(s) of adaptation purpose (1) behavioural only to catch prey (2) structural only to avoid being spotted by predators (3) behavioural and structural to catch prey (4) behavioural and structural to avoid being spotted by predators",
        "options": [
            "(1) behavioural only to catch prey",
            "(2) structural only to avoid being spotted by predators",
            "(3) behavioural and structural to catch prey",
            "(4) behavioural and structural to avoid being spotted by predators"
        ],
        "answer": 3,
        "correct_answer": "(4) behavioural and structural to avoid being spotted by predators",
        "explanation": "Structural adaptation: Appearance similar to leaves. Behavioural adaptation: Remains motionless, sway like leaves. Since it eats leaves, it does not catch prey. Thus, its adaptations serve to avoid being spotted by predators.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1011"
    },
    {
        "template": "Devi carried out an experiment using 2 similar boxes, A and B, to test her hypothesis that placing unripe fruits together with ripe fruits can help the unripe fruits ripen faster. In box A, she placed two unripe bananas. What should the set-up for box B be?",
        "options": [
            "two ripe bananas",
            "two unripe apples",
            "one unripe apple and one ripe apple",
            "one unripe banana and one ripe banana"
        ],
        "answer": 3,
        "correct_answer": "one unripe banana and one ripe banana",
        "explanation": "Fair test - Constant variables: Same number of fruits, same types of fruits. Changed variable: Presence of the ripe banana.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1012"
    },
    {
        "template": "Which statement about organisms and energy is correct?",
        "options": [
            "Animals can be a source of energy.",
            "Animals at rest do not require energy.",
            "Plants do not require energy at night.",
            "Plants are the direct source of energy for all animals."
        ],
        "answer": 3,
        "correct_answer": "Plants are the direct source of energy for all animals.",
        "explanation": "Animals can be a source of energy for other animals. All living things need energy all the time. Some animals are not plant-eaters, so they only obtain energy from plants indirectly.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1013"
    },
    {
        "template": "Yoghurt is made by adding substance S to milk. Zhiwei carried out an experiment with set-ups A and B to investigate how the mass of S affects the texture and taste of yoghurt. His results are as shown. set-up mass of S / g type of milk texture taste A 10 full cream creamy sour B 5 full cream watery mild Raj repeated the experiment using a different type of milk, with set-ups C and D. His results are as shown. set-up mass of S / g type of milk texture taste C 10 low fat watery sour D 5 low fat very watery mild Based on the results, which conclusion is not correct?",
        "options": [
            "Texture was affected by mass of S used.",
            "Texture was affected by type of milk used.",
            "Taste was affected by mass of S used.",
            "Taste was affected by type of milk used."
        ],
        "answer": 1,
        "correct_answer": "Texture was affected by type of milk used.",
        "explanation": "Texture was affected by the mass of S and type of milk used. Taste was affected by the mass of S used. However, taste was not affected by the type of milk used, as both full cream and low fat milk gave a sour taste to yoghurt.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1014"
    },
    {
        "template": "The diamond on a ring can be seen clearly even though it is colourless and clear. Which statement explains why the diamond can be seen?",
        "options": [
            "Diamond is a source of light.",
            "Light can pass through the diamond.",
            "Light is reflected from the diamond.",
            "Shadows are formed when light is blocked."
        ],
        "answer": 0,
        "correct_answer": "Diamond is a source of light.",
        "explanation": "We see objects because they reflect light into our eyes.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1015"
    },
    {
        "template": "A long balloon shown in Diagram 1 is twisted to form what is seen in Diagram 2. What happened to the shape of the balloon and the mass of air in the balloon after shrinking? shape of balloon mass of air (1) changed changed (2) changed unchanged (3) unchanged changed (4) unchanged unchanged",
        "options": [
            "(1) changed changed",
            "(2) changed unchanged",
            "(3) unchanged changed",
            "(4) unchanged unchanged"
        ],
        "answer": 0,
        "correct_answer": "(1) changed changed",
        "explanation": "The shape is changed but the mass stays the same because the same amount of air is in the balloon.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1016"
    },
    {
        "template": "Which material is suitable for making the bottle shown, so that the amount of liquid medicine can be clearly read? properties material floats on water waterproof allows some light to pass through (1) A ✓ ✓ ✗ (2) B ✓ ✗ ✓ (3) C ✗ ✓ ✓ (4) D ✗ ✗ ✓",
        "options": [
            "(1) A ✓ ✓ ✗",
            "(2) B ✓ ✗ ✓",
            "(3) C ✗ ✓ ✓",
            "(4) D ✗ ✗ ✓"
        ],
        "answer": 0,
        "correct_answer": "(1) A ✓ ✓ ✗",
        "explanation": "The material must allow light to pass through so that the amount of medicine in the bottle can be seen. The material must be waterproof so that it can contain the liquid medicine without absorbing it. This would make the bottle less strong and affect the volume of the medicine.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1017"
    },
    {
        "template": "Nurul set up four circuits using identical batteries and bulbs in working condition. In which circuits will bulb G have the same brightness?",
        "options": [
            "A and B only",
            "A and C only",
            "B and C only",
            "A, B and D only"
        ],
        "answer": 0,
        "correct_answer": "A and B only",
        "explanation": "In circuits A, B and D, bulb G is connected in series with one other bulb. The voltage provided by the battery is shared, thus bulb G in each circuit gets half the voltage. They will light up with the same brightness.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1018"
    },
    {
        "template": "When Joan released a plasticine cube from point J, it moved to point K and then slid back down. Next, she reshaped the same piece of plasticine into a ball. When she released it from J, the ball rolled past L. Which statement(s) correctly explain(s) why the ball moved further than the cube? A: The ball had higher kinetic energy at K. B: The ball had higher potential energy at J. C: The moving ball had less frictional force acting on it. D: The moving ball had less gravitational force acting on it.",
        "options": [
            "A only",
            "B only",
            "A and C only",
            "C and D only"
        ],
        "answer": 0,
        "correct_answer": "A only",
        "explanation": "Due to its shape, the ball experienced less frictional force. Thus, the potential energy was converted to more kinetic energy, which caused the ball to move faster. The ball had the same potential energy at J as the cube. The ball had the same amount of gravitational force acting on it as it had the same mass as the cube.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1019"
    },
    {
        "template": "Four identical cups, P, Q, R and S, are left to dry on a table as shown. The amount of water in each cup is the same. Which shows the correct order that the cups become dry, from fastest to slowest?",
        "options": [
            "P → S → Q → R",
            "Q → S → P → R",
            "R → Q → P → S",
            "S → Q → P → R"
        ],
        "answer": 0,
        "correct_answer": "P → S → Q → R",
        "explanation": "The water in Q has the greatest exposed surface area and evaporated the fastest. The water in S is more spread out than the water in P. Thus, it has a greater exposed surface area and evaporated faster. The water in R is not exposed to the surrounding air. It will evaporate the slowest due to the absence of wind.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1020"
    },
    {
        "template": "Yijun has three steel bars, X, Y and Z. She labelled each bar at its end as shown. She observed that X and Y can attract each other. When she brought Z near each of the other two bars, her observations are as shown. Which statement is correct?",
        "options": [
            "Only X is a magnet.",
            "Only Y is a magnet.",
            "Only Z is a magnet.",
            "Both X and Z are magnets."
        ],
        "answer": 0,
        "correct_answer": "Only X is a magnet.",
        "explanation": "Since Y and Z do not attract each other, they are both magnetic materials. Since X attracts Y and Z, and the opposite end of X also attracts Z, X is a magnet.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1021"
    },
    {
        "template": "{CHARACTER_0} is cooking some food wrapped in leaves over a fire as shown. Which statement best explains why there are burnt marks on the leaves after a while?",
        "options": [
            "The food is a poor conductor of heat.",
            "The leaves allow heat to pass through.",
            "The leaves are poor conductors of heat.",
            "The temperature of the food is too high."
        ],
        "answer": 2,
        "correct_answer": "The leaves are poor conductors of heat.",
        "explanation": "Leaves are poor conductors, so they do not transfer heat efficiently. As a result, heat builds up on the surface of the leaves exposed to the fire. This causes burnt marks to appear on the leaves.",
        "placeholder_roles": [
            "protagonist"
        ],
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1022"
    },
    {
        "template": "Zainah heated a block of ice in a beaker and measured its temperature over 7 minutes. Her results are as shown. After 4 minutes, she found that the mass of water is lower than the initial mass of the block of ice. Which statement best explains this?",
        "options": [
            "All of the ice has melted.",
            "Some of the ice has melted.",
            "Some of the water has evaporated.",
            "Some of the water has boiled to become steam."
        ],
        "answer": 2,
        "correct_answer": "Some of the water has evaporated.",
        "explanation": "After the ice has melted, the water continued to absorb heat from the heat source and evaporated.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1023"
    },
    {
        "template": "When Ravi threw a paper plane, it flew into the air and hit a wall before landing on the floor. Which is not a possible effect of the forces that acted on the paper plane?",
        "options": [
            "change in mass of plane",
            "change in shape of plane",
            "change in speed of plane",
            "change in direction of plane"
        ],
        "answer": 1,
        "correct_answer": "change in shape of plane",
        "explanation": "Effects of forces: Change in motion - A force can make a stationary object move or stop a moving object. Change in speed - A force can accelerate or decelerate a moving object. Change in direction - A force can change the path of a moving object. Change in shape or size - A force can compress, stretch or deform an object.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1024"
    },
    {
        "template": "The diagram shows a tissue paper holder that is attached to a wall. The springs in the holder exert a force X on the tissue paper. Which row shows the directions of the forces acting on the tissue paper?",
        "options": [
            "(1)",
            "(2)",
            "(3)",
            "(4)"
        ],
        "answer": 0,
        "correct_answer": "(1)",
        "explanation": "Gravitational force is always a downward pull. Force X is pushing the tissue paper to the right.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1025"
    },
    {
        "template": "The pie-chart shows the use of electrical energy in {CHARACTER_0}’s household. Which suggestion is the most helpful for {CHARACTER_0}’s household to reduce their energy usage?",
        "options": [
            "switch off the lamps when leaving the rooms",
            "switch off the water heater when it is not in use",
            "make sure that the refrigerator door shuts tightly",
            "use a fan instead of an air-conditioner to keep cool"
        ],
        "answer": 3,
        "correct_answer": "use a fan instead of an air-conditioner to keep cool",
        "explanation": "The largest percentage of electrical energy use comes from the use of the air-conditioner. By reducing the use of the air-conditioner and using a fan instead, electrical energy can be conserved.",
        "placeholder_roles": [
            "protagonist"
        ],
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1026"
    },
    {
        "template": "When water changes from liquid to gas at 100°C, which of the following is correct?",
        "options": [
            "The water is condensing.",
            "The water is losing heat.",
            "The water is gaining heat.",
            "There is no heat gain or heat loss by the water."
        ],
        "answer": 3,
        "correct_answer": "There is no heat gain or heat loss by the water.",
        "explanation": "The boiling point of water is 100°C. Boiling is a process where a liquid gains heat and changes from liquid to gas at a fixed temperature.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1027"
    },
    {
        "template": "Ricky compressed and then released a spring at A. It slid along the ground, passed B, and stopped at C. The chart below shows the amount and type of energy gained by the spring when Ricky compressed the spring at A. When the spring was at B, which chart best represents what the energy has been converted to?",
        "options": [
            "(1)",
            "(2)",
            "(3)",
            "(4)"
        ],
        "answer": 1,
        "correct_answer": "(2)",
        "explanation": "At B, the spring is no longer compressed. The potential energy has been converted to kinetic energy. Thus, its potential energy is zero. Due to friction between the spring and the ground, heat is generated, thus some kinetic energy is converted to heat energy.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1028"
    }
]

with open('data/questions-science-p6.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

existing_ids = {q['id'] for q in data}
to_add = [q for q in new_questions if q['id'] not in existing_ids]
data.extend(to_add)

with open('data/questions-science-p6.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f'Added {len(to_add)} new questions for W6D1 (skipped duplicates)')
