// src/components/Badges.js

import React from 'react';
import { badges } from '../data/portfolioData';

function Badges() {
  return (
    <div className="badges-section">
      <h3 className="badges-title">Certifications</h3>
      
      <div className="badges-container">
        {/* WE DUPLICATE THE LIST TO CREATE A SEAMLESS LOOP */}
        <div className="badges-track">
          {[...badges, ...badges, ...badges].map((badge, index) => (
            <div className="badge-item" key={index}>
              {badge.img ? (
                <img src={badge.img} alt={badge.title} className="badge-img" />
              ) : (
                <span className="badge-text">{badge.title}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Badges;