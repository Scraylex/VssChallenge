import React from 'react'
import { useQuery } from 'react-fetching-library'
import { useParams } from 'react-router-dom'
import EventModify from 'app/modules/EventModify'
import { Event } from 'shared/api/types'
import { DefaultValues } from './types'
import Page from '../Page'

const EventModifyPage: React.FC = () => {
  const { id } = useParams()
  const { loading, error, payload } = useQuery<Event>({
    method: 'GET',
    endpoint: `/events/${id}`,
    responseType: 'json',
  })
  if (loading) {
    return <div>Loading</div>
  }

  if (error) {
    return (
      <div data-testid="event-modify-page__error">
        <h1>Error happended</h1>
      </div>
    )
  }

  const formatedPayload: DefaultValues = {
    title: payload?.title ?? '',
    start: payload?.start?.toString() ?? '',
    location: payload?.location ?? '',
    description: payload?.description ?? '',
    organiserId: payload?.organiserId ?? 0,
  }

  return (
    <Page title="Event bearbeiten" dataTestId="event-modify-page">
      <EventModify defaultValues={formatedPayload} />
    </Page>
  )
}

export default EventModifyPage
