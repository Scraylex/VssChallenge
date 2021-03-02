import React from 'react'
import { render } from '@testing-library/react'
import FormControl from './FormControl'

describe('FormControl', () => {
  it('should able to render FormControl', async () => {
    const { getByTestId } = render(
      <FormControl error={false} errorMsg="hei" data-testid="test">
        <div>form child</div>
      </FormControl>,
    )

    expect(getByTestId('test')).toBeInTheDocument()
  })

  it('should able to render FormControl with error', async () => {
    const { getByTestId } = render(
      <FormControl error errorMsg="hei" data-testid="test">
        <div>form child</div>
      </FormControl>,
    )

    const error = getByTestId('form-control__error')

    expect(error).not.toHaveStyle('display: none')
  })
})
