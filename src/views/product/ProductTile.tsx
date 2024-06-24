import { Image as ExpoImage } from 'expo-image'
import { DimensionValue, Pressable, StyleSheet, Text, View } from 'react-native'
import { ColorSchemeColors, Product } from '../../types/Types'
import { NavigationProp } from '@react-navigation/native'
import { useScreeen } from '../../hooks/useScreenContext'
// @ts-ignore
import AddShoppingCartSvg from '../../../assets/add_shopping_cart.svg'

type ProductTileProps = {
  product: Product
  navigation?: NavigationProp<any>
  width?: DimensionValue
  height?: DimensionValue
}

export const ProductTile = ({ product, navigation, width = 300, height = 300 }: ProductTileProps) => {
  const { colors } = useScreeen()
  const styles = createStyles(colors, width, height)

  if (!navigation) {
    return (
      <View>
        <Text style={{ color: 'red' }}>Cannot create "ProductTile" without "navigation" prop</Text>
      </View>
    )
  }

  return (
    <Pressable style={styles.productWrapper} onPress={() => navigation!.navigate('Product', { product: product })}>
      <ExpoImage style={styles.image} source={{ uri: product.images[0] }} />
      <View style={styles.descriptionContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <View style={styles.footer}>
          <Pressable style={styles.addButton}>
            <AddShoppingCartSvg width={30} height={30} fill={colors.dColor} />
          </Pressable>
          <Text style={styles.price}>{product.price}$</Text>
        </View>
      </View>
    </Pressable>
  )
}

const createStyles = (colors: ColorSchemeColors, width: DimensionValue, height: DimensionValue) =>
  StyleSheet.create({
    productWrapper: {
      width: width,
      height: height,
      borderColor: colors.cColor,
      backgroundColor: colors.cColor,
      padding: 10,
      flexDirection: 'column',
      rowGap: 10
    },
    image: {
      flexGrow: 1,
      backgroundColor: 'red'
    },
    descriptionContainer: {},
    title: {
      textAlign: 'center',
      color: colors.dColor
    },
    price: {
      color: colors.dColor,
      textAlign: 'right'
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 5
    },
    addButton: {
      borderRadius: 20,
      flexBasis: '30%',
      padding: 5,
      backgroundColor: colors.aColor,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })
