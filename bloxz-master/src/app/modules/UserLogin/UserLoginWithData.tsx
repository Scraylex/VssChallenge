import React, { useState } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useMutation } from 'react-fetching-library'
import { useHistory } from 'react-router-dom'

import UserLoginForm from 'app/components/UserLoginForm'
import routes from 'router/constants'
import { UserLoginWithDataProps, DefaultValues } from './types'
import postLoginAction from './query'

const UserLoginSchema = yup.object().shape({
  firstname: yup
    .string()
    .required('Der Vorname wird benötigt')
    .min(3, 'Der Vorname ist zu kurz')
    .max(25, 'Der Vorname ist zu lang'),
  lastname: yup
    .string()
    .required('Der Nachname wird benötigt')
    .min(4, 'Der Nachname ist zu kurz')
    .max(25, 'Der Nachname ist zu lang'),
  email: yup.string().required('Eine Email Addresse wird benötigt'),
  password: yup.string().required('Passwort eingeben'),
})

const UserLoginWithProps = ({ defaultValues }: UserLoginWithDataProps) => {
  const history = useHistory()
  const { mutate } = useMutation(postLoginAction)
  const [error, setError] = useState<boolean>(false)
  const formik = useFormik<DefaultValues>({
    initialValues: defaultValues,
    validationSchema: UserLoginSchema,
    onSubmit: async values => {
      const { error: mutationError } = await mutate({ ...values })
      if (mutationError) {
        setError(true)
      } else {
        history.push(routes.PINBOARD)
      }
    },
  })

  if (error) {
    return <div data-testid="user-login-form__error">An error occured</div>
  }

  return <UserLoginForm formik={formik} redirectURL={routes.LOGIN} />
}

export default UserLoginWithProps
