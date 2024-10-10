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
// import React from 'react'
// import { TEAMS } from '../../FirmData'
// import { useAppContext } from '../AppContext/AppContext'
// import { Select, MenuItem, FormControl, InputLabel } from '@mui/material'

// const Campus = () => {
//   const { state, dispatch } = useAppContext()
//   const { campus } = state

//   const handleCampus = (e) => {
//     dispatch({
//       type: 'update',
//       payload: {
//         campus: e.target.value,
//         firm: '',
//         teams: [],
//         selectedTeam: '',
//         selectedResident: false,
//         selectedTimes: [],
//         edit: null
//       }
//     })
//   }

//   return (
//     <div className="campus-container">
//       <FormControl
//         variant="outlined"
//         style={{ width: '150px', marginLeft: '10px' }}
//       >
//         <InputLabel id="campus-dropdown-label">Campus</InputLabel>
//         <Select
//           labelId="campus-dropdown-label"
//           id="campus-dropdown"
//           value={campus}
//           onChange={handleCampus}
//           label="Campus"
//         >
//           <MenuItem value="" disabled>
//             <em>None</em>
//           </MenuItem>
//           {TEAMS.map((team, i) => (
//             <MenuItem key={i} value={team.campus}>
//               {team.campus}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </div>
//   )
// }

// export default Campus
