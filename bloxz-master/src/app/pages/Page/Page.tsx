import React from 'react'
import { IonContent, IonPage } from '@ionic/react'

import Header from 'app/components/Header'
import { PageProps } from './types'
import './page.css'

const Page: React.FC<PageProps> = ({ title, children, dataTestId }) => (
  <IonPage>
    <Header title={title} />
    <IonContent data-testid={dataTestId}>{children}</IonContent>
  </IonPage>
)

export default Page
