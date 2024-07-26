import requestValidationHandler from '../../middlewares/requestValidationHandler'
import express from 'express'
import authHandler from '../../middlewares/authHandler'

import { ProductSizeController } from './productSize.controller'
import {
  productSizeSchema,
  updateProductSizeSchema,
} from './productSize.validation'

const router = express.Router()

router.post(
  '/',
  requestValidationHandler(productSizeSchema),
  authHandler(),
  ProductSizeController.createSize
)

router.get('/', authHandler(), ProductSizeController.getSize)

router.put(
  '/:id',
  requestValidationHandler(updateProductSizeSchema),
  authHandler(),
  ProductSizeController.updateSize
)

router.delete('/:id', authHandler(), ProductSizeController.deleteSize)
export const ProductSizeRoute = router
