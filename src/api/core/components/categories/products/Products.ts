import axios from 'axios'
import { __NO_PROPS } from '../../../IApiComponent'
import { ApiComponent } from '../../../ApiComponent'
import { ApiResponse, Product } from '../../../../../types/Types'

type __GET_PROPS = {
  limit: number
  offset: number
}
type __POST_PROPS = __NO_PROPS
type __PUT_PROPS = __NO_PROPS
type __PATCH_PROPS = __NO_PROPS
type __DEL_PROPS = __NO_PROPS

export class Products extends ApiComponent<
  Product[],
  __GET_PROPS,
  __POST_PROPS,
  __PUT_PROPS,
  __PATCH_PROPS,
  __DEL_PROPS
> {
  constructor(parentUrl: string) {
    super(`${parentUrl}/products`, true)
  }

  get = async ({ limit, offset }: __GET_PROPS): Promise<ApiResponse<Product[]>> => {
    const getProducts = async () => {
      const response = await axios.get(`${this.url}?limit=${limit}&offset=${offset}`)
      return response.data
    }

    return super.apiRequest(getProducts, 'get: category products')
  }

  post = undefined
  put = undefined
  patch = undefined
  del = undefined
}
