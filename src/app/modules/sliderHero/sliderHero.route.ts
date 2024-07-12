import requestValidationHandler from '../../middlewares/requestValidationHandler'
import express from 'express'
import authHandler from '../../middlewares/authHandler'
import {
  createSliderHeroSchema,
  updateSliderHeroSchema,
} from './sliderHero.validation'
import { SliderHeroController } from './sliderHero.controller'

const router = express.Router()

router.post(
  '/',
  requestValidationHandler(createSliderHeroSchema),
  authHandler(),
  SliderHeroController.createSliderHero
)

router.get('/', SliderHeroController.getSliderHero)

router.put(
  '/:id',
  requestValidationHandler(updateSliderHeroSchema),
  authHandler(),
  SliderHeroController.updateSliderHero
)
export const SliderHeroRoute = router
