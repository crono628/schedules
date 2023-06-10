import { useEffect } from 'react'
import { useAppContext } from '../AppContext'

const Team = ({ handleSubmit, handleTestData }) => {
  const { state, dispatch } = useAppContext()
  const { edit, teams, selectedTeam, selectedTimes } = state

  const handleTeamChange = (event) => {
    dispatch({ type: 'update', payload: { selectedTeam: event.target.value } })
  }

  const handleClick = () => {
    if (selectedTimes.length === 0 || selectedTeam === '') {
      return
    }
    handleSubmit({ provider: selectedTeam, today: selectedTimes })
    dispatch({
      type: 'update',
      payload: { selectedTimes: [], selectedTeam: '' }
    })
  }

  useEffect(() => {
    if (edit) {
      dispatch({
        type: 'update',
        payload: { selectedTimes: edit.today, selectedTeam: edit.provider }
      })
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
    </>
  )
}

export default Team
