import json

with open('data/questions-science-p6.json', 'r') as f:
    data = json.load(f)

idx = {q['id']: i for i, q in enumerate(data)}

def fix(qid, template=None, diagram=None, roles=None):
    i = idx[qid]
    if template is not None: data[i]['template'] = template
    if diagram is not None:  data[i]['diagram']  = diagram
    if roles   is not None:  data[i]['placeholder_roles'] = roles

# ── SCI530  char only ────────────────────────────────────────────────────────
fix('SCI530',
    template="{CHARACTER_0} studies a diagram showing two living things — a fern plant and a human baby. Which statement about them is correct?",
    roles=['protagonist'])

# ── SCI533  char only ────────────────────────────────────────────────────────
fix('SCI533',
    template="{CHARACTER_0} studies a diagram of a flower with parts labelled A (stigma), B (anther/stamen), C (ovary), and D (petal). During pollination, pollen grains are transferred from part _____ to part _____.",
    roles=['protagonist'])

# ── SCI534  diagram only ─────────────────────────────────────────────────────
fix('SCI534', diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 370 148" width="370" font-family="Arial,sans-serif">
  <text x="185" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Items Available for the Investigation</text>
  <rect x="10" y="23" width="50" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="35" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Item</text>
  <rect x="60" y="23" width="300" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="210" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Description</text>
  <rect x="10" y="45" width="50" height="24" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="35" y="61" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">A</text>
  <rect x="60" y="45" width="300" height="24" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="210" y="61" text-anchor="middle" font-size="10" fill="#1e293b">Electric balance (measures mass)</text>
  <rect x="10" y="69" width="50" height="24" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="35" y="85" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">B</text>
  <rect x="60" y="69" width="300" height="24" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="210" y="85" text-anchor="middle" font-size="10" fill="#1e293b">Ruler (measures length / distance)</text>
  <rect x="10" y="93" width="50" height="24" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="35" y="109" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">C</text>
  <rect x="60" y="93" width="300" height="24" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="210" y="109" text-anchor="middle" font-size="10" fill="#1e293b">Beaker of water (measures volume)</text>
  <rect x="10" y="117" width="50" height="24" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="35" y="133" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">D</text>
  <rect x="60" y="117" width="300" height="24" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="210" y="133" text-anchor="middle" font-size="10" fill="#1e293b">Fan (produces airflow / wind)</text>
</svg>""")

# ── SCI535  char only ────────────────────────────────────────────────────────
fix('SCI535',
    template="{CHARACTER_0} studies diagrams showing the reproductive systems of a human (parts Q, R, S) and a plant (parts W, X, Y). Q = ovaries, R = uterus, S = vagina; W = ovary/carpel, X = petal, Y = anther. Which parts produce the female reproductive cells?",
    roles=['protagonist'])

# ── SCI536  diagram only ─────────────────────────────────────────────────────
fix('SCI536', diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 135" width="340" font-family="Arial,sans-serif">
  <text x="170" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Traits to Consider</text>
  <rect x="10" y="23" width="40" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Trait</text>
  <rect x="50" y="23" width="280" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="190" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Description</text>
  <rect x="10" y="45" width="40" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="60" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">A</text>
  <rect x="50" y="45" width="280" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="190" y="60" text-anchor="middle" font-size="10" fill="#1e293b">Eye colour</text>
  <rect x="10" y="67" width="40" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="82" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">B</text>
  <rect x="50" y="67" width="280" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="190" y="82" text-anchor="middle" font-size="10" fill="#1e293b">Hair length</text>
  <rect x="10" y="89" width="40" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="104" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">C</text>
  <rect x="50" y="89" width="280" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="190" y="104" text-anchor="middle" font-size="10" fill="#1e293b">Fingerprint pattern</text>
  <rect x="10" y="111" width="40" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="126" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">D</text>
  <rect x="50" y="111" width="280" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="190" y="126" text-anchor="middle" font-size="10" fill="#1e293b">Ability to roll tongue</text>
</svg>""")

