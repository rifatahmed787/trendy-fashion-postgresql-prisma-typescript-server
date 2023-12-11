import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { PaymentServices } from './payment.services'
import { PrismaClient } from '@prisma/client'
import config from '../../../config'
const prisma = new PrismaClient()

const createPayment = catchAsync(async (req: Request, res: Response) => {
  const { email, id } = req.logged_in_user
  const userId = parseInt(id)

  const result = await PaymentServices.createPayment(email, userId)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Payment created successfully',
  })
})

const webhook = async (req: Request, res: Response) => {
  const endpointSecret = config.webhook_endpoint
  let data
  let evenType
  if (endpointSecret) {
    try {
      data = req.body.data.object
      evenType = req.body.type

      console.log('this is full payment data', data)
      console.log('this is receipt url', data.receipt_url)

      if (evenType === 'checkout.session.completed') {
        const email = await prisma.user.findFirst({
          where: {
            email: data.customer_details.email,
          },
        })
        const cartInfo = await prisma.cartProduct.findMany({
          where: {
            userId: email?.id,
            paymentStatus: true,
            orderStatus: false,
          },
        })

        console.log('this is receipr url', data.receipt_url)

        if (cartInfo.length > 0) {
          for (const cart of cartInfo) {
            await prisma.cartProduct.updateMany({
              where: {
                id: cart.id,
              },
              data: { orderStatus: true, receipt_url: data.receipt_url },
            })
          }
        }
      } else {
        // console.log(data)
      }
    } catch (err) {
      console.log('weebhook error', err)
      res.status(400).send({ status: false, WebhookError: `${err}` })
      return
    }
  }
}

export const PaymentController = {
  createPayment,
  webhook,
}
