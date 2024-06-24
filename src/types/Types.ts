import { NavigationProp, RouteProp } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { ResponseCode } from '../api/core/ResponseCode'
import { LocalResponseCode } from '../data/core/LocalResponseCode'
import { ColorValue } from 'react-native'

//#region --- SCREEN NAVIGATION ---
export type RootStackParamList = {
  Home: undefined
  Product: { product: Product }
  Products: undefined
  Cart: { userId: User['id'] }
  Settings: undefined
}

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>
export type ProductScreenProps = NativeStackScreenProps<RootStackParamList, 'Product'>
export type ProductsScreenProps = NativeStackScreenProps<RootStackParamList, 'Products'>
export type CartScreenProps = NativeStackScreenProps<RootStackParamList, 'Cart'>
export type SettingsScreenProps = NativeStackScreenProps<RootStackParamList, 'Settings'>

export type NavProps = {
  navigation: NavigationProp<any>
  route: RouteProp<RootStackParamList, keyof RootStackParamList>
}

export type ScreenProps = {
  navigation: NavigationProp<any>
  children: React.ReactNode
}
//#endregion

//#region --- LOCAL DATA ---
export type LocalResponse<T> = {
  data: T | null
  responseCode: LocalResponseCode
}

export type Token = {
  token: string
}

export type ColorScheme = 'dark' | 'light'
export type ColorSchemeColors = {
  aColor: ColorValue
  bColor: ColorValue
  cColor: ColorValue
  dColor: ColorValue
}
//#endregion

//#region --- API ---
export type ApiResponse<T> = {
  data: T | null
  responseCode: ResponseCode
}

export type GenericTypes = {
  id: string
  image: string
}

export type Category = {
  id: GenericTypes['id']
  name: string
  image: GenericTypes['image']
  creationAt: Date
  updatedAt: Date
}

export type Product = {
  id: GenericTypes['id']
  title: string
  price: number
  description: string
  images: GenericTypes['image'][]
  creationAt: Date
  updatedAt: Date
  category: Category
}

export type User = {
  id: GenericTypes['id']
  email: string
  username: string
  password: string
  name: string
  role: string
  avatar: GenericTypes['image']
  creationAt: Date
  updatedAt: Date
}
//#endregion
