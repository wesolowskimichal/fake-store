import { StyleSheet, Text, View } from 'react-native'
import { ColorSchemeColors, Product } from '../../types/Types'
import { useScreeen } from '../../hooks/useScreenContext'
import { Foldable } from '../../components/foldable/Foldable'
import { Carousel } from '../../components/carousel/Carousel'

type ProductPageProps = {
  product: Product
}

export const ProductPage = ({ product }: ProductPageProps) => {
  const { colors } = useScreeen()
  const styles = createStyles(colors)

  return (
    <View style={styles.productWrapper}>
      <Carousel data={product.images} colors={colors} />
      <Text style={styles.productTitle}>{product.title}</Text>
      <Text style={styles.productPrice}>{product.price}$</Text>
      <Foldable colors={colors} headerText="Description">
        <Text style={styles.productDescription}>{product.description}</Text>
      </Foldable>
    </View>
  )
}

const createStyles = (colors: ColorSchemeColors) =>
  StyleSheet.create({
    productWrapper: {
      flexDirection: 'column',
      padding: 5
    },
    productImage: {
      height: 600,
      objectFit: 'contain'
    },
    productTitle: {
      fontSize: 20,
      fontWeight: '600',
      textAlign: 'center',
      marginTop: 10,
      color: colors.dColor
    },
    productPrice: {
      fontSize: 20,
      fontWeight: '600',
      textAlign: 'center',
      color: colors.dColor,
      marginTop: 10,
      marginBottom: 10
    },
    productDescription: {
      color: colors.dColor,
      textAlign: 'justify'
    }
  })
