import { createContext, useReducer } from 'react'

export const initialState = {
  data: [],
  rooms: 1,
  algo: 1,
  daily: [],
  edit: null,
  teams: [],
  firm: '',
  show: false
}

export function stateReducer(state, action) {
  switch (action.type) {
    case 'setData':
      return { ...state, data: action.payload }
    case 'setRooms':
      return { ...state, rooms: action.payload }
    case 'setAlgo':
      return { ...state, algo: action.payload }
    case 'setDaily':
      return { ...state, daily: action.payload }
    case 'setEdit':
      return { ...state, edit: action.payload }
    case 'setTeams':
      return { ...state, teams: action.payload }
    case 'setFirm':
      return { ...state, firm: action.payload }
    case 'setShow':
      return { ...state, show: action.payload }
    default:
      throw new Error('Unsupported action type: ', action.type)
  }
}
