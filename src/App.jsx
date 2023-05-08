import React, { useEffect, useState } from 'react'
import Team from './components/Team'
import { data as testData, createSchedule } from './components/schedule'
import Daily from './components/Daily'

function App() {
  const [data, setData] = useState([])
  const [rooms, setRooms] = useState(1)
  const [algo, setAlgo] = useState(0)
  const [daily, setDaily] = useState([])

  useEffect(() => {
    displaySchedule()
  }, [rooms, data, algo])

  const handleSchedule = (newState) => {
    setData((prev) => [...prev, newState])
  }

  const handleTestData = () => {
    setData((prev) => [...prev, ...testData])
  }

  const displaySchedule = () => {
    if (data.length > 0 && rooms > 0) {
      setDaily(createSchedule(data, rooms, algo))
    }
  }

  const handleRoomsButton = (e) => {
    const button = e.target.dataset.button
    if (button === 'plus room' && rooms < 9) {
      setRooms((prev) => prev + 1)
    } else if (button === 'minus room' && rooms > 1) {
      setRooms((prev) => prev - 1)
    }
  }

  const handleAlgoButton = (e) => {
    const button = e.target.dataset.button
    if (button === 'plus algo' && algo < rooms) {
      setAlgo((prev) => prev + 1)
    } else if (button === 'minus algo' && algo > 1) {
      setAlgo((prev) => prev - 1)
    }
  }

  return (
    <div className="wrapper">
      <Team handleSubmit={handleSchedule} handleTestData={handleTestData} />
      <div className="btn-wrapper">
        <div className="room-btns">
          Rooms
          <button data-button="plus room" onClick={handleRoomsButton}>
            {' '}
            +{' '}
          </button>
          {rooms}
          <button data-button="minus room" onClick={handleRoomsButton}>
            {' '}
            -{' '}
          </button>
        </div>
        <div className="algo-btns">
          Algorithm
          <button data-button="plus algo" onClick={handleAlgoButton}>
            {' '}
            +{' '}
          </button>
          {algo}
          <button data-button="minus algo" onClick={handleAlgoButton}>
            {' '}
            -{' '}
          </button>
        </div>
      </div>

      <Daily dailyArr={daily} obj={data} />
    </div>
  )
}

export default App
