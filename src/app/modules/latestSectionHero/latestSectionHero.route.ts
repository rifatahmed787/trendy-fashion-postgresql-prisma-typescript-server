import requestValidationHandler from '../../middlewares/requestValidationHandler'
import express from 'express'
import authHandler from '../../middlewares/authHandler'
import {
  createLatestSectionHeroSchema,
  updateLatestSectionHeroSchema,
} from './latestSectionHero.validation'
import { LatestHeroController } from './latestSectionHero.controller'

const router = express.Router()

router.post(
  '/',
  requestValidationHandler(createLatestSectionHeroSchema),
  authHandler(),
  LatestHeroController.createLatestHero
)

router.get('/', LatestHeroController.getLatestHero)

router.put(
  '/:id',
  requestValidationHandler(updateLatestSectionHeroSchema),
  authHandler(),
  LatestHeroController.updateLatestHero
)
export const LatestHeroRoute = router
