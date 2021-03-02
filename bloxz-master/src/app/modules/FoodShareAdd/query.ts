import { Action } from 'react-fetching-library'

const addFoodShareAction = (formValues: object): Action => ({
  method: 'POST',
  endpoint: '/foodshares',
  body: formValues,
})

export default addFoodShareAction
