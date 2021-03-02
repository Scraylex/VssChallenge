import React from 'react'
import fetchMock from 'fetch-mock'
import { render, fireEvent, wait } from '@testing-library/react'
import { ClientContextProvider, createClient } from 'react-fetching-library'

import { Router, MemoryRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import routes from 'router/constants'
import FoodShareModify from './FoodShareModify'

describe('FoodShareModify', () => {
  it('should able to successfully submit the form', async () => {
    fetchMock.putOnce('*', {
      body: {
        title: '',
        description: '',
        pickupPlace: '',
        pickupStart: new Date().toLocaleString(),
        pickupEnd: new Date().toLocaleString(),
        isReserved: false,
        photo: '',
      },
    })

    const history = createMemoryHistory({ initialEntries: [routes.FOODSHARE_EDIT] })
    const { getByTestId } = render(
      <Router history={history}>
        <ClientContextProvider client={createClient({})}>
          <FoodShareModify
            defaultValues={{
              title: 'TestEssen',
              description: 'It is a simple dummy text of the printing and typesetting industry.',
              pickupPlace: 'My house',
              pickupStart: new Date().toLocaleString(),
              pickupEnd: new Date().toLocaleString(),
              isReserved: false,
              sharedById: 1,
              id: 1,
              photo: 'asdf',
            }}
          />
        </ClientContextProvider>
      </Router>,
    )

    fireEvent.click(getByTestId('foodShare-form__submit'))

    await wait()

    expect(history.location.pathname).toBe(routes.FOODSHARE)
  })

  it('should display error on input fields', async () => {
    const { getByTestId, getAllByTestId } = render(
      <MemoryRouter>
        <ClientContextProvider client={createClient({})}>
          <FoodShareModify
            defaultValues={{
              title: '',
              sharedById: 1,
              id: 1,
              description: '',
              pickupPlace: '',
              pickupStart: new Date().toLocaleString(),
              pickupEnd: new Date().toLocaleString(),
              photo: '',
              isReserved: false,
            }}
          />
        </ClientContextProvider>
      </MemoryRouter>,
    )

    fireEvent.click(getByTestId('foodShare-form__submit'))

    await wait()

    expect(getAllByTestId('form-control__error').length).toBe(6)
  })

  it('should display unexpected error if mutation fails', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <ClientContextProvider client={createClient({})}>
          <FoodShareModify
            defaultValues={{
              title: 'test',
              sharedById: 1,
              id: 1,
              description: 'test',
              pickupPlace: 'test',
              pickupStart: new Date().toLocaleString(),
              pickupEnd: new Date().toLocaleString(),
              photo: 'asdfasdf',
              isReserved: false,
            }}
          />
        </ClientContextProvider>
      </MemoryRouter>,
    )

    fireEvent.click(getByTestId('foodShare-form__submit'))

    await wait()

    expect(getByTestId('foodShare-modify-form__error')).toBeInTheDocument()
  })
})
