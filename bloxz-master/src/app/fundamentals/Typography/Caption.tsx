import React from 'react'
import { TypographyProps } from './types'
import './style.css'

const Caption = ({ children, className, 'data-testid': dataTestId, contrast }: TypographyProps) => (
  <div className={`text caption ${className} ${contrast ? 'contrast' : ''}`} data-testid={dataTestId}>
    {children}
  </div>
)

export default Caption
