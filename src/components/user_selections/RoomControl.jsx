import { logEvent } from 'firebase/analytics'
import { useAppContext } from '../AppContext/AppContext'
import { analytics } from '../../firebase'

const RoomControl = () => {
  const { state, dispatch } = useAppContext()
  const { rooms, algo, busyTimes } = state
  const roomLimit = 25

  const handleRoomsButton = (e) => {
    const button = e.target.dataset.button
    if (button === 'plus room' && rooms < roomLimit) {
      dispatch({ type: 'update', payload: { rooms: rooms + 1 } })
    } else if (button === 'minus room' && rooms > 1) {
      dispatch({ type: 'update', payload: { rooms: rooms - 1 } })
    }
  }

  const handleAlgoButton = (e) => {
    const button = e.target.dataset.button
    if (rooms === 1) {
      return
    }
    if (button === 'plus algo' && algo < rooms * 2) {
      logEvent(analytics, 'algo_plus')
      dispatch({ type: 'update', payload: { algo: algo + 1 } })
    } else if (button === 'minus algo' && algo > 1) {
      logEvent(analytics, 'algo_minus')
      dispatch({ type: 'update', payload: { algo: algo - 1 } })
    }
  }

  const handleBusyButton = (e) => {
    const button = e.target.dataset.button
    if (button === 'plus busy' && busyTimes < roomLimit) {
      dispatch({ type: 'update', payload: { busyTimes: busyTimes + 1 } })
    } else if (button === 'minus busy' && busyTimes > 1) {
      dispatch({ type: 'update', payload: { busyTimes: busyTimes - 1 } })
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
      <div className="algo-btns">
        <div>Algorithm</div>
        <div className="btn-container">
          <button data-button="minus algo" onClick={handleAlgoButton}>
            -
          </button>
          <div className="room-algo">{algo}</div>
          <button data-button="plus algo" onClick={handleAlgoButton}>
            +
          </button>
        </div>
      </div>
      {/* <div className="busy-btns">
        <div>Busy Display</div>
        <div>
          <button
            data-button="minus busy"
            onClick={handleBusyButton}
            disabled={busyTimes <= 2}
          >
            -
          </button>
          {busyTimes}
          <button data-button="plus busy" onClick={handleBusyButton}>
            +
          </button>
        </div>
      </div> */}
    </div>
  )
}

export default RoomControl
