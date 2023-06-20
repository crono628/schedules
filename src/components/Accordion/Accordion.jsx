import React, { useState } from 'react'
import './Accordion.css'
import { logEvent } from 'firebase/analytics'
import { analytics } from '../../firebase'
import expand_less from '../../assets/expand_less.svg'
import expand_more from '../../assets/expand_more.svg'

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
            <img src={expand_more} alt="expand_more" />
          ) : (
            <img src={expand_less} alt="expand_less" />
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
