import json

with open('data/questions-science-p6.json', 'r') as f:
    data = json.load(f)

idx = {q['id']: i for i, q in enumerate(data)}

def fix(qid, template=None, diagram=None, roles=None):
    i = idx[qid]
    if template is not None: data[i]['template'] = template
    if diagram is not None:  data[i]['diagram']  = diagram
    if roles   is not None:  data[i]['placeholder_roles'] = roles

# ── SCI561  char only ────────────────────────────────────────────────────────
fix('SCI561',
    template="{CHARACTER_0} studies a diagram showing substance X being transported in the human body. System A receives digested food from System B and carries it to the rest of the body. Which of the following correctly identifies Systems A and B and Substance X?",
    roles=['protagonist'])

# ── SCI562  char only ────────────────────────────────────────────────────────
fix('SCI562',
    template="{CHARACTER_0} studies a table showing information about three fuels X, Y, and Z:\nFuel X: lasts 110–120 years, high energy, high greenhouse gases\nFuel Y: lasts 70–80 years, low energy, medium greenhouse gases\nFuel Z: lasts 70–80 years, high energy, low greenhouse gases\nBased on the information in the table, which of the following CANNOT be concluded?",
    roles=['protagonist'])

# ── SCI563  both ─────────────────────────────────────────────────────────────
fix('SCI563',
    template="{CHARACTER_0} studies a graph showing the average yearly temperature of Country P rising steadily over 20 years. Which of the following activities could have caused this temperature increase?\nA: Picking up litter from the ground\nB: Travelling on the road in petrol vehicles\nC: Clearing of forests by cutting down trees\nD: Turning off the tap when soaping hands",
    diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 185" width="360" font-family="Arial,sans-serif">
  <text x="180" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Average Temperature of Country P Over 20 Years</text>
  <line x1="45" y1="20" x2="45" y2="155" stroke="#64748b" stroke-width="1.5"/>
  <line x1="45" y1="155" x2="330" y2="155" stroke="#64748b" stroke-width="1.5"/>
  <text x="185" y="170" text-anchor="middle" font-size="10" fill="#64748b">Year →</text>
  <text x="12" y="88" text-anchor="middle" font-size="9" fill="#64748b" transform="rotate(-90,12,88)">Temp (°C)</text>
  <!-- Rising temperature line -->
  <polyline points="45,140 80,132 115,124 150,115 185,106 220,96 255,85 290,74 325,62" stroke="#ef4444" stroke-width="2.5" fill="none"/>
  <!-- Year labels -->
  <text x="45" y="163" text-anchor="middle" font-size="8" fill="#64748b">Year 1</text>
  <text x="325" y="163" text-anchor="middle" font-size="8" fill="#64748b">Year 20</text>
  <!-- Arrow showing trend -->
  <text x="290" y="55" font-size="10" fill="#dc2626">↑ Rising</text>
  <text x="182" y="178" text-anchor="middle" font-size="9" fill="#64748b">Which activities caused this rise?</text>
</svg>""",
    roles=['protagonist'])

# ── SCI564  char only ────────────────────────────────────────────────────────
fix('SCI564',
    template="{CHARACTER_0} studies diagrams showing three different fruits:\nFruit A: has a fibrous husk\nFruit B: has wing-like structures\nFruit C: has hook-like structures\nWhich of the following correctly identifies the dispersal method for fruits A, B, and C?",
    roles=['protagonist'])

# ── SCI565  char only ────────────────────────────────────────────────────────
fix('SCI565',
    template="{CHARACTER_0} studies a diagram of the female reproductive system with parts A, B, C, and D labelled. Which of the following correctly matches the parts to their functions?\n(Part that produces eggs / Part where fertilised egg develops)",
    roles=['protagonist'])

# ── SCI568  both ─────────────────────────────────────────────────────────────
fix('SCI568',
    template="{CHARACTER_0} sets up an experiment: a ball moves down a smooth slope and hits block L. Block L moves along surface M and stops at position N. The following changes are made individually:\nA: Decrease the mass of block L\nB: Increase the height of the slope\nC: Increase the width of the wooden plank\nD: Decrease the roughness of surface M\nWhich change(s) would make block L move further than position N?",
    diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 175" width="380" font-family="Arial,sans-serif">
  <text x="190" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Ball and Block Experiment</text>
  <!-- Slope -->
  <polygon points="40,60 200,155 40,155" fill="#e2e8f0" stroke="#64748b" stroke-width="1.5"/>
  <!-- Ball on slope -->
  <circle cx="90" cy="102" r="10" fill="#fde68a" stroke="#d97706" stroke-width="2"/>
  <text x="90" y="106" text-anchor="middle" font-size="8" fill="#92400e">ball</text>
  <!-- Height label -->
  <line x1="35" y1="60" x2="35" y2="155" stroke="#3b82f6" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="20" y="110" text-anchor="middle" font-size="9" fill="#1d4ed8">h</text>
  <!-- Surface M (flat) -->
  <rect x="200" y="148" width="160" height="8" fill="#94a3b8" stroke="#64748b" stroke-width="1"/>
  <text x="280" y="167" text-anchor="middle" font-size="9" fill="#64748b">Surface M (rough/smooth?)</text>
  <!-- Block L -->
  <rect x="200" y="130" width="28" height="20" fill="#86efac" stroke="#16a34a" stroke-width="1.5" rx="2"/>
  <text x="214" y="143" text-anchor="middle" font-size="8" font-weight="bold" fill="#15803d">L</text>
  <!-- Position N -->
  <line x1="310" y1="148" x2="310" y2="135" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4,2"/>
  <text x="310" y="130" text-anchor="middle" font-size="9" fill="#dc2626">N</text>
</svg>""",
    roles=['protagonist'])

