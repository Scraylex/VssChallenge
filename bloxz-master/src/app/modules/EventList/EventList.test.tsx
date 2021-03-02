import React from 'react'
import { ClientContextProvider, createClient } from 'react-fetching-library'
import { render, wait } from '@testing-library/react'
import fetchMock from 'fetch-mock'

import EventListWithData from './EventListWithData'

fetchMock.mock('*', {
  body: [
    {
      id: 1,
      title: 'Abhaengen in WG',
      description: 'Beeriocart bis zum Abwinken',
      location: '2.01 101',
      start: '2020-03-21T00:00:00',
    },
    {
      id: 2,
      title: 'Mehr Abhaengen in WG',
      description: 'Kiffen bis der Arzt kommt',
      location: '2.01 101',
      start: '2020-03-21T00:00:00',
    },
    {
      id: 3,
      title: 'Quarantaene',
      description: 'Daheimbleiben',
      location: 'localhost',
      start: '2020-03-25T00:00:00',
    },
  ],
})

describe('EventList', () => {
  it('should render', async () => {
    const { getByTestId } = render(
      <ClientContextProvider client={createClient({})}>
        <EventListWithData />
      </ClientContextProvider>,
    )
    await wait()
    const eventLists = getByTestId('event-list')

    expect(eventLists).toBeInTheDocument()
  })
})
