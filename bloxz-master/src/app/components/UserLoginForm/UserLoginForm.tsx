import { IonButton, IonIcon } from '@ionic/react'
import { trashOutline } from 'ionicons/icons'
import React from 'react'
import { useHistory } from 'react-router-dom'

import { FormikType } from '../../../shared/types'
import InputText from '../../elements/InputText'
import './style.css'

type UserLoginFormProps = {
  formik: FormikType
  logOut?: () => void
  redirectURL: string
}

const UserLoginForm = ({ formik, logOut, redirectURL }: UserLoginFormProps) => {
  const history = useHistory()
  const formButtons = () => {
    if (!logOut) {
      return (
        <IonButton
          color="secondary"
          onClick={() => {
            formik.handleSubmit()
            history.replace(redirectURL)
            window.location.reload(false)
          }}
        >
          Speichern
        </IonButton>
      )
    }

    return (
      <div className="flex-container">
        <IonButton className="delete" color="light" onClick={logOut}>
          <IonIcon icon={trashOutline} />
        </IonButton>
        <IonButton
          color="secondary"
          onClick={() => {
            formik.handleSubmit()
            history.replace(redirectURL)
            window.location.reload(false)
          }}
        >
          Speichern
        </IonButton>
      </div>
    )
  }

  return (
    <form className="user-login-form" data-testid="user-login-form">
      <InputText label="Name:" name="firstname" formik={formik} />

      <InputText label="Nachname:" name="lastname" formik={formik} />

      <InputText label="Email:" name="email" formik={formik} />

      <InputText label="Password:" name="password" formik={formik} />

      {formButtons()}
    </form>
  )
}

export default UserLoginForm
