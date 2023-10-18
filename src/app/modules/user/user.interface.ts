import { User } from '@prisma/client'
import { IUser_role } from '../../../interfaces/common'

// user signup response
export type UserWithResponse = {
  user_details: User
  accessToken: string
  refreshToken: string
}

// User login response
export type IUserLoginResponse = {
  accessToken: string
  user_details: Partial<User>
  refreshToken?: string
}

// User filter type
export type IUserFilter = {
  email?: string
  role?: IUser_role
  address?: string
  searchTerm?: string
}

// user login interface
export type IUserLogin = {
  email: string
  password: string
}
