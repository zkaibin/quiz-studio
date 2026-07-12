#!/bin/bash
# Add remaining W6 + all W7 P6 science questions from PDFs
set -e
cd "$(dirname "$0")"

if [ ! -d .venv ]; then
  python3 -m venv .venv
  .venv/bin/pip install -q pdfplumber
fi

python3 add_w6_remainder.py
.venv/bin/python extract_w6_w7.py --apply

python3 -c "
import json, re
with open('data/questions-science-p6.json') as f:
    q = json.load(f)
w6 = sum(1 for x in q if 1001 <= int(x['id'][3:]) <= 1122)
w7 = sum(1 for x in q if int(x['id'][3:]) >= 1123)
print(f'Total P6 practice: {len(q)} | W6: {w6} | W7: {w7}')
"
