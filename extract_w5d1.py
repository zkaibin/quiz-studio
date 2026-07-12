import pdfplumber
import re

pdf_files = [
    "/Users/zkaibin/Downloads/2026科学打卡营/P6 打卡营 科学 MCQ W5D1-1.pdf",
    "/Users/zkaibin/Downloads/2026科学打卡营/P6 打卡营 科学 MCQ W5D1-2.pdf"
]

all_text = ""
for pdf_file in pdf_files:
    print(f"\n{'='*60}")
    print(f"Extracting from: {pdf_file}")
    print(f"{'='*60}")
    try:
        with pdfplumber.open(pdf_file) as pdf:
            for i, page in enumerate(pdf.pages):
                text = page.extract_text()
                if text:
                    print(f"\n--- Page {i+1} ---")
                    print(text)
                    all_text += f"\n\n--- PDF: {pdf_file} | Page {i+1} ---\n"
                    all_text += text
    except Exception as e:
        print(f"Error reading {pdf_file}: {e}")

print(f"\n\n{'='*60}")
print("EXTRACTION COMPLETE")
print(f"{'='*60}")
