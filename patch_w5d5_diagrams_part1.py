import json

with open('data/questions-science-p6.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

idx = {q['id']: i for i, q in enumerate(data)}

def fix(qid, diagram):
    data[idx[qid]]['diagram'] = diagram

# SCI1036: Plant in box bending towards light
fix('SCI1036', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Plant Growing Towards Light</text>
  <!-- Box -->
  <rect x="60" y="80" width="280" height="160" fill="#f1f5f9" stroke="#64748b" stroke-width="3"/>
  <!-- Hole in box -->
  <circle cx="300" cy="120" r="25" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <!-- Light rays from hole -->
  <line x1="325" y1="110" x2="360" y2="100" stroke="#f59e0b" stroke-width="2"/>
  <line x1="325" y1="120" x2="370" y2="120" stroke="#f59e0b" stroke-width="2"/>
  <line x1="325" y1="130" x2="360" y2="140" stroke="#f59e0b" stroke-width="2"/>
  <text x="375" y="115" font-size="11" fill="#f59e0b" font-weight="bold">Light</text>
  <!-- Pot -->
  <path d="M 110 230 L 120 210 L 180 210 L 190 230 Z" fill="#92400e" stroke="#78350f" stroke-width="2"/>
  <ellipse cx="150" cy="210" rx="30" ry="8" fill="#a16207"/>
  <!-- Soil -->
  <ellipse cx="150" cy="218" rx="28" ry="6" fill="#78350f"/>
  <!-- Plant stem bending towards hole -->
  <path d="M 150 218 Q 150 180 165 150 Q 180 120 220 110 Q 260 100 285 115" 
        stroke="#16a34a" stroke-width="4" fill="none" stroke-linecap="round"/>
  <!-- Leaves -->
  <ellipse cx="170" cy="145" rx="12" ry="7" fill="#86efac" stroke="#15803d" stroke-width="1.5" transform="rotate(25,170,145)"/>
  <ellipse cx="195" cy="125" rx="13" ry="7" fill="#86efac" stroke="#15803d" stroke-width="1.5" transform="rotate(35,195,125)"/>
  <ellipse cx="240" cy="105" rx="14" ry="8" fill="#86efac" stroke="#15803d" stroke-width="1.5" transform="rotate(45,240,105)"/>
  <ellipse cx="275" cy="110" rx="15" ry="8" fill="#86efac" stroke="#15803d" stroke-width="1.5" transform="rotate(55,275,110)"/>
  <!-- Arrow showing growth direction -->
  <path d="M 180 200 Q 210 160 260 130" stroke="#3b82f6" stroke-width="2" fill="none" stroke-dasharray="4,3"/>
  <polygon points="255,135 265,128 258,125" fill="#3b82f6"/>
  <text x="220" y="175" font-size="10" fill="#3b82f6" font-weight="bold">Growth</text>
  <text x="215" y="188" font-size="10" fill="#3b82f6" font-weight="bold">direction</text>
  <!-- Label -->
  <text x="200" y="265" text-anchor="middle" font-size="11" fill="#64748b">Plant bends towards the light source (hole in box)</text>
</svg>''')

# SCI1037: Classification chart for organisms
fix('SCI1037', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Organism Classification Chart</text>
  <!-- Top level: All Organisms -->
  <rect x="150" y="35" width="100" height="30" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" rx="4"/>
  <text x="200" y="55" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af">Organisms</text>
  <!-- First split -->
  <line x1="200" y1="65" x2="200" y2="85" stroke="#64748b" stroke-width="2"/>
  <line x1="100" y1="85" x2="300" y2="85" stroke="#64748b" stroke-width="2"/>
  <line x1="100" y1="85" x2="100" y2="95" stroke="#64748b" stroke-width="2"/>
  <line x1="300" y1="85" x2="300" y2="95" stroke="#64748b" stroke-width="2"/>
  <!-- Has Scales / No Scales -->
  <rect x="50" y="95" width="100" height="30" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="4"/>
  <text x="100" y="115" text-anchor="middle" font-size="11" font-weight="bold" fill="#92400e">Has Scales</text>
  <rect x="250" y="95" width="100" height="30" fill="#dcfce7" stroke="#16a34a" stroke-width="2" rx="4"/>
  <text x="300" y="115" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">No Scales</text>
  <!-- Second split for "Has Scales" -->
  <line x1="100" y1="125" x2="100" y2="145" stroke="#64748b" stroke-width="2"/>
  <line x1="60" y1="145" x2="140" y2="145" stroke="#64748b" stroke-width="2"/>
  <line x1="60" y1="145" x2="60" y2="155" stroke="#64748b" stroke-width="2"/>
  <line x1="140" y1="145" x2="140" y2="155" stroke="#64748b" stroke-width="2"/>
  <!-- Lives in Water / Lives on Land (Has Scales) -->
  <rect x="20" y="155" width="80" height="28" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5" rx="3"/>
  <text x="60" y="172" text-anchor="middle" font-size="10" fill="#0c4a6e">Water</text>
  <text x="60" y="185" text-anchor="middle" font-size="9" fill="#64748b">A</text>
  <rect x="110" y="155" width="80" height="28" fill="#fef9c3" stroke="#ca8a04" stroke-width="1.5" rx="3"/>
  <text x="150" y="172" text-anchor="middle" font-size="10" fill="#713f12">Land</text>
  <text x="150" y="185" text-anchor="middle" font-size="9" fill="#64748b">B</text>
  <!-- Second split for "No Scales" -->
  <line x1="300" y1="125" x2="300" y2="145" stroke="#64748b" stroke-width="2"/>
  <line x1="260" y1="145" x2="340" y2="145" stroke="#64748b" stroke-width="2"/>
  <line x1="260" y1="145" x2="260" y2="155" stroke="#64748b" stroke-width="2"/>
  <line x1="340" y1="145" x2="340" y2="155" stroke="#64748b" stroke-width="2"/>
  <!-- Lives in Water / Lives on Land (No Scales) -->
  <rect x="220" y="155" width="80" height="28" fill="#ddd6fe" stroke="#7c3aed" stroke-width="1.5" rx="3"/>
  <text x="260" y="172" text-anchor="middle" font-size="10" fill="#5b21b6">Water</text>
  <text x="260" y="185" text-anchor="middle" font-size="9" fill="#64748b">C</text>
  <rect x="310" y="155" width="80" height="28" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5" rx="3"/>
  <text x="350" y="172" text-anchor="middle" font-size="10" fill="#15803d">Land</text>
  <text x="350" y="185" text-anchor="middle" font-size="9" fill="#64748b">D</text>
  <!-- Legend -->
  <text x="200" y="215" text-anchor="middle" font-size="10" fill="#64748b" font-style="italic">Examples:</text>
  <text x="200" y="230" text-anchor="middle" font-size="9" fill="#64748b">A: Fish (scales, water)</text>
  <text x="200" y="243" text-anchor="middle" font-size="9" fill="#64748b">B: Reptiles (scales, land)</text>
  <text x="200" y="256" text-anchor="middle" font-size="9" fill="#64748b">C & D: Mammals (no scales, water/land)</text>
</svg>''')

# SCI1038: Steel bridge with rollers
fix('SCI1038', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Steel Bridge Structure</text>
  <!-- Left structure (fixed) -->
  <rect x="20" y="120" width="60" height="80" fill="#94a3b8" stroke="#475569" stroke-width="2"/>
  <rect x="30" y="100" width="40" height="20" fill="#64748b" stroke="#475569" stroke-width="1.5"/>
  <!-- Bridge deck -->
  <rect x="80" y="115" width="240" height="12" fill="#3b82f6" stroke="#1e40af" stroke-width="2"/>
  <!-- Bridge support structure (triangular trusses) -->
  <path d="M 100 115 L 110 95 L 120 115" stroke="#1e40af" stroke-width="2" fill="none"/>
  <path d="M 140 115 L 150 95 L 160 115" stroke="#1e40af" stroke-width="2" fill="none"/>
  <path d="M 180 115 L 190 95 L 200 115" stroke="#1e40af" stroke-width="2" fill="none"/>
  <path d="M 220 115 L 230 95 L 240 115" stroke="#1e40af" stroke-width="2" fill="none"/>
  <path d="M 260 115 L 270 95 L 280 115" stroke="#1e40af" stroke-width="2" fill="none"/>
  <path d="M 300 115 L 310 95 L 320 115" stroke="#1e40af" stroke-width="2" fill="none"/>
  <!-- Right structure (with rollers) -->
  <rect x="320" y="120" width="60" height="80" fill="#94a3b8" stroke="#475569" stroke-width="2"/>
  <rect x="330" y="100" width="40" height="20" fill="#64748b" stroke="#475569" stroke="#475569" stroke-width="1.5"/>
  <!-- Rollers -->
  <circle cx="335" cy="115" r="5" fill="#f59e0b" stroke="#92400e" stroke-width="1.5"/>
  <circle cx="350" cy="115" r="5" fill="#f59e0b" stroke="#92400e" stroke-width="1.5"/>
  <circle cx="365" cy="115" r="5" fill="#f59e0b" stroke="#92400e" stroke-width="1.5"/>
  <!-- Fixed connection symbol (left) -->
  <circle cx="80" cy="121" r="4" fill="#ef4444" stroke="#991b1b" stroke-width="2"/>
  <line x1="75" y1="126" x2="68" y2="133" stroke="#991b1b" stroke-width="2"/>
  <line x1="85" y1="126" x2="92" y2="133" stroke="#991b1b" stroke-width="2"/>
  <text x="80" y="150" text-anchor="middle" font-size="10" font-weight="bold" fill="#991b1b">FIXED</text>
  <text x="80" y="162" text-anchor="middle" font-size="9" fill="#991b1b">No movement</text>
  <!-- Roller connection label (right) -->
  <text x="350" y="95" text-anchor="middle" font-size="10" font-weight="bold" fill="#f59e0b">ROLLERS</text>
  <text x="350" y="150" text-anchor="middle" font-size="9" fill="#92400e">Can slide</text>
  <text x="350" y="162" text-anchor="middle" font-size="9" fill="#92400e">horizontally</text>
  <!-- Expansion arrows -->
  <path d="M 180 140 L 160 140" stroke="#16a34a" stroke-width="2" stroke-dasharray="3,2"/>
  <polygon points="155,140 165,137 165,143" fill="#16a34a"/>
  <path d="M 220 140 L 240 140" stroke="#16a34a" stroke-width="2" stroke-dasharray="3,2"/>
  <polygon points="245,140 235,137 235,143" fill="#16a34a"/>
  <text x="200" y="155" text-anchor="middle" font-size="9" fill="#16a34a" font-weight="bold">← Expansion →</text>
  <!-- Ground -->
  <line x1="0" y1="200" x2="400" y2="200" stroke="#64748b" stroke-width="2"/>
  <pattern id="ground" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
    <line x1="0" y1="20" x2="20" y2="0" stroke="#94a3b8" stroke-width="1"/>
  </pattern>
  <rect x="0" y="200" width="400" height="20" fill="url(#ground)"/>
  <!-- Explanation text -->
  <text x="200" y="230" text-anchor="middle" font-size="10" fill="#64748b">Rollers allow bridge to expand/contract without damage</text>
</svg>''')

# SCI1039: Flower parts diagram
fix('SCI1039', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 280" width="350" font-family="Arial,sans-serif">
  <text x="175" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Parts of a Flower</text>
  <!-- Stem -->
  <rect x="165" y="180" width="8" height="80" fill="#16a34a" stroke="#15803d" stroke-width="1"/>
  <!-- Ovary (Part D) - base of flower -->
  <ellipse cx="175" cy="180" rx="22" ry="18" fill="#86efac" stroke="#15803d" stroke-width="2"/>
  <text x="175" y="185" text-anchor="middle" font-size="14" font-weight="bold" fill="#15803d">D</text>
  <!-- Label for D -->
  <line x1="197" y1="180" x2="235" y2="180" stroke="#15803d" stroke-width="1.5"/>
  <text x="240" y="184" font-size="11" fill="#15803d" font-weight="bold">D: Ovary</text>
  <text x="245" y="196" font-size="9" fill="#64748b">(becomes fruit)</text>
  <!-- Petals (Part B) -->
  <ellipse cx="175" cy="125" rx="18" ry="30" fill="#fecdd3" stroke="#e11d48" stroke-width="2" transform="rotate(0,175,125)"/>
  <ellipse cx="175" cy="125" rx="18" ry="30" fill="#fecdd3" stroke="#e11d48" stroke-width="2" transform="rotate(72,175,125)"/>
  <ellipse cx="175" cy="125" rx="18" ry="30" fill="#fecdd3" stroke="#e11d48" stroke-width="2" transform="rotate(144,175,125)"/>
  <ellipse cx="175" cy="125" rx="18" ry="30" fill="#fecdd3" stroke="#e11d48" stroke-width="2" transform="rotate(216,175,125)"/>
  <ellipse cx="175" cy="125" rx="18" ry="30" fill="#fecdd3" stroke="#e11d48" stroke-width="2" transform="rotate(288,175,125)"/>
  <text x="175" y="130" text-anchor="middle" font-size="14" font-weight="bold" fill="#be123c">B</text>
  <!-- Label for B -->
  <line x1="155" y1="105" x2="110" y2="75" stroke="#e11d48" stroke-width="1.5"/>
  <text x="105" y="73" text-anchor="end" font-size="11" fill="#e11d48" font-weight="bold">B: Petals</text>
  <text x="105" y="85" text-anchor="end" font-size="9" fill="#64748b">(attract pollinators)</text>
  <!-- Stamens (Part C) - male parts -->
  <line x1="165" y1="125" x2="165" y2="90" stroke="#f59e0b" stroke-width="2"/>
  <circle cx="165" cy="87" r="3" fill="#fbbf24"/>
  <line x1="185" y1="125" x2="185" y2="90" stroke="#f59e0b" stroke-width="2"/>
  <circle cx="185" cy="87" r="3" fill="#fbbf24"/>
  <line x1="170" y1="125" x2="170" y2="85" stroke="#f59e0b" stroke-width="2"/>
  <circle cx="170" cy="82" r="3" fill="#fbbf24"/>
  <line x1="180" y1="125" x2="180" y2="85" stroke="#f59e0b" stroke-width="2"/>
  <circle cx="180" cy="82" r="3" fill="#fbbf24"/>
  <text x="177" y="73" text-anchor="middle" font-size="12" font-weight="bold" fill="#f59e0b">C</text>
  <!-- Label for C -->
  <line x1="185" y1="87" x2="220" y2="55" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="225" y="50" font-size="11" fill="#f59e0b" font-weight="bold">C: Stamens</text>
  <text x="225" y="62" font-size="9" fill="#64748b">(male, produce pollen)</text>
  <!-- Pistil (Part A) - female part in center -->
  <line x1="175" y1="125" x2="175" y2="75" stroke="#7c3aed" stroke-width="3"/>
  <ellipse cx="175" cy="72" rx="4" ry="5" fill="#a78bfa"/>
  <text x="175" y="65" text-anchor="middle" font-size="14" font-weight="bold" fill="#7c3aed">A</text>
  <!-- Label for A -->
  <line x1="175" y1="65" x2="175" y2="35" stroke="#7c3aed" stroke-width="1.5"/>
  <text x="175" y="30" text-anchor="middle" font-size="11" fill="#7c3aed" font-weight="bold">A: Pistil/Stigma</text>
  <text x="175" y="42" text-anchor="middle" font-size="9" fill="#64748b">(female, receives pollen)</text>
  <!-- Note -->
  <rect x="10" y="230" width="330" height="38" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5" rx="4"/>
  <text x="175" y="245" text-anchor="middle" font-size="10" fill="#78350f" font-weight="bold">Key: Without the ovary (D), no fruit can develop</text>
  <text x="175" y="258" text-anchor="middle" font-size="9" fill="#92400e">After pollination and fertilization, ovary → fruit</text>
</svg>''')

# SCI1040: Plant with black plastic bag covering some leaves
fix('SCI1040', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 280" width="380" font-family="Arial,sans-serif">
  <text x="190" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Food Transport in Plants</text>
  <!-- Pot -->
  <path d="M 140 250 L 150 220 L 230 220 L 240 250 Z" fill="#92400e" stroke="#78350f" stroke-width="2"/>
  <ellipse cx="190" cy="220" rx="40" ry="10" fill="#a16207"/>
  <!-- Soil -->
  <ellipse cx="190" cy="228" rx="38" ry="8" fill="#78350f"/>
  <!-- Main stem -->
  <rect x="186" y="100" width="8" height="120" fill="#16a34a" stroke="#15803d" stroke-width="2"/>
  <!-- Roots (need food too - downward transport) -->
  <path d="M 188 250 Q 175 260 165 270" stroke="#a16207" stroke-width="2" fill="none"/>
  <path d="M 192 250 Q 205 260 215 270" stroke="#a16207" stroke-width="2" fill="none"/>
  <path d="M 190 252 Q 190 262 190 272" stroke="#a16207" stroke-width="2" fill="none"/>
  <!-- Left branch with EXPOSED leaves -->
  <line x1="186" y1="140" x2="120" y2="110" stroke="#16a34a" stroke-width="3"/>
  <ellipse cx="90" cy="95" rx="20" ry="12" fill="#86efac" stroke="#15803d" stroke-width="2"/>
  <ellipse cx="110" cy="105" rx="22" ry="13" fill="#86efac" stroke="#15803d" stroke-width="2"/>
  <ellipse cx="105" cy="88" rx="18" ry="11" fill="#86efac" stroke="#15803d" stroke-width="2"/>
  <!-- Sunlight on exposed leaves -->
  <line x1="55" y1="75" x2="75" y2="85" stroke="#fbbf24" stroke-width="2"/>
  <line x1="60" y1="65" x2="80" y2="80" stroke="#fbbf24" stroke-width="2"/>
  <line x1="50" y1="85" x2="70" y2="95" stroke="#fbbf24" stroke-width="2"/>
  <text x="40" y="70" font-size="9" fill="#f59e0b" font-weight="bold">☀️Light</text>
  <!-- Right branch with COVERED leaves (in black bag) -->
  <line x1="194" y1="140" x2="260" y2="110" stroke="#16a34a" stroke-width="3"/>
  <!-- Black plastic bag -->
  <ellipse cx="280" cy="100" rx="35" ry="30" fill="#1e293b" stroke="#0f172a" stroke-width="2" opacity="0.85"/>
  <text x="280" y="105" text-anchor="middle" font-size="10" fill="white" font-weight="bold">Black</text>
  <text x="280" y="118" text-anchor="middle" font-size="10" fill="white" font-weight="bold">Bag</text>
  <!-- Tie/string -->
  <ellipse cx="260" cy="110" rx="8" ry="4" fill="none" stroke="#64748b" stroke-width="2"/>
  <!-- Food-carrying tubes (phloem) - showing bidirectional transport -->
  <rect x="182" y="100" width="3" height="120" fill="#3b82f6" opacity="0.6"/>
  <!-- Upward arrows (to upper parts) -->
  <polygon points="183,115 183.5,105 184,115" fill="#3b82f6"/>
  <polygon points="183,85 183.5,75 184,85" fill="#3b82f6"/>
  <!-- Downward arrows (to roots) -->
  <polygon points="183,160 183.5,170 184,160" fill="#3b82f6"/>
  <polygon points="183,190 183.5,200 184,190" fill="#3b82f6"/>
  <!-- Labels -->
  <text x="100" y="145" font-size="10" fill="#15803d" font-weight="bold">Exposed leaves</text>
  <text x="95" y="157" font-size="9" fill="#64748b">(make food via</text>
  <text x="95" y="169" font-size="9" fill="#64748b">photosynthesis)</text>
  <rect x="20" y="190" width="160" height="50" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5" rx="4"/>
  <text x="100" y="205" text-anchor="middle" font-size="10" fill="#1e40af" font-weight="bold">Food Transport:</text>
  <text x="100" y="218" text-anchor="middle" font-size="9" fill="#1e40af">↑ Upwards to stem/fruits</text>
  <text x="100" y="231" text-anchor="middle" font-size="9" fill="#1e40af">↓ Downwards to roots</text>
  <!-- Key point -->
  <text x="190" y="268" text-anchor="middle" font-size="10" fill="#64748b">Food travels both up and down in food-carrying tubes (phloem)</text>
</svg>''')

# SCI1041: Inhaled vs Exhaled Air comparison table
fix('SCI1041', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Inhaled Air vs Exhaled Air</text>
  <!-- Table Header -->
  <rect x="40" y="35" width="120" height="35" fill="#e0f2fe" stroke="#3b82f6" stroke-width="2"/>
  <text x="100" y="57" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af">Component</text>
  <rect x="160" y="35" width="100" height="35" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
  <text x="210" y="50" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">Inhaled Air</text>
  <text x="210" y="63" text-anchor="middle" font-size="9" fill="#64748b">(from outside)</text>
  <rect x="260" y="35" width="100" height="35" fill="#bfdbfe" stroke="#3b82f6" stroke-width="2"/>
  <text x="310" y="50" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">Exhaled Air</text>
  <text x="310" y="63" text-anchor="middle" font-size="9" fill="#64748b">(breathed out)</text>
  <!-- Oxygen row -->
  <rect x="40" y="70" width="120" height="32" fill="#f0fdf4" stroke="#94a3b8" stroke-width="1"/>
  <text x="100" y="90" text-anchor="middle" font-size="11" fill="#15803d" font-weight="bold">Oxygen (O₂)</text>
  <rect x="160" y="70" width="100" height="32" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="210" y="90" text-anchor="middle" font-size="11" fill="#16a34a" font-weight="bold">MORE ↑</text>
  <rect x="260" y="70" width="100" height="32" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="310" y="90" text-anchor="middle" font-size="11" fill="#64748b">less</text>
  <!-- Carbon Dioxide row -->
  <rect x="40" y="102" width="120" height="32" fill="#fef3c7" stroke="#94a3b8" stroke-width="1"/>
  <text x="100" y="120" text-anchor="middle" font-size="11" fill="#92400e" font-weight="bold">Carbon Dioxide</text>
  <text x="100" y="130" text-anchor="middle" font-size="9" fill="#92400e">(CO₂)</text>
  <rect x="160" y="102" width="100" height="32" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="210" y="122" text-anchor="middle" font-size="11" fill="#64748b">less</text>
  <rect x="260" y="102" width="100" height="32" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="310" y="122" text-anchor="middle" font-size="11" fill="#f59e0b" font-weight="bold">MORE ↑</text>
  <!-- Water Vapour row (ANSWER) -->
  <rect x="40" y="134" width="120" height="32" fill="#e0e7ff" stroke="#94a3b8" stroke-width="1"/>
  <text x="100" y="152" text-anchor="middle" font-size="11" fill="#4338ca" font-weight="bold">Water Vapour</text>
  <text x="100" y="162" text-anchor="middle" font-size="9" fill="#4338ca">(H₂O)</text>
  <rect x="160" y="134" width="100" height="32" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="210" y="154" text-anchor="middle" font-size="11" fill="#64748b">LESS ↓</text>
  <rect x="260" y="134" width="100" height="32" fill="#fef3c7" stroke="#f59e0b" stroke-width="3"/>
  <text x="310" y="154" text-anchor="middle" font-size="11" fill="#7c2d12" font-weight="bold">MORE ↑ ✓</text>
  <!-- Nitrogen row -->
  <rect x="40" y="166" width="120" height="32" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1"/>
  <text x="100" y="186" text-anchor="middle" font-size="11" fill="#475569" font-weight="bold">Nitrogen (N₂)</text>
  <rect x="160" y="166" width="100" height="32" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="210" y="186" text-anchor="middle" font-size="11" fill="#16a34a" font-weight="bold">SAME =</text>
  <rect x="260" y="166" width="100" height="32" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="310" y="186" text-anchor="middle" font-size="11" fill="#16a34a" font-weight="bold">SAME =</text>
  <!-- Explanation -->
  <rect x="20" y="208" width="360" height="26" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5" rx="4"/>
  <text x="200" y="223" text-anchor="middle" font-size="10" fill="#78350f" font-weight="bold">Exhaled air picks up moisture from moist lung linings,</text>
  <text x="200" y="233" text-anchor="middle" font-size="9" fill="#92400e">making it warmer and containing MORE water vapour</text>
</svg>''')

# SCI1042: Population graph of organisms X, Y, Z
fix('SCI1042', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Population of Organisms Over Time</text>
  <!-- Axes -->
  <line x1="50" y1="240" x2="370" y2="240" stroke="#64748b" stroke-width="2"/>
  <line x1="50" y1="240" x2="50" y2="50" stroke="#64748b" stroke-width="2"/>
  <!-- Y-axis label -->
  <text x="25" y="145" text-anchor="middle" font-size="11" fill="#475569" font-weight="bold" transform="rotate(-90,25,145)">Population</text>
  <!-- X-axis label -->
  <text x="210" y="265" text-anchor="middle" font-size="11" fill="#475569" font-weight="bold">Time</text>
  <!-- Y-axis ticks -->
  <line x1="45" y1="220" x2="50" y2="220" stroke="#94a3b8" stroke-width="1"/>
  <line x1="45" y1="180" x2="50" y2="180" stroke="#94a3b8" stroke-width="1"/>
  <line x1="45" y1="140" x2="50" y2="140" stroke="#94a3b8" stroke-width="1"/>
  <line x1="45" y1="100" x2="50" y2="100" stroke="#94a3b8" stroke-width="1"/>
  <line x1="45" y1="60" x2="50" y2="60" stroke="#94a3b8" stroke-width="1"/>
  <!-- Grid lines -->
  <line x1="50" y1="220" x2="370" y2="220" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="50" y1="180" x2="370" y2="180" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="50" y1="140" x2="370" y2="140" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="50" y1="100" x2="370" y2="100" stroke="#e2e8f0" stroke-width="1"/>
  <!-- Organism X (Producer - relatively stable, middle level) -->
  <path d="M 50 140 L 90 135 L 130 138 L 170 140 L 210 142 L 250 140 L 290 138 L 330 140 L 370 139" 
        stroke="#16a34a" stroke-width="3" fill="none"/>
  <!-- Organism Y (Prey - fluctuates, higher population) -->
  <path d="M 50 100 L 90 80 L 130 90 L 170 70 L 210 95 L 250 75 L 290 100 L 330 85 L 370 105" 
        stroke="#3b82f6" stroke-width="3" fill="none"/>
  <!-- Organism Z (Predator - fluctuates opposite to Y, lower population) -->
  <path d="M 50 180 L 90 200 L 130 190 L 170 210 L 210 185 L 250 205 L 290 180 L 330 195 L 370 175" 
        stroke="#f59e0b" stroke-width="3" fill="none"/>
  <!-- Legend -->
  <rect x="240" y="55" width="120" height="65" fill="white" stroke="#cbd5e1" stroke-width="1.5" rx="4"/>
  <line x1="250" y1="70" x2="275" y2="70" stroke="#16a34a" stroke-width="3"/>
  <text x="280" y="74" font-size="11" fill="#15803d" font-weight="bold">X (Producer)</text>
  <line x1="250" y1="90" x2="275" y2="90" stroke="#3b82f6" stroke-width="3"/>
  <text x="280" y="94" font-size="11" fill="#1e40af" font-weight="bold">Y (Prey)</text>
  <line x1="250" y1="110" x2="275" y2="110" stroke="#f59e0b" stroke-width="3"/>
  <text x="280" y="114" font-size="11" fill="#92400e" font-weight="bold">Z (Predator)</text>
  <!-- Analysis note -->
  <rect x="55" y="200" width="180" height="35" fill="#fef3c7" stroke="#f59e0b" stroke-width="1" rx="3"/>
  <text x="145" y="215" text-anchor="middle" font-size="9" fill="#78350f" font-weight="bold">When Y ↑, then Z ↑ later</text>
  <text x="145" y="227" text-anchor="middle" font-size="9" fill="#92400e">(more prey = more food for predator)</text>
  <!-- Answer indicator -->
  <text x="200" y="42" text-anchor="middle" font-size="10" fill="#3b82f6" font-weight="bold">→ X is prey of Y (Y eats X; Z eats Y)</text>
</svg>''')

# SCI1043: Global warming impact - melting ice
fix('SCI1043', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Impact of Global Warming</text>
  <!-- Sky gradient -->
  <defs>
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#bfdbfe;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#dbeafe;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect x="0" y="30" width="400" height="100" fill="url(#skyGrad)"/>
  <!-- Sun (representing heat) -->
  <circle cx="340" cy="60" r="25" fill="#fbbf24" stroke="#f59e0b" stroke-width="2"/>
  <line x1="340" y1="30" x2="340" y2="20" stroke="#f59e0b" stroke-width="2"/>
  <line x1="365" y1="40" x2="372" y2="33" stroke="#f59e0b" stroke-width="2"/>
  <line x1="370" y1="60" x2="380" y2="60" stroke="#f59e0b" stroke-width="2"/>
  <line x1="365" y1="80" x2="372" y2="87" stroke="#f59e0b" stroke-width="2"/>
  <!-- Heat rays -->
  <line x1="310" y1="75" x2="280" y2="95" stroke="#ef4444" stroke-width="2" opacity="0.6"/>
  <line x1="320" y1="85" x2="290" y2="105" stroke="#ef4444" stroke-width="2" opacity="0.6"/>
  <line x1="330" y1="90" x2="310" y2="110" stroke="#ef4444" stroke-width="2" opacity="0.6"/>
  <text x="270" y="85" font-size="11" fill="#dc2626" font-weight="bold">Heat ↓</text>
  <!-- Ice cap BEFORE (left side) -->
  <text x="100" y="55" text-anchor="middle" font-size="11" fill="#0369a1" font-weight="bold">BEFORE</text>
  <path d="M 40 130 L 50 100 L 70 110 L 90 95 L 110 105 L 130 100 L 150 110 L 160 130 Z" 
        fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
  <path d="M 50 100 L 65 80 L 85 90 L 105 85 L 125 95 L 140 100" 
        fill="#bae6fd" stroke="#0284c7" stroke-width="2"/>
  <!-- Water below ice (before) -->
  <rect x="40" y="130" width="120" height="20" fill="#0ea5e9" opacity="0.4"/>
  <text x="100" y="165" text-anchor="middle" font-size="9" fill="#0369a1">Large ice cap</text>
  <text x="100" y="177" text-anchor="middle" font-size="9" fill="#0369a1">Lower sea level</text>
  <!-- Ice cap AFTER (right side) - SMALLER/MELTING -->
  <text x="300" y="55" text-anchor="middle" font-size="11" fill="#dc2626" font-weight="bold">AFTER</text>
  <path d="M 250 130 L 260 115 L 280 120 L 300 117 L 320 123 L 340 120 L 350 130 Z" 
        fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
  <!-- Water below ice (after) - HIGHER LEVEL -->
  <rect x="240" y="130" width="120" height="35" fill="#0ea5e9" opacity="0.4"/>
  <!-- Dripping water (melting) -->
  <circle cx="270" cy="135" r="2" fill="#3b82f6"/>
  <circle cx="290" cy="138" r="2" fill="#3b82f6"/>
  <circle cx="310" cy="136" r="2" fill="#3b82f6"/>
  <circle cx="330" cy="139" r="2" fill="#3b82f6"/>
  <line x1="270" y1="137" x2="270" y2="145" stroke="#3b82f6" stroke-width="1"/>
  <line x1="290" y1="140" x2="290" y2="150" stroke="#3b82f6" stroke-width="1"/>
  <line x1="310" y1="138" x2="310" y2="148" stroke="#3b82f6" stroke-width="1"/>
  <line x1="330" y1="141" x2="330" y2="152" stroke="#3b82f6" stroke-width="1"/>
  <text x="300" y="180" text-anchor="middle" font-size="9" fill="#dc2626" font-weight="bold">Smaller ice cap ↓</text>
  <text x="300" y="192" text-anchor="middle" font-size="9" fill="#dc2626" font-weight="bold">Higher sea level ↑</text>
  <!-- Result box -->
  <rect x="50" y="210" width="300" height="40" fill="#fee2e2" stroke="#ef4444" stroke-width="2" rx="5"/>
  <text x="200" y="227" text-anchor="middle" font-size="12" fill="#991b1b" font-weight="bold">IMPACT: Polar ice melts faster</text>
  <text x="200" y="242" text-anchor="middle" font-size="10" fill="#7f1d1d">Rising temperatures → accelerated ice melting → rising sea levels</text>
</svg>''')

# SCI1044: Fruit dispersal - winged vs pod fruits with graphs
fix('SCI1044', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" font-family="Arial,sans-serif">
  <text x="200" y="16" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Seed Dispersal Methods</text>
  <!-- Plant A: Winged fruit (wind dispersal) -->
  <text x="80" y="38" text-anchor="middle" font-size="12" fill="#0369a1" font-weight="bold">Plant A: Wind</text>
  <ellipse cx="60" cy="65" rx="18" ry="8" fill="#fbbf24" stroke="#f59e0b" stroke-width="2"/>
  <path d="M 60 65 L 40 60 L 35 65 L 40 70 L 60 65" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5"/>
  <path d="M 60 65 L 80 60 L 85 65 L 80 70 L 60 65" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="80" y="88" text-anchor="middle" font-size="9" fill="#64748b">Wing-like structures</text>
  <text x="80" y="100" text-anchor="middle" font-size="9" fill="#64748b">Travel FAR by wind</text>
  <!-- Plant B: Pod fruit (explosive/splitting) -->
  <text x="280" y="38" text-anchor="middle" font-size="12" fill="#15803d" font-weight="bold">Plant B: Splitting</text>
  <ellipse cx="280" cy="60" rx="25" ry="12" fill="#86efac" stroke="#16a34a" stroke-width="2"/>
  <line x1="280" y1="48" x2="280" y2="72" stroke="#15803d" stroke-width="2"/>
  <path d="M 280 60 L 265 58 L 260 60 L 265 62" fill="#22c55e" stroke="#15803d" stroke-width="1"/>
  <path d="M 280 60 L 295 58 L 300 60 L 295 62" fill="#22c55e" stroke="#15803d" stroke-width="1"/>
  <circle cx="268" cy="58" r="2" fill="#78350f"/>
  <circle cx="292" cy="62" r="2" fill="#78350f"/>
  <circle cx="275" cy="64" r="2" fill="#78350f"/>
  <text x="280" y="88" text-anchor="middle" font-size="9" fill="#64748b">Pod splits open</text>
  <text x="280" y="100" text-anchor="middle" font-size="9" fill="#64748b">Seeds land NEAR parent</text>
  <!-- Graph showing number of young plants vs distance -->
  <rect x="30" y="115" width="340" height="165" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" rx="4"/>
  <text x="200" y="133" text-anchor="middle" font-size="11" fill="#475569" font-weight="bold">Number of Young Plants at Various Distances</text>
  <!-- Axes -->
  <line x1="60" y1="250" x2="350" y2="250" stroke="#64748b" stroke-width="2"/>
  <line x1="60" y1="250" x2="60" y2="155" stroke="#64748b" stroke-width="2"/>
  <!-- Y-axis label -->
  <text x="48" y="200" text-anchor="middle" font-size="9" fill="#475569" transform="rotate(-90,48,200)">Number of plants</text>
  <!-- X-axis label -->
  <text x="205" y="268" text-anchor="middle" font-size="9" fill="#475569">Distance from parent plant →</text>
  <!-- Distance labels -->
  <text x="60" y="262" text-anchor="middle" font-size="8" fill="#64748b">0m</text>
  <text x="205" y="262" text-anchor="middle" font-size="8" fill="#64748b">5m</text>
  <text x="350" y="262" text-anchor="middle" font-size="8" fill="#64748b">10m+</text>
  <!-- Plant A line (wind - increases with distance) -->
  <path d="M 60 245 L 120 230 L 180 210 L 240 185 L 300 170 L 350 165" 
        stroke="#3b82f6" stroke-width="3" fill="none"/>
  <circle cx="60" cy="245" r="4" fill="#3b82f6"/>
  <circle cx="350" cy="165" r="4" fill="#3b82f6"/>
  <!-- Plant B line (splitting - decreases with distance) -->
  <path d="M 60 170 L 120 185 L 180 205 L 240 225 L 300 238 L 350 245" 
        stroke="#16a34a" stroke-width="3" fill="none"/>
  <circle cx="60" cy="170" r="4" fill="#16a34a"/>
  <circle cx="350" cy="245" r="4" fill="#16a34a"/>
  <!-- Legend -->
  <line x1="270" y1="148" x2="295" y2="148" stroke="#3b82f6" stroke-width="3"/>
  <text x="300" y="152" font-size="10" fill="#1e40af" font-weight="bold">Plant A (↑ far)</text>
  <line x1="270" y1="162" x2="295" y2="162" stroke="#16a34a" stroke-width="3"/>
  <text x="300" y="166" font-size="10" fill="#15803d" font-weight="bold">Plant B (↓ far)</text>
  <!-- Correct answer indicator -->
  <text x="200" y="290" text-anchor="middle" font-size="9" fill="#f59e0b" font-weight="bold">✓ Graph shows A travels far (wind), B stays close (splitting)</text>
</svg>''')

# SCI1045: Blood flow diagram with oxygen/CO2 levels
fix('SCI1045', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Blood Flow and Gas Exchange</text>
  <!-- Lungs (top left) -->
  <ellipse cx="90" cy="80" rx="35" ry="40" fill="#fce7f3" stroke="#ec4899" stroke-width="2"/>
  <ellipse cx="75" cy="75" rx="15" ry="18" fill="#fbcfe8" stroke="#db2777" stroke-width="1"/>
  <ellipse cx="105" cy="85" rx="15" ry="18" fill="#fbcfe8" stroke="#db2777" stroke-width="1"/>
  <text x="90" y="135" text-anchor="middle" font-size="11" fill="#be185d" font-weight="bold">LUNGS</text>
  <text x="90" y="147" text-anchor="middle" font-size="8" fill="#9f1239">(gain O₂, lose CO₂)</text>
  <!-- Heart (center) -->
  <path d="M 200 90 L 190 110 L 200 140 L 210 110 Z" fill="#fecaca" stroke="#dc2626" stroke-width="2"/>
  <text x="200" y="125" text-anchor="middle" font-size="12" fill="#991b1b" font-weight="bold">♥</text>
  <text x="200" y="160" text-anchor="middle" font-size="11" fill="#991b1b" font-weight="bold">HEART</text>
  <!-- Body parts (bottom right) -->
  <rect x="280" y="180" width="70" height="60" fill="#e0e7ff" stroke="#6366f1" stroke-width="2" rx="5"/>
  <text x="315" y="205" text-anchor="middle" font-size="10" fill="#4338ca" font-weight="bold">Body</text>
  <text x="315" y="218" text-anchor="middle" font-size="10" fill="#4338ca" font-weight="bold">Parts</text>
  <text x="315" y="232" text-anchor="middle" font-size="8" fill="#3730a3">(use O₂,</text>
  <text x="315" y="242" text-anchor="middle" font-size="8" fill="#3730a3">produce CO₂)</text>
  <!-- Vessel A: Lungs → Heart (high O₂, low CO₂) -->
  <path d="M 120 90 L 180 100" stroke="#ef4444" stroke-width="4" fill="none"/>
  <polygon points="177,96 187,100 177,104" fill="#ef4444"/>
  <text x="150" y="88" text-anchor="middle" font-size="10" fill="#dc2626" font-weight="bold">A</text>
  <rect x="125" y="65" width="50" height="18" fill="#fee2e2" stroke="#dc2626" stroke-width="1" rx="2"/>
  <text x="150" y="77" text-anchor="middle" font-size="8" fill="#7f1d1d" font-weight="bold">High O₂</text>
  <!-- Vessel B: Heart → Body (high O₂) -->
  <path d="M 210 130 L 270 180" stroke="#ef4444" stroke-width="4" fill="none"/>
  <polygon points="266,176 275,182 268,185" fill="#ef4444"/>
  <text x="245" y="150" text-anchor="middle" font-size="10" fill="#dc2626" font-weight="bold">B</text>
  <rect x="220" y="135" width="50" height="18" fill="#fee2e2" stroke="#dc2626" stroke-width="1" rx="2"/>
  <text x="245" y="147" text-anchor="middle" font-size="8" fill="#7f1d1d" font-weight="bold">High O₂</text>
  <!-- Vessel C: Body → Heart (low O₂, high CO₂) -->
  <path d="M 280 200 L 215 120" stroke="#3b82f6" stroke-width="4" fill="none"/>
  <polygon points="218,124 212,117 212,127" fill="#3b82f6"/>
  <text x="252" y="165" text-anchor="middle" font-size="10" fill="#1e40af" font-weight="bold">C</text>
  <rect x="237" y="170" width="50" height="18" fill="#dbeafe" stroke="#3b82f6" stroke-width="1" rx="2"/>
  <text x="262" y="182" text-anchor="middle" font-size="8" fill="#1e3a8a" font-weight="bold">Low O₂</text>
  <!-- Vessel D: Heart → Lungs (low O₂, high CO₂) -->
  <path d="M 185 105 L 115 85" stroke="#3b82f6" stroke-width="4" fill="none"/>
  <polygon points="118,89 110,84 117,81" fill="#3b82f6"/>
  <text x="150" y="105" text-anchor="middle" font-size="10" fill="#1e40af" font-weight="bold">D</text>
  <rect x="135" y="105" width="55" height="18" fill="#dbeafe" stroke="#3b82f6" stroke-width="1" rx="2"/>
  <text x="162" y="117" text-anchor="middle" font-size="8" fill="#1e3a8a" font-weight="bold">High CO₂</text>
  <!-- Legend -->
  <rect x="30" y="185" width="140" height="55" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" rx="4"/>
  <line x1="40" y1="200" x2="65" y2="200" stroke="#ef4444" stroke-width="3"/>
  <text x="72" y="204" font-size="9" fill="#dc2626">Oxygen-rich blood</text>
  <line x1="40" y1="218" x2="65" y2="218" stroke="#3b82f6" stroke-width="3"/>
  <text x="72" y="222" font-size="9" fill="#1e40af">Oxygen-poor blood</text>
  <text x="100" y="235" text-anchor="middle" font-size="8" fill="#64748b">(high CO₂)</text>
  <!-- Answer -->
  <rect x="30" y="250" width="340" height="22" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5" rx="3"/>
  <text x="200" y="265" text-anchor="middle" font-size="10" fill="#78350f" font-weight="bold">✓ Answer C: Less CO₂ in A than in B (A from lungs, B to body)</text>
</svg>''')

# SCI1046: Digestive system diagram
fix('SCI1046', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 300" width="350" font-family="Arial,sans-serif">
  <text x="175" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Human Digestive System</text>
  <!-- Mouth -->
  <ellipse cx="175" cy="45" rx="18" ry="10" fill="#fecdd3" stroke="#e11d48" stroke-width="2"/>
  <text x="175" y="50" text-anchor="middle" font-size="9" fill="#be123c" font-weight="bold">Mouth</text>
  <!-- Esophagus -->
  <rect x="168" y="55" width="14" height="35" fill="#fda4af" stroke="#e11d48" stroke-width="1.5"/>
  <!-- Part A: Stomach -->
  <ellipse cx="175" cy="120" rx="35" ry="30" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <text x="175" y="125" text-anchor="middle" font-size="16" fill="#f59e0b" font-weight="bold">A</text>
  <line x1="145" y1="115" x2="115" y2="105" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="110" y="105" text-anchor="end" font-size="10" fill="#92400e" font-weight="bold">A: Stomach</text>
  <text x="110" y="117" text-anchor="end" font-size="8" fill="#64748b">(digestion starts)</text>
  <!-- Part B: Small Intestine -->
  <path d="M 175 150 Q 150 165 160 185 Q 170 200 155 210 Q 140 220 150 235" 
        stroke="#3b82f6" stroke-width="8" fill="none"/>
  <path d="M 150 235 Q 165 245 180 240 Q 200 235 210 245 Q 220 255 205 265" 
        stroke="#3b82f6" stroke-width="8" fill="none"/>
  <text x="175" y="213" text-anchor="middle" font-size="16" fill="#dbeafe" font-weight="bold" stroke="#1e40af" stroke-width="0.5">B</text>
  <line x1="205" y1="200" x2="245" y2="190" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="250" y="190" font-size="10" fill="#1e40af" font-weight="bold">B: Small Intestine</text>
  <text x="250" y="202" font-size="8" fill="#64748b">(main digestion site)</text>
  <!-- Part C: Large Intestine -->
  <path d="M 120 160 L 100 165 L 90 180 L 90 240 L 110 260" 
        stroke="#16a34a" stroke-width="10" fill="none"/>
  <path d="M 230 160 L 250 165 L 260 180 L 260 240 L 240 260" 
        stroke="#16a34a" stroke-width="10" fill="none"/>
  <text x="75" y="205" text-anchor="middle" font-size="16" fill="#dcfce7" font-weight="bold" stroke="#15803d" stroke-width="0.5">C</text>
  <line x1="70" y1="180" x2="35" y2="170" stroke="#16a34a" stroke-width="1.5"/>
  <text x="30" y="168" text-anchor="end" font-size="10" fill="#15803d" font-weight="bold">C: Large</text>
  <text x="30" y="180" text-anchor="end" font-size="10" fill="#15803d" font-weight="bold">Intestine</text>
  <text x="30" y="192" text-anchor="end" font-size="8" fill="#64748b">(absorbs water)</text>
  <text x="30" y="203" text-anchor="end" font-size="8" fill="#64748b">(NO digestion)</text>
  <!-- Part D: Anus -->
  <ellipse cx="175" cy="275" rx="12" ry="8" fill="#94a3b8" stroke="#475569" stroke-width="2"/>
  <text x="175" y="279" text-anchor="middle" font-size="12" fill="#1e293b" font-weight="bold">D</text>
  <line x1="187" y1="275" x2="220" y2="275" stroke="#475569" stroke-width="1.5"/>
  <text x="225" y="275" font-size="10" fill="#475569" font-weight="bold">D: Anus</text>
  <text x="225" y="287" font-size="8" fill="#64748b">(exit point)</text>
  <!-- Connecting path from C to D -->
  <line x1="110" y1="260" x2="165" y2="270" stroke="#64748b" stroke-width="3"/>
  <line x1="240" y1="260" x2="185" y2="270" stroke="#64748b" stroke-width="3"/>
  <!-- Key information box -->
  <rect x="20" y="35" width="120" height="45" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5" rx="4"/>
  <text x="80" y="50" text-anchor="middle" font-size="10" fill="#15803d" font-weight="bold">Key Point:</text>
  <text x="80" y="63" text-anchor="middle" font-size="9" fill="#15803d">C & D do NOT digest</text>
  <text x="80" y="75" text-anchor="middle" font-size="9" fill="#15803d">Undigested food is</text>
  <text x="80" y="87" text-anchor="middle" font-size="9" fill="#15803d">the SAME in C and D ✓</text>
</svg>''')

# SCI1047: Photosynthesis experiment with 4 setups
fix('SCI1047', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 280" width="420" font-family="Arial,sans-serif">
  <text x="210" y="16" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Photosynthesis Experiment - Testing Carbon Dioxide</text>
  <!-- Setup A: Clear box, CO2 present -->
  <rect x="20" y="35" width="90" height="110" fill="none" stroke="#3b82f6" stroke-width="3" stroke-dasharray="5,3"/>
  <text x="65" y="52" text-anchor="middle" font-size="13" fill="#1e40af" font-weight="bold">Setup A</text>
  <rect x="40" y="105" width="50" height="30" fill="#92400e" stroke="#78350f" stroke-width="2"/>
  <rect x="52" y="95" width="26" height="10" fill="#a16207"/>
  <ellipse cx="65" cy="100" rx="10" ry="3" fill="#78350f"/>
  <line x1="65" y1="100" x2="65" y2="70" stroke="#16a34a" stroke-width="3"/>
  <ellipse cx="58" cy="75" rx="8" ry="5" fill="#86efac" stroke="#15803d" stroke-width="1"/>
  <ellipse cx="72" cy="75" rx="8" ry="5" fill="#86efac" stroke="#15803d" stroke-width="1"/>
  <ellipse cx="65" cy="68" rx="7" ry="5" fill="#86efac" stroke="#15803d" stroke-width="1"/>
  <text x="65" y="160" text-anchor="middle" font-size="9" fill="#1e40af" font-weight="bold">Clear glass box</text>
  <text x="65" y="172" text-anchor="middle" font-size="8" fill="#64748b">CO₂ present ✓</text>
  <text x="65" y="183" text-anchor="middle" font-size="8" fill="#64748b">Bright sunlight ✓</text>
  <!-- Sun for A -->
  <circle cx="95" cy="50" r="8" fill="#fbbf24" stroke="#f59e0b" stroke-width="1"/>
  <line x1="95" y1="38" x2="95" y2="33" stroke="#f59e0b" stroke-width="1"/>
  <line x1="103" y1="43" x2="107" y2="39" stroke="#f59e0b" stroke-width="1"/>
  <!-- Setup B: Wooden box (blocks light) -->
  <rect x="125" y="35" width="90" height="110" fill="#78350f" stroke="#451a03" stroke-width="3"/>
  <text x="170" y="52" text-anchor="middle" font-size="13" fill="#fef3c7" font-weight="bold">Setup B</text>
  <rect x="145" y="105" width="50" height="30" fill="#92400e" stroke="#78350f" stroke-width="2"/>
  <rect x="157" y="95" width="26" height="10" fill="#a16207"/>
  <ellipse cx="170" cy="100" rx="10" ry="3" fill="#78350f"/>
  <line x1="170" y1="100" x2="170" y2="70" stroke="#15803d" stroke-width="3"/>
  <ellipse cx="163" cy="75" rx="8" ry="5" fill="#4d7c0f" stroke="#15803d" stroke-width="1"/>
  <ellipse cx="177" cy="75" rx="8" ry="5" fill="#4d7c0f" stroke="#15803d" stroke-width="1"/>
  <text x="170" y="160" text-anchor="middle" font-size="9" fill="#fef3c7" font-weight="bold">Wooden box</text>
  <text x="170" y="172" text-anchor="middle" font-size="8" fill="#fbbf24">CO₂ present</text>
  <text x="170" y="183" text-anchor="middle" font-size="8" fill="#fbbf24">NO light ✗</text>
  <!-- Setup C: Clear box, CO2 removed -->
  <rect x="230" y="35" width="90" height="110" fill="none" stroke="#3b82f6" stroke-width="3" stroke-dasharray="5,3"/>
  <text x="275" y="52" text-anchor="middle" font-size="13" fill="#1e40af" font-weight="bold">Setup C</text>
  <rect x="250" y="105" width="50" height="30" fill="#92400e" stroke="#78350f" stroke-width="2"/>
  <rect x="262" y="95" width="26" height="10" fill="#a16207"/>
  <ellipse cx="275" cy="100" rx="10" ry="3" fill="#78350f"/>
  <line x1="275" y1="100" x2="275" y2="70" stroke="#16a34a" stroke-width="3"/>
  <ellipse cx="268" cy="75" rx="8" ry="5" fill="#86efac" stroke="#15803d" stroke-width="1"/>
  <ellipse cx="282" cy="75" rx="8" ry="5" fill="#86efac" stroke="#15803d" stroke-width="1"/>
  <circle cx="295" cy="60" r="8" fill="#cbd5e1" stroke="#64748b" stroke-width="1.5"/>
  <text x="295" y="64" text-anchor="middle" font-size="7" fill="#1e293b" font-weight="bold">CO₂</text>
  <text x="295" y="72" text-anchor="middle" font-size="7" fill="#1e293b" font-weight="bold">absorb</text>
  <text x="275" y="160" text-anchor="middle" font-size="9" fill="#1e40af" font-weight="bold">Clear glass box</text>
  <text x="275" y="172" text-anchor="middle" font-size="8" fill="#64748b">CO₂ removed ✓</text>
  <text x="275" y="183" text-anchor="middle" font-size="8" fill="#64748b">Bright sunlight ✓</text>
  <!-- Sun for C -->
  <circle cx="305" cy="50" r="8" fill="#fbbf24" stroke="#f59e0b" stroke-width="1"/>
  <line x1="305" y1="38" x2="305" y2="33" stroke="#f59e0b" stroke-width="1"/>
  <line x1="313" y1="43" x2="317" y2="39" stroke="#f59e0b" stroke-width="1"/>
  <!-- Setup D: Sealed plastic bag -->
  <ellipse cx="370" cy="90" rx="35" ry="50" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" opacity="0.6"/>
  <text x="370" y="52" text-anchor="middle" font-size="13" fill="#0369a1" font-weight="bold">Setup D</text>
  <rect x="350" y="105" width="40" height="25" fill="#92400e" stroke="#78350f" stroke-width="2"/>
  <rect x="360" y="97" width="20" height="8" fill="#a16207"/>
  <ellipse cx="370" cy="100" rx="8" ry="3" fill="#78350f"/>
  <line x1="370" y1="100" x2="370" y2="75" stroke="#16a34a" stroke-width="2.5"/>
  <ellipse cx="365" cy="80" rx="6" ry="4" fill="#86efac" stroke="#15803d" stroke-width="1"/>
  <ellipse cx="375" cy="80" rx="6" ry="4" fill="#86efac" stroke="#15803d" stroke-width="1"/>
  <text x="370" y="160" text-anchor="middle" font-size="9" fill="#0369a1" font-weight="bold">Sealed bag</text>
  <text x="370" y="172" text-anchor="middle" font-size="8" fill="#64748b">Different condition</text>
  <text x="370" y="183" text-anchor="middle" font-size="8" fill="#64748b">Changes 2 variables ✗</text>
  <!-- Answer box -->
  <rect x="40" y="200" width="340" height="70" fill="#dcfce7" stroke="#16a34a" stroke-width="2" rx="5"/>
  <text x="210" y="218" text-anchor="middle" font-size="12" fill="#15803d" font-weight="bold">FAIR TEST: Only change ONE variable (CO₂)</text>
  <text x="210" y="235" text-anchor="middle" font-size="11" fill="#166534">✓ Answer A: Use A and C</text>
  <text x="210" y="250" text-anchor="middle" font-size="10" fill="#64748b">A has CO₂ + light | C removes CO₂ but keeps light</text>
  <text x="210" y="263" text-anchor="middle" font-size="9" fill="#64748b">Both in clear boxes under bright sunlight → Only CO₂ is different</text>
</svg>''')

# SCI1048: Desert animal adaptations table
fix('SCI1048', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 260" width="420" font-family="Arial,sans-serif">
  <text x="210" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Desert Animal Adaptations</text>
  <!-- Desert scene background -->
  <rect x="0" y="30" width="420" height="40" fill="#fef3c7"/>
  <circle cx="380" cy="45" r="18" fill="#fbbf24" stroke="#f59e0b" stroke-width="2"/>
  <text x="50" y="55" font-size="11" fill="#92400e" font-style="italic">Hot desert: Very hot days, cold nights</text>
  <!-- Table header -->
  <rect x="30" y="80" width="50" height="30" fill="#bfdbfe" stroke="#3b82f6" stroke-width="2"/>
  <text x="55" y="100" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e40af">#</text>
  <rect x="80" y="80" width="150" height="30" fill="#bfdbfe" stroke="#3b82f6" stroke-width="2"/>
  <text x="155" y="100" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">Adaptation</text>
  <rect x="230" y="80" width="160" height="30" fill="#bfdbfe" stroke="#3b82f6" stroke-width="2"/>
  <text x="310" y="100" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">How it Helps Survival</text>
  <!-- Row 1: Keen sense of smell -->
  <rect x="30" y="110" width="50" height="30" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="55" y="130" text-anchor="middle" font-size="11" fill="#475569" font-weight="bold">(1)</text>
  <rect x="80" y="110" width="150" height="30" fill="#f0fdf4" stroke="#94a3b8" stroke-width="1"/>
  <text x="155" y="128" text-anchor="middle" font-size="10" fill="#15803d">Keen sense of smell</text>
  <rect x="230" y="110" width="160" height="30" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="310" y="128" text-anchor="middle" font-size="9" fill="#64748b">Find prey more easily ✓</text>
  <!-- Row 2: Active at night -->
  <rect x="30" y="140" width="50" height="30" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="55" y="160" text-anchor="middle" font-size="11" fill="#475569" font-weight="bold">(2)</text>
  <rect x="80" y="140" width="150" height="30" fill="#f0fdf4" stroke="#94a3b8" stroke-width="1"/>
  <text x="155" y="158" text-anchor="middle" font-size="10" fill="#15803d">Active at night</text>
  <rect x="230" y="140" width="160" height="30" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="310" y="158" text-anchor="middle" font-size="9" fill="#64748b">Avoid heat in the day ✓</text>
  <!-- Row 3: Large ears - INCORRECT -->
  <rect x="30" y="170" width="50" height="35" fill="#fef3c7" stroke="#f59e0b" stroke-width="3"/>
  <text x="55" y="192" text-anchor="middle" font-size="11" fill="#92400e" font-weight="bold">(3)</text>
  <rect x="80" y="170" width="150" height="35" fill="#fef3c7" stroke="#f59e0b" stroke-width="3"/>
  <text x="155" y="190" text-anchor="middle" font-size="10" fill="#92400e" font-weight="bold">Large ears</text>
  <rect x="230" y="170" width="160" height="35" fill="#fee2e2" stroke="#ef4444" stroke-width="3"/>
  <text x="310" y="185" text-anchor="middle" font-size="9" fill="#991b1b" font-weight="bold">✗ WRONG: "Gain heat"</text>
  <text x="310" y="198" text-anchor="middle" font-size="8" fill="#7f1d1d">Actually: LOSE heat to stay cool!</text>
  <!-- Row 4: Pale fur -->
  <rect x="30" y="205" width="50" height="30" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="55" y="225" text-anchor="middle" font-size="11" fill="#475569" font-weight="bold">(4)</text>
  <rect x="80" y="205" width="150" height="30" fill="#f0fdf4" stroke="#94a3b8" stroke-width="1"/>
  <text x="155" y="223" text-anchor="middle" font-size="10" fill="#15803d">Pale fur</text>
  <rect x="230" y="205" width="160" height="30" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="310" y="223" text-anchor="middle" font-size="9" fill="#64748b">Blend with surroundings ✓</text>
  <!-- Explanation box -->
  <rect x="30" y="240" width="360" height="16" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5" rx="3"/>
  <text x="210" y="252" text-anchor="middle" font-size="10" fill="#1e40af" font-weight="bold">Answer (3): Large ears LOSE heat (not gain), helping animal stay cool in hot desert</text>
</svg>''')

# SCI1049: Leaves with plastic bags - food production graph
fix('SCI1049', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="400" font-family="Arial,sans-serif">
  <text x="200" y="16" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Food Production by Leaves (3 hours)</text>
  <!-- Plant illustration (top) -->
  <text x="200" y="36" text-anchor="middle" font-size="10" fill="#64748b" font-style="italic">Plant in clear box with limited air, placed in open field</text>
  <!-- Leaf 1: Normal (no bag) -->
  <ellipse cx="80" cy="65" rx="18" ry="12" fill="#86efac" stroke="#15803d" stroke-width="2"/>
  <text x="80" y="85" text-anchor="middle" font-size="9" fill="#15803d" font-weight="bold">Leaf 1</text>
  <text x="80" y="96" text-anchor="middle" font-size="8" fill="#64748b">No bag</text>
  <!-- Leaf 2: Bag with substance Z -->
  <ellipse cx="200" cy="65" rx="18" ry="12" fill="#86efac" stroke="#15803d" stroke-width="1.5"/>
  <ellipse cx="200" cy="65" rx="28" ry="20" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="3,2"/>
  <text x="200" y="50" text-anchor="middle" font-size="8" fill="#f59e0b" font-weight="bold">Bag + Z</text>
  <text x="200" y="85" text-anchor="middle" font-size="9" fill="#92400e" font-weight="bold">Leaf 2</text>
  <text x="200" y="96" text-anchor="middle" font-size="8" fill="#64748b">With substance Z</text>
  <!-- Leaf 3: Empty bag -->
  <ellipse cx="320" cy="65" rx="18" ry="12" fill="#86efac" stroke="#15803d" stroke-width="1.5"/>
  <ellipse cx="320" cy="65" rx="28" ry="20" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="3,2"/>
  <text x="320" y="50" text-anchor="middle" font-size="8" fill="#64748b" font-weight="bold">Empty bag</text>
  <text x="320" y="85" text-anchor="middle" font-size="9" fill="#64748b" font-weight="bold">Leaf 3</text>
  <text x="320" y="96" text-anchor="middle" font-size="8" fill="#64748b">Empty plastic bag</text>
  <!-- Graph -->
  <rect x="40" y="110" width="330" height="140" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" rx="4"/>
  <text x="205" y="128" text-anchor="middle" font-size="11" fill="#475569" font-weight="bold">Amount of Food Made (3 hours)</text>
  <!-- Axes -->
  <line x1="70" y1="230" x2="350" y2="230" stroke="#64748b" stroke-width="2"/>
  <line x1="70" y1="230" x2="70" y2="145" stroke="#64748b" stroke-width="2"/>
  <!-- Y-axis label -->
  <text x="58" y="190" text-anchor="middle" font-size="9" fill="#475569" transform="rotate(-90,58,190)">Amount of Food</text>
  <!-- X-axis labels -->
  <text x="120" y="245" text-anchor="middle" font-size="10" fill="#475569" font-weight="bold">Leaf 1</text>
  <text x="210" y="245" text-anchor="middle" font-size="10" fill="#475569" font-weight="bold">Leaf 2</text>
  <text x="300" y="245" text-anchor="middle" font-size="10" fill="#475569" font-weight="bold">Leaf 3</text>
  <!-- Grid lines -->
  <line x1="70" y1="210" x2="350" y2="210" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="70" y1="190" x2="350" y2="190" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="70" y1="170" x2="350" y2="170" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="70" y1="150" x2="350" y2="150" stroke="#e2e8f0" stroke-width="1"/>
  <!-- Bar 1: Leaf 1 (medium-high) -->
  <rect x="95" y="165" width="50" height="65" fill="#86efac" stroke="#16a34a" stroke-width="2"/>
  <text x="120" y="202" text-anchor="middle" font-size="10" fill="#15803d" font-weight="bold">High</text>
  <!-- Bar 2: Leaf 2 (highest - with substance Z) -->
  <rect x="185" y="150" width="50" height="80" fill="#fbbf24" stroke="#f59e0b" stroke-width="2"/>
  <text x="210" y="192" text-anchor="middle" font-size="10" fill="#92400e" font-weight="bold">Highest</text>
  <!-- Bar 3: Leaf 3 (medium-high, similar to Leaf 1) -->
  <rect x="275" y="168" width="50" height="62" fill="#cbd5e1" stroke="#64748b" stroke-width="2"/>
  <text x="300" y="202" text-anchor="middle" font-size="10" fill="#475569" font-weight="bold">High</text>
  <!-- Conclusion box -->
  <rect x="50" y="255" width="310" height="20" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5" rx="3"/>
  <text x="205" y="269" text-anchor="middle" font-size="10" fill="#78350f" font-weight="bold">✓ Substance Z produces CO₂ (all leaves make food → CO₂ available)</text>
</svg>''')

with open('data/questions-science-p6.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("✅ Added diagrams to SCI1036-1049 (14 questions)")
print("   • SCI1036: Plant bending towards light")
print("   • SCI1037: Organism classification chart")
print("   • SCI1038: Steel bridge with rollers")
print("   • SCI1039: Flower parts diagram")
print("   • SCI1040: Food transport in plants")
print("   • SCI1041: Inhaled vs exhaled air comparison")
print("   • SCI1042: Population graph (predator-prey)")
print("   • SCI1043: Global warming - melting ice")
print("   • SCI1044: Fruit dispersal methods & graph")
print("   • SCI1045: Blood flow diagram")
print("   • SCI1046: Digestive system")
print("   • SCI1047: Photosynthesis experiment (4 setups)")
print("   • SCI1048: Desert animal adaptations table")
print("   • SCI1049: Food production by leaves graph")
