import React from 'react'
import './ToggleSwitch.css'
import { useAppContext } from '../AppContext/AppContext'

function ToggleSwitch() {
  const { state, dispatch } = useAppContext()
  const { manualSelection, rooms } = state

  const toggleActive = rooms < 2
  console.log('toggleActive', toggleActive)

  const handleToggle = () => {
    dispatch({ type: 'update', payload: { manualSelection: !manualSelection } })
  }

  return (
    <div className={` toggle-switch ${manualSelection ? 'checked' : ''}`}>
      <label className="switch-label">
        <input
          style={{ cursor: toggleActive ? 'pointer' : 'not-allowed' }}
          type="checkbox"
          className="checkbox"
          checked={manualSelection}
          onChange={handleToggle}
          disabled={toggleActive}
        />
        <div className="slider round"></div>
      </label>
    </div>
  )
}

export default ToggleSwitch
