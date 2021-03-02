import React from 'react'
import { render } from '@testing-library/react'
import { ClientContextProvider, createClient } from 'react-fetching-library'
import EventsPage from './EventsPage'

describe('EventPage', () => {
  it('should able to display the page', () => {
    const { getByTestId } = render(
      <ClientContextProvider client={createClient({})}>
        <EventsPage />
      </ClientContextProvider>,
    )
    const test = getByTestId('events-page')

    expect(test).toBeInTheDocument()
  })
})
