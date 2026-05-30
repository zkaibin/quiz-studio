import json

new_questions = [
  {
    "id": "SCI554",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "{CHARACTER_0} is studying living things in a tank. The tank contains: one Fish P, several sea snails, and some plants. Which of the following statement(s) is/are correct?\nA: Fish P forms one population.\nB: The plants in the tank are organisms.\nC: The sea snails form three communities.",
    "diagram": None,
    "placeholder_roles": ["protagonist"],
    "options": [
      "A only",
      "B only",
      "A and C only",
      "B and C only"
    ],
    "answer": 1,
    "correct_answer": "B only",
    "explanation": "A: Incorrect — a population is a group of the same kind living together. Only one Fish P is shown, so it cannot form a population. B: Correct — plants are living things and all living things are organisms. C: Incorrect — sea snails are one type of organism, so they form one population, not three communities. A community consists of different populations living together."
  },
  {
    "id": "SCI555",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "A graph shows the effect of temperature on the population of four organisms A, B, C, and D. Line B trends upward as temperature increases, line D trends downward, line A peaks at a certain temperature, and line C remains relatively flat. Which of the following statements is correct?",
    "diagram": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 200\" width=\"380\" font-family=\"Arial,sans-serif\">\n  <text x=\"190\" y=\"15\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\" fill=\"#1e293b\">Effect of Temperature on Population</text>\n  <!-- Axes -->\n  <line x1=\"50\" y1=\"25\" x2=\"50\" y2=\"165\" stroke=\"#64748b\" stroke-width=\"1.5\"/>\n  <line x1=\"50\" y1=\"165\" x2=\"340\" y2=\"165\" stroke=\"#64748b\" stroke-width=\"1.5\"/>\n  <text x=\"190\" y=\"185\" text-anchor=\"middle\" font-size=\"10\" fill=\"#64748b\">Temperature (°C) →</text>\n  <text x=\"15\" y=\"95\" text-anchor=\"middle\" font-size=\"10\" fill=\"#64748b\" transform=\"rotate(-90,15,95)\">Population →</text>\n  <!-- Temp labels -->\n  <text x=\"80\" y=\"178\" text-anchor=\"middle\" font-size=\"9\" fill=\"#64748b\">10</text>\n  <text x=\"145\" y=\"178\" text-anchor=\"middle\" font-size=\"9\" fill=\"#64748b\">18</text>\n  <text x=\"210\" y=\"178\" text-anchor=\"middle\" font-size=\"9\" fill=\"#64748b\">22</text>\n  <text x=\"275\" y=\"178\" text-anchor=\"middle\" font-size=\"9\" fill=\"#64748b\">30</text>\n  <!-- Line A (peaks at 22°C) -->\n  <polyline points=\"80,140 145,80 210,50 275,100\" stroke=\"#f97316\" stroke-width=\"2\" fill=\"none\"/>\n  <text x=\"285\" y=\"98\" font-size=\"11\" font-weight=\"bold\" fill=\"#f97316\">A</text>\n  <!-- Line B (increases) -->\n  <polyline points=\"80,145 145,120 210,90 275,45\" stroke=\"#3b82f6\" stroke-width=\"2\" fill=\"none\"/>\n  <text x=\"285\" y=\"43\" font-size=\"11\" font-weight=\"bold\" fill=\"#3b82f6\">B</text>\n  <!-- Line C (flat) -->\n  <polyline points=\"80,100 145,95 210,98 275,100\" stroke=\"#16a34a\" stroke-width=\"2\" fill=\"none\"/>\n  <text x=\"285\" y=\"98\" font-size=\"11\" font-weight=\"bold\" fill=\"#16a34a\">C</text>\n  <!-- Line D (decreases) -->\n  <polyline points=\"80,50 145,80 210,115 275,150\" stroke=\"#dc2626\" stroke-width=\"2\" fill=\"none\"/>\n  <text x=\"285\" y=\"152\" font-size=\"11\" font-weight=\"bold\" fill=\"#dc2626\">D</text>\n</svg>",
    "placeholder_roles": [],
    "options": [
      "Population of organism A increases most at 22°C.",
      "Population of organism C is most affected by temperature change.",
      "Population of organism B increases when the temperature increases.",
      "Population of organism D increases when the temperature increases."
    ],
    "answer": 2,
    "correct_answer": "Population of organism B increases when the temperature increases.",
    "explanation": "Looking at the graph, line B trends upward as temperature increases, showing that organism B's population grows when the environment gets warmer. Organism A peaks then decreases. Organism C is relatively flat (least affected). Organism D decreases as temperature rises."
  },
  {
    "id": "SCI556",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "A food web contains organisms K, L, M, N, O, P, Q, R, and S. Organisms K, L and R are producers (they make their own food). M eats K and L. N eats L and R. O eats M. P eats N. Q eats O and N. S eats P. How many food producers are there in the food web?",
    "diagram": None,
    "placeholder_roles": [],
    "options": [
      "1",
      "2",
      "3",
      "4"
    ],
    "answer": 2,
    "correct_answer": "3",
    "explanation": "K, L, and R are the producers in this food web — they make their own food through photosynthesis. All other organisms (M, N, O, P, Q, S) are consumers."
  },
  {
    "id": "SCI557",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "In a food web: K → M → O → Q; L → M; L → N → P → S; R → N; R → Q. Which of the following statements is correct?",
    "diagram": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 400 200\" width=\"400\" font-family=\"Arial,sans-serif\">\n  <text x=\"200\" y=\"15\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\" fill=\"#1e293b\">Food Web</text>\n  <!-- Producers K, L, R -->\n  <ellipse cx=\"60\" cy=\"165\" rx=\"28\" ry=\"18\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"2\"/>\n  <text x=\"60\" y=\"169\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\" fill=\"#15803d\">K</text>\n  <ellipse cx=\"200\" cy=\"165\" rx=\"28\" ry=\"18\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"2\"/>\n  <text x=\"200\" y=\"169\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\" fill=\"#15803d\">L</text>\n  <ellipse cx=\"340\" cy=\"165\" rx=\"28\" ry=\"18\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"2\"/>\n  <text x=\"340\" y=\"169\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\" fill=\"#15803d\">R</text>\n  <!-- M -->\n  <ellipse cx=\"130\" cy=\"115\" rx=\"28\" ry=\"18\" fill=\"#dbeafe\" stroke=\"#3b82f6\" stroke-width=\"2\"/>\n  <text x=\"130\" y=\"119\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\" fill=\"#1d4ed8\">M</text>\n  <line x1=\"80\" y1=\"155\" x2=\"112\" y2=\"128\" stroke=\"#64748b\" stroke-width=\"1.5\"/>\n  <polygon points=\"109,123 118,128 111,135\" fill=\"#64748b\"/>\n  <line x1=\"178\" y1=\"155\" x2=\"148\" y2=\"128\" stroke=\"#64748b\" stroke-width=\"1.5\"/>\n  <polygon points=\"151,123 142,128 149,135\" fill=\"#64748b\"/>\n  <!-- N -->\n  <ellipse cx=\"270\" cy=\"115\" rx=\"28\" ry=\"18\" fill=\"#dbeafe\" stroke=\"#3b82f6\" stroke-width=\"2\"/>\n  <text x=\"270\" y=\"119\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\" fill=\"#1d4ed8\">N</text>\n  <line x1=\"220\" y1=\"155\" x2=\"252\" y2=\"128\" stroke=\"#64748b\" stroke-width=\"1.5\"/>\n  <polygon points=\"249,123 258,128 251,135\" fill=\"#64748b\"/>\n  <line x1=\"318\" y1=\"155\" x2=\"288\" y2=\"128\" stroke=\"#64748b\" stroke-width=\"1.5\"/>\n  <polygon points=\"291,123 282,128 289,135\" fill=\"#64748b\"/>\n  <!-- O -->\n  <ellipse cx=\"70\" cy=\"60\" rx=\"28\" ry=\"18\" fill=\"#fef9c3\" stroke=\"#d97706\" stroke-width=\"2\"/>\n  <text x=\"70\" y=\"64\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\" fill=\"#92400e\">O</text>\n  <line x1=\"118\" y1=\"102\" x2=\"88\" y2=\"73\" stroke=\"#64748b\" stroke-width=\"1.5\"/>\n  <polygon points=\"91,68 82,73 89,80\" fill=\"#64748b\"/>\n  <!-- P -->\n  <ellipse cx=\"200\" cy=\"60\" rx=\"28\" ry=\"18\" fill=\"#fef9c3\" stroke=\"#d97706\" stroke-width=\"2\"/>\n  <text x=\"200\" y=\"64\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\" fill=\"#92400e\">P</text>\n  <line x1=\"258\" y1=\"102\" x2=\"218\" y2=\"73\" stroke=\"#64748b\" stroke-width=\"1.5\"/>\n  <polygon points=\"221,68 212,73 219,80\" fill=\"#64748b\"/>\n  <!-- Q -->\n  <ellipse cx=\"330\" cy=\"60\" rx=\"28\" ry=\"18\" fill=\"#fce7f3\" stroke=\"#db2777\" stroke-width=\"2\"/>\n  <text x=\"330\" y=\"64\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\" fill=\"#9d174d\">Q</text>\n  <line x1=\"88\" y1=\"55\" x2=\"302\" y2=\"55\" stroke=\"#64748b\" stroke-width=\"1.5\"/>\n  <polygon points=\"300,49 310,55 300,61\" fill=\"#64748b\"/>\n  <line x1=\"280\" y1=\"102\" x2=\"318\" y2=\"73\" stroke=\"#64748b\" stroke-width=\"1.5\"/>\n  <polygon points=\"315,68 324,73 317,80\" fill=\"#64748b\"/>\n  <!-- S -->\n  <ellipse cx=\"200\" cy=\"18\" rx=\"28\" ry=\"14\" fill=\"#ede9fe\" stroke=\"#7c3aed\" stroke-width=\"2\"/>\n  <text x=\"200\" y=\"22\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\" fill=\"#6d28d9\">S</text>\n  <line x1=\"200\" y1=\"42\" x2=\"200\" y2=\"32\" stroke=\"#64748b\" stroke-width=\"1.5\"/>\n  <polygon points=\"195,34 200,24 205,34\" fill=\"#64748b\"/>\n</svg>",
    "placeholder_roles": [],
    "options": [
      "O is only an animal eater.",
      "P, Q and S are consumers.",
      "M and N are only plant eaters.",
      "Q and N are plant-and-animal eaters."
    ],
    "answer": 1,
    "correct_answer": "P, Q and S are consumers.",
    "explanation": "Consumers are organisms that must eat other organisms to survive. In this food web, P eats N, Q eats O and N (or R), and S eats P — all are consumers. O is only an animal eater (eats M) so that is also correct, but 'P, Q and S are consumers' is the correct listed option."
  },
  {
    "id": "SCI558",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "The food relationship between four organisms is shown: W → X → Y → Z (arrows show what is eaten). Based on the food chain, which statement(s) is/are correct?\nA: W is the prey of X.\nB: Y is the predator of Z.\nC: Y is both prey and predator.\nD: There are only 2 predators in the food chain.",
    "diagram": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 90\" width=\"380\" font-family=\"Arial,sans-serif\">\n  <text x=\"190\" y=\"15\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\" fill=\"#1e293b\">Food Chain</text>\n  <ellipse cx=\"55\" cy=\"55\" rx=\"32\" ry=\"22\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"2\"/>\n  <text x=\"55\" y=\"59\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\" fill=\"#15803d\">W</text>\n  <text x=\"55\" y=\"82\" text-anchor=\"middle\" font-size=\"9\" fill=\"#15803d\">(plant)</text>\n  <line x1=\"87\" y1=\"55\" x2=\"118\" y2=\"55\" stroke=\"#64748b\" stroke-width=\"1.5\"/>\n  <polygon points=\"116,49 126,55 116,61\" fill=\"#64748b\"/>\n  <text x=\"107\" y=\"48\" text-anchor=\"middle\" font-size=\"9\" fill=\"#64748b\">eaten by</text>\n  <ellipse cx=\"155\" cy=\"55\" rx=\"32\" ry=\"22\" fill=\"#dbeafe\" stroke=\"#3b82f6\" stroke-width=\"2\"/>\n  <text x=\"155\" y=\"59\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\" fill=\"#1d4ed8\">X</text>\n  <line x1=\"187\" y1=\"55\" x2=\"218\" y2=\"55\" stroke=\"#64748b\" stroke-width=\"1.5\"/>\n  <polygon points=\"216,49 226,55 216,61\" fill=\"#64748b\"/>\n  <ellipse cx=\"255\" cy=\"55\" rx=\"32\" ry=\"22\" fill=\"#fef9c3\" stroke=\"#d97706\" stroke-width=\"2\"/>\n  <text x=\"255\" y=\"59\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\" fill=\"#92400e\">Y</text>\n  <line x1=\"287\" y1=\"55\" x2=\"318\" y2=\"55\" stroke=\"#64748b\" stroke-width=\"1.5\"/>\n  <polygon points=\"316,49 326,55 316,61\" fill=\"#64748b\"/>\n  <ellipse cx=\"355\" cy=\"55\" rx=\"32\" ry=\"22\" fill=\"#fce7f3\" stroke=\"#db2777\" stroke-width=\"2\"/>\n  <text x=\"355\" y=\"59\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\" fill=\"#9d174d\">Z</text>\n</svg>",
    "placeholder_roles": [],
    "options": [
      "A and B only",
      "B and C only",
      "A and D only",
      "C and D only"
    ],
    "answer": 3,
    "correct_answer": "C and D only",
    "explanation": "A: Incorrect — W is a plant, and prey refers to an animal hunted by a predator. B: Incorrect — Y is the prey of Z (Z eats Y), not the predator of Z. C: Correct — Y is eaten by Z (Y is prey) and Y eats X (Y is predator). D: Correct — X and Z are the two predators in this food chain (X eats W, Z eats Y)."
  },
  {
    "id": "SCI559",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "{CHARACTER_0} is learning about animal adaptations. Which of the following is an example of a behavioural adaptation?",
    "diagram": None,
    "placeholder_roles": ["protagonist"],
    "options": [
      "Eagles have sharp claws to hunt prey.",
      "Squirrels collect and store food for winter.",
      "Turtles have shells to protect their bodies against predators.",
      "Rabbits have large ears so they can hear and avoid danger."
    ],
    "answer": 1,
    "correct_answer": "Squirrels collect and store food for winter.",
    "explanation": "A behavioural adaptation is an action an animal performs to survive. Squirrels collecting and storing food is a behaviour — something they do — to prepare for winter. Sharp claws, shells, and large ears are all physical body parts, which are structural adaptations."
  },
  {
    "id": "SCI560",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "{CHARACTER_0} found plant X in a windy desert. The plant is short and has thin leaves. Which of the following gives the correct adaptation of Plant X and how it helps Plant X survive in a windy desert?",
    "diagram": None,
    "placeholder_roles": ["protagonist"],
    "options": [
      "(1) thin leaves — to allow more water loss",
      "(2) thin leaves — to trap less light for photosynthesis",
      "(3) grow closer to the ground — to trap less light for photosynthesis",
      "(4) grow closer to the ground — to prevent the wind from blowing plant X over"
    ],
    "answer": 3,
    "correct_answer": "(4) grow closer to the ground — to prevent the wind from blowing plant X over",
    "explanation": "Deserts can be very windy. Growing closer to the ground helps Plant X stay low and protected from strong winds, preventing it from being blown over. Thin leaves in desert plants help reduce water loss (not increase it), but that relates to heat/water survival, not wind."
  },
  {
    "id": "SCI561",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "A diagram shows substance X being transported in the human body. System A receives digested food from System B and carries it to the rest of the body. Which of the following correctly identifies Systems A and B and Substance X?",
    "diagram": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 400 170\" width=\"400\" font-family=\"Arial,sans-serif\">\n  <text x=\"200\" y=\"15\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\" fill=\"#1e293b\">Substance Transport in the Human Body</text>\n  <!-- System B (Digestive) -->\n  <rect x=\"20\" y=\"50\" width=\"140\" height=\"80\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"2\" rx=\"8\"/>\n  <text x=\"90\" y=\"80\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\" fill=\"#15803d\">System B</text>\n  <text x=\"90\" y=\"98\" text-anchor=\"middle\" font-size=\"10\" fill=\"#15803d\">(breaks down food)</text>\n  <text x=\"90\" y=\"112\" text-anchor=\"middle\" font-size=\"9\" fill=\"#15803d\">produces Substance X</text>\n  <!-- Arrow B → A -->\n  <line x1=\"160\" y1=\"90\" x2=\"208\" y2=\"90\" stroke=\"#64748b\" stroke-width=\"2\"/>\n  <polygon points=\"206,84 216,90 206,96\" fill=\"#64748b\"/>\n  <text x=\"184\" y=\"82\" text-anchor=\"middle\" font-size=\"9\" fill=\"#64748b\">X</text>\n  <!-- System A (Circulatory) -->\n  <rect x=\"218\" y=\"50\" width=\"160\" height=\"80\" fill=\"#dbeafe\" stroke=\"#3b82f6\" stroke-width=\"2\" rx=\"8\"/>\n  <text x=\"298\" y=\"80\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\" fill=\"#1d4ed8\">System A</text>\n  <text x=\"298\" y=\"98\" text-anchor=\"middle\" font-size=\"10\" fill=\"#1d4ed8\">(transports X)</text>\n  <text x=\"298\" y=\"112\" text-anchor=\"middle\" font-size=\"9\" fill=\"#1d4ed8\">to body cells</text>\n  <!-- Options table -->\n  <text x=\"200\" y=\"148\" text-anchor=\"middle\" font-size=\"10\" fill=\"#64748b\">Which system is A, which is B, and what is X?</text>\n</svg>",
    "placeholder_roles": [],
    "options": [
      "(1) System A: circulatory, System B: digestive, Substance X: oxygen",
      "(2) System A: digestive, System B: circulatory, Substance X: carbon dioxide",
      "(3) System A: circulatory, System B: digestive, Substance X: digested food",
      "(4) System A: digestive, System B: circulatory, Substance X: digested food"
    ],
    "answer": 2,
    "correct_answer": "(3) System A: circulatory, System B: digestive, Substance X: digested food",
    "explanation": "The digestive system (System B) breaks down food into digested food (Substance X). This digested food is then passed to the circulatory system (System A), which carries it through the blood to all other parts of the body."
  },
  {
    "id": "SCI562",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "The table shows information about three fuels X, Y and Z that can be burnt to produce energy:\nFuel X: lasts 110–120 years, high energy, high greenhouse gases\nFuel Y: lasts 70–80 years, low energy, medium greenhouse gases\nFuel Z: lasts 70–80 years, high energy, low greenhouse gases\nBased on the information in the table, which of the following CANNOT be concluded?",
    "diagram": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 420 160\" width=\"420\" font-family=\"Arial,sans-serif\">\n  <text x=\"210\" y=\"15\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\" fill=\"#1e293b\">Fuel Properties Table</text>\n  <!-- Header -->\n  <rect x=\"10\" y=\"25\" width=\"60\" height=\"25\" fill=\"#e2e8f0\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"40\" y=\"42\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#1e293b\">Fuel</text>\n  <rect x=\"70\" y=\"25\" width=\"110\" height=\"25\" fill=\"#e2e8f0\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"125\" y=\"42\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#1e293b\">Years can last</text>\n  <rect x=\"180\" y=\"25\" width=\"110\" height=\"25\" fill=\"#e2e8f0\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"235\" y=\"42\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#1e293b\">Energy produced</text>\n  <rect x=\"290\" y=\"25\" width=\"120\" height=\"25\" fill=\"#e2e8f0\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"350\" y=\"42\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#1e293b\">Greenhouse gases</text>\n  <!-- Row X -->\n  <rect x=\"10\" y=\"50\" width=\"60\" height=\"25\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"40\" y=\"67\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"bold\" fill=\"#1e293b\">X</text>\n  <rect x=\"70\" y=\"50\" width=\"110\" height=\"25\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"125\" y=\"67\" text-anchor=\"middle\" font-size=\"10\" fill=\"#1e293b\">110–120 years</text>\n  <rect x=\"180\" y=\"50\" width=\"110\" height=\"25\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"235\" y=\"67\" text-anchor=\"middle\" font-size=\"10\" fill=\"#1e293b\">high</text>\n  <rect x=\"290\" y=\"50\" width=\"120\" height=\"25\" fill=\"#fee2e2\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"350\" y=\"67\" text-anchor=\"middle\" font-size=\"10\" fill=\"#dc2626\">high</text>\n  <!-- Row Y -->\n  <rect x=\"10\" y=\"75\" width=\"60\" height=\"25\" fill=\"#f8fafc\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"40\" y=\"92\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"bold\" fill=\"#1e293b\">Y</text>\n  <rect x=\"70\" y=\"75\" width=\"110\" height=\"25\" fill=\"#f8fafc\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"125\" y=\"92\" text-anchor=\"middle\" font-size=\"10\" fill=\"#1e293b\">70–80 years</text>\n  <rect x=\"180\" y=\"75\" width=\"110\" height=\"25\" fill=\"#f8fafc\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"235\" y=\"92\" text-anchor=\"middle\" font-size=\"10\" fill=\"#1e293b\">low</text>\n  <rect x=\"290\" y=\"75\" width=\"120\" height=\"25\" fill=\"#fef9c3\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"350\" y=\"92\" text-anchor=\"middle\" font-size=\"10\" fill=\"#92400e\">medium</text>\n  <!-- Row Z -->\n  <rect x=\"10\" y=\"100\" width=\"60\" height=\"25\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"40\" y=\"117\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"bold\" fill=\"#1e293b\">Z</text>\n  <rect x=\"70\" y=\"100\" width=\"110\" height=\"25\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"125\" y=\"117\" text-anchor=\"middle\" font-size=\"10\" fill=\"#1e293b\">70–80 years</text>\n  <rect x=\"180\" y=\"100\" width=\"110\" height=\"25\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"235\" y=\"117\" text-anchor=\"middle\" font-size=\"10\" fill=\"#1e293b\">high</text>\n  <rect x=\"290\" y=\"100\" width=\"120\" height=\"25\" fill=\"#dcfce7\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"350\" y=\"117\" text-anchor=\"middle\" font-size=\"10\" fill=\"#15803d\">low</text>\n  <text x=\"210\" y=\"148\" text-anchor=\"middle\" font-size=\"9\" fill=\"#64748b\">All three fuels are burnt → non-renewable | All contribute greenhouse gases</text>\n</svg>",
    "placeholder_roles": [],
    "options": [
      "Acid rain forms only from the burning of X.",
      "X, Y and Z are non-renewable sources of energy.",
      "Burning of X, Y and Z contributes to global warming.",
      "Z has the lowest impact on the environment, compared to X and Y."
    ],
    "answer": 0,
    "correct_answer": "Acid rain forms only from the burning of X.",
    "explanation": "The table shows fuel X produces the highest greenhouse gases, but it does NOT state that acid rain comes only from X. We cannot conclude something not supported by the data. The other three statements can all be concluded: all three fuels are burnt so they are non-renewable, burning all contributes to global warming, and Z produces the least greenhouse gases."
  },
  {
    "id": "SCI563",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "A graph shows the average yearly temperature of Country P rising steadily over 20 years. Which of the following activities could have caused this temperature increase?\nA: Picking up litter from the ground\nB: Travelling on the road in petrol vehicles\nC: Clearing of forests by cutting down trees\nD: Turning off the tap when soaping the hands",
    "diagram": None,
    "placeholder_roles": [],
    "options": [
      "A and C only",
      "A and D only",
      "B and C only",
      "B and D only"
    ],
    "answer": 2,
    "correct_answer": "B and C only",
    "explanation": "The graph shows rising temperature due to global warming. This is caused by activities that release greenhouse gases: driving petrol vehicles (B) produces carbon dioxide, and cutting down trees (C) reduces the number of trees that absorb carbon dioxide. Picking up litter and turning off taps are good habits but do not directly affect global temperature."
  },
  {
    "id": "SCI564",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "The diagrams show three different kinds of fruits: Fruit A has a fibrous husk, Fruit B has wing-like structures, Fruit C has hook-like structures. Which of the following correctly identifies the dispersal method for fruits A, B and C?",
    "diagram": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 420 165\" width=\"420\" font-family=\"Arial,sans-serif\">\n  <text x=\"210\" y=\"15\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\" fill=\"#1e293b\">Fruit Dispersal Methods</text>\n  <!-- Fruit A (coconut-like, fibrous) -->\n  <ellipse cx=\"70\" cy=\"90\" rx=\"45\" ry=\"38\" fill=\"#d4a574\" stroke=\"#92400e\" stroke-width=\"2\"/>\n  <text x=\"70\" y=\"86\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"white\">Fruit A</text>\n  <text x=\"70\" y=\"100\" text-anchor=\"middle\" font-size=\"9\" fill=\"#fde68a\">fibrous husk</text>\n  <text x=\"70\" y=\"145\" text-anchor=\"middle\" font-size=\"10\" fill=\"#0369a1\">🌊 Water dispersal</text>\n  <!-- Fruit B (winged) -->\n  <ellipse cx=\"210\" cy=\"95\" rx=\"18\" ry=\"12\" fill=\"#86efac\" stroke=\"#15803d\" stroke-width=\"1.5\"/>\n  <path d=\"M228,90 Q260,70 280,85\" stroke=\"#16a34a\" stroke-width=\"2\" fill=\"#bbf7d0\"/>\n  <path d=\"M228,100 Q260,120 280,105\" stroke=\"#16a34a\" stroke-width=\"2\" fill=\"#bbf7d0\"/>\n  <text x=\"248\" y=\"82\" text-anchor=\"middle\" font-size=\"9\" fill=\"#15803d\">wing</text>\n  <text x=\"210\" y=\"80\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#1e293b\">Fruit B</text>\n  <text x=\"248\" y=\"145\" text-anchor=\"middle\" font-size=\"10\" fill=\"#6d28d9\">💨 Wind dispersal</text>\n  <!-- Fruit C (hooked) -->\n  <ellipse cx=\"360\" cy=\"90\" rx=\"22\" ry=\"28\" fill=\"#fde68a\" stroke=\"#d97706\" stroke-width=\"1.5\"/>\n  <text x=\"360\" y=\"86\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#92400e\">Fruit C</text>\n  <line x1=\"382\" y1=\"80\" x2=\"398\" y2=\"68\" stroke=\"#92400e\" stroke-width=\"1.5\"/>\n  <path d=\"M398,68 Q408,60 405,72\" stroke=\"#92400e\" stroke-width=\"1.5\" fill=\"none\"/>\n  <line x1=\"382\" y1=\"90\" x2=\"400\" y2=\"90\" stroke=\"#92400e\" stroke-width=\"1.5\"/>\n  <path d=\"M400,90 Q412,82 408,95\" stroke=\"#92400e\" stroke-width=\"1.5\" fill=\"none\"/>\n  <text x=\"360\" y=\"145\" text-anchor=\"middle\" font-size=\"10\" fill=\"#15803d\">🐾 Animal dispersal</text>\n</svg>",
    "placeholder_roles": [],
    "options": [
      "(1) Fruit A: water, B: animal, C: wind",
      "(2) Fruit A: splitting, B: wind, C: animal",
      "(3) Fruit A: animal, B: water, C: splitting",
      "(4) Fruit A: water, B: wind, C: animal"
    ],
    "answer": 3,
    "correct_answer": "(4) Fruit A: water, B: wind, C: animal",
    "explanation": "Fruit A has a fibrous husk that allows it to float in water — dispersed by water. Fruit B has wing-like structures to catch the wind — dispersed by wind. Fruit C has hook-like structures that catch onto animal fur — dispersed by animals."
  },
  {
    "id": "SCI565",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "The diagram shows the female reproductive system with parts A, B, C, and D. Which of the following correctly matches the parts to their functions?\n(Part that produces eggs / Part where fertilised egg develops)",
    "diagram": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 200\" width=\"300\" font-family=\"Arial,sans-serif\">\n  <text x=\"150\" y=\"15\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\" fill=\"#1e293b\">Female Reproductive System</text>\n  <!-- Ovaries (D) -->\n  <ellipse cx=\"80\" cy=\"80\" rx=\"22\" ry=\"15\" fill=\"#dbeafe\" stroke=\"#3b82f6\" stroke-width=\"2\"/>\n  <text x=\"56\" y=\"76\" font-size=\"13\" font-weight=\"bold\" fill=\"#1d4ed8\">D</text>\n  <ellipse cx=\"180\" cy=\"80\" rx=\"22\" ry=\"15\" fill=\"#dbeafe\" stroke=\"#3b82f6\" stroke-width=\"2\"/>\n  <!-- Fallopian tubes (A) -->\n  <path d=\"M102,80 Q130,62 158,80\" stroke=\"#7c3aed\" stroke-width=\"2\" fill=\"none\"/>\n  <text x=\"130\" y=\"56\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\" fill=\"#7c3aed\">A</text>\n  <!-- Uterus (B) -->\n  <path d=\"M96,92 Q130,118 164,92\" stroke=\"#16a34a\" stroke-width=\"2\" fill=\"#bbf7d0\"/>\n  <text x=\"133\" y=\"112\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\" fill=\"#15803d\">B</text>\n  <!-- Vagina (C) -->\n  <rect x=\"118\" y=\"118\" width=\"24\" height=\"38\" fill=\"#fde68a\" stroke=\"#d97706\" stroke-width=\"1.5\" rx=\"3\"/>\n  <text x=\"148\" y=\"140\" font-size=\"13\" font-weight=\"bold\" fill=\"#d97706\">C</text>\n  <text x=\"150\" y=\"180\" text-anchor=\"middle\" font-size=\"9\" fill=\"#64748b\">D=ovaries · A=fallopian tubes</text>\n  <text x=\"150\" y=\"192\" text-anchor=\"middle\" font-size=\"9\" fill=\"#64748b\">B=uterus · C=vagina</text>\n</svg>",
    "placeholder_roles": [],
    "options": [
      "(1) Part A produces eggs / Part C is where fertilised egg develops",
      "(2) Part B produces eggs / Part A is where fertilised egg develops",
      "(3) Part D produces eggs / Part C is where fertilised egg develops",
      "(4) Part D produces eggs / Part B is where fertilised egg develops"
    ],
    "answer": 3,
    "correct_answer": "(4) Part D produces eggs / Part B is where fertilised egg develops",
    "explanation": "Part D (ovaries) produce egg cells. Part B (uterus/womb) is where a fertilised egg implants and develops into a baby. Part A (fallopian tubes) carry the egg, and Part C (vagina) is the birth canal."
  },
  {
    "id": "SCI566",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "{CHARACTER_0} made a cut on the stem of a plant to remove the food-carrying tube. The plant was watered daily and placed in a sunny spot. Which of the following would {CHARACTER_0} most likely observe after 2 weeks?\nA: The fruits would become smaller and less juicy.\nB: Only the top part of the cut stem would become swollen.\nC: Both the top and bottom parts of the cut stem would become swollen.",
    "diagram": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 190\" width=\"300\" font-family=\"Arial,sans-serif\">\n  <text x=\"150\" y=\"15\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"bold\" fill=\"#1e293b\">Plant with Food-Carrying Tube Removed</text>\n  <!-- Stem -->\n  <rect x=\"138\" y=\"28\" width=\"24\" height=\"140\" fill=\"#86efac\" stroke=\"#15803d\" stroke-width=\"1.5\" rx=\"2\"/>\n  <!-- Cut mark -->\n  <rect x=\"128\" y=\"98\" width=\"44\" height=\"12\" fill=\"#ef4444\" stroke=\"#b91c1c\" stroke-width=\"1.5\" rx=\"2\"/>\n  <text x=\"185\" y=\"108\" font-size=\"10\" fill=\"#dc2626\" font-weight=\"bold\">← CUT</text>\n  <!-- Top swelling -->\n  <ellipse cx=\"150\" cy=\"88\" rx=\"30\" ry=\"10\" fill=\"#fde68a\" stroke=\"#d97706\" stroke-width=\"1.5\" stroke-dasharray=\"3,2\"/>\n  <text x=\"195\" y=\"92\" font-size=\"9\" fill=\"#d97706\">swollen (food trapped)</text>\n  <!-- Leaves at top -->\n  <path d=\"M138,55 Q118,40 110,48\" stroke=\"#16a34a\" stroke-width=\"1.5\" fill=\"#bbf7d0\"/>\n  <path d=\"M162,60 Q182,45 190,53\" stroke=\"#16a34a\" stroke-width=\"1.5\" fill=\"#bbf7d0\"/>\n  <!-- Fruit -->\n  <ellipse cx=\"150\" cy=\"42\" rx=\"15\" ry=\"10\" fill=\"#fca5a5\" stroke=\"#ef4444\" stroke-width=\"1.5\"/>\n  <text x=\"175\" y=\"46\" font-size=\"9\" fill=\"#dc2626\">fruit (smaller)</text>\n  <!-- Bottom - roots -->\n  <path d=\"M138,168 Q125,180 115,185\" stroke=\"#92400e\" stroke-width=\"1.5\" fill=\"none\"/>\n  <path d=\"M150,170 Q150,182 148,188\" stroke=\"#92400e\" stroke-width=\"1.5\" fill=\"none\"/>\n  <path d=\"M162,168 Q175,180 185,185\" stroke=\"#92400e\" stroke-width=\"1.5\" fill=\"none\"/>\n  <text x=\"150\" y=\"178\" text-anchor=\"middle\" font-size=\"9\" fill=\"#64748b\">roots (water still absorbed)</text>\n  <!-- Arrow showing food blocked -->\n  <text x=\"100\" y=\"75\" font-size=\"9\" fill=\"#f97316\">food ↑↑</text>\n  <text x=\"100\" y=\"125\" font-size=\"9\" fill=\"#94a3b8\">food BLOCKED</text>\n</svg>",
    "placeholder_roles": ["protagonist"],
    "options": [
      "B only",
      "C only",
      "A and B only",
      "A and C only"
    ],
    "answer": 2,
    "correct_answer": "A and B only",
    "explanation": "When food-carrying tubes are removed, food made in the leaves cannot travel down past the cut. It accumulates above the cut, causing the top part of the stem to swell (B). Since no food reaches the fruits, they become smaller and less juicy (A). The bottom part does not swell because food cannot reach it."
  },
  {
    "id": "SCI567",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "{CHARACTER_0} released a ball at point A (highest point). It rolled past point B (lowest point) to point C (another elevated point) before rolling back. Which of the following statements correctly states the amount of kinetic and potential energy the ball had at different points?",
    "diagram": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 170\" width=\"380\" font-family=\"Arial,sans-serif\">\n  <text x=\"190\" y=\"15\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\" fill=\"#1e293b\">Ball Rolling: Points A, B, C</text>\n  <!-- Track shape -->\n  <path d=\"M30,60 Q120,150 200,150 Q280,150 360,90\" stroke=\"#64748b\" stroke-width=\"2\" fill=\"none\"/>\n  <!-- Ball A (high left) -->\n  <circle cx=\"55\" cy=\"72\" r=\"14\" fill=\"#fee2e2\" stroke=\"#ef4444\" stroke-width=\"2\"/>\n  <text x=\"55\" y=\"77\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"bold\" fill=\"#dc2626\">A</text>\n  <text x=\"55\" y=\"53\" text-anchor=\"middle\" font-size=\"9\" fill=\"#dc2626\">Max PE</text>\n  <!-- Ball B (low, middle) -->\n  <circle cx=\"200\" cy=\"136\" r=\"14\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"2\"/>\n  <text x=\"200\" y=\"141\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"bold\" fill=\"#15803d\">B</text>\n  <text x=\"200\" y=\"118\" text-anchor=\"middle\" font-size=\"9\" fill=\"#15803d\">Max KE</text>\n  <!-- Ball C (high right) -->\n  <circle cx=\"335\" cy=\"100\" r=\"14\" fill=\"#ede9fe\" stroke=\"#7c3aed\" stroke-width=\"2\"/>\n  <text x=\"335\" y=\"105\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"bold\" fill=\"#6d28d9\">C</text>\n  <text x=\"335\" y=\"82\" text-anchor=\"middle\" font-size=\"9\" fill=\"#6d28d9\">PE &gt; B</text>\n  <!-- Height markers -->\n  <line x1=\"30\" y1=\"60\" x2=\"30\" y2=\"150\" stroke=\"#3b82f6\" stroke-width=\"1\" stroke-dasharray=\"4\"/>\n  <line x1=\"200\" y1=\"150\" x2=\"200\" y2=\"155\" stroke=\"#64748b\" stroke-width=\"1\"/>\n  <line x1=\"360\" y1=\"90\" x2=\"360\" y2=\"150\" stroke=\"#7c3aed\" stroke-width=\"1\" stroke-dasharray=\"4\"/>\n  <text x=\"22\" y=\"108\" font-size=\"8\" fill=\"#3b82f6\">high</text>\n  <text x=\"350\" y=\"125\" font-size=\"8\" fill=\"#7c3aed\">med</text>\n  <text x=\"190\" y=\"160\" font-size=\"8\" fill=\"#64748b\">low</text>\n</svg>",
    "placeholder_roles": ["protagonist"],
    "options": [
      "The ball had no potential energy at point C.",
      "The ball had less potential energy at point A than point C.",
      "The ball had more potential energy at point C than point B.",
      "The ball had the same amount of kinetic energy at points A and B."
    ],
    "answer": 2,
    "correct_answer": "The ball had more potential energy at point C than point B.",
    "explanation": "Potential energy depends on height. Point C is higher than Point B, so the ball has more potential energy at C than at B. Point A is the highest, so it has the most potential energy overall, making option 2 wrong (A has more PE than C, not less)."
  },
  {
    "id": "SCI568",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "A ball moves down a smooth slope and hits block L. Block L moves along surface M and stops at position N. The following changes are made individually:\nA: Decrease the mass of block L\nB: Increase the height of the slope\nC: Increase the width of the wooden plank\nD: Decrease the roughness of surface M\nWhich of the following change(s) would make block L move further than position N?",
    "diagram": None,
    "placeholder_roles": [],
    "options": [
      "A and C only",
      "A, B and D only",
      "B, C and D only",
      "A, B, C and D"
    ],
    "answer": 1,
    "correct_answer": "A, B and D only",
    "explanation": "To make the block move further: A (less mass) means less inertia so it travels further with the same force; B (higher slope) gives the ball more potential energy and hits the block harder; D (smoother surface) reduces friction so the block slides further. C (wider plank) does not affect how far the block moves."
  },
  {
    "id": "SCI569",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "Two identical 500g objects were placed separately on two similar springs R and T made of different materials. Both springs had the same length at the start. Spring R compressed less than spring T. Which of the following about the springs is correct?",
    "diagram": None,
    "placeholder_roles": [],
    "options": [
      "Spring R is stiffer than spring T.",
      "Spring T requires less force to compress it than spring R.",
      "More force was exerted on spring R by the object than on spring T.",
      "The gravitational force exerted on both springs by the object is the same."
    ],
    "answer": 3,
    "correct_answer": "The gravitational force exerted on both springs by the object is the same.",
    "explanation": "Gravitational force depends on the mass of the object. Since both objects are identical (500g), the Earth pulls on them with the exact same amount of gravitational force. The difference in compression is due to the materials of the springs (R is stiffer than T), not a difference in the force applied."
  },
  {
    "id": "SCI570",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "{CHARACTER_0} kicked a toy upwards. The toy travelled from point X (where the shoe hit it), up through Y, to reach the highest point Z. Which of the following best describes the forces acting on the toy from X to Z?",
    "diagram": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 200\" width=\"300\" font-family=\"Arial,sans-serif\">\n  <text x=\"150\" y=\"15\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"bold\" fill=\"#1e293b\">Toy Kicked Upward: X → Y → Z</text>\n  <!-- Path -->\n  <path d=\"M80,170 Q100,120 130,60\" stroke=\"#94a3b8\" stroke-width=\"1.5\" fill=\"none\" stroke-dasharray=\"5,3\"/>\n  <!-- X -->\n  <circle cx=\"80\" cy=\"170\" r=\"14\" fill=\"#fde68a\" stroke=\"#d97706\" stroke-width=\"2\"/>\n  <text x=\"80\" y=\"175\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"bold\" fill=\"#92400e\">X</text>\n  <text x=\"55\" y=\"168\" font-size=\"9\" fill=\"#92400e\">kick here</text>\n  <!-- Y -->\n  <circle cx=\"108\" cy=\"115\" r=\"14\" fill=\"#dbeafe\" stroke=\"#3b82f6\" stroke-width=\"2\"/>\n  <text x=\"108\" y=\"120\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"bold\" fill=\"#1d4ed8\">Y</text>\n  <!-- Z (highest) -->\n  <circle cx=\"130\" cy=\"60\" r=\"14\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"2\"/>\n  <text x=\"130\" y=\"65\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"bold\" fill=\"#15803d\">Z</text>\n  <text x=\"150\" y=\"58\" font-size=\"9\" fill=\"#15803d\">highest point</text>\n  <!-- Gravity arrows at each point -->\n  <line x1=\"80\" y1=\"170\" x2=\"80\" y2=\"190\" stroke=\"#dc2626\" stroke-width=\"2\"/>\n  <polygon points=\"75,188 80,198 85,188\" fill=\"#dc2626\"/>\n  <text x=\"90\" y=\"195\" font-size=\"8\" fill=\"#dc2626\">g</text>\n  <line x1=\"108\" y1=\"115\" x2=\"108\" y2=\"135\" stroke=\"#dc2626\" stroke-width=\"2\"/>\n  <polygon points=\"103,133 108,143 113,133\" fill=\"#dc2626\"/>\n  <line x1=\"130\" y1=\"60\" x2=\"130\" y2=\"80\" stroke=\"#dc2626\" stroke-width=\"2\"/>\n  <polygon points=\"125,78 130,88 135,78\" fill=\"#dc2626\"/>\n  <text x=\"210\" y=\"160\" font-size=\"9\" fill=\"#dc2626\">Gravity acts at</text>\n  <text x=\"210\" y=\"172\" font-size=\"9\" fill=\"#dc2626\">ALL points (X, Y, Z)</text>\n</svg>",
    "placeholder_roles": ["protagonist"],
    "options": [
      "At point X, there is no gravitational force acting on the toy.",
      "At point Z, the gravitational force acting on the toy is the greatest.",
      "At point Y, the toy is moving in the same direction as gravitational force.",
      "At point X, the gravitational force acting on the toy is less than the push force of the kick on the toy."
    ],
    "answer": 3,
    "correct_answer": "At point X, the gravitational force acting on the toy is less than the push force of the kick on the toy.",
    "explanation": "For the toy to move upwards after being kicked, the push force from the foot must be greater than the gravitational force pulling it down. Gravitational force acts on the toy at all times (X, Y, and Z) with the same magnitude, so options 1 and 2 are wrong. At Y the toy moves upward but gravity acts downward, so option 3 is wrong."
  },
  {
    "id": "SCI571",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "{CHARACTER_0} wants to conserve electrical energy using a bulb. Energy conversion in a bulb: Electrical energy → Light energy + Heat energy. Two bulbs were tested:\nBulb G: light = 10.9 units, surrounding air temperature = 30°C\nBulb H: light = 11.1 units, surrounding air temperature = 52°C\nWhich of the following best explains {CHARACTER_0}'s choice of bulb?",
    "diagram": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 150\" width=\"380\" font-family=\"Arial,sans-serif\">\n  <text x=\"190\" y=\"15\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\" fill=\"#1e293b\">Bulb Comparison: G vs H</text>\n  <!-- Table -->\n  <rect x=\"20\" y=\"28\" width=\"160\" height=\"25\" fill=\"#e2e8f0\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"100\" y=\"45\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#1e293b\">Property</text>\n  <rect x=\"180\" y=\"28\" width=\"80\" height=\"25\" fill=\"#dbeafe\" stroke=\"#3b82f6\" stroke-width=\"1\"/><text x=\"220\" y=\"45\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#1d4ed8\">Bulb G</text>\n  <rect x=\"260\" y=\"28\" width=\"100\" height=\"25\" fill=\"#fee2e2\" stroke=\"#ef4444\" stroke-width=\"1\"/><text x=\"310\" y=\"45\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#dc2626\">Bulb H</text>\n  <rect x=\"20\" y=\"53\" width=\"160\" height=\"25\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"100\" y=\"70\" text-anchor=\"middle\" font-size=\"10\" fill=\"#1e293b\">Light detected (units)</text>\n  <rect x=\"180\" y=\"53\" width=\"80\" height=\"25\" fill=\"white\" stroke=\"#3b82f6\" stroke-width=\"1\"/><text x=\"220\" y=\"70\" text-anchor=\"middle\" font-size=\"11\" fill=\"#1d4ed8\">10.9</text>\n  <rect x=\"260\" y=\"53\" width=\"100\" height=\"25\" fill=\"white\" stroke=\"#ef4444\" stroke-width=\"1\"/><text x=\"310\" y=\"70\" text-anchor=\"middle\" font-size=\"11\" fill=\"#dc2626\">11.1</text>\n  <rect x=\"20\" y=\"78\" width=\"160\" height=\"25\" fill=\"#f8fafc\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"100\" y=\"95\" text-anchor=\"middle\" font-size=\"10\" fill=\"#1e293b\">Air temperature (°C)</text>\n  <rect x=\"180\" y=\"78\" width=\"80\" height=\"25\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"2\"/><text x=\"220\" y=\"95\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"bold\" fill=\"#15803d\">30°C ✓</text>\n  <rect x=\"260\" y=\"78\" width=\"100\" height=\"25\" fill=\"#fee2e2\" stroke=\"#ef4444\" stroke-width=\"1\"/><text x=\"310\" y=\"95\" text-anchor=\"middle\" font-size=\"11\" fill=\"#dc2626\">52°C</text>\n  <text x=\"190\" y=\"128\" text-anchor=\"middle\" font-size=\"10\" fill=\"#64748b\">Conserve energy = waste less as heat</text>\n  <text x=\"190\" y=\"142\" text-anchor=\"middle\" font-size=\"10\" fill=\"#15803d\">Choose G: cooler = less electrical energy wasted as heat</text>\n</svg>",
    "placeholder_roles": ["protagonist"],
    "options": [
      "(1) G — it is cooler and thus less electrical energy is converted to heat energy",
      "(2) G — it is brighter and cooler and thus more electrical energy is converted to light energy",
      "(3) H — it is brighter and thus uses less electrical energy",
      "(4) H — it is warmer and thus less electrical energy is converted to heat energy"
    ],
    "answer": 0,
    "correct_answer": "(1) G — it is cooler and thus less electrical energy is converted to heat energy",
    "explanation": "To conserve electrical energy means to waste as little as possible. Bulb G is cooler (30°C vs 52°C), which means less electrical energy is being wasted as heat. Both bulbs produce similar amounts of light, so G is more energy-efficient."
  },
  {
    "id": "SCI572",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "{CHARACTER_0} attended a performance. The performers are getting ready behind a stage curtain. Which of the following is the reason why {CHARACTER_0} could not see the performers behind the curtain?",
    "diagram": None,
    "placeholder_roles": ["protagonist"],
    "options": [
      "The performers gave out light.",
      "The performers did not reflect light.",
      "The curtain allowed light to pass through.",
      "The curtain did not allow light to pass through."
    ],
    "answer": 3,
    "correct_answer": "The curtain did not allow light to pass through.",
    "explanation": "We see things because light reflects off them and enters our eyes. The stage curtain is opaque — it does not allow light to pass through. Because the light reflected from the performers is blocked by the opaque curtain, it cannot reach the audience's eyes."
  },
  {
    "id": "SCI573",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "A block of ice was placed in an empty plastic cup and left in the kitchen at room temperature. Which of the following is correct about this setup?",
    "diagram": None,
    "placeholder_roles": [],
    "options": [
      "The ice lost heat to the plastic cup.",
      "The water lost heat to the plastic cup.",
      "The ice gained heat from the surrounding air.",
      "The surrounding air gained heat from the plastic cup."
    ],
    "answer": 2,
    "correct_answer": "The ice gained heat from the surrounding air.",
    "explanation": "Heat always travels from a warmer place to a cooler place. The surrounding air is at room temperature (warmer) and the ice is at 0°C (cooler). Therefore, heat flows from the surrounding air into the ice, causing it to melt. The ice gains heat — it does not lose heat."
  },
  {
    "id": "SCI574",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "{CHARACTER_0} is learning about matter. Matter is anything that has mass and takes up space. Which of the following is NOT matter?",
    "diagram": None,
    "placeholder_roles": ["protagonist"],
    "options": [
      "Oil",
      "Heat",
      "Steam",
      "Candle"
    ],
    "answer": 1,
    "correct_answer": "Heat",
    "explanation": "Matter is anything that has mass and takes up space. Heat is a form of energy — it does not have mass or volume, so it is not matter. Oil (liquid), steam (gas), and candle (solid) are all made of particles, have mass, and take up space, so they are matter."
  },
  {
    "id": "SCI575",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "A container has a capacity of 500 cm³. First, 50 cm³ of water is added. Then, 50 cm³ of air is pumped in. Compared to the start of the experiment, which of the following correctly shows the changes in the mass and volume of air in the container?",
    "diagram": None,
    "placeholder_roles": [],
    "options": [
      "(1) Mass: remain the same | Volume: remain the same",
      "(2) Mass: decrease | Volume: remain the same",
      "(3) Mass: decrease | Volume: decrease",
      "(4) Mass: increase | Volume: decrease"
    ],
    "answer": 3,
    "correct_answer": "(4) Mass: increase | Volume: decrease",
    "explanation": "When more air is pumped into the container, the mass of air increases because there are more air particles. However, 50 cm³ of the container is now occupied by water, leaving only 450 cm³ for air. Since air has no definite volume, it compresses to fill the remaining space, so the volume of air decreases."
  },
  {
    "id": "SCI576",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "{CHARACTER_0} lowered an electromagnet (Object K) above steel pins and recorded results. The bulb in the circuit remained lit throughout. Which of the following statements about the experiment is/are correct?\nA: Object K is made of a non-magnetic material.\nB: When distance d is 20 cm, Object K is not an electromagnet.\nC: As distance d increases, the number of steel pins attracted decreases.\nD: As distance d decreases, the gravitational force acting on the steel pins decreases.",
    "diagram": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 175\" width=\"380\" font-family=\"Arial,sans-serif\">\n  <text x=\"190\" y=\"15\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\" fill=\"#1e293b\">Electromagnet Distance Experiment</text>\n  <!-- Table -->\n  <rect x=\"20\" y=\"28\" width=\"160\" height=\"25\" fill=\"#e2e8f0\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"100\" y=\"45\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#1e293b\">Distance d (cm)</text>\n  <rect x=\"180\" y=\"28\" width=\"180\" height=\"25\" fill=\"#e2e8f0\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"270\" y=\"45\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#1e293b\">Steel pins attracted</text>\n  <rect x=\"20\" y=\"53\" width=\"160\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"100\" y=\"69\" text-anchor=\"middle\" font-size=\"11\" fill=\"#1e293b\">5</text>\n  <rect x=\"180\" y=\"53\" width=\"180\" height=\"22\" fill=\"#dcfce7\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"270\" y=\"69\" text-anchor=\"middle\" font-size=\"11\" fill=\"#15803d\">19</text>\n  <rect x=\"20\" y=\"75\" width=\"160\" height=\"22\" fill=\"#f8fafc\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"100\" y=\"91\" text-anchor=\"middle\" font-size=\"11\" fill=\"#1e293b\">10</text>\n  <rect x=\"180\" y=\"75\" width=\"180\" height=\"22\" fill=\"#f8fafc\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"270\" y=\"91\" text-anchor=\"middle\" font-size=\"11\" fill=\"#1e293b\">13</text>\n  <rect x=\"20\" y=\"97\" width=\"160\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"100\" y=\"113\" text-anchor=\"middle\" font-size=\"11\" fill=\"#1e293b\">15</text>\n  <rect x=\"180\" y=\"97\" width=\"180\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"270\" y=\"113\" text-anchor=\"middle\" font-size=\"11\" fill=\"#1e293b\">5</text>\n  <rect x=\"20\" y=\"119\" width=\"160\" height=\"22\" fill=\"#fef9c3\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"100\" y=\"135\" text-anchor=\"middle\" font-size=\"11\" fill=\"#92400e\">20</text>\n  <rect x=\"180\" y=\"119\" width=\"180\" height=\"22\" fill=\"#fee2e2\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"270\" y=\"135\" text-anchor=\"middle\" font-size=\"11\" fill=\"#dc2626\">0</text>\n  <text x=\"190\" y=\"162\" text-anchor=\"middle\" font-size=\"9\" fill=\"#64748b\">Bulb remains lit → electromagnet still works at 20cm</text>\n</svg>",
    "placeholder_roles": ["protagonist"],
    "options": [
      "C only",
      "A and B only",
      "A and D only",
      "B, C and D only"
    ],
    "answer": 0,
    "correct_answer": "C only",
    "explanation": "C is correct: the table clearly shows that as distance d increases, fewer pins are attracted (19 → 13 → 5 → 0). A is wrong because K is an electromagnet (it attracted pins). B is wrong because the bulb was still lit at 20 cm, meaning the circuit worked and K was still an electromagnet — it just couldn't attract pins from that distance. D is wrong because gravitational force does not decrease as distance decreases."
  },
  {
    "id": "SCI577",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "Object K (electromagnet) attracted 19 pins at 5 cm and 0 pins at 20 cm (bulb lit throughout). The experiment was repeated with Object L (same circuit, bulb lit). Object L attracted 0 pins at ALL distances (5, 10, 15, 20 cm). Which of the following explains these results?",
    "diagram": None,
    "placeholder_roles": [],
    "options": [
      "Distance d is too short.",
      "Object L is made of wood.",
      "No electricity passes through the coils of wire around Object L.",
      "There is a magnetic force of repulsion between Object L and the steel pins."
    ],
    "answer": 1,
    "correct_answer": "Object L is made of wood.",
    "explanation": "Object L attracted zero pins even at 5 cm, the closest distance. The bulb remained lit, so electricity was flowing through the circuit. If Object L were iron or steel, it would become an electromagnet and attract pins at close range. Since it attracted nothing even at 5 cm, Object L must be made of a non-magnetic material such as wood, which cannot be magnetised."
  }
]

# Load existing data
with open('/Users/zkaibin/website/quiz-studio/data/questions-science-p6.json', 'r') as f:
    data = json.load(f)

# Append new questions
data.extend(new_questions)

# Write back
with open('/Users/zkaibin/website/quiz-studio/data/questions-science-p6.json', 'w') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Done! Added {len(new_questions)} questions. Total now: {len(data)}")
print(f"New IDs: SCI554 to SCI577")
