#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
🏢 MARNEULI RESIDENCE — BLOCKADE LABS SKYBOX 360° ROOM GENERATOR
Integrates Blockade Labs API (https://api-documentation.blockadelabs.com/api/)
Generates 360° equirectangular panoramas for all rooms of Apartment 52
according to the architectural blueprint.
"""

import os
import sys
import time
import json
import argparse
import urllib.request
import urllib.error

API_BASE_URL = "https://backend.blockadelabs.com/api/v1"

# Default rooms configuration for Apartment 52 (Marneuli Residence, Floor 5, 68.6 m2)
APT_52_ROOMS = [
    {
        "id": "hall",
        "name": "Dəhliz / Giriş Qapısı",
        "prompt": "Ultra-realistic interior 360 equirectangular panorama of an elegant entrance hall and corridor of modern luxury apartment. Polished porcelain marble floor tiles, sleek hidden coat storage wall, full-length mirror with warm backlighting, modern interior wooden doors leading to living room, bedroom and bathroom, warm recessed ceiling spotlights, 8k resolution, architectural photography.",
        "negative_text": "blurry, low quality, distorted, extra doors, noise, exterior, ugly",
        "target_file": "hall.jpg"
    },
    {
        "id": "living",
        "name": "Qonaq Otağı & Açıq Mətbəx",
        "prompt": "Ultra-realistic interior 360 equirectangular panorama of modern luxury open-space living room and kitchen studio in a premium apartment, Marneuli Residence. L-shaped stylish cream sofa, oak wood herringbone parquet floor, marble dining island with modern barstools, sleek contemporary dark kitchen cabinetry with warm LED accents, floor-to-ceiling glass sliding doors opening to balcony, warm natural daylight, 8k resolution, highly detailed.",
        "negative_text": "blurry, low quality, distorted, cartoon, 3d render artifacts, messy, outdoor",
        "target_file": "living.jpg"
    },
    {
        "id": "bedroom",
        "name": "Yataq Otağı",
        "prompt": "Ultra-realistic interior 360 equirectangular panorama of modern master bedroom in a luxury apartment, Marneuli Residence. King size bed with designer beige upholstered headboard, built-in wooden wardrobe, modern bedside pendant lights, soft wool carpet on hardwood floor, glass door leading to balcony, sheer white curtains, cozy warm ambient light, 8k resolution, architectural interior.",
        "negative_text": "blurry, low quality, distorted, bad proportions, messy room, clutter",
        "target_file": "bedroom.jpg"
    },
    {
        "id": "bathroom",
        "name": "Hamam Otağı",
        "prompt": "Ultra-realistic interior 360 equirectangular panorama of a contemporary luxury bathroom. Italian marble tile walls, floating oak wood vanity with illuminated round mirror, walk-in glass shower enclosure, matte black fixtures, recessed warm ceiling lights, spa atmosphere, clean hotel aesthetic, 8k resolution.",
        "negative_text": "blurry, low quality, bathtub in middle of room, dirty, clutter, distorted",
        "target_file": "bathroom.jpg"
    },
    {
        "id": "balcony",
        "name": "Eyvan (Balkon)",
        "prompt": "Ultra-realistic 360 equirectangular panorama from a high-floor 5th floor apartment balcony. Modern black steel railing, outdoor tiled floor, panoramic daylight view overlooking classical limestone facade of Marneuli Residence and landscaped green courtyard park below, blue sky, bright sunny day, 8k resolution.",
        "negative_text": "blurry, indoor furniture, bedroom, closed room, distorted, rainy, dark",
        "target_file": "balcony.jpg"
    }
]

def load_api_key():
    """Load API key from environment or .env file"""
    api_key = os.environ.get("BLOCKADE_API_KEY")
    if api_key:
        return api_key.strip()
    
    # Try .env
    env_path = os.path.join(os.path.dirname(__file__), ".env")
    if os.path.exists(env_path):
        with open(env_path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line.startswith("BLOCKADE_API_KEY="):
                    return line.split("=", 1)[1].strip().strip('"').strip("'")
    return None

def fetch_json(url, headers=None, data=None, method="GET"):
    """Helper to send HTTP requests with json body/response"""
    req_headers = {"User-Agent": "Marneuli-Blockade-Client/1.0"}
    if headers:
        req_headers.update(headers)
    
    encoded_data = None
    if data is not None:
        encoded_data = json.dumps(data).encode("utf-8")
        req_headers["Content-Type"] = "application/json"

    req = urllib.request.Request(url, data=encoded_data, headers=req_headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            body = resp.read().decode("utf-8")
            return json.loads(body)
    except urllib.error.HTTPError as e:
        err_msg = e.read().decode("utf-8")
        print(f"❌ HTTP Error {e.code}: {err_msg}", file=sys.stderr)
        return {"error": True, "status": e.code, "message": err_msg}
    except Exception as e:
        print(f"❌ Network Error: {e}", file=sys.stderr)
        return {"error": True, "message": str(e)}

def get_available_styles(api_key):
    """Fetch list of styles from Blockade Labs API"""
    url = f"{API_BASE_URL}/skybox/styles"
    headers = {"x-api-key": api_key}
    res = fetch_json(url, headers=headers)
    if isinstance(res, list):
        return res
    return []

def select_best_style(styles):
    """Find the best style ID for realistic interior architecture"""
    # Prefer Realistic / Interior / Open World (model 3 or 4)
    # Search for keywords in style names
    for s in styles:
        name = s.get("name", "").lower()
        if "interior" in name or "architecture" in name:
            return s.get("id"), s.get("name")
    for s in styles:
        name = s.get("name", "").lower()
        if "realistic" in name or "digital painting" in name or "open world" in name:
            return s.get("id"), s.get("name")
    
    # Fallback default style id
    if styles:
        return styles[0].get("id"), styles[0].get("name")
    return 155, "Default (155)"

def generate_skybox(api_key, prompt, negative_text=None, style_id=155):
    """Trigger a new skybox generation"""
    url = f"{API_BASE_URL}/skybox"
    headers = {"x-api-key": api_key}
    payload = {
        "prompt": prompt,
        "skybox_style_id": style_id,
        "enhance_prompt": True
    }
    if negative_text:
        payload["negative_text"] = negative_text

    res = fetch_json(url, headers=headers, data=payload, method="POST")
    return res

def track_generation(api_key, request_id, poll_interval=6, max_wait=240):
    """Poll status until 'complete' or 'error'"""
    url = f"{API_BASE_URL}/imagine/requests/{request_id}"
    headers = {"x-api-key": api_key}
    
    start_time = time.time()
    last_status = None
    
    while time.time() - start_time < max_wait:
        res = fetch_json(url, headers=headers)
        if not res or res.get("error"):
            print("   ⚠️ Sorğu xətası, yenidən yoxlanılır...")
            time.sleep(poll_interval)
            continue
        
        req_data = res.get("request", res)
        status = req_data.get("status")
        
        if status != last_status:
            print(f"   ⏳ Status: {status} (Növbə: {req_data.get('queue_position', 0)})")
            last_status = status
            
        if status == "complete":
            file_url = req_data.get("file_url")
            print(f"   ✅ Tamamlandı! Şəkil URL: {file_url}")
            return req_data
        elif status in ["error", "abort"]:
            print(f"   ❌ Xəta baş verdi: {req_data.get('error_message')}")
            return req_data
            
        time.sleep(poll_interval)
        
    print(f"   ⏱️ Vaxt bitdi ({max_wait}s).")
    return None

def download_file(file_url, save_path):
    """Download image file from URL to disk"""
    os.makedirs(os.path.dirname(save_path), exist_ok=True)
    headers = {"User-Agent": "Mozilla/5.0"}
    req = urllib.request.Request(file_url, headers=headers)
    with urllib.request.urlopen(req) as resp, open(save_path, "wb") as out:
        out.write(resp.read())
    print(f"   💾 Saxlanıldı: {save_path} ({os.path.getsize(save_path):,} bayt)")

def run_pipeline(api_key=None, apt_num=52, style_id=None):
    if not api_key:
        api_key = load_api_key()
        
    if not api_key:
        print("\n" + "="*60)
        print("🔑 BLOCKADE LABS API AÇARI TƏLƏB OLUNUR!")
        print("="*60)
        print("1. https://skybox.blockadelabs.com/api saytından API açarı əldə edin.")
        print("2. Açarınızı .env faylına daxil edin:")
        print("   BLOCKADE_API_KEY=sizin_acar_burada")
        print("3. Və ya əmrlə başladın:")
        print("   python generate_360_blockade.py --key SIZIN_ACAR")
        print("="*60 + "\n")
        try:
            api_key = input("və ya API açarınızı indi daxil edin: ").strip()
        except EOFError:
            pass
        if not api_key:
            print("API açarı daxil edilmədi. Dayandırılır.")
            return False

    print("\n🔍 Blockade Labs API stilləri yoxlanılır...")
    styles = get_available_styles(api_key)
    if not styles:
        print("❌ Stillər alına bilmədi. Zəhmət olmasa API açarını yoxlayın.")
        return False
        
    chosen_id, style_name = select_best_style(styles)
    if style_id:
        chosen_id = style_id
        style_name = f"Custom ID ({style_id})"
    print(f"🎨 Seçilmiş Stil: [{chosen_id}] {style_name}")

    out_dir = os.path.join(os.path.dirname(__file__), "tour_360", f"apt_{apt_num}")
    os.makedirs(out_dir, exist_ok=True)

    print(f"\n🚀 Mənzil № {apt_num} üçün 360° otaqların generasiyası başlanır:")
    print(f"📁 Saxlanacaq qovluq: {out_dir}\n")

    results = {}
    for idx, room in enumerate(APT_52_ROOMS, 1):
        print(f"\n[{idx}/{len(APT_52_ROOMS)}] 🖼️ Otaq: {room['name']} ({room['id']})")
        print(f"   📝 Prompt: {room['prompt'][:80]}...")
        
        gen_res = generate_skybox(
            api_key=api_key,
            prompt=room["prompt"],
            negative_text=room.get("negative_text"),
            style_id=chosen_id
        )
        
        if not gen_res or gen_res.get("error"):
            print(f"   ❌ Generasiya başladıla bilmədi: {gen_res}")
            continue
            
        req_id = gen_res.get("id")
        print(f"   🆔 Sorğu ID: {req_id} göndərildi. Gözlənilir...")
        
        completed_data = track_generation(api_key, req_id)
        if completed_data and completed_data.get("status") == "complete":
            file_url = completed_data.get("file_url")
            save_path = os.path.join(out_dir, room["target_file"])
            download_file(file_url, save_path)
            results[room["id"]] = {
                "name": room["name"],
                "file": room["target_file"],
                "url": file_url,
                "completed": True
            }
        else:
            print(f"   ⚠️ Otaq {room['id']} generasiya oluna bilmədi.")
            
    # Save manifest
    manifest_path = os.path.join(out_dir, "manifest.json")
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
        
    print("\n" + "="*60)
    print(f"🎉 GENERASİYA TAMAMLANDI! {len(results)}/{len(APT_52_ROOMS)} otaq hazırlandı.")
    print(f"📄 Manifest: {manifest_path}")
    print("="*60 + "\n")
    return True

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Blockade Labs 360 Skybox Generator")
    parser.add_argument("--key", help="Blockade Labs API key")
    parser.add_argument("--apt", type=int, default=52, help="Apartment number (default: 52)")
    parser.add_argument("--style", type=int, help="Blockade Labs Style ID")
    args = parser.parse_args()
    
    run_pipeline(api_key=args.key, apt_num=args.apt, style_id=args.style)
