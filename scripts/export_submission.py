import functools, http.server, os, socketserver, subprocess, sys, threading, time

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
REPO = r"D:\Hackaton-Projects\draft-ph"
if not os.path.isdir(REPO):
    REPO = r"D:\Hackaton-Projects\seal"
DESIGN = os.path.join(REPO, "design")
OUT = r"C:\Users\Dawn\Downloads\SEAL-submission"
ASSETS = os.path.join(OUT, "assets")
PROFILE = r"C:\Users\Dawn\Temp\claude-out\chrome-export-profile"
SCRATCH = os.path.dirname(os.path.abspath(__file__))
PROPOSAL_HTML = os.path.join(SCRATCH, "proposal.html")
PORT = 3211
SITE = "https://seal-ph.vercel.app"

os.makedirs(ASSETS, exist_ok=True)

# --- serve design/ so the architecture artboard renders locally ---
handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=DESIGN)
socketserver.TCPServer.allow_reuse_address = True
httpd = socketserver.TCPServer(("127.0.0.1", PORT), handler)
threading.Thread(target=httpd.serve_forever, daemon=True).start()
time.sleep(1)

SHOTS = [
    ("01_architecture.png",    f"http://127.0.0.1:{PORT}/Architecture.dc.html?x={int(time.time())}", 1440, 1080),
    ("02_overview.png",        f"{SITE}/",                        1440, 900),
    ("03_scout_dashboard.png", f"{SITE}/scout",                   1440, 900),
    ("04_player_card.png",     f"{SITE}/players/phantom-edge",    1440, 1180),
    ("05_officiate.png",       f"{SITE}/officiate",               1440, 900),
    ("06_leaderboard.png",     f"{SITE}/leaderboard",             1440, 900),
]


def chrome(args, timeout=240):
    return subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars",
                           f"--user-data-dir={PROFILE}", "--no-first-run", "--no-default-browser-check"] + args,
                          capture_output=True, timeout=timeout)


failed = []
for name, url, w, h in SHOTS:
    path = os.path.join(ASSETS, name)
    if os.path.exists(path):
        os.remove(path)
    chrome([f"--force-device-scale-factor=2", f"--window-size={w},{h}",
            "--virtual-time-budget=14000", f"--screenshot={path}", url])
    size = os.path.getsize(path) if os.path.exists(path) else 0
    ok = size > 20000
    if not ok:
        failed.append(name)
    print(f"{'OK  ' if ok else 'FAIL'} {name:26} {size:>9,} bytes  {url}")

httpd.shutdown()

# --- print the concept proposal to PDF ---
proposal_pdf = os.path.join(SCRATCH, "proposal.pdf")
if os.path.exists(proposal_pdf):
    os.remove(proposal_pdf)
chrome(["--no-pdf-header-footer", "--virtual-time-budget=20000",
        f"--print-to-pdf={proposal_pdf}", "file:///" + PROPOSAL_HTML.replace("\\", "/")])
print(f"\nproposal.pdf: {os.path.getsize(proposal_pdf):,} bytes" if os.path.exists(proposal_pdf) else "\nproposal.pdf FAILED")

# --- screenshots -> PDF pages, then merge behind the proposal ---
from PIL import Image
from pypdf import PdfWriter, PdfReader

shots_pdf = os.path.join(SCRATCH, "shots.pdf")
pages = []
for name, _, _, _ in SHOTS:
    p = os.path.join(ASSETS, name)
    if os.path.exists(p):
        pages.append(Image.open(p).convert("RGB"))
if not pages:
    print("No screenshots rendered; aborting.")
    sys.exit(1)
pages[0].save(shots_pdf, "PDF", resolution=144, save_all=True, append_images=pages[1:])

final = os.path.join(OUT, "SEAL_The-Next-Gen-2026_Concept-Proposal.pdf")
writer = PdfWriter()
for src in (proposal_pdf, shots_pdf):
    for page in PdfReader(src).pages:
        writer.add_page(page)
writer.add_metadata({
    "/Title": "SEAL, Student Esports Athlete League. Concept Proposal",
    "/Author": "Team Hackatots",
    "/Subject": "The Next Gen 2026 concept proposal",
})
if os.path.exists(final):
    os.remove(final)
with open(final, "wb") as fh:
    writer.write(fh)

print(f"\nFINAL: {final}")
print(f"       {os.path.getsize(final):,} bytes, {len(PdfReader(final).pages)} pages")
if failed:
    print("\nFAILED SHOTS:", failed)
    sys.exit(1)
