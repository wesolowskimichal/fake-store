import React, { useEffect, useRef } from 'react'
import { StyleSheet, View, Animated, Easing } from 'react-native'
import { ColorSchemeColors } from '../../types/Types'

interface Props {
  colors: ColorSchemeColors
  durationMs?: number
}

const startRotationAnimation = (durationMs: number, rotationDegree: Animated.Value): void => {
  Animated.loop(
    Animated.timing(rotationDegree, {
      toValue: 360,
      duration: durationMs,
      easing: Easing.linear,
      useNativeDriver: true
    })
  ).start()
}

export const Loader = ({ colors, durationMs = 1000 }: Props): JSX.Element => {
  const styles = createStyles(colors)
  const rotationDegree = useRef(new Animated.Value(0)).current

  useEffect(() => {
    startRotationAnimation(durationMs, rotationDegree)
  }, [durationMs, rotationDegree])

  return (
    <View style={styles.wrapper}>
      <View style={styles.container} accessibilityRole="progressbar">
        <View style={[styles.background, { borderColor: colors.dColor }]} />
        <Animated.View
          style={[
            styles.progress,
            {
              borderTopColor: colors.cColor,
              borderLeftColor: colors.dColor,
              borderRightColor: colors.dColor,
              borderBottomColor: colors.dColor
            },
            {
              transform: [
                {
                  rotateZ: rotationDegree.interpolate({
                    inputRange: [0, 360],
                    outputRange: ['0deg', '360deg']
                  })
                }
              ]
            }
          ]}
        />
      </View>
    </View>
  )
}

const height = 80

const createStyles = (colors: ColorSchemeColors) =>
  StyleSheet.create({
    wrapper: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.aColor
    },
    container: {
      width: height,
      height: height,
      justifyContent: 'center',
      alignItems: 'center'
    },
    background: {
      width: '100%',
      height: '100%',
      borderRadius: height / 2,
      borderWidth: 4,
      opacity: 0.1
    },
    progress: {
      width: '100%',
      height: '100%',
      borderRadius: height / 2,
      borderWidth: 4,
      position: 'absolute'
    }
  })
