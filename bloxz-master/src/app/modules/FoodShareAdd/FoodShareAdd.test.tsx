import React from 'react'
import fetchMock from 'fetch-mock'
import { render, fireEvent, wait } from '@testing-library/react'
import { ClientContextProvider, createClient } from 'react-fetching-library'

import { Router, MemoryRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import routes from 'router/constants'
import FoodShareAdd from './FoodShareAdd'

describe('FoodShareAdd', () => {
  it('should able to successfully submit the form', async () => {
    fetchMock.postOnce('*', {
      body: {
        title: '',
        description: '',
        pickupPlace: '',
        pickupStart: new Date().toLocaleString(),
        pickupEnd: new Date().toLocaleString(),
        photo: '',
      },
    })
    const history = createMemoryHistory({ initialEntries: [routes.FOODSHARE_ADD] })
    const { getByTestId } = render(
      <Router history={history}>
        <ClientContextProvider client={createClient({})}>
          <FoodShareAdd
            defaultValues={{
              title: 'TestEssen',
              description: 'It is a simple dummy text of the printing and typesetting industry.',
              pickupPlace: 'My house',
              pickupStart: new Date().toLocaleString(),
              pickupEnd: new Date().toLocaleString(),
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
          <FoodShareAdd
            defaultValues={{
              title: '',
              description: '',
              pickupPlace: '',
              pickupStart: new Date().toLocaleString(),
              pickupEnd: new Date().toLocaleString(),
              photo: '',
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
          <FoodShareAdd
            defaultValues={{
              title: 'test',
              description: 'test',
              pickupPlace: 'test',
              pickupStart: new Date().toLocaleString(),
              pickupEnd: new Date().toLocaleString(),
              photo: 'asdfasdf',
            }}
          />
        </ClientContextProvider>
      </MemoryRouter>,
    )

    fireEvent.click(getByTestId('foodShare-form__submit'))

    await wait()

    expect(getByTestId('foodShare-add-form__error')).toBeInTheDocument()
  })
})
