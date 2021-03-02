import { cleanup, render, wait } from '@testing-library/react'
import fetchMock from 'fetch-mock'
import { createMemoryHistory } from 'history'
import React from 'react'
import { ClientContextProvider, createClient } from 'react-fetching-library'
import { Router } from 'react-router-dom'

import EventDetailsWithData from './EventDetailsWithData'

fetchMock.getOnce('*', {
  body: {
    id: 1,
    title: 'Abhaengen in WG',
    description: 'Beeriocart bis zum Abwinken',
    location: '2.01 101',
    start: '2020-03-21T18:00:00',
    organiser: {
      id: 1,
      firstName: 'max',
      lastName: 'muster',
      email: 'max@test.com',
    },
  },
})

describe('EventDetails', () => {
  afterEach(cleanup)

  it('should contain the title, location and description', async () => {
    const { getByTestId } = render(
      <Router history={createMemoryHistory({})}>
        <ClientContextProvider client={createClient({})}>
          <EventDetailsWithData />
        </ClientContextProvider>
      </Router>,
    )
    await wait()

    expect(getByTestId('event-title')).toHaveTextContent('Abhaengen in WG')
    expect(getByTestId('event-location')).toHaveTextContent('2.01 101')
    expect(getByTestId('event-description')).toHaveTextContent('Beeriocart bis zum Abwinken')
  })

  it('should able to retrieve the a null object if there are no events', async () => {
    const history = createMemoryHistory({})
    const { getByTestId } = render(
      <Router history={history}>
        <ClientContextProvider client={createClient({})}>
          <EventDetailsWithData />
        </ClientContextProvider>
      </Router>,
    )

    await wait()

    expect(getByTestId('error')).toBeInTheDocument()
  })
})
