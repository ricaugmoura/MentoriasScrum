import os
from PIL import Image

public_dir = "/home/ricardo/Projetos/MentoriasScrum/public"
images = [
    "PAL-EBM.png", "PAL-I.png", "PSD.png", "PSK.png",
    "PSM-I.png", "PSM-II.png", "PSPO-I.png", "PSPO-II.png", "PSU.png", "sps.jpg"
]

for img_name in images:
    path = os.path.join(public_dir, img_name)
    if os.path.exists(path):
        with Image.open(path) as img:
            rgb_img = img.convert("RGB")
            w, h = rgb_img.size
            corners = [
                rgb_img.getpixel((0, 0)),
                rgb_img.getpixel((w - 1, 0)),
                rgb_img.getpixel((0, h - 1)),
                rgb_img.getpixel((w - 1, h - 1))
            ]
            print(f"{img_name}: corners={corners}")
