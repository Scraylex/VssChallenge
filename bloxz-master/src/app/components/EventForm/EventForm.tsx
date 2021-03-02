import { IonButton, IonIcon } from '@ionic/react'
import { trashOutline } from 'ionicons/icons'
import React from 'react'
import { useHistory } from 'react-router-dom'

import { FormikType } from '../../../shared/types'
import InputDate from '../../elements/InputDateTime/InputDateTime'
import InputText from '../../elements/InputText'
import InputTextArea from '../../elements/InputTextArea'
import './style.css'

type EventFormProps = {
  formik: FormikType
  deleteEvent?: () => void
  redirectURL: string
}

const EventForm = ({ formik, deleteEvent, redirectURL }: EventFormProps) => {
  const history = useHistory()
  const formButtons = () => {
    if (!deleteEvent) {
      return (
        <IonButton
          color="secondary"
          data-testid="event-form__submit"
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
        <IonButton className="delete" data-testid="event-form__delete" color="light" onClick={deleteEvent}>
          <IonIcon icon={trashOutline} />
        </IonButton>
        <IonButton
          color="secondary"
          data-testid="event-form__submit"
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
    <form className="event-form" data-testid="event-form">
      <InputText label="Title:" name="title" formik={formik} />

      <InputText label="Ort:" name="location" formik={formik} />

      <InputDate label="Start Zeit:" name="start" formik={formik} />

      <InputTextArea label="Beschreibung:" name="description" formik={formik} />

      {formButtons()}
    </form>
  )
}

export default EventForm
