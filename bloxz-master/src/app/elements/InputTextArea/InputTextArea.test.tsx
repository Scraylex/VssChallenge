import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { useFormik } from 'formik'
import InputTextArea from './InputTextArea'

const WrappedMUTWithValidation = () => {
  const mockFormik = useFormik({
    initialValues: { props: {} },
    onSubmit: () => {
      jest.fn()
    },
  })
  return <InputTextArea label="Test" name="test" data-testid="" formik={mockFormik} />
}

describe('Input TextArea', () => {
  it('should able to insert text', async () => {
    const { getByTestId } = render(<WrappedMUTWithValidation />)

    const input = getByTestId('input-textarea__input')

    fireEvent.change(input, {
      target: { value: 'test123' },
    })

    fireEvent.blur(input)

    const error = getByTestId('form-control__error')

    expect(error).not.toHaveStyle('display: none')
  })
})
