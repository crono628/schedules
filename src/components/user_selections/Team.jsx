import { useEffect, useState } from 'react'
import { useAppContext } from '../AppContext/AppContext'
import { logEvent } from '@firebase/analytics'
import { analytics } from '../../firebase'
import { TEAMS } from '../../FirmData'

const Team = () => {
  const { state, dispatch } = useAppContext()
  const {
    edit,
    teams,
    selectedTeam,
    selectedTimes,
    data,
    selectedResident,
    firm,
    campus
  } = state
  const [residentNumber, setResidentNumber] = useState('')

  useEffect(() => {
    if (firm) {
      const campusTeam = TEAMS.find((team) => team.campus === campus)
      const firmTeam = campusTeam?.firms.find((firmObj) => firmObj.firm == firm)
      dispatch({
        type: 'update',
        payload: { teams: firmTeam?.providers }
      })
    }
  }, [firm, campus, teams])

  const handleTeamChange = (event) => {
    dispatch({
      type: 'update',
      payload: {
        selectedTeam: event.target.value,
        selectedResident: false,
        edit: null
      }
    })
    setResidentNumber('')
  }

  const handleResidentClinicChange = (event) => {
    dispatch({
      type: 'update',
      payload: { selectedResident: event.target.checked }
    })

    setResidentNumber('')
  }

  const handleResidentNumberChange = (event) => {
    setResidentNumber(event.target.value)
  }

  const handleClick = () => {
    if (selectedTimes.length === 0 || selectedTeam === '') {
      return
    }

    const provider = selectedResident
      ? `${selectedTeam} RESIDENT ${residentNumber}`
      : selectedTeam

    logEvent(analytics, 'submit_team')

    dispatch({
      type: 'update',
      payload: {
        selectedTimes: [],
        selectedTeam: '',
        edit: null,
        selectedResident: false,
        data: [
          ...data,
          {
            provider: provider,
            today: selectedTimes
          }
        ]
      }
    })

    setResidentNumber('')
  }

  useEffect(() => {
    if (edit) {
      const isResidentClinic = edit.provider.includes('RESIDENT')
      const selectedTeamValue = isResidentClinic
        ? edit.provider.split(' ')[0]
        : edit.provider
      const residentNumberValue = isResidentClinic
        ? edit.provider.split(' ')[2]
        : ''
      dispatch({
        type: 'update',
        payload: {
          selectedTimes: edit.today,
          selectedTeam: selectedTeamValue,
          selectedResident: isResidentClinic
        }
      })

      setResidentNumber(residentNumberValue)
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
          <option value="" disabled></option>
          {teams?.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
        <div className="resident-clinic-container">
          <input
            type="checkbox"
            id="resident-clinic-checkbox"
            checked={selectedResident}
            onChange={handleResidentClinicChange}
          />
          <label className="res-checkbox" htmlFor="resident-clinic-checkbox">
            Resident
          </label>
        </div>

        {selectedResident && (
          <input
            type="text"
            value={residentNumber}
            onChange={handleResidentNumberChange}
            placeholder="Resident Number"
            className="resident-number-input"
          />
        )}
      </div>
      <button
        className="submit-btn"
        disabled={
          selectedTeam === '' ||
          selectedTimes.length < 1 ||
          (selectedResident && residentNumber === '')
        }
        onClick={handleClick}
      >
        submit
      </button>
    </>
  )
}

export default Team
