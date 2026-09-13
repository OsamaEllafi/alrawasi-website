"""Collect image links from supplied captures and their live pages; preserve originals.

Requires Python 3 and Pillow. curl is used with normal HTTPS verification.
Run from any directory: python scripts/download_company_images.py
"""
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from hashlib import sha256
from html import unescape
from io import BytesIO
from pathlib import Path
from urllib.parse import urljoin, urlsplit, unquote
import json
import re
import socket
import subprocess
import tempfile
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'alrawasi company overview'
OUT = ROOT / 'assets/images'
OUT.mkdir(parents=True, exist_ok=True)
CACHE = Path(tempfile.gettempdir()) / 'alrawasi-source-review'
CACHE.mkdir(exist_ok=True)
BASE = 'https://alrwasi.ly'
# The apex DNS endpoint fails TLS locally. The www record points to the same
# Netlify site; resolve the apex to that endpoint, retaining hostname and TLS checks.
EDGE_IP = socket.gethostbyname('www.alrwasi.ly')
records = {}
page_errors = []

def fetch(url):
    with tempfile.TemporaryDirectory() as folder:
        target = Path(folder) / 'response'
        result = subprocess.run([
            'curl.exe', '--silent', '--show-error', '--fail', '--location',
            '--retry', '2', '--connect-timeout', '15', '--max-time', '90',
            '--resolve', f'alrwasi.ly:443:{EDGE_IP}',
            '--output', str(target), '--write-out', '%{http_code}\n%{content_type}\n%{url_effective}', url,
        ], capture_output=True, text=True)
        if result.returncode:
            raise RuntimeError(result.stderr.strip())
        info = result.stdout.splitlines()
        return target.read_bytes(), info

def add(url, source, alt=''):
    url = urljoin(BASE, unescape(url).replace('\\/', '/'))
    parts = urlsplit(url)
    if parts.scheme not in ('http', 'https'):
        return
    if not re.search(r'\.(?:png|jpe?g|webp|gif|svg|avif|ico)$', parts.path, re.I):
        return
    entry = records.setdefault(url, {'url': url, 'sources': [], 'alt_texts': []})
    if source not in entry['sources']:
        entry['sources'].append(source)
    if alt and alt not in entry['alt_texts']:
        entry['alt_texts'].append(alt)

pages = []
for file in sorted(SOURCE.glob('*.md')):
    content = file.read_text(encoding='utf-8-sig')
    source = file.relative_to(ROOT).as_posix()
    pages.append(re.search(r'^url:\s*"([^"]+)"', content, re.M).group(1))
    for alt, url in re.findall(r'!\[([^\]]*)\]\(([^\s)]+)\)', content):
        add(url, source, alt)
    for url in re.findall(r'https?://[^\s)<>"\\]+', content):
        add(url, source)
capture_count = len(records)

def get_page(url):
    try:
        data, _ = fetch(url)
        content = data.decode('utf-8')
        name = urlsplit(url).path.strip('/').replace('/', '-') or 'home'
        (CACHE / (name + '.html')).write_text(content, encoding='utf-8')
        return url, content, None
    except Exception as error:
        return url, '', str(error)

styles = set()
scripts = set()
with ThreadPoolExecutor(max_workers=6) as pool:
    for url, content, error in pool.map(get_page, pages):
        if error:
            page_errors.append({'url': url, 'error': error})
            continue
        for ref in re.findall(r'(?:https?://[^\s"<>\\]+)?/images/[^\s"<>\\)]+', content):
            add(ref, url)
        for tag in re.findall(r'<img\b[^>]+>', content):
            src = re.search(r'\bsrc="([^"]+)"', tag)
            alt = re.search(r'\balt="([^"]*)"', tag)
            if src:
                add(src.group(1), url, unescape(alt.group(1)) if alt else '')
        styles.update(urljoin(url, x) for x in re.findall(r'href="([^"]+\.css)"', content))
        scripts.update(urljoin(url, x) for x in re.findall(r'<script[^>]+src="([^"]+)"', content) if '/app/' in x)

for url in sorted(styles | scripts):
    try:
        data, _ = fetch(url)
        content = data.decode('utf-8')
        (CACHE / Path(urlsplit(url).path).name).write_text(content, encoding='utf-8')
        for ref in re.findall(r'(?:https?://[^\s"<>\\]+)?/images/[^\s"<>\\)\x27]+', content):
            add(ref, url)
        if url.endswith('.css'):
            for ref in re.findall(r'url\([\x27"]?([^\x27")]+)', content):
                add(urljoin(url, ref), url)
    except Exception as error:
        page_errors.append({'url': url, 'error': str(error)})

def download(entry):
    try:
        url = entry['url']
        parts = urlsplit(url)
        path = unquote(parts.path).removeprefix('/images/').lstrip('/')
        if parts.hostname != 'alrwasi.ly':
            path = parts.hostname + '/' + path
        if parts.query:
            p = Path(path)
            path = str(p.with_stem(p.stem + '-' + sha256(url.encode()).hexdigest()[:8]))
        destination = (OUT / path).resolve()
        if not destination.is_relative_to(OUT.resolve()):
            raise ValueError('Path outside image directory')
        data, info = fetch(url)
        if not info[1].startswith('image/'):
            raise ValueError(f'Unexpected content type: {info[1]}')
        if destination.suffix.lower() == '.svg':
            import xml.etree.ElementTree as ET
            if not ET.fromstring(data).tag.endswith('svg'):
                raise ValueError('Not an SVG')
            dimensions = None
            fmt = 'SVG'
        else:
            with Image.open(BytesIO(data)) as image:
                dimensions = list(image.size)
                fmt = image.format
                image.verify()
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_bytes(data)
        entry.update(status='downloaded', local_path=destination.relative_to(ROOT).as_posix(),
                     bytes=len(data), dimensions=dimensions, format=fmt, content_type=info[1],
                     sha256=sha256(data).hexdigest(), final_url=info[2])
    except Exception as error:
        entry.update(status='failed', error=str(error))
    print(f"{entry['status']}: {entry['url']}", flush=True)
    return entry

print(f'Found {capture_count} unique images in captures; {len(records)} with live-page assets.', flush=True)
with ThreadPoolExecutor(max_workers=6) as pool:
    completed = list(pool.map(download, [records[url] for url in sorted(records)]))
manifest = {'retrieved_at': datetime.now(timezone.utc).isoformat(),
            'scope': 'All supplied Markdown image links plus images in their live pages, CSS, and page/layout JavaScript.',
            'capture_image_count': capture_count, 'total_unique_urls': len(completed),
            'downloaded': sum(x['status'] == 'downloaded' for x in completed),
            'failed': sum(x['status'] == 'failed' for x in completed),
            'page_errors': page_errors, 'assets': completed}
(OUT / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps({k: v for k, v in manifest.items() if k != 'assets'}, indent=2), flush=True)
print(f'HTML/CSS review cache: {CACHE}', flush=True)
if manifest['failed'] or page_errors:
    raise SystemExit(1)
