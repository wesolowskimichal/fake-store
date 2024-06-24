import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import { Category, ColorSchemeColors, Product, ProductsScreenProps } from '../../types/Types'
import { Screen } from '../screen/Screen'
import { useScreeen } from '../../hooks/useScreenContext'
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import { Api } from '../../api/Api'
import { ResponseCode } from '../../api/core/ResponseCode'
import { ProductView } from '../../views/product/ProductView'
import { SideBar } from '../../components/sideBar/SideBar'
import { Foldable } from '../../components/foldable/Foldable'
import { CategoryView } from '../../views/category/CategoryView'

export const ProductsScreen = ({ navigation, route }: ProductsScreenProps) => {
  const { setLoading, colors } = useScreeen()
  const [products, setProducts] = useState<Product[]>([])
  const [totalProducts, setTotalProducts] = useState(0)
  const [categories, setCategories] = useState<Category[]>([])
  const [page, setPage] = useState(1)
  const [localLoading, setLocalLoading] = useState(true)
  const [noMoreElements, setNoMoreElements] = useState(false)
  // filters
  const [isFiltering, setIsFiltering] = useState(false)
  const [title, setTitle] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [categoriesFilter, setCategoriesFilter] = useState<Category['name'][]>([])
  const styles = createStyles(colors)

  const fetchProducts = useCallback(async (page: number = 1, limit: number = 10) => {
    setLocalLoading(true)
    const skip = (page - 1) * limit

    const response = await Api.products.get({ offset: skip, limit: limit })
    if (response.responseCode === ResponseCode.POSITIVE) {
      if (response.data!.length === 0) {
        setNoMoreElements(true)
      } else {
        setNoMoreElements(false)
      }
      setProducts(prevProducts => [...prevProducts, ...response.data!])
      setTotalProducts(products.length)
    }
    setLocalLoading(false)
  }, [])

  const fetchFilteredProducts = useCallback(
    async (page: number = 1, limit: number = 10) => {
      setLocalLoading(true)
      const skip = (page - 1) * limit

      const query = {
        limit: limit,
        offset: skip,
        filterTitle: title,
        filterMinPrice: minPrice.length > 0 ? parseInt(minPrice) : maxPrice.length > 0 ? 1 : undefined,
        filterMaxPrice: maxPrice.length > 0 ? parseInt(maxPrice) : minPrice.length > 0 ? 1000000000000 : undefined,
        filterCategory: categoriesFilter.length > 0 ? categoriesFilter.join(',') : undefined
      }
      const response = await Api.products.get(query)
      if (response.responseCode === ResponseCode.POSITIVE) {
        if (response.data!.length === 0) {
          setNoMoreElements(true)
        } else {
          setNoMoreElements(false)
        }
        setProducts(prevProducts => [...prevProducts, ...response.data!])
        setTotalProducts(products.length)
      }
      setLocalLoading(false)
    },
    [maxPrice, minPrice, title, categoriesFilter]
  )

  const fetchCategories = useCallback(async () => {
    const response = await Api.categories.get({ limit: 0 })
    if (response.responseCode === ResponseCode.POSITIVE) {
      setCategories(response.data!)
    }
  }, [])

  useEffect(() => {
    if (!isFiltering) {
      fetchProducts(page)
    } else {
      fetchFilteredProducts(page)
    }
  }, [fetchProducts, page, isFiltering])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const countWidth = (percentage: number) => {
    const { width } = Dimensions.get('window')
    return percentage * width
  }

  const handleNumericTextChange = (text: string, setter: Dispatch<SetStateAction<string>>) => {
    const numericText = text.replace(/[^0-9]/g, '')
    setter(numericText)
  }

  const handleCategoryCheck = (categoryId: Category['id'], state: boolean) => {
    if (state) {
      setCategoriesFilter(prevCategories => [...prevCategories, categoryId])
    } else {
      setCategoriesFilter(prevCategories => prevCategories.filter(id => id !== categoryId))
    }
  }

  const filterProducts = () => {
    setPage(1)
    setLocalLoading(true)
    setProducts([])
    if (isFiltering) {
      fetchFilteredProducts()
    }
    setIsFiltering(true)
  }

  return (
    <Screen navigation={navigation} route={route} noScrollWrapper>
      <View style={styles.wrapper}>
        <SideBar width={countWidth(0.8)} colors={colors} side="right" title="Filter Products">
          {/* Title Filter */}
          <View style={{ flexBasis: '40%' }}>
            <View style={[styles.filterContainer, { marginTop: 10 }]}>
              <Foldable headerText="Title" colors={colors} wrapperStyles={styles.foldableWrapperStyles}>
                <View style={styles.pricesInputWrapper}>
                  <TextInput
                    onChangeText={text => setTitle(text)}
                    value={title}
                    keyboardType="default"
                    inputMode="text"
                    placeholder="Title"
                    placeholderTextColor={colors.dColor}
                    style={[styles.inputStyle, { flexBasis: '80%' }]}
                  />
                </View>
              </Foldable>
            </View>
            {/* Price Filter */}
            <View style={styles.filterContainer}>
              <Foldable headerText="Price" colors={colors} wrapperStyles={styles.foldableWrapperStyles}>
                <View style={styles.pricesInputWrapper}>
                  <TextInput
                    onChangeText={text => handleNumericTextChange(text, setMinPrice)}
                    value={minPrice}
                    keyboardType="numeric"
                    inputMode="numeric"
                    placeholder="Min Price"
                    placeholderTextColor={colors.dColor}
                    style={styles.inputStyle}
                  />
                  <TextInput
                    onChangeText={text => handleNumericTextChange(text, setMaxPrice)}
                    value={maxPrice}
                    keyboardType="numeric"
                    inputMode="numeric"
                    placeholder="Max Price"
                    placeholderTextColor={colors.dColor}
                    style={styles.inputStyle}
                  />
                </View>
              </Foldable>
            </View>
          </View>
          <View style={[styles.filterContainer, { flexBasis: '40%', flexGrow: 1, flexShrink: 1 }]}>
            <Text style={styles.categoriesText}>Categories</Text>
            <ScrollView horizontal>
              {categories.map(category => (
                <View key={`category-${category.id}`} style={{ marginRight: 10 }}>
                  <CategoryView
                    category={category}
                    colors={colors}
                    width={300}
                    aspectRatio={1 / 1}
                    height={'100%'}
                    onCheck={handleCategoryCheck}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={{ flexGrow: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
            <Pressable style={styles.filterPressable} onPress={() => filterProducts()}>
              <Text style={styles.filterPressableText}>Filter</Text>
            </Pressable>
          </View>
        </SideBar>
        <View style={styles.productsContainer}>
          <FlatList
            style={{ height: '100%' }}
            data={products}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <ProductView type="Tile" product={item} navigation={navigation} tileWidth={'48%'} />
            )}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            onEndReached={() => {
              if (!localLoading && !noMoreElements) {
                setPage(prevPage => prevPage + 1)
              }
            }}
            onEndReachedThreshold={0.5}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            ListFooterComponent={localLoading ? <ActivityIndicator size="large" color={colors.dColor} /> : null}
          />
        </View>
      </View>
    </Screen>
  )
}

const createStyles = (colors: ColorSchemeColors) =>
  StyleSheet.create({
    wrapper: {
      minHeight: 60
    },
    filterWrapper: {
      position: 'absolute',
      right: 0,
      padding: 10,
      zIndex: 1
    },
    filterButton: {},
    productsContainer: {
      height: '100%',
      paddingHorizontal: 10
    },
    columnWrapper: {
      justifyContent: 'space-between'
    },
    filterContainer: {
      marginBottom: 1,
      flexGrow: 0,
      flexShrink: 1
    },
    foldableWrapperStyles: {
      width: '100%'
    },
    pricesInputWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginBottom: 15
    },
    inputStyle: {
      marginTop: 5,
      flexBasis: '25%',
      color: colors.dColor,
      backgroundColor: colors.cColor,
      borderRadius: 10,
      height: 40,
      textAlign: 'center'
    },
    categoriesText: {
      fontSize: 24,
      fontWeight: '600',
      color: colors.aColor
    },
    filterPressable: {
      backgroundColor: colors.aColor,
      padding: 5,
      width: '20%',
      height: 40,
      borderRadius: 10,
      justifyContent: 'center',
      marginBottom: 7
    },
    filterPressableText: {
      textAlign: 'center',
      color: colors.dColor
    }
  })
