import { useState } from 'react'

const CollapsibleSchedule = ({ obj }) => {
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
          <button
            onClick={(e) => {
              console.log(e.currentTarget.parentNode.dataset.provider)
            }}
          >
            Edit
          </button>
          <button>Delete</button>
        </div>
      )}
    </>
  )
}

export default CollapsibleSchedule
