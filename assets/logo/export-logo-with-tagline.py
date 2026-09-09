from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parent
FONT = '/System/Library/Fonts/Supplemental/Iowan Old Style.ttc'

def export(filename, canvas_size, badge_width, circular=False, show_tagline=True, letter_scale=1):
    aa = 4
    width, height = canvas_size
    image = Image.new('RGBA', (width * aa, height * aa), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)
    scale = badge_width / 56 * aa
    bw, bh = 56 * scale, 42 * scale
    x, y = (width * aa - bw) / 2, (height * aa - bh) / 2
    if circular:
        circle_top = (height * aa - bw) / 2
        draw.ellipse((x, circle_top, x + bw - 1, circle_top + bw - 1), fill='#0f2230')
    else:
        draw.rounded_rectangle((x, y, x + bw - 1, y + bh - 1), radius=bh / 2, fill='#0f2230')
    font = ImageFont.truetype(FONT, round(15.04 * scale * letter_scale), index=1)
    tracking = -0.04 * 15.04 * scale * letter_scale
    z_width = font.getlength('Z') + tracking
    on_width = font.getlength('ON') + 2 * tracking
    left = x + (bw - z_width - on_width) / 2
    ascent, descent = font.getmetrics()
    baseline = y + (bh - ascent - descent) / 2 + ascent
    draw.text((left, baseline), 'Z', font=font, fill='#f4efe6', anchor='ls')
    left += z_width
    draw.text((left, baseline), 'O', font=font, fill='#f0a36e', anchor='ls')
    # Preserve the font's ON kerning, plus the website's letter spacing.
    left += font.getlength('ON') - font.getlength('N') + tracking
    draw.text((left, baseline), 'N', font=font, fill='#f0a36e', anchor='ls')
    if show_tagline:
        tagline_font = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', round(2.5 * scale), index=0)
        draw.text((x + bw / 2, y + bh * 0.75), 'Local-first Zone. Switched ON.', font=tagline_font, fill='#adb3b5', anchor='ms')
    image = image.resize(canvas_size, Image.Resampling.LANCZOS)
    (OUT / filename).parent.mkdir(parents=True, exist_ok=True)
    image.save(OUT / filename, optimize=True)
    print(filename, image.size, (OUT / filename).stat().st_size, 'bytes')

if __name__ == '__main__':
    export('zon-logo.png', (512, 512), 448, circular=True)
    export('../brand/zon-mark.png', (256, 256), 256, circular=True, show_tagline=False, letter_scale=1.15)
    for size in (16, 32):
        export(f'../brand/favicon-{size}.png', (size, size), size, circular=True, show_tagline=False, letter_scale=1.15)
