import React from 'react'
import { IonContent } from '@ionic/react'
import FoodShareCard from 'app/components/FoodShareCard'
import { FoodShare } from 'shared/api/types'
import NothingHere from 'app/components/NothingHere'
import routes from 'router/constants'
import { FoodShareListProps } from './types'

const FoodShareList = ({ foodShareArray }: FoodShareListProps) => {
  if (foodShareArray.length !== 0) {
    const foodShareArrayDateSorted = foodShareArray.sort((a, b) => a.pickupStart.getTime() - b.pickupStart.getTime())
    return (
      <IonContent data-testid="FoodShare__List">
        {foodShareArrayDateSorted.map((item: FoodShare) => {
          return <FoodShareCard key={item.id} props={item} />
        })}
      </IonContent>
    )
  }

  return <NothingHere message="food" createRoute={routes.FOODSHARE_ADD} />
}

export default FoodShareList
