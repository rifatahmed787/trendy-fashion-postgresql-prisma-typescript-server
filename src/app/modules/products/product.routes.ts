import express from 'express'
import requestValidationHandler from '../../middlewares/requestValidationHandler'

import {
  create_cloth_zod_schema,
  update_cloth_zod_schema,
} from './product.validation'
import authHandler from '../../middlewares/authHandler'
import { ClothController } from './product.controller'

const router = express.Router()

router.post(
  '/',
  authHandler(),
  requestValidationHandler(create_cloth_zod_schema),
  ClothController.createCloth
)

router.get('/allproducts', ClothController.allCloths)
router.get('/latest-ten', ClothController.latestTenCloths)
router.get('/best-seller', ClothController.bestSellingCloths)
router.get('/unique-filter-items', ClothController.uniqueFilteringData)

router.get('/:id', ClothController.clothDetails)
router.get('/:productId/relatedProducts', ClothController.getRelatedProducts)

router.patch(
  '/:id',
  authHandler(),
  requestValidationHandler(update_cloth_zod_schema),
  ClothController.updateCloth
)
router.delete('/:id', authHandler(), ClothController.deleteCloth)

export const ClothRoute = router
