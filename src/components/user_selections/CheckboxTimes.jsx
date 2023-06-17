import { TIMES } from '../schedule'
import { useAppContext } from '../AppContext/AppContext'

const CheckboxTimes = () => {
  const { state, dispatch } = useAppContext()
  const { selectedTimes } = state

  const handleTimeChange = (event) => {
    const time = event.target.value
    const isChecked = event.target.checked

    if (isChecked) {
      dispatch({
        type: 'update',
        payload: { selectedTimes: [...selectedTimes, time].sort() }
      })
    } else {
      dispatch({
        type: 'update',
        payload: { selectedTimes: selectedTimes.filter((t) => t !== time) }
      })
    }
  }

  return (
    <div>
      <div className="checkbox-div">
        {TIMES.map((time) => (
          <div className="checkbox-item" key={time}>
            <input
              type="checkbox"
              id={time}
              name={time}
              value={time}
              onChange={handleTimeChange}
              checked={selectedTimes.includes(time)}
            />
            <label htmlFor={time}>{time}</label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CheckboxTimes
