import { IonButton } from '@ionic/react'
import React, { useState } from 'react'

import routes from '../../../router/constants'
import { Event } from '../../../shared/api/types'
import EventCard from '../../components/EventCard'
import NothingHere from '../../components/NothingHere'
import { EventListWithDateProps } from './types'

type EventListProps = {
  eventsWithDateArray: EventListWithDateProps[]
}

const EventList: React.FC<EventListProps> = ({ eventsWithDateArray }) => {
  const [eventContainer, setEventContainer] = useState(eventsWithDateArray[0])

  if (!eventsWithDateArray.length) {
    return <NothingHere message="event" pluralize createRoute={routes.EVENT_ADD} />
  }

  const dateButtons = eventsWithDateArray.map(entry => (
    <IonButton
      className="btn-nav"
      key={entry.date.getTime()}
      onClick={() => setEventContainer(entry)}
      data-testid="date-button"
    >
      {`${entry.formattedDate.dayOfWeek.substring(0, 2)}`}
      <br />
      {`${entry.formattedDate.day}.${entry.formattedDate.month}`}
    </IonButton>
  ))

  return (
    <div data-testid="event-list">
      {dateButtons}

      <div data-testid="eventCardContainer">
        <h2 data-testid="dateFilter" className="date-filter">
          {`${eventContainer.formattedDate.dayOfWeek}, ${eventContainer.formattedDate.day}.${eventContainer.formattedDate.month}.${eventContainer.formattedDate.year}`}
        </h2>
        {eventContainer.eventsArray.map((event: Event) => {
          return <EventCard key={event.id} event={event} />
        })}
      </div>
    </div>
  )
}

export default EventList
