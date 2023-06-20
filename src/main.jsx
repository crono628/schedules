import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { AppWrapper } from './components/AppContext/AppContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppWrapper>
    <App />
  </AppWrapper>
)
