"""Copy verified source images to public without changing archived originals."""
from pathlib import Path
import json, shutil, subprocess
ROOT = Path(__file__).resolve().parents[1]
manifest = json.loads((ROOT / 'assets/images/manifest.json').read_text(encoding='utf-8'))
for item in manifest['assets']:
    if item['status'] != 'downloaded': continue
    source = ROOT / item['local_path']
    relative = source.relative_to(ROOT / 'assets/images')
    # Certificate and mismatched partner imagery are archived, not promoted.
    if relative.parts[0] in ('certificates', 'partners'): continue
    destination = ROOT / 'public/images' / relative
    destination.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(source, destination)
    subprocess.run(['node', str(Path.home()/'.codex/skills/impeccable/scripts/embed-prompt.mjs'), str(destination), '--prompt', 'Original company website asset. Source: '+item['url']+'. Downloaded 2026-09-10. Source record and original checksum: assets/images/manifest.json.'], check=True, capture_output=True)
print('Copied and recorded provenance for all public source imagery.')
