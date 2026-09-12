"""Render proposal.html to PDF and interleave captioned A4 image pages into the four sections."""
import os, subprocess, sys
import fitz
from PIL import Image
from pypdf import PdfWriter, PdfReader

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = r"C:\Users\Dawn\Downloads\SEAL-submission"
A = os.path.join(OUT, "assets")
PROF = os.path.join(HERE, "chrome-prof2")

# ---- 1. the seven document pages ----
doc_pdf = os.path.join(HERE, "proposal.pdf")
if os.path.exists(doc_pdf):
    os.remove(doc_pdf)
r = subprocess.run([CHROME, "--headless=new", "--disable-gpu", f"--user-data-dir={PROF}",
                    "--no-first-run", "--no-default-browser-check", "--no-pdf-header-footer",
                    "--virtual-time-budget=20000", f"--print-to-pdf={doc_pdf}",
                    "file:///" + os.path.join(HERE, "proposal.html").replace("\\", "/")],
                   capture_output=True, text=True, timeout=300)
if not os.path.exists(doc_pdf):
    print("chrome failed:", r.stderr[-500:])
    sys.exit(1)
print("document pages:", len(PdfReader(doc_pdf).pages))

# ---- 2. each screenshot on its own A4 landscape page, captioned ----
A4_W, A4_H = 841.89, 595.28          # A4 landscape, points
MARGIN, CAP_H = 26, 30
ORANGE = (1.0, 0.42, 0.208)
MUTED = (0.42, 0.45, 0.5)

FIGURES = [
    ("01_architecture.png",    "Figure 1", "Solution architecture: how frontend, backend, and database communicate"),
    ("03_scout_dashboard.png", "Figure 2", "Scout Dashboard, the core feature. Filters, chemistry ranking, compare tray, roster simulation"),
    ("04_player_card.png",     "Figure 3", "Player Card: verified identity, overall rating, stat bars, career stats, contact handoff"),
    ("05_officiate.png",       "Figure 4", "Incident Ruling Workspace: live queue, evidence timeline, applicable rule, audited outcome"),
    ("06_leaderboard.png",     "Figure 5", "Leaderboard: public standings by school, game, and role"),
    ("02_overview.png",        "Figure 6", "Overview: the four surfaces in one operating view"),
]

figs_pdf = os.path.join(HERE, "figures.pdf")
fdoc = fitz.open()
for fname, label, caption in FIGURES:
    # embed a JPEG: a full-resolution PNG here inflates the PDF by roughly 50x
    src = os.path.join(HERE, "_fig_" + fname.replace(".png", ".jpg"))
    with Image.open(os.path.join(A, fname)) as raw:
        img = raw.convert("RGB")
        if img.width > 1800:
            img = img.resize((1800, round(img.height * 1800 / img.width)), Image.LANCZOS)
        img.save(src, "JPEG", quality=92, optimize=True, subsampling=0)
    with Image.open(src) as im:
        iw, ih = im.size
    avail_w = A4_W - 2 * MARGIN
    avail_h = A4_H - 2 * MARGIN - CAP_H
    scale = min(avail_w / iw, avail_h / ih)
    w, h = iw * scale, ih * scale
    x = (A4_W - w) / 2
    y = MARGIN + (avail_h - h) / 2

    page = fdoc.new_page(width=A4_W, height=A4_H)
    page.insert_image(fitz.Rect(x, y, x + w, y + h), filename=src)
    page.draw_rect(fitz.Rect(x, y, x + w, y + h), color=(0.87, 0.89, 0.93), width=0.6)

    base = A4_H - MARGIN - 8
    page.draw_line(fitz.Point(MARGIN, base - 13), fitz.Point(MARGIN + 22, base - 13), color=ORANGE, width=2)
    page.insert_text(fitz.Point(MARGIN + 30, base - 9), label,
                     fontname="hebo", fontsize=8.5, color=ORANGE)
    page.insert_text(fitz.Point(MARGIN + 30 + 4.9 * len(label) + 8, base - 9), caption,
                     fontname="helv", fontsize=8.5, color=MUTED)
    page.insert_text(fitz.Point(A4_W - MARGIN - 172, base - 9),
                     "SEAL  ·  Team Hackatots  ·  The Next Gen 2026",
                     fontname="helv", fontsize=8.5, color=MUTED)
fdoc.save(figs_pdf)
fdoc.close()

# ---- 3. interleave: sections 1 and 2, section 3 with the diagram, section 4 with the screens ----
doc = PdfReader(doc_pdf).pages      # 0 cover, 1 sec1, 2 sec2, 3 sec3a, 4 stack, 5 assets, 6 sec4
fig = PdfReader(figs_pdf).pages     # 0 arch, 1 scout, 2 player, 3 officiate, 4 leaderboard, 5 overview
order = [doc[0], doc[1], doc[2], doc[3], fig[0], doc[4], doc[5], doc[6],
         fig[1], fig[2], fig[3], fig[4], fig[5]]

final = os.path.join(OUT, "SEAL_The-Next-Gen-2026_Concept-Proposal.pdf")
w = PdfWriter()
for page in order:
    w.add_page(page)
w.add_metadata({"/Title": "SEAL, Student Esports Athlete League. Concept Proposal",
                "/Author": "Team Hackatots",
                "/Subject": "The Next Gen 2026 concept proposal"})
if os.path.exists(final):
    os.remove(final)
with open(final, "wb") as fh:
    w.write(fh)

size = os.path.getsize(final)
print(f"FINAL: {final}")
print(f"       {size:,} bytes ({size/1048576:.2f} MB of the 10 MB cap), {len(PdfReader(final).pages)} pages")
