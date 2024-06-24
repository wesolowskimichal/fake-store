import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { ColorSchemeColors, Product, ProductScreenProps } from '../../types/Types'
import { Screen } from '../screen/Screen'
import { useScreeen } from '../../hooks/useScreenContext'
import { ProductView } from '../../views/product/ProductView'
// @ts-ignore
import AddShoppingCartSvg from '../../../assets/add_shopping_cart.svg'
import { useState } from 'react'

export const ProductScreen = ({ navigation, route }: ProductScreenProps) => {
  const { product } = route.params
  const { colors } = useScreeen()
  const [quantity, setQuantity] = useState('')
  const styles = createStyles(colors)

  const handleQuantityChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '')
    setQuantity(numericText)
  }

  return (
    <Screen navigation={navigation} route={route}>
      <View style={styles.wrapper}>
        <ProductView product={product} type="Page" />
        <View style={styles.addToCartContainer}>
          <TextInput
            onChangeText={handleQuantityChange}
            value={quantity}
            keyboardType="numeric"
            inputMode="numeric"
            placeholder="Quantity"
            placeholderTextColor={colors.dColor}
            style={styles.inputQuantity}
          />
          <Pressable style={styles.addToCartButton}>
            <AddShoppingCartSvg width={30} height={30} fill={colors.dColor} />
          </Pressable>
        </View>
      </View>
    </Screen>
  )
}

const createStyles = (colors: ColorSchemeColors) =>
  StyleSheet.create({
    wrapper: {
      flexDirection: 'column'
    },
    addToCartContainer: {
      width: '60%',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 15,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: colors.cColor,
      padding: 10,
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'space-around',
      columnGap: 10
    },
    addToCartButton: {
      backgroundColor: colors.bColor,
      borderRadius: 20,
      padding: 7
    },
    inputQuantity: {
      color: colors.dColor,
      backgroundColor: colors.bColor,
      flexBasis: 100,
      borderRadius: 10,
      padding: 5,
      textAlign: 'center'
    }
  })
