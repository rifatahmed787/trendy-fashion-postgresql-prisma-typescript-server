import express from 'express'
import { OrderController } from './order.controller'
import authHandler from '../../middlewares/authHandler'

const router = express.Router()

router.get('/orderbyid', authHandler(), OrderController.getOrderProductByUser)

export const OrderRouter = router
