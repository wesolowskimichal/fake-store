import { BackHandler, Pressable, StyleSheet, Text, View } from 'react-native'
import { ColorSchemeColors, NavProps } from '../../types/Types'
import { useScreeen } from '../../hooks/useScreenContext'
// @ts-ignore
import SettingsSvg from '../../../assets/settings.svg'
// @ts-ignore
import ShoppingCartSvg from '../../../assets/shopping_cart.svg'
// @ts-ignore
import ArrowLeftSvg from '../../../assets/arrow_left.svg'
import { useEffect } from 'react'

export const Header = ({ navigation, route }: NavProps) => {
  const { colors } = useScreeen()
  const styles = createStyles(colors)

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack()
    } else {
      navigation.navigate('Home')
    }
  }

  useEffect(() => {
    if (route.name !== 'Home') {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        if (navigation.canGoBack()) {
          navigation.goBack()
          return true
        }
        navigation.navigate('Home')
        return false
      })

      return () => backHandler.remove()
    }
  }, [route])

  return (
    <View style={styles.wrapper}>
      {route.name === 'Home' ? (
        <Text style={styles.headerText}>Fake Store</Text>
      ) : (
        <View style={styles.header}>
          <Pressable style={styles.pressableBack} onPress={() => handleGoBack()}>
            <ArrowLeftSvg width={40} height={40} fill={colors.dColor} />
          </Pressable>
          <Text style={[styles.headerText, { fontSize: 20 }]}>{route.name}</Text>
        </View>
      )}
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.button}>
          <ShoppingCartSvg width={40} height={40} fill={colors.aColor} />
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Settings')}>
          <SettingsSvg width={40} height={40} fill={colors.aColor} />
        </Pressable>
      </View>
    </View>
  )
}

const createStyles = (colors: ColorSchemeColors) =>
  StyleSheet.create({
    wrapper: {
      height: 50,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.dColor,
      paddingHorizontal: 10
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '35%'
    },
    pressableBack: {
      height: 40,
      width: 40,
      backgroundColor: colors.cColor,
      borderRadius: 10
    },
    headerText: {
      fontSize: 24,
      fontWeight: '800',
      color: colors.aColor
    },
    buttonsContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    button: {
      marginHorizontal: 5
    }
  })
