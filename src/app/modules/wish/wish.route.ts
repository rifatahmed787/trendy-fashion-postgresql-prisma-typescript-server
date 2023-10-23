import requestValidationHandler from '../../middlewares/requestValidationHandler'
import { WishController } from './wish.controller'

import express from 'express'
import authHandler from '../../middlewares/authHandler'
import { wish_list_zod_schema } from './wish.validation'

const router = express.Router()

router.post(
  '/',
  requestValidationHandler(wish_list_zod_schema),
  authHandler(),
  WishController.addToWish
)

router.get('/wishlist', authHandler(), WishController.getWishList)

router.delete('/:id', authHandler(), WishController.removeFromWish)

export const WishRoute = router
