// ============================================================================
// 🏢 MARNEULI RESIDENCE — 360° INTERACTIVE APARTMENT VIRTUAL TOUR
// Integrates 360 panorama rendering, room-to-room hotspots, and Blockade Labs API
// ============================================================================

(function () {
  // Tour configuration for Apartment 52 (Marneuli Residence, 5th Floor, 68.6 m²)
  const APT_TOUR_CONFIG = {
    apartment: 52,
    floor: 5,
    title: "5-ci Mərtəbə &bull; Mənzil № 52 (68.6 m²)",
    initialRoom: "hall",
    rooms: {
      hall: {
        id: "hall",
        name: "Dəhliz / Giriş Zonası",
        icon: "🚪",
        image: "tour_360/apt_52/hall.jpg",
        initialLon: 18,
        hotspots: [
          { target: "living", pitch: -3.2, yaw: 17.8, label: "🛋️ Qonaq Otağı & Mətbəx" },
          { target: "bedroom", pitch: -4.9, yaw: 48.5, label: "🛏️ Əsas Yataq Otağı" },
          { target: "bathroom", pitch: -4.9, yaw: 132.9, label: "🚿 Hamam Otağı" }
        ]
      },
      living: {
        id: "living",
        name: "Qonaq Otağı & Açıq Mətbəx",
        icon: "🛋️",
        image: "tour_360/apt_52/living.jpg",
        initialLon: 60,
        hotspots: [
          { target: "hall", pitch: -6.7, yaw: -23.6, label: "🚪 Dəhlizə Qayıt" },
          { target: "balcony", pitch: -6.7, yaw: 122.3, label: "🌿 Eyvana (Balkona) Çıxış" }
        ]
      },
      bedroom: {
        id: "bedroom",
        name: "Əsas Yataq Otağı",
        icon: "🛏️",
        image: "tour_360/apt_52/bedroom.jpg",
        initialLon: 0,
        hotspots: [
          { target: "hall", pitch: -8.4, yaw: -122.0, label: "🚪 Dəhlizə Qayıt" },
          { target: "balcony", pitch: -4.9, yaw: 30.9, label: "🌿 Eyvana Çıxış" }
        ]
      },
      bathroom: {
        id: "bathroom",
        name: "Hamam Otağı & Sanitar Qovşağı",
        icon: "🚿",
        image: "tour_360/apt_52/bathroom.jpg",
        initialLon: 20,
        hotspots: [
          { target: "hall", pitch: -1.4, yaw: 20.4, label: "🚪 Dəhlizə Qayıt" }
        ]
      },
      balcony: {
        id: "balcony",
        name: "Mənzərəli Eyvan (Balkon - 4.5 m²)",
        icon: "🌿",
        image: "tour_360/apt_52/balcony.jpg",
        initialLon: -80,
        hotspots: [
          { target: "living", pitch: -8.4, yaw: -100.9, label: "🛋️ Qonaq Otağına Keçid" },
          { target: "bedroom", pitch: -8.4, yaw: -49.9, label: "🛏️ Yataq Otağına Keçid" }
        ]
      }
    }
  };

  let scene, camera, renderer, sphereMesh;
  let currentRoomId = "hall";
  let lon = 0, lat = 0;
  let phi = 0, theta = 0;
  let isUserInteracting = false;
  let onPointerDownPointerX = 0, onPointerDownPointerY = 0;
  let onPointerDownLon = 0, onPointerDownLat = 0;
  let textureLoader = null;
  let activeHotspots = [];
  let isTourInitialized = false;
  let fov = 75;
  let isWalking = false;
  let roomHistory = [];

  // Initialize Tour HTML Elements
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

      <!-- Walk Navigation Floating Dock -->
      <div class="tour-walk-nav">
        <button class="tour-walk-btn" onclick="window.tourWalkForward()" title="Qapıya doğru addımla (W / ↑)">
          <span>🚶‍♂️ Önə Addımla</span>
          <span class="walk-key">W</span>
        </button>
        <button class="tour-walk-btn" onclick="window.tourWalkBackward()" title="Əvvəlki otağa qayıt (S / ↓)">
          <span>↩ Geriyə Qayıt</span>
          <span class="walk-key">S</span>
        </button>
      </div>

      <!-- Side Controls -->
      <div class="tour-side-controls">
        <button class="tour-icon-btn" onclick="window.tourZoom(-10)" title="Yaxınlaşdır">+</button>
        <button class="tour-icon-btn" onclick="window.tourZoom(10)" title="Uzaqlaşdır">−</button>
        <button class="tour-icon-btn" onclick="window.tourToggleFullscreen()" title="Tam Ekran">⛶</button>
      </div>

      <!-- Bottom Room Tabs -->
      <div class="tour-footer" id="tour-room-tabs"></div>

      <!-- Loading Indicator -->
      <div id="tour-loading-indicator">
        <div class="tour-spinner"></div>
        <div style="font-size: 13px; font-weight: 600;">Otaq 360° Yüklənir...</div>
      </div>

      <!-- AI 360 Generator Modal (Pollinations.ai 100% Free & Blockade Labs) -->
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
      tab.innerHTML = `<span>${r.icon}</span> <span>${r.name}</span>`;
      tab.onclick = () => switchRoom(r.id);
      tabsContainer.appendChild(tab);
    });

    // Populate saved API Key if any
    const savedKey = localStorage.getItem("BLOCKADE_API_KEY");
    if (savedKey) {
      const keyInput = document.getElementById("blockade-api-key-input");
      if (keyInput) keyInput.value = savedKey;
    }

    // Update prompt when room selection changes in modal
    const roomSelect = document.getElementById("blockade-room-select");
    const promptInput = document.getElementById("blockade-prompt-input");
    const defaultPrompts = {
      hall: "Ultra-realistic interior 360 equirectangular panorama of an elegant entrance hall and corridor of modern luxury apartment. Polished porcelain marble floor tiles, sleek hidden coat storage wall, full-length mirror with warm backlighting, modern interior wooden doors leading to living room, bedroom and bathroom, warm recessed ceiling spotlights, 8k resolution.",
      living: "Ultra-realistic interior 360 equirectangular panorama of modern luxury open-space living room and kitchen studio in a premium apartment, Marneuli Residence. L-shaped stylish cream sofa, oak wood herringbone parquet floor, marble dining island with modern barstools, sleek contemporary dark kitchen cabinetry with warm LED accents, floor-to-ceiling glass sliding doors opening to balcony, warm natural daylight, 8k resolution.",
      bedroom: "Ultra-realistic interior 360 equirectangular panorama of modern master bedroom in a luxury apartment, Marneuli Residence. King size bed with designer beige upholstered headboard, built-in wooden wardrobe, modern bedside pendant lights, soft wool carpet on hardwood floor, glass door leading to balcony, sheer white curtains, cozy warm ambient light, 8k resolution.",
      bathroom: "Ultra-realistic interior 360 equirectangular panorama of a contemporary luxury bathroom. Italian marble tile walls, floating oak wood vanity with illuminated round mirror, walk-in glass shower enclosure, matte black fixtures, recessed warm ceiling lights, spa atmosphere, clean hotel aesthetic, 8k resolution.",
      balcony: "Ultra-realistic 360 equirectangular panorama from a high-floor 5th floor apartment balcony. Modern black steel railing, outdoor tiled floor, panoramic daylight view overlooking classical limestone facade of Marneuli Residence and landscaped green courtyard park below, blue sky, bright sunny day, 8k resolution."
    };

    if (roomSelect && promptInput) {
      promptInput.value = defaultPrompts.hall;
      roomSelect.addEventListener("change", () => {
        promptInput.value = defaultPrompts[roomSelect.value] || "";
      });
    }
  }

  // Init Three.js Panorama Scene
  function initThreeScene() {
    if (isTourInitialized) return;
    THREE = window.THREE || (typeof THREE !== 'undefined' ? THREE : null);
    const container = document.getElementById("tour-360-canvas-container");
    if (!container || !THREE) {
      console.warn("Three.js or canvas container not yet ready:", { THREE, container });
      return;
    }

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 1, 1100);
    camera.target = new THREE.Vector3(0, 0, 0);

    // Inverted sphere for 360 panorama projection
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

    // Event Listeners for Interaction
    container.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);
    container.addEventListener("wheel", onDocumentMouseWheel, { passive: false });
    window.addEventListener("resize", onWindowResize);

    isTourInitialized = true;
    animate();
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
    fov = Math.max(35, Math.min(100, fov + event.deltaY * 0.05));
    camera.fov = fov;
    camera.updateProjectionMatrix();
  }

  function onWindowResize() {
    if (!renderer || !camera) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    updateHotspotPositions();
  }

  function animate() {
    requestAnimationFrame(animate);

    // Limit pitch (latitude) to avoid gimbal lock
    lat = Math.max(-85, Math.min(85, lat));
    phi = ((90 - lat) * Math.PI) / 180;
    theta = (lon * Math.PI) / 180;

    const x = 500 * Math.sin(phi) * Math.cos(theta);
    const y = 500 * Math.cos(phi);
    const z = 500 * Math.sin(phi) * Math.sin(theta);

    camera.lookAt(x, y, z);
    renderer.render(scene, camera);

    updateHotspotPositions();
  }

  // Switch Active Room
  function switchRoom(roomId, targetYaw = null, resetView = true) {
    const room = APT_TOUR_CONFIG.rooms[roomId];
    if (!room) return;

    currentRoomId = roomId;

    // Update Room Title
    const titleEl = document.getElementById("tour-room-title");
    if (titleEl) {
      titleEl.innerHTML = `<strong>${APT_TOUR_CONFIG.title}</strong> &bull; <span style="color:#60a5fa;">${room.name}</span>`;
    }

    // Update bottom tabs
    document.querySelectorAll(".tour-room-tab").forEach(tab => tab.classList.remove("active"));
    const activeTab = document.getElementById(`tour-tab-${roomId}`);
    if (activeTab) activeTab.classList.add("active");

    // Reset or set angle if allowed
    if (resetView) {
      if (targetYaw !== null) {
        lon = targetYaw;
        lat = 0;
      } else if (room.initialLon !== undefined) {
        lon = room.initialLon;
        lat = 0;
      }
    }

    // Show loading indicator
    const loader = document.getElementById("tour-loading-indicator");
    if (loader) loader.style.display = "flex";

    // Load Panorama Texture
    const T = window.THREE;
    if (!textureLoader && T) {
      textureLoader = new T.TextureLoader();
    }
    if (!textureLoader || !T) {
      console.error("textureLoader or THREE missing!", { textureLoader, T });
      if (loader) loader.style.display = "none";
      return;
    }

    const imgUrl = room.image + (room.image.includes("?") ? "" : "?v=20261015f");
    textureLoader.load(
      imgUrl,
      (texture) => {
        texture.mapping = T.UVMapping;
        texture.colorSpace = T.SRGBColorSpace;
        texture.minFilter = T.LinearFilter;
        texture.magFilter = T.LinearFilter;
        if (sphereMesh && sphereMesh.material) {
          sphereMesh.material.color.setHex(0xffffff);
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

  // Smooth Human-like Walk Animation into Room
  function walkToRoom(targetRoomId, doorYaw, doorPitch) {
    if (isWalking || !camera) {
      switchRoom(targetRoomId);
      return;
    }

    const targetRoom = APT_TOUR_CONFIG.rooms[targetRoomId];
    if (!targetRoom) return;

    isWalking = true;

    // Track navigation history for backward walking
    if (currentRoomId && currentRoomId !== targetRoomId) {
      roomHistory.push(currentRoomId);
    }

    const startLon = lon;
    const startLat = lat;
    const startFov = fov;

    let targetLon = (doorYaw !== null && doorYaw !== undefined) ? doorYaw : lon;
    // Normalize shortest rotation direction
    while (targetLon - startLon > 180) targetLon -= 360;
    while (targetLon - startLon < -180) targetLon += 360;
    const targetLat = (doorPitch !== null && doorPitch !== undefined) ? doorPitch : lat;

    const startTime = performance.now();
    const duration = 650; // ms for the walk
    const flashEl = document.getElementById("tour-walk-flash");

    let textureSwitched = false;

    function stepWalk(now) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Smooth cubic easing
      const ease = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      lon = startLon + (targetLon - startLon) * ease;
      lat = startLat + (targetLat - startLat) * ease;

      // Dolly-in forward through the doorway
      if (progress < 0.75) {
        const zoomProg = progress / 0.75;
        camera.fov = startFov - (startFov - 34) * zoomProg;
      } else {
        const emergeProg = (progress - 0.75) / 0.25;
        camera.fov = 34 + (startFov - 34) * emergeProg;
      }
      camera.updateProjectionMatrix();

      // Footstep bobbing motion
      const stepBob = Math.sin(progress * Math.PI * 4) * 0.9;
      lat += stepBob;

      // Threshold transition flash
      if (flashEl) {
        if (progress > 0.45 && progress < 0.75) {
          flashEl.style.opacity = String(Math.sin(((progress - 0.45) / 0.3) * Math.PI) * 0.5);
        } else {
          flashEl.style.opacity = "0";
        }
      }

      // Switch room texture in the middle of crossing the threshold
      if (progress >= 0.55 && !textureSwitched) {
        textureSwitched = true;
        switchRoom(targetRoomId, null, false);
      }

      if (progress < 1) {
        requestAnimationFrame(stepWalk);
      } else {
        camera.fov = startFov;
        camera.updateProjectionMatrix();
        if (flashEl) flashEl.style.opacity = "0";
        isWalking = false;
      }
    }

    requestAnimationFrame(stepWalk);
  }

  // Walk forward towards closest visible door/hotspot
  function walkForward() {
    const room = APT_TOUR_CONFIG.rooms[currentRoomId];
    if (!room || !room.hotspots || !room.hotspots.length) return;

    let closest = null;
    let minDiff = Infinity;
    room.hotspots.forEach(h => {
      let diff = Math.abs((((h.yaw - lon) % 360) + 540) % 360 - 180);
      if (diff < minDiff) {
        minDiff = diff;
        closest = h;
      }
    });

    if (closest) {
      walkToRoom(closest.target, closest.yaw, closest.pitch);
    }
  }

  // Walk backward into previously visited room
  function walkBackward() {
    if (roomHistory.length > 0) {
      const prev = roomHistory.pop();
      walkToRoom(prev, null, null);
    } else if (currentRoomId !== "hall") {
      walkToRoom("hall", null, null);
    }
  }

  // Render Doorway / Transition Hotspots precisely on the doors
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
        <div class="tour-hotspot-pin">🚪</div>
        <div class="tour-hotspot-label">${h.label}</div>
      `;
      el.onclick = (e) => {
        e.stopPropagation();
        walkToRoom(h.target, h.yaw, h.pitch);
      };

      layer.appendChild(el);

      // Convert Pitch & Yaw to 3D Sphere Position
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

    const width = window.innerWidth;
    const height = window.innerHeight;
    const widthHalf = width / 2;
    const heightHalf = height / 2;

    activeHotspots.forEach(h => {
      const p = h.position.clone();
      p.project(camera);

      // Behind the camera check
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

  window.tourZoom = function (delta) {
    if (!camera) return;
    fov = Math.max(35, Math.min(100, fov + delta));
    camera.fov = fov;
    camera.updateProjectionMatrix();
  };

  window.tourWalkForward = function () {
    walkForward();
  };

  window.tourWalkBackward = function () {
    walkBackward();
  };

  // Keyboard navigation for walking (W / S / Up / Down / Backspace)
  window.addEventListener("keydown", (e) => {
    const modal = document.getElementById("tour-360-modal");
    if (!modal || modal.style.display === "none") return;

    if (e.code === "KeyW" || e.code === "ArrowUp") {
      e.preventDefault();
      walkForward();
    } else if (e.code === "KeyS" || e.code === "ArrowDown" || e.code === "Backspace") {
      e.preventDefault();
      walkBackward();
    } else if (e.code === "Escape") {
      window.close360Tour();
    }
  });

  window.tourToggleFullscreen = function () {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  };

  // Blockade Labs API Integration Modal Actions
  window.openBlockadeModal = function () {
    const m = document.getElementById("blockade-ai-modal");
    if (m) m.classList.add("active");
  };

  window.closeBlockadeModal = function () {
    const m = document.getElementById("blockade-ai-modal");
    if (m) m.classList.remove("active");
  };

  window.onAiEngineChange = function () {
    const engine = document.getElementById("ai-engine-select").value;
    const keyGroup = document.getElementById("blockade-key-group");
    const submitBtn = document.getElementById("blockade-submit-btn");

    if (engine === "pollinations") {
      if (keyGroup) keyGroup.style.display = "none";
      if (submitBtn) submitBtn.textContent = "🚀 360° Şəkli Pulsuz Generasiya Et";
    } else {
      if (keyGroup) keyGroup.style.display = "flex";
      if (submitBtn) submitBtn.textContent = "🚀 Blockade Labs ilə Generasiya Et";
    }
  };

  window.startAIGeneration = async function () {
    const engineSelect = document.getElementById("ai-engine-select");
    const engine = engineSelect ? engineSelect.value : "pollinations";

    if (engine === "blockade") {
      return startBlockadeGeneration();
    } else {
      return startPollinationsGeneration();
    }
  };

  async function startPollinationsGeneration() {
    const roomSelect = document.getElementById("blockade-room-select");
    const promptInput = document.getElementById("blockade-prompt-input");
    const progressBox = document.getElementById("blockade-progress-box");
    const statusText = document.getElementById("blockade-status-text");
    const progressBar = document.getElementById("blockade-progress-bar");
    const submitBtn = document.getElementById("blockade-submit-btn");

    const roomId = roomSelect.value;
    const userPrompt = promptInput.value.trim();
    const finalPrompt = `360 degree equirectangular panorama 2:1 ratio, ${userPrompt}, 8k, photorealistic architectural photography`;

    progressBox.style.display = "flex";
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.5";
    progressBar.style.width = "30%";
    statusText.textContent = "Pollinations AI (Flux) 360° şəkli render edir (tamamilə pulsuz)...";

    const seed = Math.floor(Math.random() * 999999);
    const encodedPrompt = encodeURIComponent(finalPrompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=2048&height=1024&nologo=true&seed=${seed}`;

    let progress = 30;
    const progressInterval = setInterval(() => {
      if (progress < 90) {
        progress += 10;
        progressBar.style.width = `${progress}%`;
      }
    }, 800);

    // Preload image
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      clearInterval(progressInterval);
      progressBar.style.width = "100%";
      statusText.textContent = "✅ Şəkil hazırdır! Otaq panoraması yenilənir...";

      APT_TOUR_CONFIG.rooms[roomId].image = imageUrl;

      setTimeout(() => {
        window.closeBlockadeModal();
        switchRoom(roomId);
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
        progressBox.style.display = "none";
      }, 800);
    };

    img.onerror = () => {
      clearInterval(progressInterval);
      statusText.textContent = "❌ Xəta baş verdi. Şəbəkə bağlantısını yoxlayın.";
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
      alert("Zəhmət olmasa Blockade Labs API açarını daxil edin!\n(https://skybox.blockadelabs.com/api)");
      return;
    }

    localStorage.setItem("BLOCKADE_API_KEY", apiKey);

    const roomId = roomSelect.value;
    const prompt = promptInput.value.trim();

    progressBox.style.display = "flex";
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.5";
    progressBar.style.width = "20%";
    statusText.textContent = "Blockade Labs Skybox sorğusu göndərilir (POST /skybox)...";

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
      if (!res.ok || data.error_message) {
        throw new Error(data.error_message || `Xəta kodu: ${res.status}`);
      }

      const reqId = data.id;
      progressBar.style.width = "40%";
      statusText.textContent = `Generasiya növbəyə alındı (ID: ${reqId}). Gözlənilir...`;

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

          if (status === "dispatched") {
            progressBar.style.width = "50%";
            statusText.textContent = "AI işçilərinə ötürüldü (Dispatched)...";
          } else if (status === "processing") {
            progressBar.style.width = "75%";
            statusText.textContent = "AI 360° fotonu render edir (Processing)...";
          } else if (status === "complete") {
            clearInterval(pollTimer);
            progressBar.style.width = "100%";
            statusText.textContent = "✅ Tamamlandı! Otaq panoraması yenilənir...";

            const fileUrl = req.file_url;
            APT_TOUR_CONFIG.rooms[roomId].image = fileUrl;

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
            throw new Error("Vaxt bitdi. Zəhmət olmasa bir az sonra yoxlayın.");
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
  };

  // Keyboard escape
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const bModal = document.getElementById("blockade-ai-modal");
      if (bModal && bModal.classList.contains("active")) {
        window.closeBlockadeModal();
        return;
      }
      const tModal = document.getElementById("tour-360-modal");
      if (tModal && tModal.classList.contains("active")) {
        window.close360Tour();
      }
    }
  });

})();
