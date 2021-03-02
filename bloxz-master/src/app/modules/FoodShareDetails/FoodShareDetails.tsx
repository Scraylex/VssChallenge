import { IonCol, IonFab, IonGrid, IonIcon, IonRow, IonFabButton } from '@ionic/react'
import { locationOutline, personOutline, timeOutline, pencilOutline } from 'ionicons/icons'
import React from 'react'

import routes from 'router/constants'
import { FoodShare } from 'shared/api/types'
import FoodReserve from 'app/components/FoodShareReserve'
import './style.css'

type FoodshareDetailProps = {
  foodshare: FoodShare
}

const FoodShareDetails = ({ foodshare }: FoodshareDetailProps) => (
  <>
    <article data-testid="foodshare-details">
      <img className="foodShare__picture" src={foodshare.photo} alt="Placeholder" />

      <IonGrid>
        {/* Title */}
        <IonRow>
          <IonCol>
            <h1 className="title" data-testid="foodshare-title">
              {foodshare.title}
            </h1>
          </IonCol>
        </IonRow>

        {/* Pickup */}
        <IonRow>
          <IonCol size="auto">
            <IonIcon icon={timeOutline} />
          </IonCol>
          <IonCol>
            {foodshare.formattedPickupStart.hours}:{foodshare.formattedPickupStart.minutes}
            &nbsp;–&nbsp;
            {foodshare.formattedPickupEnd.hours}:{foodshare.formattedPickupEnd.minutes}
          </IonCol>
        </IonRow>

        {/* Location */}
        <IonRow>
          <IonCol size="auto">
            <IonIcon icon={locationOutline} />
          </IonCol>
          <IonCol data-testid="foodshare-location">{foodshare.pickupPlace}</IonCol>
        </IonRow>

        {/* SharedBy */}
        <IonRow>
          <IonCol size="auto">
            <IonIcon icon={personOutline} />
          </IonCol>
          <IonCol data-testid="foodshare-sharedby">
            {foodshare.sharedBy.firstName}&nbsp;{foodshare.sharedBy.lastName}
          </IonCol>
        </IonRow>

        {/* Description */}
        <IonRow>
          <IonCol data-testid="foodshare-description">
            <p>{foodshare.description}</p>
          </IonCol>
        </IonRow>

        {/* Reservieren */}
        <IonRow>
          <FoodReserve props={foodshare} />
        </IonRow>
      </IonGrid>
    </article>

    <IonFab vertical="bottom" horizontal="end" slot="fixed">
      <IonFabButton routerLink={`${routes.FOODSHARE}/${foodshare.id}/edit`}>
        <IonIcon icon={pencilOutline} />
      </IonFabButton>
    </IonFab>
  </>
)

export default FoodShareDetails
