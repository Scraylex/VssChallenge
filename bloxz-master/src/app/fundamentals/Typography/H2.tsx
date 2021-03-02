import React from 'react'
import { TypographyProps } from './types'
import './style.css'

const H2 = ({ children, 'data-testid': dataTestId, contrast }: TypographyProps) => (
  <h2 data-testid={dataTestId} className={`text h2 ${contrast ? 'contrast' : ''}`}>
    {children}
  </h2>
)

export default H2
