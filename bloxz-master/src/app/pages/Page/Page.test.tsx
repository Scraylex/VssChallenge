import React from 'react'
import { render } from '@testing-library/react'
import Page from './Page'

describe('Page', () => {
  it('should be able to render', () => {
    const { getByTestId } = render(
      <Page>
        <div data-testid="test" />
      </Page>,
    )
    const test = getByTestId('test')

    expect(test).toBeInTheDocument()
  })
})
