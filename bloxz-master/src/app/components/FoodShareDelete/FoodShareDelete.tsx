import React from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from 'react-fetching-library'
import { IonIcon, IonButton } from '@ionic/react'
import { trashOutline } from 'ionicons/icons'
import routes from 'router/constants'
import removeFoodShareAction from './query'
import { FoodShareDeleteProps } from './types'

import './style.css'

const FoodShareDelete = ({ id, redirectURL }: FoodShareDeleteProps) => {
  const { mutate } = useMutation(removeFoodShareAction)
  const history = useHistory()

  const deleteFoodshare = async () => {
    const { error: mutationError } = await mutate(id)
    if (!mutationError) {
      history.replace(routes.FOODSHARE)
    }
  }

  return (
    <IonButton
      className="foodShare__delete"
      data-testid="foodShare__delete"
      onClick={async () => {
        deleteFoodshare()
        history.replace(redirectURL)
        window.location.reload(false)
      }}
      color="light"
    >
      <IonIcon icon={trashOutline} />
    </IonButton>
  )
}

export default FoodShareDelete
