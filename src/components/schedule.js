export const data = [
  { doctor: 'NEW PACT 1 FLOAT PROVIDER', today: ['09:30', '10:30'] },
  {
    doctor: 'NEW PACT 2 COBALT MD WH',
    today: ['09:00', '10:00', '10:30', '11:00', '02:30', '03:00']
  },
  {
    doctor: 'NEW PACT 2 CYAN APRN WH',
    today: [
      '08:00',
      '08:30',
      '10:30',
      '11:00',
      '12:30',
      '01:00',
      '01:30',
      '02:00',
      '3:00'
    ]
  },
  {
    doctor: 'NEW PACT 2 SAPPHIRE MD',
    today: [
      '07:00',
      '08:00',
      '08:30',
      '09:00',
      '10:00',
      '11:00',
      '11:30',
      '01:00',
      '02:00',
      '02:30'
    ]
  },
  {
    doctor: 'NEW PACT 2 SLATE MD WH',
    today: ['07:30', '08:30', '10:00', '10:30', '11:30', '12:00', '01:00']
  },
  { doctor: 'NEW PACT 2 STEEL MD WH', today: ['09:00', '10:00', '11:00'] },
  {
    doctor: 'NEW PACT 2 STEEL RESIDENT 1 WH',
    today: ['01:30', '02:00', '02:30', '3:00']
  },
  {
    doctor: 'NEW PACT 2 STEEL RESIDENT 2 WH',
    today: ['01:30', '02:00', '02:30', '3:00']
  },
  {
    doctor: 'NEW PACT 2 STEEL RESIDENT 3 WH',
    today: ['01:30', '02:00', '02:30', '3:00']
  },
  {
    doctor: 'NEW PACT 2.NAVY MD WH',
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
    let { today, doctor } = appt
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
    currentRoom.doctors.push(doctor)
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
      doctors: [],
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
  'RED',
  'ORANGE',
  'YELLOW',
  'GREEN',
  'BLUE',
  'INDIGO',
  'VIOLET',
  'WHITE'
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
  '01:00',
  '01:30',
  '02:00',
  '02:30',
  '03:00',
  '03:30'
]
