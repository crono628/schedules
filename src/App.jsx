import React, { useEffect } from 'react'
import Team from './components/Team'
import { data as testData, createSchedule } from './components/schedule'
import Daily from './components/Daily'
import { TEAMS } from './components/schedule'
import Footer from './components/Footer'
import { logEvent } from '@firebase/analytics'
import { analytics } from './firebase'
import SlidingPanel from './components/SlidingPanel'
import RoomControl from './components/RoomControl'
import { useAppContext } from './components/AppContext'
import Firm from './components/Firm'
import Header from './components/Header'

function App() {
  const { state, dispatch } = useAppContext()
  const { data, rooms, algo, daily, firm, show } = state

  function handleDispatch(payload) {
    dispatch({ type: 'update', payload })
  }

  useEffect(() => {
    if (firm === '') {
      handleDispatch({ teams: TEAMS.ALL })
    }
    if (firm === '1') {
      handleDispatch({ teams: TEAMS.FIRM_1 })
    }
    if (firm === '2') {
      handleDispatch({ teams: TEAMS.FIRM_2 })
    }
    handleDispatch({ daily: createSchedule(data, rooms, algo) })
  }, [rooms, data, algo, firm])

  useEffect(() => {
    console.log('render')
    logEvent(analytics, 'page_view')
  }, [])

  const handleSchedule = (newState) =>
    handleDispatch({ data: [...data, newState], edit: null })

  const handleTestData = () => handleDispatch({ data: [...data, ...testData] })

  const handleFirmChange = (e) => handleDispatch({ firm: e.target.value })

  const handlePanel = () => handleDispatch({ show: !show })

  return (
    <div className="app-wrapper">
      <Header />
      <div className="wrapper">
        <button className="sliding-btn" onClick={handlePanel}>
          {show ? 'Hide Instructions' : 'Show Instructions'}
        </button>
        <SlidingPanel show={show} />
        <div className="selection-container">
          <Firm firm={firm} handleFirmChange={handleFirmChange} />
          <Team handleSubmit={handleSchedule} handleTestData={handleTestData} />
          <RoomControl />
          <Daily dailyArr={daily} obj={data} />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App
