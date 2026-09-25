# CRISISLENS: Autonomous Multimodal AI Disaster Intelligence Platform

> **Detect. Understand. Predict. Simulate. Respond.**  
> An autonomous disaster intelligence and emergency response decision-support suite powered by a **Triple-Model Lightweight Feature Fusion Architecture (Small CV Model + Small NLP Model + GIS Spatial Engine)**.

---

## 🏛️ System Architecture: Two-Folder Monorepo

The codebase is split into two specialized applications:

```text
DiasterLens/
├── web/                     # Monitor & Command Center for Emergency Responders & Officials (Port 3000)
│   ├── app/                 # Next.js 14 Dashboard, GIS Digital Twin, 3-Model Fusion Inspector, What-If Simulator
│   ├── components/          # Decision-support UI, Explainable AI visualizer, Leaflet CartoDB map
│   ├── lib/ai/              # Small CV Model, Small NLP Model, GIS Engine, Feature Fusion, Priority Engine
│   └── types/               # TypeScript disaster schemas
│
├── app/                     # Citizen & Field Emergency Reporter Mobile Web App (Port 3001)
│   ├── app/                 # 1-Tap SOS Beacon, Multimodal Report (Photo/Video/Voice), Live Rescue Tracker, Shelters
│   ├── components/          # Mobile-first emergency UI, GPS auto-detect, Voice note recorder
│   └── lib/                 # SOS dispatch client
│
└── package.json             # Root monorepo launcher
```

---

## 🔬 The 3-Model Feature Fusion Innovation

```
                     INPUT DISASTER DATA
                              │
          ┌───────────────────┼───────────────────┐
          ↓                   ↓                   ↓
  Images / Video / Sat    Text / Voice Note   GPS Coordinates
          ↓                   ↓                   ↓
     Small CV Model      Small NLP Model      GIS Engine
    (Damage, Depth,      (Urgency, Victims,   (DEM Elevation, Rain,
    Stranded BBoxes)     Critical Needs)      Road Accessibility)
          └───────────────────┼───────────────────┘
                              ↓
                    Feature Fusion Layer
            (Cross-Modal Consistency & Uncertainty)
                              ↓
                   Dynamic Priority Engine
         (Sev × Exp × Vuln) / (Accessibility × Fleet)
                              ↓
              Explainable Decision Dashboard
```

1. **Small CV Model (`web/lib/ai/cv-model.ts`)**: Analyzes satellite SAR passes, CCTV cameras, citizen photos, and drone footage to calculate inundation depth, structural collapse severity, and localized bounding boxes for stranded victims.
2. **Small NLP Model (`web/lib/ai/nlp-model.ts`)**: Parses text descriptions, 112/911 voice audio transcripts, and citizen distress messages to extract victim counts, medical urgency (insulin/oxygen), and critical gear requirements.
3. **GIS Spatial Engine (`web/lib/ai/gis-engine.ts`)**: Integrates Digital Elevation Models (DEM), live precipitation telemetry (mm/hr), river gauge catchments, and road network accessibility.
4. **Feature Fusion Layer (`web/lib/ai/feature-fusion.ts`)**: Merges vectors across modalities and detects contradictions (e.g. text claims collapse but image shows minor waterlogging).
5. **Explainable AI (XAI) Output**: Visual bounding boxes and contextual justifications show emergency responders *why* attention is required first.
6. **Authorised Human Control Protocol**: Flags low-confidence predictions (<75%) for mandatory human ground-truth sign-off.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Applications

- **Run Command & Monitor Center (`web/`)**:
  ```bash
  npm run dev:web
  ```
  Accessible at: **`http://localhost:3000`**

- **Run Citizen & Field Reporter App (`app/`)**:
  ```bash
  npm run dev:app
  ```
  Accessible at: **`http://localhost:3001`**

- **Build Both Apps for Production**:
  ```bash
  npm run build
  ```

---

## 📦 Push to GitHub Repository

```bash
git init
git add .
git commit -m "feat: complete split into web monitor and citizen app with 3-model fusion"
git branch -M main
git remote add origin https://github.com/Akashresi/CrisisLens.git
git push -u origin main
```
