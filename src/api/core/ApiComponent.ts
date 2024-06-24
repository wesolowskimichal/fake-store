import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { IApiComponent } from './IApiComponent'
import { ApiResponse } from '../../types/Types'
import { ResponseCode } from './ResponseCode'
import { LocalData } from '../../data/LocalData'
import { LocalResponseCode } from '../../data/core/LocalResponseCode'

export abstract class ApiComponent<T, GET_PROPS, POST_PROPS, PUT_PROPS, PATCH_PROPS, DEL_PROPS>
  implements IApiComponent<T, GET_PROPS, POST_PROPS, PUT_PROPS, PATCH_PROPS, DEL_PROPS>
{
  protected defaultURL = 'https://api.escuelajs.co/api/v1/'
  url: string = 'https://api.escuelajs.co/api/v1/'

  constructor(url: string, isParentUrl = false) {
    if (isParentUrl) {
      this.url = url
    } else {
      this.url += url
    }
  }
  abstract get?: (getProps: GET_PROPS) => Promise<ApiResponse<T>>
  abstract post?: (postProps: POST_PROPS) => Promise<ApiResponse<T>>
  abstract put?: (putProps: PUT_PROPS) => Promise<ApiResponse<T>>
  abstract patch?: (patchProps: PATCH_PROPS) => Promise<ApiResponse<T>>
  abstract del?: (delProps: DEL_PROPS) => Promise<ApiResponse<null>>

  protected async apiRequest<T>(request: () => Promise<T>, title: string | null = null): Promise<ApiResponse<T>> {
    //debug
    let debugLog = ''
    debugLog = `Request: ${title ?? '-?-'}`

    try {
      const data = await request()
      //debug
      debugLog += `\t\t=>code: 200\n`
      // console.log(debugLog)
      return { data: data, responseCode: ResponseCode.POSITIVE }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const statusCode = (error as AxiosError).response?.status
        console.log((error as AxiosError).request)

        //debug
        debugLog += `\t\t=>code: ${this.convertCodeToResponseCode(statusCode)}`
        console.log(debugLog)
        return { data: null, responseCode: this.convertCodeToResponseCode(statusCode) }
      } else {
        //debug
        debugLog += `\t\t=>code: ${ResponseCode.BAD_RESPONSE}`
      }
      //debug
      console.log(debugLog)

      return { data: null, responseCode: ResponseCode.BAD_RESPONSE }
    }
  }

  protected async getConfig(mutliplatformFormData = false): Promise<AxiosRequestConfig<any> | undefined> {
    const tokenResponse = await LocalData.getToken()
    if (tokenResponse.responseCode === LocalResponseCode.POSITIVE) {
      const accessToken = tokenResponse.data!.token
      if (mutliplatformFormData) {
        return {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      }
      return {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    }
    return undefined
  }

  private convertCodeToResponseCode(responseCode: Number | undefined): ResponseCode {
    switch (responseCode) {
      case 400:
        return ResponseCode.BAD_RESPONSE
      case 401:
        return ResponseCode.UNAUTHORIZED
      case 403:
        return ResponseCode.FORBIDDEN
      case 404:
        return ResponseCode.NOT_FOUND
      case 408:
        return ResponseCode.TIMEOUT
      case 500:
        return ResponseCode.INTERNAL_SERVER
      case 502:
        return ResponseCode.BAD_GATEWAY
      case 504:
        return ResponseCode.GATEWAY_TIMEOUT
      default:
        return ResponseCode.BAD_RESPONSE
    }
  }
}
