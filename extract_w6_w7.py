#!/usr/bin/env python3
"""
Extract and append remaining W6 (SCI1106-1122) and all W7 (SCI1123-1212) P6 science questions.

Usage:
  .venv/bin/python extract_w6_w7.py --apply
"""
from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

import pdfplumber

PDF_BASE = Path("/Users/zkaibin/Downloads/2026科学打卡营/")
DATA_FILE = Path("data/questions-science-p6.json")
REVIEW_FILE = Path("w6_w7_extracted.json")

W6_TAIL_START = 1106  # after SCI1105
W6_END = 1122
W7_START = 1123

PERSON_NAMES = [
    "John", "Mary", "Sarah", "Tom", "David", "Emily", "Michael", "Lisa",
    "James", "Jessica", "Robert", "Jennifer", "William", "Linda",
    "Henry", "Joe", "Sam", "Bala", "Meimei", "Gregory", "Ahmad", "Tanya",
    "Peter", "Anna", "Ben", "Amy", "Kate", "Paul", "Grace", "Daniel",
    "Helen", "Kevin", "Rachel", "Simon", "Lucy", "Ryan", "Emma", "Jack",
    "Jane", "Devi", "Ethan", "Kumar", "Chandra", "Mariam", "Alice", "Hassan",
    "Chin", "Keong", "Janet", "Kandis", "Jamie", "Ramsy", "Asman", "Zhiwei",
]

SKIP_PATTERNS = [
    "http", "testmoz", "Zhang Shuhan", "Your score:", "Duration:",
    "P6 打卡营", "Could not get", "student/review",
]

W6_TAIL_PDFS = [
    ("W6D5", [1, 2], 17),
]

W7_PDFS = [
    ("W7D1", [1], 13),
    ("W7D2", [1], 12),
    ("W7D3", [1], 12),
    ("W7D4", [1, 2], 26),
    ("W7D5", [1, 2], 27),
]


def clean_text(text: str) -> str:
    text = re.sub(r"\d+\s*/\s*\d+\s*points?", "", text, flags=re.I)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def should_skip_line(line: str) -> bool:
    if not line.strip():
        return True
    if any(p in line for p in SKIP_PATTERNS):
        return True
    if re.search(r"\b(\d{1,2}/\d{1,2}/\d{2,4}|\d{1,2}:\d{2}\s*[AP]M)\b", line):
        return True
    return False


def replace_person_names(text: str) -> tuple[str, list[str] | None]:
    roles: list[str] = []
    for name in PERSON_NAMES:
        pattern = r"\b" + re.escape(name) + r"(?:'s)?\b"
        if re.search(pattern, text):
            text = re.sub(pattern, "{CHARACTER_0}", text)
            if "protagonist" not in roles:
                roles.append("protagonist")
    return text, roles or None


def parse_numbered_options(question_part: str) -> list[str]:
    matches = list(re.finditer(r"\((\d)\)\s+(.+?)(?=\(\d\)\s+|Your Answer|$)", question_part, re.S))
    if len(matches) >= 4:
        return [clean_text(m.group(2)) for m in matches[:4]]
    return []


def infer_answer_index(options: list[str], explanation: str, is_correct: bool, user_pick: str | None) -> int:
    expl = explanation.lower()
    user_pick_norm = (user_pick or "").strip().lower()

    for idx, opt in enumerate(options):
        opt_lower = opt.lower().strip()
        if len(opt_lower) == 1 and opt_lower in "abcd":
            if re.search(rf"\bbulb\s+{opt_lower}\b", expl) or re.search(rf"\boption\s+{opt_lower}\b", expl):
                return idx
        num = re.match(r"^\((\d)\)$", opt_lower)
        if num and (f"({num.group(1)})" in explanation or f"option ({num.group(1)})" in expl):
            return idx
        if len(opt_lower) > 8 and opt_lower in expl:
            return idx

    scores = [0] * len(options)
    for idx, opt in enumerate(options):
        for w in re.findall(r"[a-z]{4,}", opt.lower()):
            if w in expl:
                scores[idx] += 1
    best = max(range(len(scores)), key=lambda i: scores[i])
    if scores[best] > 0:
        return best

    if not is_correct and user_pick_norm:
        for idx, opt in enumerate(options):
            if opt.lower().strip() != user_pick_norm:
                return idx
    return 0 if is_correct else min(1, len(options) - 1)


