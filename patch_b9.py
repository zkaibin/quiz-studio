import json

with open('data/questions-science-p6.json', 'r') as f:
    data = json.load(f)

idx = {q['id']: i for i, q in enumerate(data)}

def fix(qid, template=None, diagram=None, roles=None):
    i = idx[qid]
    if template is not None: data[i]['template'] = template
    if diagram is not None:  data[i]['diagram']  = diagram
    if roles   is not None:  data[i]['placeholder_roles'] = roles

# ── SCI634  both ─────────────────────────────────────────────────────────────
fix('SCI634',
    template="{CHARACTER_0} studies a diagram showing the stages in the germination of a bean seed:\nStage A: Dry seed\nStage B: Seed absorbs water and swells\nStage C: Radicle (root) emerges from seed\nStage D: Shoot emerges and first leaves appear\nDuring which stages is the seedling making its own food through photosynthesis?",
    diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 370 135" width="370" font-family="Arial,sans-serif">
  <text x="185" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Germination Stages A → D</text>
  <!-- Stage A -->
  <rect x="8" y="28" width="82" height="90" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5" rx="4"/>
  <text x="49" y="46" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e293b">Stage A</text>
  <ellipse cx="49" cy="72" rx="22" ry="16" fill="#fde68a" stroke="#d97706" stroke-width="1.5"/>
  <text x="49" y="76" text-anchor="middle" font-size="8" fill="#92400e">dry seed</text>
  <text x="49" y="108" text-anchor="middle" font-size="7" fill="#64748b">no photosynthesis</text>
  <!-- Stage B -->
  <rect x="97" y="28" width="82" height="90" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5" rx="4"/>
  <text x="138" y="46" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e293b">Stage B</text>
  <ellipse cx="138" cy="72" rx="26" ry="18" fill="#fde68a" stroke="#d97706" stroke-width="1.5"/>
  <text x="138" y="76" text-anchor="middle" font-size="7" fill="#92400e">swollen seed</text>
  <text x="138" y="108" text-anchor="middle" font-size="7" fill="#64748b">no photosynthesis</text>
  <!-- Stage C -->
  <rect x="186" y="28" width="82" height="90" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5" rx="4"/>
  <text x="227" y="46" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e293b">Stage C</text>
  <ellipse cx="220" cy="66" rx="22" ry="15" fill="#fde68a" stroke="#d97706" stroke-width="1.5"/>
  <line x1="220" y1="81" x2="215" y2="100" stroke="#78350f" stroke-width="2.5"/>
  <text x="235" y="103" font-size="7" fill="#78350f">radicle</text>
  <text x="227" y="113" text-anchor="middle" font-size="7" fill="#64748b">no photosynthesis</text>
  <!-- Stage D -->
  <rect x="275" y="28" width="87" height="90" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5" rx="4"/>
  <text x="318" y="46" text-anchor="middle" font-size="9" font-weight="bold" fill="#15803d">Stage D ✓</text>
  <ellipse cx="308" cy="72" rx="18" ry="13" fill="#fde68a" stroke="#d97706" stroke-width="1"/>
  <line x1="308" y1="59" x2="308" y2="40" stroke="#16a34a" stroke-width="2"/>
  <ellipse cx="302" cy="37" rx="7" ry="5" fill="#86efac" stroke="#16a34a" stroke-width="1"/>
  <ellipse cx="314" cy="35" rx="7" ry="5" fill="#86efac" stroke="#16a34a" stroke-width="1"/>
  <text x="318" y="110" text-anchor="middle" font-size="7" fill="#15803d">photosynthesis!</text>
</svg>""",
    roles=['protagonist'])

# ── SCI635  char only ────────────────────────────────────────────────────────
fix('SCI635',
    template="{CHARACTER_0} studies a diagram showing the process of fertilisation in humans. Which row correctly identifies where the egg cell (A) and sperm cell (B) are produced?",
    roles=['protagonist'])

# ── SCI636  diagram only ─────────────────────────────────────────────────────
fix('SCI636', diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 155" width="360" font-family="Arial,sans-serif">
  <text x="180" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Plant R Stomata — Opening and Closing</text>
  <rect x="10" y="25" width="165" height="115" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5" rx="5"/>
  <text x="92" y="43" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">Needing more food</text>
  <text x="92" y="57" text-anchor="middle" font-size="9" fill="#1e293b">Stomata OPEN widely</text>
  <!-- Open stomata -->
  <ellipse cx="50" cy="90" rx="18" ry="7" fill="#a7f3d0" stroke="#16a34a" stroke-width="2"/>
  <ellipse cx="130" cy="90" rx="18" ry="7" fill="#a7f3d0" stroke="#16a34a" stroke-width="2"/>
  <text x="50" y="112" text-anchor="middle" font-size="8" fill="#1e293b">CO₂ in ↓</text>
  <text x="130" y="112" text-anchor="middle" font-size="8" fill="#1e293b">CO₂ in ↓</text>
  <text x="92" y="130" text-anchor="middle" font-size="8" fill="#15803d">→ more CO₂ enters → more food made</text>
  <rect x="185" y="25" width="165" height="115" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5" rx="5"/>
  <text x="267" y="43" text-anchor="middle" font-size="10" font-weight="bold" fill="#dc2626">Has enough food</text>
  <text x="267" y="57" text-anchor="middle" font-size="9" fill="#1e293b">Stomata CLOSED</text>
  <!-- Closed stomata -->
  <line x1="230" y1="90" x2="250" y2="90" stroke="#ef4444" stroke-width="4"/>
  <line x1="280" y1="90" x2="300" y2="90" stroke="#ef4444" stroke-width="4"/>
  <text x="240" y="112" text-anchor="middle" font-size="8" fill="#1e293b">closed</text>
  <text x="290" y="112" text-anchor="middle" font-size="8" fill="#1e293b">closed</text>
  <text x="267" y="130" text-anchor="middle" font-size="8" fill="#dc2626">→ prevents water loss</text>
</svg>""")

