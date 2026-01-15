// src/components/Hero.js
import React from 'react';
import { FaArrowRight, FaCircle } from 'react-icons/fa';

function Hero({ handleResumeDownload }) {
  return (
    <header className="hero">
      <div className="hero-text-container">
        <h1 className="hero-statement">
          <span className="text-highlight">I am a </span>
          <span className="text-dim">tech-focused fresher </span>
          <span className="text-highlight">with hands-on experience in </span>
          <span className="text-dim">IoT, full-stack development, and AI </span>
          <span className="text-highlight">focused on building </span>
          <span className="text-dim">practical, real-world systems.</span>
        </h1>

        <div className="hero-actions">
          
          {/* WRAPPER FOR HOVER EFFECT */}
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
