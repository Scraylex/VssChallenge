import { FormikType } from 'shared/types'

export type FoodShareFormProps = {
  formik: FormikType
  withDeleteBtn?: boolean
  redirectURL: string
}
