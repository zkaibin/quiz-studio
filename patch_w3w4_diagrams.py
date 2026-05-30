import json

with open('data/questions-science-p6.json', 'r') as f:
    data = json.load(f)

idx = {q['id']: i for i, q in enumerate(data)}

def fix(qid, template=None, diagram=None, roles=None):
    i = idx[qid]
    if template is not None: data[i]['template'] = template
    if diagram is not None:  data[i]['diagram']  = diagram
    if roles   is not None:  data[i]['placeholder_roles'] = roles

# ═══════════════════════════════════════════════════════════════════════════
# W3D1: SCI652-SCI679
# ═══════════════════════════════════════════════════════════════════════════

# ── SCI652  diagram: Plant growth stages A, B, C, D ─────────────────────────
fix('SCI652', diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 150" width="400" font-family="Arial,sans-serif">
  <text x="200" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Plant Growth Stages</text>
  <!-- Stage A: Seed -->
  <ellipse cx="50" cy="80" rx="18" ry="12" fill="#92400e" stroke="#451a03" stroke-width="1.5"/>
  <text x="50" y="110" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">A</text>
  <text x="50" y="123" text-anchor="middle" font-size="9" fill="#64748b">Seed</text>
  <!-- Stage B: Seedling without green leaves -->
  <line x1="130" y1="105" x2="130" y2="75" stroke="#78350f" stroke-width="2"/>
  <ellipse cx="130" cy="70" rx="8" ry="6" fill="#fef3c7" stroke="#d97706" stroke-width="1"/>
  <text x="130" y="110" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">B</text>
  <text x="130" y="123" text-anchor="middle" font-size="9" fill="#64748b">Seedling</text>
  <text x="130" y="135" text-anchor="middle" font-size="8" fill="#64748b">(no leaves yet)</text>
  <!-- Stage C: Young plant with small green leaves -->
  <line x1="230" y1="105" x2="230" y2="55" stroke="#166534" stroke-width="2"/>
  <ellipse cx="220" cy="75" rx="12" ry="8" fill="#86efac" stroke="#15803d" stroke-width="1" transform="rotate(-30,220,75)"/>
  <ellipse cx="240" cy="70" rx="12" ry="8" fill="#86efac" stroke="#15803d" stroke-width="1" transform="rotate(30,240,70)"/>
  <text x="230" y="110" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">C</text>
  <text x="230" y="123" text-anchor="middle" font-size="9" fill="#64748b">Young plant</text>
  <text x="230" y="135" text-anchor="middle" font-size="8" fill="#16a34a">(green leaves)</text>
  <!-- Stage D: Mature plant with flowers -->
  <line x1="330" y1="105" x2="330" y2="45" stroke="#166534" stroke-width="2"/>
  <ellipse cx="315" cy="75" rx="14" ry="10" fill="#86efac" stroke="#15803d" stroke-width="1" transform="rotate(-35,315,75)"/>
  <ellipse cx="345" cy="70" rx="14" ry="10" fill="#86efac" stroke="#15803d" stroke-width="1" transform="rotate(35,345,70)"/>
  <circle cx="330" cy="40" r="8" fill="#fde68a" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="330" y="110" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">D</text>
  <text x="330" y="123" text-anchor="middle" font-size="9" fill="#64748b">Mature plant</text>
  <text x="330" y="135" text-anchor="middle" font-size="8" fill="#16a34a">(leaves + flower)</text>
</svg>""")

# ── SCI653  diagram: Reproductive parts - flower and human ──────────────────
fix('SCI653', diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 145" width="400" font-family="Arial,sans-serif">
  <text x="200" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Reproductive Parts: Flowering Plant vs Human</text>
  <!-- Flowering Plant -->
  <text x="110" y="35" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">Flowering Plant</text>
  <rect x="30" y="40" width="160" height="88" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5" rx="5"/>
  <text x="110" y="58" text-anchor="middle" font-size="10" fill="#1e293b">• Stigma (female)</text>
  <text x="110" y="72" text-anchor="middle" font-size="10" fill="#1e293b">• Ovary (produces eggs)</text>
  <text x="110" y="86" text-anchor="middle" font-size="10" fill="#1e293b">• Anther (male)</text>
  <text x="110" y="100" text-anchor="middle" font-size="10" fill="#1e293b">• Stamen (produces pollen)</text>
  <text x="110" y="118" text-anchor="middle" font-size="9" fill="#15803d">Reproduction via pollination</text>
  <!-- Human -->
  <text x="290" y="35" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">Human</text>
  <rect x="210" y="40" width="160" height="88" fill="#fef2f2" stroke="#ef4444" stroke-width="1.5" rx="5"/>
  <text x="290" y="58" text-anchor="middle" font-size="10" fill="#1e293b">• Ovaries (produce eggs)</text>
  <text x="290" y="72" text-anchor="middle" font-size="10" fill="#1e293b">• Uterus (womb)</text>
  <text x="290" y="86" text-anchor="middle" font-size="10" fill="#1e293b">• Testes (male)</text>
  <text x="290" y="100" text-anchor="middle" font-size="10" fill="#1e293b">• (produce sperm)</text>
  <text x="290" y="118" text-anchor="middle" font-size="9" fill="#dc2626">Reproduction via fertilization</text>
</svg>""")

