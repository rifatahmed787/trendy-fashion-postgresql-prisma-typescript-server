import express from 'express'
import requestValidationHandler from '../../middlewares/requestValidationHandler'
import authHandler from '../../middlewares/authHandler'
import { BlogController } from './blog.controller'
import {
  create_category_zod_schema,
  create_post_zod_schema,
  update_category_zod_schema,
  update_post_zod_schema,
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
router.get('/:id', BlogController.get_single_blog)
router.put(
  '/:id',
  requestValidationHandler(update_post_zod_schema),
  authHandler(),
  BlogController.updateBlog
)
router.delete('/:id', authHandler(), BlogController.deleteBlog)

export const BlogRoute = router
