import React from 'react'
import { useQuery } from 'react-fetching-library'
import { useParams } from 'react-router-dom'
import dateFormatter from 'shared/utils/dateFormatter'
import { Event } from 'shared/api/types'
import EventDetails from './EventDetails'

const EventDetailsWithData = () => {
  const { id } = useParams()
  const { loading, payload, error } = useQuery<Event>({
    method: 'GET',
    endpoint: `/events/${id}`,
    responseType: 'json',
    headers: {'Authorization': `Bearer ${localStorage.getItem('token')?.slice(1, -1)}`}

  })

  if (loading) {
    return <div>Loading</div>
  }

  if (error || payload === undefined) {
    return <h1 data-testid="error">Error happended</h1>
  }

  const eventLoaded: Event = {
    id: payload.id,
    title: payload.title,
    description: payload.description,
    location: payload.location,
    start: payload.start,
    formattedDate: dateFormatter(new Date(payload.start)),
    organiser: {
      id: payload.organiser.id,
      firstName: payload.organiser.firstName,
      lastName: payload.organiser.lastName,
      email: payload.organiser.email,
    },
    organiserId: payload.organiserId,
  }

  return <EventDetails event={eventLoaded} />
}

export default EventDetailsWithData
