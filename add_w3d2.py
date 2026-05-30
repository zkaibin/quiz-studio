#!/usr/bin/env python3
"""
Add W3D2 questions to questions-science-p6.json
IDs: SCI680-SCI705
"""
import json

new_questions = [
    {
        "id": "SCI680",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Pollinator P flies in the day and is attracted to brightly coloured flowers. Which flower W, X, Y or Z is most likely pollinated by pollinator P?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "W",
        "X",
        "Y",
        "Z"
        ],
        "answer": 0,
        "correct_answer": "W",
        "explanation": "Pollinator P is active during the day and likes bright colors. Looking at the chart, Flower Y does not bloom only at night (meaning it blooms in the day) and is brightly colored. This makes it the perfect match for Pollinator P."
    },
    {
        "id": "SCI681",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following flower(s) is/are able to develop into a fruit?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "A only",
        "A and B only",
        "B and C only",
        "A, B and C"
        ],
        "answer": 0,
        "correct_answer": "A only",
        "explanation": "To become a fruit, a flower needs its ovule to be pollinated and fertilized. Flowers A and B still have their ovules, while Flower C has had its ovule removed. Therefore, only A and B can develop into fruits."
    },
    {
        "id": "SCI682",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "A: They are all harmful to human B: They can cause food to turn bad. C: They can only be seen under a microscope. D: They usually depend on other living things for food.",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "C only",
        "A and C only",
        "B and D only",
        "A, B and D only"
        ],
        "answer": 0,
        "correct_answer": "C only",
        "explanation": "Bacteria and fungi are decomposers that get food from other living things or dead matter. While some are helpful (like yeast for bread), others cause food to rot and turn bad. Statement B and D are the only correct facts here."
    },
    {
        "id": "SCI683",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "A table lamp was placed at a distance of 15 cm from the glass jar. After one hour, it was observed that the syringe had collected 8 cm3 of gas. Which of the following shows a possible result when the distance between the lamp and the glass jar was changed? Distance between lamp and glass jar (cm) Gas collected (1) 10 more than 8cm3 (2) 20 equal to 8cm3 (3) 10 less than 8cm3 (4) 20 more than 8cm3",
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
        "explanation": "When the lamp is closer (10 cm), the plant gets more light and photosynthesizes faster. This means it will produce more oxygen gas than it did at 15 cm. Option 1 is correct because \"More than 8cm3 follows this rule."
    },
    {
        "id": "SCI684",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Organism Physical factor A Physical factor B hydrilla high high millipede low high T high low Which of the following best represents physical factors A and B and the habitat that organism T can be most likely found in? Physical factor A Physical factor B Habitat (1) light moisture pond (2) moisture light pond (3) light moisture desert (4) moisture light desert",
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
        "explanation": "Hydrilla lives in water (high moisture) and needs light (high light). Organism T needs high light but low moisture. This describes a desert habitat, where it is very sunny but very dry."
    },
    {
        "id": "SCI685",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Based on the diagram above, what is the main source of energy for the food chain?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "Bird",
        "Sun",
        "Plant",
        "Caterpillar"
        ],
        "answer": 0,
        "correct_answer": "Bird",
        "explanation": "All food chains start with energy from the Sun. Plants use sunlight to make food, which is then passed to animals like caterpillars and birds. Without the Sun, there would be no energy for the plants to grow."
    },
    {
        "id": "SCI686",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following statements is true?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "There is only one predator.",
        "There is only one producer.",
        "There is only one plant eater.",
        "There is only one plant-and-animal eater."
        ],
        "answer": 0,
        "correct_answer": "There is only one predator.",
        "explanation": "In this food web, only organism B eats the producer (Plant A). All other animals eat other animals or a mix. Therefore, there is only one dedicated plant-eater (herbivore)."
    },
    {
        "id": "SCI687",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Based on the chart above, which one of the following groups below is correct? Group Adaptations (1) A change body colour, long beaks (2) B mating calls, fighting to show strength (3) C hard shells, hunting in groups (4) D long and sicky tongue, sharp claws",
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
        "explanation": "A \"structural adaptation\" is a physical body part. A long, sticky tongue and sharp claws are physical parts used to catch and eat food. This matches group D in the classification chart."
    },
    {
        "id": "SCI688",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following statement(s) is/are correct? A: Foot P, used for swimming, belongs to bird X. B: Foot Q, used for tearing food, belongs to bird W. C: Foot Q, used for catching prey, belongs to bird W. D: Foot P, used for protection from predators, belongs to bird X.",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "D only",
        "A and C only",
        "B and D only",
        "A, B and C only"
        ],
        "answer": 1,
        "correct_answer": "A and C only",
        "explanation": "Foot P has webbing, which is a structural adaptation for swimming, typical of water birds like X. Foot Q has sharp talons for catching and gripping prey, which belongs to a bird of prey like W. Thus, statements A and C are correct."
    },
    {
        "id": "SCI689",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "are affected by the rise in Earth's temperature. Based on the graph above, which of these statements is true?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "Both organisms E and F can survive at 40 °C.",
        "Both organisms E and F cannot survive at 0 °C.",
        "Organism E prefers to live in a warmer environment.",
        "The population of organism F increases with increasing temperature."
        ],
        "answer": 0,
        "correct_answer": "Both organisms E and F can survive at 40 °C.",
        "explanation": "The graph shows that as temperature increases, the population of organism E goes up. This means organism E thrives and grows better in warmer conditions. Organism F's population drops as it gets hotter, showing it prefers cooler weather."
    },
    {
        "id": "SCI690",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following materials would be the most suitable to be used to make part Z of the slide? Is it a good heat Is it flexible? Is it waterproof? Type of surface conductor? (1) no yes no smooth (2) yes no yes rough (3) no yes no rough (4) yes no yes smooth",
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
        "explanation": "A slide needs to be smooth so you can glide down easily. It must be waterproof so it doesn't rot in the rain and a poor heat conductor so it doesn't burn your legs in the sun. Material 1 fits all these safety and functional needs."
    },
    {
        "id": "SCI691",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Based on the flow chart below, which of the following is correct? Question A Question B S (1) Is it waterproof? Does it float on water? styrofoam Does it allow light to pass (2) Does it break easily? ceramic through? Does it allow light to pass (3) Does it float on water? metal through? Does it allow light to pass (4) Is it waterproof? cardboard through?",
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
        "explanation": "Glass is transparent, meaning it allows light to pass through (Question A). Cardboard is opaque (Question B) and is not waterproof, which matches the path to \"S\". This sequence correctly identifies the properties of the materials."
    },
    {
        "id": "SCI692",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following shows the main form(s) of energy that the string in the bow possess(es) when held in this position? A: heat energy B: kinetic energy C: elastic potential energy D: chemical potential energy",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "C only",
        "D only",
        "A and B only",
        "C and D only"
        ],
        "answer": 0,
        "correct_answer": "C only",
        "explanation": "When the string of the bow is pulled back, it is stretched out of its original shape. This stretching stores elastic potential energy in the string. This energy is what will eventually push the arrow forward."
    },
    {
        "id": "SCI693",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "diagram below. Which position would the ball most likely reach after he released his grip on the ball?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "K",
        "L",
        "M",
        "N"
        ],
        "answer": 1,
        "correct_answer": "L",
        "explanation": "When Thomas releases the ball, it will swing like a pendulum. Due to the loss in energy due to friction (air resistance), the ball will stop at a shorter height N."
    },
    {
        "id": "SCI694",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "A: It is the amount of matter in an object. B: It can be measured using a spring balance. C: The weight of an object remains unchanged on Earth and on the moon. D: Weight changes with gravitational force even if mass remains the same.",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "A only",
        "D only",
        "A and C only",
        "B and D only"
        ],
        "answer": 0,
        "correct_answer": "A only",
        "explanation": "Weight is the pull of gravity on an object and is measured with a spring balance. Unlike mass, weight changes if you go to a place with different gravity, like the moon. Statements B and D are true."
    },
    {
        "id": "SCI695",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "kitchen scale looks like. Which of the following graphs shows how the length of the spring will change with mass added?",
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
        "explanation": "A kitchen scale uses a spring that gets compressed (pushed down) when weight is added. As you add more mass, the spring becomes shorter. Graph 2 correctly shows the length of the spring decreasing as mass increases."
    },
    {
        "id": "SCI696",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "At Q, it was directly under the lamp. The distance between P and Q is the same as the distance between Q and R. Which of the following graphs best represent the change in the length of shadow of the cat as it walks from P to R?",
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
        "explanation": "When the cat is far from the lamp (at P or R), its shadow is long. When it is directly under the lamp (at Q), the shadow is at its shortest point. Graph 4 shows the shadow length decreasing then increasing, which matches this walk."
    },
    {
        "id": "SCI697",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "G and H made of different materials in front of a torch as shown in the diagram below. She observed that a bright patch of star-shaped light can be seen on sheet G only. Which of the following correctly describes the transparency of the four sheets of materials? Transparent Opaque Not possible to tell (1) E and F G H (2) G and H F E (3) E F and G H (4) F and G H E",
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
        "explanation": "Light must pass through E to reach F, so E is transparent. A star shape appears on G because F is opaque but has a hole, and G is opaque to stop the light. We don't know about H because the light was already blocked by G."
    },
    {
        "id": "SCI698",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following best explains why only the plunger in syringe A could be pushed down?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "Only X has a definite volume.",
        "X and Y have a definite shape.",
        "Only W has no definite volume.",
        "W and X have no definite shape."
        ],
        "answer": 1,
        "correct_answer": "X and Y have a definite shape.",
        "explanation": "Syringe A contains W and X, and since the plunger can move, one of them must be a gas. Gases (like W) have no definite volume and can be compressed. Syringe B cannot move because it only contains a liquid or solid (Y and X), which have definite volumes."
    },
    {
        "id": "SCI699",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "the diagram below. Which of the following correctly shows which containers C and/or D the beads will fall into? Non-magnetic beads Magnetic beads (1) C C (2) C D (3) D C (4) D D",
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
        "explanation": "The magnet roller will attract the magnetic beads and hold them against the belt longer, dropping them into container C. The non-magnetic beads are not attracted and will simply fall off the end into container D. This sorting method separates them by their magnetic properties."
    },
    {
        "id": "SCI700",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "tray of iron nails. The diagram shows the number of iron nails that were attracted by each bar magnet. Based on the results, which of the following is correct? Strongest magnetism Weakest magnetism (1) J K (2) J L (3) M K (4) M L",
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
        "explanation": "Magnet J is the strongest because it attracted the most nails even though it was further away (10cm). Magnet K is the weakest because it attracted very few nails despite being closer to them."
    },
    {
        "id": "SCI701",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "the same amount of wax on each end of four rods made of materials P, Q, R and S as shown below. Then he placed the other end in a basin of boiling water. The time taken for the drop of wax to melt completely was recorded in the table below. Material P Q R S Time taken for wax to melt completely (s) 120 98 250 58 Which of the following statements are correct? A: Material S is the poorest conductor of heat. B: Materials P, Q, R and S conduct heat at different rates. C: Material R is the best material to make the handle of a frying pan.",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "A and B only",
        "B and C only",
        "A and C only",
        "A, B and C"
        ],
        "answer": 0,
        "correct_answer": "A and B only",
        "explanation": "Material S took the shortest time (58s) to melt the wax, making it the best heat conductor. Material R took the longest (250s), making it the best insulator for a handle. Therefore, statements B and C are correct."
    },
    {
        "id": "SCI702",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following observations and reasons are correct? Observation Reason air lost heat to the hot towel and (1) air bubbles escaped from the glass tube expanded air gained heat from the hot towel and (2) air bubbles escaped from the glass tube expanded some water entered the flask through the water gained heat from the hot towel and (3) glass tube expanded some water entered the flask through the air lost heat to the hot towel and (4) glass tube contracted",
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
        "explanation": "The hot towel warms the air inside the flask. This causes the air to gain heat and expand. As the air expands, it needs more space and escapes through the tube as bubbles in the water."
    },
    {
        "id": "SCI703",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Based on the above diagram, which of the following statements are true? A: Only process X involves heat loss. B: Only process W involves change in state. C: Process W takes place during day time only. D: There is no change in state during process Y.",
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
        "explanation": "In the water cycle, Process X (condensation) happens when water vapour loses heat to form clouds. Process Y (rain falling) is just gravity and involves no change in state. Statements A and D are the true ones."
    },
    {
        "id": "SCI704",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "material. The table shows the different conditions at the start of the experiment. Experiment A B C D room temperature 31 25 31 25 exposed surface area of water (cm2) 120 50 50 50 volume of water in the containers (cm3) 500 500 500 400 Rayann wanted to find out how the rate of evaporation of water was affected by the room temperature. Which of the above experiments should Rayann compare?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "A and B",
        "A and D",
        "B and C",
        "C and D"
        ],
        "answer": 0,
        "correct_answer": "A and B",
        "explanation": "To see how temperature affects evaporation, you must keep everything else the same (the \"fair test\" rule). Experiments B and C both use 500cm3 of water and 50cm2 surface area. The only difference is their room temperatures (31°C vs 25°C)."
    },
    {
        "id": "SCI705",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "When one switch was opened, the least number of bulbs remain lit. Which switch was opened?",
        "diagram": None,
        "placeholder_roles": [],
        "options": [
        "S1",
        "S2",
        "S3",
        "S4"
        ],
        "answer": 0,
        "correct_answer": "S1",
        "explanation": "When S1 is opened, 3 bulbs remain lit. When S2 is opened, 2 bulbs remain lit. When S3 is opened, 3 bullbs remain lit. When S4 is opened, 3 bulbs remain lit."
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

print(f"✓ Added {len(new_questions)} questions for W3D2")
