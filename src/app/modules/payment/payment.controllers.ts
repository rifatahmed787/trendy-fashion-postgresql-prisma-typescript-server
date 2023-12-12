import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { PaymentServices } from './payment.services'
import { PrismaClient } from '@prisma/client'
import config from '../../../config'
import Stripe from 'stripe'
const prisma = new PrismaClient()
const stripeSK = config.stripe_sk

if (!stripeSK) {
  throw new Error('Stripe secret key is not set in environment variables')
}
const stripeInstance = new Stripe(stripeSK, { apiVersion: '2023-10-16' })

const createPayment = catchAsync(async (req: Request, res: Response) => {
  const { email, id } = req.logged_in_user
  const shipping = req.query.shipping as string
  const userId = parseInt(id)

  const result = await PaymentServices.createPayment(email, userId, shipping)

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
        const payment = await stripeInstance.paymentIntents.retrieve(
          data.payment_intent
        )

        let recieptUrl
        if (payment.latest_charge) {
          const charge = await stripeInstance.charges.retrieve(
            payment.latest_charge.toString()
          )

          if (charge.receipt_url) {
            recieptUrl = charge.receipt_url
          }
        }

        if (cartInfo.length > 0 && recieptUrl) {
          for (const cart of cartInfo) {
            await prisma.cartProduct.updateMany({
              where: {
                id: cart.id,
              },
              data: { orderStatus: true, receipt_url: recieptUrl },
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
