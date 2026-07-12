#!/usr/bin/env python3
"""Add W6D3 questions to questions-science-p6.json"""
import json

new_questions = [
    {
        "template": "What is one effect of deforestation?",
        "options": [
            "more types of plants and animals",
            "increase in carbon dioxide",
            "increase in oxygen",
            "lower temperature"
        ],
        "answer": 1,
        "correct_answer": "increase in carbon dioxide",
        "explanation": "Deforestation leads to fewer trees available to take in carbon dioxide for photosynthesis. Also, during deforestation, the trees are cut and burnt, releasing more carbon dioxide into the air.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1057"
    },
    {
        "template": "Which group of organisms has a three-stage life cycle?",
        "options": [
            "beetle, chicken and frog",
            "chicken, frog and grasshopper",
            "butterfly, frog and grasshopper",
            "beetle, chicken and cockroach"
        ],
        "answer": 0,
        "correct_answer": "beetle, chicken and frog",
        "explanation": "Chicken, frog, grasshopper and cockroach have a three-stage life cycle. Beetle and butterfly have a four-stage life cycle.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1058"
    },
    {
        "template": "Study the following structures. Structures R and S help the seeds to ________.",
        "options": [
            "obtain sunlight",
            "obtain water",
            "germinate",
            "disperse"
        ],
        "answer": 0,
        "correct_answer": "obtain sunlight",
        "explanation": "Both structures assist in the dispersal of seeds.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1059"
    },
    {
        "template": "The diagram shows the human digestive system. Which graph correctly shows the amount of undigested food leaving each organ A, B, C, D and E after a heavy meal?",
        "options": [
            "(1)",
            "(2)",
            "(3)",
            "(4)"
        ],
        "answer": 0,
        "correct_answer": "(1)",
        "explanation": "The amount of undigested food in the mouth (A) and the gullet (B) is the highest and the same as no digestion takes place in the gullet. In the stomach, some digestion takes place and less undigested food is found here. In the small intestine, digestion is completed. Thus the amount of undigested food is the lowest and the same in the small intestine (D) and the large intestine (E).",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1060"
    },
    {
        "template": "The table shows how animals can be grouped. gives birth lays eggs can swim A B cannot swim C D The diagram shows animal X. Which group does animal X belong to?",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "answer": 0,
        "correct_answer": "A",
        "explanation": "Webbed feet shows that animal X can swim. Having a beak and feathers show that animal X is a bird and birds lay eggs to reproduce.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1061"
    },
    {
        "template": "The graph shows the number of bacteria P and Q at different temperatures. Which temperature is the most suitable for both bacteria P and Q to grow?",
        "options": [
            "20°C",
            "25°C",
            "30°C",
            "38°C"
        ],
        "answer": 0,
        "correct_answer": "20°C",
        "explanation": "Though the amount of bacteria Q is highest at 38 °C, this is also the temperature where the amount of bacteria P is very low. The amount of bacteria P is highest at 30 °C. The amount of bacteria Q is very high at 30 °C.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1062"
    },
    {
        "template": "George wrapped and tied a black plastic bag around part of a green plant as shown. Food produced by the exposed leaves is transported ________.",
        "options": [
            "upwards only by the water carrying tubes",
            "downwards only by the food carrying tubes",
            "upwards and downwards by the food carrying tubes",
            "upwards and downwards by both the water and food carrying tubes"
        ],
        "answer": 1,
        "correct_answer": "downwards only by the food carrying tubes",
        "explanation": "The food-carrying tubes are found in all parts of the plant. Food made in the leaves are transported to all parts of the plant through the food-carrying tubes.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1063"
    },
    {
        "template": "Q8 The diagram shows the female part of a flower. There are three sections, P, Q and R. Which statement(s) is/are correct? A: P is where pollen grains land. B: Q is where fertilisation occurs. C: R is where a seed develops.",
        "options": [
            "A only",
            "A and C only",
            "B and C only",
            "A, B and C"
        ],
        "answer": 0,
        "correct_answer": "A only",
        "explanation": "Pollen grains land on stigma (P) during pollination. Fertilisation occurs in the ovary (R). After fertilisation, the ovary develops into a fruit and the ovules develops into seeds (in the ovary).",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1064"
    },
    {
        "template": "Devi wanted to know if substance S could keep ants away. She conducted an experiment using two identical glass containers P and Q. In P, she put in some ants, food and substance S as shown. Which diagram shows correctly what must Devi put into glass container Q for a fair test?",
        "options": [
            "(1)",
            "(2)",
            "(3)",
            "(4)"
        ],
        "answer": 1,
        "correct_answer": "(2)",
        "explanation": "The changed variable is presence of substance S. So, container Q should not contain substance S.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1065"
    },
    {
        "template": "The graph shows how the amount of light affects the rate of photosynthesis. Sherwin and {CHARACTER_0} made the following statements. Statement The rate of photosynthesis increases when the amount of light increases Sherwin from 0 to 1500 units. Above 1500 units, increasing the amount of light has no effect on the rate of {CHARACTER_0} photosynthesis. Who is/are correct?",
        "options": [
            "Sherwin only",
            "Michael only",
            "Both Sherwin and Michael",
            "Neither Sherwin nor Michael"
        ],
        "answer": 0,
        "correct_answer": "Sherwin only",
        "explanation": "As seen in the graph, the rate of photosynthesis increases when the amount of light increases from 0 to 1500 units. Above 1500 units, the rate of photosynthesis remains constant even when the amount of light increases.",
        "placeholder_roles": [
            "protagonist"
        ],
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1066"
    },
    {
        "template": "Which term is given to all the grasshoppers shown in a garden?",
        "options": [
            "population",
            "predator",
            "habitat",
            "community"
        ],
        "answer": 0,
        "correct_answer": "population",
        "explanation": "A population is defined as a group of organisms of the same kind living together and reproducing in a particular place. Grasshoppers eat plants, so they are not predators. A habitat is the home of an animal or a plant. A community is a group of populations of different organisms living in the same area at a given time.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1067"
    },
    {
        "template": "Jeanie used four similar leaves, A, B, C and D, of the same mass to conduct an experiment. These leaves have more stomata (tiny openings) on their bottom surfaces than on their top surfaces. Leaves lose water through their stomata. She coated some surfaces of the leaves with oil as shown in the table. Leaf Treatment A no oil B oil on bottom surface C oil on top surface D oil on top and bottom surfaces After the leaves were left in an open area for an hour, she removed the oil and measured the mass of each leaf. Which shows the mass of the leaves in increasing order?",
        "options": [
            "A, B, C, D",
            "A, C, B, D",
            "D, B, C, A",
            "D, C, B, A"
        ],
        "answer": 0,
        "correct_answer": "A, B, C, D",
        "explanation": "With no oil on leaf A, the water loss through the stomata is the greatest. Thus, leaf A will have the least mass. With oil on the top surface of leaf C, there is loss of water through the stomata on the bottom surface of the leaf. Thus, leaf C will have less water loss and a greater mass compared to leaf A. With oil on the bottom surface of leaf B (which has more stomata), leaf B will have less water loss and a greater mass compared to leaf C. With oil on both top and bottom surfaces of leaf D, the water loss is the least, so the mass of leaf D is the greatest.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1068"
    },
    {
        "template": "Fatimah investigated the effect of light on the germination and growth of plant M. She placed three seeds in each of two identical containers, R and S, and watered them daily. R was placed in a well-lit room, while S was placed in a dark room. Both rooms were kept at the same temperature. She observed the following on Day 5. What can she conclude from the investigation? A: The seeds need warmth for germination. B: The seeds do not need light for germination. C: The seedlings grow faster in the dark.",
        "options": [
            "A only",
            "B only",
            "B and C only",
            "A, B and C"
        ],
        "answer": 0,
        "correct_answer": "A only",
        "explanation": "The seeds were placed in rooms at the same temperature, thus it cannot show that seeds need warmth for germination. Seeds in both rooms germinated, showing that light is not needed for germination of seeds. The height of the seedlings placed in the dark room is greater than that of the seedlings placed in the well-lit room, showing that the seedlings grow faster in the dark.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1069"
    },
    {
        "template": "Jiamin placed five fruit flies in a jar containing food and water. The diagram shows the number of fruit flies over 25 days. Which row gives the correct conclusion, and reason for death of flies? conclusion based on observation from conclusion based on observation Day 1 to Day 17 from Day 17 to Day 25 (1) living things respond not enough air for the flies (2) living things reproduce not enough air for the flies (3) living things respond disease (4) living things reproduce disease",
        "options": [
            "(1) living things respond not enough air for the flies",
            "(2) living things reproduce not enough air for the flies",
            "(3) living things respond disease",
            "(4) living things reproduce disease"
        ],
        "answer": 1,
        "correct_answer": "(2) living things reproduce not enough air for the flies",
        "explanation": "The number of fruit flies increased from Day 1 to Day 17 showing that living things reproduce. From Day 17 to Day 25, there is a huge decrease in the number of fruit flies, possibly due to disease. The netting with holes suggests that there is plentiful air supply for the fruit flies.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1070"
    },
    {
        "template": "A crab is covered in a shell made of material W. The shell supports the body and protects the internal organs of the crab. Which property of material W allows the shell to perform these functions?",
        "options": [
            "ability to float on water",
            "flexibility",
            "strength",
            "waterproof"
        ],
        "answer": 1,
        "correct_answer": "flexibility",
        "explanation": "Material W must be strong in order to support the body and to protect the internal organs of the crab. Ability to float, flexibility and being waterproof will not support the body or protect the internal organs of the crab.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1071"
    },
    {
        "template": "The diagram shows a water cycle. Which process(es) represent(s) condensation?",
        "options": [
            "A only",
            "B only",
            "C only",
            "B and C only"
        ],
        "answer": 0,
        "correct_answer": "A only",
        "explanation": "Water from the river evaporates to form water vapour which rises up to the sky. The water vapour then condenses to form tiny water droplets (known as clouds). When the clouds get heavy, the tiny water droplets combine to fall as rain.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1072"
    },
    {
        "template": "Zhiming held magnet A on a slope. When he placed magnet B at the top of the slope, magnet B moved down the slope before coming to a stop as shown. Which force(s) acted on magnet B when it stopped? Friction Gravitational force Magnetic force (1) ✗ ✓ ✗ (2) ✗ ✗ ✓ (3) ✓ ✓ ✗ (4) ✓ ✓ ✓",
        "options": [
            "(1) ✗ ✓ ✗",
            "(2) ✗ ✗ ✓",
            "(3) ✓ ✓ ✗",
            "(4) ✓ ✓ ✓"
        ],
        "answer": 0,
        "correct_answer": "(1) ✗ ✓ ✗",
        "explanation": "Gravitational force always acts on objects on Earth. Frictional force must be present, otherwise magnet B will not come to a stop. Magnetic repulsion exists as magnet B stopped at a distance from magnet A.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1073"
    },
    {
        "template": "Some workers unrolled a netting to keep people out of a work area. Based on the properties shown, which material is most suitable for making the netting? Property Material strong flexible allows light to pass through (1) A ✓ ✓ ✓ (2) B ✗ ✓ ✓ (3) C ✓ ✓ ✗ (4) D ✓ ✗ ✗",
        "options": [
            "(1) A ✓ ✓ ✓",
            "(2) B ✗ ✓ ✓",
            "(3) C ✓ ✓ ✗",
            "(4) D ✓ ✗ ✗"
        ],
        "answer": 0,
        "correct_answer": "(1) A ✓ ✓ ✓",
        "explanation": "The material used to make the net needs to be strong so that it will not be easily broken, flexible so that it can be rolled up, and not allow light to pass through so that people can see the netting and be kept out of the work area.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1074"
    },
    {
        "template": "A worker wants to fit a metal rim onto a metal wheel as shown. The wheel is too big for the rim. How could the worker fit the rim on the wheel?",
        "options": [
            "heat the rim and place it over the wheel",
            "heat the wheel and place it in the rim",
            "cool the rim and place it over the wheel",
            "cool the wheel and rim to the same temperature and push them together"
        ],
        "answer": 0,
        "correct_answer": "heat the rim and place it over the wheel",
        "explanation": "When the rim is heated, it expands and becomes larger than the wheel. This allows the rim to be fitted on the wheel easily.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1075"
    },
    {
        "template": "Ai Choo lighted a candle inside a paper lantern as shown. After a while, part X of the paper lantern became brown and started to burn. Which statement best explains why part X started to burn?",
        "options": [
            "Air is a bad conductor of heat.",
            "Metal is a good conductor of heat.",
            "Paper is a poor conductor of heat.",
            "The cardboard base is a poor conductor of heat."
        ],
        "answer": 2,
        "correct_answer": "Paper is a poor conductor of heat.",
        "explanation": "As paper is a poor conductor of heat, it cannot conduct heat away quickly. Thus, part X which is closest to the flame will absorb more heat and burn.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1076"
    },
    {
        "template": "A bulb was connected in a circuit as shown. When the switch was closed, the bulb blew. What would have prevented the bulb from blowing?",
        "options": [
            "adding a battery in series",
            "adding another switch in series",
            "closing the switch more slowly",
            "using fewer batteries"
        ],
        "answer": 3,
        "correct_answer": "using fewer batteries",
        "explanation": "The bulb blew because there is too much current flowing in the circuit. Thus, fewer batteries must be used to reduce the amount of current flowing in the circuit.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1077"
    },
    {
        "template": "Hassan has a toy. When part S of the toy is pushed down, the ball moved as shown. Which statement on forces is not correct?",
        "options": [
            "A force pushed the ball up at P.",
            "A force is pulling the ball downwards at P.",
            "The ball slowed down from P to Q because of its weight.",
            "The ball started to fall at Q as the pushing force is used up."
        ],
        "answer": 1,
        "correct_answer": "A force is pulling the ball downwards at P.",
        "explanation": "Gravitational force is constantly acting on the ball, causing it to slow down after an initial upwards force at point P. At point Q, the gravitational force causes the ball to start to fall downwards.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1078"
    },
    {
        "template": "Which components can be placed at A and B of the circuit without changing the brightness of bulb L?",
        "options": [
            "(1)",
            "(2)",
            "(3)",
            "(4)"
        ],
        "answer": 0,
        "correct_answer": "(1)",
        "explanation": "Adding a bulb or switch at B will not have any effect of the brightness of bulb L. Adding a battery with opposite terminals facing the other battery at A will lead to bulb L to become brighter, as more current flows through the circuit. Adding battery with same terminals facing the other battery at A will lead to bulb L to not light up, as no current flows through the circuit. Placing a light bulb at A will lead to bulb L to become less bright. Placing a switch at A will not change the brightness of bulb L.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1079"
    },
    {
        "template": "Leela measured the mass of object X as shown in Diagram 1. Leela next placed object P above object X as shown in Diagram 2. She repeated the experiment with object Q as shown in Diagram 3. What conclusion about objects P, Q and X is correct? P Q X (1) not a magnet magnet non-magnetic material (2) magnetic material magnet magnetic material (3) not a magnet magnetic material magnet (4) non-magnetic material magnet magnet",
        "options": [
            "(1) not a magnet magnet non-magnetic material",
            "(2) magnetic material magnet magnetic material",
            "(3) not a magnet magnetic material magnet",
            "(4) non-magnetic material magnet magnet"
        ],
        "answer": 0,
        "correct_answer": "(1) not a magnet magnet non-magnetic material",
        "explanation": "When object P is placed above object X, there is no change in the mass of object X, this suggests that there is no magnetic repulsion/attraction between objects P and X. When object Q is placed above object X, the mass of object X increases, suggesting magnetic repulsion between objects Q and X. Therefore objects Q and X must be magnets and object P must be non-magnetic.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1080"
    },
    {
        "template": "Which of the following is not matter?",
        "options": [
            "a beam of light",
            "a cloud in the sky",
            "a stream of water",
            "melting ice cream"
        ],
        "answer": 0,
        "correct_answer": "a beam of light",
        "explanation": "Matter has mass and takes up space. Light is a form of energy, and it does not have mass, and will not take up space.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1081"
    },
    {
        "template": "Two different springs X and Y have the same length. When two identical blocks are placed on the springs, the results are as shown. Which graph correctly shows the relationship between the elastic spring force and the compression of the springs X and Y?",
        "options": [
            "(1)",
            "(2)",
            "(3)",
            "(4)"
        ],
        "answer": 0,
        "correct_answer": "(1)",
        "explanation": "X is exposed to one unit of weight on it, but Y is exposed to two units of weight and also the weight of X. However, both springs ended up with the same length, suggesting Y is stiffer than X. This means that in order to have the same amount of elastic spring force, X would need to be compressed more than Y.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1082"
    },
    {
        "template": "Gopa used the set-up shown to investigate the force needed to move an object. His results are as shown. mass of object surface area in contact with table force needed Experiment (g) (cm2) (units) A 20 4 4.0 B 20 8 4.1 C 40 4 8.0 D 40 8 7.9 Which two experiments support the hypothesis: \"The force needed to move an object is not affected by the surface area of the object in contact with the table.\"?",
        "options": [
            "A and B",
            "A and C",
            "B and C",
            "B and D"
        ],
        "answer": 1,
        "correct_answer": "A and C",
        "explanation": "In order to prove that force needed to move an object is not affected by the surface area of the object in contact with the table, we will choose different surface areas of object in contact with the table (changed variable). All other variables are to be kept constant (for example, mass of object, type of table surface).",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1083"
    },
    {
        "template": "The length of Eva’s shadow near a lamp post over some time is as shown. What was Eva doing during that time?",
        "options": [
            "walking towards the lamp post",
            "walking away from the lamp post",
            "jumping up and down near the lamp post",
            "standing still near the lamp post"
        ],
        "answer": 2,
        "correct_answer": "jumping up and down near the lamp post",
        "explanation": "Walking towards or away from the lamp post and jumping up and down near the lamp post will cause the shadow of Eva to increase/decrease in length. Standing still near the fixed light source will have the length of the shadow remaining the same.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1084"
    }
]

with open('data/questions-science-p6.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

existing_ids = {q['id'] for q in data}
to_add = [q for q in new_questions if q['id'] not in existing_ids]
data.extend(to_add)

with open('data/questions-science-p6.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f'Added {len(to_add)} new questions for W6D3 (skipped duplicates)')
