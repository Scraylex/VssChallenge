import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react'
import React from 'react'

import routes from '../../../router/constants'
import { Event } from '../../../shared/api/types'
import './event-card.css'

type EventCardProps = {
  event: Event
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  function getFormattedTime(date: Date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <IonCard routerLink={`${routes.EVENTS}/${event.id}`} data-testid="event-card">
      <div className="flex-container">
        <div className="icon flex-container">
          <p className="flex-item">
            <span role="img" aria-label="Party">
              🎉
            </span>
          </p>
        </div>

        <div className="flex-item">
          <IonCardHeader>
            <IonCardSubtitle>
              {`am ${event.start.toLocaleDateString()} ab ${getFormattedTime(event.start)} Uhr`}
            </IonCardSubtitle>
            <IonCardTitle>{event.title}</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            Location:
            {event.location}
          </IonCardContent>
        </div>
      </div>
    </IonCard>
  )
}

export default EventCard
