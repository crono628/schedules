import React, { useEffect } from 'react'
import Team from './components/user_selections/Team'
import { data as testData, createSchedule } from './components/schedule'
import Daily from './components/Daily'
import { TEAMS } from './components/schedule'
import Footer from './components/Footer'
import { logEvent } from '@firebase/analytics'
import { analytics } from './firebase'
import SlidingPanel from './components/SlidingPanel'
import RoomControl from './components/user_selections/RoomControl'
import { useAppContext } from './components/AppContext'
import Firm from './components/user_selections/Firm'
import Header from './components/Header'
import CheckboxTimes from './components/user_selections/CheckboxTimes'

function App() {
  const { state, dispatch } = useAppContext()
  const { data, rooms, algo, firm, show } = state

  function handleDispatch(actionPayload) {
    dispatch({ type: 'update', payload: actionPayload })
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

  const handleTestData = () => handleDispatch({ data: [...data, ...testData] })

  const handlePanel = () => handleDispatch({ show: !show })

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
