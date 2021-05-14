import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { createClient, ClientContextProvider } from 'react-fetching-library'
import { calendarOutline, homeOutline, pizzaOutline } from 'ionicons/icons'

import UserSelection from 'app/modules/UserSelection'
import { getItem } from 'shared/localStorage'
import { User } from 'shared/api/types'
import FoodShareModifyPage from 'app/pages/FoodShareModifyPage'

import {
  PinboardPage,
  EventModifyPage,
  EventDetailsPage,
  FoodShareDetailsPage,
  FoodShareAddPage,
  EventAddPage,
  EventsPage,
  FoodSharePage,
  UserLoginPage
} from './app/pages'
import routes from './router/constants'
import { BASE_URL, requestHostInterceptor } from './shared/utils/api'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Own CSS */
import './app/fundamentals/Color/style.css'

// Creates the REST API Client to be able to use hooks for quering
const client = createClient({
  requestInterceptors: [requestHostInterceptor(BASE_URL)],
})

const App: React.FC = () => {
  const isLoggedIn = !!getItem<User>('user')

  return (
    <IonApp data-testid="app">
      <ClientContextProvider client={client}>
        <IonReactRouter>
          <IonTabs>
            {/* Router */}
            <IonRouterOutlet>
              <Route path={routes.LOGIN} component={UserLoginPage} />

              <Route exact path={routes.PINBOARD} component={PinboardPage} />

              <Route exact path={routes.EVENTS} component={EventsPage} />
              <Route exact path={routes.EVENT_ADD} component={EventAddPage} />
              <Route exact path={routes.EVENT_DETAILS} component={EventDetailsPage} />
              <Route exact path={routes.EVENT_EDIT} component={EventModifyPage} />

              <Route path={routes.FOODSHARE} component={FoodSharePage} exact />
              <Route path={routes.FOODSHARE_ADD} component={FoodShareAddPage} exact />
              <Route path={routes.FOODSHARE_DETAILS} component={FoodShareDetailsPage} exact />
              <Route path={routes.FOODSHARE_EDIT} component={FoodShareModifyPage} exact />

              <Redirect exact from="/" to={routes.PINBOARD} />
            </IonRouterOutlet>

            {/* Bottom Nav */}
            <IonTabBar slot="bottom" color="primary">
              <IonTabButton tab="pinboard" href={routes.PINBOARD}>
                <IonIcon icon={homeOutline} />
                <IonLabel>Pinwand</IonLabel>
              </IonTabButton>
              <IonTabButton tab="events" href={routes.EVENTS}>
                <IonIcon icon={calendarOutline} />
                <IonLabel>Events</IonLabel>
              </IonTabButton>
              <IonTabButton tab="foodshare" href={routes.FOODSHARE}>
                <IonIcon icon={pizzaOutline} />
                <IonLabel>Foodsharing</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
          {/*!isLoggedIn && <UserSelection />*/}
        </IonReactRouter>
      </ClientContextProvider>
    </IonApp>
  )
}

export default App
