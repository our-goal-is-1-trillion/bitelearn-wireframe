import sys
import subprocess

def install_and_read():
    try:
        import pypdf
    except ImportError:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "pypdf"])
        import pypdf

    reader = pypdf.PdfReader(r"e:\팀플3\bitelearn-wireframe\docs\Bitelearn_중간발표.pdf")
    texts = []
    for i, page in enumerate(reader.pages):
        text = page.extract_text()
        texts.append(f"--- PAGE {i+1} ---\n{text}")
    print("\n\n".join(texts))

install_and_read()
