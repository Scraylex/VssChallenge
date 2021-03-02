import { Action } from 'react-fetching-library'

export const BASE_URL = 'http://localhost:5000/api'

export const requestHostInterceptor = (host: string) => () => async (action: Action) => {
  return {
    ...action,
    endpoint: `${host}${action.endpoint}`,
  }
}
