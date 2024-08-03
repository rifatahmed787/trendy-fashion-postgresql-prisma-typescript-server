import express from 'express'
import requestValidationHandler from '../../middlewares/requestValidationHandler'
import {
  create_accordian_validation,
  update_accordian_validation,
} from './accordian.validation'
import { AccordianController } from './accordian.controller'
import authHandler from '../../middlewares/authHandler'

const router = express.Router()

router.post(
  '/',
  authHandler(),
  requestValidationHandler(create_accordian_validation),
  AccordianController.productAccordian
)

router.get('/', AccordianController.getProductAccordian)
router.put(
  '/',
  authHandler(),
  requestValidationHandler(update_accordian_validation),
  AccordianController.updateAccordian
)
router.delete('/', authHandler(), AccordianController.deleteAccordian)

export const AccordianRouter = router
