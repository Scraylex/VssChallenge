import React from 'react'
import InputText from 'app/elements/InputText'
import { IonButton } from '@ionic/react'
import InputDate from 'app/elements/InputDateTime/InputDateTime'
import InputTextArea from 'app/elements/InputTextArea'
import InputPhoto from 'app/elements/InputPhoto'
import { useHistory } from 'react-router-dom'
import routes from 'router/constants'
import { FoodShareFormProps } from './types'

import './style.css'
import FoodShareDelete from '../FoodShareDelete'

const FoodShareForm = ({ formik, withDeleteBtn, redirectURL }: FoodShareFormProps) => {
  const history = useHistory()
  return (
    <form className="foodShare-form" data-testid="foodShare-form">
      <InputText label="Titel:" name="title" formik={formik} />

      <InputText label="Abholort:" name="pickupPlace" formik={formik} />

      <InputDate label="Abholzeit:" name="pickupStart" formik={formik} />

      <InputDate label="Ablaufdatum:" name="pickupEnd" formik={formik} />

      <InputTextArea label="Beschreibung:" name="description" formik={formik} />

      <InputPhoto label="Take a Photo" name="photo" formik={formik} />

      <div className="foodShare-form__buttons">
        {withDeleteBtn && <FoodShareDelete id={formik.values.id} redirectURL={routes.FOODSHARE} />}
        <IonButton
          color="secondary"
          type="button"
          data-testid="foodShare-form__submit"
          onClick={() => {
            formik.handleSubmit()
            history.replace(redirectURL)
            window.location.reload(false)
          }}
        >
          Speichern
        </IonButton>
      </div>
    </form>
  )
}

export default FoodShareForm
