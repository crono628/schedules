import { TIMES } from '../schedule'

const CheckboxTimes = ({ handleTimeChange, selectedTimes }) => {
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
