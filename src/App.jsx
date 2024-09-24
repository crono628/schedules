import React, { useEffect, useState } from 'react'
import Team from './components/user_selections/Team'
import { data as testData, createSchedule } from './components/schedule'
import Daily from './components/Daily/Daily'
import Footer from './components/Footer/Footer'
import { logEvent } from '@firebase/analytics'
import { analytics } from './firebase'
import SlidingPanel from './components/SlidingPanel/SlidingPanel'
import RoomControl from './components/user_selections/RoomControl'
import { useAppContext } from './components/AppContext/AppContext'
import Firm from './components/user_selections/Firm'
import Header from './components/Header/Header'
import CheckboxTimes from './components/user_selections/CheckboxTimes/CheckboxTimes'
import Campus from './components/user_selections/Campus'
import ManualDaily from './components/ManualDaily'
import { PrintManualDaily } from './components/PrintSchedules/PrintManualDaily'
import { PrintDaily } from './components/PrintSchedules/PrintDaily'
import db from './db'

function App() {
  const [choice, setChoice] = useState('none')
  const [dates, setDates] = useState([null, null, null, null, null])
  const { state, dispatch } = useAppContext()
  const {
    data,
    daily,
    rooms,
    algo,
    firm,
    show,
    busyTimes,
    campus,
    manualSelection,
    isOpenAll,
    testDataClicked
  } = state
  function handleDispatch(actionPayload) {
    dispatch({ type: 'update', payload: actionPayload })
  }

  useEffect(() => {
    if (campus === '') {
      handleDispatch({ firm: '', teams: [], firms: [] })
    }
    if (!manualSelection) {
      handleDispatch({ daily: createSchedule(data, rooms, algo, busyTimes) })
    }

    if (state.rooms === 1) {
      handleDispatch({ manualSelection: false })
    }
  }, [rooms, data, algo, firm, busyTimes, manualSelection, isOpenAll])

  const handleTestData = () => {
    logEvent(analytics, 'test_data')
    handleDispatch({
      data: [...data, ...testData],
      campus: 'Newington',
      firm: '2',
      selectedTeam: '',
      testDataClicked: true
    })
  }

  const handlePanel = () => {
    logEvent(analytics, 'toggle_panel')
    handleDispatch({ show: !show })
  }

  const saveState = async (slot) => {
    try {
      await db.saves.put({ id: slot, state: state })
      setChoice(slot)
      console.log(`State saved to slot ${slot}`)
    } catch (error) {
      console.error('Failed to save state:', error)
    }
  }

  const loadState = async (slot) => {
    try {
      const savedState = await db.saves.get(slot)
      if (savedState) {
        dispatch({ type: 'update', payload: savedState.state })
        setChoice(slot)
        console.log(`State loaded from slot ${slot}`)
      } else {
        console.log(`No saved state in slot ${slot}`)
      }
    } catch (error) {
      console.error('Failed to load state:', error)
    }
  }

  const handleDateChange = (event, index) => {
    const newDates = [...dates]
    newDates[index] = event.target.value
    setDates(newDates)
  }
  const SaveLoadButtons = () => (
    <div className="save-load-buttons">
      <button onClick={clearState}>Clear State</button>
      <div>Current Slot: {choice}</div>
      {[1, 2, 3, 4, 5].map((slot, index) => (
        <div key={slot}>
          {/* <input
            type="date"
            value={dates[index] || ''}
            onChange={(event) => handleDateChange(event, index)}
            placeholder={`Select date for Slot ${slot}`}
          /> */}
          <button onClick={() => saveState(slot)}>Save Slot {slot}</button>
          <button onClick={() => loadState(slot)}>Load Slot {slot}</button>
        </div>
      ))}
    </div>
  )

  const clearState = () => {
    dispatch({ type: 'clear' })
  }

  return (
    <div className="app-wrapper">
      <Header handlePanel={handlePanel} />
      <div className="wrapper">
        {!testDataClicked && (
          <button onClick={handleTestData} className="test-btn">
            test data
          </button>
        )}
        <SlidingPanel show={show} toggleDrawer={handlePanel} />
        <div className="selection-container">
          <SaveLoadButtons />
          <div className="dropdown-container">
            <Campus />
            <Firm />
            <Team handleTestData={handleTestData} />
          </div>
          <CheckboxTimes />
        </div>
        {manualSelection ? <PrintManualDaily /> : <PrintDaily />}
      </div>
      <Footer />
    </div>
  )
}

export default App
