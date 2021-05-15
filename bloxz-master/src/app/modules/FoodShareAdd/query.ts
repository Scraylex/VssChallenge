import { Action } from 'react-fetching-library'

const addFoodShareAction = (formValues: object): Action => ({
  method: 'POST',
  endpoint: '/foodshares',
  body: formValues,
  headers: {'Authorization': `Bearer ${localStorage.getItem('token')?.slice(1, -1)}`}

})

export default addFoodShareAction
