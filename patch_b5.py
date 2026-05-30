import json

with open('data/questions-science-p6.json', 'r') as f:
    data = json.load(f)

idx = {q['id']: i for i, q in enumerate(data)}

def fix(qid, template=None, diagram=None, roles=None):
    i = idx[qid]
    if template is not None: data[i]['template'] = template
    if diagram is not None:  data[i]['diagram']  = diagram
    if roles   is not None:  data[i]['placeholder_roles'] = roles

# ── SCI588  char only ────────────────────────────────────────────────────────
fix('SCI588',
    template="{CHARACTER_0} studies a graph showing the population of organism X in a habitat over several years. After year T, the population of organism X drops suddenly and rapidly. Which of the following best explains this change?",
    roles=['protagonist'])

# ── SCI589  both ─────────────────────────────────────────────────────────────
fix('SCI589',
    template="{CHARACTER_0} studies a forest community with the following organisms:\nEagle, Sparrow (2 types), Spider (3 types), Beetle, Oak tree, Pine tree, Grass\nWhich of the following correctly describes a community?",
    diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 160" width="380" font-family="Arial,sans-serif">
  <text x="190" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Forest Community — All Living Things</text>
  <rect x="10" y="25" width="175" height="120" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5" rx="5"/>
  <text x="97" y="42" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e40af">Animals</text>
  <text x="97" y="58" text-anchor="middle" font-size="9" fill="#1e293b">Eagle (1 species)</text>
  <text x="97" y="73" text-anchor="middle" font-size="9" fill="#1e293b">Sparrow (2 species = 2 populations)</text>
  <text x="97" y="88" text-anchor="middle" font-size="9" fill="#1e293b">Spider (3 species = 3 populations)</text>
  <text x="97" y="103" text-anchor="middle" font-size="9" fill="#1e293b">Beetle (1 species)</text>
  <rect x="195" y="25" width="175" height="120" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5" rx="5"/>
  <text x="282" y="42" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">Plants</text>
  <text x="282" y="58" text-anchor="middle" font-size="9" fill="#1e293b">Oak tree</text>
  <text x="282" y="73" text-anchor="middle" font-size="9" fill="#1e293b">Pine tree</text>
  <text x="282" y="88" text-anchor="middle" font-size="9" fill="#1e293b">Grass</text>
  <text x="190" y="155" text-anchor="middle" font-size="8" fill="#64748b">Community = ALL populations in ONE habitat</text>
</svg>""",
    roles=['protagonist'])

# ── SCI590  both ─────────────────────────────────────────────────────────────
fix('SCI590',
    template="{CHARACTER_0} studies a food web: Plant N → Caterpillar → Chicken and Spider. Chickens also eat worms. Caterpillars produce Chemical T which deters predators. A scientist removes Chemical T from the caterpillars. What would happen?\nA: Population of Plant N would increase.\nB: Population of Plant N would decrease.\nC: Population of chickens would decrease.\nD: Population of chickens would increase.",
    diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 160" width="380" font-family="Arial,sans-serif">
  <text x="190" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Food Web — Chemical T Removed</text>
  <!-- Plant N -->
  <rect x="155" y="120" width="70" height="28" fill="#86efac" stroke="#16a34a" stroke-width="2" rx="4"/>
  <text x="190" y="138" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">Plant N</text>
  <!-- Caterpillar -->
  <rect x="155" y="75" width="70" height="28" fill="#fde68a" stroke="#d97706" stroke-width="2" rx="4"/>
  <text x="190" y="87" text-anchor="middle" font-size="9" font-weight="bold" fill="#92400e">Caterpillar</text>
  <text x="190" y="98" text-anchor="middle" font-size="8" fill="#92400e">+ Chemical T</text>
  <!-- Arrow Plant→Caterpillar -->
  <line x1="190" y1="120" x2="190" y2="103" stroke="#64748b" stroke-width="1.5" marker-end="url(#arrow)"/>
  <!-- Chicken -->
  <rect x="60" y="30" width="70" height="28" fill="#fca5a5" stroke="#ef4444" stroke-width="1.5" rx="4"/>
  <text x="95" y="48" text-anchor="middle" font-size="10" font-weight="bold" fill="#dc2626">Chicken</text>
  <!-- Spider -->
  <rect x="250" y="30" width="70" height="28" fill="#fca5a5" stroke="#ef4444" stroke-width="1.5" rx="4"/>
  <text x="285" y="48" text-anchor="middle" font-size="10" font-weight="bold" fill="#dc2626">Spider</text>
  <!-- Worm -->
  <rect x="10" y="75" width="60" height="28" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1" rx="4"/>
  <text x="40" y="93" text-anchor="middle" font-size="9" fill="#1e293b">Worm</text>
  <!-- Arrows -->
  <line x1="170" y1="75" x2="110" y2="58" stroke="#64748b" stroke-width="1.5"/>
  <line x1="210" y1="75" x2="265" y2="58" stroke="#64748b" stroke-width="1.5"/>
  <line x1="60" y1="88" x2="80" y2="58" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4,3"/>
  <!-- Chemical T removed note -->
  <rect x="290" y="75" width="85" height="30" fill="#fee2e2" stroke="#ef4444" stroke-width="1" rx="3"/>
  <text x="332" y="87" text-anchor="middle" font-size="8" fill="#dc2626">Chemical T</text>
  <text x="332" y="99" text-anchor="middle" font-size="8" fill="#dc2626">REMOVED ✗</text>
</svg>""",
    roles=['protagonist'])

