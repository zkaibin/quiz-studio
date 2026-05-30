import json

with open('data/questions-science-p6.json', 'r') as f:
    data = json.load(f)

idx = {q['id']: i for i, q in enumerate(data)}

def fix(qid, template=None, diagram=None, roles=None):
    i = idx[qid]
    if template is not None: data[i]['template'] = template
    if diagram is not None:  data[i]['diagram']  = diagram
    if roles   is not None:  data[i]['placeholder_roles'] = roles

# ── SCI575  both ─────────────────────────────────────────────────────────────
fix('SCI575',
    template="{CHARACTER_0} sets up an experiment: a container with a capacity of 500 cm³ has 50 cm³ of water added to it. Then 50 cm³ of air is pumped in. Compared to the start, which of the following correctly shows the changes in the mass and volume of air in the container?",
    diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 170" width="380" font-family="Arial,sans-serif">
  <text x="190" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Container Experiment — Adding Water Then Air</text>
  <!-- Step 1 -->
  <text x="85" y="35" text-anchor="middle" font-size="10" font-weight="bold" fill="#1d4ed8">Start (empty)</text>
  <rect x="45" y="42" width="80" height="100" fill="#f1f5f9" stroke="#64748b" stroke-width="2" rx="3"/>
  <text x="85" y="98" text-anchor="middle" font-size="9" fill="#94a3b8">air (500 cm³)</text>
  <text x="85" y="150" text-anchor="middle" font-size="9" fill="#64748b">capacity: 500 cm³</text>
  <!-- Arrow 1 -->
  <text x="160" y="96" font-size="16" fill="#16a34a">→</text>
  <!-- Step 2 -->
  <text x="230" y="35" text-anchor="middle" font-size="10" font-weight="bold" fill="#1d4ed8">After adding water</text>
  <rect x="190" y="42" width="80" height="100" fill="#f1f5f9" stroke="#64748b" stroke-width="2" rx="3"/>
  <rect x="191" y="117" width="78" height="24" fill="#93c5fd" stroke="#3b82f6" stroke-width="1"/>
  <text x="230" y="132" text-anchor="middle" font-size="8" fill="#1e40af">water 50 cm³</text>
  <text x="230" y="98" text-anchor="middle" font-size="8" fill="#94a3b8">air 450 cm³</text>
  <!-- Arrow 2 -->
  <text x="306" y="96" font-size="16" fill="#16a34a">→</text>
  <!-- Step 3 -->
  <text x="350" y="35" text-anchor="middle" font-size="9" font-weight="bold" fill="#1d4ed8">+50 cm³ air pumped in</text>
  <rect x="320" y="42" width="55" height="100" fill="#f1f5f9" stroke="#64748b" stroke-width="2" rx="3"/>
  <rect x="321" y="117" width="53" height="24" fill="#93c5fd" stroke="#3b82f6" stroke-width="1"/>
  <text x="347" y="88" text-anchor="middle" font-size="7" fill="#64748b">compressed</text>
  <text x="347" y="99" text-anchor="middle" font-size="7" fill="#64748b">air inside</text>
</svg>""",
    roles=['protagonist'])

# ── SCI577  both ─────────────────────────────────────────────────────────────
fix('SCI577',
    template="{CHARACTER_0} compares two objects in a circuit. Object K (electromagnet) attracted 19 pins at 5 cm distance and 0 pins at 20 cm (bulb lit throughout). The experiment was repeated with Object L (same circuit, bulb lit). Object L attracted 0 pins at ALL distances (5, 10, 15, 20 cm). Which of the following explains these results?",
    diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 150" width="380" font-family="Arial,sans-serif">
  <text x="190" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Electromagnet Pin Attraction Results</text>
  <rect x="10" y="23" width="55" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="37" y="38" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e293b">Object</text>
  <rect x="65" y="23" width="80" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="105" y="38" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e293b">Pins @ 5 cm</text>
  <rect x="145" y="23" width="80" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="185" y="38" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e293b">Pins @ 20 cm</text>
  <rect x="225" y="23" width="80" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="265" y="38" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e293b">Bulb lit?</text>
  <rect x="305" y="23" width="65" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="337" y="38" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e293b">Type</text>
  <!-- Object K -->
  <rect x="10" y="45" width="55" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="37" y="61" text-anchor="middle" font-size="10" font-weight="bold" fill="#1d4ed8">K</text>
  <rect x="65" y="45" width="80" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="105" y="61" text-anchor="middle" font-size="10" fill="#15803d">19 pins ✓</text>
  <rect x="145" y="45" width="80" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="185" y="61" text-anchor="middle" font-size="10" fill="#dc2626">0 pins</text>
  <rect x="225" y="45" width="80" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="265" y="61" text-anchor="middle" font-size="10" fill="#15803d">Yes ✓</text>
  <rect x="305" y="45" width="65" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="337" y="61" text-anchor="middle" font-size="9" fill="#1e293b">Electromagnet</text>
  <!-- Object L -->
  <rect x="10" y="70" width="55" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="37" y="86" text-anchor="middle" font-size="10" font-weight="bold" fill="#dc2626">L</text>
  <rect x="65" y="70" width="80" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="105" y="86" text-anchor="middle" font-size="10" fill="#dc2626">0 pins</text>
  <rect x="145" y="70" width="80" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="185" y="86" text-anchor="middle" font-size="10" fill="#dc2626">0 pins</text>
  <rect x="225" y="70" width="80" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="265" y="86" text-anchor="middle" font-size="10" fill="#15803d">Yes ✓</text>
  <rect x="305" y="70" width="65" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="337" y="86" text-anchor="middle" font-size="9" fill="#1e293b">?</text>
  <text x="190" y="118" text-anchor="middle" font-size="9" fill="#64748b">Object L conducts electricity (bulb lit) but attracts 0 pins at all distances.</text>
  <text x="190" y="132" text-anchor="middle" font-size="9" fill="#64748b">What kind of object is L?</text>
</svg>""",
    roles=['protagonist'])

