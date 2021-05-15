import React from 'react'
import { useQuery } from 'react-fetching-library'
import { FoodShare } from 'shared/api/types'
import { useParams } from 'react-router-dom'
import dateFormatter from 'shared/utils/dateFormatter'
import FoodShareDetails from './FoodShareDetails'

const FoodShareDetailsWithData = () => {
  const { id } = useParams()
  const { loading, payload, error } = useQuery<FoodShare>({
    method: 'GET',
    endpoint: `/foodshares/${id}`,
    responseType: 'json',
    headers: {'Authorization': `Bearer ${localStorage.getItem('token')?.slice(1, -1)}`}

  })

  if (loading) {
    return <div>Loading</div>
  }

  if (error || payload === undefined) {
    return <h1 data-testid="error">Error happended</h1>
  }

  const foodShareLoaded: FoodShare = {
    id: payload.id,
    title: payload.title,
    description: payload.description,
    pickupPlace: payload.pickupPlace,
    pickupStart: payload.pickupStart,
    pickupEnd: payload.pickupEnd,
    isReserved: payload.isReserved,
    formattedPickupEnd: dateFormatter(new Date(payload.pickupEnd)),
    formattedPickupStart: dateFormatter(new Date(payload.pickupStart)),
    sharedById: payload.sharedById,
    sharedBy: payload.sharedBy,
    reservedById: payload.reservedById,
    reservedBy: payload.reservedBy,
    photo: payload.photo,
  }

  return <FoodShareDetails foodshare={foodShareLoaded} />
}

export default FoodShareDetailsWithData
