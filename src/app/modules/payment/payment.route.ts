import express from 'express'

import authHandler from '../../middlewares/authHandler'
import { PaymentController } from './payment.controllers'

const router = express.Router()

router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  PaymentController.webhook
)
router.post('/pay', authHandler(), PaymentController.createPayment)

export const PaymentRouter = router
