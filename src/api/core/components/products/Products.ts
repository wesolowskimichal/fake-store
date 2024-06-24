import axios from 'axios'
import { ApiComponent } from '../../ApiComponent'
import { __NO_PROPS } from '../../IApiComponent'
import { ApiResponse, Category, Product, User } from '../../../../types/Types'
import { ProductId } from './ProductsId'

type __GET_PROPS = {
  limit: number
  offset: number
  filterTitle?: string
  filterMinPrice?: number
  filterMaxPrice?: number
  filterCategory?: Category['id']
}
type __POST_PROPS = Product
type __PUT_PROPS = __NO_PROPS
type __PATCH_PROPS = __NO_PROPS
type __DEL_PROPS = __NO_PROPS

export class Products extends ApiComponent<
  Product[] | Product,
  __GET_PROPS,
  __POST_PROPS,
  __PUT_PROPS,
  __PATCH_PROPS,
  __DEL_PROPS
> {
  constructor() {
    super('products')
  }

  public id(id: User['id']): ProductId {
    return new ProductId(`${this.url}/`, id)
  }

  get = async ({
    limit,
    offset,
    filterTitle,
    filterMinPrice,
    filterMaxPrice,
    filterCategory
  }: __GET_PROPS): Promise<ApiResponse<Product[]>> => {
    const getProducts = async () => {
      let url = `${this.url}?limit=${limit}&offset=${offset}`
      if (filterTitle) url += `&title=${filterTitle}`
      if (filterMinPrice) url += `&price_min=${filterMinPrice}`
      if (filterMaxPrice) url += `&price_max=${filterMaxPrice}`
      if (filterCategory) url += `&categoryId=${filterCategory}`

      const response = await axios.get(url)

      return response.data
    }

    return super.apiRequest(getProducts, 'get: products')
  }

  post = async (product: __POST_PROPS): Promise<ApiResponse<Product>> => {
    const postProduct = async () => {
      const response = await axios.post(this.url, {
        title: product.title,
        price: product.price,
        description: product.description,
        categoryId: product.category.id,
        images: product.images
      })
      return response.data
    }

    return super.apiRequest(postProduct, 'post: product')
  }

  put = undefined
  patch = undefined
  del = undefined
}
