import json

with open('data/questions-science-p6.json', 'r') as f:
    data = json.load(f)

idx = {q['id']: i for i, q in enumerate(data)}

def fix(qid, template=None, diagram=None, roles=None):
    i = idx[qid]
    if template is not None: data[i]['template'] = template
    if diagram is not None:  data[i]['diagram']  = diagram
    if roles   is not None:  data[i]['placeholder_roles'] = roles

# ── SCI624  diagram only ─────────────────────────────────────────────────────
fix('SCI624', diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 155" width="340" font-family="Arial,sans-serif">
  <text x="170" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Seeing Through a Transparent Glass Box</text>
  <!-- Room outline -->
  <rect x="10" y="30" width="320" height="110" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" rx="4"/>
  <!-- Glass box -->
  <rect x="140" y="60" width="70" height="60" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="2" rx="3" opacity="0.7"/>
  <text x="175" y="95" text-anchor="middle" font-size="8" fill="#0369a1">glass box</text>
  <!-- Cake inside -->
  <rect x="153" y="80" width="44" height="30" fill="#fca5a5" stroke="#ef4444" stroke-width="1" rx="2"/>
  <text x="175" y="100" text-anchor="middle" font-size="7" fill="#dc2626">cake 🎂</text>
  <!-- Person -->
  <circle cx="45" cy="75" r="12" fill="#fde68a" stroke="#d97706" stroke-width="1.5"/>
  <text x="45" y="79" text-anchor="middle" font-size="8" fill="#92400e">👁</text>
  <rect x="38" y="87" width="14" height="25" fill="#93c5fd" stroke="#3b82f6" stroke-width="1"/>
  <text x="45" y="128" text-anchor="middle" font-size="8" fill="#64748b">observer</text>
  <!-- Light rays -->
  <line x1="153" y1="90" x2="57" y2="78" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="153" y1="100" x2="57" y2="82" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="100" y="68" font-size="8" fill="#d97706">light passes through glass</text>
  <!-- Light source -->
  <circle cx="295" cy="50" r="12" fill="#fef9c3" stroke="#d97706" stroke-width="2"/>
  <text x="295" y="54" text-anchor="middle" font-size="8" fill="#92400e">💡</text>
  <text x="295" y="38" text-anchor="middle" font-size="8" fill="#64748b">light source</text>
</svg>""")

# ── SCI625  char only ────────────────────────────────────────────────────────
fix('SCI625',
    template="{CHARACTER_0} studies a graph showing the temperature of ice being heated over time. The temperature stays flat (does not rise) between the 8th and 16th minutes, even though heat continues to be applied. What happened to the ice between the 8th and 16th minutes?",
    roles=['protagonist'])

# ── SCI626  both ─────────────────────────────────────────────────────────────
fix('SCI626',
    template="{CHARACTER_0} observes a toy truck placed at the top of a slope. When released, the truck rolls down the slope and onto a flat surface. What energy conversion takes place as the truck moves from the top to the bottom of the slope?",
    diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 145" width="340" font-family="Arial,sans-serif">
  <text x="170" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Toy Truck Rolling Down a Slope</text>
  <!-- Slope -->
  <polygon points="30,120 220,120 220,50" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2"/>
  <!-- Flat surface -->
  <line x1="220" y1="120" x2="320" y2="120" stroke="#64748b" stroke-width="2"/>
  <!-- Truck at top -->
  <rect x="200" y="38" width="30" height="16" fill="#93c5fd" stroke="#3b82f6" stroke-width="1.5" rx="2"/>
  <circle cx="205" cy="54" r="4" fill="#1e293b"/>
  <circle cx="225" cy="54" r="4" fill="#1e293b"/>
  <text x="215" y="30" text-anchor="middle" font-size="8" fill="#1d4ed8">TOP (stored PE)</text>
  <!-- Arrow down slope -->
  <line x1="215" y1="54" x2="250" y2="115" stroke="#15803d" stroke-width="2" stroke-dasharray="5,3"/>
  <!-- Truck at bottom -->
  <rect x="248" y="104" width="30" height="16" fill="#86efac" stroke="#16a34a" stroke-width="1.5" rx="2"/>
  <circle cx="253" cy="120" r="4" fill="#1e293b"/>
  <circle cx="273" cy="120" r="4" fill="#1e293b"/>
  <text x="265" y="100" text-anchor="middle" font-size="8" fill="#15803d">BOTTOM (KE)</text>
  <!-- Energy label -->
  <text x="100" y="100" text-anchor="middle" font-size="9" fill="#64748b">height gives</text>
  <text x="100" y="113" text-anchor="middle" font-size="9" fill="#64748b">potential energy</text>
  <!-- Arrow for energy conversion -->
  <rect x="25" y="130" width="295" height="12" fill="none"/>
  <text x="170" y="141" text-anchor="middle" font-size="9" fill="#64748b">Gravitational PE → Kinetic Energy</text>
</svg>""",
    roles=['protagonist'])

