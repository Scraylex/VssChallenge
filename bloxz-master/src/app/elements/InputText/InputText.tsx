import React from 'react'
import { Caption } from 'app/fundamentals/Typography'
import { InputTextProps } from './types'
import './style.css'
import FormControl from '../FormControl'

const InputText = ({
  label,
  name,
  formik: { values, handleChange, errors, touched, setFieldTouched },
}: InputTextProps) => {
  return (
    <FormControl error={!!(touched[name] && errors[name])} errorMsg={errors[name] as string} data-testid="input-text">
      <Caption data-testid="input-text__label">{label}</Caption>
      <input
        className="input-text"
        data-testid="input-text__input"
        name={name}
        defaultValue={values[name] || ''}
        onChange={handleChange}
        onBlur={() => setFieldTouched(name)}
      />
    </FormControl>
  )
}

export default InputText
