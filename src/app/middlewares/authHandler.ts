/* eslint-disable no-unused-expressions */

import { Request, Response, NextFunction } from 'express'
import ApiError from '../errors/ApiError'
import httpStatus from 'http-status'

import { Secret } from 'jsonwebtoken'
import { jwtHelper } from '../../helpers/jwtHelper'
import config from '../../config'

// requestValidationHandler
const authHandler =
  () =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      //   check authorization
      const authHeader = req.headers?.authorization

      const token = authHeader?.split(' ')[1]

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized')
      }

      const decoded_user = jwtHelper.verify_token(
        token,
        config.jwt.access_token_secret as Secret
      )
      const { id, email } = decoded_user

      // set in req
      req.logged_in_user = decoded_user

      //   check if the user is authenticated
      if (!id) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized')
      }

      if (!email) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized')
      }

      // // check if the user has the required role
      // if (role !== 'admin') {
      //   throw new ApiError(
      //     httpStatus.FORBIDDEN,
      //     'Only admin users can create accordions'
      //   )
      // }

      next()
    } catch (error) {
      next(error)
    }
  }
export default authHandler
