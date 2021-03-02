import React from 'react'
import moment from 'moment'

import EventAdd from 'app/modules/EventAdd'
import Page from 'app/pages/Page'

const EventsAddPage: React.FC = () => (
  <Page title="Event erstellen" dataTestId="event-add-page">
    <EventAdd
      defaultValues={{
        title: '',
        location: '',
        start: moment().toISOString(),
        description: '',
        organiserId: 0,
      }}
    />
  </Page>
)

export default EventsAddPage
