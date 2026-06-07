import json

new_questions = [
    {
        "id": "SCI931",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The table shows some characteristics of four animals. A tick (✓) represents the presence of the characteristic.\n\nCharacteristic | Animal A | Animal B | Animal C | Animal D\n--- | --- | --- | --- | ---\nHave scales | ✓ | | ✓ |\nLays eggs | ✓ | ✓ | | ✓\nHave wings | | | ✓ |\nHave hair | | | ✓ | ✓\n\nBased on the information above, which animal is most likely a mammal?",
        "diagram": None,
        "placeholder_roles": None,
        "options": ["A", "B", "C", "D"],
        "answer": 3,
        "correct_answer": "D",
        "explanation": "A mammal typically has hair and most give birth to live young (though some lay eggs). Animal D has hair and does not lay eggs, making it the most likely mammal."
    },
    {
        "id": "SCI932",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The diagram shows how some organisms (not drawn to scale) are grouped.\n\nGroup E: Bread mould, Mushroom\nGroup F: Tree fern, Lily plant\n\nWhich of the following statement(s) about the two groups of organisms is/are correct?\n\nA: The organisms in groups E and F are flowering plants.\nB: The organisms in group F contain chlorophyll but not those in group E.\nC: The organisms in group E reproduced by spores but those in group F reproduce by seeds.",
        "diagram": None,
        "placeholder_roles": None,
        "options": ["B only", "C only", "A and B only", "B and C only"],
        "answer": 3,
        "correct_answer": "B and C only",
        "explanation": "Group F organisms (Tree fern and Lily plant) contain chlorophyll because they are green plants that make their own food. Organisms in group E (Bread mould and Mushroom) are fungi and do not contain chlorophyll."
    },
    {
        "id": "SCI933",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Identical number of seeds of the same type were placed in four set-ups, K, L, M and N. The seeds were exposed to different conditions as shown in the diagrams.\n\nIn which set-up(s) will the seeds most likely germinate after a week?",
        "diagram": None,
        "placeholder_roles": None,
        "options": ["M only", "K and L only", "L and M only", "L, M and N only"],
        "answer": 2,
        "correct_answer": "L and M only",
        "explanation": "Seeds require warmth, water, and oxygen to germinate. Set-ups L and M provide these conditions, while K lacks water and N lacks warmth."
    },
    {
        "id": "SCI934",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The graph shows the duration of each stage of the life cycle of an organism.\n\nUsing the information from the graph above, at which stage of development will the organism be on the 6th day after it has hatched?",
        "diagram": None,
        "placeholder_roles": None,
        "options": ["Egg", "Larva", "Pupa", "Adult"],
        "answer": 2,
        "correct_answer": "Pupa",
        "explanation": "Six days after hatching (egg stage), it will be in the pupa stage."
    },
    {
        "id": "SCI935",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following traits are inherited?\n\nA: Hair length\nB: Eye colour\nC: Tongue rolling\nD: Shape of earlobes",
        "diagram": None,
        "placeholder_roles": None,
        "options": ["A, B and C only", "A, C and D only", "B, C and D only", "A, B, C and D"],
        "answer": 2,
        "correct_answer": "B, C and D only",
        "explanation": "Traits like eye colour, tongue rolling, and shape of earlobes are genetic characteristics passed from parents to offspring. Hair length is an acquired trait influenced by personal choice or environment."
    },
    {
        "id": "SCI936",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The diagram below shows the changes in the development of a plant.\n\nWhich of the following shows the correct process(es) that occurred at P and Q?\n\n| | Process(es) at P | Process(es) at Q |\n|---|---|---|\n| (1) | germination only | dispersal only |\n| (2) | pollination only | germination only |\n| (3) | dispersal and pollination | pollination and fertilisation |\n| (4) | pollination and fertilisation | dispersal |",
        "diagram": None,
        "placeholder_roles": None,
        "options": ["(1)", "(2)", "(3)", "(4)"],
        "answer": 3,
        "correct_answer": "(4)",
        "explanation": "Process P represents pollination and fertilisation, where pollen is transferred and fuses with the egg to form a seed. Process Q represents dispersal and germination, where seeds are spread and grow into new plants."
    },
    {
        "id": "SCI937",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The graph shows the volume of undigested food in organs, A, B and C in a human digestive system.\n\nBased on the information above, which of the following statements is correct?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "No digestion occurred in organ C.",
            "Most food was digested in organ A.",
            "All the organs, A, B and C, release digestive juices.",
            "More digested food was absorbed in organ A than in organ B."
        ],
        "answer": 2,
        "correct_answer": "All the organs, A, B and C, release digestive juices.",
        "explanation": "In the human digestive system, the mouth (A), stomach (B), and small intestine (C) all release digestive juices to break down food. The decrease in the volume of undigested food leaving each organ indicates digestion is occurring."
    },
    {
        "id": "SCI938",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "{CHARACTER_0} cut away the outer rings of a plant at parts X and Y as shown. {CHARACTER_0} placed the plant under well-lit condition and watered it daily. After a few days, {CHARACTER_0} noticed that leaf Q withered while leaf P survived.\n\nWhich of the following shows the tube(s) that has/have been removed at parts X and Y?\n\n| | Part X | Part Y |\n|---|---|---|\n| (1) | water-carrying tubes | food-carrying tubes |\n| (2) | food-carrying tubes | food-carrying tubes and water-carrying tubes |\n| (3) | water-carrying tubes | food-carrying tubes and water-carrying tubes |\n| (4) | water-carrying tubes | water-carrying tubes |",
        "diagram": None,
        "placeholder_roles": ["protagonist"],
        "options": ["(1)", "(2)", "(3)", "(4)"],
        "answer": 3,
        "correct_answer": "(4)",
        "explanation": "Leaf Q withered because its water supply was cut off, indicating water-carrying tubes were removed at part Y. Leaf P survived because its water-carrying tubes were intact at part X, though food-carrying tubes may have been removed."
    },
    {
        "id": "SCI939",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The diagram shows two iron cylinders, A and B, heated to 100°C.\n\nWhich of the following is correct?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "Cylinder A is hotter than cylinder B.",
            "Cylinder A has less heat energy than Cylinder B.",
            "Both cylinders have the same amount of heat energy.",
            "Both cylinders will take the same amount of time to reach room temperature."
        ],
        "answer": 1,
        "correct_answer": "Cylinder A has less heat energy than Cylinder B.",
        "explanation": "While Cylinder A and Cylinder B are at the same temperature, since the volume of A is smaller than B, A has less heat energy than B."
    },
    {
        "id": "SCI940",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Study the diagram carefully.\n\nBased on the information, which of the following statements is correct?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "There are three populations of animals.",
            "The tadpoles and the frogs form one community.",
            "The populations of plants are more than that of animals.",
            "Two populations of animals have adults that live on both land and water."
        ],
        "answer": 0,
        "correct_answer": "There are three populations of animals.",
        "explanation": "There are three populations of animals shown: caterpillars/butterflies, frogs/tadpoles, and fish."
    },
    {
        "id": "SCI941",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The graph shows the change in the area covered by plant P in a certain habitat.\n\nWhich of the following caused the change in the area covered by plant P from week 3 onwards?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "There was a fire in the habitat.",
            "There was no rainfall for four weeks in the habitat.",
            "Another population of plant was introduced into the habitat.",
            "Some animals that feed on plant P migrated to another habitat."
        ],
        "answer": 3,
        "correct_answer": "Some animals that feed on plant P migrated to another habitat.",
        "explanation": "The area covered by plant P increased from week 3, suggesting a decrease in consumers. This occurs if animals that feed on plant P migrate away, allowing the plant to reproduce and spread more rapidly."
    },
    {
        "id": "SCI942",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "An experiment was carried out to observe the relationship amongst three types of organisms X, Y and Z. Organisms X and Y were placed in tank 1 and organisms Y and Z were placed in tank 2. They were given the same volume of water every day but no food.\n\nAfter three days, the following observations were made:\n\n| Tank | X | Y | Z |\n|---|---|---|---|\n| 1 | decreased | increased | - |\n| 2 | - | decreased | increased |\n\nBased on the information, which of the following food chains most likely shows the relationship among the organisms?",
        "diagram": None,
        "placeholder_roles": None,
        "options": ["X → Y → Z", "X → Z → Y", "Y → X → Z", "Z → Y → X"],
        "answer": 0,
        "correct_answer": "X → Y → Z",
        "explanation": "Population Y increased in Tank 1 when placed with X, meaning Y eats X. Population Z increased in Tank 2 when placed with Y, meaning Z eats Y."
    },
    {
        "id": "SCI943",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "{CHARACTER_0} set up the experiment as shown to study three types of soil, A, B and C. {CHARACTER_0} poured 100ml of water into a funnel containing soil A. {CHARACTER_0} recorded the time taken for 20ml of water to be collected in the measuring cylinder. {CHARACTER_0} repeated the experiment with equal amounts of soil B, followed by soil C.\n\n| Type of soil | A | B | C |\n|---|---|---|---|\n| Time taken to collect 20ml of water (s) | 20 | 120 | 75 |\n\nBased on the information, which of the following statements is correct?",
        "diagram": None,
        "placeholder_roles": ["protagonist"],
        "options": [
            "Soil B retains more water than soil C.",
            "Soil B is made up of the largest soil particles.",
            "Soil C allows water to pass through faster than soil A.",
            "Soil A has the least amount of air spaces between the soil particles."
        ],
        "answer": 0,
        "correct_answer": "Soil B retains more water than soil C.",
        "explanation": "Soil B took the longest time (120s) for 20ml of water to be collected, meaning it has the smallest air spaces and holds water best. Soil A allowed water to pass through the fastest, indicating larger particles and more air spaces."
    },
    {
        "id": "SCI944",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The diagram shows a type of caterpillar which releases nectar-like substance. This nectar-like substance is not only nutritious but can also tame fierce ants P. It moves slowly and only feeds on leaves.\n\nAnts P taste bitter and are poisonous when eaten. They can be found swarming all over the caterpillar drinking the nectar-like substance. They do not feed on the caterpillar.\n\nWhich of the following statements is correct?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "The caterpillar moves slowly to attract mates.",
            "The nectar-like substance attracts the caterpillar's prey to feed on it.",
            "The caterpillar moves slowly to reduce the chance of being captured by predators.",
            "The nectar-like substance attracts ants P to cover the caterpillar's body to protect it from predators."
        ],
        "answer": 3,
        "correct_answer": "The nectar-like substance attracts ants P to cover the caterpillar's body to protect it from predators.",
        "explanation": "The nectar-like substance attracts fierce Ants P, which stay on the caterpillar. Since these ants are poisonous and bitter, their presence protects the slow-moving caterpillar from other predators."
    },
    {
        "id": "SCI945",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following statements about deforestation is/are correct?\n\nA: It can result in soil erosion.\nB: It can result in a drop in sea level.\nC: It can reduce rainfall in the deforested areas.\nD: It can lead to a decrease in greenhouse gases in the environment.",
        "diagram": None,
        "placeholder_roles": None,
        "options": ["B only", "A and C only", "B and D only", "A, C and D only"],
        "answer": 1,
        "correct_answer": "A and C only",
        "explanation": "Deforestation removes trees whose roots hold soil in place, leading to erosion (A). It also reduces transpiration, which can lead to less rainfall (C) in the area."
    },
    {
        "id": "SCI946",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "{CHARACTER_0} wanted to find out if the presence of light affects the growth of a plant.\n\nWhich of the following set-ups should {CHARACTER_0} use to conduct the experiment?",
        "diagram": None,
        "placeholder_roles": ["protagonist"],
        "options": ["A and C only", "A and D only", "B and C only", "B and D only"],
        "answer": 1,
        "correct_answer": "A and D only",
        "explanation": "To test if light affects growth, {CHARACTER_0} needs one set-up that blocks light (A - black paper) and one that allows light (D - glass). Both set-ups must have the same number of plants and wet soil to be a fair test."
    },
    {
        "id": "SCI947",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following is a test for flexibility of an object?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "Pulling on an object until it breaks",
            "Bending an object to see if it breaks",
            "Putting the object in water to see if it sinks",
            "Shining a light through the object to see how much light passes through it"
        ],
        "answer": 1,
        "correct_answer": "Bending an object to see if it breaks",
        "explanation": "Flexibility is the ability of a material to bend without breaking. Bending an object to see if it breaks is a direct test of this property."
    },
    {
        "id": "SCI948",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following is not matter?",
        "diagram": None,
        "placeholder_roles": None,
        "options": ["Salt", "Cloud", "Bacteria", "Reflection"],
        "answer": 3,
        "correct_answer": "Reflection",
        "explanation": "Matter is anything that has mass and occupies space. Reflection is a phenomenon involving light and is not considered matter."
    },
    {
        "id": "SCI949",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The diagram below shows a reusable bag when it is folded and unfolded.\n\nWhich of the following is true about the shopping bag?\n\nA: The shopping bag is flexible.\nB: The shopping bag occupies space.\nC: The shopping bag has the same mass when it is folded or unfolded.",
        "diagram": None,
        "placeholder_roles": None,
        "options": ["A and B only", "A and C only", "B and C only", "A, B and C"],
        "answer": 3,
        "correct_answer": "A, B and C",
        "explanation": "The bag can be folded, so it is flexible (A). It is made of matter, so it occupies space (B) and its mass remains the same regardless of its shape (C)."
    },
    {
        "id": "SCI950",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Glenn lived in a very cold place. When he threw hot water from a container, it immediately turned into a white, powdery substance as shown in the diagram.\n\nBased on the information, which of the following statements is true?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "Melting has taken place.",
            "There is a change of state of the hot water from liquid to gas.",
            "The hot water has condensed to become the white, powdery substance.",
            "The temperature of the surroundings is lower than the freezing point of water."
        ],
        "answer": 3,
        "correct_answer": "The temperature of the surroundings is lower than the freezing point of water.",
        "explanation": "For hot water to turn into a solid substance immediately, the surrounding air must be extremely cold. This indicates the temperature is below 0°C, the freezing point of water."
    },
    {
        "id": "SCI951",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "{CHARACTER_0} constructed a circuit as shown below using materials P, Q, M and N. All bulbs and batteries are in working condition.\n\nWhen the switch was closed, {CHARACTER_0} found that bulbs A, C and D lit up but bulb B did not light up.\n\nWhich of the following materials are conductors of electricity?",
        "diagram": None,
        "placeholder_roles": ["protagonist"],
        "options": ["M and P only", "M and Q only", "M, N and P only", "M, N and Q only"],
        "answer": 2,
        "correct_answer": "M, N and P only",
        "explanation": "Bulbs A, C, and D lit up, meaning current could flow through materials P, M, and N. Bulb B did not light up because Q is an insulator, preventing current from reaching it."
    },
    {
        "id": "SCI952",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "{CHARACTER_0} constructed a circuit as shown below using materials P, Q, M and N. Only material Q is an insulator. All bulbs and batteries are in working condition.\n\nWhen the switch was closed and bulb C was fused, which of the following bulbs would not light up?",
        "diagram": None,
        "placeholder_roles": ["protagonist"],
        "options": ["Bulbs B and C only", "Bulbs A, B and C only", "Bulbs B, C and D only", "Bulbs A, B, C and D"],
        "answer": 3,
        "correct_answer": "Bulbs A, B, C and D",
        "explanation": "If bulb C fuses, it creates an open circuit in that branch. As Q is an insulator, the main branch also has an open circuit. None of the bulbs will light up."
    },
    {
        "id": "SCI953",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "There were four bars, W, X, Y and Z placed on a table. There were an aluminium bar, an iron bar and two bar magnets.\n\n{CHARACTER_0} placed two bars at a fixed distance from each other and recorded the interactions between the bars.\n\nWhich of the following is correct about bars W, X, Y and Z?\n\n| | W | X | Y | Z |\n|---|---|---|---|---|\n| (1) | aluminium | magnet | magnet | iron |\n| (2) | iron | aluminium | magnet | magnet |\n| (3) | magnet | iron | aluminium | magnet |\n| (4) | magnet | magnet | iron | aluminium |",
        "diagram": None,
        "placeholder_roles": ["protagonist"],
        "options": ["(1)", "(2)", "(3)", "(4)"],
        "answer": 3,
        "correct_answer": "(4)",
        "explanation": "Bars W and X repel each other, so both must be magnets."
    },
    {
        "id": "SCI954",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "{CHARACTER_0} placed two identical blocks, X and Y, on identical planks as shown. Both blocks X and Y have the same mass.\n\n{CHARACTER_0} observed that both wooden blocks X and Y were stationary. Based on the observations, which of the following statement(s) is/are true?\n\nA: Gravitational force was acting on block X only.\nB: Gravitational force was acting on blocks X and Y.\nC: There was frictional force between surfaces of block Y and the plank.",
        "diagram": None,
        "placeholder_roles": ["protagonist"],
        "options": ["A only", "B only", "A and C only", "B and C only"],
        "answer": 3,
        "correct_answer": "B and C only",
        "explanation": "Gravity acts on all objects with mass on Earth, including blocks X and Y (B). Frictional force (C) acts on block Y to prevent it from sliding down the tilted plank."
    },
    {
        "id": "SCI955",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "{CHARACTER_0} dropped three balls, X, Y and Z, of the same size into a tray of flour from the same height as shown. All the balls have different masses.\n\n{CHARACTER_0} recorded the depth of the depression made by the balls in the tray of flour in the table.\n\n| Ball | 1st try | 2nd try | 3rd try | average |\n|---|---|---|---|---|\n| X | 3 | 3.5 | 3.5 | 3.3 |\n| Y | 1 | 2 | 1.5 | 1.5 |\n| Z | 4 | 3.5 | 4 | 3.8 |\n\nBased on the results in the table above, which of the following statements is correct?",
        "diagram": None,
        "placeholder_roles": ["protagonist"],
        "options": [
            "Ball Z had the greatest mass.",
            "Ball Y had the most kinetic energy just before it hit the flour.",
            "The gravitational force acting on balls X, Y and Z at the initial height was the same.",
            "The gravitational potential energy of balls X, Y and Z at the initial height were the same."
        ],
        "answer": 0,
        "correct_answer": "Ball Z had the greatest mass.",
        "explanation": "Ball Z created the deepest average depression (3.8 cm) in the flour. Since all balls were dropped from the same height, the one with the greatest mass has the most energy and creates the deepest mark."
    },
    {
        "id": "SCI956",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The diagram shows a torch shining on three objects P, Q and R. Objects P, Q and R were different shapes made up of wood. They were placed at different distances from the torch.\n\nThe diagram shows the shadow cast on the screen.\n\nWhich one of the following represents correctly objects P, Q and R respectively?",
        "diagram": None,
        "placeholder_roles": None,
        "options": ["(1)", "(2)", "(3)", "(4)"],
        "answer": 0,
        "correct_answer": "(1)",
        "explanation": "The closer an object is to the light source, the bigger the shadow. Thus, P is the square, Q is the star and R is the circle."
    },
    {
        "id": "SCI957",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "A carpenter is unable to remove a steel nut from a steel bolt because it was too tight.\n\nWhat should the carpenter do to remove the nut most easily from the bolt?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "Heat the nut only",
            "Heat the bolt only",
            "Cool the nut and heat the bolt",
            "Heat the nut and bolt to the same temperature at the same time"
        ],
        "answer": 0,
        "correct_answer": "Heat the nut only",
        "explanation": "Heating the steel nut will cause it to expand more than the bolt. This expansion makes the nut slightly larger, allowing it to be loosened and removed more easily."
    },
    {
        "id": "SCI958",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "A man did a bungee jump from a platform. His legs were attached to an elastic cord. The length of the unstretched cord is 20m.\n\nHe jumped off the platform and fell downward to a distance of 40m and stopped momentarily before starting to rise upwards. The diagrams show four sequential stages of the bungee jump.\n\nAt which stage, 1, 2, 3 or 4, was both elastic potential energy and kinetic energy present?",
        "diagram": None,
        "placeholder_roles": None,
        "options": ["(1)", "(2)", "(3)", "(4)"],
        "answer": 2,
        "correct_answer": "(3)",
        "explanation": "Kinetic energy is present whenever the man is moving during the fall. Elastic potential energy is present once the 20m cord begins to stretch, which happens between stage 2 and 4."
    }
]

# Read existing data
with open('data/questions-science-p6.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Add new questions
data.extend(new_questions)

# Write updated data
with open('data/questions-science-p6.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Added {len(new_questions)} W5D1 questions (SCI931-SCI958)")
