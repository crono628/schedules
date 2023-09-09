import { logEvent } from 'firebase/analytics'
import { useAppContext } from '../AppContext/AppContext'
import { analytics } from '../../firebase'
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch'

const RoomControl = () => {
  const { state, dispatch } = useAppContext()
  const { rooms, manualSelection } = state
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
      <div className="room-btns">
        {rooms > 1 ? (
          <div className="toggle-container">
            Manual Mode
            <ToggleSwitch />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default RoomControl
