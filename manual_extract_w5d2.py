import pdfplumber
import re

def extract_all_text(pdf_path):
    """Extract all text from PDF"""
    all_text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                all_text += text + "\n\n" + "="*80 + "\n\n"
    return all_text

# Extract from both PDFs
pdf1_path = '/Users/zkaibin/Downloads/2026科学打卡营/P6 打卡营 科学 MCQ W5D2-1.pdf'
pdf2_path = '/Users/zkaibin/Downloads/2026科学打卡营/P6 打卡营 科学 MCQ W5D2-2.pdf'

print("=== PDF 1 ===\n")
text1 = extract_all_text(pdf1_path)
print(text1[:5000])

print("\n\n=== PDF 2 (first part) ===\n")
text2 = extract_all_text(pdf2_path)
print(text2[:5000])

# Save to file for manual review
with open('w5d2_extracted.txt', 'w', encoding='utf-8') as f:
    f.write("=== PDF 1: W5D2-1 ===\n\n")
    f.write(text1)
    f.write("\n\n=== PDF 2: W5D2-2 ===\n\n")
    f.write(text2)

print("\n\nSaved all extracted text to w5d2_extracted.txt")
