import axios from 'axios'
import { ApiResponse, GenericTypes } from '../../../types/Types'
import { ApiComponent } from '../ApiComponent'

export abstract class IdComponent<T, POST_PROPS, PUT_PROPS, PATCH_PROPS, DEL_PROPS> extends ApiComponent<
  T,
  undefined,
  POST_PROPS,
  PUT_PROPS,
  PATCH_PROPS,
  DEL_PROPS
> {
  constructor(parentUrl: string, id: GenericTypes['id']) {
    super(`${parentUrl}/${id}`, true)
  }

  get = async (): Promise<ApiResponse<T>> => {
    const fetchById = async () => {
      const response = await axios.get(this.url)
      return response.data
    }

    return super.apiRequest(fetchById, 'get: by id')
  }

  post?: (postProps: POST_PROPS) => Promise<ApiResponse<T>>
  put?: (putProps: PUT_PROPS) => Promise<ApiResponse<T>>
  patch?: (patchProps: PATCH_PROPS) => Promise<ApiResponse<T>>
  del?: (delProps: DEL_PROPS) => Promise<ApiResponse<null>>
}
