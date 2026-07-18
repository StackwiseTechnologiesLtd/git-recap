
import cairosvg
from PIL import Image
import numpy as np

svg_file = 'docs/pixel_logo.svg'
png_file = 'logo.png'

cairosvg.svg2png(url=svg_file, write_to=png_file, scale=4, background_color="white")

img = Image.open(png_file).convert('L')

W = 76 # Good size for normal terminals
# We calculate height in pixels.
H_pixels = int(W * (238/885))
H = H_pixels // 2
# For half-blocks, 1 char = 2 pixels high. So the final char height will be H_pixels / 2.
img = img.resize((W, H_pixels), Image.Resampling.LANCZOS)

pixels = img.load()
threshold = 128

lines = []
for y in range(0, H_pixels, 2):
    line = ""
    for x in range(W):
        top = pixels[x, y] < threshold if y < H_pixels else False
        bottom = pixels[x, y+1] < threshold if (y+1) < H_pixels else False
        
        if top and bottom:
            line += "█"
        elif top:
            line += "▀"
        elif bottom:
            line += "▄"
        else:
            line += " "
    # rstrip to avoid unnecessary spaces on the right
    lines.append(line.rstrip())

ascii_str = "\n".join(lines)

# Write logo.txt
with open('logo.txt', 'w') as f:
    f.write(ascii_str + "\n")

# Write logo.rb
rb_content = f"LOGO = <<~'ASCII'\n{ascii_str}\nASCII\n\nputs \"\\e[38;2;84;17;17m#{{LOGO}}\\e[0m\"\n"

with open('logo.rb', 'w') as f:
    f.write(rb_content)


print("Done")
