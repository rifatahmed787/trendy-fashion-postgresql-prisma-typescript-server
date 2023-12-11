import { CartProduct, PrismaClient } from '@prisma/client'
import Stripe from 'stripe'
import config from '../../../config'

const prisma = new PrismaClient()
const stripeSK = config.stripe_sk

if (!stripeSK) {
  throw new Error('Stripe secret key is not set in environment variables')
}

const stripeInstance = new Stripe(stripeSK, { apiVersion: '2023-10-16' })

const createPayment = async (
  email: string,
  userId: number,
  shipping: string
): Promise<Stripe.Checkout.Session> => {
  const carts: CartProduct[] = []
  const cartInfo = await prisma.cartProduct.findMany({
    where: {
      userId: userId,
    },
    include: {
      product: true,
      user: true,
    },
  })

  if (!cartInfo.length) {
    throw {
      statusCode: 400,
      success: false,
      message: 'Product not found',
    }
  }

  for (const cart of cartInfo) {
    if (cart.orderStatus === false) {
      carts.push(cart)
    }
  }

  let totalPrice = 0

  for (const cart of carts) {
    totalPrice = totalPrice + cart.totalPrice
  }

  if (shipping === '1') {
    totalPrice = totalPrice + 10
  } else if (shipping === '2') {
    totalPrice = totalPrice + 8
  } else if (shipping === '5') {
    totalPrice = totalPrice + 5
  }

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
    await prisma.cartProduct.updateMany({
      where: {
        id: cart.id,
      },
      data: { paymentStatus: true },
    })
  }

  return session
}

export const PaymentServices = {
  createPayment,
}
