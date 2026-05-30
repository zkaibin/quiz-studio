#!/usr/bin/env python3
"""
Add W4D3 questions to questions-science-p6.json
IDs: SCI848-SCI874
"""
import json

new_questions = [
    {
        "id": "SCI848",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Animal X has the following characteristics: A: It has fins. B: It breathes through gills. C: It has scales as outer body covering. Based on the characteristics, which animal group does animal X belong to?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "fish",
        "insect",
        "reptile",
        "amphibian"
        ],
        "answer": 0,
        "correct_answer": "fish",
        "explanation": "Animal X has fins, breathes through gills, and has scales. These are the three defining characteristics of a fish."
    },
    {
        "id": "SCI849",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following correctly identifies organisms J, K, L and M? J K L M (1) mushroom rose moss earthworm (2) earthworm moss mushroom rose (3) rose mushroom earthworm moss (4) earthworm rose mushroom moss",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "(1)",
        "(2)",
        "(3)",
        "(4)"
        ],
        "answer": 0,
        "correct_answer": "(1)",
        "explanation": "Based on the flow chart, organism J is an animal (earthworm) as it does not make its own food and does not reproduce by spores. Organism K is a flowering plant (rose) as it makes its own food but does not reproduce by spores. Organism L is a fungi (mushroom) as it reproduces by spores but does not make its own food. Organism M is a non-flowering plant (moss) as it makes its own food and reproduces by spores."
    },
    {
        "id": "SCI850",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "objects A and B. Based only on the diagram above, which of the following statements is likely to be true?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "The electromagnet is made of aluminium.",
        "Both objects A and B are conductors of electricity.",
        "Both objects A and B are made of magnetic materials.",
        "Object A is made of steel while object B is made of copper."
        ],
        "answer": 1,
        "correct_answer": "Both objects A and B are conductors of electricity.",
        "explanation": "object B, which is collected first, is made of copper that is not attracted to the electromagnet. Object A, which is collected last, is made of steel that is attracted to the electromagnet."
    },
    {
        "id": "SCI851",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "remained undigested in each organ of his digestive system were measured. The graph below shows the change in the percentage of undigested food. Based on the above graph, which of the following statements is correct?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "Digestion of food A and B ends in organ T.",
        "Food A and B are not digested in organ P.",
        "Organ R digested more food A than organ S.",
        "Food B is not digested in organ Q of the digestive system."
        ],
        "answer": 0,
        "correct_answer": "Digestion of food A and B ends in organ T.",
        "explanation": "The graph shows that the percentage of undigested Food B does not change in organ Q. This means no digestion of Food B occurred in that specific organ."
    },
    {
        "id": "SCI852",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which one of the following shows the directions in which food and water are being transported to at positions X and Y? Direction of food at Direction of water at Position X Position Y Position X Position Y (1) ↑ ↑ ↓ ↓ (2) ↑ ↓ ↑ ↑ (3) ↓ ↑ ↓ ↑ (4) ↓ ↓ ↑ ↑",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "(1)",
        "(2)",
        "(3)",
        "(4)"
        ],
        "answer": 0,
        "correct_answer": "(1)",
        "explanation": "Food is transported upwards to the growing shoot (X) and downwards to the roots (Y) from the seed leaf. Water is absorbed by the roots and always transported upwards to all parts of the plant."
    },
    {
        "id": "SCI853",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "develop into a fruit. With the four flowers still growing on the plant, he removed some parts of each flower as shown below. Clyde dusted pollen grains over all the four flowers. Which of the above flower(s) would not develop into fruit(s)?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "Flower V only",
        "Flowers T and V",
        "Flowers U and W",
        "Flowers T, V and W"
        ],
        "answer": 0,
        "correct_answer": "Flower V only",
        "explanation": "Flowers T and V had their stigmas or ovaries removed, which are necessary for fertilization to occur. Without these female parts, a flower cannot develop into a fruit."
    },
    {
        "id": "SCI854",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following matches the fruit to its method of dispersal? Fruit J Fruit K Fruit L (1) animal wind water (2) water wind animal (3) wind splitting animal (4) animal splitting wind",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "(1)",
        "(2)",
        "(3)",
        "(4)"
        ],
        "answer": 0,
        "correct_answer": "(1)",
        "explanation": "Fruit J has hooks for animal dispersal, Fruit K has wing-like structures for wind dispersal, and Fruit L has a fibrous husk for water dispersal."
    },
    {
        "id": "SCI855",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following matches the parts to the description? Where fertilised egg develops into a Produces female reproductive cells baby (1) P R (2) S R (3) P Q (4) S Q",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "(1)",
        "(2)",
        "(3)",
        "(4)"
        ],
        "answer": 0,
        "correct_answer": "(1)",
        "explanation": "Part P (ovary) produces female reproductive cells (eggs), and part R (uterus) is where a fertilized egg develops into a baby."
    },
    {
        "id": "SCI856",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "inhaled and exhaled air of a human. What could gases E and F be? Gas E Gas F (1) carbon dioxide water vapour (2) carbon dioxide oxygen (3) oxygen carbon dioxide (4) water vapour carbon dioxide",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "(1)",
        "(2)",
        "(3)",
        "(4)"
        ],
        "answer": 0,
        "correct_answer": "(1)",
        "explanation": "Exhaled air contains more carbon dioxide (Gas E) and less oxygen (Gas F) than inhaled air. This is because the body uses oxygen for respiration and produces carbon dioxide as a waste product."
    },
    {
        "id": "SCI857",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Organism Characteristics P flowers are pollinated by wind Q catches prey at night Based on the characteristics that the organisms have in the table above, which of the following adaptations must organisms P and Q have to help them to survive? Organism P Organism Q (1) flowers are brightly-coloured has good night vision (2) flowers are dull-coloured has a long tail to balance itself (3) anthers of flowers hang out of the petals has good sense of hearing (4) flowers are either male or female has thick fur as body covering",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "(1)",
        "(2)",
        "(3)",
        "(4)"
        ],
        "answer": 0,
        "correct_answer": "(1)",
        "explanation": "Wind-pollinated flowers (P) usually have dull-coloured petals and anthers that hang out to catch the wind. Organism Q, which catches prey at night, needs a good sense of hearing or sight to locate prey in the dark."
    },
    {
        "id": "SCI858",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "A: Q is both a predator and prey. B: U is a food producer. C: S is a plant-and-animal-eater. D: T is a plant-eater. Which of the statements above are correct?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "A and B only",
        "A and D only",
        "B and C only",
        "C and D only"
        ],
        "answer": 0,
        "correct_answer": "A and B only",
        "explanation": "In the food web, S eats both a plant (producer) and an animal, making it a plant-and- animal-eater. T eats only producers, so it is a plant-eater."
    },
    {
        "id": "SCI859",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Based on the diagram above, which one of the following statements is correct?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "There are two populations of producers.",
        "There are five populations of consumers.",
        "There is one community with six populations.",
        "There is one community with eight populations."
        ],
        "answer": 0,
        "correct_answer": "There are two populations of producers.",
        "explanation": "The community is made up of 6 populations (butterfly, frog, water lily, water hyacinth, fish and arrowhead)"
    },
    {
        "id": "SCI860",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "observations when plant W is grown under different amount of light. Which set of graphs matches with the observations of plant W above?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4"
        ],
        "answer": 1,
        "correct_answer": "Option 2",
        "explanation": "When there is more light, plant W grows shorter but has more leaves. Graph 2 correctly shows the number of leaves increasing and the height decreasing as light units increase."
    },
    {
        "id": "SCI861",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which one of the following correctly represents A, B, C and D? A B C D (1) burning fossil fuels soil erosion deforestation greenhouse effect (2) deforestation burning fossil fuels global warming greenhouse effect (3) burning fossil fuels deforestation greenhouse effect global warming (4) deforestation soil erosion burning fossil fuels global warming",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "(1)",
        "(2)",
        "(3)",
        "(4)"
        ],
        "answer": 0,
        "correct_answer": "(1)",
        "explanation": "Only through deforestation will soil erosion be caused as there are less roots from trees to hold the soil from rain"
    },
    {
        "id": "SCI862",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "D, before placing them into a container of water. The objects were taken out after 10 minutes and their mass were measured again. She recorded the results in the table below. Mass after 10 minutes in Materials Mass at the start (g) water (g) A 20 50 B 20 25 C 20 55 D 20 20 Study the picture of a diaper below. Which of the materials, A, B, C or D are the most suitable to make parts X and Y of the diaper? Part X Part Y (1) B C (2) A B (3) C D (4) D C",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "Part",
        "Part Y",
        "X",
        "B C"
        ],
        "answer": 0,
        "correct_answer": "Part",
        "explanation": "Part X (inner layer) needs to absorb liquid, so material C (which gained the most mass) is best. Part Y (outer layer) must be waterproof to prevent leaks, so material D (which gained no mass) is most suitable."
    },
    {
        "id": "SCI863",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "diagram below. After another 300cm3 of air is pumped into all flasks, which of the following correctly shows the final volume of air inside the flasks? flask X (cm3) flask Y (cm3) flask Z (cm3) (1) 800 700 500 (2) 600 500 400 (3) 500 400 200 (4) 500 400 600",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "(1)",
        "(2)",
        "(3)",
        "(4)"
        ],
        "answer": 0,
        "correct_answer": "(1)",
        "explanation": "Air can be compressed, so it will always fill the available space in the flasks. Flask X has 500cm3 of space, Y has 400cm3 (500 minus the 100 cube), and Z has 200cm3 (500 minus 300 water)."
    },
    {
        "id": "SCI864",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "over a period of time. Substance A has a melting point at 28°C and boiling point at 317°C. Which statement about substance A is not correct?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "At 50°C, substance A is in liquid state.",
        "At point P, substance A is in solid and liquid state.",
        "At point Q, substance A is in solid and liquid state.",
        "At point R, substance A is in liquid and gaseous state."
        ],
        "answer": 0,
        "correct_answer": "At 50°C, substance A is in liquid state.",
        "explanation": "At point Q, the temperature is increasing after the melting process is complete, so the substance is only in a liquid state."
    },
    {
        "id": "SCI865",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "ice. The arrows, A, B, C and D, below represent different processes. Which of the following is correct? State of mist Process that forms the mist (1) gas B (2) liquid C (3) liquid A (4) solid D",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "(1)",
        "(2)",
        "(3)",
        "(4)"
        ],
        "answer": 0,
        "correct_answer": "(1)",
        "explanation": "White mist is made of tiny liquid water droplets. It forms when warm water vapour in the air touches the cold surface above the ice and undergoes condensation (Process C)."
    },
    {
        "id": "SCI866",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "components are in working condition. In which circuit(s) will a bulb light up?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "A only",
        "B and C only",
        "A and C only",
        "none of the above"
        ],
        "answer": 1,
        "correct_answer": "B and C only",
        "explanation": "In circuits A and C, the last bulb will light up as it is connected correctly."
    },
    {
        "id": "SCI867",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "shown in the diagram below. The blocks were of similar size. The ice cubes were placed at room temperature and after 30 minutes, {CHARACTER_0} observed that the ice cube on material Y was smaller. Which of the following is correct about materials X and Y?",
        "diagram": None,
        "placeholder_roles": ['protagonist'],
        "options": [
        "Material Y loses heat slower to the ice than X.",
        "Material X gains heat from the ice faster than Y.",
        "Material X should be used to keep cold items cool.",
        "Material Y should be used to keep hot items warm."
        ],
        "answer": 0,
        "correct_answer": "Material Y loses heat slower to the ice than X.",
        "explanation": "Material X kept the ice cube larger, meaning it is a poor conductor of heat. Poor conductors are best for keeping cold items cool by slowing down heat gain from the surroundings."
    },
    {
        "id": "SCI868",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "There were four bar magnets. A compass was placed near end P and the direction of the compass needle was as shown below. What would be the direction of the needle when the compass was placed at Q?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4"
        ],
        "answer": 0,
        "correct_answer": "Option 1",
        "explanation": "The end near the original compass is a S pole due to the magnetic field direction shown on the compass. Following the magnetic orientations, the end nearest to Q is a S pole, hence compass needle at Q will point in the direction shown in option 1."
    },
    {
        "id": "SCI869",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "If one bulb fuses, what is the least and most number of bulb(s) remaining lit? Least Most (1) 1 2 (2) 2 2 (3) 0 0 (4) 0 3",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "(1)",
        "(2)",
        "(3)",
        "(4)"
        ],
        "answer": 1,
        "correct_answer": "(2)",
        "explanation": "If bulb P or S fuses, the circuit breaks and 0 bulbs remain lit. If bulb Q or R fuses, the electricity can still flow through the other parallel branch, leaving 3 bulbs lit."
    },
    {
        "id": "SCI870",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "line from A to C and back from C to B as shown below. Which graph shows how the length of his shadow changed during this time?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "5/27/26, 4:35 PM P6 打卡营 科学 MCQ W4D3-2",
        "Option 2",
        "Option 3",
        "Option 4"
        ],
        "answer": 0,
        "correct_answer": "5/27/26, 4:35 PM P6 打卡营 科学 MCQ W4D3-2",
        "explanation": "When directly under the lamp (A), the shadow is shortest. As John walks away to C, the shadow gets longer, and as he walks back to B, it shortens again."
    },
    {
        "id": "SCI871",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "coconuts had fallen from a tree and landed on the sand. Based on the diagram above, which of the following statements is correct?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "Coconut X has the least amount of gravitational force acting on it since it is on the",
        "ground.",
        "5/27/26, 4:35 PM P6 打卡营 科学 MCQ W4D3-2",
        "Coconut X does not possess any gravitational potential energy as it was lying on the"
        ],
        "answer": 1,
        "correct_answer": "ground.",
        "explanation": "Gravitational potential energy depends on height. Since coconut X is on the ground (zero height), it does not possess any gravitational potential energy."
    },
    {
        "id": "SCI872",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "on the springs, the results are as shown. Which graph shows the relationship between the mass hung on the spring and the length of springs, M and N?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "5/27/26, 4:35 PM P6 打卡营 科学 MCQ W4D3-2",
        "Option 2",
        "Option 3",
        "Option 4"
        ],
        "answer": 0,
        "correct_answer": "5/27/26, 4:35 PM P6 打卡营 科学 MCQ W4D3-2",
        "explanation": "Both springs stretched to the same length (10 cm). Spring M is stiffer as it needs 400g to be stretched to 10cm while spring N is less stiff as it needs only 200g to be stretched to 10cm. Graph 1 correctly shows both springs starting from the same original length and correct degree of extension as more mass is added."
    },
    {
        "id": "SCI873",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "position B and reached position C as shown in diagram 1. From position C, the ball swung back to position B as shown in diagram 2. Which of the following about the energy in the ball is correct? Potential energy at position A Kinetic energy at position B in diagram 2 compared to position C as compared to diagram 1 (1) less more (2) less less (3) more less (4) more more",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "(1)",
        "(2)",
        "(3)",
        "(4)"
        ],
        "answer": 1,
        "correct_answer": "(2)",
        "explanation": "Position A is higher than C, so the ball has more potential energy at A. As it swings, there is air resistance, thus loses energy, so the kinetic energy at B will be less in the second swing."
    },
    {
        "id": "SCI874",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "across different types of materials. His results were as shown: Material Fore needed (units) A 5.5 B 2.5 C 7.5 Ethan wanted to push a box onto the stage using a ramp as shown in the diagram below. Based on the above results, which material is most suitable for making the sole of his shoes and the surface of the ramp? Sole of shoe Surface of ramp (1) material B material B (2) material B material C (3) material C material A (4) material C material B",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "(1)",
        "(2)",
        "(3)",
        "(4)"
        ],
        "answer": 0,
        "correct_answer": "(1)",
        "explanation": "The sole of a shoe needs high friction (Material C) to prevent slipping. The surface of a ramp should have low friction (Material B) so the box can be pushed up easily."
    },
]

# Load existing data
with open('data/questions-science-p6.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Extend questions
data.extend(new_questions)

# Save
with open('data/questions-science-p6.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"✓ Added {len(new_questions)} questions for W4D3")