def extract_question_from_block(block: str, q_num: int) -> dict | None:
    if q_num < 1 or q_num > 15:
        return None

    block = re.sub(r"\d+\s*/\s*\d+\s*points?", "", block, flags=re.I)
    answer_match = re.search(r"Your Answer:\s*(Correct|Incorrect)", block)
    explanation_match = re.search(r"Explanation:", block)
    if not answer_match or not explanation_match:
        return None

    is_correct = answer_match.group(1) == "Correct"
    question_part = block[: answer_match.start()]
    options_part = block[answer_match.end() : explanation_match.start()]
    explanation_part = block[explanation_match.end() :]

    question_lines = [ln.strip() for ln in question_part.split("\n") if not should_skip_line(ln.strip())]
    question_text = clean_text(" ".join(question_lines))
    if len(question_text) < 25:
        return None

    numbered_in_question = parse_numbered_options(question_part)
    option_lines = [clean_text(ln) for ln in options_part.split("\n") if not should_skip_line(ln.strip())]
    user_pick = option_lines[0] if option_lines and not is_correct else None

    options: list[str] = []
    if len(option_lines) >= 4 and sum(1 for o in option_lines[:4] if len(o) > 3) >= 3:
        options = option_lines[:4]
    elif numbered_in_question:
        options = [f"({i + 1}) {numbered_in_question[i]}" for i in range(4)]
    elif len(option_lines) >= 4:
        options = option_lines[:4]
    elif len(option_lines) >= 2:
        options = option_lines[:4]
        while len(options) < 4:
            options.append(f"Option {len(options) + 1}")

    if len(options) < 4:
        return None

    exp_lines = [ln.strip() for ln in explanation_part.split("\n") if not should_skip_line(ln.strip())]
    explanation = clean_text(" ".join(exp_lines))
    if len(explanation) < 15:
        return None

    question_text, placeholder_roles = replace_person_names(question_text)
    answer_index = infer_answer_index(options[:4], explanation, is_correct, user_pick)

    return {
        "category": "P6 Practice",
        "difficulty": "PSLE",
        "template": question_text,
        "diagram": None,
        "placeholder_roles": placeholder_roles,
        "options": options[:4],
        "answer": answer_index,
        "correct_answer": options[:4][answer_index],
        "explanation": explanation,
    }


def extract_questions_from_pdf(pdf_path: Path) -> list[dict]:
    questions = []
    try:
        with pdfplumber.open(str(pdf_path)) as pdf:
            full_text = "\n".join(page.extract_text() or "" for page in pdf.pages)
        parts = re.split(r"(?:^|\n)(\d{1,2})\.\s+", full_text)
        for i in range(1, len(parts), 2):
            if i + 1 >= len(parts):
                break
            q_num = int(parts[i])
            q = extract_question_from_block(parts[i + 1], q_num)
            if q:
                questions.append(q)
    except Exception as exc:
        print(f"  Error: {pdf_path.name}: {exc}")
    return questions


def extract_day(day_code: str, parts: list[int], max_questions: int | None = None) -> list[dict]:
    out = []
    for part in parts:
        pdf = PDF_BASE / f"P6 打卡营 科学 MCQ {day_code}-{part}.pdf"
        if not pdf.exists():
            print(f"  Missing {pdf.name}")
            continue
        qs = extract_questions_from_pdf(pdf)
        print(f"  {pdf.name}: {len(qs)}")
        out.extend(qs)
    if max_questions is not None:
        out = out[:max_questions]
    return out


def assign_ids(questions: list[dict], start_id: int) -> list[dict]:
    out = []
    for i, q in enumerate(questions):
        item = dict(q)
        item["id"] = f"SCI{start_id + i}"
        out.append(item)
    return out


def normalize_template(t: str) -> str:
    return re.sub(r"\s+", " ", t.lower())[:80]


def dedupe_against_existing(questions: list[dict], existing: list[dict]) -> list[dict]:
    seen = {normalize_template(q["template"]) for q in existing}
    out = []
    for q in questions:
        key = normalize_template(q["template"])
        if key in seen:
            continue
        seen.add(key)
        out.append(q)
    return out


def apply_questions(w6_questions: list[dict], w7_questions: list[dict]) -> None:
    with DATA_FILE.open(encoding="utf-8") as f:
        data = json.load(f)

    # Keep everything before W6 tail, then replace tail + W7
    data = [q for q in data if int(q["id"][3:]) < W6_TAIL_START]
    data.extend(w6_questions)
    data.extend(w7_questions)

    with DATA_FILE.open("w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"W6 tail: {len(w6_questions)}, W7: {len(w7_questions)}, total: {len(data)}")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--apply", action="store_true")
    args = parser.parse_args()

    with DATA_FILE.open(encoding="utf-8") as f:
        all_existing = json.load(f)
    existing = [q for q in all_existing if int(q["id"][3:]) < W6_TAIL_START]

    # W6 tail: W6D5 only
    w6_raw: list[dict] = []
    print("Extracting W6D5 (tail)...")
    for day_code, parts, cap in W6_TAIL_PDFS:
        w6_raw.extend(extract_day(day_code, parts, cap))
    w6_raw = dedupe_against_existing(w6_raw, existing)
    w6_questions = assign_ids(w6_raw, W6_TAIL_START)
    print(f"W6 tail: {len(w6_questions)} questions -> SCI{W6_TAIL_START}-SCI{W6_TAIL_START + len(w6_questions) - 1}")

    # W7
    w7_raw: list[dict] = []
    print("\nExtracting W7...")
    for day_code, parts, cap in W7_PDFS:
        print(day_code)
        w7_raw.extend(extract_day(day_code, parts, cap))
    w7_raw = dedupe_against_existing(w7_raw, existing + w6_questions)
    w7_questions = assign_ids(w7_raw, W7_START)
    print(f"W7: {len(w7_questions)} questions -> SCI{W7_START}-SCI{W7_START + len(w7_questions) - 1}")

    payload = {"w6_tail": w6_questions, "w7": w7_questions}
    REVIEW_FILE.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"\nSaved {REVIEW_FILE}")

    if args.apply:
        apply_questions(w6_questions, w7_questions)


if __name__ == "__main__":
    main()
