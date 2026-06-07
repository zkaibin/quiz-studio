import json

with open('data/questions-science-p6.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

idx = {q['id']: i for i, q in enumerate(data)}

def fix(qid, diagram):
    data[idx[qid]]['diagram'] = diagram

# SCI994: Two metal plates with different heat conductivity
fix('SCI994', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" width="400" font-family="Arial,sans-serif">
  <text x="200" y="20" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Heat Conduction Comparison</text>
  
  <!-- Plate A (better conductor) -->
  <rect x="40" y="50" width="120" height="80" fill="#cbd5e1" stroke="#64748b" stroke-width="2" rx="4"/>
  <text x="100" y="95" text-anchor="middle" font-size="16" font-weight="bold" fill="#1e293b">Plate A</text>
  <text x="100" y="115" text-anchor="middle" font-size="11" fill="#475569">Better Conductor</text>
  
  <!-- Hand touching Plate A -->
  <path d="M 80 50 L 70 35 L 65 30 Q 60 25 65 20 L 75 25 L 80 30 L 85 25 L 90 20 Q 95 25 90 30 L 85 35 Z" fill="#fbbf24" stroke="#f59e0b" stroke-width="1"/>
  
  <!-- Heat arrows going away (more) -->
  <path d="M 100 140 L 100 165" stroke="#ef4444" stroke-width="2" marker-end="url(#arrowRed)"/>
  <path d="M 75 145 L 65 165" stroke="#ef4444" stroke-width="2" marker-end="url(#arrowRed)"/>
  <path d="M 125 145 L 135 165" stroke="#ef4444" stroke-width="2" marker-end="url(#arrowRed)"/>
  <text x="100" y="185" text-anchor="middle" font-size="10" fill="#dc2626">Heat flows away</text>
  <text x="100" y="198" text-anchor="middle" font-size="10" fill="#dc2626">FASTER</text>
  <text x="100" y="215" text-anchor="middle" font-size="11" font-weight="bold" fill="#16a34a">Feels COLDER</text>
  
  <!-- Plate B (poorer conductor) -->
  <rect x="240" y="50" width="120" height="80" fill="#cbd5e1" stroke="#64748b" stroke-width="2" rx="4"/>
  <text x="300" y="95" text-anchor="middle" font-size="16" font-weight="bold" fill="#1e293b">Plate B</text>
  <text x="300" y="115" text-anchor="middle" font-size="11" fill="#475569">Poorer Conductor</text>
  
  <!-- Hand touching Plate B -->
  <path d="M 280 50 L 270 35 L 265 30 Q 260 25 265 20 L 275 25 L 280 30 L 285 25 L 290 20 Q 295 25 290 30 L 285 35 Z" fill="#fbbf24" stroke="#f59e0b" stroke-width="1"/>
  
  <!-- Heat arrows going away (less) -->
  <path d="M 300 140 L 300 160" stroke="#f59e0b" stroke-width="2" marker-end="url(#arrowOrange)"/>
  <text x="300" y="180" text-anchor="middle" font-size="10" fill="#ea580c">Heat flows away</text>
  <text x="300" y="193" text-anchor="middle" font-size="10" fill="#ea580c">SLOWER</text>
  <text x="300" y="210" text-anchor="middle" font-size="11" font-weight="bold" fill="#3b82f6">Feels WARMER</text>
  
  <!-- Note -->
  <text x="200" y="240" text-anchor="middle" font-size="10" fill="#64748b">Both at same temperature, but feel different!</text>
  
  <defs>
    <marker id="arrowRed" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#ef4444"/>
    </marker>
    <marker id="arrowOrange" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b"/>
    </marker>
  </defs>
</svg>''')

# SCI995: Lever system
fix('SCI995', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 200" width="380" font-family="Arial,sans-serif">
  <text x="190" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Lever System</text>
  
  <!-- Lever bar -->
  <rect x="30" y="85" width="320" height="12" fill="#94a3b8" stroke="#64748b" stroke-width="1.5" rx="2"/>
  
  <!-- Fulcrum (triangle) -->
  <path d="M 100 97 L 85 120 L 115 120 Z" fill="#64748b" stroke="#475569" stroke-width="2"/>
  <text x="100" y="138" text-anchor="middle" font-size="12" font-weight="bold" fill="#64748b">Fulcrum</text>
  
  <!-- Load (box on left) -->
  <rect x="35" y="55" width="45" height="30" fill="#ef4444" stroke="#dc2626" stroke-width="2" rx="2"/>
  <text x="57" y="73" text-anchor="middle" font-size="11" font-weight="bold" fill="white">Load</text>
  <text x="57" y="158" text-anchor="middle" font-size="10" fill="#dc2626">(Heavy)</text>
  
  <!-- Effort (arrow on right) -->
  <path d="M 320 50 L 320 78" stroke="#3b82f6" stroke-width="3" marker-end="url(#arrowBlue)"/>
  <text x="320" y="45" text-anchor="middle" font-size="11" font-weight="bold" fill="#3b82f6">Effort</text>
  <text x="320" y="158" text-anchor="middle" font-size="10" fill="#3b82f6">(Push down)</text>
  
  <!-- Distance labels -->
  <line x1="57" y1="105" x2="100" y2="105" stroke="#16a34a" stroke-width="1.5" stroke-dasharray="3,2"/>
  <text x="78" y="118" text-anchor="middle" font-size="9" fill="#16a34a">Short</text>
  
  <line x1="100" y1="105" x2="320" y2="105" stroke="#16a34a" stroke-width="1.5" stroke-dasharray="3,2"/>
  <text x="210" y="118" text-anchor="middle" font-size="9" fill="#16a34a">Long distance</text>
  
  <!-- Explanation -->
  <text x="190" y="180" text-anchor="middle" font-size="11" font-weight="bold" fill="#16a34a">Fulcrum closer to Load = Easier to lift!</text>
  <text x="190" y="195" text-anchor="middle" font-size="9" fill="#64748b">(Longer effort arm gives mechanical advantage)</text>
  
  <defs>
    <marker id="arrowBlue" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
    </marker>
  </defs>
</svg>''')

# SCI996: Temperature graph of water heating to boiling
fix('SCI996', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 260" width="380" font-family="Arial,sans-serif">
  <text x="190" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Heating Water Over Time</text>
  
  <!-- Axes -->
  <line x1="50" y1="40" x2="50" y2="200" stroke="#64748b" stroke-width="2"/>
  <line x1="50" y1="200" x2="350" y2="200" stroke="#64748b" stroke-width="2"/>
  
  <!-- Y-axis label -->
  <text x="25" y="120" text-anchor="middle" font-size="11" fill="#64748b" transform="rotate(-90,25,120)">Temperature (°C)</text>
  
  <!-- Y-axis values -->
  <text x="42" y="205" text-anchor="end" font-size="10" fill="#64748b">0</text>
  <text x="42" y="165" text-anchor="end" font-size="10" fill="#64748b">25</text>
  <text x="42" y="125" text-anchor="end" font-size="10" fill="#64748b">50</text>
  <text x="42" y="85" text-anchor="end" font-size="10" fill="#64748b">75</text>
  <text x="42" y="45" text-anchor="end" font-size="10" fill="#64748b">100</text>
  
  <!-- X-axis label -->
  <text x="200" y="225" text-anchor="middle" font-size="11" fill="#64748b">Time (minutes)</text>
  
  <!-- Graph line -->
  <path d="M 70 190 L 120 150 L 170 110 L 220 70 L 330 70" stroke="#3b82f6" stroke-width="3" fill="none"/>
  
  <!-- Points A, B, C, D -->
  <circle cx="70" cy="190" r="5" fill="#f59e0b" stroke="#ea580c" stroke-width="2"/>
  <text x="70" y="175" text-anchor="middle" font-size="12" font-weight="bold" fill="#ea580c">A</text>
  
  <circle cx="120" cy="150" r="5" fill="#f59e0b" stroke="#ea580c" stroke-width="2"/>
  <text x="120" y="135" text-anchor="middle" font-size="12" font-weight="bold" fill="#ea580c">B</text>
  
  <circle cx="220" cy="70" r="5" fill="#16a34a" stroke="#15803d" stroke-width="2"/>
  <text x="220" y="55" text-anchor="middle" font-size="12" font-weight="bold" fill="#15803d">C</text>
  <text x="220" y="32" text-anchor="middle" font-size="10" fill="#16a34a">Boiling starts</text>
  
  <circle cx="330" cy="70" r="5" fill="#f59e0b" stroke="#ea580c" stroke-width="2"/>
  <text x="330" y="55" text-anchor="middle" font-size="12" font-weight="bold" fill="#ea580c">D</text>
  
  <!-- 100°C line -->
  <line x1="50" y1="70" x2="220" y2="70" stroke="#16a34a" stroke-width="1" stroke-dasharray="4,2"/>
  <text x="145" y="65" text-anchor="middle" font-size="9" fill="#16a34a">100°C (Boiling Point)</text>
  
  <!-- Flat region highlight -->
  <rect x="218" y="65" width="115" height="10" fill="#86efac" opacity="0.3"/>
  <text x="275" y="95" text-anchor="middle" font-size="9" fill="#15803d">Temperature stays constant</text>
  <text x="275" y="107" text-anchor="middle" font-size="9" fill="#15803d">while water boils</text>
  
  <text x="190" y="250" text-anchor="middle" font-size="10" fill="#64748b">At point C, water reaches 100°C and starts boiling</text>
</svg>''')

# SCI997: Sugar dissolving in water
fix('SCI997', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 240" width="380" font-family="Arial,sans-serif">
  <text x="190" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Getting Sugar Back from Solution</text>
  
  <!-- Step 1: Sugar + Water -->
  <text x="75" y="45" text-anchor="middle" font-size="11" font-weight="bold" fill="#64748b">Step 1: Mix</text>
  <!-- Beaker -->
  <path d="M 30 60 L 30 140 Q 30 145 35 145 L 115 145 Q 120 145 120 140 L 120 60" stroke="#64748b" stroke-width="2" fill="none"/>
  <line x1="25" y1="60" x2="125" y2="60" stroke="#64748b" stroke-width="2"/>
  <!-- Water -->
  <rect x="32" y="100" width="86" height="43" fill="#bfdbfe" opacity="0.7"/>
  <!-- Sugar crystals -->
  <rect x="60" y="85" width="8" height="8" fill="white" stroke="#64748b" stroke-width="1"/>
  <rect x="72" y="82" width="8" height="8" fill="white" stroke="#64748b" stroke-width="1"/>
  <rect x="82" y="87" width="8" height="8" fill="white" stroke="#64748b" stroke-width="1"/>
  <text x="75" y="75" text-anchor="middle" font-size="9" fill="#64748b">Sugar</text>
  
  <!-- Arrow -->
  <path d="M 130 100 L 155 100" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrow1)"/>
  <text x="142" y="95" text-anchor="middle" font-size="9" fill="#3b82f6">Stir</text>
  
  <!-- Step 2: Dissolved -->
  <text x="215" y="45" text-anchor="middle" font-size="11" font-weight="bold" fill="#64748b">Step 2: Dissolved</text>
  <path d="M 170 60 L 170 140 Q 170 145 175 145 L 255 145 Q 260 145 260 140 L 260 60" stroke="#64748b" stroke-width="2" fill="none"/>
  <line x1="165" y1="60" x2="265" y2="60" stroke="#64748b" stroke-width="2"/>
  <!-- Solution -->
  <rect x="172" y="100" width="86" height="43" fill="#dbeafe" opacity="0.7"/>
  <text x="215" y="125" text-anchor="middle" font-size="9" fill="#3b82f6">Clear solution</text>
  <text x="215" y="137" text-anchor="middle" font-size="8" fill="#3b82f6">(sugar invisible)</text>
  
  <!-- Arrow down -->
  <path d="M 215 155 L 215 175" stroke="#16a34a" stroke-width="2" marker-end="url(#arrow2)"/>
  <text x="235" y="168" font-size="9" fill="#16a34a">Heat to</text>
  <text x="235" y="178" font-size="9" fill="#16a34a">evaporate</text>
  
  <!-- Step 3: Sugar recovered -->
  <text x="215" y="198" text-anchor="middle" font-size="11" font-weight="bold" fill="#16a34a">Step 3: Sugar Back!</text>
  <!-- Dish -->
  <ellipse cx="215" cy="225" rx="35" ry="8" fill="#cbd5e1" stroke="#64748b" stroke-width="2"/>
  <!-- Sugar crystals -->
  <rect x="195" y="218" width="7" height="7" fill="white" stroke="#64748b" stroke-width="1"/>
  <rect x="205" y="216" width="7" height="7" fill="white" stroke="#64748b" stroke-width="1"/>
  <rect x="215" y="219" width="7" height="7" fill="white" stroke="#64748b" stroke-width="1"/>
  <rect x="223" y="217" width="7" height="7" fill="white" stroke="#64748b" stroke-width="1"/>
  <text x="215" y="210" text-anchor="middle" font-size="8" fill="#64748b">Dry sugar</text>
  
  <!-- Heat waves -->
  <path d="M 290 120 Q 295 115 300 120 Q 305 125 310 120" stroke="#f59e0b" stroke-width="1.5" fill="none"/>
  <path d="M 295 135 Q 300 130 305 135 Q 310 140 315 135" stroke="#f59e0b" stroke-width="1.5" fill="none"/>
  <path d="M 300 150 Q 305 145 310 150 Q 315 155 320 150" stroke="#f59e0b" stroke-width="1.5" fill="none"/>
  <circle cx="320" cy="135" r="15" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <text x="320" y="140" text-anchor="middle" font-size="10" fill="#ea580c">Heat</text>
  
  <defs>
    <marker id="arrow1" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
      <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
    </marker>
    <marker id="arrow2" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
      <path d="M0,0 L0,6 L9,3 z" fill="#16a34a"/>
    </marker>
  </defs>
</svg>''')

# SCI998: Butterfly life cycle
fix('SCI998', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 280" width="380" font-family="Arial,sans-serif">
  <text x="190" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Butterfly Life Cycle</text>
  
  <!-- Circular arrows -->
  <path d="M 270 80 A 80 80 0 0 1 270 200" stroke="#94a3b8" stroke-width="2" fill="none" marker-end="url(#arrowGray)"/>
  <path d="M 270 200 A 80 80 0 0 1 110 200" stroke="#94a3b8" stroke-width="2" fill="none" marker-end="url(#arrowGray)"/>
  <path d="M 110 200 A 80 80 0 0 1 110 80" stroke="#94a3b8" stroke-width="2" fill="none" marker-end="url(#arrowGray)"/>
  <path d="M 110 80 A 80 80 0 0 1 270 80" stroke="#94a3b8" stroke-width="2" fill="none" marker-end="url(#arrowGray)"/>
  
  <!-- Stage 1: Egg (top) -->
  <ellipse cx="190" cy="55" rx="12" ry="16" fill="white" stroke="#64748b" stroke-width="2"/>
  <text x="190" y="42" text-anchor="middle" font-size="11" font-weight="bold" fill="#64748b">Egg</text>
  
  <!-- Stage 2: Larva/Caterpillar (left) -->
  <g transform="translate(50,140)">
    <ellipse cx="0" cy="0" rx="8" ry="10" fill="#16a34a" stroke="#15803d" stroke-width="1.5"/>
    <ellipse cx="12" cy="0" rx="8" ry="10" fill="#16a34a" stroke="#15803d" stroke-width="1.5"/>
    <ellipse cx="24" cy="0" rx="8" ry="10" fill="#16a34a" stroke="#15803d" stroke-width="1.5"/>
    <ellipse cx="36" cy="0" rx="9" ry="11" fill="#16a34a" stroke="#15803d" stroke-width="1.5"/>
    <circle cx="42" cy="-3" r="1.5" fill="#1e293b"/>
    <circle cx="42" cy="3" r="1.5" fill="#1e293b"/>
  </g>
  <text x="68" y="165" text-anchor="middle" font-size="11" font-weight="bold" fill="#16a34a">Larva</text>
  <text x="68" y="178" text-anchor="middle" font-size="9" fill="#16a34a">(Caterpillar)</text>
  
  <!-- Stage 3: Pupa (right) -->
  <g transform="translate(310,140)">
    <ellipse cx="0" cy="0" rx="10" ry="20" fill="#d97706" stroke="#92400e" stroke-width="2"/>
    <path d="M 0 -20 Q -5 -22 -3 -28" stroke="#92400e" stroke-width="1.5" fill="none"/>
    <line x1="-8" y1="-10" x2="-10" y2="-8" stroke="#92400e" stroke-width="1"/>
    <line x1="-8" y1="0" x2="-10" y2="0" stroke="#92400e" stroke-width="1"/>
    <line x1="-8" y1="10" x2="-10" y2="8" stroke="#92400e" stroke-width="1"/>
  </g>
  <text x="310" y="165" text-anchor="middle" font-size="11" font-weight="bold" fill="#d97706">Pupa</text>
  <text x="310" y="178" text-anchor="middle" font-size="9" fill="#d97706">(Chrysalis)</text>
  
  <!-- Stage 4: Adult (bottom) -->
  <g transform="translate(190,235)">
    <!-- Body -->
    <ellipse cx="0" cy="0" rx="3" ry="12" fill="#1e293b" stroke="#0f172a" stroke-width="1"/>
    <!-- Left wings -->
    <ellipse cx="-8" cy="-5" rx="12" ry="10" fill="#3b82f6" stroke="#1e40af" stroke-width="1.5"/>
    <ellipse cx="-8" cy="5" rx="10" ry="8" fill="#60a5fa" stroke="#1e40af" stroke-width="1.5"/>
    <!-- Right wings -->
    <ellipse cx="8" cy="-5" rx="12" ry="10" fill="#3b82f6" stroke="#1e40af" stroke-width="1.5"/>
    <ellipse cx="8" cy="5" rx="10" ry="8" fill="#60a5fa" stroke="#1e40af" stroke-width="1.5"/>
    <!-- Antennae -->
    <path d="M -1 -12 Q -3 -18 -2 -20" stroke="#0f172a" stroke-width="1" fill="none"/>
    <path d="M 1 -12 Q 3 -18 2 -20" stroke="#0f172a" stroke-width="1" fill="none"/>
  </g>
  <text x="190" y="265" text-anchor="middle" font-size="11" font-weight="bold" fill="#3b82f6">Adult</text>
  <text x="190" y="277" text-anchor="middle" font-size="9" fill="#3b82f6">(Butterfly)</text>
  
  <!-- Highlight complete metamorphosis -->
  <rect x="285" y="120" width="50" height="60" fill="none" stroke="#ef4444" stroke-width="3" stroke-dasharray="5,3" rx="8"/>
  <text x="310" y="195" text-anchor="middle" font-size="10" font-weight="bold" fill="#ef4444">Complete</text>
  <text x="310" y="207" text-anchor="middle" font-size="10" font-weight="bold" fill="#ef4444">Metamorphosis</text>
  
  <defs>
    <marker id="arrowGray" markerWidth="8" markerHeight="8" refX="4" refY="2.5" orient="auto">
      <path d="M0,0 L0,5 L6,2.5 z" fill="#94a3b8"/>
    </marker>
  </defs>
</svg>''')

# SCI999: Cactus adaptations
fix('SCI999', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 280" width="350" font-family="Arial,sans-serif">
  <text x="175" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Cactus Adaptations for Desert</text>
  
  <!-- Desert ground -->
  <rect x="0" y="220" width="350" height="60" fill="#fef3c7" stroke="#f59e0b" stroke-width="1"/>
  <text x="175" y="265" text-anchor="middle" font-size="10" fill="#d97706">Hot, Dry Desert Environment</text>
  
  <!-- Sun -->
  <circle cx="320" cy="50" r="20" fill="#fbbf24" stroke="#f59e0b" stroke-width="2"/>
  <line x1="320" y1="25" x2="320" y2="15" stroke="#f59e0b" stroke-width="2"/>
  <line x1="320" y1="75" x2="320" y2="85" stroke="#f59e0b" stroke-width="2"/>
  <line x1="295" y1="50" x2="285" y2="50" stroke="#f59e0b" stroke-width="2"/>
  <line x1="340" y1="30" x2="348" y2="22" stroke="#f59e0b" stroke-width="2"/>
  <line x1="340" y1="70" x2="348" y2="78" stroke="#f59e0b" stroke-width="2"/>
  
  <!-- Main cactus body -->
  <rect x="130" y="100" width="90" height="120" fill="#16a34a" stroke="#15803d" stroke-width="2" rx="45"/>
  
  <!-- Thick stem label -->
  <text x="175" y="155" text-anchor="middle" font-size="11" font-weight="bold" fill="white">Thick Stem</text>
  <text x="175" y="168" text-anchor="middle" font-size="9" fill="#dcfce7">Stores Water</text>
  
  <!-- Water droplets inside -->
  <circle cx="155" cy="130" r="4" fill="#3b82f6" opacity="0.7"/>
  <circle cx="170" cy="140" r="4" fill="#3b82f6" opacity="0.7"/>
  <circle cx="165" cy="180" r="4" fill="#3b82f6" opacity="0.7"/>
  <circle cx="185" cy="190" r="4" fill="#3b82f6" opacity="0.7"/>
  <circle cx="195" cy="150" r="4" fill="#3b82f6" opacity="0.7"/>
  
  <!-- Spines (modified leaves) -->
  <line x1="128" y1="110" x2="115" y2="105" stroke="#15803d" stroke-width="2"/>
  <line x1="128" y1="130" x2="115" y2="130" stroke="#15803d" stroke-width="2"/>
  <line x1="128" y1="150" x2="115" y2="153" stroke="#15803d" stroke-width="2"/>
  <line x1="128" y1="170" x2="115" y2="175" stroke="#15803d" stroke-width="2"/>
  <line x1="128" y1="190" x2="118" y2="197" stroke="#15803d" stroke-width="2"/>
  
  <line x1="222" y1="110" x2="235" y2="105" stroke="#15803d" stroke-width="2"/>
  <line x1="222" y1="130" x2="235" y2="130" stroke="#15803d" stroke-width="2"/>
  <line x1="222" y1="150" x2="235" y2="153" stroke="#15803d" stroke-width="2"/>
  <line x1="222" y1="170" x2="235" y2="175" stroke="#15803d" stroke-width="2"/>
  <line x1="222" y1="190" x2="232" y2="197" stroke="#15803d" stroke-width="2"/>
  
  <!-- Cactus arms -->
  <rect x="95" y="120" width="35" height="60" fill="#16a34a" stroke="#15803d" stroke-width="2" rx="17"/>
  <rect x="220" y="130" width="35" height="50" fill="#16a34a" stroke="#15803d" stroke-width="2" rx="17"/>
  
  <!-- Roots -->
  <line x1="150" y1="220" x2="140" y2="235" stroke="#92400e" stroke-width="2"/>
  <line x1="165" y1="220" x2="165" y2="240" stroke="#92400e" stroke-width="2"/>
  <line x1="185" y1="220" x2="185" y2="238" stroke="#92400e" stroke-width="2"/>
  <line x1="200" y1="220" x2="210" y2="237" stroke="#92400e" stroke-width="2"/>
  
  <!-- Annotation arrows and labels -->
  <path d="M 245 150 L 280 130" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#arrowB)"/>
  <text x="283" y="120" font-size="9" fill="#3b82f6">Spines (not leaves)</text>
  <text x="283" y="130" font-size="8" fill="#64748b">→ reduce water loss</text>
  
  <path d="M 105 160 L 70 160" stroke="#16a34a" stroke-width="1.5" marker-end="url(#arrowG)"/>
  <text x="20" y="160" font-size="9" fill="#16a34a" font-weight="bold">Water storage</text>
  <text x="20" y="170" font-size="8" fill="#64748b">in thick stem</text>
  
  <path d="M 175 245 L 175 255" stroke="#92400e" stroke-width="1.5" marker-end="url(#arrowBr)"/>
  <text x="175" y="275" text-anchor="middle" font-size="8" fill="#92400e">Wide shallow roots</text>
  
  <defs>
    <marker id="arrowB" markerWidth="8" markerHeight="8" refX="4" refY="2.5" orient="auto">
      <path d="M0,0 L0,5 L6,2.5 z" fill="#3b82f6"/>
    </marker>
    <marker id="arrowG" markerWidth="8" markerHeight="8" refX="4" refY="2.5" orient="auto">
      <path d="M0,0 L0,5 L6,2.5 z" fill="#16a34a"/>
    </marker>
    <marker id="arrowBr" markerWidth="8" markerHeight="8" refX="4" refY="2.5" orient="auto">
      <path d="M0,0 L0,5 L6,2.5 z" fill="#92400e"/>
    </marker>
  </defs>
</svg>''')

# SCI1000: Solar eclipse
fix('SCI1000', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Solar Eclipse</text>
  
  <!-- Space background -->
  <rect x="0" y="25" width="400" height="155" fill="#0f172a"/>
  
  <!-- Stars -->
  <circle cx="50" cy="40" r="1" fill="white"/>
  <circle cx="80" cy="55" r="1" fill="white"/>
  <circle cx="120" cy="45" r="1" fill="white"/>
  <circle cx="150" cy="65" r="1" fill="white"/>
  <circle cx="320" cy="50" r="1" fill="white"/>
  <circle cx="350" cy="70" r="1" fill="white"/>
  <circle cx="370" cy="45" r="1" fill="white"/>
  
  <!-- Sun (left) -->
  <circle cx="80" cy="100" r="25" fill="#fbbf24" stroke="#f59e0b" stroke-width="2"/>
  <text x="80" y="145" text-anchor="middle" font-size="11" font-weight="bold" fill="#fbbf24">Sun</text>
  
  <!-- Light rays -->
  <line x1="105" y1="100" x2="158" y2="100" stroke="#fef3c7" stroke-width="2" opacity="0.6"/>
  <line x1="102" y1="85" x2="160" y2="85" stroke="#fef3c7" stroke-width="1.5" opacity="0.5"/>
  <line x1="102" y1="115" x2="160" y2="115" stroke="#fef3c7" stroke-width="1.5" opacity="0.5"/>
  
  <!-- Moon (middle) -->
  <circle cx="200" cy="100" r="18" fill="#64748b" stroke="#475569" stroke-width="2"/>
  <text x="200" y="145" text-anchor="middle" font-size="11" font-weight="bold" fill="#94a3b8">Moon</text>
  
  <!-- Shadow cone -->
  <path d="M 215 85 L 300 75 L 300 125 L 215 115 Z" fill="#1e293b" opacity="0.7"/>
  <text x="260" y="95" text-anchor="middle" font-size="9" fill="#94a3b8">Shadow</text>
  
  <!-- Earth (right) -->
  <circle cx="320" cy="100" r="22" fill="#3b82f6" stroke="#1e40af" stroke-width="2"/>
  <ellipse cx="320" cy="100" rx="18" ry="22" fill="#16a34a" opacity="0.5"/>
  <text x="320" y="145" text-anchor="middle" font-size="11" font-weight="bold" fill="#60a5fa">Earth</text>
  
  <!-- Position labels -->
  <text x="200" y="35" text-anchor="middle" font-size="10" fill="#f59e0b">Moon is BETWEEN</text>
  <text x="200" y="47" text-anchor="middle" font-size="10" fill="#f59e0b">Sun and Earth</text>
  
  <!-- Alignment indicator -->
  <line x1="80" y1="165" x2="200" y2="165" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,2"/>
  <line x1="200" y1="165" x2="320" y2="165" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="200" y="177" text-anchor="middle" font-size="9" fill="#94a3b8">All three aligned in a straight line</text>
  
  <text x="200" y="195" text-anchor="middle" font-size="11" font-weight="bold" fill="#16a34a">Solar Eclipse: Moon blocks Sun's light</text>
  
  <defs>
    <marker id="arrowLight" markerWidth="8" markerHeight="8" refX="4" refY="2.5" orient="auto">
      <path d="M0,0 L0,5 L6,2.5 z" fill="#fef3c7"/>
    </marker>
  </defs>
</svg>''')

# SCI1001: Springs with different masses
fix('SCI1001', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Springs with Different Masses</text>
  
  <!-- Support bar -->
  <rect x="20" y="35" width="360" height="8" fill="#64748b" stroke="#475569" stroke-width="2"/>
  
  <!-- Spring 1: 100g -->
  <g transform="translate(60,43)">
    <!-- Spring coils -->
    <path d="M 0 0 L 3 5 L -3 10 L 3 15 L -3 20 L 3 25 L -3 30 L 3 35 L 0 40" stroke="#3b82f6" stroke-width="2" fill="none"/>
    <!-- Mass box -->
    <rect x="-12" y="42" width="24" height="20" fill="#94a3b8" stroke="#64748b" stroke-width="2"/>
    <text x="0" y="56" text-anchor="middle" font-size="10" fill="white">100g</text>
  </g>
  <text x="60" y="82" text-anchor="middle" font-size="9" fill="#64748b">Stretch: Small</text>
  
  <!-- Spring 2: 200g -->
  <g transform="translate(150,43)">
    <!-- Spring coils (longer) -->
    <path d="M 0 0 L 3 6 L -3 12 L 3 18 L -3 24 L 3 30 L -3 36 L 3 42 L -3 48 L 3 54 L 0 60" stroke="#3b82f6" stroke-width="2" fill="none"/>
    <!-- Mass box -->
    <rect x="-12" y="62" width="24" height="22" fill="#94a3b8" stroke="#64748b" stroke-width="2"/>
    <text x="0" y="77" text-anchor="middle" font-size="10" fill="white">200g</text>
  </g>
  <text x="150" y="104" text-anchor="middle" font-size="9" fill="#64748b">Stretch: Medium</text>
  
  <!-- Spring 3: 300g -->
  <g transform="translate(250,43)">
    <!-- Spring coils (even longer) -->
    <path d="M 0 0 L 3 7 L -3 14 L 3 21 L -3 28 L 3 35 L -3 42 L 3 49 L -3 56 L 3 63 L -3 70 L 3 77 L 0 84" stroke="#3b82f6" stroke-width="2" fill="none"/>
    <!-- Mass box -->
    <rect x="-12" y="86" width="24" height="24" fill="#94a3b8" stroke="#64748b" stroke-width="2"/>
    <text x="0" y="102" text-anchor="middle" font-size="10" fill="white">300g</text>
  </g>
  <text x="250" y="130" text-anchor="middle" font-size="9" fill="#64748b">Stretch: Large</text>
  
  <!-- Spring 4: 400g -->
  <g transform="translate(340,43)">
    <!-- Spring coils (longest) -->
    <path d="M 0 0 L 3 8 L -3 16 L 3 24 L -3 32 L 3 40 L -3 48 L 3 56 L -3 64 L 3 72 L -3 80 L 3 88 L -3 96 L 3 104 L 0 112" stroke="#3b82f6" stroke-width="2" fill="none"/>
    <!-- Mass box -->
    <rect x="-12" y="114" width="24" height="26" fill="#94a3b8" stroke="#64748b" stroke-width="2"/>
    <text x="0" y="131" text-anchor="middle" font-size="10" fill="white">400g</text>
  </g>
  <text x="340" y="160" text-anchor="middle" font-size="9" fill="#64748b">Stretch: LARGEST</text>
  
  <!-- Reference line -->
  <line x1="20" y1="170" x2="380" y2="170" stroke="#f59e0b" stroke-width="1" stroke-dasharray="4,2"/>
  <text x="200" y="185" text-anchor="middle" font-size="10" fill="#f59e0b">Reference level</text>
  
  <!-- Measurement arrows -->
  <line x1="355" y1="43" x2="355" y2="114" stroke="#16a34a" stroke-width="1.5" marker-end="url(#arrowGreen)"/>
  <text x="365" y="80" font-size="9" fill="#16a34a" font-weight="bold">Maximum</text>
  <text x="365" y="90" font-size="9" fill="#16a34a" font-weight="bold">stretch</text>
  
  <!-- Conclusion -->
  <rect x="50" y="200" width="300" height="35" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" rx="6"/>
  <text x="200" y="217" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">Greater mass → Greater force → More stretch</text>
  <text x="200" y="230" text-anchor="middle" font-size="9" fill="#64748b">400g mass causes the most stretching</text>
  
  <defs>
    <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="4" refY="2.5" orient="auto">
      <path d="M0,0 L0,5 L6,2.5 z" fill="#16a34a"/>
    </marker>
  </defs>
</svg>''')

# SCI1002: Simple circuit with switch
fix('SCI1002', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Circuit with Switch</text>
  
  <!-- Circuit 1: Switch OPEN (left) -->
  <g transform="translate(0,30)">
    <text x="100" y="10" text-anchor="middle" font-size="12" font-weight="bold" fill="#ef4444">Switch OPEN</text>
    
    <!-- Battery -->
    <line x1="50" y1="80" x2="50" y2="50" stroke="#64748b" stroke-width="3"/>
    <line x1="45" y1="50" x2="55" y2="50" stroke="#64748b" stroke-width="2"/>
    <line x1="47" y1="80" x2="53" y2="80" stroke="#64748b" stroke-width="2"/>
    <text x="30" y="67" font-size="9" fill="#64748b">+</text>
    <text x="30" y="77" font-size="9" fill="#64748b">−</text>
    
    <!-- Wire from battery to switch -->
    <line x1="50" y1="80" x2="50" y2="120" stroke="#64748b" stroke-width="2"/>
    <line x1="50" y1="120" x2="80" y2="120" stroke="#64748b" stroke-width="2"/>
    
    <!-- Switch (OPEN) -->
    <circle cx="80" cy="120" r="3" fill="#64748b"/>
    <line x1="80" y1="120" x2="105" y2="105" stroke="#ef4444" stroke-width="3"/>
    <circle cx="120" cy="120" r="3" fill="#64748b"/>
    <text x="100" y="105" text-anchor="middle" font-size="8" fill="#ef4444" font-weight="bold">OPEN</text>
    
    <!-- Gap indicator -->
    <text x="100" y="140" text-anchor="middle" font-size="10" fill="#ef4444">✗ No connection</text>
    
    <!-- Wire to bulb -->
    <line x1="120" y1="120" x2="150" y2="120" stroke="#64748b" stroke-width="2"/>
    
    <!-- Bulb (OFF) -->
    <circle cx="150" cy="80" r="20" fill="#f1f5f9" stroke="#64748b" stroke-width="2"/>
    <path d="M 145 85 L 150 75 L 155 85" stroke="#94a3b8" stroke-width="2" fill="none"/>
    <text x="150" y="70" text-anchor="middle" font-size="16" fill="#cbd5e1">💡</text>
    <line x1="150" y1="100" x2="150" y2="120" stroke="#64748b" stroke-width="2"/>
    <text x="150" y="45" text-anchor="middle" font-size="9" fill="#ef4444">Bulb OFF</text>
    
    <!-- Wire back to battery -->
    <line x1="150" y1="120" x2="150" y2="150" stroke="#64748b" stroke-width="2"/>
    <line x1="150" y1="150" x2="50" y2="150" stroke="#64748b" stroke-width="2"/>
    <line x1="50" y1="150" x2="50" y2="80" stroke="#64748b" stroke-width="2"/>
    
    <!-- No current -->
    <text x="100" y="165" text-anchor="middle" font-size="10" font-weight="bold" fill="#ef4444">✗ Current does NOT flow</text>
  </g>
  
  <!-- Circuit 2: Switch CLOSED (right) -->
  <g transform="translate(200,30)">
    <text x="100" y="10" text-anchor="middle" font-size="12" font-weight="bold" fill="#16a34a">Switch CLOSED</text>
    
    <!-- Battery -->
    <line x1="50" y1="80" x2="50" y2="50" stroke="#64748b" stroke-width="3"/>
    <line x1="45" y1="50" x2="55" y2="50" stroke="#64748b" stroke-width="2"/>
    <line x1="47" y1="80" x2="53" y2="80" stroke="#64748b" stroke-width="2"/>
    <text x="30" y="67" font-size="9" fill="#64748b">+</text>
    <text x="30" y="77" font-size="9" fill="#64748b">−</text>
    
    <!-- Wire from battery to switch -->
    <line x1="50" y1="80" x2="50" y2="120" stroke="#64748b" stroke-width="2"/>
    <line x1="50" y1="120" x2="80" y2="120" stroke="#64748b" stroke-width="2"/>
    
    <!-- Switch (CLOSED) -->
    <circle cx="80" cy="120" r="3" fill="#64748b"/>
    <line x1="80" y1="120" x2="120" y2="120" stroke="#16a34a" stroke-width="3"/>
    <circle cx="120" cy="120" r="3" fill="#64748b"/>
    <text x="100" y="110" text-anchor="middle" font-size="8" fill="#16a34a" font-weight="bold">CLOSED</text>
    
    <!-- Connected indicator -->
    <text x="100" y="140" text-anchor="middle" font-size="10" fill="#16a34a">✓ Connected</text>
    
    <!-- Wire to bulb -->
    <line x1="120" y1="120" x2="150" y2="120" stroke="#64748b" stroke-width="2"/>
    
    <!-- Bulb (ON) -->
    <circle cx="150" cy="80" r="20" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
    <path d="M 145 85 L 150 75 L 155 85" stroke="#f59e0b" stroke-width="2" fill="none"/>
    <text x="150" y="70" text-anchor="middle" font-size="16" fill="#fbbf24">💡</text>
    <line x1="150" y1="100" x2="150" y2="120" stroke="#64748b" stroke-width="2"/>
    <!-- Light rays -->
    <line x1="150" y1="60" x2="150" y2="50" stroke="#fbbf24" stroke-width="1.5"/>
    <line x1="165" y1="65" x2="172" y2="58" stroke="#fbbf24" stroke-width="1.5"/>
    <line x1="135" y1="65" x2="128" y2="58" stroke="#fbbf24" stroke-width="1.5"/>
    <text x="150" y="45" text-anchor="middle" font-size="9" fill="#16a34a" font-weight="bold">Bulb ON</text>
    
    <!-- Wire back to battery -->
    <line x1="150" y1="120" x2="150" y2="150" stroke="#64748b" stroke-width="2"/>
    <line x1="150" y1="150" x2="50" y2="150" stroke="#64748b" stroke-width="2"/>
    <line x1="50" y1="150" x2="50" y2="80" stroke="#64748b" stroke-width="2"/>
    
    <!-- Current flow arrows -->
    <path d="M 53 130 L 53 125" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#arrowBlue)"/>
    <text x="100" y="165" text-anchor="middle" font-size="10" font-weight="bold" fill="#16a34a">✓ Current flows</text>
  </g>
  
  <defs>
    <marker id="arrowBlue" markerWidth="8" markerHeight="8" refX="4" refY="2.5" orient="auto">
      <path d="M0,0 L0,5 L6,2.5 z" fill="#3b82f6"/>
    </marker>
  </defs>
</svg>''')

# SCI1003: Reversible vs irreversible changes
fix('SCI1003', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 260" width="380" font-family="Arial,sans-serif">
  <text x="190" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Reversible Change: Ice ⇄ Water</text>
  
  <!-- Ice cube (left) -->
  <g transform="translate(70,80)">
    <rect x="-25" y="-25" width="50" height="50" fill="#bfdbfe" stroke="#3b82f6" stroke-width="2" rx="5"/>
    <line x1="-20" y1="-15" x2="20" y2="-15" stroke="#60a5fa" stroke-width="1" opacity="0.6"/>
    <line x1="-20" y1="0" x2="20" y2="0" stroke="#60a5fa" stroke-width="1" opacity="0.6"/>
    <line x1="-20" y1="15" x2="20" y2="15" stroke="#60a5fa" stroke-width="1" opacity="0.6"/>
    <line x1="-15" y1="-20" x2="-15" y2="20" stroke="#60a5fa" stroke-width="1" opacity="0.6"/>
    <line x1="0" y1="-20" x2="0" y2="20" stroke="#60a5fa" stroke-width="1" opacity="0.6"/>
    <line x1="15" y1="-20" x2="15" y2="20" stroke="#60a5fa" stroke-width="1" opacity="0.6"/>
  </g>
  <text x="70" y="50" text-anchor="middle" font-size="12" font-weight="bold" fill="#3b82f6">ICE (Solid)</text>
  <text x="70" y="140" text-anchor="middle" font-size="10" fill="#64748b">0°C or below</text>
  
  <!-- Arrow right: MELTING -->
  <g transform="translate(125,80)">
    <line x1="0" y1="0" x2="50" y2="0" stroke="#f59e0b" stroke-width="3" marker-end="url(#arrowOrange)"/>
    <text x="25" y="-8" text-anchor="middle" font-size="10" font-weight="bold" fill="#f59e0b">HEAT</text>
    <text x="25" y="3" text-anchor="middle" font-size="9" fill="#f59e0b">Melting</text>
    <!-- Heat symbol -->
    <circle cx="25" cy="20" r="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1"/>
    <text x="25" y="25" text-anchor="middle" font-size="10" fill="#ea580c">🔥</text>
  </g>
  
  <!-- Water (middle) -->
  <g transform="translate(240,70)">
    <!-- Beaker -->
    <path d="M -25 0 L -25 40 Q -25 45 -20 45 L 20 45 Q 25 45 25 40 L 25 0" stroke="#64748b" stroke-width="2" fill="none"/>
    <line x1="-30" y1="0" x2="30" y2="0" stroke="#64748b" stroke-width="2"/>
    <!-- Water -->
    <rect x="-23" y="10" width="46" height="33" fill="#3b82f6" opacity="0.4"/>
    <!-- Water particles -->
    <circle cx="-10" cy="20" r="2" fill="#3b82f6" opacity="0.7"/>
    <circle cx="5" cy="25" r="2" fill="#3b82f6" opacity="0.7"/>
    <circle cx="-15" cy="33" r="2" fill="#3b82f6" opacity="0.7"/>
    <circle cx="12" cy="35" r="2" fill="#3b82f6" opacity="0.7"/>
  </g>
  <text x="240" y="50" text-anchor="middle" font-size="12" font-weight="bold" fill="#3b82f6">WATER (Liquid)</text>
  <text x="240" y="140" text-anchor="middle" font-size="10" fill="#64748b">Room temperature</text>
  
  <!-- Arrow left: FREEZING -->
  <g transform="translate(125,140)">
    <line x1="50" y1="0" x2="0" y2="0" stroke="#60a5fa" stroke-width="3" marker-end="url(#arrowBlue)"/>
    <text x="25" y="-8" text-anchor="middle" font-size="10" font-weight="bold" fill="#60a5fa">COOL</text>
    <text x="25" y="3" text-anchor="middle" font-size="9" fill="#60a5fa">Freezing</text>
    <!-- Cold symbol -->
    <circle cx="25" cy="20" r="8" fill="#dbeafe" stroke="#60a5fa" stroke-width="1"/>
    <text x="25" y="25" text-anchor="middle" font-size="10" fill="#1e40af">❄</text>
  </g>
  
  <!-- Two-way arrow emphasizing reversibility -->
  <path d="M 70 170 L 240 170" stroke="#16a34a" stroke-width="2" marker-end="url(#arrowGreen)" marker-start="url(#arrowGreenStart)"/>
  <text x="155" y="165" text-anchor="middle" font-size="11" font-weight="bold" fill="#16a34a">REVERSIBLE</text>
  <text x="155" y="188" text-anchor="middle" font-size="9" fill="#16a34a">Can go back and forth!</text>
  
  <!-- Examples box -->
  <rect x="20" y="205" width="340" height="48" fill="#dcfce7" stroke="#16a34a" stroke-width="2" rx="6"/>
  <text x="190" y="222" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">Reversible: Ice↔Water, Water↔Steam</text>
  <text x="190" y="235" text-anchor="middle" font-size="9" fill="#64748b">Irreversible: Burning wood, Rusting iron, Cooking egg</text>
  <text x="190" y="247" text-anchor="middle" font-size="9" fill="#64748b">(Cannot change back to original form)</text>
  
  <defs>
    <marker id="arrowOrange" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
      <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b"/>
    </marker>
    <marker id="arrowBlue" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
      <path d="M0,0 L0,6 L9,3 z" fill="#60a5fa"/>
    </marker>
    <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
      <path d="M0,0 L0,6 L9,3 z" fill="#16a34a"/>
    </marker>
    <marker id="arrowGreenStart" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto-start-reverse">
      <path d="M0,0 L0,6 L9,3 z" fill="#16a34a"/>
    </marker>
  </defs>
</svg>''')

# SCI1004: Plant growth factors table
fix('SCI1004', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Plant Growth Experiment Results</text>
  
  <!-- Table -->
  <rect x="20" y="35" width="360" height="30" fill="#3b82f6" stroke="#1e40af" stroke-width="2"/>
  <text x="200" y="55" text-anchor="middle" font-size="12" font-weight="bold" fill="white">Factors Present</text>
  
  <!-- Column headers -->
  <rect x="20" y="65" width="90" height="25" fill="#bfdbfe" stroke="#64748b" stroke-width="1"/>
  <text x="65" y="82" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">Plant</text>
  
  <rect x="110" y="65" width="70" height="25" fill="#bfdbfe" stroke="#64748b" stroke-width="1"/>
  <text x="145" y="82" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">Water</text>
  
  <rect x="180" y="65" width="70" height="25" fill="#bfdbfe" stroke="#64748b" stroke-width="1"/>
  <text x="215" y="82" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">Sunlight</text>
  
  <rect x="250" y="65" width="60" height="25" fill="#bfdbfe" stroke="#64748b" stroke-width="1"/>
  <text x="280" y="82" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">Air</text>
  
  <rect x="310" y="65" width="70" height="25" fill="#bfdbfe" stroke="#64748b" stroke-width="1"/>
  <text x="345" y="82" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">Result</text>
  
  <!-- Row 1: Plant A -->
  <rect x="20" y="90" width="90" height="25" fill="white" stroke="#64748b" stroke-width="1"/>
  <text x="65" y="107" text-anchor="middle" font-size="11" fill="#1e293b">A</text>
  <rect x="110" y="90" width="70" height="25" fill="white" stroke="#64748b" stroke-width="1"/>
  <text x="145" y="107" text-anchor="middle" font-size="11" fill="#ef4444">✗</text>
  <rect x="180" y="90" width="70" height="25" fill="white" stroke="#64748b" stroke-width="1"/>
  <text x="215" y="107" text-anchor="middle" font-size="11" fill="#16a34a">✓</text>
  <rect x="250" y="90" width="60" height="25" fill="white" stroke="#64748b" stroke-width="1"/>
  <text x="280" y="107" text-anchor="middle" font-size="11" fill="#16a34a">✓</text>
  <rect x="310" y="90" width="70" height="25" fill="#fee2e2" stroke="#64748b" stroke-width="1"/>
  <text x="345" y="107" text-anchor="middle" font-size="10" fill="#dc2626">Died</text>
  
  <!-- Row 2: Plant B -->
  <rect x="20" y="115" width="90" height="25" fill="white" stroke="#64748b" stroke-width="1"/>
  <text x="65" y="132" text-anchor="middle" font-size="11" fill="#1e293b">B</text>
  <rect x="110" y="115" width="70" height="25" fill="white" stroke="#64748b" stroke-width="1"/>
  <text x="145" y="132" text-anchor="middle" font-size="11" fill="#16a34a">✓</text>
  <rect x="180" y="115" width="70" height="25" fill="white" stroke="#64748b" stroke-width="1"/>
  <text x="215" y="132" text-anchor="middle" font-size="11" fill="#ef4444">✗</text>
  <rect x="250" y="115" width="60" height="25" fill="white" stroke="#64748b" stroke-width="1"/>
  <text x="280" y="132" text-anchor="middle" font-size="11" fill="#16a34a">✓</text>
  <rect x="310" y="115" width="70" height="25" fill="#fee2e2" stroke="#64748b" stroke-width="1"/>
  <text x="345" y="132" text-anchor="middle" font-size="10" fill="#dc2626">Weak</text>
  
  <!-- Row 3: Plant C -->
  <rect x="20" y="140" width="90" height="25" fill="white" stroke="#64748b" stroke-width="1"/>
  <text x="65" y="157" text-anchor="middle" font-size="11" fill="#1e293b">C</text>
  <rect x="110" y="140" width="70" height="25" fill="white" stroke="#64748b" stroke-width="1"/>
  <text x="145" y="157" text-anchor="middle" font-size="11" fill="#16a34a">✓</text>
  <rect x="180" y="140" width="70" height="25" fill="white" stroke="#64748b" stroke-width="1"/>
  <text x="215" y="157" text-anchor="middle" font-size="11" fill="#16a34a">✓</text>
  <rect x="250" y="140" width="60" height="25" fill="white" stroke="#64748b" stroke-width="1"/>
  <text x="280" y="157" text-anchor="middle" font-size="11" fill="#ef4444">✗</text>
  <rect x="310" y="140" width="70" height="25" fill="#fee2e2" stroke="#64748b" stroke-width="1"/>
  <text x="345" y="157" text-anchor="middle" font-size="10" fill="#dc2626">Died</text>
  
  <!-- Row 4: Plant D (ALL factors) -->
  <rect x="20" y="165" width="90" height="25" fill="white" stroke="#64748b" stroke-width="1"/>
  <text x="65" y="182" text-anchor="middle" font-size="11" fill="#1e293b">D</text>
  <rect x="110" y="165" width="70" height="25" fill="white" stroke="#64748b" stroke-width="1"/>
  <text x="145" y="182" text-anchor="middle" font-size="11" fill="#16a34a">✓</text>
  <rect x="180" y="165" width="70" height="25" fill="white" stroke="#64748b" stroke-width="1"/>
  <text x="215" y="182" text-anchor="middle" font-size="11" fill="#16a34a">✓</text>
  <rect x="250" y="165" width="60" height="25" fill="white" stroke="#64748b" stroke-width="1"/>
  <text x="280" y="182" text-anchor="middle" font-size="11" fill="#16a34a">✓</text>
  <rect x="310" y="165" width="70" height="25" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
  <text x="345" y="182" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">Healthy!</text>
  
  <!-- Highlight Plant D -->
  <rect x="18" y="163" width="364" height="29" fill="none" stroke="#16a34a" stroke-width="3" stroke-dasharray="5,3" rx="4"/>
  
  <!-- Legend -->
  <text x="200" y="210" text-anchor="middle" font-size="11" fill="#64748b">✓ = Present | ✗ = Absent</text>
  
  <!-- Conclusion box -->
  <rect x="30" y="220" width="340" height="35" fill="#dcfce7" stroke="#16a34a" stroke-width="2" rx="6"/>
  <text x="200" y="237" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">Conclusion: Plants need ALL THREE factors</text>
  <text x="200" y="250" text-anchor="middle" font-size="10" fill="#64748b">Water + Sunlight + Air = Healthy Plant Growth</text>
</svg>''')

# SCI1005: Vinegar + Baking soda reaction
fix('SCI1005', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 240" width="380" font-family="Arial,sans-serif">
  <text x="190" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Vinegar + Baking Soda Reaction</text>
  
  <!-- Before mixing (left) -->
  <text x="85" y="45" text-anchor="middle" font-size="11" font-weight="bold" fill="#64748b">Before Mixing</text>
  
  <!-- Vinegar bottle -->
  <rect x="30" y="60" width="40" height="70" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="2"/>
  <rect x="35" y="55" width="30" height="10" fill="#f59e0b" stroke="#ea580c" stroke-width="1"/>
  <rect x="32" y="80" width="36" height="48" fill="#fbbf24" opacity="0.6"/>
  <text x="50" y="110" text-anchor="middle" font-size="9" fill="#92400e">Vinegar</text>
  <text x="50" y="122" text-anchor="middle" font-size="8" fill="#92400e">(Acid)</text>
  
  <!-- Baking soda box -->
  <rect x="100" y="70" width="40" height="50" fill="white" stroke="#64748b" stroke-width="2" rx="2"/>
  <text x="120" y="92" text-anchor="middle" font-size="8" fill="#1e293b">Baking</text>
  <text x="120" y="103" text-anchor="middle" font-size="8" fill="#1e293b">Soda</text>
  <text x="120" y="114" text-anchor="middle" font-size="7" fill="#64748b">(Base)</text>
  <!-- Powder -->
  <circle cx="110" cy="108" r="2" fill="#e2e8f0"/>
  <circle cx="120" cy="110" r="2" fill="#e2e8f0"/>
  <circle cx="130" cy="107" r="2" fill="#e2e8f0"/>
  
  <!-- Plus sign -->
  <text x="85" y="105" text-anchor="middle" font-size="20" fill="#3b82f6">+</text>
  
  <!-- Arrow -->
  <path d="M 160 95 L 200 95" stroke="#16a34a" stroke-width="3" marker-end="url(#arrowG)"/>
  <text x="180" y="88" text-anchor="middle" font-size="9" fill="#16a34a" font-weight="bold">Mix!</text>
  
  <!-- After mixing (right) -->
  <text x="285" y="45" text-anchor="middle" font-size="11" font-weight="bold" fill="#16a34a">After Mixing</text>
  
  <!-- Beaker with reaction -->
  <path d="M 230 60 L 230 160 Q 230 165 235 165 L 335 165 Q 340 165 340 160 L 340 60" stroke="#64748b" stroke-width="2" fill="none"/>
  <line x1="225" y1="60" x2="345" y2="60" stroke="#64748b" stroke-width="2"/>
  
  <!-- Liquid mixture -->
  <rect x="232" y="120" width="106" height="43" fill="#fef3c7" opacity="0.6"/>
  
  <!-- Bubbles (CO2) -->
  <circle cx="250" cy="140" r="4" fill="#dbeafe" stroke="#3b82f6" stroke-width="1" opacity="0.8"/>
  <circle cx="270" cy="135" r="5" fill="#dbeafe" stroke="#3b82f6" stroke-width="1" opacity="0.8"/>
  <circle cx="290" cy="138" r="4" fill="#dbeafe" stroke="#3b82f6" stroke-width="1" opacity="0.8"/>
  <circle cx="310" cy="142" r="5" fill="#dbeafe" stroke="#3b82f6" stroke-width="1" opacity="0.8"/>
  <circle cx="260" cy="125" r="4" fill="#dbeafe" stroke="#3b82f6" stroke-width="1" opacity="0.8"/>
  <circle cx="280" cy="120" r="5" fill="#dbeafe" stroke="#3b82f6" stroke-width="1" opacity="0.8"/>
  <circle cx="300" cy="122" r="4" fill="#dbeafe" stroke="#3b82f6" stroke-width="1" opacity="0.8"/>
  <circle cx="320" cy="128" r="4" fill="#dbeafe" stroke="#3b82f6" stroke-width="1" opacity="0.8"/>
  
  <!-- Bubbles rising -->
  <circle cx="270" cy="100" r="5" fill="#dbeafe" stroke="#3b82f6" stroke-width="1" opacity="0.7"/>
  <circle cx="295" cy="95" r="4" fill="#dbeafe" stroke="#3b82f6" stroke-width="1" opacity="0.7"/>
  <circle cx="280" cy="80" r="5" fill="#dbeafe" stroke="#3b82f6" stroke-width="1" opacity="0.6"/>
  <circle cx="305" cy="75" r="4" fill="#dbeafe" stroke="#3b82f6" stroke-width="1" opacity="0.6"/>
  
  <!-- Fizzing arrows -->
  <path d="M 275 65 L 275 45" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrowBlue)" opacity="0.8"/>
  <path d="M 295 65 L 295 45" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrowBlue)" opacity="0.8"/>
  
  <!-- Gas label -->
  <text x="285" y="35" text-anchor="middle" font-size="10" font-weight="bold" fill="#3b82f6">CO₂ Gas</text>
  <text x="285" y="47" text-anchor="middle" font-size="8" fill="#3b82f6">(Carbon Dioxide)</text>
  
  <!-- Chemical equation -->
  <rect x="40" y="180" width="300" height="50" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" rx="6"/>
  <text x="190" y="198" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">Chemical Reaction</text>
  <text x="190" y="212" text-anchor="middle" font-size="10" fill="#475569">Acid + Base → Salt + Water + CO₂</text>
  <text x="190" y="225" text-anchor="middle" font-size="9" fill="#64748b">The bubbles are carbon dioxide gas!</text>
  
  <defs>
    <marker id="arrowG" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
      <path d="M0,0 L0,6 L9,3 z" fill="#16a34a"/>
    </marker>
    <marker id="arrowBlue" markerWidth="8" markerHeight="8" refX="4" refY="2.5" orient="auto">
      <path d="M0,0 L0,5 L6,2.5 z" fill="#3b82f6"/>
    </marker>
  </defs>
</svg>''')

# SCI1006: Water cycle
fix('SCI1006', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Water Cycle</text>
  
  <!-- Sun -->
  <circle cx="350" cy="50" r="20" fill="#fbbf24" stroke="#f59e0b" stroke-width="2"/>
  <line x1="350" y1="25" x2="350" y2="18" stroke="#f59e0b" stroke-width="2"/>
  <line x1="375" y1="50" x2="382" y2="50" stroke="#f59e0b" stroke-width="2"/>
  <line x1="368" y1="32" x2="373" y2="27" stroke="#f59e0b" stroke-width="2"/>
  <line x1="368" y1="68" x2="373" y2="73" stroke="#f59e0b" stroke-width="2"/>
  <text x="350" y="85" text-anchor="middle" font-size="9" fill="#f59e0b" font-weight="bold">Heat</text>
  
  <!-- Cloud -->
  <ellipse cx="150" cy="60" rx="30" ry="18" fill="#cbd5e1" stroke="#64748b" stroke-width="2"/>
  <ellipse cx="175" cy="55" rx="28" ry="16" fill="#cbd5e1" stroke="#64748b" stroke-width="2"/>
  <ellipse cx="200" cy="60" rx="25" ry="15" fill="#cbd5e1" stroke="#64748b" stroke-width="2"/>
  <text x="175" y="50" text-anchor="middle" font-size="10" font-weight="bold" fill="#475569">Cloud</text>
  
  <!-- Rain (Precipitation) -->
  <line x1="155" y1="78" x2="150" y2="110" stroke="#3b82f6" stroke-width="2"/>
  <line x1="170" y1="75" x2="165" y2="108" stroke="#3b82f6" stroke-width="2"/>
  <line x1="185" y1="75" x2="180" y2="108" stroke="#3b82f6" stroke-width="2"/>
  <line x1="200" y1="78" x2="195" y2="110" stroke="#3b82f6" stroke-width="2"/>
  <text x="175" y="100" text-anchor="middle" font-size="9" font-weight="bold" fill="#3b82f6">Precipitation</text>
  
  <!-- Arrow annotation for precipitation -->
  <text x="240" y="95" font-size="8" fill="#64748b">Rain, Snow</text>
  
  <!-- Mountain/Land -->
  <path d="M 250 180 L 300 120 L 330 150 L 350 140 L 370 160 L 400 160 L 400 230 L 250 230 Z" fill="#86efac" stroke="#16a34a" stroke-width="2"/>
  <text x="310" y="175" text-anchor="middle" font-size="9" fill="#15803d" font-weight="bold">Land</text>
  
  <!-- Lake/River -->
  <ellipse cx="170" cy="200" rx="80" ry="30" fill="#3b82f6" stroke="#1e40af" stroke-width="2" opacity="0.6"/>
  <text x="170" y="205" text-anchor="middle" font-size="10" font-weight="bold" fill="white">Water (Liquid)</text>
  
  <!-- Collection -->
  <text x="170" y="245" text-anchor="middle" font-size="9" font-weight="bold" fill="#3b82f6">Collection</text>
  <text x="170" y="256" text-anchor="middle" font-size="8" fill="#64748b">Water gathers in lakes, rivers</text>
  
  <!-- Evaporation arrows -->
  <path d="M 190 185 L 200 150 L 210 130" stroke="#f59e0b" stroke-width="2" stroke-dasharray="3,2" marker-end="url(#arrowOr)"/>
  <path d="M 210 190 L 225 160 L 235 135" stroke="#f59e0b" stroke-width="2" stroke-dasharray="3,2" marker-end="url(#arrowOr)"/>
  <path d="M 235 195 L 250 165 L 260 140" stroke="#f59e0b" stroke-width="2" stroke-dasharray="3,2" marker-end="url(#arrowOr)"/>
  
  <text x="240" y="170" text-anchor="middle" font-size="9" font-weight="bold" fill="#f59e0b">Evaporation</text>
  <text x="240" y="180" text-anchor="middle" font-size="8" fill="#ea580c">Liquid → Gas</text>
  
  <!-- Condensation -->
  <path d="M 265 130 L 235 90 L 215 75" stroke="#64748b" stroke-width="2" stroke-dasharray="3,2" marker-end="url(#arrowGr)"/>
  <text x="250" y="110" text-anchor="middle" font-size="9" font-weight="bold" fill="#64748b">Condensation</text>
  <text x="250" y="120" text-anchor="middle" font-size="8" fill="#64748b">Gas → Liquid</text>
  
  <!-- Water vapor particles -->
  <circle cx="220" cy="145" r="2" fill="#bfdbfe" opacity="0.7"/>
  <circle cx="235" cy="150" r="2" fill="#bfdbfe" opacity="0.7"/>
  <circle cx="245" cy="155" r="2" fill="#bfdbfe" opacity="0.7"/>
  <circle cx="255" cy="145" r="2" fill="#bfdbfe" opacity="0.7"/>
  
  <!-- Ocean (bottom left) -->
  <rect x="0" y="210" width="120" height="70" fill="#1e40af" opacity="0.4"/>
  <path d="M 10 215 Q 20 220 30 215 Q 40 210 50 215 Q 60 220 70 215" stroke="#60a5fa" stroke-width="1.5" fill="none"/>
  <path d="M 20 230 Q 30 235 40 230 Q 50 225 60 230 Q 70 235 80 230" stroke="#60a5fa" stroke-width="1.5" fill="none"/>
  <text x="60" y="253" text-anchor="middle" font-size="9" fill="#dbeafe" font-weight="bold">Ocean</text>
  
  <!-- Key process label -->
  <rect x="10" y="265" width="180" height="12" fill="#fef3c7" stroke="#f59e0b" stroke-width="1" rx="3"/>
  <text x="100" y="274" text-anchor="middle" font-size="9" font-weight="bold" fill="#ea580c">Evaporation: Liquid water → Water vapor (gas)</text>
  
  <defs>
    <marker id="arrowOr" markerWidth="8" markerHeight="8" refX="4" refY="2.5" orient="auto">
      <path d="M0,0 L0,5 L6,2.5 z" fill="#f59e0b"/>
    </marker>
    <marker id="arrowGr" markerWidth="8" markerHeight="8" refX="4" refY="2.5" orient="auto">
      <path d="M0,0 L0,5 L6,2.5 z" fill="#64748b"/>
    </marker>
  </defs>
</svg>''')

# SCI1007: Electrical conductors vs insulators
fix('SCI1007', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 270" width="380" font-family="Arial,sans-serif">
  <text x="190" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Electrical Conductors vs Insulators</text>
  
  <!-- Conductors section (left) -->
  <rect x="15" y="35" width="170" height="195" fill="#fee2e2" stroke="#ef4444" stroke-width="2" rx="8"/>
  <text x="100" y="55" text-anchor="middle" font-size="13" font-weight="bold" fill="#dc2626">CONDUCTORS</text>
  <text x="100" y="70" text-anchor="middle" font-size="9" fill="#991b1b">Allow electricity to flow</text>
  
  <!-- Copper wire -->
  <rect x="35" y="85" width="50" height="8" fill="#f59e0b" stroke="#ea580c" stroke-width="2" rx="2"/>
  <text x="95" y="92" font-size="10" fill="#1e293b">Copper wire</text>
  
  <!-- Iron nail -->
  <rect x="40" y="110" width="40" height="6" fill="#94a3b8" stroke="#64748b" stroke-width="2" rx="1"/>
  <path d="M 80 113 L 85 108 L 85 118 Z" fill="#94a3b8" stroke="#64748b" stroke-width="1"/>
  <text x="95" y="117" font-size="10" fill="#1e293b">Iron nail</text>
  
  <!-- Aluminum foil -->
  <rect x="35" y="135" width="50" height="15" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2" rx="2"/>
  <line x1="40" y1="140" x2="80" y2="140" stroke="#cbd5e1" stroke-width="1"/>
  <line x1="40" y1="145" x2="80" y2="145" stroke="#cbd5e1" stroke-width="1"/>
  <text x="95" y="147" font-size="10" fill="#1e293b">Aluminum foil</text>
  
  <!-- Gold/Silver -->
  <rect x="35" y="165" width="50" height="10" fill="#fbbf24" stroke="#f59e0b" stroke-width="2" rx="2"/>
  <text x="95" y="173" font-size="10" fill="#1e293b">Gold, Silver</text>
  
  <!-- Current flow illustration -->
  <circle cx="60" cy="195" r="15" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <text x="60" y="199" text-anchor="middle" font-size="10" fill="#ea580c">⚡</text>
  <path d="M 75 195 L 95 195" stroke="#ef4444" stroke-width="2" marker-end="url(#arrowRed)"/>
  <path d="M 100 195 L 120 195" stroke="#ef4444" stroke-width="2" marker-end="url(#arrowRed)"/>
  <text x="100" y="212" text-anchor="middle" font-size="9" fill="#dc2626">Current</text>
  <text x="100" y="223" text-anchor="middle" font-size="9" fill="#dc2626">flows easily</text>
  
  <!-- Insulators section (right) -->
  <rect x="195" y="35" width="170" height="195" fill="#dcfce7" stroke="#16a34a" stroke-width="2" rx="8"/>
  <text x="280" y="55" text-anchor="middle" font-size="13" font-weight="bold" fill="#15803d">INSULATORS</text>
  <text x="280" y="70" text-anchor="middle" font-size="9" fill="#166534">Block/resist electricity</text>
  
  <!-- Plastic ruler -->
  <rect x="215" y="82" width="60" height="12" fill="#3b82f6" stroke="#1e40af" stroke-width="2" rx="2"/>
  <line x1="220" y1="88" x2="270" y2="88" stroke="#60a5fa" stroke-width="1"/>
  <circle cx="225" cy="88" r="1" fill="white"/>
  <circle cx="235" cy="88" r="1" fill="white"/>
  <circle cx="245" cy="88" r="1" fill="white"/>
  <text x="285" y="92" font-size="10" font-weight="bold" fill="#15803d">Plastic ruler</text>
  
  <!-- Rubber -->
  <ellipse cx="245" cy="120" rx="30" ry="12" fill="#475569" stroke="#1e293b" stroke-width="2"/>
  <text x="285" y="123" font-size="10" fill="#1e293b">Rubber</text>
  
  <!-- Wood -->
  <rect x="215" y="140" width="60" height="15" fill="#d97706" stroke="#92400e" stroke-width="2" rx="2"/>
  <line x1="220" y1="143" x2="270" y2="143" stroke="#b45309" stroke-width="1"/>
  <line x1="220" y1="148" x2="270" y2="148" stroke="#b45309" stroke-width="1"/>
  <line x1="220" y1="153" x2="270" y2="153" stroke="#b45309" stroke-width="1"/>
  <text x="285" y="150" font-size="10" fill="#1e293b">Wood</text>
  
  <!-- Glass -->
  <rect x="215" y="167" width="60" height="15" fill="#bfdbfe" stroke="#3b82f6" stroke-width="2" rx="2" opacity="0.6"/>
  <text x="285" y="177" font-size="10" fill="#1e293b">Glass</text>
  
  <!-- Blocked current illustration -->
  <circle cx="240" cy="200" r="15" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <text x="240" y="204" text-anchor="middle" font-size="10" fill="#ea580c">⚡</text>
  <path d="M 255 200 L 270 200" stroke="#64748b" stroke-width="2" stroke-dasharray="2,2"/>
  <line x1="275" y1="195" x2="285" y2="205" stroke="#ef4444" stroke-width="3"/>
  <line x1="285" y1="195" x2="275" y2="205" stroke="#ef4444" stroke-width="3"/>
  <text x="280" y="218" text-anchor="middle" font-size="9" fill="#15803d">Current</text>
  <text x="280" y="228" text-anchor="middle" font-size="9" fill="#15803d">BLOCKED</text>
  
  <!-- Answer highlight -->
  <rect x="193" y="33" width="174" height="199" fill="none" stroke="#16a34a" stroke-width="4" stroke-dasharray="8,4" rx="8"/>
  
  <!-- Bottom summary -->
  <rect x="20" y="240" width="340" height="25" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" rx="6"/>
  <text x="190" y="255" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">Plastic ruler is the BEST insulator!</text>
  
  <defs>
    <marker id="arrowRed" markerWidth="8" markerHeight="8" refX="4" refY="2.5" orient="auto">
      <path d="M0,0 L0,5 L6,2.5 z" fill="#ef4444"/>
    </marker>
  </defs>
</svg>''')

with open('data/questions-science-p6.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("✅ Added diagrams to SCI994-SCI1007 (14 questions)")
print("Questions: SCI994 (heat conduction), SCI995 (lever), SCI996 (boiling graph),")
print("SCI997 (sugar evaporation), SCI998 (butterfly life cycle), SCI999 (cactus),")
print("SCI1000 (solar eclipse), SCI1001 (springs), SCI1002 (circuit),")
print("SCI1003 (reversible change), SCI1004 (plant growth table), SCI1005 (vinegar reaction),")
print("SCI1006 (water cycle), SCI1007 (conductors/insulators)")
