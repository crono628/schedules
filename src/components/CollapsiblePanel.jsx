import React, { useState } from 'react'

const CollapsiblePanel = () => {
  const [isOpen, setIsOpen] = useState(true)

  const togglePanel = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={`collapsible-panel ${isOpen ? 'open' : ''}`}>
      <button onClick={togglePanel} className="toggle-button">
        Toggle Panel
      </button>
      <div className="panel-content">
        {/* Your panel content goes here */ 'panel content'}
      </div>
    </div>
  )
}

export default CollapsiblePanel
