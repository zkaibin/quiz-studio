import json

with open('data/questions-science-p6.json', 'r') as f:
    data = json.load(f)

idx = {q['id']: i for i, q in enumerate(data)}

def fix(qid, template=None, diagram=None, roles=None):
    i = idx[qid]
    if template is not None: data[i]['template'] = template
    if diagram is not None:  data[i]['diagram']  = diagram
    if roles   is not None:  data[i]['placeholder_roles'] = roles

# ── SCI600  diagram only ─────────────────────────────────────────────────────
fix('SCI600', diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 155" width="340" font-family="Arial,sans-serif">
  <text x="170" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Straw on a String — Jet Propulsion</text>
  <!-- String -->
  <line x1="20" y1="60" x2="320" y2="60" stroke="#92400e" stroke-width="2.5"/>
  <text x="15" y="57" font-size="9" fill="#64748b">wall</text>
  <text x="300" y="57" font-size="9" fill="#64748b">wall</text>
  <!-- Straw -->
  <rect x="130" y="50" width="80" height="20" fill="#93c5fd" stroke="#3b82f6" stroke-width="1.5" rx="4"/>
  <text x="170" y="64" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e40af">straw</text>
  <!-- Balloon -->
  <ellipse cx="200" cy="60" rx="28" ry="18" fill="#fca5a5" stroke="#ef4444" stroke-width="1.5"/>
  <text x="200" y="64" text-anchor="middle" font-size="8" fill="#7f1d1d">balloon</text>
  <!-- Air jet arrow -->
  <line x1="130" y1="60" x2="95" y2="60" stroke="#1d4ed8" stroke-width="2" marker-end="url(#a)"/>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#1d4ed8"/></marker></defs>
  <text x="110" y="50" text-anchor="middle" font-size="8" fill="#1d4ed8">air jet</text>
  <!-- Movement arrow -->
  <line x1="213" y1="60" x2="255" y2="60" stroke="#15803d" stroke-width="2.5" marker-end="url(#b)"/>
  <defs><marker id="b" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#15803d"/></marker></defs>
  <text x="240" y="50" font-size="8" fill="#15803d">moves →</text>
  <!-- Explanation box -->
  <rect x="20" y="100" width="300" height="40" fill="#f1f5f9" stroke="#64748b" stroke-width="1" rx="4"/>
  <text x="170" y="116" text-anchor="middle" font-size="9" fill="#1e293b">Air released from balloon → pushes straw forward</text>
  <text x="170" y="131" text-anchor="middle" font-size="9" fill="#64748b">Which force / principle explains this?</text>
</svg>""")

# ── SCI603  diagram only ─────────────────────────────────────────────────────
fix('SCI603', diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 140" width="360" font-family="Arial,sans-serif">
  <text x="180" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Organisms Under Study</text>
  <rect x="10" y="23" width="40" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Label</text>
  <rect x="50" y="23" width="120" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="110" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Organism</text>
  <rect x="170" y="23" width="180" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="260" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Make own food?</text>
  <rect x="10" y="45" width="40" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="60" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">P</text>
  <rect x="50" y="45" width="120" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="110" y="60" text-anchor="middle" font-size="10" fill="#1e293b">Mushroom</text>
  <rect x="170" y="45" width="180" height="22" fill="#fee2e2" stroke="#ef4444" stroke-width="1"/>
  <text x="260" y="60" text-anchor="middle" font-size="10" fill="#dc2626">No (decomposes dead matter)</text>
  <rect x="10" y="67" width="40" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="82" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">Q</text>
  <rect x="50" y="67" width="120" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="110" y="82" text-anchor="middle" font-size="10" fill="#1e293b">Fern</text>
  <rect x="170" y="67" width="180" height="22" fill="#dcfce7" stroke="#16a34a" stroke-width="1"/>
  <text x="260" y="82" text-anchor="middle" font-size="10" fill="#15803d">Yes (photosynthesis) ✓</text>
  <rect x="10" y="89" width="40" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="104" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">R</text>
  <rect x="50" y="89" width="120" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="110" y="104" text-anchor="middle" font-size="10" fill="#1e293b">Rabbit</text>
  <rect x="170" y="89" width="180" height="22" fill="#fee2e2" stroke="#ef4444" stroke-width="1"/>
  <text x="260" y="104" text-anchor="middle" font-size="10" fill="#dc2626">No (eats plants)</text>
  <rect x="10" y="111" width="40" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="126" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">S</text>
  <rect x="50" y="111" width="120" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="110" y="126" text-anchor="middle" font-size="10" fill="#1e293b">Tapeworm</text>
  <rect x="170" y="111" width="180" height="22" fill="#fee2e2" stroke="#ef4444" stroke-width="1"/>
  <text x="260" y="126" text-anchor="middle" font-size="10" fill="#dc2626">No (parasite)</text>
</svg>""")

