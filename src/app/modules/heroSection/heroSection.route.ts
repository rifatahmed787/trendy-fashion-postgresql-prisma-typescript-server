import requestValidationHandler from '../../middlewares/requestValidationHandler'
import express from 'express'
import authHandler from '../../middlewares/authHandler'
import {
  createHeroSectionSchema,
  updateHeroSectionSchema,
} from './heroSection.validation'
import { HeroController } from './heroSection.controller'

const router = express.Router()

router.post(
  '/',
  requestValidationHandler(createHeroSectionSchema),
  authHandler(),
  HeroController.createHero
)

router.get('/', HeroController.getHero)

router.put(
  '/:id',
  requestValidationHandler(updateHeroSectionSchema),
  authHandler(),
  HeroController.updateHero
)
export const HeroRoute = router
