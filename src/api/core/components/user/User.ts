import axios from 'axios'
import { ApiComponent } from '../../ApiComponent'
import { __NO_PROPS } from '../../IApiComponent'
import { ApiResponse, User } from '../../../../types/Types'
import { UserIdComponent } from './UserId'

type __GET_PROPS = __NO_PROPS
type __POST_PROPS = User
type __PUT_PROPS = User
type __PATCH_PROPS = {
  email?: User['email']
  username?: User['username']
  password?: User['password']
  name?: User['name']
  address?: User['address']
  phone?: User['phone']
}
type __DEL_PROPS = __NO_PROPS

export class UserComponent extends ApiComponent<
  User,
  __GET_PROPS,
  __POST_PROPS,
  __PUT_PROPS,
  __PATCH_PROPS,
  __DEL_PROPS
> {
  constructor() {
    super('users/')
  }

  // Get User By Id
  public id(id: User['id']): UserIdComponent {
    return new UserIdComponent(this.url, id)
  }

  get = async (): Promise<ApiResponse<User>> => {
    const getUser = async () => {
      const config = await super.getConfig()
      const response = await axios.get(this.url, config)
      return response.data
    }

    return super.apiRequest(getUser, 'get: user')
  }

  post = async (user: __POST_PROPS): Promise<ApiResponse<User>> => {
    const postUser = async () => {
      const response = await axios.put(this.url, {
        email: user.email,
        username: user.username,
        password: user.password,
        name: user.name,
        address: user.address,
        phone: user.phone
      })
      return response.data
    }

    return super.apiRequest(postUser, 'post: user')
  }
  put = async (user: __PUT_PROPS): Promise<ApiResponse<User>> => {
    const putUser = async () => {
      const response = await axios.put(this.url, {
        email: user.email,
        username: user.username,
        password: user.password,
        name: user.name,
        address: user.address,
        phone: user.phone
      })
      return response.data
    }

    return super.apiRequest(putUser, 'put: user')
  }

  patch = async ({ email, username, password, name, address, phone }: __PATCH_PROPS): Promise<ApiResponse<User>> => {
    const patchUser = async () => {
      const requestData = new FormData()
      if (email) requestData.append('email', email)
      if (username) requestData.append('username', username)
      if (password) requestData.append('password', password)
      if (name) requestData.append('name', JSON.stringify(name))
      if (address) requestData.append('address', JSON.stringify(address))
      if (phone) requestData.append('phone', phone)

      const response = await axios.put(this.url, requestData)
      return response.data
    }

    return super.apiRequest(patchUser, 'patch: user')
  }

  del = async (): Promise<ApiResponse<null>> => {
    const deleteUser = async () => {
      const response = await axios.delete(this.url)
      return response.data
    }
    return super.apiRequest(deleteUser, 'delete: user')
  }
}
