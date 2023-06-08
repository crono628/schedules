import React, { useEffect, useState } from 'react'
import Team from './components/Team'
import { data as testData, createSchedule } from './components/schedule'
import Daily from './components/Daily'
import { TEAMS } from './components/schedule'
import Footer from './components/Footer'
import { logEvent } from '@firebase/analytics'
import { analytics } from './firebase'
import SlidingPanel from './components/SlidingPanel'
import RoomControl from './components/RoomControl'

function App() {
  const [data, setData] = useState([])
  const [rooms, setRooms] = useState(1)
  const [algo, setAlgo] = useState(1)
  const [daily, setDaily] = useState([])
  const [edit, setEdit] = useState(null)
  const [teams, setTeams] = useState([])
  const [firm, setFirm] = useState('')
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (firm === '') {
      setTeams([])
    }
    if (firm === '1') {
      setTeams(TEAMS.FIRM_1)
    }
    if (firm === '2') {
      setTeams(TEAMS.FIRM_2)
    }

    displaySchedule()
  }, [rooms, data, algo, firm])

  useEffect(() => {
    console.log('render')
    logEvent(analytics, 'page_view')
  }, [])

  const handleSchedule = (newState) => {
    setData((prev) => [...prev, newState])
    setEdit(null)
  }

  const handleTestData = () => {
    setData((prev) => [...prev, ...testData])
  }

  const displaySchedule = () => {
    setDaily(createSchedule(data, rooms, algo))
  }

  const handleFirmChange = (e) => {
    setFirm(e.target.value)
  }

  const objButtons = {
    handleEdit: (e) => {
      const button = e.target.parentElement.dataset.provider
      const obj = data.find((p) => p.provider === button)
      const newData = data.filter((p) => p.provider !== button)
      setEdit(obj)
      setData(newData)
      console.log(obj)
      console.log(button + ' edited')
    },
    handleDelete: (e) => {
      const button = e.target.parentElement.dataset.provider
      const newData = data.filter((p) => p.provider !== button)
      setData(newData)
      console.log(button + ' deleted')
    }
  }

  const roomButtonsObj = {
    handleRoomsButton: (e) => {
      const button = e.target.dataset.button
      if (button === 'plus room' && rooms < 9) {
        setRooms((prev) => prev + 1)
      } else if (button === 'minus room' && rooms > 1) {
        setRooms((prev) => prev - 1)
      }
    },

    handleAlgoButton: (e) => {
      const button = e.target.dataset.button
      if (button === 'plus algo' && algo < rooms) {
        setAlgo((prev) => prev + 1)
      } else if (button === 'minus algo' && algo > 1) {
        setAlgo((prev) => prev - 1)
      }
    }
  }

  return (
    <div className="wrapper">
      <button className="sliding-btn" onClick={() => setShow(!show)}>
        Show instructions
      </button>
      <SlidingPanel show={show} togglePanel={() => setShow(!show)} />
      <div className="firm-div">
        <label htmlFor="firm-dropdown">Firm: </label>
        <select id="color-dropdown" value={firm} onChange={handleFirmChange}>
          <option value=""></option>
          <option value="1"> 1 </option>
          <option value="2"> 2 </option>
        </select>
      </div>
      <Team
        handleSubmit={handleSchedule}
        handleTestData={handleTestData}
        handleEdit={edit}
        teams={teams}
      />
      <RoomControl buttonHandlers={roomButtonsObj} roomData={{ rooms, algo }} />

      <Daily dailyArr={daily} obj={data} handleButtons={objButtons} />
      <Footer />
    </div>
  )
}

export default App