# ── SCI627  diagram only ─────────────────────────────────────────────────────
fix('SCI627', diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 148" width="340" font-family="Arial,sans-serif">
  <text x="170" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Characteristics of Animal K</text>
  <rect x="10" y="25" width="200" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="110" y="40" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Characteristic</text>
  <rect x="210" y="25" width="120" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="270" y="40" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Animal K</text>
  <rect x="10" y="47" width="200" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="110" y="62" text-anchor="middle" font-size="9" fill="#1e293b">Body temperature</text>
  <rect x="210" y="47" width="120" height="22" fill="#dcfce7" stroke="#16a34a" stroke-width="1"/>
  <text x="270" y="62" text-anchor="middle" font-size="9" fill="#15803d">Warm-blooded ✓</text>
  <rect x="10" y="69" width="200" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="110" y="84" text-anchor="middle" font-size="9" fill="#1e293b">Body covering</text>
  <rect x="210" y="69" width="120" height="22" fill="#dcfce7" stroke="#16a34a" stroke-width="1"/>
  <text x="270" y="84" text-anchor="middle" font-size="9" fill="#15803d">Hair / fur ✓</text>
  <rect x="10" y="91" width="200" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="110" y="106" text-anchor="middle" font-size="9" fill="#1e293b">Reproduction</text>
  <rect x="210" y="91" width="120" height="22" fill="#dcfce7" stroke="#16a34a" stroke-width="1"/>
  <text x="270" y="106" text-anchor="middle" font-size="9" fill="#15803d">Gives birth to live young ✓</text>
  <rect x="10" y="113" width="200" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="110" y="128" text-anchor="middle" font-size="9" fill="#1e293b">Feeding young</text>
  <rect x="210" y="113" width="120" height="22" fill="#dcfce7" stroke="#16a34a" stroke-width="1"/>
  <text x="270" y="128" text-anchor="middle" font-size="9" fill="#15803d">Feeds young with milk ✓</text>
</svg>""")

# ── SCI628  both ─────────────────────────────────────────────────────────────
fix('SCI628',
    template="{CHARACTER_0} observes an experiment: a ring of bark (the food-carrying tubes) is removed from a tree's stem. After 2 weeks, the following observations are made:\nA: The stem above the ring is swollen.\nB: The leaves start to wilt.\nC: The stem below the ring becomes thinner.\nD: The fruits above the ring grew larger.\nWhich of the following observations are correct?",
    diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 165" width="280" font-family="Arial,sans-serif">
  <text x="140" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Bark Ring Removed from Tree</text>
  <!-- Tree trunk -->
  <rect x="110" y="25" width="60" height="130" fill="#a16207" rx="5"/>
  <!-- Ring removed area -->
  <rect x="108" y="85" width="64" height="14" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
  <text x="140" y="96" text-anchor="middle" font-size="8" fill="#92400e">bark ring removed</text>
  <!-- Leaves (top) -->
  <ellipse cx="140" cy="20" rx="35" ry="14" fill="#86efac" stroke="#16a34a" stroke-width="1.5"/>
  <text x="140" y="24" text-anchor="middle" font-size="8" fill="#15803d">leaves (wilt)</text>
  <!-- Swollen area above ring -->
  <ellipse cx="140" cy="70" rx="40" ry="12" fill="#fde68a" stroke="#d97706" stroke-width="1.5" opacity="0.8"/>
  <text x="200" y="72" font-size="8" fill="#92400e">swollen (food</text>
  <text x="200" y="82" font-size="8" fill="#92400e">blocked here)</text>
  <!-- Below ring (thinner) -->
  <text x="5" y="130" font-size="8" fill="#64748b">thinner</text>
  <text x="5" y="142" font-size="8" fill="#64748b">below ring</text>
  <!-- Root -->
  <path d="M 120 155 L 110 165 M 140 155 L 140 165 M 160 155 L 170 165" stroke="#78350f" stroke-width="2"/>
</svg>""",
    roles=['protagonist'])

