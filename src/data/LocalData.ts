import AsyncStorage from '@react-native-async-storage/async-storage'
import { ColorScheme, LocalResponse, Token } from '../types/Types'
import { LocalResponseCode } from './core/LocalResponseCode'

export class LocalData {
  private static async parseRequest<T>(request: () => Promise<string | null>): Promise<LocalResponse<T>> {
    try {
      const data = await request()
      if (data) {
        const dataParsed: T = JSON.parse(data)
        return { data: dataParsed, responseCode: LocalResponseCode.POSITIVE }
      }
      return { data: null, responseCode: LocalResponseCode.NEGATIVE }
    } catch (error) {
      return { data: null, responseCode: LocalResponseCode.NEGATIVE }
    }
  }

  private static async stringRequest<T>(request: () => Promise<string | null>): Promise<LocalResponse<T>> {
    try {
      const data = await request()
      if (data) {
        return { data: data as T, responseCode: LocalResponseCode.POSITIVE }
      }
      return { data: null, responseCode: LocalResponseCode.NEGATIVE }
    } catch (error) {
      return { data: null, responseCode: LocalResponseCode.NEGATIVE }
    }
  }

  public static async getColorScheme(): Promise<LocalResponse<ColorScheme>> {
    const fetchColorScheme = async () => {
      const colorScheme = await AsyncStorage.getItem('colorScheme')
      return colorScheme
    }

    return this.stringRequest(fetchColorScheme)
  }

  public static async setColorScheme(value: ColorScheme) {
    await AsyncStorage.setItem('colorScheme', value)
  }

  public static async getToken(): Promise<LocalResponse<Token>> {
    const fetchToken = async () => {
      const tokenJson = await AsyncStorage.getItem('token')
      return tokenJson
    }

    return this.parseRequest(fetchToken)
  }

  public static async setToken(value: Token | null) {
    if (!value) {
      await AsyncStorage.removeItem('token')
    } else {
      const tokenJson = JSON.stringify(value)
      await AsyncStorage.setItem('token', tokenJson)
    }
  }
}
