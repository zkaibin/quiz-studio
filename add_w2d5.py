import json

new_questions = [
  # ===== W2D5-1 (13 questions, skipping image-only Q11) =====
  {
    "id": "SCI627",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "{CHARACTER_0} finds an animal K with the following characteristics:\n• warm-blooded\n• has hair/fur\n• gives birth to live young\n• feeds young with milk\nWhich animal group does animal K belong to?",
    "diagram": None,
    "placeholder_roles": ["protagonist"],
    "options": [
      "Reptile",
      "Bird",
      "Amphibian",
      "Mammal"
    ],
    "answer": 3,
    "correct_answer": "Mammal",
    "explanation": "Animal K is a mammal. Mammals have hair or fur, are warm-blooded, give birth to live young (most species), and the females feed their young with milk. No other animal group shares all these characteristics."
  },
  {
    "id": "SCI628",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "A ring of bark (food-carrying tubes) is removed from a tree's stem. The following observations were made after 2 weeks:\nA: The stem just above the ring became swollen.\nB: The leaves started to wilt.\nC: The stem just below the ring became thinner.\nD: The fruits above the ring grew larger.\nWhich statements are correct?",
    "diagram": None,
    "placeholder_roles": [],
    "options": [
      "A and C only",
      "A and D only",
      "B and C only",
      "B and D only"
    ],
    "answer": 1,
    "correct_answer": "A and D only",
    "explanation": "Food (made by leaves through photosynthesis) travels downward through the food-carrying tubes (phloem). When these are removed at the ring, food cannot travel past the ring. It accumulates just above, causing swelling (A). The fruits above the ring also receive more food and grow larger (D). The leaves continue to make food (no wilting) and the stem below thins from lack of food (C is about the stem below)."
  },
  {
    "id": "SCI629",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "The diagram shows a plant with parts W, X, Y, and Z labelled. Which row correctly matches part Z (roots) to its function?",
    "diagram": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 195\" width=\"320\" font-family=\"Arial,sans-serif\">\n  <text x=\"160\" y=\"14\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"bold\" fill=\"#1e293b\">Parts of a Plant</text>\n  <!-- Soil line -->\n  <rect x=\"20\" y=\"140\" width=\"280\" height=\"50\" fill=\"#a16207\" opacity=\"0.3\" rx=\"2\"/>\n  <line x1=\"20\" y1=\"140\" x2=\"300\" y2=\"140\" stroke=\"#78350f\" stroke-width=\"2\" stroke-dasharray=\"6,3\"/>\n  <text x=\"270\" y=\"155\" font-size=\"9\" fill=\"#78350f\">soil</text>\n  <!-- Stem -->\n  <rect x=\"145\" y=\"45\" width=\"30\" height=\"100\" fill=\"#86efac\" stroke=\"#16a34a\" stroke-width=\"1.5\" rx=\"3\"/>\n  <!-- Leaves -->\n  <ellipse cx=\"115\" cy=\"65\" rx=\"32\" ry=\"18\" fill=\"#4ade80\" stroke=\"#16a34a\" stroke-width=\"1.5\" transform=\"rotate(-20,115,65)\"/>\n  <ellipse cx=\"205\" cy=\"70\" rx=\"30\" ry=\"16\" fill=\"#4ade80\" stroke=\"#16a34a\" stroke-width=\"1.5\" transform=\"rotate(15,205,70)\"/>\n  <!-- Flower at top -->\n  <circle cx=\"160\" cy=\"35\" r=\"18\" fill=\"#fde68a\" stroke=\"#d97706\" stroke-width=\"1.5\"/>\n  <text x=\"160\" y=\"39\" text-anchor=\"middle\" font-size=\"9\" fill=\"#78350f\">flower</text>\n  <!-- Roots -->\n  <line x1=\"155\" y1=\"145\" x2=\"130\" y2=\"170\" stroke=\"#92400e\" stroke-width=\"2\"/>\n  <line x1=\"160\" y1=\"145\" x2=\"145\" y2=\"178\" stroke=\"#92400e\" stroke-width=\"2\"/>\n  <line x1=\"165\" y1=\"145\" x2=\"180\" y2=\"175\" stroke=\"#92400e\" stroke-width=\"2\"/>\n  <line x1=\"168\" y1=\"145\" x2=\"195\" y2=\"168\" stroke=\"#92400e\" stroke-width=\"2\"/>\n  <!-- Labels -->\n  <text x=\"58\" y=\"60\" font-size=\"11\" font-weight=\"bold\" fill=\"#d97706\">W</text>\n  <text x=\"58\" y=\"73\" font-size=\"9\" fill=\"#d97706\">(flower)</text>\n  <text x=\"205\" y=\"105\" font-size=\"11\" font-weight=\"bold\" fill=\"#16a34a\">X</text>\n  <text x=\"205\" y=\"118\" font-size=\"9\" fill=\"#16a34a\">(leaf)</text>\n  <text x=\"105\" y=\"115\" font-size=\"11\" font-weight=\"bold\" fill=\"#0369a1\">Y</text>\n  <text x=\"105\" y=\"128\" font-size=\"9\" fill=\"#0369a1\">(stem)</text>\n  <text x=\"220\" y=\"168\" font-size=\"11\" font-weight=\"bold\" fill=\"#92400e\">Z</text>\n  <text x=\"220\" y=\"181\" font-size=\"9\" fill=\"#92400e\">(roots)</text>\n</svg>",
    "placeholder_roles": [],
    "options": [
      "Z absorbs sunlight and makes food for the plant.",
      "Z carries water and minerals from roots to leaves.",
      "Z anchors the plant firmly in the soil and absorbs water and minerals.",
      "Z produces seeds after pollination takes place."
    ],
    "answer": 2,
    "correct_answer": "Z anchors the plant firmly in the soil and absorbs water and minerals.",
    "explanation": "Roots (Z) have two main functions: (1) they anchor/hold the plant firmly in the soil so it does not fall over, and (2) they absorb water and minerals from the soil. Leaves make food, stems carry water, and flowers produce seeds."
  },
  {
    "id": "SCI630",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "The diagram shows the human digestive system with parts labelled. Part Y is the large intestine. Which of the following correctly describes the function of the large intestine (Y)?",
    "diagram": None,
    "placeholder_roles": [],
    "options": [
      "Y produces digestive juices to break down proteins.",
      "Y absorbs digested nutrients into the blood.",
      "Y absorbs water from undigested food to form solid waste.",
      "Y stores bile which helps break down fats."
    ],
    "answer": 2,
    "correct_answer": "Y absorbs water from undigested food to form solid waste.",
    "explanation": "The large intestine's main function is to absorb water from undigested food materials. This process concentrates the waste and forms solid faeces. The small intestine absorbs digested nutrients, the stomach and small intestine produce digestive juices, and the gall bladder stores bile."
  },
  {
    "id": "SCI631",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "Two similar plants A and B were used in an experiment. Plant A had its top cut off and discarded. Plant B had its bottom (roots and lower stem) cut off and discarded. The remaining parts were placed in water. After 2 weeks, only one of them grew a new plant. Which observation explains the result?",
    "diagram": None,
    "placeholder_roles": [],
    "options": [
      "Plant A grew a new plant from its cut stem, as the stem can grow roots.",
      "Plant B grew a new plant as its roots absorbed water and new shoots grew.",
      "Both plants A and B grew new plants because plants can regenerate.",
      "Neither plant grew because both had parts removed."
    ],
    "answer": 1,
    "correct_answer": "Plant B grew a new plant as its roots absorbed water and new shoots grew.",
    "explanation": "Plant B kept the bottom portion including the roots. The roots absorbed water from the container, and the plant was able to grow new shoots from the remaining stem. Plant A had no roots, so it could not absorb water properly to sustain growth and would wilt."
  },
  {
    "id": "SCI632",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "The diagram shows the human circulatory system with blood vessels labelled A to G. Which blood vessels carry blood that is RICH IN OXYGEN?\nA: Aorta (from heart to body)\nB: Vena cava (from body to heart)\nC: Pulmonary artery (from heart to lungs)\nD: Pulmonary vein (from lungs to heart)\nG: Vessels to the upper body",
    "diagram": None,
    "placeholder_roles": [],
    "options": [
      "(1) A and B only",
      "(2) B and C only",
      "(3) A, D and G",
      "(4) B, C and G"
    ],
    "answer": 2,
    "correct_answer": "(3) A, D and G",
    "explanation": "Oxygenated blood flows: from lungs → via pulmonary vein (D) → to heart → pumped to body via aorta (A) → to all parts including upper body vessels (G). The pulmonary artery (C) carries deoxygenated blood to the lungs, and the vena cava (B) returns deoxygenated blood from the body."
  },
  {
    "id": "SCI633",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "The life cycles of organisms P and Q are compared:\n• Both P and Q have 3 life stages\n• Both P and Q have young that look like the adults\n• Organism P completes its life cycle faster than Q\nWhich of the following statements about P and Q are CORRECT?\nA: P and Q both undergo incomplete metamorphosis.\nB: P and Q are both insects.\nC: P completes one life cycle in less time than Q.\nD: P and Q young can both fly.",
    "diagram": None,
    "placeholder_roles": [],
    "options": [
      "A and B only",
      "B and C only",
      "A and C only",
      "A, B and C only"
    ],
    "answer": 2,
    "correct_answer": "A and C only",
    "explanation": "Both P and Q have 3 stages with young resembling adults, so both undergo incomplete metamorphosis (A is correct). P completes its cycle faster (C is correct). Not all incomplete metamorphosis organisms are insects (e.g., cockroaches, grasshoppers are, but crabs are not), so B is not necessarily correct. Young of incomplete metamorphosis organisms cannot always fly (D is wrong — nymphs of grasshoppers lack wings)."
  },
  {
    "id": "SCI634",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "The diagram shows the stages in the germination of a bean seed:\nStage A: Dry seed\nStage B: Seed absorbs water, swells\nStage C: Radicle (root) emerges\nStage D: Shoot emerges and first leaves appear\nDuring which stages is the seedling making its own food through photosynthesis?",
    "diagram": None,
    "placeholder_roles": [],
    "options": [
      "A and B only",
      "B and C only",
      "C and D only",
      "A, B, C and D"
    ],
    "answer": 2,
    "correct_answer": "C and D only",
    "explanation": "Photosynthesis requires chlorophyll (present in green leaves) and sunlight. In stages A and B, the seed has no green leaves yet, so it cannot photosynthesise. In stage C, only the root has emerged — still no leaves. In stage D, the first green leaves have appeared, so the seedling can begin to photosynthesise and make its own food."
  },
  {
    "id": "SCI635",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "The diagram shows the process of fertilisation in humans. Which row correctly identifies where the egg (A) and sperm (B) are produced?",
    "diagram": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 155\" width=\"380\" font-family=\"Arial,sans-serif\">\n  <text x=\"190\" y=\"14\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"bold\" fill=\"#1e293b\">Human Fertilisation</text>\n  <!-- Table -->\n  <rect x=\"20\" y=\"25\" width=\"70\" height=\"22\" fill=\"#e2e8f0\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"55\" y=\"40\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#1e293b\">Row</text>\n  <rect x=\"90\" y=\"25\" width=\"135\" height=\"22\" fill=\"#e2e8f0\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"157\" y=\"40\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#1e293b\">A: Where egg produced</text>\n  <rect x=\"225\" y=\"25\" width=\"135\" height=\"22\" fill=\"#e2e8f0\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"292\" y=\"40\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#1e293b\">B: Where sperm produced</text>\n  <rect x=\"20\" y=\"47\" width=\"70\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"55\" y=\"62\" text-anchor=\"middle\" font-size=\"11\" fill=\"#1e293b\">(1)</text>\n  <rect x=\"90\" y=\"47\" width=\"135\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"157\" y=\"62\" text-anchor=\"middle\" font-size=\"10\" fill=\"#1e293b\">uterus</text>\n  <rect x=\"225\" y=\"47\" width=\"135\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"292\" y=\"62\" text-anchor=\"middle\" font-size=\"10\" fill=\"#1e293b\">ovary</text>\n  <rect x=\"20\" y=\"69\" width=\"70\" height=\"22\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"2\"/><text x=\"55\" y=\"84\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"#15803d\">(2) ★</text>\n  <rect x=\"90\" y=\"69\" width=\"135\" height=\"22\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"2\"/><text x=\"157\" y=\"84\" text-anchor=\"middle\" font-size=\"10\" fill=\"#15803d\">ovary</text>\n  <rect x=\"225\" y=\"69\" width=\"135\" height=\"22\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"2\"/><text x=\"292\" y=\"84\" text-anchor=\"middle\" font-size=\"10\" fill=\"#15803d\">testes</text>\n  <rect x=\"20\" y=\"91\" width=\"70\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"55\" y=\"106\" text-anchor=\"middle\" font-size=\"11\" fill=\"#1e293b\">(3)</text>\n  <rect x=\"90\" y=\"91\" width=\"135\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"157\" y=\"106\" text-anchor=\"middle\" font-size=\"10\" fill=\"#1e293b\">fallopian tube</text>\n  <rect x=\"225\" y=\"91\" width=\"135\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"292\" y=\"106\" text-anchor=\"middle\" font-size=\"10\" fill=\"#1e293b\">testes</text>\n  <rect x=\"20\" y=\"113\" width=\"70\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"55\" y=\"128\" text-anchor=\"middle\" font-size=\"11\" fill=\"#1e293b\">(4)</text>\n  <rect x=\"90\" y=\"113\" width=\"135\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"157\" y=\"128\" text-anchor=\"middle\" font-size=\"10\" fill=\"#1e293b\">ovary</text>\n  <rect x=\"225\" y=\"113\" width=\"135\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"292\" y=\"128\" text-anchor=\"middle\" font-size=\"10\" fill=\"#1e293b\">prostate gland</text>\n</svg>",
    "placeholder_roles": [],
    "options": [
      "(1) Egg: uterus | Sperm: ovary",
      "(2) Egg: ovary | Sperm: testes",
      "(3) Egg: fallopian tube | Sperm: testes",
      "(4) Egg: ovary | Sperm: prostate gland"
    ],
    "answer": 1,
    "correct_answer": "(2) Egg: ovary | Sperm: testes",
    "explanation": "In humans, eggs (ova) are produced in the ovaries (female reproductive organ). Sperm are produced in the testes (male reproductive organ). During fertilisation, the sperm travels up and meets the egg in the fallopian tube."
  },
  {
    "id": "SCI636",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "Plant R has leaves with tiny pores called stomata. {CHARACTER_0} observes that the stomata on Plant R open widely when it needs more food and close when it has enough food. Why do the stomata open widely when Plant R needs more food?",
    "diagram": None,
    "placeholder_roles": ["protagonist"],
    "options": [
      "To allow more carbon dioxide to enter for photosynthesis to make more food.",
      "To release extra water vapour to cool down the plant.",
      "To absorb more oxygen for respiration to release energy.",
      "To close off the plant from insects that might eat it."
    ],
    "answer": 0,
    "correct_answer": "To allow more carbon dioxide to enter for photosynthesis to make more food.",
    "explanation": "Photosynthesis requires carbon dioxide (CO₂), water, and light to produce food (glucose). When a plant needs more food, it opens its stomata wider to allow more CO₂ to enter the leaves, increasing the rate of photosynthesis. Stomata also release oxygen and water vapour, but the primary reason for opening when more food is needed is to take in more CO₂."
  },
  {
    "id": "SCI637",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "Bird W lives near the ocean and has the following adaptations:\n• Structural: waterproof glands near tail / hooked beak\n• Behavioural: follows fishing boats / uses air currents to glide\nWhich row correctly classifies these as structural or behavioural adaptations?",
    "diagram": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 400 155\" width=\"400\" font-family=\"Arial,sans-serif\">\n  <text x=\"200\" y=\"14\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"bold\" fill=\"#1e293b\">Adaptations of Bird W</text>\n  <!-- Header -->\n  <rect x=\"10\" y=\"25\" width=\"60\" height=\"22\" fill=\"#e2e8f0\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"40\" y=\"40\" text-anchor=\"middle\" font-size=\"9\" font-weight=\"bold\" fill=\"#1e293b\">Row</text>\n  <rect x=\"70\" y=\"25\" width=\"160\" height=\"22\" fill=\"#e2e8f0\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"150\" y=\"40\" text-anchor=\"middle\" font-size=\"9\" font-weight=\"bold\" fill=\"#1e293b\">Structural</text>\n  <rect x=\"230\" y=\"25\" width=\"160\" height=\"22\" fill=\"#e2e8f0\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"310\" y=\"40\" text-anchor=\"middle\" font-size=\"9\" font-weight=\"bold\" fill=\"#1e293b\">Behavioural</text>\n  <rect x=\"10\" y=\"47\" width=\"60\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"40\" y=\"62\" text-anchor=\"middle\" font-size=\"10\" fill=\"#1e293b\">(1)</text>\n  <rect x=\"70\" y=\"47\" width=\"160\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"150\" y=\"62\" text-anchor=\"middle\" font-size=\"8\" fill=\"#1e293b\">follow boats + ride currents</text>\n  <rect x=\"230\" y=\"47\" width=\"160\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"310\" y=\"62\" text-anchor=\"middle\" font-size=\"8\" fill=\"#1e293b\">glands + hooked beak</text>\n  <rect x=\"10\" y=\"69\" width=\"60\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"40\" y=\"84\" text-anchor=\"middle\" font-size=\"10\" fill=\"#1e293b\">(2)</text>\n  <rect x=\"70\" y=\"69\" width=\"160\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"150\" y=\"84\" text-anchor=\"middle\" font-size=\"8\" fill=\"#1e293b\">glands only</text>\n  <rect x=\"230\" y=\"69\" width=\"160\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"310\" y=\"84\" text-anchor=\"middle\" font-size=\"8\" fill=\"#1e293b\">beak + follow boats + ride currents</text>\n  <rect x=\"10\" y=\"91\" width=\"60\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"40\" y=\"106\" text-anchor=\"middle\" font-size=\"10\" fill=\"#1e293b\">(3)</text>\n  <rect x=\"70\" y=\"91\" width=\"160\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"150\" y=\"106\" text-anchor=\"middle\" font-size=\"8\" fill=\"#1e293b\">glands + beak + follow boats</text>\n  <rect x=\"230\" y=\"91\" width=\"160\" height=\"22\" fill=\"white\" stroke=\"#94a3b8\" stroke-width=\"1\"/><text x=\"310\" y=\"106\" text-anchor=\"middle\" font-size=\"8\" fill=\"#1e293b\">ride air currents</text>\n  <rect x=\"10\" y=\"113\" width=\"60\" height=\"22\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"2\"/><text x=\"40\" y=\"128\" text-anchor=\"middle\" font-size=\"10\" font-weight=\"bold\" fill=\"#15803d\">(4) ★</text>\n  <rect x=\"70\" y=\"113\" width=\"160\" height=\"22\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"2\"/><text x=\"150\" y=\"128\" text-anchor=\"middle\" font-size=\"8\" fill=\"#15803d\">glands + hooked beak</text>\n  <rect x=\"230\" y=\"113\" width=\"160\" height=\"22\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"2\"/><text x=\"310\" y=\"128\" text-anchor=\"middle\" font-size=\"8\" fill=\"#15803d\">follows boats + rides air currents</text>\n</svg>",
    "placeholder_roles": [],
    "options": [
      "(1) Structural: follow boats + ride currents | Behavioural: glands + beak",
      "(2) Structural: glands only | Behavioural: beak + follow boats + ride currents",
      "(3) Structural: glands + beak + follow boats | Behavioural: ride air currents",
      "(4) Structural: glands + hooked beak | Behavioural: follows boats + rides air currents"
    ],
    "answer": 3,
    "correct_answer": "(4) Structural: glands + hooked beak | Behavioural: follows boats + rides air currents",
    "explanation": "Structural adaptations involve physical body features: waterproof glands and the hooked beak are both body structures. Behavioural adaptations are actions the animal does: following fishing boats and riding air currents to glide are both behaviours that help the bird find food and conserve energy."
  },
  {
    "id": "SCI638",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "In habitat Z, organism S and organism R exist. A scientist introduces organism R (a predator of S) into the habitat. The graph shows population sizes over time. At which point on the graph does the population of S start to drop significantly?",
    "diagram": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 185\" width=\"380\" font-family=\"Arial,sans-serif\">\n  <text x=\"190\" y=\"14\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"bold\" fill=\"#1e293b\">Population Changes in Habitat Z</text>\n  <line x1=\"50\" y1=\"20\" x2=\"50\" y2=\"155\" stroke=\"#64748b\" stroke-width=\"1.5\"/>\n  <line x1=\"50\" y1=\"155\" x2=\"340\" y2=\"155\" stroke=\"#64748b\" stroke-width=\"1.5\"/>\n  <text x=\"195\" y=\"170\" text-anchor=\"middle\" font-size=\"10\" fill=\"#64748b\">Time →</text>\n  <text x=\"18\" y=\"88\" text-anchor=\"middle\" font-size=\"10\" fill=\"#64748b\" transform=\"rotate(-90,18,88)\">Population</text>\n  <!-- Population S line (drops after point A) -->\n  <polyline points=\"50,50 90,48 130,46 160,45 160,45 200,75 240,108 280,132 320,145\" stroke=\"#16a34a\" stroke-width=\"2.5\" fill=\"none\"/>\n  <!-- Population R line (introduced at A, rises) -->\n  <polyline points=\"160,150 200,135 240,110 280,85 320,65\" stroke=\"#ef4444\" stroke-width=\"2\" fill=\"none\" stroke-dasharray=\"6,3\"/>\n  <!-- Point A marker -->\n  <circle cx=\"160\" cy=\"45\" r=\"6\" fill=\"#ef4444\" stroke=\"white\" stroke-width=\"2\"/>\n  <text x=\"155\" y=\"35\" font-size=\"11\" font-weight=\"bold\" fill=\"#dc2626\">A</text>\n  <!-- Point B -->\n  <circle cx=\"200\" cy=\"75\" r=\"5\" fill=\"#3b82f6\" stroke=\"white\" stroke-width=\"1.5\"/>\n  <text x=\"205\" y=\"72\" font-size=\"10\" fill=\"#1d4ed8\">B</text>\n  <!-- Point C -->\n  <circle cx=\"240\" cy=\"108\" r=\"5\" fill=\"#7c3aed\" stroke=\"white\" stroke-width=\"1.5\"/>\n  <text x=\"245\" y=\"105\" font-size=\"10\" fill=\"#7c3aed\">C</text>\n  <!-- Point D -->\n  <circle cx=\"280\" cy=\"132\" r=\"5\" fill=\"#f97316\" stroke=\"white\" stroke-width=\"1.5\"/>\n  <text x=\"285\" y=\"129\" font-size=\"10\" fill=\"#f97316\">D</text>\n  <!-- Legend -->\n  <line x1=\"55\" y1=\"177\" x2=\"80\" y2=\"177\" stroke=\"#16a34a\" stroke-width=\"2.5\"/>\n  <text x=\"83\" y=\"180\" font-size=\"9\" fill=\"#16a34a\">Population S</text>\n  <line x1=\"160\" y1=\"177\" x2=\"185\" y2=\"177\" stroke=\"#ef4444\" stroke-width=\"2\" stroke-dasharray=\"6,3\"/>\n  <text x=\"188\" y=\"180\" font-size=\"9\" fill=\"#ef4444\">Population R (introduced)</text>\n</svg>",
    "placeholder_roles": [],
    "options": [
      "Point A",
      "Point B",
      "Point C",
      "Point D"
    ],
    "answer": 0,
    "correct_answer": "Point A",
    "explanation": "Organism R was introduced at point A. After point A, the predator (R) begins feeding on S, causing S's population to drop. Point A is where the population of S starts its significant decline. The graph shows S's population was stable before A and drops progressively after it."
  },
  {
    "id": "SCI639",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "Four test tubes are set up with carbon dioxide (CO₂) indicator solution (red at normal, yellow when CO₂ increases, purple when CO₂ decreases):\nTube 1: No organisms, sealed\nTube 2: Fish only, sealed, dark\nTube 3: Hydrilla plant only, sealed, in light\nTube 4: Fish + Hydrilla, sealed, in light\nAfter 2 hours, what colours would the indicator be in tubes 1, 2, 3, and 4?",
    "diagram": None,
    "placeholder_roles": [],
    "options": [
      "(1) Red / Yellow / Red / Purple",
      "(2) Red / Yellow / Purple / Yellow",
      "(3) Red / Yellow / Purple / Red",
      "(4) Purple / Yellow / Red / Purple"
    ],
    "answer": 2,
    "correct_answer": "(3) Red / Yellow / Purple / Red",
    "explanation": "Tube 1 (no organisms): CO₂ stays normal → RED. Tube 2 (fish in dark): fish respires, adding CO₂ → YELLOW (more CO₂). Tube 3 (hydrilla in light): plant photosynthesises, using up CO₂ → PURPLE (less CO₂). Tube 4 (fish + hydrilla in light): fish adds CO₂ and plant removes it, roughly balanced → RED (normal)."
  },
  # ===== W2D5-2 (12 questions, skipping image-only Q8 and Q11) =====
  {
    "id": "SCI640",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "A circuit uses three rods X, Y, and Z to connect a battery to a bulb. When rods X and Z are in the circuit, the bulb lights up. When rod Y is in the circuit, the bulb does not light up. The rods are made of copper, plastic, and steel (not in this order). Which row correctly identifies the material for each rod?",
    "diagram": None,
    "placeholder_roles": [],
    "options": [
      "(1) X: plastic | Y: copper | Z: steel",
      "(2) X: copper | Y: plastic | Z: steel",
      "(3) X: steel | Y: copper | Z: plastic",
      "(4) X: plastic | Y: steel | Z: copper"
    ],
    "answer": 1,
    "correct_answer": "(2) X: copper | Y: plastic | Z: steel",
    "explanation": "Rods X and Z allow the bulb to light, so they are electrical conductors — copper and steel are both metals and good conductors. Rod Y does not allow the bulb to light, so it must be an insulator — plastic is an insulator. Therefore X=copper, Y=plastic, Z=steel."
  },
  {
    "id": "SCI641",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "The graph shows the temperature of a substance being heated. Between points P and Q, the temperature remains constant despite continuous heating. What state is the substance in between points P and Q?",
    "diagram": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 185\" width=\"360\" font-family=\"Arial,sans-serif\">\n  <text x=\"180\" y=\"14\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"bold\" fill=\"#1e293b\">Heating Curve of a Substance</text>\n  <line x1=\"50\" y1=\"20\" x2=\"50\" y2=\"155\" stroke=\"#64748b\" stroke-width=\"1.5\"/>\n  <line x1=\"50\" y1=\"155\" x2=\"330\" y2=\"155\" stroke=\"#64748b\" stroke-width=\"1.5\"/>\n  <text x=\"190\" y=\"172\" text-anchor=\"middle\" font-size=\"10\" fill=\"#64748b\">Time →</text>\n  <text x=\"18\" y=\"88\" text-anchor=\"middle\" font-size=\"10\" fill=\"#64748b\" transform=\"rotate(-90,18,88)\">Temperature</text>\n  <!-- Heating curve line -->\n  <polyline points=\"50,148 90,130 120,108 120,108 180,108 180,108 210,75 260,42 300,25\" stroke=\"#ef4444\" stroke-width=\"2.5\" fill=\"none\"/>\n  <!-- Points P and Q -->\n  <circle cx=\"120\" cy=\"108\" r=\"6\" fill=\"#3b82f6\" stroke=\"white\" stroke-width=\"2\"/>\n  <text x=\"112\" y=\"100\" font-size=\"11\" font-weight=\"bold\" fill=\"#1d4ed8\">P</text>\n  <circle cx=\"180\" cy=\"108\" r=\"6\" fill=\"#7c3aed\" stroke=\"white\" stroke-width=\"2\"/>\n  <text x=\"180\" y=\"100\" font-size=\"11\" font-weight=\"bold\" fill=\"#7c3aed\">Q</text>\n  <!-- Flat section annotation -->\n  <rect x=\"120\" y=\"100\" width=\"60\" height=\"16\" fill=\"#fef9c3\" stroke=\"#d97706\" stroke-width=\"1\" rx=\"3\"/>\n  <text x=\"150\" y=\"111\" text-anchor=\"middle\" font-size=\"8\" fill=\"#92400e\">temp constant</text>\n  <!-- State labels -->\n  <text x=\"78\" y=\"145\" text-anchor=\"middle\" font-size=\"9\" fill=\"#0369a1\">solid</text>\n  <text x=\"150\" y=\"125\" text-anchor=\"middle\" font-size=\"9\" fill=\"#16a34a\">melting</text>\n  <text x=\"240\" y=\"70\" text-anchor=\"middle\" font-size=\"9\" fill=\"#dc2626\">liquid</text>\n</svg>",
    "placeholder_roles": [],
    "options": [
      "The substance is a solid at constant temperature.",
      "The substance is a gas with increasing temperature.",
      "The substance is a mixture of solid and liquid (melting).",
      "The substance is a liquid with constant temperature."
    ],
    "answer": 3,
    "correct_answer": "The substance is a liquid with constant temperature.",
    "explanation": "Between P and Q, the substance is melting (changing from solid to liquid). During melting, heat energy is used to break the bonds between particles rather than raising the temperature. The substance exists as a mixture of solid and liquid during this stage, but the temperature stays constant at the melting point — so it appears as a liquid phase forming."
  },
  {
    "id": "SCI642",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "The water cycle diagram shows four processes labelled W, X, Y, and Z. Process X results in water vapour in the air turning into water droplets in clouds. What process is X, and what state change does it involve?",
    "diagram": None,
    "placeholder_roles": [],
    "options": [
      "X is evaporation: liquid → gas",
      "X is transpiration: liquid → gas",
      "X is condensation: gas → liquid",
      "X is precipitation: liquid → solid"
    ],
    "answer": 2,
    "correct_answer": "X is condensation: gas → liquid",
    "explanation": "When water vapour (gas) in the air cools, it turns into tiny water droplets (liquid) forming clouds. This process is called condensation. It is the reverse of evaporation. The state change is from gas to liquid."
  },
  {
    "id": "SCI643",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "A container holds 30 cm³ of plasticine and 260 cm³ of water. After leaving the container open for 2 days, some water evaporates. Which of the following correctly describes what changed?",
    "diagram": None,
    "placeholder_roles": [],
    "options": [
      "The volume of plasticine decreased; the volume of water stayed the same.",
      "The volume of plasticine stayed at 30 cm³; the volume of water decreased below 260 cm³.",
      "Both the plasticine and water volumes decreased.",
      "The volume of water stayed at 260 cm³; only the mass of water changed."
    ],
    "answer": 1,
    "correct_answer": "The volume of plasticine stayed at 30 cm³; the volume of water decreased below 260 cm³.",
    "explanation": "Plasticine is a solid — solids do not evaporate at room temperature. Its volume remains 30 cm³. Water is a liquid and can evaporate when exposed to air. After 2 days, some water molecules escape into the air, so the volume of water in the container decreases below 260 cm³."
  },
  {
    "id": "SCI644",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "{CHARACTER_0} inverts a glass full of air over a container of water. The glass is pushed straight down until the rim is below the water surface. What happens to the water level inside the glass?",
    "diagram": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 340 175\" width=\"340\" font-family=\"Arial,sans-serif\">\n  <text x=\"170\" y=\"14\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"bold\" fill=\"#1e293b\">Inverted Glass in Water</text>\n  <!-- Container of water -->\n  <rect x=\"50\" y=\"100\" width=\"240\" height=\"60\" fill=\"#bfdbfe\" stroke=\"#1d4ed8\" stroke-width=\"2\" rx=\"3\"/>\n  <text x=\"170\" y=\"138\" text-anchor=\"middle\" font-size=\"10\" fill=\"#1e40af\">water</text>\n  <!-- Water level line -->\n  <line x1=\"50\" y1=\"100\" x2=\"290\" y2=\"100\" stroke=\"#1d4ed8\" stroke-width=\"1.5\" stroke-dasharray=\"5,3\"/>\n  <!-- Inverted glass -->\n  <rect x=\"130\" y=\"40\" width=\"80\" height=\"68\" fill=\"#e0f2fe\" stroke=\"#0369a1\" stroke-width=\"2\" rx=\"3\" opacity=\"0.7\"/>\n  <text x=\"170\" y=\"68\" text-anchor=\"middle\" font-size=\"10\" fill=\"#0369a1\">trapped air</text>\n  <text x=\"170\" y=\"82\" text-anchor=\"middle\" font-size=\"9\" fill=\"#0369a1\">(no water inside)</text>\n  <!-- Glass rim at water level -->\n  <line x1=\"130\" y1=\"108\" x2=\"210\" y2=\"108\" stroke=\"#0369a1\" stroke-width=\"2\"/>\n  <text x=\"170\" y=\"120\" text-anchor=\"middle\" font-size=\"9\" fill=\"#1d4ed8\">glass rim (below surface)</text>\n  <!-- Water level inside glass (stays at top) -->\n  <rect x=\"133\" y=\"105\" width=\"74\" height=\"5\" fill=\"#bfdbfe\" stroke=\"none\"/>\n  <!-- Labels -->\n  <text x=\"295\" y=\"78\" font-size=\"9\" fill=\"#0369a1\">Air is trapped</text>\n  <text x=\"295\" y=\"90\" font-size=\"9\" fill=\"#0369a1\">inside glass</text>\n  <text x=\"295\" y=\"102\" font-size=\"9\" fill=\"#0369a1\">→ occupies</text>\n  <text x=\"295\" y=\"114\" font-size=\"9\" fill=\"#0369a1\">the space</text>\n</svg>",
    "placeholder_roles": ["protagonist"],
    "options": [
      "The water level inside the glass stays the same (low), because air is trapped inside the glass and occupies space.",
      "The water level inside the glass rises completely, as water pressure pushes air out.",
      "The water level outside the glass rises, because the glass displaces water.",
      "The water level inside the glass equals the water level outside immediately."
    ],
    "answer": 0,
    "correct_answer": "The water level inside the glass stays the same (low), because air is trapped inside the glass and occupies space.",
    "explanation": "Air is a gas that has mass and occupies space. When the glass is inverted, air is trapped inside and occupies all the space in the glass. Water cannot enter the glass because the trapped air prevents it. The water level inside the glass stays low (near the rim) because the air occupies the space water would otherwise fill."
  },
  {
    "id": "SCI645",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "A full can of juice has a volume of 330 cm³ and a mass of 380 g. {CHARACTER_0} crushes the can flat (deforming it). What happens to the mass and volume of the JUICE inside?",
    "diagram": None,
    "placeholder_roles": ["protagonist"],
    "options": [
      "Mass decreases; volume stays the same.",
      "Mass stays the same; volume decreases.",
      "Mass decreases; volume decreases.",
      "Both mass and volume of the juice remain unchanged."
    ],
    "answer": 3,
    "correct_answer": "Both mass and volume of the juice remain unchanged.",
    "explanation": "Crushing the can changes the shape of the can, not the juice. The juice is a liquid — its mass (amount of matter) and volume do not change when the container is deformed. The can becomes flatter, but the juice still has the same number of molecules, so both mass and volume of the juice stay the same."
  },
  {
    "id": "SCI646",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "Container M is made of a material that is a poor conductor of heat. Container N is made of a material that is a good conductor of heat. {CHARACTER_0} wants to keep soup warm and also store cold ice cream. Which containers should be used?",
    "diagram": None,
    "placeholder_roles": ["protagonist"],
    "options": [
      "Use Container M for both the soup and the ice cream.",
      "Use Container N for the soup; Container M for the ice cream.",
      "Use Container M for the soup; Container N for the ice cream.",
      "Use Container N for both the soup and the ice cream."
    ],
    "answer": 0,
    "correct_answer": "Use Container M for both the soup and the ice cream.",
    "explanation": "Container M is made of a poor heat conductor (insulator). This slows the transfer of heat in both directions: it keeps heat inside the soup (slowing cooling) and keeps heat out of the ice cream (slowing melting). Container N conducts heat well, so it would let heat escape from the soup and enter the ice cream quickly."
  },
  {
    "id": "SCI647",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "{CHARACTER_0} is standing in a room. A ball is placed on the floor directly behind {CHARACTER_0}. {CHARACTER_0} cannot see the ball. Which of the following BEST explains why?",
    "diagram": None,
    "placeholder_roles": ["protagonist"],
    "options": [
      "The ball does not reflect light.",
      "The room does not have enough light.",
      "The light from the ball is too weak to reach {CHARACTER_0}'s eyes.",
      "{CHARACTER_0}'s body is opaque and blocks light from reaching the ball and reflecting back to {CHARACTER_0}'s eyes."
    ],
    "answer": 3,
    "correct_answer": "{CHARACTER_0}'s body is opaque and blocks light from reaching the ball and reflecting back to {CHARACTER_0}'s eyes.",
    "explanation": "Opaque objects do not allow light to pass through them. {CHARACTER_0}'s body is opaque, so it blocks the path of light between the ball and {CHARACTER_0}'s eyes. Light cannot travel through the body to reach the ball behind {CHARACTER_0}, and reflected light from the ball cannot travel through the body to reach {CHARACTER_0}'s eyes."
  },
  {
    "id": "SCI648",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "Four bar magnets P, Q, R, and S are tested. Magnet S can attract pins from a distance of 2 cm. Magnet P can attract the same type of pins from a distance of 5 cm. What can be concluded?",
    "diagram": None,
    "placeholder_roles": [],
    "options": [
      "Magnet P is weaker than magnet S.",
      "Magnet P and S have equal strength.",
      "Magnet S is stronger than magnet R.",
      "Magnet P is stronger than magnet S."
    ],
    "answer": 3,
    "correct_answer": "Magnet P is stronger than magnet S.",
    "explanation": "A stronger magnet can attract objects from a greater distance. Magnet P attracts pins from 5 cm away, while Magnet S only attracts pins from 2 cm away. Since P attracts the same pins from a greater distance, Magnet P is stronger than Magnet S."
  },
  {
    "id": "SCI649",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "Two springs A and B are used in an experiment. Spring B is longer than Spring A when no load is placed on them. When identical loads are added, Spring A stretches more than Spring B. Which row correctly describes the two springs?",
    "diagram": None,
    "placeholder_roles": [],
    "options": [
      "(1) Spring A: longer at rest | Spring B: stiffer",
      "(2) Spring A: shorter at rest | Spring B: stiffer",
      "(3) Spring A: shorter at rest | Spring A: less stiff (stretches more)",
      "(4) Spring B: longer at rest | Spring B: stiffer"
    ],
    "answer": 2,
    "correct_answer": "(3) Spring A: shorter at rest | Spring A: less stiff (stretches more)",
    "explanation": "Spring B is longer at rest (natural length), meaning B has a longer initial length. When the same load is applied, Spring A stretches more — this means A is less stiff (lower spring constant). A stiffer spring stretches less for the same force. So: B is longer at rest, and A is less stiff."
  },
  {
    "id": "SCI650",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "{CHARACTER_0} throws a graduation cap into the air. The cap goes up from point X, reaches its highest point Y, and falls back down. What can be said about the gravitational force on the cap at X compared to at Y?",
    "diagram": None,
    "placeholder_roles": ["protagonist"],
    "options": [
      "The gravitational force is greater at X than at Y.",
      "The gravitational force is greater at Y than at X.",
      "There is no gravitational force at Y (highest point).",
      "The gravitational force is the same at both X and Y."
    ],
    "answer": 3,
    "correct_answer": "The gravitational force is the same at both X and Y.",
    "explanation": "Gravitational force (weight) depends only on the mass of the object and is approximately the same everywhere near Earth's surface. The cap has the same mass at X and Y, so the gravitational force acting on it is the same at both points. Height does not significantly change gravitational force for objects near Earth's surface."
  },
  {
    "id": "SCI651",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "A bar magnet is attached to a wheel. As the wheel turns, the magnet moves past a coil of wire connected to a circuit, generating electricity. The wheel is powered by water falling from a height. What is the complete energy conversion chain?",
    "diagram": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 400 100\" width=\"400\" font-family=\"Arial,sans-serif\">\n  <text x=\"200\" y=\"14\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"bold\" fill=\"#1e293b\">Energy Conversion Chain</text>\n  <!-- Boxes -->\n  <rect x=\"10\" y=\"28\" width=\"80\" height=\"42\" fill=\"#dbeafe\" stroke=\"#3b82f6\" stroke-width=\"2\" rx=\"5\"/>\n  <text x=\"50\" y=\"45\" text-anchor=\"middle\" font-size=\"9\" font-weight=\"bold\" fill=\"#1d4ed8\">Water at</text>\n  <text x=\"50\" y=\"57\" text-anchor=\"middle\" font-size=\"9\" fill=\"#1d4ed8\">height</text>\n  <text x=\"50\" y=\"68\" text-anchor=\"middle\" font-size=\"8\" fill=\"#1d4ed8\">(GPE)</text>\n  <!-- Arrow 1 -->\n  <polygon points=\"90,49 102,44 102,54\" fill=\"#64748b\"/>\n  <line x1=\"90\" y1=\"49\" x2=\"102\" y2=\"49\" stroke=\"#64748b\" stroke-width=\"1.5\"/>\n  <rect x=\"102\" y=\"28\" width=\"80\" height=\"42\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"2\" rx=\"5\"/>\n  <text x=\"142\" y=\"45\" text-anchor=\"middle\" font-size=\"9\" font-weight=\"bold\" fill=\"#15803d\">Wheel</text>\n  <text x=\"142\" y=\"57\" text-anchor=\"middle\" font-size=\"9\" fill=\"#15803d\">spinning</text>\n  <text x=\"142\" y=\"68\" text-anchor=\"middle\" font-size=\"8\" fill=\"#15803d\">(KE)</text>\n  <!-- Arrow 2 -->\n  <polygon points=\"182,49 194,44 194,54\" fill=\"#64748b\"/>\n  <line x1=\"182\" y1=\"49\" x2=\"194\" y2=\"49\" stroke=\"#64748b\" stroke-width=\"1.5\"/>\n  <rect x=\"194\" y=\"28\" width=\"80\" height=\"42\" fill=\"#fef9c3\" stroke=\"#d97706\" stroke-width=\"2\" rx=\"5\"/>\n  <text x=\"234\" y=\"45\" text-anchor=\"middle\" font-size=\"9\" font-weight=\"bold\" fill=\"#92400e\">Generator</text>\n  <text x=\"234\" y=\"57\" text-anchor=\"middle\" font-size=\"9\" fill=\"#92400e\">coil</text>\n  <text x=\"234\" y=\"68\" text-anchor=\"middle\" font-size=\"8\" fill=\"#92400e\">(Electrical)</text>\n  <!-- Arrow 3 -->\n  <polygon points=\"274,49 286,44 286,54\" fill=\"#64748b\"/>\n  <line x1=\"274\" y1=\"49\" x2=\"286\" y2=\"49\" stroke=\"#64748b\" stroke-width=\"1.5\"/>\n  <rect x=\"286\" y=\"28\" width=\"104\" height=\"42\" fill=\"#fee2e2\" stroke=\"#ef4444\" stroke-width=\"2\" rx=\"5\"/>\n  <text x=\"338\" y=\"45\" text-anchor=\"middle\" font-size=\"9\" font-weight=\"bold\" fill=\"#dc2626\">Loads</text>\n  <text x=\"338\" y=\"57\" text-anchor=\"middle\" font-size=\"9\" fill=\"#dc2626\">(light/heat)</text>\n  <text x=\"338\" y=\"68\" text-anchor=\"middle\" font-size=\"8\" fill=\"#dc2626\">(KE/Light)</text>\n</svg>",
    "placeholder_roles": [],
    "options": [
      "Kinetic energy → Gravitational PE → Electrical energy → Kinetic energy",
      "Electrical energy → Gravitational PE → Kinetic energy → Light energy",
      "Gravitational PE → Electrical energy → Light + Heat energy",
      "Gravitational PE → Kinetic energy → Electrical energy → Kinetic/Light energy"
    ],
    "answer": 3,
    "correct_answer": "Gravitational PE → Kinetic energy → Electrical energy → Kinetic/Light energy",
    "explanation": "Water at height has gravitational potential energy (GPE). As it falls, this converts to kinetic energy (KE) which spins the wheel. The spinning magnet near the coil generates electrical energy. This electrical energy then powers loads, converting to kinetic energy (motors) or light/heat energy (bulbs). The full chain: GPE → KE → Electrical → KE/Light."
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

start_id = 627
end_id = start_id + len(new_questions) - 1
print(f"Done! Added {len(new_questions)} questions. Total now: {len(data)}")
print(f"New IDs: SCI{start_id} to SCI{end_id}")
