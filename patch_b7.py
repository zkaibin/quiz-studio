import json

with open('data/questions-science-p6.json', 'r') as f:
    data = json.load(f)

idx = {q['id']: i for i, q in enumerate(data)}

def fix(qid, template=None, diagram=None, roles=None):
    i = idx[qid]
    if template is not None: data[i]['template'] = template
    if diagram is not None:  data[i]['diagram']  = diagram
    if roles   is not None:  data[i]['placeholder_roles'] = roles

# ── SCI614  both ─────────────────────────────────────────────────────────────
fix('SCI614',
    template="{CHARACTER_0} studies a habitat with a food web:\nPlants → G (herbivore) → H (predator)\nAnimal R is then introduced and also feeds on organism G.\nAfter Animal R is introduced, which of the following observations are correct?\nA: Population of G decreases.\nB: Population of H decreases.\nC: Population of plants decreases.\nD: Population of plants increases.",
    diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 370 150" width="370" font-family="Arial,sans-serif">
  <text x="185" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Effect of Introducing Animal R</text>
  <!-- Plants -->
  <rect x="150" y="110" width="70" height="26" fill="#86efac" stroke="#16a34a" stroke-width="2" rx="4"/>
  <text x="185" y="127" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">Plants</text>
  <!-- G -->
  <rect x="150" y="68" width="70" height="26" fill="#fde68a" stroke="#d97706" stroke-width="1.5" rx="3"/>
  <text x="185" y="85" text-anchor="middle" font-size="10" font-weight="bold" fill="#92400e">G (herbivore)</text>
  <!-- H -->
  <rect x="60" y="26" width="70" height="26" fill="#fca5a5" stroke="#ef4444" stroke-width="1.5" rx="3"/>
  <text x="95" y="43" text-anchor="middle" font-size="10" fill="#dc2626">H (predator)</text>
  <!-- Animal R (new) -->
  <rect x="250" y="26" width="80" height="26" fill="#c7d2fe" stroke="#6366f1" stroke-width="2" rx="4"/>
  <text x="290" y="43" text-anchor="middle" font-size="10" font-weight="bold" fill="#4338ca">Animal R (new)</text>
  <!-- Arrows -->
  <line x1="185" y1="110" x2="185" y2="94" stroke="#64748b" stroke-width="2"/>
  <line x1="170" y1="68" x2="110" y2="52" stroke="#64748b" stroke-width="1.5"/>
  <line x1="200" y1="68" x2="270" y2="52" stroke="#6366f1" stroke-width="2" stroke-dasharray="5,3"/>
  <!-- New competition label -->
  <text x="290" y="75" text-anchor="middle" font-size="8" fill="#4338ca">also eats G ↓</text>
  <text x="185" y="148" text-anchor="middle" font-size="8" fill="#64748b">Which observations A/B/C/D are correct after R is introduced?</text>
</svg>""",
    roles=['protagonist'])

# ── SCI615  both ─────────────────────────────────────────────────────────────
fix('SCI615',
    template="{CHARACTER_0} studies statements made by students comparing how plants and animals get their food. Which statements are INCORRECT?\nA: 'Plants can make food but animals cannot.'\nB: 'Both plants and animals get energy from food.'\nC: 'Animals eat food but plants do not need energy.'\nD: 'Plants use photosynthesis; animals must eat other organisms.'",
    diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 370 148" width="370" font-family="Arial,sans-serif">
  <text x="185" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">How Plants and Animals Get Food</text>
  <rect x="10" y="23" width="30" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="25" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">St.</text>
  <rect x="40" y="23" width="320" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="200" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Statement</text>
  <rect x="10" y="45" width="30" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="25" y="60" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">A</text>
  <rect x="40" y="45" width="320" height="22" fill="#dcfce7" stroke="#16a34a" stroke-width="1"/>
  <text x="200" y="60" text-anchor="middle" font-size="9" fill="#15803d">Plants can make food but animals cannot. ✓ (correct)</text>
  <rect x="10" y="67" width="30" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="25" y="82" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">B</text>
  <rect x="40" y="67" width="320" height="22" fill="#dcfce7" stroke="#16a34a" stroke-width="1"/>
  <text x="200" y="82" text-anchor="middle" font-size="9" fill="#15803d">Both plants and animals get energy from food. ✓ (correct)</text>
  <rect x="10" y="89" width="30" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="25" y="104" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">C</text>
  <rect x="40" y="89" width="320" height="22" fill="#fee2e2" stroke="#ef4444" stroke-width="1"/>
  <text x="200" y="104" text-anchor="middle" font-size="9" fill="#dc2626">Animals eat food but plants do not need energy. ✗ (incorrect)</text>
  <rect x="10" y="111" width="30" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="25" y="126" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">D</text>
  <rect x="40" y="111" width="320" height="22" fill="#dcfce7" stroke="#16a34a" stroke-width="1"/>
  <text x="200" y="126" text-anchor="middle" font-size="9" fill="#15803d">Plants use photosynthesis; animals must eat. ✓ (correct)</text>
</svg>""",
    roles=['protagonist'])

