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
import AutohideSnackbar from './components/AutohideSnackbar/AutohideSnackbar'

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

function App() {
  const getCurrentDayIndex = () => {
    let currentDayIndex = new Date().getDay()
    if (currentDayIndex === 0 || currentDayIndex === 6) {
      currentDayIndex = 1
    }

    return currentDayIndex
  }

  const [choice, setChoice] = useState(days[getCurrentDayIndex()])
  const [selectedSlot, setSelectedSlot] = useState(getCurrentDayIndex())
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
    testDataClicked,
    snackbarOpen,
    snackbarMessage,
    saveTime
  } = state
  function handleDispatch(actionPayload) {
    dispatch({ type: 'update', payload: actionPayload })
  }

  useEffect(() => {
    if (campus === '') {
      handleDispatch({ firm: '', teams: [], firms: [] })
    }
    if (campus === 'New London') {
      handleDispatch({ firm: 'N/A' })
    }
    if (!manualSelection) {
      handleDispatch({ daily: createSchedule(data, rooms, algo, busyTimes) })
    }

    if (state.rooms === 1) {
      handleDispatch({ manualSelection: false })
    }
  }, [
    rooms,
    data,
    algo,
    firm,
    busyTimes,
    manualSelection,
    isOpenAll,
    choice,
    selectedSlot,
    snackbarMessage,
    selectedSlot,
    campus
  ])

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
      const savedTime = new Date().toLocaleString()
      await db.saves.put({ id: slot, state: state, saveTime: savedTime })
      handleDispatch({
        snackbarOpen: true,
        snackbarMessage: `Schedule saved for ${choice}`,
        saveTime: savedTime
      })
    } catch (error) {
      console.error('Failed to save state:', error)
    }
  }

  const loadState = async (slot) => {
    try {
      const savedState = await db.saves.get(slot)
      if (savedState) {
        console.log('save', savedState.saveTime)
        dispatch({ type: 'update', payload: savedState.state })
        handleDispatch({
          snackbarOpen: true,
          snackbarMessage: `Schedule loaded for ${choice}`,
          saveTime: savedState.saveTime
        })
      } else {
        console.log(`No saved state in slot ${choice}`)
      }
    } catch (error) {
      console.error('Failed to load state:', error)
    }
  }
  const SaveLoadButtons = () => {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

    return (
      <div className="save-load-buttons">
        <div
          style={{
            width: '200px',
            fontSize: '0.9rem',
            margin: '10px 0'
          }}
        >
          Click the info button in the top right corner to learn more about
          saving and loading schedules
        </div>
        <div>
          Day:
          <select
            style={{
              paddingLeft: '10px',
              marginLeft: '10px',
              width: '120px'
            }}
            value={selectedSlot}
            onChange={(e) => {
              dispatch({ type: 'update', payload: { saveTime: '' } })
              setChoice(daysOfWeek[e.target.value - 1])
              setSelectedSlot(Number(e.target.value))
            }}
          >
            {daysOfWeek.map((day, index) => {
              return (
                <option key={index + 1} value={index + 1}>
                  {day}
                </option>
              )
            })}
          </select>
        </div>
        <div>
          {saveTime && (
            <div
              style={{
                fontSize: '0.9rem',
                marginTop: '10px'
              }}
            >
              Last saved: {saveTime}
            </div>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '10px'
          }}
        >
          <button onClick={() => saveState(selectedSlot)}>Save</button>
          <button onClick={clearState}>Clear Schedule</button>
          <button onClick={() => loadState(selectedSlot)}>Load</button>
        </div>
      </div>
    )
  }

  const clearState = () => {
    dispatch({ type: 'clear' })
  }

  return (
    <div className="app-wrapper">
      <AutohideSnackbar message={snackbarMessage} />
      <Header handlePanel={handlePanel} />
      <div className="wrapper">
        {!testDataClicked && (
          <button onClick={handleTestData} className="test-btn">
            test data
          </button>
        )}
        <SlidingPanel show={show} toggleDrawer={handlePanel} />
        <div className="selection-container">
          <div className="dropdown-container">
            <Campus />
            <Firm />
            <Team handleTestData={handleTestData} />
          </div>
          <CheckboxTimes />
          <SaveLoadButtons />
        </div>
        {manualSelection ? <PrintManualDaily /> : <PrintDaily />}
      </div>
      <Footer />
    </div>
  )
}

export default App
