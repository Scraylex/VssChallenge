import React from 'react'
import { H2 } from 'app/fundamentals/Typography'

import { withRouter } from 'react-router-dom'
import { useFormik } from 'formik'
import { IonButton } from '@ionic/react'
import { setItem } from 'shared/localStorage'
import { UserSelectionProps, UserSelectionForm } from './types'

const UserSelection = ({ selection }: UserSelectionProps) => {
  const formik = useFormik<UserSelectionForm>({
    initialValues: { user: 0 },
    onSubmit: (values: UserSelectionForm) => {
      const user = selection.filter(elem => elem.id === values.user)
      setItem('user', user[0])
      window.location.reload()
    },
  })

  return (
    <form className="user-selection__form" data-testid="user-selection__form">
      <H2 contrast>Benutzer auswählen</H2>
      <select
        name="user"
        onChange={e => formik.setFieldValue('user', Number.parseInt(e.target.value, 10))}
        defaultValue={formik.values.user}
        data-testid="user-selection__select"
      >
        <option disabled value={0}>
          -- select an option --
        </option>
        {selection?.map(({ firstName, lastName, id }) => (
          <option key={id} value={id}>{`${firstName} ${lastName}`}</option>
        ))}
      </select>
      <IonButton color="secondary" type="button" data-testid="event-form__submit" onClick={() => formik.handleSubmit()}>
        Speichern
      </IonButton>
    </form>
  )
}

export default withRouter(UserSelection)
