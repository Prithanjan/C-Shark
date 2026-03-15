# 🌿 Ethos-Vision — The Autonomous Supply Chain Oracle

> *Empowering conscious consumption through real-time, autonomous ethical verification.*

---

## 🧭 Overview

**Ethos-Vision** is an AI-powered supply chain transparency platform that lets consumers instantly verify the ethical credentials of any product by scanning its barcode or receipt. It goes **beyond traditional RAG** — instead of just retrieving data, it autonomously investigates and verifies claims in real time using a swarm of specialized AI agents.

---

## 🚨 The Problem

Global supply chains are opaque, and consumers are being left in the dark:

- **70%** of consumers want to buy ethically
- **90%** distrust corporate sustainability claims
- **Static Data** — Current "green scores" rely on outdated, self-reported, or incomplete corporate disclosures
- **Transparency Gap** — No real-time way to verify the ethical journey of a product at the point of purchase
- **Information Asymmetry** — Corporations hold the data; consumers are left with marketing buzzwords

---

## ✅ The Solution

Ethos-Vision bridges this gap with a **3-step autonomous pipeline**:

```
1. SCAN       →    User scans a barcode or receipt
2. INVESTIGATE →   AI agent swarm autonomously crawls the web & verifies claims
3. REVEAL     →    Complex data becomes a compelling, interactive ethical narrative
```

---

## 🔍 Core Features

### 🖼️ Multi-Modal Vision Intelligence
- Powered by **Gemini 1.5 Pro** and **GPT-4o Vision** for high-accuracy OCR and object recognition
- Processes barcodes, product labels, and store receipts
- Zero manual data entry — one snap triggers the entire research swarm
- Extracts: Brand & parent company, Product SKU & manufacturing batch, Geographic origin & logistics hubs

### 🤖 Autonomous Research Swarm
Orchestrated via **LangGraph** and **CrewAI**, four specialized agents run in parallel:

| Agent | Role |
|-------|------|
| ⚖️ **Labor Auditor** | Investigates factory conditions, wage reports, and labor union disclosures |
| 🌿 **Carbon Tracker** | Estimates logistics and manufacturing emissions via shipping routes and energy grid data |
| 📰 **News Fact-Checker** | Scans global news archives and NGO databases for ethical controversies |
| 🔍 **Trust Verifier** | Validates corporate claims against third-party certifications and satellite imagery |

### 📊 Real-Time Verification & Fact-Checking

**Dynamic Research Sources:**
- Live web crawl
- Financial reports
- Satellite imagery
- News archives
- NGO databases
- Legal filings

**Verification Logic:**
- **Cross-Referencing** — Agents validate marketing claims against independent news and financial data
- **Conflict Detection** — Identifies discrepancies between self-reported sustainability and actual supply chain behavior
- **Evidence-Based** — Every score component is backed by a specific, verifiable source link

### 📖 Interactive Ethical Narrative
- **Personalized Storytelling** — Complex supply chain data converted into easy-to-understand narratives tailored to user values
- **Drill-Down Capabilities** — Users interact with specific agent findings to view source documents, news reports, or carbon calculations
- **Actionable Insights** — Suggests ethical alternatives in real time if a product fails the user's personal criteria

---

## 🏗️ Technical Architecture

### Frontend
- **React + Tailwind CSS** — Sleek, responsive web application
- **Scan-to-Story UX** — Intuitive mobile-first user experience
- **Real-time UI** — Live progress bars showing agent research as it happens

### Backend
- **Python** — High-performance agentic core
- **LangGraph** — Complex multi-agent orchestration
- **Vision LLMs** — Gemini 1.5 Pro / GPT-4o for multi-modal OCR and object recognition

### Scalability
- **Intelligent Caching** — Verified findings stored and reused to reduce redundant crawls
- **Periodic Updates** — Agents refresh data asynchronously in the background
- **Distributed Swarms** — Horizontal scaling of agent tasks for millions of products

---

## 📐 Architecture Diagram

```
User (Mobile/Web)
        │
        ▼
  [Vision LLM Layer]
  Gemini 1.5 Pro / GPT-4o
  Barcode / Label / Receipt OCR
        │
        ▼
  [Orchestration Layer]
  LangGraph + CrewAI
        │
   ┌────┴─────┬──────────┬──────────┐
   ▼          ▼          ▼          ▼
Labor      Carbon      News       Trust
Auditor    Tracker   Fact-Check  Verifier
   │          │          │          │
   └────┬─────┴──────────┴──────────┘
        ▼
  [Scoring Engine]
  Dynamic Ethos Score (0–100)
  Verified against N independent sources
        │
        ▼
  [Narrative Engine]
  Personalized Ethical Story + Alternatives
        │
        ▼
  React Frontend — Interactive UI
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- API Keys: Gemini 1.5 Pro, OpenAI GPT-4o

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ethos-vision.git
cd ethos-vision

# Install backend dependencies
pip install -r requirements.txt

# Install frontend dependencies
cd frontend
npm install
```

### Environment Setup

Create a `.env` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key
SERP_API_KEY=your_serp_api_key
```

### Run the App

```bash
# Start backend
python main.py

# Start frontend (in a separate terminal)
cd frontend
npm run dev
```

---

## 📁 Project Structure

```
ethos-vision/
├── backend/
│   ├── agents/
│   │   ├── labor_auditor.py
│   │   ├── carbon_tracker.py
│   │   ├── news_factchecker.py
│   │   └── trust_verifier.py
│   ├── orchestration/
│   │   └── swarm.py          # LangGraph + CrewAI orchestration
│   ├── vision/
│   │   └── ocr.py            # Gemini / GPT-4o vision pipeline
│   └── scoring/
│       └── ethos_score.py    # Dynamic scoring engine
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   └── pages/
│   └── public/
├── .env.example
├── requirements.txt
└── README.md
```

---

## 🎯 Ethos Score

The **Dynamic Ethos Score** (0–100) is calculated from four weighted dimensions:

| Dimension | Weight | Data Sources |
|-----------|--------|--------------|
| Labor Rights | 30% | WRC, CLW, ILO databases |
| Carbon Footprint | 25% | Shipping routes, energy grid data |
| Fair Trade | 25% | RSPO, Rainforest Alliance, Fairtrade certs |
| Transparency | 20% | Corporate filings, SEC, NGO audits |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🌍 Vision

> *"Moving from blind trust to verified transparency through autonomous agentic reasoning."*

Ethos-Vision is designed to handle **millions of products** with real-time verification — putting the power of supply chain transparency directly in the hands of every consumer, at the moment that matters most: the point of purchase.

---

<p align="center">Built with ⚡ LangGraph · CrewAI · Gemini · GPT-4o · React</p>
