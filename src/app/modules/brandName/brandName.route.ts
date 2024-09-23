// import requestValidationHandler from '../../middlewares/requestValidationHandler'
// import express from 'express'
// import authHandler from '../../middlewares/authHandler'
// import {
//   createBrandNameSchema,
//   updateBrandNameSchema,
// } from './brandName.validation'
// import { BrandNameController } from './brandName.controller'

// const router = express.Router()

// router.post(
//   '/',
//   requestValidationHandler(createBrandNameSchema),
//   authHandler(),
//   BrandNameController.createBrandName
// )

// router.get('/', authHandler(), BrandNameController.getBrandName)

// router.put(
//   '/:id',
//   requestValidationHandler(updateBrandNameSchema),
//   authHandler(),
//   BrandNameController.updateBrandName
// )

// router.delete('/:id', authHandler(), BrandNameController.deleteBrandName)
// export const BrandNameRoute = router
