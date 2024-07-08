import requestValidationHandler from '../../middlewares/requestValidationHandler'
import express from 'express'
import authHandler from '../../middlewares/authHandler'
import { createModalImgSchema, updateModalImgSchema } from './modal.validation'
import { ModalController } from './modal.controller'

const router = express.Router()

router.post(
  '/',
  requestValidationHandler(createModalImgSchema),
  authHandler(),
  ModalController.createmodal
)

router.get('/', ModalController.getModal)

router.put(
  '/:id',
  requestValidationHandler(updateModalImgSchema),
  authHandler(),
  ModalController.updatemodal
)
export const ModalRoute = router
