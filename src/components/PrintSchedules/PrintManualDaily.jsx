import { useRef } from 'react'
import ManualDaily from '../ManualDaily'
import { useReactToPrint } from 'react-to-print'

export const PrintManualDaily = () => {
  const componentRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  })

  return (
    <div>
      <button className="print-btn" onClick={handlePrint}>
        Print Schedule
      </button>
      <ManualDaily ref={componentRef} />
    </div>
  )
}
