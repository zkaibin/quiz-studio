# Experiment-Type Science Questions - Feasibility Analysis

## Executive Summary
**✅ YES - Experiment questions CAN be added WITHOUT changing website architecture!**

The current system is highly flexible and can accommodate experiment-type questions with minimal modifications to the JSON data structure only.

---

## Current Architecture Analysis

### 1. Question Data Structure
```json
{
  "id": "SCI001",
  "category": "Living Things",
  "difficulty": "P3-P4",
  "template": "Question text with {CHARACTER_0} placeholders",
  "diagram": "<svg>...</svg> or empty string",
  "placeholder_roles": ["protagonist"],
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "answer": 2,
  "correct_answer": "Option C text"
}
```

### 2. Display Rendering (quiz.js)
- Uses `template` field for question text
- Supports `diagram` field for visual content (SVG/HTML)
- Renders both through `buildQuestionText()` method:
  ```javascript
  buildQuestionText(question) {
    // 1. Adds diagram if present
    // 2. Substitutes character placeholders
    // 3. Returns combined HTML
  }
  ```

### 3. CSS Styling
- `.question-text` - Main question text styling
- `.question-diagram` - Gray box with border for diagrams/visuals
- Both are flexible and can accommodate longer content

---

## Experiment Question Types in Exams

### Common Formats:
1. **Procedure-Based Questions**
   - Setup description → observation question → conclusion
   
2. **Data Analysis Questions**
   - Table/graph provided → interpretation questions
   
3. **Hypothesis Testing**
   - Scenario → prediction → explanation
   
4. **Variable Identification**
   - Experiment description → identify independent/dependent/controlled variables
   
5. **Fair Test Questions**
   - Setup description → what to keep constant/change

---

## Implementation Strategy - THREE APPROACHES

### ✅ Approach 1: USE EXISTING STRUCTURE (Recommended)
**No code changes needed!** Just format experiment questions to fit current structure.

#### Example 1: Experiment with Procedure
```json
{
  "id": "SCI-EXP001",
  "category": "Heat",
  "difficulty": "PSLE",
  "template": "<strong>Experiment:</strong> {CHARACTER_0} sets up 4 identical beakers with hot water. Each beaker is wrapped differently: (1) No wrapping, (2) Aluminum foil, (3) Newspaper, (4) Cotton wool.<br><br><strong>Procedure:</strong> {CHARACTER_0} measures the temperature of water in each beaker after 30 minutes.<br><br><strong>Question:</strong> Which beaker will have the LOWEST temperature after 30 minutes?",
  "diagram": "",
  "placeholder_roles": ["protagonist"],
  "options": [
    "Beaker 1 (no wrapping)",
    "Beaker 2 (aluminum foil)",
    "Beaker 3 (newspaper)",
    "Beaker 4 (cotton wool)"
  ],
  "answer": 0,
  "correct_answer": "Beaker 1 (no wrapping)"
}
```

#### Example 2: Data Table Analysis
```json
{
  "id": "SCI-EXP002",
  "category": "Materials",
  "difficulty": "P5-P6",
  "template": "{CHARACTER_0} tests how fast sugar dissolves in water at different temperatures.<br><br><strong>Results:</strong><br><table border='1' style='border-collapse:collapse; margin:10px 0'><tr><th>Temperature</th><th>Time to dissolve</th></tr><tr><td>Cold (10°C)</td><td>3 minutes</td></tr><tr><td>Room (25°C)</td><td>1.5 minutes</td></tr><tr><td>Hot (60°C)</td><td>30 seconds</td></tr></table><br><strong>Question:</strong> What conclusion can {CHARACTER_0} make from this experiment?",
  "diagram": "",
  "placeholder_roles": ["protagonist"],
  "options": [
    "Temperature has no effect on dissolving",
    "Sugar dissolves faster at higher temperatures",
    "Sugar dissolves faster in cold water",
    "Sugar doesn't dissolve in hot water"
  ],
  "answer": 1,
  "correct_answer": "Sugar dissolves faster at higher temperatures"
}
```

#### Example 3: Variable Identification
```json
{
  "id": "SCI-EXP003",
  "category": "Electricity",
  "difficulty": "P5-P6",
  "template": "<strong>Experiment Setup:</strong> {CHARACTER_0} wants to find out how the length of wire affects the brightness of a bulb. {CHARACTER_0} sets up circuits with wires of different lengths (10cm, 20cm, 30cm) but keeps everything else the same: same battery, same bulb, same wire thickness.<br><br><strong>Question:</strong> What is the independent variable (what {CHARACTER_0} changes) in this experiment?",
  "diagram": "",
  "placeholder_roles": ["protagonist"],
  "options": [
    "The brightness of the bulb",
    "The length of the wire",
    "The type of battery",
    "The thickness of wire"
  ],
  "answer": 1,
  "correct_answer": "The length of the wire"
}
```

**Advantages:**
- ✅ Zero code changes
- ✅ Works immediately
- ✅ Uses HTML formatting (`<br>`, `<strong>`, `<table>`)
- ✅ Character placeholders work
- ✅ Maintains compatibility

**Limitations:**
- No special styling for experiment sections
- All content in one text block

---

