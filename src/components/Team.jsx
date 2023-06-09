import { useEffect, useState } from 'react'
import { TIMES } from './schedule'

const Team = ({ handleSubmit, handleTestData, handleEdit, teams }) => {
  const [selectedTimes, setSelectedTimes] = useState([])
  const [selectedTeam, setSelectedTeam] = useState('')

  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value)
  }

  const handleTimeChange = (event) => {
    const time = event.target.value
    const isChecked = event.target.checked

    if (isChecked) {
      setSelectedTimes([...selectedTimes, time].sort())
    } else {
      setSelectedTimes(selectedTimes.filter((t) => t !== time))
    }
  }

  const handleClick = () => {
    if (selectedTimes.length === 0 || selectedTeam === '') {
      return
    }
    handleSubmit({ provider: selectedTeam, today: selectedTimes })
    setSelectedTimes([])
    setSelectedTeam('')
  }

  useEffect(() => {
    if (handleEdit) {
      setSelectedTimes(handleEdit.today)
      setSelectedTeam(handleEdit.provider)
    }
  }, [handleEdit])

  return (
    <>
      <div className="team-submit-container">
        <label htmlFor="color-dropdown">Team: </label>
        <select
          id="color-dropdown"
          value={selectedTeam}
          onChange={handleTeamChange}
        >
          <option value=""></option>
          {teams?.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
        <button
          className="submit-btn"
          disabled={selectedTeam === '' || selectedTimes.length < 1}
          onClick={handleClick}
        >
          submit
        </button>
        <button onClick={handleTestData} className="test-btn">
          test data
        </button>
      </div>
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
    </>
  )
}

export default Team
