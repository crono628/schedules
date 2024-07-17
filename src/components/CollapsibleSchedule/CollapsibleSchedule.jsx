import { useEffect, useState } from 'react'
import { useAppContext } from '../AppContext/AppContext'
import { logEvent } from '@firebase/analytics'
import { analytics } from '../../firebase'
import './CollapsibleSchedule.css'
import Fade from '@mui/material/Fade'

const CollapsibleSchedule = ({ obj }) => {
  if (!obj) return null
  const { state, dispatch } = useAppContext()
  const { data, isOpenAll } = state

  const { provider, today } = obj

  const [isOpen, setIsOpen] = useState(isOpenAll)
  const [mouseOver, setMouseOver] = useState(false)

  const toggleOpen = () => {
    logEvent(analytics, 'toggle_collapsible_schedule')
    setIsOpen(!isOpen)
  }

  const handleEdit = (e) => {
    const button = e.target.parentElement.dataset.provider
    const obj = data.find((p) => p.provider === button)
    const newData = data.filter((p) => p.provider !== button)

    logEvent(analytics, 'edit_provider')
    dispatch({
      type: 'update',
      payload: {
        data: newData,
        edit: obj,
        selectedTeam: obj.provider.split(' ')[0],
        selectedResident: obj.provider.includes('RESIDENT'),
        selectedResidentNumber: obj.provider.includes('RESIDENT')
          ? obj.provider.split(' ')[obj.provider.split(' ').length - 1]
          : ''
      }
    })
  }

  const handleDelete = (e) => {
    const button = e.target.parentElement.dataset.provider
    const newData = data.filter((p) => p.provider !== button)
    dispatch({ type: 'update', payload: { data: newData } })
  }

  const formatAppointmentTimes = () => {
    return today.join(', ')
  }

  const handleMouseOver = () => {
    setMouseOver(true)
  }

  useEffect(() => {
    setIsOpen(isOpenAll)
  }, [isOpenAll])

  return (
    <div
      className="collapsible-wrapper"
      onMouseOver={handleMouseOver}
      onMouseLeave={() => setMouseOver(false)}
    >
      <div className="collapsible" onClick={toggleOpen}>
        <div>{provider} </div>
        <span
          style={{
            fontSize: '0.7em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '0.4rem'
          }}
        >
          ({today.length})
        </span>
      </div>
      <Fade in={isOpen} timeout={300}>
        <div className="collapsible-content">
          {isOpen && (
            <>
              {isOpen && mouseOver ? (
                <div data-provider={provider} className="edit-delete-container">
                  <button onClick={handleEdit}>Edit</button>
                  <button onClick={handleDelete}>Delete</button>
                </div>
              ) : (
                <div className="edit-delete-container"></div>
              )}
              {' ' + formatAppointmentTimes()}
            </>
          )}
        </div>
      </Fade>
    </div>
  )
}

export default CollapsibleSchedule
