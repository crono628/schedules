import CollapsibleSchedule from '../CollapsibleSchedule/CollapsibleSchedule'
import { useAppContext } from '../AppContext/AppContext'
import './Daily.css'

const Daily = () => {
  const { state } = useAppContext()
  const { data, daily } = state
  return (
    <div className="room-div-wrapper">
      {daily?.rooms?.map((item, index) => {
        return (
          <div className="room-div" key={index}>
            <strong>
              <div>Group {item.room}</div>
            </strong>
            <div className="total-appts-div">
              Total appointments: {item.totalAppts}
              <div className="busy-times">
                <span className="busy-span">Busy times:</span>
                {item.duplicates
                  .sort((a, b) =>
                    b.value < a.value ? 1 : b.value > a.value ? -1 : 0
                  )
                  .map((dup, index) => (
                    <span key={index}>
                      {dup.repeats} ({dup.count})
                      {index < item.duplicates.length - 1 ? ', ' : ''}
                    </span>
                  ))}
              </div>
            </div>
            <div className="provider-div">
              {item?.providers.map((item, index) => (
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
  )
}

export default Daily
