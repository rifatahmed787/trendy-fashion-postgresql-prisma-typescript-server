import requestValidationHandler from '../../middlewares/requestValidationHandler'
import express from 'express'
import authHandler from '../../middlewares/authHandler'
import {
  createAccordianCategorySchema,
  updateAccordianCategorySchema,
} from './accordianCategory.validation'
import { AccordianCategoryController } from './accordianCategory.controller'

const router = express.Router()

router.post(
  '/',
  requestValidationHandler(createAccordianCategorySchema),
  authHandler(),
  AccordianCategoryController.createCategory
)

router.get('/', AccordianCategoryController.getCategory)

router.put(
  '/:id',
  requestValidationHandler(updateAccordianCategorySchema),
  authHandler(),
  AccordianCategoryController.updateCategory
)

router.delete('/:id', authHandler(), AccordianCategoryController.deleteCategory)
export const AccordianCategoryRoute = router
