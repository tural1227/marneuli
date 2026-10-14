#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
🏢 MARNEULI RESIDENCE — 100% PULSUZ AI 360° OTAQ GENERATORU (Pollinations.ai)
Heç bir API açarı, qeydiyyat və ya ödəniş tələb etmir.
Mənzil 52-nin bütün otaqlarını memarlıq cizgisinə uyğun 360° formatda generasiya edir.
"""

import os
import sys
import time
import urllib.request
import urllib.parse
from PIL import Image

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

OUT_DIR = os.path.join(os.path.dirname(__file__), "tour_360", "apt_52")

ROOMS_PROMPTS = [
    {
        "id": "hall",
        "name": "Dəhliz / Giriş Qapısı",
        "file": "hall.jpg",
        "prompt": "360 degree equirectangular panorama 2:1 ratio, elegant modern entrance foyer hallway of luxury apartment in Marneuli Residence, polished porcelain floor tiles, modern minimalist coat closet, illuminated full length mirror, wooden interior doors, warm recessed ceiling spotlights, architectural photography, photorealistic, 8k"
    },
    {
        "id": "living",
        "name": "Qonaq Otağı & Açıq Mətbəx",
        "file": "living.jpg",
        "prompt": "360 degree equirectangular panorama 2:1 ratio, ultra luxury open concept living room and contemporary kitchen studio in Marneuli Residence, light oak parquet floor, beige sectional sofa, modern dining table, sleek dark kitchen cabinets with LED ambient lights, floor to ceiling panoramic glass doors opening to sunny balcony, bright natural daylight, architectural interior design, 8k"
    },
    {
        "id": "bedroom",
        "name": "Yataq Otağı",
        "file": "bedroom.jpg",
        "prompt": "360 degree equirectangular panorama 2:1 ratio, modern master bedroom in luxury apartment, king size upholstered bed, oak wood herringbone flooring, modern bedside lamps, floor to ceiling wardrobe, glass door leading to balcony with sheer white curtains, cozy warm lighting, 8k architectural render"
    },
    {
        "id": "bathroom",
        "name": "Hamam Otağı",
        "file": "bathroom.jpg",
        "prompt": "360 degree equirectangular panorama 2:1 ratio, contemporary luxury bathroom interior, italian marble wall tiles, floating wooden double vanity with round backlit mirror, frameless glass walk-in rain shower, matte black fixtures, hotel spa atmosphere, 8k"
    },
    {
        "id": "balcony",
        "name": "Mənzərəli Eyvan (Balkon)",
        "file": "balcony.jpg",
        "prompt": "360 degree equirectangular panorama 2:1 ratio, 5th floor spacious apartment balcony in Marneuli Residence, black steel railings, outdoor ceramic tiles, panoramic daylight view overlooking classical stone building facade and green landscaped courtyard park, clear sunny sky, photorealistic 8k"
    }
]

def generate_room(room, seed=42):
    dest_path = os.path.join(OUT_DIR, room["file"])
    tmp_path = dest_path + ".tmp"
    
    encoded_prompt = urllib.parse.quote(room["prompt"])
    url = f"https://image.pollinations.ai/prompt/{encoded_prompt}?width=2048&height=1024&nologo=true&seed={seed}"
    
    print(f"\n🎨 [{room['name']}] generasiya olunur...")
    print(f"🔗 URL: {url[:90]}...")
    
    t0 = time.time()
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
    
    try:
        with urllib.request.urlopen(req, timeout=90) as resp:
            data = resp.read()
            with open(tmp_path, "wb") as f:
                f.write(data)
                
        # Post-process with PIL to ensure exact 2048x1024 2:1 ratio
        with Image.open(tmp_path) as img:
            img = img.convert("RGB")
            img_resized = img.resize((2048, 1024), Image.Resampling.LANCZOS)
            img_resized.save(dest_path, "JPEG", quality=90, optimize=True)
            
        if os.path.exists(tmp_path):
            os.remove(tmp_path)
            
        size_kb = os.path.getsize(dest_path) / 1024
        print(f"✅ Tamamlandı ({time.time()-t0:.1f} saniyə)! Saxlanıldı: {dest_path} ({size_kb:.1f} KB)")
        return True
    except Exception as e:
        print(f"❌ Xəta baş verdi: {e}", file=sys.stderr)
        if os.path.exists(tmp_path):
            os.remove(tmp_path)
        return False

def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    print("=" * 65)
    print("🚀 MARNEULI RESIDENCE — PULSUZ AI 360° OTAQ GENERATORU")
    print("   Mühərrik: Pollinations.ai (100% Pulsuz, API açarı tələb etmir)")
    print("=" * 65)
    
    success_count = 0
    for idx, r in enumerate(ROOMS_PROMPTS, 1):
        print(f"\n--- Otaq {idx}/{len(ROOMS_PROMPTS)} ---")
        if generate_room(r, seed=100 + idx * 7):
            success_count += 1
        time.sleep(2)
        
    print("\n" + "=" * 65)
    print(f"🎉 GENERASİYA BİTDİ! {success_count}/{len(ROOMS_PROMPTS)} otaq uğurla yaradıldı.")
    print(f"📁 Qovluq: {OUT_DIR}")
    print("=" * 65 + "\n")

if __name__ == "__main__":
    main()
