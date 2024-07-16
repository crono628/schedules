import { useRef } from 'react'
import ManualDaily from '../ManualDaily'
import { useReactToPrint } from 'react-to-print'
import { logEvent } from 'firebase/analytics'
import { analytics } from '../../firebase'
import './Print.css'
import { useAppContext } from '../AppContext/AppContext'

export const PrintManualDaily = () => {
  const componentRef = useRef()
  const { state, dispatch } = useAppContext()
  const { isOpenAll } = state

  const handlePrint = useReactToPrint({
    content: () => {
      logEvent(analytics, 'manual_print')
      return componentRef.current
    }
  })

  const handleAppointmentToggle = () => {
    logEvent(analytics, 'toggle_all_appointments')
    dispatch({ type: 'update', payload: { isOpenAll: !isOpenAll } })
  }

  return (
    <div className="print-wrapper">
      <div className="print-btn-wrapper">
        <button className="print-btn" onClick={handlePrint}>
          Print Schedule
        </button>
        <button
          className="all-appointments-btn"
          onClick={handleAppointmentToggle}
        >
          {isOpenAll ? 'Collapse Appointments' : 'Expand Appointments'}
        </button>
      </div>
      <ManualDaily ref={componentRef} />
    </div>
  )
}
