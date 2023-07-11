import React from 'react'
import { TEAMS } from '../../FirmData'
import { useAppContext } from '../AppContext/AppContext'

const Campus = () => {
  const { state, dispatch } = useAppContext()
  const { campus } = state

  const handleCampus = (e) => {
    dispatch({
      type: 'update',
      payload: {
        campus: e.target.value,
        firm: '',
        teams: [],
        selectedTeam: '',
        selectedResident: false,
        selectedTimes: [],
        edit: null
      }
    })
  }

  return (
    <div className="campus-container">
      <label htmlFor="campus-dropdown">Campus: </label>
      <select id="campus-dropdown" value={campus} onChange={handleCampus}>
        <option value="" disabled></option>

        {TEAMS.map((team, i) => (
          <option key={i} value={team.campus}>
            {team.campus}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Campus
