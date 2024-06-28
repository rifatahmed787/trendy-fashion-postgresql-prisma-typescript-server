import express from 'express'
import requestValidationHandler from '../../middlewares/requestValidationHandler'
import authHandler from '../../middlewares/authHandler'
import { BlogController } from './blog.controller'
import {
  create_category_zod_schema,
  create_post_zod_schema,
  update_category_zod_schema,
} from './blog.validation'

const router = express.Router()

router.post(
  '/category',
  authHandler(),
  requestValidationHandler(create_category_zod_schema),
  BlogController.createBlogCategory
)

router.put(
  '/:id',
  authHandler(),
  requestValidationHandler(update_category_zod_schema),
  BlogController.update_blog_category
)

router.delete('/:id', authHandler(), BlogController.delete_blog_category)
router.post(
  '/',
  authHandler(),
  requestValidationHandler(create_post_zod_schema),
  BlogController.createBlog
)

router.get('/blog-category', BlogController.get_blog_category)
router.get('/allblogs', BlogController.getBlogs)

// router.get('/latest-ten', ClothController.latestTenCloths)
// router.get('/best-seller', ClothController.bestSellingCloths)
// router.get('/unique-filter-items', ClothController.uniqueFilteringData)

// router.get('/:id', ClothController.clothDetails)
// router.get('/:productId/relatedProducts', ClothController.getRelatedProducts)

// router.put(
//   '/:id',
//   authHandler(),
//   requestValidationHandler(update_cloth_zod_schema),
//   ClothController.updateCloth
// )
// router.delete('/:id', authHandler(), ClothController.deleteCloth)

export const BlogRoute = router
