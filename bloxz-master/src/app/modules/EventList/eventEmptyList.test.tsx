import React from 'react'
import fetchMock from 'fetch-mock'
import { wait, render } from '@testing-library/react'
import { ClientContextProvider, createClient } from 'react-fetching-library'

import EventListWithData from './EventListWithData'

fetchMock.mock('*', {
  body: [],
})

describe('EmptyList', () => {
  it('should able to render empty-list when there are no events loaded', async () => {
    const { getByTestId } = render(
      <ClientContextProvider client={createClient({})}>
        <EventListWithData />
      </ClientContextProvider>,
    )
    await wait()

    const emptyList = getByTestId('nothing-here')

    expect(emptyList).toBeInTheDocument()
  })
})
