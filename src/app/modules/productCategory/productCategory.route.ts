import requestValidationHandler from '../../middlewares/requestValidationHandler'
import express from 'express'
import authHandler from '../../middlewares/authHandler'
import {
  createProductCategorySchema,
  updateProductCategorySchema,
} from './productCategory.validation'
import { ProductCategoryController } from './productCategory.controller'

const router = express.Router()

router.post(
  '/',
  requestValidationHandler(createProductCategorySchema),
  authHandler(),
  ProductCategoryController.createCategory
)

router.get('/', ProductCategoryController.getCategory)

router.put(
  '/:id',
  requestValidationHandler(updateProductCategorySchema),
  authHandler(),
  ProductCategoryController.updateCategory
)

router.delete('/:id', authHandler(), ProductCategoryController.deleteCategory)
export const ProductCategoryRoute = router
