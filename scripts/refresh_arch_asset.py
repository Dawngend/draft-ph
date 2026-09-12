"""Re-render the architecture artboard into the submission assets folder at 2x."""
import functools, http.server, os, socketserver, subprocess, threading, time

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
REPO = r"D:\Hackaton-Projects\draft-ph"
if not os.path.isdir(REPO):
    REPO = r"D:\Hackaton-Projects\seal"
DESIGN = os.path.join(REPO, "design")
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = r"C:\Users\Dawn\Downloads\SEAL-submission\assets\01_architecture.png"
PORT = 3219

handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=DESIGN)
socketserver.TCPServer.allow_reuse_address = True
httpd = socketserver.TCPServer(("127.0.0.1", PORT), handler)
threading.Thread(target=httpd.serve_forever, daemon=True).start()
time.sleep(0.6)

if os.path.exists(OUT):
    os.remove(OUT)
subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars",
                f"--user-data-dir={os.path.join(HERE, 'chrome-prof2')}", "--no-first-run",
                "--force-device-scale-factor=2", "--window-size=1440,1080",
                "--virtual-time-budget=14000", f"--screenshot={OUT}",
                f"http://127.0.0.1:{PORT}/Architecture.dc.html?x={int(time.time())}"],
               capture_output=True, timeout=240)
httpd.shutdown()
ok = os.path.exists(OUT)
print("OK " if ok else "FAIL", OUT, f"{os.path.getsize(OUT):,}" if ok else 0)