# ── SCI637  char only ────────────────────────────────────────────────────────
fix('SCI637',
    template="{CHARACTER_0} studies Bird W, which lives near the ocean and has the following adaptations:\n• Structural: waterproof glands near tail / hooked beak for tearing flesh\n• Behavioural: follows fishing boats / rides air currents\nWhich row correctly classifies these adaptations as structural or behavioural?",
    roles=['protagonist'])

# ── SCI638  char only ────────────────────────────────────────────────────────
fix('SCI638',
    template="{CHARACTER_0} studies habitat Z where organism S and organism R exist. A scientist introduces organism R (a predator of S) into the habitat. A graph shows the population changes over time. At which point does the population of organism S start to drop?",
    roles=['protagonist'])

# ── SCI639  both ─────────────────────────────────────────────────────────────
fix('SCI639',
    template="{CHARACTER_0} sets up four test tubes with CO₂ indicator solution (red = normal CO₂; yellow = more CO₂; purple = less CO₂):\nTube 1: CO₂ solution only (no organisms)\nTube 2: Fish only, in the dark\nTube 3: Water plant (hydrilla) only, in the light\nTube 4: Fish and hydrilla together, in the light\nWhich row correctly shows the colour of the solution in each test tube after some time?",
    diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 145" width="380" font-family="Arial,sans-serif">
  <text x="190" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">CO₂ Indicator Test Tubes</text>
  <!-- Tube 1 -->
  <rect x="18" y="28" width="70" height="100" fill="#fca5a5" stroke="#ef4444" stroke-width="1.5" rx="4" opacity="0.9"/>
  <text x="53" y="48" text-anchor="middle" font-size="8" font-weight="bold" fill="#1e293b">Tube 1</text>
  <text x="53" y="62" text-anchor="middle" font-size="7" fill="#1e293b">CO₂ solution</text>
  <text x="53" y="74" text-anchor="middle" font-size="7" fill="#1e293b">no organisms</text>
  <text x="53" y="108" text-anchor="middle" font-size="8" font-weight="bold" fill="#dc2626">RED</text>
  <text x="53" y="120" text-anchor="middle" font-size="7" fill="#64748b">(normal)</text>
  <!-- Tube 2 -->
  <rect x="108" y="28" width="70" height="100" fill="#fde68a" stroke="#d97706" stroke-width="1.5" rx="4" opacity="0.9"/>
  <text x="143" y="48" text-anchor="middle" font-size="8" font-weight="bold" fill="#1e293b">Tube 2</text>
  <text x="143" y="62" text-anchor="middle" font-size="7" fill="#1e293b">Fish + dark</text>
  <text x="143" y="74" text-anchor="middle" font-size="7" fill="#1e293b">(respiration)</text>
  <text x="143" y="108" text-anchor="middle" font-size="8" font-weight="bold" fill="#d97706">YELLOW</text>
  <text x="143" y="120" text-anchor="middle" font-size="7" fill="#64748b">(more CO₂)</text>
  <!-- Tube 3 -->
  <rect x="198" y="28" width="70" height="100" fill="#c4b5fd" stroke="#7c3aed" stroke-width="1.5" rx="4" opacity="0.9"/>
  <text x="233" y="48" text-anchor="middle" font-size="8" font-weight="bold" fill="#1e293b">Tube 3</text>
  <text x="233" y="62" text-anchor="middle" font-size="7" fill="#1e293b">Hydrilla + light</text>
  <text x="233" y="74" text-anchor="middle" font-size="7" fill="#1e293b">(photosynthesis)</text>
  <text x="233" y="108" text-anchor="middle" font-size="8" font-weight="bold" fill="#5b21b6">PURPLE</text>
  <text x="233" y="120" text-anchor="middle" font-size="7" fill="#64748b">(less CO₂)</text>
  <!-- Tube 4 -->
  <rect x="288" y="28" width="82" height="100" fill="#d1fae5" stroke="#16a34a" stroke-width="1.5" rx="4" opacity="0.9"/>
  <text x="329" y="48" text-anchor="middle" font-size="8" font-weight="bold" fill="#1e293b">Tube 4</text>
  <text x="329" y="60" text-anchor="middle" font-size="7" fill="#1e293b">Fish+hydrilla</text>
  <text x="329" y="72" text-anchor="middle" font-size="7" fill="#1e293b">in light</text>
  <text x="329" y="84" text-anchor="middle" font-size="7" fill="#1e293b">(balance)</text>
  <text x="329" y="108" text-anchor="middle" font-size="7" font-weight="bold" fill="#15803d">RED/PURPLE</text>
  <text x="329" y="120" text-anchor="middle" font-size="7" fill="#64748b">(depends)</text>
</svg>""",
    roles=['protagonist'])

# ── SCI640  both ─────────────────────────────────────────────────────────────
fix('SCI640',
    template="{CHARACTER_0} uses a circuit with three rods X, Y, and Z to connect a battery to a bulb. When rods X and Z are in the circuit, the bulb lights up. When rod Y is in the circuit, the bulb does NOT light up. The rods are made of copper, plastic, and steel (not in this order). Which row correctly identifies the material of each rod?",
    diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 148" width="360" font-family="Arial,sans-serif">
  <text x="180" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Testing Conductivity of Rods X, Y, Z</text>
  <rect x="10" y="23" width="40" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Rod</text>
  <rect x="50" y="23" width="120" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="110" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Bulb result</text>
  <rect x="170" y="23" width="180" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="260" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Material (choices)</text>
  <rect x="10" y="45" width="40" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="62" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">X</text>
  <rect x="50" y="45" width="120" height="25" fill="#dcfce7" stroke="#16a34a" stroke-width="1"/>
  <text x="110" y="62" text-anchor="middle" font-size="10" fill="#15803d">💡 Bulb lights ✓</text>
  <rect x="170" y="45" width="180" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="260" y="62" text-anchor="middle" font-size="9" fill="#64748b">Conductor (copper or steel?)</text>
  <rect x="10" y="70" width="40" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="87" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">Y</text>
  <rect x="50" y="70" width="120" height="25" fill="#fee2e2" stroke="#ef4444" stroke-width="1"/>
  <text x="110" y="87" text-anchor="middle" font-size="10" fill="#dc2626">💡 Bulb dark ✗</text>
  <rect x="170" y="70" width="180" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="260" y="87" text-anchor="middle" font-size="9" fill="#64748b">Insulator (plastic?)</text>
  <rect x="10" y="95" width="40" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="112" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">Z</text>
  <rect x="50" y="95" width="120" height="25" fill="#dcfce7" stroke="#16a34a" stroke-width="1"/>
  <text x="110" y="112" text-anchor="middle" font-size="10" fill="#15803d">💡 Bulb lights ✓</text>
  <rect x="170" y="95" width="180" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="260" y="112" text-anchor="middle" font-size="9" fill="#64748b">Conductor (copper or steel?)</text>
  <text x="180" y="138" text-anchor="middle" font-size="8" fill="#64748b">Materials: copper, plastic, steel (assign to X, Y, Z)</text>
</svg>""",
    roles=['protagonist'])

