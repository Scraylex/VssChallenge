import React, { useState } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useHistory } from 'react-router-dom'
import { useMutation, Action } from 'react-fetching-library'
import routes from 'router/constants'
import FoodShareForm from 'app/components/FoodShareForm'
import { FoodShareModifyWithDataProps, DefaultValues } from './types'

const FoodShareModifySchema = yup.object().shape({
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

const FoodShareModifyWithProps = ({ defaultValues }: FoodShareModifyWithDataProps) => {
  const history = useHistory()
  const modifyFoodShareAction = (formValues: object): Action => {
    return {
      method: 'PUT',
      endpoint: `/foodshares/${defaultValues.id}`,
      body: formValues,
    }
  }
  const { mutate } = useMutation(modifyFoodShareAction)
  const [error, setError] = useState<boolean>(false)
  const formik = useFormik<DefaultValues>({
    initialValues: defaultValues,
    validationSchema: FoodShareModifySchema,
    onSubmit: async values => {
      const { error: mutationError } = await mutate(values)
      if (mutationError) {
        setError(true)
      } else {
        history.push(routes.FOODSHARE)
      }
    },
  })

  if (error) {
    return <div data-testid="foodShare-modify-form__error">An error occured</div>
  }

  return <FoodShareForm formik={formik} withDeleteBtn redirectURL={routes.FOODSHARE} />
}

export default FoodShareModifyWithProps
