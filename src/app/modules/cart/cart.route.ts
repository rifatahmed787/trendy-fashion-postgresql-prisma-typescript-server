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
router.get('/all-cart', authHandler(), CartController.getAllCart)
router.put('/accept/:id', authHandler(), CartController.makeAccept)
router.put('/reject/:id', authHandler(), CartController.makeReject)
router.put('/ongoing/:id', authHandler(), CartController.makeOngoing)
router.put('/shipping_done/:id', authHandler(), CartController.makeShippingDone)
router.put(
  '/shipping_return/:id',
  authHandler(),
  CartController.makeShippingReturn
)

router.patch('/:id', authHandler(), CartController.updateQuantity)

router.delete('/:id', authHandler(), CartController.removeFromCart)

router.delete('/', authHandler(), CartController.clear_cart)

export const CartRoute = router
