import express from 'express'
import { PaymentController } from './payment.controller'
import authHandler from '../../middlewares/authHandler'

const router = express.Router()

router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  PaymentController.webhook
)
router.post('/pay', authHandler(), PaymentController.createPayment)

export const PaymentRouter = router
