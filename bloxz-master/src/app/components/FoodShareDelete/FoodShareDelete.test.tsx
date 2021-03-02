import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import fetchMock from 'fetch-mock'

import { Router } from 'react-router-dom'
import { ClientContextProvider, createClient } from 'react-fetching-library'
import routes from 'router/constants'
import { createMemoryHistory } from 'history'
import FoodShareDelete from './FoodShareDelete'

describe('FoodShareDelete', () => {
  it('should able to successfully render', async () => {
    const history = createMemoryHistory({})

    const { getByTestId } = render(
      <Router history={history}>
        <ClientContextProvider client={createClient({})}>
          <FoodShareDelete id={1} redirectURL={routes.FOODSHARE} />
        </ClientContextProvider>
      </Router>,
    )

    expect(getByTestId('foodShare__delete')).toBeInTheDocument()
  })

  it('should able to delete', async () => {
    fetchMock.deleteOnce('*', {
      body: {},
    })

    const history = createMemoryHistory({})
    const { getByTestId } = render(
      <Router history={history}>
        <ClientContextProvider client={createClient({})}>
          <FoodShareDelete id={1} redirectURL={routes.FOODSHARE} />
        </ClientContextProvider>
      </Router>,
    )

    fireEvent.click(getByTestId('foodShare__delete'))

    await wait()

    expect(history.location.pathname).toBe(routes.FOODSHARE)
  })

  it('should able to delete', async () => {
    const history = createMemoryHistory({ initialEntries: [routes.FOODSHARE_DETAILS] })
    const { getByTestId } = render(
      <Router history={history}>
        <ClientContextProvider client={createClient({})}>
          <FoodShareDelete id={1} redirectURL={routes.FOODSHARE_DETAILS} />
        </ClientContextProvider>
      </Router>,
    )

    fireEvent.click(getByTestId('foodShare__delete'))

    await wait()

    expect(history.location.pathname).toBe(routes.FOODSHARE_DETAILS)
  })
})
