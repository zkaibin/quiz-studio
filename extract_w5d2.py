import pdfplumber
import re
import json

def detect_person_names(text):
    """Detect common person names in the text"""
    # Common names from previous extractions
    common_names = [
        'Patricia', 'Peter', 'John', 'Mary', 'David', 'Sarah', 'Michael', 'Lisa',
        'James', 'Emily', 'Robert', 'Emma', 'William', 'Sophia', 'Richard', 'Olivia',
        'Thomas', 'Isabella', 'Daniel', 'Mia', 'Matthew', 'Charlotte', 'Anthony',
        'Amelia', 'Mark', 'Harper', 'Paul', 'Evelyn', 'Steven', 'Abigail', 'Andrew',
        'Rachel', 'Joshua', 'Hannah', 'Christopher', 'Grace', 'Kevin', 'Lily',
        'Brian', 'Chloe', 'George', 'Zoe', 'Edward', 'Madison', 'Kenneth', 'Ella',
        'Ronald', 'Scarlett', 'Timothy', 'Aria', 'Jason', 'Layla', 'Jeffrey',
        'Avery', 'Ryan', 'Riley', 'Jacob', 'Nora', 'Gary', 'Ellie', 'Nicholas',
        'Lucas', 'Eric', 'Mason', 'Stephen', 'Logan', 'Larry', 'Ethan', 'Frank',
        'Oliver', 'Scott', 'Aiden', 'Raymond', 'Jackson', 'Jerry', 'Sebastian'
    ]
    
    for name in common_names:
        if name in text:
            return name
    return None

def replace_name_with_placeholder(text, name):
    """Replace person name with {CHARACTER_0}"""
    if not name:
        return text, False
    
    # Replace the name with placeholder
    replaced = text.replace(name, '{CHARACTER_0}')
    return replaced, True

def parse_question_content(content):
    """Parse question content to extract question text, options, and explanation"""
    lines = content.split('\n')
    
    # Find the question text (before options)
    question_lines = []
    options = []
    explanation = ""
    
    in_question = True
    in_explanation = False
    
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        
        # Skip empty lines, score indicators, and metadata
        if not line or 'point' in line.lower() or 'your answer:' in line.lower():
            i += 1
            continue
        
        # Detect explanation section
        if line.startswith('Explanation:') or (in_explanation and line):
            in_explanation = True
            in_question = False
            if not line.startswith('Explanation:'):
                explanation += line + ' '
            i += 1
            continue
        
        # Detect options - they usually start with (1), (2), (3), (4) or single words
        # or patterns like "A: ", "B: ", etc.
        option_pattern = r'^(\([1-4]\)|[A-D]:|[A-D]\s|^\w+\s+\w+$)'
        if re.match(option_pattern, line) and not in_explanation:
            options.append(line)
            in_question = False
            i += 1
            continue
        
        # Check if it's a table option (like "G H" or "(1) fern flowering plant")
        if '(' in line and ')' in line and not in_explanation:
            # Check if it looks like an option
            if re.search(r'\([1-4]\)', line):
                options.append(line)
                in_question = False
                i += 1
                continue
        
        # Otherwise, it's part of the question
        if in_question:
            question_lines.append(line)
        
        i += 1
    
    question_text = ' '.join(question_lines).strip()
    explanation = explanation.strip()
    
    return question_text, options, explanation

def extract_correct_answer_from_explanation(explanation, options):
    """Try to determine the correct answer from the explanation"""
    # Common patterns to identify correct answers
    if not explanation or not options:
        return 0  # Default to first option
    
    # Check for patterns like "The answer is (2)" or "Option (3) is correct"
    match = re.search(r'\(([1-4])\)', explanation)
    if match:
        return int(match.group(1)) - 1
    
    # Check if explanation starts with a letter reference
    match = re.search(r'^([A-D])\s', explanation)
    if match:
        return ord(match.group(1)) - ord('A')
    
    # Try to match explanation content with options
    for i, opt in enumerate(options):
        # Clean the option text
        opt_text = re.sub(r'^(\([1-4]\)|[A-D]:?)\s*', '', opt).strip()
        if opt_text and opt_text.lower() in explanation.lower():
            return i
    
    return 0  # Default