# ── SCI578  diagram only ─────────────────────────────────────────────────────
fix('SCI578', diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 140" width="380" font-family="Arial,sans-serif">
  <text x="190" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Organisms Under Study</text>
  <rect x="10" y="25" width="40" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="40" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Label</text>
  <rect x="50" y="25" width="140" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="120" y="40" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Organism</text>
  <rect x="190" y="25" width="180" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="280" y="40" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Group</text>
  <rect x="10" y="47" width="40" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="62" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">A</text>
  <rect x="50" y="47" width="140" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="120" y="62" text-anchor="middle" font-size="10" fill="#1e293b">Moss plant</text>
  <rect x="190" y="47" width="180" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="280" y="62" text-anchor="middle" font-size="9" fill="#64748b">Non-flowering plant (spores)</text>
  <rect x="10" y="69" width="40" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="84" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">B</text>
  <rect x="50" y="69" width="140" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="120" y="84" text-anchor="middle" font-size="10" fill="#1e293b">Mushroom</text>
  <rect x="190" y="69" width="180" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="280" y="84" text-anchor="middle" font-size="9" fill="#64748b">Fungus</text>
  <rect x="10" y="91" width="40" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="106" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">C</text>
  <rect x="50" y="91" width="140" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="120" y="106" text-anchor="middle" font-size="10" fill="#1e293b">Bird's nest fern</text>
  <rect x="190" y="91" width="180" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="280" y="106" text-anchor="middle" font-size="9" fill="#64748b">Non-flowering plant (spores)</text>
  <rect x="10" y="113" width="40" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="128" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">D</text>
  <rect x="50" y="113" width="140" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="120" y="128" text-anchor="middle" font-size="10" fill="#1e293b">Cherry tree</text>
  <rect x="190" y="113" width="180" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="280" y="128" text-anchor="middle" font-size="9" fill="#64748b">Flowering plant (seeds)</text>
</svg>""")

# ── SCI579  diagram only ─────────────────────────────────────────────────────
fix('SCI579', diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 150" width="380" font-family="Arial,sans-serif">
  <text x="190" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Animal Classification — X, Y, Z</text>
  <rect x="10" y="23" width="40" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Animal</text>
  <rect x="50" y="23" width="80" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="90" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Species</text>
  <rect x="130" y="23" width="110" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="185" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Key Features</text>
  <rect x="240" y="23" width="130" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="305" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Group?</text>
  <rect x="10" y="45" width="40" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="62" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">X</text>
  <rect x="50" y="45" width="80" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="90" y="62" text-anchor="middle" font-size="10" fill="#1e293b">Wolf</text>
  <rect x="130" y="45" width="110" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="185" y="55" text-anchor="middle" font-size="8" fill="#1e293b">hair, 4 limbs,</text>
  <text x="185" y="66" text-anchor="middle" font-size="8" fill="#1e293b">warm-blooded</text>
  <rect x="240" y="45" width="130" height="25" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1"/>
  <text x="305" y="62" text-anchor="middle" font-size="9" fill="#64748b">Mammal?</text>
  <rect x="10" y="70" width="40" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="87" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">Y</text>
  <rect x="50" y="70" width="80" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="90" y="87" text-anchor="middle" font-size="10" fill="#1e293b">Goldfish</text>
  <rect x="130" y="70" width="110" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="185" y="80" text-anchor="middle" font-size="8" fill="#1e293b">scales, gills,</text>
  <text x="185" y="91" text-anchor="middle" font-size="8" fill="#1e293b">cold-blooded</text>
  <rect x="240" y="70" width="130" height="25" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1"/>
  <text x="305" y="87" text-anchor="middle" font-size="9" fill="#64748b">Fish?</text>
  <rect x="10" y="95" width="40" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="112" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">Z</text>
  <rect x="50" y="95" width="80" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="90" y="112" text-anchor="middle" font-size="10" fill="#1e293b">Bat</text>
  <rect x="130" y="95" width="110" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="185" y="105" text-anchor="middle" font-size="8" fill="#1e293b">hair, wings,</text>
  <text x="185" y="116" text-anchor="middle" font-size="8" fill="#1e293b">warm-blooded</text>
  <rect x="240" y="95" width="130" height="25" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1"/>
  <text x="305" y="112" text-anchor="middle" font-size="9" fill="#64748b">Mammal / Bird?</text>
</svg>""")