# ── SCI629  char only ────────────────────────────────────────────────────────
fix('SCI629',
    template="{CHARACTER_0} studies a diagram of a plant with parts labelled W, X, Y, and Z. Which row correctly matches part Z (the roots) to its function?",
    roles=['protagonist'])

# ── SCI630  both ─────────────────────────────────────────────────────────────
fix('SCI630',
    template="{CHARACTER_0} studies a diagram of the human digestive system with parts labelled. Part Y is the large intestine. Which of the following correctly describes the function of the large intestine (Y)?",
    diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 160" width="300" font-family="Arial,sans-serif">
  <text x="150" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Human Digestive System</text>
  <!-- Oesophagus -->
  <rect x="135" y="28" width="30" height="25" fill="#fde68a" stroke="#d97706" stroke-width="1.5" rx="3"/>
  <text x="150" y="44" text-anchor="middle" font-size="8" fill="#92400e">oesophagus</text>
  <!-- Stomach -->
  <ellipse cx="150" cy="75" rx="28" ry="20" fill="#fde68a" stroke="#d97706" stroke-width="1.5"/>
  <text x="150" y="79" text-anchor="middle" font-size="8" fill="#92400e">stomach</text>
  <!-- Small intestine -->
  <path d="M 155 92 Q 190 110 180 130 Q 170 150 150 148 Q 130 146 120 125 Q 110 105 130 100 Q 145 96 155 92" fill="none" stroke="#3b82f6" stroke-width="3"/>
  <text x="195" y="128" font-size="7" fill="#1d4ed8">small intestine</text>
  <!-- Large intestine (Y) -->
  <path d="M 120 125 Q 85 120 80 100 Q 78 80 85 65 Q 92 50 108 53" fill="none" stroke="#ef4444" stroke-width="3"/>
  <path d="M 108 53 Q 148 50 175 55 Q 195 60 200 80 Q 200 108 180 130" fill="none" stroke="#ef4444" stroke-width="3"/>
  <text x="55" y="90" font-size="8" fill="#dc2626">Y = large</text>
  <text x="55" y="102" font-size="8" fill="#dc2626">intestine</text>
  <!-- Arrow to Y -->
  <line x1="80" y1="100" x2="60" y2="100" stroke="#dc2626" stroke-width="1" stroke-dasharray="3,2"/>
</svg>""",
    roles=['protagonist'])

# ── SCI631  both ─────────────────────────────────────────────────────────────
fix('SCI631',
    template="{CHARACTER_0} uses two similar plants A and B in an experiment. Plant A has its top cut off and discarded. Plant B has its bottom cut off and discarded. Both cut plants are placed in water. After 2 weeks, only one plant grew into a new plant. Which observation best explains the result?",
    diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 158" width="340" font-family="Arial,sans-serif">
  <text x="170" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Vegetative Propagation Experiment</text>
  <!-- Plant A -->
  <rect x="30" y="30" width="130" height="115" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5" rx="5"/>
  <text x="95" y="48" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">Plant A</text>
  <text x="95" y="62" text-anchor="middle" font-size="8" fill="#dc2626">top cut off (stem+leaves)</text>
  <!-- Roots only icon -->
  <path d="M 80 85 L 75 100 M 90 85 L 90 105 M 100 85 L 105 100" stroke="#92400e" stroke-width="2"/>
  <text x="95" y="120" text-anchor="middle" font-size="9" fill="#64748b">only bottom</text>
  <text x="95" y="132" text-anchor="middle" font-size="9" fill="#64748b">(roots) remains</text>
  <!-- Plant B -->
  <rect x="180" y="30" width="130" height="115" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5" rx="5"/>
  <text x="245" y="48" text-anchor="middle" font-size="10" font-weight="bold" fill="#dc2626">Plant B</text>
  <text x="245" y="62" text-anchor="middle" font-size="8" fill="#dc2626">bottom cut off (roots)</text>
  <!-- Stem+leaves only icon -->
  <line x1="245" y1="120" x2="245" y2="82" stroke="#16a34a" stroke-width="2.5"/>
  <ellipse cx="235" cy="78" rx="9" ry="6" fill="#86efac" stroke="#16a34a" stroke-width="1"/>
  <ellipse cx="255" cy="75" rx="9" ry="6" fill="#86efac" stroke="#16a34a" stroke-width="1"/>
  <text x="245" y="120" text-anchor="middle" font-size="9" fill="#64748b">only top</text>
  <text x="245" y="132" text-anchor="middle" font-size="9" fill="#64748b">(stem+leaves)</text>
</svg>""",
    roles=['protagonist'])

