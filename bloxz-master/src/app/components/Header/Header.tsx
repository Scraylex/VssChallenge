import React from 'react'
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonBackButton } from '@ionic/react'
import { getItem, removeItem } from 'shared/localStorage'
import { User } from 'shared/api/types'
import { HeaderProps } from './types'
import './header.css'

const Header: React.FC<HeaderProps> = ({ title }: HeaderProps) => {
  const user = getItem<User>('user')

  const clearUser = () => {
    removeItem('user')
    window.location.reload()
  }

  return (
    <IonHeader>
      <IonToolbar color="primary">
        <IonButtons slot="start">
          <IonBackButton />
        </IonButtons>
        <IonTitle data-testid="app-title">{title}</IonTitle>
        <IonButtons slot="primary">
          <IonButton data-testid="header__user-field" onClick={clearUser}>
            {user ? `${user.firstName} ${user.lastName}` : ''}
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  )
}

export default Header
