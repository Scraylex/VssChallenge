import React from 'react'
import { Caption } from 'app/fundamentals/Typography'
import { FormControlProps } from './types'
import './styles.css'

const FormControl = ({ error, errorMsg, children, 'data-testid': dataTestId }: FormControlProps) => (
  <div className={`form-control ${error ? 'error' : ''}`} data-testid={dataTestId}>
    {children}
    <Caption className={`error-message ${error ? 'display' : ''}`} data-testid="form-control__error">
      {errorMsg}
    </Caption>
  </div>
)

export default FormControl
