import { Action } from 'react-fetching-library'

const addEventAction = (formValues: object): Action => ({
  method: 'POST',
  endpoint: '/events',
  body: formValues,
})

export default addEventAction
