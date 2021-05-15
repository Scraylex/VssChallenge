import React from 'react'

import Page from 'app/pages/Page'
import Login from '../../components/Login/Login'

const UserLoginPage = () => {
  return (
    <Page title="Login" dataTestId="login-page">
      <Login />
    </Page>
  )
}

export default UserLoginPage
