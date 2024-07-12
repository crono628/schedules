import { useRef } from 'react'
import ManualDaily from '../ManualDaily'
import { useReactToPrint } from 'react-to-print'
import { logEvent } from 'firebase/analytics'
import { analytics } from '../../firebase'
import './Print.css'

export const PrintManualDaily = () => {
  const componentRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => {
      logEvent(analytics, 'manual_print')
      return componentRef.current
    }
  })

  return (
    <div className="print-wrapper">
      <button className="print-btn" onClick={handlePrint}>
        Print Schedule
      </button>
      <ManualDaily ref={componentRef} />
    </div>
  )
}
