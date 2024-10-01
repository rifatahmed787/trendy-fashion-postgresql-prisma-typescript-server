import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'
import moment from 'moment'
import nodemailer from 'nodemailer'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'

const prisma = new PrismaClient()

// Function to generate OTP
export const generateOTP = async (userIdentifier: string) => {
  const otp = crypto.randomInt(100000, 999999).toString()
  const expiration = moment().add(1, 'minute').toDate()

  // Save OTP to the database
  await prisma.oTP.create({
    data: {
      otp,
      expiration,
      userIdentifier,
    },
  })

  // Send OTP (via Email)
  await sendOtpEmail(userIdentifier, otp)

  return { message: 'OTP sent successfully!' }
}

// Function to verify OTP
export const verifyOTP = async (userIdentifier: string, otp: string) => {
  const storedOtp = await prisma.oTP.findFirst({
    where: {
      userIdentifier: userIdentifier.toLowerCase(),
      otp,
    },
  })

  if (!storedOtp) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid OTP')
  }

  // Check if OTP is expired
  if (moment(storedOtp.expiration).isBefore(moment())) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'OTP expired')
  }

  // OTP verified successfully
  return { success: true, message: 'OTP verified successfully' }
}

// Helper function to send OTP via email (using Nodemailer)
const sendOtpEmail = async (email: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const mailOptions = {
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It is valid for 1 minute.`,
  }

  return transporter.sendMail(mailOptions)
}
