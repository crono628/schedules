const RoomControl = ({ buttonHandlers, roomData }) => {
  const { handleRoomsButton, handleAlgoButton } = buttonHandlers
  const { rooms, algo } = roomData
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
