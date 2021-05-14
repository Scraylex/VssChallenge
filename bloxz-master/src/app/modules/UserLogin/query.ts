import { Action } from 'react-fetching-library'

const postLoginAction = (formValues: object): Action => ({
  method: 'POST',
  endpoint: '/authentication/register',
  body: formValues,
})

export default postLoginAction
