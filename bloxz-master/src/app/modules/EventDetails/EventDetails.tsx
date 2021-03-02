import React from 'react'
import { useParams } from 'react-router-dom'
import { IonCol, IonFab, IonFabButton, IonGrid, IonIcon, IonRow } from '@ionic/react'
import { calendarOutline, locationOutline, pencilOutline, personOutline } from 'ionicons/icons'

import routes from 'router/constants'
import { Event } from 'shared/api/types'

type EventDetailProps = {
  event: Event
}

const EventDetails: React.FC<EventDetailProps> = ({ event }) => {
  const { id } = useParams()

  return (
    <>
      <article data-testid="event-details">
        <IonGrid>
          {/* Title */}
          <IonRow>
            <IonCol>
              <h1 className="title" data-testid="event-title">
                {event.title}
              </h1>
            </IonCol>
          </IonRow>

          {/* Start */}
          <IonRow>
            <IonCol size="auto">
              <IonIcon icon={calendarOutline} />
            </IonCol>
            <IonCol>
              {event.formattedDate.dayOfWeek}, {event.formattedDate.day}.{event.formattedDate.month}. &nbsp;•&nbsp;
              {event.formattedDate.hours}:{event.formattedDate.minutes} Uhr
            </IonCol>
          </IonRow>

          {/* Location */}
          <IonRow>
            <IonCol size="auto">
              <IonIcon icon={locationOutline} />
            </IonCol>
            <IonCol data-testid="event-location">{event.location}</IonCol>
          </IonRow>

          {/* Organiser */}
          <IonRow>
            <IonCol size="auto">
              <IonIcon icon={personOutline} />
            </IonCol>
            <IonCol>
              {event.organiser.firstName}
              &nbsp;
              {event.organiser.lastName}
            </IonCol>
          </IonRow>

          {/* Description */}
          <IonRow>
            <IonCol data-testid="event-description">
              <p>{event.description}</p>
            </IonCol>
          </IonRow>
        </IonGrid>
      </article>

      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton routerLink={`${routes.EVENTS}/${id}/edit`}>
          <IonIcon icon={pencilOutline} />
        </IonFabButton>
      </IonFab>
    </>
  )
}

export default EventDetails
