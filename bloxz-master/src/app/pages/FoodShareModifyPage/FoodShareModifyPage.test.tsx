import * as React from 'react'
import { render, wait } from '@testing-library/react'
import { ClientContextProvider, createClient } from 'react-fetching-library'
import fetchMock from 'fetch-mock'
import { MemoryRouter } from 'react-router-dom'
import FoodShareModifyPage from '.'

describe('Modify FoodShare Page', () => {
  it('should display page', async () => {
    fetchMock.getOnce('*', {
      body: [
        {
          id: 0,
          title: '',
          description: '',
          pickupPlace: '',
          pickupStart: new Date().toLocaleString(),
          pickupEnd: new Date().toLocaleString(),
          isReserved: false,
          photo: '',
        },
      ],
    })
    const { getByTestId } = render(
      <ClientContextProvider client={createClient()}>
        <MemoryRouter initialEntries={['foodShare/1']}>
          <FoodShareModifyPage />
        </MemoryRouter>
      </ClientContextProvider>,
    )
    await wait()
    const test = getByTestId('foodShare-modify-page')

    expect(test).toBeInTheDocument()
  })
})

describe('Empty FoodShare', () => {
  it('should error', async () => {
    const { getByTestId } = render(
      <ClientContextProvider client={createClient()}>
        <MemoryRouter initialEntries={['foodshare/2']}>
          <FoodShareModifyPage />
        </MemoryRouter>
      </ClientContextProvider>,
    )
    await wait()

    const emptyList = getByTestId('foodShare-modify-page__error')

    expect(emptyList).toBeInTheDocument()
  })
})
