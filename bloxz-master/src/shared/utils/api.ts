import { Action } from 'react-fetching-library'

export const BASE_URL : string = process.env.BASE_URL || 'http://localhost:5001/api';

export const requestHostInterceptor = (host: string) => () => async (action: Action) => {
  return {
    ...action,
    endpoint: `${host}${action.endpoint}`,
    Headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
  }
}
