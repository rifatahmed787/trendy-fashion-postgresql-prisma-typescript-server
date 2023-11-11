import express from 'express'
import requestValidationHandler from '../../middlewares/requestValidationHandler'
import { accordian_validation } from './accordian.validation'
import { AccordianController } from './accordian.controller'
import authHandler from '../../middlewares/authHandler'

const router = express.Router()

router.post(
  '/productfaq',
  authHandler(),
  requestValidationHandler(accordian_validation),
  AccordianController.productAccordian
)

router.get('/productfaq', AccordianController.getProductAccordian)

export const AccordianRouter = router
