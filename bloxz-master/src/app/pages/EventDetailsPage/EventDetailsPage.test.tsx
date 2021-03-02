import React from 'react'
import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { ClientContextProvider, createClient } from 'react-fetching-library'
import EventDetailsPage from './EventDetailsPage'

describe('EventPage', () => {
  it('should able to display the page', () => {
    const history = createMemoryHistory({})
    const { getByTestId } = render(
      <Router history={history}>
        <ClientContextProvider client={createClient({})}>
          <EventDetailsPage />
        </ClientContextProvider>
      </Router>,
    )

    expect(getByTestId('event-details-page')).toBeInTheDocument()
  })
})
