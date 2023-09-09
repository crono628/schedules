import React from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useAppContext } from './AppContext/AppContext'
import { findMultipleAppt } from './schedule'
import CollapsibleSchedule from './CollapsibleSchedule/CollapsibleSchedule'

const DraggableProvider = ({ provider }) => {
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
      {provider}
    </div>
  )
}

const DroppableArea = ({ children, roomNumber, onDrop }) => {
  const [, drop] = useDrop({
    accept: 'PROVIDER',
    drop: (item) => onDrop(item.provider, roomNumber)
  })

  return <div ref={drop}>{children}</div>
}

const ManualDaily = () => {
  const { state, dispatch } = useAppContext() // Assuming you have a dispatch function in your context
  const { data, daily } = state
  const [, drop] = useDrop({
    accept: 'PROVIDER',
    drop: (droppedProvider) => handleDrop(daily, droppedProvider.provider)
  })

  const handleDrop = (provider, room) => {
    console.log('handleDrop')

    dispatch({
      type: 'update',
      payload: updateProviderRoom(provider, room)
    })
    //dispatch to update daily based on which provider was dropped into which room

    // Implement the logic to update the room with the dropped provider
    // You need to update your state or dispatch an action here
    // Example: dispatch({ type: 'ADD_PROVIDER_TO_ROOM', room, provider });
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

  return (
    <div className="room-div-wrapper">
      {Object.keys(groupedProviders).map((roomNumber, index) => {
        const providers = groupedProviders[roomNumber]
        const busyTimes = findMultipleAppt(dailyAppts[roomNumber].today)
        console.log('d', busyTimes)

        return (
          <div className="room-div" key={roomNumber}>
            <DroppableArea roomNumber={roomNumber} onDrop={handleDrop}>
              <div>Group {roomNumber}</div>
              <div className="total-appts-div">
                Total appointments{' '}
                {dailyAppts[roomNumber]?.today.reduce((acc, curr) => {
                  return acc + curr.length
                }, 0)}
                <div className="busy-times">
                  <span className="busy-span">Busy times:</span>
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
                {providers.map((provider, index) => {
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
  )
}

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
