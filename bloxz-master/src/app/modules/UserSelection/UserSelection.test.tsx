import React from 'react'
import fetchMock from 'fetch-mock'
import { wait, render, fireEvent } from '@testing-library/react'
import { ClientContextProvider, createClient } from 'react-fetching-library'
import { MemoryRouter } from 'react-router-dom'

import UserSelection from './UserSelection'
import UserSelectionWithData from './UserSelectionWithData'

const mockUser = {
  id: 1,
  firstName: 'test',
  lastName: 'testi',
  email: 'test@mail.com',
}

beforeEach(() => window.localStorage.clear())

jest.mock('react-dom', () => {
  const original = jest.requireActual('react-dom')
  return {
    ...original,
    createPortal: (node: unknown) => node,
  }
})

fetchMock.mock('*', {
  body: [mockUser],
})

describe('UserSelection', () => {
  it('should able to render the form', async () => {
    const mock = [
      {
        id: 1,
        firstName: 'hans',
        lastName: 'peter',
        email: 'hans.peter@mail.com',
      },
    ]
    const { getByTestId } = render(
      <MemoryRouter>
        <ClientContextProvider client={createClient({})}>
          <UserSelection selection={mock} />
        </ClientContextProvider>
      </MemoryRouter>,
    )
    expect(getByTestId('user-selection__form')).toBeInTheDocument()
  })

  it('should able to render the form', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <ClientContextProvider client={createClient({})}>
          <div id="modal-root">
            <UserSelectionWithData />
          </div>
        </ClientContextProvider>
      </MemoryRouter>,
    )

    await wait()

    const select = getByTestId('user-selection__select')
    const submitBtn = getByTestId('event-form__submit')

    fireEvent.change(select, { target: { value: 1 } })
    fireEvent.click(submitBtn)

    await wait()

    expect(window.localStorage.getItem('user')).toBe(JSON.stringify(mockUser))
  })
})
