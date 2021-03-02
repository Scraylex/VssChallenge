import React from 'react'
import { TypographyProps } from './types'
import './style.css'

const H1 = ({ children, 'data-testid': dataTestId, contrast }: TypographyProps) => (
  <h1 data-testid={dataTestId} className={`text h1 ${contrast ? 'contrast' : ''}`}>
    {children}
  </h1>
)

export default H1