# ── SCI569  both ─────────────────────────────────────────────────────────────
fix('SCI569',
    template="{CHARACTER_0} places two identical 500 g objects separately on two similar springs R and T made of different materials. Both springs had the same length at the start. Spring R compressed less than spring T. Which of the following about the springs is correct?",
    diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 170" width="340" font-family="Arial,sans-serif">
  <text x="170" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Spring Compression Experiment</text>
  <!-- Spring R (less compressed) -->
  <text x="85" y="35" text-anchor="middle" font-size="10" font-weight="bold" fill="#1d4ed8">Spring R</text>
  <rect x="60" y="40" width="50" height="15" fill="#94a3b8" stroke="#64748b" stroke-width="1" rx="2"/>
  <text x="85" y="51" text-anchor="middle" font-size="8" fill="white">500 g</text>
  <!-- Spring coil R (less compressed = taller) -->
  <line x1="85" y1="55" x2="85" y2="65" stroke="#3b82f6" stroke-width="2"/>
  <path d="M 70 65 Q 100 70 70 75 Q 100 80 70 85 Q 100 90 70 95 Q 100 100 70 105 Q 100 110 70 115" stroke="#3b82f6" stroke-width="2" fill="none"/>
  <line x1="70" y1="115" x2="100" y2="115" stroke="#64748b" stroke-width="2"/>
  <text x="85" y="132" text-anchor="middle" font-size="8" fill="#1d4ed8">Less compressed</text>
  <text x="85" y="143" text-anchor="middle" font-size="8" fill="#1d4ed8">(stiffer?)</text>
  <!-- Spring T (more compressed) -->
  <text x="255" y="35" text-anchor="middle" font-size="10" font-weight="bold" fill="#dc2626">Spring T</text>
  <rect x="230" y="40" width="50" height="15" fill="#94a3b8" stroke="#64748b" stroke-width="1" rx="2"/>
  <text x="255" y="51" text-anchor="middle" font-size="8" fill="white">500 g</text>
  <!-- Spring coil T (more compressed = shorter) -->
  <line x1="255" y1="55" x2="255" y2="60" stroke="#ef4444" stroke-width="2"/>
  <path d="M 240 60 Q 270 64 240 68 Q 270 72 240 76 Q 270 80 240 84 Q 270 88 240 92" stroke="#ef4444" stroke-width="2" fill="none"/>
  <line x1="240" y1="92" x2="270" y2="92" stroke="#64748b" stroke-width="2"/>
  <text x="255" y="110" text-anchor="middle" font-size="8" fill="#dc2626">More compressed</text>
  <text x="255" y="121" text-anchor="middle" font-size="8" fill="#dc2626">(less stiff?)</text>
  <text x="170" y="160" text-anchor="middle" font-size="9" fill="#64748b">Both loaded with identical 500 g weights</text>
</svg>""",
    roles=['protagonist'])

# ── SCI572  diagram only ─────────────────────────────────────────────────────
fix('SCI572', diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 165" width="360" font-family="Arial,sans-serif">
  <text x="180" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Performer Behind an Opaque Curtain</text>
  <!-- Stage curtain -->
  <rect x="155" y="25" width="15" height="120" fill="#7c3aed" stroke="#4c1d95" stroke-width="2" rx="2"/>
  <text x="162" y="162" text-anchor="middle" font-size="8" fill="#7c3aed">curtain</text>
  <!-- Performer (left side, behind curtain) -->
  <circle cx="80" cy="70" r="18" fill="#fde68a" stroke="#d97706" stroke-width="1.5"/>
  <text x="80" y="75" text-anchor="middle" font-size="10">🎭</text>
  <text x="80" y="105" text-anchor="middle" font-size="9" fill="#1e293b">Performer</text>
  <text x="80" y="117" text-anchor="middle" font-size="8" fill="#64748b">(behind curtain)</text>
  <!-- Observer (right side) -->
  <circle cx="270" cy="70" r="18" fill="#bfdbfe" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="270" y="75" text-anchor="middle" font-size="10">👁</text>
  <text x="270" y="105" text-anchor="middle" font-size="9" fill="#1e293b">{CHARACTER_0}</text>
  <text x="270" y="117" text-anchor="middle" font-size="8" fill="#64748b">(cannot see performer)</text>
  <!-- Light rays blocked -->
  <line x1="98" y1="70" x2="150" y2="70" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="130" y="65" text-anchor="middle" font-size="9" fill="#dc2626">blocked</text>
  <text x="220" y="70" text-anchor="middle" font-size="20" fill="#dc2626">✗</text>
</svg>""")

