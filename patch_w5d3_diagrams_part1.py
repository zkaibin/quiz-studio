import json

# Read the data file
with open('data/questions-science-p6.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Create index for quick access
idx = {q['id']: i for i, q in enumerate(data)}

def fix(qid, diagram):
    data[idx[qid]]['diagram'] = diagram

# SCI980: Animal classification table
fix('SCI980', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 220" width="380" font-family="Arial,sans-serif">
  <text x="190" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Animal Classification</text>
  <!-- Headers -->
  <rect x="10" y="28" width="110" height="35" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
  <text x="65" y="50" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af">Lays Eggs</text>
  <rect x="10" y="63" width="110" height="35" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
  <text x="65" y="85" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af">Gives Birth to Young</text>
  <!-- Group 1: Lays eggs -->
  <rect x="125" y="28" width="70" height="35" fill="#fff" stroke="#64748b" stroke-width="1"/>
  <text x="160" y="43" text-anchor="middle" font-size="11" fill="#334155">🐦 Bird</text>
  <rect x="200" y="28" width="80" height="35" fill="#fff" stroke="#64748b" stroke-width="1"/>
  <text x="240" y="43" text-anchor="middle" font-size="11" fill="#334155">🦋 Butterfly</text>
  <rect x="285" y="28" width="85" height="35" fill="#fff" stroke="#64748b" stroke-width="1"/>
  <text x="328" y="43" text-anchor="middle" font-size="11" fill="#334155">🐢 Turtle</text>
  <!-- Group 2: Gives birth -->
  <rect x="125" y="63" width="70" height="35" fill="#fff" stroke="#64748b" stroke-width="1"/>
  <text x="160" y="78" text-anchor="middle" font-size="11" fill="#334155">🐱 Cat</text>
  <rect x="200" y="63" width="80" height="35" fill="#fff" stroke="#64748b" stroke-width="1"/>
  <text x="240" y="78" text-anchor="middle" font-size="11" fill="#334155">🐘 Elephant</text>
  <rect x="285" y="63" width="85" height="35" fill="#fff" stroke="#64748b" stroke-width="1"/>
  <text x="328" y="78" text-anchor="middle" font-size="11" fill="#334155">🐻 Bear</text>
  <!-- Labels -->
  <text x="190" y="118" text-anchor="middle" font-size="11" fill="#64748b">Group 1: 3 animals (lay eggs)</text>
  <text x="190" y="135" text-anchor="middle" font-size="11" fill="#64748b">Group 2: 3 animals (give birth to young alive)</text>
</svg>''')

# SCI981: Carnival ride with forces
fix('SCI981', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 280" width="320" font-family="Arial,sans-serif">
  <text x="160" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Carnival Ride Forces</text>
  <!-- Ride structure -->
  <line x1="60" y1="40" x2="60" y2="100" stroke="#64748b" stroke-width="3"/>
  <line x1="260" y1="40" x2="260" y2="100" stroke="#64748b" stroke-width="3"/>
  <rect x="50" y="100" width="220" height="12" fill="#64748b" rx="2"/>
  <!-- Seat with child -->
  <rect x="135" y="112" width="50" height="55" fill="#3b82f6" stroke="#1e40af" stroke-width="2" rx="5"/>
  <circle cx="160" cy="135" r="15" fill="#fbbf24" stroke="#92400e" stroke-width="2"/>
  <text x="160" y="141" text-anchor="middle" font-size="12" fill="#000">👤</text>
  <!-- Directional arrows -->
  <!-- S: Up -->
  <line x1="160" y1="90" x2="160" y2="50" stroke="#16a34a" stroke-width="3" marker-end="url(#arrowS)"/>
  <text x="175" y="75" font-size="14" font-weight="bold" fill="#16a34a">S</text>
  <!-- T: Left -->
  <line x1="115" y1="140" x2="75" y2="140" stroke="#f59e0b" stroke-width="3" marker-end="url(#arrowT)"/>
  <text x="95" y="128" font-size="14" font-weight="bold" fill="#f59e0b">T</text>
  <!-- U: Down -->
  <line x1="160" y1="185" x2="160" y2="225" stroke="#ef4444" stroke-width="3" marker-end="url(#arrowU)"/>
  <text x="175" y="205" font-size="14" font-weight="bold" fill="#ef4444">U</text>
  <!-- V: Right -->
  <line x1="205" y1="140" x2="245" y2="140" stroke="#8b5cf6" stroke-width="3" marker-end="url(#arrowV)"/>
  <text x="225" y="128" font-size="14" font-weight="bold" fill="#8b5cf6">V</text>
  <!-- Arrow markers -->
  <defs>
    <marker id="arrowS" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#16a34a"/>
    </marker>
    <marker id="arrowT" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b"/>
    </marker>
    <marker id="arrowU" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#ef4444"/>
    </marker>
    <marker id="arrowV" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#8b5cf6"/>
    </marker>
  </defs>
  <text x="160" y="260" text-anchor="middle" font-size="11" fill="#64748b">Seats dropping downward during ride</text>
</svg>''')

# SCI982: Plant parts diagram
fix('SCI982', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 320" width="300" font-family="Arial,sans-serif">
  <text x="150" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Plant Parts</text>
  <!-- Part A: Flower -->
  <circle cx="150" cy="60" r="18" fill="#f59e0b" stroke="#92400e" stroke-width="2"/>
  <circle cx="135" cy="52" r="8" fill="#fbbf24"/>
  <circle cx="165" cy="52" r="8" fill="#fbbf24"/>
  <circle cx="142" cy="68" r="8" fill="#fbbf24"/>
  <circle cx="158" cy="68" r="8" fill="#fbbf24"/>
  <text x="195" y="65" font-size="13" font-weight="bold" fill="#1e40af">A</text>
  <line x1="180" y1="60" x2="190" y2="60" stroke="#64748b" stroke-width="1"/>
  <!-- Part B: Stem -->
  <rect x="145" y="78" width="10" height="120" fill="#16a34a" stroke="#15803d" stroke-width="2"/>
  <text x="170" y="145" font-size="13" font-weight="bold" fill="#1e40af">B</text>
  <line x1="155" y1="140" x2="165" y2="140" stroke="#64748b" stroke-width="1"/>
  <!-- Part C: Leaves -->
  <ellipse cx="120" cy="120" rx="25" ry="12" fill="#22c55e" stroke="#15803d" stroke-width="2"/>
  <ellipse cx="180" cy="160" rx="25" ry="12" fill="#22c55e" stroke="#15803d" stroke-width="2"/>
  <text x="90" y="125" font-size="13" font-weight="bold" fill="#1e40af">C</text>
  <line x1="105" y1="120" x2="95" y2="120" stroke="#64748b" stroke-width="1"/>
  <!-- Part D: Roots -->
  <path d="M145,198 L135,240 M150,200 L150,250 M155,198 L165,240" stroke="#92400e" stroke-width="3" fill="none"/>
  <path d="M135,220 L125,235 M165,220 L175,235" stroke="#92400e" stroke-width="2" fill="none"/>
  <text x="185" y="230" font-size="13" font-weight="bold" fill="#1e40af">D</text>
  <line x1="175" y1="225" x2="180" y2="225" stroke="#64748b" stroke-width="1"/>
  <!-- Ground line -->
  <line x1="30" y1="198" x2="270" y2="198" stroke="#64748b" stroke-width="2" stroke-dasharray="5,5"/>
  <text x="150" y="215" text-anchor="middle" font-size="10" fill="#64748b">soil</text>
  <text x="150" y="285" text-anchor="middle" font-size="11" fill="#64748b">Which part holds the plant upright?</text>
</svg>''')

# SCI983: Digestive system pathway
fix('SCI983', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 280" width="350" font-family="Arial,sans-serif">
  <text x="175" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Digestive Pathway</text>
  <!-- Mouth -->
  <rect x="135" y="30" width="80" height="32" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" rx="5"/>
  <text x="175" y="51" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af">Mouth</text>
  <!-- Arrow down -->
  <line x1="175" y1="62" x2="175" y2="78" stroke="#64748b" stroke-width="2" marker-end="url(#arrowhead)"/>
  <!-- Gullet -->
  <rect x="135" y="78" width="80" height="32" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" rx="5"/>
  <text x="175" y="99" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af">Gullet</text>
  <!-- Arrow down -->
  <line x1="175" y1="110" x2="175" y2="126" stroke="#64748b" stroke-width="2" marker-end="url(#arrowhead)"/>
  <!-- Stomach -->
  <rect x="135" y="126" width="80" height="32" fill="#fed7aa" stroke="#f59e0b" stroke-width="2" rx="5"/>
  <text x="175" y="147" text-anchor="middle" font-size="12" font-weight="bold" fill="#92400e">Stomach</text>
  <!-- Arrow down -->
  <line x1="175" y1="158" x2="175" y2="174" stroke="#64748b" stroke-width="2" marker-end="url(#arrowhead)"/>
  <!-- Small intestine -->
  <rect x="120" y="174" width="110" height="32" fill="#fed7aa" stroke="#f59e0b" stroke-width="2" rx="5"/>
  <text x="175" y="195" text-anchor="middle" font-size="12" font-weight="bold" fill="#92400e">Small Intestine</text>
  <!-- Arrow to bloodstream -->
  <line x1="230" y1="190" x2="280" y2="190" stroke="#ef4444" stroke-width="3" marker-end="url(#arrowhead2)"/>
  <text x="255" y="182" text-anchor="middle" font-size="10" fill="#ef4444">absorbed</text>
  <!-- Bloodstream -->
  <rect x="280" y="174" width="60" height="32" fill="#fee2e2" stroke="#ef4444" stroke-width="2" rx="5"/>
  <text x="310" y="190" text-anchor="middle" font-size="11" font-weight="bold" fill="#991b1b">Blood</text>
  <text x="310" y="202" text-anchor="middle" font-size="11" font-weight="bold" fill="#991b1b">Stream</text>
  <!-- Note -->
  <text x="175" y="230" text-anchor="middle" font-size="10" fill="#16a34a">✓ Digested food → bloodstream</text>
  <text x="175" y="245" text-anchor="middle" font-size="10" fill="#64748b">(Large intestine absorbs water, not digested food)</text>
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#64748b"/>
    </marker>
    <marker id="arrowhead2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#ef4444"/>
    </marker>
  </defs>
</svg>''')

# SCI984: Plant life cycle
fix('SCI984', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 280" width="360" font-family="Arial,sans-serif">
  <text x="180" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Plant K Life Cycle</text>
  <!-- Seed -->
  <ellipse cx="80" cy="140" rx="22" ry="15" fill="#92400e" stroke="#78350f" stroke-width="2"/>
  <text x="80" y="145" text-anchor="middle" font-size="11" font-weight="bold" fill="#fff">Seed</text>
  <text x="80" y="175" text-anchor="middle" font-size="10" fill="#64748b">dispersed by animals</text>
  <!-- Process C: Germination (from seed) -->
  <path d="M102,140 Q140,110 165,100" stroke="#16a34a" stroke-width="3" fill="none" marker-end="url(#arrow)"/>
  <text x="135" y="108" text-anchor="middle" font-size="13" font-weight="bold" fill="#16a34a">C</text>
  <text x="135" y="95" text-anchor="middle" font-size="9" fill="#16a34a">germination</text>
  <!-- Young plant -->
  <line x1="180" y1="100" x2="180" y2="75" stroke="#15803d" stroke-width="3"/>
  <ellipse cx="165" cy="85" rx="12" ry="6" fill="#22c55e" stroke="#15803d" stroke-width="1"/>
  <ellipse cx="195" cy="85" rx="12" ry="6" fill="#22c55e" stroke="#15803d" stroke-width="1"/>
  <!-- Process A: Growth -->
  <path d="M195,75 Q230,60 265,70" stroke="#3b82f6" stroke-width="3" fill="none" marker-end="url(#arrow2)"/>
  <text x="230" y="58" text-anchor="middle" font-size="13" font-weight="bold" fill="#3b82f6">A</text>
  <text x="230" y="48" text-anchor="middle" font-size="9" fill="#3b82f6">growth</text>
  <!-- Flower -->
  <circle cx="280" cy="85" r="18" fill="#f59e0b" stroke="#92400e" stroke-width="2"/>
  <circle cx="270" cy="80" r="6" fill="#fbbf24"/>
  <circle cx="290" cy="80" r="6" fill="#fbbf24"/>
  <circle cx="275" cy="93" r="6" fill="#fbbf24"/>
  <circle cx="285" cy="93" r="6" fill="#fbbf24"/>
  <text x="280" y="120" text-anchor="middle" font-size="11" font-weight="bold" fill="#000">Flower</text>
  <text x="280" y="135" text-anchor="middle" font-size="10" fill="#64748b">pollinated by wind</text>
  <!-- Process B: Pollination -->
  <path d="M280,103 Q280,140 265,165" stroke="#8b5cf6" stroke-width="3" fill="none" marker-end="url(#arrow3)"/>
  <text x="295" y="135" text-anchor="middle" font-size="13" font-weight="bold" fill="#8b5cf6">B</text>
  <text x="310" y="140" text-anchor="middle" font-size="9" fill="#8b5cf6">pollination</text>
  <!-- Fruit with seeds -->
  <ellipse cx="240" cy="180" rx="20" ry="25" fill="#ef4444" stroke="#991b1b" stroke-width="2"/>
  <circle cx="235" cy="175" r="3" fill="#78350f"/>
  <circle cx="245" cy="175" r="3" fill="#78350f"/>
  <circle cx="240" cy="185" r="3" fill="#78350f"/>
  <text x="240" y="215" text-anchor="middle" font-size="10" fill="#64748b">Fruit (seeds inside)</text>
  <!-- Back to seed -->
  <path d="M220,180 Q150,200 102,155" stroke="#64748b" stroke-width="3" fill="none" marker-end="url(#arrow4)" stroke-dasharray="5,3"/>
  <text x="160" y="210" text-anchor="middle" font-size="9" fill="#64748b">dispersal</text>
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#16a34a"/>
    </marker>
    <marker id="arrow2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
    </marker>
    <marker id="arrow3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#8b5cf6"/>
    </marker>
    <marker id="arrow4" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#64748b"/>
    </marker>
  </defs>
</svg>''')

# SCI985: Experiment setups
fix('SCI985', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" width="400" font-family="Arial,sans-serif">
  <text x="200" y="16" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Experimental Set-ups</text>
  <!-- Setup W -->
  <rect x="10" y="30" width="85" height="90" fill="#fff" stroke="#3b82f6" stroke-width="2" rx="5"/>
  <text x="52" y="48" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e40af">Setup W</text>
  <circle cx="52" cy="75" r="8" fill="#16a34a"/>
  <text x="52" y="95" text-anchor="middle" font-size="9" fill="#334155">Plant only</text>
  <text x="52" y="107" text-anchor="middle" font-size="9" fill="#334155">(no decay)</text>
  <text x="52" y="135" text-anchor="middle" font-size="8" fill="#64748b">CO₂: Low</text>
  <!-- Setup X -->
  <rect x="105" y="30" width="85" height="90" fill="#fff" stroke="#3b82f6" stroke-width="2" rx="5"/>
  <text x="147" y="48" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e40af">Setup X</text>
  <circle cx="147" cy="75" r="8" fill="#16a34a"/>
  <rect x="140" y="88" width="14" height="10" fill="#92400e" rx="1"/>
  <text x="147" y="107" text-anchor="middle" font-size="9" fill="#334155">Plant + decay</text>
  <text x="147" y="135" text-anchor="middle" font-size="8" fill="#64748b">CO₂: High</text>
  <!-- Setup Y -->
  <rect x="200" y="30" width="85" height="90" fill="#fff" stroke="#3b82f6" stroke-width="2" rx="5"/>
  <text x="242" y="48" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e40af">Setup Y</text>
  <rect x="235" y="70" width="14" height="10" fill="#92400e" rx="1"/>
  <text x="242" y="95" text-anchor="middle" font-size="9" fill="#334155">Decay only</text>
  <text x="242" y="107" text-anchor="middle" font-size="9" fill="#334155">(no plant)</text>
  <text x="242" y="135" text-anchor="middle" font-size="8" fill="#64748b">CO₂: High</text>
  <!-- Setup Z -->
  <rect x="295" y="30" width="85" height="90" fill="#fff" stroke="#3b82f6" stroke-width="2" rx="5"/>
  <text x="337" y="48" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e40af">Setup Z</text>
  <text x="337" y="82" text-anchor="middle" font-size="11" fill="#64748b">Empty</text>
  <text x="337" y="95" text-anchor="middle" font-size="9" fill="#334155">(control)</text>
  <text x="337" y="135" text-anchor="middle" font-size="8" fill="#64748b">CO₂: Low</text>
  <!-- Note -->
  <text x="200" y="165" text-anchor="middle" font-size="10" fill="#16a34a">Compare W and X to test if decaying matter affects CO₂</text>
</svg>''')

# SCI986: Air removed from bag
fix('SCI986', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 180" width="380" font-family="Arial,sans-serif">
  <text x="190" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Removing Air from Bag</text>
  <!-- Before -->
  <text x="95" y="42" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af">Before</text>
  <rect x="30" y="50" width="130" height="95" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" rx="8"/>
  <rect x="60" y="70" width="25" height="30" fill="#fbbf24" stroke="#92400e" stroke-width="1"/>
  <rect x="90" y="75" width="25" height="25" fill="#ef4444" stroke="#991b1b" stroke-width="1"/>
  <rect x="120" y="68" width="25" height="32" fill="#16a34a" stroke="#15803d" stroke-width="1"/>
  <rect x="65" y="105" width="30" height="20" fill="#8b5cf6" stroke="#6d28d9" stroke-width="1"/>
  <rect x="100" y="103" width="35" height="22" fill="#3b82f6" stroke="#1e40af" stroke-width="1"/>
  <text x="95" y="160" text-anchor="middle" font-size="10" fill="#64748b">Clothes + Air</text>
  <text x="95" y="172" text-anchor="middle" font-size="9" fill="#64748b">Mass: M₁, Volume: V₁</text>
  <!-- Arrow -->
  <line x1="170" y1="97" x2="210" y2="97" stroke="#64748b" stroke-width="2" marker-end="url(#arrowRemove)"/>
  <text x="190" y="90" text-anchor="middle" font-size="9" fill="#ef4444">Remove air</text>
  <!-- After -->
  <text x="285" y="42" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af">After</text>
  <rect x="220" y="70" width="130" height="55" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" rx="8"/>
  <rect x="245" y="78" width="20" height="22" fill="#fbbf24" stroke="#92400e" stroke-width="1"/>
  <rect x="268" y="81" width="20" height="18" fill="#ef4444" stroke="#991b1b" stroke-width="1"/>
  <rect x="291" y="77" width="20" height="23" fill="#16a34a" stroke="#15803d" stroke-width="1"/>
  <rect x="250" y="101" width="23" height="15" fill="#8b5cf6" stroke="#6d28d9" stroke-width="1"/>
  <rect x="276" y="100" width="28" height="16" fill="#3b82f6" stroke="#1e40af" stroke-width="1"/>
  <text x="285" y="145" text-anchor="middle" font-size="10" fill="#64748b">Clothes only</text>
  <text x="285" y="157" text-anchor="middle" font-size="9" fill="#ef4444">Mass: M₂ &lt; M₁ ✓</text>
  <text x="285" y="167" text-anchor="middle" font-size="9" fill="#ef4444">Volume: V₂ &lt; V₁ ✓</text>
  <defs>
    <marker id="arrowRemove" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#64748b"/>
    </marker>
  </defs>
</svg>''')

# SCI987: Flower parts
fix('SCI987', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 260" width="300" font-family="Arial,sans-serif">
  <text x="150" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Flower Parts</text>
  <!-- Stem -->
  <line x1="150" y1="200" x2="150" y2="120" stroke="#15803d" stroke-width="4"/>
  <!-- Sepals (Y) - green leaf-like structures at base -->
  <ellipse cx="130" cy="125" rx="18" ry="8" fill="#22c55e" stroke="#15803d" stroke-width="2" transform="rotate(-30,130,125)"/>
  <ellipse cx="170" cy="125" rx="18" ry="8" fill="#22c55e" stroke="#15803d" stroke-width="2" transform="rotate(30,170,125)"/>
  <ellipse cx="140" cy="115" rx="18" ry="8" fill="#22c55e" stroke="#15803d" stroke-width="2" transform="rotate(-50,140,115)"/>
  <ellipse cx="160" cy="115" rx="18" ry="8" fill="#22c55e" stroke="#15803d" stroke-width="2" transform="rotate(50,160,115)"/>
  <!-- Label Y -->
  <line x1="125" y1="130" x2="95" y2="145" stroke="#64748b" stroke-width="1"/>
  <circle cx="95" cy="145" r="14" fill="#fff" stroke="#3b82f6" stroke-width="2"/>
  <text x="95" y="150" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e40af">Y</text>
  <text x="95" y="165" text-anchor="middle" font-size="9" fill="#64748b">Sepal</text>
  <!-- Petals (X) - colorful petals -->
  <ellipse cx="125" cy="95" rx="20" ry="12" fill="#f59e0b" stroke="#92400e" stroke-width="2" transform="rotate(-20,125,95)"/>
  <ellipse cx="175" cy="95" rx="20" ry="12" fill="#f59e0b" stroke="#92400e" stroke-width="2" transform="rotate(20,175,95)"/>
  <ellipse cx="135" cy="78" rx="20" ry="12" fill="#f59e0b" stroke="#92400e" stroke-width="2" transform="rotate(-40,135,78)"/>
  <ellipse cx="165" cy="78" rx="20" ry="12" fill="#f59e0b" stroke="#92400e" stroke-width="2" transform="rotate(40,165,78)"/>
  <ellipse cx="150" cy="70" rx="20" ry="12" fill="#f59e0b" stroke="#92400e" stroke-width="2"/>
  <!-- Label X -->
  <line x1="175" y1="85" x2="205" y2="75" stroke="#64748b" stroke-width="1"/>
  <circle cx="205" cy="75" r="14" fill="#fff" stroke="#3b82f6" stroke-width="2"/>
  <text x="205" y="80" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e40af">X</text>
  <text x="205" y="95" text-anchor="middle" font-size="9" fill="#64748b">Petal</text>
  <!-- Center reproductive parts -->
  <circle cx="150" cy="95" r="8" fill="#fbbf24" stroke="#92400e" stroke-width="1"/>
  <!-- Note -->
  <text x="150" y="230" text-anchor="middle" font-size="10" fill="#64748b">X = Petal (attracts pollinators)</text>
  <text x="150" y="245" text-anchor="middle" font-size="10" fill="#64748b">Y = Sepal (protects flower bud)</text>
</svg>''')

# SCI988: Electrical circuit
fix('SCI988', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" width="320" font-family="Arial,sans-serif">
  <text x="160" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Simple Electrical Circuit</text>
  <!-- Circuit wires -->
  <path d="M60,80 L140,80 L140,140 L60,140 Z" stroke="#64748b" stroke-width="3" fill="none"/>
  <path d="M220,80 L260,80 L260,140 L220,140" stroke="#64748b" stroke-width="3" fill="none"/>
  <!-- Battery (2 cells) -->
  <rect x="50" y="95" width="20" height="30" fill="#3b82f6" stroke="#1e40af" stroke-width="2"/>
  <line x1="45" y1="105" x2="75" y2="105" stroke="#1e40af" stroke-width="2"/>
  <line x1="45" y1="115" x2="75" y2="115" stroke="#1e40af" stroke-width="2"/>
  <text x="40" y="105" text-anchor="end" font-size="10" fill="#ef4444" font-weight="bold">+</text>
  <text x="80" y="115" font-size="10" fill="#334155" font-weight="bold">−</text>
  <text x="60" y="160" text-anchor="middle" font-size="10" fill="#64748b">Battery</text>
  <text x="60" y="172" text-anchor="middle" font-size="9" fill="#64748b">(2 cells)</text>
  <!-- Switch (closed) -->
  <line x1="140" y1="70" x2="160" y2="70" stroke="#64748b" stroke-width="3"/>
  <circle cx="140" cy="70" r="3" fill="#64748b"/>
  <circle cx="160" cy="70" r="3" fill="#64748b"/>
  <rect x="145" y="50" width="10" height="15" fill="#fbbf24" stroke="#92400e" stroke-width="1"/>
  <text x="150" y="45" text-anchor="middle" font-size="9" fill="#64748b">Switch</text>
  <line x1="160" y1="70" x2="220" y2="70" stroke="#64748b" stroke-width="3"/>
  <line x1="160" y1="70" x2="160" y2="80" stroke="#64748b" stroke-width="3"/>
  <line x1="220" y1="70" x2="220" y2="80" stroke="#64748b" stroke-width="3"/>
  <!-- Bulb -->
  <circle cx="240" cy="110" r="22" fill="#fef3c7" stroke="#92400e" stroke-width="2"/>
  <path d="M230,105 L250,115 M230,115 L250,105" stroke="#f59e0b" stroke-width="2"/>
  <circle cx="240" cy="110" r="10" fill="none" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="240" y="155" text-anchor="middle" font-size="10" fill="#64748b">Bulb</text>
  <!-- Connect back -->
  <line x1="260" y1="140" x2="220" y2="140" stroke="#64748b" stroke-width="3"/>
  <line x1="220" y1="140" x2="140" y2="140" stroke="#64748b" stroke-width="3"/>
  <!-- Current direction -->
  <path d="M180,75 L200,75" stroke="#ef4444" stroke-width="2" marker-end="url(#arrowCurrent)"/>
  <text x="190" y="68" text-anchor="middle" font-size="8" fill="#ef4444">current</text>
  <defs>
    <marker id="arrowCurrent" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L7,3 z" fill="#ef4444"/>
    </marker>
  </defs>
  <text x="160" y="210" text-anchor="middle" font-size="10" fill="#64748b">Removing a cell → lower voltage → dimmer bulb</text>
</svg>''')

# SCI989: Transpiration experiment
fix('SCI989', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 280" width="280" font-family="Arial,sans-serif">
  <text x="140" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Transpiration Experiment</text>
  <!-- Test tube -->
  <rect x="105" y="120" width="70" height="120" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" rx="3"/>
  <ellipse cx="140" cy="120" rx="35" ry="8" fill="#bfdbfe" stroke="#3b82f6" stroke-width="2"/>
  <!-- Water level (increased) -->
  <rect x="107" y="180" width="66" height="58" fill="#3b82f6" opacity="0.3"/>
  <line x1="107" y1="180" x2="173" y2="180" stroke="#3b82f6" stroke-width="2" stroke-dasharray="3,2"/>
  <text x="85" y="183" font-size="9" fill="#3b82f6" font-weight="bold">New level</text>
  <!-- Original water level -->
  <line x1="107" y1="220" x2="173" y2="220" stroke="#64748b" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="85" y="223" font-size="9" fill="#64748b">Initial</text>
  <!-- Plant cutting -->
  <line x1="140" y1="180" x2="140" y2="80" stroke="#15803d" stroke-width="3"/>
  <ellipse cx="120" cy="110" rx="15" ry="8" fill="#22c55e" stroke="#15803d" stroke-width="1.5"/>
  <ellipse cx="160" cy="100" rx="15" ry="8" fill="#22c55e" stroke="#15803d" stroke-width="1.5"/>
  <ellipse cx="135" cy="90" rx="15" ry="8" fill="#22c55e" stroke="#15803d" stroke-width="1.5"/>
  <text x="140" y="65" text-anchor="middle" font-size="10" fill="#15803d" font-weight="bold">Plant</text>
  <!-- Water vapor arrows -->
  <path d="M115,100 Q105,85 100,70" stroke="#3b82f6" stroke-width="1.5" fill="none" marker-end="url(#arrowVapor)" stroke-dasharray="2,2"/>
  <path d="M165,95 Q175,80 180,65" stroke="#3b82f6" stroke-width="1.5" fill="none" marker-end="url(#arrowVapor)" stroke-dasharray="2,2"/>
  <text x="90" y="55" font-size="9" fill="#3b82f6">water</text>
  <text x="90" y="65" font-size="9" fill="#3b82f6">vapor</text>
  <!-- Seal -->
  <ellipse cx="140" cy="120" rx="37" ry="4" fill="#92400e" stroke="#78350f" stroke-width="1"/>
  <text x="190" y="125" font-size="8" fill="#64748b">Sealed</text>
  <!-- Labels -->
  <text x="140" y="260" text-anchor="middle" font-size="10" fill="#16a34a">Water level increases → Transpiration occurred</text>
  <defs>
    <marker id="arrowVapor" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L7,3 z" fill="#3b82f6"/>
    </marker>
  </defs>
</svg>''')

# SCI990: Magnet arrangements
fix('SCI990', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 260" width="380" font-family="Arial,sans-serif">
  <text x="190" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Magnet Arrangements</text>
  <!-- Arrangement A: N-S close together (strongest) -->
  <text x="90" y="50" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af">A</text>
  <rect x="30" y="55" width="50" height="25" fill="#ef4444" stroke="#991b1b" stroke-width="2"/>
  <text x="55" y="72" text-anchor="middle" font-size="13" font-weight="bold" fill="#fff">N</text>
  <rect x="85" y="55" width="50" height="25" fill="#3b82f6" stroke="#1e40af" stroke-width="2"/>
  <text x="110" y="72" text-anchor="middle" font-size="13" font-weight="bold" fill="#fff">S</text>
  <text x="90" y="95" text-anchor="middle" font-size="9" fill="#16a34a" font-weight="bold">✓ Strongest (opposite poles close)</text>
  <!-- Arrangement B: N-N repelling -->
  <text x="90" y="125" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af">B</text>
  <rect x="30" y="130" width="50" height="25" fill="#ef4444" stroke="#991b1b" stroke-width="2"/>
  <text x="55" y="147" text-anchor="middle" font-size="13" font-weight="bold" fill="#fff">N</text>
  <rect x="100" y="130" width="50" height="25" fill="#ef4444" stroke="#991b1b" stroke-width="2"/>
  <text x="125" y="147" text-anchor="middle" font-size="13" font-weight="bold" fill="#fff">N</text>
  <text x="90" y="170" text-anchor="middle" font-size="9" fill="#64748b">Repel (same poles)</text>
  <!-- Arrangement C: N-S far apart -->
  <text x="280" y="50" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af">C</text>
  <rect x="220" y="55" width="50" height="25" fill="#ef4444" stroke="#991b1b" stroke-width="2"/>
  <text x="245" y="72" text-anchor="middle" font-size="13" font-weight="bold" fill="#fff">N</text>
  <rect x="295" y="55" width="50" height="25" fill="#3b82f6" stroke="#1e40af" stroke-width="2"/>
  <text x="320" y="72" text-anchor="middle" font-size="13" font-weight="bold" fill="#fff">S</text>
  <text x="280" y="95" text-anchor="middle" font-size="9" fill="#64748b">Weaker (opposite but far)</text>
  <!-- Arrangement D: S-S repelling -->
  <text x="280" y="125" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af">D</text>
  <rect x="220" y="130" width="50" height="25" fill="#3b82f6" stroke="#1e40af" stroke-width="2"/>
  <text x="245" y="147" text-anchor="middle" font-size="13" font-weight="bold" fill="#fff">S</text>
  <rect x="290" y="130" width="50" height="25" fill="#3b82f6" stroke="#1e40af" stroke-width="2"/>
  <text x="315" y="147" text-anchor="middle" font-size="13" font-weight="bold" fill="#fff">S</text>
  <text x="280" y="170" text-anchor="middle" font-size="9" fill="#64748b">Repel (same poles)</text>
  <!-- Force illustration for A -->
  <line x1="80" y1="67" x2="85" y2="67" stroke="#16a34a" stroke-width="3"/>
  <line x1="80" y1="67" x2="82" y2="65" stroke="#16a34a" stroke-width="2"/>
  <line x1="80" y1="67" x2="82" y2="69" stroke="#16a34a" stroke-width="2"/>
  <text x="190" y="215" text-anchor="middle" font-size="11" fill="#64748b">Magnetic force is strongest when:</text>
  <text x="190" y="230" text-anchor="middle" font-size="10" fill="#64748b">• Opposite poles (N-S) face each other</text>
  <text x="190" y="245" text-anchor="middle" font-size="10" fill="#64748b">• Distance between poles is smallest</text>
</svg>''')

# SCI991: Food chain
fix('SCI991', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Food Chain</text>
  <!-- Grass -->
  <rect x="25" y="70" width="70" height="60" fill="#dcfce7" stroke="#16a34a" stroke-width="2" rx="5"/>
  <path d="M40,110 L40,95 M45,110 L45,90 M50,110 L50,93 M55,110 L55,88 M60,110 L60,92 M65,110 L65,90 M70,110 L70,94 M75,110 L75,91 M80,110 L80,95" stroke="#16a34a" stroke-width="2"/>
  <text x="60" y="150" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">Grass</text>
  <text x="60" y="163" text-anchor="middle" font-size="9" fill="#64748b">(Producer)</text>
  <!-- Arrow 1 -->
  <line x1="95" y1="100" x2="118" y2="100" stroke="#64748b" stroke-width="3" marker-end="url(#arrowFood)"/>
  <text x="106" y="92" text-anchor="middle" font-size="8" fill="#64748b">eaten by</text>
  <!-- Grasshopper -->
  <rect x="118" y="70" width="70" height="60" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="5"/>
  <ellipse cx="153" cy="95" rx="18" ry="12" fill="#16a34a" stroke="#15803d" stroke-width="1"/>
  <circle cx="148" cy="92" r="2" fill="#000"/>
  <circle cx="158" cy="92" r="2" fill="#000"/>
  <line x1="145" y1="105" x2="140" y2="115" stroke="#15803d" stroke-width="2"/>
  <line x1="161" y1="105" x2="166" y2="115" stroke="#15803d" stroke-width="2"/>
  <text x="153" y="150" text-anchor="middle" font-size="11" font-weight="bold" fill="#92400e">Grasshopper</text>
  <text x="153" y="163" text-anchor="middle" font-size="9" fill="#64748b">(1st consumer)</text>
  <!-- Arrow 2 -->
  <line x1="188" y1="100" x2="211" y2="100" stroke="#64748b" stroke-width="3" marker-end="url(#arrowFood)"/>
  <text x="199" y="92" text-anchor="middle" font-size="8" fill="#64748b">eaten by</text>
  <!-- Frog -->
  <rect x="211" y="70" width="70" height="60" fill="#d1fae5" stroke="#16a34a" stroke-width="2" rx="5"/>
  <ellipse cx="246" cy="100" rx="20" ry="15" fill="#22c55e" stroke="#15803d" stroke-width="2"/>
  <circle cx="240" cy="96" r="3" fill="#000"/>
  <circle cx="252" cy="96" r="3" fill="#000"/>
  <line x1="232" y1="108" x2="228" y2="118" stroke="#15803d" stroke-width="2"/>
  <line x1="260" y1="108" x2="264" y2="118" stroke="#15803d" stroke-width="2"/>
  <text x="246" y="150" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">Frog</text>
  <text x="246" y="163" text-anchor="middle" font-size="9" fill="#64748b">(2nd consumer)</text>
  <!-- Arrow 3 -->
  <line x1="281" y1="100" x2="304" y2="100" stroke="#64748b" stroke-width="3" marker-end="url(#arrowFood)"/>
  <text x="292" y="92" text-anchor="middle" font-size="8" fill="#64748b">eaten by</text>
  <!-- Snake -->
  <rect x="304" y="70" width="70" height="60" fill="#fef9c3" stroke="#f59e0b" stroke-width="2" rx="5"/>
  <path d="M315,100 Q325,90 335,95 Q345,100 355,95 Q365,90 370,95" stroke="#16a34a" stroke-width="4" fill="none"/>
  <circle cx="315" cy="100" r="4" fill="#ef4444"/>
  <text x="339" y="150" text-anchor="middle" font-size="11" font-weight="bold" fill="#92400e">Snake</text>
  <text x="339" y="163" text-anchor="middle" font-size="9" fill="#64748b">(3rd consumer)</text>
  <!-- Note -->
  <text x="200" y="188" text-anchor="middle" font-size="10" fill="#ef4444">Frog ↓ → Snake ↓ (less food for snake)</text>
  <defs>
    <marker id="arrowFood" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#64748b"/>
    </marker>
  </defs>
</svg>''')

# SCI992: Melting and boiling points table
fix('SCI992', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 210" width="380" font-family="Arial,sans-serif">
  <text x="190" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">States of Matter at Room Temperature (25°C)</text>
  <!-- Table headers -->
  <rect x="20" y="35" width="100" height="30" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
  <text x="70" y="55" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">Substance</text>
  <rect x="120" y="35" width="90" height="30" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
  <text x="165" y="48" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e40af">Melting</text>
  <text x="165" y="58" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e40af">Point</text>
  <rect x="210" y="35" width="90" height="30" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
  <text x="255" y="48" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e40af">Boiling</text>
  <text x="255" y="58" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e40af">Point</text>
  <rect x="300" y="35" width="60" height="30" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
  <text x="330" y="48" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e40af">State at</text>
  <text x="330" y="58" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e40af">25°C</text>
  <!-- Substance P -->
  <rect x="20" y="65" width="100" height="30" fill="#fff" stroke="#64748b" stroke-width="1"/>
  <text x="70" y="85" text-anchor="middle" font-size="11" fill="#334155">P</text>
  <rect x="120" y="65" width="90" height="30" fill="#fff" stroke="#64748b" stroke-width="1"/>
  <text x="165" y="85" text-anchor="middle" font-size="11" fill="#334155">30°C</text>
  <rect x="210" y="65" width="90" height="30" fill="#fff" stroke="#64748b" stroke-width="1"/>
  <text x="255" y="85" text-anchor="middle" font-size="11" fill="#334155">100°C</text>
  <rect x="300" y="65" width="60" height="30" fill="#fee2e2" stroke="#64748b" stroke-width="1"/>
  <text x="330" y="85" text-anchor="middle" font-size="11" fill="#991b1b">Solid</text>
  <!-- Substance Q -->
  <rect x="20" y="95" width="100" height="30" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
  <text x="70" y="115" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">Q</text>
  <rect x="120" y="95" width="90" height="30" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
  <text x="165" y="115" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">-10°C</text>
  <rect x="210" y="95" width="90" height="30" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
  <text x="255" y="115" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">50°C</text>
  <rect x="300" y="95" width="60" height="30" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
  <text x="330" y="115" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">Liquid ✓</text>
  <!-- Substance R -->
  <rect x="20" y="125" width="100" height="30" fill="#fff" stroke="#64748b" stroke-width="1"/>
  <text x="70" y="145" text-anchor="middle" font-size="11" fill="#334155">R</text>
  <rect x="120" y="125" width="90" height="30" fill="#fff" stroke="#64748b" stroke-width="1"/>
  <text x="165" y="145" text-anchor="middle" font-size="11" fill="#334155">0°C</text>
  <rect x="210" y="125" width="90" height="30" fill="#fff" stroke="#64748b" stroke-width="1"/>
  <text x="255" y="145" text-anchor="middle" font-size="11" fill="#334155">20°C</text>
  <rect x="300" y="125" width="60" height="30" fill="#fee2e2" stroke="#64748b" stroke-width="1"/>
  <text x="330" y="145" text-anchor="middle" font-size="11" fill="#991b1b">Gas</text>
  <!-- Substance S -->
  <rect x="20" y="155" width="100" height="30" fill="#fff" stroke="#64748b" stroke-width="1"/>
  <text x="70" y="175" text-anchor="middle" font-size="11" fill="#334155">S</text>
  <rect x="120" y="155" width="90" height="30" fill="#fff" stroke="#64748b" stroke-width="1"/>
  <text x="165" y="175" text-anchor="middle" font-size="11" fill="#334155">40°C</text>
  <rect x="210" y="155" width="90" height="30" fill="#fff" stroke="#64748b" stroke-width="1"/>
  <text x="255" y="175" text-anchor="middle" font-size="11" fill="#334155">120°C</text>
  <rect x="300" y="155" width="60" height="30" fill="#fee2e2" stroke="#64748b" stroke-width="1"/>
  <text x="330" y="175" text-anchor="middle" font-size="11" fill="#991b1b">Solid</text>
  <!-- Explanation -->
  <text x="190" y="200" text-anchor="middle" font-size="10" fill="#16a34a">Q is liquid: -10°C &lt; 25°C &lt; 50°C</text>
</svg>''')

# SCI993: Thermometer in hot water
fix('SCI993', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 280" width="300" font-family="Arial,sans-serif">
  <text x="150" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Thermometer in Hot Water</text>
  <!-- Time labels -->
  <text x="70" y="50" text-anchor="middle" font-size="11" font-weight="bold" fill="#3b82f6">Start (0 min)</text>
  <text x="230" y="50" text-anchor="middle" font-size="11" font-weight="bold" fill="#8b5cf6">After 5 min</text>
  <!-- Beaker 1 (Initial) -->
  <rect x="30" y="60" width="80" height="100" fill="none" stroke="#64748b" stroke-width="2" rx="3"/>
  <rect x="32" y="100" width="76" height="58" fill="#ef4444" opacity="0.3"/>
  <path d="M35,100 Q45,95 55,100 Q65,105 75,100 Q85,95 95,100 Q105,105 107,100" stroke="#ef4444" stroke-width="2" fill="none"/>
  <text x="70" y="180" text-anchor="middle" font-size="10" fill="#ef4444" font-weight="bold">Hot water</text>
  <!-- Thermometer 1 -->
  <rect x="63" y="65" width="14" height="85" fill="#fff" stroke="#64748b" stroke-width="2" rx="2"/>
  <rect x="67" y="130" width="6" height="18" fill="#ef4444"/>
  <circle cx="70" cy="150" r="8" fill="#ef4444" stroke="#991b1b" stroke-width="2"/>
  <line x1="67" y1="75" x2="67" y2="130" stroke="#64748b" stroke-width="1"/>
  <text x="85" y="125" font-size="9" fill="#ef4444" font-weight="bold">80°C</text>
  <!-- Arrow showing temperature decrease -->
  <line x1="120" y1="110" x2="180" y2="110" stroke="#64748b" stroke-width="2" marker-end="url(#arrowTemp)"/>
  <text x="150" y="102" text-anchor="middle" font-size="9" fill="#64748b">Time passes</text>
  <text x="150" y="125" text-anchor="middle" font-size="9" fill="#3b82f6">Heat lost to air</text>
  <!-- Beaker 2 (After time) -->
  <rect x="190" y="60" width="80" height="100" fill="none" stroke="#64748b" stroke-width="2" rx="3"/>
  <rect x="192" y="100" width="76" height="58" fill="#f59e0b" opacity="0.3"/>
  <path d="M195,100 Q205,98 215,100 Q225,102 235,100 Q245,98 255,100 Q265,102 267,100" stroke="#f59e0b" stroke-width="2" fill="none"/>
  <text x="230" y="180" text-anchor="middle" font-size="10" fill="#f59e0b" font-weight="bold">Cooler water</text>
  <!-- Thermometer 2 -->
  <rect x="223" y="65" width="14" height="85" fill="#fff" stroke="#64748b" stroke-width="2" rx="2"/>
  <rect x="227" y="140" width="6" height="8" fill="#f59e0b"/>
  <circle cx="230" cy="150" r="8" fill="#f59e0b" stroke="#92400e" stroke-width="2"/>
  <line x1="227" y1="75" x2="227" y2="140" stroke="#64748b" stroke-width="1"/>
  <text x="245" y="135" font-size="9" fill="#f59e0b" font-weight="bold">45°C</text>
  <!-- Down arrow showing decrease -->
  <line x1="280" y1="120" x2="280" y2="145" stroke="#ef4444" stroke-width="3" marker-end="url(#arrowDown)"/>
  <text x="290" y="133" font-size="10" fill="#ef4444" font-weight="bold">↓</text>
  <text x="150" y="210" text-anchor="middle" font-size="11" fill="#ef4444" font-weight="bold">Temperature decreases continuously</text>
  <text x="150" y="225" text-anchor="middle" font-size="10" fill="#64748b">Hot water loses heat to cooler surroundings</text>
  <defs>
    <marker id="arrowTemp" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#64748b"/>
    </marker>
    <marker id="arrowDown" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#ef4444"/>
    </marker>
  </defs>
</svg>''')

# Write the updated data back to the file
with open('data/questions-science-p6.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("✅ Added diagrams to SCI980-993 (14 questions)")
print("Questions: SCI980 (animals), SCI981 (forces), SCI982 (plant parts),")
print("SCI983 (digestion), SCI984 (life cycle), SCI985 (experiments),")
print("SCI986 (air/mass), SCI987 (flower), SCI988 (circuit), SCI989 (transpiration),")
print("SCI990 (magnets), SCI991 (food chain), SCI992 (states), SCI993 (temperature)")
