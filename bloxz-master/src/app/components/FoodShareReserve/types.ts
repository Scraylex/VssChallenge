import { FoodShare } from 'shared/api/types'

export type FoodShareProps = {
  props: FoodShare
}

export type FoodShareReserveProps = {
  reservationProps: {
    id: number
    title: string
    description: string
    pickupPlace: string
    pickupStart: Date
    pickupEnd: Date
    sharedById: number
    reservedById: number | undefined
    photo: string
  }
}
