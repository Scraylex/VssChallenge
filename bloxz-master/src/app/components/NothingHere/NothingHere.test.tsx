import React from 'react'
import { render } from '@testing-library/react'

import NothingHere from './NothingHere'

describe('NothingHere', () => {
  it('should be able to render', async () => {
    const { getByTestId } = render(<NothingHere message="test" createRoute="" />)

    expect(getByTestId('nothing-here')).toBeInTheDocument()
  })
})
