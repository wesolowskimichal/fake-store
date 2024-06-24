import { DimensionValue } from 'react-native'
import { Product } from '../../types/Types'
import { ProductPage } from './ProductPage'
import { ProductTile } from './ProductTile'
import { NavigationProp } from '@react-navigation/native'

type ProductViewProps = {
  product: Product
  type: 'Tile' | 'Page'
  navigation?: NavigationProp<any>
  tileWidth?: DimensionValue
  tileHeight?: DimensionValue
}
export const ProductView = ({ product, type, navigation, tileWidth, tileHeight }: ProductViewProps) => {
  return type === 'Page' ? (
    <ProductPage product={product} />
  ) : (
    <ProductTile product={product} navigation={navigation} width={tileWidth} height={tileHeight} />
  )
}
