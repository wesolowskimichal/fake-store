import axios from 'axios'
import { __NO_PROPS } from '../../IApiComponent'
import { ApiResponse, Category } from '../../../../types/Types'
import { ApiComponent } from '../../ApiComponent'
import { CategoriesId } from './CategoriesId'

type __GET_PROPS = { limit: number }
type __POST_PROPS = {
  name: Category['name']
  image: Category['image']
}
type __PUT_PROPS = __NO_PROPS
type __PATCH_PROPS = __NO_PROPS
type __DEL_PROPS = __NO_PROPS

export class Categories extends ApiComponent<
  Category[] | Category,
  __GET_PROPS,
  __POST_PROPS,
  __PUT_PROPS,
  __PATCH_PROPS,
  __DEL_PROPS
> {
  constructor() {
    super('categories')
  }

  public id(id: Category['id']): CategoriesId {
    return new CategoriesId(`${this.url}`, id)
  }

  get = async ({ limit }: __GET_PROPS): Promise<ApiResponse<Category[]>> => {
    const getProducts = async () => {
      const response = await axios.get(`${this.url}?limit=${limit}`)
      return response.data
    }

    return super.apiRequest(getProducts, 'get: categories')
  }

  post = async ({ name, image }: __POST_PROPS): Promise<ApiResponse<Category>> => {
    const postProduct = async () => {
      const response = await axios.post(this.url, {
        name: name,
        image: image
      })
      return response.data
    }

    return super.apiRequest(postProduct, 'post: category')
  }

  put = undefined
  patch = undefined
  del = undefined
}
