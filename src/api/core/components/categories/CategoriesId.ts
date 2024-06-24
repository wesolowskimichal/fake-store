import axios from 'axios'
import { ApiResponse, Category } from '../../../../types/Types'
import { __NO_PROPS } from '../../IApiComponent'
import { IdComponent } from '../IdComponent'
import { Products } from './products/Products'

type __POST_PROPS = __NO_PROPS
type __PUT_PROPS = {
  name: Category['name']
  image: Category['image']
}
type __PATCH_PROPS = __NO_PROPS
type __DEL_PROPS = __NO_PROPS

export class CategoriesId extends IdComponent<Category, __POST_PROPS, __PUT_PROPS, __PATCH_PROPS, __DEL_PROPS> {
  public products: Products

  constructor(parentUrl: string, id: Category['id']) {
    super(parentUrl, id)
    this.products = new Products(`${this.url}`)
  }

  put = async ({ name, image }: __PUT_PROPS): Promise<ApiResponse<Category>> => {
    const putProduct = async () => {
      const response = await axios.put(this.url, {
        name: name,
        image: image
      })
      return response.data
    }

    return super.apiRequest(putProduct, 'put: category')
  }

  del = async (): Promise<ApiResponse<null>> => {
    const deleteUser = async () => {
      const response = await axios.delete(this.url)
      return response.data
    }
    return super.apiRequest(deleteUser, 'delete: category')
  }

  patch = undefined
  post = undefined
}
