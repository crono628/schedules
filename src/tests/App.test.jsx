import { render, screen } from '@testing-library/react'
import App from '../App'
import { AppWrapper } from '../components/AppContext/AppContext'

describe('App', () => {
  it('renders the App component', () => {
    render(
      <AppWrapper>
        <App />
      </AppWrapper>
    )
  })
})
