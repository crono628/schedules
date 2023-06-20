import { useAppContext } from '../AppContext/AppContext'

const Firm = () => {
  const { state, dispatch } = useAppContext()
  const { firm } = state

  const handleFirmChange = (e) =>
    dispatch({ type: 'update', payload: { firm: e.target.value } })
  return (
    <div className="firm-container">
      <label htmlFor="firm-dropdown">Firm: </label>
      <select id="firm-dropdown" value={firm} onChange={handleFirmChange}>
        <option value=""></option>
        <option value="1"> 1 </option>
        <option value="2"> 2 </option>
      </select>
    </div>
  )
}

export default Firm
