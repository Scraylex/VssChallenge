export type User = {
  id: number
  email: string
  firstName: string
  lastName: string
}

export type Event = {
  id: number
  title: string
  description: string
  location: string
  start: Date
  formattedDate: { dayOfWeek: string; day: string; month: string; year: string; hours: string; minutes: string }
  organiser: User
  organiserId: number
}

export type FoodShare = {
  id: number
  title: string
  description: string
  pickupPlace: string
  pickupStart: Date
  pickupEnd: Date
  formattedPickupStart: { dayOfWeek: string; day: string; month: string; year: string; hours: string; minutes: string }
  formattedPickupEnd: { dayOfWeek: string; day: string; month: string; year: string; hours: string; minutes: string }
  isReserved: boolean
  sharedById: number
  sharedBy: User
  reservedById: number | undefined
  reservedBy: User | null
  photo: string
}