# ── SCI604  char only ────────────────────────────────────────────────────────
fix('SCI604',
    template="{CHARACTER_0} studies a table showing characteristics of different animal groups. Which characteristic is UNIQUE to insects?",
    roles=['protagonist'])

# ── SCI605  both ─────────────────────────────────────────────────────────────
fix('SCI605',
    template="{CHARACTER_0} studies statements made by three students about human reproduction. Which students made CORRECT statements?\nBixia: 'The sperm and egg join together during fertilisation.'\nChitra: 'The fertilised egg develops into a baby in the uterus.'\nJoey: 'The egg is produced in the uterus.'",
    diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 370 135" width="370" font-family="Arial,sans-serif">
  <text x="185" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Student Statements About Human Reproduction</text>
  <rect x="10" y="23" width="65" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="42" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Student</text>
  <rect x="75" y="23" width="285" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="217" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Statement</text>
  <rect x="10" y="45" width="65" height="26" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="42" y="62" text-anchor="middle" font-size="10" font-weight="bold" fill="#1d4ed8">Bixia</text>
  <rect x="75" y="45" width="285" height="26" fill="#dcfce7" stroke="#16a34a" stroke-width="1"/>
  <text x="217" y="62" text-anchor="middle" font-size="9" fill="#15803d">Sperm and egg join during fertilisation. ✓</text>
  <rect x="10" y="71" width="65" height="26" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="42" y="88" text-anchor="middle" font-size="10" font-weight="bold" fill="#1d4ed8">Chitra</text>
  <rect x="75" y="71" width="285" height="26" fill="#dcfce7" stroke="#16a34a" stroke-width="1"/>
  <text x="217" y="88" text-anchor="middle" font-size="9" fill="#15803d">Fertilised egg develops in the uterus. ✓</text>
  <rect x="10" y="97" width="65" height="26" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="42" y="114" text-anchor="middle" font-size="10" font-weight="bold" fill="#dc2626">Joey</text>
  <rect x="75" y="97" width="285" height="26" fill="#fee2e2" stroke="#ef4444" stroke-width="1"/>
  <text x="217" y="114" text-anchor="middle" font-size="9" fill="#dc2626">Egg is produced in the uterus. ✗ (ovaries)</text>
</svg>""",
    roles=['protagonist'])

# ── SCI606  char only ────────────────────────────────────────────────────────
fix('SCI606',
    template="{CHARACTER_0} studies a diagram showing three seeds with symbols indicating their dispersal method:\n★ (star shape) = wind dispersal\n● (circle) = splitting/explosive dispersal\n■ (square) = water dispersal\nWhich row correctly identifies the dispersal method for each seed?",
    roles=['protagonist'])

# ── SCI607  diagram only ─────────────────────────────────────────────────────
fix('SCI607', diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 145" width="380" font-family="Arial,sans-serif">
  <text x="190" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Germination Experiments (identical seeds)</text>
  <rect x="10" y="23" width="40" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Setup</text>
  <rect x="50" y="23" width="80" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="90" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Water</text>
  <rect x="130" y="23" width="100" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="180" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Light</text>
  <rect x="230" y="23" width="140" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="300" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Germinated?</text>
  <rect x="10" y="45" width="40" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="60" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">A</text>
  <rect x="50" y="45" width="80" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="90" y="60" text-anchor="middle" font-size="10" fill="#1e293b">✓ with water</text>
  <rect x="130" y="45" width="100" height="22" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1"/>
  <text x="180" y="60" text-anchor="middle" font-size="10" fill="#64748b">Dark (no light)</text>
  <rect x="230" y="45" width="140" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="300" y="60" text-anchor="middle" font-size="9" fill="#1e293b">?</text>
  <rect x="10" y="67" width="40" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="82" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">B</text>
  <rect x="50" y="67" width="80" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="90" y="82" text-anchor="middle" font-size="10" fill="#dc2626">✗ no water</text>
  <rect x="130" y="67" width="100" height="22" fill="#fef9c3" stroke="#d97706" stroke-width="1"/>
  <text x="180" y="82" text-anchor="middle" font-size="10" fill="#d97706">Light ☀</text>
  <rect x="230" y="67" width="140" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="300" y="82" text-anchor="middle" font-size="9" fill="#1e293b">?</text>
  <rect x="10" y="89" width="40" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="104" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">C</text>
  <rect x="50" y="89" width="80" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="90" y="104" text-anchor="middle" font-size="10" fill="#dc2626">✗ no water</text>
  <rect x="130" y="89" width="100" height="22" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1"/>
  <text x="180" y="104" text-anchor="middle" font-size="10" fill="#64748b">Dark (no light)</text>
  <rect x="230" y="89" width="140" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="300" y="104" text-anchor="middle" font-size="9" fill="#1e293b">?</text>
  <rect x="10" y="111" width="40" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="126" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">D</text>
  <rect x="50" y="111" width="80" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="90" y="126" text-anchor="middle" font-size="10" fill="#1e293b">✓ with water</text>
  <rect x="130" y="111" width="100" height="22" fill="#fef9c3" stroke="#d97706" stroke-width="1"/>
  <text x="180" y="126" text-anchor="middle" font-size="10" fill="#d97706">Light ☀</text>
  <rect x="230" y="111" width="140" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="300" y="126" text-anchor="middle" font-size="9" fill="#1e293b">?</text>
</svg>""")

