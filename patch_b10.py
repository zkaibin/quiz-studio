import json

with open('data/questions-science-p6.json', 'r') as f:
    data = json.load(f)

idx = {q['id']: i for i, q in enumerate(data)}

def fix(qid, template=None, diagram=None, roles=None):
    i = idx[qid]
    if template is not None: data[i]['template'] = template
    if diagram is not None:  data[i]['diagram']  = diagram
    if roles   is not None:  data[i]['placeholder_roles'] = roles

# ── SCI645  diagram only ─────────────────────────────────────────────────────
fix('SCI645', diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 145" width="340" font-family="Arial,sans-serif">
  <text x="170" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Crushing a Can of Juice</text>
  <!-- Before -->
  <rect x="20" y="28" width="135" height="102" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5" rx="5"/>
  <text x="87" y="46" text-anchor="middle" font-size="10" font-weight="bold" fill="#1d4ed8">Before Crushing</text>
  <!-- Can -->
  <rect x="55" y="55" width="65" height="60" fill="#fca5a5" stroke="#ef4444" stroke-width="2" rx="4"/>
  <text x="87" y="80" text-anchor="middle" font-size="8" fill="#1e293b">Volume: 330 cm³</text>
  <text x="87" y="93" text-anchor="middle" font-size="8" fill="#1e293b">Mass: 380 g</text>
  <text x="87" y="106" text-anchor="middle" font-size="8" fill="#1e293b">juice inside</text>
  <!-- After -->
  <rect x="185" y="28" width="135" height="102" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5" rx="5"/>
  <text x="252" y="46" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">After Crushing</text>
  <!-- Flat can -->
  <rect x="215" y="72" width="75" height="12" fill="#fca5a5" stroke="#ef4444" stroke-width="2" rx="2"/>
  <text x="252" y="68" text-anchor="middle" font-size="8" fill="#1e293b">can crushed flat</text>
  <text x="252" y="96" text-anchor="middle" font-size="8" fill="#1e293b">Volume of juice: ?</text>
  <text x="252" y="110" text-anchor="middle" font-size="8" fill="#1e293b">Mass of juice: ?</text>
  <!-- Arrow -->
  <text x="170" y="85" text-anchor="middle" font-size="16" fill="#64748b">→</text>
</svg>""")

# ── SCI646  diagram only ─────────────────────────────────────────────────────
fix('SCI646', diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 148" width="350" font-family="Arial,sans-serif">
  <text x="175" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Container M vs Container N</text>
  <rect x="10" y="25" width="160" height="110" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5" rx="5"/>
  <text x="90" y="44" text-anchor="middle" font-size="10" font-weight="bold" fill="#1d4ed8">Container M</text>
  <text x="90" y="60" text-anchor="middle" font-size="9" fill="#1e293b">Poor conductor of heat</text>
  <text x="90" y="76" text-anchor="middle" font-size="9" fill="#1e293b">• Traps heat well</text>
  <text x="90" y="92" text-anchor="middle" font-size="9" fill="#1e293b">• Good for: keeping</text>
  <text x="90" y="105" text-anchor="middle" font-size="9" fill="#1e293b">  hot things HOT 🍲</text>
  <text x="90" y="120" text-anchor="middle" font-size="8" fill="#64748b">(e.g. foam, rubber)</text>
  <rect x="180" y="25" width="160" height="110" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5" rx="5"/>
  <text x="260" y="44" text-anchor="middle" font-size="10" font-weight="bold" fill="#dc2626">Container N</text>
  <text x="260" y="60" text-anchor="middle" font-size="9" fill="#1e293b">Good conductor of heat</text>
  <text x="260" y="76" text-anchor="middle" font-size="9" fill="#1e293b">• Transfers heat quickly</text>
  <text x="260" y="92" text-anchor="middle" font-size="9" fill="#1e293b">• Good for: allowing</text>
  <text x="260" y="105" text-anchor="middle" font-size="9" fill="#1e293b">  heat to escape ❄</text>
  <text x="260" y="120" text-anchor="middle" font-size="8" fill="#64748b">(e.g. metal)</text>
</svg>""")

