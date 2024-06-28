import express from 'express'
import requestValidationHandler from '../../middlewares/requestValidationHandler'
import {
  comment_edit_zod_schema,
  comment_post_zod_schema,
} from './comment.validation'
import authHandler from '../../middlewares/authHandler'
import { CommentController } from './comment.controller'

const router = express.Router()

router.post(
  '/',
  requestValidationHandler(comment_post_zod_schema),
  authHandler(),
  CommentController.postComment
)

router.put(
  '/:id',
  requestValidationHandler(comment_edit_zod_schema),
  authHandler(),
  CommentController.updateComment
)

router.delete('/:id', authHandler(), CommentController.deleteComment)

export const CommentRoute = router
