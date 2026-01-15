// src/App.js

import React, { useState, useEffect } from 'react';
import { FaMoon } from 'react-icons/fa'; 
import './App.css';
import Hero from './components/Hero';
import Experiments from './components/Experiments'; 
import Badges from './components/Badges';

// RESUME CONFIGURATION
const FILE_ID = "1pxmJ6GL3sD4vlVFwsXs-hKIvml2iGmjW"; 
const RESUME_VIEW_URL = `https://drive.google.com/file/d/${FILE_ID}/view?usp=drive_link`;
const RESUME_DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=${FILE_ID}`;

// --- CUSTOM ICON COMPONENTS ---

// 1. Thin Arrow Down (For the Work Page "Connect" pointer)
const ThinArrowDown = () => (
  <svg 
    width="30" 
    height="30" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1"
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="footer-arrow-icon"
    style={{ display: 'block', margin: '10px 0' }} 
  >
    <path d="M12 3V21" />
    <path d="M19 14L12 21L5 14" />
  </svg>
);

// 2. Thin Up-Right Arrow (For Social Links)
const ThinUpRightArrow = () => (
  <svg 
    width="14" 
    height="14" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5"
    strokeLinecap="round" 
    strokeLinejoin="round"
    style={{ marginLeft: '6px', transform: 'translateY(1px)' }}
  >
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('home'); 
  const [bubblePosition, setBubblePosition] = useState({ x: 0, y: 0 });
  const [isBubblePopped, setIsBubblePopped] = useState(false);

  // --- PLAYGROUND STATE ---
  const [termLines, setTermLines] = useState([
    "Initializing system...",
    "Loading kernel modules... OK",
  ]);

  // --- THEME TOGGLE ---
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };
  
  // --- MOUSE EFFECTS ---
  useEffect(() => {
    const handleMouseMove = (e) => setBubblePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleMouseDown = () => setIsBubblePopped(true);
    const handleMouseUp = () => setIsBubblePopped(false);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // --- TERMINAL TYPING LOGIC ---
  useEffect(() => {
    if (activeTab === 'playground') {
      const script = [
        "Checking network interfaces...",
        "wlan0: CONNECTED (SSID: IoT_Lab_5G)",
        "Fetching user profile: sai_guru",
        "Skills loaded: [Python, IoT, Embedded C]",
        "Status: READY FOR INPUT",
        "root@saiguru:~$"
      ];

      let isCancelled = false;

      const typeScript = async () => {
        setTermLines(["Initializing system..."]);
        await new Promise(r => setTimeout(r, 800));
        
        for (const line of script) {
          if (isCancelled) break;
          setTermLines(prev => [...prev, ""]);
          for (let i = 0; i < line.length; i++) {
            if (isCancelled) break;
            await new Promise(r => setTimeout(r, 30 + Math.random() * 50));
            setTermLines(prev => {
              const newLines = [...prev];
              newLines[newLines.length - 1] = line.substring(0, i + 1);
              return newLines;
            });
          }
          await new Promise(r => setTimeout(r, 400));
        }
      };

      typeScript();

      return () => { isCancelled = true; };
    }
  }, [activeTab]);

  // --- NAVIGATION HANDLERS ---
  const handleResumeView = (e) => {
    if(e) e.preventDefault();
    window.open(RESUME_VIEW_URL, '_blank', 'noopener,noreferrer');
  };

  const handleResumeDownload = (e) => {
    if(e) e.preventDefault();
    window.location.href = RESUME_DOWNLOAD_URL;
  };

  const handleNavClick = (view, e) => {
    e.preventDefault();
    setActiveTab(view);
    window.scrollTo(0, 0); 
  };

  return (
    <>
      <div 
        className={`glowing-bubble ${isBubblePopped ? 'popped' : ''}`}
        style={{ transform: `translate3d(${bubblePosition.x}px, ${bubblePosition.y}px, 0)` }}
      />

      <nav className="portfolio-nav">
        <div className="nav-content">
          <div className="nav-links-left">
            <a href="#work" onClick={(e) => handleNavClick('home', e)} className={activeTab === 'home' ? 'active-link' : ''}>Work</a>
            <a href="#about" onClick={(e) => handleNavClick('about', e)} className={activeTab === 'about' ? 'active-link' : ''}>About</a>
          </div>
          <div className="nav-logo-container">
            <img 
              src={isDarkMode ? "/logo-dark-theme.jpg" : "/logo-light-theme.jpg"} 
              alt="logo" 
              className="nav-logo" 
              onClick={(e) => handleNavClick('home', e)}
            />
          </div>
          <div className="nav-links-right">
            <a href="#playground" onClick={(e) => handleNavClick('playground', e)} className={activeTab === 'playground' ? 'active-link' : ''}>Playground</a>
            <a href={RESUME_VIEW_URL} onClick={(e) => handleResumeView(e)}>Resume</a>
            <div className="theme-toggle">
              <FaMoon size="14px" />
              <label className="switch">
                <input type="checkbox" onClick={toggleTheme} checked={isDarkMode} />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>
      </nav>
      
      {/* ================== HOME VIEW (WORK) ================== */}
      {activeTab === 'home' && (
        <>
          <Hero handleResumeDownload={handleResumeDownload} />
          
          <section id="experiments" className="content-section">
            <div className="content-wrapper">
              <h2 style={{ marginBottom: '60px' }}>Experiments</h2>
              <Experiments />
            </div>
          </section>

          <Badges />

          {/* --- FULL CONNECT FOOTER (Title + Arrow + Links) --- */}
          <footer id="connect" className="footer">
            <div className="content-wrapper">
              <div className="footer-col footer-copyright"><p>&copy; Sai Guru 2025</p></div>
              <div className="footer-col footer-designed-by"><p>Designed & Built by Yengal Sai Guru.</p></div>
              <div className="footer-col footer-socials">
                <p className="footer-connect-title">Connect</p>
                
                <ThinArrowDown />
                
                <div className="footer-social-links-container" style={{ gap: '25px' }}>
                  <a href="https://github.com/Saiguru2554" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
                    <span>GitHub</span>
                    <ThinUpRightArrow />
                  </a>
                  <a href="https://www.linkedin.com/in/saiguru/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
                    <span>LinkedIn</span>
                    <ThinUpRightArrow />
                  </a>
                  <a href="mailto:yengalsai2554@gmail.com" style={{ display: 'flex', alignItems: 'center' }}>
                    <span>Email me</span>
                    <ThinUpRightArrow />
                  </a>
                </div>

              </div>
            </div>
          </footer>
        </>
      )}

      {/* ================== PLAYGROUND VIEW ================== */}
      {activeTab === 'playground' && (
        <div style={{ paddingTop: '120px', minHeight: '100vh', overflowX: 'hidden' }}>
          
          <div className="content-wrapper" style={{ position: 'relative' }}>
            
            {/* HERO */}
            <div className="playground-hero-split" style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              alignItems: 'flex-start',
              justifyContent: 'space-between', 
              gap: '60px', 
              marginBottom: '80px' 
            }}>
              <div className="playground-hero-text" style={{ flex: '1 1 500px' }}>
                <div className="playground-title-container">
                  <span className="handwritten-text">Embedded</span>
                  <span className="heavy-text">EXPLORATIONS</span>
                </div>
                <p className="playground-subtitle">
                  A living archive of my hackathon builds, cloud certifications, and late-night prototypes. 
                  <br />This is where I break things to learn how they work.
                </p>
              </div>

              <div className="terminal-section" style={{ flex: '1 1 400px', margin: 0 }}>
                <div className="terminal-window">
                  <div className="terminal-header">
                    <div className="term-dot term-red"></div>
                    <div className="term-dot term-yellow"></div>
                    <div className="term-dot term-green"></div>
                  </div>
                  <div className="terminal-body" style={{ height: '300px', overflowY: 'auto' }}>
                    {termLines.map((line, i) => (
                      <span key={i} className="term-line">
                        <span className="term-prefix">&gt;</span>
                        {line}
                      </span>
                    ))}
                    <span className="blinking-cursor"></span>
                  </div>
                </div>
              </div>
            </div>

            {/* COMMUNITY */}
            <h2 className="playground-section-title" style={{ marginTop: '0' }}>Community</h2>
            <a href="https://g.dev/saiguru" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <div className="google-feature-card">
                <div className="google-image-container">
                   <img 
                     src="/playground/google-comm.jpg" 
                     alt="Google Developer Profile" 
                     style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                   />
                </div>
                <div className="google-card-content">
                  <div className="google-brand-row">
                    <span>
                      <span className="g-blue">G</span><span className="g-red">o</span><span className="g-yellow">o</span><span className="g-blue">g</span><span className="g-green">l</span><span className="g-red">e</span>
                    </span>
                    <span>Developer Profile</span>
                  </div>
                  <div className="google-card-title">Member, Contributor & Cloud Enthusiast</div>
                  <div className="google-card-link-text">View Profile</div>
                </div>
              </div>
            </a>

            {/* OFFLINE MODE */}
            <div style={{ marginTop: '120px' }}>
               <div className="playground-title-container" style={{ alignItems: 'center', marginBottom: '40px' }}>
                  <span className="handwritten-text" style={{ fontSize: '3rem', margin: 0, transform: 'rotate(-2deg)' }}>Offline</span>
                  <span className="heavy-text" style={{ fontSize: '4rem' }}>MODE</span>
               </div>
               
               <p style={{ textAlign: 'center', opacity: 0.7, maxWidth: '600px', margin: '0 auto' }}>
                 When I'm not debugging hardware, I'm chasing sunsets. Nature is the only system I don't try to reverse engineer.
               </p>

               <div className="polaroid-gallery">
                  <div className="polaroid-card">
                    <div className="polaroid-img-container">
                       <img src="/playground/beach1.jpg" alt="Beach Sunset" />
                    </div>
                    <div className="polaroid-caption">Golden Hour</div>
                  </div>
                  <div className="polaroid-card">
                    <div className="polaroid-img-container">
                       <img src="/playground/beach2.jpg" alt="Waves" />
                    </div>
                    <div className="polaroid-caption">No Signal</div>
                  </div>
                  <div className="polaroid-card">
                    <div className="polaroid-img-container">
                       <img src="/playground/beach3.jpg" alt="Sky" />
                    </div>
                    <div className="polaroid-caption">Peace</div>
                  </div>
               </div>
            </div>

          </div>

          {/* --- PLAYGROUND FOOTER (LINKS ONLY, NO TITLE/ARROW) --- */}
          <footer className="footer" style={{ marginTop: '100px' }}>
            <div className="content-wrapper">
              <div className="footer-col footer-copyright"><p>&copy; Sai Guru 2025</p></div>
              
              <div className="footer-col footer-socials">
                {/* JUST THE LINKS (No "Connect" title, No ThinArrowDown) */}
                <div className="footer-social-links-container" style={{ gap: '25px' }}>
                  <a href="https://github.com/Saiguru2554" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
                    <span>GitHub</span>
                    <ThinUpRightArrow />
                  </a>
                  <a href="https://www.linkedin.com/in/saiguru/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
                    <span>LinkedIn</span>
                    <ThinUpRightArrow />
                  </a>
                  <a href="mailto:yengalsai2554@gmail.com" style={{ display: 'flex', alignItems: 'center' }}>
                    <span>Email me</span>
                    <ThinUpRightArrow />
                  </a>
                </div>
              </div>

            </div>
          </footer>
        </div>
      )}

      {/* ================== ABOUT VIEW ================== */}
      {activeTab === 'about' && (
        <div style={{ paddingTop: '100px', minHeight: '80vh' }}> 
          <section className="about-page-container">
            <div className="content-wrapper about-wrapper">
              <div className="about-text-col">
                <h2 className="about-headline">IoT Engineer | Embedded Systems & Applied AI</h2>
                <p>I build systems that connect hardware, software, and data into working machines — not just demos.<br/><br/>I’m an IoT engineering student based in Hyderabad, India, focused on creating reliable, real-world systems where devices sense, networks transmit, and software decides.</p>
                <h3>The Philosophy</h3>
                <p>My interest in engineering began with one obsession: <br/><strong className="highlight-text">How does a machine actually work when no one is watching?</strong></p>
                <p>That curiosity pushed me beyond writing code into understanding systems end-to-end. I’m less interested in flashy features and more interested in:</p>
                <ul><li>What happens when networks fail</li><li>How systems behave when data is wrong</li><li>Whether performance holds under real load</li></ul>
                <h3>Work I’ve Built</h3>
                <p>Through my internship at Viswam AI and academic work, I have built:</p>
                <ul>
                  <li><strong>Healthcare AI Chatbot:</strong> Using Llama-2 and BERT for structured NLP.</li>
                  <li><strong>Cloud-Connected IoT:</strong> Systems using ESP32, AWS IoT Core, and MQTT.</li>
                  <li><strong>Data Tools:</strong> Automation and visualization with Python and Streamlit.</li>
                  <li><strong>Socket-Level VoIP:</strong> A LAN system to understand real-time networking protocols.</li>
                  <li><strong>Underwater ROV:</strong> Field-operated systems for navigation and data capture.</li>
                </ul>
                <h3>How I Think</h3>
                <p>I design systems forward.<br/>I debug backward.<br/>I care whether it survives — not just whether it runs.</p>
                <h3>Outside Code</h3>
                <p>When I’m not building, I explore automation, experiment with systems, attend tech meets, or push hardware until it breaks — then rebuild it better.</p>
              </div>
              <div className="about-image-col">
                <img 
                  src={isDarkMode ? "/profile-pic.png" : "/profile-pic.png"} 
                  alt="Sai Guru" 
                  className="about-photo" 
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()} 
                />
                <div className="aaditya-link-stack">
                  <a href={RESUME_DOWNLOAD_URL} onClick={(e) => handleResumeDownload(e)} className="pill-link"><span>Download Resume</span><span className="arrow">↓</span></a>
                  <a href="https://github.com/Saiguru2554" target="_blank" rel="noopener noreferrer" className="pill-link"><span>GitHub</span><span className="arrow">→</span></a>
                  <a href="https://www.linkedin.com/in/saiguru/" target="_blank" rel="noopener noreferrer" className="pill-link"><span>LinkedIn</span><span className="arrow">→</span></a>
                </div>
              </div>
            </div>
          </section>
          
          <section className="content-section pure-black-bg">
            <div className="content-wrapper">
              <h2>Skills</h2>
              <div className="skills-matrix">
                <div className="skill-category"><h3>Programming</h3><ul><li>Python</li><li>Java</li><li>C / C++ / C#</li><li>SQL</li></ul></div>
                <div className="skill-category"><h3>Web</h3><ul><li>HTML</li><li>CSS</li><li>JavaScript</li><li>Node.js</li><li>Express.js</li><li>SQLite</li></ul></div>
                <div className="skill-category"><h3>IoT/Hardware</h3><ul><li>Arduino</li><li>ESP32</li><li>Sensor Interfacing</li><li>Arduino IoT Cloud</li></ul></div>
                <div className="skill-category"><h3>Tools/Platforms</h3><ul><li>Vercel</li><li>GitHub</li><li>VS Code</li><li>Streamlit</li><li>Hugging Face</li></ul></div>
              </div>
            </div>
          </section>

          {/* --- SIMPLE FOOTER (About - Just Copyright) --- */}
          <footer className="footer">
            <div className="content-wrapper">
              <div className="footer-col footer-copyright"><p>&copy; Sai Guru 2025</p></div>
            </div>
          </footer>

        </div>
      )}
    </>
  );
}

export default App;