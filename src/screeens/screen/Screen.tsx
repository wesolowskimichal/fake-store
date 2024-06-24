import React from 'react'
import { NavigationProp, RouteProp } from '@react-navigation/native'
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StatusBar as StatusBarRN, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import { BottomNavigation } from '../../components/bottomNavigation/BottomNavigation'
import { useScreeen } from '../../hooks/useScreenContext'
import { ColorSchemeColors, RootStackParamList } from '../../types/Types'
import { Loader } from '../../components/loader/Loader'
import { Header } from '../../components/header/Header'

type ScreenProps = {
  navigation: NavigationProp<any>
  children: React.ReactNode
  noScrollWrapper?: boolean
  route: RouteProp<RootStackParamList, keyof RootStackParamList>
}

export const Screen = ({ navigation, children, route, noScrollWrapper = false }: ScreenProps) => {
  const { loading, colors } = useScreeen()
  const styles = createStyles(colors)

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <StatusBar style="auto" translucent backgroundColor={colors.dColor as string} />
      <SafeAreaView style={styles.root}>
        <Header navigation={navigation} route={route} />
        {noScrollWrapper ? (
          <View style={styles.rootChildren}>{children}</View>
        ) : (
          <ScrollView style={styles.rootChildren}>{children}</ScrollView>
        )}
        <BottomNavigation navigation={navigation} route={route} />
      </SafeAreaView>
      {loading && <Loader colors={colors} />}
    </KeyboardAvoidingView>
  )
}

const createStyles = (colors: ColorSchemeColors) =>
  StyleSheet.create({
    root: {
      flex: 1,
      marginTop: StatusBarRN.currentHeight,
      backgroundColor: colors.aColor
    },

    rootChildren: {
      flex: 1
    }
  })
