import { useEffect, useState } from 'react'
import { useAppContext } from '../AppContext'
import CheckboxTimes from './CheckboxTimes'

const Team = ({ handleSubmit, handleTestData }) => {
  const { state } = useAppContext()
  const { edit, teams } = state
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
    if (edit) {
      setSelectedTimes(edit.today)
      setSelectedTeam(edit.provider)
    }
  }, [edit])

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
      <CheckboxTimes
        handleTimeChange={handleTimeChange}
        selectedTimes={selectedTimes}
      />
    </>
  )
}

export default Team
