#!/usr/bin/env python3
"""Add remaining W6 questions SCI1092-1105 (curated from W6D4/W6D5 PDFs)."""
import json

new_questions = [
    {
        "id": "SCI1092",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which organism has a three-stage life cycle?",
        "diagram": None,
        "placeholder_roles": None,
        "options": ["beetle", "butterfly", "grasshopper", "mosquito"],
        "answer": 2,
        "correct_answer": "grasshopper",
        "explanation": "Grasshoppers have a three-stage life cycle. Beetles, butterflies and mosquitoes have four-stage life cycles."
    },
    {
        "id": "SCI1093",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "{CHARACTER_0} observes the human digestive system diagram. Which row shows where digestion of food and absorption of food take place? (A=mouth, B=stomach, C=small intestine, D=large intestine)",
        "diagram": None,
        "placeholder_roles": ["protagonist"],
        "options": ["(1) A B", "(2) A D", "(3) B D", "(4) C C"],
        "answer": 3,
        "correct_answer": "(4) C C",
        "explanation": "Food is digested at the mouth (A), stomach (B) and small intestine (C). Absorption of food only takes place in the small intestine (C)."
    },
    {
        "id": "SCI1094",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "{CHARACTER_0} wants to find out whether an organism is an insect. Which action helps to determine whether the organism is an insect?",
        "diagram": None,
        "placeholder_roles": ["protagonist"],
        "options": [
            "Measure its length.",
            "Count its number of legs.",
            "Examine whether it has wings.",
            "Observe whether it feeds on plants or animals."
        ],
        "answer": 1,
        "correct_answer": "Count its number of legs.",
        "explanation": "An insect has three pairs of legs. Not all insects have wings."
    },
    {
        "id": "SCI1095",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "{CHARACTER_0} set up a photosynthesis experiment and counted oxygen bubbles produced with varying light intensity. The setup without lamp was then placed in an open field on a clear day. Which graph represents the oxygen produced from 6:00 a.m. to 6:00 p.m.?",
        "diagram": None,
        "placeholder_roles": ["protagonist"],
        "options": [
            "Graph showing peak at 12 noon",
            "Graph showing constant production",
            "Graph showing peak at 6 a.m.",
            "Graph showing peak at 6 p.m."
        ],
        "answer": 0,
        "correct_answer": "Graph showing peak at 12 noon",
        "explanation": "As the light intensity increases, the number of oxygen bubbles produced increases. At 12 noon, the light intensity is the greatest, thus the oxygen production peaks."
    },
    {
        "id": "SCI1096",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Water droplets are observed on the surface of leaves in the early morning. This is due to ____________________.",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "the temperature of the surrounding air being lower than that of the leaves",
            "water vapour in the air condensing on the surface of the leaves",
            "water droplets moving out of the tiny openings on the leaves",
            "evaporation of water from the surface of the leaves"
        ],
        "answer": 1,
        "correct_answer": "water vapour in the air condensing on the surface of the leaves",
        "explanation": "Water vapour in the air comes into contact with the cooler surface of the leaves, loses heat and condenses to form water droplets."
    },
    {
        "id": "SCI1097",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which statement about mushrooms and bacteria is correct?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "Both are fungi.",
            "Both can reproduce.",
            "Both do not respond to changes.",
            "Both can only be seen under the microscope."
        ],
        "answer": 1,
        "correct_answer": "Both can reproduce.",
        "explanation": "Both mushrooms and bacteria are living things, thus, they both can reproduce and respond to changes. Only bacteria require the use of a microscope to be seen and hence they are classified as microorganisms. Bacteria are not fungi."
    },
    {
        "id": "SCI1098",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The diagram shows the direction of blood flow in certain parts of the body. Which statement(s) is/are correct?\n\nA: Blood in P has less carbon dioxide than blood in Q.\nB: Blood in R has less digested food than blood in S.\nC: Blood in T has less oxygen than blood in U.",
        "diagram": None,
        "placeholder_roles": None,
        "options": ["A only", "C only", "A and B only", "B and C only"],
        "answer": 3,
        "correct_answer": "B and C only",
        "explanation": "Statement A: Blood in P has more carbon dioxide than blood in Q. Statement B: Digested food is used up in respiration. Statement C: Oxygen is used up in respiration."
    },
    {
        "id": "SCI1099",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Figures 1 and 2 show the reproductive parts of a flowering plant and a female human respectively. Which two reproductive parts have similar functions? (P=stigma, Q=style, R=ovary for plant; S=oviduct, T=ovary for human)",
        "diagram": None,
        "placeholder_roles": None,
        "options": ["P and S", "Q and T", "Q and S", "R and T"],
        "answer": 3,
        "correct_answer": "R and T",
        "explanation": "In the plant, part R is the ovary, which contains ovules (female reproductive cells). In the human, part T is the ovary, which produces and stores eggs (female reproductive cells). Both parts have the same function of producing or containing the female reproductive cells for fertilization."
    },
    {
        "id": "SCI1100",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "{CHARACTER_0} used fertilisers R and S on plants. Fertiliser R contains 20% substance K and 80% substance L. Fertiliser S contains 55% K and 45% L. All other conditions were kept the same. Plants grown with fertiliser R were healthier than those grown with fertiliser S. Which statement best supports this observation?",
        "diagram": None,
        "placeholder_roles": ["protagonist"],
        "options": [
            "A larger percentage of L allows the plants to grow well.",
            "A larger percentage of K allows the plants to grow well.",
            "Both K and L are not required for the plants to grow well.",
            "Fertilisers with similar percentages of K and L are most suitable for the plants."
        ],
        "answer": 0,
        "correct_answer": "A larger percentage of L allows the plants to grow well.",
        "explanation": "Since plants grown with fertiliser R were healthier, we will refer to the composition of substances K and L in fertiliser R to answer the question. As given in the table, a larger percentage of L allows the plants to grow well."
    },
    {
        "id": "SCI1101",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The following describes processes in reproduction of flowering plants:\nA: Fertilisation occurs.\nB: The ovary becomes a fruit.\nC: Pollen grains land on the stigma.\nD: The anther produces pollen grains.\n\nWhich row shows the correct order of these processes?",
        "diagram": None,
        "placeholder_roles": None,
        "options": ["A → D → C → B", "A → C → D → B", "D → C → B → A", "D → C → A → B"],
        "answer": 3,
        "correct_answer": "D → C → A → B",
        "explanation": "Pollination takes place before fertilisation. Formation of fruits follows post fertilisation."
    },
    {
        "id": "SCI1102",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The organisms in the diagram (frogs and tadpoles) represent a ______________________.",
        "diagram": None,
        "placeholder_roles": None,
        "options": ["prey", "habitat", "community", "population"],
        "answer": 3,
        "correct_answer": "population",
        "explanation": "Frogs and tadpoles belong to the same population of frogs."
    },
    {
        "id": "SCI1103",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "{CHARACTER_0} placed 45 insect P in the middle of a box with four sections. After 15 minutes, the number in each section showed: bright & dry (5), bright & damp (8), dark & dry (15), dark & damp (17). What can {CHARACTER_0} conclude about insect P?",
        "diagram": None,
        "placeholder_roles": ["protagonist", "protagonist"],
        "options": [
            "Insect P prefers dark places.",
            "Insect P prefers damp places.",
            "Insect P cannot survive in bright places.",
            "Insect P can only survive in dark and damp places."
        ],
        "answer": 0,
        "correct_answer": "Insect P prefers dark places.",
        "explanation": "Based on the observation, there are more insects in dark places, regardless of dry or damp conditions."
    },
    {
        "id": "SCI1104",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "{CHARACTER_0} conducted an experiment using identical bulbs and batteries in a dark room with water plants. Each setup had different numbers of bulbs. Which graph shows the correct volume of oxygen collected? (Setup 1: 1 bulb, Setup 2: 2 bulbs, Setup 3: 3 bulbs)",
        "diagram": None,
        "placeholder_roles": ["protagonist"],
        "options": [
            "Setup 3 > Setup 2 > Setup 1",
            "Setup 1 > Setup 2 > Setup 3",
            "All equal",
            "Setup 2 > Setup 3 > Setup 1"
        ],
        "answer": 0,
        "correct_answer": "Setup 3 > Setup 2 > Setup 1",
        "explanation": "Each light bulb had the same brightness. Setup 3 had the greatest number of bulbs, thus the plant received the most amount of light to carry out the most photosynthesis, and produced the highest volume of oxygen. Setup 1 had the least number of bulbs, thus the plant received the least amount of light to carry out the least photosynthesis, and produced the lowest volume of oxygen."
    },
    {
        "id": "SCI1105",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "{CHARACTER_0} dropped three types of fruits P, Q and R from the top of a building at the same time and measured the distance each landed away from the building. Which statement(s) CANNOT be concluded from the results?\n\nA: Fruit P is dispersed by animal.\nB: Fruits Q and R have wing-like structures.\nC: Fruit Q will travel further than fruit R when there is more wind.",
        "diagram": None,
        "placeholder_roles": ["protagonist"],
        "options": ["B only", "C only", "A and C only", "A, B and C"],
        "answer": 3,
        "correct_answer": "A, B and C",
        "explanation": "Statement A: The fruits were dropped from the building, there is no evidence to conclude that fruit P is dispersed by animal. Statement B: Light fruits do not require wing-like structures to be carried by wind. Statement C: There is no evidence to conclude that the structure of fruit Q will allow for greater distance travelled in the presence of wind."
    }
]

with open("data/questions-science-p6.json", "r", encoding="utf-8") as f:
    data = json.load(f)

existing_ids = {q["id"] for q in data}
to_add = [q for q in new_questions if q["id"] not in existing_ids]
data.extend(to_add)

with open("data/questions-science-p6.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Added {len(to_add)} W6 remainder questions (SCI1092-SCI1105)")
