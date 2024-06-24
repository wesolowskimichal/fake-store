import axios from 'axios'
import { ApiResponse, User } from '../../../../types/Types'
import { __NO_PROPS } from '../../IApiComponent'
import { IdComponent } from '../IdComponent'

type __POST_PROPS = __NO_PROPS
type __PUT_PROPS = __NO_PROPS
type __PATCH_PROPS = __NO_PROPS
type __DEL_PROPS = __NO_PROPS

export class UserIdComponent extends IdComponent<User, __POST_PROPS, __PUT_PROPS, __PATCH_PROPS, __DEL_PROPS> {
  constructor(parentUrl: string, id: User['id']) {
    super(parentUrl, id)
  }

  post = undefined
  put = undefined
  patch = undefined
  del = undefined
}