# ── SCI616  both ─────────────────────────────────────────────────────────────
fix('SCI616',
    template="{CHARACTER_0} places a potted plant in a sealed, airtight box in the dark. After 3 days, which of the following changes would be observed inside the box?\nA: The amount of oxygen in the box decreases.\nB: The amount of carbon dioxide in the box increases.\nC: The amount of water vapour in the box increases.\nD: The mass of the plant increases.",
    diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 158" width="320" font-family="Arial,sans-serif">
  <text x="160" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Sealed Box in the Dark — 3 Days</text>
  <!-- Box -->
  <rect x="40" y="30" width="240" height="110" fill="#f1f5f9" stroke="#64748b" stroke-width="2.5" rx="5"/>
  <text x="160" y="48" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Sealed airtight box (DARK)</text>
  <!-- Plant icon -->
  <line x1="155" y1="115" x2="155" y2="80" stroke="#16a34a" stroke-width="2.5"/>
  <circle cx="145" cy="73" r="8" fill="#86efac" stroke="#16a34a" stroke-width="1.5"/>
  <circle cx="160" cy="65" r="9" fill="#86efac" stroke="#16a34a" stroke-width="1.5"/>
  <circle cx="172" cy="72" r="7" fill="#86efac" stroke="#16a34a" stroke-width="1.5"/>
  <rect x="146" y="112" width="18" height="10" fill="#92400e" rx="2"/>
  <text x="155" y="138" text-anchor="middle" font-size="9" fill="#64748b">plant (dark = respiration only)</text>
  <!-- Arrows for gas changes -->
  <text x="65" y="75" font-size="8" fill="#dc2626">O₂ ↓</text>
  <text x="220" y="75" font-size="8" fill="#15803d">CO₂ ↑</text>
  <text x="220" y="95" font-size="8" fill="#1d4ed8">H₂O ↑</text>
</svg>""",
    roles=['protagonist'])

# ── SCI617  diagram only ─────────────────────────────────────────────────────
fix('SCI617', diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 370 150" width="370" font-family="Arial,sans-serif">
  <text x="185" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Flexibility Test — Strips of Different Materials</text>
  <rect x="10" y="25" width="55" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="37" y="40" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Variable</text>
  <rect x="65" y="25" width="305" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="217" y="40" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Keep same / Change?</text>
  <rect x="10" y="47" width="55" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="37" y="62" text-anchor="middle" font-size="9" fill="#1e293b">Length</text>
  <rect x="65" y="47" width="305" height="22" fill="#dcfce7" stroke="#16a3a8" stroke-width="1"/>
  <text x="217" y="62" text-anchor="middle" font-size="9" fill="#15803d">Keep SAME (fair test)</text>
  <rect x="10" y="69" width="55" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="37" y="84" text-anchor="middle" font-size="9" fill="#1e293b">Thickness</text>
  <rect x="65" y="69" width="305" height="22" fill="#dcfce7" stroke="#16a3a8" stroke-width="1"/>
  <text x="217" y="84" text-anchor="middle" font-size="9" fill="#15803d">Keep SAME (fair test)</text>
  <rect x="10" y="91" width="55" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="37" y="106" text-anchor="middle" font-size="9" fill="#1e293b">Weight</text>
  <rect x="65" y="91" width="305" height="22" fill="#dcfce7" stroke="#16a3a8" stroke-width="1"/>
  <text x="217" y="106" text-anchor="middle" font-size="9" fill="#15803d">Keep SAME (same load on each strip)</text>
  <rect x="10" y="113" width="55" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="37" y="128" text-anchor="middle" font-size="9" fill="#1e293b">Material</text>
  <rect x="65" y="113" width="305" height="22" fill="#fef9c3" stroke="#d97706" stroke-width="1"/>
  <text x="217" y="128" text-anchor="middle" font-size="9" fill="#d97706">CHANGE (this is what we are testing)</text>
</svg>""")

