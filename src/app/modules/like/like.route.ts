import express from 'express'
import requestValidationHandler from '../../middlewares/requestValidationHandler'
import { like_post_zod_schema } from './like.validation'
import authHandler from '../../middlewares/authHandler'
import { LikeController } from './like.controller'

const router = express.Router()

router.post(
  '/',
  requestValidationHandler(like_post_zod_schema),
  authHandler(),
  LikeController.postLike
)

export const LikeRoute = router
