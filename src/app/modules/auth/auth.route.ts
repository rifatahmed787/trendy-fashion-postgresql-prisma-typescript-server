import authHandler from '../../middlewares/authHandler'
import requestValidationHandler from '../../middlewares/requestValidationHandler'
import { AuthController } from './auth.controller'
import {
  admin_create_zod_schema,
  user_login_zod_schema,
  user_refresh_token_zod_schema,
  user_signup_zod_schema,
} from './auth.validation'
import express from 'express'
import { OtpController } from './otpController'

const router = express.Router()

router.post('/send-otp', OtpController.sendOtp)
router.post(
  '/signup',
  requestValidationHandler(user_signup_zod_schema),
  AuthController.signupUser
)
router.post(
  '/create_admin',
  requestValidationHandler(admin_create_zod_schema),
  authHandler(),
  AuthController.adminCreate
)
router.post(
  '/login',
  requestValidationHandler(user_login_zod_schema),
  AuthController.loginUser
)
router.post('/google-login', AuthController.loginGoogleUser)

router.post('/profile', AuthController.createOrUpdateUserDetails)

router.post(
  '/refresh-token',
  requestValidationHandler(user_refresh_token_zod_schema),
  AuthController.refreshToken
)

export const AuthRoute = router
