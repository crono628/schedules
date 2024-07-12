import { render, fireEvent } from '@testing-library/react'
import App from '../App'
import { AppWrapper, useAppContext } from '../components/AppContext/AppContext'

// describe('App', () => {
//   it('renders the App component', () => {
//     render(
//       <AppWrapper>
//         <App />
//       </AppWrapper>
//     )
//   })
// })

describe('App state', () => {
  let state

  beforeEach(() => {
    function TestComponent() {
      state = useAppContext().state
      return null
    }

    const { getByText } = render(
      <AppWrapper>
        <App />
        <TestComponent />
      </AppWrapper>
    )

    // Find the test data button and click it
    const button = getByText('test data')
    fireEvent.click(button)
  })

  it('has a data property', () => {
    expect(state).toHaveProperty('data')
    expect(state.data).toHaveLength(9)
  })

  it('has a daily property', () => {
    expect(state).toHaveProperty('daily')
    expect(state.daily).toMatchObject({})

    it('has a rooms property', () => {
      expect(state).toHaveProperty('rooms')
      // expect(state.rooms).toBeUndefined()
    })

    it('has an algo property', () => {
      expect(state).toHaveProperty('algo')
      // expect(state.algo).toBeUndefined()
    })

    it('has a firm property', () => {
      expect(state).toHaveProperty('firm')
      // expect(state.firm).toBeUndefined()
    })

    it('has a show property', () => {
      expect(state).toHaveProperty('show')
      // expect(state.show).toBeUndefined()
    })

    it('has a busyTimes property', () => {
      expect(state).toHaveProperty('busyTimes')
      // expect(state.busyTimes).toBeUndefined()
    })

    it('has a campus property', () => {
      expect(state).toHaveProperty('campus')
      // expect(state.campus).toBeUndefined()
    })

    it('has a manualSelection property', () => {
      expect(state).toHaveProperty('manualSelection')
      // expect(state.manualSelection).toBeUndefined()
    })

    it('has an isOpenAll property', () => {
      expect(state).toHaveProperty('isOpenAll')
      // expect(state.isOpenAll).toBeUndefined()
    })

    it('has a testDataClicked property', () => {
      expect(state).toHaveProperty('testDataClicked')
      // expect(state.testDataClicked).toBeUndefined()
    })
  })
})
