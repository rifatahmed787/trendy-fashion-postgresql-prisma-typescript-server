import express from 'express'
import { UserController } from './user.controller'

import authHandler from '../../middlewares/authHandler'

const router = express.Router()

router.get('/allusers', UserController.allUsers)
router.get('/userinfo', authHandler(), UserController.userProfile)
router.post('/address', authHandler(), UserController.createAddress)
router.patch('/updateuser', authHandler(), UserController.updatedUser)
router.put('/:id', authHandler(), UserController.update_user_superadmin)
router.put('/:id', authHandler(), UserController.update_user_admin)

export const UserRoute = router
