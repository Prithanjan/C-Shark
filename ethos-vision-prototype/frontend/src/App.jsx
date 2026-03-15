import { useState, useRef } from 'react';
import './index.css';

function ScoreBar({ label, score, icon }) {
  const color = score >= 70 ? '#22c55e' : score >= 45 ? '#f59e0b' : '#ef4444';
  return (
    <div className="score-bar-item">
      <div className="score-bar-header">
        <span className="score-bar-icon">{icon}</span>
        <span className="score-bar-label">{label}</span>
        <span className="score-bar-value" style={{ color }}>{score}/100</span>
      </div>
      <div className="score-bar-track">
        <div className="score-bar-fill" style={{ width: `${score}%`, background: color }} />
      </div>
    </div>
  );
}

function AnalyzerSection() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [agentStep, setAgentStep] = useState(-1);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const agents = [
    { name: 'Labor Auditor', icon: 'group', key: 'labor_score' },
    { name: 'Carbon Tracker', icon: 'eco', key: 'carbon_score' },
    { name: 'News Fact-Checker', icon: 'verified_user', key: 'news_score' },
    { name: 'Trust Verifier', icon: 'shield', key: 'trust_score' },
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setError(null);
      setResult(null);
      setAgentStep(-1);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    } else {
      setError('Please select a valid image file (JPEG, PNG).');
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);
    setError(null);
    setResult(null);
    setAgentStep(0);

    // Simulate agents activating one-by-one
    for (let i = 0; i < agents.length; i++) {
      await new Promise(res => setTimeout(res, 600));
      setAgentStep(i + 1);
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/analyze', { method: 'POST', body: formData });
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Failed to analyze. Ensure the backend is running on port 5000.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const scoreColor = (s) => s >= 70 ? '#22c55e' : s >= 45 ? '#f59e0b' : '#ef4444';
  const scoreLabel = (s) => s >= 70 ? 'Ethical' : s >= 45 ? 'Moderate' : 'At Risk';

  return (
    <section id="analyzer" className="analyzer-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">Live Oracle</span>
          <h3 className="section-title">Scan a Product</h3>
          <p className="section-subtitle">Upload a product label, barcode, or receipt and let our autonomous AI swarm run an ethical audit in seconds.</p>
        </div>

        {/* Score Legend */}
        <div className="score-legend">
          <span className="legend-title">Ethos Score Guide:</span>
          <span className="legend-item good"><span className="legend-dot" />Good &nbsp;(70–100)</span>
          <span className="legend-item avg"><span className="legend-dot" />Average (45–69)</span>
          <span className="legend-item bad"><span className="legend-dot" />Bad &nbsp;(0–44)</span>
        </div>

        <div className="analyzer-grid">
          {/* Upload Panel */}
          <div className="glass-card upload-panel">
            <div
              className={`drop-zone ${previewUrl ? 'has-image' : ''}`}
              onClick={() => fileInputRef.current.click()}
            >
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} hidden />
              {previewUrl ? (
                <img src={previewUrl} alt="Product Preview" className="preview-image" />
              ) : (
                <div className="drop-placeholder">
                  <span className="material-symbols-outlined drop-icon">add_photo_alternate</span>
                  <p className="drop-text">Click to upload product image</p>
                  <p className="drop-subtext">JPEG, PNG, WEBP</p>
                </div>
              )}
            </div>

            <button
              className="analyze-btn"
              onClick={handleAnalyze}
              disabled={!selectedFile || isAnalyzing}
            >
              {isAnalyzing ? (
                <><span className="spinner-sm" /> Analyzing...</>
              ) : (
                <><span className="material-symbols-outlined">radar</span> Analyze Product</>
              )}
            </button>

            {error && <div className="error-banner">{error}</div>}
          </div>

          {/* Results / Swarm Panel */}
          <div className="glass-card results-panel">
            {!isAnalyzing && !result && (
              <div className="idle-state">
                <span className="material-symbols-outlined idle-icon">auto_awesome</span>
                <p className="idle-title">Oracle Standing By</p>
                <p className="idle-subtitle">Upload a product image to begin the autonomous ethical audit.</p>
              </div>
            )}

            {isAnalyzing && (
              <div className="swarm-view">
                <p className="swarm-title">🔍 Swarm Deployed</p>
                <div className="agents-list">
                  {agents.map((agent, idx) => (
                    <div key={agent.key} className={`agent-card ${agentStep > idx ? 'agent-done' : agentStep === idx ? 'agent-active' : 'agent-idle'}`}>
                      <span className="material-symbols-outlined agent-icon">{agent.icon}</span>
                      <span className="agent-name">{agent.name}</span>
                      <span className="agent-status">
                        {agentStep > idx ? 'Done ✓' : agentStep === idx ? 'Scanning...' : 'Queued'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result && (
              <div className="result-view">
                <div className="result-hero">
                  <div>
                    <p className="result-product">{result.product_name}</p>
                    <p className="result-brand">{result.brand_name}</p>
                    {result.source === 'demo' && <span className="demo-badge">Demo Mode</span>}
                  </div>
                  <div className="score-dial">
                    <span className="score-num" style={{ color: scoreColor(result.ethos_score) }}>{result.ethos_score}</span>
                    <span className="score-denom">/100</span>
                    <span className="score-tag" style={{ color: scoreColor(result.ethos_score) }}>{scoreLabel(result.ethos_score)}</span>
                  </div>
                </div>

                <div className="sub-scores">
                  <ScoreBar label="Labor Rights" score={result.labor_score ?? 50} icon="group" />
                  <ScoreBar label="Carbon Impact" score={result.carbon_score ?? 50} icon="eco" />
                  <ScoreBar label="News & Controversies" score={result.news_score ?? 50} icon="verified_user" />
                  <ScoreBar label="Trust & Certifications" score={result.trust_score ?? 50} icon="shield" />
                </div>

                <div className="summary-box">
                  <div className="summary-header">
                    <h4 className="summary-title">Ethos Summary</h4>
                    <span className="summary-verdict" style={{ background: scoreColor(result.ethos_score) + '22', color: scoreColor(result.ethos_score), border: `1px solid ${scoreColor(result.ethos_score)}44` }}>
                      {result.ethos_score >= 70 ? '✅ Good' : result.ethos_score >= 45 ? '⚠️ Average' : '🚨 Bad'}
                    </span>
                  </div>
                  <p className="summary-text">{result.summary}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="app">
      {/* HEADER */}
      <header className="site-header">
        <div className="header-inner">
          <div className="logo" onClick={() => scrollTo('hero')}>
            <span className="material-symbols-outlined logo-icon">auto_awesome</span>
            <span className="logo-text">Ethos-Vision</span>
          </div>
          <nav className="desktop-nav">
            <a onClick={() => scrollTo('solutions')}>Solutions</a>
            <a onClick={() => scrollTo('technology')}>Technology</a>
            <a onClick={() => scrollTo('score')}>Ethos Score</a>
            <a onClick={() => scrollTo('analyzer')}>Scan Now</a>
          </nav>
          <button className="cta-btn" onClick={() => scrollTo('analyzer')}>Try Live Demo</button>
          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="mobile-nav">
            <a onClick={() => scrollTo('solutions')}>Solutions</a>
            <a onClick={() => scrollTo('technology')}>Technology</a>
            <a onClick={() => scrollTo('score')}>Ethos Score</a>
            <a onClick={() => scrollTo('analyzer')}>Scan Now</a>
            <button className="cta-btn" onClick={() => scrollTo('analyzer')}>Try Live Demo</button>
          </div>
        )}
      </header>

      <main>
        {/* HERO */}
        <section id="hero" className="hero-section">
          <div className="hero-gradient" />
          <div className="section-container hero-inner">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="ping-dot"><span className="ping-inner" /><span className="ping-core" /></span>
                Next-Gen Intelligence
              </div>
              <h1 className="hero-title">
                Autonomous Supply Chain <span className="text-primary">Oracle</span>
              </h1>
              <p className="hero-subtitle">
                Revolutionizing transparency through AI-driven insight, satellite data fusion, and real-time global monitoring of every tier in your ecosystem.
              </p>
              <div className="hero-ctas">
                <button className="cta-btn hero-cta" onClick={() => document.getElementById('analyzer')?.scrollIntoView({ behavior: 'smooth' })}>
                  Get Started <span className="material-symbols-outlined">arrow_forward</span>
                </button>
                <button className="secondary-btn" onClick={() => document.getElementById('analyzer')?.scrollIntoView({ behavior: 'smooth' })}>
                  View Demo
                </button>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-card">
                <div className="hero-card-overlay" />
                <div className="hero-card-overlay-bottom" />
                <div className="hero-node-panel">
                  <div className="node-header">
                    <div className="node-status-dot" /><span>Global Node Status</span>
                    <span className="node-active">Active</span>
                  </div>
                  <div className="node-bar"><div className="node-bar-fill" /></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SOLUTIONS */}
        <section id="solutions" className="section-light">
          <div className="section-container">
            <div className="section-header centered">
              <span className="section-tag">Distributed Intelligence</span>
              <h3 className="section-title">AI Swarm Analysis</h3>
              <p className="section-subtitle">Our autonomous engine processes multi-modal data to ensure ethical compliance and environmental stewardship across the globe.</p>
            </div>
            <div className="cards-grid">
              {[
                { icon: 'group', title: 'Labor Rights', desc: 'Real-time monitoring of fair wage and safe working conditions across all tiers of your supply chain.' },
                { icon: 'eco', title: 'Carbon Tracking', desc: 'Precise calculation of Scope 1-3 emissions using high-resolution multi-modal sensor fusion.' },
                { icon: 'verified_user', title: 'News Fact-Check', desc: 'Autonomous verification of supplier claims against global news outlets and international legal databases.' },
                { icon: 'shield', title: 'Certifications', desc: 'Blockchain-backed validation of industry-standard sustainability and safety certifications.' },
              ].map(card => (
                <div key={card.title} className="feature-card">
                  <div className="feature-icon-wrap">
                    <span className="material-symbols-outlined">{card.icon}</span>
                  </div>
                  <h4 className="feature-title">{card.title}</h4>
                  <p className="feature-desc">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ETHOS SCORE */}
        <section id="score" className="section-default">
          <div className="section-container score-split">
            <div className="score-text">
              <span className="section-tag">Performance Metrics</span>
              <h3 className="section-title">The Ethos Score</h3>
              <p className="section-subtitle">A singular, dynamic metric quantifying corporate integrity. Our algorithm weighs transparency, environmental impact, and social governance in real-time.</p>
              <div className="metrics-grid">
                {[
                  { label: 'Global Integrity Index', value: '94.8', trend: '+2.4%' },
                  { label: 'Transparency Rating', value: 'A+', trend: null },
                  { label: 'Verification Speed', value: '< 2.5s', trend: null },
                  { label: 'Data Points Analyzed', value: '1.2M+', trend: null },
                ].map(m => (
                  <div key={m.label} className="metric-card glass-card">
                    <p className="metric-label">{m.label}</p>
                    <div className="metric-value-row">
                      <span className="metric-value">{m.value}</span>
                      {m.trend && <span className="metric-trend">{m.trend}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="score-visual">
              <div className="score-phone">
                <div className="score-phone-inner">
                  <div className="phone-dial-wrap">
                    <svg viewBox="0 0 192 192" className="phone-dial-svg">
                      <circle cx="96" cy="96" r="88" fill="transparent" stroke="#1e293b" strokeWidth="8" />
                      <circle cx="96" cy="96" r="88" fill="transparent" stroke="#1132d4" strokeWidth="8"
                        strokeDasharray="552.9" strokeDashoffset="28.6"
                        style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }} />
                    </svg>
                    <div className="phone-score-center">
                      <span className="phone-score-num">94.8</span>
                      <span className="phone-score-lbl">Ethos Score</span>
                    </div>
                  </div>
                  <div className="phone-bars">
                    {[{ label: 'Transparency', val: 92, color: '#22c55e' }, { label: 'Social Governance', val: 88, color: '#1132d4' }].map(b => (
                      <div key={b.label} className="phone-bar-row">
                        <span className="material-symbols-outlined" style={{ color: b.color, fontSize: '18px' }}>
                          {b.color === '#22c55e' ? 'check_circle' : 'analytics'}
                        </span>
                        <div className="phone-bar-wrap">
                          <div className="phone-bar-track">
                            <div className="phone-bar-fill" style={{ width: `${b.val}%`, background: b.color }} />
                          </div>
                          <div className="phone-bar-meta">
                            <span>{b.label}</span><span>{b.val}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="technology" className="section-dark">
          <div className="section-container">
            <div className="section-header centered">
              <span className="section-tag">The Oracle Loop</span>
              <h3 className="section-title" style={{ color: '#fff' }}>How It Works</h3>
            </div>
            <div className="how-grid">
              <div className="connector-line" />
              {[
                { icon: 'radar', title: 'Scan', desc: 'Upload a product image. Our multi-modal vision AI extracts brand, SKU, and geographic origin data.' },
                { icon: 'psychology', title: 'Investigate', desc: 'AI agents autonomously audit labor records, carbon data, news archives, and certification databases.' },
                { icon: 'verified', title: 'Reveal', desc: 'Receive an immutable Ethos Score and interactive compliance narrative backed by verifiable sources.' },
              ].map((step, i) => (
                <div key={step.title} className="how-step">
                  <div className={`how-icon-wrap ${i === 1 ? 'rotate-neg' : i === 2 ? 'rotate-pos' : ''}`}>
                    <span className="material-symbols-outlined">{step.icon}</span>
                  </div>
                  <h4 className="how-title">{step.title}</h4>
                  <p className="how-desc">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ANALYZER */}
        <AnalyzerSection />

        {/* CTA */}
        <section className="cta-banner-section">
          <div className="section-container">
            <div className="cta-banner">
              <div className="cta-banner-bg" />
              <div className="cta-banner-content">
                <h2 className="cta-banner-title">Ready to secure your supply chain's future?</h2>
                <p className="cta-banner-sub">Join leading global enterprises using Ethos-Vision to build radical transparency and trust.</p>
                <div className="cta-banner-btns">
                  <button className="cta-white-btn" onClick={() => document.getElementById('analyzer')?.scrollIntoView({ behavior: 'smooth' })}>Get Started Today</button>
                  <a className="cta-outline-btn" href="tel:8278624771">📞 Talk to Sales</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="section-container footer-inner">
          <div className="logo">
            <span className="material-symbols-outlined logo-icon">auto_awesome</span>
            <span className="logo-text">Ethos-Vision</span>
          </div>
          <div className="footer-links">
            <a href="https://ai.google.dev/gemini-api/docs" target="_blank" rel="noreferrer">API Docs</a>
            <a href="tel:8278624771">Contact: +91 82786 24771</a>
          </div>
          <p className="footer-copy">© 2026 Ethos-Vision AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
