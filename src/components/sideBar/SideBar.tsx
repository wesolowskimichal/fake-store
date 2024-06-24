import React, { ReactNode, useState, useEffect, useRef } from 'react'
import {
  TouchableOpacity,
  Animated,
  StyleSheet,
  Easing,
  DimensionValue,
  Pressable,
  Text,
  View,
  BackHandler
} from 'react-native'
import { ColorSchemeColors } from '../../types/Types'
// @ts-ignore
import FilterSvg from '../../../assets/filter.svg'
// @ts-ignore
import CloseSvg from './assets/close.svg'

type SideBarProps = {
  width: number
  colors: ColorSchemeColors
  side: 'left' | 'right'
  title: string
  children: ReactNode
}

export const SideBar = ({ width, colors, side, title, children }: SideBarProps) => {
  const [visible, setVisible] = useState(false)
  const translateX = useRef(new Animated.Value(side === 'left' ? -width : width)).current

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: visible ? 0 : side === 'left' ? -width : width,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true
    }).start()

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (visible) {
        setVisible(false)
        return true // prevent default behavior (exiting the app)
      }
      return false // allow default behavior (exiting the app)
    })

    return () => backHandler.remove()
  }, [visible, width, side, translateX])

  const toggleSidebar = () => {
    setVisible(!visible)
  }

  const styles = createStyles(colors, width, side, visible)

  return (
    <>
      <TouchableOpacity onPress={toggleSidebar} style={styles.overlay}>
        <FilterSvg width={40} height={40} fill={colors.dColor} />
      </TouchableOpacity>
      <Animated.View style={[styles.sideBarWrapper, { transform: [{ translateX }] }]}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{title}</Text>
          <Pressable onPress={() => setVisible(false)}>
            <CloseSvg width={40} height={40} fill={colors.aColor} />
          </Pressable>
        </View>
        {children}
      </Animated.View>
    </>
  )
}

const createStyles = (colors: ColorSchemeColors, width: DimensionValue, side: 'left' | 'right', visible: boolean) =>
  StyleSheet.create({
    sideBarWrapper: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      [side]: 0,
      width: width,
      backgroundColor: colors.dColor,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
      zIndex: 2,
      padding: 2,
      flexDirection: 'column'
    },
    overlay: {
      position: 'absolute',
      right: 0,
      padding: 10,
      zIndex: 1,
      display: !visible ? 'flex' : 'none'
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    headerText: {
      color: colors.aColor,
      fontSize: 22,
      fontWeight: '600'
    }
  })
