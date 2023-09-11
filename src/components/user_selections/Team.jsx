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
    extraSelection,
    selectedResidentNumber,
    manualSelection
  } = state

  useEffect(() => {
    const campusTeam = TEAMS.find((team) => team.campus === campus)
    const firmTeam = campusTeam?.firms.find((firmObj) => firmObj.firm == firm)

    if (firm) {
      dispatch({
        type: 'update',
        payload: {
          teams: firmTeam?.providers,
          selectedTeam: firmTeam?.providers.find(
            (provider) => provider === selectedTeam
          )
        }
      })
    }

    if (edit) {
      const isResidentClinic = edit.provider.includes('RESIDENT')
      const isExtraSelection = edit.provider.includes('MD' || 'NP')

      const residentNumberValue = isResidentClinic
        ? edit.provider.split(' ')[edit.provider.split(' ').length - 1]
        : ''

      const extraSelectionValue = isExtraSelection
        ? edit.provider.split(' ')[1]
        : ''

      dispatch({
        type: 'update',
        payload: {
          selectedTimes: edit.today,
          // selectedTeam: edit.provider.split(' ')[0],
          selectedTeam: teams.find((team) => edit.provider.includes(team)),
          selectedResident: isResidentClinic,
          extraSelection: extraSelectionValue,
          selectedResidentNumber: residentNumberValue
        }
      })
    }
  }, [firm, campus, edit])

  const handleTeamChange = (event) => {
    dispatch({
      type: 'update',
      payload: {
        selectedTeam: event.target.value,
        selectedResident: false,
        edit: null,
        extraSelection: '',
        selectedResidentNumber: ''
      }
    })
  }

  const handleResidentClinicChange = (event) => {
    dispatch({
      type: 'update',
      payload: {
        selectedResident: event.target.checked,
        selectedResidentNumber: ''
      }
    })
  }

  const handleResidentNumberChange = (event) => {
    dispatch({
      type: 'update',
      payload: { selectedResidentNumber: event.target.value }
    })
  }

  const handleClick = () => {
    if (selectedTimes.length === 0 || selectedTeam === '') {
      return
    }

    const provider = `${selectedTeam} ${extraSelection} ${
      selectedResident ? `RESIDENT ${selectedResidentNumber}` : ''
    } `.trim()

    logEvent(analytics, 'submit_team')

    dispatch({
      type: 'update',
      payload: {
        selectedTimes: [],
        selectedTeam: '',
        edit: null,
        selectedResident: false,
        extraSelection: '',
        selectedResidentNumber: '',
        manualSelection: false,
        data: [
          ...data,
          {
            provider: provider,
            today: selectedTimes,
            room: null
          }
        ]
      }
    })
  }

  const disableSubmit = () => {
    if (selectedTeam === '' || selectedTeam === undefined) {
      return true
    }
    if (selectedTimes.length < 1) {
      return true
    }
    if (selectedResident && selectedResidentNumber === '') {
      return true
    }
    return false
  }

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
          {selectedTeam?.includes('YELLOW') && (
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
              value={selectedResidentNumber}
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
        disabled={disableSubmit()}
        onClick={handleClick}
      >
        submit
      </button>
    </>
  )
}

export default Team
