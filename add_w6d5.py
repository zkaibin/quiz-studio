#!/usr/bin/env python3
"""Add W6D5 questions to questions-science-p6.json"""
import json

new_questions = [
    {
        "template": "Which of the following are characteristics of all living things?",
        "options": [
            "make its own food, grow and reproduce",
            "grow, reproduce and respond to changes",
            "make its own food, reproduce and respond to changes",
            "move from one place to another, reproduce and respond to changes"
        ],
        "answer": 3,
        "correct_answer": "move from one place to another, reproduce and respond to changes",
        "explanation": "Not all living things can make its own food, for example fungi. Not all living things can move from one place to another, for example plants.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1113"
    },
    {
        "template": "Which of the following is correct for flowering and non-flowering plants? flowering plants non-flowering plants (1) make their own food do not make their own food (2) do not attract insects attract insects (3) produce spores do not produce spores (4) produce fruits do not produce fruits",
        "options": [
            "(1) make their own food do not make their own food",
            "(2) do not attract insects attract insects",
            "(3) produce spores do not produce spores",
            "(4) produce fruits do not produce fruits"
        ],
        "answer": 3,
        "correct_answer": "(4) produce fruits do not produce fruits",
        "explanation": "Flowering plants produce flowers which, upon going through pollination and fertilisation, develop into fruits. Non-flowering plants do not produce flowers and thus no fruits are developed.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1114"
    },
    {
        "template": "Which gases are found in air? A: oxygen B: nitrogen C: carbon dioxide D: water vapour",
        "options": [
            "A and C only",
            "B and D only",
            "A, B and C only",
            "A, B, C and D"
        ],
        "answer": 0,
        "correct_answer": "A and C only",
        "explanation": "Composition of air: Nitrogen (78%) Oxygen (21%) Carbon dioxide, water vapour and other gases (1%)",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1115"
    },
    {
        "template": "Study the diagram. Which arrow shows the correct direction in which water moves in a plant?",
        "options": [
            "P, Q and T only",
            "Q, R and S only",
            "Q, S and T only",
            "P, S and U only"
        ],
        "answer": 0,
        "correct_answer": "P, Q and T only",
        "explanation": "Water enters a plant via its roots and is then transported to all other parts of the plant via the water-carrying tubes in the stem.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1116"
    },
    {
        "template": "The diagram shows a fruit produced from a flower with one female part. The table shows the classification of flowers. Which represents the flower that the fruit was produced from? one ovule many ovule one ovary P Q many ovaries R S",
        "options": [
            "P",
            "Q",
            "R",
            "S"
        ],
        "answer": 0,
        "correct_answer": "P",
        "explanation": "Ovary develops into fruit while ovules develop into seeds. Since the papaya shown is a fruit with many seeds, the flower that the fruit was produced from would have many ovules.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1117"
    },
    {
        "template": "Study the chart on classification of organisms. Which of the following is possible?",
        "options": [
            "A is a butterfly.",
            "C is a mosquito.",
            "B and D are birds.",
            "A and B are mammals."
        ],
        "answer": 1,
        "correct_answer": "C is a mosquito.",
        "explanation": "A mosquito does not have feathers and it can fly.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1118"
    },
    {
        "template": "The graph below shows the volume of blood passing through the small intestine during rest and during exercise over a period of time. Based on the graph above, how does exercising after a meal affect the absorption of digested food in the small intestine?",
        "options": [
            "Less blood flows to the small intestine so there is less absorption.",
            "More blood flows to the small intestine so there is less absorption.",
            "Less blood flows to the small intestine so there is more absorption.",
            "More blood flows to the small intestine so there is more absorption."
        ],
        "answer": 0,
        "correct_answer": "Less blood flows to the small intestine so there is less absorption.",
        "explanation": "When you exercise, your body needs to send more blood and oxygen to your working muscles to keep them moving. This causes the body to divert blood away from the digestive system, as seen in the graph where the line for exercise is much lower than the line for rest. Since there is less blood flowing to the small intestine, it cannot pick up and transport nutrients as efficiently. Therefore, less absorption of digested food occurs during physical activity compared to when you are resting.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1119"
    },
    {
        "template": "Substances are obtained from the water carrying tubes and food carrying tubes of a plant on a sunny day. Which of the following is correct? Main substances present in water carrying tubes food carrying tubes (1) water and mineral salts sugar and mineral salts (2) water, sugar and mineral salts sugar (3) water and mineral salts sugar (4) water, sugar and mineral salts water and mineral salts",
        "options": [
            "(1) water and mineral salts sugar and mineral salts",
            "(2) water, sugar and mineral salts sugar",
            "(3) water and mineral salts sugar",
            "(4) water, sugar and mineral salts water and mineral salts"
        ],
        "answer": 3,
        "correct_answer": "(4) water, sugar and mineral salts water and mineral salts",
        "explanation": "The water carrying tubes of a plant carry water and mineral salts from the roots. The food carrying tubes carry sugar that is made by the leaves during photosynthesis.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1120"
    },
    {
        "template": "Wan Ling placed the set-up shown in a dark room. She placed a similar set-up in another dark room at a lower temperature. After a few days, she recorded the number of seeds that germinated in each set-up. What was the hypothesis tested in this experiment?",
        "options": [
            "Seeds will only germinate if there is water.",
            "Seeds will not germinate when kept in the dark.",
            "Seeds will only germinate when the temperature is suitable.",
            "Seeds will not germinate when they are placed too close together."
        ],
        "answer": 0,
        "correct_answer": "Seeds will only germinate if there is water.",
        "explanation": "Both the set-ups were placed in dark rooms but with different temperatures, that is, one of the rooms was cooler than the other. Therefore, the variable that was tested is temperature.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1121"
    },
    {
        "template": "The graph shows the length of time for each stage in the life cycles of organisms P and Q. Which statement is correct?",
        "options": [
            "P was at the larva stage 7 days after the egg hatched.",
            "Q spent the shortest time at the pupa stage in its life cycle.",
            "P took a shorter time to become an adult as compared to Q.",
            "Q spent a total of 11 days longer than P at the egg and larva stage."
        ],
        "answer": 1,
        "correct_answer": "Q spent the shortest time at the pupa stage in its life cycle.",
        "explanation": "7 days after the egg of P hatched, P was at the pupal stage. Q spent the shortest time (8 days) at the egg stage in its life cycle. Q spent 20 days while P spent 8 days at the egg and larval stages. Hence, Q spent 12 days longer than P at the egg and larval stages. P took a total of 12 days to become an adult while Q took a total of 34 days to become an adult.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1122"
    },
    {
        "template": "A and B are similar beakers containing the same volume of digestive juices. Equal amounts of potato are placed in the beakers. The potato in beaker B took a longer time to digest because it has a ________.",
        "options": [
            "larger volume",
            "smaller volume",
            "larger exposed surface area",
            "smaller exposed surface area"
        ],
        "answer": 2,
        "correct_answer": "larger exposed surface area",
        "explanation": "In beaker B, the potato is in one large piece. In beaker A the potato is cut into smaller pieces, which leads to more surfaces exposed, hence a larger exposed surface area. Therefore, the rate of digestion of the potato in beaker A is higher than that in beaker B.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1123"
    },
    {
        "template": "Jiaxuan placed a plant under the sun for two hours. She wrapped one leaf in a clear plastic bag as shown. Which graph represents the amount of oxygen in the bag during the two hours?",
        "options": [
            "(1)",
            "(2)",
            "(3)",
            "(4)"
        ],
        "answer": 1,
        "correct_answer": "(2)",
        "explanation": "Under the sun, photosynthesis would take place and oxygen would be released via the stomata of the leaf. Hence, the amount of oxygen in the plastic bag would gradually increase.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1124"
    },
    {
        "template": "Some animals are classified into four groups: insect, fish, mammal or amphibian. Which characteristic is used to classify them?",
        "options": [
            "type of body covering",
            "way of reproducing",
            "number of legs",
            "way of moving"
        ],
        "answer": 0,
        "correct_answer": "type of body covering",
        "explanation": "The type of body covering differs in all four groups of animals given. Insects have exoskeleton, fish have scales, mammals have hair/fur, and amphibians have moist skin.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1125"
    },
    {
        "template": "Ethan collected seed P from a tree. He conducted an experiment by dropping a seed from a height and measured the distance, D travelled. Ethan presented his findings in the graph below. What could be variable X?",
        "options": [
            "mass of seed",
            "amount of wind",
            "exposed surface area of seed",
            "height from which seed is dropped"
        ],
        "answer": 0,
        "correct_answer": "mass of seed",
        "explanation": "As the mass of the seed increases, it becomes more difficult for it to be blown away by the wind from the fan.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1126"
    },
    {
        "template": "Ali pumped more air into a ball. He observed that the size of the ball remained the same. Which of the following best explains his observation?",
        "options": [
            "Air has mass.",
            "Air occupies space.",
            "Air can be compressed.",
            "Air does not have a definite shape."
        ],
        "answer": 3,
        "correct_answer": "Air does not have a definite shape.",
        "explanation": "Air consists of gases which do not have a definite volume and can be compressed.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1127"
    },
    {
        "template": "{CHARACTER_0} wants to read the volume of water in a measuring cylinder. Which method is correct?",
        "options": [
            "(1)",
            "(2)",
            "(3)",
            "(4)"
        ],
        "answer": 0,
        "correct_answer": "(1)",
        "explanation": "Placing the measuring cylinder on the table ensures the water level is horizontal. Having the eye levelled at the horizontal water level helps in taking the reading accurately.",
        "placeholder_roles": [
            "protagonist"
        ],
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1128"
    },
    {
        "template": "The table shows the state of three substances, P, Q and R at different temperatures. State of substance at Substance 10°C 30°C 50°C P liquid liquid liquid Q solid solid liquid R solid solid solid Which statement can be concluded?",
        "options": [
            "P has the highest boiling point.",
            "Q has a lower melting point than P.",
            "Q has a higher boiling point than R.",
            "R has the highest freezing point."
        ],
        "answer": 0,
        "correct_answer": "P has the highest boiling point.",
        "explanation": "The table does not show temperatures at which the substances are in the gaseous state, hence we cannot tell about their boiling points. R is the only substance that is in solid state at 50°C. This shows that its melting/freezing point is the highest.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1129"
    },
    {
        "template": "In which circuit will bulb L be the brightest?",
        "options": [
            "(1)",
            "(2)",
            "(3)",
            "(4)"
        ],
        "answer": 0,
        "correct_answer": "(1)",
        "explanation": "Bulbs arranged in parallel will each receive the exact amount of electrical current as what the battery can supply. Bulbs arranged in series will receive a lower amount of electrical current supplied by the battery.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1130"
    },
    {
        "template": "The diagram below shows a toy car moving forward due to the air stored in the balloon. Which of the following shows how the energy changes?",
        "options": [
            "kinetic energy → heat energy → sound energy",
            "potential energy → heat energy + sound energy",
            "kinetic energy → potential energy → heat energy + sound energy",
            "potential energy → heat energy + kinetic energy"
        ],
        "answer": 2,
        "correct_answer": "kinetic energy → potential energy → heat energy + sound energy",
        "explanation": "The inflated balloon is a source of potential energy which when released, will cause the toy car to move (kinetic energy). Heat (heat energy) is generated due to friction between the tyres and contact surface.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1131"
    },
    {
        "template": "Zhiming placed a magnet and a wooden block on a slope as shown. The wooden block did not move. Which force(s) acted on the wooden block? Friction Gravitational force Magnetic force (1) no yes no (2) no yes yes (3) yes yes no (4) yes no yes",
        "options": [
            "(1) no yes no",
            "(2) no yes yes",
            "(3) yes yes no",
            "(4) yes no yes"
        ],
        "answer": 0,
        "correct_answer": "(1) no yes no",
        "explanation": "The friction between the wooden block and the contact surface of the slope prevented the wooden block from slipping down the slope. Gravitational force pulls the wooden block downwards. The wooden block is not a magnetic material and thus, cannot be attracted by the magnet.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1132"
    },
    {
        "template": "{CHARACTER_0} folded a piece of material to make a boat. It floated on water for a while before sinking. What are the properties of the material? property flexible waterproof (1) ✓ ✗ (2) ✗ ✓ (3) ✗ ✗ (4) ✓ ✓",
        "options": [
            "(1) ✓ ✗",
            "(2) ✗ ✓",
            "(3) ✗ ✗",
            "(4) ✓ ✓"
        ],
        "answer": 0,
        "correct_answer": "(1) ✓ ✗",
        "explanation": "Since the material can be folded, it is flexible. After floating on the water for a while, the boat sank, it shows it is not waterproof.",
        "placeholder_roles": [
            "protagonist"
        ],
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1133"
    },
    {
        "template": "Mariam set up four circuits using identical batteries and bulbs in working condition. In which circuit(s) will at least one bulb not light up?",
        "options": [
            "A only",
            "B and C only",
            "A and D only",
            "A, C and D only"
        ],
        "answer": 0,
        "correct_answer": "A only",
        "explanation": "In option (A), the negative terminals of the batteries are connected together. Hence, both light bulbs in (A) will not light up. In options (B) and (C), the bulbs and batteries are connected correctly and hence, both bulbs light up. In option (D), one of the bulbs is not connected correctly (the metal casing is not connected) and hence one bulb does not light up.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1134"
    },
    {
        "template": "Roy parked his car on a slope as shown. Roy and Laura opened the door from different sides. Both doors have the same mass. Which of the following is correct? force to open door explanation Both Roy and Laura can use an Gravitational force acting on each door is the (1) equal force. same. (2) Roy can use a smaller force. Force is exerted against gravitational force. (3) Laura can use a smaller force. Force is not exerted against gravitational force. (4) Laura has to use a larger force. Force is exerted against gravitational force.",
        "options": [
            "(1) equal force. same.",
            "(2) Roy can use a smaller force. Force is exerted against gravitational force.",
            "(3) Laura can use a smaller force. Force is not exerted against gravitational force.",
            "(4) Laura has to use a larger force. Force is exerted against gravitational force."
        ],
        "answer": 2,
        "correct_answer": "(3) Laura can use a smaller force. Force is not exerted against gravitational force.",
        "explanation": "Laura could only open the car door by going against the gravitational pull. Hence, more force would be required. For Roy, the car door would be pulled by the force of gravity and open.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1135"
    },
    {
        "template": "Eric has two cups, A and B, made from material P. He poured an equal amount of hot water into each cup. Cup A was too hot to hold, but he could hold cup B easily as shown. Which of the following best explains why Eric could hold cup B easily but not cup A?",
        "options": [
            "Cup A is a good conductor of heat.",
            "Cup B is a poor conductor of heat.",
            "Distance from heat source is further in cup B.",
            "Cup A is a good conductor of heat but the handle of cup B is not."
        ],
        "answer": 2,
        "correct_answer": "Distance from heat source is further in cup B.",
        "explanation": "In cup B, the heat will travel over a longer distance in the handle and hence, take time to flow to the hand, and hence, it will be easier for Eric to hold cup B.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1136"
    },
    {
        "template": "Susan looks into a wooden cupboard as shown. Which statement explains why she can see the glass?",
        "options": [
            "No light passes through wood.",
            "Light is reflected from the toys.",
            "Light passes through the glass easily.",
            "Some light is reflected from the glass."
        ],
        "answer": 3,
        "correct_answer": "Some light is reflected from the glass.",
        "explanation": "An object can be seen because light is reflected off the object and into our eyes. Most light will pass through the glass and some light will be reflected by the glass to Susan's eyes.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1137"
    },
    {
        "template": "{CHARACTER_0} heated some buns with a liquid filling as shown in Diagram 1. After a while, the filling burst through the wall of the bun as shown in Diagram 2. Which of the following best explains why?",
        "options": [
            "The wall of the bun is not waterproof.",
            "The filling expanded more than the bun.",
            "The filling is hotter than the bun.",
            "Air trapped in the wall of the bun expanded."
        ],
        "answer": 1,
        "correct_answer": "The filling expanded more than the bun.",
        "explanation": "When the water in the pot starts boiling, plenty of heat is generated and the bun gets heated up. When the liquid filling absorbs heat and expands more than the bun, there is no space within the bun for the liquid filling, and thus the filling bursts through the walls of the bun.",
        "placeholder_roles": [
            "protagonist"
        ],
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1138"
    },
    {
        "template": "{CHARACTER_0} had three different types of fabric, A, B and C. She shone a torch at each fabric and recorded the amount of light passing through with a light sensor of 10 s. Her observations are shown below. FabricAmount of light passed through A very little light B some light C most light Which graph shows her results correctly?",
        "options": [
            "(1)",
            "(2)",
            "(3)",
            "(4)"
        ],
        "answer": 0,
        "correct_answer": "(1)",
        "explanation": "The same amount of light is shone from the torch on the fabrics from the same distance and thus the amount of light detected by the light sensor must be constant (horizontal line).",
        "placeholder_roles": [
            "protagonist"
        ],
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1139"
    },
    {
        "template": "Qianzheng has a toy train as shown in Diagram 1. When he turned carriage A around, it moved together with the engine to the left and carriage B moved away to the right as shown in Diagram 2. Which of the following is correct about object P and the poles, J, K and L, of the magnets? P J K L (1) magnet S N N (2) magnetic material N N N (3) magnetic material S N N (4) magnet N S S",
        "options": [
            "(1) magnet S N N",
            "(2) magnetic material N N N",
            "(3) magnetic material S N N",
            "(4) magnet N S S"
        ],
        "answer": 1,
        "correct_answer": "(2) magnetic material N N N",
        "explanation": "P attracts both pole L and pole J which are poles of two magnets; P must be a magnetic material. Poles K and L must be of the same pole as they repel each other. Since pole K and pole J attract each other, pole J must have a different pole from pole K.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1140"
    }
]

with open('data/questions-science-p6.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

existing_ids = {q['id'] for q in data}
to_add = [q for q in new_questions if q['id'] not in existing_ids]
data.extend(to_add)

with open('data/questions-science-p6.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f'Added {len(to_add)} new questions for W6D5 (skipped duplicates)')
