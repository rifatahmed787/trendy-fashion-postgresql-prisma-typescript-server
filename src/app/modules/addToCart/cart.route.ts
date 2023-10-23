import requestValidationHandler from '../../middlewares/requestValidationHandler'
import express from 'express'
import authHandler from '../../middlewares/authHandler'
import { cart_zod_schema } from './cart.validation'
import { CartController } from './cart.controller'

const router = express.Router()

router.post(
  '/',
  requestValidationHandler(cart_zod_schema),
  authHandler(),
  CartController.addToCart
)

router.get('/cartdata', authHandler(), CartController.getCart)

router.delete('/:id', authHandler(), CartController.removeFromCart)

export const CartRoute = router
