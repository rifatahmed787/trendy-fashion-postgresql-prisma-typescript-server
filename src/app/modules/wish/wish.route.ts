import requestValidationHandler from '../../middlewares/requestValidationHandler'
import { WishController } from './wish.controller'

import express from 'express'
import { review_post_zod_schema } from './wish.validation'
import authHandler from '../../middlewares/authHandler'

const router = express.Router()

router.post(
  '/',
  requestValidationHandler(review_post_zod_schema),
  authHandler(),
  WishController.addToWish
)

router.get('/', authHandler(), WishController.getWishList)

router.delete(
  '/:id',
  requestValidationHandler(review_post_zod_schema),
  authHandler(),
  WishController.removeFromWish
)

export const WishRoute = router
