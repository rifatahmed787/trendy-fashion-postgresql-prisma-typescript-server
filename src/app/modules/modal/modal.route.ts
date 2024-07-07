import requestValidationHandler from '../../middlewares/requestValidationHandler'
import express from 'express'
import authHandler from '../../middlewares/authHandler'
import { createModalImgSchema, updateModalImgSchema } from './modal.validation'
import { modalController } from './modal.controller'

const router = express.Router()

router.post(
  '/',
  requestValidationHandler(createModalImgSchema),
  authHandler(),
  modalController.createmodal
)

router.get('/', modalController.getModal)

router.put(
  '/:id',
  requestValidationHandler(updateModalImgSchema),
  authHandler(),
  modalController.updatemodal
)
export const ModalRoute = router
