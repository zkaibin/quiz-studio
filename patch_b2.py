import json

with open('data/questions-science-p6.json', 'r') as f:
    data = json.load(f)

idx = {q['id']: i for i, q in enumerate(data)}

def fix(qid, template=None, diagram=None, roles=None):
    i = idx[qid]
    if template is not None: data[i]['template'] = template
    if diagram is not None:  data[i]['diagram']  = diagram
    if roles   is not None:  data[i]['placeholder_roles'] = roles

# ── SCI548  both ─────────────────────────────────────────────────────────────
fix('SCI548',
    template="{CHARACTER_0} is learning about light. A motorcyclist is getting ready to stop at a traffic light that has turned red. Which statement explains why the motorcyclist is able to see the red light?",
    diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 165" width="340" font-family="Arial,sans-serif">
  <text x="170" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Seeing the Traffic Light</text>
  <!-- Traffic light -->
  <rect x="40" y="30" width="40" height="95" fill="#334155" stroke="#1e293b" stroke-width="2" rx="5"/>
  <circle cx="60" cy="52" r="12" fill="#dc2626" stroke="#991b1b" stroke-width="1.5"/>
  <circle cx="60" cy="78" r="12" fill="#374151" stroke="#1f2937" stroke-width="1"/>
  <circle cx="60" cy="104" r="12" fill="#374151" stroke="#1f2937" stroke-width="1"/>
  <text x="60" y="136" text-anchor="middle" font-size="9" fill="#dc2626">RED LIGHT</text>
  <!-- Light rays -->
  <line x1="82" y1="52" x2="200" y2="80" stroke="#fca5a5" stroke-width="1.5" stroke-dasharray="6,4"/>
  <line x1="82" y1="52" x2="200" y2="65" stroke="#fca5a5" stroke-width="1.5" stroke-dasharray="6,4"/>
  <!-- Motorcyclist (simple) -->
  <circle cx="235" cy="65" r="14" fill="#fde68a" stroke="#d97706" stroke-width="1.5"/>
  <text x="235" y="70" text-anchor="middle" font-size="9" fill="#92400e">👁</text>
  <rect x="215" y="79" width="40" height="25" fill="#475569" stroke="#1e293b" stroke-width="1.5" rx="3"/>
  <text x="235" y="96" text-anchor="middle" font-size="8" fill="white">biker</text>
  <!-- Arrow annotation -->
  <text x="145" y="60" text-anchor="middle" font-size="9" fill="#dc2626">light</text>
  <text x="145" y="72" text-anchor="middle" font-size="9" fill="#dc2626">travels →</text>
</svg>""",
    roles=['protagonist'])

# ── SCI552  both ─────────────────────────────────────────────────────────────
fix('SCI552',
    template="{CHARACTER_0} has two similar metal bars PQ and RS. They are arranged in four different ways. In some orientations, specific ends attract each other strongly, but the bars NEVER repel each other in any arrangement. Which of the following best describes the two bars?",
    diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 165" width="380" font-family="Arial,sans-serif">
  <text x="190" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Arrangements of Metal Bars PQ and RS</text>
  <!-- Arrangement 1 -->
  <text x="75" y="35" text-anchor="middle" font-size="9" fill="#64748b">Setup 1</text>
  <rect x="20" y="42" width="60" height="20" fill="#93c5fd" stroke="#3b82f6" stroke-width="1.5" rx="2"/>
  <text x="35" y="56" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">P</text>
  <text x="65" y="56" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Q</text>
  <text x="90" y="55" font-size="14" fill="#16a34a">↔</text>
  <rect x="105" y="42" width="60" height="20" fill="#86efac" stroke="#16a34a" stroke-width="1.5" rx="2"/>
  <text x="120" y="56" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">R</text>
  <text x="150" y="56" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">S</text>
  <text x="75" y="74" text-anchor="middle" font-size="8" fill="#dc2626">Attract ✓</text>
  <!-- Arrangement 2 -->
  <text x="75" y="90" text-anchor="middle" font-size="9" fill="#64748b">Setup 2</text>
  <rect x="20" y="97" width="60" height="20" fill="#93c5fd" stroke="#3b82f6" stroke-width="1.5" rx="2"/>
  <text x="35" y="111" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">P</text>
  <text x="65" y="111" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">Q</text>
  <text x="90" y="110" font-size="14" fill="#16a34a">↔</text>
  <rect x="105" y="97" width="60" height="20" fill="#86efac" stroke="#16a34a" stroke-width="1.5" rx="2"/>
  <text x="120" y="111" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">S</text>
  <text x="150" y="111" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e293b">R</text>
  <text x="75" y="129" text-anchor="middle" font-size="8" fill="#dc2626">Attract ✓</text>
  <!-- Key observation -->
  <rect x="195" y="35" width="175" height="110" fill="#fef9c3" stroke="#d97706" stroke-width="1.5" rx="5"/>
  <text x="282" y="52" text-anchor="middle" font-size="10" font-weight="bold" fill="#92400e">Key Observation</text>
  <text x="282" y="68" text-anchor="middle" font-size="9" fill="#1e293b">• Some ends attract</text>
  <text x="282" y="82" text-anchor="middle" font-size="9" fill="#1e293b">  strongly ✓</text>
  <text x="282" y="96" text-anchor="middle" font-size="9" fill="#1e293b">• No arrangement</text>
  <text x="282" y="110" text-anchor="middle" font-size="9" fill="#1e293b">  causes repulsion ✗</text>
  <text x="282" y="128" text-anchor="middle" font-size="9" fill="#0369a1">What are PQ and RS?</text>
</svg>""",
    roles=['protagonist'])

