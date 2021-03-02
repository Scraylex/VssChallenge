import { Event } from 'shared/api/types'

export type EventListWithDateProps = {
  date: Date
  formattedDate: { dayOfWeek: string; day: string; month: string; year: string; hours: string; minutes: string }
  eventsArray: Event[]
}
