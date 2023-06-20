import React, { useEffect } from 'react'
import Team from './components/user_selections/Team'
import { data as testData, createSchedule } from './components/schedule'
import Daily from './components/Daily/Daily'
import { TEAMS } from './components/schedule'
import Footer from './components/Footer/Footer'
import { logEvent } from '@firebase/analytics'
import { analytics } from './firebase'
import SlidingPanel from './components/SlidingPanel/SlidingPanel'
import RoomControl from './components/user_selections/RoomControl'
import { useAppContext } from './components/AppContext/AppContext'
import Firm from './components/user_selections/Firm'
import Header from './components/Header/Header'
import CheckboxTimes from './components/user_selections/CheckboxTimes/CheckboxTimes'

function App() {
  const { state, dispatch } = useAppContext()
  const { data, rooms, algo, firm, show, busyTimes } = state

  function handleDispatch(actionPayload) {
    dispatch({ type: 'update', payload: actionPayload })
  }

  useEffect(() => {
    if (firm === '') {
      handleDispatch({ teams: [] })
    }
    if (firm === '1') {
      handleDispatch({ teams: TEAMS.FIRM_1 })
    }
    if (firm === '2') {
      handleDispatch({ teams: TEAMS.FIRM_2 })
    }
    handleDispatch({ daily: createSchedule(data, rooms, algo, busyTimes) })
  }, [rooms, data, algo, firm, busyTimes])

  const handleTestData = () => {
    logEvent(analytics, 'test_data')
    handleDispatch({ data: [...data, ...testData], firm: '2' })
  }

  const handlePanel = () => {
    logEvent(analytics, 'toggle_panel')
    handleDispatch({ show: !show })
  }

  return (
    <div className="app-wrapper">
      <Header handlePanel={handlePanel} />
      <div className="wrapper">
        <button onClick={handleTestData} className="test-btn">
          test data
        </button>
        <SlidingPanel show={show} />
        <div className="selection-container">
          <div className="dropdown-container">
            <Firm />
            <Team handleTestData={handleTestData} />
          </div>
          <CheckboxTimes />
          <RoomControl />
        </div>
        <Daily />
      </div>
      <Footer />
    </div>
  )
}

export default App
