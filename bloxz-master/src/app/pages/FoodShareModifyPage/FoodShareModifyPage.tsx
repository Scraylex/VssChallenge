import React from 'react'
import { IonButton } from '@ionic/react'
import { useQuery } from 'react-fetching-library'
import { useParams } from 'react-router-dom'
import FoodShareModify from 'app/modules/FoodShareModify'
import { FoodShare } from 'shared/api/types'
import routes from 'router/constants'
import Page from '../Page'
import { DefaultValues } from './types'

const FoodShareModifyPage = () => {
  const { id } = useParams()
  const { loading, error, payload } = useQuery<FoodShare>({
    method: 'GET',
    endpoint: `/foodshares/${id}`,
    responseType: 'json',
  })
  if (loading) {
    return <div>Loading</div>
  }

  if (error) {
    return (
      <div data-testid="foodShare-modify-page__error">
        <h1>Error happended</h1>
      </div>
    )
  }

  const foodShareLoaded: DefaultValues = {
    id: payload?.id ?? 0,
    title: payload?.title ?? '',
    description: payload?.description ?? '',
    pickupPlace: payload?.pickupPlace ?? '',
    pickupStart: payload?.pickupStart?.toString() ?? '',
    pickupEnd: payload?.pickupEnd?.toString() ?? '',
    isReserved: payload?.isReserved ?? false,
    reservedById: payload?.reservedById,
    photo: payload?.photo ?? '',
    sharedById: payload?.sharedById ?? 0,
  }

  return (
    <Page dataTestId="foodShare-modify-page">
      <IonButton href={routes.EVENTS}>Zurück</IonButton>
      <FoodShareModify defaultValues={foodShareLoaded} />
    </Page>
  )
}

export default FoodShareModifyPage
