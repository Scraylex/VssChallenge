import React from 'react'
import { render } from '@testing-library/react'
import dateformatter from 'shared/utils/dateFormatter'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { FoodShare } from 'shared/api/types'
import FoodShareCard from './FoodShareCard'

const pickupStartDate = new Date('2020-12-23T20:00:00')
const pickupEndDate = new Date('2020-12-24T20:00:00')

const foodMock: FoodShare = {
  id: 1,
  title: 'fantastic food',
  description: 'Bei diesem Essen denkst du an Gott',
  pickupPlace: 'Meine Küche',
  pickupStart: pickupStartDate,
  pickupEnd: pickupEndDate,
  formattedPickupStart: dateformatter(pickupStartDate),
  formattedPickupEnd: dateformatter(pickupEndDate),
  isReserved: false,
  sharedById: 1,
  sharedBy: { id: 1, firstName: 'Emil', lastName: 'PartyHard', email: 'emil.partyhard@gmail.com' },
  reservedById: undefined,
  reservedBy: null,
  photo: '',
}

describe('FoodShareCard', () => {
  it('should able to display an FoodShare card', () => {
    const history = createMemoryHistory({})
    const { getByTestId } = render(
      <Router history={history}>
        <FoodShareCard props={foodMock} />
      </Router>,
    )

    const foodShare = getByTestId('foodShare__card')

    expect(foodShare).toBeInTheDocument()
    const reserveButton = getByTestId('foodShare__reserve')

    expect(foodShare).toBeInTheDocument()
    expect(reserveButton.hasAttribute('enabled'))
    reserveButton.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(reserveButton.hasAttribute('disabled'))
  })
})