# ── SCI618  char only ────────────────────────────────────────────────────────
fix('SCI618',
    template="{CHARACTER_0} studies a table showing the properties of Substance X:\n• At 4°C, Substance X is a solid\n• At 90°C, Substance X is a gas\nWhich row correctly shows the melting point and boiling point of Substance X?",
    roles=['protagonist'])

# ── SCI619  char only ────────────────────────────────────────────────────────
fix('SCI619',
    template="{CHARACTER_0} studies a circuit with 5 bulbs (A, B, C, D, E) in a combination of series and parallel connections. Bulb B is blown (broken). How many of the remaining bulbs continue to stay lit?",
    roles=['protagonist'])

# ── SCI620  diagram only ─────────────────────────────────────────────────────
fix('SCI620', diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 370 155" width="370" font-family="Arial,sans-serif">
  <text x="185" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Circuit Brightness — Setups P, Q, R</text>
  <!-- Setup P: B1 and B2 in series, 1 battery -->
  <rect x="10" y="28" width="108" height="110" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5" rx="4"/>
  <text x="64" y="45" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e293b">P (dimmer)</text>
  <text x="64" y="58" text-anchor="middle" font-size="8" fill="#64748b">Series: 1 battery</text>
  <circle cx="44" cy="90" r="12" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
  <text x="44" y="94" text-anchor="middle" font-size="8" fill="#92400e">B1</text>
  <circle cx="84" cy="90" r="12" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
  <text x="84" y="94" text-anchor="middle" font-size="8" fill="#92400e">B2</text>
  <line x1="18" y1="90" x2="32" y2="90" stroke="#64748b" stroke-width="1.5"/>
  <line x1="56" y1="90" x2="72" y2="90" stroke="#64748b" stroke-width="1.5"/>
  <line x1="96" y1="90" x2="108" y2="90" stroke="#64748b" stroke-width="1.5"/>
  <text x="64" y="128" text-anchor="middle" font-size="8" fill="#dc2626">dim ★</text>
  <!-- Setup Q: B1 and B2 in parallel, 1 battery -->
  <rect x="130" y="28" width="108" height="110" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5" rx="4"/>
  <text x="184" y="45" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e293b">Q (brightest)</text>
  <text x="184" y="58" text-anchor="middle" font-size="8" fill="#64748b">Parallel: 1 battery</text>
  <circle cx="164" cy="80" r="12" fill="#fef9c3" stroke="#d97706" stroke-width="2"/>
  <text x="164" y="84" text-anchor="middle" font-size="8" fill="#92400e">B1</text>
  <circle cx="204" cy="80" r="12" fill="#fef9c3" stroke="#d97706" stroke-width="2"/>
  <text x="204" y="84" text-anchor="middle" font-size="8" fill="#92400e">B2</text>
  <line x1="164" y1="80" x2="184" y2="115" stroke="#64748b" stroke-width="1" stroke-dasharray="3,2"/>
  <line x1="204" y1="80" x2="184" y2="115" stroke="#64748b" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="184" y="128" text-anchor="middle" font-size="8" fill="#15803d">bright ★★★</text>
  <!-- Setup R: B1 only, 1 battery -->
  <rect x="250" y="28" width="108" height="110" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5" rx="4"/>
  <text x="304" y="45" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e293b">R (brighter)</text>
  <text x="304" y="58" text-anchor="middle" font-size="8" fill="#64748b">Series: 1 battery</text>
  <circle cx="304" cy="90" r="12" fill="#fef9c3" stroke="#d97706" stroke-width="2"/>
  <text x="304" y="94" text-anchor="middle" font-size="8" fill="#92400e">B1 only</text>
  <line x1="258" y1="90" x2="292" y2="90" stroke="#64748b" stroke-width="1.5"/>
  <line x1="316" y1="90" x2="350" y2="90" stroke="#64748b" stroke-width="1.5"/>
  <text x="304" y="128" text-anchor="middle" font-size="8" fill="#1d4ed8">bright ★★</text>
  <text x="185" y="150" text-anchor="middle" font-size="9" fill="#64748b">Order from brightest to dimmest?</text>
</svg>""")

# ── SCI621  diagram only ─────────────────────────────────────────────────────
fix('SCI621', diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 150" width="360" font-family="Arial,sans-serif">
  <text x="180" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Two Trolleys Connected by a Spring</text>
  <!-- Track -->
  <rect x="15" y="100" width="330" height="8" fill="#94a3b8" rx="2"/>
  <!-- Trolley X -->
  <rect x="30" y="72" width="80" height="28" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" rx="4"/>
  <text x="70" y="85" text-anchor="middle" font-size="9" font-weight="bold" fill="#1d4ed8">Trolley X</text>
  <text x="70" y="96" text-anchor="middle" font-size="8" fill="#1d4ed8">(south pole)</text>
  <!-- Spring -->
  <path d="M 110 86 Q 120 76 130 86 Q 140 96 150 86 Q 160 76 170 86 Q 180 96 190 86 Q 200 76 210 86 Q 220 96 230 86" fill="none" stroke="#64748b" stroke-width="2"/>
  <!-- Trolley Z -->
  <rect x="250" y="72" width="80" height="28" fill="#dcfce7" stroke="#16a34a" stroke-width="2" rx="4"/>
  <text x="290" y="85" text-anchor="middle" font-size="9" font-weight="bold" fill="#15803d">Trolley Z</text>
  <text x="290" y="96" text-anchor="middle" font-size="8" fill="#15803d">(?)</text>
  <!-- Trolley Y with magnet -->
  <rect x="135" y="28" width="90" height="28" fill="#fde68a" stroke="#d97706" stroke-width="2" rx="4"/>
  <text x="180" y="41" text-anchor="middle" font-size="9" font-weight="bold" fill="#92400e">Trolley Y</text>
  <text x="180" y="52" text-anchor="middle" font-size="8" fill="#92400e">(north pole)</text>
  <!-- Attraction arrows -->
  <line x1="135" y1="75" x2="110" y2="85" stroke="#15803d" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="90" y="64" font-size="8" fill="#15803d">Z attracts X</text>
  <line x1="225" y1="75" x2="252" y2="84" stroke="#15803d" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="230" y="64" font-size="8" fill="#15803d">Z attracts Y</text>
  <text x="180" y="140" text-anchor="middle" font-size="9" fill="#64748b">Z attracts X (south pole) AND Y (north pole). What is Z?</text>
</svg>""")

