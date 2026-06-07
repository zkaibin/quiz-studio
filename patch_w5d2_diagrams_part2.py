import json

with open('data/questions-science-p6.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

idx = {q['id']: i for i, q in enumerate(data)}

def fix(qid, diagram):
    data[idx[qid]]['diagram'] = diagram

# SCI970: Water cycle with evaporation and condensation
fix('SCI970', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="400" font-family="Arial,sans-serif">
  <text x="200" y="16" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Water Cycle</text>
  
  <!-- Sun -->
  <circle cx="60" cy="50" r="20" fill="#fbbf24" stroke="#f59e0b" stroke-width="2"/>
  <line x1="38" y1="28" x2="30" y2="20" stroke="#f59e0b" stroke-width="2"/>
  <line x1="82" y1="28" x2="90" y2="20" stroke="#f59e0b" stroke-width="2"/>
  <line x1="82" y1="72" x2="90" y2="80" stroke="#f59e0b" stroke-width="2"/>
  <line x1="38" y1="72" x2="30" y2="80" stroke="#f59e0b" stroke-width="2"/>
  
  <!-- Cloud -->
  <ellipse cx="280" cy="70" rx="35" ry="20" fill="#cbd5e1" stroke="#64748b" stroke-width="1.5"/>
  <ellipse cx="250" cy="75" rx="28" ry="18" fill="#cbd5e1" stroke="#64748b" stroke-width="1.5"/>
  <ellipse cx="310" cy="75" rx="25" ry="16" fill="#cbd5e1" stroke="#64748b" stroke-width="1.5"/>
  <text x="280" y="68" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Clouds</text>
  
  <!-- Ocean/Water body -->
  <rect x="50" y="180" width="150" height="60" fill="#bfdbfe" stroke="#3b82f6" stroke-width="2" rx="4"/>
  <path d="M60,200 Q75,195 90,200 T120,200 T150,200 T180,200" stroke="#60a5fa" stroke-width="1.5" fill="none"/>
  <path d="M60,215 Q80,210 100,215 T140,215 T180,215" stroke="#60a5fa" stroke-width="1.5" fill="none"/>
  <text x="125" y="230" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af">Ocean</text>
  
  <!-- Process H: Evaporation (heat gained) -->
  <path d="M125,175 L125,110" stroke="#ef4444" stroke-width="2.5" fill="none" stroke-dasharray="5,3"/>
  <polygon points="120,115 125,105 130,115" fill="#ef4444"/>
  <text x="145" y="145" font-size="11" font-weight="bold" fill="#dc2626">Process H</text>
  <text x="145" y="158" font-size="9" fill="#64748b">(Evaporation)</text>
  
  <!-- Process G: Condensation (heat lost) -->
  <path d="M300,95 L300,165" stroke="#3b82f6" stroke-width="2.5" fill="none" stroke-dasharray="5,3"/>
  <polygon points="295,160 300,170 305,160" fill="#3b82f6"/>
  <text x="315" y="130" font-size="11" font-weight="bold" fill="#1d4ed8">Process G</text>
  <text x="315" y="143" font-size="9" fill="#64748b">(Condensation)</text>
  
  <!-- Rain -->
  <line x1="270" y1="170" x2="265" y2="185" stroke="#3b82f6" stroke-width="1.5"/>
  <line x1="280" y1="170" x2="275" y2="185" stroke="#3b82f6" stroke-width="1.5"/>
  <line x1="290" y1="170" x2="285" y2="185" stroke="#3b82f6" stroke-width="1.5"/>
  <line x1="300" y1="170" x2="295" y2="185" stroke="#3b82f6" stroke-width="1.5"/>
  <line x1="310" y1="170" x2="305" y2="185" stroke="#3b82f6" stroke-width="1.5"/>
  
  <!-- Legend -->
  <text x="20" y="265" font-size="10" fill="#64748b">H: Water gains heat (liquid → vapor)</text>
  <text x="20" y="278" font-size="10" fill="#64748b">G: Water vapor loses heat (vapor → liquid)</text>
</svg>''')

# SCI971: Three conical flasks with air pump
fix('SCI971', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 260" width="380" font-family="Arial,sans-serif">
  <text x="190" y="16" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Air Pump System</text>
  
  <!-- Air Pump -->
  <rect x="30" y="40" width="60" height="40" fill="#e2e8f0" stroke="#64748b" stroke-width="2" rx="4"/>
  <rect x="50" y="25" width="20" height="20" fill="#94a3b8" stroke="#64748b" stroke-width="1.5"/>
  <line x1="60" y1="25" x2="60" y2="15" stroke="#64748b" stroke-width="3"/>
  <circle cx="60" cy="12" r="6" fill="#cbd5e1" stroke="#64748b" stroke-width="1.5"/>
  <text x="60" y="63" text-anchor="middle" font-size="11" font-weight="bold" fill="#475569">Pump</text>
  <text x="60" y="95" text-anchor="middle" font-size="9" fill="#64748b">20cm³ per push</text>
  
  <!-- Tubes from pump -->
  <line x1="90" y1="60" x2="120" y2="60" stroke="#64748b" stroke-width="2"/>
  <line x1="120" y1="60" x2="120" y2="120" stroke="#64748b" stroke-width="2"/>
  <line x1="120" y1="120" x2="145" y2="120" stroke="#64748b" stroke-width="2"/>
  <line x1="120" y1="120" x2="120" y2="180" stroke="#64748b" stroke-width="2"/>
  <line x1="120" y1="180" x2="205" y2="180" stroke="#64748b" stroke-width="2"/>
  <line x1="120" y1="180" x2="120" y2="240" stroke="#64748b" stroke-width="2"/>
  <line x1="120" y1="240" x2="265" y2="240" stroke="#64748b" stroke-width="2"/>
  
  <!-- Flask P (empty) -->
  <path d="M145,120 L145,100 L165,90 L185,90 L205,100 L205,120 L205,180 L195,200 L155,200 L145,180 Z" fill="white" stroke="#3b82f6" stroke-width="2"/>
  <text x="175" y="215" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af">Flask P</text>
  <text x="175" y="230" text-anchor="middle" font-size="10" fill="#64748b">200 cm³ air</text>
  
  <!-- Flask Q (with 50cm³ water) -->
  <path d="M205,180 L205,160 L225,150 L245,150 L265,160 L265,180 L265,240 L255,260 L215,260 L205,240 Z" fill="white" stroke="#3b82f6" stroke-width="2"/>
  <rect x="212" y="235" width="46" height="20" fill="#bfdbfe"/>
  <path d="M212,235 Q228,232 240,235 T258,235" stroke="#60a5fa" stroke-width="1" fill="none"/>
  <text x="235" y="228" text-anchor="middle" font-size="10" fill="#64748b">150 cm³</text>
  <text x="235" y="239" text-anchor="middle" font-size="10" fill="#64748b">air</text>
  <text x="235" y="250" text-anchor="middle" font-size="9" fill="#1e40af">50cm³</text>
  <text x="235" y="258" text-anchor="middle" font-size="9" fill="#1e40af">water</text>
  
  <!-- Flask R (with 50cm³ water + 50cm³ block) -->
  <path d="M265,240 L265,220 L285,210 L305,210 L325,220 L325,240 L325,300 L315,320 L275,320 L265,300 Z" fill="white" stroke="#3b82f6" stroke-width="2"/>
  <rect x="272" y="295" width="46" height="20" fill="#bfdbfe"/>
  <path d="M272,295 Q288,292 300,295 T318,295" stroke="#60a5fa" stroke-width="1" fill="none"/>
  <rect x="280" y="275" width="30" height="20" fill="#f59e0b" stroke="#d97706" stroke-width="1.5"/>
  <text x="295" y="288" text-anchor="middle" font-size="8" fill="#fff">Block</text>
  <text x="295" y="268" text-anchor="middle" font-size="10" fill="#64748b">100 cm³ air</text>
  <text x="338" y="280" text-anchor="start" font-size="9" fill="#64748b">50cm³</text>
  <text x="338" y="290" text-anchor="start" font-size="9" fill="#64748b">block</text>
  <text x="338" y="308" text-anchor="start" font-size="9" fill="#64748b">50cm³</text>
  <text x="338" y="318" text-anchor="start" font-size="9" fill="#64748b">water</text>
</svg>''')

# SCI972: Four circuits with bulbs K, L, M, N
fix('SCI972', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" font-family="Arial,sans-serif">
  <text x="200" y="16" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Four Circuits</text>
  
  <!-- Circuit K: 2 bulbs, 1 battery (series) -->
  <text x="75" y="38" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">Circuit K</text>
  <rect x="35" y="45" width="20" height="30" fill="white" stroke="#64748b" stroke-width="2" rx="2"/>
  <line x1="45" y1="41" x2="45" y2="45" stroke="#64748b" stroke-width="1.5"/>
  <line x1="42" y1="75" x2="48" y2="75" stroke="#64748b" stroke-width="1.5"/>
  <circle cx="75" cy="60" r="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
  <line x1="75" y1="52" x2="75" y2="45" stroke="#64748b" stroke-width="1.5"/>
  <line x1="75" y1="68" x2="75" y2="75" stroke="#64748b" stroke-width="1.5"/>
  <circle cx="105" cy="60" r="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
  <line x1="105" y1="52" x2="105" y2="45" stroke="#64748b" stroke-width="1.5"/>
  <line x1="105" y1="68" x2="105" y2="75" stroke="#64748b" stroke-width="1.5"/>
  <line x1="45" y1="45" x2="115" y2="45" stroke="#64748b" stroke-width="1.5"/>
  <line x1="45" y1="75" x2="115" y2="75" stroke="#64748b" stroke-width="1.5"/>
  <text x="75" y="63" text-anchor="middle" font-size="9" fill="#475569">K</text>
  
  <!-- Circuit L: 3 bulbs, 1 battery (series) -->
  <text x="75" y="108" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">Circuit L</text>
  <rect x="20" y="115" width="20" height="30" fill="white" stroke="#64748b" stroke-width="2" rx="2"/>
  <line x1="30" y1="111" x2="30" y2="115" stroke="#64748b" stroke-width="1.5"/>
  <line x1="27" y1="145" x2="33" y2="145" stroke="#64748b" stroke-width="1.5"/>
  <circle cx="55" cy="130" r="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
  <circle cx="75" cy="130" r="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
  <circle cx="95" cy="130" r="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
  <line x1="30" y1="115" x2="103" y2="115" stroke="#64748b" stroke-width="1.5"/>
  <line x1="55" y1="122" x2="55" y2="115" stroke="#64748b" stroke-width="1.5"/>
  <line x1="75" y1="122" x2="75" y2="115" stroke="#64748b" stroke-width="1.5"/>
  <line x1="95" y1="122" x2="95" y2="115" stroke="#64748b" stroke-width="1.5"/>
  <line x1="30" y1="145" x2="103" y2="145" stroke="#64748b" stroke-width="1.5"/>
  <line x1="55" y1="138" x2="55" y2="145" stroke="#64748b" stroke-width="1.5"/>
  <line x1="75" y1="138" x2="75" y2="145" stroke="#64748b" stroke-width="1.5"/>
  <line x1="95" y1="138" x2="95" y2="145" stroke="#64748b" stroke-width="1.5"/>
  <text x="75" y="133" text-anchor="middle" font-size="9" fill="#475569">L</text>
  
  <!-- Circuit M: 1 bulb, 1 battery -->
  <text x="75" y="178" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">Circuit M</text>
  <rect x="45" y="185" width="20" height="30" fill="white" stroke="#64748b" stroke-width="2" rx="2"/>
  <line x1="55" y1="181" x2="55" y2="185" stroke="#64748b" stroke-width="1.5"/>
  <line x1="52" y1="215" x2="58" y2="215" stroke="#64748b" stroke-width="1.5"/>
  <circle cx="85" cy="200" r="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
  <line x1="85" y1="192" x2="85" y2="185" stroke="#64748b" stroke-width="1.5"/>
  <line x1="85" y1="208" x2="85" y2="215" stroke="#64748b" stroke-width="1.5"/>
  <line x1="55" y1="185" x2="85" y2="185" stroke="#64748b" stroke-width="1.5"/>
  <line x1="55" y1="215" x2="85" y2="215" stroke="#64748b" stroke-width="1.5"/>
  <text x="85" y="203" text-anchor="middle" font-size="9" fill="#475569">M</text>
  
  <!-- Circuit N: 2 bulbs, 2 batteries (series) -->
  <text x="75" y="248" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">Circuit N</text>
  <rect x="25" y="255" width="20" height="30" fill="white" stroke="#64748b" stroke-width="2" rx="2"/>
  <line x1="35" y1="251" x2="35" y2="255" stroke="#64748b" stroke-width="1.5"/>
  <rect x="55" y="255" width="20" height="30" fill="white" stroke="#64748b" stroke-width="2" rx="2"/>
  <line x1="65" y1="251" x2="65" y2="255" stroke="#64748b" stroke-width="1.5"/>
  <line x1="62" y1="285" x2="68" y2="285" stroke="#64748b" stroke-width="1.5"/>
  <circle cx="95" cy="270" r="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
  <circle cx="115" cy="270" r="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
  <line x1="35" y1="255" x2="123" y2="255" stroke="#64748b" stroke-width="1.5"/>
  <line x1="95" y1="262" x2="95" y2="255" stroke="#64748b" stroke-width="1.5"/>
  <line x1="115" y1="262" x2="115" y2="255" stroke="#64748b" stroke-width="1.5"/>
  <line x1="35" y1="285" x2="123" y2="285" stroke="#64748b" stroke-width="1.5"/>
  <line x1="95" y1="278" x2="95" y2="285" stroke="#64748b" stroke-width="1.5"/>
  <line x1="115" y1="278" x2="115" y2="285" stroke="#64748b" stroke-width="1.5"/>
  <text x="105" y="273" text-anchor="middle" font-size="9" fill="#475569">N</text>
  
  <!-- Legend -->
  <text x="200" y="50" font-size="10" fill="#64748b">Brightness ranking:</text>
  <text x="200" y="70" font-size="11" font-weight="bold" fill="#dc2626">Dimmest: L</text>
  <text x="200" y="88" font-size="10" fill="#64748b">(3 bulbs share energy)</text>
  <text x="200" y="110" font-size="11" font-weight="bold" fill="#f59e0b">Dim: K</text>
  <text x="200" y="128" font-size="10" fill="#64748b">(2 bulbs share energy)</text>
  <text x="200" y="150" font-size="11" font-weight="bold" fill="#16a34a">Bright: N</text>
  <text x="200" y="168" font-size="10" fill="#64748b">(2 batteries, 2 bulbs)</text>
  <text x="200" y="190" font-size="11" font-weight="bold" fill="#3b82f6">Brightest: M</text>
  <text x="200" y="208" font-size="10" fill="#64748b">(1 bulb gets all energy)</text>
  
  <text x="200" y="240" font-size="10" font-weight="bold" fill="#1e293b">Order: L → K → N → M</text>
  <text x="200" y="255" font-size="9" fill="#64748b">(dimmest to brightest)</text>
</svg>''')

# SCI973: Circuit with four switches, buzzer and bulbs
fix('SCI973', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 280" width="380" font-family="Arial,sans-serif">
  <text x="190" y="16" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Circuit with Four Switches</text>
  
  <!-- Battery -->
  <rect x="30" y="120" width="25" height="40" fill="white" stroke="#64748b" stroke-width="2" rx="2"/>
  <line x1="42" y1="115" x2="42" y2="120" stroke="#64748b" stroke-width="2"/>
  <text x="42" y="112" text-anchor="middle" font-size="10" fill="#dc2626">+</text>
  <line x1="38" y1="160" x2="46" y2="160" stroke="#64748b" stroke-width="2"/>
  
  <!-- Main wire from + terminal -->
  <line x1="42" y1="115" x2="42" y2="80" stroke="#64748b" stroke-width="2"/>
  <line x1="42" y1="80" x2="190" y2="80" stroke="#64748b" stroke-width="2"/>
  
  <!-- Branch 1: S1 + Buzzer -->
  <line x1="120" y1="80" x2="120" y2="110" stroke="#64748b" stroke-width="2"/>
  <!-- Switch S1 -->
  <circle cx="120" cy="115" r="3" fill="#64748b"/>
  <circle cx="120" cy="135" r="3" fill="#64748b"/>
  <line x1="120" y1="118" x2="125" y2="128" stroke="#64748b" stroke-width="2"/>
  <text x="105" y="127" font-size="10" font-weight="bold" fill="#1e40af">S1</text>
  <line x1="120" y1="138" x2="120" y2="165" stroke="#64748b" stroke-width="2"/>
  <!-- Buzzer -->
  <circle cx="120" cy="175" r="10" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <text x="120" y="179" text-anchor="middle" font-size="9" fill="#475569">BZ</text>
  <line x1="120" y1="185" x2="120" y2="200" stroke="#64748b" stroke-width="2"/>
  
  <!-- Branch 2: S2 + Bulb 1 -->
  <line x1="190" y1="80" x2="190" y2="110" stroke="#64748b" stroke-width="2"/>
  <!-- Switch S2 -->
  <circle cx="190" cy="115" r="3" fill="#64748b"/>
  <circle cx="190" cy="135" r="3" fill="#64748b"/>
  <line x1="190" y1="118" x2="195" y2="128" stroke="#64748b" stroke-width="2"/>
  <text x="175" y="127" font-size="10" font-weight="bold" fill="#1e40af">S2</text>
  <line x1="190" y1="138" x2="190" y2="160" stroke="#64748b" stroke-width="2"/>
  <!-- Bulb -->
  <circle cx="190" cy="170" r="10" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <line x1="184" y1="164" x2="196" y2="176" stroke="#f59e0b" stroke-width="1"/>
  <line x1="184" y1="176" x2="196" y2="164" stroke="#f59e0b" stroke-width="1"/>
  <line x1="190" y1="180" x2="190" y2="200" stroke="#64748b" stroke-width="2"/>
  
  <!-- Junction and continuation -->
  <line x1="190" y1="80" x2="330" y2="80" stroke="#64748b" stroke-width="2"/>
  
  <!-- Branch 3: S3 + Bulb 2 -->
  <line x1="260" y1="80" x2="260" y2="110" stroke="#64748b" stroke-width="2"/>
  <!-- Switch S3 -->
  <circle cx="260" cy="115" r="3" fill="#64748b"/>
  <circle cx="260" cy="135" r="3" fill="#64748b"/>
  <line x1="260" y1="118" x2="265" y2="128" stroke="#64748b" stroke-width="2"/>
  <text x="245" y="127" font-size="10" font-weight="bold" fill="#1e40af">S3</text>
  <line x1="260" y1="138" x2="260" y2="160" stroke="#64748b" stroke-width="2"/>
  <!-- Bulb -->
  <circle cx="260" cy="170" r="10" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <line x1="254" y1="164" x2="266" y2="176" stroke="#f59e0b" stroke-width="1"/>
  <line x1="254" y1="176" x2="266" y2="164" stroke="#f59e0b" stroke-width="1"/>
  <line x1="260" y1="180" x2="260" y2="200" stroke="#64748b" stroke-width="2"/>
  
  <!-- Branch 4: S4 only -->
  <line x1="330" y1="80" x2="330" y2="110" stroke="#64748b" stroke-width="2"/>
  <!-- Switch S4 -->
  <circle cx="330" cy="115" r="3" fill="#64748b"/>
  <circle cx="330" cy="135" r="3" fill="#64748b"/>
  <line x1="330" y1="118" x2="335" y2="128" stroke="#64748b" stroke-width="2"/>
  <text x="315" y="127" font-size="10" font-weight="bold" fill="#1e40af">S4</text>
  <line x1="330" y1="138" x2="330" y2="200" stroke="#64748b" stroke-width="2"/>
  
  <!-- Return wires to negative -->
  <line x1="120" y1="200" x2="330" y2="200" stroke="#64748b" stroke-width="2"/>
  <line x1="42" y1="160" x2="42" y2="200" stroke="#64748b" stroke-width="2"/>
  <line x1="42" y1="200" x2="120" y2="200" stroke="#64748b" stroke-width="2"/>
  
  <!-- Answer box -->
  <rect x="15" y="220" width="350" height="52" fill="#f0fdf4" stroke="#16a34a" stroke-width="2" rx="4"/>
  <text x="190" y="238" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">Answer: S1 closed, S3 closed, S2 open, S4 open</text>
  <text x="190" y="252" text-anchor="middle" font-size="10" fill="#166534">S1 and S3 complete circuit for buzzer only</text>
  <text x="190" y="265" text-anchor="middle" font-size="10" fill="#166534">S2 and S4 open prevents bulbs from lighting</text>
</svg>''')

# SCI974: Circuit tester with circuit cards
fix('SCI974', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" font-family="Arial,sans-serif">
  <text x="200" y="16" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Circuit Cards Testing</text>
  
  <!-- Circuit Card 1 -->
  <text x="100" y="38" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af">Circuit Card 1</text>
  <rect x="30" y="45" width="140" height="100" fill="#f8fafc" stroke="#3b82f6" stroke-width="2" rx="6"/>
  
  <!-- Points A-E for card 1 -->
  <circle cx="50" cy="65" r="5" fill="#ef4444" stroke="#991b1b" stroke-width="1.5"/>
  <text x="42" y="68" text-anchor="end" font-size="10" font-weight="bold" fill="#991b1b">A</text>
  
  <circle cx="150" cy="65" r="5" fill="#ef4444" stroke="#991b1b" stroke-width="1.5"/>
  <text x="158" y="68" text-anchor="start" font-size="10" font-weight="bold" fill="#991b1b">E</text>
  
  <circle cx="50" cy="95" r="5" fill="#ef4444" stroke="#991b1b" stroke-width="1.5"/>
  <text x="42" y="98" text-anchor="end" font-size="10" font-weight="bold" fill="#991b1b">B</text>
  
  <circle cx="100" cy="95" r="5" fill="#ef4444" stroke="#991b1b" stroke-width="1.5"/>
  <text x="100" y="88" text-anchor="middle" font-size="10" font-weight="bold" fill="#991b1b">C</text>
  
  <circle cx="150" cy="125" r="5" fill="#ef4444" stroke="#991b1b" stroke-width="1.5"/>
  <text x="158" y="128" text-anchor="start" font-size="10" font-weight="bold" fill="#991b1b">D</text>
  
  <!-- Wiring for card 1: B-C connected, A-D connected -->
  <line x1="50" y1="95" x2="100" y2="95" stroke="#64748b" stroke-width="2"/>
  <line x1="50" y1="65" x2="150" y2="125" stroke="#64748b" stroke-width="2"/>
  
  <!-- Circuit Card 2 -->
  <text x="300" y="38" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af">Circuit Card 2</text>
  <rect x="230" y="45" width="140" height="100" fill="#f8fafc" stroke="#3b82f6" stroke-width="2" rx="6"/>
  
  <!-- Points A-E for card 2 -->
  <circle cx="250" cy="65" r="5" fill="#ef4444" stroke="#991b1b" stroke-width="1.5"/>
  <text x="242" y="68" text-anchor="end" font-size="10" font-weight="bold" fill="#991b1b">A</text>
  
  <circle cx="350" cy="65" r="5" fill="#ef4444" stroke="#991b1b" stroke-width="1.5"/>
  <text x="358" y="68" text-anchor="start" font-size="10" font-weight="bold" fill="#991b1b">E</text>
  
  <circle cx="250" cy="95" r="5" fill="#ef4444" stroke="#991b1b" stroke-width="1.5"/>
  <text x="242" y="98" text-anchor="end" font-size="10" font-weight="bold" fill="#991b1b">B</text>
  
  <circle cx="300" cy="95" r="5" fill="#ef4444" stroke="#991b1b" stroke-width="1.5"/>
  <text x="300" y="88" text-anchor="middle" font-size="10" font-weight="bold" fill="#991b1b">C</text>
  
  <circle cx="350" cy="125" r="5" fill="#ef4444" stroke="#991b1b" stroke-width="1.5"/>
  <text x="358" y="128" text-anchor="start" font-size="10" font-weight="bold" fill="#991b1b">D</text>
  
  <!-- Wiring for card 2: A-E connected, C-D connected -->
  <line x1="250" y1="65" x2="350" y2="65" stroke="#64748b" stroke-width="2"/>
  <line x1="300" y1="95" x2="350" y2="125" stroke="#64748b" stroke-width="2"/>
  
  <!-- Results Table -->
  <text x="200" y="170" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Test Results</text>
  
  <rect x="30" y="180" width="340" height="105" fill="white" stroke="#94a3b8" stroke-width="2"/>
  
  <!-- Table headers -->
  <rect x="30" y="180" width="90" height="25" fill="#e0f2fe" stroke="#94a3b8" stroke-width="1"/>
  <text x="75" y="197" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Test Points</text>
  
  <rect x="120" y="180" width="125" height="25" fill="#e0f2fe" stroke="#94a3b8" stroke-width="1"/>
  <text x="182" y="197" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Card 1</text>
  
  <rect x="245" y="180" width="125" height="25" fill="#e0f2fe" stroke="#94a3b8" stroke-width="1"/>
  <text x="307" y="197" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Card 2</text>
  
  <!-- Row 1: A & E -->
  <rect x="30" y="205" width="90" height="20" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="75" y="219" text-anchor="middle" font-size="9" fill="#475569">Student 1: A-E</text>
  <rect x="120" y="205" width="125" height="20" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="182" y="219" text-anchor="middle" font-size="9" fill="#64748b">No light</text>
  <rect x="245" y="205" width="125" height="20" fill="#dcfce7" stroke="#94a3b8" stroke-width="1"/>
  <text x="307" y="219" text-anchor="middle" font-size="9" font-weight="bold" fill="#16a34a">Light ✓</text>
  
  <!-- Row 2: A & D -->
  <rect x="30" y="225" width="90" height="20" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="75" y="239" text-anchor="middle" font-size="9" fill="#475569">Student 2: A-D</text>
  <rect x="120" y="225" width="125" height="20" fill="#dcfce7" stroke="#94a3b8" stroke-width="1"/>
  <text x="182" y="239" text-anchor="middle" font-size="9" font-weight="bold" fill="#16a34a">Light ✓</text>
  <rect x="245" y="225" width="125" height="20" fill="#fecaca" stroke="#94a3b8" stroke-width="1"/>
  <text x="307" y="239" text-anchor="middle" font-size="9" fill="#dc2626">No light ✗</text>
  
  <!-- Row 3: B & C -->
  <rect x="30" y="245" width="90" height="20" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="75" y="259" text-anchor="middle" font-size="9" fill="#475569">Student 3: B-C</text>
  <rect x="120" y="245" width="125" height="20" fill="#fecaca" stroke="#94a3b8" stroke-width="1"/>
  <text x="182" y="259" text-anchor="middle" font-size="9" fill="#dc2626">No light ✗</text>
  <rect x="245" y="245" width="125" height="20" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="307" y="259" text-anchor="middle" font-size="9" fill="#64748b">No light</text>
  
  <!-- Row 4: B & D -->
  <rect x="30" y="265" width="90" height="20" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="75" y="279" text-anchor="middle" font-size="9" fill="#475569">Student 4: B-D</text>
  <rect x="120" y="265" width="125" height="20" fill="#fecaca" stroke="#94a3b8" stroke-width="1"/>
  <text x="182" y="279" text-anchor="middle" font-size="9" fill="#dc2626">No light ✗</text>
  <rect x="245" y="265" width="125" height="20" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="307" y="279" text-anchor="middle" font-size="9" fill="#64748b">No light</text>
  
  <text x="200" y="298" text-anchor="middle" font-size="10" font-weight="bold" fill="#16a34a">Student 1 is correct! ✓</text>
</svg>''')

# SCI975: Two hanging rods, Q attracted to P
fix('SCI975', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 260" width="350" font-family="Arial,sans-serif">
  <text x="175" y="16" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Magnetic Attraction Experiment</text>
  
  <!-- Ceiling -->
  <rect x="0" y="30" width="350" height="8" fill="#cbd5e1" stroke="#94a3b8" stroke-width="1"/>
  <line x1="0" y1="38" x2="350" y2="38" stroke="#64748b" stroke-width="2"/>
  
  <!-- Rod P -->
  <text x="100" y="55" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af">Rod P</text>
  
  <!-- String for P -->
  <line x1="100" y1="38" x2="100" y2="75" stroke="#64748b" stroke-width="1.5"/>
  <circle cx="100" cy="38" r="2" fill="#475569"/>
  
  <!-- Rod P (magnet) -->
  <rect x="85" y="75" width="30" height="80" fill="#ef4444" stroke="#991b1b" stroke-width="2" rx="2"/>
  <text x="100" y="105" text-anchor="middle" font-size="16" font-weight="bold" fill="white">N</text>
  <line x1="85" y1="115" x2="115" y2="115" stroke="#991b1b" stroke-width="1.5"/>
  <text x="100" y="140" text-anchor="middle" font-size="16" font-weight="bold" fill="white">S</text>
  <text x="100" y="172" text-anchor="middle" font-size="10" fill="#fff">Magnet</text>
  
  <!-- Rod Q -->
  <text x="230" y="55" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af">Rod Q</text>
  
  <!-- String for Q (tilted to show attraction) -->
  <line x1="250" y1="38" x2="230" y2="75" stroke="#64748b" stroke-width="1.5"/>
  <circle cx="250" cy="38" r="2" fill="#475569"/>
  
  <!-- Rod Q (steel - attracted) -->
  <rect x="215" y="75" width="30" height="80" fill="#94a3b8" stroke="#475569" stroke-width="2" rx="2"/>
  <text x="230" y="120" text-anchor="middle" font-size="10" fill="#1e293b">Steel</text>
  
  <!-- Arrow showing attraction -->
  <path d="M200,115 L140,115" stroke="#ef4444" stroke-width="2.5" marker-end="url(#arrowhead)"/>
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#ef4444"/>
    </marker>
  </defs>
  <text x="170" y="110" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">Attraction</text>
  
  <!-- Labels -->
  <text x="100" y="190" text-anchor="middle" font-size="11" font-weight="bold" fill="#991b1b">P = Magnet</text>
  <text x="230" y="190" text-anchor="middle" font-size="11" font-weight="bold" fill="#475569">Q = Steel</text>
  
  <!-- Explanation box -->
  <rect x="15" y="205" width="320" height="48" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="4"/>
  <text x="175" y="223" text-anchor="middle" font-size="11" font-weight="bold" fill="#92400e">Observation: Q moves toward P</text>
  <text x="175" y="238" text-anchor="middle" font-size="10" fill="#78350f">Conclusion: P is a magnet, Q is magnetic material (steel)</text>
  <text x="175" y="250" text-anchor="middle" font-size="9" fill="#78350f">Steel is always attracted to magnets</text>
</svg>''')

# SCI976: Wooden block on slope
fix('SCI976', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 240" width="380" font-family="Arial,sans-serif">
  <text x="190" y="16" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Forces on a Wooden Block on a Slope</text>
  
  <!-- Ground -->
  <line x1="10" y1="210" x2="370" y2="210" stroke="#64748b" stroke-width="2"/>
  <path d="M10,210 L20,220 L30,210 L40,220 L50,210 L60,220 L70,210" stroke="#64748b" stroke-width="1.5" fill="none"/>
  
  <!-- Slope -->
  <polygon points="80,210 320,210 320,80 80,210" fill="#e2e8f0" stroke="#64748b" stroke-width="2"/>
  
  <!-- Grid pattern on slope -->
  <line x1="120" y1="207" x2="320" y2="113" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="160" y1="204" x2="320" y2="146" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="200" y1="201" x2="320" y2="179" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="4,4"/>
  
  <!-- Wooden block on slope -->
  <g transform="translate(220,140) rotate(-28)">
    <rect x="-20" y="-15" width="40" height="30" fill="#d97706" stroke="#92400e" stroke-width="2" rx="2"/>
    <line x1="-15" y1="-10" x2="-5" y2="-10" stroke="#92400e" stroke-width="1"/>
    <line x1="-15" y1="0" x2="-5" y2="0" stroke="#92400e" stroke-width="1"/>
    <line x1="-15" y1="10" x2="-5" y2="10" stroke="#92400e" stroke-width="1"/>
    <text x="0" y="5" text-anchor="middle" font-size="10" fill="#fff" font-weight="bold">Block</text>
  </g>
  
  <!-- Point W (where block stops) -->
  <circle cx="130" cy="195" r="6" fill="#ef4444" stroke="#991b1b" stroke-width="2"/>
  <text x="130" y="199" text-anchor="middle" font-size="11" font-weight="bold" fill="white">W</text>
  <text x="130" y="220" text-anchor="middle" font-size="11" font-weight="bold" fill="#991b1b">Point W</text>
  <text x="130" y="232" text-anchor="middle" font-size="9" fill="#64748b">(block stops here)</text>
  
  <!-- Force arrows -->
  <!-- Gravitational force (downward) -->
  <line x1="220" y1="155" x2="220" y2="110" stroke="#3b82f6" stroke-width="3" marker-start="url(#arrowblue)"/>
  <defs>
    <marker id="arrowblue" markerWidth="10" markerHeight="10" refX="1" refY="3" orient="auto">
      <polygon points="10 0, 10 6, 0 3" fill="#3b82f6"/>
    </marker>
  </defs>
  <text x="240" y="130" font-size="11" font-weight="bold" fill="#1d4ed8">Gravitational</text>
  <text x="240" y="143" font-size="11" font-weight="bold" fill="#1d4ed8">Force</text>
  
  <!-- Frictional force (up the slope) -->
  <g transform="translate(220,155) rotate(-28)">
    <line x1="0" y1="0" x2="45" y2="0" stroke="#16a34a" stroke-width="3" marker-end="url(#arrowgreen)"/>
    <text x="25" y="-8" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">Friction</text>
  </g>
  <defs>
    <marker id="arrowgreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#16a34a"/>
    </marker>
  </defs>
  
  <!-- Explanation box -->
  <rect x="15" y="35" width="160" height="68" fill="#f0fdf4" stroke="#16a34a" stroke-width="2" rx="4"/>
  <text x="95" y="52" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">Forces Acting:</text>
  <text x="95" y="68" text-anchor="middle" font-size="10" fill="#166534">✓ Gravitational force</text>
  <text x="95" y="82" text-anchor="middle" font-size="10" fill="#166534">(pulls block down)</text>
  <text x="95" y="96" text-anchor="middle" font-size="10" fill="#166534">✓ Frictional force</text>
  <text x="95" y="110" text-anchor="middle" font-size="10" fill="#166534">(opposes motion)</text>
</svg>''')

# SCI977: Electromagnet with spring and magnet
fix('SCI977', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 320" width="400" font-family="Arial,sans-serif">
  <text x="200" y="16" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Electromagnet Experiment</text>
  
  <!-- Support structure -->
  <rect x="150" y="30" width="100" height="10" fill="#64748b" stroke="#475569" stroke-width="2"/>
  
  <!-- Spring -->
  <path d="M200,40 L200,50 L205,55 L195,60 L205,65 L195,70 L205,75 L195,80 L205,85 L195,90 L200,95 L200,105" 
        stroke="#94a3b8" stroke-width="2.5" fill="none"/>
  <text x="220" y="70" font-size="10" fill="#64748b">Spring</text>
  <text x="220" y="82" font-size="9" fill="#64748b">(5 cm initially)</text>
  
  <!-- Hanging magnet -->
  <rect x="180" y="105" width="40" height="30" fill="#ef4444" stroke="#991b1b" stroke-width="2" rx="2"/>
  <text x="200" y="123" text-anchor="middle" font-size="14" font-weight="bold" fill="white">N</text>
  <line x1="180" y1="120" x2="220" y2="120" stroke="#991b1b" stroke-width="1"/>
  
  <!-- Iron nail (electromagnet core) -->
  <rect x="188" y="160" width="24" height="60" fill="#94a3b8" stroke="#64748b" stroke-width="2" rx="2"/>
  
  <!-- Coil around nail -->
  <ellipse cx="200" cy="170" rx="18" ry="6" fill="none" stroke="#f59e0b" stroke-width="2"/>
  <ellipse cx="200" cy="180" rx="18" ry="6" fill="none" stroke="#f59e0b" stroke-width="2"/>
  <ellipse cx="200" cy="190" rx="18" ry="6" fill="none" stroke="#f59e0b" stroke-width="2"/>
  <ellipse cx="200" cy="200" rx="18" ry="6" fill="none" stroke="#f59e0b" stroke-width="2"/>
  <ellipse cx="200" cy="210" rx="18" ry="6" fill="none" stroke="#f59e0b" stroke-width="2"/>
  <text x="230" y="192" font-size="10" fill="#92400e">Electromagnet</text>
  
  <!-- Wires to battery and switch -->
  <line x1="182" y1="165" x2="100" y2="165" stroke="#f59e0b" stroke-width="2"/>
  <line x1="218" y1="215" x2="280" y2="215" stroke="#f59e0b" stroke-width="2"/>
  
  <!-- Switch -->
  <circle cx="100" cy="190" r="3" fill="#64748b"/>
  <circle cx="100" cy="210" r="3" fill="#64748b"/>
  <line x1="100" y1="193" x2="105" y2="203" stroke="#64748b" stroke-width="2"/>
  <rect x="75" y="175" width="50" height="50" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="4,4" rx="4"/>
  <text x="100" y="170" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e40af">Switch</text>
  
  <!-- Battery (can be 1 or 2) -->
  <rect x="265" y="230" width="30" height="50" fill="white" stroke="#64748b" stroke-width="2" rx="2"/>
  <line x1="280" y1="225" x2="280" y2="230" stroke="#64748b" stroke-width="2"/>
  <text x="280" y="222" text-anchor="middle" font-size="10" fill="#dc2626">+</text>
  <line x1="277" y1="280" x2="283" y2="280" stroke="#64748b" stroke-width="2"/>
  <text x="280" y="255" text-anchor="middle" font-size="10" fill="#475569">1 or 2</text>
  <text x="280" y="268" text-anchor="middle" font-size="10" fill="#475569">batteries</text>
  
  <!-- Close circuit -->
  <line x1="100" y1="165" x2="100" y2="187" stroke="#f59e0b" stroke-width="2"/>
  <line x1="100" y1="213" x2="100" y2="290" stroke="#f59e0b" stroke-width="2"/>
  <line x1="100" y1="290" x2="280" y2="290" stroke="#f59e0b" stroke-width="2"/>
  <line x1="280" y1="215" x2="280" y2="225" stroke="#f59e0b" stroke-width="2"/>
  <line x1="280" y1="280" x2="280" y2="290" stroke="#f59e0b" stroke-width="2"/>
  
  <!-- Results table -->
  <text x="50" y="45" font-size="11" font-weight="bold" fill="#1e293b">Results:</text>
  
  <text x="30" y="62" font-size="9" fill="#64748b">Exp A (1 bat): up, 4cm</text>
  <text x="30" y="74" font-size="9" fill="#64748b">Exp B (1 bat): down, 6cm</text>
  <text x="30" y="86" font-size="9" fill="#64748b">Exp C (2 bat): up, 3cm</text>
  <text x="30" y="98" font-size="9" fill="#64748b">Exp D (2 bat): down, 7cm</text>
  
  <!-- Conclusion box -->
  <rect x="15" y="240" width="230" height="72" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="4"/>
  <text x="130" y="257" text-anchor="middle" font-size="11" font-weight="bold" fill="#92400e">Answer: Experiments B and D</text>
  <text x="130" y="272" text-anchor="middle" font-size="9" fill="#78350f">Both moved downward (same pole)</text>
  <text x="130" y="285" text-anchor="middle" font-size="9" fill="#78350f">D stretched more (7cm vs 6cm)</text>
  <text x="130" y="298" text-anchor="middle" font-size="9" fill="#78350f">→ stronger electromagnet with 2 batteries</text>
  <text x="130" y="310" text-anchor="middle" font-size="9" fill="#78350f">but poles remained the same</text>
</svg>''')

# SCI978: Four materials in line with torch
fix('SCI978', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 220" width="400" font-family="Arial,sans-serif">
  <text x="200" y="16" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Light Transmission Experiment</text>
  
  <!-- Torch/Light source -->
  <rect x="20" y="85" width="30" height="50" fill="#fbbf24" stroke="#f59e0b" stroke-width="2" rx="4"/>
  <polygon points="50,95 70,100 70,120 50,125" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <text x="35" y="150" text-anchor="middle" font-size="10" font-weight="bold" fill="#92400e">Torch</text>
  
  <!-- Light rays -->
  <line x1="70" y1="102" x2="100" y2="102" stroke="#fbbf24" stroke-width="2"/>
  <line x1="70" y1="110" x2="100" y2="110" stroke="#fbbf24" stroke-width="2"/>
  <line x1="70" y1="118" x2="100" y2="118" stroke="#fbbf24" stroke-width="2"/>
  
  <!-- Material A (opaque with hole) -->
  <rect x="100" y="70" width="15" height="30" fill="#475569" stroke="#1e293b" stroke-width="2"/>
  <rect x="100" y="120" width="15" height="30" fill="#475569" stroke="#1e293b" stroke-width="2"/>
  <!-- Hole in A -->
  <rect x="100" y="100" width="15" height="20" fill="white" stroke="#94a3b8" stroke-width="1" stroke-dasharray="2,2"/>
  <text x="107" y="165" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e293b">A</text>
  <text x="107" y="177" text-anchor="middle" font-size="8" fill="#64748b">Opaque</text>
  <text x="107" y="186" text-anchor="middle" font-size="8" fill="#64748b">with hole</text>
  
  <!-- Light passing through hole only -->
  <line x1="115" y1="105" x2="170" y2="105" stroke="#fbbf24" stroke-width="2"/>
  <line x1="115" y1="110" x2="170" y2="110" stroke="#fbbf24" stroke-width="2"/>
  <line x1="115" y1="115" x2="170" y2="115" stroke="#fbbf24" stroke-width="2"/>
  
  <!-- Material B (transparent) -->
  <rect x="170" y="80" width="15" height="60" fill="#bfdbfe" stroke="#3b82f6" stroke-width="2" opacity="0.4"/>
  <text x="177" y="165" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">B</text>
  <text x="177" y="177" text-anchor="middle" font-size="8" fill="#64748b">Transparent</text>
  
  <!-- Light passes through B -->
  <line x1="185" y1="105" x2="240" y2="105" stroke="#fbbf24" stroke-width="2"/>
  <line x1="185" y1="110" x2="240" y2="110" stroke="#fbbf24" stroke-width="2"/>
  <line x1="185" y1="115" x2="240" y2="115" stroke="#fbbf24" stroke-width="2"/>
  
  <!-- Material C (translucent/screen) -->
  <rect x="240" y="80" width="15" height="60" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <text x="247" y="165" text-anchor="middle" font-size="11" font-weight="bold" fill="#92400e">C</text>
  <text x="247" y="177" text-anchor="middle" font-size="8" fill="#64748b">Translucent</text>
  <text x="247" y="186" text-anchor="middle" font-size="8" fill="#64748b">(screen)</text>
  
  <!-- Spot of light on C -->
  <ellipse cx="247" cy="110" rx="8" ry="15" fill="#fbbf24" opacity="0.7"/>
  <text x="247" y="50" text-anchor="middle" font-size="10" font-weight="bold" fill="#dc2626">Spot of</text>
  <text x="247" y="62" text-anchor="middle" font-size="10" font-weight="bold" fill="#dc2626">light seen!</text>
  <line x1="247" y1="65" x2="247" y2="75" stroke="#dc2626" stroke-width="1.5" marker-end="url(#arrowred)"/>
  <defs>
    <marker id="arrowred" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#dc2626"/>
    </marker>
  </defs>
  
  <!-- Material D (opaque) -->
  <rect x="310" y="80" width="15" height="60" fill="#64748b" stroke="#1e293b" stroke-width="2"/>
  <text x="317" y="165" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e293b">D</text>
  <text x="317" y="177" text-anchor="middle" font-size="8" fill="#64748b">Opaque</text>
  
  <!-- No light on D -->
  <text x="317" y="50" text-anchor="middle" font-size="10" fill="#64748b">No spot</text>
  <text x="317" y="62" text-anchor="middle" font-size="10" fill="#64748b">seen</text>
  
  <!-- Conclusion box -->
  <rect x="15" y="195" width="370" height="22" fill="#dcfce7" stroke="#16a34a" stroke-width="2" rx="4"/>
  <text x="200" y="210" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">Conclusion: Material C allows most light through (translucent), Material D blocks all light (opaque) → Answer: R and S</text>
</svg>''')

# SCI979: Ice melting in materials S and T (bar graph)
fix('SCI979', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 280" width="380" font-family="Arial,sans-serif">
  <text x="190" y="16" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Volume of Water After 30 Minutes</text>
  <text x="190" y="32" text-anchor="middle" font-size="11" fill="#64748b">(from melted ice cubes)</text>
  
  <!-- Y-axis -->
  <line x1="60" y1="50" x2="60" y2="220" stroke="#64748b" stroke-width="2"/>
  <polygon points="55,50 60,40 65,50" fill="#64748b"/>
  
  <!-- Y-axis labels -->
  <text x="30" y="220" text-anchor="middle" font-size="11" fill="#475569">0</text>
  <line x1="55" y1="215" x2="60" y2="215" stroke="#64748b" stroke-width="1.5"/>
  
  <text x="30" y="180" text-anchor="middle" font-size="11" fill="#475569">10</text>
  <line x1="55" y1="175" x2="60" y2="175" stroke="#64748b" stroke-width="1.5"/>
  <line x1="65" y1="175" x2="340" y2="175" stroke="#e2e8f0" stroke-width="1"/>
  
  <text x="30" y="140" text-anchor="middle" font-size="11" fill="#475569">20</text>
  <line x1="55" y1="135" x2="60" y2="135" stroke="#64748b" stroke-width="1.5"/>
  <line x1="65" y1="135" x2="340" y2="135" stroke="#e2e8f0" stroke-width="1"/>
  
  <text x="30" y="100" text-anchor="middle" font-size="11" fill="#475569">30</text>
  <line x1="55" y1="95" x2="60" y2="95" stroke="#64748b" stroke-width="1.5"/>
  <line x1="65" y1="95" x2="340" y2="95" stroke="#e2e8f0" stroke-width="1"/>
  
  <text x="30" y="60" text-anchor="middle" font-size="11" fill="#475569">40</text>
  <line x1="55" y1="55" x2="60" y2="55" stroke="#64748b" stroke-width="1.5"/>
  <line x1="65" y1="55" x2="340" y2="55" stroke="#e2e8f0" stroke-width="1"/>
  
  <!-- Y-axis label -->
  <text x="15" y="135" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b" transform="rotate(-90,15,135)">Volume of water (cm³)</text>
  
  <!-- X-axis -->
  <line x1="60" y1="220" x2="340" y2="220" stroke="#64748b" stroke-width="2"/>
  <polygon points="340,215 350,220 340,225" fill="#64748b"/>
  
  <!-- Bar for Material S (less water = better insulator) -->
  <rect x="110" y="189" width="80" height="26" fill="#16a34a" stroke="#15803d" stroke-width="2"/>
  <text x="150" y="207" text-anchor="middle" font-size="14" font-weight="bold" fill="white">6</text>
  <text x="150" y="240" text-anchor="middle" font-size="13" font-weight="bold" fill="#15803d">Material S</text>
  <text x="150" y="255" text-anchor="middle" font-size="9" fill="#64748b">(poorer heat conductor)</text>
  <text x="150" y="267" text-anchor="middle" font-size="9" fill="#64748b">Less ice melted</text>
  
  <!-- Bar for Material T (more water = better conductor) -->
  <rect x="230" y="82" width="80" height="133" fill="#3b82f6" stroke="#1d4ed8" stroke-width="2"/>
  <text x="270" y="152" text-anchor="middle" font-size="14" font-weight="bold" fill="white">33</text>
  <text x="270" y="240" text-anchor="middle" font-size="13" font-weight="bold" fill="#1d4ed8">Material T</text>
  <text x="270" y="255" text-anchor="middle" font-size="9" fill="#64748b">(better heat conductor)</text>
  <text x="270" y="267" text-anchor="middle" font-size="9" fill="#64748b">More ice melted</text>
</svg>''')

with open('data/questions-science-p6.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("✓ Added diagrams to SCI970-979 (W5D2 Part 2)")