# ── SCI553  diagram only ─────────────────────────────────────────────────────
fix('SCI553', diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 130" width="380" font-family="Arial,sans-serif">
  <text x="190" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Which of the following is a FORCE?</text>
  <rect x="10" y="25" width="80" height="55" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5" rx="5"/>
  <text x="50" y="50" text-anchor="middle" font-size="20">🏋️</text>
  <text x="50" y="70" text-anchor="middle" font-size="9" fill="#1d4ed8">Gravity</text>
  <rect x="100" y="25" width="80" height="55" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5" rx="5"/>
  <text x="140" y="50" text-anchor="middle" font-size="20">🤜</text>
  <text x="140" y="70" text-anchor="middle" font-size="9" fill="#1d4ed8">Push / Pull</text>
  <rect x="190" y="25" width="80" height="55" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5" rx="5"/>
  <text x="230" y="50" text-anchor="middle" font-size="20">🧲</text>
  <text x="230" y="70" text-anchor="middle" font-size="9" fill="#1d4ed8">Magnetic</text>
  <rect x="290" y="25" width="80" height="55" fill="#fef9c3" stroke="#d97706" stroke-width="1.5" rx="5"/>
  <text x="330" y="50" text-anchor="middle" font-size="20">💡</text>
  <text x="330" y="70" text-anchor="middle" font-size="9" fill="#92400e">NOT a force?</text>
  <text x="190" y="110" text-anchor="middle" font-size="9" fill="#64748b">A force is a push, pull, or interaction that changes an object's state of motion or shape.</text>
</svg>""")

# ── SCI554  diagram only ─────────────────────────────────────────────────────
fix('SCI554', diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 145" width="360" font-family="Arial,sans-serif">
  <text x="180" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Living Things in the Tank</text>
  <rect x="20" y="25" width="320" height="100" fill="#e0f2fe" stroke="#0369a1" stroke-width="2" rx="5"/>
  <text x="180" y="42" text-anchor="middle" font-size="10" font-weight="bold" fill="#0369a1">Tank Contents</text>
  <!-- Fish P -->
  <rect x="35" y="50" width="80" height="30" fill="#bfdbfe" stroke="#3b82f6" stroke-width="1" rx="3"/>
  <text x="75" y="62" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e40af">1 × Fish P</text>
  <text x="75" y="74" text-anchor="middle" font-size="8" fill="#1e40af">(1 population)</text>
  <!-- Sea snails -->
  <rect x="135" y="50" width="90" height="30" fill="#bfdbfe" stroke="#3b82f6" stroke-width="1" rx="3"/>
  <text x="180" y="62" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e40af">Several Sea Snails</text>
  <text x="180" y="74" text-anchor="middle" font-size="8" fill="#1e40af">(1 population)</text>
  <!-- Plants -->
  <rect x="240" y="50" width="80" height="30" fill="#dcfce7" stroke="#16a34a" stroke-width="1" rx="3"/>
  <text x="280" y="62" text-anchor="middle" font-size="9" font-weight="bold" fill="#15803d">Some Plants</text>
  <text x="280" y="74" text-anchor="middle" font-size="8" fill="#15803d">(organisms)</text>
  <text x="180" y="108" text-anchor="middle" font-size="9" fill="#0369a1">Tank = 1 community (all living things sharing one habitat)</text>
</svg>""")

