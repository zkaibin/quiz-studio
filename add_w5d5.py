import json
import pdfplumber
import re

def extract_questions_from_pdf(pdf_path):
    """Extract all questions from a PDF file."""
    questions = []
    
    with pdfplumber.open(pdf_path) as pdf:
        full_text = ""
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                full_text += text + "\n"
    
    # Split by question numbers
    pattern = r'(\d+)\.\s+(.*?)(?=\n\d+\.\s+|\Z)'
    matches = re.findall(pattern, full_text, re.DOTALL)
    
    for match in matches:
        q_num, q_content = match
        questions.append({
            'number': int(q_num),
            'content': q_content.strip()
        })
    
    return questions

def parse_question(q_content):
    """Parse question content to extract question, options, answer, and explanation."""
    lines = [l.strip() for l in q_content.split('\n') if l.strip()]
    
    # Remove metadata lines but keep track of what we remove
    clean_lines = []
    for line in lines:
        # Skip these patterns
        if re.match(r'\d+/\d+/\d+,', line):  # Date
            continue
        if line.startswith('https://'):
            continue
        if 'P6 打卡营 科学' in line:
            continue
        if 'testmozusercontent.com' in line:
            continue
        clean_lines.append(line)
    
    # Find key markers
    your_answer_idx = -1
    explanation_idx = -1
    point_marker_idx = -1
    
    for i, line in enumerate(clean_lines):
        if line.startswith('Your Answer:'):
            your_answer_idx = i
        if line.startswith('Explanation:'):
            explanation_idx = i
        if 'point' in line and '/' in line and point_marker_idx == -1:
            point_marker_idx = i
    
    # Extract question (before "Your Answer:" but include point marker line if it has question text)
    question_lines = []
    for i, line in enumerate(clean_lines):
        if i >= your_answer_idx and your_answer_idx >= 0:
            break
        # For point marker line, extract text before "point"
        if 'point' in line and '/' in line:
            # Extract question text before the point marker
            match = re.match(r'(.*?)\s+\d+\s*/\s*\d+\s*point', line)
            if match:
                q_text = match.group(1).strip()
                if q_text:
                    question_lines.append(q_text)
        else:
            question_lines.append(line)
    
    # Extract options (between "Your Answer:" and "Explanation:")
    option_lines = []
    start_idx = your_answer_idx + 1 if your_answer_idx >= 0 else 0
    end_idx = explanation_idx if explanation_idx >= 0 else len(clean_lines)
    
    for i in range(start_idx, end_idx):
        line = clean_lines[i]
        # Skip empty or metadata
        if not line:
            continue
        option_lines.append(line)
    
    # Extract explanation
    explanation_lines = []
    if explanation_idx >= 0:
        for i in range(explanation_idx + 1, len(clean_lines)):
            explanation_lines.append(clean_lines[i])
    
    # Clean up
    question_text = ' '.join(question_lines).strip()
    # Remove leading "Q##" patterns
    question_text = re.sub(r'^Q\d+\s+', '', question_text)
    explanation = ' '.join(explanation_lines).strip()
    
    # Take first 4 non-empty lines as options
    options = []
    for opt in option_lines:
        if len(options) >= 4:
            break
        if opt:
            options.append(opt.strip())
    
    return question_text, options, explanation

def replace_names_with_placeholder(text):
    """Replace person names with {CHARACTER_0} placeholder."""
    # Common names found in questions
    name_pattern = r'\b(Rajesh|Suling|Ming|David|Sarah|John|Mary|Peter|Ali|Siti|Kumar|Wei|Mei)\b'
    
    has_names = bool(re.search(name_pattern, text, re.IGNORECASE))
    if has_names:
        text = re.sub(name_pattern, '{CHARACTER_0}', text, flags=re.IGNORECASE)
    
    return text, has_names

