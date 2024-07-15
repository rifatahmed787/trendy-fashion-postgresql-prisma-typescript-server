import requestValidationHandler from '../../middlewares/requestValidationHandler'
import express from 'express'
import authHandler from '../../middlewares/authHandler'
import { createServiceSchema, updateServiceSchema } from './service.validation'
import { ServiceController } from './service.controller'

const router = express.Router()

router.post(
  '/',
  requestValidationHandler(createServiceSchema),
  authHandler(),
  ServiceController.createService
)

router.get('/', ServiceController.getService)
router.get('/:id', ServiceController.getSingleService)

router.put(
  '/:id',
  requestValidationHandler(updateServiceSchema),
  authHandler(),
  ServiceController.updateService
)
export const ServiceRoute = router