# ── SCI555  char only ────────────────────────────────────────────────────────
fix('SCI555',
    template="{CHARACTER_0} studies a graph showing the effect of temperature on the population of four organisms A, B, C, and D. Line B trends upward as temperature increases; Line D trends downward; Line A peaks at a certain temperature; Line C remains relatively flat. Which of the following statements is correct?",
    roles=['protagonist'])

# ── SCI556  both ─────────────────────────────────────────────────────────────
fix('SCI556',
    template="{CHARACTER_0} studies a food web containing organisms K, L, M, N, O, P, Q, R, and S. Organisms K, L, and R are producers (they make their own food). M eats K and L. N eats L and R. O eats M. P eats N. Q eats O and N. S eats P. How many food producers are there in the food web?",
    diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 180" width="380" font-family="Arial,sans-serif">
  <text x="190" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Food Web Diagram</text>
  <!-- Producers (green) -->
  <rect x="20" y="130" width="50" height="30" fill="#86efac" stroke="#16a34a" stroke-width="2" rx="4"/>
  <text x="45" y="149" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">K</text>
  <rect x="155" y="130" width="50" height="30" fill="#86efac" stroke="#16a34a" stroke-width="2" rx="4"/>
  <text x="180" y="149" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">L</text>
  <rect x="295" y="130" width="50" height="30" fill="#86efac" stroke="#16a34a" stroke-width="2" rx="4"/>
  <text x="320" y="149" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">R</text>
  <!-- Level 2 consumers -->
  <rect x="85" y="88" width="50" height="28" fill="#bfdbfe" stroke="#3b82f6" stroke-width="1.5" rx="4"/>
  <text x="110" y="106" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">M</text>
  <rect x="215" y="88" width="50" height="28" fill="#bfdbfe" stroke="#3b82f6" stroke-width="1.5" rx="4"/>
  <text x="240" y="106" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">N</text>
  <!-- Level 3 -->
  <rect x="55" y="50" width="50" height="28" fill="#fde68a" stroke="#d97706" stroke-width="1.5" rx="4"/>
  <text x="80" y="68" text-anchor="middle" font-size="11" font-weight="bold" fill="#92400e">O</text>
  <rect x="185" y="50" width="50" height="28" fill="#fde68a" stroke="#d97706" stroke-width="1.5" rx="4"/>
  <text x="210" y="68" text-anchor="middle" font-size="11" font-weight="bold" fill="#92400e">P</text>
  <!-- Level 4 Q, S -->
  <rect x="115" y="20" width="50" height="28" fill="#fca5a5" stroke="#ef4444" stroke-width="1.5" rx="4"/>
  <text x="140" y="38" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">Q</text>
  <rect x="255" y="20" width="50" height="28" fill="#fca5a5" stroke="#ef4444" stroke-width="1.5" rx="4"/>
  <text x="280" y="38" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">S</text>
  <!-- Arrows (simplified) -->
  <line x1="45" y1="130" x2="105" y2="116" stroke="#64748b" stroke-width="1"/>
  <line x1="180" y1="130" x2="115" y2="116" stroke="#64748b" stroke-width="1"/>
  <line x1="180" y1="130" x2="235" y2="116" stroke="#64748b" stroke-width="1"/>
  <line x1="320" y1="130" x2="245" y2="116" stroke="#64748b" stroke-width="1"/>
  <line x1="110" y1="88" x2="85" y2="78" stroke="#64748b" stroke-width="1"/>
  <line x1="240" y1="88" x2="215" y2="78" stroke="#64748b" stroke-width="1"/>
  <line x1="240" y1="88" x2="145" y2="48" stroke="#64748b" stroke-width="1"/>
  <line x1="80" y1="50" x2="135" y2="48" stroke="#64748b" stroke-width="1"/>
  <line x1="210" y1="50" x2="235" y2="48" stroke="#64748b" stroke-width="1"/>
  <!-- Legend -->
  <rect x="10" y="163" width="12" height="10" fill="#86efac" stroke="#16a34a" stroke-width="1"/>
  <text x="26" y="172" font-size="8" fill="#15803d">Producer</text>
  <rect x="80" y="163" width="12" height="10" fill="#bfdbfe" stroke="#3b82f6" stroke-width="1"/>
  <text x="96" y="172" font-size="8" fill="#1d4ed8">Primary consumer</text>
</svg>""",
    roles=['protagonist'])

# ── SCI557  char only ────────────────────────────────────────────────────────
fix('SCI557',
    template="{CHARACTER_0} studies a food web: K → M → O → Q; L → M; L → N → P → S; R → N; R → Q. Which of the following statements is correct?",
    roles=['protagonist'])

# ── SCI558  char only ────────────────────────────────────────────────────────
fix('SCI558',
    template="{CHARACTER_0} studies a food chain: W → X → Y → Z (arrows show what is eaten). Based on the food chain, which statement(s) is/are correct?\nA: W is the prey of X.\nB: Y is the predator of Z.\nC: Y is both prey and predator.\nD: There are only 2 predators in the food chain.",
    roles=['protagonist'])

# ── SCI559  diagram only ─────────────────────────────────────────────────────
fix('SCI559', diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 140" width="380" font-family="Arial,sans-serif">
  <text x="190" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Structural vs Behavioural Adaptations</text>
  <rect x="10" y="25" width="175" height="100" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5" rx="5"/>
  <text x="97" y="42" text-anchor="middle" font-size="10" font-weight="bold" fill="#1d4ed8">Structural Adaptations</text>
  <text x="97" y="58" text-anchor="middle" font-size="9" fill="#1e293b">Physical body features</text>
  <text x="97" y="73" text-anchor="middle" font-size="9" fill="#1e293b">e.g. thick fur, webbed feet,</text>
  <text x="97" y="86" text-anchor="middle" font-size="9" fill="#1e293b">sharp claws, camouflage colour</text>
  <text x="97" y="115" text-anchor="middle" font-size="8" fill="#64748b">(body structure / appearance)</text>
  <rect x="195" y="25" width="175" height="100" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5" rx="5"/>
  <text x="282" y="42" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">Behavioural Adaptations</text>
  <text x="282" y="58" text-anchor="middle" font-size="9" fill="#1e293b">Actions the animal performs</text>
  <text x="282" y="73" text-anchor="middle" font-size="9" fill="#1e293b">e.g. migration, hibernation,</text>
  <text x="282" y="86" text-anchor="middle" font-size="9" fill="#1e293b">nocturnal activity, huddling</text>
  <text x="282" y="115" text-anchor="middle" font-size="8" fill="#64748b">(behaviour / action done)</text>
</svg>""")

