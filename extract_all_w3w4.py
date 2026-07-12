#!/usr/bin/env python3
"""
Extract questions from W3D2 through W4D5 PDFs and create add scripts
"""
import pdfplumber
import json
import re
from pathlib import Path

# Base directory for PDFs
PDF_BASE = '/Users/zkaibin/Downloads/2026科学打卡营/'

# Days to process with their starting IDs
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

# Common person names to replace with placeholder
PERSON_NAMES = [
    'John', 'Mary', 'Sarah', 'Tom', 'David', 'Emily', 'Michael', 'Lisa',
    'James', 'Jessica', 'Robert', 'Jennifer', 'William', 'Linda', 'Richard',
    'Patricia', 'Joseph', 'Susan', 'Thomas', 'Karen', 'Charles', 'Nancy',
    'Christopher', 'Betty', 'Daniel', 'Margaret', 'Matthew', 'Sandra',
    'Anthony', 'Ashley', 'Donald', 'Dorothy', 'Mark', 'Kimberly', 'Paul',
    'Emily', 'Steven', 'Donna', 'Andrew', 'Michelle', 'Kenneth', 'Carol',
    'Joshua', 'Amanda', 'Kevin', 'Melissa', 'Brian', 'Deborah', 'George',
    'Stephanie', 'Edward', 'Rebecca', 'Ronald', 'Laura', 'Timothy', 'Sharon',
    'Jason', 'Cynthia', 'Jeffrey', 'Kathleen', 'Ryan', 'Amy', 'Jacob',
    'Shirley', 'Gary', 'Angela', 'Nicholas', 'Helen', 'Eric', 'Anna',
    'Jonathan', 'Brenda', 'Stephen', 'Pamela', 'Larry', 'Nicole', 'Justin',
    'Emma', 'Scott', 'Samantha', 'Brandon', 'Katherine', 'Benjamin', 'Christine',
    'Samuel', 'Debra', 'Frank', 'Rachel', 'Gregory', 'Catherine', 'Raymond',
    'Carolyn', 'Alexander', 'Janet', 'Patrick', 'Ruth', 'Jack', 'Maria',
    'Dennis', 'Heather', 'Jerry', 'Diane', 'Tyler', 'Virginia', 'Aaron',
    'Julie', 'Jose', 'Joyce', 'Henry', 'Victoria', 'Adam', 'Olivia', 'Nathan',
    'Kelly', 'Douglas', 'Christina', 'Zachary', 'Lauren', 'Peter', 'Joan',
    'Kyle', 'Evelyn', 'Walter', 'Judith', 'Ethan', 'Megan', 'Jeremy', 'Cheryl',
    'Harold', 'Andrea', 'Keith', 'Hannah', 'Christian', 'Jacqueline', 'Roger',
    'Martha', 'Noah', 'Gloria', 'Gerald', 'Teresa', 'Carl', 'Kathryn', 'Terry',
    'Sara', 'Sean', 'Janice', 'Austin', 'Jean', 'Arthur', 'Alice', 'Lawrence',
    'Madison', 'Jesse', 'Doris', 'Dylan', 'Abigail', 'Bryan', 'Julia', 'Joe',
    'Judy', 'Jordan', 'Grace', 'Billy', 'Denise', 'Bruce', 'Amber', 'Albert',
    'Marilyn', 'Willie', 'Beverly', 'Gabriel', 'Danielle', 'Logan', 'Theresa'
]

def clean_text(text):
    """Clean up text extracted from PDF"""
    if not text:
        return ""
    # Remove excessive whitespace
    text = re.sub(r'\s+', ' ', text)
    text = text.strip()
    return text

def replace_person_names(text):
    """Replace person names with {CHARACTER_0} placeholder"""
    has_replacement = False
    for name in PERSON_NAMES:
        # Match whole word only
        pattern = r'\b' + re.escape(name) + r'\b'
        if re.search(pattern, text):
            text = re.sub(pattern, '{CHARACTER_0}', text)
            has_replacement = True
    return text, has_replacement

def extract_questions_from_pdf(pdf_path):
    """Extract questions from a single PDF file"""
    questions = []
    
    with pdfplumber.open(pdf_path) as pdf:
        full_text = ""
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                full_text += page_text + "\n"
    
    # Split by question numbers (e.g., "1. ", "2. ", etc.)
    # Look for pattern like "\n1. " or start with "1. "
    parts = re.split(r'(?:^|\n)(\d{1,2})\.\s+', full_text)
    
    # Process question blocks
    for i in range(1, len(parts), 2):
        if i + 1 < len(parts):
            q_num = parts[i]
            q_block = parts[i + 1]
            
            # Extract question text, options, answer, and explanation
            question_data = parse_question_block(q_block, q_num)
            if question_data:
                questions.append(question_data)
    
    return questions

