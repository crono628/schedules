import { useState } from 'react'

const CollapsibleSchedule = ({ obj, handleButtons: buttonHandle }) => {
  if (!obj) return null
  const { handleEdit, handleDelete } = buttonHandle
  const { provider, today } = obj
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => setIsOpen(!isOpen)

  const formatAppointmentTimes = () => {
    return today.join(', ')
  }

  return (
    <>
      <div className="collapsible" onClick={toggleOpen}>
        {provider}
      </div>
      {isOpen && <>{' ' + formatAppointmentTimes()}</>}
      {isOpen && (
        <div data-provider={provider}>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </>
  )
}

export default CollapsibleSchedule
