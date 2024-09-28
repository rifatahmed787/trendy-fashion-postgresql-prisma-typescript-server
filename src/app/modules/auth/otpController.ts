import { Request, Response } from 'express'
import { generateOTP } from './otpService'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'

const sendOtp = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body
  const userIdentifier = email
  const result = await generateOTP(userIdentifier)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'OTP generated successfully',
  })
})

export const OtpController = {
  sendOtp,
}
