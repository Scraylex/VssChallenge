import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import EventAddPage from '.'

describe('Event Add page', () => {
  it('should able to display the page', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <EventAddPage />
      </MemoryRouter>,
    )
    const test = getByTestId('event-add-page')

    expect(test).toBeInTheDocument()
  })
})
