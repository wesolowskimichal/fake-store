import React, { useState, useRef } from 'react'
import { Dimensions, LayoutChangeEvent, Pressable, StyleSheet, View, Animated, PanResponder } from 'react-native'
import { Image as ExpoImage } from 'expo-image'
import { ColorSchemeColors } from '../../types/Types'
// @ts-ignore
import ArrowLeftSvg from '../../../assets/arrow_left.svg'
// @ts-ignore
import ArrowRightSvg from '../../../assets/arrow_right.svg'

type CarouselProps = {
  data: string[]
  colors: ColorSchemeColors
}

export const Carousel = ({ data, colors }: CarouselProps) => {
  const [index, setIndex] = useState(0)
  const [imageHeight, setImageHeight] = useState(0)
  const styles = createStyles(colors, imageHeight)

  const translateX = useRef(new Animated.Value(0)).current

  const animate = (direction: 'forward' | 'backward') => {
    Animated.timing(translateX, {
      toValue: direction === 'forward' ? -Dimensions.get('window').width : Dimensions.get('window').width,
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      translateX.setValue(direction === 'forward' ? Dimensions.get('window').width : -Dimensions.get('window').width)
      setIndex(prevIndex => {
        const newIndex =
          direction === 'forward' ? (prevIndex + 1) % data.length : prevIndex === 0 ? data.length - 1 : prevIndex - 1
        return newIndex
      })
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }).start()
    })
  }

  const forward = () => {
    animate('forward')
  }

  const backward = () => {
    animate('backward')
  }

  const onImagelayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout
    setImageHeight(height)
  }

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 50) {
          backward()
        } else if (gestureState.dx < -50) {
          forward()
        }
      }
    })
  ).current

  return (
    <View style={styles.carousel}>
      <Animated.View style={[styles.imageContainer, { transform: [{ translateX }] }]} {...panResponder.panHandlers}>
        <ExpoImage style={styles.image} source={{ uri: data[index] }} onLayout={onImagelayout} />
      </Animated.View>
      <Pressable style={styles.leftPressable} onPress={backward}>
        <ArrowLeftSvg width={40} height={40} fill={colors.dColor} />
      </Pressable>
      <Pressable style={styles.rightPressable} onPress={forward}>
        <ArrowRightSvg width={40} height={40} fill={colors.dColor} />
      </Pressable>
      <View style={styles.imageTiles}>
        {data.map((_, iIndex) => (
          <View
            key={`image-tile-${iIndex}`}
            style={[
              styles.imageTile,
              iIndex === index ? { backgroundColor: colors.dColor } : { backgroundColor: colors.cColor }
            ]}
          ></View>
        ))}
      </View>
    </View>
  )
}

const createStyles = (colors: ColorSchemeColors, imageHeight: number) =>
  StyleSheet.create({
    carousel: {
      flexDirection: 'row',
      justifyContent: 'center'
    },
    imageContainer: {
      flex: 1,
      width: '100%'
    },
    leftPressable: {
      position: 'absolute',
      left: 0,
      transform: [{ translateY: imageHeight / 2 }]
    },
    rightPressable: {
      position: 'absolute',
      right: 0,
      transform: [{ translateY: imageHeight / 2 }]
    },
    image: {
      aspectRatio: 1 / 1,
      width: '100%',
      flex: 1
    },
    imageTiles: {
      position: 'absolute',
      height: 10,
      transform: [{ translateY: imageHeight - 15 }],
      flexDirection: 'row',
      columnGap: 10
    },
    imageTile: {
      height: 10,
      width: 20
    }
  })
