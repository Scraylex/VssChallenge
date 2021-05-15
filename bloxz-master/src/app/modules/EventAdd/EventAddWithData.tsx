import React, { useState } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useMutation } from 'react-fetching-library'
import { useHistory } from 'react-router-dom'

import { User } from 'shared/api/types'
import EventForm from 'app/components/EventForm'
import { getItem } from 'shared/localStorage'
import routes from 'router/constants'
import addEventAction from './query'
import { EventAddWithDataProps, DefaultValues } from './types'

const EventAddSchema = yup.object().shape({
  title: yup
    .string()
    .required('Der Titel wird benötigt')
    .min(3, 'Der Titel ist zu kurz')
    .max(25, 'Der Titel ist zu lang'),
  location: yup
    .string()
    .required('Der Ort wird benötigt')
    .min(4, 'Der Ort ist zu kurz')
    .max(250, 'der Ort ist zu lang'),
  start: yup.string().required('Start Datum wird benötigt'),
  description: yup.string().notRequired(),
})

const EventAddWithProps = ({ defaultValues }: EventAddWithDataProps) => {
  const history = useHistory()
  const { mutate } = useMutation(addEventAction)
  const [error, setError] = useState<boolean>(false)
  const formik = useFormik<DefaultValues>({
    initialValues: defaultValues,
    validationSchema: EventAddSchema,
    onSubmit: async values => {
      const resp = await mutate({ ...values, organiserId: getItem<User>('user')?.id })
      console.log(resp)

      history.push(routes.EVENTS)
      
    },
  })

  if (error) {
    return <div data-testid="event-add-form__error">An error occured</div>
  }

  return <EventForm formik={formik} redirectURL={routes.EVENTS} />
}

export default EventAddWithProps
