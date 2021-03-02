import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import routes from 'router/constants'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { ClientContextProvider, createClient } from 'react-fetching-library'

import { useFormik } from 'formik'
import FoodShareForm from './FoodShareForm'

type WrappedMUTProps = { fn: () => void }
const history = createMemoryHistory({ initialEntries: [routes.FOODSHARE_ADD] })

const WrappedMUT = ({ fn }: WrappedMUTProps) => {
  const mockFormik = useFormik({
    initialValues: { props: {} },
    onSubmit: () => fn(),
  })
  return <FoodShareForm formik={mockFormik} redirectURL={routes.FOODSHARE} />
}

describe('FoodShareForm', () => {
  it('should able to successfully render the form', async () => {
    const { getByTestId } = render(
      <Router history={history}>
        <ClientContextProvider client={createClient({})}>
          <WrappedMUT fn={() => jest.fn()} />{' '}
        </ClientContextProvider>
      </Router>,
    )

    await wait()

    expect(getByTestId('foodShare-form__submit')).toBeInTheDocument()
  })

  it('should able to submit the form', async () => {
    const testFn = jest.fn()
    const { getByTestId } = render(
      <Router history={history}>
        <ClientContextProvider client={createClient({})}>
          <WrappedMUT fn={() => testFn()} />{' '}
        </ClientContextProvider>
      </Router>,
    )

    fireEvent.click(getByTestId('foodShare-form__submit'))

    await wait()

    expect(testFn).toBeCalled()
  })
})
