import { useEffect, useState } from 'react'
import Team from './components/Team'
import { data as testData, createSchedule } from './components/schedule'
import Daily from './components/Daily'

function App() {
  const [data, setData] = useState(testData)
  const [rooms, setRooms] = useState(0)
  const [daily, setDaily] = useState([])

  // useEffect(() => {
  //   console.log(data)
  // }, [data])

  const handleSchedule = (newState) => {
    setData((prev) => [...prev, newState])
  }

  const displaySchedule = () => {
    if (data.length > 0 && rooms > 0) {
      setDaily(createSchedule(data, rooms))
    }
  }

  return (
    <>
      <div>
        <Team handleSubmit={handleSchedule} />
        <label htmlFor="rooms" />
        Rooms
        <input
          type="number"
          name="rooms"
          value={rooms}
          min={0}
          max={10}
          onChange={(e) => setRooms(e.target.value)}
        />
        <div>
          <button
            disabled={rooms < 1 || data.length < 1}
            onClick={displaySchedule}
          >
            display
          </button>
        </div>
        <Daily dailyArr={daily} />
      </div>
    </>
  )
}

export default App
