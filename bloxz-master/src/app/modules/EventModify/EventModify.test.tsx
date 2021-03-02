import React from 'react'
import fetchMock from 'fetch-mock'
import { render, fireEvent, wait } from '@testing-library/react'
import { ClientContextProvider, createClient } from 'react-fetching-library'
import { Router, MemoryRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import routes from 'router/constants'
import EventModify from './EventModify'

describe('Event Modify', () => {
  it('should able to successfully submit the form', async () => {
    fetchMock.putOnce('*', {
      body: {
        id: 1,
        title: 'Abhaengen in WG',
        description: 'Beeriocart bis zum Abwinken',
        location: '2.01 101',
        start: '2020-03-21T00:00:00',
      },
    })
    const history = createMemoryHistory({ initialEntries: [routes.EVENT_EDIT] })
    const { getByTestId } = render(
      <Router history={history}>
        <ClientContextProvider client={createClient({})}>
          <EventModify
            defaultValues={{
              title: 'Stylin with the Brothers',
              start: new Date().toLocaleString(),
              location: 'Kurz vor Unsichtbar',
              description: 'Party all night',
              organiserId: 1,
            }}
          />
        </ClientContextProvider>
      </Router>,
    )
    fireEvent.click(getByTestId('event-form__submit'))

    await wait()

    expect(history.location.pathname).toBe(routes.EVENTS)
  })

  it('should display error on input fields', async () => {
    const { getByTestId, getAllByTestId } = render(
      <MemoryRouter>
        <ClientContextProvider client={createClient({})}>
          <EventModify
            defaultValues={{
              title: '',
              description: '',
              start: new Date(2020, 5, 1).toLocaleString(),
              location: '',
              organiserId: 1,
            }}
          />
        </ClientContextProvider>
      </MemoryRouter>,
    )

    fireEvent.click(getByTestId('event-form__submit'))

    await wait()

    expect(getAllByTestId('form-control__error').length).toBe(4)
  })

  it('should display unexpected error ', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <ClientContextProvider client={createClient({})}>
          <EventModify
            defaultValues={{
              title: 'Stylin with the Brothers',
              start: new Date().toLocaleString(),
              location: 'Kurz vor Unsichtbar',
              description: 'Party all night',
              organiserId: 1,
            }}
          />
        </ClientContextProvider>
      </MemoryRouter>,
    )

    fireEvent.click(getByTestId('event-form__submit'))

    await wait()

    expect(getByTestId('event-modify-form__error')).toBeInTheDocument()
  })
})
