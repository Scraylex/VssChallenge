import React from 'react'

import Page from 'app/pages/Page'
import EventDetails from 'app/modules/EventDetails'

const EventDetailsPage: React.FC = () => (
  <Page title="Eventdetails" dataTestId="event-details-page">
    <EventDetails />
  </Page>
)

export default EventDetailsPage
