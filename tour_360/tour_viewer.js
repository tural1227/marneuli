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
        yawOffset: 0,
        hotspots: [
          { target: "living", pitch: -4, yaw: 12, label: "Qonaq Otağı & Mətbəx 🛋️" },
          { target: "bedroom", pitch: -3, yaw: 96, label: "Yataq Otağı 🛏️" },
          { target: "bathroom", pitch: -4, yaw: -84, label: "Hamam Otağı 🚿" }
        ]
      },
      living: {
        id: "living",
        name: "Qonaq Otağı & Açıq Mətbəx",
        icon: "🛋️",
        image: "tour_360/apt_52/living.jpg",
        yawOffset: 0,
        hotspots: [
          { target: "hall", pitch: -4, yaw: 178, label: "Dəhlizə Qayıt 🚪" },
          { target: "balcony", pitch: -2, yaw: -28, label: "Eyvana (Balkona) Çıxış 🌿" }
        ]
      },
      bedroom: {
        id: "bedroom",
        name: "Əsas Yataq Otağı",
        icon: "🛏️",
        image: "tour_360/apt_52/bedroom.jpg",
        yawOffset: 0,
        hotspots: [
          { target: "hall", pitch: -4, yaw: 182, label: "Dəhlizə Qayıt 🚪" },
          { target: "balcony", pitch: -2, yaw: 42, label: "Eyvana Çıxış 🌿" }
        ]
      },
      bathroom: {
        id: "bathroom",
        name: "Hamam Otağı & Sanitar Qovşağı",
        icon: "🚿",
        image: "tour_360/apt_52/bathroom.jpg",
        yawOffset: 0,
        hotspots: [
          { target: "hall", pitch: -4, yaw: 180, label: "Dəhlizə Qayıt 🚪" }
        ]
      },
      balcony: {
        id: "balcony",
        name: "Mənzərəli Eyvan (Balkon - 4.5 m²)",
        icon: "🌿",
        image: "tour_360/apt_52/balcony.jpg",
        yawOffset: 0,
        hotspots: [
          { target: "living", pitch: -3, yaw: -140, label: "Qonaq Otağına Keçid 🛋️" },
          { target: "bedroom", pitch: -3, yaw: 140, label: "Yataq Otağına Keçid 🛏️" }
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

  // Initialize Tour HTML Elements
  function createTourDOMElements() {
    if (document.getElementById("tour-360-modal")) return;

    const modal = document.createElement("div");
    modal.id = "tour-360-modal";
    modal.innerHTML = `
      <div id="tour-360-canvas-container"></div>
      <div id="tour-hotspots-layer"></div>

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
            ✨ AI 360 Generator (Blockade Labs)
          </button>
          <button class="tour-btn tour-btn-close" onclick="window.close360Tour()" title="Bağla">
            ✕
          </button>
        </div>
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

  async function ensureThree() {
    if (window.THREE && window.THREE.Scene) return window.THREE;
    try {
      const mod = await import('three');
      window.THREE = mod;
      return mod;
    } catch (e) {
      console.warn("Dynamic import of 'three' failed, falling back to CDN script:", e);
      return new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.min.js';
        s.onload = () => resolve(window.THREE);
        s.onerror = reject;
        document.head.appendChild(s);
      });
    }
  }

  // Init Three.js Panorama Scene
  async function initThreeScene() {
    if (isTourInitialized) return;
    const THREE = await ensureThree();
    const container = document.getElementById("tour-360-canvas-container");
    if (!container || !THREE) return;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 1, 1100);
    camera.target = new THREE.Vector3(0, 0, 0);

    // Inverted sphere for 360 panorama projection
    const geometry = new THREE.SphereGeometry(500, 64, 40);
    geometry.scale(-1, 1, 1);

    const material = new THREE.MeshBasicMaterial({
      color: 0x222222,
      side: THREE.DoubleSide
    });

    sphereMesh = new THREE.Mesh(geometry, material);
    scene.add(sphereMesh);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
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
    phi = THREE.MathUtils.degToRad(90 - lat);
    theta = THREE.MathUtils.degToRad(lon);

    const x = 500 * Math.sin(phi) * Math.cos(theta);
    const y = 500 * Math.cos(phi);
    const z = 500 * Math.sin(phi) * Math.sin(theta);

    camera.lookAt(x, y, z);
    renderer.render(scene, camera);

    updateHotspotPositions();
  }

  // Switch Active Room
  function switchRoom(roomId, targetYaw = null) {
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

    // Reset or set angle
    if (targetYaw !== null) {
      lon = targetYaw;
      lat = 0;
    }

    // Show loading indicator
    const loader = document.getElementById("tour-loading-indicator");
    if (loader) loader.style.display = "flex";

    // Load Panorama Texture
    const T = window.THREE;
    if (!textureLoader && T) {
      textureLoader = new T.TextureLoader();
    }
    if (!textureLoader || !T) return;

    textureLoader.load(
      room.image,
      (texture) => {
        texture.mapping = T.EquirectangularReflectionMapping;
        texture.minFilter = T.LinearFilter;
        texture.magFilter = T.LinearFilter;
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

  // Render Doorway / Transition Hotspots
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
        <div class="tour-hotspot-pin">➤</div>
        <div class="tour-hotspot-label">${h.label}</div>
      `;
      el.onclick = (e) => {
        e.stopPropagation();
        switchRoom(h.target, h.yaw ? h.yaw + 180 : 0);
      };

      layer.appendChild(el);

      // Convert Pitch & Yaw to 3D Sphere Position
      const phi = THREE.MathUtils.degToRad(90 - h.pitch);
      const theta = THREE.MathUtils.degToRad(h.yaw);
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
  window.open360Tour = async function (aptNumber) {
    createTourDOMElements();
    const modal = document.getElementById("tour-360-modal");
    if (!modal) return;

    modal.classList.add("active");
    modal.style.display = "flex";
    modal.style.opacity = "1";
    document.body.style.overflow = "hidden";

    await initThreeScene();
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
