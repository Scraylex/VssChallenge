import React from 'react'
import { IonDatetime } from '@ionic/react'
import { DatetimeChangeEventDetail } from '@ionic/core/dist/types/interface'
import { Caption } from 'app/fundamentals/Typography'
import { InputDateTimeProps } from './types'
import FormControl from '../FormControl'
import './styles.css'

const InputDateTime = ({ name, label, formik: { setFieldValue, values, touched, errors } }: InputDateTimeProps) => {
  return (
    <FormControl
      error={!!(touched[name] && errors[name])}
      errorMsg={errors[name] as string}
      data-testid="input-date-time"
    >
      <Caption data-testid="input-date-time__label">{label}</Caption>

      <IonDatetime
        date-testid="input-date-time__input"
        className="input-date-time"
        displayFormat="D MMM YYYY H:mm"
        value={values[name]}
        // Not testable because we cannot modify this ionic element with jest
        onIonChange={({ detail: { value } }: CustomEvent<DatetimeChangeEventDetail>) => {
          setFieldValue(name, value)
        }}
        max={new Date(new Date().setFullYear(new Date().getFullYear() + 10)).toISOString()}
        min={new Date(Date.now()).toISOString()}
      />
    </FormControl>
  )
}

export default InputDateTime
