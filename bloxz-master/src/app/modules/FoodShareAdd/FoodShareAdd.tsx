import React, { useState } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useHistory } from 'react-router-dom'
import { useMutation } from 'react-fetching-library'

import routes from 'router/constants'
import FoodShareForm from 'app/components/FoodShareForm'
import { User } from 'shared/api/types'
import { getItem } from 'shared/localStorage'
import addFoodShareAction from './query'
import { FoodShareAddWithDataProps, DefaultValues } from './types'

const FoodShareAddSchema = yup.object().shape({
  title: yup
    .string()
    .required('Der Titel wird benötigt')
    .min(3, 'Der Titel ist zu kurz')
    .max(25, 'Der Titel ist zu lang'),
  pickupPlace: yup
    .string()
    .required('Der Abholort wird benötigt')
    .min(4, 'Der Abholort ist zu kurz')
    .max(250, 'der Ort ist zu lang'),
  pickupStart: yup.string().required('Start Datum wird benötigt'),
  pickupEnd: yup.string().required('Start Datum wird benötigt'),
  description: yup.string().notRequired(),
  photo: yup.string().required('Please Show the Food you wish to share'),
})

const FoodShareAdd = ({ defaultValues }: FoodShareAddWithDataProps) => {
  const history = useHistory()

  const { mutate } = useMutation(addFoodShareAction)
  const [error, setError] = useState<boolean>(false)
  const formik = useFormik<DefaultValues>({
    initialValues: defaultValues,
    validationSchema: FoodShareAddSchema,
    onSubmit: async values => {
      const { error: mutationError } = await mutate({ ...values, sharedById: getItem<User>('user')?.id })

      if (mutationError) {
        setError(true)
      } else {
        history.push(routes.FOODSHARE)
      }
    },
  })

  if (error) {
    return <div data-testid="foodShare-add-form__error">An error occured</div>
  }

  return <FoodShareForm formik={formik} redirectURL={routes.FOODSHARE} />
}

export default FoodShareAdd
