import { Button } from '@mui/material'
import { useAppContext } from '../AppContext/AppContext'

const Header = ({ handlePanel }) => {
  const { state } = useAppContext()
  const { show } = state
  return (
    <div className="header-wrapper">
      <div className="header">
        <div>PACT Planner</div>

        <Button
          variant="contained"
          className="sliding-btn"
          onClick={handlePanel}
        >
          {show ? 'Hide Info' : 'Info'}
        </Button>
      </div>
    </div>
  )
}

export default Header
