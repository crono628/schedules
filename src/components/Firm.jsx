const Firm = ({ firm, handleFirmChange }) => {
  return (
    <div className="firm-div">
      <label htmlFor="firm-dropdown">Firm: </label>
      <select id="color-dropdown" value={firm} onChange={handleFirmChange}>
        <option value=""></option>
        <option value="1"> 1 </option>
        <option value="2"> 2 </option>
      </select>
    </div>
  )
}

export default Firm
