import requestValidationHandler from '../../middlewares/requestValidationHandler'
import express from 'express'
import authHandler from '../../middlewares/authHandler'
import {
  createDealSectionSchema,
  updateDealSectionSchema,
} from './dealSection.validation'
import { DealController } from './dealSection.controller'

const router = express.Router()

router.post(
  '/',
  requestValidationHandler(createDealSectionSchema),
  authHandler(),
  DealController.createDeal
)

router.get('/', DealController.getDeal)

router.put(
  '/:id',
  requestValidationHandler(updateDealSectionSchema),
  authHandler(),
  DealController.updateDeal
)
export const DealRoute = router
