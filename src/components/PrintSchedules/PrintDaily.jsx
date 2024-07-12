import { useRef } from 'react'
import Daily from '../Daily/Daily'
import { useReactToPrint } from 'react-to-print'
import { logEvent } from 'firebase/analytics'
import { analytics } from '../../firebase'
import './Print.css'

export const PrintDaily = () => {
  const componentRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => {
      logEvent(analytics, 'print')
      return componentRef.current
    }
  })

  return (
    <div className="print-wrapper">
      <button className="print-btn" onClick={handlePrint}>
        Print Schedule
      </button>
      <Daily ref={componentRef} />
    </div>
  )
}
