import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NotFoundPage from './NotFoundPage'

describe('EventPage', () => {
  it('should able to display the page', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['events/1']}>
        <NotFoundPage />
      </MemoryRouter>,
    )
    const test = getByTestId('not-found-page')

    expect(test).toBeInTheDocument()
  })
})
