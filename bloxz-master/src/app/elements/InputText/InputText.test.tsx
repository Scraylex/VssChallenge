import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import InputText from './InputText'

const WrappedMUTWithValidation = () => {
  const mockFormik = useFormik({
    validationSchema: yup.object().shape({
      test: yup.string().min(25, 'To Short'),
    }),
    initialValues: { props: {} },
    onSubmit: () => {
      jest.fn()
    },
  })
  return <InputText label="Test" name="test" data-testid="" formik={mockFormik} />
}

describe('Input Text', () => {
  it('should able to insert text', async () => {
    const { getByTestId } = render(<WrappedMUTWithValidation />)

    const input = getByTestId('input-text__input')

    fireEvent.change(input, {
      target: { value: 'test123' },
    })

    fireEvent.blur(input)

    const error = getByTestId('form-control__error')

    expect(error).not.toHaveStyle('display: none')
  })
})
