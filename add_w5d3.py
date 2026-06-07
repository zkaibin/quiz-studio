import json

new_questions = [
    {
        "id": "SCI980",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which one of the headers can group the six animals into two groups, 1 and 2, with the same number of animals in each group? Identify suitable headers for Groups 1 and 2.",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "covered with scales / covered with hair",
            "lays eggs / gives birth to young alive",
            "has a three-stage life cycle / has a four-stage life cycle",
            "does not have four legs / has four legs"
        ],
        "answer": 1,
        "correct_answer": "B",
        "explanation": "Birds, butterflies and turtles lay eggs while cat, elephant and bear give birth to young alive."
    },
    {
        "id": "SCI981",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The picture shows several children sitting on a carnival ride. During one part of the ride, the children in their seats are dropped from a certain height. S, T, U and V represent the direction of possible forces acting on the children during this part of the ride. Which arrows show the direction of gravity and friction acting on the children respectively when the seats drop?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "Gravity: U, Friction: S",
            "Gravity: U, Friction: V",
            "Gravity: S, Friction: T",
            "Gravity: S, Friction: V"
        ],
        "answer": 0,
        "correct_answer": "A",
        "explanation": "Gravity always acts downwards (U). Friction opposes motion. Since the children are dropped downwards, friction acts upwards (S)."
    },
    {
        "id": "SCI982",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The diagram below shows a plant. Identify which part of the plant, A, B, C or D, holds the plant upright.",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "Part A",
            "Part B",
            "Part C",
            "Part D"
        ],
        "answer": 1,
        "correct_answer": "B",
        "explanation": "In a plant, the stem (labeled B) is the part responsible for holding the plant upright. It provides structural support to keep the leaves and flowers elevated."
    },
    {
        "id": "SCI983",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following shows the correct direction that digested food takes after it passes through the mouth?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "Stomach → small intestine → blood stream",
            "Stomach → small intestine → large intestine",
            "Gullet → stomach → small intestine → large intestine",
            "Gullet → stomach → small intestine → blood stream"
        ],
        "answer": 3,
        "correct_answer": "D",
        "explanation": "After food is swallowed, it travels down the gullet to the stomach and then to the small intestine. In the small intestine, nutrients are absorbed into the bloodstream for transport throughout the body."
    },
    {
        "id": "SCI984",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Plant K's life cycle is shown below. The diagram shows the seed and flower of Plant K. Which processes, A, B or C, require the seed or the flower and what are the agents involved during these processes?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "Seed: Process C/Animal, Flower: Process A/Wind",
            "Seed: Process C/Animal, Flower: Process B/Wind",
            "Seed: Process B/Animal, Flower: Process B/Wind",
            "Seed: Process B/Wind, Flower: Process B/Animal"
        ],
        "answer": 1,
        "correct_answer": "B",
        "explanation": "Process C (germination) requires the seed, which is dispersed by animals. Process B (pollination) requires the flower and is carried out by wind."
    },
    {
        "id": "SCI985",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "{CHARACTER_0} conducted an experiment using the set-ups as shown below. Which two set-ups should be compared to determine if decaying matter affects the percentage of carbon dioxide in the air?",
        "diagram": None,
        "placeholder_roles": ["protagonist"],
        "options": [
            "Set-ups Z and Y",
            "Set-ups Y and W",
            "Set-ups W and X",
            "Set-ups Z and X"
        ],
        "answer": 2,
        "correct_answer": "C",
        "explanation": "Set-ups that do not have decaying matter (A and D) start with a smaller percentage of carbon dioxide compared to set-ups with decaying matter (B and C)."
    },
    {
        "id": "SCI986",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "{CHARACTER_0} placed all her clothes into a bag. She then removed all the air from the bag and sealed it. What happens to the total mass and volume of the clothes and air in the bag?",
        "diagram": None,
        "placeholder_roles": ["protagonist"],
        "options": [
            "Mass: remains the same, Volume: decrease",
            "Mass: remains the same, Volume: remains the same",
            "Mass: decrease, Volume: decrease",
            "Mass: decrease, Volume: remains the same"
        ],
        "answer": 2,
        "correct_answer": "C",
        "explanation": "Air has mass and takes up space. Removing the air from the bag decreases both the total mass of the bag and its contents, and the volume occupied by the clothes and air."
    },
    {
        "id": "SCI987",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The diagram shows parts X and Y of a flower. What are the names of parts X and Y?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "X: Sepal, Y: Petal",
            "X: Petal, Y: Sepal",
            "X: Stamen, Y: Pistil",
            "X: Pistil, Y: Stamen"
        ],
        "answer": 1,
        "correct_answer": "B",
        "explanation": "Part X is the petal, which attracts pollinators. Part Y is the sepal, which protects the flower bud before it blooms."
    },
    {
        "id": "SCI988",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The diagram shows a simple electrical circuit. Which of the following changes will cause the bulb to light up dimmer?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "Replace the battery with one that has higher voltage",
            "Replace the bulb with one that has higher resistance",
            "Add another identical bulb in parallel",
            "Remove one cell from the battery"
        ],
        "answer": 3,
        "correct_answer": "D",
        "explanation": "Removing one cell from the battery decreases the voltage, which results in less current flowing through the circuit, causing the bulb to light up dimmer."
    },
    {
        "id": "SCI989",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "{CHARACTER_0} set up an experiment as shown in the diagram. After 1 hour, water level in the test tube increased. This shows that the plant has undergone which process?",
        "diagram": None,
        "placeholder_roles": ["protagonist"],
        "options": [
            "Photosynthesis",
            "Transpiration",
            "Respiration",
            "Germination"
        ],
        "answer": 1,
        "correct_answer": "B",
        "explanation": "The increase in water level in the test tube indicates that water vapor has been released by the plant through transpiration, which is the loss of water vapor from plant leaves."
    },
    {
        "id": "SCI990",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Four identical magnets are arranged as shown below. Which arrangement shows the strongest magnetic force between the magnets?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "Arrangement A",
            "Arrangement B",
            "Arrangement C",
            "Arrangement D"
        ],
        "answer": 0,
        "correct_answer": "A",
        "explanation": "The strongest magnetic force occurs when opposite poles (N-S) are facing each other at the closest distance."
    },
    {
        "id": "SCI991",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The diagram shows a food chain. If the population of frogs decreases significantly, what will most likely happen?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "The grasshopper population will decrease",
            "The snake population will increase",
            "The grass population will decrease",
            "The snake population will decrease"
        ],
        "answer": 3,
        "correct_answer": "D",
        "explanation": "If frogs decrease, snakes (which feed on frogs) will have less food, causing their population to decrease as well."
    },
    {
        "id": "SCI992",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The table shows the melting and boiling points of four substances. Which substance will be in liquid state at room temperature (25°C)?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "Substance P (Melting point: 30°C, Boiling point: 100°C)",
            "Substance Q (Melting point: -10°C, Boiling point: 50°C)",
            "Substance R (Melting point: 0°C, Boiling point: 20°C)",
            "Substance S (Melting point: 40°C, Boiling point: 120°C)"
        ],
        "answer": 1,
        "correct_answer": "B",
        "explanation": "At 25°C, Substance Q is in liquid state because 25°C is above its melting point (-10°C) but below its boiling point (50°C)."
    },
    {
        "id": "SCI993",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "{CHARACTER_0} placed a thermometer in a beaker of hot water and observed the reading every minute. What will happen to the reading on the thermometer?",
        "diagram": None,
        "placeholder_roles": ["protagonist"],
        "options": [
            "It will increase continuously",
            "It will decrease continuously",
            "It will increase then remain constant",
            "It will remain constant throughout"
        ],
        "answer": 1,
        "correct_answer": "B",
        "explanation": "The hot water will lose heat to the surroundings over time, causing its temperature to decrease. Therefore, the thermometer reading will decrease continuously."
    },
    {
        "id": "SCI994",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Two metal plates, A and B, are made from different materials. At room temperature, both plates have the same temperature. Plate A feels colder than Plate B when touched. What can be concluded?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "Plate A is a better conductor of heat than Plate B",
            "Plate A is a poorer conductor of heat than Plate B",
            "Plate A has a lower temperature than Plate B",
            "Plate A has a higher temperature than Plate B"
        ],
        "answer": 0,
        "correct_answer": "A",
        "explanation": "Plate A feels colder because it is a better conductor of heat, allowing heat to transfer away from your hand more quickly, making it feel colder even though both plates are at the same temperature."
    },
    {
        "id": "SCI995",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The diagram shows a lever system. To lift the load more easily, where should the fulcrum be placed?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "Closer to the load",
            "Closer to the effort",
            "Exactly in the middle",
            "At the same position as the load"
        ],
        "answer": 0,
        "correct_answer": "A",
        "explanation": "Placing the fulcrum closer to the load increases the mechanical advantage, making it easier to lift the load with less effort."
    },
    {
        "id": "SCI996",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The graph shows the temperature of water as it is heated over time. At which point does the water start to boil?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "Point A",
            "Point B",
            "Point C",
            "Point D"
        ],
        "answer": 2,
        "correct_answer": "C",
        "explanation": "Point C represents the boiling point where the temperature remains constant at 100°C as the water changes from liquid to gas."
        },
    {
        "id": "SCI997",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "{CHARACTER_0} mixed sugar with water in a beaker. After stirring, the sugar could no longer be seen. What can {CHARACTER_0} do to obtain the sugar back?",
        "diagram": None,
        "placeholder_roles": ["protagonist"],
        "options": [
            "Filter the mixture",
            "Add more water to the mixture",
            "Heat the mixture until all the water evaporates",
            "Cool the mixture in a refrigerator"
        ],
        "answer": 2,
        "correct_answer": "C",
        "explanation": "Heating the mixture will cause the water to evaporate, leaving the sugar crystals behind."
    },
    {
        "id": "SCI998",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The diagram shows the life cycle of a butterfly. Which stage does the butterfly undergo complete metamorphosis?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "From egg to larva",
            "From larva to pupa",
            "From pupa to adult",
            "From adult to egg"
        ],
        "answer": 2,
        "correct_answer": "C",
        "explanation": "Complete metamorphosis occurs when the pupa transforms into the adult butterfly, which looks completely different from the larva stage."
    },
    {
        "id": "SCI999",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following adaptations helps a cactus survive in the desert?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "Broad leaves to absorb more sunlight",
            "Thick stem to store water",
            "Shallow roots to absorb rainwater quickly",
            "Bright flowers to attract pollinators"
        ],
        "answer": 1,
        "correct_answer": "B",
        "explanation": "A thick stem allows the cactus to store water for long periods, which is essential for survival in the dry desert environment."
    },
    {
        "id": "SCI1000",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The diagram shows an eclipse. What type of eclipse is shown and when does it occur?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "Solar eclipse - Moon is between Earth and Sun",
            "Solar eclipse - Earth is between Moon and Sun",
            "Lunar eclipse - Moon is between Earth and Sun",
            "Lunar eclipse - Earth is between Moon and Sun"
        ],
        "answer": 0,
        "correct_answer": "A",
        "explanation": "A solar eclipse occurs when the Moon passes between the Earth and the Sun, blocking the Sun's light."
    },
    {
        "id": "SCI1001",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "{CHARACTER_0} has four identical springs. She attached different masses to each spring. Which spring will be stretched the most?",
        "diagram": None,
        "placeholder_roles": ["protagonist"],
        "options": [
            "Spring with 100g mass",
            "Spring with 200g mass",
            "Spring with 300g mass",
            "Spring with 400g mass"
        ],
        "answer": 3,
        "correct_answer": "D",
        "explanation": "The spring with the greatest mass (400g) will be stretched the most because a larger mass exerts a greater force on the spring."
    },
    {
        "id": "SCI1002",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The diagram shows a simple circuit with a switch. When the switch is open, which of the following statements is correct?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "Current flows through the circuit and the bulb lights up",
            "Current does not flow and the bulb does not light up",
            "Current flows but the bulb does not light up",
            "Current does not flow but the bulb lights up"
        ],
        "answer": 1,
        "correct_answer": "B",
        "explanation": "When the switch is open, the circuit is incomplete. Current cannot flow through an incomplete circuit, so the bulb will not light up."
    },
    {
        "id": "SCI1003",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following is an example of a reversible change?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "Burning of wood",
            "Rusting of iron",
            "Melting of ice",
            "Cooking of an egg"
        ],
        "answer": 2,
        "correct_answer": "C",
        "explanation": "Melting of ice is a reversible change because water can be frozen back into ice. The other options are irreversible changes."
    },
    {
        "id": "SCI1004",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The table shows the results of an experiment on plant growth in different conditions. Which factor is most important for healthy plant growth?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "Water only",
            "Sunlight only",
            "Air only",
            "All three factors: water, sunlight, and air"
        ],
        "answer": 3,
        "correct_answer": "D",
        "explanation": "Plants need water for transport of nutrients, sunlight for photosynthesis, and air (carbon dioxide) for photosynthesis. All three factors are essential for healthy plant growth."
    },
    {
        "id": "SCI1005",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "{CHARACTER_0} observed that when he mixed vinegar with baking soda, bubbles formed. What gas is produced in this reaction?",
        "diagram": None,
        "placeholder_roles": ["protagonist"],
        "options": [
            "Oxygen",
            "Hydrogen",
            "Carbon dioxide",
            "Nitrogen"
        ],
        "answer": 2,
        "correct_answer": "C",
        "explanation": "When vinegar (an acid) reacts with baking soda (a base), carbon dioxide gas is produced, which forms the bubbles observed."
    },
    {
        "id": "SCI1006",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "The diagram shows the water cycle. Which process involves water changing from liquid to gas?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "Condensation",
            "Evaporation",
            "Precipitation",
            "Collection"
        ],
        "answer": 1,
        "correct_answer": "B",
        "explanation": "Evaporation is the process where liquid water changes into water vapor (gas) due to heat from the sun."
    },
    {
        "id": "SCI1007",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Which of the following materials is the best electrical insulator?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "Copper wire",
            "Iron nail",
            "Plastic ruler",
            "Aluminum foil"
        ],
        "answer": 2,
        "correct_answer": "C",
        "explanation": "Plastic is a good electrical insulator as it does not allow electricity to pass through easily. The other materials are conductors of electricity."
    }
]

# Load existing data
with open('data/questions-science-p6.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Add new questions
data.extend(new_questions)

# Save updated data
with open('data/questions-science-p6.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"✓ Added {len(new_questions)} W5D3 questions (SCI980-SCI1007)")
print(f"✓ Total questions in database: {len(data)}")
