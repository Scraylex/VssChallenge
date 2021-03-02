import React from 'react'
import { Redirect } from 'react-router-dom'

import Page from 'app/pages/Page'
import routes from 'router/constants'

const NotFoundPage = () => (
  <Page dataTestId="not-found-page">
    Diese Seite konnte nicht gefunden werden ¯\_(ツ)_/¯
    <Redirect to={routes.PINBOARD} />
  </Page>
)

export default NotFoundPage