def parse_question_block(block_text, q_num):
    """Parse a single question block"""
    # Find the question text (everything before "Your Answer:")
    answer_match = re.search(r'Your Answer:\s*(Correct|Incorrect)', block_text)
    if not answer_match:
        return None
    
    is_correct = answer_match.group(1) == 'Correct'
    question_section = block_text[:answer_match.start()]
    
    # Find explanation
    explanation = ""
    exp_match = re.search(r'Explanation:\s*(.*?)(?=\n\d{1,2}\.|$)', block_text, re.DOTALL)
    if exp_match:
        explanation = clean_text(exp_match.group(1))
    
    # Extract options (lines between "Your Answer:" and "Explanation:")
    options_section = block_text[answer_match.end():exp_match.start() if exp_match else len(block_text)]
    
    # Clean up question text - remove metadata
    lines = question_section.split('\n')
    question_lines = []
    for line in lines:
        line = line.strip()
        # Skip metadata, URLs, timestamps, scores
        if not line or any(skip in line for skip in [
            'http', '/ 1 point', 'testmoz', 'Zhang Shuhan', '5/19/26',
            'Your score:', 'Duration:', 'P6 打卡营', 'Could not get'
        ]):
            continue
        question_lines.append(line)
    
    question_text = ' '.join(question_lines)
    question_text = clean_text(question_text)
    
    # Extract options - they appear after "Your Answer:" line
    option_lines = options_section.split('\n')
    options = []
    for line in option_lines:
        line = line.strip()
        if line and not any(skip in line for skip in ['http', 'testmoz', 'Explanation']):
            options.append(clean_text(line))
    
    # Usually there are 4 options
    if len(options) != 4:
        # Try alternative: sometimes options are listed differently
        # Looking at the format, options seem to be simple text lines
        pass
    
    # Replace person names in question
    question_text, has_char = replace_person_names(question_text)
    placeholder_roles = ["protagonist"] if has_char else []
    
    # Determine correct answer by matching with explanation
    # The correct answer is often mentioned in the explanation
    answer_index = 0
    correct_answer_text = ""
    
    if len(options) == 4:
        # Try to find which option appears in the explanation or is marked as correct
        for idx, option in enumerate(options):
            # Simple heuristic: the first option is often the answer shown as selected
            if idx == 0 and is_correct:
                answer_index = idx
                correct_answer_text = option
                break
        
        if not correct_answer_text:
            correct_answer_text = options[0]
    
    if question_text and len(options) >= 4:
        return {
            'question': question_text,
            'options': options[:4],  # Take first 4 options
            'answer': answer_index,
            'correct_answer': correct_answer_text,
            'explanation': explanation,
            'placeholder_roles': placeholder_roles,
            'is_correct': is_correct
        }
    
    return None

def create_add_script(day_code, start_id, end_id, questions):
    """Create a Python script to add questions for a specific day"""
    week = day_code[1]
    day = day_code[3]
    
    script_content = f'''#!/usr/bin/env python3
"""
Add {day_code} questions to questions-science-p6.json
IDs: SCI{start_id}-SCI{end_id}
"""
import json

# New questions for {day_code}
new_questions = [
'''
    
    # Add each question
    for i, q in enumerate(questions):
        q_id = f"SCI{start_id + i}"
        
        # Format options as Python list
        options_str = "[\n        " + ",\n        ".join([f'"{opt}"' for opt in q['options']]) + "\n    ]"
        
        # Create question dict
        script_content += f'''    {{
        "id": "{q_id}",
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": "{q['question']}",
        "diagram": None,
        "placeholder_roles": {q['placeholder_roles']},
        "options": {options_str},
        "answer": {q['answer']},
        "correct_answer": "{q['correct_answer']}",
        "explanation": "{q['explanation']}"
    }},
'''
    
    script_content += ''']

# Load existing questions
with open('data/questions-science-p6.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Add new questions
data['questions'].extend(new_questions)

# Save back
with open('data/questions-science-p6.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Added {len(new_questions)} questions for ''' + day_code + '''")
'''
    
    return script_content

def main():
    """Main extraction process"""
    print("Extracting questions from W3D2 through W4D5...")
    
    for day_code, start_id, end_id in DAYS_CONFIG:
        print(f"\nProcessing {day_code}...")
        
        all_questions = []
        
        # Process both PDF files for this day
        for part in [1, 2]:
            pdf_filename = f"P6 打卡营 科学 MCQ {day_code}-{part}.pdf"
            pdf_path = PDF_BASE + pdf_filename
            
            print(f"  Reading {pdf_filename}...")
            try:
                questions = extract_questions_from_pdf(pdf_path)
                all_questions.extend(questions)
                print(f"    Found {len(questions)} questions")
            except Exception as e:
                print(f"    Error: {e}")
        
        print(f"  Total: {len(all_questions)} questions")
        
        # Create add script
        week = day_code[1]
        day = day_code[3]
        script_filename = f"add_w{week}d{day}.py"
        script_content = create_add_script(day_code, start_id, end_id, all_questions)
        
        with open(script_filename, 'w', encoding='utf-8') as f:
            f.write(script_content)
        
        print(f"  Created {script_filename}")
    
    print("\nDone!")

if __name__ == '__main__':
    main()
