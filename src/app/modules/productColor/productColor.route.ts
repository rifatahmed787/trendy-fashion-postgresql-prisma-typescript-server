import requestValidationHandler from '../../middlewares/requestValidationHandler'
import express from 'express'
import authHandler from '../../middlewares/authHandler'
import {
  productColorSchema,
  updateProductColorSchema,
} from './productColor.validation'
import { ProductColorController } from './productColor.controller'

const router = express.Router()

router.post(
  '/',
  requestValidationHandler(productColorSchema),
  authHandler(),
  ProductColorController.createcolor
)

router.get('/', authHandler(), ProductColorController.getcolor)

router.put(
  '/:id',
  requestValidationHandler(updateProductColorSchema),
  authHandler(),
  ProductColorController.updatecolor
)

router.delete('/:id', authHandler(), ProductColorController.deletecolor)
export const ProductColorRoute = router
