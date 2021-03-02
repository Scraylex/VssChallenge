import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import routes from 'router/constants'
import { ClientContextProvider, createClient } from 'react-fetching-library'

import { useFormik } from 'formik'
import EventForm from './EventForm'

type WrappedMUTProps = { fn: () => void }
const history = createMemoryHistory({ initialEntries: [routes.EVENT_ADD] })

const WrappedMUT = ({ fn }: WrappedMUTProps) => {
  const mockFormik = useFormik({
    initialValues: { props: {} },
    onSubmit: () => fn(),
  })
  return <EventForm formik={mockFormik} redirectURL={routes.EVENTS} />
}

describe('EventForm', () => {
  it('should able to successfully render the form', async () => {
    const { getByTestId } = render(
      <Router history={history}>
        <ClientContextProvider client={createClient({})}>
          <WrappedMUT fn={() => jest.fn()} />{' '}
        </ClientContextProvider>
      </Router>,
    )

    await wait()

    expect(getByTestId('event-form__submit')).toBeInTheDocument()
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

    fireEvent.click(getByTestId('event-form__submit'))

    await wait()

    expect(testFn).toBeCalled()
  })
})
