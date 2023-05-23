import React, { useEffect, useState } from 'react'
import Team from './components/Team'
import { data as testData, createSchedule } from './components/schedule'
import Daily from './components/Daily'

function App() {
  const [data, setData] = useState([])
  const [rooms, setRooms] = useState(1)
  const [algo, setAlgo] = useState(1)
  const [daily, setDaily] = useState([])
  const [edit, setEdit] = useState(null)

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
    setDaily(createSchedule(data, rooms, algo))
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

  const objButtons = {
    handleEdit: (e) => {
      const button = e.target.parentElement.dataset.provider
      const obj = data.find((p) => p.provider === button)
      const newData = data.filter((p) => p.provider !== button)
      setEdit(obj)
      setData(newData)
      console.log(button + ' edited')
    },
    handleDelete: (e) => {
      const button = e.target.parentElement.dataset.provider
      const newData = data.filter((p) => p.provider !== button)
      setData(newData)
      console.log(button + ' deleted')
    }
  }

  return (
    <div className="wrapper">
      <Team
        handleSubmit={handleSchedule}
        handleTestData={handleTestData}
        handleEdit={edit}
      />
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
      <Daily dailyArr={daily} obj={data} handleButtons={objButtons} />
    </div>
  )
}

export default App
