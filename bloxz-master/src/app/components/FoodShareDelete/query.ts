import { Action } from 'react-fetching-library'

const removeFoodShareAction = (id: number): Action => ({
  method: 'DELETE',
  endpoint: `/foodshares/${id}`,
  headers: {'Authorization': `Bearer ${localStorage.getItem('token')?.slice(1, -1)}`}
})

export default removeFoodShareAction