# ── SCI647  diagram only ─────────────────────────────────────────────────────
fix('SCI647', diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 155" width="300" font-family="Arial,sans-serif">
  <text x="150" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Why Can't the Observer See the Ball?</text>
  <!-- Room floor -->
  <rect x="10" y="140" width="280" height="8" fill="#94a3b8" rx="2"/>
  <!-- Person -->
  <circle cx="55" cy="85" r="14" fill="#fde68a" stroke="#d97706" stroke-width="1.5"/>
  <text x="55" y="89" text-anchor="middle" font-size="10">👁</text>
  <rect x="46" y="99" width="18" height="30" fill="#93c5fd" stroke="#3b82f6" stroke-width="1" rx="2"/>
  <text x="55" y="145" text-anchor="middle" font-size="8" fill="#64748b">observer</text>
  <!-- Ball behind person -->
  <circle cx="235" cy="125" r="12" fill="#fca5a5" stroke="#ef4444" stroke-width="2"/>
  <text x="235" y="129" text-anchor="middle" font-size="8" fill="#dc2626">ball</text>
  <text x="235" y="145" text-anchor="middle" font-size="8" fill="#64748b">behind</text>
  <!-- Light rays from ball blocked -->
  <line x1="223" y1="125" x2="90" y2="95" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="5,3"/>
  <!-- Blocked symbol -->
  <line x1="135" y1="107" x2="148" y2="99" stroke="#dc2626" stroke-width="2.5"/>
  <line x1="148" y1="107" x2="135" y2="99" stroke="#dc2626" stroke-width="2.5"/>
  <!-- Explanation -->
  <text x="150" y="40" text-anchor="middle" font-size="9" fill="#64748b">Light travels in straight lines.</text>
  <text x="150" y="55" text-anchor="middle" font-size="9" fill="#64748b">The observer blocks light from ball</text>
  <text x="150" y="70" text-anchor="middle" font-size="9" fill="#64748b">reaching his eyes.</text>
</svg>""")

# ── SCI648  both ─────────────────────────────────────────────────────────────
fix('SCI648',
    template="{CHARACTER_0} tests four bar magnets P, Q, R, and S. Magnet S can attract pins from a distance of 2 cm. Magnet P can attract the same pins from a distance of 5 cm. What can be concluded about magnets P and S?",
    diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 130" width="350" font-family="Arial,sans-serif">
  <text x="175" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Magnet Strength Test — Distance</text>
  <rect x="10" y="23" width="40" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Magnet</text>
  <rect x="50" y="23" width="140" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="120" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Attracts pins from</text>
  <rect x="190" y="23" width="150" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="265" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Conclusion</text>
  <rect x="10" y="45" width="40" height="28" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="63" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">S</text>
  <rect x="50" y="45" width="140" height="28" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="120" y="63" text-anchor="middle" font-size="11" fill="#1e293b">2 cm</text>
  <rect x="190" y="45" width="150" height="28" fill="#fee2e2" stroke="#ef4444" stroke-width="1"/>
  <text x="265" y="63" text-anchor="middle" font-size="9" fill="#dc2626">Weaker field / shorter range</text>
  <rect x="10" y="73" width="40" height="28" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="91" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">P</text>
  <rect x="50" y="73" width="140" height="28" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="120" y="91" text-anchor="middle" font-size="11" fill="#1e293b">5 cm</text>
  <rect x="190" y="73" width="150" height="28" fill="#dcfce7" stroke="#16a34a" stroke-width="1"/>
  <text x="265" y="91" text-anchor="middle" font-size="9" fill="#15803d">Stronger field / longer range ✓</text>
</svg>""",
    roles=['protagonist'])

