import { PrismaClient } from '@prisma/client'
import Stripe from 'stripe'
import { Request, Response } from 'express'
import config from '../../../config'
import catchAsync from '../../../shared/catchAsync'

const prisma = new PrismaClient()
const stripeSK = config.stripe_sk

if (!stripeSK) {
  throw new Error('Stripe secret key is not set in environment variables')
}

const stripeInstance = new Stripe(stripeSK, { apiVersion: '2023-10-16' })

const createPayment = catchAsync(async (req: Request, res: Response) => {
  const { email, id } = req.logged_in_user
  const userId = parseInt(id)
  console.log(userId)

  try {
    const carts: any[] = []
    const cartInfo = await prisma.cartProduct.findMany({
      where: {
        userId: userId,
      },
      include: {
        product: true,
        user: true,
      },
    })

    console.log('cart info lenght', cartInfo.length)

    if (!cartInfo.length) {
      return res.status(400).send({
        success: false,
        message: 'Product not found',
      })
    }

    for (const cart of cartInfo) {
      console.log(cart)
      if (cart.orderStatus === false) {
        carts.push(cart)
      }
    }

    let totalPrice = 0

    console.log('carts length', carts.length)

    for (const cart of carts) {
      totalPrice = totalPrice + cart.totalPrice
    }

    console.log(totalPrice)

    const amount = Number((totalPrice * 100).toFixed(2))
    const product = await stripeInstance.products.create({
      name: 'Trendy_fashion Products',
    })

    const price = await stripeInstance.prices.create({
      unit_amount: amount,
      currency: 'usd',
      product: product.id,
    })

    let customerId: string
    const existingCustomer = await stripeInstance.customers.list({ email })

    if (existingCustomer?.data?.length) {
      customerId = existingCustomer.data[0].id
    } else {
      const customer = await stripeInstance.customers.create({
        email,
        description: 'new customer',
      })

      customerId = customer.id
    }

    const session = await stripeInstance.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer: customerId,
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      success_url: 'http://localhost:3000/payment/success',
      cancel_url: 'http://localhost:3000/payment/failed',
    })

    for (const cart of carts) {
      const updateStatus = await prisma.cartProduct.updateMany({
        where: {
          id: cart.id,
        },
        data: { paymentStatus: true },
      })
      console.log(updateStatus)
    }

    res.status(200).send({
      success: true,
      session: session,
      message: 'Payments created successfully',
    })
  } catch (error) {
    console.error(error)
    res.status(500).send({
      success: false,
      message: 'Internal server error',
    })
  }
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
        console.log(data)
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