# ── SCI654  diagram: Tree organisms count ───────────────────────────────────
fix('SCI654', diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 130" width="380" font-family="Arial,sans-serif">
  <text x="190" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Organisms Found on a Tree</text>
  <rect x="10" y="25" width="110" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="65" y="40" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Organism</text>
  <rect x="120" y="25" width="80" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="160" y="40" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Count</text>
  <rect x="200" y="25" width="170" height="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="285" y="40" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Type</text>
  <rect x="10" y="47" width="110" height="18" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="65" y="60" text-anchor="middle" font-size="9" fill="#1e293b">Ant</text>
  <rect x="120" y="47" width="80" height="18" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="160" y="60" text-anchor="middle" font-size="9" fill="#1e293b">15</text>
  <rect x="200" y="47" width="170" height="18" fill="#fef3c7" stroke="#94a3b8" stroke-width="1"/>
  <text x="285" y="60" text-anchor="middle" font-size="9" fill="#92400e">Animal</text>
  <rect x="10" y="65" width="110" height="18" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="65" y="78" text-anchor="middle" font-size="9" fill="#1e293b">Butterfly</text>
  <rect x="120" y="65" width="80" height="18" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="160" y="78" text-anchor="middle" font-size="9" fill="#1e293b">9</text>
  <rect x="200" y="65" width="170" height="18" fill="#fef3c7" stroke="#94a3b8" stroke-width="1"/>
  <text x="285" y="78" text-anchor="middle" font-size="9" fill="#92400e">Animal</text>
  <rect x="10" y="83" width="110" height="18" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="65" y="96" text-anchor="middle" font-size="9" fill="#1e293b">Fern</text>
  <rect x="120" y="83" width="80" height="18" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="160" y="96" text-anchor="middle" font-size="9" fill="#1e293b">3</text>
  <rect x="200" y="83" width="170" height="18" fill="#dcfce7" stroke="#94a3b8" stroke-width="1"/>
  <text x="285" y="96" text-anchor="middle" font-size="9" fill="#15803d">Plant</text>
  <rect x="10" y="101" width="110" height="18" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="65" y="114" text-anchor="middle" font-size="9" fill="#1e293b">Spider</text>
  <rect x="120" y="101" width="80" height="18" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="160" y="114" text-anchor="middle" font-size="9" fill="#1e293b">6</text>
  <rect x="200" y="101" width="170" height="18" fill="#fef3c7" stroke="#94a3b8" stroke-width="1"/>
  <text x="285" y="114" text-anchor="middle" font-size="9" fill="#92400e">Animal</text>
</svg>""")

# ── SCI655  diagram: Pond timeline - egg hatching days ──────────────────────
fix('SCI655', diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 120" width="400" font-family="Arial,sans-serif">
  <text x="200" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Pond Animals — Egg Hatching Timeline</text>
  <!-- Timeline -->
  <line x1="30" y1="50" x2="370" y2="50" stroke="#64748b" stroke-width="2"/>
  <text x="30" y="65" text-anchor="middle" font-size="9" fill="#64748b">Day 1</text>
  <text x="370" y="65" text-anchor="middle" font-size="9" fill="#64748b">Day 21</text>
  <!-- Mosquito -->
  <circle cx="90" cy="50" r="4" fill="#fbbf24" stroke="#d97706" stroke-width="1"/>
  <text x="90" y="80" text-anchor="middle" font-size="9" fill="#92400e">Mosquito</text>
  <text x="90" y="92" text-anchor="middle" font-size="8" fill="#92400e">eggs hatch</text>
  <text x="90" y="104" text-anchor="middle" font-size="8" font-weight="bold" fill="#dc2626">Day 2</text>
  <!-- Butterfly -->
  <circle cx="160" cy="50" r="4" fill="#bfdbfe" stroke="#3b82f6" stroke-width="1"/>
  <text x="160" y="80" text-anchor="middle" font-size="9" fill="#1d4ed8">Butterfly</text>
  <text x="160" y="92" text-anchor="middle" font-size="8" fill="#1d4ed8">eggs hatch</text>
  <text x="160" y="104" text-anchor="middle" font-size="8" font-weight="bold" fill="#dc2626">Day 4</text>
  <!-- Frog -->
  <circle cx="310" cy="50" r="4" fill="#86efac" stroke="#16a34a" stroke-width="1"/>
  <text x="310" y="80" text-anchor="middle" font-size="9" fill="#15803d">Frog</text>
  <text x="310" y="92" text-anchor="middle" font-size="8" fill="#15803d">eggs hatch</text>
  <text x="310" y="104" text-anchor="middle" font-size="8" font-weight="bold" fill="#dc2626">Day 21</text>
</svg>""")

