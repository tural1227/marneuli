// ============================================================================
// 🏢 PREMIUM PARK RESIDENCE — 360° INTERACTIVE APARTMENT VIRTUAL TOUR
// Silk-Smooth Walking Engine, Exact Blueprint Alignment & Live Radar Mini-Map
// Multi-Apartment Architecture for Floor 5 (All 17 Apartments: № 52 to 68)
// ============================================================================

(function () {
  // Official Floor 5 Blueprint Database (17 Apartments: № 52 to 68)
  const FLOOR_5_APARTMENTS = {
    52: {
      number: 52,
      grossArea: "73.1 m²",
      netArea: "68.6 m²",
      balconyArea: "4.5 m²",
      roomsDesc: "2 Otaqlı (Geniş qonaq + Yataq)",
      roomsShort: "2 Otaq",
      type: "tip_a",
      x_pct: 58.2,
      y_pct: 47.05,
      initialRoom: "hall",
      rooms: {
        hall: {
          id: "hall",
          name: "Dəhliz & Giriş Zonası",
          area: "5.8 m²",
          icon: "🚪",
          image: "tour_360/apt_52/hall.jpg",
          initialLon: 180.0,
          hotspots: [
            { target: "living", pitch: -2.0, yaw: 180.0, label: "Qonaq Otağı & Açıq Mətbəx" },
            { target: "bathroom", pitch: -4.0, yaw: 88.0, label: "Hamam Otağı" },
            { target: "bedroom", pitch: -4.0, yaw: 145.0, label: "Əsas Yataq Otağı" }
          ]
        },
        living: {
          id: "living",
          name: "Qonaq Otağı",
          area: "31.7 m²",
          icon: "🛋️",
          image: "tour_360/apt_52/living.jpg",
          initialLon: 180.0,
          hotspots: [
            { target: "kitchen", pitch: -3.0, yaw: 35.0, label: "Mətbəx Zonası" },
            { target: "balcony", pitch: -3.0, yaw: -45.0, label: "Mənzərəli Eyvana Çıxış" },
            { target: "bedroom", pitch: -3.0, yaw: 82.0, label: "Yataq Otağına Keçid" },
            { target: "hall", pitch: -2.0, yaw: 0.0, label: "Dəhlizə Qayıt" }
          ]
        },
        kitchen: {
          id: "kitchen",
          name: "Mətbəx & Yemək",
          area: "12.4 m²",
          icon: "🍳",
          image: "tour_360/apt_52/kitchen.jpg",
          initialLon: 180.0,
          hotspots: [
            { target: "living", pitch: -3.0, yaw: 0.0, label: "Qonaq Otağına Keçid" },
            { target: "hall", pitch: -3.0, yaw: -140.0, label: "Dəhlizə Qayıt" },
            { target: "balcony", pitch: -3.0, yaw: -45.0, label: "Eyvana Çıxış" }
          ]
        },
        bedroom: {
          id: "bedroom",
          name: "Əsas Yataq Otağı",
          area: "18.2 m²",
          icon: "🛏️",
          image: "tour_360/apt_52/bedroom.jpg",
          initialLon: 180.0,
          hotspots: [
            { target: "balcony", pitch: -3.0, yaw: 38.0, label: "Eyvana Çıxış" },
            { target: "living", pitch: -4.0, yaw: 0.0, label: "Qonaq Otağına Qayıt" },
            { target: "hall", pitch: -4.0, yaw: -45.0, label: "Dəhlizə Keçid" }
          ]
        },
        bathroom: {
          id: "bathroom",
          name: "Hamam & Sanitar Qovşağı",
          area: "4.4 m²",
          icon: "🚿",
          image: "tour_360/apt_52/bathroom.jpg",
          initialLon: 170.0,
          hotspots: [
            { target: "hall", pitch: -3.0, yaw: 0.0, label: "Dəhlizə Qayıt" }
          ]
        },
        balcony: {
          id: "balcony",
          name: "Mənzərəli Eyvan",
          area: "4.5 m²",
          icon: "🌿",
          image: "tour_360/apt_52/balcony.jpg",
          initialLon: 180.0,
          hotspots: [
            { target: "living", pitch: -3.0, yaw: 0.0, label: "Qonaq Otağına Daxil Ol" },
            { target: "bedroom", pitch: -3.0, yaw: -48.0, label: "Yataq Otağına Daxil Ol" }
          ]
        }
      }
    },
    53: {
      number: 53,
      grossArea: "69.4 m²",
      netArea: "64.8 m²",
      balconyArea: "4.6 m²",
      roomsDesc: "2 Otaqlı (Geniş qonaq + Yataq)",
      roomsShort: "2 Otaq",
      type: "tip_a",
      x_pct: 65.47,
      y_pct: 53.38,
      initialRoom: "hall",
      rooms: {
        hall: {
          id: "hall",
          name: "Dəhliz & Giriş Zonası",
          area: "5.4 m²",
          icon: "🚪",
          image: "tour_360/apt_53/hall.jpg",
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
          area: "29.8 m²",
          icon: "🛋️",
          image: "tour_360/apt_53/living.jpg",
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
          area: "17.4 m²",
          icon: "🛏️",
          image: "tour_360/apt_53/bedroom.jpg",
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
          area: "4.3 m²",
          icon: "🚿",
          image: "tour_360/apt_53/bathroom.jpg",
          initialLon: -30.0,
          hotspots: [
            { target: "hall", pitch: -3.0, yaw: 118.0, label: "Dəhlizə Qayıt" }
          ]
        },
        balcony: {
          id: "balcony",
          name: "Mənzərəli Eyvan",
          area: "4.6 m²",
          icon: "🌿",
          image: "tour_360/apt_53/balcony.jpg",
          initialLon: 80.0,
          hotspots: [
            { target: "living", pitch: -3.0, yaw: -76.0, label: "Qonaq Otağına Daxil Ol" },
            { target: "bedroom", pitch: -3.0, yaw: -48.0, label: "Yataq Otağına Daxil Ol" }
          ]
        }
      }
    },
    54: {
      number: 54,
      grossArea: "81.8 m²",
      netArea: "76.8 m²",
      balconyArea: "5.0 m²",
      roomsDesc: "2-3 Otaqlı (Ailəvi mənzil)",
      roomsShort: "3 Otaq",
      type: "tip_c",
      x_pct: 80.02,
      y_pct: 64.07,
      initialRoom: "hall",
      rooms: {
        hall: {
          id: "hall",
          name: "Dəhliz & Giriş Zonası",
          area: "6.8 m²",
          icon: "🚪",
          image: "tour_360/apt_54/hall.jpg",
          initialLon: 15.0,
          hotspots: [
            { target: "living", pitch: -2.0, yaw: 15.0, label: "Geniş Qonaq Otağı" },
            { target: "bathroom", pitch: -4.0, yaw: 88.0, label: "Hamam Otağı" },
            { target: "bedroom", pitch: -4.0, yaw: 145.0, label: "Əsas Yataq Otağı" }
          ]
        },
        living: {
          id: "living",
          name: "Qonaq Otağı & Açıq Mətbəx",
          area: "33.5 m²",
          icon: "🛋️",
          image: "tour_360/apt_54/living.jpg",
          initialLon: 12.0,
          hotspots: [
            { target: "balcony", pitch: -3.0, yaw: 12.0, label: "Mənzərəli Eyvan" },
            { target: "bedroom", pitch: -3.0, yaw: 82.0, label: "Master Yataq Otağı" },
            { target: "bedroom2", pitch: -3.0, yaw: 110.0, label: "İkinci Yataq Otağı" },
            { target: "hall", pitch: -2.0, yaw: 155.0, label: "Dəhlizə Qayıt" }
          ]
        },
        bedroom: {
          id: "bedroom",
          name: "Master Yataq Otağı",
          area: "18.6 m²",
          icon: "🛏️",
          image: "tour_360/apt_54/bedroom.jpg",
          initialLon: 38.0,
          hotspots: [
            { target: "balcony", pitch: -3.0, yaw: 38.0, label: "Eyvana Çıxış" },
            { target: "living", pitch: -4.0, yaw: -5.0, label: "Qonaq Otağına Qayıt" }
          ]
        },
        bedroom2: {
          id: "bedroom2",
          name: "Uşaq / İkinci Yataq Otağı",
          area: "12.9 m²",
          icon: "🧸",
          image: "tour_360/apt_54/bedroom_2.jpg",
          initialLon: 25.0,
          hotspots: [
            { target: "living", pitch: -3.0, yaw: -15.0, label: "Qonaq Otağına Qayıt" },
            { target: "hall", pitch: -3.0, yaw: -80.0, label: "Dəhlizə Keçid" }
          ]
        },
        bathroom: {
          id: "bathroom",
          name: "Hamam & Sanitar Qovşağı",
          area: "5.0 m²",
          icon: "🚿",
          image: "tour_360/apt_54/bathroom.jpg",
          initialLon: -30.0,
          hotspots: [
            { target: "hall", pitch: -3.0, yaw: 118.0, label: "Dəhlizə Qayıt" }
          ]
        },
        balcony: {
          id: "balcony",
          name: "Mənzərəli Eyvan",
          area: "5.0 m²",
          icon: "🌿",
          image: "tour_360/apt_54/balcony.jpg",
          initialLon: 80.0,
          hotspots: [
            { target: "living", pitch: -3.0, yaw: -76.0, label: "Qonaq Otağına Daxil Ol" },
            { target: "bedroom", pitch: -3.0, yaw: -48.0, label: "Yataq Otağına Daxil Ol" }
          ]
        }
      }
    },
    55: {
      number: 55,
      grossArea: "62.5 m²",
      netArea: "57.9 m²",
      balconyArea: "4.6 m²",
      roomsDesc: "1-2 Otaqlı (Studio / 1 Yataq)",
      roomsShort: "Studio / 2 Otaq",
      type: "tip_b",
      x_pct: 86.18,
      y_pct: 47.05,
      initialRoom: "hall",
      rooms: {
        hall: {
          id: "hall",
          name: "Dəhliz & Giriş Zonası",
          area: "4.5 m²",
          icon: "🚪",
          image: "tour_360/apt_55/hall.jpg",
          initialLon: 15.0,
          hotspots: [
            { target: "living", pitch: -2.0, yaw: 15.0, label: "Studio Qonaq Otağı" },
            { target: "bathroom", pitch: -4.0, yaw: 88.0, label: "Hamam Otağı" },
            { target: "bedroom", pitch: -4.0, yaw: 145.0, label: "Yataq Otağı" }
          ]
        },
        living: {
          id: "living",
          name: "Qonaq Otağı & Studio Mətbəx",
          area: "26.5 m²",
          icon: "🛋️",
          image: "tour_360/apt_55/living.jpg",
          initialLon: 12.0,
          hotspots: [
            { target: "balcony", pitch: -3.0, yaw: 12.0, label: "Eyvana Çıxış" },
            { target: "bedroom", pitch: -3.0, yaw: 82.0, label: "Yataq Zonasına Keçid" },
            { target: "hall", pitch: -2.0, yaw: 155.0, label: "Dəhlizə Qayıt" }
          ]
        },
        bedroom: {
          id: "bedroom",
          name: "Yataq Otağı",
          area: "14.8 m²",
          icon: "🛏️",
          image: "tour_360/apt_55/bedroom.jpg",
          initialLon: 38.0,
          hotspots: [
            { target: "balcony", pitch: -3.0, yaw: 38.0, label: "Eyvana Çıxış" },
            { target: "living", pitch: -4.0, yaw: -5.0, label: "Qonaq Otağına Qayıt" }
          ]
        },
        bathroom: {
          id: "bathroom",
          name: "Hamam & Sanitar Qovşağı",
          area: "4.1 m²",
          icon: "🚿",
          image: "tour_360/apt_55/bathroom.jpg",
          initialLon: -30.0,
          hotspots: [
            { target: "hall", pitch: -3.0, yaw: 118.0, label: "Dəhlizə Qayıt" }
          ]
        },
        balcony: {
          id: "balcony",
          name: "Mənzərəli Eyvan",
          area: "4.6 m²",
          icon: "🌿",
          image: "tour_360/apt_55/balcony.jpg",
          initialLon: 80.0,
          hotspots: [
            { target: "living", pitch: -3.0, yaw: -76.0, label: "Qonaq Otağına Daxil Ol" }
          ]
        }
      }
    },
    56: {
      number: 56,
      grossArea: "60.5 m²",
      netArea: "60.5 m²",
      balconyArea: "Vitraj",
      roomsDesc: "1-2 Otaqlı (Studio / 1 Yataq)",
      roomsShort: "Studio / 2 Otaq",
      type: "tip_b",
      x_pct: 79.46,
      y_pct: 42.3,
      initialRoom: "hall",
      rooms: {
        hall: {
          id: "hall",
          name: "Dəhliz & Giriş Zonası",
          area: "5.0 m²",
          icon: "🚪",
          image: "tour_360/apt_56/hall.jpg",
          initialLon: 15.0,
          hotspots: [
            { target: "living", pitch: -2.0, yaw: 15.0, label: "Studio Qonaq Otağı" },
            { target: "bathroom", pitch: -4.0, yaw: 88.0, label: "Hamam Otağı" },
            { target: "bedroom", pitch: -4.0, yaw: 145.0, label: "Yataq Otağı" }
          ]
        },
        living: {
          id: "living",
          name: "Qonaq Otağı & Vitraj Mətbəx",
          area: "28.5 m²",
          icon: "🛋️",
          image: "tour_360/apt_56/living.jpg",
          initialLon: 12.0,
          hotspots: [
            { target: "bedroom", pitch: -3.0, yaw: 82.0, label: "Yataq Zonasına Keçid" },
            { target: "hall", pitch: -2.0, yaw: 155.0, label: "Dəhlizə Qayıt" }
          ]
        },
        bedroom: {
          id: "bedroom",
          name: "Yataq Otağı",
          area: "15.8 m²",
          icon: "🛏️",
          image: "tour_360/apt_56/bedroom.jpg",
          initialLon: 38.0,
          hotspots: [
            { target: "living", pitch: -4.0, yaw: -5.0, label: "Qonaq Otağına Qayıt" },
            { target: "hall", pitch: -4.0, yaw: -45.0, label: "Dəhlizə Keçid" }
          ]
        },
        bathroom: {
          id: "bathroom",
          name: "Hamam & Sanitar Qovşağı",
          area: "4.3 m²",
          icon: "🚿",
          image: "tour_360/apt_56/bathroom.jpg",
          initialLon: -30.0,
          hotspots: [
            { target: "hall", pitch: -3.0, yaw: 118.0, label: "Dəhlizə Qayıt" }
          ]
        }
      }
    },
    57: {
      number: 57,
      grossArea: "69.4 m²",
      netArea: "64.4 m²",
      balconyArea: "5.0 m²",
      roomsDesc: "2 Otaqlı (Geniş qonaq + Yataq)",
      roomsShort: "2 Otaq",
      type: "tip_a",
      x_pct: 71.07,
      y_pct: 36.76,
      initialRoom: "hall",
      rooms: {
        hall: { id: "hall", name: "Dəhliz & Giriş Zonası", area: "5.2 m²", icon: "🚪", image: "tour_360/apt_57/hall.jpg", initialLon: 15.0, hotspots: [{ target: "living", pitch: -2.0, yaw: 15.0, label: "Qonaq Otağı" }, { target: "bathroom", pitch: -4.0, yaw: 88.0, label: "Hamam Otağı" }, { target: "bedroom", pitch: -4.0, yaw: 145.0, label: "Əsas Yataq Otağı" }] },
        living: { id: "living", name: "Qonaq Otağı & Açıq Mətbəx", area: "29.4 m²", icon: "🛋️", image: "tour_360/apt_57/living.jpg", initialLon: 12.0, hotspots: [{ target: "balcony", pitch: -3.0, yaw: 12.0, label: "Eyvana Çıxış" }, { target: "bedroom", pitch: -3.0, yaw: 82.0, label: "Yataq Otağı" }, { target: "hall", pitch: -2.0, yaw: 155.0, label: "Dəhlizə Qayıt" }] },
        bedroom: { id: "bedroom", name: "Əsas Yataq Otağı", area: "17.4 m²", icon: "🛏️", image: "tour_360/apt_57/bedroom.jpg", initialLon: 38.0, hotspots: [{ target: "balcony", pitch: -3.0, yaw: 38.0, label: "Eyvana Çıxış" }, { target: "living", pitch: -4.0, yaw: -5.0, label: "Qonaq Otağı" }] },
        bathroom: { id: "bathroom", name: "Hamam & Sanitar Qovşağı", area: "4.4 m²", icon: "🚿", image: "tour_360/apt_57/bathroom.jpg", initialLon: -30.0, hotspots: [{ target: "hall", pitch: -3.0, yaw: 118.0, label: "Dəhlizə Qayıt" }] },
        balcony: { id: "balcony", name: "Mənzərəli Eyvan", area: "5.0 m²", icon: "🌿", image: "tour_360/apt_57/balcony.jpg", initialLon: 80.0, hotspots: [{ target: "living", pitch: -3.0, yaw: -76.0, label: "Qonaq Otağı" }, { target: "bedroom", pitch: -3.0, yaw: -48.0, label: "Yataq Otağı" }] }
      }
    },
    58: {
      number: 58,
      grossArea: "69.4 m²",
      netArea: "64.4 m²",
      balconyArea: "5.0 m²",
      roomsDesc: "2 Otaqlı (Geniş qonaq + Yataq)",
      roomsShort: "2 Otaq",
      type: "tip_a",
      x_pct: 65.47,
      y_pct: 30.43,
      initialRoom: "hall",
      rooms: {
        hall: { id: "hall", name: "Dəhliz & Giriş Zonası", area: "5.2 m²", icon: "🚪", image: "tour_360/apt_58/hall.jpg", initialLon: 15.0, hotspots: [{ target: "living", pitch: -2.0, yaw: 15.0, label: "Qonaq Otağı" }, { target: "bathroom", pitch: -4.0, yaw: 88.0, label: "Hamam Otağı" }, { target: "bedroom", pitch: -4.0, yaw: 145.0, label: "Əsas Yataq Otağı" }] },
        living: { id: "living", name: "Qonaq Otağı & Açıq Mətbəx", area: "29.4 m²", icon: "🛋️", image: "tour_360/apt_58/living.jpg", initialLon: 12.0, hotspots: [{ target: "balcony", pitch: -3.0, yaw: 12.0, label: "Eyvana Çıxış" }, { target: "bedroom", pitch: -3.0, yaw: 82.0, label: "Yataq Otağı" }, { target: "hall", pitch: -2.0, yaw: 155.0, label: "Dəhlizə Qayıt" }] },
        bedroom: { id: "bedroom", name: "Əsas Yataq Otağı", area: "17.4 m²", icon: "🛏️", image: "tour_360/apt_58/bedroom.jpg", initialLon: 38.0, hotspots: [{ target: "balcony", pitch: -3.0, yaw: 38.0, label: "Eyvana Çıxış" }, { target: "living", pitch: -4.0, yaw: -5.0, label: "Qonaq Otağı" }] },
        bathroom: { id: "bathroom", name: "Hamam & Sanitar Qovşağı", area: "4.4 m²", icon: "🚿", image: "tour_360/apt_58/bathroom.jpg", initialLon: -30.0, hotspots: [{ target: "hall", pitch: -3.0, yaw: 118.0, label: "Dəhlizə Qayıt" }] },
        balcony: { id: "balcony", name: "Mənzərəli Eyvan", area: "5.0 m²", icon: "🌿", image: "tour_360/apt_58/balcony.jpg", initialLon: 80.0, hotspots: [{ target: "living", pitch: -3.0, yaw: -76.0, label: "Qonaq Otağı" }, { target: "bedroom", pitch: -3.0, yaw: -48.0, label: "Yataq Otağı" }] }
      }
    },
    59: {
      number: 59,
      grossArea: "71.1 m²",
      netArea: "68.7 m²",
      balconyArea: "2.4 m²",
      roomsDesc: "2 Otaqlı (Geniş qonaq + Yataq)",
      roomsShort: "2 Otaq",
      type: "tip_a",
      x_pct: 55.96,
      y_pct: 22.91,
      initialRoom: "hall",
      rooms: {
        hall: { id: "hall", name: "Dəhliz & Giriş Zonası", area: "5.8 m²", icon: "🚪", image: "tour_360/apt_59/hall.jpg", initialLon: 15.0, hotspots: [{ target: "living", pitch: -2.0, yaw: 15.0, label: "Qonaq Otağı" }, { target: "bathroom", pitch: -4.0, yaw: 88.0, label: "Hamam Otağı" }, { target: "bedroom", pitch: -4.0, yaw: 145.0, label: "Əsas Yataq Otağı" }] },
        living: { id: "living", name: "Qonaq Otağı & Açıq Mətbəx", area: "31.8 m²", icon: "🛋️", image: "tour_360/apt_59/living.jpg", initialLon: 12.0, hotspots: [{ target: "balcony", pitch: -3.0, yaw: 12.0, label: "Eyvana Çıxış" }, { target: "bedroom", pitch: -3.0, yaw: 82.0, label: "Yataq Otağı" }, { target: "hall", pitch: -2.0, yaw: 155.0, label: "Dəhlizə Qayıt" }] },
        bedroom: { id: "bedroom", name: "Əsas Yataq Otağı", area: "18.3 m²", icon: "🛏️", image: "tour_360/apt_59/bedroom.jpg", initialLon: 38.0, hotspots: [{ target: "balcony", pitch: -3.0, yaw: 38.0, label: "Eyvana Çıxış" }, { target: "living", pitch: -4.0, yaw: -5.0, label: "Qonaq Otağı" }] },
        bathroom: { id: "bathroom", name: "Hamam & Sanitar Qovşağı", area: "4.4 m²", icon: "🚿", image: "tour_360/apt_59/bathroom.jpg", initialLon: -30.0, hotspots: [{ target: "hall", pitch: -3.0, yaw: 118.0, label: "Dəhlizə Qayıt" }] },
        balcony: { id: "balcony", name: "Mənzərəli Eyvan", area: "2.4 m²", icon: "🌿", image: "tour_360/apt_59/balcony.jpg", initialLon: 80.0, hotspots: [{ target: "living", pitch: -3.0, yaw: -76.0, label: "Qonaq Otağı" }] }
      }
    },
    60: {
      number: 60,
      grossArea: "71.0 m²",
      netArea: "68.7 m²",
      balconyArea: "2.3 m²",
      roomsDesc: "2 Otaqlı (Geniş qonaq + Yataq)",
      roomsShort: "2 Otaq",
      type: "tip_a",
      x_pct: 47.29,
      y_pct: 22.51,
      initialRoom: "hall",
      rooms: {
        hall: { id: "hall", name: "Dəhliz & Giriş Zonası", area: "5.8 m²", icon: "🚪", image: "tour_360/apt_60/hall.jpg", initialLon: 15.0, hotspots: [{ target: "living", pitch: -2.0, yaw: 15.0, label: "Qonaq Otağı" }, { target: "bathroom", pitch: -4.0, yaw: 88.0, label: "Hamam Otağı" }, { target: "bedroom", pitch: -4.0, yaw: 145.0, label: "Əsas Yataq Otağı" }] },
        living: { id: "living", name: "Qonaq Otağı & Açıq Mətbəx", area: "31.8 m²", icon: "🛋️", image: "tour_360/apt_60/living.jpg", initialLon: 12.0, hotspots: [{ target: "balcony", pitch: -3.0, yaw: 12.0, label: "Eyvana Çıxış" }, { target: "bedroom", pitch: -3.0, yaw: 82.0, label: "Yataq Otağı" }, { target: "hall", pitch: -2.0, yaw: 155.0, label: "Dəhlizə Qayıt" }] },
        bedroom: { id: "bedroom", name: "Əsas Yataq Otağı", area: "18.3 m²", icon: "🛏️", image: "tour_360/apt_60/bedroom.jpg", initialLon: 38.0, hotspots: [{ target: "balcony", pitch: -3.0, yaw: 38.0, label: "Eyvana Çıxış" }, { target: "living", pitch: -4.0, yaw: -5.0, label: "Qonaq Otağı" }] },
        bathroom: { id: "bathroom", name: "Hamam & Sanitar Qovşağı", area: "4.4 m²", icon: "🚿", image: "tour_360/apt_60/bathroom.jpg", initialLon: -30.0, hotspots: [{ target: "hall", pitch: -3.0, yaw: 118.0, label: "Dəhlizə Qayıt" }] },
        balcony: { id: "balcony", name: "Mənzərəli Eyvan", area: "2.3 m²", icon: "🌿", image: "tour_360/apt_60/balcony.jpg", initialLon: 80.0, hotspots: [{ target: "living", pitch: -3.0, yaw: -76.0, label: "Qonaq Otağı" }] }
      }
    },
    61: {
      number: 61,
      grossArea: "69.4 m²",
      netArea: "64.4 m²",
      balconyArea: "5.0 m²",
      roomsDesc: "2 Otaqlı (Geniş qonaq + Yataq)",
      roomsShort: "2 Otaq",
      type: "tip_a",
      x_pct: 39.73,
      y_pct: 30.82,
      initialRoom: "hall",
      rooms: {
        hall: { id: "hall", name: "Dəhliz & Giriş Zonası", area: "5.2 m²", icon: "🚪", image: "tour_360/apt_61/hall.jpg", initialLon: 15.0, hotspots: [{ target: "living", pitch: -2.0, yaw: 15.0, label: "Qonaq Otağı" }, { target: "bathroom", pitch: -4.0, yaw: 88.0, label: "Hamam Otağı" }, { target: "bedroom", pitch: -4.0, yaw: 145.0, label: "Əsas Yataq Otağı" }] },
        living: { id: "living", name: "Qonaq Otağı & Açıq Mətbəx", area: "29.4 m²", icon: "🛋️", image: "tour_360/apt_61/living.jpg", initialLon: 12.0, hotspots: [{ target: "balcony", pitch: -3.0, yaw: 12.0, label: "Eyvana Çıxış" }, { target: "bedroom", pitch: -3.0, yaw: 82.0, label: "Yataq Otağı" }, { target: "hall", pitch: -2.0, yaw: 155.0, label: "Dəhlizə Qayıt" }] },
        bedroom: { id: "bedroom", name: "Əsas Yataq Otağı", area: "17.4 m²", icon: "🛏️", image: "tour_360/apt_61/bedroom.jpg", initialLon: 38.0, hotspots: [{ target: "balcony", pitch: -3.0, yaw: 38.0, label: "Eyvana Çıxış" }, { target: "living", pitch: -4.0, yaw: -5.0, label: "Qonaq Otağı" }] },
        bathroom: { id: "bathroom", name: "Hamam & Sanitar Qovşağı", area: "4.4 m²", icon: "🚿", image: "tour_360/apt_61/bathroom.jpg", initialLon: -30.0, hotspots: [{ target: "hall", pitch: -3.0, yaw: 118.0, label: "Dəhlizə Qayıt" }] },
        balcony: { id: "balcony", name: "Mənzərəli Eyvan", area: "5.0 m²", icon: "🌿", image: "tour_360/apt_61/balcony.jpg", initialLon: 80.0, hotspots: [{ target: "living", pitch: -3.0, yaw: -76.0, label: "Qonaq Otağı" }, { target: "bedroom", pitch: -3.0, yaw: -48.0, label: "Yataq Otağı" }] }
      }
    },
    62: {
      number: 62,
      grossArea: "69.4 m²",
      netArea: "64.4 m²",
      balconyArea: "5.0 m²",
      roomsDesc: "2 Otaqlı (Geniş qonaq + Yataq)",
      roomsShort: "2 Otaq",
      type: "tip_a",
      x_pct: 33.3,
      y_pct: 35.97,
      initialRoom: "hall",
      rooms: {
        hall: { id: "hall", name: "Dəhliz & Giriş Zonası", area: "5.2 m²", icon: "🚪", image: "tour_360/apt_62/hall.jpg", initialLon: 15.0, hotspots: [{ target: "living", pitch: -2.0, yaw: 15.0, label: "Qonaq Otağı" }, { target: "bathroom", pitch: -4.0, yaw: 88.0, label: "Hamam Otağı" }, { target: "bedroom", pitch: -4.0, yaw: 145.0, label: "Əsas Yataq Otağı" }] },
        living: { id: "living", name: "Qonaq Otağı & Açıq Mətbəx", area: "29.4 m²", icon: "🛋️", image: "tour_360/apt_62/living.jpg", initialLon: 12.0, hotspots: [{ target: "balcony", pitch: -3.0, yaw: 12.0, label: "Eyvana Çıxış" }, { target: "bedroom", pitch: -3.0, yaw: 82.0, label: "Yataq Otağı" }, { target: "hall", pitch: -2.0, yaw: 155.0, label: "Dəhlizə Qayıt" }] },
        bedroom: { id: "bedroom", name: "Əsas Yataq Otağı", area: "17.4 m²", icon: "🛏️", image: "tour_360/apt_62/bedroom.jpg", initialLon: 38.0, hotspots: [{ target: "balcony", pitch: -3.0, yaw: 38.0, label: "Eyvana Çıxış" }, { target: "living", pitch: -4.0, yaw: -5.0, label: "Qonaq Otağı" }] },
        bathroom: { id: "bathroom", name: "Hamam & Sanitar Qovşağı", area: "4.4 m²", icon: "🚿", image: "tour_360/apt_62/bathroom.jpg", initialLon: -30.0, hotspots: [{ target: "hall", pitch: -3.0, yaw: 118.0, label: "Dəhlizə Qayıt" }] },
        balcony: { id: "balcony", name: "Mənzərəli Eyvan", area: "5.0 m²", icon: "🌿", image: "tour_360/apt_62/balcony.jpg", initialLon: 80.0, hotspots: [{ target: "living", pitch: -3.0, yaw: -76.0, label: "Qonaq Otağı" }, { target: "bedroom", pitch: -3.0, yaw: -48.0, label: "Yataq Otağı" }] }
      }
    },
    63: {
      number: 63,
      grossArea: "100.8 m²",
      netArea: "96.2 m²",
      balconyArea: "4.6 m²",
      roomsDesc: "3 Otaqlı (Ailəvi mənzil)",
      roomsShort: "Lüks 3 Otaq",
      type: "tip_c",
      x_pct: 25.18,
      y_pct: 45.47,
      initialRoom: "hall",
      rooms: {
        hall: {
          id: "hall",
          name: "Lüks Giriş Foyesi",
          area: "8.2 m²",
          icon: "🚪",
          image: "tour_360/apt_63/hall.jpg",
          initialLon: 15.0,
          hotspots: [
            { target: "living", pitch: -2.0, yaw: 15.0, label: "Böyük Qonaq Otağı" },
            { target: "bathroom", pitch: -4.0, yaw: 88.0, label: "Lüks Hamam Otağı" },
            { target: "bedroom", pitch: -4.0, yaw: 145.0, label: "Master Yataq Otağı" }
          ]
        },
        living: {
          id: "living",
          name: "Böyük Qonaq Otağı & Mətbəx",
          area: "42.4 m²",
          icon: "🛋️",
          image: "tour_360/apt_63/living.jpg",
          initialLon: 12.0,
          hotspots: [
            { target: "balcony", pitch: -3.0, yaw: 12.0, label: "Mənzərəli Eyvan" },
            { target: "bedroom", pitch: -3.0, yaw: 82.0, label: "Master Yataq Otağı" },
            { target: "bedroom2", pitch: -3.0, yaw: 110.0, label: "İkinci Yataq Otağı" },
            { target: "hall", pitch: -2.0, yaw: 155.0, label: "Dəhlizə Qayıt" }
          ]
        },
        bedroom: {
          id: "bedroom",
          name: "Master Yataq Otağı",
          area: "22.5 m²",
          icon: "🛏️",
          image: "tour_360/apt_63/bedroom.jpg",
          initialLon: 38.0,
          hotspots: [
            { target: "balcony", pitch: -3.0, yaw: 38.0, label: "Eyvana Çıxış" },
            { target: "living", pitch: -4.0, yaw: -5.0, label: "Qonaq Otağına Qayıt" }
          ]
        },
        bedroom2: {
          id: "bedroom2",
          name: "Uşaq / Qonaq Otağı",
          area: "18.5 m²",
          icon: "🧸",
          image: "tour_360/apt_63/bedroom_2.jpg",
          initialLon: 25.0,
          hotspots: [
            { target: "living", pitch: -3.0, yaw: -15.0, label: "Qonaq Otağına Qayıt" },
            { target: "hall", pitch: -3.0, yaw: -80.0, label: "Dəhlizə Keçid" }
          ]
        },
        bathroom: {
          id: "bathroom",
          name: "Lüks Hamam & Sanitar Qovşağı",
          area: "4.6 m²",
          icon: "🚿",
          image: "tour_360/apt_63/bathroom.jpg",
          initialLon: -30.0,
          hotspots: [
            { target: "hall", pitch: -3.0, yaw: 118.0, label: "Dəhlizə Qayıt" }
          ]
        },
        balcony: {
          id: "balcony",
          name: "Mənzərəli Eyvan",
          area: "4.6 m²",
          icon: "🌿",
          image: "tour_360/apt_63/balcony.jpg",
          initialLon: 80.0,
          hotspots: [
            { target: "living", pitch: -3.0, yaw: -76.0, label: "Qonaq Otağı" },
            { target: "bedroom", pitch: -3.0, yaw: -48.0, label: "Yataq Otağı" }
          ]
        }
      }
    },
    64: {
      number: 64,
      grossArea: "84.2 m²",
      netArea: "79.2 m²",
      balconyArea: "5.0 m²",
      roomsDesc: "2-3 Otaqlı (Ailəvi mənzil)",
      roomsShort: "3 Otaq",
      type: "tip_c",
      x_pct: 12.59,
      y_pct: 56.15,
      initialRoom: "hall",
      rooms: {
        hall: {
          id: "hall",
          name: "Dəhliz & Foye",
          area: "7.0 m²",
          icon: "🚪",
          image: "tour_360/apt_64/hall.jpg",
          initialLon: 15.0,
          hotspots: [
            { target: "living", pitch: -2.0, yaw: 15.0, label: "Qonaq Otağı & Mətbəx" },
            { target: "bathroom", pitch: -4.0, yaw: 88.0, label: "Hamam Otağı" },
            { target: "bedroom", pitch: -4.0, yaw: 145.0, label: "Əsas Yataq Otağı" }
          ]
        },
        living: {
          id: "living",
          name: "Qonaq Otağı & Açıq Mətbəx",
          area: "34.8 m²",
          icon: "🛋️",
          image: "tour_360/apt_64/living.jpg",
          initialLon: 12.0,
          hotspots: [
            { target: "balcony", pitch: -3.0, yaw: 12.0, label: "Mənzərəli Eyvan" },
            { target: "bedroom", pitch: -3.0, yaw: 82.0, label: "Əsas Yataq Otağı" },
            { target: "bedroom2", pitch: -3.0, yaw: 110.0, label: "İkinci Yataq Otağı" },
            { target: "hall", pitch: -2.0, yaw: 155.0, label: "Dəhlizə Qayıt" }
          ]
        },
        bedroom: {
          id: "bedroom",
          name: "Əsas Yataq Otağı",
          area: "19.4 m²",
          icon: "🛏️",
          image: "tour_360/apt_64/bedroom.jpg",
          initialLon: 38.0,
          hotspots: [
            { target: "balcony", pitch: -3.0, yaw: 38.0, label: "Eyvana Çıxış" },
            { target: "living", pitch: -4.0, yaw: -5.0, label: "Qonaq Otağına Qayıt" }
          ]
        },
        bedroom2: {
          id: "bedroom2",
          name: "İkinci Yataq Otağı",
          area: "13.0 m²",
          icon: "🧸",
          image: "tour_360/apt_64/bedroom_2.jpg",
          initialLon: 25.0,
          hotspots: [
            { target: "living", pitch: -3.0, yaw: -15.0, label: "Qonaq Otağı" }
          ]
        },
        bathroom: {
          id: "bathroom",
          name: "Hamam & Sanitar Qovşağı",
          area: "5.0 m²",
          icon: "🚿",
          image: "tour_360/apt_64/bathroom.jpg",
          initialLon: -30.0,
          hotspots: [
            { target: "hall", pitch: -3.0, yaw: 118.0, label: "Dəhlizə Qayıt" }
          ]
        },
        balcony: {
          id: "balcony",
          name: "Mənzərəli Eyvan",
          area: "5.0 m²",
          icon: "🌿",
          image: "tour_360/apt_64/balcony.jpg",
          initialLon: 80.0,
          hotspots: [
            { target: "living", pitch: -3.0, yaw: -76.0, label: "Qonaq Otağı" }
          ]
        }
      }
    },
    65: {
      number: 65,
      grossArea: "92.7 m²",
      netArea: "87.7 m²",
      balconyArea: "5.0 m²",
      roomsDesc: "3 Otaqlı (Ailəvi mənzil)",
      roomsShort: "Lüks 3 Otaq",
      type: "tip_c",
      x_pct: 19.59,
      y_pct: 73.96,
      initialRoom: "hall",
      rooms: {
        hall: {
          id: "hall",
          name: "Dəhliz & Giriş Zonası",
          area: "7.5 m²",
          icon: "🚪",
          image: "tour_360/apt_65/hall.jpg",
          initialLon: 15.0,
          hotspots: [
            { target: "living", pitch: -2.0, yaw: 15.0, label: "Geniş Qonaq Otağı" },
            { target: "bathroom", pitch: -4.0, yaw: 88.0, label: "Hamam Otağı" },
            { target: "bedroom", pitch: -4.0, yaw: 145.0, label: "Əsas Yataq Otağı" }
          ]
        },
        living: {
          id: "living",
          name: "Qonaq Otağı & Açıq Mətbəx",
          area: "38.2 m²",
          icon: "🛋️",
          image: "tour_360/apt_65/living.jpg",
          initialLon: 12.0,
          hotspots: [
            { target: "balcony", pitch: -3.0, yaw: 12.0, label: "Mənzərəli Eyvan" },
            { target: "bedroom", pitch: -3.0, yaw: 82.0, label: "Master Yataq Otağı" },
            { target: "bedroom2", pitch: -3.0, yaw: 110.0, label: "İkinci Yataq Otağı" },
            { target: "hall", pitch: -2.0, yaw: 155.0, label: "Dəhlizə Qayıt" }
          ]
        },
        bedroom: {
          id: "bedroom",
          name: "Master Yataq Otağı",
          area: "21.0 m²",
          icon: "🛏️",
          image: "tour_360/apt_65/bedroom.jpg",
          initialLon: 38.0,
          hotspots: [
            { target: "balcony", pitch: -3.0, yaw: 38.0, label: "Eyvana Çıxış" },
            { target: "living", pitch: -4.0, yaw: -5.0, label: "Qonaq Otağı" }
          ]
        },
        bedroom2: {
          id: "bedroom2",
          name: "İkinci Yataq Otağı",
          area: "16.0 m²",
          icon: "🧸",
          image: "tour_360/apt_65/bedroom_2.jpg",
          initialLon: 25.0,
          hotspots: [
            { target: "living", pitch: -3.0, yaw: -15.0, label: "Qonaq Otağı" }
          ]
        },
        bathroom: {
          id: "bathroom",
          name: "Hamam & Sanitar Qovşağı",
          area: "5.0 m²",
          icon: "🚿",
          image: "tour_360/apt_65/bathroom.jpg",
          initialLon: -30.0,
          hotspots: [
            { target: "hall", pitch: -3.0, yaw: 118.0, label: "Dəhlizə Qayıt" }
          ]
        },
        balcony: {
          id: "balcony",
          name: "Mənzərəli Eyvan",
          area: "5.0 m²",
          icon: "🌿",
          image: "tour_360/apt_65/balcony.jpg",
          initialLon: 80.0,
          hotspots: [
            { target: "living", pitch: -3.0, yaw: -76.0, label: "Qonaq Otağı" }
          ]
        }
      }
    },
    66: {
      number: 66,
      grossArea: "73.3 m²",
      netArea: "68.7 m²",
      balconyArea: "4.6 m²",
      roomsDesc: "2 Otaqlı (Geniş qonaq + Yataq)",
      roomsShort: "2 Otaq",
      type: "tip_a",
      x_pct: 26.86,
      y_pct: 65.65,
      initialRoom: "hall",
      rooms: {
        hall: { id: "hall", name: "Dəhliz & Giriş Zonası", area: "5.8 m²", icon: "🚪", image: "tour_360/apt_66/hall.jpg", initialLon: 15.0, hotspots: [{ target: "living", pitch: -2.0, yaw: 15.0, label: "Qonaq Otağı" }, { target: "bathroom", pitch: -4.0, yaw: 88.0, label: "Hamam Otağı" }, { target: "bedroom", pitch: -4.0, yaw: 145.0, label: "Əsas Yataq Otağı" }] },
        living: { id: "living", name: "Qonaq Otağı & Açıq Mətbəx", area: "31.8 m²", icon: "🛋️", image: "tour_360/apt_66/living.jpg", initialLon: 12.0, hotspots: [{ target: "balcony", pitch: -3.0, yaw: 12.0, label: "Eyvana Çıxış" }, { target: "bedroom", pitch: -3.0, yaw: 82.0, label: "Yataq Otağı" }, { target: "hall", pitch: -2.0, yaw: 155.0, label: "Dəhlizə Qayıt" }] },
        bedroom: { id: "bedroom", name: "Əsas Yataq Otağı", area: "18.3 m²", icon: "🛏️", image: "tour_360/apt_66/bedroom.jpg", initialLon: 38.0, hotspots: [{ target: "balcony", pitch: -3.0, yaw: 38.0, label: "Eyvana Çıxış" }, { target: "living", pitch: -4.0, yaw: -5.0, label: "Qonaq Otağı" }] },
        bathroom: { id: "bathroom", name: "Hamam & Sanitar Qovşağı", area: "4.4 m²", icon: "🚿", image: "tour_360/apt_66/bathroom.jpg", initialLon: -30.0, hotspots: [{ target: "hall", pitch: -3.0, yaw: 118.0, label: "Dəhlizə Qayıt" }] },
        balcony: { id: "balcony", name: "Mənzərəli Eyvan", area: "4.6 m²", icon: "🌿", image: "tour_360/apt_66/balcony.jpg", initialLon: 80.0, hotspots: [{ target: "living", pitch: -3.0, yaw: -76.0, label: "Qonaq Otağı" }, { target: "bedroom", pitch: -3.0, yaw: -48.0, label: "Yataq Otağı" }] }
      }
    },
    67: {
      number: 67,
      grossArea: "69.9 m²",
      netArea: "64.9 m²",
      balconyArea: "5.0 m²",
      roomsDesc: "2 Otaqlı (Geniş qonaq + Yataq)",
      roomsShort: "2 Otaq",
      type: "tip_a",
      x_pct: 38.61,
      y_pct: 56.15,
      initialRoom: "hall",
      rooms: {
        hall: { id: "hall", name: "Dəhliz & Giriş Zonası", area: "5.3 m²", icon: "🚪", image: "tour_360/apt_67/hall.jpg", initialLon: 15.0, hotspots: [{ target: "living", pitch: -2.0, yaw: 15.0, label: "Qonaq Otağı" }, { target: "bathroom", pitch: -4.0, yaw: 88.0, label: "Hamam Otağı" }, { target: "bedroom", pitch: -4.0, yaw: 145.0, label: "Əsas Yataq Otağı" }] },
        living: { id: "living", name: "Qonaq Otağı & Açıq Mətbəx", area: "29.8 m²", icon: "🛋️", image: "tour_360/apt_67/living.jpg", initialLon: 12.0, hotspots: [{ target: "balcony", pitch: -3.0, yaw: 12.0, label: "Eyvana Çıxış" }, { target: "bedroom", pitch: -3.0, yaw: 82.0, label: "Yataq Otağı" }, { target: "hall", pitch: -2.0, yaw: 155.0, label: "Dəhlizə Qayıt" }] },
        bedroom: { id: "bedroom", name: "Əsas Yataq Otağı", area: "17.6 m²", icon: "🛏️", image: "tour_360/apt_67/bedroom.jpg", initialLon: 38.0, hotspots: [{ target: "balcony", pitch: -3.0, yaw: 38.0, label: "Eyvana Çıxış" }, { target: "living", pitch: -4.0, yaw: -5.0, label: "Qonaq Otağı" }] },
        bathroom: { id: "bathroom", name: "Hamam & Sanitar Qovşağı", area: "4.4 m²", icon: "🚿", image: "tour_360/apt_67/bathroom.jpg", initialLon: -30.0, hotspots: [{ target: "hall", pitch: -3.0, yaw: 118.0, label: "Dəhlizə Qayıt" }] },
        balcony: { id: "balcony", name: "Mənzərəli Eyvan", area: "5.0 m²", icon: "🌿", image: "tour_360/apt_67/balcony.jpg", initialLon: 80.0, hotspots: [{ target: "living", pitch: -3.0, yaw: -76.0, label: "Qonaq Otağı" }, { target: "bedroom", pitch: -3.0, yaw: -48.0, label: "Yataq Otağı" }] }
      }
    },
    68: {
      number: 68,
      grossArea: "73.8 m²",
      netArea: "69.4 m²",
      balconyArea: "4.4 m²",
      roomsDesc: "2 Otaqlı (Geniş qonaq + Yataq)",
      roomsShort: "2 Otaq",
      type: "tip_a",
      x_pct: 46.45,
      y_pct: 49.03,
      initialRoom: "hall",
      rooms: {
        hall: { id: "hall", name: "Dəhliz & Giriş Zonası", area: "5.9 m²", icon: "🚪", image: "tour_360/apt_68/hall.jpg", initialLon: 15.0, hotspots: [{ target: "living", pitch: -2.0, yaw: 15.0, label: "Qonaq Otağı" }, { target: "bathroom", pitch: -4.0, yaw: 88.0, label: "Hamam Otağı" }, { target: "bedroom", pitch: -4.0, yaw: 145.0, label: "Əsas Yataq Otağı" }] },
        living: { id: "living", name: "Qonaq Otağı & Açıq Mətbəx", area: "32.2 m²", icon: "🛋️", image: "tour_360/apt_68/living.jpg", initialLon: 12.0, hotspots: [{ target: "balcony", pitch: -3.0, yaw: 12.0, label: "Eyvana Çıxış" }, { target: "bedroom", pitch: -3.0, yaw: 82.0, label: "Yataq Otağı" }, { target: "hall", pitch: -2.0, yaw: 155.0, label: "Dəhlizə Qayıt" }] },
        bedroom: { id: "bedroom", name: "Əsas Yataq Otağı", area: "18.5 m²", icon: "🛏️", image: "tour_360/apt_68/bedroom.jpg", initialLon: 38.0, hotspots: [{ target: "balcony", pitch: -3.0, yaw: 38.0, label: "Eyvana Çıxış" }, { target: "living", pitch: -4.0, yaw: -5.0, label: "Qonaq Otağı" }] },
        bathroom: { id: "bathroom", name: "Hamam & Sanitar Qovşağı", area: "4.4 m²", icon: "🚿", image: "tour_360/apt_68/bathroom.jpg", initialLon: -30.0, hotspots: [{ target: "hall", pitch: -3.0, yaw: 118.0, label: "Dəhlizə Qayıt" }] },
        balcony: { id: "balcony", name: "Mənzərəli Eyvan", area: "4.4 m²", icon: "🌿", image: "tour_360/apt_68/balcony.jpg", initialLon: 80.0, hotspots: [{ target: "living", pitch: -3.0, yaw: -76.0, label: "Qonaq Otağı" }, { target: "bedroom", pitch: -3.0, yaw: -48.0, label: "Yataq Otağı" }] }
      }
    }
  };

  let currentAptNum = 52;
  let miniMapMode = "room"; // "room" or "floor"

  // Active Apartment Configuration Getter
  function getCurrentAptConfig() {
    return FLOOR_5_APARTMENTS[currentAptNum] || FLOOR_5_APARTMENTS[52];
  }

  // Backward compatible Proxy object
  const APT_TOUR_CONFIG = new Proxy({}, {
    get(target, prop) {
      const cfg = getCurrentAptConfig();
      if (prop === "title") {
        return `5-ci Mərtəbə &bull; Mənzil № ${cfg.number} (${cfg.netArea})`;
      }
      return cfg[prop];
    }
  });

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
  let fov = 75; // 75° wide architectural FOV — eliminates circular tunnel/well effect, opens up expansive room perspective
  let isWalking = false;
  let roomHistory = [];

  // GPU Memory Preload Cache (keyed by image URL)
  const CACHE_BUST = "?v=20261016_v31";
  const textureCache = {};

  // Walking Physics State
  let cameraOffset = { x: 0, y: 0, z: 0 };
  let targetOffset = { x: 0, y: 0, z: 0 };
  let walkBobPhase = 0;
  let currentBob = 0;
  let headRoll = 0;

  // 🚶‍♂️ Human Walking Mode & Procedural Audio Engine
  let isHumanMode = true; // Enabled by default for natural human immersion
  let isFootstepSoundEnabled = true;
  let audioCtx = null;
  let footstepIndex = 0;
  let lastStepPhase = 0;
  let isMiniMapCollapsed = false;

  // Key tracking
  const keysDown = {};

  // Procedural Web Audio Footstep Engine (Zero external audio files required)
  function playFootstepSound() {
    if (!isFootstepSoundEnabled) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }
      const now = audioCtx.currentTime;
      footstepIndex++;
      const isLeft = (footstepIndex % 2 === 0);

      // Floor material acoustic tuning:
      // Marble/Tile for Hall & Bathroom, Warm Oak Parquet for Living & Bedroom, Pavers for Balcony
      let baseFreq = isLeft ? 108 : 122;
      let qVal = 2.4;
      let filterFreq = isLeft ? 920 : 1120;
      let gainVol = 0.36;

      if (currentRoomId === "hall" || currentRoomId === "bathroom" || currentRoomId === "kitchen") {
        baseFreq = isLeft ? 132 : 148; // Crisp acoustic marble/tile slap
        filterFreq = isLeft ? 1150 : 1380;
        gainVol = 0.42;
      } else if (currentRoomId === "balcony") {
        baseFreq = isLeft ? 92 : 106; // Textured terrace paver
        filterFreq = isLeft ? 820 : 960;
        gainVol = 0.32;
      }

      // 1. Low Frequency Impulse (shoe heel / sole contact)
      const osc = audioCtx.createOscillator();
      const oscGain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(32, now + 0.08);

      oscGain.gain.setValueAtTime(gainVol, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(oscGain);
      oscGain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.085);

      // 2. High Frequency Friction Scuff
      const sampleRate = audioCtx.sampleRate;
      const bufferSize = Math.floor(sampleRate * 0.035);
      const noiseBuffer = audioCtx.createBuffer(1, bufferSize, sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
      }

      const whiteNoise = audioCtx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = audioCtx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(filterFreq, now);
      filter.Q.value = qVal;

      const noiseGain = audioCtx.createGain();
      noiseGain.gain.setValueAtTime(gainVol * 0.35, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(audioCtx.destination);

      whiteNoise.start(now);
      whiteNoise.stop(now + 0.04);
    } catch (e) {
      // AudioContext policy
    }
  }

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
            <span>PREMIUM PARK RESIDENCE &bull; 360° VİRTUAL TUR</span>
          </div>
          
          <div class="tour-apt-select-row">
            <span class="tour-apt-badge">5-Cİ MƏRTƏBƏ:</span>
            <select id="tour-apt-select" class="tour-apt-select" onchange="window.switchApartment(this.value)" title="Mənzil Seç">
              <!-- Populated dynamically -->
            </select>
          </div>

          <div class="tour-room-name" id="tour-room-title">Yüklənir...</div>
        </div>

        <div class="tour-header-actions">
          <button class="tour-btn tour-btn-human active" id="btn-human-mode" onclick="window.toggleHumanMode()" title="İnsan Modu (Real Gəzinti, Yellənmə & Addım Səsi)">
            <span class="human-dot"></span>
            <span id="human-mode-text">🚶 İnsan Modu: AKTİV</span>
          </button>
          <button class="tour-btn tour-btn-sound active" id="btn-sound-toggle" onclick="window.toggleFootstepSound()" title="Addım Səsi Aç / Bağla">
            <span id="sound-icon">🔊</span>
          </button>
          <button class="tour-btn tour-btn-ai" onclick="window.openBlockadeModal()">
            ✨ AI 360
          </button>
          <button class="tour-btn tour-btn-close" onclick="window.close360Tour()" title="Bağla">
            ✕
          </button>
        </div>
      </div>

      <!-- 1-to-1 Architectural Blueprint Mini-Map with Live View Radar & Floor Plan Toggle -->
      <div class="tour-minimap-box" id="tour-minimap">
        <div class="tour-minimap-header">
          <div class="tour-minimap-tabs">
            <button id="mm-tab-room" class="mm-tab active" onclick="window.setMiniMapMode('room')">🏠 Otaq</button>
            <button id="mm-tab-floor" class="mm-tab" onclick="window.setMiniMapMode('floor')">📐 5-ci Mərtəbə</button>
          </div>
          <div style="display:flex; align-items:center; gap:6px;">
            <span id="tour-minimap-apt-info" style="color:#60a5fa; font-weight:800; font-size:11px;">№ 52 &bull; 68.6 m²</span>
            <button class="mm-btn-collapse" id="btn-toggle-minimap" onclick="window.toggleMiniMapCollapse()" title="Xəritəni Gizlət / Göstər">−</button>
          </div>
        </div>

        <!-- Mode 1: Single Apartment Room Blueprint with Live Radar Cone -->
        <div id="tour-minimap-room-wrap" class="tour-minimap-blueprint-wrap">
          <img class="tour-minimap-img" id="tour-minimap-img" src="tour_360/apt_52/blueprint.png" alt="Mənzil Çertyoj Planı" />
          <div class="minimap-overlay">
            <div id="map-room-hall" class="minimap-zone" style="left: 60%; top: 24%; width: 12%; height: 14%;" onclick="window.switchRoom('hall')" title="Dəhliz"></div>
            <div id="map-room-kitchen" class="minimap-zone" style="left: 45%; top: 24%; width: 15%; height: 14%;" onclick="window.switchRoom('kitchen')" title="Mətbəx"></div>
            <div id="map-room-bathroom" class="minimap-zone" style="left: 61%; top: 38%; width: 13%; height: 14%;" onclick="window.switchRoom('bathroom')" title="Sanitar qovşaq"></div>
            <div id="map-room-living" class="minimap-zone" style="left: 28%; top: 38%; width: 23%; height: 23%;" onclick="window.switchRoom('living')" title="Qonaq otağı"></div>
            <div id="map-room-bedroom" class="minimap-zone" style="left: 46%; top: 54%; width: 17%; height: 18%;" onclick="window.switchRoom('bedroom')" title="Yataq otağı"></div>
            <div id="map-room-balcony" class="minimap-zone" style="left: 28%; top: 64%; width: 18%; height: 14%;" onclick="window.switchRoom('balcony')" title="Eyvan"></div>
            
            <!-- Live Radar Cone & Position Marker -->
            <div id="minimap-radar-marker" style="left: 65%; top: 30%;">
              <div id="minimap-radar-cone"></div>
              <div id="minimap-radar-dot"></div>
            </div>
          </div>
        </div>

        <!-- Mode 2: Full Floor 5 Architectural Blueprint with all 17 apartment pins -->
        <div id="tour-minimap-floor-wrap" class="tour-minimap-blueprint-wrap" style="display:none; background:#0f172a;">
          <img class="tour-minimap-img" src="floorplans/floor_5.webp" onerror="this.src='floorplans/floor_5.png'" alt="5-ci Mərtəbə Çertyoju" style="object-fit:cover; width:100%; height:100%; opacity:0.92;" />
          <div class="minimap-overlay" id="floor-pins-overlay">
            <!-- 17 interactive apartment pins injected here -->
          </div>
        </div>
      </div>

      <!-- Human Walk Navigation Floating Dock -->
      <div class="tour-walk-nav" id="tour-walk-dock">
        <button class="tour-walk-btn" id="btn-walk-forward" onclick="window.stepWalk('forward')" title="Önə doğru addımla (W / ↑)">
          <span>🚶‍♂️ Önə</span>
          <span class="walk-key">W</span>
        </button>
        <button class="tour-walk-btn" id="btn-walk-backward" onclick="window.stepWalk('backward')" title="Geriyə addımla (S / ↓)">
          <span>↩ Geri</span>
          <span class="walk-key">S</span>
        </button>
        <button class="tour-walk-btn" id="btn-walk-left" onclick="window.stepWalk('left')" title="Sola Addımla (A / ←)">
          <span>◀ Sola</span>
          <span class="walk-key">A</span>
        </button>
        <button class="tour-walk-btn" id="btn-walk-right" onclick="window.stepWalk('right')" title="Sağa Addımla (D / →)">
          <span>Sağa ▶</span>
          <span class="walk-key">D</span>
        </button>
      </div>

      <!-- Side Controls -->
      <div class="tour-side-controls">
        <button class="tour-icon-btn" onclick="window.tourZoom(-8)" title="Yaxınlaşdır">+</button>
        <button class="tour-icon-btn" onclick="window.tourZoom(8)" title="Uzaqlaşdır">−</button>
        <button class="tour-icon-btn" id="btn-flip-v" onclick="window.toggleFlipV()" title="Şəkli Şaquli Çevir (Baş-Ayaq)">↕</button>
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

    // Populate Apartment Dropdown
    populateAptSelect();

    // Populate Floor Blueprint Pins
    renderFloorPins();

    // Build bottom room tabs
    buildRoomTabs();

    const savedKey = localStorage.getItem("BLOCKADE_API_KEY");
    if (savedKey) {
      const keyInput = document.getElementById("blockade-api-key-input");
      if (keyInput) keyInput.value = savedKey;
    }
  }

  function populateAptSelect() {
    const sel = document.getElementById("tour-apt-select");
    if (!sel) return;
    sel.innerHTML = "";
    Object.values(FLOOR_5_APARTMENTS).forEach(apt => {
      const opt = document.createElement("option");
      opt.value = String(apt.number);
      opt.textContent = `Mənzil № ${apt.number} • ${apt.netArea} (${apt.roomsShort || apt.roomsDesc})`;
      if (apt.number === currentAptNum) opt.selected = true;
      sel.appendChild(opt);
    });
  }

  function renderFloorPins() {
    const overlay = document.getElementById("floor-pins-overlay");
    if (!overlay) return;
    overlay.innerHTML = "";

    Object.values(FLOOR_5_APARTMENTS).forEach(apt => {
      const pin = document.createElement("div");
      pin.className = `floor-apt-pin ${apt.number === currentAptNum ? 'active' : ''}`;
      pin.setAttribute("data-apt", String(apt.number));
      pin.style.left = `${apt.x_pct}%`;
      pin.style.top = `${apt.y_pct}%`;
      pin.innerHTML = `<span>№ ${apt.number}</span>`;
      pin.title = `№ ${apt.number} • ${apt.netArea} • ${apt.roomsDesc}`;
      pin.onclick = (e) => {
        e.stopPropagation();
        window.switchApartment(apt.number);
      };
      overlay.appendChild(pin);
    });
  }

  function buildRoomTabs() {
    const tabsContainer = document.getElementById("tour-room-tabs");
    if (!tabsContainer) return;
    tabsContainer.innerHTML = "";
    const config = getCurrentAptConfig();
    Object.values(config.rooms).forEach(r => {
      const tab = document.createElement("button");
      tab.className = `tour-room-tab ${r.id === currentRoomId ? 'active' : ''}`;
      tab.id = `tour-tab-${r.id}`;
      tab.innerHTML = `<span>${r.icon}</span> <span>${r.name}</span> <small style="opacity:0.65;font-size:11px;">(${r.area})</small>`;
      tab.onclick = () => switchRoom(r.id);
      tabsContainer.appendChild(tab);
    });
  }

  // Preload room textures into memory to eliminate lag
  function preloadAllTextures() {
    if (!textureLoader) return;
    const config = getCurrentAptConfig();
    Object.values(config.rooms).forEach(room => {
      if (!textureCache[room.image]) {
        textureLoader.load(room.image + CACHE_BUST, (tex) => {
          tex.mapping = window.THREE.UVMapping;
          tex.colorSpace = window.THREE.SRGBColorSpace;
          tex.minFilter = window.THREE.LinearFilter;
          tex.magFilter = window.THREE.LinearFilter;
          textureCache[room.image] = tex;
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
    fov = Math.max(45, Math.min(92, fov + event.deltaY * 0.04));
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

      // Natural Human Walk Dynamics
      if (isHumanMode) {
        currentBob += ((Math.sin(walkBobPhase) * 2.8) - currentBob) * 0.22;
        headRoll += ((Math.sin(walkBobPhase * 0.5) * 0.007) - headRoll) * 0.16;
      } else {
        currentBob += (0 - currentBob) * 0.2;
        headRoll += (0 - headRoll) * 0.2;
      }

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
    // EXACT FORWARD & STRAFE DIRECTION (Aligned 1:1 with camera lookAt):
    const fX = Math.cos(rad);
    const fZ = Math.sin(rad);
    const rX = -Math.sin(rad);
    const rZ = Math.cos(rad);

    const speed = 75; // units per second
    const dx = (fX * moveForward + rX * moveSide) * speed * dt;
    const dz = (fZ * moveForward + rZ * moveSide) * speed * dt;

    targetOffset.x += dx;
    targetOffset.z += dz;
    const prevPhase = walkBobPhase;
    walkBobPhase += dt * 8.6;

    // Trigger procedural footstep sound at the bottom of each step
    if (Math.floor(walkBobPhase / Math.PI) > Math.floor(prevPhase / Math.PI)) {
      playFootstepSound();
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
    // Doorway navigation is intentionally triggered via clicking doorway pins
  }

  // Switch Active Room
  function switchRoom(roomId, targetYaw = null, resetView = true) {
    const config = getCurrentAptConfig();
    const room = config.rooms[roomId];
    if (!room) return;

    currentRoomId = roomId;

    // Update Room Title
    const titleEl = document.getElementById("tour-room-title");
    if (titleEl) {
      titleEl.innerHTML = `<strong>5-ci Mərtəbə &bull; Mənzil № ${config.number}</strong> &bull; <span style="color:#60a5fa;">${room.name}</span> <span style="color:#94a3b8;font-size:12px;">(${room.area})</span>`;
    }

    // Update bottom tabs
    document.querySelectorAll(".tour-room-tab").forEach(tab => tab.classList.remove("active"));
    const activeTab = document.getElementById(`tour-tab-${roomId}`);
    if (activeTab) activeTab.classList.add("active");

    // Update Blueprint Mini-Map active zone
    document.querySelectorAll(".minimap-room, .minimap-zone").forEach(r => r.classList.remove("active"));
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
    if (textureCache[room.image] && sphereMesh && sphereMesh.material) {
      sphereMesh.material.map = textureCache[room.image];
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
      room.image + CACHE_BUST,
      (texture) => {
        texture.mapping = window.THREE.UVMapping;
        texture.colorSpace = window.THREE.SRGBColorSpace;
        texture.minFilter = window.THREE.LinearFilter;
        texture.magFilter = window.THREE.LinearFilter;
        textureCache[room.image] = texture;

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

    const config = getCurrentAptConfig();
    const targetRoom = config.rooms[targetRoomId];
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
    let step1Done = false, step2Done = false, step3Done = false;

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

      // Footstep audio cues during doorway walking
      if (progress >= 0.15 && !step1Done) {
        step1Done = true;
        playFootstepSound();
      }
      if (progress >= 0.48 && !step2Done) {
        step2Done = true;
        playFootstepSound();
      }
      if (progress >= 0.80 && !step3Done) {
        step3Done = true;
        playFootstepSound();
      }

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
    const config = getCurrentAptConfig();
    const room = config.rooms[currentRoomId];
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
      // Walk forward inside room aligned 1:1 with camera look direction
      playFootstepSound();
      const rad = (lon * Math.PI) / 180;
      targetOffset.x += Math.cos(rad) * 35;
      targetOffset.z += Math.sin(rad) * 35;
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
    playFootstepSound();
    const rad = (lon * Math.PI) / 180;
    targetOffset.x -= Math.cos(rad) * 35;
    targetOffset.z -= Math.sin(rad) * 35;
    walkBobPhase += Math.PI * 0.8;

    const dist = Math.hypot(targetOffset.x, targetOffset.z);
    if (dist > 95) {
      const scale = 95 / dist;
      targetOffset.x *= scale;
      targetOffset.z *= scale;
    }
  }

  // Walk strafe left / right action
  function walkStrafe(side) {
    playFootstepSound();
    const rad = (lon * Math.PI) / 180;
    const factor = (side === 'right' ? 32 : -32);
    targetOffset.x += Math.sin(rad) * factor;
    targetOffset.z += -Math.cos(rad) * factor;
    walkBobPhase += Math.PI * 0.8;

    const dist = Math.hypot(targetOffset.x, targetOffset.z);
    if (dist > 95) {
      const scale = 95 / dist;
      targetOffset.x *= scale;
      targetOffset.z *= scale;
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
    const radarMarker = document.getElementById("minimap-radar-marker");
    const radarCone = document.getElementById("minimap-radar-cone");
    if (!radarMarker) return;

    // Room center percentages matching each apartment's individual blueprint crop
    const aptRoomPositions = {
      52: {
        hall: { left: 65, top: 30 },
        kitchen: { left: 52, top: 30 },
        bathroom: { left: 68, top: 45 },
        living: { left: 40, top: 48 },
        bedroom: { left: 55, top: 62 },
        balcony: { left: 37, top: 72 }
      }
    };

    const aptMap = aptRoomPositions[currentAptNum] || aptRoomPositions[52];
    const pos = aptMap[currentRoomId] || { left: 50, top: 50 };
    radarMarker.style.left = `${pos.left}%`;
    radarMarker.style.top = `${pos.top}%`;

    // Rotate the field-of-view radar cone
    if (radarCone) {
      radarCone.style.transform = `rotate(${lon}deg)`;
    }
  }

  // Keyboard Navigation Bindings
  window.addEventListener("keydown", (e) => {
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

    const targetNum = parseInt(aptNumber, 10);
    if (!isNaN(targetNum) && FLOOR_5_APARTMENTS[targetNum]) {
      window.switchApartment(targetNum);
    } else {
      window.switchApartment(currentAptNum || 52);
    }
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

  // Switch between any of the 17 apartments on Floor 5
  window.switchApartment = function (aptNum) {
    const num = parseInt(aptNum, 10);
    if (!FLOOR_5_APARTMENTS[num]) return;
    currentAptNum = num;

    // Update Dropdown
    const aptSelect = document.getElementById("tour-apt-select");
    if (aptSelect) aptSelect.value = String(num);

    // Update Minimap header info
    const aptConfig = getCurrentAptConfig();
    const mmInfo = document.getElementById("tour-minimap-apt-info");
    if (mmInfo) {
      mmInfo.innerHTML = `№ ${aptConfig.number} &bull; ${aptConfig.netArea}`;
    }

    // Update Apartment Individual Architectural Blueprint in Minimap
    const mmImg = document.getElementById("tour-minimap-img");
    if (mmImg) {
      mmImg.src = `tour_360/apt_${num}/blueprint.png${CACHE_BUST}`;
    }

    // Update Floor Blueprint active pin
    document.querySelectorAll(".floor-apt-pin").forEach(pin => {
      if (pin.getAttribute("data-apt") === String(num)) {
        pin.classList.add("active");
      } else {
        pin.classList.remove("active");
      }
    });

    // Rebuild room tabs
    buildRoomTabs();

    // Preload textures
    preloadAllTextures();

    // Switch to entrance room
    switchRoom(aptConfig.initialRoom || "hall", null, true);
  };

  // Toggle Minimap display modes: 'room' or 'floor'
  window.setMiniMapMode = function (mode) {
    miniMapMode = mode;
    const roomWrap = document.getElementById("tour-minimap-room-wrap");
    const floorWrap = document.getElementById("tour-minimap-floor-wrap");
    const tabRoom = document.getElementById("mm-tab-room");
    const tabFloor = document.getElementById("mm-tab-floor");

    if (mode === "floor") {
      if (roomWrap) roomWrap.style.display = "none";
      if (floorWrap) floorWrap.style.display = "block";
      if (tabRoom) tabRoom.classList.remove("active");
      if (tabFloor) tabFloor.classList.add("active");
    } else {
      if (roomWrap) roomWrap.style.display = "block";
      if (floorWrap) floorWrap.style.display = "none";
      if (tabRoom) tabRoom.classList.add("active");
      if (tabFloor) tabFloor.classList.remove("active");
    }
  };

  window.switchRoom = function (roomId) {
    switchRoom(roomId);
  };

  window.tourZoom = function (delta) {
    if (!camera) return;
    fov = Math.max(45, Math.min(92, fov + delta));
    camera.fov = fov;
    camera.updateProjectionMatrix();
  };

  window.tourWalkForward = function () {
    walkForward();
  };

  window.tourWalkBackward = function () {
    walkBackward();
  };

  window.tourWalkLeft = function () {
    walkStrafe('left');
  };

  window.tourWalkRight = function () {
    walkStrafe('right');
  };

  window.stepWalk = function (dir) {
    if (dir === 'forward') walkForward();
    else if (dir === 'backward') walkBackward();
    else if (dir === 'left') walkStrafe('left');
    else if (dir === 'right') walkStrafe('right');
  };

  window.startWalk = function (keyCode) {
    keysDown[keyCode] = true;
    const modal = document.getElementById("tour-360-modal");
    if (modal) modal.classList.add("walking-active");
  };

  window.stopWalk = function (keyCode) {
    keysDown[keyCode] = false;
    const anyWalking = keysDown["KeyW"] || keysDown["KeyS"] || keysDown["KeyA"] || keysDown["KeyD"] || keysDown["ArrowUp"] || keysDown["ArrowDown"] || keysDown["ArrowLeft"] || keysDown["ArrowRight"];
    if (!anyWalking) {
      const modal = document.getElementById("tour-360-modal");
      if (modal) modal.classList.remove("walking-active");
    }
  };

  window.toggleHumanMode = function () {
    isHumanMode = !isHumanMode;
    const btn = document.getElementById("btn-human-mode");
    const txt = document.getElementById("human-mode-text");
    if (btn) {
      if (isHumanMode) {
        btn.classList.add("active");
        if (txt) txt.textContent = "🚶 İnsan Modu: AKTİV";
      } else {
        btn.classList.remove("active");
        if (txt) txt.textContent = "🚶 İnsan Modu: DEAKTİV";
      }
    }
    if (isHumanMode) playFootstepSound();
  };

  window.toggleFootstepSound = function () {
    isFootstepSoundEnabled = !isFootstepSoundEnabled;
    const icon = document.getElementById("sound-icon");
    const btn = document.getElementById("btn-sound-toggle");
    if (btn) {
      if (isFootstepSoundEnabled) {
        btn.classList.add("active");
        if (icon) icon.textContent = "🔊";
        playFootstepSound();
      } else {
        btn.classList.remove("active");
        if (icon) icon.textContent = "🔇";
      }
    }
  };

  window.toggleMiniMapCollapse = function () {
    isMiniMapCollapsed = !isMiniMapCollapsed;
    const mm = document.getElementById("tour-minimap");
    const btn = document.getElementById("btn-toggle-minimap");
    if (mm) {
      if (isMiniMapCollapsed) {
        mm.classList.add("collapsed");
        if (btn) btn.textContent = "+";
      } else {
        mm.classList.remove("collapsed");
        if (btn) btn.textContent = "−";
      }
    }
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
    const engine = document.getElementById("ai-engine-select").value;
    const keyGroup = document.getElementById("blockade-key-group");
    const submitBtn = document.getElementById("blockade-submit-btn");

    if (engine === "blockade") {
      keyGroup.style.display = "block";
      submitBtn.textContent = "🚀 Skybox API ilə Generasiya Et";
    } else {
      keyGroup.style.display = "none";
      submitBtn.textContent = "🚀 360° Şəkli Pulsuz Generasiya Et";
    }
  };

  window.startAIGeneration = function () {
    const engine = document.getElementById("ai-engine-select").value;
    if (engine === "blockade") {
      startBlockadeGeneration();
    } else {
      startPollinationsGeneration();
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
    const userPrompt = promptInput.value.trim() || "modern luxury apartment room, high-end furniture, bright natural daylight, elegant interior";

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

      const cfg = getCurrentAptConfig();
      if (cfg.rooms[roomId]) {
        cfg.rooms[roomId].image = imageUrl;
      }
      delete textureCache[imageUrl];

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
            const cfg = getCurrentAptConfig();
            if (cfg.rooms[roomId]) {
              cfg.rooms[roomId].image = fileUrl;
            }
            delete textureCache[fileUrl];

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
