import requestValidationHandler from '../../middlewares/requestValidationHandler'
import { ReviewController } from './review.controller'
import express from 'express'
import {
  review_edit_zod_schema,
  review_post_zod_schema,
} from './review.validation'
import authHandler from '../../middlewares/authHandler'

const router = express.Router()

router.post(
  '/',
  requestValidationHandler(review_post_zod_schema),
  authHandler(),
  ReviewController.postReview
)

router.get('/:id', ReviewController.get_single_review)

router.put(
  '/:id',
  requestValidationHandler(review_edit_zod_schema),
  authHandler(),
  ReviewController.updateReview
)

router.delete('/:id', authHandler(), ReviewController.deleteReview)

export const ReviewRoute = router
