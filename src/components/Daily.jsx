const Daily = ({ dailyArr }) => {
  return (
    <div>
      {dailyArr?.rooms?.map((item, index) => {
        return (
          <div className="room-div" key={index}>
            <div>Room {item.room}</div>
            <div className="total-appts-div">
              Total appointments {item.totalAppts}
            </div>
            <div className="provider-div">
              {item.doctors.map((item, index) => (
                <div key={index}>{item}</div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Daily
