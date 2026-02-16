import React, { useState, useEffect, useRef } from 'react';
import { experiments } from '../data/portfolioData';
import '../App.css'; 

const Experiments = () => {
  const [activeId, setActiveId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Refs for scroll detection and click outside
  const itemRefs = useRef([]);
  const containerRef = useRef(null);

  // 1. Detect Mobile/Desktop
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 2. SCROLL OBSERVER (DESKTOP ONLY)
  // This makes the video play when you scroll with 2 fingers on Desktop
  useEffect(() => {
    if (isMobile) return; // Disable scroll spy on mobile (Click only)

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(Number(entry.target.getAttribute('data-id')));
        }
      });
    }, { 
      rootMargin: '-45% 0px -45% 0px', // Trigger exactly in center of screen
      threshold: 0 
    });

    itemRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, [isMobile]); // Re-run if screen size changes

  // 3. CLICK OUTSIDE (MOBILE ONLY)
  // Closes the video if you click the background
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setActiveId(null); 
      }
    };
    if (isMobile) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile]);

  // 4. TOGGLE FUNCTION (Mobile Click)
  const handleToggle = (id, e) => {
    if (!isMobile) return; // Desktop uses scroll/hover, not click toggle
    e.stopPropagation(); 
    if (activeId === id) {
      setActiveId(null); // Close
    } else {
      setActiveId(id);   // Open
    }
  };

  const activeExperiment = experiments.find(exp => exp.id === activeId);

  return (
    <div className="experiments-container" ref={containerRef}>
      
      {/* PREVIEW AREA */}
      <div className={`experiments-preview ${activeId ? 'is-active' : ''}`} onClick={(e) => isMobile && e.stopPropagation()}>
        {activeExperiment && (
          <div className="preview-media-wrapper fade-in" key={activeExperiment.id}>
            {activeExperiment.type === 'video' ? (
              <video key={activeExperiment.src} src={activeExperiment.src} autoPlay muted loop playsInline className="preview-media" />
            ) : activeExperiment.type === 'stack' ? (
              <div className="card-stack-wrapper">
                {activeExperiment.images.map((img, i) => <img key={i} src={img} className="stack-card" alt="" />)}
              </div>
            ) : (
               <img src={activeExperiment.images[0]} className="preview-media" alt="" />
            )}
          </div>
        )}
      </div>

      {/* LIST AREA */}
      <div className="experiments-list" onMouseLeave={() => !isMobile && setActiveId(null)}>
        {experiments.map((exp, index) => (
          <div
            key={exp.id}
            data-id={exp.id}
            ref={el => itemRefs.current[index] = el}
            className={`experiment-item ${activeId === exp.id ? 'active' : ''}`}
            
            // MOBILE: Click Toggle
            onClick={(e) => handleToggle(exp.id, e)}
            
            // DESKTOP: Hover Trigger
            onMouseEnter={() => !isMobile && setActiveId(exp.id)}
          >
            <span className="exp-number">0{exp.id}</span>
            <span className="exp-title">{exp.title}</span>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Experiments;