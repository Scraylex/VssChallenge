import { IonButton } from '@ionic/react'
import React, { useState } from 'react'
import { useMutation } from 'react-fetching-library'

import { User } from '../../../shared/api/types'
import { getItem } from '../../../shared/localStorage'
import reserveFoodAction from './query'
import { FoodShareProps, FoodShareReserveProps } from './types'

const FoodShareReserve = ({ props }: FoodShareProps) => {
  const { isReserved } = props
  const [reserved, setReserve] = useState(isReserved)
  const [error, setError] = useState<boolean>(false)
  const { mutate } = useMutation(reserveFoodAction)
  const reservationProps = { ...props, reservedById: getItem<User>('user')?.id }

  const makeReservation = async (values: FoodShareReserveProps) => {
    setReserve(!reserved)

    const { error: mutateError } = await mutate(values)

    if (mutateError) {
      setError(true)
    }
  }
  if (error) {
    return <div>Error happened</div>
  }
  return (
    <IonButton
      data-testid="foodShare__reserve"
      disabled={reserved}
      onClick={e => {
        e.stopPropagation()
        makeReservation({ reservationProps })
        window.location.reload(false)
      }}
    >
      Reservieren
    </IonButton>
  )
}

export default FoodShareReserve
