#!/usr/bin/env python3
"""Add W7D5 questions to questions-science-p6.json"""
import json

new_questions = [
    {
        "template": "Which of the following characteristic(s) is/are found in birds, but not in other animals? A: They lay eggs. B: They have wings. C: They have a streamlined body. D: They have feathers on their bodies.",
        "options": [
            "B only",
            "D only",
            "A, B and D only",
            "A, B, C and D"
        ],
        "answer": 0,
        "correct_answer": "B only",
        "explanation": "Only birds have feathers on their bodies. Other animals such as reptiles and insects also lay eggs. Many insects have wings. Other animals such as fish also have a streamlined body.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1211"
    },
    {
        "template": "Sally placed an inflated balloon with a ball in it and a bag of ice on a beam balance under the hot sun. The set up was balanced at the start of the experiment. She recorded her observation after 3 hours. Which of the following statement(s) is/are possible observation(s) after 3 hours? A: The balloon expanded B: The set-up remained balanced. C: The side of the beam balance with the balloon moved downwards. D: The side of the beam balance with the bag of ice moved downwards.",
        "options": [
            "B only",
            "A and B only",
            "C and D only",
            "A, C and D only"
        ],
        "answer": 0,
        "correct_answer": "B only",
        "explanation": "A: The balloon can expand as the hot sun heats up the air in the balloon, causing the air to expand. B: There is no change in mass in either side, thus the set-up remains balanced. C and D is wrong.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1212"
    },
    {
        "template": "Study the distribution of seeds by plant P. One of the following fruits is from plant P. Which one is this fruit?",
        "options": [
            "(1)",
            "(2)",
            "(3)",
            "(4)"
        ],
        "answer": 0,
        "correct_answer": "(1)",
        "explanation": "The seeds of plant P are distributed over a large area in all directions. They are likely to be dispersed by animals. The fruit in option (1) has hooks which are able to attach the fruit to the fur of animals. The animals move around to different places and carry the fruit with structure that disperses its seeds by splitting. The fruit in option (3) has a fibrous husk, so it disperses its seeds by water. The fruit in option (4) has a wing-like structure, so it disperses its seeds by wind.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1213"
    },
    {
        "template": "The characteristics of two organisms are shown below. Organism Characteristic S T makes its own food no yes produces spores yes yes What could organism S and T be? S T (1) flowering plant mushroom (2) fern mushroom (3) fern flowering plant (4) mushroom fern",
        "options": [
            "(1) flowering plant mushroom",
            "(2) fern mushroom",
            "(3) fern flowering plant",
            "(4) mushroom fern"
        ],
        "answer": 0,
        "correct_answer": "(1) flowering plant mushroom",
        "explanation": "Organism S does not make its own food, so it is not a plant. Since it produces spores, it could be a fungus such as a mushroom. Since organism T makes its own food and produces spores, it could be a non-flowering plant such as a fern.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1214"
    },
    {
        "template": "The diagram shows the direction of blood flow in some parts of the body. What do A, B and C represent? A B C (1) lungs other parts of the body heart (2) heart lungs other parts of the body (3) lungs heart other parts of the body (4) heart other parts of the body lungs",
        "options": [
            "(1) lungs other parts of the body heart",
            "(2) heart lungs other parts of the body",
            "(3) lungs heart other parts of the body",
            "(4) heart other parts of the body lungs"
        ],
        "answer": 0,
        "correct_answer": "(1) lungs other parts of the body heart",
        "explanation": "Gaseous exchange of carbon dioxide with oxygen takes place in the lungs. In the lungs, blood loses carbon dioxide and gains oxygen. Blood rich in oxygen flows from the lungs (C) to the heart (A) and then to the other parts of the body (B). The cells in the other parts of the body take in oxygen from the blood and produce carbon dioxide. Blood rich in carbon dioxide flows from the other parts of the body (B) to the heart (A) and then to the lungs (C). The cycle repeats.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1215"
    },
    {
        "template": "Study the table below. parts of the digestive system J K L M removes water from food ✓ passes food to the bloodstream ✓ digestion takes place ✓ ✓ ✓ Which of the following correctly shows the parts labelled J, K, L and M?",
        "options": [
            "(1)",
            "(2)",
            "(3)",
            "(4)"
        ],
        "answer": 0,
        "correct_answer": "(1)",
        "explanation": "Part J removes water from food. It is the large intestine. Part L passes food to the bloodstream. It is the small intestine, where digestion also takes place. Digestion takes place in parts K and M. They are the stomach and the mouth respectively.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1216"
    },
    {
        "template": "Thomas set up his stall on a field as shown. After one month, he noticed that the grass patch below the stall turned yellow. Which of the following best explains why the grass patch turned yellow?",
        "options": [
            "There is not enough water for the grass.",
            "There is not enough oxygen for the grass.",
            "There is not enough sunlight for the grass.",
            "There is not enough carbon dioxide for the grass."
        ],
        "answer": 2,
        "correct_answer": "There is not enough sunlight for the grass.",
        "explanation": "The stall blocked sunlight from reaching the grass. Without enough sunlight, the grass could not carry out photosynthesis to produce food. The grass also produced less chlorophyll (a green pigment that traps light). Thus, the grass patch turned yellow.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1217"
    },
    {
        "template": "Kerry put a plant in a beaker of red-coloured water. After one day, he cut the stem. A section of the stem is shown. Kerry observed that tube B turned red but not tube C. Why?",
        "options": [
            "Tube B transports food from the roots to all parts of the plant.",
            "Tube B transports water from the roots to all parts of the plant.",
            "Tube B transports food from the leaves to all parts of the plant.",
            "Tube B transports water from the leaves to all parts of the plant."
        ],
        "answer": 0,
        "correct_answer": "Tube B transports food from the roots to all parts of the plant.",
        "explanation": "Tube B is the water-carrying tube that transports water and mineral salts from the roots to all parts of the plant. Thus, it was turned red by the red-coloured water. Tube C is the food- carrying tube that transports food from the leaves to all parts of the plant.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1218"
    },
    {
        "template": "The diagram shows a food web. {CHARACTER_0} made three statements about the food web. A: T is a predator. B: There is only one producer. C: All the energy in S is transferred to W. Which statement(s) is/are correct?",
        "options": [
            "A only",
            "B only",
            "A and B only",
            "A, B and C"
        ],
        "answer": 0,
        "correct_answer": "A only",
        "explanation": "T is a plant-eater. It is not a predator. R is the only producer in the food web. We can see this as arrows point out of R only. Not all parts of S are eaten by W, so only some energy in S is transferred to W.",
        "placeholder_roles": [
            "protagonist"
        ],
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1219"
    },
    {
        "template": "The diagram shows flowers of two plants. Plant A and plant B are of the same type. Which of the arrows show(s) pollination taking place?",
        "options": [
            "X only",
            "Y only",
            "W and Y only",
            "W, Y and Z only"
        ],
        "answer": 0,
        "correct_answer": "X only",
        "explanation": "Pollination is the transfer of a pollen grain from an anther to a stigma. Arrows W, Y and Z show pollen grains being transferred from anthers to stigmas. Thus, they show pollination taking place.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1220"
    },
    {
        "template": "Study the diagram below. Which of the following statements are correct? A: H and G are formed from a flower. B: H helps to disperse G. C: G is developed from an ovule.",
        "options": [
            "A and B only",
            "A and C only",
            "B and C only",
            "A, B and C"
        ],
        "answer": 0,
        "correct_answer": "A and B only",
        "explanation": "H and G are parts of a fruit, which is formed from a flower. When H dries up, the fruit splits open with an explosive force and G is dispersed. G is a seed. It is developed from a fertilised egg cell in the ovule.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1221"
    },
    {
        "template": "Which one of the following is a result of increased greenhouse effect?",
        "options": [
            "more deforestation",
            "more water pollution",
            "more floods and droughts",
            "more air pollution and haze"
        ],
        "answer": 1,
        "correct_answer": "more water pollution",
        "explanation": "Increased greenhouse effect causes a rise in temperature (global warming). The higher temperature causes polar ice caps to melt and sea levels to rise. As a result, low-lying areas are flooded. Increased greenhouse effect also causes changes in weather patterns.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1222"
    },
    {
        "template": "Devi conducted an experiment on photosynthesis in a dark room using the set-up below. She measured the amount of gas collected in the measuring cylinder after some time. Devi repeated her experiment by increasing variable X and keeping all other variables constant. Her results are shown below. What could variable X be?",
        "options": [
            "number of water plants",
            "volume of water in the set-up",
            "number of sheets of tracing paper",
            "distance of water plants from the lamp"
        ],
        "answer": 0,
        "correct_answer": "number of water plants",
        "explanation": "The graph shows that the amount of gas collected increased when variable X was increased. When the number of water plants was increased, more plants carried out photosynthesis and produced more oxygen gas. The bubbles of oxygen gas rose and were collected in the measuring cylinder. Thus, variable X could be the number of water plants. The volume of water in the set-up would have little effect on the amount of gas collected. If the number of sheets of tracing paper and the distance of water plants from the lamp were increased, the amount of gas collected would decrease.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1223"
    },
    {
        "template": "{CHARACTER_0} conducted an experiment to study the food relationship between animals X, Y and P. Animal P feeds on leaves only. Animals X, Y and P had no disease. At the start, {CHARACTER_0} placed some animals P and X in a tank with some leaves. He counted the number of animals at the end of each week. After two weeks, he added animal Y. {CHARACTER_0} results are shown below. Which of the following is correct?",
        "options": [
            "Animal Y fed on animal X.",
            "Animal Y fed on animal P.",
            "Animal X fed on animal Y.",
            "Animal X fed on animals Y and P."
        ],
        "answer": 0,
        "correct_answer": "Animal Y fed on animal X.",
        "explanation": "In the first two weeks, the population size of animal P decreased while the population size of animal X increased. This shows that animal X fed on animal P. After animal Y was added, the population size of animal X decreased while the population size of animal Y increased. This shows that animal Y fed on animal X. When the population size of animal Y increased, the population size of animal P also increased. This shows that animal Y did not feed on animal P.",
        "placeholder_roles": [
            "protagonist"
        ],
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1224"
    },
    {
        "template": "The diagram shows the life cycle of a flowering plant. Which of the following is correct? process(es) at X process(es) at Y (1) fertilisation pollination (2) dispersal pollination and fertilisation (3) pollination and fertilisation dispersal and germination (4) pollination and germination fertilisation and dispersal",
        "options": [
            "(1) fertilisation pollination",
            "(2) dispersal pollination and fertilisation",
            "(3) pollination and fertilisation dispersal and germination",
            "(4) pollination and germination fertilisation and dispersal"
        ],
        "answer": 0,
        "correct_answer": "(1) fertilisation pollination",
        "explanation": "An adult flowering plant produces flowers. Pollination of a flower occurs when wind or animals transfer pollen grains from the anther to the stigma of the flower. A pollen tube develops from a pollen grain and transfers the male reproductive cell to the egg cell inside the ovule. The male reproductive cell fuses with the egg cell and fertilisation occurs. The ovule develops into a seed, which is dispersed far away from the parent plant to prevent overcrowding. Under the right conditions, the seed germinates into a young plant.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1225"
    },
    {
        "template": "Which of the following statements about condensation and evaporation are correct? A: Both processes involve a change in state. B: Both processes do not occur at fixed temperatures. C: One process involves heat gain while the other involves heat loss.",
        "options": [
            "A and B only",
            "A and C only",
            "B and C only",
            "A, B and C"
        ],
        "answer": 0,
        "correct_answer": "A and B only",
        "explanation": "In condensation, a gas loses heat to become a liquid while in evaporation, a liquid gains heat to become a gas. Both condensation and evaporation occur at any temperature between the melting point and boiling point.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1226"
    },
    {
        "template": "Study the table below. state of substance at substance 20°C 40°C 60°C A solid solid solid B solid solid liquid C solid solid liquid Which of the following is a correct conclusion?",
        "options": [
            "The boiling point of substance C is 60 °C.",
            "The melting point of substance B is 60 °C",
            "Substance A has the highest freezing point.",
            "Substance B has a lower boiling point than substance A."
        ],
        "answer": 3,
        "correct_answer": "Substance B has a lower boiling point than substance A.",
        "explanation": "Substances B and C are solids at 40°C and liquids at 60°C. We can infer that their melting points lie between 40°C and 60°C. So option (2) is wrong. Substance A is solid at the three temperatures and so its melting point and hence freezing point are above 60°C. So, option (3) is correct. The data can only tell us that the boiling points of the three substances are above 60°C.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1227"
    },
    {
        "template": "In the four circuits, all the bulbs and batteries are new and identical. Which of the following two bulbs have the same brightness?",
        "options": [
            "A and B",
            "A and D",
            "B and C",
            "C and D"
        ],
        "answer": 0,
        "correct_answer": "A and B",
        "explanation": "Bulb A is connected to a battery. Bulb B is connected to two batteries in series. Bulb C and another bulb are connected in series to a battery. Bulb D and another bulb are connected to two batteries in series. The electric current through bulb B is the greatest while the current through bulb C is the smallest. The electric current through bulb A is the same as the current through bulb D.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1228"
    },
    {
        "template": "Old car tyres are tied together to form a wall along racing tracks. This helps to protect spectators and drivers when accidents happen. Which properties of the old car tyres help to ensure safety?",
        "options": [
            "strength and flexibility",
            "hardness and strength",
            "hardness and flexibility",
            "strength and smoothness"
        ],
        "answer": 0,
        "correct_answer": "strength and flexibility",
        "explanation": "When a racing car travelling at a high speed hits the wall, a tremendous force is applied. The rubber of the car tyres is a strong material that can withstand this large force without breaking. The wall thus protects spectators from the car. The rubber of the car tyres is also flexible enough to change its shape under the strong force, thereby absorbing the shock. This helps to minimise damage to the car and also reduce injury to the driver.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1229"
    },
    {
        "template": "A man used a hammer to drive a nail into a piece of wood. Which factor will not affect how deep the nail goes into the wood?",
        "options": [
            "mass of the nail",
            "mass of the man",
            "height the hammer was raised",
            "friction between nail and wood"
        ],
        "answer": 3,
        "correct_answer": "friction between nail and wood",
        "explanation": "When the hammer hit the nail, the kinetic energy of the hammer was transferred to the nail. A nail with a greater mass could possess a greater kinetic energy. So, factor (1) could affect how deep the nail went into the wood. The kinetic energy of the hammer came from the energy, not his mass, the man exerted. So, factor (2) had no effect. The hammer at a higher position possessed a greater gravitational potential energy. It would then have more kinetic energy to drive the nail into the wood. So, factor (3) would affect how deep the nail went into the wood. The friction between the nail and wood could prevent the nail from going too deep into the wood. So, factor (4) would affect how deep the nail went into the wood.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1230"
    },
    {
        "template": "Study the circuit below. After one of the bulbs had blown, all the other bulbs did not light up. Which bulb had blown?",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "answer": 1,
        "correct_answer": "B",
        "explanation": "If you cover bulb B with your finger, you will notice that there is no alternate path for current to flow through, thus none of the bulbs will light up.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1231"
    },
    {
        "template": "The diagram shows five lamps connected to two batteries. When one of the lamps is not working, only two lamps remain lit. Which lamp is not working?",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "answer": 0,
        "correct_answer": "A",
        "explanation": "",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1232"
    },
    {
        "template": "The diagram shows a cylinder and a plunger. {CHARACTER_0} filled the cylinder with 20 cm³ of water, leaving 10 cm³ of air. What would {CHARACTER_0} see after he pushed the plunger downwards as far as he could without any air or water escaping?",
        "options": [
            "(1)",
            "(2)",
            "(3)",
            "(4)"
        ],
        "answer": 1,
        "correct_answer": "(2)",
        "explanation": "Water cannot be compressed, so the volume of water would remain the same (20 cm³) even if it experienced a pushing force. Air can be compressed. However, it still occupies space. Thus, the volume of air would decrease but would not be zero.",
        "placeholder_roles": [
            "protagonist"
        ],
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1233"
    },
    {
        "template": "Which of the following diagrams correctly shows how trees play a part in the water cycle?",
        "options": [
            "(1)",
            "(2)",
            "(3)",
            "(4)"
        ],
        "answer": 1,
        "correct_answer": "(2)",
        "explanation": "In the water cycle, water droplets fall as rain. When the water from the rain falls on the land, it seeps into the earth. Trees take in the water up through their roots. The trees then lose water through their leaves by evaporation. In this process, they give off the water as water vapour. Diagram (2) is eliminated as it does not have an arrow from trees to water vapour. Diagrams (3) and (4) are eliminated because the trees should not lose water to rivers and seas.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1234"
    },
    {
        "template": "A block of wood slid down a slope after it was released at the top as shown in Diagram 1. The graph shows the amount of different types of energy of the block at point P. The experiment was repeated with oil applied on the surface of the slope. Which graph correctly shows the amounts of different types of energy at P?",
        "options": [
            "(1)",
            "(2)",
            "(3)",
            "(4)"
        ],
        "answer": 1,
        "correct_answer": "(2)",
        "explanation": "before oil is applied after oil is applied kinetic energy Greater than E because less kinetic energy is lost to E at P heat due to friction. potential Equals to E since the block is at position P above E energy at P the ground. heat is produced due heat at P Less heat is produced. to friction",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1235"
    },
    {
        "template": "Toy blocks were held together by friction between the blocks. Ramsy attached blocks Q and P to block L as shown in Diagram 1. When a third block R was added, blocks R and Q fell to the ground as shown in Diagram 2. Which one of the following is the reason why the two blocks fell?",
        "options": [
            "The weight of R was greater than the weight of Q.",
            "Friction between Q and P was less than the total weight of R and Q.",
            "Friction between P and L was less than the total weight of R, Q and P.",
            "The total weight of R and Q was greater than the total weight of Q and P."
        ],
        "answer": 1,
        "correct_answer": "Friction between Q and P was less than the total weight of R and Q.",
        "explanation": "diagram 1 diagram 2 Friction between P and Q > Friction between P and Q < weight of Q and cause weight of Q R effect Q remains stuck to P Q and R drop.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1236"
    },
    {
        "template": "Asman has four different toy parachutes, A, B, C and D. The details of the four toy parachutes are given in the table. parachute area of hole (cm3) length of string (cm) mass (g) A 1 10 20 B 1 5 40 C 1 10 40 D 3 5 20 Asman predicts that the length of string of a toy parachute does not affect the time needed for it to fall to the ground. Which pair of toy parachutes should he use to test his prediction?",
        "options": [
            "A and B",
            "A and D",
            "B and C",
            "C and D"
        ],
        "answer": 1,
        "correct_answer": "A and D",
        "explanation": "To investigate whether the length of string of the toy parachute affects the time needed for it to fall to the ground, Asman should only change the length of the string and keep all the rest of the variables such as area of hole and mass constant.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1237"
    },
    {
        "template": "Containers in set-ups A, B and C below are of the same size and thickness but made of different materials. The containers were filled with the same volume of water at 100 °C and left on a table. Which graph correctly shows the temperature of water in the three set-ups over a period of time?",
        "options": [
            "(1)",
            "(2)",
            "(3)",
            "(4)"
        ],
        "answer": 0,
        "correct_answer": "(1)",
        "explanation": "material glass iron wood comparing Poor heat heat Good heat conductor Poorest heat conductor conductor capacity Hot water in C would lose heat the Hot water in A Hot water in B would slowest and so its temperature would would lose heat lose heat the fastest decrease the slowest. Options (1) slowly and so its prediction and so its temperature and (2) are wrong as there must be temperature would decrease the some heat lost from the water to the would decrease fastest. surroundings. The temperature of the slowly. hot water cannot remain the same. Options (1) and (2) are wrong as there must be some heat lost from the water to the surroundings. The temperature of the hot water cannot remain the same.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1238"
    }
]

with open('data/questions-science-p6.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

existing_ids = {q['id'] for q in data}
to_add = [q for q in new_questions if q['id'] not in existing_ids]
data.extend(to_add)

with open('data/questions-science-p6.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f'Added {len(to_add)} new questions for W7D5 (skipped duplicates)')
