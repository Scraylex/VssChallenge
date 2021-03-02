import { Action } from 'react-fetching-library'

const removeFoodShareAction = (id: number): Action => ({
  method: 'DELETE',
  endpoint: `/foodshares/${id}`,
})

export default removeFoodShareAction
