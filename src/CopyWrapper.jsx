import React, { useRef } from 'react'

function CopyWrapper({ children }) {
  const contentRef = useRef(null)

  const handleCopy = () => {
    const content = contentRef.current.innerText
    navigator.clipboard.writeText(content)
  }

  return (
    <div>
      <div ref={contentRef}>{children}</div>
      <button onClick={handleCopy}>Copy to clipboard</button>
    </div>
  )
}

export default CopyWrapper