# ── SCI560  diagram only ─────────────────────────────────────────────────────
fix('SCI560', diagram="""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 145" width="380" font-family="Arial,sans-serif">
  <text x="190" y="15" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Plant X — Desert Adaptations</text>
  <rect x="20" y="25" width="340" height="90" fill="#fef9c3" stroke="#d97706" stroke-width="1.5" rx="5"/>
  <text x="190" y="42" text-anchor="middle" font-size="10" font-weight="bold" fill="#92400e">Desert Habitat Conditions</text>
  <text x="190" y="57" text-anchor="middle" font-size="9" fill="#1e293b">Strong wind  •  Low water availability  •  High temperature</text>
  <line x1="20" y1="65" x2="360" y2="65" stroke="#d97706" stroke-width="0.8" stroke-dasharray="4,3"/>
  <text x="190" y="80" text-anchor="middle" font-size="10" font-weight="bold" fill="#1d4ed8">Plant X Features</text>
  <text x="100" y="98" text-anchor="middle" font-size="9" fill="#1e293b">Short height</text>
  <text x="280" y="98" text-anchor="middle" font-size="9" fill="#1e293b">Thin leaves</text>
  <text x="190" y="108" text-anchor="middle" font-size="8" fill="#64748b">How do these features help the plant survive?</text>
</svg>""")

with open('data/questions-science-p6.json', 'w') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

batch = ['SCI548','SCI552','SCI553','SCI554','SCI555','SCI556','SCI557','SCI558','SCI559','SCI560']
for q in data:
    if q['id'] in batch:
        ok_d = q['diagram'] is not None
        ok_c = bool(q.get('placeholder_roles'))
        print(f"{q['id']}: diagram={'OK' if ok_d else 'MISSING'} | char={'OK' if ok_c else 'MISSING'}")
print("Batch 2 done!")
