import React, { useEffect, useState } from 'react'
import Team from './components/Team'
import { data as testData, createSchedule } from './components/schedule'
import Daily from './components/Daily'

function App() {
  const [data, setData] = useState([])
  const [rooms, setRooms] = useState(1)
  const [daily, setDaily] = useState([])

  useEffect(() => {
    displaySchedule()
  }, [rooms, data])

  const handleSchedule = (newState) => {
    setData((prev) => [...prev, newState])
  }

  const handleTestData = () => {
    setData((prev) => [...prev, ...testData])
  }

  const displaySchedule = () => {
    if (data.length > 0 && rooms > 0) {
      setDaily(createSchedule(data, rooms))
    }
  }

  const incrementRooms = () => {
    if (rooms < 9) {
      setRooms(rooms + 1)
    }
  }

  const decrementRooms = () => {
    if (rooms > 1) {
      setRooms(rooms - 1)
    }
  }

  return (
    <div className="wrapper">
      <Team handleSubmit={handleSchedule} handleTestData={handleTestData} />
      <div className="room-btns">
        Rooms<button onClick={incrementRooms}> + </button>
        {rooms}
        <button onClick={decrementRooms}> - </button>
      </div>
      <Daily dailyArr={daily} obj={data} />
    </div>
  )
}

export default App
