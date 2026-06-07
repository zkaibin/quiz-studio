import json

with open('data/questions-science-p6.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

idx = {q['id']: i for i, q in enumerate(data)}

def fix(qid, diagram):
    data[idx[qid]]['diagram'] = diagram

# SCI931: Animal characteristics table
fix('SCI931', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 220" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Animal Characteristics</text>
  <!-- Table header -->
  <rect x="10" y="30" width="140" height="35" fill="#e0f2fe" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="80" y="52" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af">Characteristic</text>
  <rect x="150" y="30" width="60" height="35" fill="#dbeafe" stroke="#3b82f6" stroke-width="1"/>
  <text x="180" y="52" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af">A</text>
  <rect x="210" y="30" width="60" height="35" fill="#dbeafe" stroke="#3b82f6" stroke-width="1"/>
  <text x="240" y="52" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af">B</text>
  <rect x="270" y="30" width="60" height="35" fill="#dbeafe" stroke="#3b82f6" stroke-width="1"/>
  <text x="300" y="52" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af">C</text>
  <rect x="330" y="30" width="60" height="35" fill="#dbeafe" stroke="#3b82f6" stroke-width="1"/>
  <text x="360" y="52" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af">D</text>
  
  <!-- Row 1: Have scales -->
  <rect x="10" y="65" width="140" height="35" fill="#f8fafc" stroke="#94a3b8" stroke-width="1"/>
  <text x="80" y="87" text-anchor="middle" font-size="11" fill="#334155">Have scales</text>
  <rect x="150" y="65" width="60" height="35" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="180" y="87" text-anchor="middle" font-size="18" fill="#16a34a">✓</text>
  <rect x="210" y="65" width="60" height="35" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <rect x="270" y="65" width="60" height="35" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="300" y="87" text-anchor="middle" font-size="18" fill="#16a34a">✓</text>
  <rect x="330" y="65" width="60" height="35" fill="white" stroke="#94a3b8" stroke-width="1"/>
  
  <!-- Row 2: Lays eggs -->
  <rect x="10" y="100" width="140" height="35" fill="#f8fafc" stroke="#94a3b8" stroke-width="1"/>
  <text x="80" y="122" text-anchor="middle" font-size="11" fill="#334155">Lays eggs</text>
  <rect x="150" y="100" width="60" height="35" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="180" y="122" text-anchor="middle" font-size="18" fill="#16a34a">✓</text>
  <rect x="210" y="100" width="60" height="35" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="240" y="122" text-anchor="middle" font-size="18" fill="#16a34a">✓</text>
  <rect x="270" y="100" width="60" height="35" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <rect x="330" y="100" width="60" height="35" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="360" y="122" text-anchor="middle" font-size="18" fill="#16a34a">✓</text>
  
  <!-- Row 3: Have wings -->
  <rect x="10" y="135" width="140" height="35" fill="#f8fafc" stroke="#94a3b8" stroke-width="1"/>
  <text x="80" y="157" text-anchor="middle" font-size="11" fill="#334155">Have wings</text>
  <rect x="150" y="135" width="60" height="35" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <rect x="210" y="135" width="60" height="35" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <rect x="270" y="135" width="60" height="35" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="300" y="157" text-anchor="middle" font-size="18" fill="#16a34a">✓</text>
  <rect x="330" y="135" width="60" height="35" fill="white" stroke="#94a3b8" stroke-width="1"/>
  
  <!-- Row 4: Have hair -->
  <rect x="10" y="170" width="140" height="35" fill="#f8fafc" stroke="#94a3b8" stroke-width="1"/>
  <text x="80" y="192" text-anchor="middle" font-size="11" fill="#334155">Have hair</text>
  <rect x="150" y="170" width="60" height="35" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <rect x="210" y="170" width="60" height="35" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <rect x="270" y="170" width="60" height="35" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="300" y="192" text-anchor="middle" font-size="18" fill="#16a34a">✓</text>
  <rect x="330" y="170" width="60" height="35" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="360" y="192" text-anchor="middle" font-size="18" fill="#16a34a">✓</text>
</svg>''')

# SCI932: Organism grouping diagram
fix('SCI932', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 240" width="380" font-family="Arial,sans-serif">
  <text x="190" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Organism Groups</text>
  
  <!-- Group E -->
  <rect x="20" y="40" width="160" height="180" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <text x="100" y="62" text-anchor="middle" font-size="13" font-weight="bold" fill="#92400e">Group E</text>
  
  <!-- Bread mould -->
  <ellipse cx="100" cy="105" rx="50" ry="45" fill="#fef9c3" stroke="#ca8a04" stroke-width="1.5"/>
  <text x="100" y="100" text-anchor="middle" font-size="11" font-weight="bold" fill="#713f12">Bread</text>
  <text x="100" y="113" text-anchor="middle" font-size="11" font-weight="bold" fill="#713f12">Mould</text>
  <circle cx="85" cy="120" r="3" fill="#ca8a04"/>
  <circle cx="100" cy="125" r="2.5" fill="#ca8a04"/>
  <circle cx="115" cy="120" r="3.5" fill="#ca8a04"/>
  
  <!-- Mushroom -->
  <g transform="translate(100, 175)">
    <ellipse cx="0" cy="-15" rx="25" ry="8" fill="#d97706" stroke="#92400e" stroke-width="1"/>
    <rect x="-6" y="-15" width="12" height="25" rx="2" fill="#fef3c7" stroke="#92400e" stroke-width="1"/>
    <text x="0" y="20" text-anchor="middle" font-size="11" font-weight="bold" fill="#713f12">Mushroom</text>
  </g>
  
  <!-- Group F -->
  <rect x="200" y="40" width="160" height="180" rx="8" fill="#d1fae5" stroke="#16a34a" stroke-width="2"/>
  <text x="280" y="62" text-anchor="middle" font-size="13" font-weight="bold" fill="#14532d">Group F</text>
  
  <!-- Tree fern -->
  <g transform="translate(280, 110)">
    <line x1="0" y1="0" x2="0" y2="-35" stroke="#15803d" stroke-width="2.5"/>
    <path d="M0,-35 Q-15,-25 -22,-18" stroke="#16a34a" stroke-width="2" fill="none"/>
    <path d="M0,-35 Q15,-25 22,-18" stroke="#16a34a" stroke-width="2" fill="none"/>
    <path d="M0,-28 Q-12,-20 -18,-15" stroke="#16a34a" stroke-width="2" fill="none"/>
    <path d="M0,-28 Q12,-20 18,-15" stroke="#16a34a" stroke-width="2" fill="none"/>
    <text x="0" y="15" text-anchor="middle" font-size="11" font-weight="bold" fill="#14532d">Tree Fern</text>
  </g>
  
  <!-- Lily plant -->
  <g transform="translate(280, 185)">
    <line x1="0" y1="0" x2="0" y2="-25" stroke="#15803d" stroke-width="2"/>
    <ellipse cx="-8" cy="-18" rx="12" ry="5" fill="#86efac" stroke="#15803d" stroke-width="1" transform="rotate(-30 -8 -18)"/>
    <ellipse cx="8" cy="-18" rx="12" ry="5" fill="#86efac" stroke="#15803d" stroke-width="1" transform="rotate(30 8 -18)"/>
    <ellipse cx="0" cy="-30" rx="6" ry="8" fill="#f59e0b" stroke="#92400e" stroke-width="1"/>
    <circle cx="-2" cy="-32" r="1.5" fill="#fbbf24"/>
    <circle cx="2" cy="-32" r="1.5" fill="#fbbf24"/>
    <text x="0" y="15" text-anchor="middle" font-size="11" font-weight="bold" fill="#14532d">Lily Plant</text>
  </g>
</svg>''')

# SCI933: Seed germination setups
fix('SCI933', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260" width="400" font-family="Arial,sans-serif">
  <text x="200" y="16" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Seed Germination Setups</text>
  
  <!-- Setup K: No water -->
  <g transform="translate(50, 50)">
    <text x="0" y="-5" text-anchor="middle" font-size="12" font-weight="bold" fill="#3b82f6">Setup K</text>
    <rect x="-30" y="5" width="60" height="80" rx="3" fill="#e0f2fe" stroke="#3b82f6" stroke-width="2"/>
    <ellipse cx="0" cy="30" rx="15" ry="8" fill="#a8a29e" stroke="#78716c" stroke-width="1"/>
    <circle cx="-5" cy="28" r="3" fill="#f59e0b"/>
    <circle cx="5" cy="32" r="3" fill="#f59e0b"/>
    <text x="0" y="105" text-anchor="middle" font-size="10" fill="#64748b">Dry cotton</text>
    <text x="0" y="118" text-anchor="middle" font-size="10" fill="#64748b">Room temp</text>
  </g>
  
  <!-- Setup L: Water + warmth -->
  <g transform="translate(150, 50)">
    <text x="0" y="-5" text-anchor="middle" font-size="12" font-weight="bold" fill="#16a34a">Setup L</text>
    <rect x="-30" y="5" width="60" height="80" rx="3" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
    <ellipse cx="0" cy="30" rx="15" ry="8" fill="#6ee7b7" stroke="#059669" stroke-width="1"/>
    <circle cx="-5" cy="28" r="3" fill="#f59e0b"/>
    <circle cx="5" cy="32" r="3" fill="#f59e0b"/>
    <text x="0" y="105" text-anchor="middle" font-size="10" fill="#64748b">Wet cotton</text>
    <text x="0" y="118" text-anchor="middle" font-size="10" fill="#64748b">Room temp</text>
  </g>
  
  <!-- Setup M: Water + warmth + oxygen -->
  <g transform="translate(250, 50)">
    <text x="0" y="-5" text-anchor="middle" font-size="12" font-weight="bold" fill="#16a34a">Setup M</text>
    <rect x="-30" y="5" width="60" height="80" rx="3" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
    <ellipse cx="0" cy="30" rx="15" ry="8" fill="#6ee7b7" stroke="#059669" stroke-width="1"/>
    <circle cx="-5" cy="28" r="3" fill="#f59e0b"/>
    <circle cx="5" cy="32" r="3" fill="#f59e0b"/>
    <text x="0" y="105" text-anchor="middle" font-size="10" fill="#64748b">Wet cotton</text>
    <text x="0" y="118" text-anchor="middle" font-size="10" fill="#64748b">Room temp</text>
    <text x="0" y="131" text-anchor="middle" font-size="10" fill="#64748b">Open air</text>
  </g>
  
  <!-- Setup N: Water but cold -->
  <g transform="translate(350, 50)">
    <text x="0" y="-5" text-anchor="middle" font-size="12" font-weight="bold" fill="#ef4444">Setup N</text>
    <rect x="-30" y="5" width="60" height="80" rx="3" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
    <ellipse cx="0" cy="30" rx="15" ry="8" fill="#6ee7b7" stroke="#059669" stroke-width="1"/>
    <circle cx="-5" cy="28" r="3" fill="#f59e0b"/>
    <circle cx="5" cy="32" r="3" fill="#f59e0b"/>
    <circle cx="-20" cy="40" r="2" fill="#93c5fd" opacity="0.6"/>
    <circle cx="-15" cy="55" r="2" fill="#93c5fd" opacity="0.6"/>
    <circle cx="15" cy="45" r="2" fill="#93c5fd" opacity="0.6"/>
    <text x="0" y="105" text-anchor="middle" font-size="10" fill="#64748b">Wet cotton</text>
    <text x="0" y="118" text-anchor="middle" font-size="10" fill="#64748b">Refrigerator</text>
  </g>
  
  <!-- Legend -->
  <text x="200" y="180" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e293b">Germination Requirements:</text>
  <text x="200" y="200" text-anchor="middle" font-size="10" fill="#16a34a">✓ Water  ✓ Warmth  ✓ Oxygen</text>
  <text x="200" y="220" text-anchor="middle" font-size="10" fill="#64748b">Seeds need all three to germinate</text>
</svg>''')

# SCI934: Life cycle duration graph
fix('SCI934', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 260" width="380" font-family="Arial,sans-serif">
  <text x="190" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Life Cycle Duration</text>
  
  <!-- Y-axis -->
  <line x1="50" y1="40" x2="50" y2="200" stroke="#64748b" stroke-width="2"/>
  <text x="25" y="125" text-anchor="middle" font-size="11" fill="#64748b" transform="rotate(-90, 25, 125)">Days</text>
  
  <!-- Y-axis labels -->
  <line x1="45" y1="200" x2="50" y2="200" stroke="#64748b" stroke-width="1"/>
  <text x="40" y="204" text-anchor="end" font-size="10" fill="#64748b">0</text>
  <line x1="45" y1="160" x2="50" y2="160" stroke="#64748b" stroke-width="1"/>
  <text x="40" y="164" text-anchor="end" font-size="10" fill="#64748b">2</text>
  <line x1="45" y1="120" x2="50" y2="120" stroke="#64748b" stroke-width="1"/>
  <text x="40" y="124" text-anchor="end" font-size="10" fill="#64748b">4</text>
  <line x1="45" y1="80" x2="50" y2="80" stroke="#64748b" stroke-width="1"/>
  <text x="40" y="84" text-anchor="end" font-size="10" fill="#64748b">6</text>
  <line x1="45" y1="40" x2="50" y2="40" stroke="#64748b" stroke-width="1"/>
  <text x="40" y="44" text-anchor="end" font-size="10" fill="#64748b">8</text>
  
  <!-- X-axis -->
  <line x1="50" y1="200" x2="350" y2="200" stroke="#64748b" stroke-width="2"/>
  <text x="200" y="230" text-anchor="middle" font-size="11" fill="#64748b">Life Cycle Stage</text>
  
  <!-- Bar 1: Egg (1 day) -->
  <rect x="70" y="180" width="50" height="20" fill="#fbbf24" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="95" y="215" text-anchor="middle" font-size="10" fill="#334155">Egg</text>
  <text x="95" y="170" text-anchor="middle" font-size="10" font-weight="bold" fill="#92400e">1</text>
  
  <!-- Bar 2: Larva (4 days) -->
  <rect x="140" y="120" width="50" height="80" fill="#86efac" stroke="#16a34a" stroke-width="1.5"/>
  <text x="165" y="215" text-anchor="middle" font-size="10" fill="#334155">Larva</text>
  <text x="165" y="110" text-anchor="middle" font-size="10" font-weight="bold" fill="#14532d">4</text>
  
  <!-- Bar 3: Pupa (2 days) -->
  <rect x="210" y="160" width="50" height="40" fill="#93c5fd" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="235" y="215" text-anchor="middle" font-size="10" fill="#334155">Pupa</text>
  <text x="235" y="150" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e40af">2</text>
  
  <!-- Bar 4: Adult (7 days) -->
  <rect x="280" y="60" width="50" height="140" fill="#f9a8d4" stroke="#ec4899" stroke-width="1.5"/>
  <text x="305" y="215" text-anchor="middle" font-size="10" fill="#334155">Adult</text>
  <text x="305" y="50" text-anchor="middle" font-size="10" font-weight="bold" fill="#9f1239">7</text>
  
  <!-- Day 6 marker -->
  <line x1="60" y1="80" x2="340" y2="80" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="340" y="75" text-anchor="end" font-size="9" fill="#ef4444" font-weight="bold">Day 6</text>
</svg>''')

# SCI935: Inherited traits visual
fix('SCI935', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 200" width="380" font-family="Arial,sans-serif">
  <text x="190" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Inherited vs Acquired Traits</text>
  
  <!-- Inherited traits -->
  <rect x="10" y="35" width="170" height="155" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
  <text x="95" y="55" text-anchor="middle" font-size="13" font-weight="bold" fill="#14532d">INHERITED ✓</text>
  <text x="95" y="70" text-anchor="middle" font-size="9" fill="#64748b">(from parents)</text>
  
  <!-- Trait B: Eye colour -->
  <circle cx="95" cy="100" r="20" fill="#3b82f6" stroke="#1e40af" stroke-width="2"/>
  <circle cx="90" cy="97" r="6" fill="#1e293b"/>
  <circle cx="100" cy="97" r="6" fill="#1e293b"/>
  <text x="95" y="135" text-anchor="middle" font-size="10" font-weight="bold" fill="#14532d">B: Eye Colour</text>
  
  <!-- Trait C: Tongue rolling -->
  <path d="M75,150 Q95,160 115,150" stroke="#ec4899" stroke-width="2.5" fill="none"/>
  <path d="M80,152 Q95,157 110,152" stroke="#f9a8d4" stroke-width="1.5" fill="none"/>
  <text x="95" y="175" text-anchor="middle" font-size="10" font-weight="bold" fill="#14532d">C: Tongue Rolling</text>
  
  <!-- Trait D: Earlobes -->
  <ellipse cx="95" cy="165" rx="8" ry="12" fill="#fbbf24" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="145" y="175" text-anchor="middle" font-size="10" font-weight="bold" fill="#14532d">D: Earlobes</text>
  
  <!-- Acquired traits -->
  <rect x="200" y="35" width="170" height="155" rx="8" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/>
  <text x="285" y="55" text-anchor="middle" font-size="13" font-weight="bold" fill="#991b1b">ACQUIRED ✗</text>
  <text x="285" y="70" text-anchor="middle" font-size="9" fill="#64748b">(not genetic)</text>
  
  <!-- Hair length illustration -->
  <circle cx="285" cy="110" r="18" fill="#fbbf24" stroke="#f59e0b" stroke-width="2"/>
  <line x1="267" y1="125" x2="267" y2="145" stroke="#78716c" stroke-width="3"/>
  <line x1="275" y1="125" x2="275" y2="165" stroke="#78716c" stroke-width="3"/>
  <line x1="285" y1="125" x2="285" y2="155" stroke="#78716c" stroke-width="3"/>
  <line x1="295" y1="125" x2="295" y2="145" stroke="#78716c" stroke-width="3"/>
  <line x1="303" y1="125" x2="303" y2="135" stroke="#78716c" stroke-width="3"/>
  <text x="285" y="180" text-anchor="middle" font-size="10" font-weight="bold" fill="#991b1b">A: Hair Length</text>
  <text x="285" y="193" text-anchor="middle" font-size="9" fill="#64748b">(can be cut/changed)</text>
</svg>''')

# SCI936: Plant development processes
fix('SCI936', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 180" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Plant Development</text>
  
  <!-- Flower -->
  <g transform="translate(60, 90)">
    <ellipse cx="0" cy="-15" rx="8" ry="12" fill="#f9a8d4" stroke="#ec4899" stroke-width="1.5"/>
    <ellipse cx="-10" cy="-10" rx="8" ry="12" fill="#f9a8d4" stroke="#ec4899" stroke-width="1.5" transform="rotate(-45 -10 -10)"/>
    <ellipse cx="10" cy="-10" rx="8" ry="12" fill="#f9a8d4" stroke="#ec4899" stroke-width="1.5" transform="rotate(45 10 -10)"/>
    <circle cx="0" cy="-10" r="5" fill="#fbbf24" stroke="#f59e0b" stroke-width="1"/>
    <line x1="0" y1="-5" x2="0" y2="15" stroke="#15803d" stroke-width="2"/>
    <text x="0" y="35" text-anchor="middle" font-size="11" font-weight="bold" fill="#14532d">Flower</text>
  </g>
  
  <!-- Process P arrow -->
  <line x1="90" y1="90" x2="140" y2="90" stroke="#3b82f6" stroke-width="2.5"/>
  <polygon points="138,85 148,90 138,95" fill="#3b82f6"/>
  <text x="119" y="75" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af">P</text>
  <text x="119" y="110" text-anchor="middle" font-size="9" fill="#64748b">Pollination +</text>
  <text x="119" y="120" text-anchor="middle" font-size="9" fill="#64748b">Fertilisation</text>
  
  <!-- Seed/Fruit -->
  <g transform="translate(200, 90)">
    <ellipse cx="0" cy="0" rx="18" ry="22" fill="#fbbf24" stroke="#f59e0b" stroke-width="2"/>
    <circle cx="0" cy="-5" r="6" fill="#92400e"/>
    <circle cx="0" cy="5" r="6" fill="#92400e"/>
    <text x="0" y="35" text-anchor="middle" font-size="11" font-weight="bold" fill="#14532d">Seed</text>
  </g>
  
  <!-- Process Q arrow -->
  <line x1="230" y1="90" x2="280" y2="90" stroke="#16a34a" stroke-width="2.5"/>
  <polygon points="278,85 288,90 278,95" fill="#16a34a"/>
  <text x="259" y="75" text-anchor="middle" font-size="12" font-weight="bold" fill="#15803d">Q</text>
  <text x="259" y="110" text-anchor="middle" font-size="9" fill="#64748b">Dispersal</text>
  
  <!-- Young plant -->
  <g transform="translate(340, 90)">
    <line x1="0" y1="10" x2="0" y2="-20" stroke="#15803d" stroke-width="2"/>
    <ellipse cx="-6" cy="-10" rx="8" ry="4" fill="#86efac" stroke="#15803d" stroke-width="1"/>
    <ellipse cx="6" cy="-10" rx="8" ry="4" fill="#86efac" stroke="#15803d" stroke-width="1"/>
    <ellipse cx="0" cy="10" rx="10" ry="6" fill="#d97706" stroke="#92400e" stroke-width="1"/>
    <text x="0" y="35" text-anchor="middle" font-size="11" font-weight="bold" fill="#14532d">Seedling</text>
  </g>
</svg>''')

# SCI937: Volume of undigested food graph
fix('SCI937', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Volume of Undigested Food</text>
  
  <!-- Y-axis -->
  <line x1="50" y1="40" x2="50" y2="200" stroke="#64748b" stroke-width="2"/>
  <text x="20" y="120" text-anchor="middle" font-size="10" fill="#64748b" transform="rotate(-90, 20, 120)">Volume (ml)</text>
  
  <!-- Y-axis labels -->
  <line x1="45" y1="200" x2="50" y2="200" stroke="#64748b" stroke-width="1"/>
  <text x="40" y="204" text-anchor="end" font-size="9" fill="#64748b">0</text>
  <line x1="45" y1="160" x2="50" y2="160" stroke="#64748b" stroke-width="1"/>
  <text x="40" y="164" text-anchor="end" font-size="9" fill="#64748b">50</text>
  <line x1="45" y1="120" x2="50" y2="120" stroke="#64748b" stroke-width="1"/>
  <text x="40" y="124" text-anchor="end" font-size="9" fill="#64748b">100</text>
  <line x1="45" y1="80" x2="50" y2="80" stroke="#64748b" stroke-width="1"/>
  <text x="40" y="84" text-anchor="end" font-size="9" fill="#64748b">150</text>
  <line x1="45" y1="40" x2="50" y2="40" stroke="#64748b" stroke-width="1"/>
  <text x="40" y="44" text-anchor="end" font-size="9" fill="#64748b">200</text>
  
  <!-- X-axis -->
  <line x1="50" y1="200" x2="370" y2="200" stroke="#64748b" stroke-width="2"/>
  
  <!-- Path showing decrease -->
  <path d="M 70,60 L 150,90 L 230,140 L 310,175" stroke="#3b82f6" stroke-width="3" fill="none"/>
  <circle cx="70" cy="60" r="5" fill="#3b82f6"/>
  <circle cx="150" cy="90" r="5" fill="#16a34a"/>
  <circle cx="230" cy="140" r="5" fill="#f59e0b"/>
  <circle cx="310" cy="175" r="5" fill="#ef4444"/>
  
  <!-- Labels -->
  <text x="70" y="220" text-anchor="middle" font-size="10" fill="#3b82f6" font-weight="bold">Entering A</text>
  <text x="70" y="233" text-anchor="middle" font-size="9" fill="#64748b">(Mouth)</text>
  
  <text x="150" y="220" text-anchor="middle" font-size="10" fill="#16a34a" font-weight="bold">Leaving A</text>
  
  <text x="230" y="220" text-anchor="middle" font-size="10" fill="#f59e0b" font-weight="bold">Leaving B</text>
  <text x="230" y="233" text-anchor="middle" font-size="9" fill="#64748b">(Stomach)</text>
  
  <text x="310" y="220" text-anchor="middle" font-size="10" fill="#ef4444" font-weight="bold">Leaving C</text>
  <text x="310" y="233" text-anchor="middle" font-size="9" fill="#64748b">(Sm. Intestine)</text>
</svg>''')

# SCI938: Plant with cut tubes
fix('SCI938', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 280" width="300" font-family="Arial,sans-serif">
  <text x="150" y="16" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Plant Tubes Cut</text>
  
  <!-- Main stem -->
  <line x1="150" y1="260" x2="150" y2="80" stroke="#15803d" stroke-width="8"/>
  
  <!-- Cut at Y (lower) -->
  <rect x="130" y="190" width="40" height="8" fill="#ef4444" stroke="#991b1b" stroke-width="1.5"/>
  <text x="180" y="197" font-size="11" font-weight="bold" fill="#991b1b">Y</text>
  <line x1="120" y1="194" x2="180" y2="194" stroke="#ef4444" stroke-width="2" stroke-dasharray="3,2"/>
  
  <!-- Branch to Leaf Q (right, withered) -->
  <line x1="150" y1="160" x2="220" y2="120" stroke="#15803d" stroke-width="5"/>
  <ellipse cx="240" cy="110" rx="30" ry="20" fill="#d4d4a8" stroke="#a3a380" stroke-width="2"/>
  <text x="240" y="113" text-anchor="middle" font-size="12" font-weight="bold" fill="#78716c">Leaf Q</text>
  <text x="240" y="95" text-anchor="middle" font-size="9" fill="#991b1b">(withered)</text>
  
  <!-- Cut at X (upper) -->
  <rect x="130" y="130" width="40" height="8" fill="#f59e0b" stroke="#92400e" stroke-width="1.5"/>
  <text x="115" y="137" font-size="11" font-weight="bold" fill="#92400e">X</text>
  <line x1="120" y1="134" x2="180" y2="134" stroke="#f59e0b" stroke-width="2" stroke-dasharray="3,2"/>
  
  <!-- Branch to Leaf P (left, healthy) -->
  <line x1="150" y1="100" x2="80" y2="60" stroke="#15803d" stroke-width="5"/>
  <ellipse cx="60" cy="50" rx="30" ry="20" fill="#86efac" stroke="#15803d" stroke-width="2"/>
  <text x="60" y="53" text-anchor="middle" font-size="12" font-weight="bold" fill="#14532d">Leaf P</text>
  <text x="60" y="35" text-anchor="middle" font-size="9" fill="#16a34a">(healthy)</text>
  
  <!-- Root system -->
  <path d="M150,260 Q140,270 135,275" stroke="#78716c" stroke-width="3" fill="none"/>
  <path d="M150,260 Q160,270 165,275" stroke="#78716c" stroke-width="3" fill="none"/>
  <path d="M150,265 Q145,272 142,277" stroke="#78716c" stroke-width="2" fill="none"/>
  <path d="M150,265 Q155,272 158,277" stroke="#78716c" stroke-width="2" fill="none"/>
</svg>''')

# SCI939: Two iron cylinders
fix('SCI939', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 200" width="350" font-family="Arial,sans-serif">
  <text x="175" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Iron Cylinders at 100°C</text>
  
  <!-- Cylinder A (smaller) -->
  <g transform="translate(90, 90)">
    <!-- Top ellipse -->
    <ellipse cx="0" cy="0" rx="35" ry="12" fill="#94a3b8" stroke="#475569" stroke-width="2"/>
    <!-- Side -->
    <rect x="-35" y="0" width="70" height="80" fill="#cbd5e1" stroke="#475569" stroke-width="2"/>
    <!-- Bottom ellipse -->
    <ellipse cx="0" cy="80" rx="35" ry="12" fill="#64748b" stroke="#475569" stroke-width="2"/>
    <!-- Label -->
    <text x="0" y="45" text-anchor="middle" font-size="20" font-weight="bold" fill="#1e293b">A</text>
    <text x="0" y="110" text-anchor="middle" font-size="11" font-weight="bold" fill="#3b82f6">Cylinder A</text>
    <text x="0" y="125" text-anchor="middle" font-size="10" fill="#64748b">Temperature: 100°C</text>
    <text x="0" y="138" text-anchor="middle" font-size="10" fill="#64748b">Volume: Small</text>
  </g>
  
  <!-- Cylinder B (larger) -->
  <g transform="translate(250, 70)">
    <!-- Top ellipse -->
    <ellipse cx="0" cy="0" rx="45" ry="15" fill="#94a3b8" stroke="#475569" stroke-width="2"/>
    <!-- Side -->
    <rect x="-45" y="0" width="90" height="100" fill="#cbd5e1" stroke="#475569" stroke-width="2"/>
    <!-- Bottom ellipse -->
    <ellipse cx="0" cy="100" rx="45" ry="15" fill="#64748b" stroke="#475569" stroke-width="2"/>
    <!-- Label -->
    <text x="0" y="55" text-anchor="middle" font-size="20" font-weight="bold" fill="#1e293b">B</text>
    <text x="0" y="130" text-anchor="middle" font-size="11" font-weight="bold" fill="#ef4444">Cylinder B</text>
    <text x="0" y="145" text-anchor="middle" font-size="10" fill="#64748b">Temperature: 100°C</text>
    <text x="0" y="158" text-anchor="middle" font-size="10" fill="#64748b">Volume: Large</text>
  </g>
  
  <!-- Heat comparison -->
  <text x="175" y="185" text-anchor="middle" font-size="10" fill="#64748b">Same temperature, but B has MORE heat energy</text>
</svg>''')

# SCI940: Ecosystem with populations
fix('SCI940', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260" width="400" font-family="Arial,sans-serif">
  <text x="200" y="16" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Ecosystem Populations</text>
  
  <!-- Water -->
  <rect x="10" y="180" width="380" height="70" fill="#bfdbfe" stroke="#3b82f6" stroke-width="2" rx="5"/>
  <text x="200" y="200" text-anchor="middle" font-size="10" fill="#1e40af">Water</text>
  
  <!-- Land -->
  <ellipse cx="200" cy="180" rx="180" ry="30" fill="#d1fae5" stroke="#16a34a" stroke-width="2"/>
  <text x="200" y="185" text-anchor="middle" font-size="10" fill="#14532d">Land</text>
  
  <!-- Population 1: Tadpoles (in water) -->
  <g transform="translate(80, 220)">
    <ellipse cx="0" cy="0" rx="8" ry="5" fill="#15803d"/>
    <path d="M8,0 Q15,3 20,1" stroke="#15803d" stroke-width="2" fill="none"/>
    <circle cx="80" cy="0" r="8" fill="#15803d"/>
    <path d="M88,0 Q95,3 100,1" stroke="#15803d" stroke-width="2" fill="none"/>
  </g>
  <text x="130" y="238" text-anchor="middle" font-size="9" fill="#14532d">Tadpoles</text>
  
  <!-- Population 1: Frogs (on land/water) -->
  <g transform="translate(120, 150)">
    <ellipse cx="0" cy="0" rx="12" ry="8" fill="#16a34a" stroke="#15803d" stroke-width="1.5"/>
    <circle cx="-4" cy="-3" r="2" fill="#1e293b"/>
    <circle cx="4" cy="-3" r="2" fill="#1e293b"/>
  </g>
  <text x="120" y="170" text-anchor="middle" font-size="9" fill="#14532d">Frog</text>
  
  <!-- Population 2: Fish (in water) -->
  <g transform="translate(280, 220)">
    <ellipse cx="0" cy="0" rx="15" ry="8" fill="#3b82f6" stroke="#1e40af" stroke-width="1.5"/>
    <polygon points="12,0 20,-4 20,4" fill="#60a5fa"/>
    <circle cx="-5" cy="-2" r="1.5" fill="#1e293b"/>
  </g>
  <text x="280" y="240" text-anchor="middle" font-size="9" fill="#1e40af">Fish</text>
  
  <!-- Population 3: Caterpillars (on land) -->
  <g transform="translate(250, 155)">
    <ellipse cx="0" cy="0" rx="4" ry="3" fill="#16a34a"/>
    <ellipse cx="5" cy="0" rx="4" ry="3" fill="#16a34a"/>
    <ellipse cx="10" cy="0" rx="4" ry="3" fill="#16a34a"/>
  </g>
  <text x="255" y="145" text-anchor="middle" font-size="9" fill="#14532d">Caterpillar</text>
  
  <!-- Population 3: Butterflies (in air) -->
  <g transform="translate(200, 80)">
    <ellipse cx="-5" cy="0" rx="8" ry="12" fill="#f9a8d4" stroke="#ec4899" stroke-width="1" transform="rotate(-20 -5 0)"/>
    <ellipse cx="5" cy="0" rx="8" ry="12" fill="#f9a8d4" stroke="#ec4899" stroke-width="1" transform="rotate(20 5 0)"/>
    <ellipse cx="0" cy="0" rx="3" ry="8" fill="#1e293b"/>
  </g>
  <text x="200" y="65" text-anchor="middle" font-size="9" fill="#9f1239">Butterfly</text>
  
  <!-- Plants -->
  <g transform="translate(50, 150)">
    <line x1="0" y1="20" x2="0" y2="0" stroke="#15803d" stroke-width="2"/>
    <ellipse cx="-5" cy="5" rx="6" ry="3" fill="#86efac" stroke="#15803d" stroke-width="1"/>
    <ellipse cx="5" cy="5" rx="6" ry="3" fill="#86efac" stroke="#15803d" stroke-width="1"/>
  </g>
  <g transform="translate(320, 155)">
    <line x1="0" y1="20" x2="0" y2="0" stroke="#15803d" stroke-width="2"/>
    <ellipse cx="-5" cy="5" rx="6" ry="3" fill="#86efac" stroke="#15803d" stroke-width="1"/>
    <ellipse cx="5" cy="5" rx="6" ry="3" fill="#86efac" stroke="#15803d" stroke-width="1"/>
  </g>
  <text x="50" y="180" text-anchor="middle" font-size="9" fill="#14532d">Plants</text>
</svg>''')

# SCI941: Plant P area coverage graph
fix('SCI941', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 240" width="380" font-family="Arial,sans-serif">
  <text x="190" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Area Covered by Plant P</text>
  
  <!-- Y-axis -->
  <line x1="50" y1="40" x2="50" y2="190" stroke="#64748b" stroke-width="2"/>
  <text x="20" y="115" text-anchor="middle" font-size="10" fill="#64748b" transform="rotate(-90, 20, 115)">Area (m²)</text>
  
  <!-- Y-axis labels -->
  <line x1="45" y1="190" x2="50" y2="190" stroke="#64748b" stroke-width="1"/>
  <text x="40" y="194" text-anchor="end" font-size="9" fill="#64748b">0</text>
  <line x1="45" y1="140" x2="50" y2="140" stroke="#64748b" stroke-width="1"/>
  <text x="40" y="144" text-anchor="end" font-size="9" fill="#64748b">50</text>
  <line x1="45" y1="90" x2="50" y2="90" stroke="#64748b" stroke-width="1"/>
  <text x="40" y="94" text-anchor="end" font-size="9" fill="#64748b">100</text>
  <line x1="45" y1="40" x2="50" y2="40" stroke="#64748b" stroke-width="1"/>
  <text x="40" y="44" text-anchor="end" font-size="9" fill="#64748b">150</text>
  
  <!-- X-axis -->
  <line x1="50" y1="190" x2="350" y2="190" stroke="#64748b" stroke-width="2"/>
  <text x="200" y="220" text-anchor="middle" font-size="11" fill="#64748b">Week</text>
  
  <!-- X-axis labels -->
  <text x="80" y="208" text-anchor="middle" font-size="9" fill="#64748b">1</text>
  <text x="130" y="208" text-anchor="middle" font-size="9" fill="#64748b">2</text>
  <text x="180" y="208" text-anchor="middle" font-size="9" fill="#64748b">3</text>
  <text x="230" y="208" text-anchor="middle" font-size="9" fill="#64748b">4</text>
  <text x="280" y="208" text-anchor="middle" font-size="9" fill="#64748b">5</text>
  <text x="330" y="208" text-anchor="middle" font-size="9" fill="#64748b">6</text>
  
  <!-- Graph line: decrease then increase from week 3 -->
  <path d="M 80,90 L 130,110 L 180,140 L 230,120 L 280,80 L 330,50" 
        stroke="#16a34a" stroke-width="3" fill="none"/>
  
  <!-- Data points -->
  <circle cx="80" cy="90" r="4" fill="#16a34a"/>
  <circle cx="130" cy="110" r="4" fill="#16a34a"/>
  <circle cx="180" cy="140" r="4" fill="#ef4444"/>
  <circle cx="230" cy="120" r="4" fill="#16a34a"/>
  <circle cx="280" cy="80" r="4" fill="#16a34a"/>
  <circle cx="330" cy="50" r="4" fill="#16a34a"/>
  
  <!-- Vertical line at week 3 -->
  <line x1="180" y1="40" x2="180" y2="190" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="180" y="35" text-anchor="middle" font-size="9" fill="#ef4444" font-weight="bold">Week 3: Change begins</text>
</svg>''')

# SCI942: Tank experiment with organisms
fix('SCI942', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Tank Experiment - Population Changes</text>
  
  <!-- Tank 1 -->
  <rect x="20" y="40" width="160" height="150" rx="5" fill="#e0f2fe" stroke="#3b82f6" stroke-width="2"/>
  <text x="100" y="60" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e40af">Tank 1</text>
  
  <!-- Organism X in Tank 1 (decreased) -->
  <g transform="translate(60, 100)">
    <circle cx="0" cy="0" r="8" fill="#fbbf24" opacity="0.5"/>
    <text x="0" y="4" text-anchor="middle" font-size="10" font-weight="bold" fill="#92400e">X</text>
  </g>
  <text x="60" y="125" text-anchor="middle" font-size="9" fill="#ef4444">↓ decreased</text>
  
  <!-- Organism Y in Tank 1 (increased) -->
  <g transform="translate(140, 100)">
    <circle cx="-15" cy="-10" r="10" fill="#86efac"/>
    <circle cx="0" cy="0" r="10" fill="#86efac"/>
    <circle cx="15" cy="-10" r="10" fill="#86efac"/>
    <text x="0" y="5" text-anchor="middle" font-size="10" font-weight="bold" fill="#14532d">Y</text>
  </g>
  <text x="140" y="125" text-anchor="middle" font-size="9" fill="#16a34a">↑ increased</text>
  
  <text x="100" y="175" text-anchor="middle" font-size="10" fill="#64748b">Y eats X</text>
  
  <!-- Tank 2 -->
  <rect x="220" y="40" width="160" height="150" rx="5" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <text x="300" y="60" text-anchor="middle" font-size="13" font-weight="bold" fill="#92400e">Tank 2</text>
  
  <!-- Organism Y in Tank 2 (decreased) -->
  <g transform="translate(260, 100)">
    <circle cx="0" cy="0" r="8" fill="#86efac" opacity="0.5"/>
    <text x="0" y="4" text-anchor="middle" font-size="10" font-weight="bold" fill="#14532d">Y</text>
  </g>
  <text x="260" y="125" text-anchor="middle" font-size="9" fill="#ef4444">↓ decreased</text>
  
  <!-- Organism Z in Tank 2 (increased) -->
  <g transform="translate(340, 100)">
    <circle cx="-15" cy="-10" r="10" fill="#f9a8d4"/>
    <circle cx="0" cy="0" r="10" fill="#f9a8d4"/>
    <circle cx="15" cy="-10" r="10" fill="#f9a8d4"/>
    <text x="0" y="5" text-anchor="middle" font-size="10" font-weight="bold" fill="#9f1239">Z</text>
  </g>
  <text x="340" y="125" text-anchor="middle" font-size="9" fill="#16a34a">↑ increased</text>
  
  <text x="300" y="175" text-anchor="middle" font-size="10" fill="#64748b">Z eats Y</text>
  
  <!-- Food chain -->
  <text x="200" y="215" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Food Chain: X → Y → Z</text>
</svg>''')

# SCI943: Soil experiment setup
fix('SCI943', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 220" width="380" font-family="Arial,sans-serif">
  <text x="190" y="16" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Soil Water Retention Experiment</text>
  
  <!-- Soil A (fastest drainage) -->
  <g transform="translate(70, 50)">
    <text x="0" y="-5" text-anchor="middle" font-size="12" font-weight="bold" fill="#3b82f6">Soil A</text>
    <!-- Funnel -->
    <path d="M-25,10 L-15,50 L15,50 L25,10 Z" fill="#e0f2fe" stroke="#3b82f6" stroke-width="2"/>
    <!-- Soil -->
    <rect x="-15" y="15" width="30" height="25" fill="#d4d4a8" stroke="#a3a380" stroke-width="1"/>
    <!-- Measuring cylinder -->
    <rect x="-10" y="55" width="20" height="50" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5"/>
    <rect x="-10" y="85" width="20" height="20" fill="#60a5fa"/>
    <line x1="-10" y1="85" x2="10" y2="85" stroke="#1e40af" stroke-width="1"/>
    <text x="0" y="82" text-anchor="middle" font-size="8" fill="#1e293b">20ml</text>
    <!-- Time -->
    <text x="0" y="125" text-anchor="middle" font-size="10" font-weight="bold" fill="#16a34a">20s</text>
    <text x="0" y="138" text-anchor="middle" font-size="9" fill="#64748b">Fast drainage</text>
  </g>
  
  <!-- Soil B (slowest drainage) -->
  <g transform="translate(190, 50)">
    <text x="0" y="-5" text-anchor="middle" font-size="12" font-weight="bold" fill="#ef4444">Soil B</text>
    <!-- Funnel -->
    <path d="M-25,10 L-15,50 L15,50 L25,10 Z" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/>
    <!-- Soil -->
    <rect x="-15" y="15" width="30" height="25" fill="#78716c" stroke="#57534e" stroke-width="1"/>
    <!-- Measuring cylinder -->
    <rect x="-10" y="55" width="20" height="50" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
    <rect x="-10" y="85" width="20" height="20" fill="#fbbf24"/>
    <line x1="-10" y1="85" x2="10" y2="85" stroke="#92400e" stroke-width="1"/>
    <text x="0" y="82" text-anchor="middle" font-size="8" fill="#1e293b">20ml</text>
    <!-- Time -->
    <text x="0" y="125" text-anchor="middle" font-size="10" font-weight="bold" fill="#ef4444">120s</text>
    <text x="0" y="138" text-anchor="middle" font-size="9" fill="#64748b">Slow drainage</text>
    <text x="0" y="151" text-anchor="middle" font-size="9" fill="#64748b">Retains water</text>
  </g>
  
  <!-- Soil C (medium drainage) -->
  <g transform="translate(310, 50)">
    <text x="0" y="-5" text-anchor="middle" font-size="12" font-weight="bold" fill="#f59e0b">Soil C</text>
    <!-- Funnel -->
    <path d="M-25,10 L-15,50 L15,50 L25,10 Z" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
    <!-- Soil -->
    <rect x="-15" y="15" width="30" height="25" fill="#a8a29e" stroke="#78716c" stroke-width="1"/>
    <!-- Measuring cylinder -->
    <rect x="-10" y="55" width="20" height="50" fill="#e0f2fe" stroke="#3b82f6" stroke-width="1.5"/>
    <rect x="-10" y="85" width="20" height="20" fill="#93c5fd"/>
    <line x1="-10" y1="85" x2="10" y2="85" stroke="#1e40af" stroke-width="1"/>
    <text x="0" y="82" text-anchor="middle" font-size="8" fill="#1e293b">20ml</text>
    <!-- Time -->
    <text x="0" y="125" text-anchor="middle" font-size="10" font-weight="bold" fill="#f59e0b">75s</text>
    <text x="0" y="138" text-anchor="middle" font-size="9" fill="#64748b">Medium drainage</text>
  </g>
  
  <!-- Summary -->
  <text x="190" y="180" text-anchor="middle" font-size="10" fill="#64748b">Faster drainage = larger particles = less water retention</text>
  <text x="190" y="195" text-anchor="middle" font-size="10" fill="#64748b">Slower drainage = smaller particles = more water retention</text>
</svg>''')

# SCI944: Caterpillar with ants protection
fix('SCI944', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 220" width="400" font-family="Arial,sans-serif">
  <text x="200" y="16" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Caterpillar-Ant Relationship</text>
  
  <!-- Leaf -->
  <ellipse cx="200" cy="130" rx="80" ry="50" fill="#86efac" stroke="#15803d" stroke-width="2"/>
  
  <!-- Caterpillar body -->
  <g transform="translate(200, 120)">
    <circle cx="-30" cy="0" r="12" fill="#bbf7d0" stroke="#15803d" stroke-width="2"/>
    <circle cx="-15" cy="0" r="13" fill="#bbf7d0" stroke="#15803d" stroke-width="2"/>
    <circle cx="0" cy="0" r="14" fill="#bbf7d0" stroke="#15803d" stroke-width="2"/>
    <circle cx="15" cy="0" r="13" fill="#bbf7d0" stroke="#15803d" stroke-width="2"/>
    <circle cx="30" cy="0" r="12" fill="#bbf7d0" stroke="#15803d" stroke-width="2"/>
    <!-- Head -->
    <circle cx="-42" cy="0" r="10" fill="#16a34a" stroke="#15803d" stroke-width="2"/>
    <circle cx="-45" cy="-2" r="2" fill="#1e293b"/>
    <circle cx="-39" cy="-2" r="2" fill="#1e293b"/>
  </g>
  
  <!-- Nectar drops -->
  <circle cx="185" cy="120" r="3" fill="#fbbf24" stroke="#f59e0b" stroke-width="1"/>
  <circle cx="200" cy="118" r="3" fill="#fbbf24" stroke="#f59e0b" stroke-width="1"/>
  <circle cx="215" cy="120" r="3" fill="#fbbf24" stroke="#f59e0b" stroke-width="1"/>
  
  <!-- Ants on caterpillar -->
  <g transform="translate(175, 115)">
    <ellipse cx="0" cy="0" rx="4" ry="3" fill="#1e293b"/>
    <circle cx="-2" cy="-2" r="2.5" fill="#1e293b"/>
    <line x1="-4" y1="-1" x2="-7" y2="-3" stroke="#1e293b" stroke-width="1"/>
    <line x1="4" y1="-1" x2="7" y2="-3" stroke="#1e293b" stroke-width="1"/>
  </g>
  
  <g transform="translate(200, 110)">
    <ellipse cx="0" cy="0" rx="4" ry="3" fill="#1e293b"/>
    <circle cx="-2" cy="-2" r="2.5" fill="#1e293b"/>
    <line x1="-4" y1="-1" x2="-7" y2="-3" stroke="#1e293b" stroke-width="1"/>
    <line x1="4" y1="-1" x2="7" y2="-3" stroke="#1e293b" stroke-width="1"/>
  </g>
  
  <g transform="translate(225, 115)">
    <ellipse cx="0" cy="0" rx="4" ry="3" fill="#1e293b"/>
    <circle cx="-2" cy="-2" r="2.5" fill="#1e293b"/>
    <line x1="-4" y1="-1" x2="-7" y2="-3" stroke="#1e293b" stroke-width="1"/>
    <line x1="4" y1="-1" x2="7" y2="-3" stroke="#1e293b" stroke-width="1"/>
  </g>
  
  <!-- Labels and annotations -->
  <text x="200" y="50" text-anchor="middle" font-size="11" fill="#1e293b">Fierce Ants P</text>
  <text x="200" y="63" text-anchor="middle" font-size="9" fill="#64748b">(poisonous & bitter)</text>
  
  <line x1="200" y1="70" x2="200" y2="100" stroke="#ef4444" stroke-width="1.5" marker-end="url(#arrowhead)"/>
  
  <rect x="50" y="170" width="300" height="40" rx="5" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="200" y="185" text-anchor="middle" font-size="10" fill="#92400e">Caterpillar releases nectar → Attracts Ants P</text>
  <text x="200" y="200" text-anchor="middle" font-size="10" fill="#92400e">Ants protect slow-moving caterpillar from predators</text>
  
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#ef4444"/>
    </marker>
  </defs>
</svg>''')

# SCI945: Deforestation effects
fix('SCI945', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Effects of Deforestation</text>
  
  <!-- Central concept -->
  <rect x="130" y="40" width="140" height="45" rx="8" fill="#fee2e2" stroke="#ef4444" stroke-width="3"/>
  <text x="200" y="60" text-anchor="middle" font-size="13" font-weight="bold" fill="#991b1b">DEFORESTATION</text>
  <text x="200" y="75" text-anchor="middle" font-size="10" fill="#64748b">(Cutting down trees)</text>
  
  <!-- Effect A: Soil erosion -->
  <rect x="20" y="120" width="150" height="60" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
  <text x="95" y="138" text-anchor="middle" font-size="11" font-weight="bold" fill="#14532d">A: Soil Erosion ✓</text>
  <text x="95" y="152" text-anchor="middle" font-size="9" fill="#64748b">Tree roots hold soil</text>
  <text x="95" y="165" text-anchor="middle" font-size="9" fill="#64748b">No trees = soil washes away</text>
  <line x1="170" y1="85" x2="130" y2="120" stroke="#16a34a" stroke-width="2" marker-end="url(#arrow-green)"/>
  
  <!-- Effect B: Sea level (incorrect) -->
  <rect x="230" y="120" width="150" height="60" rx="6" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/>
  <text x="305" y="138" text-anchor="middle" font-size="11" font-weight="bold" fill="#991b1b">B: Drop in Sea Level ✗</text>
  <text x="305" y="152" text-anchor="middle" font-size="9" fill="#64748b">No connection</text>
  <text x="305" y="165" text-anchor="middle" font-size="9" fill="#64748b">Sea level not affected</text>
  <line x1="230" y1="85" x2="270" y2="120" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,3"/>
  
  <!-- Effect C: Reduced rainfall -->
  <rect x="20" y="200" width="150" height="65" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
  <text x="95" y="218" text-anchor="middle" font-size="11" font-weight="bold" fill="#14532d">C: Reduced Rainfall ✓</text>
  <text x="95" y="232" text-anchor="middle" font-size="9" fill="#64748b">Trees transpire water</text>
  <text x="95" y="245" text-anchor="middle" font-size="9" fill="#64748b">No trees = less water vapor</text>
  <text x="95" y="258" text-anchor="middle" font-size="9" fill="#64748b">= less rain</text>
  <line x1="150" y1="85" x2="95" y2="200" stroke="#16a34a" stroke-width="2" marker-end="url(#arrow-green)"/>
  
  <!-- Effect D: Greenhouse gases (incorrect) -->
  <rect x="230" y="200" width="150" height="65" rx="6" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/>
  <text x="305" y="218" text-anchor="middle" font-size="11" font-weight="bold" fill="#991b1b">D: Less CO₂ ✗</text>
  <text x="305" y="232" text-anchor="middle" font-size="9" fill="#64748b">Actually INCREASES CO₂</text>
  <text x="305" y="245" text-anchor="middle" font-size="9" fill="#64748b">Trees absorb CO₂</text>
  <text x="305" y="258" text-anchor="middle" font-size="9" fill="#64748b">Fewer trees = more CO₂</text>
  <line x1="250" y1="85" x2="305" y2="200" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,3"/>
  
  <defs>
    <marker id="arrow-green" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#16a34a"/>
    </marker>
  </defs>
</svg>''')

with open('data/questions-science-p6.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("✓ Added diagrams to SCI931-945 (15 questions)")
print("  - Animal characteristics table")
print("  - Organism grouping")
print("  - Seed germination setups")
print("  - Life cycle duration graph")
print("  - Inherited traits visual")
print("  - Plant development")
print("  - Digestive system graph")
print("  - Plant tube transport")
print("  - Heat energy comparison")
print("  - Ecosystem populations")
print("  - Plant area graph")
print("  - Food chain experiment")
print("  - Soil retention test")
print("  - Caterpillar-ant symbiosis")
print("  - Deforestation effects")
