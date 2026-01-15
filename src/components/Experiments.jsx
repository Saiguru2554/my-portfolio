// src/components/Experiments.js

import React, { useState, useEffect, useRef } from 'react';
import { experiments } from '../data/portfolioData';

function Experiments() {
  const [activeId, setActiveId] = useState(null);
  
  // We use references to track the DOM elements for the scroll observer
  const itemRefs = useRef([]);

  // --- SCROLL OBSERVER LOGIC ---
  useEffect(() => {
    const observerOptions = {
      root: null, 
      rootMargin: '-45% 0px -45% 0px', 
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = Number(entry.target.getAttribute('data-id'));
          setActiveId(id);
        }
      });
    }, observerOptions);
    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    // Cleanup when leaving the page
    return () => {
      if (itemRefs.current) {
        itemRefs.current.forEach((ref) => {
          if (ref) observer.unobserve(ref);
        });
      }
    };
  }, []);

  const activeExperiment = experiments.find(exp => exp.id === activeId);

  return (
    <div className="experiments-container">
      
      {/* LEFT SIDE: THE LIST */}
      <div 
        className="experiments-list" 
        // If they physically move the mouse OUT of the list, hide the video
        onMouseLeave={() => setActiveId(null)}
      >
        {experiments.map((exp, index) => (
          <div 
            key={exp.id}
            // CRITICAL: Assign the ID to the DOM element so the Scroll Observer can read it
            data-id={exp.id}
            // CRITICAL: Assign the ref so the Observer can watch it
            ref={el => itemRefs.current[index] = el}
            
            className={`experiment-item ${activeId === exp.id ? 'active' : ''}`}
            
            // MOUSE INTERACTION: Instant update if they use the cursor
            onMouseEnter={() => setActiveId(exp.id)}
          >
            <span className="exp-number">0{exp.id}</span>
            <span className="exp-title">{exp.title}</span>
          </div>
        ))}
      </div>

      {/* RIGHT SIDE: THE PREVIEW */}
      <div className="experiments-preview">
        {activeExperiment ? (
          <div className="preview-media-wrapper fade-in" key={activeExperiment.id}>
            
            {/* TYPE 1: VIDEO */}
            {activeExperiment.type === 'video' && (
              <video
                src={activeExperiment.src}
                autoPlay
                muted
                loop
                playsInline
                className="preview-media"
              />
            )}

            {/* TYPE 2: CARD STACK */}
            {activeExperiment.type === 'stack' && (
              <div className="card-stack-wrapper">
                {activeExperiment.images.map((imgSrc, index) => (
                  <img 
                    key={index} 
                    src={imgSrc} 
                    alt={`stack-${index}`} 
                    className="stack-card" 
                  />
                ))}
              </div>
            )}
            
          </div>
        ) : (
          /* Empty Placeholder to keep layout stable */
          <div style={{ width: '100%', height: '100%' }}></div>
        )}
      </div>
    </div>
  );
}

export default Experiments;