import React from 'react'
import { render } from '@testing-library/react'
import dateformatter from 'shared/utils/dateFormatter'
import { Event } from 'shared/api/types'

import EventCard from './EventCard'

const eventMock: Event = {
  id: 1,
  title: 'title',
  description: 'bal basd',
  location: 'location',
  start: new Date(),
  formattedDate: dateformatter(new Date()),
  organiser: { id: 1, firstName: 'Emil', lastName: 'PartyHard', email: 'emil.partyhard@gmail.com' },
  organiserId: 1,
}

describe('EventCard', () => {
  it('should render', () => {
    const { getByTestId } = render(<EventCard event={eventMock} />)
    const eventCard = getByTestId('event-card')

    expect(eventCard).toBeInTheDocument()
  })
})
