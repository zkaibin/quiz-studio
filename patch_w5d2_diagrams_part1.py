import json

# Read the questions file
with open('data/questions-science-p6.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Create index for quick lookup
idx = {q['id']: i for i, q in enumerate(data)}

def fix(qid, diagram):
    """Update diagram for a specific question ID"""
    data[idx[qid]]['diagram'] = diagram

# SCI959 - Organism characteristics table
fix('SCI959', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 220" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Organism Characteristics</text>
  <!-- Header row -->
  <rect x="10" y="30" width="100" height="35" fill="#f1f5f9" stroke="#64748b" stroke-width="1.5"/>
  <text x="60" y="52" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Characteristics</text>
  <rect x="110" y="30" width="70" height="35" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="145" y="52" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e40af">A</text>
  <rect x="180" y="30" width="70" height="35" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="215" y="52" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e40af">B</text>
  <rect x="250" y="30" width="70" height="35" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="285" y="52" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e40af">C</text>
  <rect x="320" y="30" width="70" height="35" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="355" y="52" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e40af">D</text>
  
  <!-- Row 1: Has fur -->
  <rect x="10" y="65" width="100" height="35" fill="#fef3c7" stroke="#64748b" stroke-width="1"/>
  <text x="60" y="87" text-anchor="middle" font-size="11" fill="#1e293b">Has fur</text>
  <rect x="110" y="65" width="70" height="35" fill="white" stroke="#64748b" stroke-width="1"/>
  <text x="145" y="90" text-anchor="middle" font-size="18" fill="#16a34a">✓</text>
  <rect x="180" y="65" width="70" height="35" fill="white" stroke="#64748b" stroke-width="1"/>
  <rect x="250" y="65" width="70" height="35" fill="white" stroke="#64748b" stroke-width="1"/>
  <rect x="320" y="65" width="70" height="35" fill="white" stroke="#64748b" stroke-width="1"/>
  
  <!-- Row 2: Lays eggs -->
  <rect x="10" y="100" width="100" height="35" fill="#fef3c7" stroke="#64748b" stroke-width="1"/>
  <text x="60" y="122" text-anchor="middle" font-size="11" fill="#1e293b">Lays eggs</text>
  <rect x="110" y="100" width="70" height="35" fill="white" stroke="#64748b" stroke-width="1"/>
  <text x="145" y="125" text-anchor="middle" font-size="18" fill="#16a34a">✓</text>
  <rect x="180" y="100" width="70" height="35" fill="white" stroke="#64748b" stroke-width="1"/>
  <text x="215" y="125" text-anchor="middle" font-size="18" fill="#16a34a">✓</text>
  <rect x="250" y="100" width="70" height="35" fill="white" stroke="#64748b" stroke-width="1"/>
  <text x="285" y="125" text-anchor="middle" font-size="18" fill="#16a34a">✓</text>
  <rect x="320" y="100" width="70" height="35" fill="white" stroke="#64748b" stroke-width="1"/>
  <text x="355" y="125" text-anchor="middle" font-size="18" fill="#16a34a">✓</text>
  
  <!-- Row 3: Breathes through lungs -->
  <rect x="10" y="135" width="100" height="35" fill="#fef3c7" stroke="#64748b" stroke-width="1"/>
  <text x="60" y="150" text-anchor="middle" font-size="10" fill="#1e293b">Breathes through</text>
  <text x="60" y="162" text-anchor="middle" font-size="10" fill="#1e293b">lungs</text>
  <rect x="110" y="135" width="70" height="35" fill="white" stroke="#64748b" stroke-width="1"/>
  <text x="145" y="160" text-anchor="middle" font-size="18" fill="#16a34a">✓</text>
  <rect x="180" y="135" width="70" height="35" fill="white" stroke="#64748b" stroke-width="1"/>
  <text x="215" y="160" text-anchor="middle" font-size="18" fill="#16a34a">✓</text>
  <rect x="250" y="135" width="70" height="35" fill="white" stroke="#64748b" stroke-width="1"/>
  <rect x="320" y="135" width="70" height="35" fill="white" stroke="#64748b" stroke-width="1"/>
  <text x="355" y="160" text-anchor="middle" font-size="18" fill="#16a34a">✓</text>
  
  <!-- Row 4: Lives on land and in water -->
  <rect x="10" y="170" width="100" height="35" fill="#fef3c7" stroke="#64748b" stroke-width="1"/>
  <text x="60" y="185" text-anchor="middle" font-size="10" fill="#1e293b">Lives on land and</text>
  <text x="60" y="197" text-anchor="middle" font-size="10" fill="#1e293b">in water</text>
  <rect x="110" y="170" width="70" height="35" fill="white" stroke="#64748b" stroke-width="1"/>
  <rect x="180" y="170" width="70" height="35" fill="white" stroke="#64748b" stroke-width="1"/>
  <text x="215" y="195" text-anchor="middle" font-size="18" fill="#16a34a">✓</text>
  <rect x="250" y="170" width="70" height="35" fill="white" stroke="#64748b" stroke-width="1"/>
  <rect x="320" y="170" width="70" height="35" fill="white" stroke="#64748b" stroke-width="1"/>
</svg>''')

# SCI960 - Organisms G and H comparison
fix('SCI960', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 200" width="380" font-family="Arial,sans-serif">
  <text x="190" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Organism Comparison</text>
  
  <!-- Organism G -->
  <rect x="20" y="35" width="160" height="150" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
  <text x="100" y="58" text-anchor="middle" font-size="15" font-weight="bold" fill="#15803d">Organism G</text>
  
  <!-- G characteristics -->
  <circle cx="45" cy="85" r="4" fill="#16a34a"/>
  <text x="55" y="90" font-size="12" fill="#1e293b">Produces fruits</text>
  <circle cx="45" cy="110" r="4" fill="#16a34a"/>
  <text x="55" y="115" font-size="12" fill="#1e293b">Makes own food</text>
  
  <!-- G visual: flowering plant -->
  <line x1="100" y1="170" x2="100" y2="135" stroke="#16a34a" stroke-width="2"/>
  <ellipse cx="100" cy="125" rx="8" ry="6" fill="#fbbf24"/>
  <path d="M92,125 L85,118 L92,118 Z" fill="#f59e0b"/>
  <path d="M108,125 L115,118 L108,118 Z" fill="#f59e0b"/>
  <ellipse cx="85" cy="148" rx="10" ry="6" fill="#86efac" transform="rotate(-30,85,148)"/>
  <ellipse cx="115" cy="148" rx="10" ry="6" fill="#86efac" transform="rotate(30,115,148)"/>
  
  <!-- Organism H -->
  <rect x="200" y="35" width="160" height="150" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <text x="280" y="58" text-anchor="middle" font-size="15" font-weight="bold" fill="#92400e">Organism H</text>
  
  <!-- H characteristics -->
  <circle cx="225" cy="85" r="4" fill="#dc2626"/>
  <text x="235" y="90" font-size="12" fill="#1e293b">No fruits</text>
  <circle cx="225" cy="110" r="4" fill="#dc2626"/>
  <text x="235" y="115" font-size="12" fill="#1e293b">Cannot make food</text>
  
  <!-- H visual: fungi/mushroom -->
  <ellipse cx="280" cy="170" rx="25" ry="8" fill="#d6d3d1"/>
  <rect x="270" y="145" width="20" height="25" fill="#e7e5e4" stroke="#78716c" stroke-width="1"/>
  <ellipse cx="280" cy="145" rx="22" ry="12" fill="#fca5a5" stroke="#78716c" stroke-width="1"/>
  <circle cx="270" cy="140" r="3" fill="#fff" opacity="0.6"/>
  <circle cx="285" cy="138" r="2" fill="#fff" opacity="0.6"/>
</svg>''')

# SCI961 - Human reproduction process
fix('SCI961', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Human Reproduction Process</text>
  
  <!-- Parent A -->
  <rect x="20" y="40" width="80" height="50" rx="6" fill="#fce7f3" stroke="#ec4899" stroke-width="2"/>
  <text x="60" y="62" text-anchor="middle" font-size="13" font-weight="bold" fill="#be185d">Parent A</text>
  <text x="60" y="78" text-anchor="middle" font-size="11" fill="#be185d">(Female)</text>
  
  <!-- Parent B -->
  <rect x="300" y="40" width="80" height="50" rx="6" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
  <text x="340" y="62" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e40af">Parent B</text>
  <text x="340" y="78" text-anchor="middle" font-size="11" fill="#1e40af">(Male)</text>
  
  <!-- Cell W (Egg) -->
  <circle cx="60" cy="130" r="25" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <text x="60" y="135" text-anchor="middle" font-size="16" font-weight="bold" fill="#92400e">W</text>
  <text x="60" y="172" text-anchor="middle" font-size="11" fill="#64748b">Egg cell</text>
  <line x1="60" y1="90" x2="60" y2="103" stroke="#ec4899" stroke-width="1.5"/>
  <polygon points="56,103 60,110 64,103" fill="#ec4899"/>
  
  <!-- Cell X (Sperm) -->
  <circle cx="340" cy="130" r="20" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
  <text x="340" y="135" text-anchor="middle" font-size="16" font-weight="bold" fill="#075985">X</text>
  <text x="340" y="172" text-anchor="middle" font-size="11" fill="#64748b">Sperm cell</text>
  <line x1="340" y1="90" x2="340" y2="108" stroke="#3b82f6" stroke-width="1.5"/>
  <polygon points="336,108 340,115 344,108" fill="#3b82f6"/>
  
  <!-- Arrow to Y -->
  <line x1="85" y1="130" x2="155" y2="130" stroke="#64748b" stroke-width="2"/>
  <line x1="320" y1="130" x2="245" y2="130" stroke="#64748b" stroke-width="2"/>
  <text x="200" y="120" text-anchor="middle" font-size="11" fill="#64748b">Fusion</text>
  
  <!-- Cell Y (Zygote) -->
  <circle cx="200" cy="130" r="30" fill="#dcfce7" stroke="#16a34a" stroke-width="2.5"/>
  <text x="200" y="138" text-anchor="middle" font-size="18" font-weight="bold" fill="#15803d">Y</text>
  <text x="200" y="185" text-anchor="middle" font-size="11" fill="#64748b">Zygote</text>
  <text x="200" y="198" text-anchor="middle" font-size="10" fill="#16a34a">(Both parents' traits)</text>
  
  <!-- Arrow to Z -->
  <line x1="200" y1="162" x2="200" y2="188" stroke="#16a34a" stroke-width="2"/>
  <polygon points="196,188 200,196 204,188" fill="#16a34a"/>
  <text x="220" y="178" font-size="10" fill="#64748b">Develops</text>
  
  <!-- Cell Z (Fetus) -->
  <ellipse cx="200" cy="215" rx="35" ry="20" fill="#dcfce7" stroke="#16a34a" stroke-width="2.5"/>
  <text x="200" y="222" text-anchor="middle" font-size="18" font-weight="bold" fill="#15803d">Z</text>
  <text x="130" y="235" text-anchor="middle" font-size="11" fill="#64748b">Fetus (Both parents' traits)</text>
</svg>''')

# SCI962 - Systems F, G, H transporting substances
fix('SCI962', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 260" width="420" font-family="Arial,sans-serif">
  <text x="210" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Transport Systems in Human Body</text>
  
  <!-- Air from outside -->
  <text x="60" y="42" text-anchor="middle" font-size="11" fill="#64748b">Air</text>
  <line x1="60" y1="45" x2="60" y2="58" stroke="#64748b" stroke-width="1.5"/>
  <polygon points="56,58 60,65 64,58" fill="#64748b"/>
  
  <!-- System F (Respiratory) -->
  <rect x="10" y="65" width="100" height="60" rx="6" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
  <text x="60" y="88" text-anchor="middle" font-size="15" font-weight="bold" fill="#1e40af">System F</text>
  <text x="60" y="105" text-anchor="middle" font-size="10" fill="#1e40af">(Respiratory)</text>
  <text x="60" y="118" text-anchor="middle" font-size="9" fill="#64748b">Takes in oxygen</text>
  
  <!-- Substance J arrow out -->
  <line x1="85" y1="125" x2="85" y2="145" stroke="#dc2626" stroke-width="1.5"/>
  <polygon points="81,145 85,152 89,145" fill="#dc2626"/>
  <text x="115" y="138" font-size="10" fill="#dc2626">J (CO₂)</text>
  
  <!-- System G (Circulatory) -->
  <rect x="160" y="65" width="100" height="60" rx="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <text x="210" y="88" text-anchor="middle" font-size="15" font-weight="bold" fill="#92400e">System G</text>
  <text x="210" y="105" text-anchor="middle" font-size="10" fill="#92400e">(Circulatory)</text>
  <text x="210" y="118" text-anchor="middle" font-size="9" fill="#64748b">Transports</text>
  
  <!-- Arrow F to G -->
  <line x1="110" y1="95" x2="155" y2="95" stroke="#3b82f6" stroke-width="2"/>
  <polygon points="155,91 162,95 155,99" fill="#3b82f6"/>
  <text x="133" y="88" text-anchor="middle" font-size="9" fill="#64748b">O₂</text>
  
  <!-- Food from outside -->
  <text x="340" y="42" text-anchor="middle" font-size="11" fill="#64748b">Food</text>
  <line x1="340" y1="45" x2="340" y2="58" stroke="#64748b" stroke-width="1.5"/>
  <polygon points="336,58 340,65 344,58" fill="#64748b"/>
  
  <!-- System H (Digestive) -->
  <rect x="290" y="65" width="100" height="60" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
  <text x="340" y="88" text-anchor="middle" font-size="15" font-weight="bold" fill="#15803d">System H</text>
  <text x="340" y="105" text-anchor="middle" font-size="10" fill="#15803d">(Digestive)</text>
  <text x="340" y="118" text-anchor="middle" font-size="9" fill="#64748b">Breaks down food</text>
  
  <!-- Arrow H to G (Substance K) -->
  <line x1="290" y1="95" x2="265" y2="95" stroke="#16a34a" stroke-width="2"/>
  <polygon points="265,91 258,95 265,99" fill="#16a34a"/>
  <text x="277" y="88" text-anchor="middle" font-size="9" fill="#15803d">K</text>
  <text x="277" y="110" text-anchor="middle" font-size="8" fill="#15803d">(digested</text>
  <text x="277" y="120" text-anchor="middle" font-size="8" fill="#15803d">food)</text>
  
  <!-- Arrow from G to body -->
  <line x1="210" y1="125" x2="210" y2="165" stroke="#f59e0b" stroke-width="2"/>
  <polygon points="206,165 210,172 214,165" fill="#f59e0b"/>
  
  <!-- Body cells -->
  <rect x="145" y="175" width="130" height="70" rx="6" fill="#f1f5f9" stroke="#64748b" stroke-width="2"/>
  <text x="210" y="200" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Body Cells</text>
  <text x="210" y="218" text-anchor="middle" font-size="10" fill="#64748b">Receive O₂ and</text>
  <text x="210" y="232" text-anchor="middle" font-size="10" fill="#64748b">digested food</text>
</svg>''')

# SCI963 - Nadine's water uptake experiment
fix('SCI963', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Water Uptake Experiment</text>
  
  <!-- Setup C -->
  <text x="100" y="45" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e40af">Setup C</text>
  <text x="100" y="60" text-anchor="middle" font-size="10" fill="#64748b">(Roots in plastic bag)</text>
  
  <!-- Beaker C -->
  <rect x="55" y="80" width="90" height="100" fill="#e0f2fe" stroke="#3b82f6" stroke-width="2"/>
  <line x1="50" y1="80" x2="50" y2="180" stroke="#3b82f6" stroke-width="2"/>
  <line x1="150" y1="80" x2="150" y2="180" stroke="#3b82f6" stroke-width="2"/>
  <line x1="50" y1="180" x2="150" y2="180" stroke="#3b82f6" stroke-width="3"/>
  
  <!-- Water level C (constant) -->
  <line x1="55" y1="120" x2="145" y2="120" stroke="#0284c7" stroke-width="2" stroke-dasharray="3,2"/>
  <text x="160" y="124" font-size="10" fill="#0284c7">500 cm³</text>
  
  <!-- Plant C with bagged roots -->
  <line x1="100" y1="120" x2="100" y2="50" stroke="#16a34a" stroke-width="2"/>
  <ellipse cx="85" cy="60" rx="8" ry="5" fill="#86efac" transform="rotate(-20,85,60)"/>
  <ellipse cx="115" cy="60" rx="8" ry="5" fill="#86efac" transform="rotate(20,115,60)"/>
  <!-- Plastic bag around roots -->
  <ellipse cx="100" cy="150" rx="20" ry="25" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="2,2"/>
  <path d="M80,140 Q75,155 85,165" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
  <path d="M120,140 Q125,155 115,165" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
  
  <!-- Setup D -->
  <text x="300" y="45" text-anchor="middle" font-size="13" font-weight="bold" fill="#15803d">Setup D</text>
  <text x="300" y="60" text-anchor="middle" font-size="10" fill="#64748b">(Normal roots)</text>
  
  <!-- Beaker D -->
  <rect x="255" y="80" width="90" height="100" fill="#e0f2fe" stroke="#3b82f6" stroke-width="2"/>
  <line x1="250" y1="80" x2="250" y2="180" stroke="#3b82f6" stroke-width="2"/>
  <line x1="350" y1="80" x2="350" y2="180" stroke="#3b82f6" stroke-width="2"/>
  <line x1="250" y1="180" x2="350" y2="180" stroke="#3b82f6" stroke-width="3"/>
  
  <!-- Water level D (decreasing) -->
  <line x1="255" y1="145" x2="345" y2="145" stroke="#dc2626" stroke-width="2" stroke-dasharray="3,2"/>
  <text x="360" y="149" font-size="10" fill="#dc2626">474 cm³</text>
  <line x1="255" y1="120" x2="345" y2="120" stroke="#94a3b8" stroke-width="1" stroke-dasharray="1,1"/>
  <text x="360" y="124" font-size="9" fill="#94a3b8">Day 1: 500</text>
  
  <!-- Plant D with normal roots -->
  <line x1="300" y1="145" x2="300" y2="50" stroke="#16a34a" stroke-width="2"/>
  <ellipse cx="285" cy="60" rx="8" ry="5" fill="#86efac" transform="rotate(-20,285,60)"/>
  <ellipse cx="315" cy="60" rx="8" ry="5" fill="#86efac" transform="rotate(20,315,60)"/>
  <!-- Normal roots -->
  <path d="M295,145 Q290,155 285,165" stroke="#a3e635" stroke-width="1.5" fill="none"/>
  <path d="M300,145 L300,170" stroke="#a3e635" stroke-width="1.5"/>
  <path d="M305,145 Q310,155 315,165" stroke="#a3e635" stroke-width="1.5" fill="none"/>
  
  <!-- Results table -->
  <rect x="50" y="200" width="300" height="70" rx="4" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>
  <text x="200" y="218" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Water Volume Over 5 Days</text>
  <text x="80" y="238" font-size="11" fill="#1e40af">Setup C:</text>
  <text x="140" y="238" font-size="11" fill="#1e40af">500 → 500 → 500 → 500 → 500 cm³</text>
  <text x="80" y="256" font-size="11" fill="#15803d">Setup D:</text>
  <text x="140" y="256" font-size="11" fill="#15803d">500 → 495 → 487 → 480 → 474 cm³</text>
</svg>''')

# SCI964 - Man pushing a box
fix('SCI964', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 220" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Forces on Box</text>
  
  <!-- Ground/floor -->
  <line x1="0" y1="180" x2="400" y2="180" stroke="#64748b" stroke-width="3"/>
  <pattern id="floor" patternUnits="userSpaceOnUse" width="20" height="10">
    <line x1="0" y1="10" x2="20" y2="0" stroke="#94a3b8" stroke-width="1"/>
  </pattern>
  <rect x="0" y="180" width="400" height="40" fill="url(#floor)"/>
  
  <!-- Box -->
  <rect x="220" y="120" width="80" height="60" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <text x="260" y="155" text-anchor="middle" font-size="13" font-weight="bold" fill="#92400e">BOX</text>
  
  <!-- Box mass indicator -->
  <text x="260" y="105" text-anchor="middle" font-size="11" fill="#64748b">Mass: Heavy</text>
  
  <!-- Man pushing -->
  <circle cx="150" cy="140" r="18" fill="#fce7f3" stroke="#ec4899" stroke-width="2"/>
  <line x1="150" y1="158" x2="150" y2="180" stroke="#ec4899" stroke-width="3"/>
  <line x1="150" y1="165" x2="170" y2="150" stroke="#ec4899" stroke-width="2.5"/>
  <line x1="150" y1="170" x2="130" y2="180" stroke="#ec4899" stroke-width="2.5"/>
  <line x1="150" y1="180" x2="170" y2="180" stroke="#ec4899" stroke-width="2.5"/>
  
  <!-- Push force arrow (B) -->
  <line x1="175" y1="150" x2="215" y2="150" stroke="#3b82f6" stroke-width="3"/>
  <polygon points="215,145 225,150 215,155" fill="#3b82f6"/>
  <text x="195" y="140" text-anchor="middle" font-size="11" font-weight="bold" fill="#3b82f6">Push Force (B)</text>
  
  <!-- Friction between box and floor (C) -->
  <line x1="260" y1="188" x2="220" y2="188" stroke="#dc2626" stroke-width="2.5"/>
  <polygon points="220,184 212,188 220,192" fill="#dc2626"/>
  <text x="310" y="192" font-size="11" font-weight="bold" fill="#dc2626">Friction (C)</text>
  <text x="310" y="205" font-size="9" fill="#dc2626">(box ↔ floor)</text>
  
  <!-- Friction between man and floor (D) - helpful -->
  <line x1="130" y1="188" x2="170" y2="188" stroke="#16a34a" stroke-width="2"/>
  <polygon points="130,184 122,188 130,192" fill="#16a34a"/>
  <polygon points="170,184 178,188 170,192" fill="#16a34a"/>
  <text x="85" y="192" font-size="11" font-weight="bold" fill="#16a34a">Friction (D)</text>
  <text x="85" y="205" font-size="9" fill="#16a34a">(man ↔ floor)</text>
  <text x="85" y="216" font-size="8" fill="#16a34a">(helps push)</text>
  
  <!-- Labels for difficulty -->
  <rect x="10" y="30" width="180" height="60" rx="4" fill="#fef2f2" stroke="#dc2626" stroke-width="1.5"/>
  <text x="100" y="48" text-anchor="middle" font-size="11" font-weight="bold" fill="#991b1b">Makes it DIFFICULT:</text>
  <text x="20" y="65" font-size="10" fill="#dc2626">A: Heavy mass of box</text>
  <text x="20" y="80" font-size="10" fill="#dc2626">C: Friction (box ↔ floor)</text>
</svg>''')

# SCI965 - Food web with R, S, T, U, W, X
fix('SCI965', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 280" width="420" font-family="Arial,sans-serif">
  <text x="210" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Food Web</text>
  <text x="210" y="32" text-anchor="middle" font-size="10" fill="#64748b">Arrows show energy flow: food → eater</text>
  
  <!-- R - Producer (grass/plant) - bottom -->
  <rect x="170" y="230" width="80" height="35" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="2.5"/>
  <text x="210" y="253" text-anchor="middle" font-size="16" font-weight="bold" fill="#15803d">R</text>
  <text x="210" y="268" text-anchor="middle" font-size="10" fill="#15803d">Producer</text>
  
  <!-- U - Plant-eater (middle left) -->
  <rect x="30" y="155" width="70" height="35" rx="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <text x="65" y="177" text-anchor="middle" font-size="16" font-weight="bold" fill="#92400e">U</text>
  <text x="65" y="192" text-anchor="middle" font-size="9" fill="#92400e">Plant-eater</text>
  
  <!-- S - Plant-eater (middle center) -->
  <rect x="175" y="155" width="70" height="35" rx="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <text x="210" y="177" text-anchor="middle" font-size="16" font-weight="bold" fill="#92400e">S</text>
  <text x="210" y="192" text-anchor="middle" font-size="9" fill="#92400e">Plant-eater</text>
  
  <!-- W - Plant-eater (middle right) -->
  <rect x="320" y="155" width="70" height="35" rx="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <text x="355" y="177" text-anchor="middle" font-size="16" font-weight="bold" fill="#92400e">W</text>
  <text x="355" y="192" text-anchor="middle" font-size="9" fill="#92400e">Plant-eater</text>
  
  <!-- T - Predator (top left) -->
  <rect x="30" y="65" width="70" height="35" rx="6" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
  <text x="65" y="87" text-anchor="middle" font-size="16" font-weight="bold" fill="#991b1b">T</text>
  <text x="65" y="102" text-anchor="middle" font-size="9" fill="#991b1b">Predator</text>
  
  <!-- X - Predator (top right) -->
  <rect x="320" y="65" width="70" height="35" rx="6" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
  <text x="355" y="87" text-anchor="middle" font-size="16" font-weight="bold" fill="#991b1b">X</text>
  <text x="355" y="102" text-anchor="middle" font-size="9" fill="#991b1b">Predator</text>
  
  <!-- Arrows from R to plant-eaters -->
  <line x1="190" y1="230" x2="80" y2="195" stroke="#16a34a" stroke-width="2"/>
  <polygon points="80,195 72,188 77,197" fill="#16a34a"/>
  
  <line x1="210" y1="230" x2="210" y2="195" stroke="#16a34a" stroke-width="2"/>
  <polygon points="206,195 210,187 214,195" fill="#16a34a"/>
  
  <line x1="230" y1="230" x2="340" y2="195" stroke="#16a34a" stroke-width="2"/>
  <polygon points="340,195 333,188 343,192" fill="#16a34a"/>
  
  <!-- Arrows from S to predators -->
  <line x1="190" y1="155" x2="80" y2="105" stroke="#f59e0b" stroke-width="2"/>
  <polygon points="80,105 72,100 78,109" fill="#f59e0b"/>
  
  <line x1="230" y1="155" x2="340" y2="105" stroke="#f59e0b" stroke-width="2"/>
  <polygon points="340,105 333,100 343,107" fill="#f59e0b"/>
  
  <!-- Arrow from U to T -->
  <line x1="65" y1="155" x2="65" y2="105" stroke="#f59e0b" stroke-width="2"/>
  <polygon points="61,105 65,97 69,105" fill="#f59e0b"/>
  
  <!-- Arrow from W to X -->
  <line x1="355" y1="155" x2="355" y2="105" stroke="#f59e0b" stroke-width="2"/>
  <polygon points="351,105 355,97 359,105" fill="#f59e0b"/>
</svg>''')

# SCI966 - Animal L burrowing in desert
fix('SCI966', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Desert Animal Adaptation</text>
  
  <!-- Sun -->
  <circle cx="350" cy="50" r="25" fill="#fef08a" stroke="#f59e0b" stroke-width="2"/>
  <line x1="350" y1="25" x2="350" y2="10" stroke="#f59e0b" stroke-width="2"/>
  <line x1="350" y1="75" x2="350" y2="90" stroke="#f59e0b" stroke-width="2"/>
  <line x1="325" y1="50" x2="310" y2="50" stroke="#f59e0b" stroke-width="2"/>
  <line x1="375" y1="50" x2="390" y2="50" stroke="#f59e0b" stroke-width="2"/>
  <text x="350" y="110" text-anchor="middle" font-size="11" fill="#f59e0b" font-weight="bold">Hot Desert</text>
  
  <!-- Surface temperature indicator -->
  <line x1="10" y1="140" x2="390" y2="140" stroke="#dc2626" stroke-width="2"/>
  <text x="200" y="133" text-anchor="middle" font-size="11" fill="#dc2626">Surface (Very Hot)</text>
  
  <!-- Sand surface -->
  <rect x="0" y="140" width="400" height="100" fill="#fef3c7"/>
  <circle cx="30" cy="145" r="3" fill="#fde68a"/>
  <circle cx="80" cy="148" r="2" fill="#fde68a"/>
  <circle cx="150" cy="146" r="3" fill="#fde68a"/>
  <circle cx="250" cy="147" r="2" fill="#fde68a"/>
  <circle cx="320" cy="145" r="3" fill="#fde68a"/>
  
  <!-- Underground (cooler) -->
  <text x="200" y="175" text-anchor="middle" font-size="11" fill="#3b82f6">Underground (Cooler)</text>
  
  <!-- Burrow tunnel -->
  <ellipse cx="150" cy="195" rx="70" ry="35" fill="#fbbf24" stroke="#f59e0b" stroke-width="2" stroke-dasharray="3,2"/>
  
  <!-- Animal L (brown desert animal) -->
  <ellipse cx="150" cy="195" rx="30" ry="15" fill="#92400e" stroke="#78350f" stroke-width="2"/>
  <circle cx="140" cy="192" r="3" fill="#78350f"/>
  <circle cx="135" cy="193" r="1.5" fill="white"/>
  <path d="M125,190 L120,185 L125,187" fill="#92400e" stroke="#78350f" stroke-width="1"/>
  <path d="M125,200 L120,205 L125,203" fill="#92400e" stroke="#78350f" stroke-width="1"/>
  
  <text x="150" y="230" text-anchor="middle" font-size="12" font-weight="bold" fill="#92400e">Animal L</text>
  
  <!-- Benefits labels -->
  <rect x="240" y="155" width="150" height="75" rx="4" fill="#e0f2fe" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="315" y="172" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">Burrowing Benefits:</text>
  <text x="250" y="190" font-size="10" fill="#0369a1">A: Keeps cool</text>
  <text x="250" y="205" font-size="10" fill="#0369a1">B: Hides from predators</text>
  <text x="250" y="220" font-size="10" fill="#64748b" text-decoration="line-through">C: Absorb heat ✗</text>
</svg>''')

# SCI967 - Lydia's graph of variable X
fix('SCI967', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Variable X vs Time (Plant in Jar)</text>
  
  <!-- Y-axis -->
  <line x1="50" y1="50" x2="50" y2="220" stroke="#1e293b" stroke-width="2"/>
  <polygon points="46,50 50,40 54,50" fill="#1e293b"/>
  <text x="25" y="135" text-anchor="middle" font-size="11" fill="#1e293b" transform="rotate(-90,25,135)">Variable X Amount</text>
  
  <!-- X-axis -->
  <line x1="50" y1="220" x2="380" y2="220" stroke="#1e293b" stroke-width="2"/>
  <polygon points="380,216 390,220 380,224" fill="#1e293b"/>
  <text x="215" y="248" text-anchor="middle" font-size="11" fill="#1e293b">Time of Day</text>
  
  <!-- Time labels -->
  <text x="90" y="235" text-anchor="middle" font-size="10" fill="#64748b">12am</text>
  <line x1="90" y1="220" x2="90" y2="225" stroke="#64748b" stroke-width="1"/>
  
  <text x="170" y="235" text-anchor="middle" font-size="10" fill="#64748b">6am</text>
  <line x1="170" y1="220" x2="170" y2="225" stroke="#64748b" stroke-width="1"/>
  
  <text x="250" y="235" text-anchor="middle" font-size="10" fill="#64748b">12pm</text>
  <line x1="250" y1="220" x2="250" y2="225" stroke="#64748b" stroke-width="1"/>
  
  <text x="330" y="235" text-anchor="middle" font-size="10" fill="#64748b">6pm</text>
  <line x1="330" y1="220" x2="330" y2="225" stroke="#64748b" stroke-width="1"/>
  
  <!-- Sunrise indicator -->
  <circle cx="170" cy="42" r="10" fill="#fef08a" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="170" y="32" text-anchor="middle" font-size="9" fill="#f59e0b">Sunrise</text>
  
  <!-- Graph line (low at night, increases after 6am with sunlight) -->
  <path d="M 90,200 L 130,195 L 170,190 L 210,110 L 250,80 L 290,95 L 330,140 L 370,175" 
        fill="none" stroke="#16a34a" stroke-width="3"/>
  
  <!-- Shaded area under curve -->
  <path d="M 90,220 L 90,200 L 130,195 L 170,190 L 210,110 L 250,80 L 290,95 L 330,140 L 370,175 L 370,220 Z" 
        fill="#dcfce7" opacity="0.5"/>
  
  <!-- Key point annotation -->
  <circle cx="210" cy="110" r="4" fill="#16a34a"/>
  <text x="210" y="100" text-anchor="middle" font-size="9" fill="#16a34a">Photosynthesis</text>
  <text x="210" y="90" text-anchor="middle" font-size="9" fill="#16a34a">increases</text>
  
  <!-- Plant illustration -->
  <rect x="310" y="165" width="60" height="42" rx="3" fill="#e0f2fe" stroke="#3b82f6" stroke-width="1"/>
  <text x="340" y="180" text-anchor="middle" font-size="9" fill="#1e40af">Plant Y</text>
  <text x="340" y="191" text-anchor="middle" font-size="8" fill="#1e40af">in jar by</text>
  <text x="340" y="201" text-anchor="middle" font-size="8" fill="#1e40af">window</text>
  
  <!-- Label -->
  <text x="200" y="65" text-anchor="middle" font-size="11" fill="#15803d" font-weight="bold">X = Oxygen Production</text>
</svg>''')

# SCI968 - Siti's light intensity experiment
fix('SCI968', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Light Intensity vs Oxygen Production</text>
  
  <!-- Table showing light intensity -->
  <rect x="50" y="35" width="300" height="75" rx="4" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
  <text x="200" y="52" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Light Intensity at Locations</text>
  
  <!-- Header row -->
  <rect x="60" y="60" width="60" height="25" fill="#dbeafe" stroke="#3b82f6" stroke-width="1"/>
  <text x="90" y="77" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">Location</text>
  <rect x="120" y="60" width="90" height="25" fill="#dbeafe" stroke="#3b82f6" stroke-width="1"/>
  <text x="165" y="77" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">Light Intensity</text>
  <rect x="210" y="60" width="130" height="25" fill="#dcfce7" stroke="#16a34a" stroke-width="1"/>
  <text x="275" y="77" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">O₂ Produced (cm³)</text>
  
  <!-- Data rows -->
  <rect x="60" y="85" width="60" height="20" fill="white" stroke="#94a3b8" stroke-width="0.5"/>
  <text x="90" y="99" text-anchor="middle" font-size="11" fill="#1e293b">A</text>
  <rect x="120" y="85" width="90" height="20" fill="white" stroke="#94a3b8" stroke-width="0.5"/>
  <text x="165" y="99" text-anchor="middle" font-size="11" fill="#64748b">Medium-high</text>
  <rect x="210" y="85" width="130" height="20" fill="#f0fdf4" stroke="#94a3b8" stroke-width="0.5"/>
  <text x="275" y="99" text-anchor="middle" font-size="11" fill="#15803d">8</text>
  
  <rect x="60" y="105" width="60" height="20" fill="white" stroke="#94a3b8" stroke-width="0.5"/>
  <text x="90" y="119" text-anchor="middle" font-size="11" fill="#1e293b">B</text>
  <rect x="120" y="105" width="90" height="20" fill="white" stroke="#94a3b8" stroke-width="0.5"/>
  <text x="165" y="119" text-anchor="middle" font-size="11" fill="#64748b">Highest</text>
  <rect x="210" y="105" width="130" height="20" fill="#f0fdf4" stroke="#94a3b8" stroke-width="0.5"/>
  <text x="275" y="119" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">10</text>
  
  <rect x="60" y="125" width="60" height="20" fill="white" stroke="#94a3b8" stroke-width="0.5"/>
  <text x="90" y="139" text-anchor="middle" font-size="11" fill="#1e293b">C</text>
  <rect x="120" y="125" width="90" height="20" fill="white" stroke="#94a3b8" stroke-width="0.5"/>
  <text x="165" y="139" text-anchor="middle" font-size="11" fill="#64748b">Medium-low</text>
  <rect x="210" y="125" width="130" height="20" fill="#f0fdf4" stroke="#94a3b8" stroke-width="0.5"/>
  <text x="275" y="139" text-anchor="middle" font-size="11" fill="#15803d">5</text>
  
  <rect x="60" y="145" width="60" height="20" fill="white" stroke="#94a3b8" stroke-width="0.5"/>
  <text x="90" y="159" text-anchor="middle" font-size="11" fill="#1e293b">D</text>
  <rect x="120" y="145" width="90" height="20" fill="white" stroke="#94a3b8" stroke-width="0.5"/>
  <text x="165" y="159" text-anchor="middle" font-size="11" fill="#64748b">Lowest</text>
  <rect x="210" y="145" width="130" height="20" fill="#f0fdf4" stroke="#94a3b8" stroke-width="0.5"/>
  <text x="275" y="159" text-anchor="middle" font-size="11" fill="#15803d">2</text>
  
  <!-- Bar graph representation -->
  <text x="200" y="185" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Oxygen Production Comparison</text>
  
  <!-- Bars -->
  <rect x="70" y="230" width="40" height="-40" fill="#3b82f6" stroke="#1e40af" stroke-width="1"/>
  <text x="90" y="245" text-anchor="middle" font-size="11" fill="#1e293b">A: 8</text>
  
  <rect x="140" y="230" width="40" height="-50" fill="#16a34a" stroke="#15803d" stroke-width="2"/>
  <text x="160" y="245" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e293b">B: 10</text>
  
  <rect x="210" y="230" width="40" height="-25" fill="#3b82f6" stroke="#1e40af" stroke-width="1"/>
  <text x="230" y="245" text-anchor="middle" font-size="11" fill="#1e293b">C: 5</text>
  
  <rect x="280" y="230" width="40" height="-10" fill="#f59e0b" stroke="#d97706" stroke-width="1"/>
  <text x="300" y="245" text-anchor="middle" font-size="11" fill="#1e293b">D: 2</text>
  
  <!-- Baseline -->
  <line x1="50" y1="230" x2="340" y2="230" stroke="#64748b" stroke-width="2"/>
</svg>''')

# SCI969 - Patricia's material absorbency experiment
fix('SCI969', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Water Absorbency Test</text>
  
  <!-- Material X setup -->
  <text x="100" y="45" text-anchor="middle" font-size="13" font-weight="bold" fill="#3b82f6">Material X</text>
  
  <!-- Tub X - Before -->
  <rect x="30" y="60" width="60" height="70" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
  <line x1="25" y1="60" x2="25" y2="130" stroke="#3b82f6" stroke-width="2"/>
  <line x1="95" y1="60" x2="95" y2="130" stroke="#3b82f6" stroke-width="2"/>
  <line x1="25" y1="130" x2="95" y2="130" stroke="#3b82f6" stroke-width="3"/>
  <line x1="35" y1="80" x2="85" y2="80" stroke="#0284c7" stroke-width="2" stroke-dasharray="2,2"/>
  <text x="60" y="75" text-anchor="middle" font-size="9" fill="#0284c7">100 cm³</text>
  <text x="60" y="145" text-anchor="middle" font-size="10" fill="#64748b">Before</text>
  
  <!-- Material X -->
  <rect x="105" y="80" width="50" height="30" rx="3" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <text x="130" y="99" text-anchor="middle" font-size="11" fill="#92400e">X</text>
  
  <!-- Arrow -->
  <text x="175" y="95" font-size="16" fill="#64748b">→</text>
  
  <!-- Tub X - After -->
  <rect x="180" y="60" width="60" height="70" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
  <line x1="175" y1="60" x2="175" y2="130" stroke="#3b82f6" stroke-width="2"/>
  <line x1="245" y1="60" x2="245" y2="130" stroke="#3b82f6" stroke-width="2"/>
  <line x1="175" y1="130" x2="245" y2="130" stroke="#3b82f6" stroke-width="3"/>
  <line x1="185" y1="105" x2="235" y2="105" stroke="#0284c7" stroke-width="2" stroke-dasharray="2,2"/>
  <text x="210" y="100" text-anchor="middle" font-size="9" fill="#0284c7">55 cm³</text>
  <text x="210" y="145" text-anchor="middle" font-size="10" fill="#64748b">After</text>
  <!-- Absorbed material X -->
  <rect x="185" y="110" width="50" height="15" rx="2" fill="#fbbf24" stroke="#f59e0b" stroke-width="1.5"/>
  
  <!-- Material Y setup -->
  <text x="100" y="180" text-anchor="middle" font-size="13" font-weight="bold" fill="#16a34a">Material Y</text>
  
  <!-- Tub Y - Before -->
  <rect x="30" y="195" width="60" height="70" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
  <line x1="25" y1="195" x2="25" y2="265" stroke="#3b82f6" stroke-width="2"/>
  <line x1="95" y1="195" x2="95" y2="265" stroke="#3b82f6" stroke-width="2"/>
  <line x1="25" y1="265" x2="95" y2="265" stroke="#3b82f6" stroke-width="3"/>
  <line x1="35" y1="215" x2="85" y2="215" stroke="#0284c7" stroke-width="2" stroke-dasharray="2,2"/>
  <text x="60" y="210" text-anchor="middle" font-size="9" fill="#0284c7">100 cm³</text>
  <text x="60" y="278" text-anchor="middle" font-size="10" fill="#64748b">Before</text>
  
  <!-- Material Y -->
  <rect x="105" y="215" width="50" height="30" rx="3" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
  <text x="130" y="234" text-anchor="middle" font-size="11" fill="#15803d">Y</text>
  
  <!-- Arrow -->
  <text x="175" y="230" font-size="16" fill="#64748b">→</text>
  
  <!-- Tub Y - After -->
  <rect x="180" y="195" width="60" height="70" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
  <line x1="175" y1="195" x2="175" y2="265" stroke="#3b82f6" stroke-width="2"/>
  <line x1="245" y1="195" x2="245" y2="265" stroke="#3b82f6" stroke-width="2"/>
  <line x1="175" y1="265" x2="245" y2="265" stroke="#3b82f6" stroke-width="3"/>
  <line x1="185" y1="240" x2="235" y2="240" stroke="#dc2626" stroke-width="2" stroke-dasharray="2,2"/>
  <text x="210" y="235" text-anchor="middle" font-size="9" fill="#dc2626">30 cm³</text>
  <text x="210" y="278" text-anchor="middle" font-size="10" fill="#64748b">After</text>
  <!-- Absorbed material Y (more absorption) -->
  <rect x="185" y="245" width="50" height="15" rx="2" fill="#86efac" stroke="#16a34a" stroke-width="1.5"/>
  
  <!-- Comparison box -->
  <rect x="265" y="90" width="120" height="110" rx="4" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <text x="325" y="108" text-anchor="middle" font-size="11" font-weight="bold" fill="#92400e">Water Absorbed:</text>
  <text x="275" y="130" font-size="11" fill="#3b82f6">X: 100 - 55 =</text>
  <text x="325" y="148" text-anchor="middle" font-size="13" font-weight="bold" fill="#3b82f6">45 cm³</text>
  <text x="275" y="170" font-size="11" fill="#16a34a">Y: 100 - 30 =</text>
  <text x="325" y="188" text-anchor="middle" font-size="13" font-weight="bold" fill="#16a34a">70 cm³</text>
  <text x="325" y="25" text-anchor="middle" font-size="11" fill="#15803d" font-weight="bold">Y is MORE absorbent!</text>
</svg>''')

# Save the updated data
with open('data/questions-science-p6.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("✓ Added diagrams to SCI959-SCI969 (11 questions)")
print("  - SCI959: Organism characteristics table")
print("  - SCI960: Organisms G and H comparison")
print("  - SCI961: Human reproduction process")
print("  - SCI962: Systems F, G, H transport")
print("  - SCI963: Nadine's water uptake experiment")
print("  - SCI964: Man pushing box (forces)")
print("  - SCI965: Food web R, S, T, U, W, X")
print("  - SCI966: Animal L desert burrowing")
print("  - SCI967: Lydia's graph (Variable X)")
print("  - SCI968: Siti's light intensity test")
print("  - SCI969: Patricia's absorbency test")
