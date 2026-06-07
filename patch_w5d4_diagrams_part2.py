#!/usr/bin/env python3
"""Add SVG diagrams to SCI1022-SCI1035 (14 questions)"""

import json

# Read the questions
with open('data/questions-science-p6.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Create index mapping question IDs to their positions
idx = {q['id']: i for i, q in enumerate(data)}

def fix(qid, diagram):
    """Add diagram to a question by ID"""
    data[idx[qid]]['diagram'] = diagram

# SCI1022: Material properties table (strong, good heat conductor, waterproof)
fix('SCI1022', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 220" width="380" font-family="Arial,sans-serif">
  <text x="190" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Material Properties</text>
  <!-- Header row -->
  <rect x="20" y="28" width="80" height="36" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="60" y="50" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Material</text>
  <rect x="100" y="28" width="90" height="36" fill="#dbeafe" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="145" y="42" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">Strong</text>
  <text x="145" y="56" text-anchor="middle" font-size="10" fill="#1e40af">(can hold food)</text>
  <rect x="190" y="28" width="90" height="36" fill="#fef3c7" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="235" y="42" text-anchor="middle" font-size="11" font-weight="bold" fill="#92400e">Good Heat</text>
  <text x="235" y="56" text-anchor="middle" font-size="10" fill="#92400e">Conductor</text>
  <rect x="280" y="28" width="80" height="36" fill="#e0f2fe" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="320" y="50" text-anchor="middle" font-size="11" font-weight="bold" fill="#075985">Waterproof</text>
  <!-- Material A -->
  <rect x="20" y="64" width="80" height="36" fill="#f8fafc" stroke="#94a3b8" stroke-width="1"/>
  <text x="60" y="86" text-anchor="middle" font-size="13" font-weight="bold" fill="#334155">A</text>
  <rect x="100" y="64" width="90" height="36" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="145" y="86" text-anchor="middle" font-size="18" fill="#16a34a">✓</text>
  <rect x="190" y="64" width="90" height="36" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <rect x="280" y="64" width="80" height="36" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="320" y="86" text-anchor="middle" font-size="18" fill="#16a34a">✓</text>
  <!-- Material B -->
  <rect x="20" y="100" width="80" height="36" fill="#f8fafc" stroke="#94a3b8" stroke-width="1"/>
  <text x="60" y="122" text-anchor="middle" font-size="13" font-weight="bold" fill="#334155">B</text>
  <rect x="100" y="100" width="90" height="36" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <rect x="190" y="100" width="90" height="36" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="235" y="122" text-anchor="middle" font-size="18" fill="#16a34a">✓</text>
  <rect x="280" y="100" width="80" height="36" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="320" y="122" text-anchor="middle" font-size="18" fill="#16a34a">✓</text>
  <!-- Material C -->
  <rect x="20" y="136" width="80" height="36" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <text x="60" y="158" text-anchor="middle" font-size="13" font-weight="bold" fill="#92400e">C</text>
  <rect x="100" y="136" width="90" height="36" fill="#fefce8" stroke="#f59e0b" stroke-width="2"/>
  <text x="145" y="158" text-anchor="middle" font-size="18" fill="#16a34a">✓</text>
  <rect x="190" y="136" width="90" height="36" fill="#fefce8" stroke="#f59e0b" stroke-width="2"/>
  <text x="235" y="158" text-anchor="middle" font-size="18" fill="#16a34a">✓</text>
  <rect x="280" y="136" width="80" height="36" fill="#fefce8" stroke="#f59e0b" stroke-width="2"/>
  <!-- Material D -->
  <rect x="20" y="172" width="80" height="36" fill="#f8fafc" stroke="#94a3b8" stroke-width="1"/>
  <text x="60" y="194" text-anchor="middle" font-size="13" font-weight="bold" fill="#334155">D</text>
  <rect x="100" y="172" width="90" height="36" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="145" y="194" text-anchor="middle" font-size="18" fill="#16a34a">✓</text>
  <rect x="190" y="172" width="90" height="36" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <rect x="280" y="172" width="80" height="36" fill="white" stroke="#94a3b8" stroke-width="1"/>
  <text x="320" y="194" text-anchor="middle" font-size="18" fill="#16a34a">✓</text>
</svg>''')

# SCI1023: Magnets Q and R with force arrows
fix('SCI1023', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Magnet Forces</text>
  <!-- Table (gray) -->
  <rect x="20" y="80" width="360" height="70" fill="#94a3b8" stroke="#475569" stroke-width="2" rx="4"/>
  <text x="200" y="165" text-anchor="middle" font-size="11" fill="#1e293b">Table (fixed)</text>
  <!-- Magnet Q (fixed to table) -->
  <rect x="60" y="85" width="100" height="50" fill="#ef4444" stroke="#1e293b" stroke-width="2" rx="3"/>
  <rect x="160" y="85" width="100" height="50" fill="#3b82f6" stroke="#1e293b" stroke-width="2" rx="3"/>
  <text x="110" y="107" text-anchor="middle" font-size="16" font-weight="bold" fill="white">S</text>
  <text x="110" y="124" text-anchor="middle" font-size="10" fill="white">South</text>
  <text x="210" y="107" text-anchor="middle" font-size="16" font-weight="bold" fill="white">N</text>
  <text x="210" y="124" text-anchor="middle" font-size="10" fill="white">North</text>
  <text x="110" y="72" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Magnet Q</text>
  <!-- Magnet R (moveable) -->
  <rect x="270" y="85" width="50" height="50" fill="#3b82f6" stroke="#1e293b" stroke-width="2" rx="3"/>
  <rect x="320" y="85" width="50" height="50" fill="#ef4444" stroke="#1e293b" stroke-width="2" rx="3"/>
  <text x="295" y="107" text-anchor="middle" font-size="14" font-weight="bold" fill="white">N</text>
  <text x="345" y="107" text-anchor="middle" font-size="14" font-weight="bold" fill="white">S</text>
  <text x="320" y="72" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Magnet R</text>
  <!-- Force arrows with labels -->
  <text x="200" y="38" text-anchor="middle" font-size="11" fill="#64748b">Forces on Magnet R:</text>
  <!-- Magnetic force (right, attraction) -->
  <line x1="330" y1="45" x2="370" y2="45" stroke="#f59e0b" stroke-width="3"/>
  <polygon points="370,45 360,40 360,50" fill="#f59e0b"/>
  <text x="350" y="38" text-anchor="middle" font-size="9" fill="#f59e0b">Magnetic</text>
  <!-- Friction (left, opposes motion) -->
  <line x1="310" y1="55" x2="270" y2="55" stroke="#16a34a" stroke-width="3"/>
  <polygon points="270,55 280,50 280,60" fill="#16a34a"/>
  <text x="290" y="50" text-anchor="middle" font-size="9" fill="#16a34a">Friction</text>
  <!-- Gravity (down) -->
  <line x1="345" y1="140" x2="345" y2="175" stroke="#3b82f6" stroke-width="3"/>
  <polygon points="345,175 340,165 350,165" fill="#3b82f6"/>
  <text x="360" y="158" text-anchor="start" font-size="9" fill="#3b82f6">Gravity</text>
</svg>''')

# SCI1024: Graph showing rubber band extension vs load
fix('SCI1024', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Rubber Band Extension vs Load</text>
  <!-- Axes -->
  <line x1="50" y1="40" x2="50" y2="240" stroke="#1e293b" stroke-width="2"/>
  <line x1="50" y1="240" x2="370" y2="240" stroke="#1e293b" stroke-width="2"/>
  <!-- Y-axis label -->
  <text x="20" y="140" text-anchor="middle" font-size="11" fill="#1e293b" transform="rotate(-90, 20, 140)">Length (cm)</text>
  <!-- Y-axis ticks -->
  <line x1="45" y1="40" x2="50" y2="40" stroke="#1e293b" stroke-width="1.5"/>
  <text x="38" y="44" text-anchor="end" font-size="10" fill="#64748b">20</text>
  <line x1="45" y1="90" x2="50" y2="90" stroke="#1e293b" stroke-width="1.5"/>
  <text x="38" y="94" text-anchor="end" font-size="10" fill="#64748b">16</text>
  <line x1="45" y1="140" x2="50" y2="140" stroke="#1e293b" stroke-width="1.5"/>
  <text x="38" y="144" text-anchor="end" font-size="10" fill="#64748b">12</text>
  <line x1="45" y1="190" x2="50" y2="190" stroke="#1e293b" stroke-width="1.5"/>
  <text x="38" y="194" text-anchor="end" font-size="10" fill="#64748b">8</text>
  <line x1="45" y1="240" x2="50" y2="240" stroke="#1e293b" stroke-width="1.5"/>
  <text x="38" y="244" text-anchor="end" font-size="10" fill="#64748b">4</text>
  <!-- X-axis label -->
  <text x="210" y="268" text-anchor="middle" font-size="11" fill="#1e293b">Mass of Load (g)</text>
  <!-- X-axis ticks -->
  <line x1="130" y1="240" x2="130" y2="245" stroke="#1e293b" stroke-width="1.5"/>
  <text x="130" y="257" text-anchor="middle" font-size="10" fill="#64748b">100</text>
  <line x1="210" y1="240" x2="210" y2="245" stroke="#1e293b" stroke-width="1.5"/>
  <text x="210" y="257" text-anchor="middle" font-size="10" fill="#64748b">200</text>
  <line x1="290" y1="240" x2="290" y2="245" stroke="#1e293b" stroke-width="1.5"/>
  <text x="290" y="257" text-anchor="middle" font-size="10" fill="#64748b">300</text>
  <line x1="370" y1="240" x2="370" y2="245" stroke="#1e293b" stroke-width="1.5"/>
  <text x="370" y="257" text-anchor="middle" font-size="10" fill="#64748b">400</text>
  <!-- Grid lines -->
  <line x1="50" y1="90" x2="370" y2="90" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="50" y1="140" x2="370" y2="140" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="50" y1="190" x2="370" y2="190" stroke="#e2e8f0" stroke-width="1"/>
  <!-- Band A (most stretchy) -->
  <path d="M50,190 L130,90 L210,65 L290,52 L370,43" stroke="#3b82f6" stroke-width="2.5" fill="none"/>
  <circle cx="50" cy="190" r="3" fill="#3b82f6"/>
  <circle cx="130" cy="90" r="3" fill="#3b82f6"/>
  <circle cx="210" cy="65" r="3" fill="#3b82f6"/>
  <circle cx="290" cy="52" r="3" fill="#3b82f6"/>
  <circle cx="370" cy="43" r="3" fill="#3b82f6"/>
  <text x="378" y="48" font-size="11" font-weight="bold" fill="#3b82f6">A</text>
  <!-- Band B -->
  <path d="M50,190 L130,115 L210,90 L290,77 L370,68" stroke="#16a34a" stroke-width="2.5" fill="none"/>
  <circle cx="50" cy="190" r="3" fill="#16a34a"/>
  <circle cx="130" cy="115" r="3" fill="#16a34a"/>
  <circle cx="210" cy="90" r="3" fill="#16a34a"/>
  <circle cx="290" cy="77" r="3" fill="#16a34a"/>
  <circle cx="370" cy="68" r="3" fill="#16a34a"/>
  <text x="378" y="73" font-size="11" font-weight="bold" fill="#16a34a">B</text>
  <!-- Band C -->
  <path d="M50,190 L130,140 L210,115 L290,102 L370,93" stroke="#f59e0b" stroke-width="2.5" fill="none"/>
  <circle cx="50" cy="190" r="3" fill="#f59e0b"/>
  <circle cx="130" cy="140" r="3" fill="#f59e0b"/>
  <circle cx="210" cy="115" r="3" fill="#f59e0b"/>
  <circle cx="290" cy="102" r="3" fill="#f59e0b"/>
  <circle cx="370" cy="93" r="3" fill="#f59e0b"/>
  <text x="378" y="98" font-size="11" font-weight="bold" fill="#f59e0b">C</text>
  <!-- Band D (least stretchy - stiffest) -->
  <path d="M50,190 L130,165 L210,153 L290,146 L370,140" stroke="#ef4444" stroke-width="3" fill="none"/>
  <circle cx="50" cy="190" r="3" fill="#ef4444"/>
  <circle cx="130" cy="165" r="3" fill="#ef4444"/>
  <circle cx="210" cy="153" r="3" fill="#ef4444"/>
  <circle cx="290" cy="146" r="3" fill="#ef4444"/>
  <circle cx="370" cy="140" r="3" fill="#ef4444"/>
  <text x="378" y="145" font-size="11" font-weight="bold" fill="#ef4444">D (stiffest)</text>
</svg>''')

# SCI1025: Dentist using mouth mirror (light reflection)
fix('SCI1025', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Dentist's Mouth Mirror</text>
  <!-- Light source (lamp) -->
  <circle cx="50" cy="80" r="18" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <line x1="35" y1="70" x2="25" y2="60" stroke="#f59e0b" stroke-width="2"/>
  <line x1="35" y1="90" x2="25" y2="100" stroke="#f59e0b" stroke-width="2"/>
  <line x1="42" y1="62" x2="38" y2="52" stroke="#f59e0b" stroke-width="2"/>
  <line x1="58" y1="62" x2="62" y2="52" stroke="#f59e0b" stroke-width="2"/>
  <text x="50" y="115" text-anchor="middle" font-size="10" fill="#92400e">Light Source</text>
  <!-- Patient's tooth -->
  <ellipse cx="220" cy="180" rx="18" ry="22" fill="white" stroke="#64748b" stroke-width="2"/>
  <path d="M220,158 Q215,140 210,135 L230,135 Q225,140 220,158" fill="white" stroke="#64748b" stroke-width="2"/>
  <text x="220" y="215" text-anchor="middle" font-size="10" fill="#64748b">Tooth</text>
  <!-- Mouth mirror -->
  <ellipse cx="280" cy="140" rx="30" ry="20" fill="#e0f2fe" stroke="#3b82f6" stroke-width="2.5" transform="rotate(-30 280 140)"/>
  <line x1="265" y1="155" x2="245" y2="180" stroke="#64748b" stroke-width="3"/>
  <text x="280" y="200" text-anchor="middle" font-size="10" fill="#3b82f6">Mirror</text>
  <!-- Dentist's eye -->
  <circle cx="360" cy="70" r="12" fill="white" stroke="#1e293b" stroke-width="2"/>
  <circle cx="360" cy="70" r="5" fill="#1e293b"/>
  <text x="360" y="56" text-anchor="middle" font-size="10" fill="#1e293b">Dentist's Eye</text>
  <!-- Light ray 1: Source to tooth -->
  <defs>
    <marker id="arrow1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b"/>
    </marker>
  </defs>
  <path d="M68,80 Q140,120 202,170" stroke="#f59e0b" stroke-width="2" fill="none" marker-end="url(#arrow1)" stroke-dasharray="3,3"/>
  <text x="120" y="115" font-size="9" fill="#f59e0b">① Light hits tooth</text>
  <!-- Light ray 2: Tooth to mirror -->
  <defs>
    <marker id="arrow2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#16a34a"/>
    </marker>
  </defs>
  <path d="M235,172 L268,150" stroke="#16a34a" stroke-width="2" fill="none" marker-end="url(#arrow2)"/>
  <text x="260" y="168" font-size="9" fill="#16a34a">② Reflects to mirror</text>
  <!-- Light ray 3: Mirror to eye -->
  <defs>
    <marker id="arrow3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
    </marker>
  </defs>
  <path d="M295,130 Q330,100 348,75" stroke="#3b82f6" stroke-width="2" fill="none" marker-end="url(#arrow3)"/>
  <text x="325" y="95" font-size="9" fill="#3b82f6">③ Reflects to eye</text>
  <!-- Explanation box -->
  <rect x="10" y="230" width="380" height="22" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1" rx="3"/>
  <text x="200" y="245" text-anchor="middle" font-size="10" fill="#1e293b">Mirror reflects light from teeth to dentist's eyes</text>
</svg>''')

# SCI1026: Igloo showing heat conduction
fix('SCI1026', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">How Igloos Keep Eskimos Warm</text>
  <!-- Cold air outside -->
  <text x="30" y="50" font-size="11" fill="#3b82f6" font-weight="bold">Cold Air Outside</text>
  <text x="30" y="64" font-size="10" fill="#3b82f6">(-30°C)</text>
  <!-- Igloo dome made of ice blocks -->
  <path d="M200,220 Q80,220 80,130 Q80,80 120,60 Q160,40 200,40 Q240,40 280,60 Q320,80 320,130 Q320,220 200,220" fill="#e0f2fe" stroke="#3b82f6" stroke-width="2.5"/>
  <!-- Ice block pattern -->
  <path d="M120,60 Q100,80 95,105" stroke="#94a3b8" stroke-width="1" fill="none"/>
  <path d="M280,60 Q300,80 305,105" stroke="#94a3b8" stroke-width="1" fill="none"/>
  <path d="M90,130 Q85,155 85,180" stroke="#94a3b8" stroke-width="1" fill="none"/>
  <path d="M310,130 Q315,155 315,180" stroke="#94a3b8" stroke-width="1" fill="none"/>
  <line x1="100" y1="200" x2="300" y2="200" stroke="#94a3b8" stroke-width="1"/>
  <line x1="110" y1="160" x2="290" y2="160" stroke="#94a3b8" stroke-width="1"/>
  <line x1="105" y1="120" x2="295" y2="120" stroke="#94a3b8" stroke-width="1"/>
  <line x1="130" y1="85" x2="270" y2="85" stroke="#94a3b8" stroke-width="1"/>
  <!-- Entrance -->
  <rect x="185" y="195" width="30" height="25" fill="#1e293b"/>
  <text x="200" y="235" text-anchor="middle" font-size="9" fill="#64748b">Entrance</text>
  <!-- Warm air inside -->
  <circle cx="200" cy="130" r="3" fill="#ef4444"/>
  <circle cx="180" cy="115" r="2.5" fill="#ef4444"/>
  <circle cx="220" cy="115" r="2.5" fill="#ef4444"/>
  <circle cx="190" cy="145" r="2.5" fill="#ef4444"/>
  <circle cx="210" cy="145" r="2.5" fill="#ef4444"/>
  <text x="200" y="105" text-anchor="middle" font-size="11" fill="#ef4444" font-weight="bold">Warm Air Inside</text>
  <text x="200" y="118" text-anchor="middle" font-size="10" fill="#ef4444">(0°C to 15°C)</text>
  <!-- Heat flow arrows (very slow outward) -->
  <defs>
    <marker id="heatarrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L7,3 z" fill="#f59e0b"/>
    </marker>
  </defs>
  <line x1="150" y1="100" x2="110" y2="80" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#heatarrow)"/>
  <text x="125" y="85" font-size="8" fill="#f59e0b">Heat flows</text>
  <text x="125" y="94" font-size="8" fill="#f59e0b">out slowly</text>
  <line x1="250" y1="100" x2="290" y2="80" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#heatarrow)"/>
  <!-- Ice label -->
  <rect x="330" y="100" width="60" height="45" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5" rx="3"/>
  <text x="360" y="117" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e40af">Ice Blocks</text>
  <text x="360" y="131" text-anchor="middle" font-size="8" fill="#1e40af">Poor heat</text>
  <text x="360" y="141" text-anchor="middle" font-size="8" fill="#1e40af">conductor</text>
  <line x1="325" y1="120" x2="310" y2="120" stroke="#3b82f6" stroke-width="1.5"/>
</svg>''')

# SCI1027: Head torch showing energy conversion
fix('SCI1027', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 220" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Head Torch Energy Changes</text>
  <!-- Head strap -->
  <ellipse cx="200" cy="120" rx="85" ry="75" fill="none" stroke="#64748b" stroke-width="3"/>
  <!-- Battery compartment (back) -->
  <rect x="270" y="95" width="50" height="50" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="5"/>
  <text x="295" y="115" text-anchor="middle" font-size="10" font-weight="bold" fill="#92400e">Battery</text>
  <text x="295" y="128" text-anchor="middle" font-size="8" fill="#92400e">Pack</text>
  <circle cx="285" cy="135" r="3" fill="#64748b"/>
  <circle cx="305" cy="135" r="3" fill="#64748b"/>
  <!-- Wire to bulb -->
  <path d="M270,120 Q240,110 180,105" stroke="#1e293b" stroke-width="2" fill="none"/>
  <!-- Bulb/LED (front) -->
  <ellipse cx="140" cy="105" rx="22" ry="18" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <circle cx="140" cy="105" r="8" fill="#fde047" stroke="#f59e0b" stroke-width="1.5"/>
  <!-- Light rays -->
  <line x1="125" y1="95" x2="105" y2="75" stroke="#fde047" stroke-width="2.5"/>
  <line x1="120" y1="105" x2="95" y2="105" stroke="#fde047" stroke-width="2.5"/>
  <line x1="125" y1="115" x2="105" y2="135" stroke="#fde047" stroke-width="2.5"/>
  <line x1="133" y1="90" x2="123" y2="70" stroke="#fde047" stroke-width="2"/>
  <line x1="147" y1="90" x2="157" y2="70" stroke="#fde047" stroke-width="2"/>
  <line x1="133" y1="120" x2="123" y2="140" stroke="#fde047" stroke-width="2"/>
  <!-- Energy flow diagram below -->
  <rect x="30" y="170" width="100" height="40" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="5"/>
  <text x="80" y="188" text-anchor="middle" font-size="11" font-weight="bold" fill="#92400e">Chemical</text>
  <text x="80" y="202" text-anchor="middle" font-size="10" fill="#92400e">Potential Energy</text>
  <!-- Arrow 1 -->
  <line x1="130" y1="190" x2="165" y2="190" stroke="#1e293b" stroke-width="2"/>
  <polygon points="165,190 155,185 155,195" fill="#1e293b"/>
  <rect x="170" y="170" width="90" height="40" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" rx="5"/>
  <text x="215" y="188" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">Electrical</text>
  <text x="215" y="202" text-anchor="middle" font-size="10" fill="#1e40af">Energy</text>
  <!-- Arrow 2 -->
  <line x1="260" y1="190" x2="295" y2="190" stroke="#1e293b" stroke-width="2"/>
  <polygon points="295,190 285,185 285,195" fill="#1e293b"/>
  <rect x="300" y="158" width="70" height="30" fill="#fef9c3" stroke="#fde047" stroke-width="2" rx="5"/>
  <text x="335" y="177" text-anchor="middle" font-size="10" font-weight="bold" fill="#92400e">Light Energy</text>
  <text x="355" y="197" text-anchor="middle" font-size="16" fill="#1e293b">+</text>
  <rect x="300" y="198" width="70" height="30" fill="#fee2e2" stroke="#ef4444" stroke-width="2" rx="5"/>
  <text x="335" y="217" text-anchor="middle" font-size="10" font-weight="bold" fill="#991b1b">Heat Energy</text>
</svg>''')

# SCI1028: Air bubble under film
fix('SCI1028', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Film on Glass Window</text>
  <!-- Glass window -->
  <rect x="50" y="60" width="300" height="140" fill="#e0f2fe" stroke="#3b82f6" stroke-width="2"/>
  <text x="200" y="52" text-anchor="middle" font-size="11" fill="#3b82f6" font-weight="bold">Glass Window</text>
  <!-- Film layer -->
  <rect x="55" y="65" width="290" height="130" fill="none" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4,2"/>
  <text x="60" y="80" font-size="9" fill="#64748b">Protective Film</text>
  <!-- Air bubble (normal temperature) -->
  <ellipse cx="150" cy="130" rx="35" ry="20" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <text x="150" y="135" text-anchor="middle" font-size="10" fill="#92400e">Air Bubble</text>
  <!-- Air molecules (normal temp) -->
  <circle cx="135" cy="125" r="2.5" fill="#64748b"/>
  <circle cx="150" cy="130" r="2.5" fill="#64748b"/>
  <circle cx="165" cy="125" r="2.5" fill="#64748b"/>
  <circle cx="142" cy="135" r="2.5" fill="#64748b"/>
  <circle cx="158" cy="135" r="2.5" fill="#64748b"/>
  <!-- Temperature indicator (normal) -->
  <rect x="220" y="110" width="80" height="50" fill="#e0f2fe" stroke="#3b82f6" stroke-width="1.5" rx="4"/>
  <text x="260" y="128" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e40af">Normal Temp</text>
  <text x="260" y="142" text-anchor="middle" font-size="9" fill="#1e40af">Volume: V</text>
  <text x="260" y="154" text-anchor="middle" font-size="9" fill="#1e40af">Mass: M</text>
  <!-- Arrow indicating heat -->
  <line x1="200" y1="35" x2="200" y2="55" stroke="#ef4444" stroke-width="3"/>
  <polygon points="200,55 195,45 205,45" fill="#ef4444"/>
  <text x="200" y="32" text-anchor="middle" font-size="11" font-weight="bold" fill="#ef4444">☀ Hot Weather</text>
  <!-- After heating (dashed outline) -->
  <ellipse cx="150" cy="130" rx="48" ry="26" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="5,3"/>
  <text x="115" y="165" font-size="9" fill="#ef4444">Expanded bubble</text>
  <!-- Info box -->
  <rect x="50" y="210" width="300" height="24" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5" rx="3"/>
  <text x="200" y="227" text-anchor="middle" font-size="10" fill="#92400e">Hot → Air expands → Volume ↑, Mass stays same</text>
</svg>''')

# SCI1029: Graph showing mass of cloths after drying
fix('SCI1029', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Mass of Wet Cloths After 1 Hour</text>
  <!-- Axes -->
  <line x1="50" y1="50" x2="50" y2="230" stroke="#1e293b" stroke-width="2"/>
  <line x1="50" y1="230" x2="370" y2="230" stroke="#1e293b" stroke-width="2"/>
  <!-- Y-axis label -->
  <text x="20" y="140" text-anchor="middle" font-size="11" fill="#1e293b" transform="rotate(-90, 20, 140)">Mass (g)</text>
  <!-- Y-axis ticks -->
  <line x1="45" y1="60" x2="50" y2="60" stroke="#1e293b" stroke-width="1.5"/>
  <text x="38" y="64" text-anchor="end" font-size="10" fill="#64748b">100</text>
  <line x1="45" y1="110" x2="50" y2="110" stroke="#1e293b" stroke-width="1.5"/>
  <text x="38" y="114" text-anchor="end" font-size="10" fill="#64748b">80</text>
  <line x1="45" y1="160" x2="50" y2="160" stroke="#1e293b" stroke-width="1.5"/>
  <text x="38" y="164" text-anchor="end" font-size="10" fill="#64748b">60</text>
  <line x1="45" y1="210" x2="50" y2="210" stroke="#1e293b" stroke-width="1.5"/>
  <text x="38" y="214" text-anchor="end" font-size="10" fill="#64748b">40</text>
  <!-- X-axis label -->
  <text x="210" y="250" text-anchor="middle" font-size="11" fill="#1e293b">Cloth</text>
  <!-- Bar A (heaviest - least dried) -->
  <rect x="70" y="110" width="60" height="120" fill="#3b82f6" stroke="#1e40af" stroke-width="2"/>
  <text x="100" y="245" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e293b">A</text>
  <text x="100" y="100" text-anchor="middle" font-size="11" font-weight="bold" fill="#3b82f6">80g</text>
  <!-- Bar B (lightest - most dried) -->
  <rect x="150" y="210" width="60" height="20" fill="#16a34a" stroke="#15803d" stroke-width="2"/>
  <text x="180" y="245" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e293b">B</text>
  <text x="180" y="202" text-anchor="middle" font-size="11" font-weight="bold" fill="#16a34a">40g</text>
  <!-- Bar C -->
  <rect x="230" y="160" width="60" height="70" fill="#f59e0b" stroke="#d97706" stroke-width="2"/>
  <text x="260" y="245" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e293b">C</text>
  <text x="260" y="150" text-anchor="middle" font-size="11" font-weight="bold" fill="#f59e0b">60g</text>
  <!-- Bar D -->
  <rect x="310" y="135" width="60" height="95" fill="#ef4444" stroke="#dc2626" stroke-width="2"/>
  <text x="340" y="245" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e293b">D</text>
  <text x="340" y="125" text-anchor="middle" font-size="11" font-weight="bold" fill="#ef4444">70g</text>
  <!-- Drying conditions key -->
  <rect x="50" y="260" width="320" height="18" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1" rx="3"/>
  <text x="210" y="272" text-anchor="middle" font-size="8" fill="#475569">Cond. 1: Hot+Windy | Cond. 2: Hot+No wind | Cond. 3: Cool+Windy | Cond. 4: Cool+No wind+Folded</text>
</svg>''')

# SCI1030: Table showing melting/boiling points
fix('SCI1030', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 180" width="380" font-family="Arial,sans-serif">
  <text x="190" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Melting and Boiling Points</text>
  <!-- Header row -->
  <rect x="30" y="35" width="90" height="35" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="75" y="57" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Substance</text>
  <rect x="120" y="35" width="110" height="35" fill="#dbeafe" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="175" y="50" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">Melting Point</text>
  <text x="175" y="63" text-anchor="middle" font-size="10" fill="#1e40af">(°C)</text>
  <rect x="230" y="35" width="110" height="35" fill="#fee2e2" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="285" y="50" text-anchor="middle" font-size="11" font-weight="bold" fill="#991b1b">Boiling Point</text>
  <text x="285" y="63" text-anchor="middle" font-size="10" fill="#991b1b">(°C)</text>
  <!-- Substance E -->
  <rect x="30" y="70" width="90" height="30" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <text x="75" y="90" text-anchor="middle" font-size="14" font-weight="bold" fill="#92400e">E</text>
  <rect x="120" y="70" width="110" height="30" fill="#fefce8" stroke="#f59e0b" stroke-width="2"/>
  <text x="175" y="90" text-anchor="middle" font-size="13" fill="#92400e">2</text>
  <rect x="230" y="70" width="110" height="30" fill="#fefce8" stroke="#f59e0b" stroke-width="2"/>
  <text x="285" y="90" text-anchor="middle" font-size="13" font-weight="bold" fill="#ef4444">29</text>
  <!-- Substance F -->
  <rect x="30" y="100" width="90" height="30" fill="#e0f2fe" stroke="#3b82f6" stroke-width="2"/>
  <text x="75" y="120" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e40af">F</text>
  <rect x="120" y="100" width="110" height="30" fill="#f0f9ff" stroke="#3b82f6" stroke-width="2"/>
  <text x="175" y="120" text-anchor="middle" font-size="13" fill="#1e40af">10</text>
  <rect x="230" y="100" width="110" height="30" fill="#f0f9ff" stroke="#3b82f6" stroke-width="2"/>
  <text x="285" y="120" text-anchor="middle" font-size="13" font-weight="bold" fill="#ef4444">21</text>
  <!-- Substance G -->
  <rect x="30" y="130" width="90" height="30" fill="white" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="75" y="150" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">G</text>
  <rect x="120" y="130" width="110" height="30" fill="white" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="175" y="150" text-anchor="middle" font-size="13" fill="#1e293b">32</text>
  <rect x="230" y="130" width="110" height="30" fill="white" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="285" y="150" text-anchor="middle" font-size="13" fill="#1e293b">50</text>
  <!-- Info box -->
  <rect x="30" y="165" width="310" height="12" fill="#fef3c7" stroke="#f59e0b" stroke-width="1"/>
  <text x="185" y="173" text-anchor="middle" font-size="9" fill="#92400e">At 30°C: E and F are gases (boiling point &lt; 30°C) → need sealed containers</text>
</svg>''')

# SCI1031: Circuit with materials P, Q, R
fix('SCI1031', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 240" width="420" font-family="Arial,sans-serif">
  <text x="210" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Circuit with Materials P, Q, and R</text>
  <!-- Battery -->
  <rect x="30" y="105" width="50" height="30" fill="#fef3c7" stroke="#1e293b" stroke-width="2" rx="3"/>
  <text x="55" y="125" text-anchor="middle" font-size="12" fill="#1e293b">⊕ ⊖</text>
  <text x="55" y="150" text-anchor="middle" font-size="9" fill="#64748b">Battery</text>
  <!-- Wire from battery + -->
  <line x1="80" y1="110" x2="120" y2="110" stroke="#1e293b" stroke-width="2.5"/>
  <!-- Bulb B1 (top left) -->
  <circle cx="140" cy="110" r="16" fill="#fef9c3" stroke="#1e293b" stroke-width="2"/>
  <path d="M130,105 L140,115 L150,105 L140,95" stroke="#f59e0b" stroke-width="2" fill="none"/>
  <text x="140" y="92" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">B1</text>
  <!-- Material P (conductor: copper) -->
  <rect x="160" y="100" width="60" height="20" fill="#f97316" stroke="#1e293b" stroke-width="2" rx="3"/>
  <text x="190" y="113" text-anchor="middle" font-size="11" font-weight="bold" fill="white">P</text>
  <text x="190" y="90" text-anchor="middle" font-size="9" fill="#f97316">Copper</text>
  <!-- Wire to junction -->
  <line x1="220" y1="110" x2="280" y2="110" stroke="#1e293b" stroke-width="2.5"/>
  <!-- Junction splits -->
  <circle cx="280" cy="110" r="4" fill="#1e293b"/>
  <line x1="280" y1="110" x2="280" y2="60" stroke="#1e293b" stroke-width="2.5"/>
  <line x1="280" y1="110" x2="280" y2="160" stroke="#1e293b" stroke-width="2.5"/>
  <!-- Bulb B2 (top path) -->
  <line x1="280" y1="60" x2="310" y2="60" stroke="#1e293b" stroke-width="2.5"/>
  <circle cx="330" cy="60" r="16" fill="#e2e8f0" stroke="#1e293b" stroke-width="2"/>
  <path d="M320,55 L330,65 L340,55 L330,45" stroke="#64748b" stroke-width="2" fill="none"/>
  <text x="330" y="42" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">B2</text>
  <!-- Material Q (insulator: glass) - breaks circuit -->
  <rect x="350" y="50" width="60" height="20" fill="#e0f2fe" stroke="#1e293b" stroke-width="2" rx="3"/>
  <text x="380" y="63" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">Q</text>
  <text x="380" y="43" text-anchor="middle" font-size="9" fill="#3b82f6">Glass</text>
  <text x="390" y="80" text-anchor="start" font-size="8" fill="#ef4444">✗ No current</text>
  <!-- Bulb B3 (bottom path) -->
  <line x1="280" y1="160" x2="310" y2="160" stroke="#1e293b" stroke-width="2.5"/>
  <circle cx="330" cy="160" r="16" fill="#fef9c3" stroke="#1e293b" stroke-width="2"/>
  <path d="M320,155 L330,165 L340,155 L330,145" stroke="#f59e0b" stroke-width="2" fill="none"/>
  <text x="330" y="142" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">B3</text>
  <!-- Material R (conductor: iron) -->
  <rect x="350" y="150" width="60" height="20" fill="#64748b" stroke="#1e293b" stroke-width="2" rx="3"/>
  <text x="380" y="163" text-anchor="middle" font-size="11" font-weight="bold" fill="white">R</text>
  <text x="380" y="143" text-anchor="middle" font-size="9" fill="#64748b">Iron</text>
  <!-- Paths rejoin -->
  <line x1="410" y1="60" x2="430" y2="60" stroke="#1e293b" stroke-width="2.5"/>
  <line x1="410" y1="160" x2="430" y2="160" stroke="#1e293b" stroke-width="2.5"/>
  <circle cx="430" cy="110" r="4" fill="#1e293b"/>
  <line x1="430" y1="60" x2="430" y2="160" stroke="#1e293b" stroke-width="2.5"/>
  <!-- Bulb B4 -->
  <line x1="430" y1="110" x2="450" y2="110" stroke="#1e293b" stroke-width="2.5"/>
  <circle cx="470" cy="110" r="16" fill="#fef9c3" stroke="#1e293b" stroke-width="2"/>
  <path d="M460,105 L470,115 L480,105 L470,95" stroke="#f59e0b" stroke-width="2" fill="none"/>
  <text x="470" y="92" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">B4</text>
  <!-- Return to battery -->
  <line x1="486" y1="110" x2="486" y2="200" stroke="#1e293b" stroke-width="2.5"/>
  <line x1="486" y1="200" x2="30" y2="200" stroke="#1e293b" stroke-width="2.5"/>
  <line x1="30" y1="200" x2="30" y2="135" stroke="#1e293b" stroke-width="2.5"/>
  <!-- Result -->
  <rect x="120" y="215" width="180" height="20" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5" rx="3"/>
  <text x="210" y="229" text-anchor="middle" font-size="10" fill="#15803d">✓ Bulbs lit: B1, B3, B4 (3 bulbs)</text>
</svg>''')

# SCI1032: EXIT sign circuit arrangements
fix('SCI1032', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 380" width="500" font-family="Arial,sans-serif">
  <text x="250" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">EXIT Sign Circuit Arrangements</text>
  <text x="250" y="33" text-anchor="middle" font-size="10" fill="#64748b">X, I, T are lit ✓ | E is not lit ✗</text>
  <!-- Arrangement 1: All in series -->
  <text x="120" y="58" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">(1) All Series</text>
  <rect x="20" y="65" width="200" height="70" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" rx="4"/>
  <!-- Battery -->
  <rect x="30" y="85" width="20" height="30" fill="#fef3c7" stroke="#1e293b" stroke-width="1.5"/>
  <!-- Series circuit -->
  <line x1="50" y1="90" x2="70" y2="90" stroke="#1e293b" stroke-width="2"/>
  <circle cx="80" cy="90" r="8" fill="#16a34a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="80" y="94" text-anchor="middle" font-size="9" fill="white">E</text>
  <line x1="88" y1="90" x2="102" y2="90" stroke="#1e293b" stroke-width="2"/>
  <circle cx="112" cy="90" r="8" fill="#16a34a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="112" y="94" text-anchor="middle" font-size="9" fill="white">X</text>
  <line x1="120" y1="90" x2="134" y2="90" stroke="#1e293b" stroke-width="2"/>
  <circle cx="144" cy="90" r="8" fill="#16a34a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="144" y="94" text-anchor="middle" font-size="9" fill="white">I</text>
  <line x1="152" y1="90" x2="166" y2="90" stroke="#1e293b" stroke-width="2"/>
  <circle cx="176" cy="90" r="8" fill="#16a34a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="176" y="94" text-anchor="middle" font-size="9" fill="white">T</text>
  <line x1="184" y1="90" x2="200" y2="90" stroke="#1e293b" stroke-width="2"/>
  <line x1="200" y1="90" x2="200" y2="115" stroke="#1e293b" stroke-width="2"/>
  <line x1="200" y1="115" x2="30" y2="115" stroke="#1e293b" stroke-width="2"/>
  <line x1="30" y1="115" x2="30" y2="115" stroke="#1e293b" stroke-width="2"/>
  <text x="120" y="125" text-anchor="middle" font-size="9" fill="#ef4444">✗ If E fails, all go out</text>
  <!-- Arrangement 2: Pair series -->
  <text x="370" y="58" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">(2) Pair Series</text>
  <rect x="270" y="65" width="200" height="70" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" rx="4"/>
  <rect x="280" y="85" width="20" height="30" fill="#fef3c7" stroke="#1e293b" stroke-width="1.5"/>
  <line x1="300" y1="90" x2="320" y2="90" stroke="#1e293b" stroke-width="2"/>
  <circle cx="330" cy="90" r="8" fill="#16a34a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="330" y="94" text-anchor="middle" font-size="9" fill="white">E</text>
  <line x1="338" y1="90" x2="352" y2="90" stroke="#1e293b" stroke-width="2"/>
  <circle cx="362" cy="90" r="8" fill="#16a34a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="362" y="94" text-anchor="middle" font-size="9" fill="white">X</text>
  <line x1="370" y1="90" x2="400" y2="90" stroke="#1e293b" stroke-width="2"/>
  <line x1="300" y1="105" x2="320" y2="105" stroke="#1e293b" stroke-width="2"/>
  <circle cx="330" cy="105" r="8" fill="#16a34a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="330" y="109" text-anchor="middle" font-size="9" fill="white">I</text>
  <line x1="338" y1="105" x2="352" y2="105" stroke="#1e293b" stroke-width="2"/>
  <circle cx="362" cy="105" r="8" fill="#16a34a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="362" y="109" text-anchor="middle" font-size="9" fill="white">T</text>
  <line x1="370" y1="105" x2="400" y2="105" stroke="#1e293b" stroke-width="2"/>
  <text x="370" y="125" text-anchor="middle" font-size="9" fill="#ef4444">✗ Wrong grouping</text>
  <!-- Arrangement 3: All parallel (CORRECT) -->
  <text x="120" y="158" text-anchor="middle" font-size="12" font-weight="bold" fill="#16a34a">(3) All Parallel ✓</text>
  <rect x="20" y="165" width="200" height="90" fill="#f0fdf4" stroke="#16a34a" stroke-width="2.5" rx="4"/>
  <rect x="30" y="185" width="20" height="30" fill="#fef3c7" stroke="#1e293b" stroke-width="1.5"/>
  <line x1="50" y1="190" x2="70" y2="190" stroke="#1e293b" stroke-width="2"/>
  <circle cx="70" cy="190" r="4" fill="#1e293b"/>
  <line x1="70" y1="190" x2="70" y2="175" stroke="#1e293b" stroke-width="2"/>
  <line x1="70" y1="190" x2="70" y2="185" stroke="#1e293b" stroke-width="2"/>
  <line x1="70" y1="190" x2="70" y2="195" stroke="#1e293b" stroke-width="2"/>
  <line x1="70" y1="190" x2="70" y2="205" stroke="#1e293b" stroke-width="2"/>
  <!-- E branch (not lit) -->
  <line x1="70" y1="175" x2="90" y2="175" stroke="#1e293b" stroke-width="2"/>
  <circle cx="100" cy="175" r="8" fill="#e2e8f0" stroke="#1e293b" stroke-width="1.5"/>
  <text x="100" y="179" text-anchor="middle" font-size="9" fill="#64748b">E</text>
  <line x1="108" y1="175" x2="128" y2="175" stroke="#ef4444" stroke-width="2" stroke-dasharray="2,2"/>
  <text x="118" y="170" text-anchor="middle" font-size="8" fill="#ef4444">✗</text>
  <!-- X branch (lit) -->
  <line x1="70" y1="185" x2="90" y2="185" stroke="#1e293b" stroke-width="2"/>
  <circle cx="100" cy="185" r="8" fill="#fde047" stroke="#1e293b" stroke-width="1.5"/>
  <text x="100" y="189" text-anchor="middle" font-size="9" fill="#92400e">X</text>
  <line x1="108" y1="185" x2="128" y2="185" stroke="#1e293b" stroke-width="2"/>
  <!-- I branch (lit) -->
  <line x1="70" y1="195" x2="90" y2="195" stroke="#1e293b" stroke-width="2"/>
  <circle cx="100" cy="195" r="8" fill="#fde047" stroke="#1e293b" stroke-width="1.5"/>
  <text x="100" y="199" text-anchor="middle" font-size="9" fill="#92400e">I</text>
  <line x1="108" y1="195" x2="128" y2="195" stroke="#1e293b" stroke-width="2"/>
  <!-- T branch (lit) -->
  <line x1="70" y1="205" x2="90" y2="205" stroke="#1e293b" stroke-width="2"/>
  <circle cx="100" cy="205" r="8" fill="#fde047" stroke="#1e293b" stroke-width="1.5"/>
  <text x="100" y="209" text-anchor="middle" font-size="9" fill="#92400e">T</text>
  <line x1="108" y1="205" x2="128" y2="205" stroke="#1e293b" stroke-width="2"/>
  <!-- Rejoin -->
  <circle cx="128" cy="190" r="4" fill="#1e293b"/>
  <line x1="128" y1="175" x2="128" y2="205" stroke="#1e293b" stroke-width="2"/>
  <line x1="128" y1="190" x2="190" y2="190" stroke="#1e293b" stroke-width="2"/>
  <line x1="190" y1="190" x2="190" y2="215" stroke="#1e293b" stroke-width="2"/>
  <line x1="190" y1="215" x2="30" y2="215" stroke="#1e293b" stroke-width="2"/>
  <line x1="30" y1="215" x2="30" y2="215" stroke="#1e293b" stroke-width="2"/>
  <text x="120" y="245" text-anchor="middle" font-size="9" font-weight="bold" fill="#16a34a">✓ E fails, others still lit</text>
  <!-- Arrangement 4: Mixed -->
  <text x="370" y="158" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">(4) Mixed</text>
  <rect x="270" y="165" width="200" height="90" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" rx="4"/>
  <rect x="280" y="185" width="20" height="30" fill="#fef3c7" stroke="#1e293b" stroke-width="1.5"/>
  <line x1="300" y1="190" x2="320" y2="190" stroke="#1e293b" stroke-width="2"/>
  <circle cx="330" cy="190" r="8" fill="#16a34a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="330" y="194" text-anchor="middle" font-size="9" fill="white">E</text>
  <line x1="338" y1="190" x2="350" y2="190" stroke="#1e293b" stroke-width="2"/>
  <circle cx="350" cy="190" r="4" fill="#1e293b"/>
  <line x1="350" y1="190" x2="350" y2="180" stroke="#1e293b" stroke-width="2"/>
  <line x1="350" y1="190" x2="350" y2="200" stroke="#1e293b" stroke-width="2"/>
  <circle cx="370" cy="180" r="8" fill="#16a34a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="370" y="184" text-anchor="middle" font-size="9" fill="white">X</text>
  <circle cx="370" cy="200" r="8" fill="#16a34a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="370" y="204" text-anchor="middle" font-size="9" fill="white">I</text>
  <circle cx="390" cy="190" r="4" fill="#1e293b"/>
  <circle cx="410" cy="190" r="8" fill="#16a34a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="410" y="194" text-anchor="middle" font-size="9" fill="white">T</text>
  <text x="370" y="245" text-anchor="middle" font-size="9" fill="#ef4444">✗ If E fails, all go out</text>
  <!-- Summary -->
  <rect x="20" y="270" width="460" height="100" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" rx="6"/>
  <text x="250" y="290" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e40af">Why Arrangement (3) is Correct:</text>
  <text x="250" y="310" text-anchor="middle" font-size="11" fill="#1e293b">• All bulbs are in parallel branches</text>
  <text x="250" y="328" text-anchor="middle" font-size="11" fill="#1e293b">• When E fails (bulb breaks), current still flows through X, I, and T</text>
  <text x="250" y="346" text-anchor="middle" font-size="11" fill="#1e293b">• Each bulb operates independently → faulty E doesn't affect others</text>
  <text x="250" y="362" text-anchor="middle" font-size="10" font-weight="bold" fill="#16a34a">Result: X, I, T remain lit ✓</text>
</svg>''')

# SCI1033: Graph showing spring extension
fix('SCI1033', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Spring Extension vs Load</text>
  <text x="200" y="32" text-anchor="middle" font-size="10" fill="#64748b">Initial length: 8 cm</text>
  <!-- Axes -->
  <line x1="50" y1="50" x2="50" y2="250" stroke="#1e293b" stroke-width="2"/>
  <line x1="50" y1="250" x2="370" y2="250" stroke="#1e293b" stroke-width="2"/>
  <!-- Y-axis label -->
  <text x="20" y="150" text-anchor="middle" font-size="11" fill="#1e293b" transform="rotate(-90, 20, 150)">Extension (cm)</text>
  <!-- Y-axis ticks -->
  <line x1="45" y1="50" x2="50" y2="50" stroke="#1e293b" stroke-width="1.5"/>
  <text x="38" y="54" text-anchor="end" font-size="10" fill="#64748b">10</text>
  <line x1="45" y1="90" x2="50" y2="90" stroke="#1e293b" stroke-width="1.5"/>
  <text x="38" y="94" text-anchor="end" font-size="10" fill="#64748b">8</text>
  <line x1="45" y1="130" x2="50" y2="130" stroke="#1e293b" stroke-width="1.5"/>
  <text x="38" y="134" text-anchor="end" font-size="10" fill="#64748b">6</text>
  <line x1="45" y1="170" x2="50" y2="170" stroke="#1e293b" stroke-width="1.5"/>
  <text x="38" y="174" text-anchor="end" font-size="10" fill="#64748b">4</text>
  <line x1="45" y1="210" x2="50" y2="210" stroke="#1e293b" stroke-width="1.5"/>
  <text x="38" y="214" text-anchor="end" font-size="10" fill="#64748b">2</text>
  <line x1="45" y1="250" x2="50" y2="250" stroke="#1e293b" stroke-width="1.5"/>
  <text x="38" y="254" text-anchor="end" font-size="10" fill="#64748b">0</text>
  <!-- X-axis label -->
  <text x="210" y="278" text-anchor="middle" font-size="11" fill="#1e293b">Mass of Load (g)</text>
  <!-- X-axis ticks -->
  <line x1="130" y1="250" x2="130" y2="255" stroke="#1e293b" stroke-width="1.5"/>
  <text x="130" y="268" text-anchor="middle" font-size="10" fill="#64748b">100</text>
  <line x1="210" y1="250" x2="210" y2="255" stroke="#1e293b" stroke-width="1.5"/>
  <text x="210" y="268" text-anchor="middle" font-size="10" fill="#64748b">200</text>
  <line x1="290" y1="250" x2="290" y2="255" stroke="#1e293b" stroke-width="1.5"/>
  <text x="290" y="268" text-anchor="middle" font-size="10" fill="#64748b">300</text>
  <line x1="370" y1="250" x2="370" y2="255" stroke="#1e293b" stroke-width="1.5"/>
  <text x="370" y="268" text-anchor="middle" font-size="10" fill="#64748b">400</text>
  <!-- Grid lines -->
  <line x1="50" y1="210" x2="370" y2="210" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="50" y1="170" x2="370" y2="170" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="50" y1="130" x2="370" y2="130" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="50" y1="90" x2="370" y2="90" stroke="#e2e8f0" stroke-width="1"/>
  <!-- Spring Q (less stiff - steeper slope) -->
  <path d="M50,250 L130,210 L210,170 L290,130 L370,90" stroke="#3b82f6" stroke-width="3" fill="none"/>
  <circle cx="50" cy="250" r="4" fill="#3b82f6"/>
  <circle cx="130" cy="210" r="4" fill="#3b82f6"/>
  <circle cx="210" cy="170" r="4" fill="#3b82f6"/>
  <circle cx="290" cy="130" r="4" fill="#3b82f6"/>
  <circle cx="370" cy="90" r="4" fill="#3b82f6"/>
  <text x="378" y="94" font-size="12" font-weight="bold" fill="#3b82f6">Q</text>
  <!-- Spring R (stiffer - gentler slope) -->
  <path d="M50,250 L130,230 L210,210 L290,190 L370,170" stroke="#16a34a" stroke-width="3" fill="none"/>
  <circle cx="50" cy="250" r="4" fill="#16a34a"/>
  <circle cx="130" cy="230" r="4" fill="#16a34a"/>
  <circle cx="210" cy="210" r="4" fill="#16a34a"/>
  <circle cx="290" cy="190" r="4" fill="#16a34a"/>
  <circle cx="370" cy="170" r="4" fill="#16a34a"/>
  <text x="378" y="174" font-size="12" font-weight="bold" fill="#16a34a">R</text>
  <!-- Annotations -->
  <line x1="210" y1="250" x2="210" y2="170" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4,2"/>
  <text x="218" y="205" font-size="9" fill="#f59e0b">200g load:</text>
  <text x="218" y="216" font-size="9" fill="#3b82f6">Q extends 4cm</text>
  <text x="218" y="227" font-size="9" fill="#16a34a">R extends 2cm</text>
  <!-- Final length annotation -->
  <rect x="60" y="285" width="280" height="12" fill="#fef3c7" stroke="#f59e0b" stroke-width="1" rx="2"/>
  <text x="200" y="293" text-anchor="middle" font-size="9" fill="#92400e">Final length = Initial (8cm) + Extension | Q at 200g: 8+4=12cm | R at 200g: 8+2=10cm</text>
</svg>''')

# SCI1034: Frames creating shadows
fix('SCI1034', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 280" width="480" font-family="Arial,sans-serif">
  <text x="240" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Shadow Formation by Frames P, Q, R</text>
  <!-- Lamp (light source) -->
  <circle cx="50" cy="140" r="20" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <circle cx="50" cy="140" r="10" fill="#fde047"/>
  <line x1="30" y1="130" x2="20" y2="120" stroke="#f59e0b" stroke-width="2"/>
  <line x1="30" y1="150" x2="20" y2="160" stroke="#f59e0b" stroke-width="2"/>
  <line x1="50" y1="115" x2="50" y2="100" stroke="#f59e0b" stroke-width="2"/>
  <line x1="50" y1="165" x2="50" y2="180" stroke="#f59e0b" stroke-width="2"/>
  <text x="50" y="195" text-anchor="middle" font-size="10" fill="#92400e">Lamp</text>
  <!-- Position 1: Frame Q (largest - closest to lamp) -->
  <rect x="120" y="100" width="60" height="80" fill="none" stroke="#3b82f6" stroke-width="4" rx="4"/>
  <text x="150" y="95" text-anchor="middle" font-size="11" font-weight="bold" fill="#3b82f6">Frame Q</text>
  <text x="150" y="200" text-anchor="middle" font-size="9" fill="#3b82f6">Position 1</text>
  <text x="150" y="211" text-anchor="middle" font-size="8" fill="#3b82f6">(closest to lamp)</text>
  <!-- Position 2: Frame R (medium) -->
  <rect x="220" y="115" width="48" height="50" fill="none" stroke="#16a34a" stroke-width="3.5" rx="3"/>
  <text x="244" y="110" text-anchor="middle" font-size="11" font-weight="bold" fill="#16a34a">Frame R</text>
  <text x="244" y="185" text-anchor="middle" font-size="9" fill="#16a34a">Position 2</text>
  <text x="244" y="196" text-anchor="middle" font-size="8" fill="#16a34a">(middle)</text>
  <!-- Position 3: Frame P (smallest - farthest from lamp) -->
  <rect x="300" y="125" width="32" height="30" fill="none" stroke="#f59e0b" stroke-width="3" rx="2"/>
  <text x="316" y="120" text-anchor="middle" font-size="11" font-weight="bold" fill="#f59e0b">Frame P</text>
  <text x="316" y="172" text-anchor="middle" font-size="9" fill="#f59e0b">Position 3</text>
  <text x="316" y="183" text-anchor="middle" font-size="8" fill="#f59e0b">(farthest from lamp)</text>
  <!-- Screen -->
  <rect x="400" y="60" width="15" height="160" fill="#f1f5f9" stroke="#475569" stroke-width="2"/>
  <text x="407" y="50" text-anchor="middle" font-size="10" fill="#475569">Screen</text>
  <!-- Light rays and shadows -->
  <defs>
    <linearGradient id="shadowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#94a3b8;stop-opacity:0.2"/>
      <stop offset="100%" style="stop-color:#1e293b;stop-opacity:0.7"/>
    </linearGradient>
  </defs>
  <!-- Light rays from lamp through frames to screen -->
  <path d="M70,130 L120,100 L400,40" stroke="#fde047" stroke-width="1" opacity="0.4" stroke-dasharray="2,2"/>
  <path d="M70,150 L120,180 L400,220" stroke="#fde047" stroke-width="1" opacity="0.4" stroke-dasharray="2,2"/>
  <!-- Shadow Q (largest) -->
  <rect x="400" y="40" width="10" height="180" fill="#3b82f6" opacity="0.3"/>
  <!-- Shadow R (medium) -->
  <rect x="400" y="70" width="10" height="120" fill="#16a34a" opacity="0.4"/>
  <!-- Shadow P (smallest) -->
  <rect x="400" y="100" width="10" height="60" fill="#f59e0b" opacity="0.5"/>
  <!-- Shadow sizes on screen -->
  <text x="435" y="90" font-size="9" fill="#3b82f6">Q: Large</text>
  <text x="435" y="140" font-size="9" fill="#16a34a">R: Medium</text>
  <text x="435" y="165" font-size="9" fill="#f59e0b">P: Small</text>
  <!-- Explanation box -->
  <rect x="60" y="230" width="360" height="45" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5" rx="4"/>
  <text x="240" y="247" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">Shadow Size Principle:</text>
  <text x="240" y="261" text-anchor="middle" font-size="10" fill="#1e293b">Objects closer to light source cast larger shadows</text>
  <text x="240" y="272" text-anchor="middle" font-size="9" fill="#64748b">Position 1 (Q) → Largest shadow | Position 2 (R) → Medium | Position 3 (P) → Smallest</text>
</svg>''')

# SCI1035: Graph showing energy types (ball on slope)
fix('SCI1035', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" width="480" font-family="Arial,sans-serif">
  <text x="240" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Energy of Ball at Point P</text>
  <!-- Original condition (smooth slope) -->
  <text x="120" y="45" text-anchor="middle" font-size="12" font-weight="bold" fill="#3b82f6">Original (Smooth Slope)</text>
  <rect x="20" y="55" width="200" height="110" fill="#f8fafc" stroke="#3b82f6" stroke-width="2" rx="4"/>
  <!-- Bar chart for original -->
  <text x="120" y="75" text-anchor="middle" font-size="10" fill="#64748b">Energy at Point P:</text>
  <!-- Kinetic energy bar (large) -->
  <rect x="30" y="85" width="50" height="70" fill="#3b82f6" stroke="#1e40af" stroke-width="1.5"/>
  <text x="55" y="125" text-anchor="middle" font-size="9" font-weight="bold" fill="white">High</text>
  <text x="55" y="135" text-anchor="middle" font-size="9" font-weight="bold" fill="white">KE</text>
  <text x="55" y="175" text-anchor="middle" font-size="9" fill="#1e293b">Kinetic</text>
  <!-- Potential energy bar (low - same height) -->
  <rect x="95" y="125" width="50" height="30" fill="#16a34a" stroke="#15803d" stroke-width="1.5"/>
  <text x="120" y="144" text-anchor="middle" font-size="9" font-weight="bold" fill="white">Low PE</text>
  <text x="120" y="175" text-anchor="middle" font-size="9" fill="#1e293b">Potential</text>
  <!-- Heat energy bar (small - low friction) -->
  <rect x="160" y="145" width="50" height="10" fill="#f59e0b" stroke="#d97706" stroke-width="1.5"/>
  <text x="185" y="152" text-anchor="middle" font-size="8" font-weight="bold" fill="white">Low</text>
  <text x="185" y="175" text-anchor="middle" font-size="9" fill="#1e293b">Heat</text>
  <!-- With sand condition (high friction) -->
  <text x="360" y="45" text-anchor="middle" font-size="12" font-weight="bold" fill="#ef4444">With Sand (High Friction)</text>
  <rect x="260" y="55" width="200" height="110" fill="#fef2f2" stroke="#ef4444" stroke-width="2.5" rx="4"/>
  <!-- Bar chart for sand -->
  <text x="360" y="75" text-anchor="middle" font-size="10" fill="#64748b">Energy at Point P:</text>
  <!-- Kinetic energy bar (smaller due to friction) -->
  <rect x="270" y="105" width="50" height="50" fill="#3b82f6" stroke="#1e40af" stroke-width="1.5"/>
  <text x="295" y="128" text-anchor="middle" font-size="9" font-weight="bold" fill="white">Lower</text>
  <text x="295" y="138" text-anchor="middle" font-size="9" font-weight="bold" fill="white">KE</text>
  <text x="295" y="175" text-anchor="middle" font-size="9" fill="#1e293b">Kinetic</text>
  <!-- Potential energy bar (same - same height) -->
  <rect x="335" y="125" width="50" height="30" fill="#16a34a" stroke="#15803d" stroke-width="1.5"/>
  <text x="360" y="144" text-anchor="middle" font-size="9" font-weight="bold" fill="white">Same PE</text>
  <text x="360" y="175" text-anchor="middle" font-size="9" fill="#1e293b">Potential</text>
  <!-- Heat energy bar (larger - more friction) -->
  <rect x="400" y="105" width="50" height="50" fill="#ef4444" stroke="#dc2626" stroke-width="1.5"/>
  <text x="425" y="128" text-anchor="middle" font-size="9" font-weight="bold" fill="white">Higher</text>
  <text x="425" y="138" text-anchor="middle" font-size="9" font-weight="bold" fill="white">Heat</text>
  <text x="425" y="175" text-anchor="middle" font-size="9" fill="#1e293b">Heat</text>
  <!-- Slope diagrams -->
  <text x="240" y="200" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Slope Comparison:</text>
  <!-- Original smooth slope -->
  <path d="M60,240 L60,220 L150,240" stroke="#3b82f6" stroke-width="3" fill="none"/>
  <circle cx="120" cy="234" r="6" fill="#ef4444" stroke="#1e293b" stroke-width="1.5"/>
  <text x="120" y="232" text-anchor="middle" font-size="8" fill="white">P</text>
  <text x="105" y="260" text-anchor="middle" font-size="10" fill="#3b82f6">Smooth slope</text>
  <text x="105" y="272" text-anchor="middle" font-size="9" fill="#64748b">(low friction)</text>
  <!-- Sand-covered slope -->
  <path d="M250,240 L250,220 L340,240" stroke="#ef4444" stroke-width="3" fill="none"/>
  <!-- Sand texture -->
  <circle cx="270" cy="237" r="1.5" fill="#f59e0b"/>
  <circle cx="280" cy="238" r="1.5" fill="#f59e0b"/>
  <circle cx="290" cy="239" r="1.5" fill="#f59e0b"/>
  <circle cx="300" cy="239" r="1.5" fill="#f59e0b"/>
  <circle cx="310" cy="238" r="1.5" fill="#f59e0b"/>
  <circle cx="320" cy="237" r="1.5" fill="#f59e0b"/>
  <circle cx="330" cy="239" r="1.5" fill="#f59e0b"/>
  <circle cx="310" cy="234" r="6" fill="#ef4444" stroke="#1e293b" stroke-width="1.5"/>
  <text x="310" y="232" text-anchor="middle" font-size="8" fill="white">P</text>
  <text x="295" y="260" text-anchor="middle" font-size="10" fill="#ef4444">Sand on slope</text>
  <text x="295" y="272" text-anchor="middle" font-size="9" fill="#64748b">(high friction)</text>
  <!-- Explanation -->
  <rect x="20" y="280" width="440" height="16" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5" rx="3"/>
  <text x="240" y="291" text-anchor="middle" font-size="9" fill="#92400e">Sand increases friction → More KE converted to heat → Ball has less KE but more heat at P</text>
</svg>''')

# Save the updated data
with open('data/questions-science-p6.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("✓ Added diagrams to SCI1022-SCI1035 (14 questions)")
