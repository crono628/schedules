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
    campus,
    extraSelection
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
        edit: null,
        extraSelection: ''
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
      ? `${selectedTeam}${
          extraSelection ? ` ${extraSelection}` : ''
        } RESIDENT ${residentNumber}`
      : !!extraSelection
      ? `${selectedTeam} ${extraSelection}`
      : selectedTeam

    logEvent(analytics, 'submit_team')

    dispatch({
      type: 'update',
      payload: {
        selectedTimes: [],
        selectedTeam: '',
        edit: null,
        selectedResident: false,
        extraSelection: '',
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
      let extraSelectionValue, selectedTeamValue, residentNumberValue
      const isResidentClinic = edit.provider.includes('RESIDENT')
      const isExtraSelection = edit.provider.includes('YELLOW')
      const isBoth = isResidentClinic && isExtraSelection

      extraSelectionValue = isExtraSelection ? edit.provider.split(' ')[1] : ''

      selectedTeamValue = isResidentClinic
        ? edit.provider.split(' ')[0]
        : edit.provider

      residentNumberValue = isBoth
        ? edit.provider.split(' ')[3]
        : isResidentClinic
        ? edit.provider.split(' ')[2]
        : ''
      console.log(edit)
      dispatch({
        type: 'update',
        payload: {
          selectedTimes: edit.today,
          selectedTeam: selectedTeamValue,
          selectedResident: isResidentClinic,
          extraSelection: extraSelectionValue
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
        <div>{/* this is a placeholder for the grid */}</div>

        <div>
          {selectedTeam.includes('YELLOW') && (
            <select
              value={extraSelection}
              onChange={(e) =>
                dispatch({
                  type: 'update',
                  payload: { extraSelection: e.target.value }
                })
              }
            >
              <option value=""></option>
              <option value="MD1">MD1</option>
              <option value="MD2">MD2</option>
              <option value="NP1">NP1</option>
              <option value="NP2">NP2</option>
            </select>
          )}
        </div>
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
        <div>
          {selectedResident && (
            <select
              value={residentNumber}
              onChange={handleResidentNumberChange}
            >
              <option value=""></option>
              {[...Array(20)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          )}
        </div>
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
