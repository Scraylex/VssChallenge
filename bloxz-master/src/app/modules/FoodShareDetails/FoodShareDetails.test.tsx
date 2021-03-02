import React from 'react'
import { render, wait } from '@testing-library/react'
import fetchMock from 'fetch-mock'
import { createMemoryHistory } from 'history'
import { ClientContextProvider, createClient } from 'react-fetching-library'
import { Router } from 'react-router-dom'
import dateFormatter from 'shared/utils/dateFormatter'
import FoodShareDetailsWithData from './FoodShareDetailsWithData'
import FoodShareDetail from './FoodShareDetails'

const mockFoodShare = {
  id: 1,
  title: 'Kalte Pasta',
  description: 'Frisch gekocht',
  pickupPlace: '2.01 101',
  pickupStart: new Date('2020-03-21T18:00:00'),
  pickupEnd: new Date('2020-03-21T19:00:00'),
  formattedPickupStart: dateFormatter(new Date('2020-03-21T18:00:00')),
  formattedPickupEnd: dateFormatter(new Date('2020-03-21T19:00:00')),
  organiser: { id: 1, firstName: 'Emil', lastName: 'Hunger', email: 'emil@hunger.com' },
  isReserved: false,
  photo: '',
  sharedById: 1,
  sharedBy: { id: 1, firstName: 'Emil', lastName: 'PartyHard', email: 'emil.partyhard@gmail.com' },
  reservedById: undefined,
  reservedBy: null,
}

fetchMock.getOnce('*', {
  body: mockFoodShare,
})

describe('FoodShareDetails', () => {
  it('should able to render', async () => {
    const history = createMemoryHistory({})

    const { getByTestId } = render(
      <Router history={history}>
        <ClientContextProvider client={createClient({})}>
          <FoodShareDetail foodshare={mockFoodShare} />
        </ClientContextProvider>
      </Router>,
    )

    expect(getByTestId('foodshare-details')).toBeInTheDocument()
  })

  it('should able to retrieve the details for one shared Food', async () => {
    const { getByTestId } = render(
      <Router history={createMemoryHistory({})}>
        <ClientContextProvider client={createClient({})}>
          <FoodShareDetailsWithData />
        </ClientContextProvider>
      </Router>,
    )
    await wait()

    expect(getByTestId('foodshare-details')).toBeInTheDocument()
  })
})
