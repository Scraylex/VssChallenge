import React from 'react'

import Page from 'app/pages/Page'
import NothingHere from 'app/components/NothingHere'

const PinboardPage: React.FC = () => {
  return (
    <Page title="Pinwand" dataTestId="pinboard-page">
      <NothingHere message="pin" pluralize />
    </Page>
  )
}

export default PinboardPage
