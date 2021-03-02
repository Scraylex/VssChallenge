import React from 'react'
import { render } from '@testing-library/react'
import { useFormik } from 'formik'
import InputPhoto from './InputPhoto'

const WrappedMUTWithValidation = () => {
  const mockFormik = useFormik({
    initialValues: { props: {} },
    onSubmit: () => {
      jest.fn()
    },
  })
  return <InputPhoto label="Test" name="test" data-testid="" formik={mockFormik} />
}

describe('Input Photo', () => {
  it('should able to render', async () => {
    const { getByTestId } = render(<WrappedMUTWithValidation />)

    expect(getByTestId('input-photo')).toMatchSnapshot()
  })
})
