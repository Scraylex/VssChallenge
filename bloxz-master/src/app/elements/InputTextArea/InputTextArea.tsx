import React from 'react'
import { Caption } from 'app/fundamentals/Typography'
import { InputTextAreaProps } from './types'
import './style.css'
import FormControl from '../FormControl'

const InputTextArea = ({
  label,
  name,
  formik: { values, handleChange, errors, touched, setFieldTouched },
}: InputTextAreaProps) => {
  return (
    <FormControl
      error={!!(touched[name] && errors[name])}
      errorMsg={errors[name] as string}
      data-testid="input-textarea"
    >
      <Caption data-testid="input-textarea__label">{label}</Caption>
      <textarea
        className="input-textarea"
        data-testid="input-textarea__input"
        name={name}
        defaultValue={values[name] || ''}
        onChange={handleChange}
        onBlur={() => setFieldTouched(name)}
      />
    </FormControl>
  )
}

export default InputTextArea
