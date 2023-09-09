const initialState = {
  data: [],
  rooms: 1,
  algo: 1,
  daily: [],
  edit: null,
  teams: [],
  firm: '',
  firms: [],
  show: false,
  campus: '',
  selectedTimes: [],
  selectedTeam: '',
  selectedResident: false,
  selectedResidentNumber: '',
  busyTimes: 3,
  extraSelection: '',
  manualSelection: false,
  manualDaily: [],
  isOpenAll: false
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
