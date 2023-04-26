const data = [
  {
    doctor: 'Dr red',
    today: ['08:00', '10:00', '11:00', '13:30', '14:00', '15:00']
  },
  {
    doctor: 'Dr orange',
    today: ['08:30', '10:30', '11:30', '13:00', '14:30', '15:00']
  },
  {
    doctor: 'Dr yellow',
    today: ['08:00', '08:30', '10:00', '11:00', '13:30', '14:00', '15:00']
  },
  {
    doctor: 'Dr green',
    today: ['08:30', '10:30', '11:30', '13:00', '14:30', '15:30']
  },
  {
    doctor: 'Dr blue',
    today: ['08:00', '10:00', '11:00', '13:30', '14:00', '15:00']
  },
  {
    doctor: 'Dr indigo',
    today: ['08:30', '10:30', '11:00', '11:30', '13:00', '14:30', '15:00']
  },
  {
    doctor: 'Dr violet',
    today: ['08:00', '10:00', '11:00', '13:30', '14:00', '15:00']
  },
  {
    doctor: 'Dr white',
    today: ['08:30', '13:00', '14:30', '15:00']
  }
]

function createSchedule(schedules, offices = 3) {
  let sortedAppointments = sortIt(schedules)
  let rooms = createRooms(offices)
  let destinationArray = Math.floor(Math.random() * offices) + 1
  // let destinationArray = 1
  for (const appt of sortedAppointments) {
    let { today, doctor } = appt
    if (destinationArray > offices) {
      destinationArray = 1
    }
    let currentRoom = rooms.find((obj) => obj.room === destinationArray)
    let { appts, doctors, totalAppts } = currentRoom
    appts.push(today)
    doctors.push(doctor)
    currentRoom.totalAppts = totalAppts += today.length
    destinationArray++
  }

  for (let i = 0; i < offices; i++) {
    rooms[i].duplicates = findDuplicates(rooms[i].appts)
  }

  return { appointments: sortedAppointments, rooms: rooms }
}

function createRooms(num) {
  const arr = []
  for (let i = 1; i <= num; i++) {
    arr.push({ room: i, appts: [], doctors: [], totalAppts: 0, duplicates: [] })
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

const schedule = createSchedule(data, 2)
console.dir(schedule.rooms, { depth: null })
// console.log(schedule.rooms)
