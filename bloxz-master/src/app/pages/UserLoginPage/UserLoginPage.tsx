import React from 'react'

import Page from 'app/pages/Page'
import UserLogin from 'app/modules/UserLogin'

const UserLoginPage: React.FC = () => {
  return (
    <Page title="Login" dataTestId="login-page">
      <UserLogin       defaultValues={{
        firstname: '',
        lastname: '',
        email: '',
        password: '',
      }}/>
    </Page>
  )
}

export default UserLoginPage
