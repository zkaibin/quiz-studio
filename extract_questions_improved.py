#!/usr/bin/env python3
"""
Improved question extraction from PDFs with better parsing
"""
import pdfplumber
import json
import re
from pathlib import Path

PDF_BASE = '/Users/zkaibin/Downloads/2026科学打卡营/'

# Days configuration
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

PERSON_NAMES = [
    'John', 'Mary', 'Sarah', 'Tom', 'David', 'Emily', 'Michael', 'Lisa',
    'James', 'Jessica', 'Robert', 'Jennifer', 'William', 'Linda'
]

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

def extract_question_from_block(block):
    """
    Extract structured question data from a block of text.
    
    Format:
    <question text>
    Your Answer: Correct/Incorrect
    <option 1>
    <option 2>
    <option 3>
    <option 4>
    Explanation:
    <explanation text>
    """
    # Find "Your Answer:" marker
    answer_match = re.search(r'Your Answer:\s*(Correct|Incorrect)', block)
    if not answer_match:
        return None
    
    is_correct = answer_match.group(1) == 'Correct'
    
    # Question is everything before "Your Answer:"
    question_part = block[:answer_match.start()]
    
    # Find "Explanation:" marker
    explanation_match = re.search(r'Explanation:', block)
    if not explanation_match:
        return None
    
    # Options are between "Your Answer:" and "Explanation:"
    options_part = block[answer_match.end():explanation_match.start()]
    
    # Explanation is after "Explanation:"
    explanation_part = block[explanation_match.end():]
    
    # Clean question text - remove metadata
    question_lines = []
    for line in question_part.split('\n'):
        line = line.strip()
        # Skip various metadata
        if not line or any(skip in line for skip in [
            'http', '/ 1 point', 'testmoz', 'Zhang Shuhan', 
            '5/19/26', 'Your score:', 'Duration:', 'P6 打卡营',
            'Could not get', 'May 19, 2026'
        ]):
            continue
        question_lines.append(line)
    
    question_text = ' '.join(question_lines)
    question_text = clean_text(question_text)
    
    # Extract options - they are simple lines after "Your Answer:"
    option_lines = []
    for line in options_part.split('\n'):
        line = line.strip()
        if line and not any(skip in line for skip in ['http', 'testmoz', '5/19/26']):
            option_lines.append(line)
    
    # Take first 4 non-empty lines as options
    options = [clean_text(opt) for opt in option_lines if opt][:4]
    
    # Clean explanation
    exp_lines = []
    for line in explanation_part.split('\n'):
        line = line.strip()
        if line and not any(skip in line for skip in ['http', 'testmoz', '5/19/26', 'P6 打卡营']):
            exp_lines.append(line)
    
    explanation = ' '.join(exp_lines)
    explanation = clean_text(explanation)
    
    # Replace person names
    question_text, has_char = replace_person_names(question_text)
    placeholder_roles = ["protagonist"] if has_char else []
    
    # Determine correct answer index
    # Since "Your Answer: Correct" means the first option shown was correct,
    # and we extract options in order, the correct answer is at index 0 when correct
    answer_index = 0 if is_correct else 1
    
    # Validate we have 4 options
    if len(options) < 4:
        # Pad with empty strings if needed
        while len(options) < 4:
            options.append("")
    
    options = options[:4]
    
    if question_text and all(options):
        return {
            'question': question_text,
            'options': options,
            'answer': answer_index,
            'correct_answer': options[answer_index],
            'explanation': explanation,
            'placeholder_roles': placeholder_roles,
            'is_correct': is_correct
        }
    
    return None

def extract_questions_from_pdf(pdf_path):
    """Extract all questions from a PDF"""
    questions = []
    
    try:
        with pdfplumber.open(pdf_path) as pdf:
            full_text = ""
            for page in pdf.pages:
                text = page.extract_text()
                if text:
                    full_text += text + "\n"
        
        # Split by question numbers
        parts = re.split(r'(?:^|\n)(\d{1,2})\.\s+', full_text)
        
        # Process each question
        for i in range(1, len(parts), 2):
            if i + 1 < len(parts):
                q_num = parts[i]
                q_block = parts[i + 1]
                
                q_data = extract_question_from_block(q_block)
                if q_data:
                    questions.append(q_data)
        
    except Exception as e:
        print(f"    Error reading PDF: {e}")
    
    return questions

def create_add_script(day_code, start_id, questions):
    """Create Python script to add questions"""
    week = day_code[1]
    day = day_code[3]
    
    script = f'''#!/usr/bin/env python3
"""
Add {day_code} questions to questions-science-p6.json
"""
import json

new_questions = [
'''
    
    for i, q in enumerate(questions):
        q_id = f"SCI{start_id + i}"
        
        # Escape quotes in strings
        template = q['question'].replace('"', '\\"')
        explanation = q['explanation'].replace('"', '\\"')
        
        options_str = ',\n        '.join([f'"{opt.replace(chr(34), chr(92)+chr(34))}"' for opt in q['options']])
        
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
        "correct_answer": "{q['correct_answer'].replace('"', '\\"')}",
        "explanation": "{explanation}"
    }},
'''
    
    script += ''']

# Load existing data
with open('data/questions-science-p6.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Add new questions
data['questions'].extend(new_questions)

# Save
with open('data/questions-science-p6.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Added {len(new_questions)} questions for ''' + day_code + '''")
'''
    
    return script

def main():
    """Main process"""
    print("Extracting questions from W3D2 through W4D5...\n")
    
    for day_code, start_id, end_id in DAYS_CONFIG:
        print(f"Processing {day_code}...")
        
        all_questions = []
        
        for part in [1, 2]:
            pdf_file = f"P6 打卡营 科学 MCQ {day_code}-{part}.pdf"
            pdf_path = PDF_BASE + pdf_file
            
            if not Path(pdf_path).exists():
                print(f"  Warning: {pdf_file} not found")
                continue
            
            print(f"  Reading {pdf_file}...")
            questions = extract_questions_from_pdf(pdf_path)
            all_questions.extend(questions)
            print(f"    Extracted {len(questions)} questions")
        
        print(f"  Total: {len(all_questions)} questions")
        
        # Create script
        week = day_code[1]
        day = day_code[3]
        script_file = f"add_w{week}d{day}.py"
        script_content = create_add_script(day_code, start_id, all_questions)
        
        with open(script_file, 'w', encoding='utf-8') as f:
            f.write(script_content)
        
        print(f"  Created {script_file}\n")
    
    print("All scripts created!")

if __name__ == '__main__':
    main()
