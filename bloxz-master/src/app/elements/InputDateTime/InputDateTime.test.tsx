import React from 'react'
import { render } from '@testing-library/react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import InputDateTime from './InputDateTime'

const WrappedMUTWithValidation = () => {
  const mockFormik = useFormik({
    validationSchema: yup.object().shape({
      test: yup.date().required(),
    }),
    initialValues: { props: {} },
    onSubmit: () => {
      jest.fn()
    },
  })
  return <InputDateTime label="Test" name="test" formik={mockFormik} />
}

describe('Input DateTime', () => {
  it('should able to set datetime', async () => {
    const { asFragment } = render(<WrappedMUTWithValidation />)

    expect(asFragment).toMatchSnapshot()
  })
})
