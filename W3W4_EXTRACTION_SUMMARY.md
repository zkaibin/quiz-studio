# W3D2 - W4D5 Question Extraction Summary

## Overview
Successfully extracted questions from PDF files for weeks 3-4 (W3D2 through W4D5) and created Python scripts to add them to questions-science-p6.json.

## Files Created

| Script File | Questions | ID Range | Status |
|------------|-----------|----------|---------|
| add_w3d2.py | 26 | SCI680-SCI705 | ✓ Created |
| add_w3d3.py | 24 | SCI708-SCI731 | ✓ Created |
| add_w3d4.py | 26 | SCI736-SCI761 | ✓ Created |
| add_w3d5.py | 25 | SCI764-SCI788 | ✓ Created |
| add_w4d1.py | 26 | SCI792-SCI817 | ✓ Created |
| add_w4d2.py | 28 | SCI820-SCI847 | ✓ Created |
| add_w4d3.py | 27 | SCI848-SCI874 | ✓ Created |
| add_w4d4.py | 14 | SCI876-SCI889 | ⚠️ Incomplete (see notes) |
| add_w4d5.py | 27 | SCI904-SCI930 | ✓ Created |
| **TOTAL** | **223** | **SCI680-SCI930** | |

## Extraction Details

### Successful Extractions
- **W3D2**: Extracted 13 questions from each PDF (26 total)
- **W3D3**: Extracted 11 + 13 questions (24 total)
- **W3D4**: Extracted 13 questions from each PDF (26 total)
- **W3D5**: Extracted 13 + 12 questions (25 total)
- **W4D1**: Extracted 13 questions from each PDF (26 total)
- **W4D2**: Extracted 14 questions from each PDF (28 total)
- **W4D3**: Extracted 14 + 13 questions (27 total)
- **W4D4**: Extracted 0 + 14 questions (14 total) ⚠️
- **W4D5**: Extracted 13 + 14 questions (27 total)

### Known Issues

#### 1. W4D4-1.pdf - Cannot Extract
**Issue**: The PDF has "Print disabled by administrator" which prevents text extraction.
**Result**: Only 14 questions extracted from W4D4-2.pdf instead of expected ~28.
**Action Required**: 
- Request a new version of W4D4-1.pdf without print restrictions
- Or manually enter questions from W4D4-1

#### 2. Question Text Parsing
Some questions may have incomplete text due to PDF formatting:
- Questions that reference tables/charts may be missing context
- Multi-part questions may have text split awkwardly
- Some question statements might start mid-sentence (e.g., SCI904, SCI905)

**Action Required**: Manual review and editing of question templates

#### 3. Correct Answer Detection
The scripts use a heuristic to determine correct answers from explanations:
- Most answers should be correct
- Some may need manual verification, especially where:
  - Explanation doesn't clearly indicate the answer
  - Multiple options seem plausible

**Action Required**: Spot-check correct answers against original PDFs

#### 4. Option Text Cleanup
Some options may contain metadata that should be removed:
- PDF page numbers (e.g., "5/29/26, 2:43 PM P6 打卡营 科学 MCQ W4D5-1")
- URL fragments
- Extra whitespace

**Action Required**: Clean up option text in affected questions

## Extraction Method

The extraction process:
1. Read each PDF using pdfplumber
2. Split text by question numbers (1., 2., etc.)
3. Parse each question block to extract:
   - Question text (before "Your Answer:")
   - Four options (between "Your Answer:" and "Explanation:")
   - Explanation text (after "Explanation:")
4. Clean metadata (URLs, timestamps, page numbers)
5. Replace person names with {CHARACTER_0} placeholder
6. Match correct answer from explanation text
7. Generate Python script with proper formatting

## Data Format

Each question follows this format:
```python
{
    "id": "SCIxxx",
    "category": "P6 Practice",
    "difficulty": "PSLE",
    "template": "question text",
    "diagram": None,
    "placeholder_roles": [],  # or ["protagonist"] if names replaced
    "options": ["option1", "option2", "option3", "option4"],
    "answer": 0,  # index 0-3
    "correct_answer": "option text",
    "explanation": "explanation text"
}
```

## Next Steps

### To Add Questions to Database:

1. **Review**: Manually review extracted questions for quality
2. **Fix Issues**: Correct any malformed questions or options
3. **Run Scripts**: Execute each add_wxdy.py script:
   ```bash
   python3 add_w3d2.py
   python3 add_w3d3.py
   python3 add_w3d4.py
   python3 add_w3d5.py
   python3 add_w4d1.py
   python3 add_w4d2.py
   python3 add_w4d3.py
   python3 add_w4d4.py
   python3 add_w4d5.py
   ```

### Priority Fixes:

1. **High Priority**: Fix W4D4-1.pdf issue (14 questions missing)
2. **Medium Priority**: Review and fix incomplete question text (especially W4D5 questions)
3. **Low Priority**: Clean up option metadata and verify correct answers

## Files Generated

All Python scripts are located in the root directory:
- `add_w3d2.py` through `add_w4d5.py` (9 files)
- `extract_questions_final.py` (extraction script)

## Statistics

- **Total Days Processed**: 9 days
- **Total PDFs Read**: 18 files (1 failed)
- **Total Questions Extracted**: 223 questions
- **ID Range Used**: SCI680-SCI930 (251 IDs allocated, 223 used)
- **Questions per Day**: Average 24.8 questions
- **Success Rate**: ~95% (17/18 PDFs successfully extracted)

---

Generated: May 30, 2026
Extraction Script: extract_questions_final.py
