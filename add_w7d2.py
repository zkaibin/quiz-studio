#!/usr/bin/env python3
"""Add W7D2 questions to questions-science-p6.json"""
import json

new_questions = [
    {
        "template": "The diagram below represents the human digestive system. Based on the diagram above, which of the following statements about parts W, X, Y and Z are correct? A: Digestion is completed at part Y. B: Digestion of food starts at part Z. C: Food moves down part W into part X. D: Water is absorbed into the body at part Y.",
        "options": [
            "A and B only",
            "C and D only",
            "B, C and D only",
            "A, B, C and D"
        ],
        "answer": 0,
        "correct_answer": "A and B only",
        "explanation": "A: Digestion is completed at part Z (small intestine). B: Digestion of food starts at the mouth.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1155"
    },
    {
        "template": "Study the classification chart and the three animals, P, Q and R. Which of the following shows the correct classification of animals in boxes X and Y? X Y (1) R P (2) Q P (3) P R (4) Q R",
        "options": [
            "(1) R P",
            "(2) Q P",
            "(3) P R",
            "(4) Q R"
        ],
        "answer": 0,
        "correct_answer": "(1) R P",
        "explanation": "In the chart, animals in X have scales and a shell. We can observe from the diagram that animal Q, the turtle, has these characteristics. In the chart, animals in Y do not have scales. We can observe from the diagram that animal R, the frog, has this characteristic. Animal P, the lizard, has scales.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1156"
    },
    {
        "template": "The diagram shows how water and substance P flow through different parts, A, B, C and M, of a plant. What do A, B and C represent? A B C (1) flower stem root (2) leaf root flower (3) leaf flower root (4) root leaf flower",
        "options": [
            "(1) flower stem root",
            "(2) leaf root flower",
            "(3) leaf flower root",
            "(4) root leaf flower"
        ],
        "answer": 0,
        "correct_answer": "(1) flower stem root",
        "explanation": "In a plant, water from the roots moves up the stem to the leaves and flowers. Food or sugar, substance P, made in the leaves moves to all parts of the plants.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1157"
    },
    {
        "template": "Plant B grows well in areas with clean air. The diagram shows plant B growing near a factory which gives out polluted gases. Based on the diagram, in which direction was the wind blowing?",
        "options": [
            "←",
            "→",
            "↑",
            "↓"
        ],
        "answer": 0,
        "correct_answer": "←",
        "explanation": "Based on the diagram, we can observe that plant B grows mainly on the right side of the factory. This means that the air on the right side is clean. We can infer that the wind blows the polluted gases to the left of the factory.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1158"
    },
    {
        "template": "A tree supports only the organisms shown. Which of the following is correct?",
        "options": [
            "The birds form one community.",
            "The grasshoppers form three populations.",
            "The tree forms a habitat for the organisms.",
            "The squirrels and the tree form one community."
        ],
        "answer": 3,
        "correct_answer": "The squirrels and the tree form one community.",
        "explanation": "Option (1): The birds form one population. Option (2): The grasshoppers form one population. Option (3): The animals live on the tree, which is their habitat. Option (4): The squirrels, birds, grasshoppers and tree form one community.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1159"
    },
    {
        "template": "Which of the following is not correct?",
        "options": [
            "Arrows in a food chain show the flow of energy.",
            "Decomposers return nutrients to the environment.",
            "Energy increases as it passes through a food chain.",
            "Plants convert light energy from the Sun to potential energy."
        ],
        "answer": 2,
        "correct_answer": "Energy increases as it passes through a food chain.",
        "explanation": "Option (1): As one organism eats another organism, energy is transferred from the organism that is being eaten to the organism eating it. Option (2): As decomposers break down animal wastes and dead organisms, they release carbon dioxide into the air and minerals into the soil. Option (3): As energy passes through a food chain, it is released into the environment in the form of heat as animals undergo respiration. Hence, energy decreases along a food chain. Option (4): During photosynthesis, the energy in sunlight is stored in food.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1160"
    },
    {
        "template": "produced. The table shows some information about three types of fuels, P, Q and R. Energy Amount of greenhouse gases Number of years fuel can Fuel produced produced last P high low 50 - 60 Q medium medium 50 - 60 R low high 100 - 110 Which of the following cannot be concluded based on the information above?",
        "options": [
            "Acid rain forms only from the burning of Q and R.",
            "P, Q and R are non-renewable sources of energy.",
            "Burning of P, Q and R contributes to global warming.",
            "P is the best fuel to use to save the environment while it lasts."
        ],
        "answer": 2,
        "correct_answer": "Burning of P, Q and R contributes to global warming.",
        "explanation": "Option (1): We do not have information on whether burning of the fuels produces acidic gases. Option (2): P, Q and R will eventually run out, hence, they are all non-renewable. Option (3): Burning of P, Q and R gives out greenhouse gases, which trap heat from the Sun. Hence, they contribute to global warming. Option (4): Burning P produces the lowest amount of greenhouse gases and hence contributes least to global warming.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1161"
    },
    {
        "template": "The graph shows the changes in the mass of a young plant and its seed leaves during germination. Which of the following best explains the changes shown in the graph?",
        "options": [
            "The leaves first appear around day X.",
            "The roots grow out first followed by the shoot.",
            "The young plant only starts to grow after day X.",
            "The seed leaves provide food for the young plant until day X."
        ],
        "answer": 3,
        "correct_answer": "The seed leaves provide food for the young plant until day X.",
        "explanation": "graph explaination At X, the plant has developed true leaves and is able Mass of the young plant decreases to carry out photosynthesis. and then increases at X. Mass of seed leaves, the food store, The young plant uses up the food in the seed leaves decreases all the way. to undergo respiration and growth.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1162"
    },
    {
        "template": "Laura cut the lower stem of a white flower into two equal parts. She placed them into containers with different coloured water as shown. After a short time, she observed that some parts of the flower turned red, some turned yellow, while the rest remained white. Laura made four statements: A The food made by the plant was red and yellow in colour. B The stem transported the different coloured water to the flower. C No coloured water was transported to the flower parts that remained white. D There were no water tubes in the flower parts that remained white. Which statements can be concluded from her observations?",
        "options": [
            "A and D only",
            "B and C only",
            "B and D only",
            "B, C and D only"
        ],
        "answer": 0,
        "correct_answer": "A and D only",
        "explanation": "Statement A: The coloured water was transported up the plant through water-carrying tubes, not food-carrying tubes. Statement B: The coloured water moved up the plant through the stem to the flower. Statement C: The coloured water did not reach some parts of the flower, and hence, those parts remained white. Statement D: We cannot conclude that those parts of the flower that remained white do not have water-carrying tubes.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1163"
    },
    {
        "template": "Which statement is correct about the mushroom and the fern?",
        "options": [
            "Both grow only on trees.",
            "Both reproduce from spores.",
            "Both are non-flowering plants.",
            "Both cannot make their own food."
        ],
        "answer": 3,
        "correct_answer": "Both cannot make their own food.",
        "explanation": "The mushroom is a fungus, and not a plant. Hence, it cannot make its own food. The fern is a non-flowering plant, hence, it can make its own food. Both reproduce through spores.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1164"
    },
    {
        "template": "Thomas prepared two similar set-ups, P and Q, as shown in the diagram. He gave both set-ups the same amount of water and placed them in the sun for one day. Which of the following correctly shows the amount of carbon dioxide in P and Q throughout the day?",
        "options": [
            "(1)",
            "(2)",
            "(3)",
            "(4)"
        ],
        "answer": 0,
        "correct_answer": "(1)",
        "explanation": "In set-up P, light could pass through the glass jar, hence, the plant could receive sunlight and carry out photosynthesis during the day. At noon, this plant would use up the highest amount of carbon dioxide to photosynthesise as the intensity of the sunlight was the highest during noon. The amount of carbon dioxide gradually increased as the intensity of sunlight became lower after noon. In set-up Q, light could not pass through the black cloth, hence, the plant in this set-up could not receive sunlight and carry out photosynthesis. This plant would give out carbon dioxide during respiration, hence, the amount of carbon dioxide in jar Q increased.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1165"
    },
    {
        "template": "Mazlan performed an experiment using two flowers from the same plant. One of the flowers is shown. He removed one part from flower A and one part from flower B. After some time, he recorded which flower could form a fruit. flower presence of a fruit A yes B no Which of the following correctly shows the part of each flower that has been removed? Part removed Flower A Flower B (1) Q S (2) R Q (3) S T (4) T R",
        "options": [
            "(1) Q S",
            "(2) R Q",
            "(3) S T",
            "(4) T R"
        ],
        "answer": 0,
        "correct_answer": "(1) Q S",
        "explanation": "To form a fruit, parts S, the ovary, and T, the stigma, must be present.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1166"
    },
    {
        "template": "Fatimah wrote some statements about humans, fish and plants. A The lungs and gills are part of the circulatory system. B Oxygen and carbon dioxide are carried by the blood in humans and fish. C Gaseous exchange takes place at the lungs, gills and stomata (tiny openings in leaves). Which of her statement(s) is/are correct?",
        "options": [
            "C only",
            "A and B only",
            "B and C only",
            "A, B and C"
        ],
        "answer": 0,
        "correct_answer": "C only",
        "explanation": "Statement A: The lungs and gills are parts of the respiratory systems. Statement B: The blood in humans and fish carries oxygen from the lungs and gills to various parts of the body. The blood also carries carbon dioxide from various parts of the body to the lungs and gills. Statement C: Through the lungs, gills and stomata, the organisms take in oxygen and give out carbon dioxide into their environment, hence the gaseous exchange.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1167"
    },
    {
        "template": "Kumar predicted that the greater the amount of carbon dioxide in a town, the fewer the number of tiny openings called stomata found in a plant. Which of the following supports his prediction?",
        "options": [
            "(1)",
            "(2)",
            "(3)",
            "(4)"
        ],
        "answer": 0,
        "correct_answer": "(1)",
        "explanation": "When fuels in cars are burnt, carbon dioxide is released. In the town stated, the more cars passed through, the more carbon dioxide would be present. Graph 4 shows the most stomata found when there were 0–5 cars and the fewest stomata found when there were more than 20 cars.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1168"
    }
]

with open('data/questions-science-p6.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

existing_ids = {q['id'] for q in data}
to_add = [q for q in new_questions if q['id'] not in existing_ids]
data.extend(to_add)

with open('data/questions-science-p6.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f'Added {len(to_add)} new questions for W7D2 (skipped duplicates)')
