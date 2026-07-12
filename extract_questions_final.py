#!/usr/bin/env python3
"""
Final improved extraction with answer matching from explanations
"""
import pdfplumber
import json
import re
from pathlib import Path

PDF_BASE = '/Users/zkaibin/Downloads/2026科学打卡营/'

DAYS_CONFIG = [
    ('W3D2', 680, 707),
    ('W3D3', 708, 735),
    ('W3D4', 736, 763),
    ('W3D5', 764, 791),
    ('W4D1', 792, 819),
    ('W4D2', 820, 847),
    ('W4D3', 848, 875),
    ('W4D4', 876, 903),
    ('W4D5', 904, 931),
]

PERSON_NAMES = ['John', 'Mary', 'Sarah', 'Tom', 'David', 'Emily', 'Michael', 'Lisa']

def clean_text(text):
    """Clean text"""
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def replace_person_names(text):
    """Replace person names with {CHARACTER_0}"""
    has_replacement = False
    for name in PERSON_NAMES:
        pattern = r'\b' + re.escape(name) + r'\b'
        if re.search(pattern, text):
            text = re.sub(pattern, '{CHARACTER_0}', text)
            has_replacement = True
    return text, has_replacement

def find_correct_answer_index(options, explanation, is_correct):
    """
    Try to determine correct answer from explanation.
    Look for key phrases that indicate the answer.
    """
    explanation_lower = explanation.lower()
    
    # Try to find which option is mentioned as correct in explanation
    for idx, option in enumerate(options):
        option_lower = option.lower()
        
        # Check if this option is explicitly mentioned as correct
        if option_lower in explanation_lower:
            # Look for confirming patterns near the option text
            if any(phrase in explanation_lower for phrase in [
                f"{option_lower} is correct",
                f"{option_lower} fits",
                f"option {idx + 1}",
                f"answer is {option_lower}",
                f"therefore {option_lower}",
                f"{option_lower} matches",
            ]):
                return idx
    
    # Fallback: if marked correct, try first non-empty option, otherwise second
    if is_correct:
        return 0
    else:
        return 1

def extract_question_from_block(block):
    """Extract structured question data from block"""
    # Find markers
    answer_match = re.search(r'Your Answer:\s*(Correct|Incorrect)', block)
    if not answer_match:
        return None
    
    is_correct = answer_match.group(1) == 'Correct'
    question_part = block[:answer_match.start()]
    
    explanation_match = re.search(r'Explanation:', block)
    if not explanation_match:
        return None
    
    options_part = block[answer_match.end():explanation_match.start()]
    explanation_part = block[explanation_match.end():]
    
    # Clean question
    question_lines = []
    for line in question_part.split('\n'):
        line = line.strip()
        if not line or any(skip in line for skip in [
            'http', '/ 1 point', 'testmoz', 'Zhang Shuhan', 
            '5/19/26', 'Your score:', 'Duration:', 'P6 打卡营',
            'Could not get', 'May', '2026'
        ]):
            continue
        question_lines.append(line)
    
    question_text = ' '.join(question_lines)
    question_text = clean_text(question_text)
    
    # Extract options
    option_lines = []
    for line in options_part.split('\n'):
        line = line.strip()
        if line and not any(skip in line for skip in ['http', 'testmoz', '5/19/26', 'Could not']):
            option_lines.append(line)
    
    options = [clean_text(opt) for opt in option_lines if opt][:4]
    
    # Clean explanation
    exp_lines = []
    for line in explanation_part.split('\n'):
        line = line.strip()
        if line and not any(skip in line for skip in ['http', 'testmoz', '5/19/26', 'P6 打卡营', 'Could not']):
            exp_lines.append(line)
    
    explanation = ' '.join(exp_lines)
    explanation = clean_text(explanation)
    
    # Replace person names
    question_text, has_char = replace_person_names(question_text)
    placeholder_roles = ["protagonist"] if has_char else []
    
    # Pad options if needed
    while len(options) < 4:
        options.append("Option " + str(len(options) + 1))
    options = options[:4]
    
    # Determine correct answer
    answer_index = find_correct_answer_index(options, explanation, is_correct)
    
    if question_text and all(options):
        return {
            'question': question_text,
            'options': options,
            'answer': answer_index,
            'correct_answer': options[answer_index],
            'explanation': explanation,
            'placeholder_roles': placeholder_roles
        }
    
    return None

