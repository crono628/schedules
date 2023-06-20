import { useEffect, useState } from 'react'
import { useAppContext } from '../AppContext/AppContext'
import { logEvent } from '@firebase/analytics'
import { analytics } from '../../firebase'

const Team = () => {
  const { state, dispatch } = useAppContext()
  const { edit, teams, selectedTeam, selectedTimes, data } = state
  const [resident, setResident] = useState('')

  const handleTeamChange = (event) => {
    dispatch({ type: 'update', payload: { selectedTeam: event.target.value } })
    setResident('')
  }

  const handleResidentChange = (event) => {
    setResident(event.target.value.toString())
  }

  const handleClick = () => {
    if (selectedTimes.length === 0 || selectedTeam === '') {
      return
    }

    if (selectedTeam === 'RESIDENT' && resident === '') {
      return
    }

    logEvent(analytics, 'submit_team')

    dispatch({
      type: 'update',
      payload: {
        selectedTimes: [],
        selectedTeam: '',
        edit: null,
        data: [
          ...data,
          {
            provider:
              resident === '' ? selectedTeam : `${selectedTeam} ${resident}`,
            today: selectedTimes
          }
        ]
      }
    })
    setResident('')
  }

  useEffect(() => {
    if (edit) {
      dispatch({
        type: 'update',
        payload: {
          selectedTimes: edit.today,
          selectedTeam: edit.provider.includes('RESIDENT')
            ? 'RESIDENT'
            : edit.provider.split(' ')[0]
        }
      })
      if (edit.provider.includes('RESIDENT')) {
        setResident(edit.provider.split(' ')[1])
      }
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
        {selectedTeam === 'RESIDENT' && (
          <>
            <select
              id="resident-dropdown"
              value={resident}
              onChange={handleResidentChange}
            >
              <option value="" disabled></option>
              {[...Array(20)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </>
        )}
      </div>
      <button
        className="submit-btn"
        disabled={
          selectedTeam === '' ||
          selectedTimes.length < 1 ||
          (selectedTeam === 'RESIDENT' && resident === '')
        }
        onClick={handleClick}
      >
        submit
      </button>
    </>
  )
}

export default Team
