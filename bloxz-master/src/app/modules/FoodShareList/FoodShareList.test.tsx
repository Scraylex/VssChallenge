import React from 'react'
import fetchMock from 'fetch-mock'
import { wait, render } from '@testing-library/react'
import { ClientContextProvider, createClient } from 'react-fetching-library'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import FoodShareListWithData from './FoodShareListWithData'

fetchMock.mock('*', {
  body: [
    {
      id: 1,
      title: 'Tolles Essen',
      description: 'Ganz ok, du wirst überleben',
      pickupPlace: 'Mein Kühlschrank',
      pickupStart: '2020-05-01T20:00:00',
      pickupEnd: '2020-05-02T20:00:00',
      isReserved: false,
      photo: '',
    },
    {
      id: 2,
      title: 'Besseres Essen',
      description: 'Du wirst 3 Tage länger Leben als der Durchschnitt',
      pickupPlace: 'Meine noch warme Herdplatte',
      pickupStart: '2020-05-02T20:00:00',
      pickupEnd: '2020-05-03T20:00:00',
      isReserved: false,
      photo: '',
    },
    {
      id: 3,
      title: 'Das beste Essen',
      description: '...',
      pickupPlace: 'Mein Esstisch',
      pickupStart: '2020-05-04T20:00:00',
      pickupEnd: '2020-05-05T20:00:00',
      isReserved: true,
      photo: '',
    },
  ],
})

describe('FoodShareList', () => {
  it('should able to render the FoodShareList', async () => {
    const history = createMemoryHistory({})
    const { getByTestId } = render(
      <Router history={history}>
        <ClientContextProvider client={createClient({})}>
          <FoodShareListWithData />
        </ClientContextProvider>
      </Router>,
    )
    await wait()
    const foodShare = getByTestId('FoodShare__List')
    expect(foodShare).toBeInTheDocument()
  })
})
