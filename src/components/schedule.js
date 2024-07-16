export const data = [
  { provider: 'SKY', today: ['09:30', '10:30', '11:30'], room: null },
  {
    provider: 'COBALT',
    today: ['09:00', '10:00', '10:30', '11:00', '14:30', '15:00'],
    room: null
  },
  {
    provider: 'CYAN',
    today: [
      '08:00',
      '08:30',
      '10:30',
      '11:00',
      '12:30',
      '13:00',
      '13:30',
      '14:00',
      '15:00'
    ],
    room: null
  },
  {
    provider: 'SAPPHIRE',
    today: [
      '07:00',
      '08:00',
      '08:30',
      '09:00',
      '10:00',
      '11:00',
      '11:30',
      '13:00',
      '14:00',
      '14:30'
    ],
    room: null
  },
  {
    provider: 'SLATE',
    today: ['07:30', '08:30', '10:00', '10:30', '11:30', '12:00', '13:00'],
    room: null
  },
  { provider: 'STEEL', today: ['09:00', '10:00', '11:00'], room: null },
  {
    provider: 'STEEL RES 1',
    today: ['13:30', '14:00', '14:30', '15:00'],
    room: null
  },
  // {
  //   provider: 'RESIDENT 2',
  //   today: ['13:30', '14:00', '14:30', '15:00']
  // },
  {
    provider: 'STEEL RES 3',
    today: ['13:30', '14:00', '14:30', '15:00'],
    room: null
  },
  {
    provider: 'NAVY',
    today: ['07:30', '09:00', '10:00', '10:30', '11:30'],
    room: null
  }
]

// Function to calculate the ideal number of appointments per room
function calculateIdealApptsPerRoom(dailyTotalAppointments, offices) {
  return Math.floor(dailyTotalAppointments / offices - 2)
}

// Function to find the room with the fewest appointments (optimized approach)
function findMinAppointmentsRoom(rooms) {
  return rooms.reduce((minRoom, room) => {
    return room.totalAppts + room.appts.length <
      minRoom.totalAppts + minRoom.appts.length
      ? room
      : minRoom
  }, rooms[0])
}

// Function to find a room based on the destination office (original approach with algo modification)
export function findRoomByDestination(rooms, destinationOffice) {
  return rooms.find((obj) => obj.room === destinationOffice)
}

// Function to handle appointment allocation
function allocateAppointment(currentRoom, today, provider, appt) {
  currentRoom.appts.push(today)
  currentRoom.providers.push(provider)
  currentRoom.totalAppts += today.length
  appt.room = currentRoom.room
}

// Function to reset destination office if it exceeds the number of offices
export function resetDestinationOffice(destinationOffice, offices) {
  return (destinationOffice + 1) % offices
}

// Main createSchedule function
export function createSchedule(
  schedules,
  offices,
  algo = 1,
  busyThreshold = 3
) {
  let sortedAppointments = sortIt(schedules)
  let rooms = createRooms(offices)
  let dailyTotalAppointments = sortedAppointments.reduce(
    (acc, arr) => acc + arr.today.length,
    0
  )

  let idealApptsPerRoom = calculateIdealApptsPerRoom(
    dailyTotalAppointments,
    offices
  )

  let fullOffices = 0
  let destinationOffice = 1

  for (const appt of sortedAppointments) {
    let { today, provider } = appt
    let currentRoom

    if (algo === 1) {
      currentRoom = findMinAppointmentsRoom(rooms) // Optimized approach
    } else {
      currentRoom = findRoomByDestination(rooms, destinationOffice) // Original approach with algo modification
    }

    while (
      currentRoom.totalAppts + currentRoom.appts.length > idealApptsPerRoom ||
      haveOverlap(currentRoom.appts, today)
    ) {
      fullOffices++

      if (fullOffices > offices + algo) {
        break
      }

      if (algo === 1) {
        currentRoom = findMinAppointmentsRoom(rooms)
      } else {
        destinationOffice = resetDestinationOffice(destinationOffice, offices)
        currentRoom = findRoomByDestination(rooms, destinationOffice)
      }
    }

    allocateAppointment(currentRoom, today, provider, appt)

    if (algo !== 1) {
      destinationOffice = resetDestinationOffice(destinationOffice, offices)
    }
  }

  for (let i = 0; i < offices; i++) {
    rooms[i].duplicates = findMultipleAppt(rooms[i].appts, busyThreshold)
  }

  return {
    dailyTotal: dailyTotalAppointments,
    appointments: sortedAppointments,
    rooms: rooms
  }
}

// a function to group providers by room

export function createRooms(num) {
  const arr = []
  for (let i = 1; i <= num; i++) {
    arr.push({
      room: i,
      appts: [],
      providers: [],
      totalAppts: 0,
      duplicates: []
    })
  }
  return arr
}

function sortIt(arr) {
  return arr?.slice().sort((a, b) => b.today.length - a.today.length)
}

export function findMultipleAppt(arr, num = 3) {
  if (num < 2) {
    return []
  }
  const flattened = arr.flat()
  const counts = {}
  flattened.forEach((obj) => {
    const key = JSON.stringify(obj)
    counts[key] = counts[key] ? counts[key] + 1 : 1
  })
  const result = []
  Object.entries(counts).forEach(([key, count]) => {
    const obj = JSON.parse(key)
    result.push({ count, repeats: obj })
  })
  return result
    .filter((item) => item.count >= num)
    .sort((a, b) =>
      a.repeats > b.repeats ? 1 : a.repeats < b.repeats ? -1 : 0
    )
}

export function haveOverlap(existingAppointments, newAppointments) {
  for (const existingAppt of existingAppointments) {
    for (const existingTime of existingAppt) {
      for (const newAppt of newAppointments) {
        if (newAppt.includes(existingTime)) {
          return true
        }
      }
    }
  }
  return false
}

function resetIfGreater(reset, num) {
  if (reset > num) {
    reset = 1
  }
  return reset
}

export const schedule = createSchedule(data, 2)

export const TIMES = [
  '07:00',
  '07:30',
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30'
]
