import React from 'react'
import { render } from '@testing-library/react'
import { Caption, H1, H2 } from '.'

describe('H1', () => {
  it('should able to render', () => {
    const { getByTestId } = render(<H1 data-testid="test">Test123</H1>)
    const test = getByTestId('test')

    expect(test).toBeInTheDocument()
  })

  it('should able to render contrast version', () => {
    const { getByTestId } = render(
      <H1 data-testid="test" contrast>
        Test123
      </H1>,
    )
    const test = getByTestId('test')

    expect(test).toHaveStyle(`color: var(--ion-color-dark-contrast)`)
  })
})

describe('H2', () => {
  it('should able to render', () => {
    const { getByTestId } = render(<H2 data-testid="test">Test123</H2>)
    const test = getByTestId('test')

    expect(test).toBeInTheDocument()
  })

  it('should able to render contrast version', () => {
    const { getByTestId } = render(
      <H2 data-testid="test" contrast>
        Test123
      </H2>,
    )
    const test = getByTestId('test')

    expect(test).toHaveStyle(`color: var(--ion-color-dark-contrast)`)
  })
})

describe('Caption', () => {
  it('should able to render', () => {
    const { getByTestId } = render(<Caption data-testid="test">Test123</Caption>)
    const test = getByTestId('test')

    expect(test).toBeInTheDocument()
  })
  it('should able to render contrast version', () => {
    const { getByTestId } = render(
      <Caption data-testid="test" contrast>
        Test123
      </Caption>,
    )
    const test = getByTestId('test')

    expect(test).toHaveStyle(`color: var(--ion-color-dark-contrast)`)
  })
})