# ── SCI580  char only ────────────────────────────────────────────────────────
fix('SCI580',
    template="{CHARACTER_0} studies a diagram showing different setups to find out which conditions are needed for germination. Water, air, and warmth are tested individually. Which combination of conditions is needed for a seed to germinate?",
    roles=['protagonist'])

# ── SCI581  both ─────────────────────────────────────────────────────────────
fix('SCI581',
    template="{CHARACTER_0} studies two animals L and M with the following characteristics. Which row correctly matches the characteristics to animals L and M?\n• Animal L: has 3 life stages, young resembles the adult\n• Animal M: young lives in water, undergoes complete metamorphosis",
    diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 130" width="380" font-family="Arial,sans-serif">
  <text x="190" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Animal Characteristics</text>
  <rect x="10" y="23" width="55" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="37" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Animal</text>
  <rect x="65" y="23" width="305" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="217" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Characteristics</text>
  <rect x="10" y="45" width="55" height="35" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="37" y="67" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">L</text>
  <rect x="65" y="45" width="305" height="35" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="217" y="59" text-anchor="middle" font-size="9" fill="#1e293b">3 life stages • Young resembles the adult</text>
  <text x="217" y="73" text-anchor="middle" font-size="9" fill="#1e293b">(incomplete metamorphosis)</text>
  <rect x="10" y="80" width="55" height="40" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="37" y="104" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">M</text>
  <rect x="65" y="80" width="305" height="40" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="217" y="94" text-anchor="middle" font-size="9" fill="#1e293b">Young lives in water • Complete metamorphosis</text>
  <text x="217" y="108" text-anchor="middle" font-size="9" fill="#1e293b">(4 stages: egg → larva → pupa → adult)</text>
</svg>""",
    roles=['protagonist'])

# ── SCI582  both ─────────────────────────────────────────────────────────────
fix('SCI582',
    template="{CHARACTER_0} studies a diagram of a human female reproductive system (parts P, Q, R, S) and a flower (parts W, X, Y, Z). In which structures are the reproductive cells stored?\nHuman: Q = ovaries, R = fallopian tubes\nFlower: Y = anthers, Z = ovary",
    diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 165" width="380" font-family="Arial,sans-serif">
  <text x="190" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Reproductive Structures Comparison</text>
  <rect x="10" y="25" width="175" height="128" fill="#fce7f3" stroke="#db2777" stroke-width="1.5" rx="5"/>
  <text x="97" y="42" text-anchor="middle" font-size="10" font-weight="bold" fill="#be185d">Human Female System</text>
  <text x="97" y="58" text-anchor="middle" font-size="9" fill="#1e293b">P: uterus</text>
  <text x="97" y="73" text-anchor="middle" font-size="9" fill="#1e293b">Q: ovaries (eggs produced here)</text>
  <text x="97" y="88" text-anchor="middle" font-size="9" fill="#1e293b">R: fallopian tubes</text>
  <text x="97" y="103" text-anchor="middle" font-size="9" fill="#1e293b">S: vagina</text>
  <text x="97" y="140" text-anchor="middle" font-size="8" fill="#64748b">Egg cell: produced in Q (ovaries)</text>
  <rect x="195" y="25" width="175" height="128" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5" rx="5"/>
  <text x="282" y="42" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">Flower</text>
  <text x="282" y="58" text-anchor="middle" font-size="9" fill="#1e293b">W: stigma</text>
  <text x="282" y="73" text-anchor="middle" font-size="9" fill="#1e293b">X: petal</text>
  <text x="282" y="88" text-anchor="middle" font-size="9" fill="#1e293b">Y: anthers (pollen/sperm here)</text>
  <text x="282" y="103" text-anchor="middle" font-size="9" fill="#1e293b">Z: ovary (egg cells here)</text>
  <text x="282" y="140" text-anchor="middle" font-size="8" fill="#64748b">Pollen: produced in Y (anthers)</text>
</svg>""",
    roles=['protagonist'])