# ── SCI632  both ─────────────────────────────────────────────────────────────
fix('SCI632',
    template="{CHARACTER_0} studies a diagram of the human circulatory system with blood vessels labelled A to G. Which blood vessels carry blood that is rich in oxygen?\nA: Aorta (carries blood from heart to body)\nB: Vena cava (returns blood from body to heart)\nC: Pulmonary artery (heart to lungs)\nD: Pulmonary vein (lungs to heart)\nG: Vessels to upper body",
    diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 160" width="330" font-family="Arial,sans-serif">
  <text x="165" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Circulatory System — Oxygenated vs Deoxygenated</text>
  <!-- Heart -->
  <ellipse cx="165" cy="90" rx="30" ry="25" fill="#fca5a5" stroke="#ef4444" stroke-width="2"/>
  <text x="165" y="94" text-anchor="middle" font-size="9" font-weight="bold" fill="#dc2626">Heart</text>
  <!-- A: Aorta (oxygenated, to body) -->
  <line x1="165" y1="65" x2="165" y2="30" stroke="#dc2626" stroke-width="3"/>
  <text x="178" y="45" font-size="8" fill="#dc2626">A: Aorta ✓</text>
  <!-- B: Vena Cava (deoxygenated, from body) -->
  <line x1="148" y1="65" x2="100" y2="30" stroke="#3b82f6" stroke-width="3"/>
  <text x="65" y="28" font-size="8" fill="#1d4ed8">B: Vena cava</text>
  <!-- C: Pulm. artery (deoxygenated, to lungs) -->
  <line x1="135" y1="90" x2="75" y2="90" stroke="#3b82f6" stroke-width="3"/>
  <text x="30" y="88" font-size="8" fill="#1d4ed8">C: Pulm.</text>
  <text x="30" y="98" font-size="8" fill="#1d4ed8">artery</text>
  <!-- D: Pulm. vein (oxygenated, from lungs) -->
  <line x1="195" y1="90" x2="255" y2="90" stroke="#dc2626" stroke-width="3"/>
  <text x="258" y="88" font-size="8" fill="#dc2626">D: Pulm.</text>
  <text x="258" y="98" font-size="8" fill="#dc2626">vein ✓</text>
  <!-- Lungs -->
  <ellipse cx="55" cy="90" rx="18" ry="14" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="55" y="94" text-anchor="middle" font-size="8" fill="#1d4ed8">Lungs</text>
  <ellipse cx="275" cy="90" rx="18" ry="14" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="275" y="94" text-anchor="middle" font-size="8" fill="#1d4ed8">Lungs</text>
  <!-- Legend -->
  <rect x="90" y="145" width="12" height="8" fill="#dc2626"/>
  <text x="106" y="153" font-size="8" fill="#1e293b">Oxygenated</text>
  <rect x="185" y="145" width="12" height="8" fill="#3b82f6"/>
  <text x="201" y="153" font-size="8" fill="#1e293b">Deoxygenated</text>
</svg>""",
    roles=['protagonist'])

# ── SCI633  both ─────────────────────────────────────────────────────────────
fix('SCI633',
    template="{CHARACTER_0} compares the life cycles of organisms P and Q:\n• Both P and Q have 3 life stages\n• Both P and Q have young that look like the adults\n• Organism P completes its life cycle faster than Q\nWhich of the following statements is/are correct?\nA: Both undergo incomplete metamorphosis.\nB: Both are insects.\nC: Organism P completes its life cycle faster.\nD: The young of both can fly.",
    diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 370 145" width="370" font-family="Arial,sans-serif">
  <text x="185" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Life Cycles of P and Q Compared</text>
  <rect x="10" y="23" width="60" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="40" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Feature</text>
  <rect x="70" y="23" width="140" height="22" fill="#dbeafe" stroke="#3b82f6" stroke-width="1"/>
  <text x="140" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#1d4ed8">Organism P</text>
  <rect x="210" y="23" width="150" height="22" fill="#fde68a" stroke="#d97706" stroke-width="1"/>
  <text x="285" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#92400e">Organism Q</text>
  <rect x="10" y="45" width="60" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="40" y="60" text-anchor="middle" font-size="9" fill="#1e293b">Life stages</text>
  <rect x="70" y="45" width="140" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="140" y="60" text-anchor="middle" font-size="9" fill="#1e293b">3 stages</text>
  <rect x="210" y="45" width="150" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="285" y="60" text-anchor="middle" font-size="9" fill="#1e293b">3 stages</text>
  <rect x="10" y="67" width="60" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="40" y="82" text-anchor="middle" font-size="8" fill="#1e293b">Young looks</text>
  <rect x="70" y="67" width="140" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="140" y="82" text-anchor="middle" font-size="9" fill="#1e293b">Like adult ✓</text>
  <rect x="210" y="67" width="150" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="285" y="82" text-anchor="middle" font-size="9" fill="#1e293b">Like adult ✓</text>
  <rect x="10" y="89" width="60" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="40" y="104" text-anchor="middle" font-size="9" fill="#1e293b">Speed</text>
  <rect x="70" y="89" width="140" height="22" fill="#dcfce7" stroke="#16a34a" stroke-width="1"/>
  <text x="140" y="104" text-anchor="middle" font-size="9" fill="#15803d">Faster ✓</text>
  <rect x="210" y="89" width="150" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="285" y="104" text-anchor="middle" font-size="9" fill="#1e293b">Slower</text>
  <rect x="10" y="111" width="60" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="40" y="126" text-anchor="middle" font-size="8" fill="#1e293b">Metamorphosis</text>
  <rect x="70" y="111" width="140" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="140" y="126" text-anchor="middle" font-size="9" fill="#1e293b">Incomplete</text>
  <rect x="210" y="111" width="150" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="285" y="126" text-anchor="middle" font-size="9" fill="#1e293b">Incomplete</text>
</svg>""",
    roles=['protagonist'])

with open('data/questions-science-p6.json', 'w') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

batch = ['SCI624','SCI625','SCI626','SCI627','SCI628','SCI629','SCI630','SCI631','SCI632','SCI633']
for q in data:
    if q['id'] in batch:
        ok_d = q['diagram'] is not None
        ok_c = bool(q.get('placeholder_roles'))
        print(f"{q['id']}: diagram={'OK' if ok_d else 'MISSING'} | char={'OK' if ok_c else 'MISSING'}")
print("Batch 8 done!")
