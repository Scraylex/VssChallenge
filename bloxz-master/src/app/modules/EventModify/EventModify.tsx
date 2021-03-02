import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Action, useMutation } from 'react-fetching-library'
import { useHistory, useParams } from 'react-router-dom'
import * as yup from 'yup'

import routes from 'router/constants'
import EventForm from 'app/components/EventForm/EventForm'
import modifyEventAction from './query'
import { DefaultValues, EventModifyWithDataProps } from './types'

const EventModifySchema = yup.object().shape({
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

const EventModifyWithProps = ({ defaultValues }: EventModifyWithDataProps) => {
  const { id } = useParams()
  const history = useHistory()

  const { mutate } = useMutation(modifyEventAction(id ?? ''))
  const [error, setError] = useState<boolean>(false)
  const formik = useFormik<DefaultValues>({
    initialValues: defaultValues,
    validationSchema: EventModifySchema,
    onSubmit: async values => {
      const { error: mutationError } = await mutate(values)
      if (mutationError) {
        setError(true)
      } else {
        history.push(routes.EVENTS)
      }
    },
  })

  const { mutate: mutateDelete } = useMutation(
    (eventId: string): Action => ({
      method: 'DELETE',
      endpoint: `/events/${eventId}`,
    }),
  )

  const deleteEvent = async () => {
    const { error: mutationError } = await mutateDelete(id ?? '')
    if (!mutationError) {
      history.replace(routes.EVENTS)
      window.location.reload(false)
    }
  }

  if (error) {
    return <div data-testid="event-modify-form__error">An error occured</div>
  }

  return <EventForm formik={formik} deleteEvent={() => deleteEvent()} redirectURL={routes.EVENTS} />
}

export default EventModifyWithProps
