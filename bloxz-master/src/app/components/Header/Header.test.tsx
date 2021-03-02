import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { setItem } from 'shared/localStorage'
import Header from './Header'

const mockUser = {
  id: 1,
  firstName: 'test',
  lastName: 'testi',
  email: 'test@mail.com',
}

beforeEach(() => window.localStorage.clear())

describe('Header', () => {
  it('should contain the app name', () => {
    setItem('user', mockUser)
    const { getByTestId } = render(<Header />)
    const ionTitle = getByTestId('app-title')

    expect(ionTitle).toBeInTheDocument()
  })

  it('should contain the app name without user', () => {
    const { getByTestId } = render(<Header />)
    const ionTitle = getByTestId('app-title')

    expect(ionTitle).toBeInTheDocument()
  })

  it('should delete user from local storage if btn is clicked', () => {
    const { getByTestId } = render(<Header />)
    const userBtn = getByTestId('header__user-field')

    fireEvent.click(userBtn)

    expect(window.localStorage.getItem('user')).toBe(null)
  })
})
