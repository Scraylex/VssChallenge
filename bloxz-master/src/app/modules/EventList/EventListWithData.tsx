import React from 'react'
import { useQuery } from 'react-fetching-library'
import { Event } from 'shared/api/types'
import dateFormatter from 'shared/utils/dateFormatter'
import EventList from './EventList'
import eventDateArranger from './eventDateArranger'


export const EventListWithData = () => {
  const { loading, payload, error } = useQuery<Event[]>({
    method: 'GET',
    endpoint: '/events',
    responseType: 'json',
    headers: {'Authorization': `Bearer ${localStorage.getItem('token')?.slice(1, -1)}`}
  })

  if (loading) {
    return <div>Loading</div>
  }

  if (error) {
    return <div>Error happened</div>
  }

  const formattedPayload = payload?.map((item: Event) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    location: item.location,
    start: new Date(item.start),
    formattedDate: dateFormatter(new Date(item.start)),
    organiser: item.organiser,
    organiserId: item.organiserId,
  }))

  const arrangedEvents = eventDateArranger(formattedPayload ?? [])

  return <EventList eventsWithDateArray={arrangedEvents} />
}

export default EventListWithData
