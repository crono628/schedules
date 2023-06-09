import { useAppContext } from './AppContext'

const RoomControl = () => {
  const { state, dispatch } = useAppContext()
  const { rooms, algo } = state

  const handleRoomsButton = (e) => {
    const button = e.target.dataset.button
    if (button === 'plus room' && rooms < 9) {
      dispatch({ type: 'update', payload: { rooms: rooms + 1 } })
    } else if (button === 'minus room' && rooms > 1) {
      dispatch({ type: 'update', payload: { rooms: rooms - 1 } })
    }
  }

  const handleAlgoButton = (e) => {
    const button = e.target.dataset.button
    if (button === 'plus algo' && algo < rooms) {
      dispatch({ type: 'update', payload: { algo: algo + 1 } })
    } else if (button === 'minus algo' && algo > 1) {
      dispatch({ type: 'update', payload: { algo: algo - 1 } })
    }
  }

  return (
    <div className="btn-wrapper">
      <div className="room-btns">
        Rooms
        <button data-button="plus room" onClick={handleRoomsButton}>
          +
        </button>
        {rooms}
        <button data-button="minus room" onClick={handleRoomsButton}>
          -
        </button>
      </div>
      <div className="algo-btns">
        Algorithm
        <button data-button="plus algo" onClick={handleAlgoButton}>
          +
        </button>
        {algo}
        <button data-button="minus algo" onClick={handleAlgoButton}>
          -
        </button>
      </div>
    </div>
  )
}

export default RoomControl
