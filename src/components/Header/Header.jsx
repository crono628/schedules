import { useAppContext } from '../AppContext/AppContext'

const Header = ({ handlePanel }) => {
  const { state } = useAppContext()
  const { show } = state
  return (
    <div className="header-wrapper">
      <div className="header">
        <div>PACT Planner</div>
        <button className="sliding-btn" onClick={handlePanel}>
          {show ? 'Hide Info' : 'Click Here for Info'}
        </button>
      </div>
    </div>
  )
}

export default Header