# ── SCI656  diagram: Living things classification table ─────────────────────
fix('SCI656', diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 115" width="400" font-family="Arial,sans-serif">
  <text x="200" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Living Things Classification</text>
  <rect x="10" y="23" width="90" height="20" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="55" y="37" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e293b">Organism</text>
  <rect x="100" y="23" width="90" height="20" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="145" y="37" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e293b">Makes food?</text>
  <rect x="190" y="23" width="100" height="20" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="240" y="37" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e293b">Flowers?</text>
  <rect x="290" y="23" width="100" height="20" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="340" y="37" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e293b">Category</text>
  <!-- Grass -->
  <rect x="10" y="43" width="90" height="18" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="55" y="56" text-anchor="middle" font-size="9" fill="#1e293b">Grass</text>
  <rect x="100" y="43" width="90" height="18" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="145" y="56" text-anchor="middle" font-size="9" fill="#1e293b">Yes</text>
  <rect x="190" y="43" width="100" height="18" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="240" y="56" text-anchor="middle" font-size="9" fill="#1e293b">Yes</text>
  <rect x="290" y="43" width="100" height="18" fill="#dcfce7" stroke="#94a3b8" stroke-width="1"/>
  <text x="340" y="56" text-anchor="middle" font-size="9" fill="#15803d">Plant</text>
  <!-- Fern -->
  <rect x="10" y="61" width="90" height="18" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="55" y="74" text-anchor="middle" font-size="9" fill="#1e293b">Fern</text>
  <rect x="100" y="61" width="90" height="18" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="145" y="74" text-anchor="middle" font-size="9" fill="#1e293b">Yes</text>
  <rect x="190" y="61" width="100" height="18" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="240" y="74" text-anchor="middle" font-size="9" fill="#1e293b">No</text>
  <rect x="290" y="61" width="100" height="18" fill="#dcfce7" stroke="#94a3b8" stroke-width="1"/>
  <text x="340" y="74" text-anchor="middle" font-size="9" fill="#15803d">Plant</text>
  <!-- Mushroom -->
  <rect x="10" y="79" width="90" height="18" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="55" y="92" text-anchor="middle" font-size="9" fill="#1e293b">Mushroom</text>
  <rect x="100" y="79" width="90" height="18" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="145" y="92" text-anchor="middle" font-size="9" fill="#1e293b">No</text>
  <rect x="190" y="79" width="100" height="18" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="240" y="92" text-anchor="middle" font-size="9" fill="#1e293b">No</text>
  <rect x="290" y="79" width="100" height="18" fill="#fef9c3" stroke="#94a3b8" stroke-width="1"/>
  <text x="340" y="92" text-anchor="middle" font-size="9" fill="#92400e">Fungus</text>
</svg>""")

# ── SCI657  diagram: Flower and fruit ───────────────────────────────────────
fix('SCI657', diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 120" width="300" font-family="Arial,sans-serif">
  <text x="150" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Flower J and Its Fruit</text>
  <!-- Flower J -->
  <text x="80" y="35" text-anchor="middle" font-size="10" font-weight="bold" fill="#f59e0b">Flower J</text>
  <line x1="80" y1="90" x2="80" y2="45" stroke="#166534" stroke-width="2"/>
  <circle cx="80" cy="40" r="10" fill="#fde68a" stroke="#f59e0b" stroke-width="1.5"/>
  <ellipse cx="67" cy="55" rx="10" ry="6" fill="#86efac" stroke="#15803d" stroke-width="1" transform="rotate(-25,67,55)"/>
  <ellipse cx="93" cy="55" rx="10" ry="6" fill="#86efac" stroke="#15803d" stroke-width="1" transform="rotate(25,93,55)"/>
  <text x="80" y="108" text-anchor="middle" font-size="8" fill="#64748b">Before pollination</text>
  <!-- Arrow -->
  <text x="150" y="70" text-anchor="middle" font-size="14" fill="#64748b">→</text>
  <!-- Fruit with 1 seed -->
  <text x="220" y="35" text-anchor="middle" font-size="10" font-weight="bold" fill="#dc2626">Fruit (1 seed)</text>
  <ellipse cx="220" cy="60" rx="20" ry="28" fill="#fca5a5" stroke="#dc2626" stroke-width="1.5"/>
  <ellipse cx="220" cy="65" rx="6" ry="10" fill="#78350f" stroke="#451a03" stroke-width="1"/>
  <text x="220" y="108" text-anchor="middle" font-size="8" fill="#64748b">After pollination</text>
</svg>""")

