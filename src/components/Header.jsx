import { useAppContext } from './AppContext'

const Header = ({ handlePanel }) => {
  const { state } = useAppContext()
  const { show } = state
  return (
    <div className="header">
      <div>PACT Planner</div>
      <button className="sliding-btn" onClick={handlePanel}>
        {show ? 'Hide Instructions' : 'Show Instructions'}
      </button>
    </div>
  )
}

export default Header
