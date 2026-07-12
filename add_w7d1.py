#!/usr/bin/env python3
"""Add W7D1 questions to questions-science-p6.json"""
import json

new_questions = [
    {
        "template": "The diagrams show two animals. How are the animals similar?",
        "options": [
            "lay eggs",
            "have scales",
            "have moist skin",
            "have a four-stage life cycle"
        ],
        "answer": 2,
        "correct_answer": "have moist skin",
        "explanation": "Frogs lay eggs, have moist skin and have a three-stage life cycle. Grasshoppers lay eggs, have exoskeleton and have three-stage life cycle.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1141"
    },
    {
        "template": "Which of the following shows the correct direction of food that is taken through the mouth?",
        "options": [
            "stomach, small intestine, large intestine, gullet",
            "stomach, gullet, small intestine, large intestine",
            "gullet, stomach, large intestine, small intestine",
            "gullet, stomach, small intestine, large intestine"
        ],
        "answer": 3,
        "correct_answer": "gullet, stomach, small intestine, large intestine",
        "explanation": "Food passes through the digestive system in the following order: mouth, gullet, stomach, small intestine, large intestine.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1142"
    },
    {
        "template": "Which statement about the human digestive system is correct?",
        "options": [
            "Some food has been digested when it leaves the stomach.",
            "The large intestine does not absorb any substance.",
            "The large intestine digests and absorbs food.",
            "The mouth does not digest food."
        ],
        "answer": 1,
        "correct_answer": "The large intestine does not absorb any substance.",
        "explanation": "Digestion takes place in the mouth, stomach and small intestine. In the small intestine, digestion is completed, and digested food is absorbed by the blood. Water is reabsorbed from the undigested food in the large intestine. The large intestine does not digest food.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1143"
    },
    {
        "template": "Mr Mohammad removed the outer ring of the stem of a plant in a garden as shown in the diagram below. He continued to water the plant daily. Which of the following would be the most likely observation(s) of the plant after several weeks? A: Leaves P died B: Part R swelled C: The whole plant died",
        "options": [
            "A only",
            "B only",
            "A and B only",
            "A, B and C"
        ],
        "answer": 0,
        "correct_answer": "A only",
        "explanation": "A: leaf P did not die as it still receives water and can make its own food through photosynthesis. B: Part R will swell as food from the above cannot be delivered down to the roots, causing swelling at part R. C: The plant will continue to survive as the whole plant has water and leaves to make its own food through photosynthesis.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1144"
    },
    {
        "template": "Moss is a tiny non-flowering plant. It grows well at the bottom of tree trunks in forests. A gardener wants to grow moss in a garden. How can he help the moss grow well?",
        "options": [
            "water the moss daily",
            "attract butterflies to the garden",
            "grow the moss under bright sunlight",
            "attract animals that help disperse fruits"
        ],
        "answer": 3,
        "correct_answer": "attract animals that help disperse fruits",
        "explanation": "Moss is a non-flowering plant and thus there is no need for pollinators (butterflies). Since there is no fruit produced by moss, there is no need for animals to help disperse fruits. sunlight.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1145"
    },
    {
        "template": "The table shows the type of gases in air that are taken in and given out by a human. Gas Air taken (%) Air given out (%) nitrogen 78 78 oxygen 21 16 carbon dioxide less than 1 4 water vapour less than 1 2 Based on the information given, which statement is not correct?",
        "options": [
            "Carbon dioxide produced by the body is released into the air.",
            "All the oxygen that enters the lungs goes into the blood.",
            "At least four types of gases enter the respiratory system.",
            "Water is lost through breathing."
        ],
        "answer": 1,
        "correct_answer": "All the oxygen that enters the lungs goes into the blood.",
        "explanation": "21% of oxygen is breathed in and 16% of oxygen is breathed out. Thus, only 5% of oxygen, not all of the oxygen, entered the blood.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1146"
    },
    {
        "template": "Which of the following do plants need to carry out photosynthesis? A: tiny openings on leaves B: chloroplasts C: food-carrying tubes D: water-carrying tubes",
        "options": [
            "A and C only",
            "B and D only",
            "A, B and C only",
            "A, B and D only"
        ],
        "answer": 1,
        "correct_answer": "B and D only",
        "explanation": "Plants need carbon dioxide (which enters the plant through stomata), light (trapped by chlorophyll contained in chloroplasts) and water (enters the plants through roots and carried by water-carrying tubes) to carry out photosynthesis. Note: Photosynthesis can be summarised by this equation: carbon dioxide + water → sugar (food) + oxygen",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1147"
    },
    {
        "template": "What is the state of water when it is taken in and when it is given out by a plant? Taken in Given out (1) liquid liquid (2) gas gas (3) liquid gas (4) gas liquid",
        "options": [
            "(1) liquid liquid",
            "(2) gas gas",
            "(3) liquid gas",
            "(4) gas liquid"
        ],
        "answer": 0,
        "correct_answer": "(1) liquid liquid",
        "explanation": "Liquid water enters the roots and water vapour leaves the plants through the stomata.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1148"
    },
    {
        "template": "The graph shows the amount of rain in country W every year. The table shows some information about the growth of the rice and barley. Rice Barley Time to become adult plants (months) 5 4 Amount of rain suitable for growth (unit) 5 or more 2 or less Which plant(s) can grow in country W?",
        "options": [
            "rice only",
            "barley only",
            "both barley and rice",
            "neither barley nor rice"
        ],
        "answer": 1,
        "correct_answer": "barley only",
        "explanation": "grown. There are 5 months of rain (2 units or less) from November to March which allow barley to be grown.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1149"
    },
    {
        "template": "Sami observed the change in a plant. Which process(es) took place?",
        "options": [
            "pollination only",
            "pollination and fertilisation only",
            "fertilisation and dispersal only",
            "fertilisation, dispersal and germination only"
        ],
        "answer": 3,
        "correct_answer": "fertilisation, dispersal and germination only",
        "explanation": "The diagram on the left shows flowers which need to undergo pollination and then fertilisation in order for fruits to be developed as shown in the diagram on the right. Seed dispersal and germination have not yet occurred. Note: Once fertilisation has occurred, the ovary of the flower will grow into a fruit while the ovules inside the ovary will develop into seeds.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1150"
    },
    {
        "template": "Ken has two identical pots of plant P. He placed one plant in a room at 30 °C and the other at 40 °C. On each plant, he clipped dry pieces of a type of paper to the upper and lower surfaces of a leaf as shown. The paper turns pink when wet. The graph shows the time taken for the paper to turn pink. Based on the graph, which statement is a correct conclusion?",
        "options": [
            "Plant P at 30 °C lost more water.",
            "Plant P at 40 °C has fewer openings on its leaves.",
            "Plant P has more openings on the upper surface of its leaves.",
            "Plant P lost water more quickly through the lower surface of its leaves."
        ],
        "answer": 3,
        "correct_answer": "Plant P lost water more quickly through the lower surface of its leaves.",
        "explanation": "The papers that are clipped to both surfaces of the leaf at 40 °C took a shorter time to turn pink than the papers that are clipped to the leaf at 30 °C. Hence, statement 1 is not correct. The results do not show whether the number of openings (stomata) will change with temperature. Hence, statement 2 is not correct. At both temperatures, the paper clipped to the lower leaf surface took a shorter time to turn pink, thus this means water escapes faster through the lower leaf surface. Note: The lower leaf surface loses water faster because the lower leaf surface has more openings (stomata) than the upper leaf surface.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1151"
    },
    {
        "template": "Blood flows through blood vessels A to D as shown. Which blood vessels transport blood richer in oxygen?",
        "options": [
            "A and B only",
            "A and D only",
            "B and C only",
            "C and D only"
        ],
        "answer": 0,
        "correct_answer": "A and B only",
        "explanation": "Blood that flows in the blood vessels from the lungs carry the most amount of oxygen. This blood rich in oxygen is then pumped by the heart to other parts of the body where the oxygen is gradually used up and the blood becomes richer in carbon dioxide. The blood which carries more carbon dioxide then goes back to the heart to be pumped to the lungs so that carbon dioxide is released to the environment and oxygen is taken into the lungs and into the blood to be transported to other parts of the body again.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1152"
    },
    {
        "template": "The classification chart below shows how some plants are grouped. Which of the following headings correctly represents X and Y? X Y (1) bear fruits do not bear fruits (2) dispersed by water dispersed by splitting (3) reproduce by seeds reproduce by spores (4) dispersed by animals dispersed by wind",
        "options": [
            "(1) bear fruits do not bear fruits",
            "(2) dispersed by water dispersed by splitting",
            "(3) reproduce by seeds reproduce by spores",
            "(4) dispersed by animals dispersed by wind"
        ],
        "answer": 0,
        "correct_answer": "(1) bear fruits do not bear fruits",
        "explanation": "Banana and tomato plants have fleshy fruits that are eaten by animals, which helps to spread their seeds. In group Y, the angsana and shorea trees produce seeds with wing-like structures that allow them to be carried away by the wind.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1153"
    },
    {
        "template": "Study the chart below. Which of the following is correct for K, L, M and N? K L M N (1) no feathers has feathers lay eggs does not lay eggs (2) 3 pairs of legs fewer than 3 pairs of legs has wings no wings (3) no beak has beak does not lay eggs lay eggs does not lay (4) lay eggs more than 3 pairs of legs 3 pairs of legs eggs",
        "options": [
            "(1) no feathers has feathers lay eggs does not lay eggs",
            "(2) 3 pairs of legs fewer than 3 pairs of legs has wings no wings",
            "(3) no beak has beak does not lay eggs lay eggs does not lay",
            "(4) lay eggs more than 3 pairs of legs 3 pairs of legs eggs"
        ],
        "answer": 1,
        "correct_answer": "(2) 3 pairs of legs fewer than 3 pairs of legs has wings no wings",
        "explanation": "As seen from the chart, M and N have three pairs of legs while L has a pair of legs. M has wings (two pairs) and N has no wings. All the three organisms in the chart lay eggs.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1154"
    }
]

with open('data/questions-science-p6.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

existing_ids = {q['id'] for q in data}
to_add = [q for q in new_questions if q['id'] not in existing_ids]
data.extend(to_add)

with open('data/questions-science-p6.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f'Added {len(to_add)} new questions for W7D1 (skipped duplicates)')
