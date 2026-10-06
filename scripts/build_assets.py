#!/usr/bin/env python3
"""Pipeline de assets de Make It Studio: fotos -> WebP, logos -> máscaras alpha, posters de vídeo."""
import json, os, colorsys
from PIL import Image, ImageOps, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_PHOTOS = os.path.join(ROOT, "public/assets/photos")
OUT_LOGOS = os.path.join(ROOT, "public/assets/logos")
OUT_BRAND = os.path.join(ROOT, "public/assets/brand")
for d in (OUT_PHOTOS, OUT_LOGOS, OUT_BRAND):
    os.makedirs(d, exist_ok=True)

# ---------------------------------------------------------------- fotografías
PHOTOS = {
    "amapola-ramo":        ("FOTOS/DSC_9620.jpg", 2000),
    "kuikku-palillos":     ("FOTOS/DSC_8399.jpg", 2000),
    "kuikku-mesa-roja":    ("FOTOS/DSC_3334.jpg", 2000),
    "kuikku-pizarra":      ("FOTOS/DSC_8408.jpg", 1800),
    "kuikku-neon":         ("FOTOS/DSC_2997.jpg", 1800),
    "kuikku-brindis":      ("FOTOS/DSC_3007.jpg", 1800),
    "kuikku-nogal":        ("FOTOS/DSC_1938.jpg", 1800),
    "kuikku-lounge":       ("FOTOS/DSC_5097.jpg", 1800),
    "kuikku-barra":        ("FOTOS/Copia de KUIKKU-39.jpg", 1800),
    "expreso-barra":       ("FOTOS/IMG_8837.jpg", 2000),
    "pilates-clase":       ("FOTOS/IMG_9120.jpg", 2000),
    "mesa-parrilla":       ("FOTOS/DSC_4163.jpg", 1800),
    "mesa-parrilla-detalle":("FOTOS/DSC_4172.jpg", 1800),
    "cena-pareja":         ("FOTOS/DSC_8897.jpg", 1800),
    "cena-brindis":        ("FOTOS/DSC_8900.jpg", 1800),
    "cena-plato":          ("FOTOS/DSC_8829.jpg", 1800),
    "inauguracion":        ("FOTOS/Copia de FOTO4.jpg", 2400),
}

def dominant(im):
    """Color representativo, ligeramente desaturado: sirve de fondo mientras carga la imagen."""
    small = im.convert("RGB").resize((48, 48), Image.LANCZOS)
    px = list(small.getdata())
    r = sum(p[0] for p in px) // len(px)
    g = sum(p[1] for p in px) // len(px)
    b = sum(p[2] for p in px) // len(px)
    h, l, s = colorsys.rgb_to_hls(r / 255, g / 255, b / 255)
    r, g, b = colorsys.hls_to_rgb(h, min(0.82, max(0.16, l)), s * 0.55)
    return "#%02x%02x%02x" % (int(r * 255), int(g * 255), int(b * 255))

manifest = {"photos": {}, "logos": {}, "video": {}}
for slug, (src, longEdge) in PHOTOS.items():
    p = os.path.join(ROOT, src)
    im = ImageOps.exif_transpose(Image.open(p)).convert("RGB")
    w, h = im.size
    sc = longEdge / max(w, h)
    if sc < 1:
        im = im.resize((round(w * sc), round(h * sc)), Image.LANCZOS)
    dst = os.path.join(OUT_PHOTOS, slug + ".webp")
    im.save(dst, "WEBP", quality=80, method=6)
    manifest["photos"][slug] = {
        "src": "/assets/photos/%s.webp" % slug,
        "width": im.width, "height": im.height,
        "tint": dominant(im),
        "kb": round(os.path.getsize(dst) / 1024),
        "origin": src,
    }

# ------------------------------------------------------- logos -> máscara alpha
LOGOS = {
    "kuikku":        "LOGOS CLIENTES/KUIKKU.png",
    "yupick":        "LOGOS CLIENTES/logoyupick1600x1600.png",
    "amapola":       "LOGOS CLIENTES/AMAPOLA.png",
    "expreso":       "LOGOS CLIENTES/ExPreso_Logos7.png",
    "reganadientes": "LOGOS CLIENTES/7A2A64F5-ED9B-49EB-9DD9-9C05E4DC718F.png",
}

