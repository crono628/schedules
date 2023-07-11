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
