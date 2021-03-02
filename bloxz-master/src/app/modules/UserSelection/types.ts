import { User } from 'shared/api/types'
import { RouteComponentProps } from 'react-router-dom'

export type UserSelectionProps = {
  selection: User[]
} & RouteComponentProps

export type UserSelectionForm = {
  user: number
}
