import React, { useState } from 'react'
import './Accordion.css'
import { logEvent } from 'firebase/analytics'
import { analytics } from '../../firebase'

const Accordion = ({ title, children }) => {
  const [show, setShow] = useState(false)

  const onAccordionClick = () => {
    if (title === 'Create a Schedule') {
      logEvent(analytics, 'accordion_create_schedule')
    }
    if (title === 'Setup Intake Group:') {
      logEvent(analytics, 'accordion_setup_intake_group')
    }
    setShow(!show)
  }

  return (
    <>
      <div className="accordion-title" onClick={onAccordionClick}>
        {title}
        <div className="accordion-symbol">
          {show ? (
            <span class="material-symbols-outlined">expand_circle_down</span>
          ) : (
            <span class="material-symbols-outlined">expand_circle_up</span>
          )}
        </div>
      </div>
      <div
        className={`accordion-content ${show ? 'open' : ''}`}
        style={{ maxHeight: show ? '2000px' : '0' }}
      >
        {children}
      </div>
    </>
  )
}

export default Accordion
