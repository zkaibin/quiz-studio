import pdfplumber
import re
import json

def clean_text(text):
    """Remove extra whitespace and clean text"""
    text = re.sub(r'\d+\s*/\s*\d+\s*point[s]?', '', text)
    return ' '.join(text.split())

def extract_all_questions(pdf_path):
    """Extract all questions from a PDF"""
    questions_data = []
    
    with pdfplumber.open(pdf_path) as pdf:
        # Combine all text
        full_text = ""
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                full_text += "\n" + text
        
        # Find all questions by looking for pattern: newline + number + period + space
        # Split while keeping the question numbers
        parts = re.split(r'\n(\d+)\.\s+', full_text)
        
        # parts[0] is header, then alternating: [q_num, q_content, q_num, q_content, ...]
        for i in range(1, len(parts), 2):
            if i + 1 >= len(parts):
                break
            
            q_num = parts[i]
            q_content = parts[i + 1]
            
            # Skip empty or too short content
            if len(q_content) < 50:
                continue
            
            # Split at "Your Answer:" to separate question from answer
            answer_split = q_content.split('Your Answer:', 1)
            if len(answer_split) < 2:
                continue
            
            question_section = answer_split[0]
            answer_section = answer_split[1]
            
            # Extract options - look for (1), (2), (3), (4) or A., B., C., D.
            # Try numbered format first
            option_pattern = r'\((\d)\)\s+([^\n]+)'
            options_found = list(re.finditer(option_pattern, question_section))
            
            if len(options_found) != 4:
                # Try letter format
                option_pattern = r'\n([A-D])[\.\)]\s+([^\n]+)'
                options_found = list(re.finditer(option_pattern, question_section))
            
            if len(options_found) != 4:
                print(f"Warning: Question {q_num} - Found {len(options_found)} options, skipping")
                continue
            
            # Extract option texts
            options = [clean_text(m.group(2)) for m in options_found]
            
            # Get question text (everything before first option)
            first_option_pos = options_found[0].start()
            question_text = clean_text(question_section[:first_option_pos])
            
            # Extract explanation
            explanation = ""
            expl_match = re.search(r'Explanation:\s*(.*?)(?=\nhttps://|\n\d+\.|$)', answer_section, re.DOTALL)
            if expl_match:
                explanation = clean_text(expl_match.group(1))
            
            # For now, store answer as 0 (to be manually verified)
            # We'll need to manually check each one against the explanation
            questions_data.append({
                'num': q_num,
                'question': question_text,
                'options': options,
                'explanation': explanation,
                'answer_section': clean_text(answer_section[:200])  # For manual review
            })
    
    return questions_data

# Extract from both PDFs
pdf1 = "/Users/zkaibin/Downloads/2026科学打卡营/P6 打卡营 科学 MCQ W5D3-1.pdf"
pdf2 = "/Users/zkaibin/Downloads/2026科学打卡营/P6 打卡营 科学 MCQ W5D3-2.pdf"

print("Extracting from W5D3-1...")
q1 = extract_all_questions(pdf1)
print(f"Found {len(q1)} questions")

print("\nExtracting from W5D3-2...")
q2 = extract_all_questions(pdf2)
print(f"Found {len(q2)} questions")

# Save for manual review
all_q = {'pdf1': q1, 'pdf2': q2}
with open('w5d3_raw_extraction.json', 'w', encoding='utf-8') as f:
    json.dump(all_q, f, indent=2, ensure_ascii=False)

print(f"\nTotal: {len(q1) + len(q2)} questions")
print("Saved to w5d3_raw_extraction.json for manual answer verification")

# Show sample
if q1:
    print("\n" + "="*80)
    print("SAMPLE - Question 1:")
    print("="*80)
    print(f"Q: {q1[0]['question'][:100]}...")
    print(f"Options: {q1[0]['options']}")
    print(f"Explanation: {q1[0]['explanation'][:100]}...")