# ── SCI591  both ─────────────────────────────────────────────────────────────
fix('SCI591',
    template="{CHARACTER_0} learns about mimicry. Organism Y looks very similar to organism Z, which has a painful sting. Organism Y is harmless but has the same colouring and pattern as Z. Which of the following best explains why mimicry is beneficial to organism Y?",
    diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 140" width="360" font-family="Arial,sans-serif">
  <text x="180" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Mimicry — Organism Y and Z</text>
  <rect x="10" y="25" width="160" height="100" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5" rx="5"/>
  <text x="90" y="42" text-anchor="middle" font-size="10" font-weight="bold" fill="#dc2626">Organism Z (model)</text>
  <text x="90" y="58" text-anchor="middle" font-size="9" fill="#1e293b">Has painful sting 🐝</text>
  <text x="90" y="73" text-anchor="middle" font-size="9" fill="#1e293b">Bright warning colours</text>
  <text x="90" y="88" text-anchor="middle" font-size="9" fill="#1e293b">Predators avoid it</text>
  <text x="90" y="112" text-anchor="middle" font-size="8" fill="#dc2626">Dangerous ⚠</text>
  <rect x="190" y="25" width="160" height="100" fill="#fef9c3" stroke="#d97706" stroke-width="1.5" rx="5"/>
  <text x="270" y="42" text-anchor="middle" font-size="10" font-weight="bold" fill="#92400e">Organism Y (mimic)</text>
  <text x="270" y="58" text-anchor="middle" font-size="9" fill="#1e293b">Harmless — no sting</text>
  <text x="270" y="73" text-anchor="middle" font-size="9" fill="#1e293b">Looks IDENTICAL to Z</text>
  <text x="270" y="88" text-anchor="middle" font-size="9" fill="#1e293b">Predators also avoid it</text>
  <text x="270" y="112" text-anchor="middle" font-size="8" fill="#92400e">Benefit = survival!</text>
</svg>""",
    roles=['protagonist'])

# ── SCI592  both ─────────────────────────────────────────────────────────────
fix('SCI592',
    template="{CHARACTER_0} studies a graph showing rising levels of greenhouse gases in the atmosphere. Several reasons were given:\nA: Burning of fossil fuels\nB: Deforestation\nC: Volcanic eruptions (natural)\nD: Use of renewable energy sources (solar panels)\nWhich reason is the LEAST LIKELY cause of the rising greenhouse gas levels?",
    diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 140" width="360" font-family="Arial,sans-serif">
  <text x="180" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Possible Causes of Rising Greenhouse Gases</text>
  <rect x="10" y="23" width="40" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Cause</text>
  <rect x="50" y="23" width="300" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="200" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Description</text>
  <rect x="10" y="45" width="40" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="60" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">A</text>
  <rect x="50" y="45" width="300" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="200" y="60" text-anchor="middle" font-size="10" fill="#1e293b">Burning of fossil fuels (coal, oil, gas)</text>
  <rect x="10" y="67" width="40" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="82" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">B</text>
  <rect x="50" y="67" width="300" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="200" y="82" text-anchor="middle" font-size="10" fill="#1e293b">Deforestation (fewer trees absorb CO₂)</text>
  <rect x="10" y="89" width="40" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="104" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">C</text>
  <rect x="50" y="89" width="300" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="200" y="104" text-anchor="middle" font-size="10" fill="#1e293b">Volcanic eruptions (natural, not human)</text>
  <rect x="10" y="111" width="40" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="126" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">D</text>
  <rect x="50" y="111" width="300" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="200" y="126" text-anchor="middle" font-size="10" fill="#1e293b">Use of solar panels (renewable, clean energy)</text>
</svg>""",
    roles=['protagonist'])

