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
  for (const appt of sortedAppointments) {
    let destArray = 1
    if (destArray > offices) {
      destArray = 1
    }
    let temp
  }
  return { appointments: sortedAppointments, rooms: rooms }
}

function createRooms(num) {
  const arr = []
  for (let i = 1; i <= num; i++) {
    arr.push({ room: `${i}`, appts: [], doctors: [] })
  }
  return arr
}

function sortIt(arr) {
  return arr.slice().sort((a, b) => b.today.length - a.today.length)
}

const schedule = createSchedule(data, 3)
// console.log(schedule);
//console.log(schedule.rooms)
