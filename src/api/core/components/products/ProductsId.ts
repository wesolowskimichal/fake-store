import axios from 'axios'
import { ApiResponse, Product } from '../../../../types/Types'
import { __NO_PROPS } from '../../IApiComponent'
import { IdComponent } from '../IdComponent'

type __POST_PROPS = __NO_PROPS
type __PUT_PROPS = Product
type __PATCH_PROPS = __NO_PROPS
type __DEL_PROPS = __NO_PROPS

export class ProductId extends IdComponent<Product, __POST_PROPS, __PUT_PROPS, __PATCH_PROPS, __DEL_PROPS> {
  constructor(parentUrl: string, id: Product['id']) {
    super(parentUrl, id)
  }

  put = async (product: __PUT_PROPS): Promise<ApiResponse<Product>> => {
    const putProduct = async () => {
      const response = await axios.put(this.url, {
        title: product.title,
        price: product.price,
        description: product.description,
        images: product.images,
        categoryId: product.category.id
      })
      return response.data
    }

    return super.apiRequest(putProduct, 'put: product')
  }

  del = async (): Promise<ApiResponse<null>> => {
    const deleteUser = async () => {
      const response = await axios.delete(this.url)
      return response.data
    }
    return super.apiRequest(deleteUser, 'delete: product')
  }

  patch = undefined
  post = undefined
}