# ── SCI594  diagram only ─────────────────────────────────────────────────────
fix('SCI594', diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 165" width="320" font-family="Arial,sans-serif">
  <text x="160" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Tea Bag in Hot Water — Diffusion</text>
  <!-- Cup -->
  <path d="M 70 40 L 60 150 L 260 150 L 250 40 Z" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
  <!-- Tea bag -->
  <rect x="130" y="45" width="60" height="40" fill="#78350f" stroke="#451a03" stroke-width="1.5" rx="3" opacity="0.8"/>
  <text x="160" y="65" text-anchor="middle" font-size="9" fill="white">tea bag</text>
  <!-- Tea spreading (dots) -->
  <circle cx="110" cy="95" r="4" fill="#92400e" opacity="0.6"/>
  <circle cx="140" cy="105" r="3" fill="#92400e" opacity="0.5"/>
  <circle cx="175" cy="100" r="4" fill="#92400e" opacity="0.6"/>
  <circle cx="210" cy="95" r="3" fill="#92400e" opacity="0.4"/>
  <circle cx="100" cy="120" r="3" fill="#92400e" opacity="0.3"/>
  <circle cx="220" cy="120" r="3" fill="#92400e" opacity="0.3"/>
  <!-- Water level -->
  <text x="160" y="135" text-anchor="middle" font-size="9" fill="#78350f">tea spreading throughout water</text>
  <!-- Arrow -->
  <text x="160" y="158" text-anchor="middle" font-size="9" fill="#64748b">Which property of a liquid does this show?</text>
</svg>""")

# ── SCI595  both ─────────────────────────────────────────────────────────────
fix('SCI595',
    template="{CHARACTER_0} studies a transparent bottle filled with marbles. Which of the following statements about the marbles are ALL correct?\nA: The marbles take up space.\nB: The marbles have a fixed shape.\nC: The marbles have mass.\nD: The marbles have no definite volume.",
    diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 165" width="320" font-family="Arial,sans-serif">
  <text x="160" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Transparent Bottle Filled with Marbles</text>
  <!-- Bottle outline -->
  <path d="M 110 30 L 95 40 L 85 145 L 235 145 L 225 40 L 210 30 Z" fill="none" stroke="#64748b" stroke-width="2"/>
  <line x1="95" y1="40" x2="225" y2="40" stroke="#64748b" stroke-width="1.5"/>
  <!-- Marbles -->
  <circle cx="130" cy="65" r="14" fill="#93c5fd" stroke="#3b82f6" stroke-width="1.5"/>
  <circle cx="160" cy="65" r="14" fill="#86efac" stroke="#16a34a" stroke-width="1.5"/>
  <circle cx="190" cy="65" r="14" fill="#fde68a" stroke="#d97706" stroke-width="1.5"/>
  <circle cx="145" cy="92" r="14" fill="#fca5a5" stroke="#ef4444" stroke-width="1.5"/>
  <circle cx="175" cy="92" r="14" fill="#c4b5fd" stroke="#7c3aed" stroke-width="1.5"/>
  <circle cx="130" cy="119" r="14" fill="#86efac" stroke="#16a34a" stroke-width="1.5"/>
  <circle cx="160" cy="119" r="14" fill="#93c5fd" stroke="#3b82f6" stroke-width="1.5"/>
  <circle cx="190" cy="119" r="14" fill="#fde68a" stroke="#d97706" stroke-width="1.5"/>
  <text x="160" y="158" text-anchor="middle" font-size="9" fill="#64748b">Which statements A, B, C, D are ALL correct?</text>
</svg>""",
    roles=['protagonist'])

# ── SCI596  char only ────────────────────────────────────────────────────────
fix('SCI596',
    template="{CHARACTER_0} studies a table showing the melting point and boiling point of substances A and B:\nSubstance A: melting point 60°C, boiling point 130°C\nSubstance B: melting point 80°C, boiling point 200°C\nAt what temperature can BOTH substances be stored as liquids?",
    roles=['protagonist'])

