// ============================================================================
// 🏢 MARNEULI RESIDENCE — 360° INTERACTIVE APARTMENT VIRTUAL TOUR
// Silk-Smooth Walking Engine, Exact Blueprint Alignment & Live Radar Mini-Map
// ============================================================================

(function () {
  // Exact Architectural Layout for Apartment 52 (Floor 5, 68.6 m² + 4.5 m² Balcony)
  const APT_TOUR_CONFIG = {
    apartment: 52,
    floor: 5,
    title: "5-ci Mərtəbə &bull; Mənzil № 52 (68.6 m²)",
    initialRoom: "hall",
    rooms: {
      hall: {
        id: "hall",
        name: "Dəhliz & Giriş Zonası",
        area: "5.8 m²",
        icon: "🚪",
        image: "tour_360/apt_52/hall.jpg",
        initialLon: 15.0,
        hotspots: [
          { target: "living", pitch: -2.0, yaw: 15.0, label: "Qonaq Otağı & Açıq Mətbəx" },
          { target: "bathroom", pitch: -4.0, yaw: 88.0, label: "Hamam Otağı" },
          { target: "bedroom", pitch: -4.0, yaw: 145.0, label: "Əsas Yataq Otağı" }
        ]
      },
      living: {
        id: "living",
        name: "Qonaq Otağı & Açıq Mətbəx",
        area: "31.7 m²",
        icon: "🛋️",
        image: "tour_360/apt_52/living.jpg",
        initialLon: 12.0,
        hotspots: [
          { target: "balcony", pitch: -3.0, yaw: 12.0, label: "Mənzərəli Eyvana Çıxış" },
          { target: "bedroom", pitch: -3.0, yaw: 82.0, label: "Yataq Otağına Keçid" },
          { target: "hall", pitch: -2.0, yaw: 155.0, label: "Dəhlizə Qayıt" }
        ]
      },
      bedroom: {
        id: "bedroom",
        name: "Əsas Yataq Otağı",
        area: "18.2 m²",
        icon: "🛏️",
        image: "tour_360/apt_52/bedroom.jpg",
        initialLon: 38.0,
        hotspots: [
          { target: "balcony", pitch: -3.0, yaw: 38.0, label: "Eyvana Çıxış" },
          { target: "living", pitch: -4.0, yaw: -5.0, label: "Qonaq Otağına Qayıt" },
          { target: "hall", pitch: -4.0, yaw: -45.0, label: "Dəhlizə Keçid" }
        ]
      },
      bathroom: {
        id: "bathroom",
        name: "Hamam & Sanitar Qovşağı",
        area: "4.4 m²",
        icon: "🚿",
        image: "tour_360/apt_52/bathroom.jpg",
        initialLon: -30.0,
        hotspots: [
          { target: "hall", pitch: -3.0, yaw: 118.0, label: "Dəhlizə Qayıt" }
        ]
      },
      balcony: {
        id: "balcony",
        name: "Mənzərəli Eyvan (Balkon)",
        area: "4.5 m²",
        icon: "🌿",
        image: "tour_360/apt_52/balcony.jpg",
        initialLon: 80.0,
        hotspots: [
          { target: "living", pitch: -3.0, yaw: -76.0, label: "Qonaq Otağına Daxil Ol" },
          { target: "bedroom", pitch: -3.0, yaw: -48.0, label: "Yataq Otağına Daxil Ol" }
        ]
      }
    }
  };

  let scene, camera, renderer, sphereMesh;
  let currentRoomId = "hall";
  let lon = 15.0, lat = 0.0;
  let phi = 0, theta = 0;
  let isUserInteracting = false;
  let onPointerDownPointerX = 0, onPointerDownPointerY = 0;
  let onPointerDownLon = 0, onPointerDownLat = 0;
  let textureLoader = null;
  let activeHotspots = [];
  let isTourInitialized = false;
  let fov = 60; // 60° natural architectural FOV — completely straight vertical lines
  let isWalking = false;
  let roomHistory = [];

  // GPU Memory Preload Cache
  const textureCache = {};

  // Walking Physics State
  let cameraOffset = { x: 0, y: 0, z: 0 };
  let targetOffset = { x: 0, y: 0, z: 0 };
  let walkBobPhase = 0;
  let currentBob = 0;

  // Key tracking
  const keysDown = {};

  function createTourDOMElements() {
    if (document.getElementById("tour-360-modal")) return;

    const modal = document.createElement("div");
    modal.id = "tour-360-modal";
    modal.innerHTML = `
      <div id="tour-360-canvas-container"></div>
      <div id="tour-hotspots-layer"></div>
      <div id="tour-walk-flash"></div>

      <!-- Top Header -->
      <div class="tour-header">
        <div class="tour-badge-box">
          <div class="tour-title">
            <span class="dot"></span>
            MARNEULI RESIDENCE &bull; 360° VİRTUAL TUR
          </div>
          <div class="tour-room-name" id="tour-room-title">Yüklənir...</div>
        </div>

        <div class="tour-header-actions">
          <button class="tour-btn tour-btn-ai" onclick="window.openBlockadeModal()">
            ✨ AI 360 Generator
          </button>
          <button class="tour-btn tour-btn-close" onclick="window.close360Tour()" title="Bağla">
            ✕
          </button>
        </div>
      </div>

      <!-- Architectural Blueprint Mini-Map with Live View Radar -->
      <div class="tour-minimap-box" id="tour-minimap">
        <div class="tour-minimap-header">
          <span>📐 Çertyoj Planı</span>
          <span style="color:#60a5fa; font-weight:800;">№ 52 &bull; 68.6 m²</span>
        </div>
        <div class="tour-minimap-svg-wrap">
          <svg class="tour-minimap-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <!-- Exterior boundary walls -->
            <rect x="2" y="2" width="96" height="96" fill="#0f172a" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" rx="3" />

            <!-- Room Zones strictly matching Apartment 52 Blueprint -->
            <!-- 1. Hall / Entrance -->
            <polygon id="map-room-hall" class="minimap-room" points="10,10 45,10 45,35 25,35 25,28 10,28" 
                     fill="#1e293b" stroke="#475569" stroke-width="1" onclick="window.switchRoom('hall')">
              <title>Dəhliz (5.8 m²)</title>
            </polygon>
            <text x="22" y="22" font-size="5" fill="#94a3b8" text-anchor="middle" pointer-events="none">Dəhliz</text>

            <!-- 2. Bathroom -->
            <rect id="map-room-bathroom" class="minimap-room" x="48" y="10" width="42" height="25" 
                  fill="#1e293b" stroke="#475569" stroke-width="1" rx="2" onclick="window.switchRoom('bathroom')">
              <title>Hamam & Sanitar Qovşaq (4.4 m²)</title>
            </rect>
            <text x="69" y="24" font-size="5" fill="#94a3b8" text-anchor="middle" pointer-events="none">Hamam</text>

            <!-- 3. Living Room & Kitchen -->
            <polygon id="map-room-living" class="minimap-room" points="10,38 52,38 52,80 10,80" 
                     fill="#1e293b" stroke="#475569" stroke-width="1" onclick="window.switchRoom('living')">
              <title>Qonaq Otağı & Mətbəx (31.7 m²)</title>
            </polygon>
            <text x="31" y="60" font-size="5.5" font-weight="bold" fill="#94a3b8" text-anchor="middle" pointer-events="none">Qonaq & Mətbəx</text>

            <!-- 4. Master Bedroom -->
            <rect id="map-room-bedroom" class="minimap-room" x="55" y="38" width="35" height="42" 
                  fill="#1e293b" stroke="#475569" stroke-width="1" rx="2" onclick="window.switchRoom('bedroom')">
              <title>Əsas Yataq Otağı (18.2 m²)</title>
            </rect>
            <text x="72" y="60" font-size="5.5" font-weight="bold" fill="#94a3b8" text-anchor="middle" pointer-events="none">Yataq Otağı</text>

            <!-- 5. Balcony -->
            <rect id="map-room-balcony" class="minimap-room" x="10" y="83" width="80" height="13" 
                  fill="#064e3b" stroke="#059669" stroke-width="1" rx="2" onclick="window.switchRoom('balcony')">
              <title>Eyvan (4.5 m²)</title>
            </rect>
            <text x="50" y="91" font-size="5" font-weight="bold" fill="#34d399" text-anchor="middle" pointer-events="none">🌿 Eyvan (4.5 m²)</text>

            <!-- Live User Position Radar with Directional FOV Cone -->
            <g id="minimap-radar-group" transform="translate(25, 20)">
              <polygon id="minimap-fov" points="0,0 -12,-22 12,-22" fill="rgba(56, 189, 248, 0.35)" />
              <circle cx="0" cy="0" r="3.5" fill="#38bdf8" stroke="#ffffff" stroke-width="1.2" />
            </g>
          </svg>
        </div>
      </div>

      <!-- Walk Navigation Floating Dock -->
      <div class="tour-walk-nav">
        <button class="tour-walk-btn" onclick="window.tourWalkForward()" title="Önə doğru addımla (W / ↑)">
          <span>🚶‍♂️ Önə Addımla</span>
          <span class="walk-key">W</span>
        </button>
        <button class="tour-walk-btn" onclick="window.tourWalkBackward()" title="Geriyə addımla (S / ↓)">
          <span>↩ Geriyə Qayıt</span>
          <span class="walk-key">S</span>
        </button>
      </div>

      <!-- Side Controls -->
      <div class="tour-side-controls">
        <button class="tour-icon-btn" onclick="window.tourZoom(-8)" title="Yaxınlaşdır">+</button>
        <button class="tour-icon-btn" onclick="window.tourZoom(8)" title="Uzaqlaşdır">−</button>
        <button class="tour-icon-btn" onclick="window.tourToggleFullscreen()" title="Tam Ekran">⛶</button>
      </div>

      <!-- Bottom Room Tabs -->
      <div class="tour-footer" id="tour-room-tabs"></div>

      <!-- Loading Indicator -->
      <div id="tour-loading-indicator">
        <div class="tour-spinner"></div>
        <div style="font-size: 13px; font-weight: 600;">Otaq 360° Yüklənir...</div>
      </div>

      <!-- AI 360 Generator Modal -->
      <div id="blockade-ai-modal">
        <div class="blockade-box">
          <div class="blockade-header">
            <div class="blockade-title">
              <span>🔮 AI 360° Otaq Generatoru</span>
            </div>
            <button class="tour-btn tour-btn-close" onclick="window.closeBlockadeModal()">✕</button>
          </div>
          
          <div class="blockade-input-group">
            <label>AI Mühərriki:</label>
            <select id="ai-engine-select" class="blockade-select" onchange="window.onAiEngineChange()">
              <option value="pollinations" selected>🟢 Pollinations.ai (100% PULSUZ — API Açar Tələb Olunmur)</option>
              <option value="blockade">🟣 Blockade Labs Skybox API (Ödənişli / API Açarı ilə)</option>
            </select>
          </div>

          <div class="blockade-input-group" id="blockade-key-group" style="display: none;">
            <label>Blockade Labs API Açarı (x-api-key):</label>
            <input type="password" id="blockade-api-key-input" class="blockade-input" placeholder="Məs: bla_xxxxxxxxxxxxxxxx" />
            <small style="color:#94a3b8; font-size:11px;">Açar əldə etmək üçün: <a href="https://skybox.blockadelabs.com/api" target="_blank" style="color:#60a5fa;">skybox.blockadelabs.com/api</a></small>
          </div>

          <div class="blockade-input-group">
            <label>Generasiya Ediləcək Otaq:</label>
            <select id="blockade-room-select" class="blockade-select">
              <option value="hall">🚪 Dəhliz / Giriş</option>
              <option value="living" selected>🛋️ Qonaq Otağı & Açıq Mətbəx</option>
              <option value="bedroom">🛏️ Əsas Yataq Otağı</option>
              <option value="bathroom">🚿 Hamam & Sanitar Qovşağı</option>
              <option value="balcony">🌿 Eyvan (Balkon)</option>
            </select>
          </div>

          <div class="blockade-input-group">
            <label>Prompt (Memarlıq Cizgisinə Uyğun Təsvir):</label>
            <textarea id="blockade-prompt-input" class="blockade-input" rows="3" style="resize:vertical;"></textarea>
          </div>

          <!-- Progress -->
          <div class="blockade-progress-box" id="blockade-progress-box">
            <div id="blockade-status-text">Generasiya başlayır...</div>
            <div class="blockade-progress-bar-bg">
              <div class="blockade-progress-bar-fill" id="blockade-progress-bar"></div>
            </div>
          </div>

          <div class="blockade-btn-row">
            <button class="tour-btn" onclick="window.closeBlockadeModal()">İmtina</button>
            <button class="tour-btn tour-btn-ai" id="blockade-submit-btn" onclick="window.startAIGeneration()">
              🚀 360° Şəkli Pulsuz Generasiya Et
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Build bottom room tabs
    const tabsContainer = document.getElementById("tour-room-tabs");
    Object.values(APT_TOUR_CONFIG.rooms).forEach(r => {
      const tab = document.createElement("button");
      tab.className = `tour-room-tab ${r.id === currentRoomId ? 'active' : ''}`;
      tab.id = `tour-tab-${r.id}`;
      tab.innerHTML = `<span>${r.icon}</span> <span>${r.name}</span> <small style="opacity:0.65;font-size:11px;">(${r.area})</small>`;
      tab.onclick = () => switchRoom(r.id);
      tabsContainer.appendChild(tab);
    });

    const savedKey = localStorage.getItem("BLOCKADE_API_KEY");
    if (savedKey) {
      const keyInput = document.getElementById("blockade-api-key-input");
      if (keyInput) keyInput.value = savedKey;
    }
  }

  // Preload all 5 room textures into memory to eliminate all lag
  function preloadAllTextures() {
    if (!textureLoader) return;
    Object.values(APT_TOUR_CONFIG.rooms).forEach(room => {
      if (!textureCache[room.id]) {
        textureLoader.load(room.image, (tex) => {
          tex.mapping = window.THREE.UVMapping;
          tex.colorSpace = window.THREE.SRGBColorSpace;
          tex.minFilter = window.THREE.LinearFilter;
          tex.magFilter = window.THREE.LinearFilter;
          textureCache[room.id] = tex;
        });
      }
    });
  }

  // Initialize Three.js Panorama Scene
  function initThreeScene() {
    if (isTourInitialized) return;
    const THREE = window.THREE;
    const container = document.getElementById("tour-360-canvas-container");
    if (!container || !THREE) {
      console.warn("Three.js not ready:", { THREE, container });
      return;
    }

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 1, 1100);
    camera.target = new THREE.Vector3(0, 0, 0);

    // Inverted sphere for 360 panorama projection (radius 500)
    const geometry = new THREE.SphereGeometry(500, 64, 40);
    geometry.scale(-1, 1, 1);

    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide
    });

    sphereMesh = new THREE.Mesh(geometry, material);
    scene.add(sphereMesh);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    textureLoader = new THREE.TextureLoader();
    preloadAllTextures();

    // Event Listeners for Interaction
    container.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);
    container.addEventListener("wheel", onDocumentMouseWheel, { passive: false });
    window.addEventListener("resize", onWindowResize);

    isTourInitialized = true;
    startAnimationLoop();
  }

  function onPointerDown(event) {
    if (event.isPrimary === false) return;
    isUserInteracting = true;
    onPointerDownPointerX = event.clientX;
    onPointerDownPointerY = event.clientY;
    onPointerDownLon = lon;
    onPointerDownLat = lat;
  }

  function onPointerMove(event) {
    if (event.isPrimary === false || !isUserInteracting) return;
    lon = (onPointerDownPointerX - event.clientX) * 0.15 + onPointerDownLon;
    lat = (event.clientY - onPointerDownPointerY) * 0.15 + onPointerDownLat;
  }

  function onPointerUp(event) {
    if (event.isPrimary === false) return;
    isUserInteracting = false;
  }

  function onDocumentMouseWheel(event) {
    event.preventDefault();
    fov = Math.max(42, Math.min(70, fov + event.deltaY * 0.04));
    if (camera) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }
  }

  function onWindowResize() {
    if (!renderer || !camera) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    updateHotspotPositions();
  }

  // Silk-Smooth Animation Loop with Continuous Physical Walk
  function startAnimationLoop() {
    let lastTime = performance.now();

    function animate() {
      requestAnimationFrame(animate);

      const now = performance.now();
      const dt = Math.min(0.1, (now - lastTime) / 1000);
      lastTime = now;

      // Handle continuous keyboard walking
      handleKeyboardWalking(dt);

      // Smooth camera position damping
      cameraOffset.x += (targetOffset.x - cameraOffset.x) * 0.18;
      cameraOffset.z += (targetOffset.z - cameraOffset.z) * 0.18;
      currentBob += ((Math.sin(walkBobPhase) * 1.8) - currentBob) * 0.2;

      // Limit pitch to prevent gimbal lock
      lat = Math.max(-85, Math.min(85, lat));
      phi = ((90 - lat) * Math.PI) / 180;
      theta = (lon * Math.PI) / 180;

      const lookX = 500 * Math.sin(phi) * Math.cos(theta);
      const lookY = 500 * Math.cos(phi);
      const lookZ = 500 * Math.sin(phi) * Math.sin(theta);

      if (camera) {
        camera.position.set(cameraOffset.x, currentBob, cameraOffset.z);
        camera.lookAt(cameraOffset.x + lookX, cameraOffset.y + lookY, cameraOffset.z + lookZ);
      }

      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }

      updateHotspotPositions();
      updateMiniMapRadar();
    }

    animate();
  }

  // Handle continuous smooth walking without any stuttering
  function handleKeyboardWalking(dt) {
    if (isWalking) return;

    let moveForward = 0;
    let moveSide = 0;

    if (keysDown["KeyW"] || keysDown["ArrowUp"]) moveForward += 1;
    if (keysDown["KeyS"] || keysDown["ArrowDown"]) moveForward -= 1;
    if (keysDown["KeyA"] || keysDown["ArrowLeft"]) moveSide -= 1;
    if (keysDown["KeyD"] || keysDown["ArrowRight"]) moveSide += 1;

    if (moveForward === 0 && moveSide === 0) return;

    const rad = (lon * Math.PI) / 180;
    const fX = Math.sin(rad);
    const fZ = Math.cos(rad);
    const sX = Math.cos(rad);
    const sZ = -Math.sin(rad);

    const speed = 75; // units per second
    const dx = (fX * moveForward + sX * moveSide) * speed * dt;
    const dz = (fZ * moveForward + sZ * moveSide) * speed * dt;

    targetOffset.x += dx;
    targetOffset.z += dz;
    walkBobPhase += dt * 9;

    // Check if stepping forward towards a doorway hotspot
    if (moveForward > 0) {
      checkDoorwayApproach();
    }

    // Keep camera within natural room boundary
    const dist = Math.hypot(targetOffset.x, targetOffset.z);
    if (dist > 95) {
      const scale = 95 / dist;
      targetOffset.x *= scale;
      targetOffset.z *= scale;
    }
  }

  // Check if walking steps brought user through a doorway
  function checkDoorwayApproach() {
    const room = APT_TOUR_CONFIG.rooms[currentRoomId];
    if (!room || !room.hotspots) return;

    room.hotspots.forEach(h => {
      let diff = (h.yaw - lon) % 360;
      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;

      // If looking directly at doorway (< 40°) and advanced forward
      if (Math.abs(diff) < 40 && Math.hypot(targetOffset.x, targetOffset.z) > 45) {
        walkToRoom(h.target, h.yaw, h.pitch);
      }
    });
  }

  // Switch Active Room
  function switchRoom(roomId, targetYaw = null, resetView = true) {
    const room = APT_TOUR_CONFIG.rooms[roomId];
    if (!room) return;

    currentRoomId = roomId;

    // Update Room Title
    const titleEl = document.getElementById("tour-room-title");
    if (titleEl) {
      titleEl.innerHTML = `<strong>${APT_TOUR_CONFIG.title}</strong> &bull; <span style="color:#60a5fa;">${room.name}</span> <span style="color:#94a3b8;font-size:12px;">(${room.area})</span>`;
    }

    // Update bottom tabs
    document.querySelectorAll(".tour-room-tab").forEach(tab => tab.classList.remove("active"));
    const activeTab = document.getElementById(`tour-tab-${roomId}`);
    if (activeTab) activeTab.classList.add("active");

    // Update Blueprint Mini-Map active zone
    document.querySelectorAll(".minimap-room").forEach(r => r.classList.remove("active"));
    const activeMapRoom = document.getElementById(`map-room-${roomId}`);
    if (activeMapRoom) activeMapRoom.classList.add("active");

    // Reset camera walk offset at the new center
    targetOffset = { x: 0, y: 0, z: 0 };
    cameraOffset = { x: 0, y: 0, z: 0 };
    walkBobPhase = 0;

    if (resetView) {
      if (targetYaw !== null) {
        lon = targetYaw;
        lat = 0;
      } else if (room.initialLon !== undefined) {
        lon = room.initialLon;
        lat = 0;
      }
    }

    // Instant texture swap from cache
    if (textureCache[roomId] && sphereMesh && sphereMesh.material) {
      sphereMesh.material.map = textureCache[roomId];
      sphereMesh.material.needsUpdate = true;
      renderHotspots(room.hotspots);
      return;
    }

    // Fallback load
    const loader = document.getElementById("tour-loading-indicator");
    if (loader) loader.style.display = "flex";

    if (!textureLoader && window.THREE) {
      textureLoader = new window.THREE.TextureLoader();
    }

    textureLoader.load(
      room.image,
      (texture) => {
        texture.mapping = window.THREE.UVMapping;
        texture.colorSpace = window.THREE.SRGBColorSpace;
        texture.minFilter = window.THREE.LinearFilter;
        texture.magFilter = window.THREE.LinearFilter;
        textureCache[roomId] = texture;

        if (sphereMesh && sphereMesh.material) {
          sphereMesh.material.map = texture;
          sphereMesh.material.needsUpdate = true;
        }
        if (loader) loader.style.display = "none";
        renderHotspots(room.hotspots);
      },
      undefined,
      (err) => {
        console.error("Error loading room panorama:", err);
        if (loader) loader.style.display = "none";
      }
    );
  }

  // Smooth Walking Glide into Doorway / Room Transition
  function walkToRoom(targetRoomId, doorYaw, doorPitch) {
    if (isWalking || !camera) {
      switchRoom(targetRoomId);
      return;
    }

    const targetRoom = APT_TOUR_CONFIG.rooms[targetRoomId];
    if (!targetRoom) return;

    isWalking = true;

    if (currentRoomId && currentRoomId !== targetRoomId) {
      roomHistory.push(currentRoomId);
    }

    const startLon = lon;
    const startLat = lat;
    const startFov = fov;

    let targetLon = (doorYaw !== null && doorYaw !== undefined) ? doorYaw : lon;
    while (targetLon - startLon > 180) targetLon -= 360;
    while (targetLon - startLon < -180) targetLon += 360;
    const targetLat = (doorPitch !== null && doorPitch !== undefined) ? doorPitch : lat;

    const startTime = performance.now();
    const duration = 550; // ms smooth walk-through
    const flashEl = document.getElementById("tour-walk-flash");

    let textureSwitched = false;

    function stepWalk(now) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const ease = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      lon = startLon + (targetLon - startLon) * ease;
      lat = startLat + (targetLat - startLat) * ease;

      // Realistic forward walk step bobbing & dolly-in
      if (progress < 0.7) {
        camera.fov = startFov - 12 * (progress / 0.7);
        walkBobPhase += 0.25;
      } else {
        camera.fov = (startFov - 12) + 12 * ((progress - 0.7) / 0.3);
      }
      camera.updateProjectionMatrix();

      // Doorway crossing threshold flash
      if (flashEl) {
        if (progress > 0.4 && progress < 0.7) {
          flashEl.style.opacity = String(Math.sin(((progress - 0.4) / 0.3) * Math.PI) * 0.45);
        } else {
          flashEl.style.opacity = "0";
        }
      }

      // Switch room texture in the middle of crossing the threshold
      if (progress >= 0.52 && !textureSwitched) {
        textureSwitched = true;
        switchRoom(targetRoomId, null, false);
      }

      if (progress < 1) {
        requestAnimationFrame(stepWalk);
      } else {
        camera.fov = startFov;
        camera.updateProjectionMatrix();
        if (flashEl) flashEl.style.opacity = "0";
        targetOffset = { x: 0, y: 0, z: 0 };
        cameraOffset = { x: 0, y: 0, z: 0 };
        isWalking = false;
      }
    }

    requestAnimationFrame(stepWalk);
  }

  // Walk forward button action — advances inside room OR walks into facing door
  function walkForward() {
    const room = APT_TOUR_CONFIG.rooms[currentRoomId];
    if (!room) return;

    // Check if facing a doorway
    let facingDoor = null;
    let minDiff = Infinity;
    (room.hotspots || []).forEach(h => {
      let diff = (h.yaw - lon) % 360;
      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;
      let absDiff = Math.abs(diff);
      if (absDiff < minDiff) {
        minDiff = absDiff;
        facingDoor = h;
      }
    });

    if (facingDoor && minDiff < 48) {
      // Facing a doorway: walk straight through it!
      walkToRoom(facingDoor.target, facingDoor.yaw, facingDoor.pitch);
    } else {
      // Walk forward inside room
      const rad = (lon * Math.PI) / 180;
      targetOffset.x += Math.sin(rad) * 35;
      targetOffset.z += Math.cos(rad) * 35;
      walkBobPhase += Math.PI * 0.8;

      const dist = Math.hypot(targetOffset.x, targetOffset.z);
      if (dist > 95) {
        const scale = 95 / dist;
        targetOffset.x *= scale;
        targetOffset.z *= scale;
      }
    }
  }

  // Walk backward button action
  function walkBackward() {
    if (roomHistory.length > 0) {
      const prev = roomHistory.pop();
      walkToRoom(prev, null, null);
    } else {
      const rad = (lon * Math.PI) / 180;
      targetOffset.x -= Math.sin(rad) * 30;
      targetOffset.z -= Math.cos(rad) * 30;
      walkBobPhase += Math.PI * 0.8;
    }
  }

  // Render Doorway Hotspots
  function renderHotspots(hotspots) {
    const layer = document.getElementById("tour-hotspots-layer");
    if (!layer) return;
    layer.innerHTML = "";
    activeHotspots = [];

    if (!hotspots || !hotspots.length) return;

    hotspots.forEach(h => {
      const el = document.createElement("div");
      el.className = "tour-hotspot";
      el.innerHTML = `
        <div class="tour-hotspot-pin" title="${h.label}">
          <div class="tour-hotspot-ripple"></div>
          <svg class="tour-hotspot-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      `;
      el.onclick = (e) => {
        e.stopPropagation();
        walkToRoom(h.target, h.yaw, h.pitch);
      };

      layer.appendChild(el);

      const phi = ((90 - h.pitch) * Math.PI) / 180;
      const theta = (h.yaw * Math.PI) / 180;
      const pos = new THREE.Vector3(
        420 * Math.sin(phi) * Math.cos(theta),
        420 * Math.cos(phi),
        420 * Math.sin(phi) * Math.sin(theta)
      );

      activeHotspots.push({ element: el, position: pos });
    });

    updateHotspotPositions();
  }

  // Project 3D Hotspot positions to 2D Screen Coordinates
  function updateHotspotPositions() {
    if (!camera || !activeHotspots.length) return;

    const widthHalf = window.innerWidth / 2;
    const heightHalf = window.innerHeight / 2;

    activeHotspots.forEach(h => {
      const p = h.position.clone();
      p.project(camera);

      if (p.z > 1.0) {
        h.element.style.display = "none";
      } else {
        const x = (p.x * widthHalf) + widthHalf;
        const y = -(p.y * heightHalf) + heightHalf;
        h.element.style.display = "flex";
        h.element.style.left = `${x}px`;
        h.element.style.top = `${y}px`;
      }
    });
  }

  // Update Blueprint Mini-Map Live Radar Position & Rotation
  function updateMiniMapRadar() {
    const radarGroup = document.getElementById("minimap-radar-group");
    if (!radarGroup) return;

    // Room center coordinates on the 100x100 SVG blueprint
    const roomPositions = {
      hall: { x: 26, y: 22 },
      bathroom: { x: 69, y: 22 },
      living: { x: 31, y: 58 },
      bedroom: { x: 72, y: 58 },
      balcony: { x: 50, y: 89 }
    };

    const pos = roomPositions[currentRoomId] || { x: 26, y: 22 };
    // Sub-offset within the room based on physical walking
    const finalX = pos.x + (cameraOffset.x / 95) * 6;
    const finalY = pos.y + (cameraOffset.z / 95) * 6;

    // Rotate radar cone with camera's lon
    radarGroup.setAttribute("transform", `translate(${finalX}, ${finalY}) rotate(${lon})`);
  }

  // Keyboard navigation listeners
  window.addEventListener("keydown", (e) => {
    const modal = document.getElementById("tour-360-modal");
    if (!modal || modal.style.display === "none") return;

    keysDown[e.code] = true;

    if (e.code === "KeyW" || e.code === "ArrowUp") {
      e.preventDefault();
      walkForward();
    } else if (e.code === "KeyS" || e.code === "ArrowDown") {
      e.preventDefault();
      walkBackward();
    } else if (e.code === "Escape") {
      const bModal = document.getElementById("blockade-ai-modal");
      if (bModal && bModal.classList.contains("active")) {
        window.closeBlockadeModal();
        return;
      }
      window.close360Tour();
    }
  });

  window.addEventListener("keyup", (e) => {
    delete keysDown[e.code];
  });

  // Public Tour APIs
  window.open360Tour = function (aptNumber) {
    createTourDOMElements();
    const modal = document.getElementById("tour-360-modal");
    if (!modal) return;

    modal.classList.add("active");
    modal.style.display = "flex";
    modal.style.opacity = "1";
    document.body.style.overflow = "hidden";

    initThreeScene();
    switchRoom(currentRoomId || "hall");
  };

  window.close360Tour = function () {
    const modal = document.getElementById("tour-360-modal");
    if (modal) {
      modal.classList.remove("active");
      modal.style.display = "none";
    }
    const fpModal = document.getElementById("floorplan-modal");
    if (!fpModal || !fpModal.classList.contains("active")) {
      document.body.style.overflow = "";
    }
  };

  window.switchRoom = function (roomId) {
    switchRoom(roomId);
  };

  window.tourZoom = function (delta) {
    if (!camera) return;
    fov = Math.max(42, Math.min(70, fov + delta));
    camera.fov = fov;
    camera.updateProjectionMatrix();
  };

  window.tourWalkForward = function () {
    walkForward();
  };

  window.tourWalkBackward = function () {
    walkBackward();
  };

  window.tourToggleFullscreen = function () {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  };

  // AI Modal Actions
  window.openBlockadeModal = function () {
    const m = document.getElementById("blockade-ai-modal");
    if (m) m.classList.add("active");
  };

  window.closeBlockadeModal = function () {
    const m = document.getElementById("blockade-ai-modal");
    if (m) m.classList.remove("active");
  };

  window.onAiEngineChange = function () {
    const engine = document.getElementById("ai-engine-select") ? document.getElementById("ai-engine-select").value : "pollinations";
    const keyGroup = document.getElementById("blockade-key-group");
    const submitBtn = document.getElementById("blockade-submit-btn");
    if (engine === "pollinations") {
      if (keyGroup) keyGroup.style.display = "none";
      if (submitBtn) submitBtn.textContent = "🚀 360° Şəkli Pulsuz Generasiya Et";
    } else {
      if (keyGroup) keyGroup.style.display = "flex";
      if (submitBtn) submitBtn.textContent = "🚀 Blockade Skybox İlə Generasiya Et";
    }
  };

  window.startAIGeneration = function () {
    const engine = document.getElementById("ai-engine-select") ? document.getElementById("ai-engine-select").value : "pollinations";
    if (engine === "pollinations") {
      startPollinationsGeneration();
    } else {
      startBlockadeGeneration();
    }
  };

  function startPollinationsGeneration() {
    const roomSelect = document.getElementById("blockade-room-select");
    const promptInput = document.getElementById("blockade-prompt-input");
    const progressBox = document.getElementById("blockade-progress-box");
    const statusText = document.getElementById("blockade-status-text");
    const progressBar = document.getElementById("blockade-progress-bar");
    const submitBtn = document.getElementById("blockade-submit-btn");

    const roomId = roomSelect.value;
    const userPrompt = promptInput.value.trim();
    if (!userPrompt) {
      alert("Zəhmət olmasa təsvir (prompt) daxil edin!");
      return;
    }

    progressBox.style.display = "flex";
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.5";
    progressBar.style.width = "25%";
    statusText.textContent = "AI modeli hazırlanır...";

    const seed = Math.floor(Math.random() * 9999999);
    const cleanPrompt = encodeURIComponent(`equirectangular 360 panorama, rectilinear straight walls, ${userPrompt}, modern luxury apartment, architectural photography, 8k, realistic lighting`);
    const imageUrl = `https://image.pollinations.ai/prompt/${cleanPrompt}?width=2048&height=1024&seed=${seed}&nologo=true&enhance=true`;

    progressBar.style.width = "60%";
    statusText.textContent = "AI 360° panoramik fotonu çəkir...";

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = function () {
      progressBar.style.width = "100%";
      statusText.textContent = "✅ Uğurla tamamlandı! Otaq yenilənir...";

      APT_TOUR_CONFIG.rooms[roomId].image = imageUrl;
      delete textureCache[roomId];

      setTimeout(() => {
        window.closeBlockadeModal();
        switchRoom(roomId);
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
        progressBox.style.display = "none";
      }, 1000);
    };

    img.onerror = function () {
      statusText.textContent = "❌ Yükləmə xətası baş verdi.";
      submitBtn.disabled = false;
      submitBtn.style.opacity = "1";
    };

    img.src = imageUrl;
  }

  async function startBlockadeGeneration() {
    const keyInput = document.getElementById("blockade-api-key-input");
    const roomSelect = document.getElementById("blockade-room-select");
    const promptInput = document.getElementById("blockade-prompt-input");
    const progressBox = document.getElementById("blockade-progress-box");
    const statusText = document.getElementById("blockade-status-text");
    const progressBar = document.getElementById("blockade-progress-bar");
    const submitBtn = document.getElementById("blockade-submit-btn");

    const apiKey = keyInput ? keyInput.value.trim() : "";
    if (!apiKey) {
      alert("Zəhmət olmasa Blockade Labs API açarını daxil edin!");
      return;
    }

    localStorage.setItem("BLOCKADE_API_KEY", apiKey);
    const roomId = roomSelect.value;
    const prompt = promptInput.value.trim();

    progressBox.style.display = "flex";
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.5";
    progressBar.style.width = "20%";
    statusText.textContent = "Blockade Labs Skybox sorğusu göndərilir...";

    try {
      const res = await fetch("https://backend.blockadelabs.com/api/v1/skybox", {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: prompt,
          skybox_style_id: 155,
          enhance_prompt: true
        })
      });

      const data = await res.json();
      if (!res.ok || data.error_message) throw new Error(data.error_message || `Xəta: ${res.status}`);

      const reqId = data.id;
      progressBar.style.width = "40%";
      statusText.textContent = `Generasiya ID: ${reqId}. Gözlənilir...`;

      let pollCount = 0;
      const pollTimer = setInterval(async () => {
        pollCount++;
        try {
          const checkRes = await fetch(`https://backend.blockadelabs.com/api/v1/imagine/requests/${reqId}`, {
            headers: { "x-api-key": apiKey }
          });
          const checkData = await checkRes.json();
          const req = checkData.request || checkData;
          const status = req.status;

          if (status === "complete") {
            clearInterval(pollTimer);
            progressBar.style.width = "100%";
            statusText.textContent = "✅ Tamamlandı! Otaq panoraması yenilənir...";

            const fileUrl = req.file_url;
            APT_TOUR_CONFIG.rooms[roomId].image = fileUrl;
            delete textureCache[roomId];

            setTimeout(() => {
              window.closeBlockadeModal();
              switchRoom(roomId);
              submitBtn.disabled = false;
              submitBtn.style.opacity = "1";
              progressBox.style.display = "none";
            }, 1200);
          } else if (status === "error" || status === "abort") {
            clearInterval(pollTimer);
            throw new Error(req.error_message || "Generasiya xətası");
          }

          if (pollCount > 60) {
            clearInterval(pollTimer);
            throw new Error("Vaxt bitdi.");
          }
        } catch (err) {
          clearInterval(pollTimer);
          statusText.textContent = `❌ Xəta: ${err.message}`;
          submitBtn.disabled = false;
          submitBtn.style.opacity = "1";
        }
      }, 5000);

    } catch (e) {
      statusText.textContent = `❌ Xəta: ${e.message}`;
      submitBtn.disabled = false;
      submitBtn.style.opacity = "1";
    }
  }

})();
