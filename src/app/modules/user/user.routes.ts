import express from 'express'
import { UserController } from './user.controller'

import authHandler from '../../middlewares/authHandler'

const router = express.Router()

router.get('/allusers', UserController.allUsers)
router.get('/:id', authHandler(), UserController.userProfile)

export const UserRoute = router
