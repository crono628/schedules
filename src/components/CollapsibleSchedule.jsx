import { useState } from 'react'

const CollapsibleSchedule = ({ obj }) => {
  const { provider, today } = obj
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => setIsOpen(!isOpen)

  const formatAppointmentTimes = () => {
    return today.join(', ')
  }

  return (
    <div>
      <div className="collapsible" onClick={toggleOpen}>
        {provider}
      </div>
      <div>{isOpen && <>{' ' + formatAppointmentTimes()}</>}</div>
    </div>
  )
}

export default CollapsibleSchedule
