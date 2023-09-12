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

  const showDnd = rooms > 1 && state.data.length > 2

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
        {showDnd ? (
          <div className="toggle-container">
            Drag and Drop
            <ToggleSwitch />
          </div>
        ) : (
          <div className="toggle-container"></div>
        )}
      </div>
      {showDnd && (
        <div
          className="explain"
          style={{ cursor: 'pointer' }}
          onClick={() =>
            dispatch({
              type: 'update',
              payload: { dndExplain: !state.dndExplain }
            })
          }
        >
          Click here for {state.dndExplain ? 'less' : 'more'} information on
          drag and drop.
        </div>
      )}
      {state.dndExplain === true && (
        <div>
          {rooms > 1 && state.data.length > 2 && (
            <div className="explain">
              {/* Any drag and drop changes will reset by toggling drag and drop,
              pressing submit, or changing the number of rooms. Drag and drop is
              best used once the number of rooms is decided and all clinics have
              been entered. */}
              Disabling drag and drop will reset any drag and drop changes made.
              Clicking submit or changing the number of rooms will disable drag
              and drop and will need to be reenabled to continue using it. Drag
              and drop is best used once the number of rooms is decided and all
              clinics have been entered.
            </div>
          )}
        </div>
      )}
      <div>
        <button
          className="all-appointments-btn"
          onClick={handleAppointmentToggle}
        >
          {isOpenAll ? 'Collapse Appointments' : 'Expand Appointments'}
        </button>
      </div>
    </div>
  )
}

export default RoomControl