def format_options(options):
    """Format options to clean format"""
    formatted = []
    for opt in options:
        # Remove numbering like (1), (2), A:, B:, etc.
        cleaned = re.sub(r'^(\([1-4]\)|[A-D]:?)\s*', '', opt).strip()
        if cleaned:
            formatted.append(cleaned)
    
    # Ensure we have exactly 4 options
    while len(formatted) < 4:
        formatted.append("")
    
    return formatted[:4]

def extract_questions_from_pdf(pdf_path):
    """Extract all questions from a PDF"""
    questions = []
    with pdfplumber.open(pdf_path) as pdf:
        full_text = ''
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                full_text += text + '\n'
    
    # Split by question numbers (looking for pattern like "1. ", "2. ", etc.)
    pattern = r'(\d+)\.\s+(.*?)(?=\n\d+\.\s+|\Z)'
    matches = re.findall(pattern, full_text, re.DOTALL)
    
    for match in matches:
        q_num, content = match
        questions.append({
            'number': int(q_num),
            'content': content.strip()
        })
    
    return questions

def main():
    # Extract from both PDFs
    pdf1_path = '/Users/zkaibin/Downloads/2026科学打卡营/P6 打卡营 科学 MCQ W5D2-1.pdf'
    pdf2_path = '/Users/zkaibin/Downloads/2026科学打卡营/P6 打卡营 科学 MCQ W5D2-2.pdf'
    
    print("Extracting questions from PDFs...")
    questions1 = extract_questions_from_pdf(pdf1_path)
    questions2 = extract_questions_from_pdf(pdf2_path)
    
    all_questions = questions1 + questions2
    print(f"Found {len(all_questions)} questions total")
    
    # Process each question
    formatted_questions = []
    start_id = 959
    
    for idx, q in enumerate(all_questions):
        question_id = f"SCI{start_id + idx}"
        content = q['content']
        
        # Parse the content
        question_text, options, explanation = parse_question_content(content)
        
        # Skip if no valid question text or too few options
        if not question_text or len(options) < 2:
            print(f"Skipping question {q['number']}: insufficient data")
            continue
        
        # Detect person names
        person_name = detect_person_names(question_text)
        
        # Replace name with placeholder
        question_template, has_character = replace_name_with_placeholder(question_text, person_name)
        
        # Also replace in explanation if needed
        if person_name and explanation:
            explanation = explanation.replace(person_name, '{CHARACTER_0}')
        
        # Format options
        formatted_opts = format_options(options)
        
        # Determine correct answer (0-indexed)
        answer_idx = extract_correct_answer_from_explanation(explanation, formatted_opts)
        
        # Create question object
        question_obj = {
            "id": question_id,
            "category": "P6 Practice",
            "difficulty": "PSLE",
            "template": question_template,
            "diagram": None,
            "placeholder_roles": ["protagonist"] if has_character else None,
            "options": formatted_opts,
            "answer": answer_idx,
            "correct_answer": chr(65 + answer_idx),  # Convert 0-3 to A-D
            "explanation": explanation if explanation else "Please refer to the answer key."
        }
        
        formatted_questions.append(question_obj)
        
        # Debug output
        print(f"\n{question_id}: {question_template[:80]}...")
        print(f"  Options: {len(formatted_opts)}")
        print(f"  Answer: {question_obj['correct_answer']}")
        print(f"  Character: {has_character}")
    
    print(f"\n\nSuccessfully formatted {len(formatted_questions)} questions")
    
    # Generate the add_w5d2.py script
    script_content = '''import json

new_questions = '''
    
    script_content += json.dumps(formatted_questions, indent=2, ensure_ascii=False)
    
    script_content += '''

with open('data/questions-science-p6.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

data.extend(new_questions)

with open('data/questions-science-p6.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Added {len(new_questions)} W5D2 questions")
'''
    
    # Write the script
    with open('add_w5d2.py', 'w', encoding='utf-8') as f:
        f.write(script_content)
    
    print(f"\nGenerated add_w5d2.py with {len(formatted_questions)} questions")
    print(f"Question IDs: SCI{start_id} to SCI{start_id + len(formatted_questions) - 1}")

if __name__ == "__main__":
    main()
