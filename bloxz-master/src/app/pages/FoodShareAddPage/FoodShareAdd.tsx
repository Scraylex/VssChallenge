import React from 'react'
import moment from 'moment'

import Page from 'app/pages/Page'
import FoodShareAdd from 'app/modules/FoodShareAdd'

const FoodShareAddPage = () => {
  return (
    <Page title="Foodshare erstellen" dataTestId="food-share-add-page">
      <FoodShareAdd
        defaultValues={{
          title: '',
          description: '',
          pickupPlace: '',
          pickupStart: moment().toISOString(),
          pickupEnd: moment().toISOString(),
          photo: '',
        }}
      />
    </Page>
  )
}

export default FoodShareAddPage
