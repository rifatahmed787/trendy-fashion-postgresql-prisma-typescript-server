import requestValidationHandler from '../../middlewares/requestValidationHandler'
import express from 'express'
import authHandler from '../../middlewares/authHandler'
import { createSliderSchema, updateSliderSchema } from './slider.validation'
import { SliderController } from './slider.controller'

const router = express.Router()

router.post(
  '/',
  authHandler(),
  requestValidationHandler(createSliderSchema),
  SliderController.createSlider
)

router.get('/', SliderController.getSlider)

router.put(
  '/:id',
  requestValidationHandler(updateSliderSchema),
  authHandler(),
  SliderController.updateSlider
)
export const SliderRoute = router
