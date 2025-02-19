import express from 'express'
import { UserRoute } from '../app/modules/user/user.route'
import { AuthRoute } from '../app/modules/auth/auth.route'
import { UploadRoute } from '../app/modules/cloudinary/upload.route'
import { ProductRoute } from '../app/modules/products/product.routes'
import { ReviewRoute } from '../app/modules/review/review.route'
import { WishRoute } from '../app/modules/wish/wish.route'
import { CartRoute } from '../app/modules/cart/cart.route'
import { AccordianRouter } from '../app/modules/accordian/accordian.route'
import { PaymentRouter } from '../app/modules/payment/payment.route'
import { OrderRouter } from '../app/modules/order/order.route'
import { CommentRoute } from '../app/modules/comment/comment.route'
import { LikeRoute } from '../app/modules/like/like.route'
import { BlogRoute } from '../app/modules/blog/blog.route'
import { SliderRoute } from '../app/modules/slider/slider.route'
import { ModalRoute } from '../app/modules/modal/modal.route'
import { ServiceRoute } from '../app/modules/service/service.route'
import { ProductCategoryRoute } from '../app/modules/productCategory/productCategory.route'
import { SliderHeroRoute } from '../app/modules/sliderHero/sliderHero.route'
import { LatestHeroRoute } from '../app/modules/latestSectionHero/latestSectionHero.route'
import { HeroRoute } from '../app/modules/heroSection/heroSection.route'
import { DealRoute } from '../app/modules/dealSection/dealSection.route'
import { ProductColorRoute } from '../app/modules/productColor/productColor.route'
import { ProductSizeRoute } from '../app/modules/productSize/productSize.route'
import { ProductTagRoute } from '../app/modules/productTag/productTag.route'
import { ProductTypeRoute } from '../app/modules/productType/productType.route'
import { AccordianCategoryRoute } from '../app/modules/accordianCategory/accordianCategory.route'
import { BrandNameRoute } from '../app/modules/brand/brandName.route'

const router = express.Router()

const all_routes = [
  { path: '/auth', router: AuthRoute },
  { path: '/upload', router: UploadRoute },
  { path: '/user', router: UserRoute },
  { path: '/slider', router: SliderRoute },
  { path: '/slider_hero', router: SliderHeroRoute },
  { path: '/modal', router: ModalRoute },
  { path: '/service', router: ServiceRoute },
  { path: '/product_category', router: ProductCategoryRoute },
  { path: '/product_color', router: ProductColorRoute },
  { path: '/product_size', router: ProductSizeRoute },
  { path: '/product_tag', router: ProductTagRoute },
  { path: '/product_type', router: ProductTypeRoute },
  { path: '/brand_name', router: BrandNameRoute },
  { path: '/product', router: ProductRoute },
  { path: '/reviews', router: ReviewRoute },
  { path: '/wish', router: WishRoute },
  { path: '/cart', router: CartRoute },
  { path: '/latest_section', router: LatestHeroRoute },
  { path: '/hero_section', router: HeroRoute },
  { path: '/deal_section', router: DealRoute },
  { path: '/blog', router: BlogRoute },
  { path: '/accordian_category', router: AccordianCategoryRoute },
  { path: '/accordian', router: AccordianRouter },
  { path: '/payment', router: PaymentRouter },
  { path: '/order', router: OrderRouter },
  { path: '/comment', router: CommentRoute },
  { path: '/like', router: LikeRoute },
]

all_routes.map(item => router.use(item.path, item.router))

export default router
