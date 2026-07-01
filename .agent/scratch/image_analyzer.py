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
            print(f"{img_name}: format={img.format}, size={img.size}, mode={img.mode}")
    else:
        print(f"{img_name} does not exist!")
