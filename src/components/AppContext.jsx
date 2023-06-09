import {
  createContext,
  useState,
  useEffect,
  useContext,
  useReducer
} from 'react'

import { stateReducer, initialState } from '../reducer'

const AppContext = createContext()

export function AppWrapper({ children }) {
  const [state, dispatch] = useReducer(stateReducer, initialState)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('render')
    setLoading(false)
  }, [])

  const value = {
    state,
    dispatch,
    loading,
    setLoading
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  return useContext(AppContext)
}
