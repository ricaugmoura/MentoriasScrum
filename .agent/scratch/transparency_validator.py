import os
from PIL import Image

public_dir = "/home/ricardo/Projetos/MentoriasScrum/public"
images = [
    "PAL-EBM_transparent.png", "PAL-I_transparent.png", "PSD_transparent.png",
    "PSK_transparent.png", "PSM-I_transparent.png", "PSM-II_transparent.png",
    "PSPO-I_transparent.png", "PSPO-II_transparent.png", "PSU_transparent.png",
    "sps_transparent.png"
]

for img_name in images:
    path = os.path.join(public_dir, img_name)
    if not os.path.exists(path):
        print(f"{img_name} does not exist!")
        continue
        
    with Image.open(path) as img:
        w, h = img.size
        # Sample pixels near the borders (e.g. at 10, 10)
        border_pixels = [
            img.getpixel((10, 10)),
            img.getpixel((w - 11, 10)),
            img.getpixel((10, h - 11)),
            img.getpixel((w - 11, h - 11))
        ]
        
        # Sample pixels near the center (e.g. at w//2, h//2)
        center_pixel = img.getpixel((w // 2, h // 2))
        
        print(f"{img_name}: size={img.size}")
        print(f"  Corner alphas: {[p[3] for p in border_pixels]}")
        print(f"  Center alpha: {center_pixel[3]}")
