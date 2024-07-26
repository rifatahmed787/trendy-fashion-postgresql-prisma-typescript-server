import requestValidationHandler from '../../middlewares/requestValidationHandler'
import express from 'express'
import authHandler from '../../middlewares/authHandler'

import { ProductTagController } from './productTag.controller'
import {
  productTagSchema,
  updateProductTagSchema,
} from './productTag.validation'

const router = express.Router()

router.post(
  '/',
  requestValidationHandler(productTagSchema),
  authHandler(),
  ProductTagController.createTag
)

router.get('/', authHandler(), ProductTagController.getTag)

router.put(
  '/:id',
  requestValidationHandler(updateProductTagSchema),
  authHandler(),
  ProductTagController.updateTag
)

router.delete('/:id', authHandler(), ProductTagController.deleteTag)
export const ProductTagRoute = router
