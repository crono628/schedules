import React, { useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useAppContext } from './AppContext/AppContext'
import { findMultipleAppt } from './schedule'
import CollapsibleSchedule from './CollapsibleSchedule/CollapsibleSchedule'
import './Daily/Daily.css'

const DraggableProvider = ({ provider }) => {
  const { state } = useAppContext()
  const [{ isDragging }, drag] = useDrag({
    type: 'PROVIDER',
    item: { provider },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  })

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move'
      }}
    >
      <CollapsibleSchedule
        obj={state.data.find((p) => p.provider === provider)}
      />
    </div>
  )
}

const DroppableArea = ({ children, roomNumber, onDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'PROVIDER',
    drop: (item) => onDrop(item.provider, roomNumber),
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  })

  return (
    <div
      ref={drop}
      style={{
        boxShadow: isOver ? '0 0 3px 3px lightgreen' : '',
        borderRadius: '5px'
      }}
    >
      {children}
    </div>
  )
}

const ManualDaily = React.forwardRef((props, ref) => {
  const { state, dispatch } = useAppContext()
  const { data, daily, rooms } = state

  const [, drop] = useDrop({
    accept: 'PROVIDER',
    drop: (droppedProvider) => handleDrop(daily, droppedProvider.provider)
  })

  const handleDrop = (provider, room) => {
    dispatch({
      type: 'update',
      payload: updateProviderRoom(provider, room)
    })
  }

  function updateProviderRoom(provider, room) {
    for (const item of data) {
      if (item.provider === provider) {
        item.room = parseInt(room)
      }
    }
  }

  const groupedProviders = groupProvidersByRoom(data)

  const dailyAppts = data.reduce((acc, curr) => {
    acc[curr.room] = acc[curr.room] || { today: [] }
    acc[curr.room].today.push(curr.today)

    return acc
  }, {})

  //an array of room numbers from 1 to the number of rooms
  const roomNumbers = Array.from({ length: rooms }, (_, i) => i + 1)
  const [fontSize, setFontSize] = useState(100)

  const handleSliderChange = (event) => {
    setFontSize(event.target.value)
  }
  return (
    <div>
      <input
        type="range"
        min="50"
        max="200"
        value={fontSize}
        onChange={handleSliderChange}
        className="font-slider"
      />
      <div
        ref={ref}
        className="room-div-wrapper"
        style={{ fontSize: `${fontSize}%` }}
      >
        {Object.keys(groupedProviders).map((roomNumber, index) => {
          const providers = groupedProviders[roomNumber]
          const busyTimes = findMultipleAppt(dailyAppts[roomNumber].today)
          console.log(busyTimes)
          return (
            <div
              className="room-div"
              key={roomNumber}
              style={fontSize < 85 ? { width: '20%' } : { width: '40%' }}
            >
              <DroppableArea roomNumber={roomNumber} onDrop={handleDrop}>
                <strong>
                  <div>
                    Group{' '}
                    {
                      daily?.rooms?.find(
                        (item) => item.room === parseInt(roomNumber)
                      )?.room
                    }
                  </div>
                </strong>
                <div className="total-appts-div">
                  Total appointments:{' '}
                  {dailyAppts[roomNumber]?.today.reduce((acc, curr) => {
                    return acc + curr.length
                  }, 0)}
                  <div className="busy-times">
                    <span className="busy-span">
                      {busyTimes.length > 0 ? 'Busy times:' : ''}
                    </span>
                    {busyTimes
                      .sort((a, b) =>
                        b.value < a.value ? 1 : b.value > a.value ? -1 : 0
                      )
                      .map((dup, index) => (
                        <span key={index}>
                          {dup.repeats} ({dup.count})
                          {index < busyTimes.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                  </div>
                </div>
                <div className="provider-div">
                  {data
                    .filter(
                      (provider) => provider.room === parseInt(roomNumber)
                    )
                    .sort((a, b) =>
                      b.today.length > a.today.length
                        ? 1
                        : b.today.length < a.today.length
                        ? -1
                        : 0
                    )
                    .map((provider, index) => {
                      return (
                        <DraggableProvider
                          key={index}
                          provider={provider.provider}
                        />
                      )
                    })}
                </div>
              </DroppableArea>
            </div>
          )
        })}
      </div>
    </div>
  )
})

function groupProvidersByRoom(providers) {
  const groupedProviders = {}

  providers.forEach((provider) => {
    const room = provider.room

    if (!groupedProviders[room]) {
      groupedProviders[room] = []
    }

    groupedProviders[room].push(provider)
  })

  return groupedProviders
}

export default ManualDaily
