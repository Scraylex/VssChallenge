import React from 'react'
import { fireEvent, render, wait } from '@testing-library/react'
import { ClientContextProvider, createClient } from 'react-fetching-library'
import { MemoryRouter } from 'react-router-dom'

import EventAddWithData from './EventAddWithData'

describe('EventAdd', () => {
  it('should display error on input fields', async () => {
    const { getByTestId, getAllByTestId } = render(
      <MemoryRouter>
        <ClientContextProvider client={createClient({})}>
          <EventAddWithData
            defaultValues={{
              title: '',
              description: '',
              start: new Date(2020, 5, 1).toLocaleString(),
              location: '',
              organiserId: 0,
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
          <EventAddWithData
            defaultValues={{
              title: 'Stylin with the Brothers',
              start: new Date().toLocaleString(),
              location: 'Kurz vor Unsichtbar',
              description: 'Party all night',
              organiserId: 0,
            }}
          />
        </ClientContextProvider>
      </MemoryRouter>,
    )

    fireEvent.click(getByTestId('event-form__submit'))

    await wait()

    expect(getByTestId('event-add-form__error')).toBeInTheDocument()
  })
})
