import * as React from 'react'
import { render, wait } from '@testing-library/react'
import { ClientContextProvider, createClient } from 'react-fetching-library'
import fetchMock from 'fetch-mock'
import { MemoryRouter } from 'react-router-dom'
import EventModifyPage from '.'

describe('Modify Event Page', () => {
  it('should display page', async () => {
    fetchMock.getOnce('*', {
      body: [
        {
          id: 1,
          title: 'Abhaengen in WG',
          description: 'Beeriocart bis zum Abwinken',
          location: '2.01 101',
          start: '2020-03-21T00:00:00',
        },
      ],
    })
    const { getByTestId } = render(
      <ClientContextProvider client={createClient()}>
        <MemoryRouter initialEntries={['events/1']}>
          <EventModifyPage />
        </MemoryRouter>
      </ClientContextProvider>,
    )
    await wait()
    const test = getByTestId('event-modify-page')

    expect(test).toBeInTheDocument()
  })
})

describe('Empty Events', () => {
  it('should error', async () => {
    const { getByTestId } = render(
      <ClientContextProvider client={createClient()}>
        <MemoryRouter initialEntries={['events/2']}>
          <EventModifyPage />
        </MemoryRouter>
      </ClientContextProvider>,
    )
    await wait()

    const emptyList = getByTestId('event-modify-page__error')

    expect(emptyList).toBeInTheDocument()
  })
})
