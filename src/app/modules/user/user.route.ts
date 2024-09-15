import express from 'express'
import { UserController } from './user.controller'

import authHandler from '../../middlewares/authHandler'

const router = express.Router()

router.get('/allusers', UserController.allUsers)
router.get('/admin_user', UserController.adminUsers)
router.get('/userinfo', authHandler(), UserController.userProfile)
router.get('/admininfo', authHandler(), UserController.adminProfile)
router.post('/address', authHandler(), UserController.createAddress)
router.patch('/updateuser', authHandler(), UserController.updatedUser)
router.put(
  'superadmin/:id',
  authHandler(),
  UserController.update_user_superadmin
)
router.put('admin/:id', authHandler(), UserController.update_user_admin)
router.delete('/:id', authHandler(), UserController.deleteUser)

export const UserRoute = router