# ── SCI573  both ─────────────────────────────────────────────────────────────
fix('SCI573',
    template="{CHARACTER_0} places a block of ice in an empty plastic cup and leaves it in the kitchen at room temperature. Which of the following is correct about this setup?",
    diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 165" width="340" font-family="Arial,sans-serif">
  <text x="170" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Ice Block in a Plastic Cup — Room Temperature</text>
  <!-- Cup outline -->
  <path d="M 100 40 L 90 145 L 250 145 L 240 40 Z" fill="none" stroke="#64748b" stroke-width="2"/>
  <!-- Ice block -->
  <rect x="120" y="50" width="100" height="55" fill="#bfdbfe" stroke="#3b82f6" stroke-width="1.5" rx="4"/>
  <text x="170" y="75" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">ICE</text>
  <text x="170" y="90" text-anchor="middle" font-size="9" fill="#1d4ed8">(solid water)</text>
  <!-- Water forming at bottom -->
  <rect x="91" y="125" width="158" height="20" fill="#93c5fd" stroke="#3b82f6" stroke-width="1" rx="2"/>
  <text x="170" y="138" text-anchor="middle" font-size="8" fill="#1e40af">water (melting)</text>
  <!-- Temperature arrow -->
  <text x="285" y="80" font-size="9" fill="#dc2626">Room</text>
  <text x="285" y="92" font-size="9" fill="#dc2626">temp.</text>
  <text x="285" y="104" font-size="12" fill="#dc2626">→</text>
  <!-- Question -->
  <text x="170" y="158" text-anchor="middle" font-size="9" fill="#64748b">What changes? What stays the same?</text>
</svg>""",
    roles=['protagonist'])

# ── SCI574  diagram only ─────────────────────────────────────────────────────
fix('SCI574', diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 130" width="360" font-family="Arial,sans-serif">
  <text x="180" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">What is Matter?</text>
  <rect x="120" y="25" width="120" height="35" fill="#dcfce7" stroke="#16a34a" stroke-width="2" rx="5"/>
  <text x="180" y="42" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">MATTER</text>
  <text x="180" y="54" text-anchor="middle" font-size="9" fill="#15803d">has mass + takes up space</text>
  <line x1="60" y1="60" x2="140" y2="58" stroke="#64748b" stroke-width="1.5"/>
  <line x1="220" y1="58" x2="300" y2="60" stroke="#64748b" stroke-width="1.5"/>
  <line x1="180" y1="60" x2="180" y2="73" stroke="#64748b" stroke-width="1.5"/>
  <rect x="10" y="68" width="85" height="28" fill="#dbeafe" stroke="#3b82f6" stroke-width="1" rx="4"/>
  <text x="52" y="83" text-anchor="middle" font-size="9" fill="#1d4ed8">Solid (e.g. rock)</text>
  <rect x="137" y="73" width="85" height="28" fill="#dbeafe" stroke="#3b82f6" stroke-width="1" rx="4"/>
  <text x="179" y="88" text-anchor="middle" font-size="9" fill="#1d4ed8">Liquid (e.g. water)</text>
  <rect x="265" y="68" width="85" height="28" fill="#dbeafe" stroke="#3b82f6" stroke-width="1" rx="4"/>
  <text x="307" y="83" text-anchor="middle" font-size="9" fill="#1d4ed8">Gas (e.g. air)</text>
  <rect x="80" y="110" width="200" height="15" fill="#fee2e2" stroke="#ef4444" stroke-width="1" rx="3"/>
  <text x="180" y="121" text-anchor="middle" font-size="9" fill="#dc2626">Which option is NOT matter?</text>
</svg>""")

with open('data/questions-science-p6.json', 'w') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

batch = ['SCI561','SCI562','SCI563','SCI564','SCI565','SCI568','SCI569','SCI572','SCI573','SCI574']
for q in data:
    if q['id'] in batch:
        ok_d = q['diagram'] is not None
        ok_c = bool(q.get('placeholder_roles'))
        print(f"{q['id']}: diagram={'OK' if ok_d else 'MISSING'} | char={'OK' if ok_c else 'MISSING'}")
print("Batch 3 done!")
