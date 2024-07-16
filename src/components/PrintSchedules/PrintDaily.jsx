import { useRef } from 'react'
import Daily from '../Daily/Daily'
import { useReactToPrint } from 'react-to-print'
import { logEvent } from 'firebase/analytics'
import { analytics } from '../../firebase'
import './Print.css'
import { useAppContext } from '../AppContext/AppContext'

export const PrintDaily = () => {
  const componentRef = useRef()
  const { state, dispatch } = useAppContext()
  const { isOpenAll } = state

  const handlePrint = useReactToPrint({
    content: () => {
      logEvent(analytics, 'print')
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
      <Daily ref={componentRef} />
    </div>
  )
}
