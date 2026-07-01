import os
from PIL import Image, ImageDraw

public_dir = "/home/ricardo/Projetos/MentoriasScrum/public"
output_dir = "/home/ricardo/Projetos/MentoriasScrum/public"
images = [
    "PAL-EBM.png", "PAL-I.png", "PSD.png", "PSK.png",
    "PSM-I.png", "PSM-II.png", "PSPO-I.png", "PSPO-II.png", "PSU.png", "sps.jpg"
]

# We will try a floodfill from the four corners
# Since we want to make the background transparent, we convert to RGBA.
# The target transparent color is (0, 0, 0, 0).
def remove_background(img_name, threshold=40):
    path = os.path.join(public_dir, img_name)
    if not os.path.exists(path):
        print(f"Skipping {img_name}: does not exist")
        return
        
    with Image.open(path) as img:
        rgba = img.convert("RGBA")
        w, h = rgba.size
        
        # We perform floodfill from the 4 corners: (0,0), (w-1,0), (0,h-1), (w-1,h-1)
        # We also do it from middle of the top, bottom, left, and right borders to make sure we catch everything.
        seeds = [
            (0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1),
            (w // 2, 0), (w // 2, h - 1), (0, h // 2), (w - 1, h // 2)
        ]
        
        # To avoid destroying the white text scroll or inner shield colors,
        # we can use a moderate threshold.
        # ImageDraw.floodfill modifies the image in-place.
        for seed in seeds:
            ImageDraw.floodfill(rgba, seed, (0, 0, 0, 0), thresh=threshold)
            
        # Let's save the result to see how it looks
        out_name = os.path.splitext(img_name)[0] + "_transparent.png"
        out_path = os.path.join(output_dir, out_name)
        rgba.save(out_path, "PNG")
        print(f"Saved transparent version to {out_name}")

for img_name in images:
    remove_background(img_name, threshold=50)
