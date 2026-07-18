
import cairosvg
from PIL import Image
import numpy as np

svg_file = 'docs/pixel_logo.svg'
png_file = 'logo.png'

cairosvg.svg2png(url=svg_file, write_to=png_file, scale=4, background_color="white")

img = Image.open(png_file).convert('L')

W = 240
aspect_correction = 0.45
H = int(W * (238/885) * aspect_correction)

img = img.resize((W, H), Image.Resampling.LANCZOS)
pixels = np.array(img)

chars = " .:-=+*#%@"
# Invert pixels: darker pixels (original #541111 is dark, white is 255)
# Logo is dark, background is white.
# So low pixel value -> index near len(chars)-1
# High pixel value (255) -> index 0 (space)

ascii_art = []
for row in pixels:
    line = []
    for p in row:
        # map 0..255 to len(chars)-1 .. 0
        idx = int((255 - p) / 255.0 * (len(chars) - 1))
        # Add slight contrast boost
        if p > 240: idx = 0
        if p < 80: idx = len(chars) - 1
        line.append(chars[idx])
    ascii_art.append("".join(line))

ascii_str = "\n".join(ascii_art)

# Write logo.txt
with open('logo.txt', 'w') as f:
    f.write(ascii_str + "\n")

# Write logo.rb
rb_content = f"LOGO = <<~'ASCII'\n{ascii_str}\nASCII\n\nputs \"\\e[38;2;84;17;17m#{{LOGO}}\\e[0m\"\n"

with open('logo.rb', 'w') as f:
    f.write(rb_content)

# Write logo.svg
# SVG with <text> elements
svg_lines = []
svg_lines.append('<svg width="100%" height="100%" viewBox="0 0 {} {}" xmlns="http://www.w3.org/2000/svg">'.format(W * 8, H * 16))
svg_lines.append('<style> text { font-family: monospace; font-size: 14px; fill: #541111; white-space: pre; } </style>')
svg_lines.append('<rect width="100%" height="100%" fill="white"/>')

for i, line in enumerate(ascii_art):
    y = (i + 1) * 14
    svg_lines.append(f'<text x="0" y="{y}">{line}</text>')

svg_lines.append('</svg>')

with open('logo.svg', 'w') as f:
    f.write("\n".join(svg_lines) + "\n")

print("Done")
