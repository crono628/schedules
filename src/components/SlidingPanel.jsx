import React, { useState } from 'react'

const SlidingPanel = ({ show, togglePanel }) => {
  return (
    <div className={`sliding-panel ${show ? 'open' : ''}`}>
      <button onClick={togglePanel} className="toggle-button">
        Hide Instructions
      </button>
      <div className="panel-content">{/* Your panel content goes here */}</div>
    </div>
  )
}

export default SlidingPanel
