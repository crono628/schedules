import { useAppContext } from '../AppContext/AppContext'

const Header = ({ handlePanel }) => {
  const { state } = useAppContext()
  const { show } = state
  return (
    <div className="header">
      <div>PACT Planner</div>
      <button className="sliding-btn" onClick={handlePanel}>
        {show ? 'Hide Information' : 'Click here for important information'}
      </button>
    </div>
  )
}

export default Header
