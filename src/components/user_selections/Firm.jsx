import { useEffect } from 'react'
import { useAppContext } from '../AppContext/AppContext'
import { TEAMS } from '../../FirmData'

const Firm = () => {
  const { state, dispatch } = useAppContext()
  const { firm, campus, teams, firms } = state

  useEffect(() => {
    const campusFirms = TEAMS.filter((team) => team.campus === campus).find(
      (team) => team.campus === campus
    )

    let firmChoice = campusFirms?.firms.map((item) => item.firm.toString())

    dispatch({ type: 'update', payload: { firms: firmChoice } })
  }, [campus])

  const handleFirmChange = (e) =>
    dispatch({ type: 'update', payload: { firm: e.target.value } })

  return (
    <div className="firm-container">
      <label htmlFor="firm-dropdown">Firm: </label>
      <select id="firm-dropdown" value={firm} onChange={handleFirmChange}>
        <option value=""></option>
        {firms?.map((num, i) => (
          <option key={i} value={num}>
            {num}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Firm

// import { useEffect } from 'react'
// import { useAppContext } from '../AppContext/AppContext'
// import { TEAMS } from '../../FirmData'
// import { Select, MenuItem, FormControl, InputLabel } from '@mui/material'

// const Firm = () => {
//   const { state, dispatch } = useAppContext()
//   const { firm, campus, teams, firms } = state

//   useEffect(() => {
//     const campusFirms = TEAMS.filter((team) => team.campus === campus).find(
//       (team) => team.campus === campus
//     )

//     let firmChoice = campusFirms?.firms.map((item) => item.firm.toString())

//     dispatch({ type: 'update', payload: { firms: firmChoice } })
//   }, [campus])

//   const handleFirmChange = (e) =>
//     dispatch({ type: 'update', payload: { firm: e.target.value } })

//   return (
//     <div className="firm-container">
//       <FormControl
//         variant="outlined"
//         style={{ width: '150px', marginLeft: '10px' }}
//       >
//         <InputLabel id="firm-dropdown-label">Firm</InputLabel>
//         <Select
//           labelId="firm-dropdown-label"
//           id="firm-dropdown"
//           value={firm}
//           onChange={handleFirmChange}
//           label="Firm"
//         >
//           <MenuItem value="">
//             <em>None</em>
//           </MenuItem>
//           {firms?.map((num, i) => (
//             <MenuItem key={i} value={num}>
//               {num}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </div>
//   )
// }

// export default Firm
