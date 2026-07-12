#!/usr/bin/env python3
"""Add W7D3 questions to questions-science-p6.json"""
import json

new_questions = [
    {
        "template": "Which of the following organisms can make its own food?",
        "options": [
            "fern",
            "mould",
            "beetle",
            "mushroom"
        ],
        "answer": 0,
        "correct_answer": "fern",
        "explanation": "A fern is a non-flowering plant that can make its own food through photosynthesis. Mould and mushroom are fungi while a beetle is an animal. They cannot make their own food.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1169"
    },
    {
        "template": "Mingfa observed a living organism under a microscope. Based on Mingfa’s observation, which is the correct conclusion?",
        "options": [
            "Living things grow.",
            "Living things respond to changes around them.",
            "Living things need food.",
            "Living things reproduce."
        ],
        "answer": 2,
        "correct_answer": "Living things need food.",
        "explanation": "Living things grow, respond, need food and reproduce. However, based on the diagram, the organism moved away from substance S after some time. Hence, it can be deduced that the organism responded to the presence of substance S. There is no increase in the size or number of the organism, hence option (1) and option (4) cannot be concluded. Option (3) cannot be concluded as the diagram does not show the organism feeding.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1170"
    },
    {
        "template": "The arrows in the diagram below represent different processes. What do arrows A and B represent? A B (1) photosynthesis decomposition (2) breathing decomposition (3) photosynthesis breathing (4) breathing photosynthesis",
        "options": [
            "(1) photosynthesis decomposition",
            "(2) breathing decomposition",
            "(3) photosynthesis breathing",
            "(4) breathing photosynthesis"
        ],
        "answer": 2,
        "correct_answer": "(3) photosynthesis breathing",
        "explanation": "Arrow A represents a process that an animal carries out and releases carbon dioxide into the surrounding. Hence, it represents breathing, whereby air containing carbon dioxide is expelled out of the animal’s lungs. Arrow B represents a process that a plant takes in carbon dioxide from the surroundings. Hence, it represents photosynthesis whereby carbon dioxide is taken in by the plant to produce glucose and oxygen in the presence of light.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1171"
    },
    {
        "template": "The diagram below shows a food web in a habitat. S, T, U, V, W and X represent different organisms. Which of the following is a correct conclusion?",
        "options": [
            "X is a decomposer.",
            "W eats plants and animals.",
            "When V decreases in number, S will increase in number.",
            "The energy from the Sun is transferred to S, and then to T, U, W and X."
        ],
        "answer": 2,
        "correct_answer": "When V decreases in number, S will increase in number.",
        "explanation": "Option (1) is wrong as X is an animal that feeds on W, not a decomposer. Option (2) is wrong as W eats U and V, which are both animals since they feed on T and do not make their own food. Option (3) is wrong as a decrease in the number of V will cause an increase in the number of T as there are fewer animals feeding on T, and this in turn will cause a decrease in the number of S as there are more animals feeding on S. Option (4) is correct as energy from the Sun is transferred to S, a producer, which can trap light energy and convert it into chemical energy while it makes its own food. The energy is later passed to T which consumes S, subsequently to U and V, and W and X through feeding relationship.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1172"
    },
    {
        "template": "Fertilisers help tiny floating plants to grow quickly and cover the surface of ponds. The following events took place when fertilisers from a farm entered a nearby pond. A The population of fish decreased. B The population of underwater plants decreased. C The amount of oxygen in the water decreased. D Sunlight could not reach organisms in the pond. Which of the following shows the correct order of events?",
        "options": [
            "A, B, C, D",
            "A, C, D, B",
            "D, C, A, B",
            "D, B, C, A"
        ],
        "answer": 0,
        "correct_answer": "A, B, C, D",
        "explanation": "As the fertilisers entered the pond, tiny floating plants grew quickly and covered the surface of the pond. Hence, they blocked sunlight from reaching the organisms in the pond, including the underwater plants. The underwater plants were therefore unable to make their own food through photosynthesis due to the lack of sunlight, hence some of them died due to the lack of food, resulting in a decrease in their population. (B) The underwater plants only took in oxygen to carry out respiration and did not release oxygen through photosynthesis. On top of that, decomposers that broke down the dead underwater plants also took in oxygen and carried out respiration. Hence, the amount of oxygen in the water decreased. (C) As the amount of oxygen in the water decreased, some fish died due to the lack of oxygen and hence their population decreased.(A)",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1173"
    },
    {
        "template": "The chart below shows how substances P and Q are transported in the human body. What are systems Y and Z and substances P and Q? System Y System Z P Q (1) respiratory circulatory carbon dioxide oxygen (2) circulatory respiratory carbon dioxide oxygen (3) respiratory circulatory oxygen carbon dioxide (4) circulatory respiratory oxygen carbon dioxide",
        "options": [
            "(1) respiratory circulatory carbon dioxide oxygen",
            "(2) circulatory respiratory carbon dioxide oxygen",
            "(3) respiratory circulatory oxygen carbon dioxide",
            "(4) circulatory respiratory oxygen carbon dioxide"
        ],
        "answer": 0,
        "correct_answer": "(1) respiratory circulatory carbon dioxide oxygen",
        "explanation": "Oxygen from the surrounding air enters the human respiratory system before being passed to the circulatory system. Blood in the circulatory system then transports the oxygen to all other parts of the body. Carbon dioxide produced through respiration of cells in all parts of the body enters the blood in the circulatory system to be transported to the respiratory system to be removed from the body.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1174"
    },
    {
        "template": "A fruit was cut open as shown. Which of the following statements are correct? A The fruit and seeds were developed from a flower. B There were many ovules in the ovary. C The seeds were small and would be dispersed by wind. D Pollination and fertilisation had taken place.",
        "options": [
            "A and B only",
            "C and D only",
            "A, B and D only",
            "A, B, C and D"
        ],
        "answer": 0,
        "correct_answer": "A and B only",
        "explanation": "Statement A is correct as the fruit is developed from an ovary of a flower and the seeds are developed from the ovules of a flower after fertilisation. Statement B is correct as each seed is formed from one fertilised ovule. Since the fruit has many seeds, there were many ovules in the ovary. Statement C is incorrect as the seeds are inside a brightly-coloured fleshy fruit. Hence, the seeds are likely to be dispersed by animals which eat the fruit and expel the seeds in their droppings. Statement D is correct as a fruit can only be formed from a flower after pollination, transfer of pollen grain from an anther to a stigma, and fertilisation, fusion of nuclei of a male and a female sex cells, have taken place.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1175"
    },
    {
        "template": "Which of the following is not an impact of deforestation by cutting trees?",
        "options": [
            "soil erosion",
            "loss of habitats",
            "smoke and haze",
            "more carbon dioxide in the air"
        ],
        "answer": 0,
        "correct_answer": "soil erosion",
        "explanation": "Deforestation by cutting trees causes soil erosion as topsoil is easily washed away by wind or water as there are no trees to cover the soil and no tree roots to hold the soil particles together. It also causes loss of habitats for organisms that used to live in the forests. The amount of carbon dioxide in the air also increases as there are fewer trees that take in carbon dioxide to carry out photosynthesis. Deforestation by cutting trees does not result in smoke and haze but deforestation by burning does.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1176"
    },
    {
        "template": "Which of the following shows how the mass of seed leaves change during germination?",
        "options": [
            "(1)",
            "(2)",
            "(3)",
            "(4)"
        ],
        "answer": 0,
        "correct_answer": "(1)",
        "explanation": "During germination, stored food in the seed leaves is used by the young plant for growth. Hence, the mass of the seed leaves decreases as the height of the young plant increases.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1177"
    },
    {
        "template": "ground. How does leaving behind dead plants benefit these farmers?",
        "options": [
            "To provide food for animals in the soil.",
            "To allow the plants to carry out photosynthesis.",
            "To make the soil fertile when the plants decompose.",
            "To provide shelter and protection for animals in the soil."
        ],
        "answer": 2,
        "correct_answer": "To make the soil fertile when the plants decompose.",
        "explanation": "As decomposers decompose the dead plants on the ground, nutrients are returned to the soil to make it fertile for future crops.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1178"
    },
    {
        "template": "The diagram shows a flower of plant Z. The reproductive parts are hidden in the flower. The flower gives off a strong smell. A gardener observes that the female part of the flower opens first for two days and then dies, before the male part opens and dies. How is plant Z pollinated? method within one flower or between two flowers (1) insect one flower (2) wind one flower (3) insect two flowers (4) wind two flowers",
        "options": [
            "(1) insect one flower",
            "(2) wind one flower",
            "(3) insect two flowers",
            "(4) wind two flowers"
        ],
        "answer": 0,
        "correct_answer": "(1) insect one flower",
        "explanation": "The flower gives off a strong smell and the male and female parts of the flower are enclosed within the flower, indicating that the flower is pollinated by insects. Pollination takes place between two flowers as the male and female parts of the same flower do not open at the same time. Hence, pollen grains have to be transferred from a flower which has an opened male part to another flower which has an opened female part.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1179"
    },
    {
        "template": "A, B, C, D and E are organs in the digestive system. The graph below shows the amount of undigested food leaving each organ after a meal. Which of the following is correct? mouth gullet small intestine large intestine (1) A D B E (2) B C D A (3) B E C D (4) B E A D",
        "options": [
            "(1) A D B E",
            "(2) B C D A",
            "(3) B E C D",
            "(4) B E A D"
        ],
        "answer": 0,
        "correct_answer": "(1) A D B E",
        "explanation": "As food passes through the organs in the digestive system, the amount of undigested food leaving each organ is as shown. Digestion only takes place in the mouth, stomach and small intestine. Hence, the amounts of undigested food leaving the mouth and gullet are the same (B and E), and the amounts of undigested food leaving the small and large intestines are the same (A and D).",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1180"
    },
    {
        "template": "Jacob used different containers and poured different volumes of water at 27 °C into the containers as shown in the table below. He then placed the set-ups, A, B, C and D, in the garden. Which one of the following statement is correct?",
        "options": [
            "Water in set-up A has the same rate of evaporation as water in set-up C.",
            "Water in set-up C has the same rate of evaporation as water in set-up D.",
            "Water in set-up A has a greater rate of evaporation than water in set-up B.",
            "Water in set-up D has a greater rate of evaporation than water in set-up B."
        ],
        "answer": 2,
        "correct_answer": "Water in set-up A has a greater rate of evaporation than water in set-up B.",
        "explanation": "The greater the exposed surface area, the faster the rate of evaporation.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1181"
    },
    {
        "template": "Liyan wanted to find out whether a type of plant growing in places with different amounts of carbon dioxide will have different number of tiny openings in their leaves. She collected leaves from the same type of plant growing in different places and counted the number of tiny openings as shown below. Which of the following variables should Liyan keep constant? A size of plant B number of tiny openings in a leaf C amount of carbon dioxide in the air D amount of photosynthesis in each plant",
        "options": [
            "A only",
            "C and D only",
            "A, B and C only",
            "A, B and D only"
        ],
        "answer": 0,
        "correct_answer": "A only",
        "explanation": "To find out whether the amount of carbon dioxide in the environment will affect the number of tiny openings in a leaf, the amount of carbon dioxide is to be changed and the number of tiny openings in a leaf is to be observed. The size of the plant should be kept constant so that the results of the experiment are not affected by the size of the plant. The amount of photosynthesis is not kept constant as it is affected by the amount of carbon dioxide in the environment.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1182"
    }
]

with open('data/questions-science-p6.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

existing_ids = {q['id'] for q in data}
to_add = [q for q in new_questions if q['id'] not in existing_ids]
data.extend(to_add)

with open('data/questions-science-p6.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f'Added {len(to_add)} new questions for W7D3 (skipped duplicates)')