### Approach 2: ADD OPTIONAL DIAGRAM FIELD ENHANCEMENT
Minimal modification - use `diagram` field for experiment setup visuals.

#### Example with Diagram:
```json
{
  "id": "SCI-EXP004",
  "category": "Light",
  "difficulty": "PSLE",
  "template": "{CHARACTER_0} performs the experiment shown above.<br><br><strong>Question:</strong> At which position will the shadow be LONGEST?",
  "diagram": "<div style='padding:20px; background:#f0f0f0; text-align:center;'><img src='data:image/svg+xml;base64,...' alt='Light source and object experiment' style='max-width:400px'/><br><small>Figure: Light source at different angles</small></div>",
  "placeholder_roles": ["protagonist"],
  "options": [
    "When light is directly overhead",
    "When light is at a low angle",
    "When light is behind the object",
    "Shadow length is always the same"
  ],
  "answer": 1,
  "correct_answer": "When light is at a low angle"
}
```

**Advantages:**
- ✅ Visual experiment setups
- ✅ Better for diagram-heavy questions
- ✅ Still no code changes

---

### Approach 3: ADD NEW OPTIONAL FIELDS (Most Structured)
Add optional fields for better organization (requires minor code update).

#### Enhanced Structure:
```json
{
  "id": "SCI-EXP005",
  "category": "Forces",
  "difficulty": "PSLE",
  "template": "Based on the experiment above, which statement is correct?",
  "experiment_setup": "{CHARACTER_0} sets up a ramp and releases toy cars from different heights.",
  "experiment_data": "<table>...</table>",
  "diagram": "<svg>...</svg>",
  "placeholder_roles": ["protagonist"],
  "options": [...],
  "answer": 1,
  "correct_answer": "..."
}
```

#### Required Code Changes:
**File: js/quiz.js - buildQuestionText() method**
```javascript
buildQuestionText(question) {
  let html = '';
  
  // NEW: Add experiment setup section if present
  if (question.experiment_setup) {
    html += `<div class="experiment-setup"><strong>Experiment Setup:</strong><br>${question.experiment_setup}</div>`;
  }
  
  // NEW: Add experiment data if present  
  if (question.experiment_data) {
    html += `<div class="experiment-data">${question.experiment_data}</div>`;
  }
  
  // EXISTING: Add diagram if present
  if (question.diagram) {
    // ... existing code
  }
  
  // EXISTING: Build question text
  let text = question.template;
  // ... rest of existing code
  
  return html;
}
```

**File: css/style.css - Add new styles**
```css
.experiment-setup {
  background: #e0f2fe;
  border-left: 4px solid #0284c7;
  padding: 12px;
  margin-bottom: 15px;
  border-radius: 4px;
}

.experiment-data {
  background: #f8fafc;
  padding: 15px;
  margin: 15px 0;
  border-radius: 6px;
}

.experiment-data table {
  width: 100%;
  border-collapse: collapse;
}

.experiment-data th,
.experiment-data td {
  padding: 8px;
  border: 1px solid #cbd5e1;
  text-align: left;
}

.experiment-data th {
  background: #e2e8f0;
  font-weight: 600;
}
```

**Advantages:**
- ✅ Better visual separation
- ✅ Cleaner data structure
- ✅ Custom styling for experiment sections

**Disadvantages:**
- ⚠️ Requires code changes (but minimal)
- ⚠️ Optional fields must be handled gracefully

---

## Recommended Implementation Plan

### Phase 1: START IMMEDIATELY (Approach 1)
1. Create 10-20 experiment questions using existing structure
2. Use HTML formatting in template field
3. Test with current system
4. No deployment needed

### Phase 2: EVALUATE & ENHANCE (Optional)
Based on Phase 1 results:
- If questions look good → Continue with Approach 1
- If need better styling → Implement Approach 3 changes

---

## Sample Experiment Question Categories

### 1. Heat Transfer Experiments
- Insulator comparison
- Rate of cooling/heating
- Conduction experiments

### 2. Light Experiments  
- Shadow formation
- Reflection angles
- Transparent/translucent/opaque tests

### 3. Electricity Experiments
- Circuit component effects
- Series vs parallel comparisons
- Conductor testing

### 4. Materials/Matter
- Dissolving rates
- Evaporation factors
- State changes

### 5. Forces Experiments
- Friction comparisons
- Ramp/gravity experiments
- Elastic force tests

### 6. Sound Experiments
- Pitch/volume factors
- Medium comparisons
- Vibration observations

---

## Conclusion

**✅ HIGHLY FEASIBLE - Experiment questions can be added TODAY!**

- **Best Approach:** Start with Approach 1 (use existing structure)
- **Effort Required:** Content creation only, zero coding
- **Time to Deploy:** Immediate (just add questions to JSON)
- **Risk:** None (backward compatible)

The current architecture is perfectly suited for experiment questions. The flexibility of the `template` field with HTML support and the optional `diagram` field provide everything needed.

---

## Next Steps

1. ✅ Decision: Which approach to use?
2. Create 5-10 sample experiment questions
3. Test in quiz interface
4. If satisfied, create full set of 20-30 experiment questions
5. Commit and deploy

Would you like me to create sample experiment questions right away?
