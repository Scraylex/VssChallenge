import { Action } from 'react-fetching-library'

const modifyEventAction = (id: string) => (formValues: object): Action => {
  return {
    method: 'PUT',
    endpoint: `/events/${id}`,
    body: formValues,
  }
}

export default modifyEventAction
