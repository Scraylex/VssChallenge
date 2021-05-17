import { Action } from 'react-fetching-library'

const addEventAction = (formValues: object): Action => ({
  method: 'POST',
  endpoint: '/events',
  body: formValues,
  headers: {'Authorization': `Bearer ${localStorage.getItem('token')?.slice(1, -1)}`}

})

export default addEventAction
