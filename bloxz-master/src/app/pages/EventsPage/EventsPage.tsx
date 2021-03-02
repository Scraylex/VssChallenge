import React from 'react'
import { IonIcon, IonFabButton, IonFab } from '@ionic/react'
import { addOutline } from 'ionicons/icons'

import Page from 'app/pages/Page'
import EventList from 'app/modules/EventList'
import routes from 'router/constants'

const EventsPage: React.FC = () => (
  <Page title="Events" dataTestId="events-page">
    <EventList />

    <IonFab vertical="bottom" horizontal="end" slot="fixed">
      <IonFabButton routerLink={routes.EVENT_ADD}>
        <IonIcon icon={addOutline} />
      </IonFabButton>
    </IonFab>
  </Page>
)

export default EventsPage
