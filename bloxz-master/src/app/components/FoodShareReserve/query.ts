import { Action } from 'react-fetching-library'
import { FoodShareReserveProps } from './types'

const reserveFoodAction = ({
  reservationProps: { id, title, description, pickupPlace, pickupStart, pickupEnd, sharedById, reservedById },
}: FoodShareReserveProps): Action => ({
  method: 'PUT',
  endpoint: `/foodshares/${id}`,
  body: { id, title, description, pickupPlace, pickupStart, pickupEnd, sharedById, reservedById },
  headers: {'Authorization': `Bearer ${localStorage.getItem('token')?.slice(1, -1)}`}
})

export default reserveFoodAction
