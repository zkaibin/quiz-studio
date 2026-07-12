#!/usr/bin/env python3
"""Add W6D2 questions to questions-science-p6.json"""
import json

new_questions = [
    {
        "template": "Which organism has a three-stage life cycle?",
        "options": [
            "beetle",
            "butterfly",
            "grasshopper",
            "mosquito"
        ],
        "answer": 2,
        "correct_answer": "grasshopper",
        "explanation": "Grasshoppers have a three-stage life cycle. Beetles, butterflies and mosquitoes have four- stage life cycles.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1029"
    },
    {
        "template": "The diagram shows the human digestive system. Which row shows where digestion of food and absorption of food take place? digestion of food absorption of food (1) A B (2) A D (3) B D (4) C C",
        "options": [
            "(1) A B",
            "(2) A D",
            "(3) B D",
            "(4) C C"
        ],
        "answer": 0,
        "correct_answer": "(1) A B",
        "explanation": "Food is digested at the mouth (A), stomach (B) and small intestine (C). Absorption of food only takes place in the small intestine (C).",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1030"
    },
    {
        "template": "Fathimah wants to find out whether the organism shown is an insect. Which action helps to determine whether the organism is an insect?",
        "options": [
            "Measure its length.",
            "Count its number of legs.",
            "Examine whether it has wings.",
            "Observe whether it feeds on plants or animals."
        ],
        "answer": 1,
        "correct_answer": "Count its number of legs.",
        "explanation": "An insect has three pairs of legs. Not all insects have wings.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1031"
    },
    {
        "template": "{CHARACTER_0} set up an experiment as shown in the diagram below. She counted the number of oxygen bubbles produced by the water plant per minute with varying levels of light intensity and her results are shown in the table below. Intensity of light (units) Number of oxygen bubbles produced 0 0 50 12 100 26 150 40 200 55 The above setup without the lamp was then placed in an open field on a clear day. Based on the above experiment, which one of the following graphs, A, B, C or D, would represent the amount of oxygen produced from 6.00 a.m. to 6.00 p.m.?",
        "options": [
            "A",
            "B",
            "C",
            "D"
        ],
        "answer": 0,
        "correct_answer": "A",
        "explanation": "As the light intensity increases, the number of oxygen bubbles produced increases. At 12 noon, the light intensity is the greatest, thus the answer is option 1.",
        "placeholder_roles": [
            "protagonist"
        ],
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1032"
    },
    {
        "template": "Water droplets are observed on the surface of leaves in the early morning. This is due to ____________________.",
        "options": [
            "the temperature of the surrounding air being lower than that of the leaves",
            "water vapour in the air condensing on the surface of the leaves",
            "water droplets moving out of the tiny openings on the leaves",
            "evaporation of water from the surface of the leaves"
        ],
        "answer": 1,
        "correct_answer": "water vapour in the air condensing on the surface of the leaves",
        "explanation": "Water vapour in the air comes into contact with the cooler surface of the leaves, loses heat and condenses to form water droplets.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1033"
    },
    {
        "template": "Which statement about mushrooms and bacteria is correct?",
        "options": [
            "Both are fungi.",
            "Both can reproduce.",
            "Both do not respond to changes.",
            "Both can only be seen under the microscope."
        ],
        "answer": 3,
        "correct_answer": "Both can only be seen under the microscope.",
        "explanation": "Both mushrooms and bacteria are living things, thus, they both can reproduce and respond to changes. Only bacteria require the use of a microscope to be seen and hence they are classified as microorganisms. Bacteria are not fungi.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1034"
    },
    {
        "template": "The diagram shows the direction of blood flow in certain parts of the body. Which statement(s) is/are correct? A: Blood in P has less carbon dioxide than blood in Q. B: Blood in R has less digested food than blood in S. C: Blood in T has less oxygen than blood in U.",
        "options": [
            "A only",
            "C only",
            "A and B only",
            "B and C only"
        ],
        "answer": 1,
        "correct_answer": "C only",
        "explanation": "Statement A: Blood in P has more carbon dioxide than blood in Q. Statement B: Digested food is used up in respiration. Statement C: Oxygen is used up in respiration.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1035"
    },
    {
        "template": "Figures 1 and 2 below show the reproductive parts of a flowering plant and a female human respectively. Which two reproductive parts have similar functions?",
        "options": [
            "P and S",
            "Q and T",
            "Q and S",
            "R and T"
        ],
        "answer": 0,
        "correct_answer": "P and S",
        "explanation": "In the plant, part R is the ovary, which contains ovules (female reproductive cells). In the human, part T is the ovary, which produces and stores eggs (female reproductive cells). Both parts have the same function of producing or containing the female reproductive cells for fertilization.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1036"
    },
    {
        "template": "A farmer used fertilisers, R and S, on his plants. The fertilisers contained substances, K and L, as shown. All other conditions provided for his plants were kept the same. Substance K (%) Substance L (%) Fertiliser R 20 80 Fertiliser S 55 45 He observed that the plants grown with fertiliser R were healthier than the plants grown with fertiliser S. Which statement best supports this observation?",
        "options": [
            "A larger percentage of L allows the plants to grow well.",
            "A larger percentage of K allows the plants to grow well.",
            "Both K and L are not required for the plants to grow well.",
            "Fertilisers with similar percentages of K and L are most suitable for the plants."
        ],
        "answer": 0,
        "correct_answer": "A larger percentage of L allows the plants to grow well.",
        "explanation": "Since plants grown with fertiliser R were healthier, we will refer to the composition of substances K and L in fertiliser R to answer the question. As given in the table, a larger percentage of L allows the plants to grow well.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1037"
    },
    {
        "template": "The following describes the processes in reproduction of flowering plants. A: Fertilisation occurs. B: The ovary becomes a fruit. C: Pollen grains land on the stigma. D: The anther produces pollen grains. Which row shows the correct order of these processes?",
        "options": [
            "A → D → C → B",
            "A → C → D → B",
            "D → C → B → A",
            "D → C → A → B"
        ],
        "answer": 0,
        "correct_answer": "A → D → C → B",
        "explanation": "Pollination takes place before fertilisation. Formation of fruits follows post fertilisation.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1038"
    },
    {
        "template": "The organisms in the diagram represent a ______________________.",
        "options": [
            "prey",
            "habitat",
            "community",
            "population"
        ],
        "answer": 3,
        "correct_answer": "population",
        "explanation": "Frogs and tadpoles belong to the same population of frogs.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1039"
    },
    {
        "template": "{CHARACTER_0} placed 45 insect P in the middle of a box with four sections, each with different conditions. The number of insect P in each section after 15 minutes is as shown. What can {CHARACTER_0} conclude about insect P?",
        "options": [
            "Insect P prefers dark places.",
            "Insect P prefers damp places.",
            "Insect P cannot survive in bright places.",
            "Insect P can only survive in dark and damp places."
        ],
        "answer": 3,
        "correct_answer": "Insect P can only survive in dark and damp places.",
        "explanation": "Based on David's observation, there are more insects in dark places, regardless of dry or damp conditions.",
        "placeholder_roles": [
            "protagonist"
        ],
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1040"
    },
    {
        "template": "Xuan Shi conducted an experiment using identical bulbs and batteries in a dark room. After some time, he measured the volume of oxygen collected in the test-tube. Which graph shows the volume of oxygen collected?",
        "options": [
            "(1)",
            "(2)",
            "(3)",
            "(4)"
        ],
        "answer": 0,
        "correct_answer": "(1)",
        "explanation": "Each light bulb had the same brightness. Set-up 3 had the greatest number of bulbs, thus the plant received the most amount of light to carry out the most photosynthesis, and produced the highest volume of oxygen. Set-up 1 had the least number of bulbs, thus the plant received the least amount of light to carry out the least photosynthesis, and produced the lowest volume of oxygen.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1041"
    },
    {
        "template": "Three types of fruits, P, Q and R, were dropped from the top of a building at the same time. The distance each fruit landed away from the building was measured. The results are as shown. Which of the statements cannot be concluded from the results of the experiment? A: Fruit P is dispersed by animal. B: Fruits Q and R have wing-like structures. C: Fruit Q will travel further than fruit R when there is more wind.",
        "options": [
            "B only",
            "C only",
            "A and C only",
            "A, B and C"
        ],
        "answer": 1,
        "correct_answer": "C only",
        "explanation": "Statement A: The fruits were dropped from the building, there is no evidence to conclude that fruit P is dispersed by animal. Statement B: Light fruits do not require wing-like structures to be carried by wind. Statement C: There is no evidence to conclude that the structure of fruit Q will allow for greater distance travelled in the presence of wind.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1042"
    },
    {
        "template": "A solar panel is used to produce electricity for a lamp at night. Which energy received by the solar panel is used to produce electricity?",
        "options": [
            "light energy",
            "kinetic energy",
            "potential energy",
            "sound energy"
        ],
        "answer": 0,
        "correct_answer": "light energy",
        "explanation": "Solar panels convert light energy into electrical energy.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1043"
    },
    {
        "template": "{CHARACTER_0} and Mingxin were each given an identical scoop of ice cream in identical cups at the same time in an air-conditioned room. {CHARACTER_0} ice cream soon began to melt. Which of the statements can explain why {CHARACTER_0} ice cream is melting faster than Mingxin's? A: {CHARACTER_0} was supplying heat to the ice cream. B: {CHARACTER_0} ice cream had a larger exposed surface area. C: Temperature of {CHARACTER_0} ice cream increased.",
        "options": [
            "A only",
            "A and C only",
            "B and C only",
            "A, B and C"
        ],
        "answer": 0,
        "correct_answer": "A only",
        "explanation": "John was holding the cup of ice cream in his hand. Heat flowed from his hand to the cup of ice cream, thus causing John's ice cream to gain more heat faster and melt faster.",
        "placeholder_roles": [
            "protagonist"
        ],
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1044"
    },
    {
        "template": "Hassan set up the circuit below with a working bulb. The bulb did not light up when he closed the switch. Which change(s) will light up the bulb? connect X to T connect Y to T turn battery A around turn battery B around (1) ✓ ✓ ✗ ✗ (2) ✓ ✗ ✓ ✗ (3) ✗ ✓ ✗ ✗ (4) ✗ ✗ ✓ ✓",
        "options": [
            "(1) ✓ ✓ ✗ ✗",
            "(2) ✓ ✗ ✓ ✗",
            "(3) ✗ ✓ ✗ ✗",
            "(4) ✗ ✗ ✓ ✓"
        ],
        "answer": 0,
        "correct_answer": "(1) ✓ ✓ ✗ ✗",
        "explanation": "Error: Both wires were connected to the metal casing of the bulb. Solution: Connect one wire to the metal tip of the bulb at T. Error: The positive terminal of one battery is connected to the positive terminal of the other battery. Solution: Turn one battery around so that the positive terminal and negative terminal of the batteries are connected.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1045"
    },
    {
        "template": "A magnet R is hung on a string as shown in Diagram 1. In Diagram 2, magnet R turns in the direction shown when two other magnets are moved towards it at the same time. What are the poles of the two magnets at P and Q? P Q (1) N N (2) N S (3) S N (4) S S",
        "options": [
            "(1) N N",
            "(2) N S",
            "(3) S N",
            "(4) S S"
        ],
        "answer": 0,
        "correct_answer": "(1) N N",
        "explanation": "P is attracting the N-pole of the magnet. Q is repelling the S-pole of the magnet. Thus, both P and Q are S-poles.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1046"
    },
    {
        "template": "Leela made a dessert using a piece of fruit and jelly as shown. She can see the fruit inside the jelly. Which row shows the correct properties of the jelly? allows light to pass through reflects light (1) ✗ ✓ (2) ✗ ✗ (3) ✓ ✗ (4) ✓ ✓",
        "options": [
            "(1) ✗ ✓",
            "(2) ✗ ✗",
            "(3) ✓ ✗",
            "(4) ✓ ✓"
        ],
        "answer": 0,
        "correct_answer": "(1) ✗ ✓",
        "explanation": "The fruit can be seen through the jelly because the jelly allows light to pass through. The jelly can be seen because it reflects light.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1047"
    },
    {
        "template": "An air-conditioned bus is as shown. Passengers can move from the front section to the back section. Which material is most suitable for making part X to keep the bus safe and cool? property material strong flexible waterproof good conductor of heat (1) A ✗ ✓ ✗ ✓ (2) B ✓ ✗ ✓ ✗ (3) C ✓ ✓ ✓ ✗ (4) D ✓ ✓ ✓ ✓",
        "options": [
            "(1) A ✗ ✓ ✗ ✓",
            "(2) B ✓ ✗ ✓ ✗",
            "(3) C ✓ ✓ ✓ ✗",
            "(4) D ✓ ✓ ✓ ✓"
        ],
        "answer": 0,
        "correct_answer": "(1) A ✗ ✓ ✗ ✓",
        "explanation": "The material must be strong and flexible so as not to break easily and ensure safety. The material must be waterproof so that rain cannot enter the bus. The material must be a poor conductor of heat to slow down heat gain from the surroundings into the bus.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1048"
    },
    {
        "template": "Study the diagram. Which action makes the shadow on the screen bigger?",
        "options": [
            "Move the screen further from the puppet.",
            "Move the screen nearer to the light source.",
            "Move the audience further from the screen.",
            "Move the puppet further from the light source."
        ],
        "answer": 3,
        "correct_answer": "Move the puppet further from the light source.",
        "explanation": "To make the shadow bigger, move: the screen further from the puppet the puppet closer to the light source the light source closer to the puppet",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1049"
    },
    {
        "template": "Ali has two bottles, P and Q, made of the same type of metal. Bottle P has a thick metal wall while bottle Q has air between two metal walls. Ali wants to keep his coffee hot in a bottle. Which row shows the bottle to use and the reasons correctly? Bottle Reasons Metal is a good conductor of heat and the coffee will gain more heat from (1) P the surroundings. Metal is a good conductor of heat and the coffee will lose more heat to (2) P the surroundings. Air is a poor conductor of heat and the coffee will gain less heat from the (3) Q surroundings. Air is a poor conductor of heat and the coffee will lose less heat to the (4) Q surroundings.",
        "options": [
            "(1) P the surroundings. Metal is a good conductor of heat and the coffee will lose more heat to",
            "(2) P the surroundings. Air is a poor conductor of heat and the coffee will gain less heat from the",
            "(3) Q surroundings. Air is a poor conductor of heat and the coffee will lose less heat to the",
            "(4) Q surroundings."
        ],
        "answer": 1,
        "correct_answer": "(2) P the surroundings. Air is a poor conductor of heat and the coffee will gain less heat from the",
        "explanation": "Bottle Q has air trapped between the two metal walls. Air is a poor conductor of heat and hence, slows down heat loss from the hot coffee to the surroundings.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1050"
    },
    {
        "template": "A battery is used in a mobile phone. Which row shows how the energy changes when the mobile phone rings?",
        "options": [
            "electrical energy ⟶ heat energy ⟶ sound energy",
            "electrical energy ⟶ potential energy ⟶ sound energy",
            "potential energy ⟶ electrical energy ⟶ sound energy",
            "potential energy ⟶ heat energy ⟶ sound energy"
        ],
        "answer": 1,
        "correct_answer": "electrical energy ⟶ potential energy ⟶ sound energy",
        "explanation": "Chemical potential energy in the battery is converted into electrical energy in the electrical circuit which is then converted into sound energy in the phone.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1051"
    },
    {
        "template": "{CHARACTER_0} placed a cup of water in the refrigerator and measured its temperature. Her results are as shown. Which statement best describes the state of water at AB?",
        "options": [
            "It is a solid.",
            "It is getting cooler.",
            "It is a liquid at constant temperature.",
            "It is changing from a liquid to a solid state."
        ],
        "answer": 3,
        "correct_answer": "It is changing from a liquid to a solid state.",
        "explanation": "From the graph, the lowest temperature of the water is more than 0°C and thus, it is not a solid at AB.",
        "placeholder_roles": [
            "protagonist"
        ],
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1052"
    },
    {
        "template": "Ann played with a toy train. The train did not move in a straight line. Which statement best explains why?",
        "options": [
            "The force on the train is not in the same direction that the train is moving in.",
            "The front of the train is heavier than the back of train.",
            "The joint allows the carriage to turn.",
            "There is friction at the wheels."
        ],
        "answer": 0,
        "correct_answer": "The force on the train is not in the same direction that the train is moving in.",
        "explanation": "When a force is applied to an object, the object moves in the same direction as the force. Since the train was not moving in a straight line, the applied force must have been in different directions.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1053"
    },
    {
        "template": "Five bulbs are connected in a circuit as shown. How many more bulbs will light up when the switch is closed?",
        "options": [
            "1",
            "2",
            "3",
            "4"
        ],
        "answer": 0,
        "correct_answer": "1",
        "explanation": "The three bulbs in the branch where the switch is positioned were not lit when the switch is open (open circuit). These bulbs will only light up when the switch is closed (closed circuit) and current flows through them.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1054"
    },
    {
        "template": "A spring of length 5cm is placed inside a holder. Zizhong pushes one pellet after another into the holder. Which graph shows the relationship between Zizhong’s force when pushing the pellets and the compression of the spring?",
        "options": [
            "(1)",
            "(2)",
            "(3)",
            "(4)"
        ],
        "answer": 1,
        "correct_answer": "(2)",
        "explanation": "Compression of a spring is the reduction of the length of a spring when a compressive (pushing) force is applied. When no force is exerted, there is no compression of the spring.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1055"
    },
    {
        "template": "Liling set up the circuit shown using two identical batteries and bulb L. She set up four other circuits using identical batteries and bulbs. In which circuit will bulb M have the same brightness as bulb L?",
        "options": [
            "(1)",
            "(2)",
            "(3)",
            "(4)"
        ],
        "answer": 3,
        "correct_answer": "(4)",
        "explanation": "In option 4, the same number of batteries are used. Adding a light bulb in parallel will not affect the brightness of light bulb already in the circuit. When light bulbs are connected in parallel, they have the same relative brightness.",
        "placeholder_roles": null,
        "diagram": null,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "id": "SCI1056"
    }
]

with open('data/questions-science-p6.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

existing_ids = {q['id'] for q in data}
to_add = [q for q in new_questions if q['id'] not in existing_ids]
data.extend(to_add)

with open('data/questions-science-p6.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f'Added {len(to_add)} new questions for W6D2 (skipped duplicates)')
