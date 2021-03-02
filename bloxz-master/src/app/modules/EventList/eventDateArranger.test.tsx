import dateFormatter from 'shared/utils/dateFormatter'
import { Event } from 'shared/api/types'
import eventDateArranger from './eventDateArranger'

const events = [
  {
    id: 1,
    title: 'Quarantaene',
    description: 'Daheimbleiben',
    location: 'localhost',
    start: '2020-03-25T00:00:00',
    organiserId: 1,
  },
  {
    id: 2,
    title: 'Quarantaene',
    description: 'Daheimbleiben',
    location: 'localhost',
    start: '2020-03-25T00:00:00',
    organiserId: 1,
  },
  {
    id: 3,
    title: 'Quarantaene',
    description: 'Daheimbleiben',
    location: 'localhost',
    start: '2020-03-21T00:00:00',
    organiserId: 1,
  },
  {
    id: 4,
    title: 'Quarantaene',
    description: 'Daheimbleiben',
    location: 'localhost',
    start: '2020-03-25T00:00:00',
    organiserId: 1,
  },
  {
    id: 5,
    title: 'Quarantaene',
    description: 'Daheimbleiben',
    location: 'localhost',
    start: '2020-03-27T00:00:00',
    organiserId: 1,
  },
  {
    id: 6,
    title: 'Quarantaene',
    description: 'Daheimbleiben',
    location: 'localhost',
    start: '2020-03-27T00:00:00',
    organiserId: 1,
  },
  {
    id: 7,
    title: 'Quarantaene',
    description: 'Daheimbleiben',
    location: 'localhost',
    start: '2020-03-27T00:00:00',
    organiserId: 1,
  },
  {
    id: 8,
    title: 'Quarantaene',
    description: 'Daheimbleiben',
    location: 'localhost',
    start: '2020-03-27T00:00:00',
    organiserId: 1,
  },
  {
    id: 9,
    title: 'Quarantaene',
    description: 'Daheimbleiben',
    location: 'localhost',
    start: '2020-03-21T00:00:00',
    organiserId: 1,
  },
  {
    id: 10,
    title: 'Quarantaene',
    description: 'Daheimbleiben',
    location: 'localhost',
    start: '2020-03-31T00:00:00',
    organiserId: 1,
  },
]

describe('eventDateFormatter', () => {
  it('should able create objects with date and corresponding events, in ascending order sorted by date', () => {
    const formattedPayload = events.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (item: any): Event => ({
        id: item.id,
        title: item.title,
        description: item.description,
        location: item.location,
        start: new Date(item.start),
        formattedDate: dateFormatter(new Date(item.start)),
        organiser: item.organiser,
        organiserId: item.organiserId,
      }),
    )

    const formattedEvents = eventDateArranger(formattedPayload)

    expect(formattedEvents.length).toBe(4)
    expect(formattedEvents[0].date).toEqual(new Date('2020-03-21T00:00:00'))
    expect(formattedEvents[1].date).toEqual(new Date('2020-03-25T00:00:00'))
    expect(formattedEvents[2].date).toEqual(new Date('2020-03-27T00:00:00'))
    expect(formattedEvents[3].date).toEqual(new Date('2020-03-31T00:00:00'))
    expect(formattedEvents[0].eventsArray.length).toBe(2)
    expect(formattedEvents[1].eventsArray.length).toBe(3)
    expect(formattedEvents[2].eventsArray.length).toBe(4)
    expect(formattedEvents[3].eventsArray.length).toBe(1)
  })
})
