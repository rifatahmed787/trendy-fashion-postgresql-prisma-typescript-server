import express from 'express'
import { UserController } from './user.controller'

import authHandler from '../../middlewares/authHandler'

const router = express.Router()

router.get('/allusers', UserController.allUsers)
router.get('/userinfo', authHandler(), UserController.userProfile)
router.post('/address', authHandler(), UserController.createAddress)
router.patch('/updateuser', authHandler(), UserController.updatedUser)

export const UserRoute = router
