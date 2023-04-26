import { useEffect, useState } from 'react'
import Team from './components/Team'

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    console.log(data)
  }, [data])

  const handleSchedule = (newState) => {
    setData((prev) => [...prev, newState])
  }

  return (
    <>
      <div>
        <Team handleSubmit={handleSchedule} />
      </div>
    </>
  )
}

export default App
