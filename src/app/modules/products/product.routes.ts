import express from 'express'
import requestValidationHandler from '../../middlewares/requestValidationHandler'

import authHandler from '../../middlewares/authHandler'
import { ProductController } from './product.controller'
import { createProductSchema, updateProductSchema } from './product.validation'

const router = express.Router()

router.post(
  '/',
  authHandler(),
  requestValidationHandler(createProductSchema),
  ProductController.createProduct
)

router.get('/allproducts', ProductController.allProducts)
router.get('/latest-ten', ProductController.latestTenProducts)
router.get('/best-seller', ProductController.bestSellingProducts)
router.get('/unique-filter-items', ProductController.uniqueFilteringData)

router.get('/:id', ProductController.productDetails)

router.patch(
  '/:id',
  authHandler(),
  requestValidationHandler(updateProductSchema),
  ProductController.updateProduct
)
router.delete('/:id', authHandler(), ProductController.deleteProduct)

export const ProductRoute = router
