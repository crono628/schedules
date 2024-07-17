import CollapsibleSchedule from '../CollapsibleSchedule/CollapsibleSchedule'
import { useAppContext } from '../AppContext/AppContext'
import './Daily.css'
import React, { useState } from 'react'

const Daily = React.forwardRef((props, ref) => {
  const { state } = useAppContext()
  const { data, daily } = state

  const [fontSize, setFontSize] = useState(100)

  const handleSliderChange = (event) => {
    setFontSize(event.target.value)
  }

  return (
    <div>
      <input
        type="range"
        min="50"
        max="200"
        value={fontSize}
        onChange={handleSliderChange}
        className="font-slider"
      />
      <div
        ref={ref}
        className="room-div-wrapper"
        style={{ fontSize: `${fontSize}%` }}
      >
        {daily?.rooms?.map((item, index) => {
          return (
            <div
              className="room-div"
              key={index}
              style={fontSize < 85 ? { width: '20%' } : { width: '40%' }}
            >
              <strong>
                <div>Group {item.room}</div>
              </strong>
              <div className="total-appts-div">
                <span style={{ whiteSpace: 'nowrap' }}>
                  Total appointments: {item.totalAppts}
                </span>
                <div className="busy-times">
                  {item.duplicates.length > 0 ? 'Busy times: ' : ''}
                  {item.duplicates
                    .sort((a, b) =>
                      b.value < a.value ? 1 : b.value > a.value ? -1 : 0
                    )
                    .map((dup, index) => (
                      <span key={index}>
                        <span style={{ whiteSpace: 'nowrap' }}>
                          {dup.repeats} ({dup.count})
                        </span>
                        {index < item.duplicates.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                </div>
              </div>
              <div className="provider-div">
                {item?.providers
                  .sort((a, b) =>
                    b.provider < a.provider
                      ? 1
                      : b.provider > a.provider
                      ? -1
                      : 0
                  )
                  .map((item, index) => (
                    <CollapsibleSchedule
                      key={index}
                      obj={data.find((p) => p.provider === item)}
                    />
                  ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
})

export default Daily
