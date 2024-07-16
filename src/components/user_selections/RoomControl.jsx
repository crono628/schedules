import { logEvent } from 'firebase/analytics'
import { useAppContext } from '../AppContext/AppContext'
import { analytics } from '../../firebase'
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch'
import Accordion from '@mui/material/Accordion'
import AccordionActions from '@mui/material/AccordionActions'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Button from '@mui/material/Button'

const RoomControl = () => {
  const { state, dispatch } = useAppContext()
  const { rooms, manualSelection, isOpenAll } = state
  const roomLimit = 25

  const handleRoomsButton = (e) => {
    const button = e.target.dataset.button
    dispatch({ type: 'update', payload: { manualSelection: false } })
    if (button === 'plus room' && rooms < roomLimit) {
      dispatch({ type: 'update', payload: { rooms: rooms + 1 } })
    } else if (button === 'minus room' && rooms > 1) {
      dispatch({ type: 'update', payload: { rooms: rooms - 1 } })
    }
  }

  const showDnd = rooms > 1 && state.data.length > 2

  return (
    <div className="btn-wrapper">
      <div className="room-btns">
        Rooms
        <div className="btn-container">
          <button data-button="minus room" onClick={handleRoomsButton}>
            -
          </button>
          <div className="room-algo">{rooms}</div>
          <button data-button="plus room" onClick={handleRoomsButton}>
            +
          </button>
        </div>
      </div>
      <div className="room-btns">
        {showDnd ? (
          <div className="toggle-container">
            Drag and Drop
            <ToggleSwitch />
          </div>
        ) : (
          <div className="toggle-container"></div>
        )}
      </div>
      {showDnd && (
        <div
          style={{
            width: 150
          }}
        >
          <Accordion
            className="explain"
            style={{ cursor: 'pointer' }}
            onClick={() =>
              dispatch({
                type: 'update',
                payload: { dndExplain: !state.dndExplain }
              })
            }
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <div style={{ fontSize: '1.1rem' }}>
                Drag and Drop Information
              </div>
            </AccordionSummary>
            <AccordionDetails>
              Disabling drag and drop will reset any changes made using it.
              Clicking submit or changing the number of rooms will also disable
              drag and drop, which will need to be reenabled to continue using
              it. It's best to use drag and drop once the number of rooms is
              decided and all clinics have been entered.
            </AccordionDetails>
          </Accordion>
        </div>
      )}
      {showDnd && (
        <div
          className="explain"
          style={{ cursor: 'pointer' }}
          onClick={() =>
            dispatch({
              type: 'update',
              payload: { dndExplain: !state.dndExplain }
            })
          }
        ></div>
      )}
    </div>
  )
}

export default RoomControl
