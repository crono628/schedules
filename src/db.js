import Dexie from 'dexie'

const db = new Dexie('MyDatabase')
db.version(1).stores({
  saves: 'id++, state'
})

export default db
