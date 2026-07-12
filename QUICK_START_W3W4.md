# Quick Start Guide: W3D2-W4D5 Questions

## ✅ What Was Completed

Successfully extracted and created Python scripts for **9 days** of science questions (W3D2 through W4D5):

```
✓ add_w3d2.py  - 26 questions (SCI680-SCI705)
✓ add_w3d3.py  - 24 questions (SCI708-SCI731)  
✓ add_w3d4.py  - 26 questions (SCI736-SCI761)
✓ add_w3d5.py  - 25 questions (SCI764-SCI788)
✓ add_w4d1.py  - 26 questions (SCI792-SCI817)
✓ add_w4d2.py  - 28 questions (SCI820-SCI847)
✓ add_w4d3.py  - 27 questions (SCI848-SCI874)
⚠ add_w4d4.py  - 14 questions (SCI876-SCI889) - incomplete, see notes
✓ add_w4d5.py  - 27 questions (SCI904-SCI930)

TOTAL: 223 questions extracted
```

## 🚀 How to Use

### Option 1: Add All at Once
```bash
./run_all_w3w4_adds.sh
```

### Option 2: Add Day by Day
```bash
python3 add_w3d2.py
python3 add_w3d3.py
# ... etc
```

## 📋 Sample Questions

### Example 1 (SCI680 - W3D2):
```python
{
    "id": "SCI680",
    "template": "Pollinator P flies in the day and is attracted to brightly coloured flowers. Which flower W, X, Y or Z is most likely pollinated by pollinator P?",
    "options": ["W", "X", "Y", "Z"],
    "answer": 0,
    "explanation": "Pollinator P is active during the day and likes bright colors..."
}
```

### Example 2 (SCI821 - W4D2):
```python
{
    "id": "SCI821",
    "template": "Gregory added batteries, one at a time, in series arrangement to the circuit and recorded the brightness of the bulb. Which of the following is/are possible explanation(s)...",
    "options": ["A only", "B only", "A and C only", "B and C only"],
    "answer": 0,
    "explanation": "When too many batteries were added, too much electrical energy was converted to heat energy..."
}
```

## ⚠️ Known Issues & Fixes Needed

### 1. W4D4 - Missing Questions (HIGH PRIORITY)
- **Problem**: W4D4-1.pdf has "Print disabled by administrator"
- **Impact**: Only 14 questions instead of ~28
- **Fix**: Obtain unlocked version of W4D4-1.pdf and re-extract

### 2. Some Question Text Issues (MEDIUM PRIORITY)
Some questions may need text cleanup:
- Questions starting mid-sentence (check SCI904, SCI905 in add_w4d5.py)
- Questions referencing tables/diagrams may lack context
- Options containing PDF metadata instead of actual text

**Recommended**: Manually review each script before running

### 3. Answer Verification (LOW PRIORITY)
- Most correct answers are properly detected
- Spot-check recommended, especially for complex questions
- Look for cases where explanation doesn't match the selected answer

## 🔍 Before Running Scripts

### Quick Quality Check:
```bash
# Check question count per script
for f in add_w*.py; do 
    echo "$f: $(grep -c '"id":' $f) questions"
done

# Validate a script
python3 -c "
exec(open('add_w3d2.py').read().split('# Load')[0])
print(f'Valid: {len(new_questions)} questions')
"
```

### Manual Review Checklist:
- [ ] Check W4D4 - only has 14 questions (14 missing from W4D4-1.pdf)
- [ ] Scan for incomplete question text
- [ ] Look for metadata in options (dates, URLs, PDF names)
- [ ] Verify a few correct answers match explanations
- [ ] Check that all 4 options exist for each question

## 📁 Files Created

**Scripts to Add Questions:**
- `add_w3d2.py` through `add_w4d5.py` (9 files)

**Helper Scripts:**
- `extract_questions_final.py` - Extraction tool
- `run_all_w3w4_adds.sh` - Batch runner

**Documentation:**
- `W3W4_EXTRACTION_SUMMARY.md` - Detailed summary
- `QUICK_START.md` - This file

## 🎯 Next Steps

1. **Review**: Check add_w4d*.py files for quality
2. **Fix W4D4**: Get unlocked PDF and re-extract missing questions
3. **Clean**: Fix any malformed questions found
4. **Test**: Run one script to verify it works
5. **Deploy**: Run all scripts to add questions to database

## 💡 Tips

- Back up `data/questions-science-p6.json` before running scripts
- Run scripts one at a time first to catch any issues early
- Use `git diff` to review what questions were added
- Test a few questions in the app after adding

---

**Generated**: May 30, 2026  
**Total Questions**: 223  
**Success Rate**: 95% (1 PDF failed to extract)
