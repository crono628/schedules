import CollapsibleSchedule from './CollapsibleSchedule'
const Daily = ({ dailyArr, obj }) => {
  return (
    <div className="room-div-wrapper">
      {dailyArr?.rooms?.map((item, index) => {
        return (
          <div className="room-div" key={index}>
            <div>Room {item.room}</div>
            <div className="total-appts-div">
              Total appointments {item.totalAppts}
              <div className="busy-times">
                Busy times: {item.duplicates.slice().sort().join(', ')}
              </div>
            </div>
            <div className="provider-div">
              {item?.providers.map((item, index) => (
                <div key={index}>
                  <CollapsibleSchedule
                    obj={obj.find((p) => p.provider === item)}
                  />
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Daily
