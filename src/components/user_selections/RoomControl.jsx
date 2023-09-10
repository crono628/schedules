import { logEvent } from 'firebase/analytics'
import { useAppContext } from '../AppContext/AppContext'
import { analytics } from '../../firebase'
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch'

const RoomControl = () => {
  const { state, dispatch } = useAppContext()
  const { rooms, manualSelection, isOpenAll } = state
  const roomLimit = 25

  const handleRoomsButton = (e) => {
    const button = e.target.dataset.button
    dispatch({ type: 'update', payload: { manualSelection: false } })
    if (button === 'plus room' && rooms < roomLimit) {
      dispatch({ type: 'update', payload: { rooms: rooms + 1 } })
    } else if (button === 'minus room' && rooms > 1) {
      dispatch({ type: 'update', payload: { rooms: rooms - 1 } })
    }
  }

  const handleAppointmentToggle = () => {
    logEvent(analytics, 'toggle_all_appointments')
    dispatch({ type: 'update', payload: { isOpenAll: !isOpenAll } })
  }

  return (
    <div className="btn-wrapper">
      <div className="room-btns">
        Rooms
        <div className="btn-container">
          <button data-button="minus room" onClick={handleRoomsButton}>
            -
          </button>
          <div className="room-algo">{rooms}</div>
          <button data-button="plus room" onClick={handleRoomsButton}>
            +
          </button>
        </div>
      </div>
      <div>
        <button
          className="all-appointments-btn"
          onClick={handleAppointmentToggle}
        >
          {isOpenAll ? 'Close All Appointments' : 'Open All Appointments'}
        </button>
      </div>
      <div className="room-btns">
        {rooms > 1 && state.data.length ? (
          <div className="toggle-container">
            Drag and Drop
            <ToggleSwitch />
          </div>
        ) : (
          <div className="toggle-container"></div>
        )}
      </div>
    </div>
  )
}

export default RoomControl
