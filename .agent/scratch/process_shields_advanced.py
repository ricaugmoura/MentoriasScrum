import os
import math
from PIL import Image, ImageDraw

public_dir = "/home/ricardo/Projetos/MentoriasScrum/frontend/public"
images = [
    "PAL-EBM.png", "PAL-I.png", "PSD.png", "PSK.png",
    "PSM-I.png", "PSM-II.png", "PSPO-I.png", "PSPO-II.png", "PSU.png", "sps.jpg"
]

def process_shield(img_name):
    path = os.path.join(public_dir, img_name)
    if not os.path.exists(path):
        print(f"Skipping {img_name}: does not exist")
        return
        
    with Image.open(path) as img:
        rgba = img.convert("RGBA")
        w, h = rgba.size
        cx, cy = w // 2, h // 2
        
        # 1. Circular Vignette Mask:
        # Any pixel outside a radius of 420px from the center is set to transparent.
        # This cleans up the corners and outer background blobs completely without touching the shield and weapon.
        pixels = rgba.load()
        max_r = 420
        for y in range(h):
            for x in range(w):
                dx = x - cx
                dy = y - cy
                dist = math.sqrt(dx*dx + dy*dy)
                if dist > max_r:
                    pixels[x, y] = (0, 0, 0, 0)
                    
        # 2. Flood fill from borders to clear any remaining background inside the circle
        # Seed points along the borders
        seeds = [
            (0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1),
            (cx, 0), (cx, h - 1), (0, cy), (w - 1, cy)
        ]
        for seed in seeds:
            ImageDraw.floodfill(rgba, seed, (0, 0, 0, 0), thresh=80)
            
        # 3. Autocrop (trim to bounding box of non-transparent pixels)
        # Getbbox returns (left, upper, right, lower)
        bbox = rgba.getbbox()
        if bbox:
            cropped = rgba.crop(bbox)
            
            # Let's add a small padding (e.g. 10px) to keep it nice
            pad = 10
            final_img = Image.new("RGBA", (cropped.width + 2*pad, cropped.height + 2*pad), (0, 0, 0, 0))
            final_img.paste(cropped, (pad, pad))
            
            out_name = os.path.splitext(img_name)[0] + "_transparent.png"
            out_path = os.path.join(public_dir, out_name)
            final_img.save(out_path, "PNG")
            print(f"Saved {out_name}: cropped size={final_img.size}")
        else:
            print(f"Failed to find bounding box for {img_name}")

for img_name in images:
    process_shield(img_name)
