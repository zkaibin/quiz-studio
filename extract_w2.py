import pypdf, os, glob

base = "/Users/zkaibin/Downloads/2026科学打卡营"
files = sorted(glob.glob(os.path.join(base, "*W2*.pdf")))
for f in files:
    print(f"\n{'='*60}")
    print(f"FILE: {os.path.basename(f)}")
    print('='*60)
    r = pypdf.PdfReader(f)
    for i, p in enumerate(r.pages):
        t = p.extract_text()
        if t:
            print(t)