# ── SCI585  both ─────────────────────────────────────────────────────────────
fix('SCI585',
    template="{CHARACTER_0} wants to investigate the effect of leaves on the amount of water vapour given out by a plant. Setup 1: a potted plant with all its leaves intact, placed in the garden. What should Setup 2 be to make this a fair test?",
    diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 155" width="380" font-family="Arial,sans-serif">
  <text x="190" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Investigating the Effect of Leaves on Water Vapour</text>
  <!-- Setup 1 -->
  <rect x="20" y="30" width="155" height="110" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5" rx="5"/>
  <text x="97" y="47" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">Setup 1 (given)</text>
  <text x="97" y="63" text-anchor="middle" font-size="9" fill="#1e293b">Plant: WITH all leaves</text>
  <text x="97" y="78" text-anchor="middle" font-size="9" fill="#1e293b">Location: garden (outside)</text>
  <text x="97" y="93" text-anchor="middle" font-size="9" fill="#1e293b">Species: same type of plant</text>
  <text x="97" y="125" text-anchor="middle" font-size="8" fill="#15803d">Variable: leaves present</text>
  <!-- Setup 2 -->
  <rect x="205" y="30" width="155" height="110" fill="#fef9c3" stroke="#d97706" stroke-width="1.5" rx="5"/>
  <text x="282" y="47" text-anchor="middle" font-size="10" font-weight="bold" fill="#92400e">Setup 2 (fair test)</text>
  <text x="282" y="63" text-anchor="middle" font-size="9" fill="#1e293b">Plant: WITHOUT leaves</text>
  <text x="282" y="78" text-anchor="middle" font-size="9" fill="#1e293b">Location: same (garden)</text>
  <text x="282" y="93" text-anchor="middle" font-size="9" fill="#1e293b">Species: same type of plant</text>
  <text x="282" y="125" text-anchor="middle" font-size="8" fill="#92400e">Only leaves changed</text>
</svg>""",
    roles=['protagonist'])

# ── SCI586  both ─────────────────────────────────────────────────────────────
fix('SCI586',
    template="{CHARACTER_0} sets up four beakers to investigate the effect of leaves on water vapour release:\nSetup A: plant with leaves, placed in sun\nSetup B: plant without leaves, placed in shade\nSetup C: plant without leaves, placed in sun\nSetup D: plant with leaves, placed in shade\nWhich two setups should {CHARACTER_0} compare to find out how leaves affect water vapour release?",
    diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 148" width="380" font-family="Arial,sans-serif">
  <text x="190" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Experimental Setups — Leaves and Water Vapour</text>
  <rect x="10" y="23" width="40" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Setup</text>
  <rect x="50" y="23" width="150" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="125" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Leaves</text>
  <rect x="200" y="23" width="170" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="285" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Light condition</text>
  <rect x="10" y="45" width="40" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="60" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">A</text>
  <rect x="50" y="45" width="150" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="125" y="60" text-anchor="middle" font-size="10" fill="#15803d">With leaves ✓</text>
  <rect x="200" y="45" width="170" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="285" y="60" text-anchor="middle" font-size="10" fill="#d97706">Sun ☀</text>
  <rect x="10" y="67" width="40" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="82" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">B</text>
  <rect x="50" y="67" width="150" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="125" y="82" text-anchor="middle" font-size="10" fill="#dc2626">Without leaves ✗</text>
  <rect x="200" y="67" width="170" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="285" y="82" text-anchor="middle" font-size="10" fill="#64748b">Shade 🌥</text>
  <rect x="10" y="89" width="40" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="104" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">C</text>
  <rect x="50" y="89" width="150" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="125" y="104" text-anchor="middle" font-size="10" fill="#dc2626">Without leaves ✗</text>
  <rect x="200" y="89" width="170" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="285" y="104" text-anchor="middle" font-size="10" fill="#d97706">Sun ☀</text>
  <rect x="10" y="111" width="40" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="30" y="126" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">D</text>
  <rect x="50" y="111" width="150" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="125" y="126" text-anchor="middle" font-size="10" fill="#15803d">With leaves ✓</text>
  <rect x="200" y="111" width="170" height="22" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="285" y="126" text-anchor="middle" font-size="10" fill="#64748b">Shade 🌥</text>
</svg>""",
    roles=['protagonist'])

