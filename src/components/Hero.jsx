import React, { useState, useEffect, useRef } from 'react';
import { FaArrowRight, FaCircle } from 'react-icons/fa';

const sequences = {
  tech: [
    '/assets/tech-1.webp', 
    '/assets/tech-2.webp', 
    '/assets/tech-3.webp',
    '/assets/tech-4.webp', 
    '/assets/tech-5.webp', 
    '/assets/tech-6.webp'
  ]
};

function Hero({ handleResumeDownload }) {
  const [currentImg, setCurrentImg] = useState(sequences.tech);
  const [activeSequence, setActiveSequence] = useState(null);
  const frameIndex = useRef(0);
  const intervalRef = useRef(null);
  
  const triggerRef = useRef(null);
  // NEW: Ref to detect if the user is on a mobile/touch device
  const isTouchDevice = useRef(false);

  useEffect(() => {
    Object.values(sequences).forEach(seq => {
      seq.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    });
  }, []);

  useEffect(() => {
    if (activeSequence) {
      const frames = sequences[activeSequence];
      intervalRef.current = setInterval(() => {
        setCurrentImg(frames[frameIndex.current]);
        frameIndex.current = (frameIndex.current + 1) % frames.length;
      }, 200); 
    } else {
      clearInterval(intervalRef.current);
      frameIndex.current = 0;
    }
    return () => clearInterval(intervalRef.current);
  }, [activeSequence]);

  // Click outside listener (mainly for mobile)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (triggerRef.current && !triggerRef.current.contains(event.target)) {
        setActiveSequence(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // --- INTERACTION LOGIC ---
  const handleMouseEnter = () => {
    if (!isTouchDevice.current) setActiveSequence('tech');
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice.current) setActiveSequence(null);
  };

  const handleClick = () => {
    setActiveSequence('tech');
  };

  return (
    <header className="hero">
      <div className="hero-text-container">
        
        {activeSequence && (
          <div className="media-squircle">
            <img 
              src={currentImg} 
              alt="Portfolio Visual" 
              className="sequence-display" 
            />
          </div>
        )}

        <h1 className="hero-statement">
          <span className="text-highlight">I am a </span>
          
          <span 
            ref={triggerRef}
            className={`text-dim hover-trigger ${activeSequence === 'tech' ? 'active' : ''}`}
            // 1. Detect if it's a touch screen immediately
            onTouchStart={() => { isTouchDevice.current = true; }}
            // 2. Desktop strict hover rules
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            // 3. Click/Tap rule (turns it on, but clicking again won't turn it off)
            onClick={handleClick}
          >
            tech-focused fresher{' '}
          </span>
          
          <span className="text-highlight">with hands-on experience in </span>
          <span className="text-dim">IoT, full-stack development, and AI </span>
          <span className="text-highlight">focused on building </span>
          <span className="text-dim">practical, real-world systems.</span>
        </h1>

        <div className="hero-actions">
          <div className="say-hello-wrapper">
            <a href="#connect" className="say-hello-btn">
              Say hello <FaArrowRight style={{ fontSize: '0.8rem' }} />
            </a>
            <span className="dont-be-shy-text">Don't be shy.</span>
          </div>
          
          <div className="status-indicator">
            <FaCircle className="status-dot blinking" />
            <span className="status-text">Open to work</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Hero;