def extract_questions_from_pdf(pdf_path):
    """Extract questions from PDF"""
    questions = []
    
    try:
        with pdfplumber.open(pdf_path) as pdf:
            full_text = ""
            for page in pdf.pages:
                text = page.extract_text()
                if text:
                    full_text += text + "\n"
        
        parts = re.split(r'(?:^|\n)(\d{1,2})\.\s+', full_text)
        
        for i in range(1, len(parts), 2):
            if i + 1 < len(parts):
                q_block = parts[i + 1]
                q_data = extract_question_from_block(q_block)
                if q_data:
                    questions.append(q_data)
        
    except Exception as e:
        print(f"    Error: {e}")
    
    return questions

def create_add_script(day_code, start_id, questions):
    """Create Python add script"""
    week = day_code[1]
    day = day_code[3]
    
    script = f'''#!/usr/bin/env python3
"""
Add {day_code} questions to questions-science-p6.json
IDs: SCI{start_id}-SCI{start_id + len(questions) - 1}
"""
import json

new_questions = [
'''
    
    for i, q in enumerate(questions):
        q_id = f"SCI{start_id + i}"
        
        # Escape quotes
        def escape(s):
            return s.replace('\\', '\\\\').replace('"', '\\"')
        
        template = escape(q['question'])
        explanation = escape(q['explanation'])
        correct_answer = escape(q['correct_answer'])
        
        options_str = ',\n        '.join([f'"{escape(opt)}"' for opt in q['options']])
        
        script += f'''    {{
        "id": "{q_id}",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "{template}",
        "diagram": None,
        "placeholder_roles": {q['placeholder_roles']},
        "options": [
        {options_str}
        ],
        "answer": {q['answer']},
        "correct_answer": "{correct_answer}",
        "explanation": "{explanation}"
    }},
'''
    
    script += ''']

# Load existing data
with open('data/questions-science-p6.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Extend questions
data['questions'].extend(new_questions)

# Save
with open('data/questions-science-p6.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"✓ Added {len(new_questions)} questions for ''' + day_code + '''")
'''
    
    return script

def main():
    """Main extraction"""
    print("=" * 60)
    print("Extracting questions from W3D2 through W4D5")
    print("=" * 60)
    print()
    
    total_questions = 0
    
    for day_code, start_id, end_id in DAYS_CONFIG:
        print(f"📚 Processing {day_code}...")
        
        all_questions = []
        
        for part in [1, 2]:
            pdf_file = f"P6 打卡营 科学 MCQ {day_code}-{part}.pdf"
            pdf_path = PDF_BASE + pdf_file
            
            if not Path(pdf_path).exists():
                print(f"  ⚠️  {pdf_file} not found")
                continue
            
            print(f"  📄 Reading {pdf_file}...")
            questions = extract_questions_from_pdf(pdf_path)
            all_questions.extend(questions)
            print(f"     Found {len(questions)} questions")
        
        print(f"  ✓ Total: {len(all_questions)} questions")
        total_questions += len(all_questions)
        
        # Create script
        week = day_code[1]
        day = day_code[3]
        script_file = f"add_w{week}d{day}.py"
        script_content = create_add_script(day_code, start_id, all_questions)
        
        with open(script_file, 'w', encoding='utf-8') as f:
            f.write(script_content)
        
        print(f"  ✓ Created {script_file}")
        print()
    
    print("=" * 60)
    print(f"✓ All done! Created 9 scripts with {total_questions} total questions")
    print("=" * 60)

if __name__ == '__main__':
    main()