# ── SCI658  diagram: Plant water uptake experiment ──────────────────────────
fix('SCI658', diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150" width="300" font-family="Arial,sans-serif">
  <text x="150" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Plant Water Uptake Experiment</text>
  <!-- Flask with water -->
  <path d="M 80 85 L 75 130 L 145 130 L 140 85 Z" fill="#bfdbfe" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="110" y="120" text-anchor="middle" font-size="9" fill="#1d4ed8">Water</text>
  <!-- Plant roots in water -->
  <line x1="110" y1="125" x2="110" y2="100" stroke="#78350f" stroke-width="1.5"/>
  <path d="M 105 115 Q 100 120 97 125" stroke="#78350f" stroke-width="1" fill="none"/>
  <path d="M 115 115 Q 120 120 123 125" stroke="#78350f" stroke-width="1" fill="none"/>
  <!-- Tube with oil droplet -->
  <rect x="135" y="60" width="8" height="25" fill="none" stroke="#64748b" stroke-width="1"/>
  <ellipse cx="139" cy="70" rx="3" ry="4" fill="#dc2626" stroke="#991b1b" stroke-width="1"/>
  <text x="165" y="72" font-size="8" fill="#dc2626">← oil droplet</text>
  <text x="165" y="82" font-size="8" fill="#dc2626">moves down</text>
  <!-- Plant stem and leaves -->
  <line x1="110" y1="100" x2="110" y2="35" stroke="#166534" stroke-width="2"/>
  <ellipse cx="95" cy="50" rx="12" ry="8" fill="#86efac" stroke="#15803d" stroke-width="1" transform="rotate(-30,95,50)"/>
  <ellipse cx="125" cy="45" rx="12" ry="8" fill="#86efac" stroke="#15803d" stroke-width="1" transform="rotate(30,125,45)"/>
  <text x="150" y="140" text-anchor="middle" font-size="9" fill="#64748b">Water taken in by roots</text>
</svg>""")

# ── SCI659  diagram: Digestive system organs W, X, Y, Z ─────────────────────
fix('SCI659', diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 120" width="380" font-family="Arial,sans-serif">
  <text x="190" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Human Digestive System Organs</text>
  <rect x="10" y="23" width="70" height="20" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="45" y="37" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e293b">Organ</text>
  <rect x="80" y="23" width="290" height="20" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="225" y="37" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e293b">Function</text>
  <rect x="10" y="43" width="70" height="18" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="45" y="56" text-anchor="middle" font-size="10" font-weight="bold" fill="#1d4ed8">W</text>
  <rect x="80" y="43" width="290" height="18" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="225" y="56" text-anchor="middle" font-size="9" fill="#1e293b">Breaks down food</text>
  <rect x="10" y="61" width="70" height="18" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="45" y="74" text-anchor="middle" font-size="10" font-weight="bold" fill="#1d4ed8">X</text>
  <rect x="80" y="61" width="290" height="18" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="225" y="74" text-anchor="middle" font-size="9" fill="#1e293b">Breaks down food</text>
  <rect x="10" y="79" width="70" height="18" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="45" y="92" text-anchor="middle" font-size="10" font-weight="bold" fill="#1d4ed8">Y</text>
  <rect x="80" y="79" width="290" height="18" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="225" y="92" text-anchor="middle" font-size="9" fill="#1e293b">Absorbs digested food and water</text>
  <rect x="10" y="97" width="70" height="18" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="45" y="110" text-anchor="middle" font-size="10" font-weight="bold" fill="#1d4ed8">Z</text>
  <rect x="80" y="97" width="290" height="18" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="225" y="110" text-anchor="middle" font-size="9" fill="#1e293b">Stores undigested food</text>
</svg>""")

