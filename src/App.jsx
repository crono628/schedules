import { useEffect, useState } from 'react'
import Team from './components/Team'

function App() {
  const [data, setData] = useState([])
  const [rooms, setRooms] = useState(0)

  useEffect(() => {
    console.log(rooms)
  }, [rooms])

  const handleSchedule = (newState) => {
    setData((prev) => [...prev, newState])
  }

  const displaySchedule = () => {}

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
          onChange={(e) => setRooms(e.target.value)}
        />
        <div>
          <button onClick={displaySchedule}>display</button>
        </div>
      </div>
    </>
  )
}

export default App
