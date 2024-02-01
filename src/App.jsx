import React, { useEffect } from 'react'
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

function App() {
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

    // if (manualSelection) {
    //   handleDispatch({
    //     manualDaily:
    //       manualDaily.length === 0
    //         ? [{ ...daily }]
    //         : createManualSchedule(manualDaily, rooms)
    //   })
    // }
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

  return (
    <div className="app-wrapper">
      <Header handlePanel={handlePanel} />

      <div className="wrapper">
        {!testDataClicked && (
          <button onClick={handleTestData} className="test-btn">
            test data
          </button>
        )}
        <SlidingPanel show={show} />
        <div className="selection-container">
          <div className="dropdown-container">
            <Campus />
            <Firm />
            <Team handleTestData={handleTestData} />
          </div>
          <CheckboxTimes />
          <RoomControl />
        </div>
        {manualSelection ? <PrintManualDaily /> : <PrintDaily />}
      </div>
      <Footer />
    </div>
  )
}

export default App
