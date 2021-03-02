import React from 'react'
import { render } from '@testing-library/react'
import { ClientContextProvider, createClient } from 'react-fetching-library'
import FoodSharePage from './FoodSharePage'

describe('FoodSharePage', () => {
  it('should able to display the page', () => {
    const { getByTestId } = render(
      <ClientContextProvider client={createClient({})}>
        <FoodSharePage />
      </ClientContextProvider>,
    )
    const test = getByTestId('foodShare-page')

    expect(test).toBeInTheDocument()
  })
})
