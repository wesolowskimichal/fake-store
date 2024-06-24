import { useMemo, useState } from 'react'
import { Image as ExpoImage } from 'expo-image'
import { Category, ColorSchemeColors } from '../../types/Types'
import { DimensionValue, Pressable, StyleSheet, Text, View } from 'react-native'
// @ts-ignore
import CheckSvg from '../../../assets/check_icon.svg'

type CategoryViewProps = {
  category: Category
  colors: ColorSchemeColors
  width: DimensionValue
  height: DimensionValue
  aspectRatio?: string | number
  onCheck: (categoryId: Category['id'], state: boolean) => void
}

export const CategoryView = ({ category, colors, width, height, aspectRatio, onCheck }: CategoryViewProps) => {
  const [checked, setChecked] = useState(false)
  const styles = useMemo(() => createStyles(colors, width, height, aspectRatio), [colors, width, height, aspectRatio])

  const handleOnPress = () => {
    setChecked(prevChecked => {
      onCheck(category.id, !prevChecked)
      return !prevChecked
    })
    // onCheck(category.id, checked)
  }

  return (
    <Pressable style={styles.categoryWrapper} onPress={() => handleOnPress()}>
      <ExpoImage source={{ uri: category.image }} style={styles.categoryImage} />
      <View style={[styles.categoryContent, checked ? { backgroundColor: 'rgba(200, 200, 200, 0.5)' } : {}]}>
        <Text style={[styles.categoryName, checked ? { color: '#444' } : {}]}>{category.name}</Text>
        {checked && <CheckSvg width={40} height={40} fill={'#444'} style={styles.categoryCheck} />}
      </View>
    </Pressable>
  )
}

const createStyles = (
  colors: ColorSchemeColors,
  width: DimensionValue,
  height: DimensionValue,
  aspectRatio?: string | number
) =>
  StyleSheet.create({
    categoryWrapper: {
      width: width,
      height: height,
      aspectRatio: aspectRatio
    },
    categoryImage: {
      width: width,
      height: height,
      borderRadius: 15,
      aspectRatio: aspectRatio
    },
    categoryContent: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      borderRadius: 15,
      alignItems: 'center'
    },
    categoryName: {
      color: '#eee',
      fontWeight: '800',
      fontSize: 16,
      bottom: 0
    },
    categoryCheck: {
      position: 'absolute',
      right: 10,
      top: 10
    }
  })
