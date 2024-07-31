import React from 'react';
import './Loading.css';

function Loading({text}) {
  return (
    <div className="loading-modal">
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">{text ? text : 'טוען..'}</p>
    </div>
    </div>
  );
}

export default Loading;