# ── SCI539  diagram only ─────────────────────────────────────────────────────
fix('SCI539', diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 370 165" width="370" font-family="Arial,sans-serif">
  <text x="185" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Organisms in the Pond Habitat</text>
  <rect x="10" y="23" width="170" height="22" fill="#bfdbfe" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="95" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e40af">Animals</text>
  <rect x="10" y="45" width="170" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="95" y="60" text-anchor="middle" font-size="10" fill="#1e293b">Caterpillars &amp; Butterflies (1 pop.)</text>
  <rect x="10" y="67" width="170" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="95" y="82" text-anchor="middle" font-size="10" fill="#1e293b">Frogs &amp; Tadpoles (1 pop.)</text>
  <rect x="10" y="89" width="170" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="95" y="104" text-anchor="middle" font-size="10" fill="#1e293b">Fish</text>
  <rect x="10" y="111" width="170" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="95" y="126" text-anchor="middle" font-size="10" fill="#1e293b">Catfish</text>
  <rect x="190" y="23" width="170" height="22" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
  <text x="275" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">Plants</text>
  <rect x="190" y="45" width="170" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="275" y="60" text-anchor="middle" font-size="10" fill="#1e293b">Water Lilies</text>
  <rect x="190" y="67" width="170" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="275" y="82" text-anchor="middle" font-size="10" fill="#1e293b">Arrowhead Plants</text>
  <rect x="190" y="89" width="170" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="275" y="104" text-anchor="middle" font-size="10" fill="#1e293b">Water Hyacinth</text>
  <text x="185" y="150" text-anchor="middle" font-size="9" fill="#64748b">All organisms in the pond together form a community.</text>
</svg>""")

# ── SCI541  both ─────────────────────────────────────────────────────────────
fix('SCI541',
    template="{CHARACTER_0} studies a diagram of penguins in their habitat, with their young in the centre. The habitat has: Temperature = 0°C, Wind speed = 180 km/h. Four students stated adaptations and reasons:\nStudent A: densely packed feathers — trap air to reduce heat lost\nStudent B: webbed feet — swim faster away from predators\nStudent C: standing closely packed together — reduce exposure to strong wind and losing heat\nStudent D: standing with young in the centre — protect the young from predators\nWhich student(s) is/are correct?",
    diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 410 162" width="410" font-family="Arial,sans-serif">
  <text x="205" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Student Statements — Penguin Adaptations</text>
  <rect x="10" y="23" width="38" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="29" y="38" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e293b">Std.</text>
  <rect x="48" y="23" width="160" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="128" y="38" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e293b">Adaptation</text>
  <rect x="208" y="23" width="192" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="304" y="38" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e293b">Reason Given</text>
  <rect x="10" y="45" width="38" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="29" y="62" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">A</text>
  <rect x="48" y="45" width="160" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="128" y="61" text-anchor="middle" font-size="9" fill="#1e293b">Densely packed feathers</text>
  <rect x="208" y="45" width="192" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="304" y="61" text-anchor="middle" font-size="9" fill="#1e293b">Traps air; reduces heat loss</text>
  <rect x="10" y="70" width="38" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="29" y="87" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">B</text>
  <rect x="48" y="70" width="160" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="128" y="86" text-anchor="middle" font-size="9" fill="#1e293b">Webbed feet</text>
  <rect x="208" y="70" width="192" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="304" y="86" text-anchor="middle" font-size="9" fill="#1e293b">Swim faster from predators</text>
  <rect x="10" y="95" width="38" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="29" y="112" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">C</text>
  <rect x="48" y="95" width="160" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="128" y="111" text-anchor="middle" font-size="9" fill="#1e293b">Stand closely packed together</text>
  <rect x="208" y="95" width="192" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="304" y="111" text-anchor="middle" font-size="9" fill="#1e293b">Reduce wind exposure; keep warm</text>
  <rect x="10" y="120" width="38" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="29" y="137" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">D</text>
  <rect x="48" y="120" width="160" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="128" y="136" text-anchor="middle" font-size="9" fill="#1e293b">Young in centre of group</text>
  <rect x="208" y="120" width="192" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="304" y="136" text-anchor="middle" font-size="9" fill="#1e293b">Protects young from predators</text>
</svg>""",
    roles=['protagonist'])

