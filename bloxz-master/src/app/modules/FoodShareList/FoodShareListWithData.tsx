import React from 'react'

import { useQuery } from 'react-fetching-library'
import { FoodShare } from 'shared/api/types'
import dateFormatter from 'shared/utils/dateFormatter'
import FoodShareList from './FoodShareList'

export const FoodShareListWithData = () => {
  const { loading, payload, error } = useQuery<FoodShare[]>({
    method: 'GET',
    endpoint: '/foodshares',
    responseType: 'json',
    headers: {'Authorization': `Bearer ${localStorage.getItem('token')?.slice(1, -1)}`}

  })

  if (loading) {
    return <div>Loading</div>
  }

  if (error) {
    return <h1>Error happended</h1>
  }

  const formattedPayload = payload?.map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (item: any): FoodShare => ({
      id: item.id,
      title: item.title,
      description: item.description,
      pickupPlace: item.pickupPlace,
      pickupStart: new Date(item.pickupStart),
      pickupEnd: new Date(item.pickupEnd),
      formattedPickupStart: dateFormatter(new Date(item.pickupStart)),
      formattedPickupEnd: dateFormatter(new Date(item.pickupEnd)),
      isReserved: item.isReserved,
      sharedById: item.sharedById,
      sharedBy: item.sharedBy,
      reservedById: item.reservedById,
      reservedBy: item.reservedBy,
      photo: item.photo,
    }),
  )

  return <FoodShareList foodShareArray={formattedPayload ?? []} />
}

export default FoodShareListWithData
