import { z } from 'zod'

export const user_signup_zod_schema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email address is required' }),

    password: z.string({ required_error: 'Password  is required' }),
    username: z.string({
      required_error: 'Username is required',
    }),
    avatar: z.string({ required_error: 'Please enter the image' }).optional(),
  }),
})

export const admin_create_zod_schema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email address is required' })
      .email('Invalid email format'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, 'Password must be at least 6 characters long'),
    username: z.string({
      required_error: 'Username is required',
    }),
    avatar: z.string().optional(),
    role: z.enum(['ADMIN', 'SUPERADMIN'], {
      required_error: 'Role is required',
    }),
    gender: z.enum(['Male', 'Female', 'Others'], {
      required_error: 'Gender is required',
    }),
  }),
})

export const user_login_zod_schema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email address  is required' }),
    password: z.string({ required_error: 'Password  is required' }),
  }),
})

export const user_refresh_token_zod_schema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: 'Refresh token  is required' }),
  }),
})
