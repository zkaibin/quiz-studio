import json

with open('data/questions-science-p6.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

idx = {q['id']: i for i, q in enumerate(data)}

def fix(qid, diagram):
    data[idx[qid]]['diagram'] = diagram

# SCI946: Experiment setups testing light effect on plant growth
fix('SCI946', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" font-family="Arial,sans-serif">
  <text x="200" y="16" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e293b">Experimental Set-ups</text>
  
  <!-- Setup A: Black paper cover (blocks light) -->
  <rect x="10" y="30" width="90" height="120" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5" rx="4"/>
  <text x="55" y="48" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">A</text>
  <rect x="25" y="55" width="60" height="55" fill="#1e293b" stroke="#0f172a" stroke-width="1"/>
  <text x="55" y="85" text-anchor="middle" font-size="9" fill="#f1f5f9">Black</text>
  <text x="55" y="95" text-anchor="middle" font-size="9" fill="#f1f5f9">Paper</text>
  <rect x="35" y="115" width="40" height="5" fill="#78716c" stroke="#57534e" stroke-width="0.5"/>
  <ellipse cx="40" cy="120" rx="3" ry="2" fill="#16a34a"/>
  <ellipse cx="55" cy="122" rx="3" ry="2" fill="#16a34a"/>
  <ellipse cx="70" cy="121" rx="3" ry="2" fill="#16a34a"/>
  <rect x="35" y="120" width="40" height="25" fill="#78716c" stroke="#57534e" stroke-width="1"/>
  <text x="55" y="135" text-anchor="middle" font-size="7" fill="#f5f5f4">WET SOIL</text>
  
  <!-- Setup B: Clear plastic cover (allows light) -->
  <rect x="110" y="30" width="90" height="120" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5" rx="4"/>
  <text x="155" y="48" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">B</text>
  <rect x="125" y="55" width="60" height="55" fill="#dbeafe" stroke="#3b82f6" stroke-width="1" opacity="0.4"/>
  <text x="155" y="85" text-anchor="middle" font-size="9" fill="#1e40af">Clear</text>
  <text x="155" y="95" text-anchor="middle" font-size="9" fill="#1e40af">Plastic</text>
  <rect x="135" y="115" width="40" height="5" fill="#78716c" stroke="#57534e" stroke-width="0.5"/>
  <ellipse cx="140" cy="120" rx="3" ry="2" fill="#16a34a"/>
  <ellipse cx="155" cy="121" rx="3" ry="2" fill="#16a34a"/>
  <rect x="135" y="120" width="40" height="25" fill="#dc2626" stroke="#991b1b" stroke-width="1"/>
  <text x="155" y="135" text-anchor="middle" font-size="7" fill="#fef2f2">DRY SOIL</text>
  
  <!-- Setup C: Black paper cover -->
  <rect x="210" y="30" width="90" height="120" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5" rx="4"/>
  <text x="255" y="48" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">C</text>
  <rect x="225" y="55" width="60" height="55" fill="#1e293b" stroke="#0f172a" stroke-width="1"/>
  <text x="255" y="85" text-anchor="middle" font-size="9" fill="#f1f5f9">Black</text>
  <text x="255" y="95" text-anchor="middle" font-size="9" fill="#f1f5f9">Paper</text>
  <rect x="235" y="115" width="40" height="5" fill="#78716c" stroke="#57534e" stroke-width="0.5"/>
  <ellipse cx="240" cy="121" rx="3" ry="2" fill="#16a34a"/>
  <rect x="235" y="120" width="40" height="25" fill="#dc2626" stroke="#991b1b" stroke-width="1"/>
  <text x="255" y="135" text-anchor="middle" font-size="7" fill="#fef2f2">DRY SOIL</text>
  
  <!-- Setup D: Glass cover (allows light) -->
  <rect x="310" y="30" width="90" height="120" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5" rx="4"/>
  <text x="355" y="48" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">D</text>
  <rect x="325" y="55" width="60" height="55" fill="#e0f2fe" stroke="#0284c7" stroke-width="1" opacity="0.3"/>
  <text x="355" y="85" text-anchor="middle" font-size="9" fill="#0c4a6e">Glass</text>
  <rect x="335" y="115" width="40" height="5" fill="#78716c" stroke="#57534e" stroke-width="0.5"/>
  <ellipse cx="340" cy="120" rx="3" ry="2" fill="#16a34a"/>
  <ellipse cx="355" cy="122" rx="3" ry="2" fill="#16a34a"/>
  <ellipse cx="370" cy="121" rx="3" ry="2" fill="#16a34a"/>
  <rect x="335" y="120" width="40" height="25" fill="#78716c" stroke="#57534e" stroke-width="1"/>
  <text x="355" y="135" text-anchor="middle" font-size="7" fill="#f5f5f4">WET SOIL</text>
  
  <!-- Legend -->
  <text x="200" y="170" text-anchor="middle" font-size="10" fill="#475569">Fair Test Variables:</text>
  <text x="200" y="185" text-anchor="middle" font-size="9" fill="#64748b">✓ Same plant type</text>
  <text x="200" y="198" text-anchor="middle" font-size="9" fill="#64748b">✓ Same soil moisture (wet or dry)</text>
  <text x="200" y="211" text-anchor="middle" font-size="9" fill="#64748b">✓ Same number of plants</text>
  <text x="200" y="230" text-anchor="middle" font-size="10" font-weight="bold" fill="#0369a1">Variable being tested: Presence of light</text>
  <text x="200" y="245" text-anchor="middle" font-size="9" fill="#64748b">Compare A (no light, wet) vs D (light, wet)</text>
</svg>''')

# SCI947: Test for flexibility (bending)
fix('SCI947', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 250" width="380" font-family="Arial,sans-serif">
  <text x="190" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Testing Material Properties</text>
  
  <!-- Flexibility Test -->
  <rect x="10" y="35" width="170" height="95" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" rx="6"/>
  <text x="95" y="52" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">FLEXIBILITY TEST</text>
  <text x="95" y="66" text-anchor="middle" font-size="9" fill="#1e40af">(Can it bend?)</text>
  
  <!-- Rigid object -->
  <rect x="25" y="75" width="50" height="4" fill="#64748b" stroke="#475569" stroke-width="1"/>
  <text x="50" y="95" text-anchor="middle" font-size="8" fill="#475569">Rigid (not flexible)</text>
  
  <!-- Flexible object - bent -->
  <path d="M 105 77 Q 130 65 155 77" stroke="#16a34a" stroke-width="4" fill="none"/>
  <text x="130" y="95" text-anchor="middle" font-size="8" fill="#15803d">Flexible (bends)</text>
  
  <!-- Hand applying force -->
  <path d="M 120 60 L 120 50 M 115 52 L 120 50 M 125 52 L 120 50" stroke="#f59e0b" stroke-width="1.5" fill="none"/>
  <text x="95" y="113" text-anchor="middle" font-size="8" fill="#0369a1">✓ Apply bending force</text>
  <text x="95" y="124" text-anchor="middle" font-size="8" fill="#0369a1">✓ Observe if it breaks</text>
  
  <!-- Strength Test (incorrect) -->
  <rect x="200" y="35" width="170" height="95" fill="#fee2e2" stroke="#ef4444" stroke-width="2" rx="6"/>
  <text x="285" y="52" text-anchor="middle" font-size="11" font-weight="bold" fill="#991b1b">STRENGTH TEST</text>
  <text x="285" y="66" text-anchor="middle" font-size="9" fill="#991b1b">(Different property)</text>
  
  <!-- Pulling force -->
  <line x1="230" y1="80" x2="260" y2="80" stroke="#64748b" stroke-width="3"/>
  <line x1="230" y1="80" x2="220" y2="80" stroke="#ef4444" stroke-width="1.5"/>
  <polygon points="218,78 212,80 218,82" fill="#ef4444"/>
  <line x1="260" y1="80" x2="270" y2="80" stroke="#ef4444" stroke-width="1.5"/>
  <polygon points="272,78 278,80 272,82" fill="#ef4444"/>
  <text x="285" y="100" text-anchor="middle" font-size="8" fill="#475569">Pulling until it breaks</text>
  <text x="285" y="113" text-anchor="middle" font-size="8" fill="#991b1b">✗ Tests strength,</text>
  <text x="285" y="124" text-anchor="middle" font-size="8" fill="#991b1b">not flexibility</text>
  
  <!-- Other tests -->
  <rect x="10" y="145" width="170" height="95" fill="#f1f5f9" stroke="#64748b" stroke-width="1.5" rx="4"/>
  <text x="95" y="162" text-anchor="middle" font-size="10" font-weight="bold" fill="#475569">Other Tests</text>
  <circle cx="60" cy="185" r="15" fill="#93c5fd" stroke="#3b82f6" stroke-width="1"/>
  <circle cx="60" cy="185" r="8" fill="#3b82f6"/>
  <text x="105" y="188" text-anchor="start" font-size="8" fill="#64748b">Water test → density</text>
  
  <circle cx="60" cy="215" r="12" fill="#fde047" stroke="#eab308" stroke-width="1"/>
  <line x1="50" y1="215" x2="40" y2="205" stroke="#f59e0b" stroke-width="1.5"/>
  <line x1="50" y1="215" x2="42" y2="220" stroke="#f59e0b" stroke-width="1.5"/>
  <line x1="50" y1="215" x2="48" y2="225" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="105" y="218" text-anchor="start" font-size="8" fill="#64748b">Light test → transparency</text>
  
  <!-- Summary -->
  <rect x="200" y="145" width="170" height="95" fill="#dcfce7" stroke="#16a34a" stroke-width="2" rx="6"/>
  <text x="285" y="162" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">FLEXIBILITY</text>
  <text x="285" y="180" text-anchor="middle" font-size="9" fill="#166534">Definition:</text>
  <text x="285" y="193" text-anchor="middle" font-size="9" fill="#166534">Ability to BEND</text>
  <text x="285" y="206" text-anchor="middle" font-size="9" fill="#166534">without BREAKING</text>
  <text x="285" y="225" text-anchor="middle" font-size="8" font-weight="bold" fill="#15803d">Test: Bend the object!</text>
</svg>''')

# SCI948: What is not matter
fix('SCI948', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 240" width="380" font-family="Arial,sans-serif">
  <text x="190" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">What is Matter?</text>
  
  <!-- Definition box -->
  <rect x="40" y="30" width="300" height="45" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" rx="6"/>
  <text x="190" y="48" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">MATTER</text>
  <text x="190" y="62" text-anchor="middle" font-size="10" fill="#1e40af">Has MASS and occupies SPACE</text>
  
  <!-- Examples of MATTER -->
  <text x="190" y="95" text-anchor="middle" font-size="12" font-weight="bold" fill="#15803d">Examples of MATTER ✓</text>
  
  <!-- Salt -->
  <rect x="25" y="105" width="80" height="70" fill="#f8fafc" stroke="#16a34a" stroke-width="2" rx="4"/>
  <circle cx="50" cy="130" r="2" fill="#f1f5f9" stroke="#94a3b8" stroke-width="0.5"/>
  <circle cx="56" cy="135" r="1.5" fill="#f1f5f9" stroke="#94a3b8" stroke-width="0.5"/>
  <circle cx="62" cy="130" r="2" fill="#f1f5f9" stroke="#94a3b8" stroke-width="0.5"/>
  <circle cx="68" cy="133" r="1.5" fill="#f1f5f9" stroke="#94a3b8" stroke-width="0.5"/>
  <circle cx="74" cy="128" r="2" fill="#f1f5f9" stroke="#94a3b8" stroke-width="0.5"/>
  <circle cx="80" cy="132" r="1.5" fill="#f1f5f9" stroke="#94a3b8" stroke-width="0.5"/>
  <text x="65" y="155" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">Salt</text>
  <text x="65" y="168" text-anchor="middle" font-size="7" fill="#64748b">Solid matter</text>
  
  <!-- Cloud -->
  <rect x="115" y="105" width="80" height="70" fill="#f8fafc" stroke="#16a34a" stroke-width="2" rx="4"/>
  <ellipse cx="145" cy="128" rx="15" ry="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="1"/>
  <ellipse cx="155" cy="125" rx="12" ry="7" fill="#bae6fd" stroke="#0284c7" stroke-width="1"/>
  <ellipse cx="165" cy="128" rx="10" ry="6" fill="#e0f2fe" stroke="#0284c7" stroke-width="1"/>
  <text x="155" y="155" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">Cloud</text>
  <text x="155" y="168" text-anchor="middle" font-size="7" fill="#64748b">Water droplets (matter)</text>
  
  <!-- Bacteria -->
  <rect x="205" y="105" width="80" height="70" fill="#f8fafc" stroke="#16a34a" stroke-width="2" rx="4"/>
  <ellipse cx="245" cy="128" rx="18" ry="12" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
  <circle cx="240" cy="125" r="2" fill="#166534"/>
  <circle cx="250" cy="125" r="2" fill="#166534"/>
  <path d="M 227 128 Q 223 118 227 118" stroke="#16a34a" stroke-width="1" fill="none"/>
  <path d="M 263 128 Q 267 118 263 118" stroke="#16a34a" stroke-width="1" fill="none"/>
  <text x="245" y="155" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">Bacteria</text>
  <text x="245" y="168" text-anchor="middle" font-size="7" fill="#64748b">Living organism (matter)</text>
  
  <!-- NOT Matter -->
  <text x="190" y="195" text-anchor="middle" font-size="12" font-weight="bold" fill="#991b1b">NOT Matter ✗</text>
  
  <rect x="295" y="105" width="80" height="70" fill="#fee2e2" stroke="#ef4444" stroke-width="2" rx="4"/>
  <line x1="310" y1="118" x2="350" y2="142" stroke="#f59e0b" stroke-width="2"/>
  <polygon points="350,142 356,140 354,146" fill="#f59e0b"/>
  <rect x="355" y="125" width="15" height="25" fill="#64748b" stroke="#475569" stroke-width="1" rx="2"/>
  <text x="335" y="155" text-anchor="middle" font-size="10" font-weight="bold" fill="#991b1b">Reflection</text>
  <text x="335" y="168" text-anchor="middle" font-size="7" fill="#64748b">Light phenomenon</text>
  
  <rect x="140" y="205" width="100" height="30" fill="#fef2f2" stroke="#dc2626" stroke-width="1.5" rx="4"/>
  <text x="190" y="220" text-anchor="middle" font-size="9" fill="#991b1b">No mass, no space:</text>
  <text x="190" y="232" text-anchor="middle" font-size="9" font-weight="bold" fill="#991b1b">NOT MATTER</text>
</svg>''')

# SCI949: Reusable bag folded/unfolded
fix('SCI949', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Reusable Shopping Bag</text>
  
  <!-- Unfolded bag -->
  <text x="100" y="40" text-anchor="middle" font-size="12" font-weight="bold" fill="#0369a1">UNFOLDED</text>
  <rect x="40" y="50" width="120" height="140" fill="#dcfce7" stroke="#16a34a" stroke-width="2" rx="4"/>
  <path d="M 60 50 Q 60 45 70 45 L 130 45 Q 140 45 140 50" stroke="#16a34a" stroke-width="2" fill="none"/>
  <circle cx="70" cy="45" r="3" fill="#16a34a"/>
  <circle cx="130" cy="45" r="3" fill="#16a34a"/>
  <text x="100" y="120" text-anchor="middle" font-size="10" fill="#15803d">ECO</text>
  <text x="100" y="133" text-anchor="middle" font-size="10" fill="#15803d">BAG</text>
  
  <!-- Arrow -->
  <path d="M 170 120 L 220 120" stroke="#64748b" stroke-width="2" fill="none"/>
  <polygon points="218,115 228,120 218,125" fill="#64748b"/>
  <text x="194" y="113" text-anchor="middle" font-size="9" fill="#64748b">fold</text>
  
  <!-- Folded bag -->
  <text x="300" y="40" text-anchor="middle" font-size="12" font-weight="bold" fill="#0369a1">FOLDED</text>
  <rect x="260" y="100" width="80" height="40" fill="#dcfce7" stroke="#16a34a" stroke-width="2" rx="3"/>
  <line x1="265" y1="110" x2="335" y2="110" stroke="#16a34a" stroke-width="1" opacity="0.5"/>
  <line x1="265" y1="120" x2="335" y2="120" stroke="#16a34a" stroke-width="1" opacity="0.5"/>
  <line x1="265" y1="130" x2="335" y2="130" stroke="#16a34a" stroke-width="1" opacity="0.5"/>
  <text x="300" y="125" text-anchor="middle" font-size="8" fill="#15803d">ECO</text>
  
  <!-- Properties -->
  <text x="200" y="215" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Properties of the Bag</text>
  
  <!-- Property A: Flexible -->
  <rect x="15" y="225" width="115" height="50" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5" rx="4"/>
  <text x="72" y="240" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e40af">A: FLEXIBLE ✓</text>
  <text x="72" y="253" text-anchor="middle" font-size="8" fill="#475569">Can be folded</text>
  <text x="72" y="264" text-anchor="middle" font-size="8" fill="#475569">and unfolded</text>
  
  <!-- Property B: Occupies space -->
  <rect x="142" y="225" width="115" height="50" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5" rx="4"/>
  <text x="200" y="240" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e40af">B: OCCUPIES SPACE ✓</text>
  <text x="200" y="253" text-anchor="middle" font-size="8" fill="#475569">Takes up volume</text>
  <text x="200" y="264" text-anchor="middle" font-size="8" fill="#475569">(even when folded)</text>
  
  <!-- Property C: Same mass -->
  <rect x="270" y="225" width="115" height="50" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5" rx="4"/>
  <text x="327" y="240" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e40af">C: SAME MASS ✓</text>
  <text x="327" y="253" text-anchor="middle" font-size="8" fill="#475569">Mass doesn't change</text>
  <text x="327" y="264" text-anchor="middle" font-size="8" fill="#475569">when shape changes</text>
</svg>''')

# SCI950: Hot water freezing in cold air
fix('SCI950', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 260" width="380" font-family="Arial,sans-serif">
  <text x="190" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Hot Water in Extremely Cold Air</text>
  
  <!-- Very cold air -->
  <rect x="10" y="30" width="360" height="200" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" rx="6"/>
  <text x="190" y="48" text-anchor="middle" font-size="11" font-weight="bold" fill="#0c4a6e">Very Cold Place (Below 0°C)</text>
  
  <!-- Temperature indicator -->
  <rect x="25" y="55" width="20" height="60" fill="white" stroke="#475569" stroke-width="1" rx="2"/>
  <circle cx="35" cy="120" r="6" fill="#3b82f6" stroke="#1e40af" stroke-width="1"/>
  <rect x="31" y="70" width="8" height="50" fill="#3b82f6"/>
  <text x="60" y="100" text-anchor="start" font-size="10" fill="#0c4a6e">Temperature</text>
  <text x="60" y="113" text-anchor="start" font-size="10" font-weight="bold" fill="#dc2626">Below 0°C</text>
  
  <!-- Person throwing water -->
  <circle cx="150" cy="120" r="12" fill="#fef3c7" stroke="#f59e0b" stroke-width="1"/>
  <line x1="150" y1="132" x2="150" y2="160" stroke="#f59e0b" stroke-width="2"/>
  <line x1="150" y1="140" x2="130" y2="155" stroke="#f59e0b" stroke-width="2"/>
  <line x1="150" y1="140" x2="170" y2="150" stroke="#f59e0b" stroke-width="2"/>
  <line x1="150" y1="160" x2="140" y2="180" stroke="#f59e0b" stroke-width="2"/>
  <line x1="150" y1="160" x2="160" y2="180" stroke="#f59e0b" stroke-width="2"/>
  
  <!-- Container -->
  <path d="M 165 145 L 175 140 L 180 155 L 170 160 Z" fill="#64748b" stroke="#475569" stroke-width="1"/>
  
  <!-- Hot water droplets turning to ice -->
  <circle cx="185" cy="135" r="3" fill="#ef4444"/>
  <text x="188" y="132" font-size="8" fill="#dc2626">hot</text>
  
  <circle cx="200" cy="125" r="3" fill="#f97316"/>
  <circle cx="215" cy="120" r="3" fill="#f59e0b"/>
  <circle cx="230" cy="118" r="3" fill="#eab308"/>
  
  <!-- Ice/snow particles -->
  <g transform="translate(245, 115)">
    <path d="M 0,-4 L 0,4 M -4,0 L 4,0 M -3,-3 L 3,3 M -3,3 L 3,-3" stroke="#3b82f6" stroke-width="1"/>
  </g>
  <g transform="translate(260, 112)">
    <path d="M 0,-4 L 0,4 M -4,0 L 4,0 M -3,-3 L 3,3 M -3,3 L 3,-3" stroke="#3b82f6" stroke-width="1"/>
  </g>
  <g transform="translate(275, 110)">
    <path d="M 0,-4 L 0,4 M -4,0 L 4,0 M -3,-3 L 3,3 M -3,3 L 3,-3" stroke="#3b82f6" stroke-width="1"/>
  </g>
  <g transform="translate(290, 108)">
    <path d="M 0,-4 L 0,4 M -4,0 L 4,0 M -3,-3 L 3,3 M -3,3 L 3,-3" stroke="#3b82f6" stroke-width="1"/>
  </g>
  
  <text x="270" y="145" text-anchor="middle" font-size="10" font-weight="bold" fill="#0c4a6e">White powdery</text>
  <text x="270" y="158" text-anchor="middle" font-size="10" font-weight="bold" fill="#0c4a6e">substance (ice)</text>
  
  <!-- Process explanation -->
  <rect x="60" y="185" width="260" height="38" fill="#fef2f2" stroke="#dc2626" stroke-width="1.5" rx="4"/>
  <text x="190" y="199" text-anchor="middle" font-size="9" fill="#991b1b">Hot water → Rapid cooling → Freezing</text>
  <text x="190" y="211" text-anchor="middle" font-size="9" font-weight="bold" fill="#991b1b">Air temperature &lt; 0°C (freezing point)</text>
  <text x="190" y="238" text-anchor="middle" font-size="10" font-weight="bold" fill="#0369a1">Change of state: Liquid → Solid</text>
</svg>''')

# SCI951: Circuit with materials P, Q, M, N (bulbs A,B,C,D)
fix('SCI951', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="400" font-family="Arial,sans-serif">
  <text x="200" y="16" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e293b">Circuit with Materials P, Q, M, N</text>
  
  <!-- Battery -->
  <rect x="30" y="130" width="30" height="15" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="2"/>
  <line x1="36" y1="137" x2="54" y2="137" stroke="#dc2626" stroke-width="2"/>
  <line x1="36" y1="145" x2="54" y2="145" stroke="#3b82f6" stroke-width="2"/>
  <text x="45" y="125" text-anchor="middle" font-size="9" fill="#475569">Battery</text>
  
  <!-- Switch -->
  <line x1="60" y1="137" x2="85" y2="137" stroke="#1e293b" stroke-width="2"/>
  <circle cx="85" cy="137" r="3" fill="#475569"/>
  <line x1="85" y1="137" x2="110" y2="130" stroke="#1e293b" stroke-width="2"/>
  <circle cx="110" cy="130" r="3" fill="#475569"/>
  <text x="95" y="120" text-anchor="middle" font-size="8" fill="#64748b">Switch</text>
  <text x="95" y="155" text-anchor="middle" font-size="8" fill="#16a34a">Closed</text>
  
  <!-- Wire to junction -->
  <line x1="110" y1="130" x2="160" y2="130" stroke="#1e293b" stroke-width="2"/>
  <circle cx="160" cy="130" r="4" fill="#1e293b"/>
  
  <!-- Top branch: Material P → Bulb A -->
  <line x1="160" y1="130" x2="160" y2="60" stroke="#1e293b" stroke-width="2"/>
  <rect x="150" y="55" width="20" height="30" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5" rx="2"/>
  <text x="160" y="75" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e40af">P</text>
  <line x1="160" y1="55" x2="160" y2="35" stroke="#1e293b" stroke-width="2"/>
  <circle cx="160" cy="35" r="8" fill="#fef08a" stroke="#eab308" stroke-width="2"/>
  <text x="160" y="39" text-anchor="middle" font-size="8" font-weight="bold" fill="#854d0e">A</text>
  <line x1="160" y1="27" x2="160" y2="15" stroke="#1e293b" stroke-width="2"/>
  
  <!-- Middle branch: Material Q → Bulb B -->
  <line x1="160" y1="130" x2="240" y2="130" stroke="#1e293b" stroke-width="2"/>
  <circle cx="240" cy="130" r="4" fill="#1e293b"/>
  <line x1="240" y1="130" x2="240" y2="90" stroke="#1e293b" stroke-width="2"/>
  <rect x="230" y="85" width="20" height="30" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5" rx="2"/>
  <text x="240" y="105" text-anchor="middle" font-size="9" font-weight="bold" fill="#991b1b">Q</text>
  <text x="265" y="103" text-anchor="start" font-size="7" fill="#991b1b">insulator</text>
  <line x1="240" y1="85" x2="240" y2="65" stroke="#1e293b" stroke-width="2"/>
  <circle cx="240" cy="65" r="8" fill="#cbd5e1" stroke="#64748b" stroke-width="2"/>
  <text x="240" y="69" text-anchor="middle" font-size="8" font-weight="bold" fill="#1e293b">B</text>
  <text x="240" y="52" text-anchor="middle" font-size="7" fill="#991b1b">OFF</text>
  <line x1="240" y1="57" x2="240" y2="15" stroke="#1e293b" stroke-width="2"/>
  
  <!-- Bottom left: Material M → Bulb C -->
  <line x1="240" y1="130" x2="290" y2="130" stroke="#1e293b" stroke-width="2"/>
  <circle cx="290" cy="130" r="4" fill="#1e293b"/>
  <line x1="290" y1="130" x2="290" y2="170" stroke="#1e293b" stroke-width="2"/>
  <rect x="280" y="170" width="20" height="30" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5" rx="2"/>
  <text x="290" y="190" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e40af">M</text>
  <line x1="290" y1="200" x2="290" y2="220" stroke="#1e293b" stroke-width="2"/>
  <circle cx="290" cy="220" r="8" fill="#fef08a" stroke="#eab308" stroke-width="2"/>
  <text x="290" y="224" text-anchor="middle" font-size="8" font-weight="bold" fill="#854d0e">C</text>
  <line x1="290" y1="228" x2="290" y2="245" stroke="#1e293b" stroke-width="2"/>
  
  <!-- Bottom right: Material N → Bulb D -->
  <line x1="290" y1="130" x2="340" y2="130" stroke="#1e293b" stroke-width="2"/>
  <line x1="340" y1="130" x2="340" y2="170" stroke="#1e293b" stroke-width="2"/>
  <rect x="330" y="170" width="20" height="30" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5" rx="2"/>
  <text x="340" y="190" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e40af">N</text>
  <line x1="340" y1="200" x2="340" y2="220" stroke="#1e293b" stroke-width="2"/>
  <circle cx="340" cy="220" r="8" fill="#fef08a" stroke="#eab308" stroke-width="2"/>
  <text x="340" y="224" text-anchor="middle" font-size="8" font-weight="bold" fill="#854d0e">D</text>
  <line x1="340" y1="228" x2="340" y2="245" stroke="#1e293b" stroke-width="2"/>
  
  <!-- Return wires -->
  <line x1="160" y1="15" x2="240" y2="15" stroke="#1e293b" stroke-width="2"/>
  <line x1="290" y1="245" x2="340" y2="245" stroke="#1e293b" stroke-width="2"/>
  <line x1="340" y1="245" x2="340" y2="255" stroke="#1e293b" stroke-width="2"/>
  <line x1="340" y1="255" x2="30" y2="255" stroke="#1e293b" stroke-width="2"/>
  <line x1="30" y1="255" x2="30" y2="145" stroke="#1e293b" stroke-width="2"/>
  
  <!-- Results -->
  <rect x="10" y="265" width="380" height="14" fill="#dcfce7" stroke="#16a34a" stroke-width="1" rx="2"/>
  <text x="200" y="275" text-anchor="middle" font-size="9" fill="#15803d">✓ A, C, D light up (P, M, N are conductors)  ✗ B is OFF (Q is insulator)</text>
</svg>''')

# SCI952: Circuit with Q as insulator, bulb C fused
fix('SCI952', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="400" font-family="Arial,sans-serif">
  <text x="200" y="16" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e293b">Circuit: Material Q is Insulator, Bulb C Fused</text>
  
  <!-- Battery -->
  <rect x="30" y="130" width="30" height="15" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="2"/>
  <line x1="36" y1="137" x2="54" y2="137" stroke="#dc2626" stroke-width="2"/>
  <line x1="36" y1="145" x2="54" y2="145" stroke="#3b82f6" stroke-width="2"/>
  <text x="45" y="125" text-anchor="middle" font-size="9" fill="#475569">Battery</text>
  
  <!-- Switch -->
  <line x1="60" y1="137" x2="85" y2="137" stroke="#1e293b" stroke-width="2"/>
  <circle cx="85" cy="137" r="3" fill="#475569"/>
  <line x1="85" y1="137" x2="110" y2="130" stroke="#1e293b" stroke-width="2"/>
  <circle cx="110" cy="130" r="3" fill="#475569"/>
  <text x="95" y="120" text-anchor="middle" font-size="8" fill="#64748b">Switch</text>
  <text x="95" y="155" text-anchor="middle" font-size="8" fill="#16a34a">Closed</text>
  
  <!-- Wire to junction -->
  <line x1="110" y1="130" x2="160" y2="130" stroke="#1e293b" stroke-width="2"/>
  <circle cx="160" cy="130" r="4" fill="#1e293b"/>
  
  <!-- Top branch: Material P → Bulb A -->
  <line x1="160" y1="130" x2="160" y2="60" stroke="#1e293b" stroke-width="2"/>
  <rect x="150" y="55" width="20" height="30" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5" rx="2"/>
  <text x="160" y="75" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e40af">P</text>
  <line x1="160" y1="55" x2="160" y2="35" stroke="#1e293b" stroke-width="2"/>
  <circle cx="160" cy="35" r="8" fill="#cbd5e1" stroke="#64748b" stroke-width="2"/>
  <text x="160" y="39" text-anchor="middle" font-size="8" font-weight="bold" fill="#1e293b">A</text>
  <text x="160" y="24" text-anchor="middle" font-size="7" fill="#991b1b">OFF</text>
  <line x1="160" y1="27" x2="160" y2="15" stroke="#1e293b" stroke-width="2"/>
  
  <!-- Middle branch: Material Q → Bulb B -->
  <line x1="160" y1="130" x2="240" y2="130" stroke="#1e293b" stroke-width="2"/>
  <circle cx="240" cy="130" r="4" fill="#1e293b"/>
  <line x1="240" y1="130" x2="240" y2="90" stroke="#1e293b" stroke-width="2"/>
  <rect x="230" y="85" width="20" height="30" fill="#fee2e2" stroke="#ef4444" stroke-width="2" rx="2"/>
  <text x="240" y="105" text-anchor="middle" font-size="9" font-weight="bold" fill="#991b1b">Q</text>
  <text x="210" y="103" text-anchor="end" font-size="7" font-weight="bold" fill="#991b1b">INSULATOR</text>
  <line x1="240" y1="85" x2="240" y2="65" stroke="#1e293b" stroke-width="2"/>
  <circle cx="240" cy="65" r="8" fill="#cbd5e1" stroke="#64748b" stroke-width="2"/>
  <text x="240" y="69" text-anchor="middle" font-size="8" font-weight="bold" fill="#1e293b">B</text>
  <text x="240" y="52" text-anchor="middle" font-size="7" fill="#991b1b">OFF</text>
  <line x1="240" y1="57" x2="240" y2="15" stroke="#1e293b" stroke-width="2"/>
  
  <!-- Bottom left: Material M → Bulb C (FUSED) -->
  <line x1="240" y1="130" x2="290" y2="130" stroke="#1e293b" stroke-width="2"/>
  <circle cx="290" cy="130" r="4" fill="#1e293b"/>
  <line x1="290" y1="130" x2="290" y2="170" stroke="#1e293b" stroke-width="2"/>
  <rect x="280" y="170" width="20" height="30" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5" rx="2"/>
  <text x="290" y="190" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e40af">M</text>
  <line x1="290" y1="200" x2="290" y2="220" stroke="#1e293b" stroke-width="2"/>
  <circle cx="290" cy="220" r="8" fill="#1e1e1e" stroke="#dc2626" stroke-width="2"/>
  <text x="290" y="224" text-anchor="middle" font-size="8" font-weight="bold" fill="#fef2f2">C</text>
  <line x1="285" y1="215" x2="295" y2="225" stroke="#dc2626" stroke-width="2"/>
  <line x1="285" y1="225" x2="295" y2="215" stroke="#dc2626" stroke-width="2"/>
  <text x="290" y="238" text-anchor="middle" font-size="7" font-weight="bold" fill="#dc2626">FUSED</text>
  <line x1="290" y1="228" x2="290" y2="245" stroke="#1e293b" stroke-width="2"/>
  
  <!-- Bottom right: Material N → Bulb D -->
  <line x1="290" y1="130" x2="340" y2="130" stroke="#1e293b" stroke-width="2"/>
  <line x1="340" y1="130" x2="340" y2="170" stroke="#1e293b" stroke-width="2"/>
  <rect x="330" y="170" width="20" height="30" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5" rx="2"/>
  <text x="340" y="190" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e40af">N</text>
  <line x1="340" y1="200" x2="340" y2="220" stroke="#1e293b" stroke-width="2"/>
  <circle cx="340" cy="220" r="8" fill="#cbd5e1" stroke="#64748b" stroke-width="2"/>
  <text x="340" y="224" text-anchor="middle" font-size="8" font-weight="bold" fill="#1e293b">D</text>
  <text x="340" y="238" text-anchor="middle" font-size="7" fill="#991b1b">OFF</text>
  <line x1="340" y1="228" x2="340" y2="245" stroke="#1e293b" stroke-width="2"/>
  
  <!-- Return wires -->
  <line x1="160" y1="15" x2="240" y2="15" stroke="#1e293b" stroke-width="2"/>
  <line x1="290" y1="245" x2="340" y2="245" stroke="#1e293b" stroke-width="2"/>
  <line x1="340" y1="245" x2="340" y2="255" stroke="#1e293b" stroke-width="2"/>
  <line x1="340" y1="255" x2="30" y2="255" stroke="#1e293b" stroke-width="2"/>
  <line x1="30" y1="255" x2="30" y2="145" stroke="#1e293b" stroke-width="2"/>
  
  <!-- Explanation -->
  <rect x="10" y="262" width="380" height="17" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5" rx="2"/>
  <text x="200" y="272" text-anchor="middle" font-size="8" fill="#991b1b">Q blocks current (insulator) + C fused (open circuit)</text>
  <text x="200" y="282" text-anchor="middle" font-size="9" font-weight="bold" fill="#991b1b">Result: ALL bulbs A, B, C, D are OFF - no current flow!</text>
</svg>''')

# SCI953: Bar magnets W, X, Y, Z
fix('SCI953', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 280" width="380" font-family="Arial,sans-serif">
  <text x="190" y="16" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e293b">Magnetic Interactions: Bars W, X, Y, Z</text>
  
  <!-- Test 1: W and X repel -->
  <rect x="10" y="30" width="170" height="70" fill="#f8fafc" stroke="#64748b" stroke-width="1.5" rx="4"/>
  <text x="95" y="46" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Test 1: W and X</text>
  
  <rect x="25" y="55" width="50" height="20" fill="#ef4444" stroke="#991b1b" stroke-width="1.5" rx="2"/>
  <text x="35" y="68" text-anchor="start" font-size="10" fill="#fef2f2">W</text>
  <text x="65" y="68" text-anchor="end" font-size="8" fill="#fef2f2">N</text>
  
  <path d="M 80 65 L 95 65 M 90 60 L 95 65 L 90 70" stroke="#dc2626" stroke-width="2" fill="none"/>
  <text x="87" y="58" text-anchor="middle" font-size="9" fill="#dc2626">repel</text>
  
  <rect x="105" y="55" width="50" height="20" fill="#3b82f6" stroke="#1e40af" stroke-width="1.5" rx="2"/>
  <text x="115" y="68" text-anchor="start" font-size="8" fill="#dbeafe">S</text>
  <text x="145" y="68" text-anchor="end" font-size="10" fill="#dbeafe">X</text>
  
  <text x="95" y="93" text-anchor="middle" font-size="8" fill="#991b1b">Both are MAGNETS</text>
  
  <!-- Test 2: Y and Z attract -->
  <rect x="200" y="30" width="170" height="70" fill="#f8fafc" stroke="#64748b" stroke-width="1.5" rx="4"/>
  <text x="285" y="46" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Test 2: Y and Z</text>
  
  <rect x="215" y="55" width="50" height="20" fill="#64748b" stroke="#475569" stroke-width="1.5" rx="2"/>
  <text x="225" y="68" text-anchor="start" font-size="10" fill="#f1f5f9">Y</text>
  
  <path d="M 270 65 L 285 65 M 280 60 L 285 65 L 280 70 M 275 60 L 270 65 L 275 70" stroke="#16a34a" stroke-width="2" fill="none"/>
  <text x="277" y="58" text-anchor="middle" font-size="9" fill="#16a34a">attract</text>
  
  <rect x="295" y="55" width="50" height="20" fill="#ef4444" stroke="#991b1b" stroke-width="1.5" rx="2"/>
  <text x="305" y="68" text-anchor="start" font-size="8" fill="#fef2f2">N</text>
  <text x="335" y="68" text-anchor="end" font-size="10" fill="#fef2f2">Z</text>
  
  <text x="285" y="93" text-anchor="middle" font-size="8" fill="#15803d">Z is MAGNET, Y is IRON</text>
  
  <!-- Analysis table -->
  <text x="190" y="120" text-anchor="middle" font-size="11" font-weight="bold" fill="#0369a1">Analysis of Materials</text>
  
  <rect x="20" y="128" width="340" height="100" fill="white" stroke="#94a3b8" stroke-width="1.5"/>
  
  <!-- Headers -->
  <rect x="20" y="128" width="85" height="25" fill="#e0f2fe" stroke="#94a3b8" stroke-width="1"/>
  <rect x="105" y="128" width="85" height="25" fill="#e0f2fe" stroke="#94a3b8" stroke-width="1"/>
  <rect x="190" y="128" width="85" height="25" fill="#e0f2fe" stroke="#94a3b8" stroke-width="1"/>
  <rect x="275" y="128" width="85" height="25" fill="#e0f2fe" stroke="#94a3b8" stroke-width="1"/>
  
  <text x="62" y="143" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e40af">W</text>
  <text x="147" y="143" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e40af">X</text>
  <text x="232" y="143" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e40af">Y</text>
  <text x="317" y="143" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e40af">Z</text>
  
  <!-- Option rows -->
  <text x="30" y="168" text-anchor="start" font-size="9" fill="#64748b">(1)</text>
  <text x="62" y="168" text-anchor="middle" font-size="9" fill="#64748b">aluminium</text>
  <text x="147" y="168" text-anchor="middle" font-size="9" fill="#64748b">magnet</text>
  <text x="232" y="168" text-anchor="middle" font-size="9" fill="#64748b">magnet</text>
  <text x="317" y="168" text-anchor="middle" font-size="9" fill="#64748b">iron</text>
  
  <text x="30" y="186" text-anchor="start" font-size="9" fill="#64748b">(2)</text>
  <text x="62" y="186" text-anchor="middle" font-size="9" fill="#64748b">iron</text>
  <text x="147" y="186" text-anchor="middle" font-size="9" fill="#64748b">aluminium</text>
  <text x="232" y="186" text-anchor="middle" font-size="9" fill="#64748b">magnet</text>
  <text x="317" y="186" text-anchor="middle" font-size="9" fill="#64748b">magnet</text>
  
  <text x="30" y="204" text-anchor="start" font-size="9" fill="#64748b">(3)</text>
  <text x="62" y="204" text-anchor="middle" font-size="9" fill="#64748b">magnet</text>
  <text x="147" y="204" text-anchor="middle" font-size="9" fill="#64748b">iron</text>
  <text x="232" y="204" text-anchor="middle" font-size="9" fill="#64748b">aluminium</text>
  <text x="317" y="204" text-anchor="middle" font-size="9" fill="#64748b">magnet</text>
  
  <!-- Correct answer (4) -->
  <rect x="20" y="211" width="340" height="17" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
  <text x="30" y="223" text-anchor="start" font-size="9" font-weight="bold" fill="#15803d">(4) ✓</text>
  <text x="62" y="223" text-anchor="middle" font-size="9" font-weight="bold" fill="#15803d">magnet</text>
  <text x="147" y="223" text-anchor="middle" font-size="9" font-weight="bold" fill="#15803d">magnet</text>
  <text x="232" y="223" text-anchor="middle" font-size="9" font-weight="bold" fill="#15803d">iron</text>
  <text x="317" y="223" text-anchor="middle" font-size="9" font-weight="bold" fill="#15803d">aluminium</text>
  
  <!-- Explanation -->
  <rect x="20" y="240" width="340" height="35" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5" rx="4"/>
  <text x="190" y="252" text-anchor="middle" font-size="8" fill="#92400e">W and X REPEL → both must be MAGNETS</text>
  <text x="190" y="263" text-anchor="middle" font-size="8" fill="#92400e">Y and Z ATTRACT → Z is MAGNET, Y is IRON (magnetic material)</text>
  <text x="190" y="274" text-anchor="middle" font-size="8" fill="#92400e">Only option (4) has W=magnet, X=magnet, Y=iron</text>
</svg>''')

# SCI954: Blocks X and Y on planks (friction and gravity)
fix('SCI954', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 260" width="380" font-family="Arial,sans-serif">
  <text x="190" y="16" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e293b">Blocks on Planks: Gravity and Friction</text>
  
  <!-- Block X on horizontal plank -->
  <text x="90" y="38" text-anchor="middle" font-size="11" font-weight="bold" fill="#0369a1">Block X (Horizontal)</text>
  <line x1="20" y1="100" x2="160" y2="100" stroke="#78716c" stroke-width="4"/>
  <rect x="70" y="75" width="40" height="25" fill="#3b82f6" stroke="#1e40af" stroke-width="2" rx="2"/>
  <text x="90" y="92" text-anchor="middle" font-size="12" font-weight="bold" fill="#dbeafe">X</text>
  
  <!-- Gravity on X -->
  <line x1="90" y1="100" x2="90" y2="125" stroke="#dc2626" stroke-width="2"/>
  <polygon points="85,123 90,130 95,123" fill="#dc2626"/>
  <text x="90" y="142" text-anchor="middle" font-size="9" fill="#991b1b">Gravity</text>
  
  <!-- Normal force on X -->
  <line x1="90" y1="75" x2="90" y2="50" stroke="#16a34a" stroke-width="2"/>
  <polygon points="85,52 90,45 95,52" fill="#16a34a"/>
  <text x="90" y="42" text-anchor="middle" font-size="9" fill="#15803d">Normal force</text>
  
  <!-- Block Y on tilted plank -->
  <text x="290" y="38" text-anchor="middle" font-size="11" font-weight="bold" fill="#0369a1">Block Y (Tilted)</text>
  <line x1="210" y1="100" x2="350" y2="140" stroke="#78716c" stroke-width="4"/>
  <g transform="translate(270, 110) rotate(15)">
    <rect x="-20" y="-12.5" width="40" height="25" fill="#3b82f6" stroke="#1e40af" stroke-width="2" rx="2"/>
    <text x="0" y="5" text-anchor="middle" font-size="12" font-weight="bold" fill="#dbeafe">Y</text>
  </g>
  
  <!-- Gravity on Y -->
  <line x1="270" y1="115" x2="270" y2="155" stroke="#dc2626" stroke-width="2"/>
  <polygon points="265,153 270,160 275,153" fill="#dc2626"/>
  <text x="295" y="140" text-anchor="start" font-size="9" fill="#991b1b">Gravity</text>
  
  <!-- Friction on Y -->
  <line x1="270" y1="115" x2="245" y2="110" stroke="#f59e0b" stroke-width="2"/>
  <polygon points="247,108 240,108 245,113" fill="#f59e0b"/>
  <text x="240" y="102" text-anchor="end" font-size="9" fill="#92400e">Friction</text>
  <text x="240" y="112" text-anchor="end" font-size="8" fill="#92400e">(prevents sliding)</text>
  
  <!-- Statements -->
  <text x="190" y="180" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e293b">Which statements are TRUE?</text>
  
  <rect x="20" y="190" width="340" height="65" fill="white" stroke="#94a3b8" stroke-width="1.5" rx="4"/>
  
  <!-- Statement A -->
  <rect x="30" y="198" width="320" height="17" fill="#fee2e2" stroke="#ef4444" stroke-width="1"/>
  <text x="40" y="209" text-anchor="start" font-size="9" font-weight="bold" fill="#991b1b">A:</text>
  <text x="55" y="209" text-anchor="start" font-size="9" fill="#1e293b">Gravitational force was acting on block X only.</text>
  <text x="340" y="209" text-anchor="end" font-size="9" font-weight="bold" fill="#991b1b">✗ FALSE</text>
  
  <!-- Statement B -->
  <rect x="30" y="215" width="320" height="17" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
  <text x="40" y="226" text-anchor="start" font-size="9" font-weight="bold" fill="#15803d">B:</text>
  <text x="55" y="226" text-anchor="start" font-size="9" fill="#1e293b">Gravitational force was acting on blocks X and Y.</text>
  <text x="340" y="226" text-anchor="end" font-size="9" font-weight="bold" fill="#15803d">✓ TRUE</text>
  
  <!-- Statement C -->
  <rect x="30" y="232" width="320" height="17" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
  <text x="40" y="243" text-anchor="start" font-size="9" font-weight="bold" fill="#15803d">C:</text>
  <text x="55" y="243" text-anchor="start" font-size="9" fill="#1e293b">There was frictional force between surfaces of block Y and the plank.</text>
  <text x="340" y="243" text-anchor="end" font-size="9" font-weight="bold" fill="#15803d">✓ TRUE</text>
  
  <text x="190" y="268" text-anchor="middle" font-size="10" font-weight="bold" fill="#0369a1">Answer: B and C only</text>
</svg>''')

# SCI955: Balls dropping into flour (table of depths)
fix('SCI955', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" font-family="Arial,sans-serif">
  <text x="200" y="16" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e293b">Balls Dropped into Flour from Same Height</text>
  
  <!-- Experimental setup -->
  <line x1="20" y1="50" x2="380" y2="50" stroke="#64748b" stroke-width="1" stroke-dasharray="3,3"/>
  <text x="30" y="45" font-size="9" fill="#64748b">Same height</text>
  
  <!-- Ball X -->
  <circle cx="80" cy="50" r="8" fill="#3b82f6" stroke="#1e40af" stroke-width="2"/>
  <text x="80" y="54" text-anchor="middle" font-size="10" font-weight="bold" fill="#dbeafe">X</text>
  <line x1="80" y1="58" x2="80" y2="85" stroke="#64748b" stroke-width="1" stroke-dasharray="2,2"/>
  <polygon points="75,83 80,90 85,83" fill="#64748b"/>
  
  <!-- Ball Y -->
  <circle cx="200" cy="50" r="8" fill="#16a34a" stroke="#15803d" stroke-width="2"/>
  <text x="200" y="54" text-anchor="middle" font-size="10" font-weight="bold" fill="#dcfce7">Y</text>
  <line x1="200" y1="58" x2="200" y2="85" stroke="#64748b" stroke-width="1" stroke-dasharray="2,2"/>
  <polygon points="195,83 200,90 205,83" fill="#64748b"/>
  
  <!-- Ball Z -->
  <circle cx="320" cy="50" r="8" fill="#f59e0b" stroke="#d97706" stroke-width="2"/>
  <text x="320" y="54" text-anchor="middle" font-size="10" font-weight="bold" fill="#fef3c7">Z</text>
  <line x1="320" y1="58" x2="320" y2="85" stroke="#64748b" stroke-width="1" stroke-dasharray="2,2"/>
  <polygon points="315,83 320,90 325,83" fill="#64748b"/>
  
  <!-- Flour tray -->
  <rect x="20" y="95" width="360" height="45" fill="#fef3c7" stroke="#92400e" stroke-width="2"/>
  <text x="200" y="120" text-anchor="middle" font-size="10" fill="#78716c">Flour</text>
  
  <!-- Depression X -->
  <path d="M 65 95 Q 80 116 95 95" fill="#e7e5e4" stroke="#78716c" stroke-width="1.5"/>
  <text x="80" y="112" text-anchor="middle" font-size="8" fill="#0369a1">3.3cm</text>
  
  <!-- Depression Y (shallowest) -->
  <path d="M 188 95 Q 200 101 212 95" fill="#f5f5f4" stroke="#78716c" stroke-width="1.5"/>
  <text x="200" y="100" text-anchor="middle" font-size="8" fill="#15803d">1.5cm</text>
  
  <!-- Depression Z (deepest) -->
  <path d="M 305 95 Q 320 120 335 95" fill="#d6d3d1" stroke="#78716c" stroke-width="1.5"/>
  <text x="320" y="116" text-anchor="middle" font-size="8" fill="#ea580c">3.8cm</text>
  
  <!-- Data table -->
  <text x="200" y="160" text-anchor="middle" font-size="11" font-weight="bold" fill="#0369a1">Depth of Depression (cm)</text>
  
  <rect x="60" y="168" width="280" height="90" fill="white" stroke="#94a3b8" stroke-width="1.5"/>
  
  <!-- Headers -->
  <rect x="60" y="168" width="70" height="22" fill="#e0f2fe" stroke="#94a3b8" stroke-width="1"/>
  <rect x="130" y="168" width="52.5" height="22" fill="#e0f2fe" stroke="#94a3b8" stroke-width="1"/>
  <rect x="182.5" y="168" width="52.5" height="22" fill="#e0f2fe" stroke="#94a3b8" stroke-width="1"/>
  <rect x="235" y="168" width="52.5" height="22" fill="#e0f2fe" stroke="#94a3b8" stroke-width="1"/>
  <rect x="287.5" y="168" width="52.5" height="22" fill="#e0f2fe" stroke="#94a3b8" stroke-width="1"/>
  
  <text x="95" y="183" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e40af">Ball</text>
  <text x="156" y="183" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e40af">1st</text>
  <text x="209" y="183" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e40af">2nd</text>
  <text x="261" y="183" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e40af">3rd</text>
  <text x="314" y="183" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e40af">average</text>
  
  <!-- Ball X data -->
  <rect x="60" y="190" width="70" height="22" fill="#dbeafe" stroke="#94a3b8" stroke-width="1"/>
  <text x="95" y="205" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e40af">X</text>
  <text x="156" y="205" text-anchor="middle" font-size="9" fill="#475569">3</text>
  <text x="209" y="205" text-anchor="middle" font-size="9" fill="#475569">3.5</text>
  <text x="261" y="205" text-anchor="middle" font-size="9" fill="#475569">3.5</text>
  <text x="314" y="205" text-anchor="middle" font-size="9" font-weight="bold" fill="#0369a1">3.3</text>
  
  <!-- Ball Y data -->
  <rect x="60" y="212" width="70" height="22" fill="#dcfce7" stroke="#94a3b8" stroke-width="1"/>
  <text x="95" y="227" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">Y</text>
  <text x="156" y="227" text-anchor="middle" font-size="9" fill="#475569">1</text>
  <text x="209" y="227" text-anchor="middle" font-size="9" fill="#475569">2</text>
  <text x="261" y="227" text-anchor="middle" font-size="9" fill="#475569">1.5</text>
  <text x="314" y="227" text-anchor="middle" font-size="9" font-weight="bold" fill="#15803d">1.5</text>
  
  <!-- Ball Z data (highlighted) -->
  <rect x="60" y="234" width="70" height="22" fill="#fed7aa" stroke="#f59e0b" stroke-width="2"/>
  <text x="95" y="249" text-anchor="middle" font-size="10" font-weight="bold" fill="#92400e">Z</text>
  <rect x="130" y="234" width="52.5" height="22" fill="#fef3c7" stroke="#94a3b8" stroke-width="1"/>
  <text x="156" y="249" text-anchor="middle" font-size="9" fill="#475569">4</text>
  <rect x="182.5" y="234" width="52.5" height="22" fill="#fef3c7" stroke="#94a3b8" stroke-width="1"/>
  <text x="209" y="249" text-anchor="middle" font-size="9" fill="#475569">3.5</text>
  <rect x="235" y="234" width="52.5" height="22" fill="#fef3c7" stroke="#94a3b8" stroke-width="1"/>
  <text x="261" y="249" text-anchor="middle" font-size="9" fill="#475569">4</text>
  <rect x="287.5" y="234" width="52.5" height="22" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <text x="314" y="249" text-anchor="middle" font-size="9" font-weight="bold" fill="#92400e">3.8</text>
  
  <!-- Conclusion -->
  <rect x="60" y="270" width="280" height="25" fill="#dcfce7" stroke="#16a34a" stroke-width="2" rx="4"/>
  <text x="200" y="283" text-anchor="middle" font-size="9" fill="#15803d">Deepest depression → Greatest mass:</text>
  <text x="200" y="294" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">Ball Z had the GREATEST MASS</text>
</svg>''')

# SCI956: Torch shining on objects P, Q, R (shadow sizes)
fix('SCI956', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="400" font-family="Arial,sans-serif">
  <text x="200" y="16" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e293b">Shadow Formation: Objects P, Q, R</text>
  
  <!-- Torch/Light source -->
  <rect x="20" y="110" width="30" height="40" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="4"/>
  <polygon points="50,115 65,125 65,135 50,145" fill="#fde047" stroke="#eab308" stroke-width="1.5"/>
  <text x="35" y="175" text-anchor="middle" font-size="9" fill="#92400e">Torch</text>
  
  <!-- Light rays -->
  <line x1="65" y1="125" x2="200" y2="80" stroke="#fde047" stroke-width="1.5" opacity="0.6"/>
  <line x1="65" y1="130" x2="250" y2="115" stroke="#fde047" stroke-width="1.5" opacity="0.6"/>
  <line x1="65" y1="135" x2="200" y2="160" stroke="#fde047" stroke-width="1.5" opacity="0.6"/>
  
  <!-- Object P (closest - square) -->
  <rect x="95" y="115" width="20" height="20" fill="#3b82f6" stroke="#1e40af" stroke-width="2"/>
  <text x="105" y="128" text-anchor="middle" font-size="10" font-weight="bold" fill="#dbeafe">P</text>
  <text x="105" y="150" text-anchor="middle" font-size="8" fill="#0369a1">Square</text>
  <text x="105" y="160" text-anchor="middle" font-size="7" fill="#64748b">(closest)</text>
  
  <!-- Object Q (middle - star) -->
  <g transform="translate(170, 125)">
    <polygon points="0,-8 2,-2 8,-2 3,2 5,8 0,4 -5,8 -3,2 -8,-2 -2,-2" fill="#16a34a" stroke="#15803d" stroke-width="2"/>
    <text x="0" y="3" text-anchor="middle" font-size="8" font-weight="bold" fill="#dcfce7">Q</text>
  </g>
  <text x="170" y="150" text-anchor="middle" font-size="8" fill="#15803d">Star</text>
  <text x="170" y="160" text-anchor="middle" font-size="7" fill="#64748b">(middle)</text>
  
  <!-- Object R (farthest - circle) -->
  <circle cx="240" cy="125" r="10" fill="#f59e0b" stroke="#d97706" stroke-width="2"/>
  <text x="240" y="129" text-anchor="middle" font-size="8" font-weight="bold" fill="#fef3c7">R</text>
  <text x="240" y="150" text-anchor="middle" font-size="8" fill="#92400e">Circle</text>
  <text x="240" y="160" text-anchor="middle" font-size="7" fill="#64748b">(farthest)</text>
  
  <!-- Screen -->
  <rect x="350" y="40" width="8" height="180" fill="#f1f5f9" stroke="#64748b" stroke-width="2"/>
  <text x="365" y="130" text-anchor="start" font-size="9" fill="#475569">Screen</text>
  
  <!-- Shadow P (largest - closest to light) -->
  <rect x="310" y="65" width="40" height="40" fill="#1e293b" opacity="0.7"/>
  <text x="330" y="85" text-anchor="middle" font-size="10" font-weight="bold" fill="#f1f5f9">P</text>
  <text x="290" y="88" text-anchor="end" font-size="7" fill="#0369a1">largest</text>
  
  <!-- Shadow Q (medium) -->
  <g transform="translate(330, 135)">
    <polygon points="0,-12 3,-3 12,-3 5,2 7,12 0,6 -7,12 -5,2 -12,-3 -3,-3" fill="#1e293b" opacity="0.7"/>
    <text x="0" y="2" text-anchor="middle" font-size="9" font-weight="bold" fill="#f1f5f9">Q</text>
  </g>
  <text x="290" y="138" text-anchor="end" font-size="7" fill="#15803d">medium</text>
  
  <!-- Shadow R (smallest - farthest from light) -->
  <circle cx="330" cy="190" r="15" fill="#1e293b" opacity="0.7"/>
  <text x="330" y="194" text-anchor="middle" font-size="9" font-weight="bold" fill="#f1f5f9">R</text>
  <text x="290" y="193" text-anchor="end" font-size="7" fill="#92400e">smallest</text>
  
  <!-- Rule -->
  <rect x="20" y="190" width="280" height="85" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" rx="6"/>
  <text x="160" y="207" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">Shadow Size Rule</text>
  <text x="160" y="225" text-anchor="middle" font-size="9" fill="#475569">The CLOSER an object is to the light source,</text>
  <text x="160" y="238" text-anchor="middle" font-size="9" fill="#475569">the LARGER its shadow on the screen.</text>
  
  <text x="160" y="256" text-anchor="middle" font-size="9" font-weight="bold" fill="#0369a1">Distance from torch: P &lt; Q &lt; R</text>
  <text x="160" y="270" text-anchor="middle" font-size="9" font-weight="bold" fill="#0369a1">Shadow size: P &gt; Q &gt; R</text>
</svg>''')

# SCI957: Nut and bolt (thermal expansion)
fix('SCI957', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 270" width="380" font-family="Arial,sans-serif">
  <text x="190" y="16" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e293b">Removing a Tight Steel Nut from Steel Bolt</text>
  
  <!-- Problem: Tight nut -->
  <text x="95" y="38" text-anchor="middle" font-size="11" font-weight="bold" fill="#991b1b">PROBLEM</text>
  <rect x="50" y="50" width="90" height="80" fill="#fee2e2" stroke="#ef4444" stroke-width="2" rx="4"/>
  
  <!-- Bolt -->
  <rect x="75" y="70" width="40" height="6" fill="#64748b" stroke="#475569" stroke-width="1"/>
  <rect x="75" y="76" width="10" height="35" fill="#78716c" stroke="#57534e" stroke-width="1"/>
  <rect x="105" y="76" width="10" height="35" fill="#78716c" stroke="#57534e" stroke-width="1"/>
  
  <!-- Tight nut -->
  <path d="M 85 80 L 80 85 L 80 100 L 85 105 L 105 105 L 110 100 L 110 85 L 105 80 Z" fill="#94a3b8" stroke="#475569" stroke-width="1.5"/>
  <text x="95" y="95" text-anchor="middle" font-size="8" fill="#1e293b">NUT</text>
  
  <!-- Arrows showing stuck -->
  <path d="M 70 92 L 60 92 M 65 88 L 60 92 L 65 96" stroke="#dc2626" stroke-width="2" fill="none"/>
  <path d="M 120 92 L 130 92 M 125 88 L 130 92 L 125 96" stroke="#dc2626" stroke-width="2" fill="none"/>
  <text x="95" y="125" text-anchor="middle" font-size="8" fill="#991b1b">Too tight!</text>
  
  <!-- Solution: Heat the nut -->
  <text x="285" y="38" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">SOLUTION ✓</text>
  <rect x="240" y="50" width="90" height="80" fill="#dcfce7" stroke="#16a34a" stroke-width="2" rx="4"/>
  
  <!-- Heat source -->
  <g transform="translate(220, 80)">
    <path d="M 0,-8 Q -2,-3 0,0 Q 2,-3 0,-8" fill="#ef4444"/>
    <path d="M -4,-6 Q -5,-2 -3,2 Q -1,0 -4,-6" fill="#f97316"/>
    <path d="M 4,-6 Q 5,-2 3,2 Q 1,0 4,-6" fill="#f97316"/>
  </g>
  <text x="220" y="100" text-anchor="end" font-size="8" fill="#dc2626">Heat</text>
  
  <!-- Bolt -->
  <rect x="265" y="70" width="40" height="6" fill="#64748b" stroke="#475569" stroke-width="1"/>
  <rect x="265" y="76" width="10" height="35" fill="#78716c" stroke="#57534e" stroke-width="1"/>
  <rect x="295" y="76" width="10" height="35" fill="#78716c" stroke="#57534e" stroke-width="1"/>
  
  <!-- Expanded nut (larger) -->
  <path d="M 275 78 L 268 84 L 268 101 L 275 107 L 295 107 L 302 101 L 302 84 L 295 78 Z" fill="#fca5a5" stroke="#dc2626" stroke-width="1.5"/>
  <text x="285" y="95" text-anchor="middle" font-size="8" fill="#450a0a">NUT</text>
  <text x="285" y="103" text-anchor="middle" font-size="7" fill="#450a0a">expanded</text>
  
  <!-- Arrows showing expansion -->
  <line x1="268" y1="92" x2="258" y2="92" stroke="#f59e0b" stroke-width="1.5"/>
  <polygon points="260,90 256,92 260,94" fill="#f59e0b"/>
  <line x1="302" y1="92" x2="312" y2="92" stroke="#f59e0b" stroke-width="1.5"/>
  <polygon points="310,90 314,92 310,94" fill="#f59e0b"/>
  
  <text x="285" y="125" text-anchor="middle" font-size="8" fill="#15803d">Can remove!</text>
  
  <!-- Explanation -->
  <rect x="20" y="145" width="340" height="120" fill="#f8fafc" stroke="#64748b" stroke-width="1.5" rx="6"/>
  <text x="190" y="162" text-anchor="middle" font-size="11" font-weight="bold" fill="#0369a1">Thermal Expansion Principle</text>
  
  <text x="190" y="180" text-anchor="middle" font-size="9" fill="#475569">When heated, materials EXPAND (get bigger)</text>
  
  <!-- Step by step -->
  <rect x="35" y="190" width="310" height="18" fill="#fef3c7" stroke="#f59e0b" stroke-width="1"/>
  <text x="40" y="202" text-anchor="start" font-size="8" fill="#92400e">1. Heat the NUT only</text>
  <text x="340" y="202" text-anchor="end" font-size="8" fill="#92400e">→ Nut expands</text>
  
  <rect x="35" y="208" width="310" height="18" fill="#dbeafe" stroke="#3b82f6" stroke-width="1"/>
  <text x="40" y="220" text-anchor="start" font-size="8" fill="#1e40af">2. Bolt stays cool</text>
  <text x="340" y="220" text-anchor="end" font-size="8" fill="#1e40af">→ Bolt doesn't expand</text>
  
  <rect x="35" y="226" width="310" height="18" fill="#dcfce7" stroke="#16a34a" stroke-width="1"/>
  <text x="40" y="238" text-anchor="start" font-size="8" fill="#15803d">3. Nut becomes LARGER</text>
  <text x="340" y="238" text-anchor="end" font-size="8" fill="#15803d">→ Easy to remove</text>
  
  <text x="190" y="257" text-anchor="middle" font-size="9" font-weight="bold" fill="#dc2626">Wrong: Heat bolt, cool nut, or heat both equally</text>
</svg>''')

# SCI958: Bungee jump stages (4 sequential diagrams)
fix('SCI958', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" font-family="Arial,sans-serif">
  <text x="200" y="16" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e293b">Bungee Jump: Energy at Different Stages</text>
  <text x="200" y="30" text-anchor="middle" font-size="9" fill="#64748b">Cord unstretched length: 20m | Maximum fall: 40m</text>
  
  <!-- Platform -->
  <line x1="10" y1="50" x2="390" y2="50" stroke="#475569" stroke-width="2"/>
  <rect x="10" y="48" width="380" height="4" fill="#64748b"/>
  <text x="20" y="45" font-size="8" fill="#475569">Platform (0m)</text>
  
  <!-- Reference lines -->
  <line x1="10" y1="110" x2="390" y2="110" stroke="#94a3b8" stroke-width="0.5" stroke-dasharray="2,2"/>
  <text x="20" y="108" font-size="7" fill="#64748b">20m (cord starts stretching)</text>
  
  <line x1="10" y1="230" x2="390" y2="230" stroke="#94a3b8" stroke-width="0.5" stroke-dasharray="2,2"/>
  <text x="20" y="228" font-size="7" fill="#64748b">40m (lowest point)</text>
  
  <!-- Stage 1: At platform -->
  <g transform="translate(50, 50)">
    <rect x="0" y="0" width="80" height="85" fill="#f8fafc" stroke="#3b82f6" stroke-width="2" rx="4"/>
    <text x="40" y="14" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e40af">Stage 1</text>
    <text x="40" y="26" text-anchor="middle" font-size="8" fill="#64748b">(0m)</text>
    
    <circle cx="40" cy="40" r="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="1"/>
    <line x1="40" y1="46" x2="40" y2="55" stroke="#f59e0b" stroke-width="1.5"/>
    <line x1="40" y1="55" x2="40" y2="60" stroke="#1e293b" stroke-width="1" stroke-dasharray="1,1"/>
    <text x="40" y="68" text-anchor="middle" font-size="7" fill="#64748b">cord not</text>
    <text x="40" y="76" text-anchor="middle" font-size="7" fill="#64748b">stretched</text>
  </g>
  
  <!-- Stage 2: Falling (15m) -->
  <g transform="translate(150, 50)">
    <rect x="0" y="0" width="80" height="85" fill="#f8fafc" stroke="#3b82f6" stroke-width="2" rx="4"/>
    <text x="40" y="14" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e40af">Stage 2</text>
    <text x="40" y="26" text-anchor="middle" font-size="8" fill="#64748b">(15m)</text>
    
    <line x1="40" y1="0" x2="40" y2="45" stroke="#1e293b" stroke-width="1" stroke-dasharray="1,1"/>
    <circle cx="40" cy="50" r="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="1"/>
    <line x1="40" y1="56" x2="40" y2="65" stroke="#f59e0b" stroke-width="1.5"/>
    <line x1="36" y1="63" x2="40" y2="70" stroke="#dc2626" stroke-width="1.5"/>
    <polygon points="38,68 40,73 42,68" fill="#dc2626"/>
    <text x="40" y="81" text-anchor="middle" font-size="7" fill="#64748b">cord not</text>
    <text x="40" y="89" text-anchor="middle" font-size="7" fill="#64748b">stretched yet</text>
  </g>
  
  <!-- Stage 3: Cord stretching (30m) - BOTH energies -->
  <g transform="translate(250, 50)">
    <rect x="0" y="0" width="80" height="125" fill="#dcfce7" stroke="#16a34a" stroke-width="3" rx="4"/>
    <text x="40" y="14" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">Stage 3 ✓</text>
    <text x="40" y="26" text-anchor="middle" font-size="8" fill="#64748b">(30m)</text>
    
    <path d="M 40 0 Q 32 45 40 90" stroke="#1e40af" stroke-width="1.5" fill="none"/>
    <text x="25" y="45" font-size="7" fill="#1e40af" transform="rotate(-10 25 45)">stretched</text>
    <circle cx="40" cy="95" r="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="1"/>
    <line x1="40" y1="101" x2="40" y2="110" stroke="#f59e0b" stroke-width="1.5"/>
    <line x1="36" y1="108" x2="40" y2="115" stroke="#dc2626" stroke-width="1.5"/>
    <polygon points="38,113 40,118 42,113" fill="#dc2626"/>
    <text x="40" y="128" text-anchor="middle" font-size="7" fill="#15803d">Moving ↓</text>
    <text x="40" y="137" text-anchor="middle" font-size="7" font-weight="bold" fill="#15803d">Kinetic ✓</text>
    <text x="40" y="146" text-anchor="middle" font-size="7" fill="#15803d">Cord stretched</text>
    <text x="40" y="155" text-anchor="middle" font-size="7" font-weight="bold" fill="#15803d">Elastic ✓</text>
    <text x="40" y="168" text-anchor="middle" font-size="8" font-weight="bold" fill="#0369a1">BOTH!</text>
  </g>
  
  <!-- Stage 4: Lowest point (40m) -->
  <g transform="translate(350, 50)">
    <rect x="0" y="0" width="40" height="125" fill="#f8fafc" stroke="#64748b" stroke-width="2" rx="4"/>
    <text x="20" y="14" text-anchor="middle" font-size="10" font-weight="bold" fill="#475569">Stage 4</text>
    <text x="20" y="26" text-anchor="middle" font-size="8" fill="#64748b">(40m)</text>
    
    <path d="M 20 0 Q 8 90 20 180" stroke="#1e40af" stroke-width="1.5" fill="none"/>
    <circle cx="20" cy="185" r="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="1"/>
    <line x1="20" y1="191" x2="20" y2="200" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="20" y="209" text-anchor="middle" font-size="7" fill="#991b1b">Stopped</text>
    <text x="20" y="218" text-anchor="middle" font-size="7" fill="#64748b">No KE</text>
  </g>
  
  <!-- Energy summary -->
  <rect x="10" y="240" width="380" height="55" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" rx="6"/>
  <text x="200" y="254" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e40af">Energy Types Present</text>
  
  <text x="30" y="268" text-anchor="start" font-size="8" fill="#475569">Stage 1: Gravitational PE only</text>
  <text x="30" y="279" text-anchor="start" font-size="8" fill="#475569">Stage 2: GPE + Kinetic (falling, cord not stretched)</text>
  <text x="30" y="290" text-anchor="start" font-size="8" font-weight="bold" fill="#15803d">Stage 3: Kinetic (moving) + Elastic PE (cord stretched) ✓</text>
  <text x="210" y="268" text-anchor="start" font-size="8" fill="#475569">Stage 4: Elastic PE only (stopped)</text>
</svg>''')

with open('data/questions-science-p6.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("✓ Added diagrams to SCI946-SCI958 (13 questions)")
print("  - SCI946: Experiment setups (light effect on plants)")
print("  - SCI947: Flexibility test")
print("  - SCI948: Matter vs non-matter")
print("  - SCI949: Reusable bag properties")
print("  - SCI950: Hot water freezing")
print("  - SCI951: Circuit with materials P,Q,M,N")
print("  - SCI952: Circuit with fused bulb C")
print("  - SCI953: Magnetic bar interactions")
print("  - SCI954: Blocks on planks (gravity/friction)")
print("  - SCI955: Balls dropping into flour (table)")
print("  - SCI956: Shadow formation")
print("  - SCI957: Nut and bolt thermal expansion")
print("  - SCI958: Bungee jump energy stages")
