import { render, screen } from '@testing-library/react'
import App from '../App'
import { AppWrapper } from '../components/AppContext/AppContext'

describe('App', () => {
  it('renders headline', () => {
    render(
      <AppWrapper>
        <App />
      </AppWrapper>
    )
    const headline = screen.getByText(/PACTplanner/i)
    expect(headline).toBeInTheDocument()
  })
})
