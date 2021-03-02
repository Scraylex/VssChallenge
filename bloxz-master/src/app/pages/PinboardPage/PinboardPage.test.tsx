import React from 'react'
import { render } from '@testing-library/react'

import PinboardPage from './PinboardPage'

describe('EventPage', () => {
  it('should be able to display the page', () => {
    const { getByTestId } = render(<PinboardPage />)
    const test = getByTestId('pinboard-page')

    expect(test).toBeInTheDocument()
  })
})