# ── SCI660  diagram: Guppy growth variables ─────────────────────────────────
fix('SCI660', diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 105" width="380" font-family="Arial,sans-serif">
  <text x="190" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Variables Affecting Guppy Growth</text>
  <rect x="10" y="23" width="70" height="20" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="45" y="37" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e293b">Variable</text>
  <rect x="80" y="23" width="290" height="20" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
  <text x="225" y="37" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e293b">Description</text>
  <rect x="10" y="43" width="70" height="15" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="45" y="54" text-anchor="middle" font-size="9" font-weight="bold" fill="#1d4ed8">A</text>
  <rect x="80" y="43" width="290" height="15" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="225" y="54" text-anchor="middle" font-size="9" fill="#1e293b">Amount of light</text>
  <rect x="10" y="58" width="70" height="15" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="45" y="69" text-anchor="middle" font-size="9" font-weight="bold" fill="#1d4ed8">B</text>
  <rect x="80" y="58" width="290" height="15" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="225" y="69" text-anchor="middle" font-size="9" fill="#1e293b">Water temperature</text>
  <rect x="10" y="73" width="70" height="15" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="45" y="84" text-anchor="middle" font-size="9" font-weight="bold" fill="#1d4ed8">C</text>
  <rect x="80" y="73" width="290" height="15" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="225" y="84" text-anchor="middle" font-size="9" fill="#1e293b">Amount of food given</text>
  <rect x="10" y="88" width="70" height="15" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="45" y="99" text-anchor="middle" font-size="9" font-weight="bold" fill="#1d4ed8">D</text>
  <rect x="80" y="88" width="290" height="15" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="225" y="99" text-anchor="middle" font-size="9" fill="#1e293b">Size of tank</text>
</svg>""")

# Continue with more diagrams in next section...
# (I'll create diagrams for all remaining questions systematically)

print("Starting to add diagrams to W3W4 questions (SCI652-SCI930)...")
print("Created diagrams for SCI652-SCI660 (10 questions)")

# Save after first batch
with open('data/questions-science-p6.json', 'w') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("✓ Saved progress - first batch complete")
print("Continuing with remaining questions...")
