# 🏢 PREMIUM PARK RESIDENCE 3D Architectural Viewer

Photorealistic WebGL & Three.js 3D architectural visualization platform for the **PREMIUM PARK RESIDENCE** residential complex.

🌐 **Live Demo**: [https://tural1227.github.io/marneuli/](https://tural1227.github.io/marneuli/)
📦 **Repository**: [https://github.com/tural1227/marneuli](https://github.com/tural1227/marneuli)

---

## ✨ Features

- **PBR Architectural Materials**: Neoclassical limestone travertine facade, rustic ashlar commercial base, zinc/slate mansard roofs, high-performance solar glazing, and asphalt roadways.
- **Realistic Landscape & Courtyards**: Seamless lawn turf grass with procedural planar UV mapping, lush foliage, timber pergolas, and outdoor recreation areas (chess and table tennis).
- **Vehicles & Infrastructure**: Metallic sapphire blue and pearl white vehicles, dark asphalt roads with painted arrows and zebra pedestrian crossings.
- **Multi-Perspective Views**: Instant camera transitions for Facade, Courtyard Garden, Bird's Eye (Aerial), and Street Avenue.
- **Interaction Modes**: Full 360° Orbit camera and WASD First-Person Walkthrough mode.
- **High Performance**: Optimized 60 FPS rendering with Three.js ACESFilmic tone mapping, balanced shadow/lighting pipeline, and Draco mesh compression support.

---

## 🎮 Controls

| Action | Control |
|---|---|
| **Rotate Scene** | Left Click + Drag |
| **Pan Camera** | Right Click + Drag |
| **Zoom In / Out** | Mouse Wheel (Scroll) |
| **First Person Walk** | `W`, `A`, `S`, `D` / Arrow Keys |
| **Sprint** | `Shift` + `W` |
| **Fullscreen** | `F` |
| **Exit Walk Mode** | `Esc` |

---

## 🚀 Running Locally

You can serve the project using any local HTTP server:

```bash
# Using Python:
python -m http.server 8080

# Open in browser:
http://localhost:8080/index.html
```

---

## 📦 Large 3D Assets

The main 730MB GLB model (`marneuli_main.glb`) is hosted directly on GitHub Releases:
- [Download marneuli_main.glb (v1.0.0)](https://github.com/tural1227/marneuli/releases/download/v1.0.0/marneuli_main.glb)

When running locally, place `marneuli_main.glb` in the project root directory.

---

## 🛠️ Built With

- **[Three.js](https://threejs.org/)** (v0.165.0) - Modern WebGL 3D Engine
- **DRACOLoader** - High-performance 3D mesh decompression
- **OrbitControls** - Smooth architectural camera manipulation