# ── SCI542  diagram only ─────────────────────────────────────────────────────
fix('SCI542', diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 155" width="380" font-family="Arial,sans-serif">
  <text x="190" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Possible Effects of Deforestation</text>
  <rect x="140" y="25" width="100" height="32" fill="#86efac" stroke="#16a34a" stroke-width="2" rx="5"/>
  <text x="190" y="42" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">Large-scale</text>
  <text x="190" y="53" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">Deforestation</text>
  <line x1="140" y1="41" x2="95" y2="68" stroke="#64748b" stroke-width="1.5"/>
  <line x1="190" y1="57" x2="190" y2="88" stroke="#64748b" stroke-width="1.5"/>
  <line x1="240" y1="41" x2="285" y2="68" stroke="#64748b" stroke-width="1.5"/>
  <rect x="10" y="68" width="120" height="32" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5" rx="4"/>
  <text x="70" y="83" text-anchor="middle" font-size="9" fill="#dc2626">↑ CO₂ levels</text>
  <text x="70" y="95" text-anchor="middle" font-size="9" fill="#dc2626">(global warming)</text>
  <rect x="130" y="88" width="120" height="32" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5" rx="4"/>
  <text x="190" y="103" text-anchor="middle" font-size="9" fill="#dc2626">Soil erosion</text>
  <text x="190" y="115" text-anchor="middle" font-size="9" fill="#dc2626">&amp; flooding</text>
  <rect x="250" y="68" width="120" height="32" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5" rx="4"/>
  <text x="310" y="83" text-anchor="middle" font-size="9" fill="#dc2626">Loss of animal</text>
  <text x="310" y="95" text-anchor="middle" font-size="9" fill="#dc2626">habitats</text>
</svg>""")

# ── SCI543  char only ────────────────────────────────────────────────────────
fix('SCI543',
    template="{CHARACTER_0} observes a fisherman pulling a net full of fish onto his boat. Based on the properties shown in the table, which material is most suitable for making the net?\n(1) Material A: strong ✓, waterproof ✗, flexible ✗\n(2) Material B: strong ✗, waterproof ✓, flexible ✗\n(3) Material C: strong ✗, waterproof ✓, flexible ✓\n(4) Material D: strong ✓, waterproof ✗, flexible ✓",
    roles=['protagonist'])

# ── SCI545  both ─────────────────────────────────────────────────────────────
fix('SCI545',
    template="{CHARACTER_0} sets up an experiment: a container is filled with substance M and sealed airtight with a stopper. A 10 kg weight is placed on the stopper and the stopper moves downwards. What could be a possible reason for this observation?",
    diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 175" width="300" font-family="Arial,sans-serif">
  <text x="150" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Experiment Setup</text>
  <rect x="100" y="22" width="100" height="20" fill="#94a3b8" stroke="#64748b" stroke-width="1.5" rx="3"/>
  <text x="150" y="35" text-anchor="middle" font-size="9" font-weight="bold" fill="white">10 kg weight</text>
  <rect x="118" y="42" width="64" height="16" fill="#cbd5e1" stroke="#64748b" stroke-width="1.5" rx="2"/>
  <text x="150" y="53" text-anchor="middle" font-size="9" fill="#1e293b">stopper ↓</text>
  <rect x="95" y="58" width="110" height="82" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" rx="4"/>
  <text x="150" y="92" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">Substance M</text>
  <text x="150" y="108" text-anchor="middle" font-size="9" fill="#1d4ed8">(fills container)</text>
  <text x="150" y="122" text-anchor="middle" font-size="9" fill="#1d4ed8">sealed airtight</text>
  <text x="150" y="152" text-anchor="middle" font-size="10" font-weight="bold" fill="#dc2626">Stopper moves DOWN ↓</text>
  <text x="150" y="167" text-anchor="middle" font-size="9" fill="#64748b">Why does this happen?</text>
</svg>""",
    roles=['protagonist'])

with open('data/questions-science-p6.json', 'w') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

batch = ['SCI530','SCI533','SCI534','SCI535','SCI536','SCI539','SCI541','SCI542','SCI543','SCI545']
for q in data:
    if q['id'] in batch:
        ok_d = q['diagram'] is not None
        ok_c = bool(q.get('placeholder_roles'))
        print(f"{q['id']}: diagram={'OK' if ok_d else 'MISSING'} | char={'OK' if ok_c else 'MISSING'}")
print("Batch 1 done!")
