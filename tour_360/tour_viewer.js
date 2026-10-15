// ============================================================================
// 🏢 MARNEULI RESIDENCE — 360° INTERACTIVE APARTMENT VIRTUAL TOUR
// Realistic Walk Physics, Cohesive 3D Architectural Set & Zero Distortion
// ============================================================================

(function () {
  // Main Room Categories for Marneuli Residence, Apartment 52 (Floor 5, 68.6 m²)
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
        defaultSpot: "entry"
      },
      living: {
        id: "living",
        name: "Qonaq Otağı & Açıq Mətbəx",
        icon: "🛋️",
        defaultSpot: "living_1"
      },
      bedroom: {
        id: "bedroom",
        name: "Əsas Yataq Otağı",
        icon: "🛏️",
        defaultSpot: "bedroom_1"
      },
      bathroom: {
        id: "bathroom",
        name: "Hamam & Sanitar Qovşağı",
        icon: "🚿",
        defaultSpot: "bath_1"
      },
      balcony: {
        id: "balcony",
        name: "Mənzərəli Eyvan (Balkon)",
        icon: "🌿",
        defaultSpot: "balcony"
      }
    }
  };

  // Full 3D Coordinate Network of Viewpoints across Apartment 52 (in centimeters)
  const SPOTS = {
    entry: {
      id: "entry",
      room: "hall",
      label: "Dəhliz & Giriş Qapısı",
      image: "tour_360/apt_52/entry.jpg",
      x: -470, y: 320, z: 160,
      initialYaw: -0.2
    },
    living_1: {
      id: "living_1",
      room: "living",
      label: "Qonaq Otağı (Yemək Masası)",
      image: "tour_360/apt_52/living_1.jpg",
      x: -150, y: 330, z: 160,
      initialYaw: 1.5
    },
    living_2: {
      id: "living_2",
      room: "living",
      label: "Qonaq Otağı (Pəncərə & Eyvan Önü)",
      image: "tour_360/apt_52/living_2.jpg",
      x: -140, y: -30, z: 160,
      initialYaw: 3.1
    },
    living_3: {
      id: "living_3",
      room: "living",
      label: "Qonaq Otağı (Divan & Konsol)",
      image: "tour_360/apt_52/living_3.jpg",
      x: -345, y: 300, z: 160,
      initialYaw: 1.8
    },
    kitchen_1: {
      id: "kitchen_1",
      room: "living",
      label: "Açıq Mətbəx Zonası",
      image: "tour_360/apt_52/kitchen_1.jpg",
      x: 100, y: 150, z: 160,
      initialYaw: -1.2
    },
    bedroom_1: {
      id: "bedroom_1",
      room: "bedroom",
      label: "Əsas Yataq Otağı (Giriş)",
      image: "tour_360/apt_52/bedroom_1.jpg",
      x: 400, y: 200, z: 160,
      initialYaw: 0.8
    },
    bedroom_2: {
      id: "bedroom_2",
      room: "bedroom",
      label: "Yataq Otağı (Qarderob & Şkaf)",
      image: "tour_360/apt_52/bedroom_2.jpg",
      x: 640, y: 200, z: 160,
      initialYaw: 2.2
    },
    bedroom_3: {
      id: "bedroom_3",
      room: "bedroom",
      label: "Yataq Otağı (Çarpayı Yanı)",
      image: "tour_360/apt_52/bedroom_3.jpg",
      x: 400, y: 80, z: 160,
      initialYaw: 1.0
    },
    bath_1: {
      id: "bath_1",
      room: "bathroom",
      label: "Sanitar Qovşaq (Giriş)",
      image: "tour_360/apt_52/bath_1.jpg",
      x: 150, y: 330, z: 160,
      initialYaw: -1.8
    },
    bath_2: {
      id: "bath_2",
      room: "bathroom",
      label: "Sanitar Qovşaq (Moydadır & Güzgü)",
      image: "tour_360/apt_52/bath_2.jpg",
      x: 110, y: 370, z: 160,
      initialYaw: -2.4
    },
    balcony: {
      id: "balcony",
      room: "balcony",
      label: "Mənzərəli Eyvan (Balkon)",
      image: "tour_360/apt_52/balcony.jpg",
      x: -140, y: -260, z: 160,
      initialYaw: 0.0
    }
  };

  // Navigable Walkable Graph between Spots
  const SPOT_LINKS = {
    entry: ["living_3", "living_1", "bath_1"],
    living_1: ["living_2", "living_3", "entry"],
    living_2: ["living_1", "living_3", "kitchen_1", "balcony"],
    living_3: ["living_1", "living_2", "entry"],
    kitchen_1: ["living_2", "bath_1", "bedroom_1"],
    bedroom_1: ["kitchen_1", "bedroom_2", "bedroom_3", "balcony"],
    bedroom_2: ["bedroom_1", "bedroom_3"],
    bedroom_3: ["bedroom_1", "bedroom_2"],
    bath_1: ["kitchen_1", "bath_2", "entry"],
    bath_2: ["bath_1"],
    balcony: ["living_2", "bedroom_1"]
  };

  let scene, camera, renderer, sphereMesh;
  let currentSpotId = "entry";
  let currentRoomId = "hall";
  let yaw = 0, pitch = 0;
  let isUserInteracting = false;
  let dragStart = { x: 0, y: 0, yaw: 0, pitch: 0 };
  let hasMoved = false;
  let textureLoader = null;
  let isTourInitialized = false;
  let fov = 60; // 60° natural architectural FOV — straight vertical walls, zero circular well distortion
  let isTransitioning = false;
  let markersGroup = null;
  let raycaster = null;
  let mouse = null;
  let roomHistory = [];

  // Walking Physics State inside Room
  let camOffset = { x: 0, y: 0, z: 0 };
  let targetCamOffset = { x: 0, y: 0, z: 0 };
  let walkBobPhase = 0;
  let currentBob = 0;
  let activeHotspots = [];

  // Create UI DOM
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
        <button class="tour-walk-btn" onclick="window.tourWalkForward()" title="Otağın içində önə addımla (W / ↑)">
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
        <div style="font-size: 13px; font-weight: 600;">Otaq Yüklənir...</div>
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
      tab.innerHTML = `<span>${r.icon}</span> <span>${r.name}</span>`;
      tab.onclick = () => switchRoom(r.id);
      tabsContainer.appendChild(tab);
    });

    const savedKey = localStorage.getItem("BLOCKADE_API_KEY");
    if (savedKey) {
      const keyInput = document.getElementById("blockade-api-key-input");
      if (keyInput) keyInput.value = savedKey;
    }
  }

  // Initialize Three.js Scene
  function initThreeScene() {
    if (isTourInitialized) return;
    const THREE = window.THREE;
    const container = document.getElementById("tour-360-canvas-container");
    if (!container || !THREE) {
      console.warn("Three.js not ready:", { THREE, container });
      return;
    }

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.rotation.order = "YXZ";

    // 360 Panoramic Sphere
    const sphereGeo = new THREE.SphereGeometry(60, 96, 64);
    sphereGeo.scale(-1, 1, 1);
    const sphereMat = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
    sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    sphereMesh.rotation.y = -Math.PI / 2; // Matches 3D plan coordinates
    scene.add(sphereMesh);

    // Interactive 3D Floor Markers
    markersGroup = new THREE.Group();
    scene.add(markersGroup);

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    textureLoader = new THREE.TextureLoader();

    // Interaction Listeners
    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    container.addEventListener("wheel", onDocumentMouseWheel, { passive: false });
    window.addEventListener("resize", onWindowResize);

    isTourInitialized = true;
    startRenderLoop();
  }

  function onPointerDown(e) {
    isUserInteracting = true;
    hasMoved = false;
    dragStart = { x: e.clientX, y: e.clientY, yaw, pitch };
  }

  function onPointerMove(e) {
    if (!isUserInteracting) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    if (Math.abs(dx) + Math.abs(dy) > 5) hasMoved = true;
    yaw = dragStart.yaw + dx * 0.0035;
    pitch = Math.max(-1.3, Math.min(1.3, dragStart.pitch + dy * 0.0035));
  }

  function onPointerUp(e) {
    if (isUserInteracting && !hasMoved && markersGroup) {
      // Check click on 3D floor markers
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(markersGroup.children, true);
      if (intersects.length > 0) {
        let obj = intersects[0].object;
        while (obj && !obj.userData.spotId && obj.parent) {
          obj = obj.parent;
        }
        if (obj && obj.userData.spotId) {
          walkToSpot(obj.userData.spotId);
        }
      }
    }
    isUserInteracting = false;
  }

  function onDocumentMouseWheel(e) {
    e.preventDefault();
    fov = Math.max(42, Math.min(70, fov + e.deltaY * 0.035));
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
    updateHotspotPins();
  }

  // Animation Loop with Real-time Walking Physics
  function startRenderLoop() {
    function animate() {
      requestAnimationFrame(animate);

      // Smooth camera position damping for physical walk
      camOffset.x += (targetCamOffset.x - camOffset.x) * 0.15;
      camOffset.z += (targetCamOffset.z - camOffset.z) * 0.15;
      currentBob += ((Math.sin(walkBobPhase) * 0.04) - currentBob) * 0.2;

      if (camera) {
        camera.rotation.set(0, 0, 0);
        camera.rotateY(yaw);
        camera.rotateX(pitch);
        camera.position.set(camOffset.x, currentBob, camOffset.z);
      }

      // Animate floor markers pulsing ring
      if (markersGroup) {
        const t = performance.now() / 250;
        markersGroup.children.forEach(m => {
          m.scale.setScalar(1 + 0.06 * Math.sin(t));
        });
      }

      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }

      updateHotspotPins();
    }

    animate();
  }

  // Build 3D Floor Navigation Markers
  function rebuildFloorMarkers(spotId) {
    if (!markersGroup || !window.THREE) return;
    markersGroup.clear();

    const here = SPOTS[spotId];
    if (!here) return;

    const THREE = window.THREE;
    const ringGeo = new THREE.RingGeometry(0.24, 0.36, 48);
    ringGeo.rotateX(-Math.PI / 2);
    const discGeo = new THREE.CircleGeometry(0.24, 48);
    discGeo.rotateX(-Math.PI / 2);

    const neighborIds = SPOT_LINKS[spotId] || [];
    neighborIds.forEach(nid => {
      const target = SPOTS[nid];
      if (!target) return;

      const dx = (target.x - here.x) / 100;
      const dz = (target.y - here.y) / 100;

      const group = new THREE.Group();
      group.position.set(dx, -1.55, dz);
      group.userData = { spotId: nid, label: target.label };

      // Cyan / Aqua Glowing Floor Ring
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.9,
        depthTest: false
      });
      const discMat = new THREE.MeshBasicMaterial({
        color: 0x0284c7,
        transparent: true,
        opacity: 0.35,
        depthTest: false
      });

      group.add(new THREE.Mesh(ringGeo, ringMat));
      group.add(new THREE.Mesh(discGeo, discMat));
      markersGroup.add(group);
    });

    rebuildHotspotPins(spotId);
  }

  // Build Minimalist 2D/3D Doorway Pins
  function rebuildHotspotPins(spotId) {
    const layer = document.getElementById("tour-hotspots-layer");
    if (!layer) return;
    layer.innerHTML = "";
    activeHotspots = [];

    const here = SPOTS[spotId];
    if (!here) return;

    const neighborIds = SPOT_LINKS[spotId] || [];
    neighborIds.forEach(nid => {
      const target = SPOTS[nid];
      if (!target) return;

      // Only show doorway pins when changing rooms or major areas
      if (target.room !== here.room) {
        const dx = (target.x - here.x) / 100;
        const dz = (target.y - here.y) / 100;

        const el = document.createElement("div");
        el.className = "tour-hotspot";
        el.innerHTML = `
          <div class="tour-hotspot-pin" title="${target.label}">
            <div class="tour-hotspot-ripple"></div>
            <svg class="tour-hotspot-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        `;
        el.onclick = (e) => {
          e.stopPropagation();
          walkToSpot(nid);
        };
        layer.appendChild(el);

        const pos = new THREE.Vector3(dx, -0.1, dz);
        activeHotspots.push({ element: el, position: pos });
      }
    });

    updateHotspotPins();
  }

  function updateHotspotPins() {
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

  // Switch Room Category (via tabs or exterior)
  function switchRoom(roomId) {
    const room = APT_TOUR_CONFIG.rooms[roomId];
    if (!room) return;
    const targetSpotId = room.defaultSpot || "entry";
    walkToSpot(targetSpotId);
  }

  // Go to Spot with Human-Like Doorway Glide & Transition
  function walkToSpot(targetSpotId) {
    if (isTransitioning) return;
    const nextSpot = SPOTS[targetSpotId];
    if (!nextSpot) return;

    const here = SPOTS[currentSpotId];
    if (here && here.room !== nextSpot.room) {
      roomHistory.push(currentSpotId);
    }

    isTransitioning = true;
    const flashEl = document.getElementById("tour-walk-flash");
    const loader = document.getElementById("tour-loading-indicator");

    // Smooth doorway walk-through animation
    if (flashEl) flashEl.style.opacity = "0.7";

    const imgUrl = nextSpot.image + "?v=20261015_clean360";

    textureLoader.load(
      imgUrl,
      (texture) => {
        texture.mapping = window.THREE.UVMapping;
        texture.colorSpace = window.THREE.SRGBColorSpace;
        texture.minFilter = window.THREE.LinearFilter;
        texture.magFilter = window.THREE.LinearFilter;

        if (sphereMesh && sphereMesh.material) {
          sphereMesh.material.map = texture;
          sphereMesh.material.needsUpdate = true;
        }

        currentSpotId = targetSpotId;
        currentRoomId = nextSpot.room;

        // Reset walk offset at the new center
        targetCamOffset = { x: 0, y: 0, z: 0 };
        camOffset = { x: 0, y: 0, z: 0 };
        walkBobPhase = 0;

        // Update Header and Tabs
        const roomConf = APT_TOUR_CONFIG.rooms[currentRoomId];
        const titleEl = document.getElementById("tour-room-title");
        if (titleEl && roomConf) {
          titleEl.innerHTML = `<strong>${APT_TOUR_CONFIG.title}</strong> &bull; <span style="color:#60a5fa;">${roomConf.name}</span> &bull; <span style="color:#94a3b8; font-size:12px;">${nextSpot.label}</span>`;
        }

        document.querySelectorAll(".tour-room-tab").forEach(tab => tab.classList.remove("active"));
        const activeTab = document.getElementById(`tour-tab-${currentRoomId}`);
        if (activeTab) activeTab.classList.add("active");

        rebuildFloorMarkers(currentSpotId);

        setTimeout(() => {
          if (flashEl) flashEl.style.opacity = "0";
          if (loader) loader.style.display = "none";
          isTransitioning = false;
        }, 180);
      },
      undefined,
      (err) => {
        console.error("Texture error:", err);
        if (flashEl) flashEl.style.opacity = "0";
        if (loader) loader.style.display = "none";
        isTransitioning = false;
      }
    );
  }

  // PHYSICAL WALKING INSIDE ROOM (W / Up Arrow / Button)
  // Does NOT immediately kick you out — you physically walk across the floor inside the room!
  function walkForward() {
    if (isTransitioning) return;
    const here = SPOTS[currentSpotId];
    if (!here) return;

    // Forward direction from current camera yaw
    const forwardX = -Math.sin(yaw);
    const forwardZ = -Math.cos(yaw);

    // Human step size: 42 cm
    const stepDist = 0.42;
    const newTargetX = targetCamOffset.x + forwardX * stepDist;
    const newTargetZ = targetCamOffset.z + forwardZ * stepDist;

    walkBobPhase += Math.PI;

    // Check if step approaches an adjacent doorway or connected spot
    const simWorldX = here.x + newTargetX * 100;
    const simWorldY = here.y + newTargetZ * 100;

    const neighbors = SPOT_LINKS[currentSpotId] || [];
    let closestNeighbor = null;
    let minDist = Infinity;

    neighbors.forEach(nid => {
      const q = SPOTS[nid];
      if (!q) return;
      const d = Math.hypot(q.x - simWorldX, q.y - simWorldY);
      if (d < minDist) {
        minDist = d;
        closestNeighbor = nid;
      }
    });

    // If within 85 cm of the neighbor spot (door threshold): step through!
    if (minDist < 85 && closestNeighbor) {
      walkToSpot(closestNeighbor);
      return;
    }

    // Inside-room perimeter check (stay within realistic room boundary ~1.7 meters from spot)
    const offsetDist = Math.hypot(newTargetX, newTargetZ);
    if (offsetDist > 1.7) {
      // Reached room wall/boundary — gently clamp position
      const scale = 1.7 / offsetDist;
      targetCamOffset.x = newTargetX * scale;
      targetCamOffset.z = newTargetZ * scale;
    } else {
      targetCamOffset.x = newTargetX;
      targetCamOffset.z = newTargetZ;
    }
  }

  // PHYSICAL WALKING BACKWARD INSIDE ROOM (S / Down Arrow / Button)
  function walkBackward() {
    if (isTransitioning) return;
    const here = SPOTS[currentSpotId];
    if (!here) return;

    const forwardX = -Math.sin(yaw);
    const forwardZ = -Math.cos(yaw);

    const stepDist = 0.40;
    const newTargetX = targetCamOffset.x - forwardX * stepDist;
    const newTargetZ = targetCamOffset.z - forwardZ * stepDist;

    walkBobPhase += Math.PI;

    const simWorldX = here.x + newTargetX * 100;
    const simWorldY = here.y + newTargetZ * 100;

    const neighbors = SPOT_LINKS[currentSpotId] || [];
    let closestNeighbor = null;
    let minDist = Infinity;

    neighbors.forEach(nid => {
      const q = SPOTS[nid];
      if (!q) return;
      const d = Math.hypot(q.x - simWorldX, q.y - simWorldY);
      if (d < minDist) {
        minDist = d;
        closestNeighbor = nid;
      }
    });

    // If stepped back near the entrance doorway / previous spot: step through
    if (minDist < 85 && closestNeighbor) {
      walkToSpot(closestNeighbor);
      return;
    }

    const offsetDist = Math.hypot(newTargetX, newTargetZ);
    if (offsetDist > 1.7) {
      const scale = 1.7 / offsetDist;
      targetCamOffset.x = newTargetX * scale;
      targetCamOffset.z = newTargetZ * scale;
    } else {
      targetCamOffset.x = newTargetX;
      targetCamOffset.z = newTargetZ;
    }
  }

  // Strafe Left (A)
  function strafeLeft() {
    const leftX = -Math.cos(yaw);
    const leftZ = Math.sin(yaw);
    const stepDist = 0.35;
    targetCamOffset.x += leftX * stepDist;
    targetCamOffset.z += leftZ * stepDist;
    walkBobPhase += Math.PI * 0.8;
  }

  // Strafe Right (D)
  function strafeRight() {
    const rightX = Math.cos(yaw);
    const rightZ = -Math.sin(yaw);
    const stepDist = 0.35;
    targetCamOffset.x += rightX * stepDist;
    targetCamOffset.z += rightZ * stepDist;
    walkBobPhase += Math.PI * 0.8;
  }

  // Keyboard navigation
  window.addEventListener("keydown", (e) => {
    const modal = document.getElementById("tour-360-modal");
    if (!modal || modal.style.display === "none") return;

    if (e.code === "KeyW" || e.code === "ArrowUp") {
      e.preventDefault();
      walkForward();
    } else if (e.code === "KeyS" || e.code === "ArrowDown") {
      e.preventDefault();
      walkBackward();
    } else if (e.code === "KeyA") {
      e.preventDefault();
      strafeLeft();
    } else if (e.code === "KeyD") {
      e.preventDefault();
      strafeRight();
    } else if (e.code === "Escape") {
      const bModal = document.getElementById("blockade-ai-modal");
      if (bModal && bModal.classList.contains("active")) {
        window.closeBlockadeModal();
        return;
      }
      window.close360Tour();
    }
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
    walkToSpot("entry");
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

  // Blockade / AI Modal Actions
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

      const targetSpot = APT_TOUR_CONFIG.rooms[roomId].defaultSpot;
      if (SPOTS[targetSpot]) {
        SPOTS[targetSpot].image = imageUrl;
      }

      setTimeout(() => {
        window.closeBlockadeModal();
        walkToSpot(targetSpot);
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
            const targetSpot = APT_TOUR_CONFIG.rooms[roomId].defaultSpot;
            if (SPOTS[targetSpot]) {
              SPOTS[targetSpot].image = fileUrl;
            }

            setTimeout(() => {
              window.closeBlockadeModal();
              walkToSpot(targetSpot);
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