# ── SCI622  both ─────────────────────────────────────────────────────────────
fix('SCI622',
    template="{CHARACTER_0} makes three electromagnets A, B, and C using identical wire and batteries. The only difference is the number of wire coils:\n• Electromagnet A: 10 coils\n• Electromagnet B: 20 coils\n• Electromagnet C: 5 coils\nWhich order correctly lists the electromagnets from strongest to weakest?",
    diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 140" width="350" font-family="Arial,sans-serif">
  <text x="175" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Electromagnets A, B, C — Number of Coils</text>
  <rect x="10" y="25" width="55" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="37" y="40" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Magnet</text>
  <rect x="65" y="25" width="130" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="130" y="40" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Number of Coils</text>
  <rect x="195" y="25" width="145" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="267" y="40" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Relative Strength</text>
  <rect x="10" y="47" width="55" height="27" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="37" y="65" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">A</text>
  <rect x="65" y="47" width="130" height="27" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="130" y="65" text-anchor="middle" font-size="11" fill="#1e293b">10 coils</text>
  <rect x="195" y="47" width="145" height="27" fill="#fef9c3" stroke="#d97706" stroke-width="1"/>
  <text x="267" y="65" text-anchor="middle" font-size="9" fill="#d97706">Medium ★★</text>
  <rect x="10" y="74" width="55" height="27" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="37" y="92" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">B</text>
  <rect x="65" y="74" width="130" height="27" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="130" y="92" text-anchor="middle" font-size="11" fill="#1e293b">20 coils</text>
  <rect x="195" y="74" width="145" height="27" fill="#dcfce7" stroke="#16a34a" stroke-width="1"/>
  <text x="267" y="92" text-anchor="middle" font-size="9" fill="#15803d">Strongest ★★★</text>
  <rect x="10" y="101" width="55" height="27" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="37" y="119" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">C</text>
  <rect x="65" y="101" width="130" height="27" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="130" y="119" text-anchor="middle" font-size="11" fill="#1e293b">5 coils</text>
  <rect x="195" y="101" width="145" height="27" fill="#fee2e2" stroke="#ef4444" stroke-width="1"/>
  <text x="267" y="119" text-anchor="middle" font-size="9" fill="#dc2626">Weakest ★</text>
</svg>""",
    roles=['protagonist'])

# ── SCI623  both ─────────────────────────────────────────────────────────────
fix('SCI623',
    template="{CHARACTER_0} studies the motion of a toy penguin: the penguin starts on a shelf at point A, falls and passes mid-air point B, then lands on the floor at point C. What is the gravitational force acting on the toy penguin at each point A, B, and C?",
    diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 165" width="280" font-family="Arial,sans-serif">
  <text x="140" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Toy Penguin — Points A, B, C</text>
  <!-- Shelf -->
  <rect x="20" y="55" width="80" height="8" fill="#78716c" rx="2"/>
  <text x="60" y="45" text-anchor="middle" font-size="9" fill="#64748b">shelf</text>
  <!-- Point A (on shelf) -->
  <circle cx="90" cy="50" r="8" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
  <text x="90" y="54" text-anchor="middle" font-size="9" font-weight="bold" fill="#1d4ed8">A</text>
  <text x="110" y="52" font-size="8" fill="#1d4ed8">on shelf</text>
  <!-- Point B (mid-air) -->
  <circle cx="140" cy="100" r="8" fill="#fde68a" stroke="#d97706" stroke-width="2"/>
  <text x="140" y="104" text-anchor="middle" font-size="9" font-weight="bold" fill="#92400e">B</text>
  <text x="162" y="102" font-size="8" fill="#92400e">mid-air</text>
  <!-- Point C (floor) -->
  <rect x="20" y="148" width="240" height="8" fill="#78716c" rx="2"/>
  <circle cx="185" cy="144" r="8" fill="#fca5a5" stroke="#ef4444" stroke-width="2"/>
  <text x="185" y="148" text-anchor="middle" font-size="9" font-weight="bold" fill="#dc2626">C</text>
  <text x="200" y="135" font-size="8" fill="#dc2626">floor</text>
  <!-- Arrows showing fall -->
  <line x1="90" y1="58" x2="120" y2="88" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="148" y1="108" x2="175" y2="135" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4,3"/>
  <!-- Gravity arrows -->
  <line x1="90" y1="50" x2="90" y2="30" stroke="#1d4ed8" stroke-width="1" stroke-dasharray="2,2"/>
</svg>""",
    roles=['protagonist'])

with open('data/questions-science-p6.json', 'w') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

batch = ['SCI614','SCI615','SCI616','SCI617','SCI618','SCI619','SCI620','SCI621','SCI622','SCI623']
for q in data:
    if q['id'] in batch:
        ok_d = q['diagram'] is not None
        ok_c = bool(q.get('placeholder_roles'))
        print(f"{q['id']}: diagram={'OK' if ok_d else 'MISSING'} | char={'OK' if ok_c else 'MISSING'}")
print("Batch 7 done!")
