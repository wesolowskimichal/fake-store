import { ReactNode, useState, useRef } from 'react'
import { ColorSchemeColors } from '../../types/Types'
import { Pressable, StyleSheet, Text, View, Animated, StyleProp, ViewStyle, ColorValue } from 'react-native'
// @ts-ignore
import HideSvg from './assets/hide.svg'
// @ts-ignore
import ShowSvg from './assets/show.svg'

type FoldableProps = {
  headerText: string
  headerColor?: ColorValue
  colors: ColorSchemeColors
  children: ReactNode
  wrapperStyles?: ViewStyle
}

export const Foldable = ({
  headerText,
  colors,
  children,
  wrapperStyles,
  headerColor = colors.bColor
}: FoldableProps) => {
  const [folded, setFolded] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const [contentHeight, setContentHeight] = useState(0)
  const animatedHeight = useRef(new Animated.Value(1)).current
  const styles = createStyles(colors, headerColor)

  const toggleFold = () => {
    setFolded(isFolded => !isFolded)
    Animated.timing(animatedHeight, {
      toValue: folded ? 1 : 0,
      duration: 300,
      useNativeDriver: false
    }).start()
  }

  const animatedHeightStyle = {
    height: animatedHeight.interpolate({
      inputRange: [0, 1],
      outputRange: [0, contentHeight]
    }),
    opacity: animatedHeight
  }

  return (
    <View style={wrapperStyles ?? styles.foldableWrapper}>
      <View style={styles.foldableHeader}>
        <Text style={styles.foldableHeaderText}>{headerText}</Text>
        <Pressable onPress={toggleFold}>
          {folded ? (
            <ShowSvg height={40} width={40} fill={colors.dColor} />
          ) : (
            <HideSvg height={40} width={40} fill={colors.dColor} />
          )}
        </Pressable>
      </View>
      {!initialized ? (
        <View
          style={styles.foldableContent}
          onLayout={event => {
            const { height } = event.nativeEvent.layout
            setContentHeight(height)
            setInitialized(true)
          }}
        >
          {children}
        </View>
      ) : (
        <Animated.View style={[styles.foldableContent, animatedHeightStyle]}>{children}</Animated.View>
      )}
    </View>
  )
}

const createStyles = (colors: ColorSchemeColors, headerColor: ColorValue) =>
  StyleSheet.create({
    foldableWrapper: {},
    foldableHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: headerColor
    },
    foldableHeaderText: {
      color: colors.dColor,
      fontSize: 16
    },
    foldableContent: {
      overflow: 'hidden'
    }
  })
