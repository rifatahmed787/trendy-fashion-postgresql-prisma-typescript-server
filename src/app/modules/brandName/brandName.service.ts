// import { PrismaClient, ProductBrand, Role, Prisma } from '@prisma/client'
// import { JwtPayload } from 'jsonwebtoken'
// import ApiError from '../../errors/ApiError'
// import httpStatus from 'http-status'
// import { IPagination } from '../../../interfaces/pagination'
// import { pagination_map } from '../../../helpers/pagination'

// const prisma = new PrismaClient()

// const createBrandName = async (
//   Type_data: ProductBrand,
//   user: JwtPayload
// ): Promise<ProductBrand | null> => {
//   // Check if the user is an admin
//   if (user?.role !== Role.ADMIN) {
//     throw new ApiError(httpStatus.FORBIDDEN, 'Only admin users can create Type')
//   }

//   const createType = await prisma.productBrand.create({
//     data: Type_data,
//   })
//   return createType
// }

// const getBrandName = async (
//   pagination_data: Partial<IPagination>,
//   search: string,
//   user: JwtPayload
// ): Promise<{meta: { page: number; limit: number; total: number }
//  data:ProductBrand[]}> => {
//   const { page, limit, skip, sortObject } = pagination_map(pagination_data)
//   // Check if the user is an admin
//   if (user?.role !== Role.ADMIN) {
//     throw new ApiError(
//       httpStatus.FORBIDDEN,
//       'Only admin users can get the Type'
//     )
//   }

//   // Count the total number of brands based on filters
//   const total = await prisma.productBrand.count({
//     where: {
//       AND: [
//         search
//           ? {
//               OR: [
//                 {
//                   brandName: {
//                     contains: search,
//                     mode: Prisma.QueryMode.insensitive,
//                   },
//                 },
//               ],
//             }
//           : {},
//       ],
//     },
//   })

//   // Fetch category with filters, pagination, and sorting
//   const brands = await prisma.productBrand.findMany({
//     where: {
//       AND: [
//         search
//           ? {
//               OR: [
//                 {
//                   brandName: {
//                     contains: search,
//                     mode: Prisma.QueryMode.insensitive,
//                   },
//                 },
//               ],
//             }
//           : {},
//       ],
//     },
//     orderBy: sortObject || { id: 'asc' },
//     skip: skip,
//     take: limit,
//   })

//   return {
//     meta: {
//       page: page,
//       limit: limit,
//       total: total,
//     },
//     data: brands,
//   }
// }

// const updateBrandName = async (
//   id: string,
//   Type_data: Partial<ProductBrand>,
//   user: JwtPayload
// ): Promise<ProductBrand | null> => {
//   // Check if the user is an admin or has the necessary permissions
//   if (user.role !== 'ADMIN') {
//     throw new ApiError(
//       httpStatus.FORBIDDEN,
//       'You do not have permission to update Type'
//     )
//   }

//   const existingTypeId = parseInt(id)
//   const existingType = await prisma.productBrand.findUnique({
//     where: {
//       id: existingTypeId,
//     },
//   })

//   if (!existingType) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Type not found')
//   }

//   // Now, update the Type
//   const updateTypeId = parseInt(id)
//   const updated_Type_data = await prisma.productBrand.update({
//     where: {
//       id: updateTypeId,
//     },
//     data: Type_data,
//   })

//   return updated_Type_data
// }

// const deleteBrandName = async (
//   id: string,
//   user: JwtPayload
// ): Promise<ProductBrand | null> => {
//   // Check if the user is an admin or has the necessary permissions
//   if (user.role !== 'ADMIN') {
//     throw new ApiError(
//       httpStatus.FORBIDDEN,
//       'You do not have permission to delete Type'
//     )
//   }

//   const existingTypeId = parseInt(id)
//   const existingType = await prisma.productBrand.findUnique({
//     where: {
//       id: existingTypeId,
//     },
//   })

//   if (!existingType) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Type not found')
//   }

//   // Now, delete the Type
//   const deleteTypeId = parseInt(id)

//   const deleteType = await prisma.productBrand.delete({
//     where: {
//       id: deleteTypeId,
//     },
//   })

//   return deleteType
// }

// export const BrandNameService = {
//   createBrandName,
//   getBrandName,
//   updateBrandName,
//   deleteBrandName,
// }