# ── SCI608  char only ────────────────────────────────────────────────────────
fix('SCI608',
    template="{CHARACTER_0} studies a diagram of the human heart with blood vessels labelled T, S, U, V. Blood returning from the body enters through vessels U and V, is pumped to the lungs through vessel T, returns via vessel S, and is then pumped to the body. Which blood vessels carry oxygenated blood?",
    roles=['protagonist'])

# ── SCI610  both ─────────────────────────────────────────────────────────────
fix('SCI610',
    template="{CHARACTER_0} studies the functions of the human skeleton. Which of the following are functions of the human skeleton?\nA: Gives the body shape and support\nB: Protects internal organs\nC: Produces red and white blood cells\nD: Allows movement together with muscles",
    diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 145" width="360" font-family="Arial,sans-serif">
  <text x="180" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Functions of the Human Skeleton</text>
  <rect x="10" y="23" width="40" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Opt.</text>
  <rect x="50" y="23" width="300" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="200" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Proposed Function</text>
  <rect x="10" y="45" width="40" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="60" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">A</text>
  <rect x="50" y="45" width="300" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="200" y="60" text-anchor="middle" font-size="9" fill="#1e293b">Gives the body shape and support</text>
  <rect x="10" y="67" width="40" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="82" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">B</text>
  <rect x="50" y="67" width="300" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="200" y="82" text-anchor="middle" font-size="9" fill="#1e293b">Protects internal organs (e.g. skull protects brain)</text>
  <rect x="10" y="89" width="40" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="104" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">C</text>
  <rect x="50" y="89" width="300" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="200" y="104" text-anchor="middle" font-size="9" fill="#1e293b">Produces red and white blood cells (bone marrow)</text>
  <rect x="10" y="111" width="40" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="126" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">D</text>
  <rect x="50" y="111" width="300" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="200" y="126" text-anchor="middle" font-size="9" fill="#1e293b">Allows movement together with muscles</text>
</svg>""",
    roles=['protagonist'])

# ── SCI611  char only ────────────────────────────────────────────────────────
fix('SCI611',
    template="{CHARACTER_0} observes that a sloped sheet is placed over a hillside. Which of the following BEST explains the purpose of the sloped sheet?",
    roles=['protagonist'])

# ── SCI612  both ─────────────────────────────────────────────────────────────
fix('SCI612',
    template="{CHARACTER_0} studies the food web below:\nGrass (M) → Rabbits → Foxes\nGrass (M) → Mice → Snakes → Eagles\nInsects → Frogs → Snakes\nWhich organism(s) in this food web are producers?",
    diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 155" width="380" font-family="Arial,sans-serif">
  <text x="190" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Food Web</text>
  <!-- Producer -->
  <rect x="150" y="120" width="80" height="26" fill="#86efac" stroke="#16a34a" stroke-width="2" rx="4"/>
  <text x="190" y="137" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">Grass (M)</text>
  <!-- Rabbits -->
  <rect x="40" y="78" width="70" height="24" fill="#fde68a" stroke="#d97706" stroke-width="1.5" rx="3"/>
  <text x="75" y="94" text-anchor="middle" font-size="9" fill="#92400e">Rabbits</text>
  <!-- Mice -->
  <rect x="270" y="78" width="70" height="24" fill="#fde68a" stroke="#d97706" stroke-width="1.5" rx="3"/>
  <text x="305" y="94" text-anchor="middle" font-size="9" fill="#92400e">Mice</text>
  <!-- Foxes -->
  <rect x="20" y="40" width="70" height="24" fill="#fca5a5" stroke="#ef4444" stroke-width="1.5" rx="3"/>
  <text x="55" y="56" text-anchor="middle" font-size="9" fill="#dc2626">Foxes</text>
  <!-- Snakes -->
  <rect x="250" y="40" width="70" height="24" fill="#fca5a5" stroke="#ef4444" stroke-width="1.5" rx="3"/>
  <text x="285" y="56" text-anchor="middle" font-size="9" fill="#dc2626">Snakes</text>
  <!-- Eagles -->
  <rect x="155" y="18" width="70" height="24" fill="#c4b5fd" stroke="#7c3aed" stroke-width="1.5" rx="3"/>
  <text x="190" y="34" text-anchor="middle" font-size="9" fill="#5b21b6">Eagles</text>
  <!-- Insects -->
  <rect x="150" y="78" width="70" height="24" fill="#fde68a" stroke="#d97706" stroke-width="1.5" rx="3"/>
  <text x="185" y="94" text-anchor="middle" font-size="9" fill="#92400e">Insects</text>
  <!-- Frogs -->
  <rect x="200" y="55" width="60" height="24" fill="#fde68a" stroke="#d97706" stroke-width="1.5" rx="3"/>
  <text x="230" y="71" text-anchor="middle" font-size="9" fill="#92400e">Frogs</text>
  <!-- Arrows -->
  <line x1="175" y1="120" x2="90" y2="102" stroke="#64748b" stroke-width="1.5"/>
  <line x1="205" y1="120" x2="290" y2="102" stroke="#64748b" stroke-width="1.5"/>
  <line x1="75" y1="78" x2="55" y2="64" stroke="#64748b" stroke-width="1.5"/>
  <line x1="305" y1="78" x2="285" y2="64" stroke="#64748b" stroke-width="1.5"/>
  <line x1="285" y1="40" x2="210" y2="42" stroke="#64748b" stroke-width="1.5"/>
  <line x1="185" y1="78" x2="225" y2="79" stroke="#64748b" stroke-width="1.5"/>
  <line x1="230" y1="55" x2="280" y2="50" stroke="#64748b" stroke-width="1.5"/>
  <line x1="190" y1="40" x2="190" y2="18" stroke="#64748b" stroke-width="1.5"/>
</svg>""",
    roles=['protagonist'])

with open('data/questions-science-p6.json', 'w') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

batch = ['SCI600','SCI603','SCI604','SCI605','SCI606','SCI607','SCI608','SCI610','SCI611','SCI612']
for q in data:
    if q['id'] in batch:
        ok_d = q['diagram'] is not None
        ok_c = bool(q.get('placeholder_roles'))
        print(f"{q['id']}: diagram={'OK' if ok_d else 'MISSING'} | char={'OK' if ok_c else 'MISSING'}")
print("Batch 6 done!")