def find_correct_answer(q_content, options, explanation):
    """Try to determine the correct answer from the content and explanation."""
    
    # Try to find which option text appears in the explanation
    # The explanation often contains or references the correct answer
    explanation_lower = explanation.lower()
    
    # Check if any option text appears significantly in the explanation
    best_match_idx = 0
    best_match_score = 0
    
    for idx, opt in enumerate(options):
        if not opt:
            continue
        
        opt_lower = opt.lower().strip('.,!?')
        
        # Direct match in explanation
        if opt_lower in explanation_lower:
            # Longer matches are more significant
            score = len(opt_lower)
            if score > best_match_score:
                best_match_score = score
                best_match_idx = idx
        else:
            # Try matching key words (3+ chars) from the option
            words = [w for w in opt_lower.split() if len(w) > 2]
            if len(words) >= 2:
                # Count how many words match
                matches = sum(1 for w in words if w in explanation_lower)
                score = matches * 10  # Weight word matches
                if score > best_match_score:
                    best_match_score = score
                    best_match_idx = idx
    
    # If we found a good match in the explanation, use it
    if best_match_score > 0:
        return best_match_idx
    
    # Fallback: look for pattern in the raw content near "Your Answer: Correct"
    lines = [l.strip() for l in q_content.split('\n') if l.strip()]
    
    for i, line in enumerate(lines):
        if 'Your Answer:' in line and 'Correct' in line:
            # Check next few lines for option match
            for j in range(i + 1, min(i + 8, len(lines))):
                check_line = lines[j]
                if check_line.startswith('https://') or 'point' in check_line:
                    continue
                
                for idx, opt in enumerate(options):
                    if opt and (check_line == opt or check_line in opt or opt in check_line):
                        return idx
    
    # Last resort: default to first option
    return 0

# Extract from both PDFs
pdf1_path = '/Users/zkaibin/Downloads/2026科学打卡营/P6 打卡营 科学 MCQ W5D5-1.pdf'
pdf2_path = '/Users/zkaibin/Downloads/2026科学打卡营/P6 打卡营 科学 MCQ W5D5-2.pdf'

print("Extracting from PDF 1...")
questions_pdf1 = extract_questions_from_pdf(pdf1_path)
print(f"Found {len(questions_pdf1)} questions")

print("Extracting from PDF 2...")
questions_pdf2 = extract_questions_from_pdf(pdf2_path)
print(f"Found {len(questions_pdf2)} questions")

# Combine all questions
all_raw_questions = questions_pdf1 + questions_pdf2

# Process and format questions
new_questions = []
start_id = 1036

for i, raw_q in enumerate(all_raw_questions):
    q_id = f"SCI{start_id + i}"
    
    question_text, options, explanation = parse_question(raw_q['content'])
    
    # Skip if we couldn't extract proper options
    if len(options) < 4:
        print(f"⚠️  Skipping question {i+1}: Could not extract 4 options")
        continue
    
    # Replace names with placeholder
    question_text, has_names = replace_names_with_placeholder(question_text)
    explanation, _ = replace_names_with_placeholder(explanation)
    
    # Find correct answer (using explanation to match)
    answer_idx = find_correct_answer(raw_q['content'], options, explanation)
    correct_letter = chr(65 + answer_idx)  # A, B, C, D
    
    question_obj = {
        "id": q_id,
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": question_text,
        "diagram": None,
        "placeholder_roles": ["protagonist"] if has_names else None,
        "options": options,
        "answer": answer_idx,
        "correct_answer": correct_letter,
        "explanation": explanation
    }
    
    new_questions.append(question_obj)
    print(f"✓ {q_id}: {question_text[:60]}...")

print(f"\n{'='*60}")
print(f"Processed {len(new_questions)} questions (SCI{start_id}-SCI{start_id + len(new_questions) - 1})")

# Add to existing data
with open('data/questions-science-p6.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

data.extend(new_questions)

with open('data/questions-science-p6.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"✓ Added {len(new_questions)} W5D5 questions to questions-science-p6.json")
print(f"Total questions in database: {len(data)}")
