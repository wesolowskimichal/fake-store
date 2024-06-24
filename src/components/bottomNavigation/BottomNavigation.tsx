import { Pressable, StyleSheet, Text, View } from 'react-native'
import { ColorSchemeColors, NavProps } from '../../types/Types'
import { useScreeen } from '../../hooks/useScreenContext'
// @ts-ignore
import HomeSvg from '../../../assets/home.svg'
// @ts-ignore
import AccountSvg from '../../../assets/account.svg'
// @ts-ignore
import ProductsSvg from '../../../assets/products.svg'

export const BottomNavigation = ({ navigation }: NavProps) => {
  const { colors } = useScreeen()
  const styles = createStyles(colors)

  return (
    <View style={styles.wrapper}>
      <Pressable onPress={() => navigation.navigate('Home')} style={styles.route}>
        <HomeSvg width={40} height={40} fill={colors.cColor} />
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Products')} style={styles.route}>
        <ProductsSvg width={40} height={40} fill={colors.cColor} />
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Home')} style={[styles.route, { borderRightWidth: 0 }]}>
        <AccountSvg width={40} height={40} fill={colors.cColor} />
      </Pressable>
    </View>
  )
}

const createStyles = (colors: ColorSchemeColors) =>
  StyleSheet.create({
    wrapper: {
      width: '100%',
      flexDirection: 'row',
      backgroundColor: colors.dColor,
      height: 50
    },

    route: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderRightWidth: 1,
      borderColor: colors.aColor
    },

    routeText: {
      margin: 0,
      padding: 0,
      textAlign: 'center',
      color: colors.cColor,
      fontSize: 13
    }
  })
