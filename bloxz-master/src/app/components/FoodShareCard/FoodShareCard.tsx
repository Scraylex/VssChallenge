import React from 'react'
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem } from '@ionic/react'
import routes from 'router/constants'
import FoodShareReserve from '../FoodShareReserve'
import { FoodShareCardProps } from './types'

const FoodShareCard = ({ props }: FoodShareCardProps) => {
  const { id, title, pickupPlace, formattedPickupStart, formattedPickupEnd, photo } = props

  return (
    <IonCard data-testid="foodShare__card" routerLink={`${routes.FOODSHARE}/${id}`}>
      <img src={photo} alt="Food" />

      <IonCardHeader>
        <IonCardSubtitle>
          {`${formattedPickupStart.dayOfWeek}, ${formattedPickupStart.hours}:${formattedPickupStart.minutes}`}
          &nbsp;–&nbsp;
          {`${formattedPickupEnd.dayOfWeek}, ${formattedPickupEnd.hours}:${formattedPickupEnd.minutes}`}
        </IonCardSubtitle>
        <IonCardTitle>{title}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>{`Abholort: ${pickupPlace}`}</IonCardContent>

      <IonItem>
        <FoodShareReserve props={props} />
      </IonItem>
    </IonCard>
  )
}

export default FoodShareCard
