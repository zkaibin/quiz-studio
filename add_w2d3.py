import json

new_questions = [
  # ===== W2D3-1 (14 questions) =====
  {
    "id": "SCI578",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "{CHARACTER_0} is studying different organisms:\nA: Moss plant\nB: Mushroom\nC: Bird's nest fern\nD: Cherry tree\nWhich of the following organisms reproduce by spores?",
    "diagram": None,
    "placeholder_roles": ["protagonist"],
    "options": [
      "A and B only",
      "A and D only",
      "B and C only",
      "B, C and D only"
    ],
    "answer": 2,
    "correct_answer": "B and C only",
    "explanation": "Mushrooms (B) reproduce by releasing spores. Bird's nest ferns (C) are ferns that also reproduce by spores. Moss plants reproduce by spores too — but the question specifies B and C. Cherry trees reproduce by seeds, not spores."
  },
  {
    "id": "SCI579",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "{CHARACTER_0} is classifying three animals using a flowchart:\nX: Wolf — has hair, four limbs, warm-blooded\nY: Goldfish — has scales, gills, cold-blooded\nZ: Bat — has hair, wings, warm-blooded\nWhich row correctly identifies the animal groups for X (wolf), Y (goldfish) and Z (bat)?",
    "diagram": None,
    "placeholder_roles": ["protagonist"],
    "options": [
      "(1) X: reptile | Y: mammal | Z: fish",
      "(2) X: fish | Y: mammal | Z: reptile",
      "(3) X: reptile | Y: fish | Z: mammal",
      "(4) X: mammal | Y: fish | Z: mammal"
    ],
    "answer": 3,
    "correct_answer": "(4) X: mammal | Y: fish | Z: mammal",
    "explanation": "Both the wolf (X) and bat (Z) are mammals — they have hair/fur, are warm-blooded, and give birth to live young. The goldfish (Y) is a fish — it has scales, gills, and is cold-blooded."
  },
  {
    "id": "SCI580",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "The diagram shows different setups to find out which conditions are needed for germination. Water, air, and warmth are tested. Which combination of conditions is needed for a seed to germinate?",
    "diagram": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 420 180\" width=\"420\" font-family=\"Arial,sans-serif\">\n  <text x=\"210\" y=\"15\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\" fill=\"#1e293b\">Germination Conditions Experiment</text>\n  <!-- Setup A: no water -->\n  <rect x=\"10\" y=\"30\" width=\"90\" height=\"115\" fill=\"#fef9c3\" stroke=\"#d97706\" stroke-width=\"1.5\" rx=\"5\"/>\n  <text x=\"55\" y=\"48\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#92400e\">Setup A</text>\n  <text x=\"55\" y=\"64\" text-anchor=\"middle\" font-size=\"9\" fill=\"#92400e\">No water</text>\n  <text x=\"55\" y=\"79\" text-anchor=\"middle\" font-size=\"9\" fill=\"#1e293b\">Air ✓</text>\n  <text x=\"55\" y=\"93\" text-anchor=\"middle\" font-size=\"9\" fill=\"#1e293b\">Warmth ✓</text>\n  <text x=\"55\" y=\"120\" text-anchor=\"middle\" font-size=\"11\" fill=\"#dc2626\">✗ NOT germinate</text>\n  <!-- Setup B: no air -->\n  <rect x=\"115\" y=\"30\" width=\"90\" height=\"115\" fill=\"#dbeafe\" stroke=\"#3b82f6\" stroke-width=\"1.5\" rx=\"5\"/>\n  <text x=\"160\" y=\"48\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#1d4ed8\">Setup B</text>\n  <text x=\"160\" y=\"64\" text-anchor=\"middle\" font-size=\"9\" fill=\"#1d4ed8\">No air</text>\n  <text x=\"160\" y=\"79\" text-anchor=\"middle\" font-size=\"9\" fill=\"#1e293b\">Water ✓</text>\n  <text x=\"160\" y=\"93\" text-anchor=\"middle\" font-size=\"9\" fill=\"#1e293b\">Warmth ✓</text>\n  <text x=\"160\" y=\"120\" text-anchor=\"middle\" font-size=\"11\" fill=\"#dc2626\">✗ NOT germinate</text>\n  <!-- Setup C: cold -->\n  <rect x=\"220\" y=\"30\" width=\"90\" height=\"115\" fill=\"#e0e7ff\" stroke=\"#6366f1\" stroke-width=\"1.5\" rx=\"5\"/>\n  <text x=\"265\" y=\"48\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#4338ca\">Setup C</text>\n  <text x=\"265\" y=\"64\" text-anchor=\"middle\" font-size=\"9\" fill=\"#4338ca\">Cold (4°C)</text>\n  <text x=\"265\" y=\"79\" text-anchor=\"middle\" font-size=\"9\" fill=\"#1e293b\">Water ✓</text>\n  <text x=\"265\" y=\"93\" text-anchor=\"middle\" font-size=\"9\" fill=\"#1e293b\">Air ✓</text>\n  <text x=\"265\" y=\"120\" text-anchor=\"middle\" font-size=\"11\" fill=\"#dc2626\">✗ NOT germinate</text>\n  <!-- Setup D: all present -->\n  <rect x=\"325\" y=\"30\" width=\"85\" height=\"115\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"2\" rx=\"5\"/>\n  <text x=\"367\" y=\"48\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#15803d\">Setup D</text>\n  <text x=\"367\" y=\"64\" text-anchor=\"middle\" font-size=\"9\" fill=\"#15803d\">All present</text>\n  <text x=\"367\" y=\"79\" text-anchor=\"middle\" font-size=\"9\" fill=\"#1e293b\">Water ✓</text>\n  <text x=\"367\" y=\"93\" text-anchor=\"middle\" font-size=\"9\" fill=\"#1e293b\">Air ✓</text>\n  <text x=\"367\" y=\"107\" text-anchor=\"middle\" font-size=\"9\" fill=\"#1e293b\">Warmth ✓</text>\n  <text x=\"367\" y=\"128\" text-anchor=\"middle\" font-size=\"11\" fill=\"#16a34a\">✓ Germinates!</text>\n</svg>",
    "placeholder_roles": [],
    "options": [
      "Air and warmth only",
      "Water and air only",
      "Water and warmth only",
      "Air, water and warmth"
    ],
    "answer": 3,
    "correct_answer": "Air, water and warmth",
    "explanation": "Seeds need all three conditions to germinate: water (for chemical reactions inside the seed), air (for respiration to provide energy), and warmth (for enzymes to work). Removing any one of these prevents germination, as seen in Setups A, B, and C."
  },
  {
    "id": "SCI581",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "The table shows the characteristics of two animals L and M. Which row correctly matches the characteristics to animals L and M?\n• Animal L: has 3 life stages, young resembles the adult\n• Animal M: young lives in water, undergoes complete metamorphosis",
    "diagram": None,
    "placeholder_roles": [],
    "options": [
      "(1) L: grasshopper | M: mosquito",
      "(2) L: mosquito | M: butterfly",
      "(3) L: butterfly | M: dragonfly",
      "(4) L: cockroach | M: frog"
    ],
    "answer": 0,
    "correct_answer": "(1) L: grasshopper | M: mosquito",
    "explanation": "The grasshopper matches Animal L: it has 3 life stages (egg → nymph → adult) and the nymph resembles the adult (incomplete metamorphosis). The mosquito matches Animal M: it has 4 life stages and the larvae live in water (complete metamorphosis)."
  },
  {
    "id": "SCI582",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "The diagram shows a human female reproductive system (parts P, Q, R, S) and a flower (parts W, X, Y, Z). In which structures are the reproductive cells stored?\nHuman: Q = ovaries, R = fallopian tubes\nFlower: Y = anthers, Z = ovary",
    "diagram": None,
    "placeholder_roles": [],
    "options": [
      "P and W",
      "Q and Y",
      "R and X",
      "S and Z"
    ],
    "answer": 1,
    "correct_answer": "Q and Y",
    "explanation": "The ovaries (Q) in the human female reproductive system store the egg cells (female reproductive cells). The anthers (Y) in the flower store pollen grains (male reproductive cells). These are both the storage sites for reproductive cells."
  },
  {
    "id": "SCI583",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "{CHARACTER_0} collected three different seeds: Seed P (feathery, light), Seed Q (has hooks), Seed R (explodes from pod when ripe). Which row correctly matches each seed to its dispersal method?",
    "diagram": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 140\" width=\"380\" font-family=\"Arial,sans-serif\">\n  <text x=\"190\" y=\"15\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\" fill=\"#1e293b\">Seed Dispersal Methods</text>\n  <!-- Seed P (feathery/wind) -->\n  <ellipse cx=\"70\" cy=\"80\" rx=\"10\" ry=\"8\" fill=\"#fde68a\" stroke=\"#d97706\" stroke-width=\"1.5\"/>\n  <line x1=\"70\" y1=\"72\" x2=\"70\" y2=\"38\" stroke=\"#d97706\" stroke-width=\"1\"/>\n  <path d=\"M70,38 Q58,30 50,38\" stroke=\"#d97706\" stroke-width=\"1\" fill=\"#fde68a\"/>\n  <path d=\"M70,38 Q82,30 90,38\" stroke=\"#d97706\" stroke-width=\"1\" fill=\"#fde68a\"/>\n  <path d=\"M70,44 Q55,36 48,44\" stroke=\"#d97706\" stroke-width=\"1\" fill=\"#fde68a\"/>\n  <path d=\"M70,44 Q85,36 92,44\" stroke=\"#d97706\" stroke-width=\"1\" fill=\"#fde68a\"/>\n  <text x=\"70\" y=\"100\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#1e293b\">Seed P</text>\n  <text x=\"70\" y=\"113\" text-anchor=\"middle\" font-size=\"9\" fill=\"#7c3aed\">feathery / light</text>\n  <text x=\"70\" y=\"125\" text-anchor=\"middle\" font-size=\"9\" fill=\"#7c3aed\">💨 Wind</text>\n  <!-- Seed Q (hooks/animal) -->\n  <ellipse cx=\"190\" cy=\"78\" rx=\"12\" ry=\"10\" fill=\"#bbf7d0\" stroke=\"#16a34a\" stroke-width=\"1.5\"/>\n  <line x1=\"202\" y1=\"74\" x2=\"216\" y2=\"62\" stroke=\"#16a34a\" stroke-width=\"1.5\"/>\n  <path d=\"M216,62 Q225,54 222,66\" stroke=\"#16a34a\" stroke-width=\"1.5\" fill=\"none\"/>\n  <line x1=\"202\" y1=\"82\" x2=\"218\" y2=\"82\" stroke=\"#16a34a\" stroke-width=\"1.5\"/>\n  <path d=\"M218,82 Q228,76 224,88\" stroke=\"#16a34a\" stroke-width=\"1.5\" fill=\"none\"/>\n  <text x=\"190\" y=\"100\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#1e293b\">Seed Q</text>\n  <text x=\"190\" y=\"113\" text-anchor=\"middle\" font-size=\"9\" fill=\"#15803d\">hook-like structures</text>\n  <text x=\"190\" y=\"125\" text-anchor=\"middle\" font-size=\"9\" fill=\"#15803d\">🐾 Animal</text>\n  <!-- Seed R (explosive/splitting) -->\n  <rect x=\"300\" y=\"62\" width=\"28\" height=\"32\" fill=\"#fca5a5\" stroke=\"#dc2626\" stroke-width=\"1.5\" rx=\"3\"/>\n  <line x1=\"300\" y1=\"78\" x2=\"286\" y2=\"68\" stroke=\"#dc2626\" stroke-width=\"1.5\"/>\n  <line x1=\"300\" y1=\"80\" x2=\"284\" y2=\"85\" stroke=\"#dc2626\" stroke-width=\"1.5\"/>\n  <line x1=\"328\" y1=\"68\" x2=\"342\" y2=\"58\" stroke=\"#dc2626\" stroke-width=\"1.5\"/>\n  <text x=\"314\" y=\"100\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#1e293b\">Seed R</text>\n  <text x=\"314\" y=\"113\" text-anchor=\"middle\" font-size=\"9\" fill=\"#dc2626\">explosive pod</text>\n  <text x=\"314\" y=\"125\" text-anchor=\"middle\" font-size=\"9\" fill=\"#dc2626\">💥 Splitting</text>\n</svg>",
    "placeholder_roles": ["protagonist"],
    "options": [
      "(1) P: wind | Q: water | R: animal",
      "(2) P: wind | Q: animal | R: splitting",
      "(3) P: animal | Q: water | R: wind",
      "(4) P: splitting | Q: animal | R: wind"
    ],
    "answer": 1,
    "correct_answer": "(2) P: wind | Q: animal | R: splitting",
    "explanation": "Seed P is feathery and light — it can be carried by the wind. Seed Q has hook-like structures that attach to animal fur for dispersal. Seed R is in an explosive pod that splits open to scatter seeds — this is splitting/explosive dispersal."
  },
  {
    "id": "SCI584",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "{CHARACTER_0} is studying body systems and their organs. Which row correctly matches the organ to its body system?",
    "diagram": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 420 150\" width=\"420\" font-family=\"Arial,sans-serif\">\n  <text x=\"210\" y=\"15\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\" fill=\"#1e293b\">Organ–System Matching Table</text>\n  <!-- Header -->\n  <rect x=\"10\" y=\"28\" width=\"60\" height=\"25\" fill=\"#e2e8f0\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"40\" y=\"45\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#1e293b\">Row</text>\n  <rect x=\"70\" y=\"28\" width=\"120\" height=\"25\" fill=\"#e2e8f0\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"130\" y=\"45\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#1e293b\">Mouth</text>\n  <rect x=\"190\" y=\"28\" width=\"120\" height=\"25\" fill=\"#e2e8f0\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"250\" y=\"45\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#1e293b\">Lungs</text>\n  <rect x=\"310\" y=\"28\" width=\"100\" height=\"25\" fill=\"#e2e8f0\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"360\" y=\"45\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#1e293b\">Heart</text>\n  <!-- Row 1 (wrong) -->\n  <rect x=\"10\" y=\"53\" width=\"60\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"40\" y=\"68\" text-anchor=\"middle\" font-size=\"11\" fill=\"#1e293b\">(1)</text>\n  <rect x=\"70\" y=\"53\" width=\"120\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"130\" y=\"68\" text-anchor=\"middle\" font-size=\"10\" fill=\"#1e293b\">Circulatory</text>\n  <rect x=\"190\" y=\"53\" width=\"120\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"250\" y=\"68\" text-anchor=\"middle\" font-size=\"10\" fill=\"#1e293b\">Digestive</text>\n  <rect x=\"310\" y=\"53\" width=\"100\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"360\" y=\"68\" text-anchor=\"middle\" font-size=\"10\" fill=\"#1e293b\">Respiratory</text>\n  <!-- Row 2 (correct!) -->\n  <rect x=\"10\" y=\"75\" width=\"60\" height=\"22\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"2\"/><text x=\"40\" y=\"90\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#15803d\">(2) ★</text>\n  <rect x=\"70\" y=\"75\" width=\"120\" height=\"22\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"2\"/><text x=\"130\" y=\"90\" text-anchor=\"middle\" font-size=\"10\" fill=\"#15803d\">Digestive</text>\n  <rect x=\"190\" y=\"75\" width=\"120\" height=\"22\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"2\"/><text x=\"250\" y=\"90\" text-anchor=\"middle\" font-size=\"10\" fill=\"#15803d\">Respiratory</text>\n  <rect x=\"310\" y=\"75\" width=\"100\" height=\"22\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"2\"/><text x=\"360\" y=\"90\" text-anchor=\"middle\" font-size=\"10\" fill=\"#15803d\">Circulatory</text>\n  <!-- Row 3 -->\n  <rect x=\"10\" y=\"97\" width=\"60\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"40\" y=\"112\" text-anchor=\"middle\" font-size=\"11\" fill=\"#1e293b\">(3)</text>\n  <rect x=\"70\" y=\"97\" width=\"120\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"130\" y=\"112\" text-anchor=\"middle\" font-size=\"10\" fill=\"#1e293b\">Respiratory</text>\n  <rect x=\"190\" y=\"97\" width=\"120\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"250\" y=\"112\" text-anchor=\"middle\" font-size=\"10\" fill=\"#1e293b\">Circulatory</text>\n  <rect x=\"310\" y=\"97\" width=\"100\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"360\" y=\"112\" text-anchor=\"middle\" font-size=\"10\" fill=\"#1e293b\">Digestive</text>\n  <!-- Row 4 -->\n  <rect x=\"10\" y=\"119\" width=\"60\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"40\" y=\"134\" text-anchor=\"middle\" font-size=\"11\" fill=\"#1e293b\">(4)</text>\n  <rect x=\"70\" y=\"119\" width=\"120\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"130\" y=\"134\" text-anchor=\"middle\" font-size=\"10\" fill=\"#1e293b\">Digestive</text>\n  <rect x=\"190\" y=\"119\" width=\"120\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"250\" y=\"134\" text-anchor=\"middle\" font-size=\"10\" fill=\"#1e293b\">Circulatory</text>\n  <rect x=\"310\" y=\"119\" width=\"100\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"360\" y=\"134\" text-anchor=\"middle\" font-size=\"10\" fill=\"#1e293b\">Respiratory</text>\n</svg>",
    "placeholder_roles": ["protagonist"],
    "options": [
      "(1) Mouth: Circulatory | Lungs: Digestive | Heart: Respiratory",
      "(2) Mouth: Digestive | Lungs: Respiratory | Heart: Circulatory",
      "(3) Mouth: Respiratory | Lungs: Circulatory | Heart: Digestive",
      "(4) Mouth: Digestive | Lungs: Circulatory | Heart: Respiratory"
    ],
    "answer": 1,
    "correct_answer": "(2) Mouth: Digestive | Lungs: Respiratory | Heart: Circulatory",
    "explanation": "The mouth is part of the digestive system (breaks down food). The lungs are part of the respiratory system (exchange of oxygen and carbon dioxide). The heart is part of the circulatory system (pumps blood around the body)."
  },
  {
    "id": "SCI585",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "Muthu wants to investigate the effect of leaves on the amount of water vapour given out by a plant. He sets up two similar potted plants of the same species. Setup 1: plant with all its leaves intact, placed in the garden. What should Setup 2 be to make this a fair test?",
    "diagram": None,
    "placeholder_roles": [],
    "options": [
      "plant with all leaves removed, placed indoors",
      "plant with all leaves removed, placed in the garden",
      "plant with all leaves intact, placed indoors",
      "plant with half leaves removed, placed indoors"
    ],
    "answer": 1,
    "correct_answer": "plant with all leaves removed, placed in the garden",
    "explanation": "For a fair test investigating the effect of leaves, the only variable that should change is the presence of leaves. Everything else — including placement in the garden — must stay the same. Setup 2 should have leaves removed but remain in the same location (the garden)."
  },
  {
    "id": "SCI586",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "Kay sets up four beakers to investigate the effect of leaves on water vapour release:\nSetup A: beaker with plant (with leaves), placed in sun\nSetup B: beaker with plant (no leaves), placed in shade\nSetup C: beaker with plant (no leaves), placed in sun\nSetup D: beaker with plant (with leaves), placed in shade\nWhich two setups should Kay compare to find out how leaves affect water vapour release?",
    "diagram": None,
    "placeholder_roles": [],
    "options": [
      "Setup A and Setup B",
      "Setup A and Setup C",
      "Setup B and Setup D",
      "Setup C and Setup D"
    ],
    "answer": 1,
    "correct_answer": "Setup A and Setup C",
    "explanation": "To find out how leaves affect water vapour release, the only variable that should differ is the presence of leaves. Setups A and C both have plants placed in the sun, but A has leaves and C does not. This is a fair comparison."
  },
  {
    "id": "SCI587",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "{CHARACTER_0} is studying the abiotic factors of a forest habitat. The table shows data about beetles collected at different locations:\nLocation 1: damp soil, 28 beetles\nLocation 2: dry soil, 4 beetles\nLocation 3: very wet soil, 12 beetles\nBased on the data, which abiotic factor most affects the number of beetles in this forest?",
    "diagram": None,
    "placeholder_roles": ["protagonist"],
    "options": [
      "Amount of light",
      "Amount of water",
      "Temperature",
      "Amount of oxygen"
    ],
    "answer": 1,
    "correct_answer": "Amount of water",
    "explanation": "The locations differ in the moisture level of the soil. Location 1 (damp) had the most beetles, Location 2 (dry) had the fewest, and Location 3 (very wet) was in between. This suggests that the amount of water in the soil is the abiotic factor most affecting the beetle population."
  },
  {
    "id": "SCI588",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "A graph shows the population of organism X in a habitat over several years. After year T, the population of organism X drops suddenly and rapidly. Which of the following best explains this change?",
    "diagram": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 175\" width=\"360\" font-family=\"Arial,sans-serif\">\n  <text x=\"180\" y=\"15\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\" fill=\"#1e293b\">Population of Organism X Over Time</text>\n  <!-- Axes -->\n  <line x1=\"50\" y1=\"20\" x2=\"50\" y2=\"145\" stroke=\"#64748b\" stroke-width=\"1.5\"/>\n  <line x1=\"50\" y1=\"145\" x2=\"330\" y2=\"145\" stroke=\"#64748b\" stroke-width=\"1.5\"/>\n  <text x=\"190\" y=\"162\" text-anchor=\"middle\" font-size=\"10\" fill=\"#64748b\">Year →</text>\n  <text x=\"18\" y=\"82\" text-anchor=\"middle\" font-size=\"10\" fill=\"#64748b\" transform=\"rotate(-90,18,82)\">Population</text>\n  <!-- Year T marker -->\n  <line x1=\"180\" y1=\"25\" x2=\"180\" y2=\"145\" stroke=\"#ef4444\" stroke-width=\"1.5\" stroke-dasharray=\"5,3\"/>\n  <text x=\"180\" y=\"160\" text-anchor=\"middle\" font-size=\"10\" fill=\"#dc2626\" font-weight=\"bold\">Year T</text>\n  <!-- Population line -->\n  <polyline points=\"50,110 80,100 110,90 140,82 170,76 180,76 210,105 240,125 270,138 300,142\" stroke=\"#3b82f6\" stroke-width=\"2.5\" fill=\"none\"/>\n  <!-- Arrow showing drop -->\n  <polygon points=\"185,76 190,95 195,76\" fill=\"#ef4444\"/>\n  <text x=\"220\" y=\"88\" font-size=\"9\" fill=\"#dc2626\">sudden drop</text>\n</svg>",
    "placeholder_roles": [],
    "options": [
      "The food supply of organism X increased greatly.",
      "A predator of organism X was introduced to the habitat.",
      "The prey of organism X suddenly increased in number.",
      "The amount of rainfall in the habitat decreased slightly."
    ],
    "answer": 1,
    "correct_answer": "A predator of organism X was introduced to the habitat.",
    "explanation": "A sudden and rapid drop in population is best explained by the introduction of a predator that hunts organism X. If food supply or prey increased, the population would grow, not decrease. A slight decrease in rainfall would cause a gradual decline, not a sudden drop."
  },
  {
    "id": "SCI589",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "A forest community consists of the following organisms: Eagle, Sparrow (2 types), Spider (3 types), Beetle, Oak tree, Pine tree, Grass. Which of the following correctly describes a community?",
    "diagram": None,
    "placeholder_roles": [],
    "options": [
      "All the oak trees in the forest",
      "All the eagles in the forest",
      "All the spiders in the forest",
      "All the different types of organisms living together in the forest"
    ],
    "answer": 3,
    "correct_answer": "All the different types of organisms living together in the forest",
    "explanation": "A community is all the different populations of organisms living together in the same habitat. Eagles, sparrows, spiders, beetles, and the various plants all together form the forest community. Individual groups like 'all oak trees' or 'all eagles' are populations, not communities."
  },
  {
    "id": "SCI590",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "In a food web, caterpillars produce Chemical T which deters predators. A scientist removes Chemical T from the caterpillars. The food web has: Plant N → Caterpillar → (Chicken and Spider). Chickens also eat worms. Which of the following would happen after Chemical T is removed?\nA: The population of plant N would increase.\nB: The population of plant N would decrease.\nC: The population of chickens would decrease.\nD: The population of chickens would increase.",
    "diagram": None,
    "placeholder_roles": [],
    "options": [
      "A and C only",
      "B and D only",
      "A and D only",
      "B and C only"
    ],
    "answer": 2,
    "correct_answer": "A and D only",
    "explanation": "Without Chemical T, caterpillars can no longer deter predators (chickens). More caterpillars would be eaten by chickens, so: (A) fewer caterpillars means more plants survive (plant N increases). (D) chickens have more food (caterpillars), so chicken population increases. So A and D are correct."
  },
  {
    "id": "SCI591",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "Organism Y looks very similar to organism Z, which has a painful sting. Organism Y is harmless but has the same colouring and pattern as Z. This is called mimicry. Which of the following best explains why mimicry is beneficial to organism Y?",
    "diagram": None,
    "placeholder_roles": [],
    "options": [
      "Organism Y has fewer predators as they mistake it for the dangerous Z.",
      "Organism Y is a stronger predator and can hunt more easily.",
      "Organism Y finds food more easily by blending in with the environment.",
      "Organism Y requires less water to survive in its habitat."
    ],
    "answer": 0,
    "correct_answer": "Organism Y has fewer predators as they mistake it for the dangerous Z.",
    "explanation": "Mimicry is a behavioural and structural adaptation where a harmless organism resembles a harmful one. Predators that have learned to avoid organism Z (because of its sting) will also avoid organism Y, thinking it is dangerous. This means organism Y has fewer predators, increasing its survival chances."
  },
  # ===== W2D3-2 (13 questions, skipping image-based Q2, Q12, Q14) =====
  {
    "id": "SCI592",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "The graph shows the rising levels of greenhouse gases in the atmosphere. Several reasons were given for this:\nA: Burning of fossil fuels\nB: Deforestation\nC: Volcanic eruptions (natural)\nD: Use of renewable energy sources (solar panels)\nWhich reason is the LEAST LIKELY cause of the rising greenhouse gas levels?",
    "diagram": None,
    "placeholder_roles": [],
    "options": [
      "A only",
      "B only",
      "C only",
      "D only"
    ],
    "answer": 3,
    "correct_answer": "D only",
    "explanation": "Renewable energy sources like solar panels generate electricity without burning fossil fuels, so they do not produce greenhouse gases. Burning fossil fuels (A), deforestation (B), and volcanic eruptions (C) all release greenhouse gases into the atmosphere."
  },
  {
    "id": "SCI593",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "{CHARACTER_0} is designing a knee pad. The knee pad must withstand impacts (strong) and allow free movement (flexible). The table shows properties of four materials. Which row shows the properties needed for the knee pad?",
    "diagram": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 145\" width=\"380\" font-family=\"Arial,sans-serif\">\n  <text x=\"190\" y=\"15\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\" fill=\"#1e293b\">Material Properties for Knee Pad</text>\n  <!-- Header -->\n  <rect x=\"10\" y=\"27\" width=\"80\" height=\"25\" fill=\"#e2e8f0\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"50\" y=\"44\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#1e293b\">Row</text>\n  <rect x=\"90\" y=\"27\" width=\"120\" height=\"25\" fill=\"#e2e8f0\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"150\" y=\"44\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#1e293b\">Property A</text>\n  <rect x=\"210\" y=\"27\" width=\"160\" height=\"25\" fill=\"#e2e8f0\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"290\" y=\"44\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#1e293b\">Property B</text>\n  <!-- Rows -->\n  <rect x=\"10\" y=\"52\" width=\"80\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"50\" y=\"67\" text-anchor=\"middle\" font-size=\"11\" fill=\"#1e293b\">(1)</text>\n  <rect x=\"90\" y=\"52\" width=\"120\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"150\" y=\"67\" text-anchor=\"middle\" font-size=\"10\" fill=\"#1e293b\">flexible</text>\n  <rect x=\"210\" y=\"52\" width=\"160\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"290\" y=\"67\" text-anchor=\"middle\" font-size=\"10\" fill=\"#1e293b\">poor conductor of heat</text>\n  <rect x=\"10\" y=\"74\" width=\"80\" height=\"22\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"2\"/><text x=\"50\" y=\"89\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#15803d\">(2) ★</text>\n  <rect x=\"90\" y=\"74\" width=\"120\" height=\"22\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"2\"/><text x=\"150\" y=\"89\" text-anchor=\"middle\" font-size=\"10\" fill=\"#15803d\">strong</text>\n  <rect x=\"210\" y=\"74\" width=\"160\" height=\"22\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"2\"/><text x=\"290\" y=\"89\" text-anchor=\"middle\" font-size=\"10\" fill=\"#15803d\">flexible</text>\n  <rect x=\"10\" y=\"96\" width=\"80\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"50\" y=\"111\" text-anchor=\"middle\" font-size=\"11\" fill=\"#1e293b\">(3)</text>\n  <rect x=\"90\" y=\"96\" width=\"120\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"150\" y=\"111\" text-anchor=\"middle\" font-size=\"10\" fill=\"#1e293b\">waterproof</text>\n  <rect x=\"210\" y=\"96\" width=\"160\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"290\" y=\"111\" text-anchor=\"middle\" font-size=\"10\" fill=\"#1e293b\">strong</text>\n  <rect x=\"10\" y=\"118\" width=\"80\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"50\" y=\"133\" text-anchor=\"middle\" font-size=\"11\" fill=\"#1e293b\">(4)</text>\n  <rect x=\"90\" y=\"118\" width=\"120\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"150\" y=\"133\" text-anchor=\"middle\" font-size=\"10\" fill=\"#1e293b\">poor conductor of heat</text>\n  <rect x=\"210\" y=\"118\" width=\"160\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"290\" y=\"133\" text-anchor=\"middle\" font-size=\"10\" fill=\"#1e293b\">waterproof</text>\n</svg>",
    "placeholder_roles": ["protagonist"],
    "options": [
      "(1) Property A: flexible | Property B: poor conductor of heat",
      "(2) Property A: strong | Property B: flexible",
      "(3) Property A: waterproof | Property B: strong",
      "(4) Property A: poor conductor of heat | Property B: waterproof"
    ],
    "answer": 1,
    "correct_answer": "(2) Property A: strong | Property B: flexible",
    "explanation": "A knee pad must be strong (A) to withstand impacts during sports and protect the knee. It also needs to be flexible (B) so the person can still bend their knee and move freely. Being waterproof or a poor conductor of heat is not essential for a knee pad."
  },
  {
    "id": "SCI594",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "{CHARACTER_0} places a tea bag in a cup of hot water. The tea spreads throughout the water. Which property of a liquid does this observation show?",
    "diagram": None,
    "placeholder_roles": ["protagonist"],
    "options": [
      "A liquid has a fixed volume.",
      "A liquid can be compressed easily.",
      "A liquid has a definite shape.",
      "A liquid has no definite shape."
    ],
    "answer": 3,
    "correct_answer": "A liquid has no definite shape.",
    "explanation": "The tea spreads to fill the entire cup, taking the shape of the container. This shows that a liquid has no definite shape — it takes the shape of whatever container it is placed in. A liquid does have a definite volume (unlike a gas)."
  },
  {
    "id": "SCI595",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "A transparent bottle is filled with marbles. Which of the following statements about the marbles are ALL correct?\nA: The marbles take up space.\nB: The marbles have a fixed shape.\nC: The marbles have mass.\nD: The marbles have no definite volume.",
    "diagram": None,
    "placeholder_roles": [],
    "options": [
      "A and B only",
      "A and C only",
      "A, B and C only",
      "A, B and D only"
    ],
    "answer": 2,
    "correct_answer": "A, B and C only",
    "explanation": "Marbles are solids. Solids have a fixed/definite shape (B), take up space (A), and have mass (C). Statement D is wrong because solids DO have a definite volume. It is gases that have no definite volume. So A, B and C are all correct."
  },
  {
    "id": "SCI596",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "The table shows the melting point and boiling point of substances A and B:\nSubstance A: melting point 60°C, boiling point 130°C\nSubstance B: melting point 80°C, boiling point 200°C\nAt what temperature can BOTH substances be stored as liquids?",
    "diagram": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 420 160\" width=\"420\" font-family=\"Arial,sans-serif\">\n  <text x=\"210\" y=\"15\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\" fill=\"#1e293b\">Melting and Boiling Points</text>\n  <!-- Table -->\n  <rect x=\"20\" y=\"28\" width=\"100\" height=\"25\" fill=\"#e2e8f0\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"70\" y=\"45\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#1e293b\">Substance</text>\n  <rect x=\"120\" y=\"28\" width=\"130\" height=\"25\" fill=\"#e2e8f0\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"185\" y=\"45\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#1e293b\">Melting Point (°C)</text>\n  <rect x=\"250\" y=\"28\" width=\"150\" height=\"25\" fill=\"#e2e8f0\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"325\" y=\"45\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#1e293b\">Boiling Point (°C)</text>\n  <rect x=\"20\" y=\"53\" width=\"100\" height=\"25\" fill=\"#dbeafe\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"70\" y=\"70\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"bold\" fill=\"#1d4ed8\">A</text>\n  <rect x=\"120\" y=\"53\" width=\"130\" height=\"25\" fill=\"#dbeafe\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"185\" y=\"70\" text-anchor=\"middle\" font-size=\"11\" fill=\"#1d4ed8\">60°C</text>\n  <rect x=\"250\" y=\"53\" width=\"150\" height=\"25\" fill=\"#dbeafe\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"325\" y=\"70\" text-anchor=\"middle\" font-size=\"11\" fill=\"#1d4ed8\">130°C</text>\n  <rect x=\"20\" y=\"78\" width=\"100\" height=\"25\" fill=\"#fef9c3\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"70\" y=\"95\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"bold\" fill=\"#92400e\">B</text>\n  <rect x=\"120\" y=\"78\" width=\"130\" height=\"25\" fill=\"#fef9c3\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"185\" y=\"95\" text-anchor=\"middle\" font-size=\"11\" fill=\"#92400e\">80°C</text>\n  <rect x=\"250\" y=\"78\" width=\"150\" height=\"25\" fill=\"#fef9c3\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"325\" y=\"95\" text-anchor=\"middle\" font-size=\"11\" fill=\"#92400e\">200°C</text>\n  <!-- Temperature range analysis -->\n  <text x=\"210\" y=\"122\" text-anchor=\"middle\" font-size=\"10\" fill=\"#64748b\">A is liquid: 60°C &lt; T &lt; 130°C</text>\n  <text x=\"210\" y=\"136\" text-anchor=\"middle\" font-size=\"10\" fill=\"#64748b\">B is liquid: 80°C &lt; T &lt; 200°C</text>\n  <text x=\"210\" y=\"150\" text-anchor=\"middle\" font-size=\"10\" fill=\"#15803d\" font-weight=\"bold\">Both liquid: 80°C &lt; T &lt; 130°C  →  110°C works!</text>\n</svg>",
    "placeholder_roles": [],
    "options": [
      "50°C",
      "110°C",
      "140°C",
      "210°C"
    ],
    "answer": 1,
    "correct_answer": "110°C",
    "explanation": "A is a liquid between 60°C and 130°C. B is a liquid between 80°C and 200°C. For both to be liquid at the same temperature, we need a temperature above 80°C (B's melting point) and below 130°C (A's boiling point). 110°C is in the range 80–130°C, so both are liquids at 110°C."
  },
  {
    "id": "SCI597",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "{CHARACTER_0} set up three circuits: Circuit P has one bulb, Circuit Q has two bulbs in series, Circuit R has three bulbs in series. All batteries are identical, all bulbs are identical. Which circuit has the dimmest bulbs, and which has the brightest?",
    "diagram": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 400 140\" width=\"400\" font-family=\"Arial,sans-serif\">\n  <text x=\"200\" y=\"15\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\" fill=\"#1e293b\">Series Circuits P, Q, R</text>\n  <!-- Circuit P -->\n  <rect x=\"10\" y=\"35\" width=\"100\" height=\"85\" fill=\"none\" stroke=\"#64748b\" stroke-width=\"1.5\" rx=\"5\"/>\n  <text x=\"60\" y=\"52\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#1e293b\">Circuit P</text>\n  <circle cx=\"60\" cy=\"88\" r=\"14\" fill=\"#fef08a\" stroke=\"#ca8a04\" stroke-width=\"2\"/>\n  <text x=\"60\" y=\"92\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#78350f\">💡</text>\n  <text x=\"60\" y=\"112\" text-anchor=\"middle\" font-size=\"9\" fill=\"#15803d\">1 bulb = BRIGHT</text>\n  <!-- Circuit Q -->\n  <rect x=\"150\" y=\"35\" width=\"100\" height=\"85\" fill=\"none\" stroke=\"#64748b\" stroke-width=\"1.5\" rx=\"5\"/>\n  <text x=\"200\" y=\"52\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#1e293b\">Circuit Q</text>\n  <circle cx=\"178\" cy=\"82\" r=\"12\" fill=\"#fef9c3\" stroke=\"#d97706\" stroke-width=\"1.5\"/>\n  <text x=\"178\" y=\"86\" text-anchor=\"middle\" font-size=\"9\">💡</text>\n  <circle cx=\"222\" cy=\"82\" r=\"12\" fill=\"#fef9c3\" stroke=\"#d97706\" stroke-width=\"1.5\"/>\n  <text x=\"222\" y=\"86\" text-anchor=\"middle\" font-size=\"9\">💡</text>\n  <text x=\"200\" y=\"112\" text-anchor=\"middle\" font-size=\"9\" fill=\"#d97706\">2 bulbs = medium</text>\n  <!-- Circuit R -->\n  <rect x=\"290\" y=\"35\" width=\"105\" height=\"85\" fill=\"none\" stroke=\"#64748b\" stroke-width=\"1.5\" rx=\"5\"/>\n  <text x=\"342\" y=\"52\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#1e293b\">Circuit R</text>\n  <circle cx=\"312\" cy=\"82\" r=\"10\" fill=\"#fef3c7\" stroke=\"#b45309\" stroke-width=\"1.5\"/>\n  <text x=\"312\" y=\"86\" text-anchor=\"middle\" font-size=\"8\">💡</text>\n  <circle cx=\"342\" cy=\"82\" r=\"10\" fill=\"#fef3c7\" stroke=\"#b45309\" stroke-width=\"1.5\"/>\n  <text x=\"342\" y=\"86\" text-anchor=\"middle\" font-size=\"8\">💡</text>\n  <circle cx=\"372\" cy=\"82\" r=\"10\" fill=\"#fef3c7\" stroke=\"#b45309\" stroke-width=\"1.5\"/>\n  <text x=\"372\" y=\"86\" text-anchor=\"middle\" font-size=\"8\">💡</text>\n  <text x=\"342\" y=\"112\" text-anchor=\"middle\" font-size=\"9\" fill=\"#b45309\">3 bulbs = DIMMEST</text>\n</svg>",
    "placeholder_roles": ["protagonist"],
    "options": [
      "(1) Dimmest: Q | Brightest: R",
      "(2) Dimmest: P | Brightest: R",
      "(3) Dimmest: R | Brightest: Q",
      "(4) Dimmest: R | Brightest: P"
    ],
    "answer": 3,
    "correct_answer": "(4) Dimmest: R | Brightest: P",
    "explanation": "In a series circuit, the more bulbs there are, the more the voltage is shared among them, making each bulb dimmer. Circuit R has 3 bulbs in series (dimmest), Circuit Q has 2 bulbs (medium), and Circuit P has only 1 bulb (brightest)."
  },
  {
    "id": "SCI598",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "{CHARACTER_0} sets up a circuit with three mystery objects P, Q, and R connected in series. Only bulbs connected near objects P and Q light up; the bulb near R does not light up. The objects are made of aluminium, nickel, or glass (not in this order). Which row correctly identifies the material of each object?",
    "diagram": None,
    "placeholder_roles": ["protagonist"],
    "options": [
      "(1) P: glass | Q: nickel | R: aluminium",
      "(2) P: nickel | Q: glass | R: aluminium",
      "(3) P: aluminium | Q: nickel | R: glass",
      "(4) P: glass | Q: aluminium | R: nickel"
    ],
    "answer": 2,
    "correct_answer": "(3) P: aluminium | Q: nickel | R: glass",
    "explanation": "For a bulb to light up, electricity must flow through the object — meaning it must be a conductor. Aluminium and nickel are metals and conduct electricity (bulbs near P and Q light up). Glass is an insulator, so the bulb near R does not light up. Therefore P=aluminium, Q=nickel, R=glass."
  },
  {
    "id": "SCI599",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "Three rings X, Y, and Z hang on a string. {CHARACTER_0} observes the following:\n• X attracts Y\n• Y attracts Z\n• X and Z repel each other\nWhich of the following correctly describes the rings?\nA: X is the north pole of a magnet, Z is the north pole of a magnet.\nB: Y is a magnetic material (not a magnet).\nC: X and Z are magnets with like poles facing each other.\nD: Y repels both X and Z.",
    "diagram": None,
    "placeholder_roles": ["protagonist"],
    "options": [
      "A and B only",
      "C only",
      "B and D only",
      "A, B and C only"
    ],
    "answer": 1,
    "correct_answer": "C only",
    "explanation": "X and Z repel each other, which can only happen between two magnets with like poles facing each other. Y attracts both X and Z, meaning Y could be a magnetic material (always attracted to a magnet), or a magnet with different poles facing X and Z. Since Y attracts both sides without repulsion, C is the key conclusion: X and Z are magnets with like poles facing each other."
  },
  {
    "id": "SCI600",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "{CHARACTER_0} blows into a straw threaded through a string. The straw moves along the string. Which of the following correctly explains why the straw moved?",
    "diagram": None,
    "placeholder_roles": ["protagonist"],
    "options": [
      "The force of air pushing on the straw equals the friction between the straw and string.",
      "The gravitational force on the straw is greater than the force of air.",
      "The friction between the straw and string is greater than the force of air.",
      "The force of air pushing on the straw is greater than the friction between the straw and string."
    ],
    "answer": 3,
    "correct_answer": "The force of air pushing on the straw is greater than the friction between the straw and string.",
    "explanation": "For the straw to move along the string, the net force must be in the direction of movement. The force of air blown into the straw pushes it forward. Since the straw moves, this air force must be greater than the friction force that opposes the motion."
  },
  {
    "id": "SCI601",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "{CHARACTER_0} drops a ball from point A and it bounces to B, then C, then D. Which of the following is correct about the gravitational force acting on the ball at all these points?",
    "diagram": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 175\" width=\"360\" font-family=\"Arial,sans-serif\">\n  <text x=\"180\" y=\"15\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"bold\" fill=\"#1e293b\">Ball Bouncing: A → B → C → D</text>\n  <!-- Ground -->\n  <line x1=\"20\" y1=\"155\" x2=\"340\" y2=\"155\" stroke=\"#92400e\" stroke-width=\"2\"/>\n  <!-- Bounce path -->\n  <path d=\"M50,25 Q60,155 100,155 Q120,80 140,155 Q155,110 175,155 Q188,130 200,155\" stroke=\"#3b82f6\" stroke-width=\"2\" fill=\"none\"/>\n  <!-- Points -->\n  <circle cx=\"50\" cy=\"25\" r=\"12\" fill=\"#fee2e2\" stroke=\"#ef4444\" stroke-width=\"2\"/>\n  <text x=\"50\" y=\"30\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#dc2626\">A</text>\n  <text x=\"50\" y=\"14\" text-anchor=\"middle\" font-size=\"8\" fill=\"#dc2626\">drop</text>\n  <circle cx=\"120\" cy=\"80\" r=\"10\" fill=\"#dbeafe\" stroke=\"#3b82f6\" stroke-width=\"2\"/>\n  <text x=\"120\" y=\"84\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#1d4ed8\">B</text>\n  <circle cx=\"160\" cy=\"115\" r=\"10\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"2\"/>\n  <text x=\"160\" y=\"119\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#15803d\">C</text>\n  <circle cx=\"194\" cy=\"130\" r=\"10\" fill=\"#ede9fe\" stroke=\"#7c3aed\" stroke-width=\"2\"/>\n  <text x=\"194\" y=\"134\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#6d28d9\">D</text>\n  <!-- Gravity arrows (always down) -->\n  <line x1=\"50\" y1=\"30\" x2=\"50\" y2=\"50\" stroke=\"#dc2626\" stroke-width=\"1.5\"/>\n  <polygon points=\"45,48 50,58 55,48\" fill=\"#dc2626\"/>\n  <line x1=\"120\" y1=\"85\" x2=\"120\" y2=\"105\" stroke=\"#dc2626\" stroke-width=\"1.5\"/>\n  <polygon points=\"115,103 120,113 125,103\" fill=\"#dc2626\"/>\n  <text x=\"265\" y=\"80\" font-size=\"9\" fill=\"#dc2626\">Gravity (g)</text>\n  <text x=\"265\" y=\"93\" font-size=\"9\" fill=\"#dc2626\">always acts</text>\n  <text x=\"265\" y=\"106\" font-size=\"9\" fill=\"#dc2626\">downward at</text>\n  <text x=\"265\" y=\"119\" font-size=\"9\" fill=\"#dc2626\">all points</text>\n</svg>",
    "placeholder_roles": ["protagonist"],
    "options": [
      "The gravitational force is greatest at point A.",
      "There is no gravitational force at point D.",
      "The gravitational force is zero when the ball is at the highest point.",
      "The gravitational force acting on the ball is the same at all points."
    ],
    "answer": 3,
    "correct_answer": "The gravitational force acting on the ball is the same at all points.",
    "explanation": "Gravitational force depends on the mass of the object, not its position or height. Since the ball has the same mass throughout its journey, Earth exerts the same gravitational pull on it at all points A, B, C, and D."
  },
  {
    "id": "SCI602",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "{CHARACTER_0} uses two cups to hold hot tea: Cup A has a handle, Cup B has no handle. Both cups have the same amount of hot tea. Why is Cup A safer to hold?",
    "diagram": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 160\" width=\"320\" font-family=\"Arial,sans-serif\">\n  <text x=\"160\" y=\"15\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\" fill=\"#1e293b\">Cup A (handle) vs Cup B (no handle)</text>\n  <!-- Cup A -->\n  <rect x=\"30\" y=\"48\" width=\"80\" height=\"80\" fill=\"#fde68a\" stroke=\"#d97706\" stroke-width=\"2\" rx=\"4\"/>\n  <rect x=\"32\" y=\"50\" width=\"76\" height=\"76\" fill=\"#fed7aa\" opacity=\"0.6\"/>\n  <!-- Handle -->\n  <path d=\"M110,68 Q130,68 130,88 Q130,108 110,108\" stroke=\"#d97706\" stroke-width=\"3\" fill=\"none\"/>\n  <text x=\"70\" y=\"90\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#92400e\">Cup A</text>\n  <text x=\"70\" y=\"145\" text-anchor=\"middle\" font-size=\"9\" fill=\"#15803d\">Handle → hand far from hot tea</text>\n  <!-- Cup B -->\n  <rect x=\"200\" y=\"48\" width=\"80\" height=\"80\" fill=\"#fde68a\" stroke=\"#d97706\" stroke-width=\"2\" rx=\"4\"/>\n  <rect x=\"202\" y=\"50\" width=\"76\" height=\"76\" fill=\"#fed7aa\" opacity=\"0.6\"/>\n  <text x=\"240\" y=\"90\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#92400e\">Cup B</text>\n  <text x=\"240\" y=\"145\" text-anchor=\"middle\" font-size=\"9\" fill=\"#dc2626\">No handle → hand touches hot cup</text>\n  <!-- Heat arrows -->\n  <text x=\"70\" y=\"105\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ef4444\">hot tea 🔥</text>\n  <text x=\"240\" y=\"105\" text-anchor=\"middle\" font-size=\"9\" fill=\"#ef4444\">hot tea 🔥</text>\n</svg>",
    "placeholder_roles": ["protagonist"],
    "options": [
      "The handle reduces the total heat energy in the tea.",
      "The handle prevents any heat from leaving the cup.",
      "The handle allows the hand to be at a greater distance from the hot tea.",
      "The handle makes the cup lighter so less heat is conducted to the hand."
    ],
    "answer": 2,
    "correct_answer": "The handle allows the hand to be at a greater distance from the hot tea.",
    "explanation": "Heat travels from warmer objects to cooler objects. By holding the handle instead of the cup directly, your hand is further away from the hot tea. The greater the distance from the heat source, the less heat that reaches your hand, making Cup A safer to hold."
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
print(f"New IDs: SCI578 to SCI{577 + len(new_questions)}")
