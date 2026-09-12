import os
from pypdf import PdfWriter, PdfReader
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = r"C:\Users\Dawn\Downloads\SEAL-submission"
A = os.path.join(OUT, "assets")
names = ["01_architecture.png", "02_overview.png", "03_scout_dashboard.png",
         "04_player_card.png", "05_officiate.png", "06_leaderboard.png"]
imgs = [Image.open(os.path.join(A, n)).convert("RGB") for n in names]
shots = os.path.join(HERE, "shots.pdf")
imgs[0].save(shots, "PDF", resolution=144, save_all=True, append_images=imgs[1:])

final = os.path.join(OUT, "SEAL_The-Next-Gen-2026_Concept-Proposal.pdf")
w = PdfWriter()
for src in (os.path.join(HERE, "proposal.pdf"), shots):
    for p in PdfReader(src).pages:
        w.add_page(p)
w.add_metadata({"/Title": "SEAL, Student Esports Athlete League. Concept Proposal",
                "/Author": "Team Hackatots",
                "/Subject": "The Next Gen 2026 concept proposal"})
with open(final, "wb") as fh:
    w.write(fh)
print(final, f"{os.path.getsize(final):,} bytes", len(PdfReader(final).pages), "pages")
