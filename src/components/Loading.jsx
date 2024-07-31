import React from 'react';
import './Loading.css';

function Loading() {
  return (
    <div className="loading-modal">
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">שומר את המידע..</p>
    </div>
    </div>
  );
}

export default Loading;
