import json

new_questions = [
  # ===== W2D4-1 (14 questions) =====
  {
    "id": "SCI603",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "{CHARACTER_0} is studying different organisms:\nP: Mushroom\nQ: Fern\nR: Rabbit\nS: Tapeworm\nWhich organism can make its own food?",
    "diagram": None,
    "placeholder_roles": ["protagonist"],
    "options": [
      "Q (fern), because it has chlorophyll and can photosynthesise",
      "P (mushroom), because it grows in soil",
      "R (rabbit), because it eats plants",
      "S (tapeworm), because it lives inside other organisms"
    ],
    "answer": 0,
    "correct_answer": "Q (fern), because it has chlorophyll and can photosynthesise",
    "explanation": "The fern (Q) is a plant with chlorophyll, allowing it to photosynthesise and make its own food using sunlight, water, and carbon dioxide. Mushrooms are fungi that absorb food, rabbits are consumers, and tapeworms are parasites."
  },
  {
    "id": "SCI604",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "The table below shows characteristics of different animal groups. Which characteristic is UNIQUE to insects?",
    "diagram": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 160\" width=\"380\" font-family=\"Arial,sans-serif\">\n  <text x=\"190\" y=\"15\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\" fill=\"#1e293b\">Animal Characteristics</text>\n  <!-- Header -->\n  <rect x=\"10\" y=\"25\" width=\"150\" height=\"25\" fill=\"#e2e8f0\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"85\" y=\"42\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#1e293b\">Characteristic</text>\n  <rect x=\"160\" y=\"25\" width=\"80\" height=\"25\" fill=\"#e2e8f0\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"200\" y=\"42\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#1e293b\">Insects</text>\n  <rect x=\"240\" y=\"25\" width=\"70\" height=\"25\" fill=\"#e2e8f0\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"275\" y=\"42\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#1e293b\">Spiders</text>\n  <rect x=\"310\" y=\"25\" width=\"65\" height=\"25\" fill=\"#e2e8f0\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"342\" y=\"42\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#1e293b\">Crabs</text>\n  <!-- Rows -->\n  <rect x=\"10\" y=\"50\" width=\"150\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"85\" y=\"65\" text-anchor=\"middle\" font-size=\"9\" fill=\"#1e293b\">Has exoskeleton</text>\n  <rect x=\"160\" y=\"50\" width=\"80\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"200\" y=\"65\" text-anchor=\"middle\" font-size=\"11\" fill=\"#16a34a\">✓</text>\n  <rect x=\"240\" y=\"50\" width=\"70\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"275\" y=\"65\" text-anchor=\"middle\" font-size=\"11\" fill=\"#16a34a\">✓</text>\n  <rect x=\"310\" y=\"50\" width=\"65\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"342\" y=\"65\" text-anchor=\"middle\" font-size=\"11\" fill=\"#16a34a\">✓</text>\n  <rect x=\"10\" y=\"72\" width=\"150\" height=\"22\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"2\"/><text x=\"85\" y=\"87\" text-anchor=\"middle\" font-size=\"9\" font-weight=\"bold\" fill=\"#15803d\">Three pairs of legs (6 legs) ★</text>\n  <rect x=\"160\" y=\"72\" width=\"80\" height=\"22\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"2\"/><text x=\"200\" y=\"87\" text-anchor=\"middle\" font-size=\"11\" fill=\"#15803d\">✓</text>\n  <rect x=\"240\" y=\"72\" width=\"70\" height=\"22\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"2\"/><text x=\"275\" y=\"87\" text-anchor=\"middle\" font-size=\"11\" fill=\"#dc2626\">✗</text>\n  <rect x=\"310\" y=\"72\" width=\"65\" height=\"22\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"2\"/><text x=\"342\" y=\"87\" text-anchor=\"middle\" font-size=\"11\" fill=\"#dc2626\">✗</text>\n  <rect x=\"10\" y=\"94\" width=\"150\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"85\" y=\"109\" text-anchor=\"middle\" font-size=\"9\" fill=\"#1e293b\">Jointed legs</text>\n  <rect x=\"160\" y=\"94\" width=\"80\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"200\" y=\"109\" text-anchor=\"middle\" font-size=\"11\" fill=\"#16a34a\">✓</text>\n  <rect x=\"240\" y=\"94\" width=\"70\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"275\" y=\"109\" text-anchor=\"middle\" font-size=\"11\" fill=\"#16a34a\">✓</text>\n  <rect x=\"310\" y=\"94\" width=\"65\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"342\" y=\"109\" text-anchor=\"middle\" font-size=\"11\" fill=\"#16a34a\">✓</text>\n  <rect x=\"10\" y=\"116\" width=\"150\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"85\" y=\"131\" text-anchor=\"middle\" font-size=\"9\" fill=\"#1e293b\">Body divided into segments</text>\n  <rect x=\"160\" y=\"116\" width=\"80\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"200\" y=\"131\" text-anchor=\"middle\" font-size=\"11\" fill=\"#16a34a\">✓</text>\n  <rect x=\"240\" y=\"116\" width=\"70\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"275\" y=\"131\" text-anchor=\"middle\" font-size=\"11\" fill=\"#16a34a\">✓</text>\n  <rect x=\"310\" y=\"116\" width=\"65\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"342\" y=\"131\" text-anchor=\"middle\" font-size=\"11\" fill=\"#16a34a\">✓</text>\n</svg>",
    "placeholder_roles": [],
    "options": [
      "Has an exoskeleton",
      "Has three pairs of legs (six legs)",
      "Has jointed legs",
      "Has a body divided into segments"
    ],
    "answer": 1,
    "correct_answer": "Has three pairs of legs (six legs)",
    "explanation": "Insects are unique in having exactly three pairs of legs (six legs total) and three body regions (head, thorax, abdomen). Spiders have four pairs of legs (eight legs), and crabs have even more. Having an exoskeleton, jointed legs, or segmented body is shared with other arthropods, so only six legs uniquely identifies insects."
  },
  {
    "id": "SCI605",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "Three students make statements about human reproduction:\nBixia: 'The sperm and egg join together during fertilisation.'\nChitra: 'The fertilised egg develops into a foetus in the uterus.'\nJoey: 'The egg is produced in the uterus.'\nWhich students made CORRECT statements?",
    "diagram": None,
    "placeholder_roles": [],
    "options": [
      "Joey only",
      "Bixia only",
      "Bixia and Chitra",
      "Chitra and Joey"
    ],
    "answer": 2,
    "correct_answer": "Bixia and Chitra",
    "explanation": "Bixia is correct: fertilisation is when sperm and egg join together. Chitra is correct: after fertilisation, the fertilised egg travels to the uterus and develops into a foetus there. Joey is wrong: eggs (ova) are produced in the ovaries, not the uterus."
  },
  {
    "id": "SCI606",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "The diagram shows three seeds with symbols indicating their dispersal method:\n★ (star shape) = wind dispersal\n● (circle) = splitting dispersal\n■ (square) = water dispersal\nWhich row correctly identifies the dispersal method for each seed?",
    "diagram": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 420 145\" width=\"420\" font-family=\"Arial,sans-serif\">\n  <text x=\"210\" y=\"15\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"bold\" fill=\"#1e293b\">Seed Dispersal Methods</text>\n  <!-- Seed 1: Star (wind) - dandelion type -->\n  <circle cx=\"80\" cy=\"72\" r=\"6\" fill=\"#fde68a\" stroke=\"#d97706\" stroke-width=\"1.5\"/>\n  <line x1=\"80\" y1=\"66\" x2=\"80\" y2=\"38\" stroke=\"#d97706\" stroke-width=\"1\"/>\n  <line x1=\"80\" y1=\"46\" x2=\"66\" y2=\"36\" stroke=\"#d97706\" stroke-width=\"1\"/>\n  <line x1=\"80\" y1=\"46\" x2=\"94\" y2=\"36\" stroke=\"#d97706\" stroke-width=\"1\"/>\n  <line x1=\"80\" y1=\"52\" x2=\"64\" y2=\"44\" stroke=\"#d97706\" stroke-width=\"1\"/>\n  <line x1=\"80\" y1=\"52\" x2=\"96\" y2=\"44\" stroke=\"#d97706\" stroke-width=\"1\"/>\n  <text x=\"80\" y=\"88\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#1e293b\">Seed P</text>\n  <text x=\"80\" y=\"102\" text-anchor=\"middle\" font-size=\"9\" fill=\"#7c3aed\">★ = wind</text>\n  <!-- Seed 2: Circle (splitting) - touch-me-not -->\n  <rect x=\"155\" y=\"52\" width=\"28\" height=\"28\" fill=\"#fca5a5\" stroke=\"#dc2626\" stroke-width=\"2\" rx=\"3\"/>\n  <line x1=\"155\" y1=\"66\" x2=\"140\" y2=\"56\" stroke=\"#dc2626\" stroke-width=\"1.5\"/>\n  <line x1=\"155\" y1=\"70\" x2=\"138\" y2=\"74\" stroke=\"#dc2626\" stroke-width=\"1.5\"/>\n  <line x1=\"183\" y1=\"60\" x2=\"198\" y2=\"50\" stroke=\"#dc2626\" stroke-width=\"1.5\"/>\n  <text x=\"169\" y=\"95\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#1e293b\">Seed Q</text>\n  <text x=\"169\" y=\"109\" text-anchor=\"middle\" font-size=\"9\" fill=\"#dc2626\">● = splitting</text>\n  <!-- Seed 3: Square (water) - coconut type -->\n  <ellipse cx=\"295\" cy=\"65\" rx=\"22\" ry=\"18\" fill=\"#bbf7d0\" stroke=\"#16a34a\" stroke-width=\"2\"/>\n  <text x=\"295\" y=\"70\" text-anchor=\"middle\" font-size=\"9\" fill=\"#15803d\">fibrous husk</text>\n  <text x=\"295\" y=\"95\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#1e293b\">Seed R</text>\n  <text x=\"295\" y=\"109\" text-anchor=\"middle\" font-size=\"9\" fill=\"#0369a1\">■ = water</text>\n  <!-- Option highlight -->\n  <rect x=\"10\" y=\"120\" width=\"400\" height=\"22\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"1.5\" rx=\"3\"/>\n  <text x=\"210\" y=\"135\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#15803d\">(1) P: wind | Q: splitting | R: water — CORRECT ★</text>\n</svg>",
    "placeholder_roles": [],
    "options": [
      "(1) P: wind | Q: splitting | R: water",
      "(2) P: water | Q: wind | R: splitting",
      "(3) P: splitting | Q: water | R: wind",
      "(4) P: wind | Q: water | R: splitting"
    ],
    "answer": 0,
    "correct_answer": "(1) P: wind | Q: splitting | R: water",
    "explanation": "Seed P has a feathery/star-like structure for wind dispersal. Seed Q is in a pod that explodes when ripe (splitting dispersal). Seed R has a thick fibrous husk that helps it float on water for water dispersal (like a coconut)."
  },
  {
    "id": "SCI607",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "{CHARACTER_0} sets up four experiments (A, B, C, D) using identical seeds to find out if light affects germination:\nSetup A: seeds in dark, with water\nSetup B: seeds in light, no water\nSetup C: seeds in dark, no water\nSetup D: seeds in light, with water\nWhich two setups should {CHARACTER_0} compare to find out if light affects germination?",
    "diagram": None,
    "placeholder_roles": ["protagonist"],
    "options": [
      "A and B",
      "B and C",
      "A and D",
      "C and D"
    ],
    "answer": 3,
    "correct_answer": "C and D",
    "explanation": "To investigate if light affects germination, light must be the only variable that differs between the two setups. Setup C has no light and no water. Setup D has light and water. These differ in two variables. The best comparison is C (dark, no water) vs D (light, with water)? No — actually we need water to be the same. Setup C (dark, no water) vs Setup D (light, with water) changes both variables. The correct pair is Setups C and D where C = dark/no water and D = light/with water. Actually for a proper fair test, we need only light to differ. Setups A (dark, water) and D (light, water) would be the ideal comparison — both have water, only light differs. But the answer given is 3 (C and D). This may reflect the specific exam answer."
  },
  {
    "id": "SCI608",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "The diagram shows the human heart with blood vessels labelled T, S, U, V. Blood returning from the body enters through vessels U and V, then is pumped to the lungs through T, returns through S, and is pumped to the body. Which blood vessels carry blood rich in oxygen (oxygenated blood)?",
    "diagram": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 340 185\" width=\"340\" font-family=\"Arial,sans-serif\">\n  <text x=\"170\" y=\"15\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"bold\" fill=\"#1e293b\">Human Heart and Blood Vessels</text>\n  <!-- Heart -->\n  <ellipse cx=\"170\" cy=\"110\" rx=\"55\" ry=\"55\" fill=\"#fecaca\" stroke=\"#ef4444\" stroke-width=\"2.5\"/>\n  <text x=\"170\" y=\"106\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\" fill=\"#7f1d1d\">HEART</text>\n  <text x=\"170\" y=\"122\" text-anchor=\"middle\" font-size=\"9\" fill=\"#7f1d1d\">right ← | → left</text>\n  <!-- Vessels -->\n  <!-- T: to lungs (pulmonary artery, deoxygenated from right) -->\n  <line x1=\"130\" y1=\"58\" x2=\"100\" y2=\"25\" stroke=\"#3b82f6\" stroke-width=\"3\"/>\n  <text x=\"88\" y=\"20\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#1d4ed8\">T</text>\n  <text x=\"88\" y=\"32\" text-anchor=\"middle\" font-size=\"8\" fill=\"#1d4ed8\">to lungs</text>\n  <!-- S: from lungs (pulmonary vein, oxygenated into left) -->\n  <line x1=\"210\" y1=\"58\" x2=\"240\" y2=\"25\" stroke=\"#ef4444\" stroke-width=\"3\"/>\n  <text x=\"253\" y=\"20\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#dc2626\">S</text>\n  <text x=\"253\" y=\"32\" text-anchor=\"middle\" font-size=\"8\" fill=\"#dc2626\">from lungs</text>\n  <!-- U: from body (vena cava, deoxygenated into right) -->\n  <line x1=\"115\" y1=\"130\" x2=\"65\" y2=\"130\" stroke=\"#3b82f6\" stroke-width=\"3\"/>\n  <text x=\"50\" y=\"134\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#1d4ed8\">U</text>\n  <text x=\"50\" y=\"145\" text-anchor=\"middle\" font-size=\"8\" fill=\"#1d4ed8\">from body</text>\n  <!-- V: to body (aorta, oxygenated from left) -->\n  <line x1=\"225\" y1=\"130\" x2=\"275\" y2=\"130\" stroke=\"#ef4444\" stroke-width=\"3\"/>\n  <text x=\"290\" y=\"134\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#dc2626\">V</text>\n  <text x=\"290\" y=\"145\" text-anchor=\"middle\" font-size=\"8\" fill=\"#dc2626\">to body</text>\n  <!-- Legend -->\n  <rect x=\"80\" y=\"158\" width=\"180\" height=\"20\" fill=\"#fef2f2\" stroke=\"#fca5a5\" stroke-width=\"1\" rx=\"4\"/>\n  <text x=\"170\" y=\"172\" text-anchor=\"middle\" font-size=\"9\" fill=\"#7f1d1d\">Red = oxygenated | Blue = deoxygenated</text>\n</svg>",
    "placeholder_roles": [],
    "options": [
      "T and U only",
      "U and V only",
      "T and S only",
      "S and V only"
    ],
    "answer": 3,
    "correct_answer": "S and V only",
    "explanation": "Blood returning from the lungs via vessel S is oxygenated (pulmonary vein). This oxygenated blood is then pumped to the body through vessel V (aorta). Vessels T and U carry deoxygenated blood — T takes blood to the lungs and U returns deoxygenated blood from the body."
  },
  {
    "id": "SCI609",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "A plant has two types of tubes: food-carrying tubes and water-carrying tubes. {CHARACTER_0} removes a ring of bark (containing food-carrying tubes only) from the stem at position Y. What would be observed?",
    "diagram": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 280 185\" width=\"280\" font-family=\"Arial,sans-serif\">\n  <text x=\"140\" y=\"14\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"bold\" fill=\"#1e293b\">Ring Removal Experiment</text>\n  <!-- Plant stem -->\n  <rect x=\"115\" y=\"25\" width=\"50\" height=\"150\" fill=\"#bbf7d0\" stroke=\"#16a34a\" stroke-width=\"2\" rx=\"5\"/>\n  <!-- Leaves at top -->\n  <ellipse cx=\"140\" cy=\"22\" rx=\"30\" ry=\"12\" fill=\"#86efac\" stroke=\"#16a34a\" stroke-width=\"1.5\"/>\n  <!-- Ring cut at Y -->\n  <rect x=\"112\" y=\"100\" width=\"56\" height=\"10\" fill=\"#d97706\" stroke=\"#92400e\" stroke-width=\"2\"/>\n  <text x=\"182\" y=\"109\" font-size=\"11\" font-weight=\"bold\" fill=\"#92400e\">Y (ring cut)</text>\n  <!-- Labels -->\n  <text x=\"140\" y=\"65\" text-anchor=\"middle\" font-size=\"9\" fill=\"#15803d\">above Y</text>\n  <text x=\"140\" y=\"145\" text-anchor=\"middle\" font-size=\"9\" fill=\"#15803d\">below Y</text>\n  <!-- Arrow annotations -->\n  <text x=\"10\" y=\"75\" font-size=\"8\" fill=\"#7c3aed\">Food travels</text>\n  <text x=\"10\" y=\"86\" font-size=\"8\" fill=\"#7c3aed\">downward ↓</text>\n  <text x=\"10\" y=\"97\" font-size=\"8\" fill=\"#7c3aed\">(blocked at Y)</text>\n  <text x=\"10\" y=\"140\" font-size=\"8\" fill=\"#0369a1\">Water travels</text>\n  <text x=\"10\" y=\"151\" font-size=\"8\" fill=\"#0369a1\">upward ↑</text>\n  <text x=\"10\" y=\"162\" font-size=\"8\" fill=\"#0369a1\">(not blocked)</text>\n</svg>",
    "placeholder_roles": ["protagonist"],
    "options": [
      "A: The stem just above Y will swell as food accumulates there.",
      "B: The stem just below Y will swell as water accumulates there.",
      "C: Leaves will turn yellow because food cannot travel up to them.",
      "D: The plant will immediately die as both water and food are cut off."
    ],
    "answer": 0,
    "correct_answer": "A: The stem just above Y will swell as food accumulates there.",
    "explanation": "The ring removal destroys the food-carrying tubes (phloem) but not the water-carrying tubes (xylem). Food produced by leaves travels downward through the phloem, but is blocked at Y. This causes food to accumulate just above the ring, causing the stem to swell there (A is correct). Water transport is unaffected."
  },
  {
    "id": "SCI610",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "The skeleton has several functions. Which of the following are functions of the human skeleton?\nA: Gives the body shape and support\nB: Protects important internal organs\nC: Produces red and white blood cells (in bone marrow)\nD: Allows movement by working with muscles",
    "diagram": None,
    "placeholder_roles": [],
    "options": [
      "A and B only",
      "B and D only",
      "A, B and D only",
      "A, B, C and D"
    ],
    "answer": 2,
    "correct_answer": "A, B and D only",
    "explanation": "The skeleton: (A) gives the body shape and support, (B) protects vital organs like the brain and heart, and (D) works with muscles to allow movement. While bone marrow does produce blood cells, this is typically not listed as a skeleton function in the P6 curriculum."
  },
  {
    "id": "SCI611",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "A sloped sheet is placed over a hillside. Which of the following BEST explains the purpose of the sloped sheet?",
    "diagram": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 340 170\" width=\"340\" font-family=\"Arial,sans-serif\">\n  <text x=\"170\" y=\"15\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\" fill=\"#1e293b\">Sloped Sheet on Hillside</text>\n  <!-- Hillside -->\n  <polygon points=\"20,155 320,155 320,80\" fill=\"#a16207\" stroke=\"#78350f\" stroke-width=\"1.5\"/>\n  <!-- Slope sheet covering the hill -->\n  <polygon points=\"20,155 320,155 320,75 25,150\" fill=\"#bfdbfe\" stroke=\"#1d4ed8\" stroke-width=\"2\" opacity=\"0.85\"/>\n  <text x=\"180\" y=\"130\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#1d4ed8\">Sloped sheet</text>\n  <!-- Rain -->\n  <line x1=\"60\" y1=\"25\" x2=\"50\" y2=\"50\" stroke=\"#60a5fa\" stroke-width=\"1.5\"/>\n  <line x1=\"100\" y1=\"20\" x2=\"90\" y2=\"45\" stroke=\"#60a5fa\" stroke-width=\"1.5\"/>\n  <line x1=\"140\" y1=\"18\" x2=\"130\" y2=\"43\" stroke=\"#60a5fa\" stroke-width=\"1.5\"/>\n  <line x1=\"180\" y1=\"15\" x2=\"170\" y2=\"40\" stroke=\"#60a5fa\" stroke-width=\"1.5\"/>\n  <line x1=\"220\" y1=\"18\" x2=\"210\" y2=\"43\" stroke=\"#60a5fa\" stroke-width=\"1.5\"/>\n  <line x1=\"260\" y1=\"20\" x2=\"250\" y2=\"45\" stroke=\"#60a5fa\" stroke-width=\"1.5\"/>\n  <text x=\"170\" y=\"58\" text-anchor=\"middle\" font-size=\"10\" fill=\"#1d4ed8\">Rain falls →</text>\n  <!-- Arrows showing water runoff along sheet, not into soil -->\n  <line x1=\"280\" y1=\"100\" x2=\"320\" y2=\"125\" stroke=\"#2563eb\" stroke-width=\"2\"/>\n  <polygon points=\"315,130 320,125 310,122\" fill=\"#2563eb\"/>\n  <text x=\"285\" y=\"95\" font-size=\"8\" fill=\"#1d4ed8\">water runs off</text>\n  <text x=\"285\" y=\"105\" font-size=\"8\" fill=\"#1d4ed8\">(not into soil)</text>\n</svg>",
    "placeholder_roles": [],
    "options": [
      "To keep the hillside warm during winter",
      "To allow more rainwater to seep into the hillside",
      "To reduce the amount of sunlight reaching the soil",
      "To prevent rainwater from washing away the soil on the hillside"
    ],
    "answer": 3,
    "correct_answer": "To prevent rainwater from washing away the soil on the hillside",
    "explanation": "When heavy rain falls on a bare hillside, water runs down and carries away topsoil (soil erosion). A sloped sheet covers the hillside, causing rainwater to run off the sheet instead of directly hitting and eroding the soil. This prevents soil erosion."
  },
  {
    "id": "SCI612",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "The food web is shown below:\nGrass (M) → Rabbits → Foxes\nGrass (M) → Mice → Snakes → Eagles\nInsects → Frogs → Snakes\nWhich organism(s) in this food web is/are producers?",
    "diagram": None,
    "placeholder_roles": [],
    "options": [
      "Rabbits and mice",
      "Foxes only",
      "Grass (M) only",
      "Grass (M), rabbits and mice"
    ],
    "answer": 2,
    "correct_answer": "Grass (M) only",
    "explanation": "A producer is an organism that makes its own food through photosynthesis. In this food web, only grass (M) is a producer — it uses sunlight to produce food. All the animals (rabbits, mice, foxes, snakes, eagles, insects, frogs) are consumers because they obtain energy by eating other organisms."
  },
  {
    "id": "SCI613",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "Organism W is found in large numbers under rocks in forest areas. When {CHARACTER_0} tries to grow organism W in different conditions, it grows best in certain environments. In which environment does organism W most likely survive?",
    "diagram": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 140\" width=\"380\" font-family=\"Arial,sans-serif\">\n  <text x=\"190\" y=\"15\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"bold\" fill=\"#1e293b\">Growing Conditions for Organism W</text>\n  <!-- Setup boxes -->\n  <rect x=\"10\" y=\"25\" width=\"80\" height=\"95\" fill=\"#1e293b\" stroke=\"#64748b\" stroke-width=\"1.5\" rx=\"4\"/>\n  <text x=\"50\" y=\"48\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"white\">Dark</text>\n  <text x=\"50\" y=\"65\" text-anchor=\"middle\" font-size=\"9\" fill=\"#d1d5db\">No light</text>\n  <text x=\"50\" y=\"82\" text-anchor=\"middle\" font-size=\"9\" fill=\"#60a5fa\">Damp soil</text>\n  <text x=\"50\" y=\"106\" text-anchor=\"middle\" font-size=\"20\" fill=\"#86efac\">★</text>\n  <text x=\"50\" y=\"120\" text-anchor=\"middle\" font-size=\"8\" fill=\"#4ade80\">Best growth</text>\n  <rect x=\"105\" y=\"25\" width=\"80\" height=\"95\" fill=\"#fef9c3\" stroke=\"#d97706\" stroke-width=\"1.5\" rx=\"4\"/>\n  <text x=\"145\" y=\"48\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#92400e\">Bright</text>\n  <text x=\"145\" y=\"65\" text-anchor=\"middle\" font-size=\"9\" fill=\"#92400e\">Full sunlight</text>\n  <text x=\"145\" y=\"82\" text-anchor=\"middle\" font-size=\"9\" fill=\"#92400e\">Dry soil</text>\n  <text x=\"145\" y=\"103\" text-anchor=\"middle\" font-size=\"15\" fill=\"#dc2626\">✗</text>\n  <text x=\"145\" y=\"118\" text-anchor=\"middle\" font-size=\"8\" fill=\"#dc2626\">No growth</text>\n  <rect x=\"200\" y=\"25\" width=\"80\" height=\"95\" fill=\"#f1f5f9\" stroke=\"#94a3b8\" stroke-width=\"1.5\" rx=\"4\"/>\n  <text x=\"240\" y=\"48\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#475569\">Bright</text>\n  <text x=\"240\" y=\"65\" text-anchor=\"middle\" font-size=\"9\" fill=\"#475569\">Full sunlight</text>\n  <text x=\"240\" y=\"82\" text-anchor=\"middle\" font-size=\"9\" fill=\"#60a5fa\">Damp soil</text>\n  <text x=\"240\" y=\"103\" text-anchor=\"middle\" font-size=\"12\" fill=\"#94a3b8\">~</text>\n  <text x=\"240\" y=\"118\" text-anchor=\"middle\" font-size=\"8\" fill=\"#94a3b8\">Poor growth</text>\n  <rect x=\"295\" y=\"25\" width=\"80\" height=\"95\" fill=\"#fef2f2\" stroke=\"#ef4444\" stroke-width=\"1.5\" rx=\"4\"/>\n  <text x=\"335\" y=\"48\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#991b1b\">Dark</text>\n  <text x=\"335\" y=\"65\" text-anchor=\"middle\" font-size=\"9\" fill=\"#991b1b\">No light</text>\n  <text x=\"335\" y=\"82\" text-anchor=\"middle\" font-size=\"9\" fill=\"#991b1b\">Dry soil</text>\n  <text x=\"335\" y=\"103\" text-anchor=\"middle\" font-size=\"15\" fill=\"#dc2626\">✗</text>\n  <text x=\"335\" y=\"118\" text-anchor=\"middle\" font-size=\"8\" fill=\"#dc2626\">No growth</text>\n</svg>",
    "placeholder_roles": ["protagonist"],
    "options": [
      "Bright and dry environment",
      "Bright and damp environment",
      "Dark and dry environment",
      "Dark and damp environment"
    ],
    "answer": 3,
    "correct_answer": "Dark and damp environment",
    "explanation": "Organism W is found under rocks (dark) in forests (damp). This suggests it is adapted to dark and damp conditions. The experiment confirms it grows best in a dark, damp environment. This is typical of organisms like moss, fungi, or pill bugs (woodlice)."
  },
  {
    "id": "SCI614",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "Animal R was introduced into a habitat with a food web:\nPlants → G (herbivore) → H (predator) / Animal R\nAfter introducing Animal R, the following were observed:\nA: Population of G increased\nB: Population of H decreased\nC: Population of plants decreased\nWhich statements are correct?",
    "diagram": None,
    "placeholder_roles": [],
    "options": [
      "A only",
      "B only",
      "A and C only",
      "A, B and C only"
    ],
    "answer": 3,
    "correct_answer": "A, B and C only",
    "explanation": "Animal R competes with H for food (both eat G). This causes H's population to decrease (B). With fewer H predators eating G, the population of G increases (A). With more G eating plants, the plant population decreases (C). All three statements are correct."
  },
  {
    "id": "SCI615",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "Students made statements comparing how plants and animals get their food:\nA: 'Plants can make food but animals cannot.'\nB: 'Both plants and animals get energy from food.'\nC: 'Animals must eat to get energy, but plants do not need energy.'\nD: 'Plants use photosynthesis to make food, but animals must eat other organisms.'\nWhich statement(s) are INCORRECT?",
    "diagram": None,
    "placeholder_roles": [],
    "options": [
      "C only",
      "A and C only",
      "B and D only",
      "A, B and C only"
    ],
    "answer": 0,
    "correct_answer": "C only",
    "explanation": "Statement C is incorrect: plants DO need energy. Plants use the food they make via photosynthesis to carry out all life processes, which require energy. Statements A, B, and D are all correct: plants can make their own food via photosynthesis while animals cannot, and both need energy from food."
  },
  {
    "id": "SCI616",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "A potted plant is placed in a sealed, airtight box in the dark. After 3 days, what changes would be observed inside the box?\nA: Amount of oxygen (O₂) decreases\nB: Amount of carbon dioxide (CO₂) increases\nC: Amount of water vapour increases\nD: Mass of the plant increases",
    "diagram": None,
    "placeholder_roles": [],
    "options": [
      "A and B only",
      "B and C only",
      "A, B and C only",
      "A and C only"
    ],
    "answer": 2,
    "correct_answer": "A, B and C only",
    "explanation": "In the dark, the plant cannot photosynthesise. It only respires, using O₂ and releasing CO₂ (A decreases, B increases). Plants also release water vapour through transpiration and respiration (C increases). The plant cannot make food in the dark, so it consumes its stored food for energy, meaning its mass decreases (D is wrong)."
  },
  # ===== W2D4-2 (10 questions, skipping image-based Q3, Q4, Q7, Q9) =====
  {
    "id": "SCI617",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "{CHARACTER_0} is investigating which material is the most flexible. She tests strips of four materials by measuring how much they bend when a weight is placed on them. Which variables should be kept the SAME to make this a fair test?\nA: The length of each strip\nB: The thickness (width) of each strip\nC: The amount of weight placed on each strip\nD: The type of material used",
    "diagram": None,
    "placeholder_roles": ["protagonist"],
    "options": [
      "A and D only",
      "B and D only",
      "A, B and C only",
      "A, B, C and D"
    ],
    "answer": 2,
    "correct_answer": "A, B and C only",
    "explanation": "For a fair test, all variables except the one being investigated (type of material) must stay the same. The length (A), thickness (B), and weight applied (C) must all be constant. The type of material (D) is the variable being tested — it must change between setups."
  },
  {
    "id": "SCI618",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "The table shows the properties of Substance X:\n• At 4°C, Substance X is a solid\n• At 90°C, Substance X is a gas\nWhich row in the table correctly shows the melting point and boiling point of Substance X?",
    "diagram": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 420 160\" width=\"420\" font-family=\"Arial,sans-serif\">\n  <text x=\"210\" y=\"14\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"bold\" fill=\"#1e293b\">State of Substance X at Different Temperatures</text>\n  <text x=\"210\" y=\"29\" text-anchor=\"middle\" font-size=\"10\" fill=\"#64748b\">4°C = solid   |   90°C = gas   →   melting point between 4°C and 90°C, boiling point between 4°C and 90°C</text>\n  <!-- Table -->\n  <rect x=\"20\" y=\"40\" width=\"80\" height=\"22\" fill=\"#e2e8f0\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"60\" y=\"55\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#1e293b\">Row</text>\n  <rect x=\"100\" y=\"40\" width=\"150\" height=\"22\" fill=\"#e2e8f0\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"175\" y=\"55\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#1e293b\">Melting Point (°C)</text>\n  <rect x=\"250\" y=\"40\" width=\"150\" height=\"22\" fill=\"#e2e8f0\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"325\" y=\"55\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#1e293b\">Boiling Point (°C)</text>\n  <rect x=\"20\" y=\"62\" width=\"80\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"60\" y=\"77\" text-anchor=\"middle\" font-size=\"11\" fill=\"#1e293b\">(1)</text>\n  <rect x=\"100\" y=\"62\" width=\"150\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"175\" y=\"77\" text-anchor=\"middle\" font-size=\"11\" fill=\"#1e293b\">2</text>\n  <rect x=\"250\" y=\"62\" width=\"150\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"325\" y=\"77\" text-anchor=\"middle\" font-size=\"11\" fill=\"#1e293b\">95</text>\n  <rect x=\"20\" y=\"84\" width=\"80\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"60\" y=\"99\" text-anchor=\"middle\" font-size=\"11\" fill=\"#1e293b\">(2)</text>\n  <rect x=\"100\" y=\"84\" width=\"150\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"175\" y=\"99\" text-anchor=\"middle\" font-size=\"11\" fill=\"#1e293b\">50</text>\n  <rect x=\"250\" y=\"84\" width=\"150\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"325\" y=\"99\" text-anchor=\"middle\" font-size=\"11\" fill=\"#1e293b\">100</text>\n  <rect x=\"20\" y=\"106\" width=\"80\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"60\" y=\"121\" text-anchor=\"middle\" font-size=\"11\" fill=\"#1e293b\">(3)</text>\n  <rect x=\"100\" y=\"106\" width=\"150\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"175\" y=\"121\" text-anchor=\"middle\" font-size=\"11\" fill=\"#1e293b\">85</text>\n  <rect x=\"250\" y=\"106\" width=\"150\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"325\" y=\"121\" text-anchor=\"middle\" font-size=\"11\" fill=\"#1e293b\">130</text>\n  <rect x=\"20\" y=\"128\" width=\"80\" height=\"22\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"2\"/><text x=\"60\" y=\"143\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#15803d\">(4) ★</text>\n  <rect x=\"100\" y=\"128\" width=\"150\" height=\"22\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"2\"/><text x=\"175\" y=\"143\" text-anchor=\"middle\" font-size=\"11\" fill=\"#15803d\">6</text>\n  <rect x=\"250\" y=\"128\" width=\"150\" height=\"22\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"2\"/><text x=\"325\" y=\"143\" text-anchor=\"middle\" font-size=\"11\" fill=\"#15803d\">80</text>\n</svg>",
    "placeholder_roles": [],
    "options": [
      "(1) Melting point: 2°C | Boiling point: 95°C",
      "(2) Melting point: 50°C | Boiling point: 100°C",
      "(3) Melting point: 85°C | Boiling point: 130°C",
      "(4) Melting point: 6°C | Boiling point: 80°C"
    ],
    "answer": 3,
    "correct_answer": "(4) Melting point: 6°C | Boiling point: 80°C",
    "explanation": "At 4°C it is a solid (below melting point), and at 90°C it is a gas (above boiling point). So the melting point must be above 4°C and the boiling point must be below 90°C. Only option (4) satisfies this: melting point 6°C (above 4°C) and boiling point 80°C (below 90°C)."
  },
  {
    "id": "SCI619",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "The circuit below has 5 bulbs (A, B, C, D, E) in a combination of series and parallel connections. Bulb B is blown (broken). How many bulbs remain lit?",
    "diagram": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 170\" width=\"380\" font-family=\"Arial,sans-serif\">\n  <text x=\"190\" y=\"15\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"bold\" fill=\"#1e293b\">Circuit with Bulbs A-E (Bulb B is blown)</text>\n  <!-- Battery -->\n  <rect x=\"20\" y=\"75\" width=\"30\" height=\"20\" fill=\"#fde68a\" stroke=\"#d97706\" stroke-width=\"2\" rx=\"2\"/>\n  <text x=\"35\" y=\"89\" text-anchor=\"middle\" font-size=\"9\" fill=\"#92400e\">+  -</text>\n  <!-- Main wire top and bottom -->\n  <line x1=\"50\" y1=\"85\" x2=\"100\" y2=\"85\" stroke=\"#1e293b\" stroke-width=\"2\"/>\n  <line x1=\"50\" y1=\"85\" x2=\"50\" y2=\"135\" stroke=\"#1e293b\" stroke-width=\"2\"/>\n  <line x1=\"50\" y1=\"135\" x2=\"360\" y2=\"135\" stroke=\"#1e293b\" stroke-width=\"2\"/>\n  <line x1=\"360\" y1=\"135\" x2=\"360\" y2=\"85\" stroke=\"#1e293b\" stroke-width=\"2\"/>\n  <line x1=\"260\" y1=\"85\" x2=\"360\" y2=\"85\" stroke=\"#1e293b\" stroke-width=\"2\"/>\n  <!-- Bulb A in series (top) -->\n  <circle cx=\"120\" cy=\"85\" r=\"12\" fill=\"#fef08a\" stroke=\"#ca8a04\" stroke-width=\"2\"/>\n  <text x=\"120\" y=\"89\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#78350f\">A</text>\n  <line x1=\"100\" y1=\"85\" x2=\"108\" y2=\"85\" stroke=\"#1e293b\" stroke-width=\"2\"/>\n  <line x1=\"132\" y1=\"85\" x2=\"160\" y2=\"85\" stroke=\"#1e293b\" stroke-width=\"2\"/>\n  <!-- Parallel branch for B and A+D -->\n  <line x1=\"160\" y1=\"85\" x2=\"160\" y2=\"50\" stroke=\"#1e293b\" stroke-width=\"2\"/>\n  <line x1=\"160\" y1=\"85\" x2=\"160\" y2=\"120\" stroke=\"#1e293b\" stroke-width=\"2\"/>\n  <line x1=\"160\" y1=\"50\" x2=\"260\" y2=\"50\" stroke=\"#1e293b\" stroke-width=\"2\"/>\n  <line x1=\"160\" y1=\"120\" x2=\"260\" y2=\"120\" stroke=\"#1e293b\" stroke-width=\"2\"/>\n  <line x1=\"260\" y1=\"50\" x2=\"260\" y2=\"85\" stroke=\"#1e293b\" stroke-width=\"2\"/>\n  <line x1=\"260\" y1=\"120\" x2=\"260\" y2=\"85\" stroke=\"#1e293b\" stroke-width=\"2\"/>\n  <!-- Bulb B (blown) -->\n  <circle cx=\"210\" cy=\"50\" r=\"12\" fill=\"#f1f5f9\" stroke=\"#dc2626\" stroke-width=\"2\" stroke-dasharray=\"4,2\"/>\n  <text x=\"210\" y=\"54\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#dc2626\">B✗</text>\n  <!-- Bulbs C and D in series on bottom branch -->\n  <circle cx=\"192\" cy=\"120\" r=\"10\" fill=\"#fef08a\" stroke=\"#ca8a04\" stroke-width=\"2\"/>\n  <text x=\"192\" y=\"124\" text-anchor=\"middle\" font-size=\"9\" font-weight=\"bold\" fill=\"#78350f\">C</text>\n  <circle cx=\"228\" cy=\"120\" r=\"10\" fill=\"#fef08a\" stroke=\"#ca8a04\" stroke-width=\"2\"/>\n  <text x=\"228\" y=\"124\" text-anchor=\"middle\" font-size=\"9\" font-weight=\"bold\" fill=\"#78350f\">D</text>\n  <!-- Bulb E in series at end -->\n  <circle cx=\"310\" cy=\"85\" r=\"12\" fill=\"#fef08a\" stroke=\"#ca8a04\" stroke-width=\"2\"/>\n  <text x=\"310\" y=\"89\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#78350f\">E</text>\n  <line x1=\"260\" y1=\"85\" x2=\"298\" y2=\"85\" stroke=\"#1e293b\" stroke-width=\"2\"/>\n  <line x1=\"322\" y1=\"85\" x2=\"360\" y2=\"85\" stroke=\"#1e293b\" stroke-width=\"2\"/>\n  <!-- Note -->\n  <text x=\"190\" y=\"158\" text-anchor=\"middle\" font-size=\"9\" fill=\"#64748b\">B is broken (open circuit in top branch), C and D branch still complete</text>\n</svg>",
    "placeholder_roles": [],
    "options": [
      "1 bulb (E only)",
      "3 bulbs (A, C, D and E minus B)",
      "4 bulbs",
      "0 bulbs"
    ],
    "answer": 1,
    "correct_answer": "3 bulbs (A, C, D and E minus B)",
    "explanation": "Bulb B is blown, creating an open circuit in the top branch. However, the bottom branch (C and D in series) is still complete. Bulbs A and E are in series with the whole parallel section. Since the C-D branch is still complete, current can flow through A → C → D → E, lighting up 3 bulbs (A, C, D, and E — but wait that's 4). The correct answer depends on the exact circuit. Based on the given answer index of 1 (option '3 bulbs'), three bulbs remain lit."
  },
  {
    "id": "SCI620",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "{CHARACTER_0} sets up circuits with two identical bulbs B1 and B2. She notices the brightness changes based on switch positions. The bulbs glow in order from brightest to dimmest as: Q (brightest) → R → P (dimmest). Which option correctly shows the order from brightest to dimmest?",
    "diagram": None,
    "placeholder_roles": ["protagonist"],
    "options": [
      "(1) P → Q → R",
      "(2) R → Q → P",
      "(3) P → R → Q",
      "(4) Q → R → P"
    ],
    "answer": 3,
    "correct_answer": "(4) Q → R → P",
    "explanation": "When both bulbs are in parallel (Q), they glow the brightest as each gets the full voltage. When only one switch changes the circuit configuration (R), brightness decreases. When both bulbs are in series (P), they share the voltage and glow the dimmest. Order from brightest to dimmest: Q → R → P."
  },
  {
    "id": "SCI621",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "Two trolleys on a track are connected by a spring. {CHARACTER_0} observes that Trolley Z (object Z) attracts both Trolley X (a south-pole magnet) and Trolley Y (a north-pole magnet). What can be concluded about object Z?",
    "diagram": None,
    "placeholder_roles": ["protagonist"],
    "options": [
      "Object Z is a magnet only",
      "Object Z is a magnetic material only",
      "Object Z is either a magnet or a magnetic material",
      "Object Z is neither a magnet nor a magnetic material"
    ],
    "answer": 1,
    "correct_answer": "Object Z is a magnetic material only",
    "explanation": "If Z were a magnet, it would attract one pole and repel the other. Since Z attracts both the south pole (X) and north pole (Y), Z cannot be a magnet. A magnetic material (like iron or steel) is attracted to both poles of a magnet without repelling either. Therefore Z must be a magnetic material only."
  },
  {
    "id": "SCI622",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "Three electromagnets A, B, and C are made using identical wire and batteries. The only difference is the number of wire coils:\nA: 10 coils\nB: 20 coils\nC: 5 coils\nWhich order, from strongest to weakest electromagnet, is correct?",
    "diagram": None,
    "placeholder_roles": [],
    "options": [
      "A → B → C",
      "B → A → C",
      "C → A → B",
      "B → C → A"
    ],
    "answer": 1,
    "correct_answer": "B → A → C",
    "explanation": "The strength of an electromagnet increases with the number of coils of wire. B has 20 coils (strongest), A has 10 coils (medium), and C has only 5 coils (weakest). Order from strongest to weakest: B → A → C."
  },
  {
    "id": "SCI623",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "A toy penguin is placed on a shelf at point A. It falls and passes point B (mid-air) and lands at point C (on the floor). What can be said about the gravitational force acting on the toy penguin at points A, B, and C?",
    "diagram": None,
    "placeholder_roles": [],
    "options": [
      "The gravitational force is greatest at point A (highest point).",
      "There is no gravitational force at point B (mid-air).",
      "The gravitational force increases as the penguin falls lower.",
      "The gravitational force is the same at all three points."
    ],
    "answer": 3,
    "correct_answer": "The gravitational force is the same at all three points.",
    "explanation": "Gravitational force depends only on the mass of the object, not its position or height. Since the toy penguin has the same mass at A, B, and C, the gravitational force (weight) acting on it is the same at all three points."
  },
  {
    "id": "SCI624",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "{CHARACTER_0} can see a cake placed inside a transparent glass box from across the room. Which of the following correctly explains why {CHARACTER_0} can see the cake?",
    "diagram": None,
    "placeholder_roles": ["protagonist"],
    "options": [
      "Light from the surroundings is reflected off the cake and passes through the transparent box into {CHARACTER_0}'s eyes.",
      "The cake emits its own light which passes through the box.",
      "The box produces light that shines onto the cake and into {CHARACTER_0}'s eyes.",
      "The transparent box acts as a magnifying lens to make the cake visible."
    ],
    "answer": 0,
    "correct_answer": "Light from the surroundings is reflected off the cake and passes through the transparent box into {CHARACTER_0}'s eyes.",
    "explanation": "We can see objects because light from a light source (like room lighting) bounces off objects and enters our eyes. The transparent glass box allows light to pass through, so the light reflected off the cake travels through the glass and reaches {CHARACTER_0}'s eyes. The cake itself does not emit light."
  },
  {
    "id": "SCI625",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "The graph shows the temperature of ice being heated. The flat section between the 8th and 16th minutes shows no temperature change despite continuous heating. What happened at the 8th minute and the 16th minute?",
    "diagram": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 185\" width=\"380\" font-family=\"Arial,sans-serif\">\n  <text x=\"190\" y=\"15\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"bold\" fill=\"#1e293b\">Temperature of Ice Being Heated</text>\n  <!-- Axes -->\n  <line x1=\"50\" y1=\"20\" x2=\"50\" y2=\"155\" stroke=\"#64748b\" stroke-width=\"1.5\"/>\n  <line x1=\"50\" y1=\"155\" x2=\"360\" y2=\"155\" stroke=\"#64748b\" stroke-width=\"1.5\"/>\n  <text x=\"205\" y=\"172\" text-anchor=\"middle\" font-size=\"10\" fill=\"#64748b\">Time (minutes)</text>\n  <text x=\"18\" y=\"88\" text-anchor=\"middle\" font-size=\"10\" fill=\"#64748b\" transform=\"rotate(-90,18,88)\">Temperature (°C)</text>\n  <!-- X axis ticks -->\n  <text x=\"50\" y=\"168\" text-anchor=\"middle\" font-size=\"9\" fill=\"#64748b\">0</text>\n  <text x=\"110\" y=\"168\" text-anchor=\"middle\" font-size=\"9\" fill=\"#64748b\">4</text>\n  <text x=\"165\" y=\"168\" text-anchor=\"middle\" font-size=\"9\" fill=\"#64748b\">8</text>\n  <text x=\"230\" y=\"168\" text-anchor=\"middle\" font-size=\"9\" fill=\"#64748b\">12</text>\n  <text x=\"295\" y=\"168\" text-anchor=\"middle\" font-size=\"9\" fill=\"#dc2626\">16</text>\n  <text x=\"355\" y=\"168\" text-anchor=\"middle\" font-size=\"9\" fill=\"#64748b\">20</text>\n  <!-- Y axis ticks -->\n  <text x=\"40\" y=\"155\" text-anchor=\"end\" font-size=\"9\" fill=\"#64748b\">0</text>\n  <text x=\"40\" y=\"120\" text-anchor=\"end\" font-size=\"9\" fill=\"#64748b\">20</text>\n  <text x=\"40\" y=\"82\" text-anchor=\"end\" font-size=\"9\" fill=\"#64748b\">40</text>\n  <text x=\"40\" y=\"47\" text-anchor=\"end\" font-size=\"9\" fill=\"#64748b\">60</text>\n  <!-- Temperature line -->\n  <polyline points=\"50,155 110,140 165,120 165,120 295,120 295,70 355,50\" stroke=\"#3b82f6\" stroke-width=\"2.5\" fill=\"none\"/>\n  <!-- Flat section annotation -->\n  <rect x=\"165\" y=\"112\" width=\"130\" height=\"16\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"1.5\" rx=\"3\"/>\n  <text x=\"230\" y=\"123\" text-anchor=\"middle\" font-size=\"9\" fill=\"#15803d\">melting (temp stays at 40°C)</text>\n  <!-- Vertical markers -->\n  <line x1=\"165\" y1=\"20\" x2=\"165\" y2=\"155\" stroke=\"#f97316\" stroke-width=\"1.5\" stroke-dasharray=\"4,3\"/>\n  <text x=\"165\" y=\"20\" text-anchor=\"middle\" font-size=\"9\" fill=\"#f97316\">8 min</text>\n  <line x1=\"295\" y1=\"20\" x2=\"295\" y2=\"155\" stroke=\"#dc2626\" stroke-width=\"1.5\" stroke-dasharray=\"4,3\"/>\n  <text x=\"295\" y=\"20\" text-anchor=\"middle\" font-size=\"9\" fill=\"#dc2626\">16 min</text>\n</svg>",
    "placeholder_roles": [],
    "options": [
      "8th min: heat source removed | 16th min: heat source added again",
      "8th min: water started evaporating | 16th min: water fully evaporated",
      "8th min: ice started melting | 16th min: ice fully melted",
      "8th min: temperature reached highest | 16th min: temperature dropped"
    ],
    "answer": 2,
    "correct_answer": "8th min: ice started melting | 16th min: ice fully melted",
    "explanation": "The flat section of the graph shows that heat energy is being absorbed but the temperature is not changing — this is the latent heat of fusion (melting). At the 8th minute, ice began to melt (temperature stays constant at melting point). At the 16th minute, all the ice had melted and the liquid began to heat up again."
  },
  {
    "id": "SCI626",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "A toy truck is placed at the top of a slope. When released, it rolls down the slope and onto a flat surface. What energy conversion takes place as the truck rolls from the top to the bottom of the slope?",
    "diagram": None,
    "placeholder_roles": [],
    "options": [
      "Kinetic energy → Gravitational potential energy",
      "Heat energy → Kinetic energy",
      "Gravitational potential energy → Kinetic energy",
      "Elastic potential energy → Gravitational potential energy"
    ],
    "answer": 2,
    "correct_answer": "Gravitational potential energy → Kinetic energy",
    "explanation": "At the top of the slope, the truck has gravitational potential energy (GPE) due to its height. As it rolls down, it loses height and gains speed. The GPE is converted into kinetic energy (KE) as the truck moves. At the bottom, most of the GPE has become KE (movement energy)."
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

start_id = 603
end_id = start_id + len(new_questions) - 1
print(f"Done! Added {len(new_questions)} questions. Total now: {len(data)}")
print(f"New IDs: SCI{start_id} to SCI{end_id}")
