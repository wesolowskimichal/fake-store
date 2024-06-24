import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Category, ColorSchemeColors, HomeScreenProps, Product } from '../../types/Types'
import { Screen } from '../screen/Screen'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Api } from '../../api/Api'
import { ResponseCode } from '../../api/core/ResponseCode'
import { ProductView } from '../../views/product/ProductView'
import { useScreeen } from '../../hooks/useScreenContext'

export const HomeSccreen = ({ navigation, route }: HomeScreenProps) => {
  const { setLoading, colors, setColorScheme } = useScreeen()
  const [categories, setCategories] = useState<Category[]>([])
  const [categoriesProducts, setCategoriesProducts] = useState<{ category: Category['name']; products: Product[] }[]>(
    []
  )

  const styles = useMemo(() => createStyles(colors), [colors])

  const fetchCategories = useCallback(async () => {
    setLoading(true)
    const response = await Api.categories.get({ limit: 0 })
    if (response.responseCode === ResponseCode.POSITIVE) {
      setCategories(response.data!)
    }
    setLoading(false)
  }, [])

  const fetchCategoriesProducts = useCallback(async (category: Category) => {
    const response = await Api.categories.id(category.id).products.get({ limit: 8, offset: 0 })
    if (response.responseCode === ResponseCode.POSITIVE) {
      if (response.data!.length > 0) {
        setCategoriesProducts(prevCategoriesProduct => [
          ...prevCategoriesProduct,
          { category: category.name, products: response.data! }
        ])
      }
    }
  }, [])

  useEffect(() => {
    if (categories.length > 0) {
      setLoading(true)
      Promise.all(categories.map(fetchCategoriesProducts)).finally(() => setLoading(false))
    }
  }, [categories, fetchCategoriesProducts])

  // useEffect(() => {
  //   fetchCategories()
  // }, [fetchCategories])

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <Screen navigation={navigation} route={route}>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          {categoriesProducts
            .filter(value => value.products.length > 0)
            .map((categoryProducts, index) => (
              <View key={`category-container-${index}`} style={styles.categoryContainer}>
                <View style={styles.categoryHeader}>
                  <Text style={styles.categoryHeaderText}>{categoryProducts.category.toUpperCase()}</Text>
                </View>
                <ScrollView style={styles.productsContainer} horizontal>
                  {categoryProducts.products.map((product, index) => (
                    <View key={`product-${index}`} style={index === 0 ? { marginLeft: 0 } : { marginLeft: 25 }}>
                      <ProductView product={product} type="Tile" navigation={navigation} />
                    </View>
                  ))}
                </ScrollView>
              </View>
            ))}
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
    header: {
      padding: 10
    },
    headerText: {
      fontSize: 24,
      fontWeight: '800',
      color: colors.dColor
    },
    container: {},
    categoryContainer: {
      padding: 5
    },
    categoryHeader: {
      padding: 4
    },
    categoryHeaderText: {
      fontSize: 18,
      fontWeight: '500',
      color: colors.dColor
    },
    productsContainer: {
      padding: 5
    }
  })