# ── SCI649  both ─────────────────────────────────────────────────────────────
fix('SCI649',
    template="{CHARACTER_0} tests two springs A and B. Spring B is longer than Spring A when no load is on them. When the same load is applied to each spring, Spring A stretches more than Spring B. Which row correctly describes the two springs?",
    diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 148" width="340" font-family="Arial,sans-serif">
  <text x="170" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Springs A and B — Rest Length vs Stretch</text>
  <!-- Spring A -->
  <rect x="20" y="28" width="140" height="108" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5" rx="5"/>
  <text x="90" y="46" text-anchor="middle" font-size="10" font-weight="bold" fill="#1d4ed8">Spring A</text>
  <text x="90" y="60" text-anchor="middle" font-size="8" fill="#64748b">Shorter at rest</text>
  <!-- Spring coil A (short) -->
  <path d="M 80 68 Q 88 73 96 68 Q 104 63 112 68 Q 120 73 112 78 Q 104 83 96 78 Q 88 73 80 78" fill="none" stroke="#3b82f6" stroke-width="2"/>
  <text x="90" y="95" text-anchor="middle" font-size="8" fill="#1e293b">→ stretches MORE</text>
  <text x="90" y="108" text-anchor="middle" font-size="9" font-weight="bold" fill="#dc2626">More elastic (weaker spring)</text>
  <!-- Spring B -->
  <rect x="180" y="28" width="140" height="108" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5" rx="5"/>
  <text x="250" y="46" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">Spring B</text>
  <text x="250" y="60" text-anchor="middle" font-size="8" fill="#64748b">Longer at rest</text>
  <!-- Spring coil B (longer) -->
  <path d="M 225 65 Q 233 70 241 65 Q 249 60 257 65 Q 265 70 273 65 Q 281 60 289 65 Q 281 70 273 75 Q 265 80 257 75 Q 249 70 241 75 Q 233 80 225 75" fill="none" stroke="#16a34a" stroke-width="2"/>
  <text x="250" y="95" text-anchor="middle" font-size="8" fill="#1e293b">→ stretches LESS</text>
  <text x="250" y="108" text-anchor="middle" font-size="9" font-weight="bold" fill="#15803d">Less elastic (stiffer spring)</text>
</svg>""",
    roles=['protagonist'])

# ── SCI650  diagram only ─────────────────────────────────────────────────────
fix('SCI650', diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 165" width="280" font-family="Arial,sans-serif">
  <text x="140" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Graduation Cap Thrown Upward</text>
  <!-- Person throwing -->
  <circle cx="50" cy="115" r="14" fill="#fde68a" stroke="#d97706" stroke-width="1.5"/>
  <text x="50" y="119" text-anchor="middle" font-size="10">🎓</text>
  <rect x="42" y="129" width="16" height="25" fill="#93c5fd" stroke="#3b82f6" stroke-width="1" rx="2"/>
  <!-- Path of cap -->
  <path d="M 75 100 Q 140 30 205 100" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5,4"/>
  <!-- Point X (thrown) -->
  <circle cx="75" cy="100" r="7" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
  <text x="75" y="104" text-anchor="middle" font-size="9" font-weight="bold" fill="#1d4ed8">X</text>
  <text x="55" y="85" font-size="8" fill="#1d4ed8">thrown up</text>
  <!-- Point Y (highest) -->
  <circle cx="140" cy="32" r="7" fill="#fde68a" stroke="#d97706" stroke-width="2"/>
  <text x="140" y="36" text-anchor="middle" font-size="9" font-weight="bold" fill="#92400e">Y</text>
  <text x="155" y="30" font-size="8" fill="#92400e">highest</text>
  <!-- Point Z (back down) -->
  <circle cx="205" cy="100" r="7" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
  <text x="205" y="104" text-anchor="middle" font-size="9" font-weight="bold" fill="#15803d">Z</text>
  <text x="215" y="90" font-size="8" fill="#15803d">falls back</text>
  <!-- Gravity arrows -->
  <line x1="75" y1="100" x2="75" y2="120" stroke="#dc2626" stroke-width="1.5"/>
  <line x1="140" y1="32" x2="140" y2="52" stroke="#dc2626" stroke-width="1.5"/>
  <line x1="205" y1="100" x2="205" y2="120" stroke="#dc2626" stroke-width="1.5"/>
  <text x="140" y="148" text-anchor="middle" font-size="8" fill="#dc2626">Gravity acts downward at all 3 points</text>
</svg>""")

# ── SCI651  char only ────────────────────────────────────────────────────────
fix('SCI651',
    template="{CHARACTER_0} studies a device: a bar magnet is attached to a wheel. Water falls and turns the wheel, causing the magnet to move past a coil of wire connected to a circuit, generating electricity. What is the complete energy conversion chain?",
    roles=['protagonist'])

with open('data/questions-science-p6.json', 'w') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

batch = ['SCI645','SCI646','SCI647','SCI648','SCI649','SCI650','SCI651']
for q in data:
    if q['id'] in batch:
        ok_d = q['diagram'] is not None
        ok_c = bool(q.get('placeholder_roles'))
        print(f"{q['id']}: diagram={'OK' if ok_d else 'MISSING'} | char={'OK' if ok_c else 'MISSING'}")
print("Batch 10 done!")
