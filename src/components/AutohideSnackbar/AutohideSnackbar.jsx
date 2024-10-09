import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import { useAppContext } from '../AppContext/AppContext'

export default function AutohideSnackbar({ message }) {
  const { state, dispatch } = useAppContext()
  const { snackbarOpen } = state

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    dispatch({ type: 'update', payload: { snackbarOpen: false } })
  }

  return (
    <div>
      <Snackbar
        open={snackbarOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={2500}
        onClose={handleClose}
        message={message}
        style={{ marginTop: '200px' }}
        ContentProps={{
          style: { fontSize: '1.5rem' }
        }}
      />
    </div>
  )
}
