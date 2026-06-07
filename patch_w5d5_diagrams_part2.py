#!/usr/bin/env python3
import json

# Load existing questions
with open('data/questions-science-p6.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Create index for quick lookup
idx = {q['id']: i for i, q in enumerate(data)}

# Helper function to add diagram
def fix(qid, diagram):
    data[idx[qid]]['diagram'] = diagram

# SCI1050: Matter vs Force (states of matter and force)
fix('SCI1050', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Matter vs Force</text>
  
  <!-- Matter section -->
  <rect x="10" y="35" width="180" height="225" fill="#f0f9ff" stroke="#3b82f6" stroke-width="2" rx="6"/>
  <text x="100" y="55" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e40af">MATTER</text>
  <text x="100" y="70" text-anchor="middle" font-size="10" fill="#64748b">(has mass and volume)</text>
  
  <!-- Solid -->
  <rect x="30" y="85" width="45" height="45" fill="#3b82f6" opacity="0.8" stroke="#1e40af" stroke-width="1.5"/>
  <circle cx="42" cy="97" r="3" fill="#1e40af"/>
  <circle cx="52" cy="97" r="3" fill="#1e40af"/>
  <circle cx="62" cy="97" r="3" fill="#1e40af"/>
  <circle cx="42" cy="107" r="3" fill="#1e40af"/>
  <circle cx="52" cy="107" r="3" fill="#1e40af"/>
  <circle cx="62" cy="107" r="3" fill="#1e40af"/>
  <circle cx="42" cy="117" r="3" fill="#1e40af"/>
  <circle cx="52" cy="117" r="3" fill="#1e40af"/>
  <circle cx="62" cy="117" r="3" fill="#1e40af"/>
  <text x="52" y="145" text-anchor="middle" font-size="10" fill="#1e40af" font-weight="bold">Solid</text>
  
  <!-- Liquid -->
  <rect x="85" y="85" width="45" height="45" fill="#60a5fa" opacity="0.6" stroke="#3b82f6" stroke-width="1.5"/>
  <circle cx="95" cy="110" r="3.5" fill="#3b82f6"/>
  <circle cx="105" cy="105" r="3.5" fill="#3b82f6"/>
  <circle cx="115" cy="112" r="3.5" fill="#3b82f6"/>
  <circle cx="100" cy="120" r="3.5" fill="#3b82f6"/>
  <circle cx="110" cy="118" r="3.5" fill="#3b82f6"/>
  <text x="107" y="145" text-anchor="middle" font-size="10" fill="#1e40af" font-weight="bold">Liquid</text>
  
  <!-- Gas -->
  <rect x="140" y="85" width="45" height="45" fill="#dbeafe" stroke="#93c5fd" stroke-width="1.5"/>
  <circle cx="150" cy="95" r="2.5" fill="#3b82f6"/>
  <circle cx="170" cy="100" r="2.5" fill="#3b82f6"/>
  <circle cx="155" cy="115" r="2.5" fill="#3b82f6"/>
  <circle cx="175" cy="120" r="2.5" fill="#3b82f6"/>
  <text x="162" y="145" text-anchor="middle" font-size="10" fill="#1e40af" font-weight="bold">Gas</text>
  
  <!-- Matter properties -->
  <text x="100" y="170" text-anchor="middle" font-size="10" fill="#475569">✓ Has volume</text>
  <text x="100" y="187" text-anchor="middle" font-size="10" fill="#475569">✓ Has mass</text>
  <text x="100" y="204" text-anchor="middle" font-size="10" fill="#475569">✓ Can change states</text>
  <text x="100" y="221" text-anchor="middle" font-size="10" fill="#475569">✓ May be compressed</text>
  <text x="100" y="238" text-anchor="middle" font-size="10" fill="#475569">  (gases)</text>
  
  <!-- Force section -->
  <rect x="210" y="35" width="180" height="225" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="6"/>
  <text x="300" y="55" text-anchor="middle" font-size="13" font-weight="bold" fill="#92400e">FORCE</text>
  <text x="300" y="70" text-anchor="middle" font-size="10" fill="#64748b">(push or pull)</text>
  
  <!-- Push illustration -->
  <circle cx="250" cy="110" r="20" fill="#fbbf24" stroke="#f59e0b" stroke-width="2"/>
  <text x="250" y="116" text-anchor="middle" font-size="12" fill="#92400e">⚽</text>
  <line x1="275" y1="110" x2="320" y2="110" stroke="#f59e0b" stroke-width="3" marker-end="url(#arrowOrange)"/>
  <text x="297" y="102" text-anchor="middle" font-size="10" fill="#92400e" font-weight="bold">PUSH</text>
  
  <!-- Pull illustration -->
  <circle cx="350" cy="160" r="20" fill="#fbbf24" stroke="#f59e0b" stroke-width="2"/>
  <text x="350" y="166" text-anchor="middle" font-size="12" fill="#92400e">⚽</text>
  <line x1="325" y1="160" x2="280" y2="160" stroke="#f59e0b" stroke-width="3" marker-end="url(#arrowOrange2)"/>
  <text x="302" y="152" text-anchor="middle" font-size="10" fill="#92400e" font-weight="bold">PULL</text>
  
  <!-- Force properties -->
  <text x="300" y="200" text-anchor="middle" font-size="10" fill="#475569">✗ No mass</text>
  <text x="300" y="217" text-anchor="middle" font-size="10" fill="#475569">✗ No volume</text>
  <text x="300" y="234" text-anchor="middle" font-size="10" fill="#475569">✓ Can change motion</text>
  
  <defs>
    <marker id="arrowOrange" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b"/>
    </marker>
    <marker id="arrowOrange2" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M9,0 L9,6 L0,3 z" fill="#f59e0b"/>
    </marker>
  </defs>
</svg>''')

# SCI1051: Magnets on ramps with iron bars
fix('SCI1051', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 300" width="420" font-family="Arial,sans-serif">
  <text x="210" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Comparing Magnetic Strength</text>
  
  <!-- Ramp A: Magnet at top (30cm) -->
  <text x="70" y="45" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af">Ramp A</text>
  <line x1="20" y1="210" x2="120" y2="70" stroke="#64748b" stroke-width="3"/>
  <rect x="115" y="62" width="20" height="16" fill="#ef4444" stroke="#991b1b" stroke-width="1.5" rx="2"/>
  <text x="125" y="73" text-anchor="middle" font-size="10" fill="white" font-weight="bold">A</text>
  <rect x="15" y="200" width="15" height="8" fill="#475569" stroke="#1e293b" stroke-width="1"/>
  <text x="22" y="222" text-anchor="middle" font-size="9" fill="#64748b">Iron bar</text>
  <line x1="22" y1="185" x2="22" y2="75" stroke="#94a3b8" stroke-width="1" stroke-dasharray="2,2"/>
  <text x="25" y="130" font-size="9" fill="#64748b">30cm</text>
  <text x="70" y="235" text-anchor="middle" font-size="9" fill="#16a34a" font-weight="bold">Same time</text>
  
  <!-- Ramp B: Magnet in middle (20cm) -->
  <text x="210" y="45" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af">Ramp B</text>
  <line x1="160" y1="210" x2="260" y2="70" stroke="#64748b" stroke-width="3"/>
  <rect x="200" y="122" width="20" height="16" fill="#ef4444" stroke="#991b1b" stroke-width="1.5" rx="2"/>
  <text x="210" y="133" text-anchor="middle" font-size="10" fill="white" font-weight="bold">B</text>
  <rect x="155" y="200" width="15" height="8" fill="#475569" stroke="#1e293b" stroke-width="1"/>
  <text x="162" y="222" text-anchor="middle" font-size="9" fill="#64748b">Iron bar</text>
  <line x1="162" y1="185" x2="162" y2="135" stroke="#94a3b8" stroke-width="1" stroke-dasharray="2,2"/>
  <text x="165" y="160" font-size="9" fill="#64748b">20cm</text>
  <text x="210" y="235" text-anchor="middle" font-size="9" fill="#16a34a" font-weight="bold">Same time</text>
  
  <!-- Ramp C: Magnet near bottom (10cm) -->
  <text x="350" y="45" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af">Ramp C</text>
  <line x1="300" y1="210" x2="400" y2="70" stroke="#64748b" stroke-width="3"/>
  <rect x="325" y="170" width="20" height="16" fill="#ef4444" stroke="#991b1b" stroke-width="1.5" rx="2"/>
  <text x="335" y="181" text-anchor="middle" font-size="10" fill="white" font-weight="bold">C</text>
  <rect x="295" y="200" width="15" height="8" fill="#475569" stroke="#1e293b" stroke-width="1"/>
  <text x="302" y="222" text-anchor="middle" font-size="9" fill="#64748b">Iron bar</text>
  <line x1="302" y1="185" x2="302" y2="185" stroke="#94a3b8" stroke-width="1" stroke-dasharray="2,2"/>
  <line x1="335" y1="185" x2="335" y2="185" stroke="#94a3b8" stroke-width="1" stroke-dasharray="2,2"/>
  <text x="318" y="195" font-size="9" fill="#64748b">10cm</text>
  <text x="350" y="235" text-anchor="middle" font-size="9" fill="#16a34a" font-weight="bold">Same time</text>
  
  <!-- Conclusion -->
  <rect x="10" y="250" width="400" height="40" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5" rx="4"/>
  <text x="210" y="268" text-anchor="middle" font-size="11" fill="#15803d" font-weight="bold">Conclusion: Magnet B is strongest</text>
  <text x="210" y="283" text-anchor="middle" font-size="9" fill="#166534">(pulls iron bar upward 30cm in same time as others)</text>
</svg>''')

# SCI1052: Ball rolling on track
fix('SCI1052', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 260" width="380" font-family="Arial,sans-serif">
  <text x="190" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Ball Rolling on Track</text>
  
  <!-- Wooden dish at height -->
  <rect x="40" y="60" width="60" height="8" fill="#92400e" stroke="#78350f" stroke-width="1.5"/>
  <rect x="50" y="68" width="40" height="25" fill="#b45309" stroke="#92400e" stroke-width="1.5"/>
  <text x="70" y="105" text-anchor="middle" font-size="9" fill="#92400e" font-weight="bold">Wooden dish</text>
  
  <!-- Ball in dish -->
  <circle cx="70" cy="58" r="8" fill="#64748b" stroke="#475569" stroke-width="1.5"/>
  
  <!-- Height indicator -->
  <line x1="25" y1="210" x2="25" y2="68" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3,3"/>
  <line x1="20" y1="68" x2="30" y2="68" stroke="#f59e0b" stroke-width="1.5"/>
  <line x1="20" y1="210" x2="30" y2="210" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="15" y="140" text-anchor="end" font-size="10" fill="#f59e0b" font-weight="bold">Height</text>
  
  <!-- Metal track - U shape -->
  <path d="M 100 80 L 120 200 Q 190 230 260 200 L 280 80" stroke="#475569" stroke-width="4" fill="none" stroke-linecap="round"/>
  
  <!-- Ground -->
  <rect x="0" y="210" width="380" height="3" fill="#94a3b8"/>
  <line x1="0" y1="213" x2="380" y2="213" stroke="#64748b" stroke-width="1" stroke-dasharray="4,4"/>
  
  <!-- Ball positions showing motion -->
  <circle cx="190" cy="205" r="7" fill="#64748b" opacity="0.3" stroke="#475569" stroke-width="1"/>
  <text x="190" y="225" text-anchor="middle" font-size="8" fill="#64748b">Position 1</text>
  
  <circle cx="150" cy="150" r="7" fill="#64748b" opacity="0.5" stroke="#475569" stroke-width="1"/>
  <text x="150" y="142" text-anchor="middle" font-size="8" fill="#64748b">Position 2</text>
  
  <!-- Energy explanation -->
  <rect x="10" y="240" width="360" height="15" fill="#fef3c7" stroke="#f59e0b" stroke-width="1" rx="3"/>
  <text x="190" y="251" text-anchor="middle" font-size="9" fill="#92400e">Higher dish → More energy → Ball rolls longer before friction stops it</text>
</svg>''')

# SCI1053: Lamp shade material properties table
fix('SCI1053', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 240" width="380" font-family="Arial,sans-serif">
  <text x="190" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Material Properties for Lamp Shade</text>
  
  <!-- Table -->
  <rect x="30" y="40" width="100" height="35" fill="#e0f2fe" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="80" y="62" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">Material</text>
  
  <rect x="130" y="40" width="110" height="35" fill="#e0f2fe" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="185" y="55" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e40af">Conducts</text>
  <text x="185" y="68" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e40af">Electricity</text>
  
  <rect x="240" y="40" width="110" height="35" fill="#e0f2fe" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="295" y="55" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e40af">Allows Light</text>
  <text x="295" y="68" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e40af">to Pass Through</text>
  
  <!-- Row A -->
  <rect x="30" y="75" width="100" height="35" fill="#fff" stroke="#94a3b8" stroke-width="1"/>
  <text x="80" y="97" text-anchor="middle" font-size="12" font-weight="bold" fill="#475569">A</text>
  <rect x="130" y="75" width="110" height="35" fill="#fff" stroke="#94a3b8" stroke-width="1"/>
  <text x="185" y="97" text-anchor="middle" font-size="16" fill="#dc2626">✗</text>
  <rect x="240" y="75" width="110" height="35" fill="#fff" stroke="#94a3b8" stroke-width="1"/>
  <text x="295" y="97" text-anchor="middle" font-size="16" fill="#16a34a">✓</text>
  
  <!-- Row B -->
  <rect x="30" y="110" width="100" height="35" fill="#fff" stroke="#94a3b8" stroke-width="1"/>
  <text x="80" y="132" text-anchor="middle" font-size="12" font-weight="bold" fill="#475569">B</text>
  <rect x="130" y="110" width="110" height="35" fill="#fff" stroke="#94a3b8" stroke-width="1"/>
  <text x="185" y="132" text-anchor="middle" font-size="16" fill="#16a34a">✓</text>
  <rect x="240" y="110" width="110" height="35" fill="#fff" stroke="#94a3b8" stroke-width="1"/>
  <text x="295" y="132" text-anchor="middle" font-size="16" fill="#16a34a">✓</text>
  
  <!-- Row C -->
  <rect x="30" y="145" width="100" height="35" fill="#fff" stroke="#94a3b8" stroke-width="1"/>
  <text x="80" y="167" text-anchor="middle" font-size="12" font-weight="bold" fill="#475569">C</text>
  <rect x="130" y="145" width="110" height="35" fill="#fff" stroke="#94a3b8" stroke-width="1"/>
  <text x="185" y="167" text-anchor="middle" font-size="16" fill="#dc2626">✗</text>
  <rect x="240" y="145" width="110" height="35" fill="#fff" stroke="#94a3b8" stroke-width="1"/>
  <text x="295" y="167" text-anchor="middle" font-size="16" fill="#16a34a">✓</text>
  
  <!-- Row D (correct answer highlighted) -->
  <rect x="30" y="180" width="100" height="35" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
  <text x="80" y="202" text-anchor="middle" font-size="12" font-weight="bold" fill="#15803d">D ⭐</text>
  <rect x="130" y="180" width="110" height="35" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
  <text x="185" y="202" text-anchor="middle" font-size="16" fill="#dc2626">✗</text>
  <rect x="240" y="180" width="110" height="35" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
  <text x="295" y="202" text-anchor="middle" font-size="16" fill="#dc2626">✗</text>
  
  <!-- Legend -->
  <text x="35" y="228" font-size="9" fill="#64748b">✓ = Has the property</text>
  <text x="200" y="228" font-size="9" fill="#64748b">✗ = Does not have the property</text>
</svg>''')

# SCI1054: Melting points table
fix('SCI1054', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 280" width="340" font-family="Arial,sans-serif">
  <text x="170" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Freezing/Melting Points</text>
  
  <!-- Table -->
  <rect x="50" y="45" width="110" height="40" fill="#bfdbfe" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="105" y="70" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af">Substance</text>
  
  <rect x="160" y="45" width="130" height="40" fill="#bfdbfe" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="225" y="70" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af">Melting Point (°C)</text>
  
  <!-- Substance P -->
  <rect x="50" y="85" width="110" height="40" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
  <text x="105" y="110" text-anchor="middle" font-size="14" font-weight="bold" fill="#15803d">P</text>
  <rect x="160" y="85" width="130" height="40" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
  <text x="225" y="110" text-anchor="middle" font-size="14" font-weight="bold" fill="#15803d">44</text>
  
  <!-- Substance Q -->
  <rect x="50" y="125" width="110" height="40" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
  <text x="105" y="150" text-anchor="middle" font-size="14" font-weight="bold" fill="#15803d">Q</text>
  <rect x="160" y="125" width="130" height="40" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
  <text x="225" y="150" text-anchor="middle" font-size="14" font-weight="bold" fill="#15803d">50</text>
  
  <!-- Substance R -->
  <rect x="50" y="165" width="110" height="40" fill="#fff" stroke="#94a3b8" stroke-width="1"/>
  <text x="105" y="190" text-anchor="middle" font-size="14" font-weight="bold" fill="#475569">R</text>
  <rect x="160" y="165" width="130" height="40" fill="#fff" stroke="#94a3b8" stroke-width="1"/>
  <text x="225" y="190" text-anchor="middle" font-size="14" font-weight="bold" fill="#475569">110</text>
  
  <!-- Temperature scale -->
  <text x="170" y="228" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">Room temperature raised to 65°C</text>
  
  <line x1="30" y1="245" x2="310" y2="245" stroke="#64748b" stroke-width="2"/>
  <line x1="30" y1="240" x2="30" y2="250" stroke="#64748b" stroke-width="2"/>
  <line x1="100" y1="242" x2="100" y2="248" stroke="#64748b" stroke-width="1"/>
  <line x="120" y1="242" x2="120" y2="248" stroke="#64748b" stroke-width="1"/>
  <line x1="160" y1="240" x2="160" y2="250" stroke="#64748b" stroke-width="2"/>
  <line x1="240" y1="242" x2="240" y2="248" stroke="#64748b" stroke-width="1"/>
  <line x1="310" y1="240" x2="310" y2="250" stroke="#64748b" stroke-width="2"/>
  
  <text x="30" y="265" text-anchor="middle" font-size="9" fill="#64748b">0°C</text>
  <text x="100" y="265" text-anchor="middle" font-size="9" fill="#16a34a" font-weight="bold">44°C (P)</text>
  <text x="120" y="265" text-anchor="middle" font-size="9" fill="#16a34a" font-weight="bold">50°C (Q)</text>
  <text x="160" y="265" text-anchor="middle" font-size="9" fill="#dc2626" font-weight="bold">65°C</text>
  <text x="240" y="265" text-anchor="middle" font-size="9" fill="#64748b">110°C (R)</text>
  
  <polygon points="155,235 160,245 165,235" fill="#dc2626"/>
</svg>''')

# SCI1055: Container with air and liquid
fix('SCI1055', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 320" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Sealed Container Experiment</text>
  
  <!-- Initial state -->
  <text x="100" y="45" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af">Initial State</text>
  <rect x="40" y="60" width="120" height="150" fill="none" stroke="#475569" stroke-width="2.5"/>
  <rect x="40" y="135" width="120" height="75" fill="#60a5fa" opacity="0.6" stroke="#3b82f6" stroke-width="1"/>
  <text x="100" y="105" text-anchor="middle" font-size="11" fill="#1e40af" font-weight="bold">Air</text>
  <text x="100" y="120" text-anchor="middle" font-size="10" fill="#1e40af">100cm³</text>
  <text x="100" y="178" text-anchor="middle" font-size="11" fill="#0c4a6e" font-weight="bold">Liquid X</text>
  <text x="100" y="193" text-anchor="middle" font-size="10" fill="#0c4a6e">150cm³</text>
  
  <!-- Tap -->
  <rect x="155" y="205" width="10" height="8" fill="#64748b" stroke="#475569" stroke-width="1"/>
  <text x="200" y="212" font-size="8" fill="#64748b">Tap</text>
  
  <!-- Arrow -->
  <text x="200" y="135" text-anchor="middle" font-size="24" fill="#f59e0b">→</text>
  
  <!-- Final state -->
  <text x="300" y="45" text-anchor="middle" font-size="12" font-weight="bold" fill="#15803d">Final State</text>
  <rect x="240" y="60" width="120" height="150" fill="none" stroke="#475569" stroke-width="2.5"/>
  <rect x="240" y="160" width="120" height="50" fill="#60a5fa" opacity="0.6" stroke="#3b82f6" stroke-width="1"/>
  <text x="300" y="115" text-anchor="middle" font-size="11" fill="#1e40af" font-weight="bold">Air (expands)</text>
  <text x="300" y="130" text-anchor="middle" font-size="10" fill="#1e40af">150cm³</text>
  <text x="300" y="190" text-anchor="middle" font-size="11" fill="#0c4a6e" font-weight="bold">Liquid X</text>
  <text x="300" y="205" text-anchor="middle" font-size="10" fill="#0c4a6e">100cm³</text>
  
  <!-- Pump -->
  <rect x="365" y="95" width="25" height="40" fill="#e2e8f0" stroke="#64748b" stroke-width="1.5" rx="2"/>
  <rect x="372" y="85" width="11" height="15" fill="#94a3b8" stroke="#64748b" stroke-width="1"/>
  <circle cx="377" cy="90" r="3" fill="#64748b"/>
  <text x="377" y="155" text-anchor="middle" font-size="8" fill="#64748b">Pump</text>
  <line x1="365" y1="115" x2="360" y2="115" stroke="#64748b" stroke-width="1.5"/>
  
  <!-- Explanation boxes -->
  <rect x="10" y="230" width="380" height="35" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5" rx="4"/>
  <text x="200" y="247" text-anchor="middle" font-size="10" fill="#92400e">50cm³ liquid removed, 20cm³ air added</text>
  <text x="200" y="260" text-anchor="middle" font-size="9" fill="#92400e">Air expands to fill available space (no definite volume)</text>
  
  <rect x="10" y="275" width="380" height="35" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5" rx="4"/>
  <text x="200" y="292" text-anchor="middle" font-size="10" fill="#15803d" font-weight="bold">Total capacity: 250cm³ (unchanged)</text>
  <text x="200" y="305" text-anchor="middle" font-size="9" fill="#166534">Air: 150cm³ | Liquid X: 100cm³</text>
</svg>''')

# SCI1056: Circuit with 6 bulbs and 4 switches
fix('SCI1056', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Circuit with 6 Bulbs and 4 Switches</text>
  
  <!-- Battery -->
  <line x1="40" y1="80" x2="40" y2="70" stroke="#1e293b" stroke-width="2"/>
  <line x1="35" y1="70" x2="45" y2="70" stroke="#1e293b" stroke-width="2.5"/>
  <line x1="37" y1="60" x2="43" y2="60" stroke="#1e293b" stroke-width="2"/>
  <text x="55" y="68" font-size="9" fill="#dc2626" font-weight="bold">+</text>
  <text x="25" y="88" font-size="9" fill="#3b82f6" font-weight="bold">−</text>
  
  <!-- Main circuit lines -->
  <line x1="40" y1="60" x2="40" y2="40" stroke="#1e293b" stroke-width="2"/>
  <line x1="40" y1="40" x2="360" y2="40" stroke="#1e293b" stroke-width="2"/>
  <line x1="40" y1="80" x2="40" y2="240" stroke="#1e293b" stroke-width="2"/>
  <line x1="40" y1="240" x2="360" y2="240" stroke="#1e293b" stroke-width="2"/>
  <line x1="360" y1="40" x2="360" y2="240" stroke="#1e293b" stroke-width="2"/>
  
  <!-- Switch A (top left) -->
  <circle cx="100" cy="40" r="3" fill="#1e293b"/>
  <line x1="103" y1="40" x2="125" y2="35" stroke="#1e293b" stroke-width="2"/>
  <circle cx="128" cy="40" r="3" fill="#1e293b"/>
  <text x="115" y="32" text-anchor="middle" font-size="10" fill="#3b82f6" font-weight="bold">A</text>
  
  <!-- Left branch bulbs -->
  <line x1="128" y1="40" x2="128" y2="90" stroke="#1e293b" stroke-width="2"/>
  <circle cx="128" cy="100" r="10" fill="none" stroke="#f59e0b" stroke-width="2"/>
  <path d="M 123,95 L 133,105 M 123,105 L 133,95" stroke="#f59e0b" stroke-width="1.5"/>
  
  <line x1="128" y1="110" x2="128" y2="140" stroke="#1e293b" stroke-width="2"/>
  <circle cx="128" cy="150" r="10" fill="none" stroke="#f59e0b" stroke-width="2"/>
  <path d="M 123,145 L 133,155 M 123,155 L 133,145" stroke="#f59e0b" stroke-width="1.5"/>
  <line x1="128" y1="160" x2="128" y2="240" stroke="#1e293b" stroke-width="2"/>
  
  <!-- Switch B (middle top) -->
  <circle cx="200" cy="40" r="3" fill="#1e293b"/>
  <line x1="203" y1="40" x2="225" y2="35" stroke="#1e293b" stroke-width="2"/>
  <circle cx="228" cy="40" r="3" fill="#1e293b"/>
  <text x="215" y="32" text-anchor="middle" font-size="10" fill="#3b82f6" font-weight="bold">B</text>
  
  <!-- Middle branch bulbs -->
  <line x1="228" y1="40" x2="228" y2="90" stroke="#1e293b" stroke-width="2"/>
  <circle cx="228" cy="100" r="10" fill="none" stroke="#f59e0b" stroke-width="2"/>
  <path d="M 223,95 L 233,105 M 223,105 L 233,95" stroke="#f59e0b" stroke-width="1.5"/>
  
  <line x1="228" y1="110" x2="228" y2="140" stroke="#1e293b" stroke-width="2"/>
  <circle cx="228" cy="150" r="10" fill="none" stroke="#f59e0b" stroke-width="2"/>
  <path d="M 223,145 L 233,155 M 223,155 L 233,145" stroke="#f59e0b" stroke-width="1.5"/>
  <line x1="228" y1="160" x2="228" y2="240" stroke="#1e293b" stroke-width="2"/>
  
  <!-- Switch C (middle bottom) -->
  <circle cx="200" cy="240" r="3" fill="#1e293b"/>
  <line x1="203" y1="240" x2="225" y2="245" stroke="#1e293b" stroke-width="2"/>
  <circle cx="228" cy="240" r="3" fill="#1e293b"/>
  <text x="215" y="258" text-anchor="middle" font-size="10" fill="#3b82f6" font-weight="bold">C</text>
  
  <!-- Switch D (right) - when opened, right bulbs don't light -->
  <circle cx="300" cy="40" r="3" fill="#1e293b"/>
  <line x1="303" y1="40" x2="325" y2="50" stroke="#dc2626" stroke-width="2.5" stroke-dasharray="3,2"/>
  <circle cx="328" cy="40" r="3" fill="#1e293b"/>
  <text x="315" y="32" text-anchor="middle" font-size="10" fill="#dc2626" font-weight="bold">D (OPEN)</text>
  
  <!-- Right branch bulbs (dimmed because switch D is open) -->
  <line x1="328" y1="40" x2="328" y2="90" stroke="#94a3b8" stroke-width="2" opacity="0.4"/>
  <circle cx="328" cy="100" r="10" fill="none" stroke="#94a3b8" stroke-width="2" opacity="0.4"/>
  <path d="M 323,95 L 333,105 M 323,105 L 333,95" stroke="#94a3b8" stroke-width="1.5" opacity="0.4"/>
  
  <line x1="328" y1="110" x2="328" y2="140" stroke="#94a3b8" stroke-width="2" opacity="0.4"/>
  <circle cx="328" cy="150" r="10" fill="none" stroke="#94a3b8" stroke-width="2" opacity="0.4"/>
  <path d="M 323,145 L 333,155 M 323,155 L 333,145" stroke="#94a3b8" stroke-width="1.5" opacity="0.4"/>
  <line x1="328" y1="160" x2="328" y2="240" stroke="#94a3b8" stroke-width="2" opacity="0.4"/>
  
  <text x="328" y="180" text-anchor="middle" font-size="8" fill="#dc2626">OFF</text>
  
  <!-- Note -->
  <rect x="10" y="265" width="380" height="12" fill="#fee2e2" stroke="#dc2626" stroke-width="1" rx="2"/>
  <text x="200" y="274" text-anchor="middle" font-size="9" fill="#991b1b">When switch D is open: 4 bulbs light (equal brightness, 2 in each path)</text>
</svg>''')

# SCI1057: Circuit with bulb X and connection points A-B
fix('SCI1057', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 260" width="380" font-family="Arial,sans-serif">
  <text x="190" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Circuit: Make Bulb X Brightest</text>
  
  <!-- Battery -->
  <line x1="40" y1="120" x2="40" y2="110" stroke="#1e293b" stroke-width="2.5"/>
  <line x1="35" y1="110" x2="45" y2="110" stroke="#1e293b" stroke-width="3"/>
  <line x1="37" y1="100" x2="43" y2="100" stroke="#1e293b" stroke-width="2"/>
  <text x="55" y="108" font-size="10" fill="#dc2626" font-weight="bold">+</text>
  <text x="25" y="128" font-size="10" fill="#3b82f6" font-weight="bold">−</text>
  
  <!-- Main circuit -->
  <line x1="40" y1="100" x2="40" y2="60" stroke="#1e293b" stroke-width="2"/>
  <line x1="40" y1="60" x2="340" y2="60" stroke="#1e293b" stroke-width="2"/>
  <line x1="340" y1="60" x2="340" y2="200" stroke="#1e293b" stroke-width="2"/>
  <line x1="340" y1="200" x2="40" y2="200" stroke="#1e293b" stroke-width="2"/>
  <line x1="40" y1="200" x2="40" y2="120" stroke="#1e293b" stroke-width="2"/>
  
  <!-- Bulb X on left side -->
  <circle cx="120" cy="60" r="12" fill="#fef3c7" stroke="#f59e0b" stroke-width="2.5"/>
  <path d="M 113,53 L 127,67 M 113,67 L 127,53" stroke="#f59e0b" stroke-width="2"/>
  <text x="120" y="90" text-anchor="middle" font-size="12" fill="#f59e0b" font-weight="bold">Bulb X</text>
  
  <!-- Points A and B -->
  <circle cx="240" cy="60" r="4" fill="#3b82f6"/>
  <text x="240" y="48" text-anchor="middle" font-size="12" fill="#3b82f6" font-weight="bold">A</text>
  
  <circle cx="240" cy="200" r="4" fill="#3b82f6"/>
  <text x="240" y="220" text-anchor="middle" font-size="12" fill="#3b82f6" font-weight="bold">B</text>
  
  <!-- Options shown below -->
  <text x="190" y="130" text-anchor="middle" font-size="11" font-weight="bold" fill="#64748b">Options to connect A-B:</text>
  
  <!-- Option 1: Wire only -->
  <rect x="20" y="140" width="70" height="40" fill="#fff" stroke="#94a3b8" stroke-width="1" rx="3"/>
  <text x="55" y="154" text-anchor="middle" font-size="9" fill="#475569">(1) Wire</text>
  <line x1="30" y1="165" x2="80" y2="165" stroke="#1e293b" stroke-width="2"/>
  
  <!-- Option 2: Wire only (brightest - highlighted) -->
  <rect x="100" y="140" width="70" height="40" fill="#dcfce7" stroke="#16a34a" stroke-width="2.5" rx="3"/>
  <text x="135" y="154" text-anchor="middle" font-size="9" fill="#15803d" font-weight="bold">(2) Wire ⭐</text>
  <line x1="110" y1="165" x2="160" y2="165" stroke="#16a34a" stroke-width="3"/>
  <text x="135" y="175" text-anchor="middle" font-size="7" fill="#15803d">Least resistance</text>
  
  <!-- Option 3: One bulb -->
  <rect x="180" y="140" width="70" height="40" fill="#fff" stroke="#94a3b8" stroke-width="1" rx="3"/>
  <text x="215" y="154" text-anchor="middle" font-size="9" fill="#475569">(3) 1 Bulb</text>
  <circle cx="215" cy="165" r="8" fill="none" stroke="#f59e0b" stroke-width="1.5"/>
  <path d="M 211,161 L 219,169 M 211,169 L 219,161" stroke="#f59e0b" stroke-width="1"/>
  
  <!-- Option 4: Two bulbs -->
  <rect x="260" y="140" width="100" height="40" fill="#fff" stroke="#94a3b8" stroke-width="1" rx="3"/>
  <text x="310" y="154" text-anchor="middle" font-size="9" fill="#475569">(4) 2 Bulbs</text>
  <circle cx="290" cy="165" r="8" fill="none" stroke="#f59e0b" stroke-width="1.5"/>
  <path d="M 286,161 L 294,169 M 286,169 L 294,161" stroke="#f59e0b" stroke-width="1"/>
  <circle cx="330" cy="165" r="8" fill="none" stroke="#f59e0b" stroke-width="1.5"/>
  <path d="M 326,161 L 334,169 M 326,169 L 334,161" stroke="#f59e0b" stroke-width="1"/>
  
  <!-- Explanation -->
  <rect x="10" y="235" width="360" height="18" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5" rx="3"/>
  <text x="190" y="248" text-anchor="middle" font-size="9" fill="#92400e">Option 2 creates shortest path with no bulbs → least resistance → brightest X</text>
</svg>''')

# SCI1058: Magnets and springs compression
fix('SCI1058', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Magnetic Force and Spring Compression</text>
  
  <!-- Diagram 1: Spring S with 4 magnets far apart -->
  <text x="100" y="45" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af">Diagram 1 (Spring S)</text>
  
  <!-- Wall -->
  <rect x="15" y="60" width="5" height="80" fill="#94a3b8" stroke="#64748b" stroke-width="1"/>
  <line x1="15" y1="60" x2="10" y2="55" stroke="#64748b" stroke-width="1"/>
  <line x1="15" y1="75" x2="10" y2="70" stroke="#64748b" stroke-width="1"/>
  <line x1="15" y1="90" x2="10" y2="85" stroke="#64748b" stroke-width="1"/>
  <line x1="15" y1="105" x2="10" y2="100" stroke="#64748b" stroke-width="1"/>
  <line x1="15" y1="120" x2="10" y2="115" stroke="#64748b" stroke-width="1"/>
  <line x1="15" y1="135" x2="10" y2="130" stroke="#64748b" stroke-width="1"/>
  
  <!-- Spring S (less compressed) -->
  <path d="M 20,100 L 30,95 L 40,105 L 50,95 L 60,105 L 70,95 L 80,105 L 90,100" stroke="#16a34a" stroke-width="2" fill="none"/>
  <text x="55" y="90" text-anchor="middle" font-size="9" fill="#16a34a" font-weight="bold">Spring S</text>
  
  <!-- Magnets far apart -->
  <rect x="90" y="88" width="18" height="24" fill="#ef4444" stroke="#991b1b" stroke-width="1.5" rx="2"/>
  <text x="99" y="103" text-anchor="middle" font-size="10" fill="white" font-weight="bold">N</text>
  
  <rect x="113" y="88" width="18" height="24" fill="#3b82f6" stroke="#1e40af" stroke-width="1.5" rx="2"/>
  <text x="122" y="103" text-anchor="middle" font-size="10" fill="white" font-weight="bold">S</text>
  
  <rect x="136" y="88" width="18" height="24" fill="#ef4444" stroke="#991b1b" stroke-width="1.5" rx="2"/>
  <text x="145" y="103" text-anchor="middle" font-size="10" fill="white" font-weight="bold">N</text>
  
  <rect x="159" y="88" width="18" height="24" fill="#3b82f6" stroke="#1e40af" stroke-width="1.5" rx="2"/>
  <text x="168" y="103" text-anchor="middle" font-size="10" fill="white" font-weight="bold">S</text>
  
  <text x="100" y="135" text-anchor="middle" font-size="9" fill="#64748b">Magnets further apart</text>
  <text x="100" y="148" text-anchor="middle" font-size="9" fill="#f59e0b">→ Weaker magnetic force</text>
  
  <!-- Diagram 2: Spring R with 4 magnets close together -->
  <text x="300" y="45" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af">Diagram 2 (Spring R)</text>
  
  <!-- Wall -->
  <rect x="215" y="60" width="5" height="80" fill="#94a3b8" stroke="#64748b" stroke-width="1"/>
  <line x1="215" y1="60" x2="210" y2="55" stroke="#64748b" stroke-width="1"/>
  <line x1="215" y1="75" x2="210" y2="70" stroke="#64748b" stroke-width="1"/>
  <line x1="215" y1="90" x2="210" y2="85" stroke="#64748b" stroke-width="1"/>
  <line x1="215" y1="105" x2="210" y2="100" stroke="#64748b" stroke-width="1"/>
  <line x1="215" y1="120" x2="210" y2="115" stroke="#64748b" stroke-width="1"/>
  <line x1="215" y1="135" x2="210" y2="130" stroke="#64748b" stroke-width="1"/>
  
  <!-- Spring R (more compressed) -->
  <path d="M 220,100 L 225,95 L 232,105 L 239,95 L 246,105 L 253,95 L 260,105 L 267,95 L 274,100" stroke="#16a34a" stroke-width="2.5" fill="none"/>
  <text x="247" y="90" text-anchor="middle" font-size="9" fill="#16a34a" font-weight="bold">Spring R</text>
  
  <!-- Magnets close together -->
  <rect x="274" y="88" width="18" height="24" fill="#ef4444" stroke="#991b1b" stroke-width="1.5" rx="2"/>
  <text x="283" y="103" text-anchor="middle" font-size="10" fill="white" font-weight="bold">N</text>
  
  <rect x="294" y="88" width="18" height="24" fill="#3b82f6" stroke="#1e40af" stroke-width="1.5" rx="2"/>
  <text x="303" y="103" text-anchor="middle" font-size="10" fill="white" font-weight="bold">S</text>
  
  <rect x="314" y="88" width="18" height="24" fill="#ef4444" stroke="#991b1b" stroke-width="1.5" rx="2"/>
  <text x="323" y="103" text-anchor="middle" font-size="10" fill="white" font-weight="bold">N</text>
  
  <rect x="334" y="88" width="18" height="24" fill="#3b82f6" stroke="#1e40af" stroke-width="1.5" rx="2"/>
  <text x="343" y="103" text-anchor="middle" font-size="10" fill="white" font-weight="bold">S</text>
  
  <text x="308" y="135" text-anchor="middle" font-size="9" fill="#64748b">Magnets closer together</text>
  <text x="308" y="148" text-anchor="middle" font-size="9" fill="#dc2626">→ Stronger magnetic force</text>
  
  <!-- Explanation -->
  <rect x="10" y="170" width="380" height="80" fill="#f0f9ff" stroke="#3b82f6" stroke-width="2" rx="6"/>
  <text x="200" y="190" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">Key Observation</text>
  <text x="200" y="207" text-anchor="middle" font-size="10" fill="#475569">Magnets closer → stronger magnetic force pushing them apart</text>
  <text x="200" y="222" text-anchor="middle" font-size="10" fill="#475569">Spring compresses until elastic force = magnetic force</text>
  <text x="200" y="237" text-anchor="middle" font-size="10" fill="#16a34a" font-weight="bold">∴ Spring R exerts larger elastic force than Spring S</text>
</svg>''')

# SCI1059: Henry jumping hurdle - gravitational force
fix('SCI1059', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Gravitational Force on Henry</text>
  
  <!-- Ground line -->
  <rect x="0" y="190" width="400" height="3" fill="#94a3b8"/>
  <line x1="0" y1="193" x2="400" y2="193" stroke="#64748b" stroke-width="1" stroke-dasharray="4,4"/>
  
  <!-- Diagram 1: Before jump -->
  <text x="60" y="45" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">Diagram 1</text>
  <text x="60" y="58" text-anchor="middle" font-size="9" fill="#64748b">(Before jump)</text>
  
  <!-- Person standing -->
  <circle cx="60" cy="165" r="8" fill="#fbbf24" stroke="#f59e0b" stroke-width="1.5"/>
  <line x1="60" y1="173" x2="60" y2="188" stroke="#f59e0b" stroke-width="2.5"/>
  <line x1="60" y1="180" x2="50" y2="175" stroke="#f59e0b" stroke-width="2"/>
  <line x1="60" y1="180" x2="70" y2="175" stroke="#f59e0b" stroke-width="2"/>
  <line x1="60" y1="188" x2="52" y2="190" stroke="#f59e0b" stroke-width="2"/>
  <line x1="60" y1="188" x2="68" y2="190" stroke="#f59e0b" stroke-width="2"/>
  
  <!-- Gravity arrow -->
  <line x1="60" y1="130" x2="60" y2="155" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrowRed)"/>
  <text x="75" y="143" font-size="9" fill="#dc2626" font-weight="bold">Gravity</text>
  
  <!-- Hurdle -->
  <rect x="100" y="175" width="4" height="15" fill="#64748b"/>
  <rect x="96" y="175" width="12" height="3" fill="#64748b"/>
  
  <!-- Diagram 2: In air (peak) -->
  <text x="200" y="45" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">Diagram 2</text>
  <text x="200" y="58" text-anchor="middle" font-size="9" fill="#64748b">(In air - peak)</text>
  
  <!-- Person jumping -->
  <circle cx="200" cy="100" r="8" fill="#fbbf24" stroke="#f59e0b" stroke-width="1.5"/>
  <line x1="200" y1="108" x2="200" y2="125" stroke="#f59e0b" stroke-width="2.5"/>
  <line x1="200" y1="115" x2="190" y2="105" stroke="#f59e0b" stroke-width="2"/>
  <line x1="200" y1="115" x2="210" y2="105" stroke="#f59e0b" stroke-width="2"/>
  <line x1="200" y1="125" x2="192" y2="120" stroke="#f59e0b" stroke-width="2"/>
  <line x1="200" y1="125" x2="208" y2="120" stroke="#f59e0b" stroke-width="2"/>
  
  <!-- Gravity arrow -->
  <line x1="200" y1="70" x2="200" y2="90" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrowRed)"/>
  <text x="215" y="80" font-size="9" fill="#dc2626" font-weight="bold">Gravity</text>
  
  <!-- Hurdle -->
  <rect x="200" y="175" width="4" height="15" fill="#64748b"/>
  <rect x="196" y="175" width="12" height="3" fill="#64748b"/>
  
  <!-- Diagram 3: Landing -->
  <text x="340" y="45" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">Diagram 3</text>
  <text x="340" y="58" text-anchor="middle" font-size="9" fill="#64748b">(After landing)</text>
  
  <!-- Person landing -->
  <circle cx="340" cy="165" r="8" fill="#fbbf24" stroke="#f59e0b" stroke-width="1.5"/>
  <line x1="340" y1="173" x2="340" y2="188" stroke="#f59e0b" stroke-width="2.5"/>
  <line x1="340" y1="180" x2="330" y2="175" stroke="#f59e0b" stroke-width="2"/>
  <line x1="340" y1="180" x2="350" y2="175" stroke="#f59e0b" stroke-width="2"/>
  <line x1="340" y1="188" x2="332" y2="190" stroke="#f59e0b" stroke-width="2"/>
  <line x1="340" y1="188" x2="348" y2="190" stroke="#f59e0b" stroke-width="2"/>
  
  <!-- Gravity arrow -->
  <line x1="340" y1="130" x2="340" y2="155" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrowRed)"/>
  <text x="355" y="143" font-size="9" fill="#dc2626" font-weight="bold">Gravity</text>
  
  <!-- Explanation -->
  <rect x="10" y="210" width="380" height="25" fill="#dcfce7" stroke="#16a34a" stroke-width="2" rx="4"/>
  <text x="200" y="225" text-anchor="middle" font-size="10" fill="#15803d" font-weight="bold">Gravitational force is EQUAL in all diagrams</text>
  <text x="200" y="238" text-anchor="middle" font-size="9" fill="#166534">(Gravity depends only on mass, which doesn't change)</text>
  
  <defs>
    <marker id="arrowRed" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#dc2626"/>
    </marker>
  </defs>
</svg>''')

# SCI1060: Two ramps - Joe pulling down, Sam pushing up
fix('SCI1060', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Moving Boxes on Ramps</text>
  
  <!-- Ramp A: Sam pushing up (smoother surface) -->
  <text x="100" y="45" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af">Ramp A (Smoother)</text>
  
  <!-- Smooth ramp -->
  <line x1="20" y1="160" x2="180" y2="80" stroke="#3b82f6" stroke-width="4"/>
  <text x="100" y="130" text-anchor="middle" font-size="9" fill="#3b82f6">Smooth surface</text>
  
  <!-- Box -->
  <rect x="90" y="105" width="24" height="24" fill="#f59e0b" stroke="#d97706" stroke-width="2" transform="rotate(-25 102 117)"/>
  
  <!-- Sam (person pushing up) -->
  <circle cx="70" cy="135" r="7" fill="#fbbf24" stroke="#f59e0b" stroke-width="1.5"/>
  <line x1="70" y1="142" x2="70" y2="155" stroke="#f59e0b" stroke-width="2"/>
  <line x1="70" y1="147" x2="80" y2="140" stroke="#f59e0b" stroke-width="2"/>
  <line x1="70" y1="147" x2="62" y2="145" stroke="#f59e0b" stroke-width="2"/>
  
  <!-- Force arrow (pushing up) -->
  <line x1="75" y1="125" x2="95" y2="110" stroke="#16a34a" stroke-width="2.5" marker-end="url(#arrowGreen)"/>
  <text x="85" y="105" font-size="9" fill="#16a34a" font-weight="bold">Less force</text>
  
  <!-- Gravity arrow (down) -->
  <line x1="110" y1="105" x2="110" y2="90" stroke="#dc2626" stroke-width="2" marker-start="url(#arrowRedRev)"/>
  <text x="125" y="100" font-size="8" fill="#dc2626">Gravity</text>
  
  <text x="100" y="175" text-anchor="middle" font-size="9" fill="#64748b">Sam: Pushing UP against gravity</text>
  <text x="100" y="188" text-anchor="middle" font-size="9" fill="#16a34a" font-weight="bold">Uses LESS force (smooth surface)</text>
  
  <!-- Ramp B: Joe pulling down (rougher surface) -->
  <text x="300" y="45" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af">Ramp B (Rougher)</text>
  
  <!-- Rough ramp -->
  <line x1="220" y1="80" x2="380" y2="160" stroke="#64748b" stroke-width="4"/>
  <path d="M 230,85 L 232,82 M 245,92 L 247,89 M 260,99 L 262,96 M 275,106 L 277,103 M 290,113 L 292,110 M 305,120 L 307,117 M 320,127 L 322,124 M 335,134 L 337,131 M 350,141 L 352,138 M 365,148 L 367,145" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="300" y="130" text-anchor="middle" font-size="9" fill="#64748b">Rough surface</text>
  
  <!-- Box -->
  <rect x="286" y="105" width="24" height="24" fill="#f59e0b" stroke="#d97706" stroke-width="2" transform="rotate(25 298 117)"/>
  
  <!-- Joe (person pulling down) -->
  <circle cx="330" cy="135" r="7" fill="#fbbf24" stroke="#f59e0b" stroke-width="1.5"/>
  <line x1="330" y1="142" x2="330" y2="155" stroke="#f59e0b" stroke-width="2"/>
  <line x1="330" y1="147" x2="320" y2="140" stroke="#f59e0b" stroke-width="2"/>
  <line x1="330" y1="147" x2="338" y2="145" stroke="#f59e0b" stroke-width="2"/>
  
  <!-- Force arrow (pulling down) -->
  <line x1="320" y1="125" x2="305" y2="113" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#arrowOrange)"/>
  <text x="325" y="105" font-size="9" fill="#f59e0b" font-weight="bold">More force</text>
  
  <!-- Gravity arrow (helping) -->
  <line x1="290" y1="105" x2="290" y2="90" stroke="#dc2626" stroke-width="2" marker-start="url(#arrowRedRev)"/>
  <text x="265" y="100" font-size="8" fill="#dc2626">Gravity</text>
  <text x="265" y="110" font-size="7" fill="#16a34a">(helps)</text>
  
  <text x="300" y="175" text-anchor="middle" font-size="9" fill="#64748b">Joe: Pulling DOWN with gravity</text>
  <text x="300" y="188" text-anchor="middle" font-size="9" fill="#f59e0b" font-weight="bold">Uses MORE force (rough surface)</text>
  
  <!-- Conclusion -->
  <rect x="10" y="210" width="380" height="60" fill="#f0f9ff" stroke="#3b82f6" stroke-width="2" rx="6"/>
  <text x="200" y="228" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">Why Sam uses less force?</text>
  <text x="200" y="244" text-anchor="middle" font-size="10" fill="#475569">Ramp A has a SMOOTHER surface → less friction</text>
  <text x="200" y="258" text-anchor="middle" font-size="10" fill="#475569">Even though Sam works against gravity, less friction makes it easier</text>
  
  <defs>
    <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#16a34a"/>
    </marker>
    <marker id="arrowOrange" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b"/>
    </marker>
    <marker id="arrowRedRev" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M9,0 L9,6 L0,3 z" fill="#dc2626"/>
    </marker>
  </defs>
</svg>''')

# SCI1061: Hot metal cubes in different amounts of water
fix('SCI1061', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 260" width="380" font-family="Arial,sans-serif">
  <text x="190" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Heat Transfer: Metal Cubes in Water</text>
  
  <!-- Beaker A: 200ml water, 2 cubes -->
  <text x="95" y="45" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af">Beaker A</text>
  
  <!-- Beaker -->
  <path d="M 30,70 L 35,180 L 155,180 L 160,70 Z" fill="none" stroke="#64748b" stroke-width="2.5"/>
  <ellipse cx="95" cy="70" rx="65" ry="8" fill="none" stroke="#64748b" stroke-width="2"/>
  
  <!-- Water -->
  <path d="M 35,90 L 38,180 L 152,180 L 155,90 Z" fill="#60a5fa" opacity="0.4" stroke="#3b82f6" stroke-width="1"/>
  <ellipse cx="95" cy="90" rx="60" ry="7" fill="#60a5fa" opacity="0.5" stroke="#3b82f6" stroke-width="1"/>
  <text x="95" y="140" text-anchor="middle" font-size="11" fill="#0c4a6e" font-weight="bold">200 ml</text>
  <text x="95" y="153" text-anchor="middle" font-size="9" fill="#0c4a6e">water</text>
  
  <!-- 2 Hot cubes -->
  <rect x="70" y="120" width="18" height="18" fill="#ef4444" stroke="#991b1b" stroke-width="1.5" rx="2"/>
  <text x="79" y="132" text-anchor="middle" font-size="10" fill="white" font-weight="bold">100°</text>
  
  <rect x="102" y="120" width="18" height="18" fill="#ef4444" stroke="#991b1b" stroke-width="1.5" rx="2"/>
  <text x="111" y="132" text-anchor="middle" font-size="10" fill="white" font-weight="bold">100°</text>
  
  <text x="95" y="200" text-anchor="middle" font-size="9" fill="#64748b">2 hot cubes</text>
  <text x="95" y="212" text-anchor="middle" font-size="9" fill="#3b82f6" font-weight="bold">More water → smaller</text>
  <text x="95" y="224" text-anchor="middle" font-size="9" fill="#3b82f6" font-weight="bold">temperature rise</text>
  
  <!-- Beaker B: 100ml water, 2 cubes -->
  <text x="285" y="45" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af">Beaker B</text>
  
  <!-- Beaker -->
  <path d="M 220,70 L 225,180 L 345,180 L 350,70 Z" fill="none" stroke="#64748b" stroke-width="2.5"/>
  <ellipse cx="285" cy="70" rx="65" ry="8" fill="none" stroke="#64748b" stroke-width="2"/>
  
  <!-- Water (less) -->
  <path d="M 225,135 L 227,180 L 343,180 L 345,135 Z" fill="#60a5fa" opacity="0.4" stroke="#3b82f6" stroke-width="1"/>
  <ellipse cx="285" cy="135" rx="60" ry="7" fill="#60a5fa" opacity="0.5" stroke="#3b82f6" stroke-width="1"/>
  <text x="285" y="162" text-anchor="middle" font-size="11" fill="#0c4a6e" font-weight="bold">100 ml</text>
  <text x="285" y="175" text-anchor="middle" font-size="9" fill="#0c4a6e">water</text>
  
  <!-- 2 Hot cubes -->
  <rect x="260" y="148" width="18" height="18" fill="#ef4444" stroke="#991b1b" stroke-width="1.5" rx="2"/>
  <text x="269" y="160" text-anchor="middle" font-size="10" fill="white" font-weight="bold">100°</text>
  
  <rect x="292" y="148" width="18" height="18" fill="#ef4444" stroke="#991b1b" stroke-width="1.5" rx="2"/>
  <text x="301" y="160" text-anchor="middle" font-size="10" fill="white" font-weight="bold">100°</text>
  
  <text x="285" y="200" text-anchor="middle" font-size="9" fill="#64748b">2 hot cubes</text>
  <text x="285" y="212" text-anchor="middle" font-size="9" fill="#dc2626" font-weight="bold">Less water → larger</text>
  <text x="285" y="224" text-anchor="middle" font-size="9" fill="#dc2626" font-weight="bold">temperature rise</text>
  
  <!-- Explanation -->
  <rect x="10" y="240" width="360" height="15" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5" rx="3"/>
  <text x="190" y="251" text-anchor="middle" font-size="9" fill="#92400e">Same heat energy from cubes, but beaker B has half the water → B gets hotter</text>
</svg>''')

# SCI1062: Materials blocking light - shadows
fix('SCI1062', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="400" font-family="Arial,sans-serif">
  <text x="200" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Materials and Light</text>
  
  <!-- Light source -->
  <circle cx="40" cy="100" r="15" fill="#fef08a" stroke="#facc15" stroke-width="2"/>
  <path d="M 35,100 L 45,100 M 40,95 L 40,105 M 37,97 L 43,103 M 37,103 L 43,97" stroke="#f59e0b" stroke-width="2"/>
  <text x="40" y="125" text-anchor="middle" font-size="9" fill="#92400e" font-weight="bold">Light</text>
  
  <!-- Light rays -->
  <line x1="55" y1="85" x2="90" y2="75" stroke="#fbbf24" stroke-width="1.5" opacity="0.7"/>
  <line x1="55" y1="95" x2="90" y2="90" stroke="#fbbf24" stroke-width="1.5" opacity="0.7"/>
  <line x1="55" y1="100" x2="90" y2="100" stroke="#fbbf24" stroke-width="1.5" opacity="0.7"/>
  <line x1="55" y1="105" x2="90" y2="110" stroke="#fbbf24" stroke-width="1.5" opacity="0.7"/>
  <line x1="55" y1="115" x2="90" y2="125" stroke="#fbbf24" stroke-width="1.5" opacity="0.7"/>
  
  <!-- Material X: Opaque (square cutout) - blocks all light -->
  <rect x="95" y="55" width="50" height="90" fill="#1e293b" stroke="#0f172a" stroke-width="2"/>
  <rect x="110" y="85" width="20" height="20" fill="white" stroke="#64748b" stroke-width="1"/>
  <text x="120" y="50" text-anchor="middle" font-size="11" fill="#1e293b" font-weight="bold">X</text>
  <text x="120" y="155" text-anchor="middle" font-size="9" fill="#1e293b" font-weight="bold">Opaque</text>
  
  <!-- Material Y: Translucent (square cutout) - allows some light -->
  <rect x="160" y="55" width="50" height="90" fill="#94a3b8" opacity="0.6" stroke="#64748b" stroke-width="2"/>
  <rect x="175" y="85" width="20" height="20" fill="white" stroke="#64748b" stroke-width="1"/>
  <text x="185" y="50" text-anchor="middle" font-size="11" fill="#475569" font-weight="bold">Y</text>
  <text x="185" y="155" text-anchor="middle" font-size="9" fill="#64748b" font-weight="bold">Translucent</text>
  
  <!-- Material Z: Transparent (circle cutout) - allows all light -->
  <rect x="225" y="55" width="50" height="90" fill="#dbeafe" opacity="0.3" stroke="#3b82f6" stroke-width="2"/>
  <circle cx="250" cy="95" r="10" fill="white" stroke="#64748b" stroke-width="1"/>
  <text x="250" y="50" text-anchor="middle" font-size="11" fill="#1e40af" font-weight="bold">Z</text>
  <text x="250" y="155" text-anchor="middle" font-size="9" fill="#3b82f6" font-weight="bold">Transparent</text>
  
  <!-- Screen showing shadow -->
  <line x1="320" y1="40" x2="320" y2="160" stroke="#64748b" stroke-width="3"/>
  <text x="340" y="45" font-size="9" fill="#64748b" font-weight="bold">Screen</text>
  
  <!-- Shadow result -->
  <rect x="285" y="75" width="30" height="50" fill="#1e293b" opacity="0.9"/>
  <text x="300" y="70" text-anchor="middle" font-size="8" fill="#1e293b">Dark</text>
  <text x="300" y="135" text-anchor="middle" font-size="8" fill="#1e293b">square</text>
  
  <rect x="285" y="85" width="30" height="20" fill="#64748b" opacity="0.5"/>
  <text x="300" y="82" text-anchor="middle" font-size="7" fill="#64748b">Translucent</text>
  
  <circle cx="300" cy="95" r="10" fill="#fef08a" opacity="0.8" stroke="#facc15" stroke-width="1"/>
  <text x="300" y="100" text-anchor="middle" font-size="7" fill="#92400e">Bright</text>
  
  <!-- Explanation table -->
  <rect x="10" y="180" width="380" height="90" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5" rx="4"/>
  <text x="200" y="198" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e293b">Shadow Analysis</text>
  
  <text x="20" y="218" font-size="10" fill="#1e293b" font-weight="bold">Material X (Opaque):</text>
  <text x="30" y="232" font-size="9" fill="#475569">Blocks all light → Dark square shadow</text>
  
  <text x="20" y="248" font-size="10" fill="#64748b" font-weight="bold">Material Y (Translucent):</text>
  <text x="30" y="262" font-size="9" fill="#475569">Blocks some light → Dim/gray square shadow</text>
  
  <text x="200" y="218" font-size="10" fill="#3b82f6" font-weight="bold">Material Z (Transparent):</text>
  <text x="210" y="232" font-size="9" fill="#475569">Allows light through → Bright circle</text>
</svg>''')

# SCI1063: Hydro-electric power station
fix('SCI1063', '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 300" width="380" font-family="Arial,sans-serif">
  <text x="190" y="18" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Hydro-Electric Power Station</text>
  
  <!-- Water tank at height -->
  <rect x="260" y="50" width="100" height="80" fill="#60a5fa" opacity="0.5" stroke="#3b82f6" stroke-width="2.5"/>
  <path d="M 262,128 Q 270,122 280,125 Q 290,128 300,125 Q 310,122 320,125 Q 330,128 340,125 Q 350,122 358,125" stroke="#3b82f6" stroke-width="1.5" fill="none"/>
  <text x="310" y="95" text-anchor="middle" font-size="11" fill="#0c4a6e" font-weight="bold">Water Tank</text>
  
  <!-- Height indicator -->
  <line x1="375" y1="130" x2="375" y2="230" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4,3"/>
  <line x1="370" y1="130" x2="380" y2="130" stroke="#f59e0b" stroke-width="2"/>
  <line x1="370" y1="230" x2="380" y2="230" stroke="#f59e0b" stroke-width="2"/>
  <text x="372" y="182" text-anchor="end" font-size="9" fill="#f59e0b" font-weight="bold">Height</text>
  <polygon points="370,135 375,130 380,135" fill="#f59e0b"/>
  <polygon points="370,225 375,230 380,225" fill="#f59e0b"/>
  
  <!-- Pipe from tank -->
  <rect x="255" y="100" width="15" height="130" fill="#94a3b8" stroke="#64748b" stroke-width="2"/>
  
  <!-- Water flowing down -->
  <line x1="262" y1="140" x2="262" y2="220" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrowBlue)"/>
  <text x="250" y="180" text-anchor="end" font-size="8" fill="#3b82f6">Water</text>
  <text x="250" y="190" text-anchor="end" font-size="8" fill="#3b82f6">flows</text>
  
  <!-- Turbine -->
  <circle cx="262" cy="245" r="20" fill="#e2e8f0" stroke="#64748b" stroke-width="2.5"/>
  <path d="M 262,230 L 262,260 M 247,245 L 277,245" stroke="#475569" stroke-width="2"/>
  <path d="M 252,235 L 262,245 L 252,255" stroke="#16a34a" stroke-width="2.5" fill="none"/>
  <path d="M 272,235 L 262,245 L 272,255" stroke="#16a34a" stroke-width="2.5" fill="none"/>
  <text x="262" y="280" text-anchor="middle" font-size="10" fill="#475569" font-weight="bold">Turbine</text>
  
  <!-- Rotation arrow -->
  <path d="M 285,240 A 25,25 0 0,1 285,250" stroke="#16a34a" stroke-width="2" fill="none" marker-end="url(#arrowGreen)"/>
  <text x="295" y="250" font-size="8" fill="#16a34a">Spins</text>
  
  <!-- Generator -->
  <rect x="180" y="225" width="50" height="40" fill="#fef3c7" stroke="#f59e0b" stroke-width="2.5" rx="4"/>
  <text x="205" y="240" text-anchor="middle" font-size="10" fill="#92400e" font-weight="bold">Generator</text>
  <text x="205" y="253" text-anchor="middle" font-size="8" fill="#92400e">(produces</text>
  <text x="205" y="263" text-anchor="middle" font-size="8" fill="#92400e">electricity)</text>
  
  <!-- Connection from turbine to generator -->
  <line x1="242" y1="245" x2="230" y2="245" stroke="#64748b" stroke-width="3"/>
  
  <!-- Wire to bulb -->
  <line x1="180" y1="235" x2="100" y2="235" stroke="#1e293b" stroke-width="2"/>
  <line x1="100" y1="235" x2="100" y2="200" stroke="#1e293b" stroke-width="2"/>
  
  <!-- Light bulb -->
  <circle cx="100" cy="185" r="15" fill="#fef08a" stroke="#facc15" stroke-width="2.5"/>
  <path d="M 93,180 L 107,190 M 93,190 L 107,180" stroke="#f59e0b" stroke-width="2.5"/>
  <rect x="95" y="198" width="10" height="6" fill="#64748b" stroke="#475569" stroke-width="1" rx="1"/>
  <text x="100" y="220" text-anchor="middle" font-size="10" fill="#f59e0b" font-weight="bold">Bulb lights up</text>
  
  <!-- Return wire -->
  <line x1="100" y1="170" x2="100" y2="120" stroke="#1e293b" stroke-width="2"/>
  <line x1="100" y1="120" x2="260" y2="120" stroke="#1e293b" stroke-width="2"/>
  <line x1="260" y1="120" x2="260" y2="50" stroke="#1e293b" stroke-width="2"/>
  
  <!-- Ground -->
  <rect x="0" y="290" width="380" height="3" fill="#94a3b8"/>
  <line x1="0" y1="293" x2="380" y2="293" stroke="#64748b" stroke-width="1" stroke-dasharray="4,4"/>
  
  <!-- Explanation box -->
  <rect x="10" y="30" width="160" height="75" fill="#f0fdf4" stroke="#16a34a" stroke-width="2" rx="6"/>
  <text x="90" y="48" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">Variable to Change:</text>
  <text x="90" y="63" text-anchor="middle" font-size="9" fill="#166534" font-weight="bold">Height of water tank</text>
  <text x="90" y="78" text-anchor="middle" font-size="8" fill="#166534">Higher tank →</text>
  <text x="90" y="90" text-anchor="middle" font-size="8" fill="#166534">Faster falling water →</text>
  <text x="90" y="102" text-anchor="middle" font-size="8" fill="#166534">Faster turbine spin</text>
  
  <defs>
    <marker id="arrowBlue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
    </marker>
    <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#16a34a"/>
    </marker>
  </defs>
</svg>''')

# Save the updated file
with open('data/questions-science-p6.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("✅ Successfully added SVG diagrams to SCI1050-SCI1063 (14 questions)")
print("   • SCI1050: Matter vs Force")
print("   • SCI1051: Magnets on ramps")
print("   • SCI1052: Ball rolling on track")
print("   • SCI1053: Lamp shade material properties table")
print("   • SCI1054: Melting points table")
print("   • SCI1055: Container with air and liquid")
print("   • SCI1056: Circuit with 6 bulbs and 4 switches")
print("   • SCI1057: Circuit with bulb X")
print("   • SCI1058: Magnets and springs compression")
print("   • SCI1059: Henry jumping hurdle")
print("   • SCI1060: Two ramps comparison")
print("   • SCI1061: Hot metal cubes in water")
print("   • SCI1062: Materials blocking light")
print("   • SCI1063: Hydro-electric power station")