# ── SCI598  diagram only ─────────────────────────────────────────────────────
fix('SCI598', diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 145" width="380" font-family="Arial,sans-serif">
  <text x="190" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Series Circuit — Mystery Objects P, Q, R</text>
  <!-- Battery -->
  <rect x="10" y="60" width="40" height="25" fill="#fde68a" stroke="#d97706" stroke-width="1.5" rx="3"/>
  <text x="30" y="76" text-anchor="middle" font-size="9" font-weight="bold" fill="#92400e">Battery</text>
  <!-- Wire lines -->
  <line x1="50" y1="72" x2="80" y2="72" stroke="#64748b" stroke-width="2"/>
  <line x1="330" y1="72" x2="350" y2="72" stroke="#64748b" stroke-width="2"/>
  <line x1="350" y1="72" x2="350" y2="30" stroke="#64748b" stroke-width="2"/>
  <line x1="10" y1="30" x2="350" y2="30" stroke="#64748b" stroke-width="2"/>
  <line x1="10" y1="30" x2="10" y2="60" stroke="#64748b" stroke-width="2"/>
  <!-- Object P -->
  <rect x="80" y="55" width="60" height="35" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5" rx="3"/>
  <text x="110" y="71" text-anchor="middle" font-size="10" font-weight="bold" fill="#1d4ed8">P</text>
  <circle cx="110" cy="50" r="8" fill="#fef9c3" stroke="#d97706" stroke-width="1"/>
  <text x="110" y="54" text-anchor="middle" font-size="8" fill="#92400e">💡lit</text>
  <!-- Object Q -->
  <rect x="165" y="55" width="60" height="35" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5" rx="3"/>
  <text x="195" y="71" text-anchor="middle" font-size="10" font-weight="bold" fill="#1d4ed8">Q</text>
  <circle cx="195" cy="50" r="8" fill="#fef9c3" stroke="#d97706" stroke-width="1"/>
  <text x="195" y="54" text-anchor="middle" font-size="8" fill="#92400e">💡lit</text>
  <!-- Object R -->
  <rect x="250" y="55" width="60" height="35" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5" rx="3"/>
  <text x="280" y="71" text-anchor="middle" font-size="10" font-weight="bold" fill="#dc2626">R</text>
  <circle cx="280" cy="50" r="8" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1"/>
  <text x="280" y="54" text-anchor="middle" font-size="8" fill="#94a3b8">off</text>
  <text x="190" y="110" text-anchor="middle" font-size="9" fill="#1e293b">P and Q: bulb lights | R: bulb does NOT light</text>
  <text x="190" y="125" text-anchor="middle" font-size="8" fill="#64748b">Materials: aluminium, nickel, glass (not in this order)</text>
</svg>""")

# ── SCI599  diagram only ─────────────────────────────────────────────────────
fix('SCI599', diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 165" width="340" font-family="Arial,sans-serif">
  <text x="170" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Three Rings on a String</text>
  <!-- String -->
  <line x1="170" y1="25" x2="170" y2="150" stroke="#92400e" stroke-width="2"/>
  <!-- Ring X -->
  <circle cx="105" cy="58" r="22" fill="none" stroke="#3b82f6" stroke-width="3"/>
  <text x="105" y="63" text-anchor="middle" font-size="14" font-weight="bold" fill="#1d4ed8">X</text>
  <!-- Ring Y (on string, centre) -->
  <circle cx="170" cy="90" r="22" fill="none" stroke="#16a34a" stroke-width="3"/>
  <text x="170" y="95" text-anchor="middle" font-size="14" font-weight="bold" fill="#15803d">Y</text>
  <!-- Ring Z -->
  <circle cx="235" cy="58" r="22" fill="none" stroke="#ef4444" stroke-width="3"/>
  <text x="235" y="63" text-anchor="middle" font-size="14" font-weight="bold" fill="#dc2626">Z</text>
  <!-- Attraction arrows X↔Y -->
  <line x1="127" y1="65" x2="148" y2="78" stroke="#16a34a" stroke-width="1.5"/>
  <text x="132" y="70" font-size="8" fill="#15803d">attract ✓</text>
  <!-- Attraction arrows Y↔Z -->
  <line x1="192" y1="78" x2="213" y2="65" stroke="#16a34a" stroke-width="1.5"/>
  <text x="205" y="70" font-size="8" fill="#15803d">attract ✓</text>
  <!-- Repulsion X-Z -->
  <line x1="127" y1="50" x2="213" y2="50" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="170" y="44" text-anchor="middle" font-size="8" fill="#dc2626">X and Z repel ✗</text>
  <!-- Key observations -->
  <text x="170" y="140" text-anchor="middle" font-size="9" fill="#64748b">X attracts Y • Y attracts Z • X repels Z</text>
  <text x="170" y="155" text-anchor="middle" font-size="9" fill="#64748b">What are X, Y, and Z?</text>
</svg>""")

with open('data/questions-science-p6.json', 'w') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

batch = ['SCI588','SCI589','SCI590','SCI591','SCI592','SCI594','SCI595','SCI596','SCI598','SCI599']
for q in data:
    if q['id'] in batch:
        ok_d = q['diagram'] is not None
        ok_c = bool(q.get('placeholder_roles'))
        print(f"{q['id']}: diagram={'OK' if ok_d else 'MISSING'} | char={'OK' if ok_c else 'MISSING'}")
print("Batch 5 done!")
