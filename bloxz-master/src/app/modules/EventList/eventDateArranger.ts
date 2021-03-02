import { Event } from 'shared/api/types'
import { EventListWithDateProps } from './types'

// returns events sorted accoring to their event dates, listed in arrays for each date

const eventDateArranger = (events: Event[]) => {
  const result = events.reduce((accumulator: EventListWithDateProps[], currentEvent: Event) => {
    const index = accumulator.findIndex(entry => {
      return (
        `${entry.formattedDate.day}.${entry.formattedDate.month}.${entry.formattedDate.year}` ===
        `${currentEvent.formattedDate.day}.${currentEvent.formattedDate.month}.${currentEvent.formattedDate.year}`
      )
    })
    if (index < 0) {
      const temp = accumulator.concat([
        { date: currentEvent.start, formattedDate: currentEvent.formattedDate, eventsArray: [currentEvent] },
      ])
      return temp
    }
    accumulator[index].eventsArray.push(currentEvent)
    return accumulator
  }, [])
  result.sort((a, b) => a.date.getTime() - b.date.getTime())
  return result
}

export default eventDateArranger
