import json

additional_questions = [
    {
        "id": "SCI1106",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "A solar panel is used to produce electricity for a lamp at night. Which energy received by the solar panel is used to produce electricity?",
        "diagram": None,
        "placeholder_roles": None,
        "options": ["light energy", "kinetic energy", "potential energy", "sound energy"],
        "answer": 0,
        "correct_answer": "light energy",
        "explanation": "Solar panels convert light energy into electrical energy."
    },
    {
        "id": "SCI1107",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "{CHARACTER_0} and {CHARACTER_1} were each given an identical scoop of ice cream in identical cups at the same time in an air-conditioned room. {CHARACTER_0}'s ice cream soon began to melt. Which statement(s) can explain why {CHARACTER_0}'s ice cream is melting faster?\n\nA: {CHARACTER_0} was supplying heat to the ice cream.\nB: {CHARACTER_0}'s ice cream had a larger exposed surface area.\nC: Temperature of {CHARACTER_0}'s ice cream increased.",
        "diagram": None,
        "placeholder_roles": ["protagonist", "friend", "protagonist", "protagonist", "protagonist", "protagonist"],
        "options": ["A only", "A and C only", "B and C only", "A, B and C"],
        "answer": 3,
        "correct_answer": "A, B and C",
        "explanation": "The protagonist was holding the cup of ice cream in their hand. Heat flowed from their hand to the cup of ice cream, thus causing the ice cream to gain more heat faster and melt faster."
    },
    {
        "id": "SCI1108",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "{CHARACTER_0} set up a circuit with a working bulb. The bulb did not light up when {CHARACTER_0} closed the switch. Both wires X and Y were connected to the metal casing of the bulb. The positive terminal of one battery is connected to the positive terminal of the other battery. Which change(s) will light up the bulb?\n\n(1) Connect X to T (metal tip), Connect Y to T, Don't turn batteries\n(2) Connect X to T, Don't change Y, Turn battery A around\n(3) Don't change X, Connect Y to T\n(4) Don't change X or Y, Turn both batteries around",
        "diagram": None,
        "placeholder_roles": ["protagonist", "protagonist"],
        "options": ["(1)", "(2)", "(3)", "(4)"],
        "answer": 0,
        "correct_answer": "(1)",
        "explanation": "Error: Both wires were connected to the metal casing of the bulb. Solution: Connect one wire to the metal tip of the bulb at T. Error: The positive terminal of one battery is connected to the positive terminal of the other battery. Solution: Turn one battery around so that the positive terminal and negative terminal of the batteries are connected."
    },
    {
        "id": "SCI1109",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "A magnet R is hung on a string. When two other magnets are moved towards it at the same time, magnet R turns. The N-pole of magnet R is attracted toward P and the S-pole is repelled by Q. What are the poles of the two magnets at P and Q?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "P: N, Q: N",
            "P: N, Q: S",
            "P: S, Q: N",
            "P: S, Q: S"
        ],
        "answer": 3,
        "correct_answer": "P: S, Q: S",
        "explanation": "P is attracting the N-pole of the magnet. Q is repelling the S-pole of the magnet. Thus, both P and Q are S-poles."
    },
    {
        "id": "SCI1110",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "{CHARACTER_0} made a dessert using a piece of fruit and jelly. {CHARACTER_0} can see the fruit inside the jelly. Which row shows the correct properties of the jelly?",
        "diagram": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 160\" width=\"360\" font-family=\"Arial,sans-serif\">\n  <text x=\"180\" y=\"18\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"bold\" fill=\"#1e293b\">Jelly Properties</text>\n  <!-- Header Row -->\n  <rect x=\"30\" y=\"28\" width=\"60\" height=\"32\" fill=\"#dbeafe\" stroke=\"#0284c7\" stroke-width=\"2\"/>\n  <text x=\"60\" y=\"49\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#0369a1\">Row</text>\n  <rect x=\"90\" y=\"28\" width=\"135\" height=\"32\" fill=\"#dbeafe\" stroke=\"#0284c7\" stroke-width=\"2\"/>\n  <text x=\"157\" y=\"49\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#0369a1\">allows light to pass through</text>\n  <rect x=\"225\" y=\"28\" width=\"105\" height=\"32\" fill=\"#dbeafe\" stroke=\"#0284c7\" stroke-width=\"2\"/>\n  <text x=\"277\" y=\"49\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#0369a1\">reflects light</text>\n  <!-- Row 1 -->\n  <rect x=\"30\" y=\"60\" width=\"60\" height=\"28\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/>\n  <text x=\"60\" y=\"78\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"bold\" fill=\"#1e293b\">(1)</text>\n  <rect x=\"90\" y=\"60\" width=\"135\" height=\"28\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/>\n  <text x=\"157\" y=\"78\" text-anchor=\"middle\" font-size=\"12\" fill=\"#475569\">✗</text>\n  <rect x=\"225\" y=\"60\" width=\"105\" height=\"28\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/>\n  <text x=\"277\" y=\"78\" text-anchor=\"middle\" font-size=\"12\" fill=\"#475569\">✓</text>\n  <!-- Row 2 -->\n  <rect x=\"30\" y=\"88\" width=\"60\" height=\"28\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/>\n  <text x=\"60\" y=\"106\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"bold\" fill=\"#1e293b\">(2)</text>\n  <rect x=\"90\" y=\"88\" width=\"135\" height=\"28\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/>\n  <text x=\"157\" y=\"106\" text-anchor=\"middle\" font-size=\"12\" fill=\"#475569\">✗</text>\n  <rect x=\"225\" y=\"88\" width=\"105\" height=\"28\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/>\n  <text x=\"277\" y=\"106\" text-anchor=\"middle\" font-size=\"12\" fill=\"#475569\">✗</text>\n  <!-- Row 3 -->\n  <rect x=\"30\" y=\"116\" width=\"60\" height=\"28\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/>\n  <text x=\"60\" y=\"134\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"bold\" fill=\"#1e293b\">(3)</text>\n  <rect x=\"90\" y=\"116\" width=\"135\" height=\"28\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/>\n  <text x=\"157\" y=\"134\" text-anchor=\"middle\" font-size=\"12\" fill=\"#475569\">✓</text>\n  <rect x=\"225\" y=\"116\" width=\"105\" height=\"28\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/>\n  <text x=\"277\" y=\"134\" text-anchor=\"middle\" font-size=\"12\" fill=\"#475569\">✗</text>\n  <!-- Row 4 (correct) -->\n  <rect x=\"30\" y=\"144\" width=\"60\" height=\"28\" fill=\"#dcfce7\" stroke=\"#94a3b8\" stroke-width=\"1\"/>\n  <text x=\"60\" y=\"162\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"bold\" fill=\"#15803d\">(4)</text>\n  <rect x=\"90\" y=\"144\" width=\"135\" height=\"28\" fill=\"#dcfce7\" stroke=\"#94a3b8\" stroke-width=\"1\"/>\n  <text x=\"157\" y=\"162\" text-anchor=\"middle\" font-size=\"12\" fill=\"#15803d\">✓</text>\n  <rect x=\"225\" y=\"144\" width=\"105\" height=\"28\" fill=\"#dcfce7\" stroke=\"#94a3b8\" stroke-width=\"1\"/>\n  <text x=\"277\" y=\"162\" text-anchor=\"middle\" font-size=\"12\" fill=\"#15803d\">✓</text>\n</svg>",
        "placeholder_roles": ["protagonist", "protagonist"],
        "options": ["(1)", "(2)", "(3)", "(4)"],
        "answer": 3,
        "correct_answer": "(4)",
        "explanation": "The fruit can be seen through the jelly because the jelly allows light to pass through. The jelly can be seen because it reflects light."
    },
    {
        "id": "SCI1111",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "An air-conditioned bus has doors that can open/close. Which material is most suitable for making the doors to keep the bus safe and cool?\n\n(1) Material A: not strong, flexible, not waterproof, good conductor of heat\n(2) Material B: strong, not flexible, waterproof, poor conductor of heat\n(3) Material C: strong, flexible, waterproof, poor conductor of heat\n(4) Material D: strong, flexible, waterproof, good conductor of heat",
        "diagram": None,
        "placeholder_roles": None,
        "options": ["(1)", "(2)", "(3)", "(4)"],
        "answer": 2,
        "correct_answer": "(3)",
        "explanation": "The material must be strong and flexible so as not to break easily and ensure safety. The material must be waterproof so that rain cannot enter the bus. The material must be a poor conductor of heat to slow down heat gain from the surroundings into the bus."
    },
    {
        "id": "SCI1112",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "A puppet show uses a light source, puppet, and screen. Which action makes the shadow on the screen bigger?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "Move the screen further from the puppet.",
            "Move the screen nearer to the light source.",
            "Move the audience further from the screen.",
            "Move the puppet further from the light source."
        ],
        "answer": 0,
        "correct_answer": "Move the screen further from the puppet.",
        "explanation": "To make the shadow bigger, move: the screen further from the puppet, the puppet closer to the light source, or the light source closer to the puppet."
    },
    {
        "id": "SCI1113",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "{CHARACTER_0} has two bottles, P and Q, made of the same type of metal. Bottle P has a thick metal wall while bottle Q has air between two metal walls. {CHARACTER_0} wants to keep coffee hot. Which row shows the bottle to use and the reasons correctly?",
        "diagram": None,
        "placeholder_roles": ["protagonist", "protagonist"],
        "options": [
            "Bottle P: Metal is good conductor, coffee gains more heat from surroundings",
            "Bottle P: Metal is good conductor, coffee loses more heat to surroundings",
            "Bottle Q: Air is poor conductor, coffee gains less heat from surroundings",
            "Bottle Q: Air is poor conductor, coffee loses less heat to surroundings"
        ],
        "answer": 3,
        "correct_answer": "Bottle Q: Air is poor conductor, coffee loses less heat to surroundings",
        "explanation": "Bottle Q has air trapped between the two metal walls. Air is a poor conductor of heat and hence, slows down heat loss from the hot coffee to the surroundings."
    },
    {
        "id": "SCI1114",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "A battery is used in a mobile phone. Which row shows how the energy changes when the mobile phone rings?",
        "diagram": None,
        "placeholder_roles": None,
        "options": [
            "electrical energy → heat energy → sound energy",
            "electrical energy → potential energy → sound energy",
            "potential energy → electrical energy → sound energy",
            "potential energy → heat energy → sound energy"
        ],
        "answer": 2,
        "correct_answer": "potential energy → electrical energy → sound energy",
        "explanation": "Chemical potential energy in the battery is converted into electrical energy in the electrical circuit which is then converted into sound energy in the phone."
    },
    {
        "id": "SCI1115",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "{CHARACTER_0} placed a cup of water in the refrigerator and measured its temperature. The graph shows temperature dropping to about 2°C and then staying constant at point AB. Which statement best describes the state of water at AB?",
        "diagram": None,
        "placeholder_roles": ["protagonist"],
        "options": [
            "It is a solid.",
            "It is getting cooler.",
            "It is a liquid at constant temperature.",
            "It is changing from a liquid to a solid state."
        ],
        "answer": 2,
        "correct_answer": "It is a liquid at constant temperature.",
        "explanation": "From the graph, the lowest temperature of the water is more than 0°C and thus, it is not a solid at AB."
    },
    {
        "id": "SCI1116",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "{CHARACTER_0} played with a toy train. The train did not move in a straight line. Which statement best explains why?",
        "diagram": None,
        "placeholder_roles": ["protagonist"],
        "options": [
            "The force on the train is not in the same direction that the train is moving in.",
            "The front of the train is heavier than the back of train.",
            "The joint allows the carriage to turn.",
            "There is friction at the wheels."
        ],
        "answer": 0,
        "correct_answer": "The force on the train is not in the same direction that the train is moving in.",
        "explanation": "When a force is applied to an object, the object moves in the same direction as the force. Since the train was not moving in a straight line, the applied force must have been in different directions."
    },
    {
        "id": "SCI1117",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "Five bulbs are connected in a circuit. Two bulbs are lit when the switch is open. How many more bulbs will light up when the switch is closed?",
        "diagram": None,
        "placeholder_roles": None,
        "options": ["1", "2", "3", "4"],
        "answer": 2,
        "correct_answer": "3",
        "explanation": "The three bulbs in the branch where the switch is positioned were not lit when the switch is open (open circuit). These bulbs will only light up when the switch is closed (closed circuit) and current flows through them."
    },
    {
        "id": "SCI1118",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "A spring of length 5cm is placed inside a holder. {CHARACTER_0} pushes one pellet after another into the holder. Which graph shows the relationship between {CHARACTER_0}'s force when pushing the pellets and the compression of the spring?",
        "diagram": None,
        "placeholder_roles": ["protagonist", "protagonist"],
        "options": [
            "Graph starting from (0,0) with linear increase",
            "Graph starting from (0,5) with decrease",
            "Graph with no correlation",
            "Graph with exponential increase"
        ],
        "answer": 0,
        "correct_answer": "Graph starting from (0,0) with linear increase",
        "explanation": "Compression of a spring is the reduction of the length of a spring when a compressive (pushing) force is applied. When no force is exerted, there is no compression of the spring."
    },
    {
        "id": "SCI1119",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "{CHARACTER_0} set up a circuit with two identical batteries and bulb L. {CHARACTER_0} set up four other circuits using identical batteries and bulbs. In which circuit will bulb M have the same brightness as bulb L?",
        "diagram": None,
        "placeholder_roles": ["protagonist", "protagonist"],
        "options": [
            "(1) One battery, one bulb in series",
            "(2) Three batteries, one bulb in series",
            "(3) Two batteries, two bulbs in series",
            "(4) Two batteries, two bulbs in parallel"
        ],
        "answer": 3,
        "correct_answer": "(4) Two batteries, two bulbs in parallel",
        "explanation": "In option 4, the same number of batteries are used. Adding a light bulb in parallel will not affect the brightness of light bulb already in the circuit. When light bulbs are connected in parallel, they have the same relative brightness."
    }
]

# Load existing questions
with open("data/questions-science-p6.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Add new questions
data.extend(additional_questions)

# Save updated file
with open("data/questions-science-p6.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Successfully added {len(additional_questions)} questions from W6D2-2!")
print(f"Question IDs: SCI1106 to SCI1119")
print(f"Total questions in file: {len(data)}")
