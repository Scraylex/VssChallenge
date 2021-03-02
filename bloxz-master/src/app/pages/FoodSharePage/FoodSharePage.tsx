import React from 'react'
import { IonFab, IonFabButton, IonIcon } from '@ionic/react'
import { addOutline } from 'ionicons/icons'

import FoodShareList from 'app/modules/FoodShareList'
import Page from 'app/pages/Page'
import routes from 'router/constants'

const FoodSharePage = () => (
  <Page title="Foodsharing" dataTestId="foodShare-page">
    <FoodShareList />

    <IonFab vertical="bottom" horizontal="end" slot="fixed">
      <IonFabButton routerLink={routes.FOODSHARE_ADD}>
        <IonIcon icon={addOutline} />
      </IonFabButton>
    </IonFab>
  </Page>
)

export default FoodSharePage
