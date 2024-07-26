import requestValidationHandler from '../../middlewares/requestValidationHandler'
import express from 'express'
import authHandler from '../../middlewares/authHandler'

import { ProductTypeController } from './productType.controller'
import {
  productTypeSchema,
  updateProductTypeSchema,
} from './productType.validation'

const router = express.Router()

router.post(
  '/',
  requestValidationHandler(productTypeSchema),
  authHandler(),
  ProductTypeController.createType
)

router.get('/', authHandler(), ProductTypeController.getType)

router.put(
  '/:id',
  requestValidationHandler(updateProductTypeSchema),
  authHandler(),
  ProductTypeController.updateType
)

router.delete('/:id', authHandler(), ProductTypeController.deleteType)
export const ProductTypeRoute = router
