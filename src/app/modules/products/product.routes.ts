import express from 'express'
import requestValidationHandler from '../../middlewares/requestValidationHandler'

import {
  create_product_zod_schema,
  update_product_zod_schema,
} from './product.validation'
import authHandler from '../../middlewares/authHandler'
import { ProductController } from './product.controller'

const router = express.Router()

router.post(
  '/',
  authHandler(),
  requestValidationHandler(create_product_zod_schema),
  ProductController.createProduct
)

router.get('/allproducts', ProductController.allProducts)
router.get('/latest-ten', ProductController.latestTenProducts)
router.get('/best-seller', ProductController.bestSellingProducts)
router.get('/unique-filter-items', ProductController.uniqueFilteringData)

router.get('/:id', ProductController.productDetails)
router.get('/:productId/relatedProducts', ProductController.getRelatedProducts)

router.patch(
  '/:id',
  authHandler(),
  requestValidationHandler(update_product_zod_schema),
  ProductController.updateProduct
)
router.delete('/:id', authHandler(), ProductController.deleteProduct)

export const ProductRoute = router
