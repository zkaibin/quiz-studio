import json

new_questions = [
  {
    "id": "SCI959",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "The table below shows the characteristics of four organisms, A, B, C and D. A tick (✓) represents the presence of the characteristic.\n\nOrganisms\nCharacteristics | A | B | C | D\nHas fur | ✓ | | |\nLays eggs | ✓ | ✓ | ✓ | ✓\nBreathes through lungs | ✓ | ✓ | | ✓\nLives on land and in water | | ✓ | | \n\nStudy the following statements.\nA: Organism A is not a mammal.\nB: Organism B is an amphibian.\nC: Organism C is a reptile.\nD: Organism D is a bird.\n\nWhich statement(s) is/are true?",
    "diagram": None,
    "placeholder_roles": None,
    "options": [
      "D only",
      "C and D only",
      "B and C only",
      "A, B and C only"
    ],
    "answer": 0,
    "correct_answer": "A",
    "explanation": "(A) is a mammal as it has fur, even though it lays eggs. (B) is not an amphibian as it cannot live on both land and water. (C) does not breathe through its lungs, hence it cannot be a reptile. Birds (D) are animals that have feathers, breathe through lungs and live on land."
  },
  {
    "id": "SCI960",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "Study the following statements. G and H are organisms.\nG produces fruits while H does not.\nG makes its own food while H does not.\nWhat could G and H be?",
    "diagram": None,
    "placeholder_roles": None,
    "options": [
      "G: fern, H: flowering plant",
      "G: fern, H: fungi",
      "G: flowering plant, H: fern",
      "G: flowering plant, H: fungi"
    ],
    "answer": 3,
    "correct_answer": "D",
    "explanation": "Flowering plants produce fruits and make their own food. Fungi do not make their own food and do not produce fruits. Therefore, G is a flowering plant and H is fungi."
  },
  {
    "id": "SCI961",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "The following diagram shows the human reproduction process.\nWhich of the following contain(s) the characteristics of both parent A and parent B?",
    "diagram": None,
    "placeholder_roles": None,
    "options": [
      "W only",
      "Z only",
      "Y and Z only",
      "W and X only"
    ],
    "answer": 2,
    "correct_answer": "C",
    "explanation": "During human reproduction, the egg (cell W) and sperm (cell X) fuse to form a zygote (Y), which then develops into a fetus (Z). Both the zygote and the fetus contain genetic material (characteristics) from both parents."
  },
  {
    "id": "SCI962",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "The diagram below shows how substances are transported in the human body.\nWhat do systems F, G and H represent and what are the substances J and K?",
    "diagram": None,
    "placeholder_roles": None,
    "options": [
      "F: circulatory, G: respiratory, H: digestive, J: oxygen, K: carbon dioxide",
      "F: respiratory, G: circulatory, H: digestive, J: carbon dioxide, K: digested food",
      "F: digestive, G: respiratory, H: circulatory, J: digested food, K: carbon dioxide",
      "F: respiratory, G: digestive, H: circulatory, J: carbon dioxide, K: digested food"
    ],
    "answer": 1,
    "correct_answer": "B",
    "explanation": "System F is the respiratory system which takes in oxygen and releases carbon dioxide (Substance J). System G is the circulatory system that transports these gases and digested food (Substance K) from the digestive system (System H) to all parts of the body."
  },
  {
    "id": "SCI963",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "{CHARACTER_0} set up the following experiments as shown below and left them by an open window for five days.\nShe recorded her observations in the table below.\n\nSet-up | Day 1 | Day 2 | Day 3 | Day 4 | Day 5\nC: 500 | 500 | 500 | 500 | 500\nD: 500 | 495 | 487 | 480 | 474\n\nWhat is the aim of {CHARACTER_0}'s experiment?",
    "diagram": None,
    "placeholder_roles": ["protagonist"],
    "options": [
      "To find out if water evaporates.",
      "To find out if roots take in water.",
      "To find out if stems support the plant.",
      "To find out if number of leaves affects water uptake in plants."
    ],
    "answer": 1,
    "correct_answer": "B",
    "explanation": "In set-up D, the water level decreased because the roots were able to absorb water. In set-up C, the roots were enclosed in a plastic bag, preventing them from taking in water, which resulted in the water level remaining constant."
  },
  {
    "id": "SCI964",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "The picture shows a man pushing a box across the floor.\nWhich of the following makes it difficult for the man to push the box?\nA: The mass of the box.\nB: The force the man used to push the box.\nC: The friction between the box and the floor.\nD: The friction between the man's feet and the floor.",
    "diagram": None,
    "placeholder_roles": None,
    "options": [
      "A and B only",
      "A and C only",
      "B and D only",
      "A and D only"
    ],
    "answer": 1,
    "correct_answer": "B",
    "explanation": "A heavier box is more difficult to push. Increased friction between the box and floor results in more force required to move the box."
  },
  {
    "id": "SCI965",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "The diagram below shows a food web.\nWhich of the following, R, S, T, U, W and X, represents a producer, plant-eater and predator?",
    "diagram": None,
    "placeholder_roles": None,
    "options": [
      "Producer: R, Plant-eater: S, U, W, Predator: T, X",
      "Producer: U, Plant-eater: W, Predator: S",
      "Producer: U, Plant-eater: S, W, Predator: R, T, X",
      "Producer: R, Plant-eater: S, U, Predator: W, T, X"
    ],
    "answer": 0,
    "correct_answer": "A",
    "explanation": "In the food web, R is the producer because it does not feed on any other organism. S and U are plant-eaters as they eat R, while W, T, and X are predators that hunt and eat other animals."
  },
  {
    "id": "SCI966",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "Animal L is shown below. It is brown in colour and found in a hot desert.\nWhat is/are possible reason(s) why animal L is usually found burrowing in the sand in the desert?\nA: To keep itself cool\nB: To hide from its predators\nC: To absorb more heat from the sand",
    "diagram": None,
    "placeholder_roles": None,
    "options": [
      "C only",
      "A and B only",
      "B and C only",
      "A, B and C only"
    ],
    "answer": 1,
    "correct_answer": "B",
    "explanation": "Burrowing is a behavioral adaptation that helps desert animals avoid the intense surface heat and keep cool (A). It also provides a safe place to hide from predators (B)."
  },
  {
    "id": "SCI967",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "{CHARACTER_0} placed potted plant Y in a jar next to a window and recorded her observation over a period of time.\nShe then plotted the graph below.\nBased on {CHARACTER_0}'s experiment and results, what does variable X represent?",
    "diagram": None,
    "placeholder_roles": ["protagonist"],
    "options": [
      "Amount of nitrogen taken in by plant Y",
      "Amount of oxygen produced by plant Y",
      "Amount of water vapour taken in by plant Y",
      "Amount of carbon dioxide taken in by plant Y"
    ],
    "answer": 1,
    "correct_answer": "B",
    "explanation": "Variable X increases significantly after 6 a.m. when sunlight becomes available. This represents the amount of oxygen produced, as the plant begins to photosynthesize more rapidly in the presence of light."
  },
  {
    "id": "SCI968",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "{CHARACTER_0} placed four similar set-ups at four different locations, A, B, C and D. For each location, only the intensity of the light was different.\nThe table below shows the light intensity at the four locations.\nWhich of the following correctly shows the amount of oxygen produced (cm³) by the green water plant at locations A, B, C and D?",
    "diagram": None,
    "placeholder_roles": ["protagonist"],
    "options": [
      "A: 2, B: 5, C: 6, D: 10",
      "A: 10, B: 8, C: 5, D: 2",
      "A: 8, B: 10, C: 5, D: 2",
      "A: 5, B: 2, C: 8, D: 10"
    ],
    "answer": 2,
    "correct_answer": "C",
    "explanation": "Photosynthesis rate increases with light intensity, leading to more oxygen production. Location B is the brightest and produces the most oxygen (10cm³), while D is the dimmest and produces the least (2cm³)."
  },
  {
    "id": "SCI969",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "{CHARACTER_0} placed Material X into a tub of water as shown below.\nShe recorded the volume of water before and after Material X was placed into the water.\nShe repeated the experiment with Material Y, of the same shape and size, and recorded her results in the table below.\n\nVolume of water at the start (cm³) | Volume of water at the end (cm³)\nMaterial X: 100 | 55\nMaterial Y: 100 | 30\n\nWhich of the following is correct?",
    "diagram": None,
    "placeholder_roles": ["protagonist"],
    "options": [
      "Material X is waterproof.",
      "Material Y is more absorbent than Material X.",
      "Material X is more suitable to be used as a towel than Material Y.",
      "Material Y is more suitable to be used as a raincoat than Material X."
    ],
    "answer": 1,
    "correct_answer": "B",
    "explanation": "Material Y is more absorbent because the volume of water remaining in the tub decreased more (to 30cm³) compared to Material X (to 55cm³). This indicates Material Y soaked up more water."
  },
  {
    "id": "SCI970",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "Study the diagram of the water cycle below.\nWhich of the following is correct?",
    "diagram": None,
    "placeholder_roles": None,
    "options": [
      "Process G: heat is gained, Process H: heat is lost",
      "Process G: heat is gained, Process H: heat is gained",
      "Process G: heat is lost, Process H: heat is gained",
      "Process G: heat is lost, Process H: heat is lost"
    ],
    "answer": 2,
    "correct_answer": "C",
    "explanation": "In Process H (evaporation), liquid water gains heat from the sun to become water vapor. In Process G (condensation), water vapor loses heat to the cooler atmosphere to form clouds."
  },
  {
    "id": "SCI971",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "Three conical flasks, P, Q and R, with volume of 200cm³ each are connected to an air pump as shown below.\nEach time the handle is pushed down, 20cm³ of air is pumped into each conical flask. The set-up is designed such that the air cannot flow backwards.\nWhat is the final volume of air in each conical flask if the handle is pushed down once?",
    "diagram": None,
    "placeholder_roles": None,
    "options": [
      "Flask P: 200, Flask Q: 150, Flask R: 100",
      "Flask P: 200, Flask Q: 170, Flask R: 120",
      "Flask P: 220, Flask Q: 170, Flask R: 100",
      "Flask P: 220, Flask Q: 150, Flask R: 120"
    ],
    "answer": 0,
    "correct_answer": "A",
    "explanation": "Air has no definite volume and can be compressed. Despite pumping more air in, the volume of air in each flask remains the same as the available space: 200cm³ in P, 150cm³ in Q (minus 50cm³ water), and 100cm³ in R (minus 50cm³ water and 50cm³ block)."
  },
  {
    "id": "SCI972",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "Study the four circuits below. All the batteries and bulbs in the four circuits are identical and in working condition.\nWhich of the following shows the correct order of bulbs K, L, M, and N, when arranged from the dimmest to the brightest?",
    "diagram": None,
    "placeholder_roles": None,
    "options": [
      "K, L, M, N",
      "L, K, N, M",
      "M, N, L, K",
      "N, M, K, L"
    ],
    "answer": 1,
    "correct_answer": "B",
    "explanation": "Bulb brightness depends on the amount of current. For Circuit L, there are three bulbs sharing the energy from the battery, so L is the dimmest. For Circuit K, there are two bulbs sharing the energy from the battery, so K is brighter than L. For Circuit N, there are more batteries than K, with two bulbs sharing the energy, so N is brighter than K. For Circuit M, there is only one bulb in the circuit, so it gets the most electrical energy and is the brightest. Therefore, from the dimmest to the brightest: L, K, N, M"
  },
  {
    "id": "SCI973",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "The diagram shows a circuit with four open switches.\nWhich of the following will allow the buzzer to sound without any light bulbs lighting up?",
    "diagram": None,
    "placeholder_roles": None,
    "options": [
      "S1: closed, S2: closed, S3: open, S4: closed",
      "S1: open, S2: closed, S3: open, S4: closed",
      "S1: open, S2: open, S3: closed, S4: closed",
      "S1: closed, S2: open, S3: closed, S4: open"
    ],
    "answer": 3,
    "correct_answer": "D",
    "explanation": "To sound the buzzer without lighting the bulbs, S2 and S4 must be opened as they are in the same branch as the bulbs. S1 and S3 must be closed to complete the circuit."
  },
  {
    "id": "SCI974",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "Four students set up made use of a circuit tester to test two circuit cards.\nThe circuit cards have five points, A, B, C, D and E. Wires are connected to them as shown below.\nThe four students recorded their results in the table below.\n\nPoints | Circuit card 1 | Circuit card 2\nStudent 1: A and E | bulb did not light up | bulb lit up\nStudent 2: A and D | bulb lit up | bulb did not light up\nStudent 3: B and C | bulb did not light up | bulb did not light up\nStudent 4: B and D | bulb did not light up | bulb did not light up\n\nWho made the correct observation?",
    "diagram": None,
    "placeholder_roles": None,
    "options": [
      "Student 1",
      "Student 2",
      "Student 3",
      "Student 4"
    ],
    "answer": 0,
    "correct_answer": "A",
    "explanation": "For a bulb to light up, the circuit must be closed. For a bulb to not light up, the circuit must be open. Student 2 is wrong as the bulb in circuit 2 will light up. Student 3 is wrong as the bulb in circuit 1 will light up. Student 4 is wrong as the bulb in circuit 1 will light up."
  },
  {
    "id": "SCI975",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "Rods P and Q of similar masses were hung by a string each on the ceiling. When {CHARACTER_0} brought rod P closer to rod Q, Q moved towards P.\nWhich conclusion about P and Q is correct?",
    "diagram": None,
    "placeholder_roles": ["protagonist"],
    "options": [
      "P: magnet, Q: steel",
      "P: magnet, Q: aluminium",
      "P: copper, Q: magnet",
      "P: iron, Q: steel"
    ],
    "answer": 0,
    "correct_answer": "A",
    "explanation": "Since Rod Q moved towards P, there is a force of attraction. This is possible if P is a magnet and Q is a magnetic material like steel, which is always attracted to magnets."
  },
  {
    "id": "SCI976",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "{CHARACTER_0} pushed a wooden block down a slope. The wooden block moved down the slope and stopped at W.\nWhich force(s) acted on the wooden block?",
    "diagram": None,
    "placeholder_roles": ["protagonist"],
    "options": [
      "Frictional force: no, Gravitational force: yes",
      "Frictional force: no, Gravitational force: no",
      "Frictional force: yes, Gravitational force: yes",
      "Frictional force: yes, Gravitational force: no"
    ],
    "answer": 2,
    "correct_answer": "C",
    "explanation": "As the block moves down the slope, gravitational force pulls it downwards. Frictional force acts between the surface of the block and the slope in the opposite direction of its motion."
  },
  {
    "id": "SCI977",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "Look at the set-up below. {CHARACTER_0} hung a magnet at the end of the spring. The length of the spring was 5 cm before he closed the switch.\n\nExperiment | Number of batteries used | Direction magnet moved | Length of spring after switch was closed (cm)\nA: 1 | upward | 4\nB: 1 | downward | 6\nC: 2 | upward | 3\nD: 2 | downward | 7\n\nWhich two experiments support the hypothesis: \"When the number of batteries used increases, the poles of the electromagnet will remain unchanged.\"?",
    "diagram": None,
    "placeholder_roles": ["protagonist"],
    "options": [
      "A and B",
      "A and D",
      "B and C",
      "B and D"
    ],
    "answer": 3,
    "correct_answer": "D",
    "explanation": "In both experiments B and D, the magnet moved downward, showing the electromagnet's pole remained the same. The increased distance in D (7cm vs 6cm) shows the electromagnet became stronger with two batteries."
  },
  {
    "id": "SCI978",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "{CHARACTER_0} placed four different materials in a straight line as shown below.\nMaterial A has a hole cut out in the middle. {CHARACTER_0} switched on the torch and placed it in front of material A, a spot of light was observed on material C, but not materials B and D.\nWhich of the following can be concluded from his experiment?\nP: Material A allows no light to pass through it.\nQ: Material B allows most light to pass through it.\nR: Material C allows the most light to pass through it.\nS: Material D allows no light to pass through it.",
    "diagram": None,
    "placeholder_roles": ["protagonist"],
    "options": [
      "P and Q only",
      "P and R only",
      "Q and R only",
      "R and S only"
    ],
    "answer": 3,
    "correct_answer": "D",
    "explanation": "Since light was seen on C, Material B must be transparent while Material A is opaque and only allows light through the hole."
  },
  {
    "id": "SCI979",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "{CHARACTER_0} placed an ice cube each into boxes made of material S and T. After 30 minutes, he measured the volume of water collected in each box. His results are shown in the graph below.\n{CHARACTER_0} wants to pack hot food and cold drinks using two containers. Which material should he choose to keep the food hot and the drinks cold for the longest period of time?",
    "diagram": None,
    "placeholder_roles": ["protagonist"],
    "options": [
      "Hot food: S, Cold drinks: T",
      "Hot food: S, Cold drinks: S",
      "Hot food: T, Cold drinks: T",
      "Hot food: T, Cold drinks: S"
    ],
    "answer": 1,
    "correct_answer": "B",
    "explanation": "Material S is a poorer conductor of heat than T because less ice melted in box S over the same time. Therefore, S is better for both keeping food hot (losing heat slowly) and drinks cold (gaining heat slowly)."
  }
]

with open('data/questions-science-p6.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

data.extend(new_questions)

with open('data/questions-science-p6.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Added {len(new_questions)} W5D2 questions (SCI959-SCI979)")
