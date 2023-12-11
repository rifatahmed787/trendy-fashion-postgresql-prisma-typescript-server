import express from 'express'
import { UserRoute } from '../app/modules/user/user.routes'
import { AuthRoute } from '../app/modules/auth/auth.route'
import { UploadRoute } from '../app/modules/cloudinary/upload.route'
import { ClothRoute } from '../app/modules/products/product.routes'
import { ReviewRoute } from '../app/modules/review/review.route'
import { WishRoute } from '../app/modules/wish/wish.route'
import { CartRoute } from '../app/modules/cart/cart.route'
import { AccordianRouter } from '../app/modules/accordian/accordian.route'
import { PaymentRouter } from '../app/modules/payment/payment.route'
import { OrderRouter } from '../app/modules/order/order.route'
// import { BlogRoute } from '../app/modules/blog/blog.routes'

const router = express.Router()

const all_routes = [
  { path: '/auth', router: AuthRoute },
  { path: '/upload', router: UploadRoute },
  { path: '/', router: UserRoute },
  { path: '/user', router: UserRoute },
  { path: '/product', router: ClothRoute },
  { path: '/reviews', router: ReviewRoute },
  { path: '/wish', router: WishRoute },
  { path: '/cart', router: CartRoute },
  // { path: '/blog', router: BlogRoute },
  { path: '/accordian', router: AccordianRouter },
  { path: '/payment', router: PaymentRouter },
  { path: '/order', router: OrderRouter },
]

all_routes.map(item => router.use(item.path, item.router))

export default router