# ── SCI587  diagram only ─────────────────────────────────────────────────────
fix('SCI587', diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 145" width="360" font-family="Arial,sans-serif">
  <text x="180" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Beetle Count at Different Locations</text>
  <rect x="10" y="23" width="80" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="50" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Location</text>
  <rect x="90" y="23" width="130" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="155" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Soil Moisture</text>
  <rect x="220" y="23" width="130" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="285" y="38" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">No. of Beetles</text>
  <rect x="10" y="45" width="80" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="50" y="61" text-anchor="middle" font-size="10" fill="#1e293b">Location 1</text>
  <rect x="90" y="45" width="130" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="155" y="61" text-anchor="middle" font-size="10" fill="#1e293b">Damp soil</text>
  <rect x="220" y="45" width="130" height="25" fill="#dcfce7" stroke="#16a34a" stroke-width="1"/>
  <text x="285" y="61" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">28</text>
  <rect x="10" y="70" width="80" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="50" y="86" text-anchor="middle" font-size="10" fill="#1e293b">Location 2</text>
  <rect x="90" y="70" width="130" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="155" y="86" text-anchor="middle" font-size="10" fill="#1e293b">Dry soil</text>
  <rect x="220" y="70" width="130" height="25" fill="#fee2e2" stroke="#ef4444" stroke-width="1"/>
  <text x="285" y="86" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">4</text>
  <rect x="10" y="95" width="80" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="50" y="111" text-anchor="middle" font-size="10" fill="#1e293b">Location 3</text>
  <rect x="90" y="95" width="130" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="155" y="111" text-anchor="middle" font-size="10" fill="#1e293b">Very wet soil</text>
  <rect x="220" y="95" width="130" height="25" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="285" y="111" text-anchor="middle" font-size="10" fill="#1e293b">12</text>
  <text x="180" y="135" text-anchor="middle" font-size="9" fill="#64748b">Which abiotic factor most affects the beetle population?</text>
</svg>""")

with open('data/questions-science-p6.json', 'w') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

batch = ['SCI575','SCI577','SCI578','SCI579','SCI580','SCI581','SCI582','SCI585','SCI586','SCI587']
for q in data:
    if q['id'] in batch:
        ok_d = q['diagram'] is not None
        ok_c = bool(q.get('placeholder_roles'))
        print(f"{q['id']}: diagram={'OK' if ok_d else 'MISSING'} | char={'OK' if ok_c else 'MISSING'}")
print("Batch 4 done!")
