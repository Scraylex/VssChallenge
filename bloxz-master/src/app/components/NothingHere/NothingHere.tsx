import { IonButton } from '@ionic/react'
import React from 'react'

import './style.css'

type NothingHereProps = {
  message: string
  pluralize?: boolean
  createRoute?: string
}

const NothingHere = ({ message, pluralize = false, createRoute }: NothingHereProps) => {
  return (
    <div className="container" data-testid="nothing-here">
      <p>
        <strong>
          No {message}
          {pluralize && 's'} for you :(
        </strong>
      </p>

      {createRoute && (
        <IonButton color="light" routerLink={createRoute}>
          {`${message} erstellen`}
        </IonButton>
      )}
    </div>
  )
}

export default NothingHere