def to_mask(im):
    """Devuelve una máscara alpha (L) de la tinta del logo, sea claro-sobre-oscuro u oscuro-sobre-claro."""
    im = im.convert("RGBA")
    a = im.getchannel("A")
    rgb = im.convert("RGB")
    if a.getextrema()[0] < 250:                      # ya tiene transparencia util
        return a
    w, h = im.size
    k = max(2, min(w, h) // 50)
    corners = []
    for (x0, y0) in ((0, 0), (w - k, 0), (0, h - k), (w - k, h - k)):
        c = rgb.crop((x0, y0, x0 + k, y0 + k)).resize((1, 1), Image.LANCZOS).getpixel((0, 0))
        corners.append(c)
    bg = tuple(sorted(c[i] for c in corners)[len(corners) // 2] for i in range(3))
    lut = []
    for v in range(256):
        lut.append(v)
    px = rgb.load()
    mask = Image.new("L", (w, h))
    mp = mask.load()
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y]
            d = max(abs(r - bg[0]), abs(g - bg[1]), abs(b - bg[2]))
            mp[x, y] = 255 if d > 165 else (0 if d < 28 else int((d - 28) * 255 / 137))
    return mask

for slug, src in LOGOS.items():
    im = Image.open(os.path.join(ROOT, src))
    mask = to_mask(im)
    bbox = mask.getbbox()
    mask = mask.crop(bbox)
    # Se guarda en modo LA (gris + alfa), no RGBA: `mask-image` solo lee el
    # canal alfa, así que los tres canales de color eran peso tirado. Y a 460px
    # de lado mayor, que es ~4x el tamaño al que se pinta cualquier logo.
    sc = min(1.0, 460 / max(mask.size))
    if sc < 1:
        mask = mask.resize((round(mask.width * sc), round(mask.height * sc)), Image.LANCZOS)
    out = Image.merge("LA", (Image.new("L", mask.size, 255), mask))
    dst = os.path.join(OUT_LOGOS, slug + ".png")
    out.save(dst, optimize=True)
    ink = sum(mask.getdata()) / 255.0                      # área de tinta en px
    manifest["logos"][slug] = {
        "src": "/assets/logos/%s.png" % slug,
        "width": out.width, "height": out.height,
        "ratio": round(out.width / out.height, 4),
        "inkDensity": round(ink / (out.width * out.height), 4),
        "origin": src,
    }

# ------------------------------------------------------------ logotipo de marca
lg = Image.open(os.path.join(ROOT, "INFO MARCA/LOGO_ROJO.png")).convert("RGBA")
a = lg.getchannel("A").crop(lg.getchannel("A").getbbox())
# Mismo criterio que los logos de cliente: LA en vez de RGBA. Este se carga en
# todas las páginas (cabecera, menú y pie), así que su peso cuenta tres veces.
Image.merge("LA", (Image.new("L", a.size, 255), a)).save(
    os.path.join(OUT_BRAND, "makeit-logo.png"), optimize=True)
manifest["brand"] = {"logo": {"src": "/assets/brand/makeit-logo.png",
                              "width": a.width, "height": a.height,
                              "ratio": round(a.width / a.height, 4)}}
print(json.dumps(manifest, indent=1)[:200])
with open(os.path.join(ROOT, "scripts/assets.manifest.json"), "w") as f:
    json.dump(manifest, f, indent=2, ensure_ascii=False)
print("\n== FOTOS ==")
for k, v in manifest["photos"].items():
    print(f"  {k:24s} {v['width']}x{v['height']:5d}  {v['kb']:4d}KB  {v['tint']}")
print("\n== LOGOS ==")
for k, v in manifest["logos"].items():
    print(f"  {k:16s} {v['width']}x{v['height']:4d}  ratio {v['ratio']:6.3f}  ink {v['inkDensity']:.3f}")
print("\n== MARCA ==", manifest["brand"]["logo"])
