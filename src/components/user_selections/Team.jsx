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
      const isResidentClinic = edit.provider.includes('RES')
      const extraSelections = ['MD1', 'MD2', 'NP1', 'NP2', 'NPR']
      const isExtraSelection = extraSelections.some((selection) =>
        edit.provider.includes(selection)
      )

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
      selectedResident ? `RES ${selectedResidentNumber}` : ''
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
              <option value="NPR">NPR</option>
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
              {[...Array(30)].map((_, i) => (
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
// import { useEffect } from 'react'
// import { useAppContext } from '../AppContext/AppContext'
// import { logEvent } from '@firebase/analytics'
// import { analytics } from '../../firebase'
// import { TEAMS } from '../../FirmData'
// import {
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Checkbox,
//   FormControlLabel
// } from '@mui/material'

// const Team = () => {
//   const { state, dispatch } = useAppContext()
//   const {
//     edit,
//     teams,
//     selectedTeam,
//     selectedTimes,
//     data,
//     selectedResident,
//     firm,
//     campus,
//     extraSelection,
//     selectedResidentNumber,
//     manualSelection
//   } = state

//   useEffect(() => {
//     const campusTeam = TEAMS.find((team) => team.campus === campus)
//     const firmTeam = campusTeam?.firms.find((firmObj) => firmObj.firm == firm)

//     if (firm) {
//       dispatch({
//         type: 'update',
//         payload: {
//           teams: firmTeam?.providers,
//           selectedTeam: firmTeam?.providers.find(
//             (provider) => provider === selectedTeam
//           )
//         }
//       })
//     }

//     if (edit) {
//       const isResidentClinic = edit.provider.includes('RES')
//       const extraSelections = ['MD1', 'MD2', 'NP1', 'NP2', 'NPR']
//       const isExtraSelection = extraSelections.some((selection) =>
//         edit.provider.includes(selection)
//       )

//       const residentNumberValue = isResidentClinic
//         ? edit.provider.split(' ')[edit.provider.split(' ').length - 1]
//         : ''

//       const extraSelectionValue = isExtraSelection
//         ? edit.provider.split(' ')[1]
//         : ''

//       dispatch({
//         type: 'update',
//         payload: {
//           selectedTimes: edit.today,
//           selectedTeam: teams.find((team) => edit.provider.includes(team)),
//           selectedResident: isResidentClinic,
//           extraSelection: extraSelectionValue,
//           selectedResidentNumber: residentNumberValue
//         }
//       })
//     }
//   }, [firm, campus, edit])

//   const handleTeamChange = (event) => {
//     dispatch({
//       type: 'update',
//       payload: {
//         selectedTeam: event.target.value,
//         selectedResident: false,
//         edit: null,
//         extraSelection: '',
//         selectedResidentNumber: ''
//       }
//     })
//   }

//   const handleResidentClinicChange = (event) => {
//     dispatch({
//       type: 'update',
//       payload: {
//         selectedResident: event.target.checked,
//         selectedResidentNumber: ''
//       }
//     })
//   }

//   const handleResidentNumberChange = (event) => {
//     dispatch({
//       type: 'update',
//       payload: { selectedResidentNumber: event.target.value }
//     })
//   }

//   const handleClick = () => {
//     if (selectedTimes.length === 0 || selectedTeam === '') {
//       return
//     }

//     const provider = `${selectedTeam} ${extraSelection} ${
//       selectedResident ? `RES ${selectedResidentNumber}` : ''
//     } `.trim()

//     logEvent(analytics, 'submit_team')

//     dispatch({
//       type: 'update',
//       payload: {
//         selectedTimes: [],
//         selectedTeam: '',
//         edit: null,
//         selectedResident: false,
//         extraSelection: '',
//         selectedResidentNumber: '',
//         manualSelection: false,
//         data: [
//           ...data,
//           {
//             provider: provider,
//             today: selectedTimes,
//             room: null
//           }
//         ]
//       }
//     })
//   }

//   const disableSubmit = () => {
//     return (
//       selectedTeam === '' ||
//       selectedTimes.length < 1 ||
//       (selectedResident && selectedResidentNumber === '')
//     )
//   }

//   return (
//     <>
//       <div className="team-submit-container">
//         <FormControl
//           variant="outlined"
//           style={{ width: '150px', marginLeft: '10px' }}
//         >
//           <InputLabel id="team-dropdown-label">Team</InputLabel>
//           <Select
//             labelId="team-dropdown-label"
//             id="team-dropdown"
//             value={selectedTeam}
//             onChange={handleTeamChange}
//             label="Team"
//           >
//             <MenuItem value="" disabled>
//               <em>None</em>
//             </MenuItem>
//             {teams?.map((team) => (
//               <MenuItem key={team} value={team}>
//                 {team}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <div>
//           {selectedTeam?.includes('YELLOW') && (
//             <FormControl
//               variant="outlined"
//               style={{ width: '150px', marginLeft: '10px' }}
//             >
//               <InputLabel id="extra-selection-label">
//                 Extra Selection
//               </InputLabel>
//               <Select
//                 labelId="extra-selection-label"
//                 value={extraSelection}
//                 onChange={(e) =>
//                   dispatch({
//                     type: 'update',
//                     payload: { extraSelection: e.target.value }
//                   })
//                 }
//                 label="Extra Selection"
//               >
//                 <MenuItem value=""></MenuItem>
//                 <MenuItem value="MD1">MD1</MenuItem>
//                 <MenuItem value="MD2">MD2</MenuItem>
//                 <MenuItem value="NP1">NP1</MenuItem>
//                 <MenuItem value="NP2">NP2</MenuItem>
//                 <MenuItem value="NPR">NPR</MenuItem>
//               </Select>
//             </FormControl>
//           )}
//         </div>

//         <div className="resident-clinic-container">
//           <FormControlLabel
//             control={
//               <Checkbox
//                 id="resident-clinic-checkbox"
//                 checked={selectedResident}
//                 onChange={handleResidentClinicChange}
//               />
//             }
//             label="Resident"
//           />
//         </div>

//         <div>
//           {selectedResident && (
//             <FormControl
//               variant="outlined"
//               style={{ width: '150px', marginLeft: '10px' }}
//             >
//               <InputLabel id="resident-number-label">
//                 Resident Number
//               </InputLabel>
//               <Select
//                 labelId="resident-number-label"
//                 value={selectedResidentNumber}
//                 onChange={handleResidentNumberChange}
//                 label="Resident Number"
//               >
//                 <MenuItem value=""></MenuItem>
//                 {[...Array(30)].map((_, i) => (
//                   <MenuItem key={i} value={i + 1}>
//                     {i + 1}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           )}
//         </div>
//       </div>
//       <button
//         className="submit-btn"
//         disabled={disableSubmit()}
//         onClick={handleClick}
//       >
//         submit
//       </button>
//     </>
//   )
// }

// export default Team
