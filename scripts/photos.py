"""
Prepare gallery photos.

    pip install pillow
    python3 scripts/photos.py ~/Desktop/new-shots/*.jpg

For each input: applies EXIF rotation, strips all metadata (including GPS),
writes public/photos/<name>.jpg (1800px long edge, q80) and
public/photos/thumb/<name>.jpg (900px, q78). Then add an entry to src/data/photos.ts.
"""
import sys
from pathlib import Path
from PIL import Image, ImageOps

root = Path(__file__).resolve().parent.parent / "public" / "photos"
(root / "thumb").mkdir(parents=True, exist_ok=True)

for arg in sys.argv[1:]:
    src = Path(arg)
    im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    name = src.stem + ".jpg"
    full = im.copy(); full.thumbnail((1800, 1800))
    full.save(root / name, quality=80, optimize=True, progressive=True)
    thumb = im.copy(); thumb.thumbnail((900, 900))
    thumb.save(root / "thumb" / name, quality=78, optimize=True, progressive=True)
    print(f"{name}: {full.size[0]}x{full.size[1]}  ->  add {{ file: '{name}', caption: '...' }} to src/data/photos.ts")
