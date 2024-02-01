import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Accordion from './Accordion'

describe('Accordion', () => {
  it('renders the Accordion component', () => {
    render(<Accordion />)
  })
})

describe('Accordion', () => {
  it('displays the title prop', () => {
    const title = 'Test Title'
    render(<Accordion title={title} />)
    const titleElement = screen.getByText(title)
    expect(titleElement).toBeInTheDocument()
  })

  // it('displays the children when clicked', () => {
  //   const children = 'Test Children'
  //   render(<Accordion title="Test Title">{children}</Accordion>)
  //   const accordionElement = screen.getByTestId('accordion')
  //   fireEvent.click(accordionElement)
  //   const childrenElement = screen.getByText(children)
  //   expect(childrenElement).toBeInTheDocument()
  // })
})
