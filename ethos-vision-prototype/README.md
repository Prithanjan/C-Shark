# 🔍 Ethos-Vision: The Autonomous Supply Chain Oracle

<div align="center">

![Ethos-Vision Banner](https://img.shields.io/badge/Ethos--Vision-AI%20Powered-1132d4?style=for-the-badge&logo=google&logoColor=white)
![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react&logoColor=black)
![Python](https://img.shields.io/badge/Python-3.9+-3776ab?style=for-the-badge&logo=python&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini-1.5%20Flash-4285f4?style=for-the-badge&logo=google&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-API-000000?style=for-the-badge&logo=flask&logoColor=white)

**Upload a product image. Watch AI swarm agents expose the ethical truth behind your supply chain.**

[🚀 Live Demo](#running-locally) · [📖 API Docs](https://ai.google.dev/gemini-api/docs) · [📞 Contact](tel:8278624771)

</div>

---

## 🧠 What is Ethos-Vision?

**Ethos-Vision** is a hackathon prototype for an AI-powered autonomous supply chain ethics auditor. A user uploads any product image — a barcode, label, receipt, or packaging photo — and an AI swarm of specialized agents autonomously investigates and returns a structured **Ethos Score** from 0–100, along with a detailed ethical audit.

The system acts as an oracle: transparent, data-driven, and impartial — quantifying corporate integrity in real-time.

---

## 🎯 Product Requirements Document (PRD)

### Problem Statement

Consumers and enterprises have no easy way to evaluate the ethical footprint of a product at the point of decision. Supply chain transparency is buried in ESG reports, scattered across news sources, and largely inaccessible to the average buyer. Greenwashing, labor exploitation, and carbon deception go unchallenged.

### Goal

Build a tool that gives any product a real-time, AI-verified **"Ethos Score"** — a single number that summarizes labor rights, environmental impact, news reputation, and certification trustworthiness.

### Target Users

- 🛒 Conscious consumers wanting to make ethical purchase decisions
- 🏢 Enterprise procurement teams performing supplier audits
- 📊 ESG analysts and sustainability researchers
- 🎓 Educators and policy researchers

### Core Features

| Feature | Description |
|---|---|
| 📸 Image Upload | Product label, barcode, receipt, or any product image |
| 🤖 AI Swarm | 4 autonomous agents audit labor, carbon, news, and certifications |
| 📊 Ethos Score | 0–100 composite ethical integrity score |
| 🟢🟡🔴 Verdict | Instant Good / Average / Bad classification |
| 📋 Sub-scores | Labor Rights, Carbon Impact, News & Controversies, Trust & Certifications |
| 📝 Summary | 3-4 sentence AI-generated ethical audit narrative |
| 🎭 Demo Mode | Realistic fallback data when live AI is unavailable |

### Score Scale

| Range | Verdict | Meaning |
|---|---|---|
| 70 – 100 | ✅ **Good** | Strong ethical practices, verified certifications, minimal controversy |
| 45 – 69 | ⚠️ **Average** | Mixed record, some positives but notable concerns exist |
| 0 – 44 | 🚨 **Bad** | Serious ethical issues — labor violations, high emissions, major controversies |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                  ETHOS-VISION                       │
│                                                     │
│  ┌──────────────┐        ┌──────────────────────┐   │
│  │   React/Vite │ ──────▶│   Flask Backend      │   │
│  │   Frontend   │ POST   │   /analyze endpoint  │   │
│  │  (Port 5173) │ ◀───── │   (Port 5000)        │   │
│  └──────────────┘  JSON  └──────────┬───────────┘   │
│                                     │               │
│                                     ▼               │
│                         ┌───────────────────────┐   │
│                         │  Gemini 1.5 Flash     │   │
│                         │  Vision API           │   │
│                         │  (Image → JSON Audit) │   │
│                         └───────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

### AI Swarm Agents

The system simulates a swarm of 4 independent AI agents that each investigate a different dimension of the supply chain:

- 👷 **Labor Auditor** — Monitors fair wages, working conditions, child labor risks
- 🌿 **Carbon Tracker** — Scope 1-3 emissions, environmental certifications, deforestation
- 📰 **News Fact-Checker** — Cross-references global news for controversies, lawsuits, greenwashing
- 🔐 **Trust Verifier** — Validates sustainability certifications, blockchain records, transparency reports

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React 18 + Vite | Fast SPA with hot reload |
| Styling | Vanilla CSS | Custom dark theme, glassmorphism, responsive |
| Backend | Python 3.9+ + Flask | REST API server |
| AI Engine | Google Gemini 1.5 Flash | Vision understanding + JSON audit |
| CORS | Flask-CORS | Cross-origin frontend/backend communication |
| Config | python-dotenv | Secure API key management |
| Image Processing | Pillow | Image preprocessing for Gemini |

---

## 📁 Project Structure

```
ethos-vision-prototype/
├── 📄 README.md                    # This file
├── 📄 .gitignore                   # Excludes venv, node_modules, .env, builds
│
├── 🖥️ frontend/                    # React + Vite application
│   ├── index.html                  # HTML entry point
│   ├── package.json               # Node dependencies
│   ├── vite.config.js             # Vite build config
│   ├── public/
│   │   └── favicon.svg            # App icon
│   └── src/
│       ├── main.jsx               # React entry point
│       ├── App.jsx                # Full application (landing + analyzer)
│       └── index.css              # Complete design system (dark theme)
│
└── ⚙️ backend/                     # Flask API server
    ├── app.py                      # Main Flask application + Gemini integration
    ├── requirements.txt           # Python dependencies
    └── .env                       # API keys (not committed)
```

---

## ⚡ Running Locally

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.9+
- A **Google Gemini API key** — get one free at [aistudio.google.com](https://aistudio.google.com)

### 1. Backend Setup

```bash
cd ethos-vision-prototype/backend

# Create and activate virtual environment
python -m venv venv
.\venv\Scripts\activate          # Windows
source venv/bin/activate          # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Create .env file with your Gemini key
echo "GEMINI_API_KEY=your_key_here" > .env

# Start the Flask server
python app.py
# → Running on http://localhost:5000
```

### 2. Frontend Setup

```bash
cd ethos-vision-prototype/frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
# → Running on http://localhost:5173
```

### 3. Open Your Browser

Navigate to **[http://localhost:5173](http://localhost:5173)**

> **No API key?** No problem. The app includes a **Demo Mode** that returns realistic audit data so you can still demo the full experience.

---

## 🔌 API Reference

### `POST /analyze`

Analyzes a product image and returns an ethical audit.

**Request:** `multipart/form-data`
| Field | Type | Description |
|---|---|---|
| `image` | File | Product image (JPEG, PNG, WEBP) |

**Response:** `application/json`
```json
{
  "product_name": "Classic Cola Can (330ml)",
  "brand_name": "Coca-Cola",
  "ethos_score": 52,
  "labor_score": 60,
  "carbon_score": 41,
  "news_score": 58,
  "trust_score": 48,
  "summary": "Coca-Cola scores moderately...",
  "source": "live"
}
```

| Field | Range | Description |
|---|---|---|
| `ethos_score` | 0–100 | Overall composite ethical score |
| `labor_score` | 0–100 | Labor rights & worker conditions |
| `carbon_score` | 0–100 | Environmental & carbon footprint |
| `news_score` | 0–100 | Media reputation (lower = more controversy) |
| `trust_score` | 0–100 | Certifications & transparency |
| `source` | `"live"` / `"demo"` | Whether result is from AI or demo fallback |

---

## 🔮 Future Roadmap

- [ ] **Barcode Scanning** — Real-time camera barcode reader integration
- [ ] **Historical Tracking** — Score change over time with trend graphs
- [ ] **Supplier Database** — Searchable database of 10,000+ brand scores
- [ ] **Browser Extension** — Score overlay while shopping on Amazon/Flipkart
- [ ] **Blockchain Attestation** — Immutable on-chain score records
- [ ] **Enterprise API** — B2B REST API for integration into procurement systems
- [ ] **Mobile App** — React Native app for scan-in-store functionality

---

## 👥 Team

Built with ❤️ for hackathon 2026.

📞 **Contact:** [+91 82786 24771](tel:8278624771)
📚 **AI API:** [Google Gemini API Docs](https://ai.google.dev/gemini-api/docs)

---

<div align="center">
<b>© 2026 Ethos-Vision AI · Built for Hackathon 2026</b>
</div>
