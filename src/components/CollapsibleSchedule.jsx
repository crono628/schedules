import { useState } from 'react'
import { useAppContext } from './AppContext'
import { TEAMS } from './schedule'

const CollapsibleSchedule = ({ obj }) => {
  if (!obj) return null
  const { state, dispatch } = useAppContext()
  const { data } = state

  const { provider, today } = obj

  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => setIsOpen(!isOpen)

  const handleEdit = (e) => {
    const button = e.target.parentElement.dataset.provider
    const obj = data.find((p) => p.provider === button)
    const newData = data.filter((p) => p.provider !== button)

    for (const team in TEAMS) {
      if (TEAMS[team].includes(obj.provider)) {
        dispatch({
          type: 'update',
          payload: { firm: TEAMS[team] === 'FIRM_1' ? '1' : '2' }
        })
      }
    }
    dispatch({ type: 'update', payload: { data: newData, edit: obj } })
  }

  const handleDelete = (e) => {
    const button = e.target.parentElement.dataset.provider
    const newData = data.filter((p) => p.provider !== button)
    dispatch({ type: 'update', payload: { data: newData } })
  }

  const formatAppointmentTimes = () => {
    return today.join(', ')
  }

  return (
    <>
      <div className="collapsible" onClick={toggleOpen}>
        {provider}{' '}
        <span
          style={{
            fontSize: '0.7rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '0.3rem'
          }}
        >
          ({today.length})
        </span>
      </div>
      <div className="collapsible-content">
        {isOpen && <>{' ' + formatAppointmentTimes()}</>}

        {isOpen && (
          <div data-provider={provider}>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        )}
      </div>
    </>
  )
}

export default CollapsibleSchedule
