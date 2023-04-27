import { useState } from 'react'
import { TEAMS, TIMES } from './schedule'

const Team = ({ handleSubmit }) => {
  const [selectedTimes, setSelectedTimes] = useState([])
  const [selectedTeam, setSelectedTeam] = useState('')

  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value)
  }

  const handleTimeChange = (event) => {
    const time = event.target.value
    const isChecked = event.target.checked

    if (isChecked) {
      setSelectedTimes([...selectedTimes, time])
    } else {
      setSelectedTimes(selectedTimes.filter((t) => t !== time))
    }
  }

  const handleClick = () => {
    if (selectedTimes.length === 0 || selectedTeam === '') {
      return
    }
    handleSubmit({ doctor: selectedTeam, today: selectedTimes })
    setSelectedTimes([])
    setSelectedTeam('')
  }

  return (
    <div>
      <div>
        <label htmlFor="color-dropdown">Select a team: </label>
        <select
          id="color-dropdown"
          value={selectedTeam}
          onChange={handleTeamChange}
        >
          <option value="">Choose a team</option>
          {TEAMS.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
      </div>
      <div>
        <div className="checkbox-div">
          {TIMES.map((time) => (
            <div key={time}>
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
        <button
          disabled={selectedTeam === '' || selectedTimes.length < 1}
          onClick={handleClick}
        >
          submit
        </button>
      </div>
    </div>
  )
}

export default Team
