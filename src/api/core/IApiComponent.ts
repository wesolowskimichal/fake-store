import { ApiResponse } from '../../types/Types'

export type __NO_PROPS = undefined

export interface IApiComponent<T, GET_PROPS, POST_PROPS, PUT_PROPS, PATCH_PROPS, DEL_PROPS> {
  url: string
  get?: (getProps: GET_PROPS) => Promise<ApiResponse<T>>
  post?: (postProps: POST_PROPS) => Promise<ApiResponse<T>>
  put?: (putProps: PUT_PROPS) => Promise<ApiResponse<T>>
  patch?: (patchProps: PATCH_PROPS) => Promise<ApiResponse<T>>
  del?: (delProps: DEL_PROPS) => Promise<ApiResponse<null>>
}