# ── SCI641  char only ────────────────────────────────────────────────────────
fix('SCI641',
    template="{CHARACTER_0} studies a graph showing the temperature of a substance being heated over time. Between points P and Q, the temperature remains constant despite continued heating. What state is the substance in between points P and Q?",
    roles=['protagonist'])

# ── SCI642  both ─────────────────────────────────────────────────────────────
fix('SCI642',
    template="{CHARACTER_0} studies a water cycle diagram with four processes labelled W, X, Y, and Z. Process X results in water vapour in the air turning into water droplets to form clouds. What process is X, and what state change takes place during X?",
    diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 155" width="360" font-family="Arial,sans-serif">
  <text x="180" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Water Cycle Diagram</text>
  <!-- Sun -->
  <circle cx="320" cy="40" r="18" fill="#fef9c3" stroke="#d97706" stroke-width="2"/>
  <text x="320" y="44" text-anchor="middle" font-size="10" fill="#92400e">☀</text>
  <!-- Clouds -->
  <ellipse cx="160" cy="38" rx="45" ry="22" fill="#e0f2fe" stroke="#38bdf8" stroke-width="2"/>
  <text x="160" y="43" text-anchor="middle" font-size="9" fill="#0369a1">clouds ☁</text>
  <!-- X: condensation arrow (vapour→cloud) -->
  <line x1="260" y1="60" x2="205" y2="48" stroke="#0ea5e9" stroke-width="2"/>
  <text x="250" y="55" text-anchor="middle" font-size="9" font-weight="bold" fill="#0369a1">X: condensation</text>
  <text x="250" y="67" text-anchor="middle" font-size="8" fill="#0369a1">gas → liquid</text>
  <!-- W: evaporation arrow (sea→sky) -->
  <line x1="90" y1="120" x2="120" y2="58" stroke="#f59e0b" stroke-width="2" marker-end="url(#aw)"/>
  <defs><marker id="aw" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#f59e0b"/></marker></defs>
  <text x="65" y="100" font-size="9" fill="#d97706">W: evaporation</text>
  <text x="65" y="112" font-size="8" fill="#d97706">liquid → gas</text>
  <!-- Sea / water body -->
  <ellipse cx="90" cy="130" rx="65" ry="15" fill="#bfdbfe" stroke="#3b82f6" stroke-width="2"/>
  <text x="90" y="134" text-anchor="middle" font-size="9" fill="#1d4ed8">sea / lake</text>
  <!-- Y: precipitation (cloud→ground) -->
  <line x1="155" y1="60" x2="130" y2="120" stroke="#6366f1" stroke-width="2"/>
  <text x="130" y="80" text-anchor="middle" font-size="9" fill="#4338ca">Y: precipitation</text>
  <!-- Z: runoff -->
  <line x1="220" y1="140" x2="155" y2="140" stroke="#16a34a" stroke-width="2"/>
  <text x="250" y="143" font-size="8" fill="#15803d">Z: runoff</text>
  <!-- Ground -->
  <line x1="200" y1="140" x2="320" y2="140" stroke="#78350f" stroke-width="2"/>
</svg>""",
    roles=['protagonist'])

# ── SCI643  both ─────────────────────────────────────────────────────────────
fix('SCI643',
    template="{CHARACTER_0} observes a container holding 30 cm³ of plasticine and 260 cm³ of water. The container is left open for 2 days, during which some water evaporates. Which of the following correctly describes what has changed and what has stayed the same?",
    diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 148" width="340" font-family="Arial,sans-serif">
  <text x="170" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Container — Before and After 2 Days</text>
  <!-- Before -->
  <rect x="20" y="28" width="135" height="108" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5" rx="5"/>
  <text x="87" y="46" text-anchor="middle" font-size="10" font-weight="bold" fill="#1d4ed8">Before</text>
  <rect x="30" y="80" width="115" height="46" fill="#93c5fd" stroke="#3b82f6" stroke-width="1"/>
  <text x="87" y="107" text-anchor="middle" font-size="9" fill="#1e40af">water: 260 cm³</text>
  <rect x="30" y="120" width="115" height="14" fill="#a16207" stroke="#78350f" stroke-width="1" rx="2"/>
  <text x="87" y="131" text-anchor="middle" font-size="8" fill="white">plasticine: 30 cm³</text>
  <!-- After -->
  <rect x="185" y="28" width="135" height="108" fill="#fef9c3" stroke="#d97706" stroke-width="1.5" rx="5"/>
  <text x="252" y="46" text-anchor="middle" font-size="10" font-weight="bold" fill="#92400e">After (2 days)</text>
  <rect x="195" y="92" width="115" height="34" fill="#93c5fd" stroke="#3b82f6" stroke-width="1"/>
  <text x="252" y="113" text-anchor="middle" font-size="9" fill="#1e40af">water: &lt;260 cm³ ↓</text>
  <rect x="195" y="120" width="115" height="14" fill="#a16207" stroke="#78350f" stroke-width="1" rx="2"/>
  <text x="252" y="131" text-anchor="middle" font-size="8" fill="white">plasticine: 30 cm³ (same)</text>
  <!-- Evaporation arrow -->
  <line x1="252" y1="55" x2="252" y2="38" stroke="#d97706" stroke-width="1.5" stroke-dasharray="4,2"/>
  <text x="252" y="75" text-anchor="middle" font-size="8" fill="#92400e">H₂O evaporates ↑</text>
</svg>""",
    roles=['protagonist'])

with open('data/questions-science-p6.json', 'w') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

batch = ['SCI634','SCI635','SCI636','SCI637','SCI638','SCI639','SCI640','SCI641','SCI642','SCI643']
for q in data:
    if q['id'] in batch:
        ok_d = q['diagram'] is not None
        ok_c = bool(q.get('placeholder_roles'))
        print(f"{q['id']}: diagram={'OK' if ok_d else 'MISSING'} | char={'OK' if ok_c else 'MISSING'}")
print("Batch 9 done!")
