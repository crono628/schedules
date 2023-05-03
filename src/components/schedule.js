export const data = [
  { provider: 'FLOAT PROVIDER', today: ['09:30', '10:30', '11:30'] },
  {
    provider: 'COBALT',
    today: ['09:00', '10:00', '10:30', '11:00', '14:30', '15:00']
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
    ]
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
    ]
  },
  {
    provider: 'SLATE',
    today: ['07:30', '08:30', '10:00', '10:30', '11:30', '12:00', '13:00']
  },
  { provider: 'STEEL', today: ['09:00', '10:00', '11:00'] },
  {
    provider: 'RESIDENT 1',
    today: ['13:30', '14:00', '14:30', '15:00']
  },
  {
    provider: 'RESIDENT 2',
    today: ['13:30', '14:00', '14:30', '15:00']
  },
  {
    provider: 'RESIDENT 3',
    today: ['13:30', '14:00', '14:30', '15:00']
  },
  {
    provider: 'NAVY',
    today: ['07:30', '09:00', '10:00', '10:30', '11:30']
  }
]

export function createSchedule(schedules, offices) {
  let sortedAppointments = sortIt(schedules)
  let rooms = createRooms(offices)
  let dailyTotalAppointments = sortedAppointments.reduce(
    (acc, arr) => acc + arr.today.length,
    0
  )
  let idealApptsPerRoom = Math.floor(dailyTotalAppointments / offices)

  let destinationOffice = 1
  let fullOffices = 0
  for (const appt of sortedAppointments) {
    let { today, provider } = appt
    destinationOffice = resetIfGreater(destinationOffice, offices)
    let currentRoom = rooms.find((obj) => obj.room === destinationOffice)

    while (
      currentRoom['totalAppts'] + currentRoom.appts.length >
      idealApptsPerRoom
    ) {
      fullOffices++
      if (fullOffices > offices) {
        break
      }
      destinationOffice += 1
      destinationOffice = resetIfGreater(destinationOffice, offices)
      currentRoom = rooms.find((obj) => obj.room === destinationOffice)
    }

    currentRoom.appts.push(today)
    currentRoom.providers.push(provider)
    currentRoom.totalAppts = currentRoom.totalAppts += today.length
    destinationOffice++
  }

  for (let i = 0; i < offices; i++) {
    rooms[i].duplicates = findDuplicates(rooms[i].appts)
  }

  return {
    dailyTotal: dailyTotalAppointments,
    appointments: sortedAppointments,
    rooms: rooms
  }
}

function createRooms(num) {
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
  return arr.slice().sort((a, b) => b.today.length - a.today.length)
}

function findDuplicates(arrays) {
  const flattened = arrays.flat()
  const duplicates = []
  for (let i = 0; i < flattened.length; i++) {
    for (let j = i + 1; j < flattened.length; j++) {
      if (flattened[i] === flattened[j] && !duplicates.includes(flattened[i])) {
        duplicates.push(flattened[i])
      }
    }
  }
  return duplicates
}

function resetIfGreater(reset, num) {
  if (reset > num) {
    reset = 1
  }
  return reset
}

export const schedule = createSchedule(data, 2)
// console.log(schedule)

// console.log(schedule.rooms)

export const TEAMS = [
  'AIR FORCE',
  'COBALT',
  'CYAN',
  'ICE',
  'NAVY',
  'RESIDENT 1',
  'RESIDENT 2',
  'RESIDENT 3',
  'ROYAL',
  'SAPPHIRE',
  'SKY',
  'SLATE',
  'STEEL'
]

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
  '15:30'
]
