import { FormikValues, FormikErrors, FormikTouched } from 'formik'

export type FormikType = {
  values: FormikValues
  handleChange: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    eventOrPath: string | React.ChangeEvent<any>,
  ) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
  void | ((eventOrTextValue: string | React.ChangeEvent<any>) => void)
  errors: FormikErrors<FormikValues>
  touched: FormikTouched<FormikValues>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFieldTouched: (field: string, touched?: boolean, shouldValidate?: boolean | undefined) => any
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => any
}
