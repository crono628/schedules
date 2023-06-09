const initialState = {
  data: [],
  rooms: 1,
  algo: 1,
  daily: [],
  edit: null,
  teams: [],
  firm: '',
  show: false
}

function stateReducer(state, { type, payload }) {
  switch (type) {
    case 'update': {
      return { ...state, ...payload }
    }
    case 'clear': {
      return { ...initialState }
    }
    default:
      throw new Error(`Unhandled action type: ${type}`)
  }
}

export { initialState, stateReducer }
