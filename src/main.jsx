import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { AppWrapper } from './components/AppContext/AppContext'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
ReactDOM.createRoot(document.getElementById('root')).render(
  <DndProvider backend={HTML5Backend} options={{ enableMouseEvents: true }}>
    <AppWrapper>
      <App />
    </AppWrapper>
  </DndProvider>
)
