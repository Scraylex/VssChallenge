import React from 'react'
import ReactDOM from 'react-dom'
import { H1 } from 'app/fundamentals/Typography'

import { useQuery } from 'react-fetching-library'
import { User } from 'shared/api/types'
import UserSelection from './UserSelection'

import './styles.css'

const UserSelectionWithData = () => {
  const modal = document.getElementById('modal-root') as Element

  const { loading, payload, error } = useQuery<User[]>({
    method: 'GET',
    endpoint: '/users',
    responseType: 'json',
    headers: {'Authorization': `Bearer ${localStorage.getItem('token')?.slice(1, -1)}`}
  })

  if (loading) {
    return <div>loading</div>
  }

  if (error) {
    return ReactDOM.createPortal(
      <div className="user-selection">
        <H1 contrast>Verbindung zum Server kann nicht hergestellt werden!</H1>
      </div>,
      modal,
    )
  }

  const selection = payload?.map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (item: any): User => ({
      id: item.id,
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
    }),
  )

  return ReactDOM.createPortal(
    <div className="user-selection">
      <UserSelection selection={selection ?? []} />
    </div>,
    modal,
  )
}

export default UserSelectionWithData
