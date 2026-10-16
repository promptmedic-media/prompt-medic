#!/usr/bin/env python3
"""Generates assets/og.png (1200x630) with Pillow. Run: python3 scripts/make-og.py"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os
W, H = 1200, 630
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def font(size, bold=True, mono=False):
    cands = (['/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf', '/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'] if mono else
             ['/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf' if bold else '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'])
    for c in cands:
        if os.path.exists(c): return ImageFont.truetype(c, size)
    return ImageFont.load_default()
img = Image.new('RGB', (W, H), '#0b0d12')
glow = Image.new('RGB', (W, H), '#0b0d12'); g = ImageDraw.Draw(glow)
g.ellipse((700, -300, 1500, 400), fill='#2a3180'); g.ellipse((-300, 250, 400, 800), fill='#0b5c47')
img = Image.blend(img, glow.filter(ImageFilter.GaussianBlur(120)), 0.9)
d = ImageDraw.Draw(img)
for x in range(0, W, 40): d.line([(x, 0), (x, H)], fill='#11141b')
for y in range(0, H, 40): d.line([(0, y), (W, y)], fill='#11141b')
d.rounded_rectangle((70, 70, 420, 116), 23, outline='#00e5a0', width=2)
d.text((92, 80), '// discord bot', font=font(24, mono=True), fill='#00e5a0')
d.text((70, 150), 'Prompt Medic', font=font(96), fill='#ffffff')
d.text((72, 270), 'Fix broken AI prompts.', font=font(44), fill='#00e5a0')
d.text((72, 326), 'Roast your repo. Read the patch.', font=font(44), fill='#8b95ff')
x = 72
for c in ['/fix', '/roast', '/patch', '/mybuild']:
    f = font(30, mono=True); w = d.textlength(c, font=f)
    d.rounded_rectangle((x, 430, x + w + 36, 482), 12, fill='#161a24', outline='#262b38', width=2)
    d.text((x + 18, 439), c, font=f, fill='#00e5a0'); x += w + 56
d.text((72, 540), 'Free on Discord  ·  Premium $5/mo', font=font(28, bold=False), fill='#9aa3b5')
d.ellipse((960, 380, 1130, 550), fill='#5865f2')
d.rectangle((1028, 410, 1062, 520), fill='#ffffff'); d.rectangle((990, 448, 1100, 482), fill='#ffffff')
img.save(os.path.join(root, 'assets', 'og.png'), optimize=True)
print('wrote assets/og.png')
