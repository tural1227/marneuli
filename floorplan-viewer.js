// ============================================================================
// 🏢 MARNEULI RESIDENCE — INTERACTIVE 2D FLOOR PLAN & APARTMENT MAP VIEWER
// ============================================================================

(function () {
  let activeFloorNum = 2;
  let activeApt = null;
  let zoom = 1.0;
  let panX = 0;
  let panY = 0;
  let isPanning = false;
  let startX = 0;
  let startY = 0;

  // Wait for DOM
  window.addEventListener('DOMContentLoaded', () => {
    initFloorPlanUI();
  });

  function initFloorPlanUI() {
    const tabsContainer = document.getElementById('fp-tabs');
    if (!tabsContainer || !window.FLOORS_DATA) return;

    // Create Floor Selector Tabs (Floors 2 to 12)
    tabsContainer.innerHTML = '';
    window.FLOORS_DATA.forEach(f => {
      const btn = document.createElement('button');
      btn.className = `fp-tab-btn ${f.floor === activeFloorNum ? 'active' : ''}`;
      btn.id = `fp-tab-${f.floor}`;
      btn.innerHTML = `<strong>${f.floor}</strong>-ci Mərtəbə`;
      btn.onclick = () => selectFloorPlan(f.floor);
      tabsContainer.appendChild(btn);
    });

    // Pan & Zoom listeners on viewport
    const viewport = document.getElementById('fp-viewport');
    if (viewport) {
      viewport.addEventListener('wheel', onWheelZoom, { passive: false });
      viewport.addEventListener('mousedown', onPanStart);
      window.addEventListener('mousemove', onPanMove);
      window.addEventListener('mouseup', onPanEnd);

      // Touch events for mobile/tablet
      viewport.addEventListener('touchstart', onTouchStart, { passive: false });
      viewport.addEventListener('touchmove', onTouchMove, { passive: false });
      viewport.addEventListener('touchend', onTouchEnd);
    }

    // Keyboard shortcuts
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const modal = document.getElementById('floorplan-modal');
        if (modal && modal.classList.contains('active')) {
          const drawer = document.getElementById('fp-drawer');
          if (drawer && drawer.classList.contains('active')) {
            closeAptDrawer();
          } else {
            closeFloorPlanModal();
          }
        }
      }
      if ((e.key === 'm' || e.key === 'M' || e.key === 'p' || e.key === 'P') && !e.target.matches('input, textarea')) {
        const modal = document.getElementById('floorplan-modal');
        if (modal && !modal.classList.contains('active')) {
          openFloorPlanModal(window.currentSelectedFloorId || 2);
        }
      }
    });
  }

  window.openFloorPlanModal = function (floorId) {
    if (!window.FLOORS_DATA) return;
    const modal = document.getElementById('floorplan-modal');
    if (!modal) return;

    // Determine target floor (valid floor between 2 and 12)
    let fNum = parseInt(floorId, 10);
    if (isNaN(fNum) || fNum < 2 || fNum > 12) {
      fNum = 2;
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    selectFloorPlan(fNum);
  };

  window.closeFloorPlanModal = function () {
    const modal = document.getElementById('floorplan-modal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
    closeAptDrawer();
    const tooltip = document.getElementById('fp-tooltip');
    if (tooltip) tooltip.classList.remove('visible');
  };

  window.selectFloorPlan = function (floorNum) {
    activeFloorNum = floorNum;
    closeAptDrawer();
    fpResetZoom();

    // Update tab styles
    document.querySelectorAll('.fp-tab-btn').forEach(btn => {
      if (btn.id === `fp-tab-${floorNum}`) btn.classList.add('active');
      else btn.classList.remove('active');
    });

    const floorData = window.FLOORS_DATA.find(f => f.floor === floorNum);
    if (!floorData) return;

    // Update Header / Subtitle
    const titleEl = document.getElementById('fp-title');
    const subtitleEl = document.getElementById('fp-subtitle');
    if (titleEl) titleEl.textContent = `MARNEULI RESIDENCE — ${floorData.title.toUpperCase()}`;
    if (subtitleEl) subtitleEl.textContent = `${floorData.subtitle} • Sahələr və mənzil eskizləri`;

    // Update Blueprint Image
    const imgEl = document.getElementById('fp-img');
    if (imgEl) {
      imgEl.src = floorData.image_webp || floorData.image;
      imgEl.onerror = () => { imgEl.src = floorData.image_fallback || floorData.image; };
    }

    // Update Bottom Metrics
    const statFloor = document.getElementById('fp-stat-floor');
    const statApts = document.getElementById('fp-stat-apts');
    const statRes = document.getElementById('fp-stat-res');
    const statCorr = document.getElementById('fp-stat-corr');
    const statK2 = document.getElementById('fp-stat-k2');

    if (statFloor) statFloor.textContent = floorData.title;
    if (statApts) statApts.textContent = `${floorData.apt_count} Mənzil`;
    if (statRes) statRes.textContent = floorData.residential_area || '1190.4 m²';
    if (statCorr) statCorr.textContent = floorData.corridor_area || '153.4 m²';
    if (statK2) statK2.textContent = floorData.k2_coefficient || '1540.2 m²';

    // Render Apartment Interactive Badges
    const markersContainer = document.getElementById('fp-markers-container');
    if (!markersContainer) return;
    markersContainer.innerHTML = '';

    floorData.apartments.forEach(apt => {
      const marker = document.createElement('div');
      marker.className = 'apt-marker';
      marker.id = `apt-marker-${apt.number}`;
      marker.style.left = `${apt.x_pct}%`;
      marker.style.top = `${apt.y_pct}%`;
      marker.innerHTML = `<span class="apt-marker-num">${apt.number}</span>`;

      // Hover events
      marker.addEventListener('mouseenter', (e) => showAptTooltip(e, apt, floorData));
      marker.addEventListener('mousemove', (e) => moveAptTooltip(e));
      marker.addEventListener('mouseleave', hideAptTooltip);

      // Click to open detailed drawer
      marker.addEventListener('click', (e) => {
        e.stopPropagation();
        selectApartment(apt, floorData);
      });

      markersContainer.appendChild(marker);
    });
  };

  // Tooltip
  function showAptTooltip(e, apt, floorData) {
    const tooltip = document.getElementById('fp-tooltip');
    if (!tooltip) return;

    let areaHtml = '';
    if (apt.apt_area) {
      areaHtml += `<div class="fp-tt-row"><span>Yaşayış Sahəsi:</span><strong>${apt.apt_area}</strong></div>`;
    }
    if (apt.gross_area) {
      areaHtml += `<div class="fp-tt-row"><span>Ümumi Sahə:</span><strong>${apt.gross_area}</strong></div>`;
    }
    if (apt.balcony_area) {
      areaHtml += `<div class="fp-tt-row"><span>Balkon Sahəsi:</span><strong>${apt.balcony_area}</strong></div>`;
    }
    if (apt.terrace_area) {
      areaHtml += `<div class="fp-tt-row"><span>Terras Sahəsi:</span><strong>${apt.terrace_area}</strong></div>`;
    }

    tooltip.innerHTML = `
      <div class="fp-tt-header">
        <span class="fp-tt-badge">MƏNZİL № ${apt.number}</span>
        <span class="fp-tt-status">🟢 Satışda</span>
      </div>
      <div class="fp-tt-rooms">${apt.rooms}</div>
      <div class="fp-tt-floor">${floorData.title}</div>
      <div class="fp-tt-divider"></div>
      ${areaHtml}
      <div class="fp-tt-hint">Detallı baxmaq üçün klikləyin ➔</div>
    `;

    tooltip.classList.add('visible');
    moveAptTooltip(e);
  }

  function moveAptTooltip(e) {
    const tooltip = document.getElementById('fp-tooltip');
    if (!tooltip || !tooltip.classList.contains('visible')) return;

    const pad = 16;
    let x = e.clientX + pad;
    let y = e.clientY + pad;

    const rect = tooltip.getBoundingClientRect();
    if (x + rect.width > window.innerWidth - pad) {
      x = e.clientX - rect.width - pad;
    }
    if (y + rect.height > window.innerHeight - pad) {
      y = e.clientY - rect.height - pad;
    }

    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
  }

  function hideAptTooltip() {
    const tooltip = document.getElementById('fp-tooltip');
    if (tooltip) tooltip.classList.remove('visible');
  }

  // Apartment Selection & Drawer
  function selectApartment(apt, floorData) {
    activeApt = apt;
    document.querySelectorAll('.apt-marker').forEach(m => m.classList.remove('active'));
    const activeMarker = document.getElementById(`apt-marker-${apt.number}`);
    if (activeMarker) activeMarker.classList.add('active');

    const drawer = document.getElementById('fp-drawer');
    const drawerNum = document.getElementById('fp-drawer-num');
    const drawerBody = document.getElementById('fp-drawer-body');
    if (!drawer || !drawerBody) return;

    if (drawerNum) drawerNum.textContent = `MƏNZİL № ${apt.number}`;

    const waText = encodeURIComponent(`Salam, Marneuli Residence layihəsində ${floorData.title}, ${apt.number}-ci mənzil haqqında ətraflı məlumat almaq istəyirəm.`);
    const waUrl = `https://wa.me/?text=${waText}`;

    drawerBody.innerHTML = `
      <div class="fp-dw-card">
        <div class="fp-dw-type">${apt.rooms}</div>
        <div class="fp-dw-location">🏢 ${floorData.title} &bull; Mənzil № ${apt.number}</div>
        <div class="fp-dw-status">🟢 Satışda Mövcuddur</div>
      </div>

      <div class="fp-dw-specs">
        <div class="fp-dw-spec-row">
          <span>Yaşayış Sahəsi:</span>
          <strong>${apt.apt_area || 'Məlumata baxın'}</strong>
        </div>
        ${apt.gross_area ? `
        <div class="fp-dw-spec-row">
          <span>Ümumi Sahə (Gross):</span>
          <strong>${apt.gross_area}</strong>
        </div>` : ''}
        ${apt.balcony_area ? `
        <div class="fp-dw-spec-row">
          <span>Balkon Sahəsi:</span>
          <strong>${apt.balcony_area}</strong>
        </div>` : ''}
        ${apt.terrace_area ? `
        <div class="fp-dw-spec-row">
          <span>Terras Sahəsi:</span>
          <strong>${apt.terrace_area}</strong>
        </div>` : ''}
        <div class="fp-dw-spec-row">
          <span>Tavan Hündürlüyü:</span>
          <strong>3.30 metr</strong>
        </div>
        <div class="fp-dw-spec-row">
          <span>Mənzərə:</span>
          <strong>Daxili Park &amp; Şəhər</strong>
        </div>
      </div>

      <div class="fp-dw-actions">
        <a href="${waUrl}" target="_blank" class="fp-dw-btn fp-dw-btn-wa">
          💬 WhatsApp ilə Maraqlan
        </a>
        <button class="fp-dw-btn fp-dw-btn-close" onclick="closeFloorPlanModal()">
          🏢 3D Modeldə Bax
        </button>
      </div>
    `;

    drawer.classList.add('active');
    hideAptTooltip();
  }

  window.closeAptDrawer = function () {
    const drawer = document.getElementById('fp-drawer');
    if (drawer) drawer.classList.remove('active');
    document.querySelectorAll('.apt-marker').forEach(m => m.classList.remove('active'));
    activeApt = null;
  };

  // Pan & Zoom Implementation
  function updateCanvasTransform() {
    const canvas = document.getElementById('fp-canvas');
    if (!canvas) return;
    canvas.style.transform = `translate(${panX}px, ${panY}px) scale(${zoom})`;
  }

  window.fpZoom = function (delta) {
    zoom = Math.min(Math.max(zoom + delta, 0.7), 3.0);
    updateCanvasTransform();
  };

  window.fpResetZoom = function () {
    zoom = 1.0;
    panX = 0;
    panY = 0;
    updateCanvasTransform();
  };

  function onWheelZoom(e) {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.15 : -0.15;
    const oldZoom = zoom;
    zoom = Math.min(Math.max(zoom + delta, 0.7), 3.0);

    // Zoom around cursor position
    const viewport = document.getElementById('fp-viewport');
    const rect = viewport.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    const ratio = zoom / oldZoom;
    panX = mouseX - (mouseX - panX) * ratio;
    panY = mouseY - (mouseY - panY) * ratio;

    updateCanvasTransform();
  }

  function onPanStart(e) {
    if (e.target.closest('.apt-marker, #fp-tooltip, #fp-drawer')) return;
    isPanning = true;
    startX = e.clientX - panX;
    startY = e.clientY - panY;
    const viewport = document.getElementById('fp-viewport');
    if (viewport) viewport.style.cursor = 'grabbing';
  }

  function onPanMove(e) {
    if (!isPanning) return;
    panX = e.clientX - startX;
    panY = e.clientY - startY;
    updateCanvasTransform();
  }

  function onPanEnd() {
    isPanning = false;
    const viewport = document.getElementById('fp-viewport');
    if (viewport) viewport.style.cursor = 'grab';
  }

  // Touch Support
  let touchStartDist = 0;
  function onTouchStart(e) {
    if (e.touches.length === 1) {
      if (e.target.closest('.apt-marker, #fp-drawer')) return;
      isPanning = true;
      startX = e.touches[0].clientX - panX;
      startY = e.touches[0].clientY - panY;
    } else if (e.touches.length === 2) {
      touchStartDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
    }
  }

  function onTouchMove(e) {
    if (e.touches.length === 1 && isPanning) {
      panX = e.touches[0].clientX - startX;
      panY = e.touches[0].clientY - startY;
      updateCanvasTransform();
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      if (touchStartDist > 0) {
        const factor = dist / touchStartDist;
        zoom = Math.min(Math.max(zoom * factor, 0.7), 3.0);
        touchStartDist = dist;
        updateCanvasTransform();
      }
    }
  }

  function onTouchEnd() {
    isPanning = false;
    touchStartDist = 0;
  }
})();
